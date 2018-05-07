import {
  Parser,
  Location,
  ESTree,
  Context,
  Flags,
  getLocation,
  hasBit,
  consume,
  finishNode,
  isValidIdentifier,
  parseExpressionCoverGrammar,
  expect,
  consumeSemicolon,
  nextToken,
  Token,
  tokenDesc,
  report,
  tolerant,
  Errors,
  IParser
} from '@cherow';
import { parseTypeAnnotation } from './annotations';

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BindingIdentifier)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBindingIdentifier(parser: IParser, context: Context): ESTree.Identifier {
  const { token } = parser;
  if (token & Token.IsEvalOrArguments) {
    if (context & Context.Strict) tolerant(parser, context, Errors.StrictLHSAssignment);
    parser.flags |= Flags.StrictEvalArguments;
  } else if (context & Context.BlockScope && token === Token.LetKeyword) {
    // let is disallowed as a lexically bound name
    tolerant(parser, context, Errors.LetInLexicalBinding);
  } else if (hasBit(token, Token.FutureReserved)) {
    if (context & Context.Strict) tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(token));
    parser.flags |= Flags.StrictFunctionName;
  } else if (!isValidIdentifier(context, token)) {
    tolerant(parser, context, Errors.UnexpectedToken, tokenDesc(token));
  }

  const pos = getLocation(parser);
  const name = parser.tokenValue;

  nextToken(parser, context);

  return finishNode(context, parser, pos, {
    type: 'Identifier',
    name,
    optional: false,
    typeAnnotation: parser.token === Token.Colon ? parseTypeAnnotation(parser, context) : null
  });
}

/**
 * ArrayAssignmentPattern[Yield] :
 *   [ Elisionopt AssignmentRestElement[?Yield]opt ]
 *   [ AssignmentElementList[?Yield] ]
 *   [ AssignmentElementList[?Yield] , Elisionopt AssignmentRestElement[?Yield]opt ]
 *
 * AssignmentRestElement[Yield] :
 *   ... DestructuringAssignmentTarget[?Yield]
 *
 * AssignmentElementList[Yield] :
 *   AssignmentElisionElement[?Yield]
 *   AssignmentElementList[?Yield] , AssignmentElisionElement[?Yield]
 *
 * AssignmentElisionElement[Yield] :
 *   Elisionopt AssignmentElement[?Yield]
 *
 * AssignmentElement[Yield] :
 *   DestructuringAssignmentTarget[?Yield] Initializer[In,?Yield]opt
 *
 * DestructuringAssignmentTarget[Yield] :
 *   LeftHandSideExpression[?Yield]
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ArrayAssignmentPattern)
 *
 * @param {Parser} Parser object
 * @param {context} Context masks
 */

function parseArrayAssignmentPattern(parser: IParser, context: Context, args: string[]): ESTree.ArrayPattern {
  const pos = getLocation(parser);

  expect(parser, context, Token.LeftBracket);

  const elements: (ESTree.Node | null)[] = [];

  while (parser.token !== Token.RightBracket) {
    if (consume(parser, context, Token.Comma)) {
      elements.push(null);
    } else {
      if (parser.token === Token.Ellipsis) {
        elements.push(Parser.parseAssignmentRestElement(parser, context, args));
        break;
      } else {
        elements.push(parseExpressionCoverGrammar(parser, context | Context.AllowIn, Parser.parseBindingInitializer));
      }
      if (parser.token !== Token.RightBracket) expect(parser, context, Token.Comma);
    }
  }

  expect(parser, context, Token.RightBracket);

  return finishNode(context, parser, pos, {
    type: 'ArrayPattern',
    elements,
    typeAnnotation: parser.token === Token.Colon ? parseTypeAnnotation(parser, context) : null
  });
}

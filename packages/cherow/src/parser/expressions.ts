import { ParserState, Location } from './../types';
import { Token, KeywordDescTable } from '../token';
import { nextToken } from '../lexer/scan';
import * as ESTree from '../estree';
import { consumeTemplateBrace } from '../lexer/template';
import { Errors, report } from '../errors';
import { parseAssignmentPattern, parseBindingIdentifierOrPattern } from './pattern';
import { parseStatementListItem } from './statements';
import { lookAheadOrScan } from '../lexer/common';
import { parseDirective } from './directives';
import {
  Context,
  Flags,
  LabelState,
  finishNode,
  getLocation,
  addCrossingBoundary,
  optional,
  expect,
  nextTokenIsIdentifierOrLeftParen,
  isStartOfExpression,
  reinterpret
} from '../common';

export function parseExpression(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  const expr = parseAssignmentExpression(state, context);
  if (state.token !== Token.Comma) return expr;
  return parseSequenceExpression(state, context, expr, pos);
}

/**
* Parse secuence expression
*
* @param parser Parser object
* @param context Context masks
*/

export function parseSequenceExpression(
  state: ParserState,
  context: Context,
  left: ESTree.Expression,
  pos: Location,
): ESTree.SequenceExpression {
  const expressions: ESTree.Expression[] = [left];
  while (optional(state, context, Token.Comma)) {
      expressions.push(parseAssignmentExpression(state, context));
  }
  return finishNode(state, context, pos, {
      type: 'SequenceExpression',
      expressions,
  });
}

/**
 * Parse yield expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-YieldExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseYieldExpression(state: ParserState, context: Context, pos: Location): ESTree.YieldExpression | ESTree.Identifier {

 if (context & Context.InParam) report(state, Errors.Unexpected);
 expect(state, context, Token.YieldKeyword);
 let argument: ESTree.Expression | null = null;
 let delegate = false;
 if (!(state.flags & Flags.LineTerminator)) {
      delegate = optional(state, context, Token.Multiply);
      if (delegate || isStartOfExpression(state.token)) {
        argument = parseAssignmentExpression(state, context);
      }
  }
 return finishNode(state, context, pos, {
      type: 'YieldExpression',
      argument,
      delegate,
  });
}

export function parseAssignmentExpression(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  const t = state.token;
  if (context & Context.InGenerator && t === Token.YieldKeyword) return parseYieldExpression(state, context, pos);
  const isAsync = t === Token.AsyncKeyword && lookAheadOrScan(state, context, nextTokenIsIdentifierOrLeftParen, true);
  let expr: any = parseConditionalExpression(state, context, pos);
  if (isAsync) {
      if (state.token & Token.Identifier) {
          expr = parseArrowFunction(state, context, pos, [parseIdentifier(state, context)], true);
          state.assignable = false;
      } else if (state.token & Token.Arrow) {
          expr = parseArrowFunction(state, context, pos, expr, t === Token.AsyncKeyword);
          state.assignable = false;
      }
  } else if (state.token === Token.Arrow) {
      expr = parseArrowFunction(state, context, pos, t & Token.IdentifierOrContextual ? [expr] : expr, false);
      state.assignable = false;
  }
  if (state.token & Token.IsAssignOp) {
      const operator = state.token;
      // if (!state.assignable) report(state, Errors.Unexpected);
      if (state.token === Token.Assign) {
        if (expr.type === 'ArrayExpression' ||
            expr.type === 'ObjectExpression'
          ) {
          reinterpret(state, context, expr);
        }
      }
      nextToken(state, context | Context.ExpressionStart);
      const right = parseAssignmentExpression(state, context);
      return finishNode(state, context, pos, {
          type: 'AssignmentExpression',
          left: expr,
          operator: KeywordDescTable[operator & Token.Type],
          right,
      });
  }
  return expr;
}

/**
* Parse conditional expression
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ConditionalExpression)
*
* @param parser Parser object
* @param context Context masks
*/

function parseConditionalExpression(state: ParserState, context: Context, pos: Location): ESTree.Expression | ESTree.ConditionalExpression {
  // ConditionalExpression ::
  // LogicalOrExpression
  // LogicalOrExpression '?' AssignmentExpression ':' AssignmentExpression
  const test = parseBinaryExpression(state, context, 0, pos);
  if (!optional(state, context | Context.ExpressionStart, Token.QuestionMark)) return test;
  const consequent = parseAssignmentExpression(state, context);
  expect(state, context | Context.ExpressionStart, Token.Colon);
  const alternate = parseAssignmentExpression(state, context);
  return finishNode(state, context, pos, {
      type: 'ConditionalExpression',
      test,
      consequent,
      alternate,
  });
}

/**
* Parse binary expression.
*
* @see [Link](https://tc39.github.io/ecma262/#sec-exp-operator)
* @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
* @see [Link](https://tc39.github.io/ecma262/#sec-additive-operators)
* @see [Link](https://tc39.github.io/ecma262/#sec-bitwise-shift-operators)
* @see [Link](https://tc39.github.io/ecma262/#sec-equality-operators)
* @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
* @see [Link](https://tc39.github.io/ecma262/#sec-relational-operators)
* @see [Link](https://tc39.github.io/ecma262/#sec-multiplicative-operators)
*
* @param parser Parser object
* @param context Context masks
* @param minPrec Minimum precedence value
* @param pos Line / Column info
* @param Left Left hand side of the binary expression
*/
function parseBinaryExpression(
  state: ParserState,
  context: Context,
  minPrec: number,
  pos: Location,
  left: any = parseUnaryExpression(state, context),
): ESTree.Expression {

  // Shift-reduce parser for the binary operator part of the JS expression
  // syntax.
  const bit = (context & Context.DisallowIn) === Context.DisallowIn;
  while (state.token & Token.IsBinaryOp) {
      const t: Token = state.token;
      const prec = t & Token.Precedence;
      const delta = ((t === Token.Exponentiate) as any) << Token.PrecStart;
      if (bit && t === Token.InKeyword) break;
      // When the next token is no longer a binary operator, it's potentially the
      // start of an expression, so we break the loop
      if (prec + delta <= minPrec) break;
      nextToken(state, context | Context.ExpressionStart);
      left = finishNode(state, context, pos, {
          type: t & Token.IsLogical ? 'LogicalExpression' : 'BinaryExpression',
          left,
          right: parseBinaryExpression(state, context, prec,  getLocation(state)),
          operator: KeywordDescTable[t & Token.Type],
      });
  }

  return left;
}

/**
 * Parse await expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AwaitExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location info
 */

function parseAwaitExpression(state: ParserState, context: Context, pos: Location): ESTree.AwaitExpression | ESTree.Identifier | ESTree.ArrowFunctionExpression {
  if (context & Context.InParam) report(state, Errors.Unexpected);
  nextToken(state, context | Context.ExpressionStart);
  return finishNode(state, context, pos, {
      type: 'AwaitExpression',
      argument: parseUnaryExpression(state, context | Context.ExpressionStart),
  });
}

/**
* Parses unary expression
*
* @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
*
* @param parser Parser object
* @param context Context masks
*/
function parseUnaryExpression(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  const t = state.token;
  if (t === Token.AwaitKeyword && context & Context.InAsync) return parseAwaitExpression(state, context, pos);
  if (t & Token.IsUnaryOp) {
      nextToken(state, context | Context.ExpressionStart);
      const argument: ESTree.Expression = parseUnaryExpression(state, context);
      state.assignable = false;
      return finishNode(state, context, pos, {
          type: 'UnaryExpression',
          operator: KeywordDescTable[t & Token.Type],
          argument,
          prefix: true,
      });
  }
  return parseUpdateExpression(state, context);
}

/**
* Parses update expression
*
* @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
*
* @param parser Parser object
* @param context Context masks
*/
function parseUpdateExpression(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  const { token } = state;
  if (state.token & Token.IsUpdateOp) {
      nextToken(state, context);
      const expr = parseLeftHandSideExpression(state, context, pos);
      if (!state.assignable) report(state, Errors.Unexpected);
      return finishNode(state, context, pos, {
          type: 'UpdateExpression',
          argument: expr,
          operator: KeywordDescTable[token & Token.Type],
          prefix: true,
      });
  }

  const expression = parseLeftHandSideExpression(state, context, pos);

  if (state.token & Token.IsUpdateOp && (state.flags & Flags.LineTerminator) < 1) {
      if (!state.assignable) report(state, Errors.Unexpected);
      const operator = state.token;
      nextToken(state, context);
      return finishNode(state, context, pos, {
          type: 'UpdateExpression',
          argument: expression,
          operator: KeywordDescTable[operator & Token.Type],
          prefix: false,
      });
  }

  return expression;
}

/**
* Parse left hand side expression
*
* @see [Link](https://tc39.github.io/ecma262/#prod-LeftHandSideExpression)
*
* @param Parser Parer instance
* @param Context Contextmasks
* @param pos Location info
*/
export function parseLeftHandSideExpression(state: ParserState, context: Context, pos: Location): any {
  // LeftHandSideExpression ::
  //   (NewExpression | MemberExpression) ...
  let expr = parseNewOrMemberExpression(state, context);

  while (true) {
      switch (state.token) {
          case Token.Period:
              state.assignable = true;
              nextToken(state, context);
              expr = finishNode(state, context, pos, {
                  type: 'MemberExpression',
                  object: expr,
                  computed: false,
                  property: parseIdentifier(state, context),
              });
              continue;
          case Token.LeftBracket:
              state.assignable = true;
              nextToken(state, context);
              expr = finishNode(state, context, pos, {
                  type: 'MemberExpression',
                  object: expr,
                  computed: true,
                  property: parseExpression(state, context),
              });
              expect(state, context, Token.RightBracket);
              break;
          case Token.LeftParen:
              state.assignable = false;
              const args = parseArgumentList(state, context);
              if (state.token === Token.Arrow) return args;
              expr = finishNode(state, context, pos, {
                  type: 'CallExpression',
                  callee: expr,
                  arguments: args,
              });
              break;
          case Token.TemplateTail:
              state.assignable = false;
              expr = finishNode(state, context, pos, {
                type: 'TaggedTemplateExpression',
                tag: expr,
                quasi: parseTemplateLiteral(state, context),
            });
              break;
          case Token.TemplateCont:
              state.assignable = false;
              expr = finishNode(state, context, pos, {
                type: 'TaggedTemplateExpression',
                tag: expr,
                quasi: parseTemplate(state, context | Context.TaggedTemplate),
            });
              break;
          default:
              return expr;
      }
  }
}

/**
 * Parse super property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SuperProperty)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseSuperProperty(state: ParserState, context: Context, pos: Location): ESTree.Super {
  return finishNode(state, context, pos, {
      type: 'Super',
  });
}

/**
 * Parse meta property
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param meta Identifier
 * @param pos Location
 */

function parseMetaProperty(state: ParserState, context: Context, meta: ESTree.Identifier, pos: Location): ESTree.MetaProperty {
  return finishNode(state, context, pos, {
      meta,
      type: 'MetaProperty',
      property: parseIdentifier(state, context),
  });
}

export function parseNewTargetExpression(state: ParserState, context: Context, id: ESTree.Identifier, pos: Location): any {
  if (context & Context.NewTarget && state.tokenValue === 'target') {
      return parseMetaProperty(state, context, id, pos);
  }
  report(state, Errors.Unexpected);
}

export function parseNewOrMemberExpression(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  if (state.token === Token.NewKeyword) {
    let result: any;
    const id = parseIdentifier(state, context | Context.ExpressionStart);
    if (state.token === Token.SuperKeyword) {
      state.assignable = false;
      result = parseSuperProperty(state, context, pos);
    } else if (optional(state, context, Token.Period)) {
      state.assignable = false;
      return parseNewTargetExpression(state, context, id, pos);
    } else {
      state.assignable = false;
      result = parseNewOrMemberExpression(state, context);
    }

    return finishNode(state, context, pos, {
      type: 'NewExpression',
      callee: result,
      arguments: state.token === Token.LeftParen ? parseArgumentList(state, context) : [],
  });
  }

  return parseMemberExpression(state, context, pos);
}

/**
 * Parse member expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location info
 * @param expr Expression
 */

function parseMemberExpression(
  state: ParserState,
  context: Context,
  pos: Location
): ESTree.Expression {
  let result: any;
  if (state.token === Token.SuperKeyword) {
      result = parseSuperProperty(state, context, pos);
  } else if (state.token === Token.ImportKeyword) {
      result = parseImportExpressions(state, context, pos);
  } else {
      result = parsePrimaryExpression(state, context, pos);
  }

  return parseMemberExpressionContinuation(state, context, result, pos);
}

/**
 * Parse Import() expressions. (Stage 3 proposal)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location
 */
function parseImportExpressions(state: ParserState, context: Context, pos: Location): ESTree.Expression {
  const id = parseIdentifier(state, context);
  // Import.meta - Stage 3 proposal
  if (optional(state, context, Token.Period)) {
      if (!(context & Context.Module) || state.tokenValue !== 'meta') {
          report(state, Errors.Unexpected);
      }
      return parseMetaProperty(state, context, id, pos);
  }

  let expr: any = parseImportCall(state, context, pos);
  expect(state, context, Token.LeftParen);
  const args = parseAssignmentExpression(state, context);
  expect(state, context, Token.RightParen);
  expr = finishNode(state, context, pos, {
      type: 'CallExpression',
      callee: expr,
      arguments: [args],
  });
  return expr;
}

/**
 * Parse Import() expression. (Stage 3 proposal)
 *
 */
function parseImportCall(state: ParserState, context: Context, pos: Location): ESTree.ImportExpression {
  return finishNode(state, context, pos, {
      type: 'Import',
  });
}

/**
 * Parse member expression continuation
 *
 * @param parser Parser object
 * @param context Context masks
 * @param pos Location info
 * @param expr Expression
 */
function parseMemberExpressionContinuation(state: ParserState, context: Context, expr: any, pos: Location) {
  while (true) {
    switch (state.token) {
        case Token.Period:
            state.assignable = true;
            nextToken(state, context);
            expr = finishNode(state, context, pos, {
                type: 'MemberExpression',
                object: expr,
                computed: false,
                property: parseIdentifier(state, context),
            });
            continue;
        case Token.LeftBracket:
            state.assignable = true;
            nextToken(state, context);
            expr = finishNode(state, context, pos, {
                type: 'MemberExpression',
                object: expr,
                computed: true,
                property: parseExpression(state, context),
            });
            expect(state, context, Token.RightBracket);
            break;
            case Token.TemplateTail:
            state.assignable = false;
            expr = finishNode(state, context, pos, {
              type: 'TaggedTemplateExpression',
              tag: expr,
              quasi: parseTemplateLiteral(state, context),
          });
            break;
        case Token.TemplateCont:
            state.assignable = false;
            expr = finishNode(state, context, pos, {
              type: 'TaggedTemplateExpression',
              tag: expr,
              quasi: parseTemplate(state, context | Context.TaggedTemplate),
          });
            break;
        default:
            return expr;
    }
}
}

/**
 * Parse argument list
 *
 * @see [https://tc39.github.io/ecma262/#prod-ArgumentList)
 *
 * @param Parser Parser object
 * @param Context Context masks
 */
function parseArgumentList(state: ParserState, context: Context): (ESTree.Expression | ESTree.SpreadElement)[] {
  nextToken(state, context | Context.ExpressionStart);
  const expressions: (ESTree.Expression | ESTree.SpreadElement)[] = [];
  while (state.token !== Token.RightParen) {
      if (state.token === Token.Ellipsis) {
        expressions.push(parseSpreadElement(state, context));
      } else {
          expressions.push(parseAssignmentExpression(state, context));
      }

      if (state.token !== Token.RightParen) expect(state, context | Context.ExpressionStart, Token.Comma);
  }

  expect(state, context, Token.RightParen);
  return expressions;
}

/**
 * Parse template literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TemplateLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseTemplateLiteral(parser: ParserState, context: Context): ESTree.TemplateLiteral {
  const pos = getLocation(parser);
  return finishNode(parser, context, pos, {
      type: 'TemplateLiteral',
      expressions: [],
      quasis: [parseTemplateSpans(parser, context)],
  });
}

/**
* Parse template head
*
* @param parser Parser object
* @param context Context masks
* @param cooked Cooked template value
* @param raw Raw template value
* @param pos Current location
*/

function parseTemplateHead(
parser: ParserState,
context: Context,
cooked: string | null = null,
raw: string | null,
pos: Location
): ESTree.TemplateElement {
  parser.token = consumeTemplateBrace(parser, context);

  return finishNode(parser, context, pos, {
      type: 'TemplateElement',
      value: {
          cooked,
          raw,
      },
      tail: false,
  });
}

/**
* Parse template
*
* @param parser Parser object
* @param context Context masks
* @param expression Expression AST node
* @param quasis Array of Template elements
*/

function parseTemplate(
  parser: ParserState,
  context: Context,
  expressions: ESTree.Expression[] = [],
  quasis: ESTree.TemplateElement[] = [],
): ESTree.TemplateLiteral {
  const pos = getLocation(parser);
  const { tokenValue, tokenRaw } = parser;

  expect(parser, context, Token.TemplateCont);

  expressions.push(parseExpression(parser, context));
  const t = getLocation(parser);
  quasis.push(parseTemplateHead(parser, context, tokenValue, tokenRaw, pos));

  if (parser.token === Token.TemplateTail) {
      quasis.push(parseTemplateSpans(parser, context, t));
  } else {
      parseTemplate(parser, context, expressions, quasis);
  }

  return finishNode(parser, context, pos, {
      type: 'TemplateLiteral',
      expressions,
      quasis,
  });
}

/**
* Parse template spans
*
* @see [Link](https://tc39.github.io/ecma262/#prod-TemplateSpans)
*
* @param parser Parser object
* @param context Context masks
* @param loc Current AST node location
*/

function parseTemplateSpans(state: ParserState, context: Context, pos: Location = getLocation(state)): ESTree.TemplateElement {
  const { tokenValue, tokenRaw } = state;

  expect(state, context, Token.TemplateTail);

  return finishNode(state, context, pos, {
      type: 'TemplateElement',
      value: {
          cooked: tokenValue,
          raw: tokenRaw,
      },
      tail: true,
  });
}

export function parsePrimaryExpression(
  state: ParserState,
  context: Context,
  pos: Location): any {
      switch (state.token) {
      case Token.Eval:
      case Token.Arguments:
      case Token.LetKeyword:
      case Token.StaticKeyword:
      case Token.YieldKeyword:
      case Token.AwaitKeyword:
      case Token.FutureReserved:
      case Token.EscapedStrictReserved:
      case Token.Identifier:
          state.assignable = true;
          return parseIdentifier(state, context | Context.TaggedTemplate);
      case Token.StringLiteral:
      case Token.NumericLiteral:
          state.assignable = true;
          return parseLiteral(state, context);
      case Token.BigInt:
          state.assignable = false;
          return parseBigIntLiteral(state, context);
      case Token.RegularExpression:
          state.assignable = false;
          return parseRegularExpressionLiteral(state, context);
      case Token.FalseKeyword:
      case Token.TrueKeyword:
      case Token.NullKeyword:
          state.assignable = false;
          return parseNullOrTrueOrFalseLiteral(state, context);
      case Token.ThisKeyword:
          state.assignable = false;
          return parseThisExpression(state, context);
      case Token.FunctionKeyword:
          return parseFunctionExpression(state, context, pos, false);
      case Token.ClassKeyword:
          return parseClassExpression(state, context);
      case Token.AsyncKeyword:
          const expr = parseIdentifier(state, context);
          if (state.flags & Flags.LineTerminator) {
            if (context & Context.Strict) report(state, Errors.Unexpected);
            return expr;
          }
          if (state.token === Token.FunctionKeyword) {
            return parseFunctionExpression(state, context, pos, true);
          }
          return expr;
      case Token.TemplateTail:
          state.assignable = false;
          return parseTemplateLiteral(state, context);
      case Token.TemplateCont:
          state.assignable = false;
          return parseTemplate(state, context);
      case Token.LeftBracket:
          return parseArrayLiteral(state, context);
      case Token.LeftBrace:
          return parseObjectLiteral(state, context);
      case Token.LeftParen:
          return parseGroupExpression(state, context);
      default:
      if (state.token & Token.IdentifierOrContextual) return parseIdentifier(state, context | Context.TaggedTemplate);
      report(state, Errors.Unexpected);
  }
}

/**
 * Parse regular expression literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseRegularExpressionLiteral(state: ParserState, context: Context): ESTree.RegExpLiteral {
  const pos = getLocation(state);
  const tokenRegExp = state.tokenRegExp;
  const tokenValue = state.tokenValue;
  const tokenRaw = state.tokenRaw;
  nextToken(state, context);
  const node: any = finishNode(state, context, pos, {
      type: 'Literal',
      value: tokenValue,
      regex: tokenRegExp,
  });

  if (context & Context.OptionsRaw) node.raw = tokenRaw;

  return node;
}

/**
 * Parse object spread properties
 *
 * @see [Link](https://tc39.github.io/proposal-object-rest-spread/#Spread)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseSpreadProperties(state: ParserState, context: Context): ESTree.SpreadElement {
  const pos = getLocation(state);
  expect(state, context, Token.Ellipsis);
  const argument = parseAssignmentExpression(state, context);
  return finishNode(state, context, pos, {
      type: 'SpreadElement',
      argument,
  });
}

/**
 * Parses object literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ObjectLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseObjectLiteral(state: ParserState, context: Context): any {
  const pos = getLocation(state);
  const properties: any[] = [];
  nextToken(state, context);
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  while (state.token !== Token.RightBrace) {
    properties.push(state.token === Token.Ellipsis ?
      parseSpreadProperties(state, context) :
      parsePropertyDefinition(state, context));
    if (state.token !== Token.RightBrace) {
      expect(state, context, Token.Comma);
    }
  }
  expect(state, context, Token.RightBrace);

  state.assignable = true;

  return finishNode(state, context, pos, {
    type: 'ObjectExpression',
    properties,
});
}

function parsePropertyDefinition(state: ParserState, context: Context): ESTree.Property {
  const pos = getLocation(state);
  let key;
  let value;
  let kind = 'init';
  let shorthand = false;
  let method = false;
  let token = state.token;
  let isComputed = false;
  let isGenerator = optional(state, context | Context.ExpressionStart, Token.Multiply);
  let isAsync = false;
  if (state.token & Token.Literal) {
      key = parseLiteral(state, context);
      if (state.token === Token.LeftParen) {
          method = true;
          value = parseMethodDeclaration(state, context, isGenerator, isAsync);
      } else {
          expect(state, context | Context.ExpressionStart, Token.Colon);
          value = parseAssignmentExpression(state, context);
      }
  } else if (state.token & (Token.IdentifierOrContextual | Token.Reserved | Token.FutureReserved)) {
      token = state.token;
      key = parseIdentifier(state, context);

      if (state.token & (Token.IdentifierOrContextual | Token.StringLiteral | Token.NumericLiteral)) {
          if (token === Token.AsyncKeyword) {
              kind = 'init';
              method = true;
              isAsync = true;
              isGenerator = optional(state, context | Context.ExpressionStart, Token.Multiply);
              key = state.token & Token.IdentifierOrContextual ? parseIdentifier(state, context) : parseLiteral(state, context);
          } else {
              kind = token === Token.GetKeyword ? 'get' : token === Token.SetKeyword ? 'set' : 'init';
              key = parseIdentifier(state, context);

          }
          value = parseMethodDeclaration(state, context, isGenerator, isAsync);
      } else if (state.token & Token.FutureReserved) {
            key = parseIdentifier(state, context);
            isAsync = token === Token.AsyncKeyword;
            kind = token === Token.GetKeyword ? 'get' : token === Token.SetKeyword ? 'set' : 'init';
            value = parseMethodDeclaration(state, context, isGenerator, isAsync);
      } else if (state.token === Token.LeftBracket) {
          nextToken(state, context);
          key = parseAssignmentExpression(state, context);
          expect(state, context, Token.RightBracket);
          isAsync = token === Token.AsyncKeyword;
          kind = token === Token.GetKeyword ? 'get' : token === Token.SetKeyword ? 'set' : 'init';
          method = token === Token.AsyncKeyword;
          value = parseMethodDeclaration(state, context, isGenerator, isAsync);
      } else if (state.token === Token.Multiply) {
        isGenerator = optional(state, context | Context.ExpressionStart, Token.Multiply);
        if (token === Token.GetKeyword || token === Token.SetKeyword) report(state, Errors.Unexpected);
        isAsync = token === Token.AsyncKeyword;
        method = true;
        key = parseIdentifier(state, context);
        value = parseMethodDeclaration(state, context, isGenerator, isAsync);
      } else if (state.token === Token.LeftParen) {
          method = true;
          value = parseMethodDeclaration(state, context, isGenerator, isAsync);
      } else if (optional(state, context | Context.ExpressionStart, Token.Colon)) {
          value = parseAssignmentExpression(state, context);
      } else if (optional(state, context, Token.Assign)) {
          shorthand = true;
          value = parseAssignmentPattern(state, context, key, pos);
      } else {
          shorthand = true;
          value = key;
      }
  } else if (state.token === Token.LeftBracket) {

      nextToken(state, context);
      isComputed = true;
      key = parseAssignmentExpression(state, context);
      expect(state, context, Token.RightBracket);

      if (state.token === Token.LeftParen) {
          method = true;
          value = parseMethodDeclaration(state, context, isGenerator, isAsync);
      } else if (optional(state, context | Context.ExpressionStart, Token.Colon)) {
          value = parseAssignmentExpression(state, context);
      } else if (optional(state, context, Token.Assign)) {
          shorthand = true;
          value = parseAssignmentPattern(state, context, key, pos);
      } else {
          shorthand = true;
          value = key;
      }
  } else {
      report(state, Errors.Unexpected);
  }

  return finishNode(state, context, pos, {
      type: 'Property',
      key,
      value,
      kind,
      computed: isComputed,
      method,
      shorthand,
  });
}

function parseArrowFunction(
  state: ParserState,
  context: Context,
  pos: Location,
  params: any[],
  isAsync: boolean
): ESTree.ArrowFunctionExpression {
  nextToken(state, context);
  const expression = state.token !== Token.LeftBrace;
  for (const i in params) reinterpret(state, context | Context.InParam, params[i]);
  context = (context | Context.InGenerator) ^ Context.InGenerator;
  context = (context | Context.InAsync) ^ Context.InAsync;
  context = (context | Context.InParam) ^ Context.InParam;

  if (isAsync) context = context | Context.InAsync;

  const body = expression ? parseAssignmentExpression(state, context) : parseFunctionBody(state, context | Context.InFunctionBody | Context.ExpressionStart);
  return finishNode(state, context, pos, {
      type: 'ArrowFunctionExpression',
      body,
      params,
      id: null,
      async: isAsync,
      generator: false,
      expression,
  });
}

function parseGroupExpression(state: ParserState, context: Context): any {
  nextToken(state, context | Context.ExpressionStart);
  if (state.token === Token.RightParen) {
      nextToken(state, context);
      if (state.token !== Token.Arrow) report(state, Errors.Unexpected);
      state.assignable = false;
      return [];
  } else if (state.token === Token.Ellipsis) {
      const rest = [parseRestElement(state, context)];
      expect(state, context, Token.RightParen);
      if (state.token !== Token.Arrow) report(state, Errors.Unexpected);
      state.assignable = false;
      return rest;
  }
  state.assignable = true;
  const pos = getLocation(state);
  let expr = parseAssignmentExpression(state, context);
  if (state.token === Token.Comma) {
      const expressions: (ESTree.Expression | ESTree.RestElement)[] = [expr];
      while (optional(state, context | Context.ExpressionStart, Token.Comma)) {
          if (state.token === Token.Ellipsis) {
              const restElement = parseRestElement(state, context);
              expect(state, context, Token.RightParen);
              if (state.token !== Token.Arrow) report(state, Errors.Unexpected);
              expressions.push(restElement);
              return expressions;
          } else if (optional(state, context, Token.RightParen)) {
              if (state.token !== Token.Arrow) report(state, Errors.Unexpected);
              return expressions;
          } else {
              expressions.push(parseAssignmentExpression(state, context));
          }
      }

      expr = finishNode(state, context, pos, {
          type: 'SequenceExpression',
          expressions,
      });
      state.assignable = false;
  }
  expect(state, context, Token.RightParen);
  if (state.token === Token.Arrow) return expr.type === 'SequenceExpression' ? expr.expressions : [expr];

  return expr;
}

function parseSpreadElement(state: ParserState, context: Context): ESTree.SpreadElement {
  const pos = getLocation(state);
  expect(state, context | Context.ExpressionStart, Token.Ellipsis);
  const argument = parseAssignmentExpression(state, context);
  return finishNode(state, context, pos, {
      type: 'SpreadElement',
      argument,
  });
}

function parseArrayLiteral(state: ParserState, context: Context): ESTree.ArrayExpression {
  const pos = getLocation(state);
  nextToken(state, context | Context.ExpressionStart);
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  const elements: (ESTree.Expression | ESTree.SpreadElement | null)[] = [];
  while (state.token !== Token.RightBracket) {
      if (optional(state, context | Context.ExpressionStart, Token.Comma)) {
          elements.push(null);
      } else if (state.token === Token.Ellipsis) {
          elements.push(parseSpreadElement(state, context));
          if (state.token !== Token.RightBracket) {
              expect(state, context, Token.Comma);
          }
      } else {
          elements.push(parseAssignmentExpression(state, context));
          if (state.token !== Token.RightBracket) expect(state, context | Context.ExpressionStart, Token.Comma);
      }
  }

  expect(state, context, Token.RightBracket);
  state.assignable = true;
  return finishNode(state, context, pos, {
      type: 'ArrayExpression',
      elements,
  });
}

/**
 * Parses BigInt literal (stage 3 proposal)
 *
 * @see [Link](https://tc39.github.io/proposal-bigint/)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBigIntLiteral(state: ParserState, context: Context): ESTree.BigIntLiteral {
  const pos = getLocation(state);
  const tokenValue = state.tokenValue;
  const tokenRaw = state.tokenRaw;
  nextToken(state, context);
  return finishNode(state, context, pos, {
      type: 'Literal',
      value: tokenValue,
      bigint: tokenRaw,
      raw: tokenRaw,
  });
}
/**
 * Parses either null or boolean literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BooleanLiteral)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseNullOrTrueOrFalseLiteral(state: ParserState, context: Context): ESTree.Literal {
  const pos = getLocation(state);
  const t = state.token;
  const raw = KeywordDescTable[t & Token.Type];
  nextToken(state, context);
  return finishNode(state, context, pos, {
      type: 'Literal',
      value: t === Token.NullKeyword ? null : raw === 'true',
  });
}

/**
 * Parse this expression
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseThisExpression(state: ParserState, context: Context): ESTree.ThisExpression {
  const pos = getLocation(state);
  nextToken(state, context);
  return finishNode(state, context, pos, {
       type: 'ThisExpression',
   });
}

export function parseIdentifier(state: ParserState, context: Context): ESTree.Identifier {
  const pos = getLocation(state);
  const tokenValue = state.tokenValue;
  nextToken(state, context);
  return finishNode(state, context, pos, {
      type: 'Identifier',
      name: tokenValue
  });
}

export function parseLiteral(state: ParserState, context: Context): ESTree.Literal {
  const pos = getLocation(state);
  const tokenValue = state.tokenValue;
  const tokenRaw = state.tokenRaw;
  nextToken(state, context);
  return finishNode(state, context, pos, {
      type: 'Literal',
      value: tokenValue,
      raw: tokenRaw
  });
}

export function parseFunctionExpression(state: ParserState, context: Context, pos: Location, isAsync: boolean): ESTree.FunctionExpression {
  nextToken(state, context | Context.ExpressionStart);
  const isGenerator = optional(state, context | Context.ExpressionStart, Token.Multiply);
  let id: ESTree.Identifier | null = null;
  if (state.token & (Token.FunctionExprIdentifier | Token.FutureReserved)) {
      id = parseIdentifier(state, context);
  }
  context = (context | Context.InGenerator) ^ Context.InGenerator;
  context = (context | Context.InAsync) ^ Context.InAsync;

  if (isGenerator) context = context | Context.InGenerator;
  if (isAsync) context = context | Context.InAsync;

  const params = parseFormalParameters(state, context | Context.NewTarget | Context.InParam);
  const body = parseFunctionBody(state, context | Context.NewTarget | Context.InFunctionBody);

  return finishNode(state, context, pos, {
      type: 'FunctionExpression',
      params,
      body,
      async: isAsync,
      generator: isGenerator,
      expression: false,
      id,
  });
}
export function parseFormalParameters(state: ParserState, context: Context): any {
  expect(state, context, Token.LeftParen);
  const params: (ESTree.ArrayPattern | ESTree.RestElement | ESTree.ObjectPattern | ESTree.Identifier)[] = [];
  while (state.token !== Token.RightParen) {
      if (state.token === Token.Ellipsis) {
          params.push(parseRestElement(state, context));
          break;
      }
      params.push(parseFormalParameterList(state, context));
      if (!optional(state, context, Token.Comma)) break;
      if (state.token === Token.RightParen) break;
  }
  expect(state, context, Token.RightParen);
  return params;
}

export function parseFormalParameterList(
  state: ParserState,
  context: Context
): ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.RestElement {
  const pos = getLocation(state);
  const left: any = parseBindingIdentifierOrPattern(state, context);
  if (!optional(state, context, Token.Assign)) return left;
  return finishNode(state, context, pos, {
      type: 'AssignmentPattern',
      left,
      right: parseAssignmentExpression(state, context),
  });
}

export function parseFunctionBody(state: ParserState, context: Context): ESTree.BlockStatement {
  const pos = getLocation(state);
  nextToken(state, context);
  const body: ESTree.Statement[] = [];
  if (state.token !== Token.RightBrace) {
      // Note: A separate "while" loop is used to avoid unseting the
      // mutual flags within the iteration loop itself.
      while (state.token & Token.StringLiteral) {
          if (state.tokenValue.length === 10 && state.tokenValue === 'use strict') {
              if (state.flags & Flags.SimpleParameterList) report(state, Errors.Unexpected);
              context |= Context.Strict;
          }
          body.push(parseDirective(state, context));
      }

      const previousSwitchStatement = state.switchStatement;
      const previousIterationStatement = state.iterationStatement;

      if ((state.switchStatement & LabelState.Iteration) === LabelState.Iteration) {
          state.switchStatement = LabelState.CrossingBoundary;
      }

      if ((state.iterationStatement & LabelState.Iteration) === LabelState.Iteration) {
          state.iterationStatement = LabelState.CrossingBoundary;
      }

      addCrossingBoundary(state);

      while (state.token !== Token.RightBrace) {
          body.push(parseStatementListItem(state, context));
      }
      state.labelDepth--;
      state.switchStatement = previousSwitchStatement;
      state.iterationStatement = previousIterationStatement;
  }
  expect(state, context, Token.RightBrace);
  return finishNode(state, context, pos, {
      type: 'BlockStatement',
      body,
  });
}

export function parseClassExpression(state: ParserState, context: Context): ESTree.ClassExpression {
  const pos = getLocation(state);
  nextToken(state, context);
  context = context |= Context.Strict;
  let id: ESTree.Expression | null = null;
  let superClass: ESTree.Expression | null = null;
  if (state.token !== Token.LeftBrace && state.token !== Token.ExtendsKeyword) {
    id = parseIdentifier(state, context);
  }
  if (optional(state, context, Token.ExtendsKeyword)) {
    superClass = parseLeftHandSideExpression(state, context | Context.Strict, pos);
  }
  const body = parseClassBodyAndElementList(state, context);

  return finishNode(state, context, pos, {
      type: 'ClassExpression',
      id,
      superClass,
      body,
  });
}

/**
 * Parse class body and element list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassBody)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassElementList)
 *
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseClassBodyAndElementList(state: ParserState, context: Context): ESTree.ClassBody {
  const pos = getLocation(state);
  expect(state, context | Context.ExpressionStart, Token.LeftBrace);
  const body: any[] = [];
  while (state.token !== Token.RightBrace) {
      if (!optional(state, context, Token.Semicolon)) {
          body.push(parseClassElement(state, context));
      }
  }

  expect(state, context | Context.ExpressionStart, Token.RightBrace);
  return finishNode(state, context, pos, {
      type: 'ClassBody',
      body,
  });
}

export function parseClassElement(state: ParserState, context: Context): ESTree.ClassBody {
  const pos = getLocation(state);
  let key;
  let value;
  let isStatic = false;
  let isComputed = false;
  let kind = 'method';
  let isGenerator = optional(state, context, Token.Multiply);
  let isAsync = false;
  let token = state.token;
  if (token & Token.Literal) {
      key = parseLiteral(state, context);
      value = parseMethodDeclaration(state, context, isGenerator, isAsync);
  } else if (token & Token.IdentifierOrContextual) {
      kind = state.token === Token.ConstructorKeyword ? 'constructor' : 'method';
      token = state.token;
      key = parseIdentifier(state, context);
      if (state.token & Token.IdentifierOrContextual) {
          kind = token === Token.SetKeyword ? 'set' : token === Token.GetKeyword ? 'get' : 'method';
          isAsync = token === Token.AsyncKeyword;
          key = parseIdentifier(state, context);
      } else if (state.token === Token.LeftBracket) {
          isAsync = token === Token.AsyncKeyword;
          isComputed = true;
          kind = token === Token.SetKeyword ? 'set' : token === Token.GetKeyword ? 'get' : 'method';
          nextToken(state, context);
          key = parseAssignmentExpression(state, context);
          expect(state, context, Token.RightBracket);
      }
      value = parseMethodDeclaration(state, context, isGenerator, isAsync);

  } else if (token === Token.StaticKeyword) {
      key = parseIdentifier(state, context);
      if (state.token !== Token.Colon && state.token !== Token.LeftBrace && state.token !== Token.Assign) {
          isStatic = true;
          isGenerator = optional(state, context, Token.Multiply);
          if (state.token === Token.AsyncKeyword) {
              isAsync = true;
              isGenerator = optional(state, context, Token.Multiply);
              token = state.token;
              key = parseIdentifier(state, context);
          }
          if (state.token === Token.GetKeyword) {
              isGenerator = optional(state, context, Token.Multiply);
              kind = state.token === Token.LeftBracket ? 'method' : 'get';
              token = state.token;
              key = parseIdentifier(state, context);
          } else if (state.token === Token.SetKeyword) {
              isGenerator = optional(state, context, Token.Multiply);
              token = state.token;
              key = parseIdentifier(state, context);
          }
          if (state.token === Token.LeftBracket) {
              isComputed = true;
              kind = token === Token.SetKeyword ? 'set' : token === Token.GetKeyword ? 'get' : 'method';
              key = parseComputedPropertyName(state, context);
          } else key = parseIdentifier(state, context);
      }
      value = parseMethodDeclaration(state, context, isGenerator, isAsync);
  } else if (state.token === Token.LeftBracket) {
      isAsync = token === Token.AsyncKeyword;
      isComputed = true;
      nextToken(state, context);
      key = parseAssignmentExpression(state, context);
      expect(state, context, Token.RightBracket);
      value = parseMethodDeclaration(state, context, isGenerator, isAsync);
  } else {
      report(state, Errors.Unexpected);
  }
  return finishNode(state, context, pos, {
      type: 'MethodDefinition',
      kind,
      static: isStatic,
      computed: isComputed,
      key,
      value,
  });
}

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseMethodDeclaration(state: ParserState, context: Context, isGenerator: boolean, isAsync: boolean): ESTree.FunctionExpression {

  const pos = getLocation(state);

  context = (context | Context.InGenerator) ^ Context.InGenerator;
  context = (context | Context.InAsync) ^ Context.InAsync;
  context = (context | Context.InParam) ^ Context.InParam;

  if (isGenerator) context = context | Context.InGenerator;
  if (isAsync) context = context | Context.InAsync;

  const params = parseFormalParameters(state, context | Context.NewTarget | Context.InParam);
  const body = parseFunctionBody(state, context | Context.NewTarget | Context.InFunctionBody);

  return finishNode(state, context, pos, {
      type: 'FunctionExpression',
      params,
      body,
      async: isAsync,
      generator: isGenerator,
      expression: false,
      id: null,
  });
}

/**
 * Parse computed property names
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ComputedPropertyName)
 *
 * @param parser Parser object
 * @param context Context masks
 */

function parseComputedPropertyName(state: ParserState, context: Context): ESTree.Expression {
  expect(state, context, Token.LeftBracket);
  const key: ESTree.Expression = parseAssignmentExpression(state, context);
  expect(state, context, Token.RightBracket);
  return key;
}

/**
* Parse property name
*
* @see [Link](https://tc39.github.io/ecma262/#prod-PropertyName)
*
* @param parser Parser object
* @param context Context masks
*/

export function parsePropertyName(state: ParserState, context: Context): ESTree.Expression {
  switch (state.token) {
      case Token.NumericLiteral:
      case Token.StringLiteral:
          return parseLiteral(state, context);
      case Token.LeftBracket:
          return parseComputedPropertyName(state, context);
      default:
          return parseIdentifier(state, context);
  }
}

/**
 * Parse assignment rest element
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentRestElement)
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function parseRestElement(state: ParserState, context: Context): ESTree.RestElement {
  const pos = getLocation(state);
  expect(state, context, Token.Ellipsis);
  const argument = parseBindingIdentifierOrPattern(state, context);
  return finishNode(state, context, pos, {
      type: 'RestElement',
      argument,
  });
}

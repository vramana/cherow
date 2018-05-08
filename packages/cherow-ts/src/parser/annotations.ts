import {
  IParser,
  Location,
  report,
  Errors,
  Token,
  tokenDesc,
  Parser,
  Context,
  Flags,
  getLocation,
  consume,
  finishNode,
  expect,
  consumeSemicolon,
  nextToken
} from 'cherow';
import { parseIdentifier } from './expressions';

// AST from Babylon / ESLint

/*
 * Parses mapped type parameter
 *
 * @param {Parser} parser object
 * @param {Context} context Context masks
 * @returns {*}
 */
function parseMappedTypeParameter(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  const name = parseIdentifier(parser, context);
  expect(parser, context, Token.InKeyword);
  const constraint = parseType(parser, context);
  return finishNode(context, parser, pos, {
    type: 'TypeParameter',
    name
  } as any);
}

/*
* Parser TS intersection types
*
* @param {Parser} parser Parser object
* @param {Context} context Context masks
* @returns {*}
*/

function parseIntersectionType(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  const tsType = parseTypeOperator(parser, context);

  if (parser.token !== Token.BitwiseAnd) return tsType;
  const types = [tsType];
  while (consume(parser, context, Token.BitwiseAnd)) {
    types.push(parseTypeOperator(parser, context));
  }
  return finishNode(context, parser, pos, {
    type: 'TSIntersectionType',
    types
  } as any);
}

/*
* Parse TS union types
*
* @param parser Parser object
* @param context Context masks
*/
function parseUnionType(parser: IParser, context: Context): any {
  const pos = getLocation(parser);

  const tsType = parseIntersectionType(parser, context);

  if (parser.token !== Token.BitwiseOr) return tsType;

  const types = [tsType];

  while (consume(parser, context, Token.BitwiseOr)) {
    types.push(parseIntersectionType(parser, context));
  }

  return finishNode(context, parser, pos, {
    type: 'TSUnionType',
    types
  } as any);
}

function parseType(parser: IParser, context: Context): any {
  return parseUnionType(parser, context);
}

function parseBindingList(parser: IParser, context: Context): any {
  return parseIdentifier(parser, context);
}

function parseMappedType(parser: IParser, context: Context, pos: Location): any {
  const readonly = consume(parser, context, Token.ReadOnlyKeyword);
  expect(parser, context, Token.LeftBracket);
  const typeParameter = parseMappedTypeParameter(parser, context);
  expect(parser, context, Token.RightBracket);
  const optional = consume(parser, context, Token.QuestionMark);
  let typeAnnotation;
  if (consume(parser, context, Token.Colon)) typeAnnotation = parseType(parser, context);
  consumeSemicolon(parser, context);
  expect(parser, context, Token.RightBrace);

  return finishNode(context, parser, pos, {
    type: 'TSMappedType',
    readonly,
    typeParameter,
    optional,
    typeAnnotation
  } as any);
}

function parseIdentifierTypedNode(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  const tsType: any = keywordTypeFromName(parser.tokenValue);
  if (tsType) {
    expect(parser, context, Token.Identifier);
    return finishNode(context, parser, pos, {
      type: keywordTypeFromName(parser.tokenValue)
    } as any);
  }
  return parseTypeReference(parser, context);
}

function parseEntityName(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  let entity = parseIdentifier(parser, context);

  while (consume(parser, context, Token.Period)) {
    entity = finishNode(context, parser, pos, {
      type: 'TSQualifiedName',
      left: entity,
      right: parseIdentifier(parser, context)
    } as any);
  }

  return entity;
}

function parseTypeArgumentElements(parser: IParser, context: Context): any {
  const params: any = [];
  expect(parser, context, Token.LessThan);

  while (parser.token !== Token.GreaterThan) {
    params.push(parseType(parser, context));
  }

  expect(parser, context, Token.GreaterThan);
  return params;
}

function parseTypeArguments(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  const params = parseTypeArgumentElements(parser, context);

  return finishNode(context, parser, pos, {
    type: 'TypeParameterInstantiation',
    params
  } as any);
}

function parseTypeReference(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  const typeName = parseEntityName(parser, context);
  let typeParameters: any = [];

  if (!(parser.flags & Flags.NewLine) && parser.token === Token.LessThan) {
    typeParameters = parseTypeArguments(parser, context);
  }
  return finishNode(context, parser, pos, {
    type: 'TSTypeReference',
    typeName,
    typeParameters
  } as any);
}

function parseNullTypedNode(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.NullKeyword);
  return finishNode(context, parser, pos, {
    type: 'TSNullKeyword'
  } as any);
}

function parseSubtractTypeNode(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.Subtract);
  // has to be followed by a numeric value
  if (parser.token !== Token.NumericLiteral) report(parser, Errors.Unexpected);

  return finishNode(context, parser, pos, {
    type: 'TSLiteralType',
    literal: Parser.parseLiteral(parser, context)
  } as any);
}

function parseThisTypeNode(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.ThisKeyword);
  return finishNode(context, parser, pos, {
    type: 'TSThisType',
    literal: Parser.parseLiteral(parser, context)
  } as any);
}

function parseThisTypePredicate(parser: IParser, context: Context, parameterName: any): any {
  const pos = getLocation(parser);
  nextToken(parser, context);
  return finishNode(context, parser, pos, {
    type: 'TSTypePredicate',
    parameterName,
    typeAnnotation: parseTypeAnnotation(parser, context, /* consumeColon */ false)
  } as any);
}

export function parseTypeAnnotation(parser: IParser, context: Context, consumeColon: boolean = true): any {
  const pos = getLocation(parser);
  if (consumeColon) expect(parser, context, Token.Colon);
  return finishNode(context, parser, pos, {
    type: 'TypeAnnotation',
    typeAnnotation: parseType(parser, context)
  } as any);
}

function parseVoidTypedNode(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.VoidKeyword);
  return finishNode(context, parser, pos, {
    type: 'TSVoidKeyword'
  } as any);
}

function parseLiteralTypedNode(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  let literal: any;
  switch (parser.token) {
    case Token.StringLiteral:
    case Token.NumericLiteral:
      literal = Parser.parseLiteral(parser, context);
      break;
    case Token.TrueKeyword:
      literal = {
        type: 'Literal',
        value: false
      };
      break;
    case Token.FalseKeyword:
      literal = {
        type: 'Literal',
        value: false
      };
      break;
    default:
      report(parser, Errors.Unexpected);
  }

  return finishNode(context, parser, pos, {
    type: 'TSLiteralType',
    literal
  } as any);
}

function parseNonArrayType(parser: IParser, context: Context): any {
  switch (parser.token) {
    case Token.Identifier:
      return parseIdentifierTypedNode(parser, context);
    case Token.VoidKeyword:
      return parseVoidTypedNode(parser, context);
    case Token.NullKeyword:
      return parseNullTypedNode(parser, context);
    case Token.StringLiteral:
    case Token.NumericLiteral:
    case Token.TrueKeyword:
    case Token.FalseKeyword:
      return parseLiteralTypedNode(parser, context);
    case Token.Subtract:
      return parseSubtractTypeNode(parser, context);
    case Token.ThisKeyword:
      const thisType = parseThisTypeNode(parser, context);
      switch (parser.token) {
        case Token.IsKeyword:
          if (!(parser.flags & Flags.NewLine)) return parseThisTypePredicate(parser, context, thisType);
        // falls through
        default:
          return thisType;
      }
    case Token.TypeofKeyword:
      return parseTypeQuery(parser, context);
    case Token.LeftBrace:
      const pos = getLocation(parser);
      expect(parser, context, Token.LeftBrace);
      if (parser.token === Token.LeftBracket || parser.token === Token.ReadOnlyKeyword)
        return parseMappedType(parser, context, pos);
      return parseTypeLiteral(parser, context, pos);
    case Token.LeftBracket:
      return parseTupleType(parser, context);
    case Token.LeftParen:
      return parseParenthesizedType(parser, context);
    default:
      report(parser, Errors.Unexpected);
  }
}

function parseParenthesizedType(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.LeftParen);
  const typeAnnotation = parseType(parser, context);
  expect(parser, context, Token.RightParen);

  return finishNode(context, parser, pos, {
    type: 'TSParenthesizedType',
    typeAnnotation
  } as any);
}

function parseTupleElementTypes(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  return finishNode(context, parser, pos, {
    type: 'TupleElementTypes'
  } as any);
}

function parseTupleType(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.LeftBracket);
  const elementTypes = [parseTupleElementTypes(parser, context)];

  while (parser.token === Token.RightBracket) {
    elementTypes.push(parseType(parser, context));
  }
  return finishNode(context, parser, pos, {
    type: 'TSTupleType',
    elementTypes
  } as any);
}

function parseTypeLiteral(parser: IParser, context: Context, pos: Location): any {
  return finishNode(context, parser, pos, {
    type: 'TSTypeLiteral',
    members: parseObjectTypeMembers(parser, context)
  } as any);
}

function parseTypeQuery(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.KeyOfKeyword);
  return finishNode(context, parser, pos, {
    type: 'TSTypeQuery',
    exprName: parseEntityName(parser, context)
  } as any);
}

function parseTypeMember(parser: IParser, context: Context): any {
  if (!consume(parser, context, Token.Comma)) {
    consumeSemicolon(parser, context);
  }
}

function parseObjectTypeMembers(parser: IParser, context: Context): any {
  const members: any = [];
  while (parser.token !== Token.RightBrace) {
    members.push(parseTypeMember(parser, context));
  }
  expect(parser, context, Token.RightBrace);
  return members;
}

function parseArrayType(parser: IParser, context: Context): any {
  const pos = getLocation(parser);
  let elementType = parseNonArrayType(parser, context);

  while (!(parser.flags & Flags.NewLine) && consume(parser, context, Token.LeftBracket)) {
    if (consume(parser, context, Token.RightBracket)) {
      elementType = finishNode(context, parser, pos, {
        type: 'TSArrayType',
        elementType
      } as any);
    } else {
      const indexType = parseType(parser, context);
      expect(parser, context, Token.RightBracket);
      elementType = finishNode(context, parser, pos, {
        type: 'TSIndexedAccessType',
        elementType,
        indexType
      } as any);
    }
  }
  return elementType;
}

function parseTypeOperatorWithOperatpr(parser: IParser, context: Context, token: Token): any {
  const pos = getLocation(parser);
  expect(parser, context, token);

  return finishNode(context, parser, pos, {
    type: 'TSTypeOperator',
    operator: tokenDesc(token),
    typeAnnotation: parseTypeOperator(parser, context)
  } as any);
}

function parseTypeOperator(parser: IParser, context: Context): any {
  return parser.token === Token.KeyOfKeyword
    ? parseTypeOperatorWithOperatpr(parser, context, Token.KeyOfKeyword)
    : parseArrayType(parser, context);
}

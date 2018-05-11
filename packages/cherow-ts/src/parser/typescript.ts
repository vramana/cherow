import { Errors, report, ESTree, Token, tokenDesc, Context, Parser, Location } from 'cherow';
import { nextToken, getLocation, consumeSemicolon, finishNode, expect, consume, TypeScriptContext } from '../utilities';
import { parseExpressionOrLabelledStatement, parseDirective, parseStatementListItem } from './statements';
import { parseIdentifier, parseLiteral, parseAssignmentExpression } from './expressions';
import { parseTypeParameters, parseType, parseObjectTypeMembers, parseTypeArguments } from './annotations';
import { parseVariableDeclarationList, parseAsyncFunctionOrAsyncGeneratorDeclaration, parseFunctionDeclaration,  parseClassDeclaration } from './declarations';
import { parseModuleItem } from './module';

/**
 * Parse either expression statement or declare (TypeScript)
 *
 * @export
 * @param parser Parser object
 * @param context Context masks
 */
export function parseExpressionOrDeclareStatement(parser: Parser, context: Context): any {
  const pos = getLocation(parser);
  const {
      tokenValue,
      flags,
      line,
      column,
      startColumn,
      index,
      lastColumn,
      startLine,
      lastLine,
      lastIndex,
      startIndex,
      tokenRaw,
      token,
      lastValue,
      tokenRegExp
  } = parser;
console.log('dddd')
  switch (parser.token) {

      // 'declare'
      case Token.DeclareKeyword:
          {
              switch (nextToken(parser, context)) {

                 // 'global'
                  case Token.GlobalKeyword:
                      return parseAmbientExternalModuleDeclaration(parser, context);

                  case Token.ConstKeyword:
                      {
                          switch (nextToken(parser, context)) {
                              case Token.EnumKeyword:
                                  expect(parser, context, Token.EnumKeyword);
                                  return parseEnumDeclaration(parser, context, true);
                              default:
                                  return parseVariableStatement(parser, context | Context.BlockScope, false);
                          }
                      }

                      // 'abstract'
                  case Token.AbstractKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.ClassKeyword:
                          default: // ignore
                      }

                      // 'enum'
                  case Token.EnumKeyword:
                      {
                          switch (nextToken(parser, context)) {
                              case Token.Identifier:
                                  return parseEnumDeclaration(parser, context);
                              default: // ignore
                          }
                          break;
                      }

                      // 'module'
                  case Token.ModuleKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.StringLiteral:
                            return parseAmbientExternalModuleDeclaration(parser, context);
                          case Token.Identifier:
                            return parseNamespaceDeclaration(parser, context);
                          default: // ignore
                      }

                  default: // ignore
                    return parseStatementListItem(parser, context | TypeScriptContext.Declared);
              }

              break;
          }

      // 'namespace'
      case Token.NameSpaceKeyword:
       switch (nextToken(parser, context)) {
        case Token.Identifier:
            return parseNamespaceDeclaration(parser, context);
        default: // ignore
      }
          // 'enum'
      case Token.EnumKeyword:
          {
              switch (nextToken(parser, context)) {
                  case Token.Identifier:
                      return parseEnumDeclaration(parser, context);
                  default: // ignore
              }
              break;
          }
          // 'interface'
      case Token.InterfaceKeyword:
          {
              switch (nextToken(parser, context)) {
                  case Token.Identifier:
                      return parseInterfaceDeclaration(parser, context);
                  default: // ignore
              }
              break;
          }
          // 'type'
      case Token.TypeKeyword:
          {
              switch (nextToken(parser, context)) {
                  case Token.Identifier:
                      return parseTypeAlias(parser, context, pos);
                  default: // ignore
              }
              break;
          }

          // 'module'
      case Token.ModuleKeyword:
          {
              switch (nextToken(parser, context)) {
                  case Token.StringLiteral:
                  case Token.Identifier:
                    return parseEnumDeclaration(parser, context);
                  default: // ignore
              }
              break;
          }

          // 'abstract'
      case Token.AbstractKeyword:
          switch (nextToken(parser, context)) {
              case Token.ClassKeyword:
              default: // ignore
          }

      default: // ignore
  }

  // Note: this 'rewind' will only happen if 'types', 'declare' or 'interface'
  // should be treated as identifer. E.g 'interface:foo' is valid JS syntax.

  parser.index = index;
  parser.token = token;
  parser.tokenValue = tokenValue;
  parser.flags = flags;
  parser.line = line;
  parser.column = column;
  parser.tokenRaw = tokenRaw;
  parser.lastValue = lastValue;
  parser.startColumn = startColumn;
  parser.lastColumn = lastColumn;
  parser.startLine = startLine;
  parser.lastLine = lastLine;
  parser.lastIndex = lastIndex;
  parser.startIndex = startIndex;
  parser.tokenRegExp = tokenRegExp;
  return parseExpressionOrLabelledStatement(parser, context);
}

export function parseAmbientExternalModuleDeclaration(parser: Parser, context: Context): any {
  const pos = getLocation(parser);
  let global = false;
  let id: any;

  if (parser.token === Token.GlobalKeyword) {
    global = true;
    id = parseIdentifier(parser, context);
  } else if (parser.token === Token.StringLiteral) {
    id = parseLiteral(parser, context);
  } else {
    report(parser, Errors.UnexpectedToken);
  }
  let body: any = null;
  if (parser.token === Token.LeftBrace) {
    body = parseStatementListBlock(parser, context);
  } else {
    consumeSemicolon(parser, context);
  }
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
          type: 'TSModuleDeclaration ',
          id,
          body,
          global,
      } as any);
}

export function parseNamespaceDeclaration(parser: Parser, context: Context): any {
  const pos = getLocation(parser);
  const id = parseIdentifier(parser, context);
  let body: any;
  if (consume(parser, context, Token.Period)) {
    body = parseNamespaceDeclaration(parser, context);
  } else {
    body = parseStatementListBlock(parser, context);
  }
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
          type: 'TSModuleDeclaration ',
          id,
          body
      } as any);
}

export function parseStatementListBlock(parser: Parser, context: Context): any {
  const pos = getLocation(parser);
  expect(parser, context, Token.LeftBrace);
  const body: (ReturnType < typeof parseDirective | typeof parseModuleItem >)[] = [];

  while (parser.token !== Token.RightBrace) {
    body.push(parser.token === Token.StringLiteral ?
          parseDirective(parser, context) :
          parseModuleItem(parser, context | Context.AllowIn));
  }
  expect(parser, context, Token.RightBrace);
  return finishNode(context, parser, pos, {
    type: 'TSModuleBlock',
    body
  } as any);
}

export function parseTypeAlias(
  parser: Parser,
  context: Context,
  pos: Location = getLocation(parser)): any {

  const id = parseIdentifier(parser, context);

  let typeParameters: any = null;

  if (parser.token === Token.LessThan) {
      typeParameters = parseTypeParameters(parser, context);
  }
  expect(parser, context, Token.Assign);
  const typeAnnotation = parseType(parser, context);
  consumeSemicolon(parser, context);

  return finishNode(context, parser, pos, {
          type: 'TSTypeAliasDeclaration',
          typeParameters,
          id,
          typeAnnotation
      } as any);
}
// HeritageClauseElement
// tsParseExpressionWithTypeArguments
function parseHeritageClause(parser: Parser, context: Context): any {
  const clauses: any[] = [];
  while (parser.token !== Token.LeftBrace) {
      clauses.push(parseExpressionWithTypeArguments(parser, context));
  }
  return clauses;

}

function parseExpressionWithTypeArguments(parser: Parser, context: Context): any {
  const pos = getLocation(parser);
  const expression = parseEntityName(parser, context);
  let typeParameters: any = null;
  if (parser.token === Token.LessThan) {
      typeParameters = parseTypeArguments(parser, context);
  }
  return finishNode(context, parser, pos, {
          type: 'TSExpressionWithTypeArguments',
          expression,
          typeParameters
      } as any);

}

function parseEntityName(parser: Parser, context: Context): any {
  const pos = getLocation(parser);
  let entity: any = parseIdentifier(parser, context);
  while (consume(parser, context, Token.Period)) {
      entity = finishNode(context, parser, getLocation(parser), {
              type: 'TSQualifiedName',
              left: entity,
              right: parseIdentifier(parser, context)
          } as any);
  }
  return entity;
}

function parseInterfaceDeclarationBody(parser: Parser, context: Context): any {
  const pos = getLocation(parser);
  return finishNode(context, parser, pos, {
          type: 'TSInterfaceBody',
          body: parseObjectTypeMembers(parser, context)
      } as any);
}

function parseInterfaceDeclaration(
  parser: Parser,
  context: Context,
  id: ESTree.Identifier = parseIdentifier(parser, context)): any {
  const pos = getLocation(parser);

  const typeParameters = parser.token === Token.LessThan ? parseTypeParameters(parser, context) : null;
  let extend: any = null;

  if (consume(parser, context, Token.ExtendsKeyword)) {
      extend = parseHeritageClause(parser, context);
  }

  const body = parseInterfaceDeclarationBody(parser, context);
  return finishNode(context, parser, pos, {
          type: 'TSInterfaceDeclaration',
          id,
          body,
          extends: extend,
          typeParameters
      } as any);
}

export function parseEnumMembers(
  parser: Parser,
  context: Context
): any {
  const pos = getLocation(parser);
  const id = parser.token === Token.StringLiteral ?
      parseLiteral(parser, context) :
      parseIdentifier(parser, context);
  const initializer = consume(parser, context, Token.Assign) ?
      parseAssignmentExpression(parser, context) :
      null;
  return finishNode(context, parser, pos, {
          type: 'TSEnumMember',
          id,
          initializer
      } as any);
}

export function parseEnumDeclaration(
  parser: Parser,
  context: Context,
  isConst: boolean = false
): any {

  const pos = getLocation(parser);
  //consume(parser,context, Token.EnumKeyword)
  const id = parseIdentifier(parser, context);
  expect(parser, context, Token.LeftBrace);
  const members: any[] = [];
  while (parser.token !== Token.RightBrace) {
      members.push(parseEnumMembers(parser, context));
  }
  expect(parser, context, Token.RightBrace);
  return finishNode(context, parser, pos, {
          type: 'TSEnumDeclaration',
          const: isConst,
          members,
          id
      } as any);
}

// TEMPORARY!!!!
export function parseVariableStatement(
  parser: Parser,
  context: Context,
  shouldConsume: boolean = true
): ESTree.VariableDeclaration {
  const pos = getLocation(parser);
  const {
      token
  } = parser;
  const isConst = token === Token.ConstKeyword;
  if (shouldConsume) nextToken(parser, context);
  const declarations = parseVariableDeclarationList(parser, context, isConst);
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
      type: 'VariableDeclaration',
      kind: tokenDesc(token) as 'var' | 'let' | 'const',
      declarations
  });
}

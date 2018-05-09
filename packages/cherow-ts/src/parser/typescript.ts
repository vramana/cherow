import { ESTree, Token, tokenDesc, Context, Parser, Location } from 'cherow';
import { nextToken, getLocation, consumeSemicolon, finishNode, expect,consume } from '../utilities';
import { parseExpressionOrLabelledStatement } from './statements';
import { parseIdentifier } from './expressions';
import { parseTypeParameters, parseType, parseObjectTypeMembers, parseTypeArguments } from './annotations';
import { parseVariableDeclarationList, parseAsyncFunctionOrAsyncGeneratorDeclaration, parseFunctionDeclaration,  parseClassDeclaration } from './declarations';

/**
 * Parse either expression statement or declare (TypeScript)
 *
 * @export
 * @param {Parser} parser Parser object
 * @param {Context} context Context masks
 * @returns {*}
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
  switch (parser.token) {

      // 'declare'
      case Token.DeclareKeyword:
          {
              switch (nextToken(parser, context)) {

                case Token.ConstKeyword: {
                  switch (nextToken(parser, context)) {
                      case Token.EnumKeyword:
                        expect(parser, context, Token.EnumKeyword);
                        return parseEnumDeclaration(parser, context, true);
                      default:
                        return parseVariableStatement(parser, context | Context.BlockScope, false)
                  }
                }
                case Token.VarKeyword:
                  return parseVariableStatement(parser, context)

                case Token.LetKeyword:
                  return parseVariableStatement(parser, context | Context.BlockScope)

                case Token.FunctionKeyword:
                  return parseFunctionDeclaration(parser, context);

                case Token.At:
                case Token.ClassKeyword:
                  return parseClassDeclaration(parser, context);

                case Token.AsyncKeyword:
                  return parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context);

                  // 'abstract'
                  case Token.AbstractKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.ClassKeyword:
                          default: // ignore
                      }

                  // 'namespace'
                  case Token.NameSpaceKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.Identifier:
                          default: // ignore
                      }

                  // 'interface'
                  case Token.InterfaceKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.Identifier:
                            return parseInterfaceDeclaration(parser, context);
                          default: // ignore
                      }
                 // 'enum'
                  case Token.EnumKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.Identifier:
                          default: // ignore
                      }

                  // 'module'
                  case Token.ModuleKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.StringLiteral:
                          case Token.Identifier:
                          default: // ignore
                      }

                  // 'type'
                  case Token.TypeKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.Identifier:
                          default: // ignore
                      }
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

/**
* Parses type alias
*
* @param {Parser} parser  Parser object
* @param {Context} context  Context object
* @param {Location} pos  Location
* @returns {*}
*/

function parseTypeAlias(
  parser: Parser,
  context: Context,
  pos: Location): any {

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
} as any)

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
  id = parseIdentifier(parser, context)): any {
  const pos = getLocation(parser);
  const typeParameters = parser.token === Token.Colon ? parseTypeParameters(parser, context) : null;
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

function parseEnumDeclaration(
  parser: Parser,
  context: Context,
  isConst: boolean = false
): any {

  const pos = getLocation(parser);
  const id = parseIdentifier(parser, context);

  return finishNode(context, parser, pos, {
    type: 'TSEnumDeclaration',
    const: isConst,
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
  const { token } = parser;
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

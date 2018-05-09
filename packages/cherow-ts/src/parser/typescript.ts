import { Identifier } from './../../../cherow/dist/types/build/src/estree.d';
import { ModuleDeclaration } from './../../../cherow/src/estree';
import { Token, tokenDesc, Context, Parser, Location } from 'cherow';
import { nextToken, getLocation, consumeSemicolon, finishNode, expect } from '../utilities';
import { parseExpressionOrLabelledStatement } from './statements';
import { parseIdentifier } from './expressions';
import { parseTypeParameters, parseType } from './annotations';

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

                // 'class'
                  case Token.ClassKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.TypeKeyword:
                          default: // ignore
                      }

                  // 'class'
                  case Token.NameSpaceKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.Identifier:
                          default: // ignore
                      }

                  // 'interface'
                  case Token.InterfaceKeyword:
                      switch (nextToken(parser, context)) {
                          case Token.Identifier:
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
      }
      as any);
}

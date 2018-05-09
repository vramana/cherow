import { Token, Context, Parser } from 'cherow';
import { nextToken } from '../utilities';
import { parseExpressionOrLabelledStatement } from './statements';

/**
 * Parse either expression statement or declare (TypeScript)
 *
 * @export
 * @param {Parser} parser Parser object
 * @param {Context} context Context masks
 * @returns {*}
 */
export function parseExpressionOrDeclareStatement(parser: Parser, context: Context): any {

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
                  case Token.ClassKeyword:
                  case Token.Identifier:
                  case Token.FunctionKeyword:
                  case Token.VarKeyword:
                  case Token.TypeKeyword:
                  case Token.ExportKeyword:
                  case Token.InterfaceKeyword:
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
                  default: // ignore
              }
              break;
          }

      default: // ignore
  }

  // Note: this 'rewind' will only happen if someone try to parse invalid
  // 'types', 'declare' or 'interface' syntax
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

import { Parser } from '../types';
import { Chars } from '../chars';
import { Token, descKeyword } from '../token';
import { Context, Flags } from '../common';
import { isValidIdentifierStart } from '../unicode';
import { Errors, report } from '../errors';
import {
  hasBit,
  fromCodePoint,
  scanUnicodeEscape,
  escapeInvalidCharacters,
  isIdentifierPart,
  isWhiteSpaceSingleLine,
  consumeLeadSurrogate,
  isAsciiIdentifier,
  handleLeadSurrogate
} from './common';

/**
 * Scans identifier
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first codepoint
 */

export function scanIdentifier(parser: Parser, context: Context, first: number): any {
  let { index } = parser;
  let c = context;
  // Hot path - fast scanning for identifiers and non-escaped keywords
  while (isAsciiIdentifier(first)) {
      parser.index++; parser.column++;
      first = parser.source.charCodeAt(parser.index);
  }
  parser.tokenValue = parser.source.slice(index, parser.index);
  if (parser.index >= parser.length || first <= 127 && first !== Chars.Backslash) {
    return getIdentifierToken(parser);
  }

  handleLeadSurrogate(parser, first);
  // slow path
  return parseIdentifierSuffix(parser);
}

/**
 * Parse identifier suffix
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first codepoint
 */
function parseIdentifierSuffix(parser: Parser): Token {
  let hasEscape = false;
  let index = parser.index;
  let first = parser.source.charCodeAt(parser.index);
  while (parser.index < parser.length && isIdentifierPart(first) || first === Chars.Backslash) {
      if (first === Chars.Backslash) {
          const pendingIndex = parser.index;
          const cherow = scanIdentifierUnicodeEscape(parser);
          if (cherow < 0 || cherow === Chars.Backslash || !isValidIdentifierStart(cherow)) {
              return Token.Invalid;
          }
          parser.tokenValue += parser.source.slice(index, pendingIndex);
          parser.tokenValue += fromCodePoint(cherow);
          hasEscape = true;
          index = parser.index;
      } else {
          //handleLeadSurrogate(parser, first);
          parser.index++; parser.column++;
      }

      first = parser.source.charCodeAt(parser.index);
  }

  if (index < parser.index) parser.tokenValue += parser.source.slice(index, parser.index);

  const token = getIdentifierToken(parser);

  if (hasEscape) {
      if (hasBit(token, Token.Identifier) || hasBit(token, Token.Contextual)) {
          return token;
      } else if (hasBit(token, Token.FutureReserved) || token === Token.LetKeyword || token === Token.StaticKeyword) {
          return Token.EscapedStrictReserved;
      } else return Token.EscapedKeyword;
  }
  return token;
}
/**
 * Scans identifier unicode escape
 *
 * @param parser Parser object
 */
export function scanIdentifierUnicodeEscape(parser: Parser): number {
  parser.index++;  parser.column++;
  if (parser.source.charCodeAt(parser.index) !== Chars.LowerU) report(parser, Errors.Unexpected);
  parser.index++;  parser.column++;
  return scanUnicodeEscape(parser);
}
/**
 * Get identifier token
 *
 * @param parser Parser object
 */
function getIdentifierToken(parser: Parser): Token {
  const len = parser.tokenValue.length;
  if (len >= 2 && len <= 11) {
      const token = descKeyword(parser.tokenValue);
      if (token > 0) {
          return token;
      }
  }
  return Token.Identifier;
}

/**
 * Scans maybe identifier
 *
 * @param parser Parser object
 */
export function scanMaybeIdentifier(parser: Parser, context: Context, first: number): Token {
  let c = context;
  if (isWhiteSpaceSingleLine(first)) {
      parser.index++;
      parser.column++;
      return Token.WhiteSpace;
  } else if (first === Chars.LineSeparator || first === Chars.ParagraphSeparator) {
      parser.index++;
      parser.column = 0;
      parser.line++;
      parser.flags |= Flags.NewLine;
      return Token.WhiteSpace;
  }

  first = consumeLeadSurrogate(parser)
  if (!isValidIdentifierStart(first)) report(parser, Errors.Unexpected, escapeInvalidCharacters(first));
  parser.tokenValue = fromCodePoint(first);
  if (parser.index < parser.length) return parseIdentifierSuffix(parser)
  return Token.Identifier;
}

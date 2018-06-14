import { Parser } from '../types';
import { Chars } from '../chars';
import { Token, descKeyword } from '../token';
import { Context, Flags } from '../common';
import { isValidIdentifierStart } from '../unicode';
import { Errors, report } from '../errors';
import {
  hasBit,
  fromCodePoint,
  toHex,
  consumeOpt,
  escapeInvalidCharacters,
  isIdentifierPart,
  isWhiteSpaceSingleLine,
  consumeLeadSurrogate
} from './common';

/**
 * Scans identifier
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first codepoint
 */
export function scanIdentifier(parser: Parser, context: Context, first: number): Token {
  const { index } = parser;
  let c = context;
  while (isIdentifierPart(first)) {
      parser.index++; parser.column++;
      first = parser.source.charCodeAt(parser.index);
  }
  parser.tokenValue = parser.source.slice(index, parser.index);
  if (first <= Chars.MaxAsciiCharacter && first !== Chars.Backslash) return getIdentifierToken(parser);
  if (first >= 0xD800 && first <= 0xDBFF) parser.tokenValue += fromCodePoint(consumeLeadSurrogate(parser));
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
  let escaped = false;
  let index = parser.index;
  let first = parser.source.charCodeAt(parser.index);
  while (parser.index < parser.length && isIdentifierPart(first) || first === Chars.Backslash) {
      if (first === Chars.Backslash) {

          escaped = true;
          parser.tokenValue += parser.source.slice(index, parser.index);
          parser.tokenValue += fromCodePoint(scanIdentifierUnicodeEscape(parser));
          index = parser.index;
      } else {
          parser.index++; parser.column++;
      }

      first = parser.source.charCodeAt(parser.index);
  }

  if (index < parser.index) parser.tokenValue += parser.source.slice(index, parser.index);

  const token = getIdentifierToken(parser);

  if (escaped) {
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
function scanIdentifierUnicodeEscape(parser: Parser): number {
  parser.index ++;  parser.column ++;
  if (parser.source.charCodeAt(parser.index) !== Chars.LowerU) report(parser, Errors.Unexpected);
  parser.index ++;  parser.column ++;
  let ch = parser.source.charCodeAt(parser.index);
  let codePoint = 0;
  if (consumeOpt(parser, Chars.LeftBrace)) {

      ch = parser.source.charCodeAt(parser.index);
      let digit = toHex(ch);

      while (digit >= 0) {
          codePoint = (codePoint << 4) | digit;
          if (codePoint > Chars.NonBMPMax) {
              report(parser, Errors.Unexpected);
          }
          parser.index++;
          parser.column++;
          digit = toHex(parser.source.charCodeAt(parser.index));
      }
      consumeOpt(parser, Chars.RightBrace);

  } else {
      for (let i = 0; i < 4; i++) {
          ch = parser.source.charCodeAt(parser.index);
          const digit = toHex(ch);
          if (digit < 0) report(parser, Errors.Unexpected, 'unicode');
          codePoint = (codePoint << 4) | digit;
          parser.index++; parser.column++;
      }
  }
  return codePoint;
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

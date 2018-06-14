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
      if (parser.index >= parser.length) break;
      first = parser.source.charCodeAt(parser.index);
  }
  parser.tokenValue = parser.source.slice(index, parser.index);
  if (first <= 127 && first !== Chars.Backslash) return getIdentifierToken(parser);
  if (first >= 0xD800 && first <= 0xDBFF) first = consumeLeadSurrogate(parser);
  return parseIdentifierSuffix(parser, context, first)
}

/**
 * Scans identifier unicode escape
 *
 * @param parser Parser object
 */
function scanIdentifierUnicodeEscape(parser: Parser): any {
  parser.index += 2;
  parser.column += 2;

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
          parser.index++;
          parser.column++;
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

  switch (first) {
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
          parser.index++;
          parser.column = 0;
          parser.line++;
          parser.flags |= Flags.NewLine;
          parser.flags |= Flags.NewLine;
          return Token.WhiteSpace;
          // Special cases
      case Chars.ByteOrderMark:
      case Chars.NonBreakingSpace:
      case Chars.Ogham:
      case Chars.EnQuad:
      case Chars.EmQuad:
      case Chars.EnSpace:
      case Chars.EmSpace:
      case Chars.ThreePerEmSpace:
      case Chars.FourPerEmSpace:
      case Chars.SixPerEmSpace:
      case Chars.FigureSpace:
      case Chars.PunctuationSpace:
      case Chars.ThinSpace:
      case Chars.HairSpace:
      case Chars.NarrowNoBreakSpace:
      case Chars.MathematicalSpace:
      case Chars.IdeographicSpace:
      case Chars.Zwnbs:
      case Chars.Zwj:
          parser.index++;
          parser.column++;
          return Token.WhiteSpace;
      default:
          first = consumeLeadSurrogate(parser)
          if (!isValidIdentifierStart(first)) report(parser, Errors.Unexpected, escapeInvalidCharacters(first));
          parser.tokenValue = fromCodePoint(first);
          if (parser.index < parser.length) return parseIdentifierSuffix(parser, context, first)
          return Token.Identifier;
  }
}

/**
 * Consumes lead surrogate
 *
 * @param parser Parser object
 */
export function consumeLeadSurrogate(parser: Parser): number {
  const hi = parser.source.charCodeAt(parser.index++);
  let code = hi;

  if (hi >= 0xD800 && hi <= 0xDBFF && parser.index < parser.length) {
      const lo = parser.source.charCodeAt(parser.index);
      if (lo >= 0xDC00 && lo <= 0xDFFF) {
          code = (hi & 0x3FF) << 10 | lo & 0x3FF | 0x10000;
          parser.index++;
          parser.column++;
      }
  }

  parser.column++;
  return code;
}

/**
 * Parse identifier suffic
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first codepoint
 */
function parseIdentifierSuffix(parser: Parser, context: Context, first: number): any {
  let c = context;
  let escaped = false;
  let index = parser.index;
  while (parser.index < parser.length && isIdentifierPart(first) || first === Chars.Backslash) {
      if (first === Chars.Backslash) {
          escaped = true;
          parser.tokenValue += parser.source.slice(index, parser.index);
          parser.tokenValue += fromCodePoint(scanIdentifierUnicodeEscape(parser));
          index = parser.index;
      } else {
          parser.index++;
          parser.column++;
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

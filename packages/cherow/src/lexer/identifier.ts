import { Parser } from '../types';
import { Chars } from '../chars';
import { Token, descKeyword } from '../token';
import { Context, Flags } from '../common';
import { isValidIdentifierStart } from '../unicode';
import { hasBit, fromCodePoint, toHex, readNext, consumeOpt, nextUnicodeChar, escapeInvalidCharacters, isIdentifierPart } from './common';
import { Errors, report } from '../errors';

export function scanIdentifier(parser: Parser, context: Context, first: number): Token {
  let { index } = parser;
  let c = context;
  let ret = '';

  while (isIdentifierPart(first)) {
      parser.index++;
      parser.column++;
      if (parser.index >= parser.length) break;
      first = parser.source.charCodeAt(parser.index);
  }

  parser.tokenValue = ret = parser.source.slice(index, parser.index);
  if (first <= 127 && first !== Chars.Backslash) return getIdentifierToken(parser);
  index = parser.index;
  let escaped = false;
  while (parser.index < parser.length && isIdentifierPart(first) || first === Chars.Backslash) {
      if (first === Chars.Backslash) {
          escaped = true;
          parser.tokenValue = ret += parser.source.slice(index, parser.index);
          parser.tokenValue = ret += fromCodePoint(scanIdentifierUnicodeEscape(parser));
          index = parser.index;
          parser.column--;
      } else parser.index++;
      parser.column++;

      first = parser.source.charCodeAt(parser.index);
  }

  if (index < parser.index) parser.tokenValue = ret += parser.source.slice(index, parser.index);

  const token = getIdentifierToken(parser);

  if (escaped) {
      if (hasBit(token, Token.Identifier) || hasBit(token, Token.Contextual)) return token;
      else if (hasBit(token, Token.FutureReserved) ||
          token === Token.LetKeyword || token === Token.StaticKeyword) {
          return Token.EscapedStrictReserved;
      } else {
          return Token.EscapedKeyword;
      }
  }
  return token;
}

function scanIdentifierUnicodeEscape(parser: Parser): any {
  parser.index++;
  parser.column++;
  parser.index++;
  parser.column++;

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
          first = nextUnicodeChar(parser);
          if (!isValidIdentifierStart(first)) {
              report(parser, Errors.Unexpected, escapeInvalidCharacters(first));
          }
          return scanIdentifier(parser, context, first);
  }
}

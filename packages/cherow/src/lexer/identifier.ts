import { Token, descKeywordTable } from '../token';
import { ParserState } from '../types';
import { Chars, isIdentifierPart } from '../chars';
import { Context, Flags } from '../common';
import { nextChar, fromCodePoint, toHex } from './common';
import { report, Errors } from '../errors';

/**
 * Scans identifier
 *
 * @param state ParserState instance
 */
export function scanIdentifier(state: ParserState, context: Context): Token {
  // Hot path - fast scanning for identifiers and non-escaped keywords
  while (isIdentifierPart(nextChar(state))) {}
  state.tokenValue = state.source.slice(state.startIndex, state.index);
  if (state.index >= state.length || state.nextChar <= Chars.MaxAsciiCharacter && state.nextChar !== Chars.Backslash) {
    if (context & Context.OptionsRawidentifiers) state.tokenRaw = state.tokenValue;
    return descKeywordTable[state.tokenValue] || Token.Identifier;
  }
  return scanIdentifierRest(state, context);
}

/**
 * Scans the rest of the identifiers. It's the slow path that has to deal with multi unit encoding
 *
 * @param state ParserState instance
 */
export function scanIdentifierRest(state: ParserState, context: Context): Token {
  let start = state.index;
  let hasEscape = false;
  while (state.index < state.length) {
      // The backslash char have it's 4th bit set. Checking that first before checking for
      // a Unicode escape sequence prevents additional checks for 63%
      if ((state.nextChar & 8) === 8 && state.nextChar === Chars.Backslash) {
          state.tokenValue += state.source.slice(start, state.index);
          const cookedChar = scanIdentifierUnicodeEscape(state);
          if (cookedChar < 0 || !isIdentifierPart(cookedChar)) {
              return Token.Invalid;
          }
          state.tokenValue += fromCodePoint(cookedChar);
          hasEscape = true;
          start = state.index;
      } else {
          if (!isIdentifierPart(state.source.charCodeAt(state.index))) break;
          nextChar(state);
          if (state.nextChar > 0xFFFF0) state.index++;
      }
  }

  if (start < state.index) state.tokenValue += state.source.slice(start, state.index);

  // If we have encountered any multi-unit characters, we need to deal with them here
  if ((state.nextChar & 0xFC00) === 0xD800) {
      const code = state.nextChar;
      nextChar(state);
      const lo = state.source.charCodeAt(state.index);
      if ((lo & 0xFC00) !== 0xDC00) report(state, Errors.Unexpected);
      state.tokenValue += fromCodePoint(0x10000 + ((code & 0x3FF) << 10) + (lo & 0x3FF));
      nextChar(state);
  }
  // 'options -> rawIdentifier'
  if (context & Context.OptionsRawidentifiers) state.tokenRaw += state.source.slice(state.startIndex, state.index);
  if (start < state.index && isIdentifierPart(state.source.charCodeAt(state.index))) scanIdentifierRest(state, context);

  const t = descKeywordTable[state.tokenValue] || Token.Identifier;

  if (!hasEscape || t & Token.IdentifierOrContextual) return t;

  if (t & Token.FutureReserved || t === Token.LetKeyword || t === Token.StaticKeyword) {
      return Token.EscapedStrictReserved;
  }
  return Token.EscapedKeyword;
}

/**
 * Scans identifier unicode escape
 *
 * @param state ParserState instance
 */
export function scanIdentifierUnicodeEscape(state: ParserState): number {
   // Read 'u' characters
  if (nextChar(state) !== Chars.LowerU) report(state, Errors.Unexpected);
  let value = 0;
  if (nextChar(state) === Chars.LeftBrace) {
      let digit = toHex(nextChar(state));
      //  '\\u{}'
      if (state.nextChar === Chars.RightBrace) report(state, Errors.InvalidUnicodeEscape)
      // Note: The 'while' loop will only execute if the digit is higher than or equal to zero. And the 'value'
      // will still be 0 if invalid hex value. So no need for further validations
      while (digit >= 0) {
          value = value * 0x10 + digit;
          if (value > 0x10FFFF) report(state, Errors.UndefinedUnicodeCodePoint);
          digit = toHex(nextChar(state));
      }
      if (value < 0 || state.nextChar != Chars.RightBrace) report(state, Errors.InvalidUnicodeEscape);
      nextChar(state);
      return value;
  }

  // 4 characters have to be read for this to be valid
  for (let i = 0; i < 4; i++) {
      const digit = toHex(state.nextChar);
      if (digit < 0) report(state, Errors.InvalidUnicodeEscape);
      value = value * 0x10  + digit;
      nextChar(state);
  }

  return value;
}

export function scanNonASCIIOrWhitespace(state: ParserState, context: Context): any {
  // Non-ASCII code points can only be identifiers or whitespace.
  switch (state.nextChar) {
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
          state.index++;
          state.column = 0;
          state.line++;
          state.flags |= Flags.LineTerminator;
          return Token.WhiteSpace;
          // http://en.wikipedia.org/wiki/Whitespace_character
      case Chars.Space:
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
      case Chars.ZeroWidthSpace:
      case Chars.Zwnj:
      case Chars.Zwj:
      case Chars.Zwnbs:
      case Chars.NarrowNoBreakSpace:
      case Chars.MathematicalSpace:
      case Chars.IdeographicSpace:
          state.index++;
          state.column++;
          return Token.WhiteSpace;

      default:

          if ((state.nextChar & 0xFC00) === 0xD800) {
              state.index++;
              state.column++;
              const lo = state.source.charCodeAt(state.index);
              if ((lo & 0xFC00) !== 0xDC00) report(state, Errors.Unexpected);
              state.tokenValue += fromCodePoint(0x10000 + ((state.nextChar & 0x3FF) << 10) + (lo & 0x3FF));
              state.index++;
              state.column++;
          }
          return scanIdentifierRest(state, context);
  }
}

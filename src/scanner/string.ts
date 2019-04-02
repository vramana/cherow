import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { convertToHex, nextChar, fromCodePoint } from './common';
import { CharTypes, CharFlags } from './charClassifier';
import { scanUnicodeEscapeValue } from './identifier';

// Intentionally negative
const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

export function scanString(state: ParserState, context: Context, quote: number): Token {
  nextChar(state); // consume quote
  state.tokenValue = '';
  let marker = state.index;
  while (state.index < state.source.length) {
    if (CharTypes[state.currentChar] & CharFlags.BackSlash) {
      state.tokenValue += state.source.slice(marker, state.index);
      nextChar(state);
      const cooked = scanEscape(state, context, state.currentChar, /* isTemplate */ false);
      if (cooked === -1) return Token.Illegal; // Note: This will throw in the parser
      state.tokenValue += fromCodePoint(cooked);
      marker = state.index;
    }
    if (state.currentChar === quote) {
      state.tokenValue += state.source.slice(marker, state.index);
      nextChar(state);
      return Token.StringLiteral;
    }

    if (CharTypes[state.currentChar] & CharFlags.LineTerminator) {
      return Token.Illegal;
    }

    nextChar(state);
  }

  return Token.Illegal;
}

export function scanEscape(state: ParserState, context: Context, first: number, isTemplate: false): number {
  nextChar(state);

  switch (first) {
    // Magic escapes
    case Chars.LowerB:
      return Chars.Backspace;
    case Chars.LowerF:
      return Chars.FormFeed;
    case Chars.LowerR:
      return Chars.CarriageReturn;
    case Chars.LowerN:
      return Chars.LineFeed;
    case Chars.LowerT:
      return Chars.Tab;
    case Chars.LowerV:
      return Chars.VerticalTab;
    // Line continuations
    case Chars.CarriageReturn: {
      const { index } = state;

      if (index < state.source.length) {
        const ch = state.source.charCodeAt(index);

        if (ch === Chars.LineFeed) {
          state.index = index + 1;
        }
      }
    }
    // falls through

    case Chars.LineFeed:
    case Chars.LineSeparator:
    case Chars.ParagraphSeparator:
      return Escape.Empty;
    // UCS-2/Unicode escapes
    case Chars.LowerU: {
      first = scanUnicodeEscapeValue(state);
      if (first < 0) return Escape.Empty;
      return first;
    }
    case Chars.LowerX: {
      let codePoint = 0;
      for (let i = 0; i < 2; i++) {
        if ((CharTypes[state.currentChar] & (CharFlags.Decimal | CharFlags.Hex)) === 0) {
          return Escape.InvalidHex;
        }
        codePoint = codePoint * 0x10 + convertToHex(state.currentChar);
        nextChar(state);
      }
      if (codePoint < 0) return Escape.InvalidHex;
      return codePoint;
    }

    // Null character, octals
    case Chars.Zero:
    case Chars.One:
    case Chars.Two:
    case Chars.Three:
    case Chars.Four:
    case Chars.Five:
    case Chars.Six:
    case Chars.Seven: {
      let codePoint = first - Chars.Zero;
      let idx = 0;
      for (; idx < 2; idx++) {
        let digit = state.currentChar - Chars.Zero;
        if (digit < 0 || digit > 7) break;
        let nx = codePoint * 8 + digit;
        if (nx >= 256) break;
        codePoint = nx;
        nextChar(state);
      }
      if (first !== Chars.Zero || idx > 0 || CharTypes[state.currentChar] & CharFlags.Decimal) {
        // Octal escape sequences are not allowed inside string template literals
        if (context & Context.Strict || isTemplate) {
        }
      }
      return codePoint;
    }
    // `8`, `9` (invalid escapes)
    case Chars.Eight:
    case Chars.Nine:
      return Escape.EightOrNine;
    default:
      return first;
  }
}

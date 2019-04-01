import { ParserState } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { toHex, nextChar } from './common';
import { CharTypes, CharFlags } from './charClassifier';
import { scanUnicodeEscape } from './identifier';

// Intentionally negative
const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

export function scanString(state: ParserState): Token {
  const quote = state.currentChar;
  nextChar(state);
  state.tokenValue = '';
  let marker = state.index;
  while (state.index < state.source.length) {
    if (state.source.charCodeAt(state.index) === Chars.Backslash) {
      state.tokenValue += state.source.slice(marker, state.index);
      nextChar(state);
      const cooked = scanEscape(state, state.currentChar);
      if (cooked === -1) return Token.Illegal;
      state.tokenValue += String.fromCodePoint(cooked);
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

export function scanEscape(state: ParserState, first: number): number {
  nextChar(state);

  switch (first) {
    case Chars.LowerB:
      return Chars.Backspace;
    case Chars.LowerT:
      return Chars.Tab;
    case Chars.LowerN:
      return Chars.LineFeed;
    case Chars.LowerV:
      return Chars.VerticalTab;
    case Chars.LowerF:
      return Chars.FormFeed;
    case Chars.LowerR:
      return Chars.CarriageReturn;
    case Chars.DoubleQuote:
      return Chars.DoubleQuote;
    case Chars.SingleQuote:
      return Chars.SingleQuote;
    case Chars.Backslash:
      return Chars.Backslash;
    case Chars.LowerU: {
      first = scanUnicodeEscape(state);
      if (first < 0) return Escape.Empty;
      return first;
    }
    case Chars.LowerX: {
      let x = 0;
      for (let i = 0; i < 2; i++) {
        let d = toHex(state.currentChar);
        if (d < 0) {
          return -1;
        }
        x = x * 16 + d;
        nextChar(state);
      }
      if (x < 0) return Escape.Empty;
      return x;
    }
    case Chars.Zero: // Fall through.
    case Chars.One: // fall through
    case Chars.Two: // fall through
    case Chars.Three: // fall through
    case Chars.Four: // fall through
    case Chars.Five: // fall through
    case Chars.Six: // fall through
    case Chars.Seven: {
      let x = first - Chars.Zero;
      let i = 0;
      for (; i < 2; i++) {
        let d = state.currentChar - Chars.Zero;
        if (d < 0 || d > 7) break;
        let nx = x * 8 + d;
        if (nx >= 256) break;
        x = nx;
        nextChar(state);
      }
      return x;
    }
  }

  return first;
}

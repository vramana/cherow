import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { toHex, nextChar, fromCodePoint, Escape } from './common';
import { CharTypes, CharFlags } from './charClassifier';
import { scanUnicodeEscapeValue } from './identifier';
import { report, Errors } from '../errors';

export function scanString(state: ParserState, context: Context, quote: number): Token | void {
  nextChar(state); // consume quote
  let res: string | void = '';
  let marker = state.index;
  do {
    // Backslash have it's 4th bit set
    if ((state.currentChar & 8) === 8 && state.currentChar === Chars.Backslash) {
      // check for valid sequences
      res += state.source.slice(marker, state.index);
      nextChar(state);
      if (state.currentChar > 0x7f) {
        res += fromCodePoint(state.currentChar);
        nextChar(state); // skip the slash
      } else {
        const cooked = scanEscape(state, context, state.currentChar, /* isTemplate */ false);
        if (cooked === Escape.Invalid) report(state, Errors.InvalidExtendedUnicodeEscape);
        res += fromCodePoint(cooked);
      }
      marker = state.index;
    }
    if (state.currentChar === quote) {
      state.tokenValue = res += state.source.slice(marker, state.index);
      nextChar(state); // skip closing quote
      return Token.StringLiteral;
    }
    if (state.index >= state.length) report(state, Errors.UnterminatedString);
  } while ((CharTypes[nextChar(state)] & CharFlags.LineTerminator) === 0);

  // New-line or end of input is not allowed
  report(state, Errors.UnterminatedString);
}

export function scanEscape(state: ParserState, context: Context, first: number, isTemplate: boolean): number {
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
        if ((CharTypes[state.currentChar] & CharFlags.Hex) === 0) {
          return Escape.InvalidHex;
        }
        codePoint = codePoint * 0x10 + toHex(state.currentChar);
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

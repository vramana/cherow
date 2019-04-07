import { ParserState, Context, Flags } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { toHex, nextCodePoint, fromCodePoint, Escape, handleEscapeError } from './common';
import { CharTypes, CharFlags } from './charClassifier';
import { scanUnicodeEscapeValue } from './identifier';
import { report, Errors } from '../errors';

export function scanString(state: ParserState, context: Context, quote: number): Token | void {
  const { index: start } = state;
  nextCodePoint(state); // consume quote
  let res: string | void = '';
  let marker = state.index;
  do {
    // Backslash have it's 4th bit set
    if ((state.currentChar & 8) === 8 && state.currentChar === Chars.Backslash) {
      // check for valid sequences
      res += state.source.slice(marker, state.index);

      let ch = nextCodePoint(state);

      if (ch > 0x7e) {
        res += fromCodePoint(ch);
        nextCodePoint(state); // skip the slash
      } else {
        nextCodePoint(state);
        const code = scanEscape(state, context, ch);
        if (code >= 0) res += fromCodePoint(code);
        else handleEscapeError(state, code, /* isTemplate */ false);
      }
      marker = state.index;
    }
    if (state.currentChar === quote) {
      if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(start, state.index);
      state.tokenValue = res += state.source.slice(marker, state.index);
      nextCodePoint(state); // skip closing quote
      return Token.StringLiteral;
    }
    if (state.index >= state.length) report(state, Errors.UnterminatedString);
  } while ((CharTypes[nextCodePoint(state)] & CharFlags.LineTerminator) === 0);

  // New-line or end of input is not allowed
  report(state, Errors.UnterminatedString);
}

export function scanEscape(state: ParserState, context: Context, first: number): number {
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
        if (state.currentChar === Chars.LineFeed) {
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
    case Chars.LowerU:
      return scanUnicodeEscapeValue(state);

    // ASCII escapes
    case Chars.LowerX: {
      if ((CharTypes[state.currentChar] & CharFlags.Hex) === 0) return Escape.InvalidHex;
      const hi = toHex(state.currentChar);
      if ((CharTypes[nextCodePoint(state)] & CharFlags.Hex) === 0) return Escape.InvalidHex;
      const lo = toHex(state.currentChar);
      nextCodePoint(state);
      return (hi << 4) | lo;
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
      // Octal character sequences
      let codePoint = first - Chars.Zero;
      let idx = 0;
      for (; idx < 2; idx++) {
        if ((CharTypes[state.currentChar] & CharFlags.Octal) === 0) break;
        let nx = codePoint * 8 + state.currentChar - Chars.Zero;
        if (nx >= 256) break;
        codePoint = nx;
        nextCodePoint(state);
      }
      if (first !== Chars.Zero || codePoint > 0 || CharTypes[state.currentChar] & CharFlags.Decimal) {
        if (context & Context.Strict) return Escape.StrictOctal;
        state.flags |= Flags.HasOctal;
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

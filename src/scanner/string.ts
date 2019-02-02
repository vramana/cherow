import { ParserState, Context, Flags } from '../common';
import { Chars } from '../chars';
import { Token } from '../token';
import { report, Errors } from '../errors';
import { fromCodePoint, toHex, Escape, scanNext, advanceOne } from './common';

/**
 * Scan a string literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function scanStringLiteral(state: ParserState, context: Context, quote: number): Token {
  const { index: start, lastChar } = state;
  let ret: string | void = '';

  let ch = scanNext(state, Errors.UnterminatedString);
  while (ch !== quote) {
    if (ch === Chars.Backslash) {
      ch = scanNext(state, Errors.UnterminatedString);

      if (ch >= 128) {
        ret += fromCodePoint(ch);
      } else {
        state.lastChar = ch;
        const code = table[ch](state, context, ch);

        if (code >= 0) ret += fromCodePoint(code);
        else reportInvalidEscapeError(state, code as Escape);
        ch = state.lastChar;
      }
    } else if (((ch - 0xe) & 0x2000 && ch === Chars.CarriageReturn) || ch === Chars.LineFeed) {
      report(state, Errors.Unexpected);
    } else ret += fromCodePoint(ch);

    ch = scanNext(state, Errors.UnterminatedString);
  }

  advanceOne(state); // Consume the quote
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(start, state.index);
  state.tokenValue = ret;
  state.lastChar = lastChar;
  return Token.StringLiteral;
}

export const table = new Array<(state: ParserState, context: Context, first: number) => number>(128).fill(
  (state: ParserState) => state.source.charCodeAt(state.index)
);

table[Chars.LowerB] = () => Chars.Backspace;
table[Chars.LowerF] = () => Chars.FormFeed;
table[Chars.LowerR] = () => Chars.CarriageReturn;
table[Chars.LowerN] = () => Chars.LineFeed;
table[Chars.LowerT] = () => Chars.Tab;
table[Chars.LowerV] = () => Chars.VerticalTab;

// Line continuations
table[Chars.CarriageReturn] = state => {
  state.column = -1;
  state.line++;
  const { index } = state;
  if (index < state.source.length) {
    const ch = state.source.charCodeAt(index);
    if (ch === Chars.LineFeed) {
      state.lastChar = ch;
      state.index = index + 1;
    }
  }

  return Escape.Empty;
};

table[Chars.LineFeed] = table[Chars.LineSeparator] = table[Chars.ParagraphSeparator] = state => {
  state.column = -1;
  state.line++;
  return Escape.Empty;
};

// Null character, octals specification.
table[Chars.Zero] = table[Chars.One] = table[Chars.Two] = table[Chars.Three] = (state, context, first) => {
  let code = first - Chars.Zero;
  let index = state.index + 1;
  let column = state.column + 1;

  if (index < state.source.length) {
    const next = state.source.charCodeAt(index);

    if (next < Chars.Zero || next > Chars.Seven) {
      // Strict mode code allows only \0, then a non-digit.
      if (code !== 0 || next === Chars.Eight || next === Chars.Nine) {
        if (context & Context.Strict) return Escape.StrictOctal;
        // If not in strict mode, set the 'Octal' bitmask so we later on
        // can use it to throw an error when parsing out a literal node
        state.flags = state.flags | Flags.Octal;
      }
    } else if (context & Context.Strict) {
      return Escape.StrictOctal;
    } else {
      state.flags = state.flags | Flags.Octal;
      state.lastChar = next;
      code = code * 8 + (next - Chars.Zero);
      index++;
      column++;

      if (index < state.source.length) {
        const next = state.source.charCodeAt(index);

        if (next >= Chars.Zero && next <= Chars.Seven) {
          state.lastChar = next;
          code = code * 8 + (next - Chars.Zero);
          index++;
          column++;
        }
      }

      state.index = index - 1;
      state.column = column - 1;
    }
  }

  return code;
};

// Octal character specification.
table[Chars.Four] = table[Chars.Five] = table[Chars.Six] = table[Chars.Seven] = (state, context, first) => {
  if (context & Context.Strict) return Escape.StrictOctal;
  let code = first - Chars.Zero;
  const index = state.index + 1;
  const column = state.column + 1;

  if (index < state.source.length) {
    const next = state.source.charCodeAt(index);

    if (next >= Chars.Zero && next <= Chars.Seven) {
      code = code * 8 + (next - Chars.Zero);
      state.lastChar = next;
      state.index = index;
      state.column = column;
    }
  }

  return code;
};

// `8`, `9` (invalid escapes)
table[Chars.Eight] = table[Chars.Nine] = () => Escape.EightOrNine;

// Hexadecimal character specification
table[Chars.LowerX] = state => {
  const ch1 = (state.lastChar = scanNext(state, Errors.InvalidHexEscapeSequence));
  const hi = toHex(ch1);
  if (hi < 0) return Escape.InvalidHex;
  const ch2 = (state.lastChar = scanNext(state, Errors.InvalidHexEscapeSequence));
  const lo = toHex(ch2);
  if (lo < 0) return Escape.InvalidHex;
  return hi * 16 + lo;
};

// Unicode character specification.
table[Chars.LowerU] = state => {
  let ch = (state.lastChar = scanNext(state, Errors.InvalidUnicodeEscape));
  if (ch === Chars.LeftBrace) {
    // \u{N}
    ch = state.lastChar = scanNext(state, Errors.InvalidUnicodeEscape);
    let code = toHex(ch);
    if (code < 0) return Escape.InvalidHex;

    ch = state.lastChar = scanNext(state, Errors.InvalidUnicodeEscape);
    while (ch !== Chars.RightBrace) {
      const digit = toHex(ch);
      if (digit < 0) return Escape.InvalidHex;
      code = code * 16 + digit;
      if (code > 0x10fff) return Escape.OutOfRange;
      ch = state.lastChar = scanNext(state, Errors.InvalidUnicodeEscape);
    }

    return code;
  } else {
    // \uNNNN
    let code = toHex(ch);
    if (code < 0) return Escape.InvalidHex;

    for (let i = 0; i < 3; i++) {
      ch = state.lastChar = scanNext(state, Errors.InvalidUnicodeEscape);
      const digit = toHex(ch);
      if (digit < 0) return Escape.InvalidHex;
      code = code * 16 + digit;
    }

    return code;
  }
};

/**
 * Throws a string error for either string or template literal
 *
 * @param state state object
 * @param context Context masks
 */
export function reportInvalidEscapeError(state: ParserState, code: Escape): void {
  switch (code) {
    case Escape.StrictOctal:
      return report(state, Errors.StrictOctalEscape);

    case Escape.EightOrNine:
      return report(state, Errors.InvalidEightAndNine);

    case Escape.InvalidHex:
      return report(state, Errors.InvalidHexEscapeSequence);

    case Escape.OutOfRange:
      return report(state, Errors.UnicodeOverflow);

    default:
      return;
  }
}

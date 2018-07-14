import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { toHex, nextChar, nextUnicodeChar, InvalidEscapeType, fromCodePoint } from './common';
import { report, Errors } from '../errors';

/**
 * Scan a string literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function scanStringLiteral(state: ParserState, context: Context): Token {
  const quote = state.nextChar;
  const nextChar = state.nextChar;
  let ret: string | void = '';
  let ch = readNext(state);

  while (ch !== quote) {

      if (ch === Chars.Backslash) {
          ch = readNext(state);

          if (ch >= 0x80) {
              ret += fromCodePoint(ch);
          } else {
              state.nextChar = ch;
              const code = table[state.nextChar](state, context);

              if (code >= 0) ret += fromCodePoint(code);
              else reportInvalidEscapeError(state, code as InvalidEscapeType);
              ch = state.nextChar;
          }
        // Fast check for '\n', and '\r'
      } else if ((ch & 0x53) < 3 && (ch === Chars.CarriageReturn || ch === Chars.LineFeed)) {
          report(state, Errors.UnterminatedString);
      } else {
          ret += fromCodePoint(ch);
      }
      ch = readNext(state);
  }

  state.index++; // Consume the quote
  state.column++;

  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);

  state.tokenValue = ret;
  state.nextChar = nextChar;
  return Token.StringLiteral;
}

export const table = new Array < (state: ParserState, context: Context) => number > (128).fill(nextUnicodeChar);

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
          state.nextChar = ch;
          state.index = index + 1;
      }
  }

  return InvalidEscapeType.Empty;
};

table[Chars.LineFeed] =
  table[Chars.LineSeparator] =
  table[Chars.ParagraphSeparator] = state => {
      state.column = -1;
      state.line++;
      return InvalidEscapeType.Empty;
  };

table[Chars.CarriageReturn] = state => {
  state.column = -1;
  state.line++;

  const { index } = state;

  if (index < state.source.length) {
      const ch = state.source.charCodeAt(index);

      if (ch === Chars.LineFeed) {
          state.nextChar = ch;
          state.index = index + 1;
      }
  }

  return InvalidEscapeType.Empty;
};

// String literals don't allow ASCII line breaks
table[Chars.LineFeed] =
  table[Chars.LineSeparator] =
  table[Chars.ParagraphSeparator] = state => {
      state.column = -1;
      state.line++;
      return InvalidEscapeType.Empty;
  };

// Null character, octals specification.
table[Chars.Zero] = table[Chars.One] = table[Chars.Two] = table[Chars.Three] = (state, context) => {
  // 1 to 3 octal digits
  let code = state.nextChar - Chars.Zero;
  let index = state.index + 1;
  let column = state.column + 1;
  if (index < state.source.length) {
      let next = state.source.charCodeAt(index);
      if (next < Chars.Zero || next > Chars.Seven) {
          // Strict mode code allows only \0, then a non-digit.
          if (code !== 0 || next === Chars.Eight || next === Chars.Nine) {
              if (context & Context.Strict) return InvalidEscapeType.StrictOctal;
              // If not in strict mode, we mark the 'octal' as found and continue
              // parsing until we parse out the literal AST node
              state.flags = state.flags | Flags.HasOctal;
          }
      } else if (context & Context.Strict) {
          return InvalidEscapeType.StrictOctal;
      } else {
          state.flags = state.flags | Flags.HasOctal;
          state.nextChar = next;
          code = code * 8 + (next - Chars.Zero);
          index++;
          column++;

          if (index < state.source.length) {
              next = state.source.charCodeAt(index);

              if (next >= Chars.Zero && next <= Chars.Seven) {
                  state.nextChar = next;
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
table[Chars.Four] = table[Chars.Five] = table[Chars.Six] = table[Chars.Seven] = (state, context) => {
  if (context & Context.Strict) return InvalidEscapeType.StrictOctal;
  let code = state.nextChar - Chars.Zero;
  const index = state.index + 1;
  const column = state.column + 1;

  if (index < state.source.length) {
      const next = state.source.charCodeAt(index);
      if (next >= Chars.Zero && next <= Chars.Seven) {
          code = code * 8 + (next - Chars.Zero);
          state.nextChar = next;
          state.index = index;
          state.column = column;
      }
  }

  return code;
};

table[Chars.Eight] = table[Chars.Nine] = () => InvalidEscapeType.EightOrNine;

// Hexadecimal character specification
table[Chars.LowerX] = state => {
    // 2 hex digits
  const ch1 = nextChar(state);
  const hi = toHex(ch1);
  if (hi < 0 || state.index >= state.length) return InvalidEscapeType.InvalidHex;
  const ch2 = nextChar(state);
  const lo = toHex(ch2);
  if (lo < 0) return InvalidEscapeType.InvalidHex;
  return hi * 16 + lo;
};

// Unicode character specification.
table[Chars.LowerU] = state => {
  if (nextChar(state) === Chars.LeftBrace) {
      // \u{N}
      let code = toHex(nextChar(state));
      if (code < 0) return InvalidEscapeType.InvalidHex;

      nextChar(state);
      while (state.nextChar !== Chars.RightBrace) {
          const digit = toHex(state.nextChar);
          if (digit < 0) return InvalidEscapeType.InvalidHex;
          code = (code << 4) | digit;
          // Code point out of bounds
          if (code > 0x10FFFF) return InvalidEscapeType.OutOfRange;
          nextChar(state);
      }

      return code;
  } else {
      // \uNNNN
      let code = toHex(state.nextChar);
      if (code < 0) return InvalidEscapeType.InvalidHex;
      for (let i = 0; i < 3; i++) {
          const digit = toHex(nextChar(state));
          if (digit < 0) return InvalidEscapeType.InvalidHex;
          code = (code << 4) | digit;
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
export function reportInvalidEscapeError(state: ParserState, type: InvalidEscapeType): any {
  switch (type) {
    case InvalidEscapeType.StrictOctal: report(state, Errors.StrictOctalEscape);
    case InvalidEscapeType.EightOrNine: report(state, Errors.InvalidEightAndNine);
    case InvalidEscapeType.InvalidHex: report(state, Errors.InvalidHexEscapeSequence);
    case InvalidEscapeType.OutOfRange: report(state, Errors.UnicodeOverflow);
    default: return;
  }
}

export function readNext(state: ParserState): number {
  if (state.nextChar > 0xFFFF) ++state.index;
  const ch = state.nextChar = state.source.charCodeAt(++state.index);
  if (state.index >= state.length) report(state, Errors.UnterminatedString);
  ++state.column;
  return ch;
}

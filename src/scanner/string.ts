import { ParserState, Context, unreachable, unimplemented } from '../common';
import { Chars } from '../chars';
import { Token } from '../token';
import { report, Errors } from '../errors';
import { advance, fromCodePoint, hasNext, nextChar, nextUnicodeChar, storeRaw, toHex } from './common';

const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

function readNext(state: ParserState, prev: number): number {
  advance(state, prev);
  if (!hasNext(state)) report(state, Errors.Unexpected);
  return nextUnicodeChar(state);
}

const enum Constants {
  Size = 128
}

type Callback = (parser: ParserState, context: Context, first: number) => number;
const table = new Array<Callback>(Constants.Size).fill(nextUnicodeChar);

// Magic escapes
table[Chars.LowerB] = () => Chars.Backspace;
table[Chars.LowerF] = () => Chars.FormFeed;
table[Chars.LowerR] = () => Chars.CarriageReturn;
table[Chars.LowerN] = () => Chars.LineFeed;
table[Chars.LowerT] = () => Chars.Tab;
table[Chars.LowerV] = () => Chars.VerticalTab;

// Line continuations
table[Chars.CarriageReturn] = parser => {
  parser.column = -1;
  parser.line++;

  const { index } = parser;

  if (index < parser.source.length) {
    const ch = parser.source.charCodeAt(index);

    if (ch === Chars.LineFeed) {
      parser.lastChar = ch;
      parser.index = index + 1;
    }
  }

  return Escape.Empty;
};

table[Chars.LineFeed] = table[Chars.LineSeparator] = table[Chars.ParagraphSeparator] = parser => {
  parser.column = -1;
  parser.line++;
  return Escape.Empty;
};

// Null character, octals
table[Chars.Zero] = table[Chars.One] = table[Chars.Two] = table[Chars.Three] = (parser, context, first) => {
  let code = first - Chars.Zero;
  let index = parser.index + 1;
  let column = parser.column + 1;

  if (index < parser.source.length) {
    const next = parser.source.charCodeAt(index);

    if (next < Chars.Zero || next > Chars.Seven) {
      if (code !== 0 && context & Context.Strict) return Escape.StrictOctal;
    } else if (context & Context.Strict) {
      return Escape.StrictOctal;
    } else {
      parser.lastChar = next;
      code = (code << 3) | (next - Chars.Zero);
      index++;
      column++;

      if (index < parser.source.length) {
        const next = parser.source.charCodeAt(index);

        if (next >= Chars.Zero && next <= Chars.Seven) {
          parser.lastChar = next;
          code = (code << 3) | (next - Chars.Zero);
          index++;
          column++;
        }
      }

      parser.index = index - 1;
      parser.column = column - 1;
    }
  }

  return code;
};

table[Chars.Four] = table[Chars.Five] = table[Chars.Six] = table[Chars.Seven] = (parser, context, first) => {
  if (context & Context.Strict) return Escape.StrictOctal;
  let code = first - Chars.Zero;
  const index = parser.index + 1;
  const column = parser.column + 1;

  if (index < parser.source.length) {
    const next = parser.source.charCodeAt(index);

    if (next >= Chars.Zero && next <= Chars.Seven) {
      code = (code << 3) | (next - Chars.Zero);
      parser.lastChar = next;
      parser.index = index;
      parser.column = column;
    }
  }

  return code;
};

// `8`, `9` (invalid escapes)
table[Chars.Eight] = table[Chars.Nine] = () => Escape.EightOrNine;

// ASCII escapes
table[Chars.LowerX] = (parser, _, first) => {
  const ch1 = (parser.lastChar = readNext(parser, first));
  const hi = toHex(ch1);
  if (hi < 0) return Escape.InvalidHex;
  const ch2 = (parser.lastChar = readNext(parser, ch1));
  const lo = toHex(ch2);
  if (lo < 0) return Escape.InvalidHex;

  return (hi << 4) | lo;
};

// UCS-2/Unicode escapes
table[Chars.LowerU] = (parser, _, prev) => {
  let ch = (parser.lastChar = readNext(parser, prev));
  if (ch === Chars.LeftBrace) {
    // \u{N}
    ch = parser.lastChar = readNext(parser, ch);
    let code = toHex(ch);
    if (code < 0) return Escape.InvalidHex;

    ch = parser.lastChar = readNext(parser, ch);
    while (ch !== Chars.RightBrace) {
      const digit = toHex(ch);
      if (digit < 0) return Escape.InvalidHex;
      code = (code << 4) | digit;
      if (code > 0x10fff) return Escape.OutOfRange;
      ch = parser.lastChar = readNext(parser, ch);
    }

    return code;
  } else {
    // \uNNNN
    let code = toHex(ch);
    if (code < 0) return Escape.InvalidHex;

    for (let i = 0; i < 3; i++) {
      ch = parser.lastChar = readNext(parser, ch);
      const digit = toHex(ch);
      if (digit < 0) return Escape.InvalidHex;
      code = (code << 4) | digit;
    }

    return code;
  }
};

function handleStringError(state: ParserState, code: Escape): void {
  switch (code) {
    case Escape.Empty:
      return;

    case Escape.StrictOctal:
      return report(state, Errors.Unexpected);

    case Escape.EightOrNine:
      return report(state, Errors.Unexpected);

    case Escape.InvalidHex:
      return report(state, Errors.Unexpected);

    case Escape.OutOfRange:
      return report(state, Errors.Unexpected);

    default:
      return unreachable(code);
  }
}

/**
 * Scan a string token.
 */
export function scanString(state: ParserState, context: Context): Token {
  const { index: start, lastChar, currentChar } = state;
  let ret = '';

  let ch = readNext(state, currentChar);
  while (ch !== currentChar) {
    switch (ch) {
      case Chars.CarriageReturn:
      case Chars.LineFeed:
        report(state, Errors.Unexpected);
      case Chars.Backslash:
        ch = readNext(state, ch);

        if (ch >= Constants.Size) {
          ret += fromCodePoint(ch);
        } else {
          state.lastChar = ch;
          const code = table[ch](state, context, ch);

          if (code >= 0) ret += fromCodePoint(code);
          else handleStringError(state, code as Escape);
          ch = state.lastChar;
        }
        break;

      default:
        ret += fromCodePoint(ch);
    }

    ch = readNext(state, ch);
  }

  advance(state, ch); // Consume the quote
  if (context & Context.OptionsRaw) storeRaw(state, start);
  state.tokenValue = ret;
  state.lastChar = lastChar;
  return Token.StringLiteral;
}

function scanBadTemplate(state: ParserState, ch: number): number {
  while (ch !== Chars.Backtick) {
    // Break after a literal `${` (thus the dedicated code path).
    switch (ch) {
      case Chars.Dollar: {
        const index = state.index + 1;
        if (index < state.source.length && state.source.charCodeAt(index) === Chars.LeftBrace) {
          state.index = index;
          state.column++;
          return -ch;
        }
        break;
      }

      case Chars.Backslash:
        ch = readNext(state, ch);
        break;

      case Chars.CarriageReturn:
        if (hasNext(state) && nextChar(state) === Chars.LineFeed) {
          ch = nextChar(state);
          state.index++;
        }
      // falls through

      case Chars.LineFeed:
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        state.column = -1;
        state.line++;
      // falls through

      default:
      // do nothing
    }

    ch = readNext(state, ch);
  }

  return ch;
}

export function scanTemplate(state: ParserState, context: Context): Token {
  const { index: start, lastChar, currentChar } = state;
  let tail = true;
  let ret: string | void = '';

  let ch = readNext(state, currentChar);

  loop: while (ch !== Chars.Backtick) {
    switch (ch) {
      case Chars.Dollar: {
        const index = state.index + 1;
        if (index < state.source.length && state.source.charCodeAt(index) === Chars.LeftBrace) {
          state.index = index;
          state.column++;
          tail = false;
          break loop;
        }
        ret += '$';
        break;
      }

      case Chars.Backslash:
        ch = readNext(state, ch);

        if (ch >= Constants.Size) {
          ret += fromCodePoint(ch);
        } else {
          state.lastChar = ch;
          const code = table[ch](state, context, ch);

          if (code >= 0) {
            ret += fromCodePoint(code);
          } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
            ret = undefined;
            ch = scanBadTemplate(state, state.lastChar);
            if (ch < 0) {
              ch = -ch;
              tail = false;
            }
            break loop;
          } else {
            handleStringError(state, code as Escape);
          }
          ch = state.lastChar;
        }

        break;

      case Chars.CarriageReturn:
        if (hasNext(state) && nextChar(state) === Chars.LineFeed) {
          if (ret != null) ret += fromCodePoint(ch);
          ch = nextChar(state);
          state.index++;
        }
      // falls through

      case Chars.LineFeed:
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        state.column = -1;
        state.line++;
      // falls through

      default:
        if (ret != null) ret += fromCodePoint(ch);
    }

    ch = readNext(state, ch);
  }

  advance(state, ch); // Consume the quote or opening brace
  state.tokenValue = ret;
  state.lastChar = lastChar;
  if (tail) {
    state.tokenRaw = state.source.slice(start + 1, state.index - 1);
    return Token.TemplateTail;
  } else {
    state.tokenRaw = state.source.slice(start + 1, state.index - 2);
    return Token.TemplateCont;
  }
}

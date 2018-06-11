import { Parser } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { Context } from '../common';
import { toHex, nextUnicodeChar, readNext, fromCodePoint } from './common';
import { Errors, report } from '../errors';

const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5,
}

/**
 * Scan a string literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param quote codepoint
 */
export function scanStringLiteral(parser: Parser, context: Context, quote: number): Token {
  const {index: start, lastValue} = parser;
  let ret = '';

  let ch = readNext(parser, quote);
  while (ch !== quote) {
      switch (ch) {
          case Chars.Backslash:
              ch = readNext(parser, ch);

              if (ch >= 128) {
                  ret += fromCodePoint(ch);
              } else {
                  parser.lastValue = ch;
                  const code = table[ch](parser, context, ch);
                  if (code >= 0) ret += fromCodePoint(code);
                  else handleStringError(parser, code as Escape);
                  ch = parser.lastValue;
              }
              break;
             case Chars.CarriageReturn:
             case Chars.LineFeed:
               report(parser, Errors.UnterminatedString);
          default:
              ret += fromCodePoint(ch);
      }

      ch = readNext(parser, ch);
  }

  parser.index++; parser.column++; // Consume the quote
  parser.tokenRaw = parser.source.slice(start, parser.index);
  parser.tokenValue = ret;
  parser.lastValue = lastValue;

  return Token.StringLiteral;
}














type Callback = (parser: Parser, context: Context, first: number) => number;
const table = new Array<Callback>(128).fill(nextUnicodeChar);

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

    const {index} = parser;

    if (index < parser.source.length) {
        const ch = parser.source.charCodeAt(index);

        if (ch === Chars.LineFeed) {
            parser.lastValue = ch;
            parser.index = index + 1;
        }
    }

    return Escape.Empty;
};

table[Chars.LineFeed] =
table[Chars.LineSeparator] =
table[Chars.ParagraphSeparator] = parser => {
    parser.column = -1;
    parser.line++;
    return Escape.Empty;
};

// Null character, octals
table[Chars.Zero] =
table[Chars.One] =
table[Chars.Two] =
table[Chars.Three] = (parser, context, first) => {
    let code = first - Chars.Zero;
    let index = parser.index + 1;
    let column = parser.column + 1;

    if (index < parser.source.length) {
        const next = parser.source.charCodeAt(index);

        if (next < Chars.Zero || next > Chars.Seven) {
            // Verify that it's `\0` if we're in strict mode.
            if (code !== 0 && context & Context.Strict) return Escape.StrictOctal;
        } else if (context & Context.Strict) {
            // This happens in cases like `\00` in strict mode.
            return Escape.StrictOctal;
        } else {
            parser.lastValue = next;
            code = (code << 3) | (next - Chars.Zero);
            index++; column++;

            if (index < parser.source.length) {
                const next = parser.source.charCodeAt(index);

                if (next >= Chars.Zero && next <= Chars.Seven) {
                    parser.lastValue = next;
                    code = (code << 3) | (next - Chars.Zero);
                    index++; column++;
                }
            }

            parser.index = index - 1;
            parser.column = column - 1;
        }
    }

    return code;
};

table[Chars.Four] =
table[Chars.Five] =
table[Chars.Six] =
table[Chars.Seven] = (parser, context, first) => {
    if (context & Context.Strict) return Escape.StrictOctal;
    let code = first - Chars.Zero;
    const index = parser.index + 1;
    const column = parser.column + 1;

    if (index < parser.source.length) {
        const next = parser.source.charCodeAt(index);

        if (next >= Chars.Zero && next <= Chars.Seven) {
            code = (code << 3) | (next - Chars.Zero);
            parser.lastValue = next;
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
    const ch1 = parser.lastValue = readNext(parser, first);
    const hi = toHex(ch1);
    if (hi < 0) return Escape.InvalidHex;
    const ch2 = parser.lastValue = readNext(parser, ch1);
    const lo = toHex(ch2);
    if (lo < 0) return Escape.InvalidHex;

    return hi << 4 | lo;
};

// UCS-2/Unicode escapes
table[Chars.LowerU] = (parser, _, prev) => {
    let ch = parser.lastValue = readNext(parser, prev);
    if (ch === Chars.LeftBrace) {
        // \u{N}
        // The first digit is required, so handle it *out* of the loop.
        ch = parser.lastValue = readNext(parser, ch);
        let code = toHex(ch);
        if (code < 0) return Escape.InvalidHex;

        ch = parser.lastValue = readNext(parser, ch);
        while (ch !== Chars.RightBrace) {
            const digit = toHex(ch);
            if (digit < 0) return Escape.InvalidHex;
            code = code << 4 | digit;

            // Check this early to avoid `code` wrapping to a negative on overflow (which is
            // reserved for abnormal conditions).
            if (code > 0x10fff) return Escape.OutOfRange;
            ch = parser.lastValue = readNext(parser, ch);
        }

        return code;
    } else {
        // \uNNNN
        let code = toHex(ch);
        if (code < 0) return Escape.InvalidHex;

        for (let i = 0; i < 3; i++) {
            ch = parser.lastValue = readNext(parser, ch);
            const digit = toHex(ch);
            if (digit < 0) return Escape.InvalidHex;
            code = code << 4 | digit;
        }

        return code;
    }
};


function handleStringError(
  parser: Parser,
  code: Escape,
): void {
  switch (code) {
      case Escape.Empty:
          return;

      case Escape.StrictOctal:
          report(parser, Errors.StrictOctalEscape);

      case Escape.EightOrNine:
          report(parser, Errors.InvalidEightAndNine);

      case Escape.InvalidHex:
          report(parser, Errors.InvalidEscape);

      case Escape.OutOfRange:
          report(parser, Errors.InvalidEscape);

      default:
          // ignore
  }
}

import { Chars } from '../chars';
import { Parser } from '../types';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { Context, Flags, Escape } from '../utilities';
import {
    toHex,
    readNext,
    fromCodePoint,
    hasNext,
    nextChar,
    advance,
} from './common';

/**
 * Scan escape sequence
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanEscapeSequence(parser: Parser, context: Context, first: number): number {
    switch (first) {
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
        case Chars.CarriageReturn:
        case Chars.LineFeed:
        case Chars.LineSeparator:
        case Chars.ParagraphSeparator:
            parser.column = -1;
            parser.line++;
            return Escape.Empty;
        case Chars.Zero:
        case Chars.One:
        case Chars.Two:
        case Chars.Three:
            {
                // 1 to 3 octal digits
                let code = first - Chars.Zero;
                let index = parser.index + 1;
                let column = parser.column + 1;

                let next = parser.source.charCodeAt(index);

                if (next < Chars.Zero || next > Chars.Seven) {

                    // Strict mode code allows only \0, then a non-digit.
                    if (code !== 0 || next === Chars.Eight || next === Chars.Nine) {
                        if (context & Context.Strict) return Escape.StrictOctal;
                        parser.flags |= Flags.HasOctal;
                    }
                } else if (context & Context.Strict) {
                    return Escape.StrictOctal;
                } else {
                    parser.flags |= Flags.HasOctal;
                    parser.lastValue = next;
                    code = code * 8 + (next - Chars.Zero);
                    index++;
                    column++;
                    next = parser.source.charCodeAt(index);
                    if (next >= Chars.Zero && next <= Chars.Seven) {
                        parser.lastValue = next;
                        code = code * 8 + (next - Chars.Zero);
                        index++;
                        column++;
                    }

                    parser.index = index - 1;
                    parser.column = column - 1;
                }

                return code;
            }

        case Chars.Four:
        case Chars.Five:
        case Chars.Six:
        case Chars.Seven:
            {
                // 1 to 2 octal digits
                if (context & Context.Strict) return Escape.StrictOctal;
                let code = first - Chars.Zero;
                const index = parser.index + 1;
                const column = parser.column + 1;

                const next = parser.source.charCodeAt(index);

                if (next >= Chars.Zero && next <= Chars.Seven) {
                    code = code * 8 + (next - Chars.Zero);
                    parser.lastValue = next;
                    parser.index = index;
                    parser.column = column;
                }

                return code;
            }

            // `8`, `9` (invalid escapes)
        case Chars.Eight:
        case Chars.Nine:
            return Escape.EightOrNine;

            // ASCII escapes
        case Chars.LowerX:
            {
                const ch1 = parser.lastValue = readNext(parser);
                const hi = toHex(ch1);
                if (hi < 0) return Escape.InvalidHex;
                const ch2 = parser.lastValue = readNext(parser);
                const lo = toHex(ch2);
                if (lo < 0) return Escape.InvalidHex;

                return hi << 4 | lo;
            }

            // UCS-2/Unicode escapes
        case Chars.LowerU:
            {
                let ch = parser.lastValue = readNext(parser);
                if (ch === Chars.LeftBrace) {
                    ch = parser.lastValue = readNext(parser);
                    let code = toHex(ch);
                    if (code < 0) return Escape.InvalidHex;

                    ch = parser.lastValue = readNext(parser);
                    while (ch !== Chars.RightBrace) {
                        const digit = toHex(ch);
                        if (digit < 0) return Escape.InvalidHex;
                        code = code * 16 + digit;
                        // Code point out of bounds
                        if (code > Chars.NonBMPMax) return Escape.OutOfRange;
                        ch = parser.lastValue = readNext(parser);
                    }

                    return code;
                } else {
                    // \uNNNN
                    let codePoint = toHex(ch);
                    if (codePoint < 0) return Escape.InvalidHex;

                    for (let i = 0; i < 3; i++) {
                        ch = parser.lastValue = readNext(parser);
                        const digit = toHex(ch);
                        if (digit < 0) return Escape.InvalidHex;
                        codePoint = codePoint * 16 + digit;
                    }

                    return codePoint;
                }
            }

        default:
            return nextChar(parser);
    }
}

/**
 * Throws a string error for either string or template literal
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function throwStringError(parser: Parser, context: Context, code: Escape) {
    switch (code) {
        case Escape.Empty:
            return;

        case Escape.StrictOctal:
            report(parser, context & Context.TaggedTemplate ?
                Errors.TemplateOctalLiteral :
                Errors.StrictOctalEscape);
        case Escape.EightOrNine:
            report(parser, Errors.InvalidEightAndNine);

        case Escape.InvalidHex:
            report(parser, Errors.InvalidHexEscapeSequence);

        case Escape.OutOfRange:
            report(parser, Errors.UnicodeOutOfRange);
        default:
            // ignore
    }
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
export function scanString(parser: Parser, context: Context, quote: number): Token {
    const { index: start, lastValue} = parser;
    let ret = '';
    let ch = readNext(parser);
    while (ch !== quote) {
        switch (ch) {
            case Chars.CarriageReturn:
            case Chars.LineFeed:
                report(parser, Errors.UnterminatedString);
            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                // Stage 3 proposal
                if (context & Context.OptionsNext) advance(parser);
                report(parser, Errors.UnterminatedString);

            case Chars.Backslash:
                ch = readNext(parser);

                if (ch > Chars.MaxAsciiCharacter) {
                    ret += fromCodePoint(ch);
                } else {
                    parser.lastValue = ch;
                    const code = scanEscapeSequence(parser, context, ch);

                    if (code >= 0) ret += fromCodePoint(code);
                    else throwStringError(parser, context, code as Escape);
                    ch = parser.lastValue;
                }
                break;

            default:
                ret += fromCodePoint(ch);
        }

        ch = readNext(parser);
    }

    advance(parser);

    parser.tokenRaw = parser.source.slice(start, parser.index);
    parser.tokenValue = ret;
    parser.lastValue = lastValue;
    return Token.StringLiteral;
}
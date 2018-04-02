import { Chars } from './chars';
import { Parser } from './types';
import { Errors, report } from './errors';
import { Token } from './token';
import { isValidIdentifierStart } from './unicode';
import {
    hasNext,
    nextChar,
    advance,
    consumeOpt,
    toHex,
    storeRaw,
    Context,
    Flags,
} from './utilities';

export const enum NumericState {
    None = 0,
        SeenSeparator = 1 << 0,
        EigthOrNine = 1 << 1,
        Float = 1 << 2,
        BigInt = 1 << 3,
}

// 11.8.3 Numeric Literals

/**
 * Scans hex integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HexIntegerLiteral)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function scanHexIntegerLiteral(parser: Parser, context: Context): Token {
    advance(parser);
    let state = NumericState.None;
    let value = toHex(nextChar(parser));
    if (value < 0) report(parser, Errors.Unexpected);
    advance(parser);

    while (hasNext(parser)) {
        const next = nextChar(parser);

        if (context & Context.OptionsNext && next === Chars.Underscore) {
            state = scanNumericSeparator(parser, state);
            continue;
        }

        state &= ~NumericState.SeenSeparator;

        const digit = toHex(next);
        if (digit < 0) break;
        value = value * 16 + digit;
        advance(parser);
    }
    if (state & NumericState.SeenSeparator) report(parser, Errors.TrailingNumericSeparator);
    return assembleNumericLiteral(parser, context, value, consumeOpt(parser, Chars.LowerN));
}

/**
 * Scans binary and octal integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalIntegerLiteral)
 * @see [Link](https://tc39.github.io/ecma262/#prod-BinaryIntegerLiteral)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function scanOctalOrBinary(parser: Parser, context: Context, base: number): Token {

    advance(parser);

    let digits = 0;
    let ch;
    let value = 0;
    let state = NumericState.None;

    while (hasNext(parser)) {
        ch = nextChar(parser);

        if (context & Context.OptionsNext && ch === Chars.Underscore) {
            state = scanNumericSeparator(parser, state);
            continue;
        }

        state &= ~NumericState.SeenSeparator;

        const converted = ch - Chars.Zero;
        if (!(ch >= Chars.Zero && ch <= Chars.Nine) || converted >= base) break;
        value = value * base + converted;

        advance(parser);
        digits++;
    }

    if (digits === 0) report(parser, Errors.InvalidOrUnexpectedToken);
    if (state & NumericState.SeenSeparator) report(parser, Errors.TrailingNumericSeparator);
    return assembleNumericLiteral(parser, context, value, consumeOpt(parser, Chars.LowerN));
}

/**
 * Scans implicit octal digits
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalDigits)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
export function scanImplicitOctalDigits(parser: Parser, context: Context): Token {

    switch (nextChar(parser)) {

        case Chars.Zero:
        case Chars.One:
        case Chars.Two:
        case Chars.Three:
        case Chars.Four:
        case Chars.Five:
        case Chars.Six:
        case Chars.Seven:
            {
                if (context & Context.Strict) report(parser, Errors.Unexpected);
                let index = parser.index;
                let column = parser.column;
                let code = 0;

                parser.flags |= Flags.Octal;

                while (index < parser.source.length) {
                    const next = parser.source.charCodeAt(index);
                    if (next === Chars.Underscore) {
                        report(parser, Errors.ZeroDigitNumericSeparator);
                    } else if (next < Chars.Zero || next > Chars.Seven) {
                        return scanNumericLiteral(parser, context);
                    } else {
                        code = code * 8 + (next - Chars.Zero);
                        index++;
                        column++;
                    }
                }

                parser.index = index;
                parser.column = column;
                return assembleNumericLiteral(parser, context, code, consumeOpt(parser, Chars.LowerN));
            }
        case Chars.Eight:
        case Chars.Nine:

            parser.flags |= Flags.Octal;

        default:
            if (context & Context.OptionsNext && nextChar(parser) === Chars.Underscore) {
                report(parser, Errors.ZeroDigitNumericSeparator);
            }

            return scanNumericLiteral(parser, context);
    }
}

/**
 * Scans signed integer
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SignedInteger)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
export function scanSignedInteger(parser: Parser, context: Context, end: number): string {
    let next = nextChar(parser);

    if (next === Chars.Plus || next === Chars.Hyphen) {
        advance(parser);
        next = nextChar(parser);
    }

    if (!(next >= Chars.Zero && next <= Chars.Nine)) {
        report(parser, Errors.InvalidOrUnexpectedToken);
    }

    return parser.source.substring(end, parser.index) + scanDecimalDigitsOrSeparator(parser, context);
}

/**
 * Scans numeric literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function scanNumericLiteral(parser: Parser, context: Context, state: NumericState = NumericState.None): Token {

    let value: any = state & NumericState.Float ?
        0 :
        scanDecimalAsSmi(parser, context);

    const next = nextChar(parser);

    // I know I'm causing a bug here. The question is - will anyone figure this out?
    if (next !== Chars.Period && next !== Chars.Period && !isValidIdentifierStart(next)) {
        return assembleNumericLiteral(parser, context, value);
    }

    if (consumeOpt(parser, Chars.Period)) {
        if (context & Context.OptionsNext && nextChar(parser) === Chars.Underscore) {
            report(parser, Errors.ZeroDigitNumericSeparator);
        }
        state |= NumericState.Float;
        value = value + '.' + scanDecimalDigitsOrSeparator(parser, context);
    }

    const end = parser.index;

    if (consumeOpt(parser, Chars.LowerN)) {
        if (state & NumericState.Float) report(parser, Errors.Unexpected);
        state |= NumericState.BigInt;
    }

    if (consumeOpt(parser, Chars.LowerE) || consumeOpt(parser, Chars.UpperE)) {
        value += scanSignedInteger(parser, context, end);

    }

    if (isValidIdentifierStart(nextChar(parser))) {
        report(parser, Errors.Unexpected);
    }

    return assembleNumericLiteral(parser, context, state & NumericState.Float ? parseFloat(value) : parseInt(value), !!(state & NumericState.BigInt));
}

/**
 * Internal helper function for scanning numeric separators.
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {state} NumericState state
 */
export function scanNumericSeparator(parser: Parser, state: NumericState): NumericState {
    advance(parser);
    if (state & NumericState.SeenSeparator) report(parser, Errors.TrailingNumericSeparator);
    state |= NumericState.SeenSeparator;
    return state;
}

/**
 * Internal helper function that scans numeric values
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
export function scanDecimalDigitsOrSeparator(parser: Parser, context: Context): string {

    let start = parser.index;
    let state = NumericState.None;
    let ret = '';

    loop:
        while (hasNext(parser)) {
            switch (nextChar(parser)) {
                case Chars.Underscore:
                    const preUnderscoreIndex = parser.index;
                    state = scanNumericSeparator(parser, state);
                    ret += parser.source.substring(start, preUnderscoreIndex);
                    start = parser.index;
                    continue;

                case Chars.Zero:
                case Chars.One:
                case Chars.Two:
                case Chars.Three:
                case Chars.Four:
                case Chars.Five:
                case Chars.Six:
                case Chars.Seven:
                case Chars.Eight:
                case Chars.Nine:
                    state = state & ~NumericState.SeenSeparator;
                    advance(parser);
                    break;
                default:
                    break loop;
            }
        }

    if (state & NumericState.SeenSeparator) report(parser, Errors.TrailingNumericSeparator);
    return ret + parser.source.substring(start, parser.index);
}

/**
 * Internal helper function that scans numeric values
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
export function scanDecimalAsSmi(parser: Parser, context: Context): number {
    let state = NumericState.None;
    let value = 0;
    let next = nextChar(parser);
    while (next >= Chars.Zero && next <= Chars.Nine || next === Chars.Underscore) {
        if (context & Context.OptionsNext && next === Chars.Underscore) {
            state = scanNumericSeparator(parser, state);
            next = nextChar(parser);
            continue;
        }
        state &= ~NumericState.SeenSeparator;
        value = value * 10 + (next - Chars.Zero);
        advance(parser);
        next = nextChar(parser);
    }

    if (state & NumericState.SeenSeparator) report(parser, Errors.TrailingNumericSeparator);
    return value;
}

/**
 * Internal helper function that assamble the number scanning parts and return
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {value} The numeric value
 */
function assembleNumericLiteral(parser: Parser, context: Context, value: number, isBigInt = false): Token {
    parser.tokenValue = value;
    if (context & Context.OptionsRaw) storeRaw(parser, parser.startIndex);
    return isBigInt ? Token.BigIntLiteral : Token.NumericLiteral;
}
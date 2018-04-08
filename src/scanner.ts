import { Chars } from './chars';
import { Parser } from './types';
import { Errors, report } from './errors';
import { Token, tokenDesc, descKeyword } from './token';
import { isValidIdentifierStart, isValidIdentifierPart, mustEscape } from './unicode';
import { skipSingleLineComment, skipMultiLineComment } from './comments';
import {
    hasNext,
    nextChar,
    advanceNewline,
    advanceAndOrSkipUC,
    advance,
    consumeLineFeed,
    consumeOpt,
    escapeForPrinting,
    nextUnicodeChar,
    toHex,
    storeRaw,
    scanPrivateName,
    Context,
    fromCodePoint,
    Flags,
    ScannerState,
    isIdentifierPart,
    Escape,
    RegexFlags,
    NumericState
} from './utilities';

/**
 * Scan
 *
 * @param parser Parser instance
 * @param context Context masks
 */
export function scan(parser: Parser, context: Context): Token {

    parser.flags &= ~Flags.NewLine;

    let state = parser.index === 0 ? ScannerState.LineStart : ScannerState.None;

    while (hasNext(parser)) {

        if (context & Context.OptionsRanges && !(state & ScannerState.LineStart)) {
            parser.startIndex = parser.index;
            parser.startColumn = parser.column;
            parser.startLine = parser.line;
        }

        let first = nextChar(parser);

        if (first >= 128) first = nextUnicodeChar(parser);

        switch (first) {

            case Chars.CarriageReturn:
                state |= ScannerState.NewLine | ScannerState.LastIsCR;
                advanceNewline(parser);
                break;

            case Chars.LineFeed:
                consumeLineFeed(parser, state);
                state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                break;

            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                advanceNewline(parser);
                break;

            case Chars.ByteOrderMark:
            case Chars.Tab:
            case Chars.VerticalTab:
            case Chars.FormFeed:
            case Chars.Space:
            case Chars.NonBreakingSpace:
            case Chars.Ogham:
            case Chars.EnQuad:
            case Chars.EmQuad:
            case Chars.EnSpace:
            case Chars.EmSpace:
            case Chars.ThreePerEmSpace:
            case Chars.FourPerEmSpace:
            case Chars.SixPerEmSpace:
            case Chars.FigureSpace:
            case Chars.PunctuationSpace:
            case Chars.ThinSpace:
            case Chars.HairSpace:
            case Chars.NarrowNoBreakSpace:
            case Chars.MathematicalSpace:
            case Chars.IdeographicSpace:
            case Chars.ZeroWidthNoBreakSpace:
            case Chars.ZeroWidthJoiner:
            case Chars.ZeroWidthNonJoiner:
                state |= ScannerState.SameLine;
                advance(parser);
                break;

                // `/`, `/=`, `/>`
            case Chars.Slash:
                {
                    advance(parser);

                    state |= ScannerState.SameLine;

                    if (!hasNext(parser)) return Token.Divide;

                    switch (nextChar(parser)) {
                        case Chars.Slash:
                            {
                                advance(parser);
                                state = skipSingleLineComment(parser, context, state, 'SingleLine');
                                continue;
                            }
                        case Chars.Asterisk:
                            {
                                advance(parser);
                                state = skipMultiLineComment(parser, context, state);
                                continue;
                            }
                        case Chars.EqualSign:
                            {
                                advance(parser);
                                return Token.DivideAssign;
                            }

                        default:
                            return Token.Divide;
                    }
                }

                // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
            case Chars.LessThan:

                advance(parser); // skip `<`

                if (!(context & Context.Module) &&
                    consumeOpt(parser, Chars.Exclamation) &&
                    consumeOpt(parser, Chars.Hyphen) &&
                    consumeOpt(parser, Chars.Hyphen)) {
                    state = skipSingleLineComment(parser, context, state, 'HTMLOpen');
                    continue;
                }
                switch (nextChar(parser)) {
                    case Chars.LessThan:
                        advance(parser);
                        return consumeOpt(parser, Chars.EqualSign) ?
                            Token.ShiftLeftAssign :
                            Token.ShiftLeft;

                    case Chars.EqualSign:
                        advance(parser);
                        return Token.LessThanOrEqual;

                    default: // ignore
                        return Token.LessThan;
                }

                // `-`, `--`, `-=`
            case Chars.Hyphen:
                {
                    advance(parser); // skip `-`
                    if (!hasNext(parser)) return Token.Subtract;

                    const next = nextChar(parser);

                    switch (next) {
                        case Chars.Hyphen:
                            {
                                advance(parser);
                                if (state & (ScannerState.LineStart | ScannerState.NewLine) &&
                                    nextChar(parser) === Chars.GreaterThan) {
                                    if (!(context & Context.Module)) {
                                        advance(parser);
                                        state = skipSingleLineComment(parser, context, state, 'HTMLClose');
                                    }
                                    continue;
                                }
                                return Token.Decrement;
                            }
                        case Chars.EqualSign:
                            {
                                advance(parser);
                                return Token.SubtractAssign;
                            }
                        default:
                            return Token.Subtract;
                    }
                }
                // `!`, `!=`, `!==`
            case Chars.Exclamation:
                advance(parser);
                if (!consumeOpt(parser, Chars.EqualSign)) return Token.Negate;
                if (!consumeOpt(parser, Chars.EqualSign)) return Token.LooseNotEqual;
                return Token.StrictNotEqual;

                // `'string'`, `"string"`
            case Chars.SingleQuote:
            case Chars.DoubleQuote:
                return scanString(parser, context, first);

                // `%`, `%=`
            case Chars.Percent:
                advance(parser);
                if (!consumeOpt(parser, Chars.EqualSign)) return Token.Modulo;
                return Token.ModuloAssign;

                // `&`, `&&`, `&=`
            case Chars.Ampersand:
                {
                    advance(parser);
                    const next = nextChar(parser);

                    if (next === Chars.Ampersand) {
                        advance(parser);
                        return Token.LogicalAnd;
                    }

                    if (next === Chars.EqualSign) {
                        advance(parser);
                        return Token.BitwiseAndAssign;
                    }

                    return Token.BitwiseAnd;
                }

                // `*`, `**`, `*=`, `**=`
            case Chars.Asterisk:
                {
                    advance(parser);
                    if (!hasNext(parser)) return Token.Multiply;
                    const next = nextChar(parser);

                    if (next === Chars.EqualSign) {
                        advance(parser);
                        return Token.MultiplyAssign;
                    }

                    if (next !== Chars.Asterisk) return Token.Multiply;
                    advance(parser);
                    if (!consumeOpt(parser, Chars.EqualSign)) return Token.Exponentiate;
                    return Token.ExponentiateAssign;
                }

                // `+`, `++`, `+=`
            case Chars.Plus:
                {
                    advance(parser);
                    if (!hasNext(parser)) return Token.Add;
                    const next = nextChar(parser);

                    if (next === Chars.Plus) {
                        advance(parser);
                        return Token.Increment;
                    }

                    if (next === Chars.EqualSign) {
                        advance(parser);
                        return Token.AddAssign;
                    }

                    return Token.Add;
                }

                // `.`, `...`, `.123` (numeric literal)
            case Chars.Period:
                {
                    let index = parser.index + 1;

                    const next = parser.source.charCodeAt(index);
                    if (next >= Chars.Zero && next <= Chars.Nine) {
                            scanNumericLiteral(parser, context, NumericState.Float);
                            return Token.NumericLiteral;
                        } else if (next === Chars.Period) {
                            index++;
                            if (index < parser.source.length &&
                                parser.source.charCodeAt(index) === Chars.Period) {
                                parser.index = index + 1;
                                parser.column += 3;
                                return Token.Ellipsis;
                            }
                        }

                    advance(parser);
                    return Token.Period;
                }

                // `0`...`9`
            case Chars.Zero:
                {

                    advance(parser);

                    switch (nextChar(parser)) {
                        case Chars.UpperX:
                        case Chars.LowerX:
                            return scanHexIntegerLiteral(parser, context);
                        case Chars.UpperB:
                        case Chars.LowerB:
                            return scanOctalOrBinary(parser, context, 2);
                        case Chars.UpperO:
                        case Chars.LowerO:
                            return scanOctalOrBinary(parser, context, 8);
                        default:
                            return scanImplicitOctalDigits(parser, context);
                    }
                }

            case Chars.One:
            case Chars.Two:
            case Chars.Three:
            case Chars.Four:
            case Chars.Five:
            case Chars.Six:
            case Chars.Seven:
            case Chars.Eight:
            case Chars.Nine:
                return scanNumericLiteral(parser, context);

                // `#`
            case Chars.Hash:
                {
                    advance(parser);

                    const index = parser.index;

                    const next = parser.source.charCodeAt(index);

                    if (context & Context.OptionsShebang &&
                        state & ScannerState.LineStart &&
                        next === Chars.Exclamation) {
                        parser.index = index + 1;
                        skipSingleLineComment(parser, context, ScannerState.None, 'SheBang');
                        continue;
                    }
                    return scanPrivateName(parser, context);
                }
                // `(`
            case Chars.LeftParen:
                advance(parser);
                return Token.LeftParen;

                // `)`
            case Chars.RightParen:
                advance(parser);
                return Token.RightParen;

                // `,`
            case Chars.Comma:
                advance(parser);
                return Token.Comma;

                // `:`
            case Chars.Colon:
                advance(parser);
                return Token.Colon;

                // `@`
            case Chars.At:
                advance(parser);
                return Token.At;

                // `;`
            case Chars.Semicolon:
                advance(parser);
                return Token.Semicolon;

                // `?`
            case Chars.QuestionMark:
                advance(parser);
                return Token.QuestionMark;

                // `]`
            case Chars.RightBracket:
                advance(parser);
                return Token.RightBracket;

                // `{`
            case Chars.LeftBrace:
                advance(parser);
                return Token.LeftBrace;

                // `}`
            case Chars.RightBrace:
                advance(parser);
                return Token.RightBrace;

                // `~`
            case Chars.Tilde:
                advance(parser);
                return Token.Complement;

                // `=`, `==`, `===`, `=>`
            case Chars.EqualSign:
                {
                    advance(parser);

                    const next = nextChar(parser);

                    if (next === Chars.EqualSign) {
                        advance(parser);
                        if (consumeOpt(parser, Chars.EqualSign)) {
                            return Token.StrictEqual;
                        } else {
                            return Token.LooseEqual;
                        }
                    } else if (next === Chars.GreaterThan) {
                        advance(parser);
                        return Token.Arrow;
                    }

                    return Token.Assign;
                }

                // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
            case Chars.GreaterThan:
                {
                    advance(parser);
                    if (!hasNext(parser)) return Token.GreaterThan;
                    const next = nextChar(parser);

                    if (next === Chars.EqualSign) {
                        advance(parser);
                        return Token.GreaterThanOrEqual;
                    }

                    if (next !== Chars.GreaterThan) return Token.GreaterThan;
                    advance(parser);

                    if (hasNext(parser)) {
                        const next = nextChar(parser);

                        if (next === Chars.GreaterThan) {
                            advance(parser);
                            if (consumeOpt(parser, Chars.EqualSign)) {
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (next === Chars.EqualSign) {
                            advance(parser);
                            return Token.ShiftRightAssign;
                        }
                    }

                    return Token.ShiftRight;
                }

                // `[`
            case Chars.LeftBracket:
                advance(parser);
                return Token.LeftBracket;

                // `\\u{N}var`
            case Chars.Backslash:
                return scanIdentifier(parser, context);

                // `^`, `^=`
            case Chars.Caret:
                advance(parser);
                if (!consumeOpt(parser, Chars.EqualSign)) return Token.BitwiseXor;
                return Token.BitwiseXorAssign;

                // ``string``
            case Chars.Backtick:
                return scanTemplate(parser, context, first);

                // `|`, `||`, `|=`
            case Chars.VerticalBar:
                {
                    advance(parser);

                    const next = nextChar(parser);

                    if (next === Chars.VerticalBar) {
                        advance(parser);
                        return Token.LogicalOr;
                    } else if (next === Chars.EqualSign) {
                        advance(parser);
                        return Token.BitwiseOrAssign;
                    }

                    return Token.BitwiseOr;
                }

                // `a`...`z`, `A`...`Z`, `_var`, `$var`
            case Chars.UpperA:
            case Chars.UpperB:
            case Chars.UpperC:
            case Chars.UpperD:
            case Chars.UpperE:
            case Chars.UpperF:
            case Chars.UpperG:
            case Chars.UpperH:
            case Chars.UpperI:
            case Chars.UpperJ:
            case Chars.UpperK:
            case Chars.UpperL:
            case Chars.UpperM:
            case Chars.UpperN:
            case Chars.UpperO:
            case Chars.UpperP:
            case Chars.UpperQ:
            case Chars.UpperR:
            case Chars.UpperS:
            case Chars.UpperT:
            case Chars.UpperU:
            case Chars.UpperV:
            case Chars.UpperW:
            case Chars.UpperX:
            case Chars.UpperY:
            case Chars.UpperZ:
            case Chars.Dollar:
            case Chars.Underscore:
            case Chars.LowerA:
            case Chars.LowerB:
            case Chars.LowerC:
            case Chars.LowerD:
            case Chars.LowerE:
            case Chars.LowerF:
            case Chars.LowerG:
            case Chars.LowerH:
            case Chars.LowerI:
            case Chars.LowerJ:
            case Chars.LowerK:
            case Chars.LowerL:
            case Chars.LowerM:
            case Chars.LowerN:
            case Chars.LowerO:
            case Chars.LowerP:
            case Chars.LowerQ:
            case Chars.LowerR:
            case Chars.LowerS:
            case Chars.LowerT:
            case Chars.LowerU:
            case Chars.LowerV:
            case Chars.LowerW:
            case Chars.LowerX:
            case Chars.LowerY:
            case Chars.LowerZ:
                return scanIdentifier(parser, context);

            default:
                if (isValidIdentifierStart(first)) return scanIdentifier(parser, context);
                report(parser, Errors.UnexpectedChar, escapeForPrinting(nextUnicodeChar(parser)));
        }
    }

    return Token.EndOfSource;
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

    const preNumericPart  = parser.index;
    const finalFragment = scanDecimalDigitsOrSeparator(parser, context);
    return parser.source.substring(end, preNumericPart) + finalFragment;
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
        state |= NumericState.Float;
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
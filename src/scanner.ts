import { Chars } from './chars';
import { Parser } from './types';
import { Errors, report, tolerant } from './errors';
import { Token, descKeyword, tokenDesc } from './token';
import { isValidIdentifierStart } from './unicode';
import { skipSingleLineComment, skipMultiLineComment } from './comments';
import {
    hasNext,
    nextChar,
    advanceNewline,
    advance,
    consumeLineFeed,
    consumeOpt,
    escapeForPrinting,
    nextUnicodeChar,
    toHex,
    scanPrivateName,
    Context,
    fromCodePoint,
    Flags,
    ScannerState,
    isIdentifierPart,
    readNext,
    Escape,
    RegexFlags,
    RegexState,
    NumericState,
    advanceOnMaybeAstral
} from './utilities';

/**
 * Scan
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-punctuatorss)
 * @see [Link](https://tc39.github.io/ecma262/#sec-names-and-keywords)
 *
 * @param parser Parser instance
 * @param context Context masks
 */

export function scan(parser: Parser, context: Context): Token {

    parser.flags &= ~Flags.NewLine | Flags.EscapedKeyword;

    const lineStart = parser.index === 0;

    let state = ScannerState.None;

    while (hasNext(parser)) {

        if (!lineStart) {
            parser.startIndex = parser.index;
            parser.startColumn = parser.column;
            parser.startLine = parser.line;
        }

        const first = nextChar(parser);

        if (first > Chars.MaxAsciiCharacter) {

            switch (first) {

                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    advanceNewline(parser);
                    break;

                case Chars.ByteOrderMark:
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
                case Chars.Zwnbs:
                case Chars.Zwj:
                case Chars.Zwnbs:
                    advance(parser);
                    break;

                default:
                    return parseMaybeIdentifier(parser, context, first);
            }

        } else {
            switch (first) {

                case Chars.CarriageReturn:
                    state |= ScannerState.NewLine | ScannerState.LastIsCR;
                    advanceNewline(parser);
                    break;

                case Chars.LineFeed:
                    consumeLineFeed(parser, state);
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    break;

                case Chars.Tab:
                case Chars.VerticalTab:
                case Chars.FormFeed:
                case Chars.Space:
                    advance(parser);
                    break;

                    // `/`, `/=`, `/>`
                case Chars.Slash:
                    {
                        advance(parser);

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
                        case Chars.Slash: {
                                if (!(context & Context.OptionsJSX)) break;
                                const index = parser.index + 1;

                                // Check that it's not a comment start.
                                if (index < parser.source.length) {
                                    const next = parser.source.charCodeAt(index);
                                    if (next === Chars.Asterisk || next === Chars.Slash) break;
                                }

                                advance(parser);
                                return Token.JSXClose;
                            }
                        default: // ignore
                            return Token.LessThan;
                    }

                    // `-`, `--`, `-=`
                case Chars.Hyphen:
                    {
                        advance(parser); // skip `-`

                        const next = nextChar(parser);

                        switch (next) {
                            case Chars.Hyphen:
                                {
                                    advance(parser);
                                    if ((state & ScannerState.NewLine || lineStart) &&
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
                            // Hex number - '0x', '0X'
                            case Chars.UpperX:
                            case Chars.LowerX:
                                return scanHexIntegerLiteral(parser, context);
                                // Binary number - '0b', '0B'
                            case Chars.UpperB:
                            case Chars.LowerB:
                                return scanOctalOrBinary(parser, context, 2);
                                // Octal number - '0o', '0O'
                            case Chars.UpperO:
                            case Chars.LowerO:
                                return scanOctalOrBinary(parser, context, 8);
                            default:
                                // Implicit octal digits startign with '0'
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
                            lineStart &&
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

                        if (context & Context.InJSXChild) return Token.GreaterThan;

                        let next = nextChar(parser);

                        if (next === Chars.EqualSign) {
                            advance(parser);
                            return Token.GreaterThanOrEqual;
                        }

                        if (next !== Chars.GreaterThan) return Token.GreaterThan;
                        advance(parser);

                        next = nextChar(parser);

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
                    return scanTemplate(parser, context);

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
                default:
                    return scanIdentifier(parser, context, first);
            }
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

                parser.flags |= Flags.HasOctal;

                // Implicit octal, unless there is a non-octal digit.
                // (Annex B.1.1 on Numeric Literals)
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

            parser.flags |= Flags.HasOctal;

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
export function scanSignedInteger(parser: Parser, end: number): string {
    let next = nextChar(parser);

    if (next === Chars.Plus || next === Chars.Hyphen) {
        advance(parser);
        next = nextChar(parser);
    }

    if (!(next >= Chars.Zero && next <= Chars.Nine)) {
        report(parser, Errors.InvalidOrUnexpectedToken);
    }

    const preNumericPart = parser.index;
    const finalFragment = scanDecimalDigitsOrSeparator(parser);
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
    if (next !== Chars.Period && next !== Chars.Underscore && !isValidIdentifierStart(next)) {
        return assembleNumericLiteral(parser, context, value);
    }

    if (consumeOpt(parser, Chars.Period)) {
        if (context & Context.OptionsNext && nextChar(parser) === Chars.Underscore) {
            report(parser, Errors.ZeroDigitNumericSeparator);
        }
        state |= NumericState.Float;
        value = value + '.' + scanDecimalDigitsOrSeparator(parser);
    }

    const end = parser.index;

    if (consumeOpt(parser, Chars.LowerN)) {
        if (state & NumericState.Float) report(parser, Errors.Unexpected);
        state |= NumericState.BigInt;
    }

    if (consumeOpt(parser, Chars.LowerE) || consumeOpt(parser, Chars.UpperE)) {
        state |= NumericState.Float;
        value += scanSignedInteger(parser, end);
    }

    if (isValidIdentifierStart(nextChar(parser))) {
        report(parser, Errors.Unexpected);
    }

    return assembleNumericLiteral(parser, context, state & NumericState.Float ? parseFloat(value) : parseInt(value, 10), !!(state & NumericState.BigInt));
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
export function scanDecimalDigitsOrSeparator(parser: Parser): string {

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
    if (context & Context.OptionsRaw) parser.tokenRaw = parser.source.slice(parser.startIndex, parser.index);
    return isBigInt ? Token.BigIntLiteral : Token.NumericLiteral;
}

/**
 * Scan identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-names-and-keywords)
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function scanIdentifier(parser: Parser, context: Context, first ?: number): Token {
    let start = parser.index;
    let ret: string = '';
    let isEscaped = false;
    if (first) advanceOnMaybeAstral(parser, first);
    loop:
        while (hasNext(parser)) {
            const index = parser.index;
            let ch = parser.source.charCodeAt(index);
            switch (ch) {

                case Chars.Backslash:
                    ret += parser.source.slice(start, index);
                    ret += scanUnicodeCodePointEscape(parser);
                    start = parser.index;
                    isEscaped = true;
                    break;

                default:
                    if (ch >= 0xD800 && ch <= 0xDBFF) {
                        const lo = parser.source.charCodeAt(index + 1);
                        ch = (ch & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
                    }
                    if (!isIdentifierPart(ch)) break loop;
                    advanceOnMaybeAstral(parser, ch);
            }
        }
    if (start < parser.index) ret += parser.source.slice(start, parser.index);
    parser.tokenValue = ret;

    const len = ret.length;

    // Keywords are between 2 and 11 characters long and start with a lowercase letter
    // https://tc39.github.io/ecma262/#sec-keywords
    if (len >= 2 && len <= 11) {
        const token = descKeyword(ret);
        if (token > 0) {
            if (isEscaped) {
                if (context & Context.DisallowEscapedKeyword) {
                    tolerant(parser, context, Errors.UnexpectedEscapedKeyword, tokenDesc(token as any));
                }
                // Here we fall back to a mutual parser flag if the escaped keyword isn't disallowed through
                // context masks. This is similiar to how V8 does it - they are using an
                // 'escaped_keyword' token.
                // - J.K. Thomas
                parser.flags |= Flags.EscapedKeyword;
            }
            return token;
        }
    }

    if (context & Context.OptionsRawidentifiers) parser.tokenRaw = parser.source.slice(start, parser.index);
    return Token.Identifier;
}

/**
 * Scanning chars in the range 0...127, and treat them as an possible
 * identifier. This allows subsequent checking to be faster.
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param first Code point
 */

function parseMaybeIdentifier(parser: Parser, context: Context, first: number): Token {
    first = nextUnicodeChar(parser);
    if (!isValidIdentifierStart(first)) {
        report(parser, Errors.UnexpectedChar, escapeForPrinting(first));
    }
    return scanIdentifier(parser, context, first);
}

/**
 * Scan unicode codepoint escape
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanUnicodeCodePointEscape(parser: Parser): string | void {

    const { index } = parser;

    if (index + 5 < parser.source.length) {

        if (parser.source.charCodeAt(index + 1) !== Chars.LowerU) {
            report(parser, Errors.Unexpected);
        }

        parser.index += 2;
        parser.column += 2;

        const code = scanIdentifierUnicodeEscape(parser);

        if (code >= Chars.LeadSurrogateMin && code <= Chars.LeadSurrogateMax) {
            report(parser, Errors.UnexpectedSurrogate);
        }

        if (!isIdentifierPart(code)) {
            report(parser, Errors.InvalidUnicodeEscapeSequence);
        }

        return fromCodePoint(code);
    }

    report(parser, Errors.Unexpected);
}

/**
 * Scan identifier unicode escape
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanIdentifierUnicodeEscape(parser: Parser): Chars {

    // Accept both \uxxxx and \u{xxxxxx}. In the latter case, the number of
    // hex digits between { } is arbitrary. \ and u have already been read.
    let ch = nextChar(parser);
    let codePoint = 0;

    // '\u{DDDDDDDD}'
    if (ch === Chars.LeftBrace) { // {
        ch = readNext(parser);

        let digit = toHex(ch);

        while (digit >= 0) {
            codePoint = (codePoint << 4) | digit;
            if (codePoint > Chars.NonBMPMax) {
                report(parser, Errors.Unexpected /*UndefinedUnicodeCodePoint*/ );
            }
            advance(parser);
            digit = toHex(nextChar(parser));
        }

        if (nextChar(parser) !== Chars.RightBrace) {
            report(parser, Errors.InvalidHexEscapeSequence);
        }

        consumeOpt(parser, Chars.RightBrace);

        // '\uDDDD'
    } else {

        for (let i = 0; i < 4; i++) {
            ch = nextChar(parser);
            const digit = toHex(ch);
            if (digit < 0) report(parser, Errors.InvalidHexEscapeSequence);
            codePoint = (codePoint << 4) | digit;
            advance(parser);
        }
    }

    return codePoint;
}

/**
 * Scan escape sequence
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanEscapeSequence(parser: Parser, context: Context, first: number): number {
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
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function throwStringError(parser: Parser, context: Context, code: Escape): void {
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
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {context} quote codepoint
 */
export function scanString(parser: Parser, context: Context, quote: number): Token {
    const { index: start, lastValue } = parser;
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

                if (ch >= 128) {
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

/**
 * Scan looser template segment
 *
 * @param {Parser} Parser instance
 * @param {context} codepoint
 */
function scanLooserTemplateSegment(parser: Parser, ch: number): number {
    while (ch !== Chars.Backtick) {

        if (ch === Chars.Dollar) {
            const index = parser.index + 1;
            if (parser.source.charCodeAt(index) === Chars.LeftBrace) {
                parser.index = index;
                parser.column++;
                return -ch;
            }
        }

        // Skip '\' and continue to scan the template token to search
        // for the end, without validating any escape sequences
        ch = readNext(parser);
    }

    return ch;
}

/**
 * Consumes template brace
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function consumeTemplateBrace(parser: Parser, context: Context): Token {
    if (!hasNext(parser)) report(parser, Errors.UnterminatedTemplate);
    // Upon reaching a '}', consume it and rewind the scanner state
    parser.index--;
    parser.column--;
    return scanTemplate(parser, context);
}

/**
 * Scan template
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 * @param {first} Codepoint
 */
export function scanTemplate(parser: Parser, context: Context): Token {
    const { index: start, lastValue } = parser;
    let tail = true;
    let ret: string | void = '';

    let ch = readNext(parser);

    loop:
        while (ch !== Chars.Backtick) {

            switch (ch) {
                // Break after a literal `${` (thus the dedicated code path).
                case Chars.Dollar:
                    {
                        const index = parser.index + 1;
                        if (index < parser.source.length &&
                            parser.source.charCodeAt(index) === Chars.LeftBrace) {
                            parser.index = index;
                            parser.column++;
                            tail = false;
                            break loop;
                        }
                        ret += '$';
                        break;
                    }

                case Chars.Backslash:
                    ch = readNext(parser);

                    if (ch >= 128) {
                        ret += fromCodePoint(ch);
                    } else {
                        parser.lastValue = ch;
                        // Because octals are forbidden in escaped template sequences and the fact that
                        // both string and template scanning uses the same method - 'scanEscapeSequence',
                        // we set the strict context mask.
                        const code = scanEscapeSequence(parser, context | Context.Strict, ch);
                        if (code >= 0) {
                            ret += fromCodePoint(code);
                        } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                            ret = undefined;
                            ch = scanLooserTemplateSegment(parser, parser.lastValue);
                            if (ch < 0) {
                                tail = false;
                            }
                            break loop;
                        } else {
                            throwStringError(parser, context | Context.TaggedTemplate, code as Escape);
                        }
                        ch = parser.lastValue;
                    }

                    break;

                case Chars.CarriageReturn:
                    if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) {
                        if (ret != null) ret += fromCodePoint(ch);
                        ch = nextChar(parser);
                        parser.index++;
                    }
                    // falls through

                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    parser.column = -1;
                    parser.line++;
                    // falls through

                default:
                    if (ret != null) ret += fromCodePoint(ch);
            }

            ch = readNext(parser);
        }

    advance(parser);
    parser.tokenValue = ret;
    parser.lastValue = lastValue;
    if (tail) {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 1);
        return Token.TemplateTail;
    } else {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
        return Token.TemplateCont;
    }
}
export function scanRegularExpression(parser: Parser, context: Context): Token {

    const bodyStart = parser.index;

    let preparseState = RegexState.Empty;

    loop:
        while (true) {
            const ch = nextChar(parser);
            advance(parser);

            if (preparseState & RegexState.Escape) {
                preparseState &= ~RegexState.Escape;
            } else {
                switch (ch) {
                    case Chars.Slash:
                        if (!preparseState) break loop;
                        else break;
                    case Chars.Backslash:
                        preparseState |= RegexState.Escape;
                        break;
                    case Chars.LeftBracket:
                        preparseState |= RegexState.Class;
                        break;
                    case Chars.RightBracket:
                        preparseState &= RegexState.Escape;
                        break;
                    case Chars.CarriageReturn:
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        report(parser, Errors.UnterminatedRegExp);
                    default: // ignore
                }
            }

            if (!hasNext(parser)) {
                report(parser, Errors.UnterminatedRegExp);
            }
        }

    const bodyEnd = parser.index - 1;

    let mask = RegexFlags.Empty;

    const { index: flagStart } = parser;

    loop:
        while (hasNext(parser)) {
            const code = nextChar(parser);

            switch (code) {
                case Chars.LowerG:

                    if (mask & RegexFlags.Global) report(parser, Errors.DuplicateRegExpFlag, 'g');
                    mask |= RegexFlags.Global;
                    break;

                case Chars.LowerI:
                    if (mask & RegexFlags.IgnoreCase) report(parser, Errors.DuplicateRegExpFlag, 'i');
                    mask |= RegexFlags.IgnoreCase;
                    break;

                case Chars.LowerM:
                    if (mask & RegexFlags.Multiline) report(parser, Errors.DuplicateRegExpFlag, 'm');
                    mask |= RegexFlags.Multiline;
                    break;

                case Chars.LowerU:
                    if (mask & RegexFlags.Unicode) report(parser, Errors.DuplicateRegExpFlag, 'u');
                    mask |= RegexFlags.Unicode;
                    break;

                case Chars.LowerY:
                    if (mask & RegexFlags.Sticky) report(parser, Errors.DuplicateRegExpFlag, 'y');
                    mask |= RegexFlags.Sticky;
                    break;

                case Chars.LowerS:
                    if (mask & RegexFlags.DotAll) report(parser, Errors.DuplicateRegExpFlag, 's');
                    mask |= RegexFlags.DotAll;
                    break;

                default:
                    if (!isIdentifierPart(code)) break loop;
                    report(parser, Errors.UnexpectedTokenRegExpFlag, fromCodePoint(code));
            }

            advance(parser);
        }

    const flags = parser.source.slice(flagStart, parser.index);

    const pattern = parser.source.slice(bodyStart, bodyEnd);

    parser.tokenRegExp = { pattern, flags };

    if (context & Context.OptionsRaw) parser.tokenRaw = parser.source.slice(parser.startIndex, parser.index);

    parser.tokenValue = validate(parser, context, pattern, flags);

    return Token.RegularExpression;
}

/**
 * Validates regular expressions
 *
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param pattern Regexp body
 * @param flags Regexp flags
 */
function validate(
    parser: Parser,
    context: Context,
    pattern: string,
    flags: string) {

    if (!(context & Context.OptionsNode)) {
        try {
            RegExp(pattern);
        } catch (e) {
            report(parser, Errors.UnterminatedRegExp);
        }
    }
    try {
        return new RegExp(pattern, flags);
    } catch (e) {
        return null;
    }
}
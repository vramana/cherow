import { Chars } from '../chars';
import { Parser } from '../types';
import { Token, descKeyword, tokenDesc } from '../token';
import { scanTemplate } from './template';
import { scanNumericLiteral, scanImplicitOctalDigits, scanOctalOrBinary, scanHexIntegerLiteral } from './numbers';
import { scanString } from './string';
import { scanIdentifier, scanMaybeIdentifier } from './identifier';
import { skipMultiLineComment, skipSingleLineComment, skipSingleHTMLComment } from './comments';
import { Context, Flags, ScannerState, Escape, NumericState } from '../utilities';
import { consumeLineFeed, consumeOpt, advanceNewline, scanPrivateName } from './common';

/**
 * Scan
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-punctuatorss)
 * @see [Link](https://tc39.github.io/ecma262/#sec-names-and-keywords)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scan(parser: Parser, context: Context): Token {

    parser.flags &= ~Flags.NewLine | Flags.EscapedKeyword;

    const lineStart = parser.index === 0;

    let state = ScannerState.None;

    while (parser.index < parser.length) {

        if (!lineStart) {
            parser.startIndex = parser.index;
            parser.startColumn = parser.column;
            parser.startLine = parser.line;
        }

        const first = parser.source.charCodeAt(parser.index);

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
                    parser.index++; parser.column++;
                    break;

                default:
                    return scanMaybeIdentifier(parser, context, first);
            }

        } else {

            // Note: Here we first get rid of LT and  WS, then we make sure that the lookup time
            // for the single punctuator char is short as possible. A single punctuator
            // char is a valid token that cannot also be a prefix of a combination
            // of long tokens - e.g. '(', ')' and '=' is valid. '==' is not.
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
                    parser.index++; parser.column++;
                    break;

                    // `(`
                case Chars.LeftParen:
                    parser.index++; parser.column++;
                    return Token.LeftParen;

                    // `)`
                case Chars.RightParen:
                    parser.index++; parser.column++;
                    return Token.RightParen;

                    // `,`
                case Chars.Comma:
                    parser.index++; parser.column++;
                    return Token.Comma;

                    // `:`
                case Chars.Colon:
                    parser.index++; parser.column++;
                    return Token.Colon;

                    // `;`
                case Chars.Semicolon:
                    parser.index++; parser.column++;
                    return Token.Semicolon;

                    // `?`
                case Chars.QuestionMark:
                    parser.index++; parser.column++;
                    return Token.QuestionMark;

                    // `]`
                case Chars.RightBracket:
                    parser.index++; parser.column++;
                    return Token.RightBracket;

                    // `{`
                case Chars.LeftBrace:
                    parser.index++; parser.column++;
                    return Token.LeftBrace;

                    // `}`
                case Chars.RightBrace:
                    parser.index++; parser.column++;
                    return Token.RightBrace;

                    // `~`
                case Chars.Tilde:
                    parser.index++; parser.column++;
                    return Token.Complement;

                    // `[`
                case Chars.LeftBracket:
                    parser.index++; parser.column++;
                    return Token.LeftBracket;

                    // `@`
                case Chars.At:
                    parser.index++; parser.column++;
                    return Token.At;

                    // `/`, `/=`, `/>`
                case Chars.Slash:
                    {
                        parser.index++; parser.column++;

                        if (parser.index >= parser.length) return Token.Divide;

                        switch (parser.source.charCodeAt(parser.index)) {
                            case Chars.Slash:
                                {
                                    parser.index++; parser.column++;
                                    state = skipSingleLineComment(parser, context, state, 'SingleLine');
                                    continue;
                                }
                            case Chars.Asterisk:
                                {
                                    parser.index++; parser.column++;
                                    state = skipMultiLineComment(parser, context, state);
                                    continue;
                                }
                            case Chars.EqualSign:
                                {
                                    parser.index++; parser.column++;
                                    return Token.DivideAssign;
                                }

                            default:
                                return Token.Divide;
                        }
                    }

                    // `-`, `--`, `-=`
                case Chars.Hyphen:
                    {
                        parser.index++; parser.column++; // skip `-`

                        const next = parser.source.charCodeAt(parser.index);

                        switch (next) {
                            case Chars.Hyphen:
                                {
                                    parser.index++; parser.column++;
                                    if ((state & ScannerState.NewLine || lineStart) &&
                                        consumeOpt(parser, Chars.GreaterThan)) {
                                        state = skipSingleHTMLComment(parser, context, state, 'HTMLClose');
                                        continue;
                                    }
                                    return Token.Decrement;
                                }
                            case Chars.EqualSign:
                                {
                                    parser.index++; parser.column++;
                                    return Token.SubtractAssign;
                                }
                            default:
                                return Token.Subtract;
                        }
                    }

                    // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
                case Chars.LessThan:

                    parser.index++; parser.column++; // skip `<`

                    if (consumeOpt(parser, Chars.Exclamation) &&
                        consumeOpt(parser, Chars.Hyphen) &&
                        consumeOpt(parser, Chars.Hyphen)) {
                        state = skipSingleHTMLComment(parser, context, state, 'HTMLOpen');
                        continue;
                    }

                    switch (parser.source.charCodeAt(parser.index)) {
                        case Chars.LessThan:
                            parser.index++; parser.column++;
                            return consumeOpt(parser, Chars.EqualSign) ?
                                Token.ShiftLeftAssign :
                                Token.ShiftLeft;

                        case Chars.EqualSign:
                            parser.index++; parser.column++;
                            return Token.LessThanOrEqual;

                        case Chars.Slash:
                            {
                                if (!(context & Context.OptionsJSX)) break;
                                const index = parser.index + 1;

                                // Check that it's not a comment start.
                                if (index < parser.length) {
                                    const next = parser.source.charCodeAt(index);
                                    if (next === Chars.Asterisk || next === Chars.Slash) break;
                                }

                                parser.index++; parser.column++;
                                return Token.JSXClose;
                            }
                        default: // ignore
                            return Token.LessThan;
                    }

                    // `!`, `!=`, `!==`
                case Chars.Exclamation:
                    parser.index++; parser.column++;
                    if (!consumeOpt(parser, Chars.EqualSign)) return Token.Negate;
                    if (!consumeOpt(parser, Chars.EqualSign)) return Token.LooseNotEqual;
                    return Token.StrictNotEqual;

                    // `'string'`, `"string"`
                case Chars.SingleQuote:
                case Chars.DoubleQuote:
                    return scanString(parser, context, first);

                    // `%`, `%=`
                case Chars.Percent:
                    parser.index++; parser.column++;
                    if (!consumeOpt(parser, Chars.EqualSign)) return Token.Modulo;
                    return Token.ModuloAssign;

                    // `&`, `&&`, `&=`
                case Chars.Ampersand:
                    {
                        parser.index++; parser.column++;
                        const next = parser.source.charCodeAt(parser.index);

                        if (next === Chars.Ampersand) {
                            parser.index++; parser.column++;
                            return Token.LogicalAnd;
                        }

                        if (next === Chars.EqualSign) {
                            parser.index++; parser.column++;
                            return Token.BitwiseAndAssign;
                        }

                        return Token.BitwiseAnd;
                    }

                    // `*`, `**`, `*=`, `**=`
                case Chars.Asterisk:
                    {
                        parser.index++; parser.column++;
                        if (parser.index >= parser.length) return Token.Multiply;
                        const next = parser.source.charCodeAt(parser.index);

                        if (next === Chars.EqualSign) {
                            parser.index++; parser.column++;
                            return Token.MultiplyAssign;
                        }

                        if (next !== Chars.Asterisk) return Token.Multiply;
                        parser.index++; parser.column++;
                        if (!consumeOpt(parser, Chars.EqualSign)) return Token.Exponentiate;
                        return Token.ExponentiateAssign;
                    }

                    // `+`, `++`, `+=`
                case Chars.Plus:
                    {
                        parser.index++; parser.column++;
                        if (parser.index >= parser.length) return Token.Add;
                        const next = parser.source.charCodeAt(parser.index);

                        if (next === Chars.Plus) {
                            parser.index++; parser.column++;
                            return Token.Increment;
                        }

                        if (next === Chars.EqualSign) {
                            parser.index++; parser.column++;
                            return Token.AddAssign;
                        }

                        return Token.Add;
                    }

                    // `\\u{N}var`
                case Chars.Backslash:
                    return scanIdentifier(parser, context);

                    // `=`, `==`, `===`, `=>`
                case Chars.EqualSign:
                    {
                        parser.index++; parser.column++;

                        const next = parser.source.charCodeAt(parser.index);

                        if (next === Chars.EqualSign) {
                            parser.index++; parser.column++;
                            if (consumeOpt(parser, Chars.EqualSign)) {
                                return Token.StrictEqual;
                            } else {
                                return Token.LooseEqual;
                            }
                        } else if (next === Chars.GreaterThan) {
                            parser.index++; parser.column++;
                            return Token.Arrow;
                        }

                        return Token.Assign;
                    }

                    // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
                case Chars.GreaterThan:
                    {
                        parser.index++; parser.column++;

                        if (parser.index >= parser.length) return Token.GreaterThan;

                        if (context & Context.InJSXChild) return Token.GreaterThan;

                        let next = parser.source.charCodeAt(parser.index);

                        if (next === Chars.EqualSign) {
                            parser.index++; parser.column++;
                            return Token.GreaterThanOrEqual;
                        }

                        if (next !== Chars.GreaterThan) return Token.GreaterThan;
                        parser.index++; parser.column++;

                        next = parser.source.charCodeAt(parser.index);

                        if (next === Chars.GreaterThan) {
                            parser.index++; parser.column++;
                            if (consumeOpt(parser, Chars.EqualSign)) {
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (next === Chars.EqualSign) {
                            parser.index++; parser.column++;
                            return Token.ShiftRightAssign;
                        }
                        return Token.ShiftRight;
                    }

                    // `^`, `^=`
                case Chars.Caret:
                    parser.index++; parser.column++;
                    if (!consumeOpt(parser, Chars.EqualSign)) return Token.BitwiseXor;
                    return Token.BitwiseXorAssign;

                    // ``string``
                case Chars.Backtick:
                    return scanTemplate(parser, context);

                    // `|`, `||`, `|=`
                case Chars.VerticalBar:
                    {
                        parser.index++; parser.column++;

                        const next = parser.source.charCodeAt(parser.index);

                        if (next === Chars.VerticalBar) {
                            parser.index++; parser.column++;
                            return Token.LogicalOr;
                        } else if (next === Chars.EqualSign) {
                            parser.index++; parser.column++;
                            return Token.BitwiseOrAssign;
                        }

                        return Token.BitwiseOr;
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
                            if (index < parser.length &&
                                parser.source.charCodeAt(index) === Chars.Period) {
                                parser.index = index + 1;
                                parser.column += 3;
                                return Token.Ellipsis;
                            }
                        }

                        parser.index++; parser.column++;
                        return Token.Period;
                    }
                    // `#`
                case Chars.Hash:
                    {
                        parser.index++; parser.column++;

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

                    // `0`...`9`
                case Chars.Zero:
                    {
                        parser.index++; parser.column++;

                        switch (parser.source.charCodeAt(parser.index)) {
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

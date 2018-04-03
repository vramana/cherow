import { Chars } from './chars';
import { Parser } from './types';
import { Errors, report } from './errors';
import { Token, tokenDesc, descKeyword } from './token';
import { isValidIdentifierStart, isValidIdentifierPart, mustEscape } from './unicode';
import { skipSingleLineComment, skipMultiLineComment } from './comments';
import { scanNumericLiteral, scanHexIntegerLiteral, scanOctalOrBinary, scanImplicitOctalDigits, NumericState } from './numbers';
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
    isIdentifierPart
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

                    if (!hasNext(parser))  return Token.Divide;
                        
                        switch (nextChar(parser)) {
                            case Chars.Slash: {
                                advance(parser);
                                state = skipSingleLineComment(parser, state);
                                continue;
                            }
                            case Chars.Asterisk: {
                                advance(parser);
                                state = skipMultiLineComment(parser, state);
                                continue;
                            }
                            case Chars.EqualSign:{
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
                if (!hasNext(parser)) return Token.LessThan;

                if (!(context & Context.Module) &&
                    consumeOpt(parser, Chars.Exclamation) &&
                    consumeOpt(parser, Chars.Hyphen) &&
                    consumeOpt(parser, Chars.Hyphen)) {
                    state = skipSingleLineComment(parser, state);
                    continue;
                }
                switch (nextChar(parser)) {
                    case Chars.LessThan:
                        advance(parser);
                        return consumeOpt(parser, Chars.EqualSign) 
                        ? Token.ShiftLeftAssign
                        : Token.ShiftLeft;

                    case Chars.EqualSign:
                        advance(parser);
                        return Token.LessThanOrEqual;

                    case Chars.Slash:
                        {
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
                                            state = skipSingleLineComment(parser, state);
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
                    if (!hasNext(parser)) return Token.BitwiseAnd;
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
                    if (index < parser.source.length) {
                        const next = parser.source.charCodeAt(index);
                        if (next >= Chars.Zero && next <= Chars.Nine) {
                            scanNumericLiteral(parser, context, NumericState.Float);
                            return Token.NumericLiteral;
                        } else  if (next === Chars.Period) {
                            index++;
                            if (index < parser.source.length &&
                                parser.source.charCodeAt(index) === Chars.Period) {
                                parser.index = index + 1;
                                parser.column += 3;
                                return Token.Ellipsis;
                            }
                        } 
                    }

                    advance(parser);
                    return Token.Period;
                }

                // `0`...`9`
            case Chars.Zero: {

                advance(parser)

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
                        skipSingleLineComment(parser, ScannerState.None);
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
                    if (!hasNext(parser)) return Token.Assign;
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
                    if (!hasNext(parser)) return Token.BitwiseOr;
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

// Coming soon
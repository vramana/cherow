import { Parser, OnToken } from '../types';
import { Token } from '../token';
import { Context, Flags } from '../common';
import { convertToken, advanceNewline, consumeOpt, escapeForPrinting, nextUnicodeChar, mapToToken } from './common';
import { Chars } from '../chars';
import { scanIdentifier } from './identifier';
import { skipSingleHTMLComment, skipSingleLineComment, skipMultilineComment } from './comments';
import { scanStringLiteral } from './string';
import { scanNumeric, parseFractionalNumber, parseLeadingZero } from './numeric';
import { Errors, recordErrors } from '../errors';

function impossible(parser: Parser, context: Context): void {
    recordErrors(parser, context, Errors.UnexpectedToken, escapeForPrinting(nextUnicodeChar(parser)));
}

const lexerTable = new Array(128).fill(impossible, 0, 0xFFFF) as ((parser: Parser, context: Context, first: number) => Token)[];

lexerTable[Chars.Space] =
    lexerTable[Chars.Tab] =
    lexerTable[Chars.FormFeed] =
    lexerTable[Chars.VerticalTab] =
    lexerTable[Chars.FormFeed] = (parser: Parser) => {
        parser.index++; parser.column++;
        return Token.WhiteSpace;
    };

lexerTable[Chars.LineSeparator] =
    lexerTable[Chars.ParagraphSeparator] =
    lexerTable[Chars.LineFeed] =
    lexerTable[Chars.CarriageReturn] = (parser: Parser, context: Context, first: number) => {
        const c = context;
        advanceNewline(parser, first);
        parser.flags |= Flags.NewLine;
        return Token.WhiteSpace;
    };

// `,`
lexerTable[Chars.Comma] = mapToToken(Token.Comma);

// `~`
lexerTable[Chars.Tilde] = mapToToken(Token.Complement);
// `?`
lexerTable[Chars.QuestionMark] = mapToToken(Token.QuestionMark);

// `[`
lexerTable[Chars.LeftBracket] = mapToToken(Token.LeftBracket);

// `]`
lexerTable[Chars.RightBracket] = mapToToken(Token.RightBracket);

// `{`
lexerTable[Chars.LeftBrace] = mapToToken(Token.LeftBrace);

// `}`
lexerTable[Chars.RightBrace] = mapToToken(Token.RightBrace);

// `:`
lexerTable[Chars.Colon] = mapToToken(Token.Colon);

// `;`
lexerTable[Chars.Semicolon] = mapToToken(Token.Semicolon);

// `(`
lexerTable[Chars.LeftParen] = mapToToken(Token.LeftParen);

// `)`
lexerTable[Chars.RightParen] = mapToToken(Token.RightParen);

// `"`, `'`
lexerTable[Chars.SingleQuote] = lexerTable[Chars.DoubleQuote] = scanStringLiteral;

// `0`
lexerTable[Chars.Zero] = parseLeadingZero;

// `/`, `/=`, `/>`
lexerTable[Chars.Slash] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (parser.index >= parser.length) return Token.Divide;
    const next = parser.source.charCodeAt(parser.index);
    if (next === Chars.Slash) {
        skipSingleLineComment(parser);
        return Token.SingleComment;
    } else if (next === Chars.Asterisk) {
        return skipMultilineComment(parser);
    } else if (next === Chars.EqualSign) {
        parser.index++; parser.column++;
        return Token.DivideAssign;
    } else if (next === Chars.GreaterThan) {
        parser.index++; parser.column++;
        return Token.JSXAutoClose;
    }
    return Token.Divide;
};

// `!`, `!=`, `!==`
lexerTable[Chars.Exclamation] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (consumeOpt(parser, Chars.EqualSign)) {
        if (consumeOpt(parser, Chars.EqualSign)) {
            return Token.StrictNotEqual;
        } else {
            return Token.LooseNotEqual;
        }
    } else {
        return Token.Negate;
    }
};

// `%`, `%=`
lexerTable[Chars.Percent] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (consumeOpt(parser, Chars.EqualSign)) {
        return Token.ModuloAssign;
    } else {
        return Token.Modulo;
    }
};

// `&`, `&&`, `&=`
lexerTable[Chars.Ampersand] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (parser.index < parser.length) {
        const next = parser.source.charCodeAt(parser.index);
        if (next === Chars.Ampersand) {
            parser.index++; parser.column++;
            return Token.LogicalAnd;
        } else if (next === Chars.EqualSign) {
            parser.index++; parser.column++;
            return Token.BitwiseAndAssign;
        }
    }
    return Token.BitwiseAnd;
};

// `*`, `**`, `*=`, `**=`
lexerTable[Chars.Asterisk] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (parser.index < parser.length) {
        const next = parser.source.charCodeAt(parser.index);
        if (next === Chars.Asterisk) {
            parser.index++;
            parser.column++;
            if (consumeOpt(parser, Chars.EqualSign)) {
                return Token.ExponentiateAssign;
            } else {
                return Token.Exponentiate;
            }
        } else if (next === Chars.EqualSign) {
            parser.index++; parser.column++;
            return Token.MultiplyAssign;
        }
    }

    return Token.Multiply;
};

// `+`, `++`, `+=`
lexerTable[Chars.Plus] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (parser.index < parser.length) {
        const next = parser.source.charCodeAt(parser.index);
        if (next === Chars.Plus) {
            parser.index++; parser.column++;
            return Token.Increment;
        } else if (next === Chars.EqualSign) {
            parser.index++; parser.column++;
            return Token.AddAssign;
        }
    }

    return Token.Add;
};

// `-`, `--`, `-=`
lexerTable[Chars.Hyphen] = (parser: Parser, context) => {
    parser.index++; parser.column++;
    const next = parser.source.charCodeAt(parser.index);
    if (next === Chars.Hyphen &&
        parser.source.charCodeAt(parser.index + 1) === Chars.GreaterThan) {
        skipSingleHTMLComment(parser, context);
        return Token.HTMLComment;
    } else if (parser.index < parser.source.length) {
        if (next === Chars.Hyphen) {
            parser.index++; parser.column++;
            return Token.Decrement;
        } else if (next === Chars.EqualSign) {
            parser.index++; parser.column++;
            return Token.SubtractAssign;
        }
    }

    return Token.Subtract;
};

// `.`, `...`, `.123` (numeric literal)
lexerTable[Chars.Period] = (parser: Parser) => {
    let index = parser.index + 1;
        const next = parser.source.charCodeAt(index);

        if (next === Chars.Period) {
            index++;
            if (index < parser.source.length &&
                parser.source.charCodeAt(index) === Chars.Period) {
                parser.index = index + 1;
                parser.column += 3;
                return Token.Ellipsis;
            }
        } else if (next >= Chars.Zero && next <= Chars.Nine) {
            return parseFractionalNumber(parser);
        }
    parser.index++; parser.column++;
    return Token.Period;
};

// `1`...`9`
for (let i = Chars.One; i <= Chars.Nine; i++) {
    lexerTable[i] = scanNumeric;
}

// `<`, `<=`, `<<`, `<<=`, `</`,  <!--
lexerTable[Chars.LessThan] = (parser: Parser, context: Context) => {
    parser.index++; parser.column++;
    if (parser.index < parser.source.length) {

        switch (parser.source.charCodeAt(parser.index)) {
            case Chars.LessThan:
                parser.index++; parser.column++;
                if (consumeOpt(parser, Chars.EqualSign)) {
                    return Token.ShiftLeftAssign;
                } else {
                    return Token.ShiftLeft;
                }

            case Chars.EqualSign:
                parser.index++; parser.column++;
                return Token.LessThanOrEqual;

            case Chars.Exclamation:
                {
                    if (parser.source.charCodeAt(parser.index + 1) === Chars.Hyphen &&
                        parser.source.charCodeAt(parser.index + 2) === Chars.Hyphen) {
                        return skipSingleHTMLComment(parser, context);
                    }
                    break;
                }

            case Chars.Slash:
                {
                    if (!(context & Context.OptionsJSX)) break;
                    const index = parser.index + 1;

                    // Check that it's not a comment start.
                    if (index < parser.source.length) {
                        const next = parser.source.charCodeAt(index);
                        if (next === Chars.Asterisk || next === Chars.Slash) break;
                    }

                    parser.index++; parser.column++;
                    return Token.JSXClose;
                }

            default: // ignore
        }
    }

    return Token.LessThan;
};

// `=`, `==`, `===`, `=>`
lexerTable[Chars.EqualSign] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (parser.index < parser.source.length) {
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
    }

    return Token.Assign;
};

// `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
lexerTable[Chars.GreaterThan] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (parser.index < parser.source.length) {
        const next = parser.source.charCodeAt(parser.index);

        if (next === Chars.GreaterThan) {
            parser.index++; parser.column++;

            if (parser.index < parser.source.length) {
                const next = parser.source.charCodeAt(parser.index);

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
            }

            return Token.ShiftRight;
        } else if (next === Chars.EqualSign) {
            parser.index++; parser.column++;
            return Token.GreaterThanOrEqual;
        }
    }

    return Token.GreaterThan;
};

// `A`...`Z`
for (let i = Chars.UpperA; i <= Chars.UpperZ; i++) {
    lexerTable[i] = scanIdentifier;
}
// `a`...z`
for (let i = Chars.LowerA; i <= Chars.LowerZ; i++) {
    lexerTable[i] = scanIdentifier;
}


// `\\u{N}var`
lexerTable[Chars.Backslash] = scanIdentifier;

// `^`, `^=`
lexerTable[Chars.Caret] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (consumeOpt(parser, Chars.EqualSign)) {
        return Token.BitwiseXorAssign;
    } else {
        return Token.BitwiseXor;
    }
};

// `$foo`, `_var`
lexerTable[Chars.Dollar] =
lexerTable[Chars.Underscore] = scanIdentifier;


// ``string``
// lexerTable[Chars.Backtick] = scanTemplate;

// `|`, `||`, `|=`
lexerTable[Chars.VerticalBar] = (parser: Parser) => {
    parser.index++; parser.column++;
    if (parser.index >= parser.length) return Token.BitwiseOr;
    const next = parser.source.charCodeAt(parser.index);
    if (next === Chars.VerticalBar) {
        parser.index++;
        parser.column++;
        return Token.LogicalOr;
    } else if (next === Chars.EqualSign) {
        parser.index++; parser.column++;
        return Token.BitwiseOrAssign;
    }
    return Token.BitwiseOr;
};

/**
 *
 * parser Parser object
 * context Context masks
 */
export function nextToken(
    parser: Parser,
    context: Context,
    onToken?: void | ((token: Token) => void)
  ): Token {
    parser.flags &= ~Flags.NewLine;
    // remember last token position before scanning
    parser.lastIndex = parser.index;
    parser.lastLine = parser.line;
    parser.lastColumn = parser.column;
    while (parser.index < parser.length) {
        const first = parser.source.charCodeAt(parser.index);
        parser.startIndex = parser.index;
        parser.startColumn = parser.column;
        parser.startLine = parser.line;
        const token = lexerTable[first](parser, context, first);
        if ((token & Token.WhiteSpace) === Token.WhiteSpace) continue;
        if (onToken) onToken(token);
        return parser.token = token;
    }
    return parser.token = Token.EndOfSource;
}

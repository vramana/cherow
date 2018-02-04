import * as ESTree from './estree';
import { fromCodePoint, toHex, isPrologueDirective, hasBit, map, isValidSimpleAssignmentTarget, isValidDestructuringAssignmentTarget, isInOrOfKeyword } from './common';
import { Options, OnComment } from './cherow';
import { Chars } from './chars';
import { Token, tokenDesc, descKeyword } from './token';
import { isIdentifierPart } from './unicode';
import { createError, Errors, ErrorMessages } from './errors';
import { Context, Flags, ScannerState, ObjectState, Escape, RegExpState, RegexFlags, NumericState, ParenthesizedState, ArrayState } from './flags';
import { isValidIdentifierStart, isIdentifierStart } from './unicode';

export interface Location {
    line: number;
    column: number;
    index: number;
}

export class Parser {

    private readonly source: string;
    private flags: Flags;
    private index: number;
    private line: number;
    private column: number;

    private startIndex: number;
    private startLine: number;
    private startColumn: number;

    private lastIndex: number;
    private lastLine: number;
    private lastColumn: number;

    private token: Token;
    private tokenValue: any;
    private tokenRaw: string;
    private tokenRegExp: any;
    private lastChar: number;
    private fileName: string;
    private comments: any;
    private earlyErors: any;
    private labelSet: any;
    private errorLocation: any;

    constructor(source: string, onComment: OnComment) {
        this.source = source;
        this.token = Token.EndOfSource;
        this.flags = Flags.None;
        this.index = 0;
        this.line = 1;
        this.column = 0;
        this.startIndex = 0;
        this.startLine = 1;
        this.startColumn = 0;
        this.lastColumn = 0;
        this.lastIndex = 0;
        this.lastLine = 0;
        this.lastColumn = 0;
        this.tokenRaw = '';
        this.tokenValue = undefined;
        this.tokenRegExp = undefined;
        this.labelSet = undefined;
        this.errorLocation = undefined;
        this.lastChar = 0;
        this.fileName = '';

        this.comments = [];
        this.earlyErors = [];
    }

    public parseStatementList(context: Context): any {

        this.nextToken(context);
        const hasStrictDirective = (this.flags & Flags.StrictDirective) !== 0;
        const statements: ESTree.Statement[] = [];

        while (this.token === Token.StringLiteral) {

            const item: ESTree.Statement = this.parseDirective(context);

            statements.push(item);

            if (!isPrologueDirective(item)) break;

            if (hasStrictDirective) context |= Context.Strict;
        }

        while (this.token !== Token.EndOfSource) {
            statements.push(this.parseStatementListItem(context));
        }

        return statements;
    }

    public parseModuleItemList(context: Context): ESTree.Statement[] {

        // Prime the scanner
        this.nextToken(context);

        const statements: ESTree.Statement[] = [];

        while (this.token === Token.StringLiteral) {
            statements.push(this.parseDirective(context));
        }

        while (this.token !== Token.EndOfSource) {
            statements.push(this.parseModuleItem(context | Context.AllowIn));
        }

        return statements;
    }

    private hasNext() {
        return this.index < this.source.length;
    }

    private advance() {
        this.index++;
        this.column++;
    }

    private consumeUnicode(ch: number) {
        this.advance();
        if (ch > 0xffff) this.index++;
    }

    private nextChar(): number {
        return this.source.charCodeAt(this.index);
    }

    private storeRaw(start: number) {
        this.tokenRaw = this.source.slice(start, this.index);
    }

    private readNext(prev: number, message: Errors = Errors.Unexpected): number {
        this.consumeUnicode(prev);
        if (!this.hasNext()) return this.report(message);
        return this.nextUnicodeChar();
    }

    private nextUnicodeChar(): number {
        const index = this.index;
        const hi = this.source.charCodeAt(index);
        if (hi < Chars.LeadSurrogateMin || hi > Chars.LeadSurrogateMax) return hi;
        const lo = this.source.charCodeAt(index + 1);
        if (lo < Chars.TrailSurrogateMin || lo > Chars.TrailSurrogateMax) return hi;
        return Chars.NonBMPMin + ((hi & 0x3FF) << 10) | lo & 0x3FF;
    }

    private consume(code: number): boolean {
        if (this.source.charCodeAt(this.index) !== code) return false;
        this.index++;
        this.column++;
        return true;
    }

    private consumeLineFeed(lastIsCR: boolean) {
        this.flags |= Flags.LineTerminator;
        this.index++;
        if (!lastIsCR) {
            this.column = 0;
            this.line++;
        }
    }

    private advanceNewline() {
        this.flags |= Flags.LineTerminator;
        this.index++;
        this.column = 0;
        this.line++;
    }

    private scan(context: Context): Token {

        this.flags &= ~(Flags.LineTerminator | Flags.ExtendedUnicodeEscape);

        let state = this.index === 0 ? ScannerState.LineStart : ScannerState.None;

        while (this.hasNext()) {

            if (this.index > 0) {
                this.startIndex = this.index;
                this.startColumn = this.column;
                this.startLine = this.line;
            }

            let first = this.nextChar();

            if (first >= 128) first = this.nextUnicodeChar();

            switch (first) {

                case Chars.CarriageReturn:
                    state |= ScannerState.NewLine | ScannerState.LastIsCR;
                    this.advanceNewline();
                    continue;

                case Chars.LineFeed:
                    this.consumeLineFeed((state & ScannerState.LastIsCR) !== 0);
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    continue;

                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    this.advanceNewline();
                    continue;

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
                    if (context & Context.ProhibitWhitespace) this.report(Errors.Unexpected);
                    state |= ScannerState.SameLine;
                    this.advance();
                    continue;

                case Chars.Slash:
                    {
                        state |= ScannerState.SameLine;

                        this.advance();

                        switch (this.nextChar()) {

                            // Look for a single-line comment.
                            case Chars.Slash:
                                {
                                    this.advance();
                                    state = this.skipSingleLineComment(context, state | ScannerState.SingleLine);
                                    continue;
                                }

                                // Look for a multi-line comment.
                            case Chars.Asterisk:
                                {
                                    this.advance();
                                    state = this.skipMultiLineComment(context, state) as ScannerState;
                                    continue;
                                }
                            case Chars.EqualSign:
                                {
                                    this.advance();
                                    return Token.DivideAssign;
                                }
                            default:
                                return Token.Divide;
                        }
                    }

                case Chars.LessThan:
                    {
                        this.advance(); // skip `<`

                        if (!(context & Context.Module) &&
                            this.consume(Chars.Exclamation) &&
                            this.consume(Chars.Hyphen) &&
                            this.consume(Chars.Hyphen)) {
                            // Treat HTML begin-comment as comment-till-end-of-line.
                            state = this.skipSingleLineComment(context, state | ScannerState.HTMLOpen);
                        } else {
                            switch (this.nextChar()) {
                                case Chars.LessThan:
                                    this.advance();
                                    return this.consume(Chars.EqualSign) ?
                                        Token.ShiftLeftAssign :
                                        Token.ShiftLeft;
                                case Chars.EqualSign:
                                    this.advance();
                                    return Token.LessThanOrEqual;

                                default: // ignore
                                    return Token.LessThan;
                            }
                        }

                        continue;
                    }

                case Chars.Hyphen:
                    {
                        this.advance(); // skip `-`
                        const next = this.nextChar();
                        if (next === Chars.Hyphen) {
                            this.advance();
                            if (this.nextChar() === Chars.GreaterThan &&
                                !(context & Context.Module ||
                                    !(state & (ScannerState.LineStart | ScannerState.NewLine)))) {
                                this.advance();
                                state = this.skipSingleLineComment(context, state | ScannerState.HTMLClose);
                                continue;
                            }

                            return Token.Decrement;
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.SubtractAssign;
                        } else {
                            return Token.Subtract;
                        }
                    }

                    // `!`, `!=`, `!==`
                case Chars.Exclamation:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.Negate;
                    if (!this.consume(Chars.EqualSign)) return Token.LooseNotEqual;
                    return Token.StrictNotEqual;

                    // `'string'`, `"string"`
                case Chars.SingleQuote:
                case Chars.DoubleQuote:
                    return this.scanString(context, first);

                    // `%`, `%=`
                case Chars.Percent:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.Modulo;
                    return Token.ModuloAssign;

                    // `&`, `&&`, `&=`
                case Chars.Ampersand:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (next === Chars.Ampersand) {
                            this.advance();
                            return Token.LogicalAnd;
                        }

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.BitwiseAndAssign;
                        }

                        return Token.BitwiseAnd;
                    }

                    // `*`, `**`, `*=`, `**=`
                case Chars.Asterisk:
                    {
                        this.advance();

                        if (!this.hasNext() || context & Context.InTypeAnnotation) return Token.Multiply;

                        const next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.MultiplyAssign;
                        }

                        if (next !== Chars.Asterisk) return Token.Multiply;
                        this.advance();
                        if (!this.consume(Chars.EqualSign)) return Token.Exponentiate;
                        return Token.ExponentiateAssign;
                    }

                    // `+`, `++`, `+=`
                case Chars.Plus:
                    {
                        this.advance();
                        if (!this.hasNext()) return Token.Add;
                        const next = this.nextChar();

                        if (next === Chars.Plus) {
                            this.advance();
                            return Token.Increment;
                        }

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.AddAssign;
                        }

                        return Token.Add;
                    }

                    // `#`
                case Chars.Hash:
                    {
                        this.advance();
                        // if begins with shebang
                        if (state & ScannerState.LineStart &&
                            this.consume(Chars.Exclamation)) {
                            this.skipSingleLineComment(context, state);
                            continue;
                        }
                        return Token.Hash;
                    }

                    // `.`, `...`, `.123` (numeric literal)
                case Chars.Period:
                    {
                        let index = this.index + 1;

                        const next = this.source.charCodeAt(index);
                        if (next >= Chars.Zero && next <= Chars.Nine) {
                            this.scanNumeric(context, NumericState.Decimal | NumericState.Float);
                            return Token.NumericLiteral;
                        }
                        if (next === Chars.Period) {
                            index++;
                            if (index < this.source.length &&
                                this.source.charCodeAt(index) === Chars.Period) {
                                this.index = index + 1;
                                this.column += 3;
                                return Token.Ellipsis;
                            }
                        }

                        this.advance();
                        return Token.Period;
                    }

                    // `0`...`9`
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
                    return this.scanNumeric(context, NumericState.Decimal);

                    // `=`, `==`, `===`, `=>`
                case Chars.EqualSign:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return this.consume(Chars.EqualSign) ?
                                Token.StrictEqual :
                                Token.LooseEqual;
                        } else if (next === Chars.GreaterThan) {
                            this.advance();
                            return Token.Arrow;
                        }

                        return Token.Assign;
                    }

                    // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
                case Chars.GreaterThan:
                    {
                        this.advance();

                        if (!this.hasNext() || context & Context.InTypeAnnotation) return Token.GreaterThan;

                        const next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.GreaterThanOrEqual;
                        }

                        if (next !== Chars.GreaterThan) return Token.GreaterThan;

                        this.advance();

                        if (this.hasNext()) {
                            const next = this.nextChar();

                            if (next === Chars.GreaterThan) {
                                this.advance();
                                return this.consume(Chars.EqualSign) ?
                                    Token.LogicalShiftRightAssign :
                                    Token.LogicalShiftRight;
                            } else if (next === Chars.EqualSign) {
                                this.advance();
                                return Token.ShiftRightAssign;
                            }
                        }

                        return Token.ShiftRight;
                    }

                    // `^`, `^=`
                case Chars.Caret:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.BitwiseXor;
                    return Token.BitwiseXorAssign;

                    // ``string``
                case Chars.Backtick:
                    return this.scanTemplate(context, first);

                    // `|`, `||`, `|=`
                case Chars.VerticalBar:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (next === Chars.VerticalBar) {
                            this.advance();
                            return Token.LogicalOr;
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.BitwiseOrAssign;
                        }

                        return Token.BitwiseOr;
                    }

                    // `(`
                case Chars.LeftParen:
                    this.advance();
                    return Token.LeftParen;

                    // `)`
                case Chars.RightParen:
                    this.advance();
                    return Token.RightParen;

                    // `,`
                case Chars.Comma:
                    this.advance();
                    return Token.Comma;

                    // `:`
                case Chars.Colon:
                    this.advance();
                    return Token.Colon;

                    // `;`
                case Chars.Semicolon:
                    this.advance();
                    return Token.Semicolon;

                    // `?`
                case Chars.QuestionMark:
                    this.advance();
                    return Token.QuestionMark;

                    // `[`
                case Chars.LeftBracket:
                    this.advance();
                    return Token.LeftBracket;

                    // `]`
                case Chars.RightBracket:
                    this.advance();
                    return Token.RightBracket;

                    // `{`
                case Chars.LeftBrace:
                    this.advance();
                    return Token.LeftBrace;

                    // `}`
                case Chars.RightBrace:
                    this.advance();
                    return Token.RightBrace;

                    // `~`
                case Chars.Tilde:
                    this.advance();
                    return Token.Complement;
                    //

                    // `\\u{N}var`, `a`...`z`, `A`...`Z`, `_var`, `$var`
                case Chars.Backslash:
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
                    return this.scanIdentifier(context);

                default:
                    if (isValidIdentifierStart(first)) return this.scanIdentifier(context);
                    this.report(Errors.UnexpectedToken, fromCodePoint(first));
            }
        }

        return Token.EndOfSource;
    }

    private skipMultiLineComment(context: Context, state: ScannerState): ScannerState | undefined {

        const start = this.index;

        while (this.hasNext()) {
            switch (this.nextChar()) {
                case Chars.Asterisk:
                    this.advance();
                    state &= ~ScannerState.LastIsCR;
                    if (this.consume(Chars.Slash)) {
                        if (context & Context.OptionsComments) {
                            this.addComment(context, 'MultiLine', start);
                        }

                        return state;
                    }
                    break;

                case Chars.CarriageReturn:
                    state |= ScannerState.NewLine | ScannerState.LastIsCR;
                    this.advanceNewline();
                    break;

                case Chars.LineFeed:
                    this.consumeLineFeed((state & ScannerState.LastIsCR) !== 0);
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    break;

                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    state = state & ~ScannerState.LastIsCR | ScannerState.NewLine;
                    this.advanceNewline();
                    break;

                default:
                    state &= ~ScannerState.LastIsCR;
                    this.advance();
            }
        }

        this.report(Errors.UnterminatedComment);
    }

    private skipSingleLineComment(context: Context, state: ScannerState): ScannerState {
        const start = this.index;
        scan:
            while (this.hasNext()) {
                switch (this.nextChar()) {
                    case Chars.CarriageReturn:
                        this.advanceNewline();
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.index++;
                        break scan;
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.advanceNewline();
                        break scan;
                    default:
                        this.advance();
                }
            }

        if (context & Context.OptionsComments) {
            // TODO! Fix this!
            this.addComment(context, state & ScannerState.SingleLine ?
                'SingleLine' :
                state & ScannerState.HTMLOpen ?
                'HTMLOpen' :
                state & ScannerState.HTMLClose ?
                'HTMLClose' :
                'SheBang', start);

        }

        return state;
    }

    private addComment(context: Context, type: ESTree.CommentType, commentStart: number) {

        const comment: ESTree.Comment = {
            type,
            value: this.source.slice(commentStart, type === 'MultiLine' ? this.index - 2 : this.index),
            start: this.startIndex,
            end: this.index,
        };

        if (context & Context.OptionsLoc) {
            comment.loc = {
                start: {
                    line: this.startLine,
                    column: this.startColumn,
                },
                end: {
                    line: this.lastLine,
                    column: this.column
                }
            };
        }

        this.comments.push(comment);
    }

    private scanIdentifier(context: Context): Token {

        let start = this.index;
        let ret = '';
        let hasEscape = false;

        loop:
            while (this.hasNext()) {

                const ch = this.nextChar();

                switch (ch) {

                    case Chars.Backslash:

                        const index = this.index;
                        const code = this.peekUnicodeEscape(context);
                        if (!(code >= 0)) this.early(context, Errors.Unexpected);
                        ret += this.source.slice(start, index);
                        ret += fromCodePoint(code);
                        hasEscape = true;
                        start = this.index;
                        break;

                    default:
                        if (ch >= Chars.LeadSurrogateMin && ch <= Chars.TrailSurrogateMax) {
                            this.nextUnicodeChar();
                        } else if (!isIdentifierPart(ch)) break loop;
                        this.advance();
                }
            }

        if (start < this.index) ret += this.source.slice(start, this.index);

        const len = ret.length;

        this.tokenValue = ret;

        if (hasEscape) this.flags |= Flags.ExtendedUnicodeEscape;

        // Keywords are between 2 and 11 characters long and start with a lowercase letter
        if (len >= 2 && len <= 11) {
            if (context & Context.ValidateEscape && hasEscape) {
                this.early(context, Errors.UnexpectedEscapedKeyword);
            }
            const token = descKeyword(ret);
            if (token > 0) return token;
        }

        return Token.Identifier;
    }

    /**
     * Peek unicode escape
     */
    private peekUnicodeEscape(context: Context): number {

        let code = -1;
        const index = this.index;
        if (index + 5 < this.source.length) {
            if (this.source.charCodeAt(index + 1) !== Chars.LowerU) return -1;
            this.index += 2;
            this.column += 2;

            code = this.peekExtendedUnicodeEscape();
            if (code >= Chars.LeadSurrogateMin && code <= Chars.TrailSurrogateMin) {
                this.report(Errors.UnexpectedSurrogate);
            }

            if (!isIdentifierPart(code)) {
                this.early(context, Errors.InvalidUnicodeEscapeSequence);
            }

            this.advance();
        }
        return code;
    }

    private peekExtendedUnicodeEscape(): Chars {

        let ch = this.nextChar();
        let code = 0;

        // '\u{DDDDDDDD}'
        if (ch === Chars.LeftBrace) { // {
            ch = this.readNext(ch, Errors.InvalidHexEscapeSequence);
            while (ch !== Chars.RightBrace) {
                const digit = toHex(ch);
                if (digit < 0) this.report(Errors.InvalidHexEscapeSequence);
                code = code * 16 + digit;
                // Code point out of bounds
                if (code > Chars.LastUnicodeChar) break;
                ch = this.readNext(ch, Errors.InvalidHexEscapeSequence);
            }

            return code;
        }

        // '\uDDDD'
        code = toHex(ch);

        if (code < 0) this.report(Errors.InvalidHexEscapeSequence);

        for (let i = 0; i < 3; i++) {
            ch = this.readNext(ch, Errors.InvalidHexEscapeSequence);
            const digit = toHex(ch);
            if (code < 0) this.report(Errors.InvalidHexEscapeSequence);
            code = code << 4 | digit;
        }

        return code;
    }

    private scanNumericFragment(context: Context, state: NumericState): NumericState {
        this.flags |= Flags.ContainsSeparator;
        if (!(state & NumericState.AllowSeparator)) {
            this.early(context, Errors.InvalidNumericSeparators);
        }
        state &= ~NumericState.AllowSeparator;
        this.advance();
        return state;
    }

    private scanDecimalDigitsOrFragment(context: Context): any {

        let start = this.index;
        let state = NumericState.None;
        let ret = '';

        const next = context & Context.OptionsNext;

        loop:
            while (this.hasNext()) {

                switch (this.nextChar()) {
                    case Chars.Underscore:
                        if (!next) break loop;
                        if (!(state & NumericState.AllowSeparator)) {
                            this.early(context, Errors.InvalidNumericSeparators);
                        }
                        this.flags |= Flags.ContainsSeparator;
                        state &= ~NumericState.AllowSeparator;
                        ret += this.source.substring(start, this.index);
                        this.advance();
                        start = this.index;
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
                        state |= NumericState.AllowSeparator;
                        this.advance();
                        break;
                    default:
                        break loop;
                }
            }

        if (next && this.source.charCodeAt(this.index - 1) === Chars.Underscore) {
            this.early(context, Errors.InvalidNumericSeparators);
        }

        return ret + this.source.substring(start, this.index);
    }

    private scanBinaryOrOctalDigits(
        context: Context,
        state: NumericState,
        radix: number,
        secondRadix: number,
        msg: Errors) {

        this.advance(); // skip 'b' or 'o'
        let value = 0;
        let digits = 0;

        while (true) {

            const ch = this.nextChar();

            if (ch === Chars.Underscore) {
                state = this.scanNumericFragment(context, state);
                continue;
            }

            const converted = ch - Chars.Zero;

            if (!(ch >= Chars.Zero && ch <= Chars.Nine) || converted >= radix) break;

            value = digits < 10 ? (value << secondRadix) | converted : value * radix + converted;

            this.advance();
            digits++;
        }

        if (digits === 0) this.report(msg);

        return value;
    }

    private scanNumeric(context: Context, state: NumericState): Token {

        const start = this.index;

        let value = 0;
        let isOctal = (state & NumericState.Float) === 0;
        let mainFragment: string = '';
        let decimalFragment: string = '';
        let scientificFragment: string = '';
        let ch: number | null = 0;

        if (state & NumericState.Float) {
            this.advance();
            decimalFragment = this.scanDecimalDigitsOrFragment(context);
        } else {

            if (this.consume(Chars.Zero)) {

                switch (this.nextChar()) {

                    case Chars.LowerX:
                    case Chars.UpperX:
                        {
                            this.advance(); // skip'x'
                            ch = this.nextChar();

                            value = toHex(ch);

                            if (value < 0) this.early(context, Errors.MissingHexDigits);

                            state = NumericState.Hexadecimal | NumericState.AllowSeparator;

                            this.advance();

                            while (this.hasNext()) {
                                ch = this.nextChar();
                                if (ch === Chars.Underscore) {
                                    state = this.scanNumericFragment(context, state);
                                    continue;
                                }

                                state |= NumericState.AllowSeparator;
                                const digit = toHex(ch);
                                if (digit < 0) break;

                                value = value * 16 + digit;

                                this.advance();
                            }
                            break;
                        }

                    case Chars.LowerO:
                    case Chars.UpperO:
                        {
                            state = NumericState.Octal | NumericState.AllowSeparator;
                            value = this.scanBinaryOrOctalDigits(context, state, 8, 3, Errors.MissingOctalDigits);
                            break;
                        }

                    case Chars.LowerB:
                    case Chars.UpperB:
                        {
                            state = NumericState.Binary | NumericState.AllowSeparator;
                            value = this.scanBinaryOrOctalDigits(context, state, 2, 1, Errors.MissingBinaryDigits);
                            break;
                        }

                    case Chars.Zero:
                    case Chars.One:
                    case Chars.Two:
                    case Chars.Three:
                    case Chars.Four:
                    case Chars.Five:
                    case Chars.Six:
                    case Chars.Seven:
                        {
                            // (possible) octal number
                            state = NumericState.ImplicitOctal | NumericState.AllowSeparator;
                            // Octal integer literals are not permitted in strict mode.
                            // Flag it here, and throw later on if we are parsing in
                            // strict mode
                            this.flags |= Flags.Octal;

                            while (this.hasNext()) {
                                ch = this.nextChar();
                                if (ch === Chars.Underscore) {
                                    state = this.scanNumericFragment(context, state);
                                    continue;
                                } else if (ch === Chars.Eight || ch === Chars.Nine) {
                                    isOctal = false;
                                    state = NumericState.DecimalWithLeadingZero;
                                    break;
                                }

                                if (ch < Chars.Zero || ch > Chars.Seven) break;

                                value = value * 8 + (ch - Chars.Zero);

                                this.advance();
                            }

                            break;
                        }

                    case Chars.Eight:
                    case Chars.Nine:
                        {
                            this.flags |= Flags.Octal;
                            state = NumericState.DecimalWithLeadingZero;
                        }
                    default: // Ignore
                }

                if (this.flags & Flags.ContainsSeparator) {
                    if (this.source.charCodeAt(this.index - 1) === Chars.Underscore) {
                        this.early(context, Errors.InvalidNumericSeparators);
                    }
                }
            }

            // Parse decimal digits and allow trailing fractional part.
            if (state & (NumericState.Decimal | NumericState.DecimalWithLeadingZero)) {

                if (isOctal) {

                    loop: while (this.hasNext()) {
                        ch = this.nextChar();
                        switch (ch) {
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
                                value = value * 10 + (ch - Chars.Zero);
                                this.advance();
                                continue;
                            default:
                                break loop;
                        }
                    }

                    if (ch !== Chars.Period && !isIdentifierStart(ch)) {
                        if (context & Context.OptionsRaw) this.storeRaw(start);
                        this.tokenValue = value;
                        return Token.NumericLiteral;
                    }

                    if (context & Context.OptionsNext && this.nextChar() === Chars.Underscore) {
                        this.advance();
                        if (!this.hasNext()) this.early(context, Errors.InvalidNumericSeparators);
                        this.flags |= Flags.ContainsSeparator;
                        mainFragment = value += this.scanDecimalDigitsOrFragment(context);
                    }

                    if (this.consume(Chars.Period)) {
                        // There is no 'mainFragment' in cases like '1.2_3'
                        if (!(this.flags & Flags.ContainsSeparator)) mainFragment = value as any;
                        state |= NumericState.Float;
                        decimalFragment = this.scanDecimalDigitsOrFragment(context);
                    }
                }
                else {
                    mainFragment = this.scanDecimalDigitsOrFragment(context);
                }
            }
        }

        switch (this.nextChar()) {

            // BigInt
            case Chars.LowerN:
                {

                    if (!(context & Context.OptionsNext)) break;

                    // It is a Syntax Error if the MV is not an integer.
                    if (state & (NumericState.ImplicitOctal | NumericState.Float)) {
                        this.early(context, Errors.InvalidBigIntLiteral);
                    }

                    state |= NumericState.BigInt;

                    this.advance();
                    break;
                }
                // Exponent
            case Chars.LowerE:
            case Chars.UpperE:
                {

                    const startOfPossibleFragment = this.index;

                    this.advance();

                    state |= NumericState.Float;

                    switch (this.nextChar()) {
                        case Chars.Plus:
                        case Chars.Hyphen:
                            this.advance();
                        default: // ignore;
                    }

                    ch = this.nextChar();

                    // Invalid: 'const t = 2.34e-;const b = 4.3e--3;'
                    if (!(ch >= Chars.Zero && ch <= Chars.Nine)) this.early(context, Errors.Unexpected);

                    const preNumericPart = this.index;

                    const finalFragment = this.scanDecimalDigitsOrFragment(context);

                    scientificFragment = this.source.substring(startOfPossibleFragment, preNumericPart) + finalFragment;
                }
            default: // ignore
        }

        // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
        // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
        // For example : 3in is an error and not the two input elements 3 and in
        if (isIdentifierStart(this.nextChar())) {
            this.early(context, Errors.Unexpected);
        } else if (!(state & NumericState.Hibo)) {
            if (state & NumericState.ContainsSeparator || this.flags & Flags.ContainsSeparator) {
                if (decimalFragment) mainFragment += '.' + decimalFragment;
                if (scientificFragment) mainFragment += scientificFragment;
                value = (state & NumericState.Float ? parseFloat : parseInt)(mainFragment);
            } else {
                value = (state & NumericState.Float ? parseFloat : parseInt)(this.source.slice(start, this.index));
            }
        }

        if (context & Context.OptionsRaw) this.storeRaw(start);

        this.tokenValue = value;

        return state & NumericState.BigInt ? Token.BigInt : Token.NumericLiteral;
    }

    private scanRegularExpression(context: Context): Token {
        const bodyStart = this.startIndex + 1;
        let preparseState = RegExpState.Empty;

        loop:
            while (true) {

                const ch = this.nextChar();
                this.advance();

                if (preparseState & RegExpState.Escape) {
                    preparseState &= ~RegExpState.Escape;
                } else {
                    switch (ch) {
                        case Chars.Slash:
                            if (!preparseState) break loop;
                            break;
                        case Chars.Backslash:
                            preparseState |= RegExpState.Escape;
                            break;
                        case Chars.LeftBracket:
                            preparseState |= RegExpState.Class;
                            break;
                        case Chars.RightBracket:
                            preparseState &= RegExpState.Escape;
                            break;
                        case Chars.CarriageReturn:
                        case Chars.LineFeed:
                        case Chars.LineSeparator:
                        case Chars.ParagraphSeparator:
                            this.report(Errors.UnexpectedTokenRegExp);
                        default: // ignore
                    }
                }

                if (!this.hasNext()) this.report(Errors.UnterminatedRegExp);
            }

        const bodyEnd = this.index - 1;
        const flagsStart = this.index;

        let mask = RegexFlags.None;

        loop:
            while (this.hasNext()) {
                let code = this.nextChar();
                switch (code) {

                    case Chars.LowerG:
                        if (mask & RegexFlags.Global) this.early(context, Errors.DuplicateRegExpFlag, 'g');
                        mask |= RegexFlags.Global;
                        break;

                    case Chars.LowerI:
                        if (mask & RegexFlags.IgnoreCase) this.early(context, Errors.DuplicateRegExpFlag, 'i');
                        mask |= RegexFlags.IgnoreCase;
                        break;

                    case Chars.LowerM:
                        if (mask & RegexFlags.Multiline) this.early(context, Errors.DuplicateRegExpFlag, 'm');
                        mask |= RegexFlags.Multiline;
                        break;

                    case Chars.LowerU:
                        if (mask & RegexFlags.Unicode) this.early(context, Errors.DuplicateRegExpFlag, 'u');
                        mask |= RegexFlags.Unicode;
                        break;

                    case Chars.LowerY:
                        if (mask & RegexFlags.Sticky) this.early(context, Errors.DuplicateRegExpFlag, 'y');
                        mask |= RegexFlags.Sticky;
                        break;

                    case Chars.LowerS:
                        if (mask & RegexFlags.DotAll) this.early(context, Errors.DuplicateRegExpFlag, 's');
                        mask |= RegexFlags.DotAll;
                        break;

                    default:
                        if (code >= 0xd800 && code <= 0xdc00) code = this.nextUnicodeChar();
                        if (!isIdentifierPart(code)) break loop;
                        this.early(context, Errors.UnexpectedTokenRegExpFlag);
                }

                this.advance();
            }

        const flagsEnd = this.index;
        const pattern = this.source.slice(bodyStart, bodyEnd);
        const flags = this.source.slice(flagsStart, flagsEnd);

        this.tokenRegExp = {
            pattern,
            flags
        };

        this.tokenValue = this.testRegExp(pattern, flags, mask);

        if (context & Context.OptionsRaw) this.storeRaw(this.startIndex);

        return Token.RegularExpression;
    }

    private testRegExp(pattern: string, flags: string, mask: RegexFlags): RegExp | null {

        try {
            RegExp(pattern);
        } catch (e) {
            this.report(Errors.UnexpectedTokenRegExp);
        }

        try {
            return new RegExp(pattern, flags);
        } catch (exception) {
            return null;
        }
    }

    private scanString(context: Context, quote: number): Token {

        const start = this.index;
        const lastChar = this.lastChar;
        let ret: string = '';
        let state = ScannerState.None;
        let ch = this.readNext(quote); // Consume the quote
        while (ch !== quote) {
            switch (ch) {
                case Chars.CarriageReturn:
                case Chars.LineFeed:
                    this.report(Errors.UnterminatedString);
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    if (context & Context.OptionsNext) break;
                    this.report(Errors.UnterminatedString);
                case Chars.Backslash:
                    ch = this.readNext(ch);

                    state |= ScannerState.Escape;

                    if (ch >= 128) {
                        ret += fromCodePoint(ch);
                    } else {
                        this.lastChar = ch;
                        const code = this.scanEscapeSequence(context, ch);
                        if (code >= 0) ret += fromCodePoint(code);
                        else this.throwStringError(context, code as Escape);
                        ch = this.lastChar;
                    }
                    break;

                default:
                    ret += fromCodePoint(ch);
            }

            ch = this.readNext(ch);
        }

        this.consumeUnicode(ch);

        this.storeRaw(start);

        // TODO! Improvate directive parsing
        if (!(state & ScannerState.Escape) && ret === 'use strict') {
            this.flags |= Flags.StrictDirective;
        }

        this.tokenValue = ret;
        this.lastChar = lastChar;
        return Token.StringLiteral;
    }

    private throwStringError(context: Context, code: Escape, isTemplate: boolean = false) {

        switch (code) {
            case Escape.Empty:
                return;

            case Escape.StrictOctal:
                this.early(context, isTemplate ? Errors.TemplateOctalLiteral : Errors.StrictOctalEscape);

            case Escape.EightOrNine:
                this.early(context, Errors.InvalidEightAndNine);

            case Escape.InvalidHex:
                this.early(context, Errors.InvalidHexEscapeSequence);

            case Escape.OutOfRange:
                this.early(context, Errors.UnicodeOutOfRange);

            default:
                // ignore
        }
    }

    private scanEscapeSequence(context: Context, first: number): number {

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

                // Line continuations
            case Chars.CarriageReturn:
                {
                    const index = this.index;

                    if (index < this.source.length) {
                        const ch = this.source.charCodeAt(index);

                        if (ch === Chars.LineFeed) {
                            this.lastChar = ch;
                            this.index = index + 1;
                        }
                    }
                }
                // falls through
            case Chars.LineFeed:
            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                this.column = -1;
                this.line++;
                return Escape.Empty;

                // Null character, octals
            case Chars.Zero:
            case Chars.One:
            case Chars.Two:
            case Chars.Three:
                {
                    // 1 to 3 octal digits
                    let code = first - Chars.Zero;
                    let index = this.index + 1;
                    let column = this.column + 1;

                    let next = this.source.charCodeAt(index);

                    if (next < Chars.Zero || next > Chars.Seven) {

                        // Strict mode code allows only \0, then a non-digit.
                        if (code !== 0 || next === Chars.Eight || next === Chars.Nine) {
                            if (context & Context.Strict) return Escape.StrictOctal;
                            this.flags |= Flags.Octal;
                        }

                    } else if (context & Context.Strict) {
                        return Escape.StrictOctal;
                    } else {

                        this.lastChar = next;
                        code = code * 8 + (next - Chars.Zero);
                        index++;
                        column++;

                        if (index < this.source.length) {

                            next = this.source.charCodeAt(index);
                            if (next >= Chars.Zero && next <= Chars.Seven) {

                                this.lastChar = next;
                                code = code * 8 + (next - Chars.Zero);
                                index++;
                                column++;
                            }
                        }

                        this.index = index - 1;
                        this.column = column - 1;
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
                    const index = this.index + 1;
                    const column = this.column + 1;

                    if (index < this.source.length) {
                        const next = this.source.charCodeAt(index);

                        if (next >= Chars.Zero && next <= Chars.Seven) {
                            code = code * 8 + (next - Chars.Zero);
                            this.lastChar = next;
                            this.index = index;
                            this.column = column;
                        }
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
                    const ch1 = this.lastChar = this.readNext(first);
                    const hi = toHex(ch1);
                    if (hi < 0) return Escape.InvalidHex;
                    const ch2 = this.lastChar = this.readNext(ch1);
                    const lo = toHex(ch2);
                    if (lo < 0) return Escape.InvalidHex;

                    return hi << 4 | lo;
                }

                // Unicode character specification.
            case Chars.LowerU:
                {
                    let ch = this.lastChar = this.readNext(first);
                    if (ch === Chars.LeftBrace) {
                        ch = this.lastChar = this.readNext(ch);
                        let code = toHex(ch);
                        if (code < 0) return Escape.InvalidHex;

                        ch = this.lastChar = this.readNext(ch);
                        while (ch !== Chars.RightBrace) {
                            const digit = toHex(ch);
                            if (digit < 0) return Escape.InvalidHex;
                            code = code * 16 + digit;
                            // Code point out of bounds
                            if (code > Chars.LastUnicodeChar) return Escape.OutOfRange;
                            ch = this.lastChar = this.readNext(ch);
                        }

                        return code;
                    } else {
                        // \uNNNN
                        let code = toHex(ch);
                        if (code < 0) return Escape.InvalidHex;

                        for (let i = 0; i < 3; i++) {
                            ch = this.lastChar = this.readNext(ch);
                            const digit = toHex(ch);
                            if (digit < 0) return Escape.InvalidHex;
                            code = code * 16 + digit;
                        }

                        return code;
                    }
                }

            default:
                return this.nextUnicodeChar();
        }
    }

    private consumeTemplateBrace(context: Context): Token {
        if (!this.hasNext()) this.early(context, Errors.UnterminatedTemplate);
        // Upon reaching a '}', consume it and rewind the scanner state
        this.index--;
        this.column--;
        return this.scanTemplate(context, Chars.RightBrace);
    }

    private scanTemplate(context: Context, first: number): any {
        const start = this.index;
        const lastChar = this.lastChar;
        let tail = true;
        let ret: any = '';

        let ch = this.readNext(first);

        loop:
            while (ch !== Chars.Backtick) {
                switch (ch) {
                    case Chars.Dollar:
                        {
                            const index = this.index + 1;
                            if (index < this.source.length &&
                                this.source.charCodeAt(index) === Chars.LeftBrace) {
                                this.index = index;
                                this.column++;
                                tail = false;
                                break loop;
                            }
                            ret += '$';
                            break;
                        }

                    case Chars.Backslash:
                        ch = this.readNext(ch);

                        if (ch >= 128) {
                            ret += fromCodePoint(ch);
                        } else {
                            this.lastChar = ch;
                            const code = this.scanEscapeSequence(context, ch);

                            if (code >= 0) {
                                ret += fromCodePoint(code);
                            } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                                ret = undefined;
                                ch = this.scanLooserTemplateSegment(this.lastChar);
                                if (ch < 0) {
                                    ch = -ch;
                                    tail = false;
                                }
                                break loop;
                            } else {
                                this.throwStringError(context, code as Escape);
                            }
                            ch = this.lastChar;
                        }

                        break;

                    case Chars.CarriageReturn:
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) {
                            if (ret != null) ret += fromCodePoint(ch);
                            ch = this.nextChar();
                            this.index++;
                        }
                        // falls through
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.column = -1;
                        this.line++;
                        // falls through
                    default:
                        if (ret != null) ret += fromCodePoint(ch);
                }

                ch = this.readNext(ch);

            }

        this.consumeUnicode(ch);

        this.tokenValue = ret;
        this.lastChar = lastChar;

        if (tail) {
            this.tokenRaw = this.source.slice(start + 1, this.index - 1);
            return Token.TemplateTail;
        } else {
            this.tokenRaw = this.source.slice(start + 1, this.index - 2);
            return Token.TemplateCont;
        }
    }

    // The loose scanner accepts invalid unicode escapes
    private scanLooserTemplateSegment(ch: number): number {
        while (ch !== Chars.Backtick) {

            switch (ch) {
                case Chars.Dollar:
                    {
                        const index = this.index + 1;
                        if (index < this.source.length &&
                            this.source.charCodeAt(index) === Chars.LeftBrace) {
                            this.index = index;
                            this.column++;
                            return -ch;
                        }
                        break;
                    }

                case Chars.Backslash:
                    ch = this.readNext(ch);
                    break;

                case Chars.CarriageReturn:
                    if (this.hasNext() && this.nextChar() === Chars.LineFeed) {
                        ch = this.nextChar();
                        this.index++;
                    }

                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.column = -1;
                    this.line++;
                default:
                    // do nothing
            }

            ch = this.readNext(ch);
        }

        return ch;
    }

    private lookahead(): any {
        return {
            index: this.index,
            column: this.column,
            line: this.line,
            startLine: this.startLine,
            lastLine: this.lastLine,
            startColumn: this.startColumn,
            lastColumn: this.lastColumn,
            token: this.token,
            tokenValue: this.tokenValue,
            tokenRaw: this.tokenRaw,
            startIndex: this.startIndex,
            lastIndex: this.lastIndex,
            tokenRegExp: this.tokenRegExp,
            flags: this.flags
        };
    }

    private rewindState(state: any) {
        this.index = state.index;
        this.column = state.column;
        this.line = state.line;
        this.token = state.token;
        this.tokenValue = state.tokenValue;
        this.startIndex = state.startIndex;
        this.lastIndex = state.lastIndex;
        this.lastLine = state.lastLine;
        this.startLine = state.startLine;
        this.startColumn = state.startColumn;
        this.lastColumn = state.lastColumn;
        this.tokenRegExp = state.tokenRegExp;
        this.tokenRaw = state.tokenRaw;
        this.flags = state.flags;
    }

    private getLocation() {
        return {
            line: this.startLine,
            column: this.startColumn,
            index: this.startIndex,
        };
    }

    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive

    private parseDirective(context: Context) {
        const pos = this.getLocation();
        const directive = this.tokenRaw.slice(1, -1);
        const expr = this.parseExpression(context | Context.AllowIn, pos);
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'ExpressionStatement',
            expression: expr,
            directive
        });
    }

    private canConsumeSemicolon() {

        if (this.flags & Flags.LineTerminator) return true;

        switch (this.token) {
            case Token.RightBrace:
            case Token.EndOfSource:
            case Token.Semicolon:
                return true;
            default:
                return false;
        }
    }

    private consumeSemicolon(context: Context) {
        if (this.canConsumeSemicolon()) {
            if (this.token === Token.Semicolon) {
                this.nextToken(context);
            }
            return true;
        }
        this.expect(context, Token.Semicolon);
    }

    private expect(context: Context, t: Token, message: Errors = Errors.Unexpected): void {
        if (this.token !== t) this.early(context, message, tokenDesc(this.token));
        this.nextToken(context);
    }

    private parseOptional(context: Context, t: Token): boolean {
        if (this.token !== t) return false;
        this.nextToken(context);
        return true;
    }

    private validateBindings(context: Context, params: string[]) {
        const paramSet: any = map.create();
        for (let i = 0; i < params.length; i++) {
            const key = '@' + params[i];
            if (map.get(paramSet, key)) {
                this.early(context, Errors.InvalidDuplicateArgs, params[i]);
            } else map.set(paramSet, key, true);
        }
    }

    // 'import', 'import.meta'
    private nextTokenIsLeftParenOrPeriod(context: Context): boolean {
        const savedState = this.lookahead();
        const t = this.nextToken(context);
        this.rewindState(savedState);
        return t === Token.LeftParen || t === Token.Period;
    }

    private nextTokenIsFuncKeywordOnSameLine(context: Context): boolean {
        const savedState = this.lookahead();
        const t = this.nextToken(context);
        const line = this.line;
        this.rewindState(savedState);
        return line === this.line && t === Token.FunctionKeyword;
    }

    private isLexical(context: Context): boolean {
        const savedState = this.lookahead();
        const savedFlag = this.flags;
        const t = this.nextToken(context);
        const flags = this.flags;
        this.rewindState(savedState);
        return !(savedFlag & Flags.ExtendedUnicodeEscape && flags & Flags.LineTerminator) &&
            !!(t & (Token.IsBindingPattern | Token.IsIdentifier | Token.IsYield) ||
                t === Token.LetKeyword ||
                t === Token.LeftBracket ||
                (t & Token.Contextual) === Token.Contextual);
    }

    private finishNode < T extends ESTree.Node > (
        context: Context,
        pos: Location,
        node: any,
    ): any {

        if (context & Context.OptionsRanges) {
            node.start = pos.index;
            node.end = this.lastIndex;
        }

        if (context & Context.OptionsLoc) {

            node.loc = {
                start: {
                    line: pos.line,
                    column: pos.column,
                },
                end: {
                    line: this.lastLine,
                    column: this.lastColumn
                }
            };

            if (context & Context.OptionsSource) {
                node.loc.source = this.fileName;
            }
        }

        return node;
    }

    private report(type: Errors, ...value: string[]): any {
        let error;
        if (this.errorLocation) {
            const loc = this.errorLocation;
            error = createError(type, loc.index, loc.line, loc.column, ...value);
        } else {
            error = createError(type, this.lastIndex, this.lastLine, this.lastColumn, ...value);
        }

        throw error;
    }

    private early(context: Context, type: Errors, ...value: string[]): any {
        let error;
        if (this.errorLocation) {
            const loc = this.errorLocation;
            error = createError(type, loc.index, loc.line, loc.column, ...value);
        } else {
            error = createError(type, this.lastIndex, this.lastLine, this.lastColumn, ...value);
        }
        if (!(context & Context.OptionsEarly)) throw error;
        this.earlyErors.push(error);
    }

    private nextToken(context: Context) {
        if (this.flags & Flags.StrictDirective) context |= Context.Strict;
        this.lastIndex = this.index;
        this.lastLine = this.line;
        this.lastColumn = this.column;

        this.token = this.scan(context);

        return this.token;
    }

    private parseExportDefault(context: Context, pos: Location): ESTree.ExportDefaultDeclaration {

        this.expect(context | Context.ValidateEscape, Token.DefaultKeyword);

        let declaration: ESTree.FunctionDeclaration | ESTree.ClassDeclaration | ESTree.Expression;

        switch (this.token) {

            // export default HoistableDeclaration[Default]
            case Token.FunctionKeyword:
                declaration = this.parseFunction(context, true);
                break;

                // export default ClassDeclaration[Default]
            case Token.ClassKeyword:
                declaration = this.parseClass(context, true);
                break;

                // export default HoistableDeclaration[Default]
            case Token.AsyncKeyword:
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                    declaration = this.parseFunction(context, true);
                    break;
                }
                // falls through
            default:

                if (this.token === Token.FromKeyword) this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
                // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                declaration = this.parseAssignmentExpression(context | Context.AllowIn);
                this.consumeSemicolon(context);
        }

        return this.finishNode(context, pos, {
            type: 'ExportDefaultDeclaration',
            declaration
        });
    }

    private parseExportDeclaration(context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration {

        const pos = this.getLocation();
        const specifiers: ESTree.ExportSpecifier[] = [];

        let source = null;
        let declaration: ESTree.Statement | null = null;

        this.expect(context | Context.ValidateEscape, Token.ExportKeyword);

        switch (this.token) {
            // export * FromClause ;
            case Token.Multiply:
                return this.parseExportAllDeclaration(context, pos);

            case Token.DefaultKeyword:
                return this.parseExportDefault(context, pos);

            case Token.LeftBrace:

                let isReserved = false;
                this.expect(context, Token.LeftBrace);

                while (this.token !== Token.RightBrace) {
                    if (this.token & Token.Reserved) isReserved = true;
                    specifiers.push(this.parseNamedExportDeclaration(context));
                    if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
                }

                this.expect(context | Context.ValidateEscape, Token.RightBrace);

                if (this.token === Token.FromKeyword) {
                    source = this.parseFromClause(context);
                } else if (isReserved) this.early(context, Errors.Unexpected);

                this.consumeSemicolon(context);

                break;

                // export ClassDeclaration
            case Token.ClassKeyword:
                declaration = (this.parseClass(context) as any);
                break;

                // export LexicalDeclaration
            case Token.ConstKeyword:
                declaration = this.parseVariableStatement(context);
                break;

                // export LexicalDeclaration
            case Token.LetKeyword:
                declaration = this.parseVariableStatement(context);
                break;

                // export VariableDeclaration
            case Token.VarKeyword:
                declaration = this.parseVariableStatement(context);
                break;

                // export HoistableDeclaration
            case Token.FunctionKeyword:
                declaration = this.parseFunction(context);
                break;

                // export HoistableDeclaration
            case Token.AsyncKeyword:
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                    declaration = this.parseFunction(context);
                    break;
                }
                // Falls through
            default:
                this.report(Errors.Unexpected);
        }

        return this.finishNode(context, pos, {
            type: 'ExportNamedDeclaration',
            source,
            specifiers,
            declaration
        });
    }

    private parseNamedExportDeclaration(context: Context): ESTree.ExportSpecifier {
        const pos = this.getLocation();

        const local = this.parseIdentifierName(context | Context.ValidateEscape, this.token);

        let exported = local;

        if (this.parseOptional(context, Token.AsKeyword)) {
            exported = this.parseIdentifierName(context, this.token);
        }

        return this.finishNode(context, pos, {
            type: 'ExportSpecifier',
            local,
            exported
        });
    }

    private parseExportAllDeclaration(context: Context, pos: Location): ESTree.ExportAllDeclaration {
        this.expect(context, Token.Multiply);
        const source = this.parseFromClause(context);
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'ExportAllDeclaration',
            source
        });
    }

    private parseFromClause(context: Context): ESTree.Literal {
        this.expect(context, Token.FromKeyword);
        if (this.token !== Token.StringLiteral) this.report(Errors.InvalidModuleSpecifier);
        return this.parseLiteral(context);
    }

    // import {<foo as bar>} ...;
    private parseImportSpecifier(context: Context): ESTree.ImportSpecifier {

        const pos = this.getLocation();
        const value = this.tokenValue;
        const t = this.token;
        const imported = this.parseIdentifierName(context | Context.ValidateEscape, t);
        let hasAs = false;

        // Invalid: 'import { arguments } from './foo';'
        if (t & Token.IsEvalArguments && this.token === Token.RightBrace) {
            this.early(context, Errors.UnexpectedStrictReserved);
        }

        if (this.token & Token.Contextual) {
            this.expect(context, Token.AsKeyword);
            hasAs = true;
        } else {
            hasAs = this.parseOptional(context, Token.AsKeyword);
        }

        let local;

        if (!hasAs) {
            if (t & Token.Reserved) this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
            if (this.token & Token.IsEvalArguments) {
                this.early(context, Errors.UnexpectedStrictReserved);
            }
            local = imported;
        } else local = this.parseBindingIdentifier(context);

        return this.finishNode(context, pos, {
            type: 'ImportSpecifier',
            local,
            imported
        });
    }

    // {foo, bar as bas}
    private parseNamedImport(
        context: Context,
        specifiers: ESTree.Specifiers[]
    ) {

        this.expect(context, Token.LeftBrace);

        while (this.token !== Token.RightBrace) {
            // only accepts identifiers or keywords
            specifiers.push(this.parseImportSpecifier(context));
            if (this.token !== Token.RightBrace) {
                this.expect(context, Token.Comma);
            }
        }

        this.expect(context, Token.RightBrace);
    }

    // import <* as foo> ...;
    private parseImportNamespaceSpecifier(
        context: Context,
        specifiers: ESTree.Specifiers[]
    ) {
        const pos = this.getLocation();
        this.expect(context | Context.ValidateEscape, Token.Multiply);
        this.expect(context, Token.AsKeyword, Errors.NoAsAfterImportNamespace);
        const local = this.parseBindingIdentifier(context);
        specifiers.push(this.finishNode(context, pos, {
            type: 'ImportNamespaceSpecifier',
            local
        }));
    }

    // import <foo> ...;
    private parseImportDefaultSpecifier(context: Context): ESTree.ImportDefaultSpecifier {
        return this.finishNode(context, this.getLocation(), {
            type: 'ImportDefaultSpecifier',
            local: this.parseIdentifierName(context, this.token)
        });
    }

    private parseImportDeclaration(context: Context): ESTree.ImportDeclaration {

        const pos = this.getLocation();

        this.expect(context, Token.ImportKeyword);
        let source;

        // import 'foo';
        if (this.token === Token.StringLiteral) {
            source = this.parseLiteral(context);
            this.consumeSemicolon(context);

            return this.finishNode(context, pos, {
                type: 'ImportDeclaration',
                specifiers: [],
                source
            });
        }

        const specifiers = this.parseImportClause(context);

        source = this.parseFromClause(context);

        this.consumeSemicolon(context);

        return this.finishNode(context, pos, {
            type: 'ImportDeclaration',
            specifiers,
            source
        });
    }

    private parseImportClause(context: Context): ESTree.Specifiers[] {
        const specifiers: ESTree.Specifiers[] = [];

        switch (this.token) {

            case Token.Identifier:
                {
                    specifiers.push(this.parseImportDefaultSpecifier(context | Context.ValidateEscape));
                    if (this.parseOptional(context, Token.Comma)) {
                        const t = this.token;
                        if (t & Token.IsGenerator) {
                            this.parseImportNamespaceSpecifier(context, specifiers);
                        } else if (t === Token.LeftBrace) {
                            this.parseNamedImport(context, specifiers);
                        } else {
                            this.report(Errors.UnexpectedToken, tokenDesc(t));
                        }
                    }

                    break;
                }

                // import {bar}
            case Token.LeftBrace:
                this.parseNamedImport(context | Context.ValidateEscape, specifiers);
                break;

                // import * as foo
            case Token.Multiply:
                this.parseImportNamespaceSpecifier(context, specifiers);
                break;

            default:
                this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
        }
        return specifiers;
    }

    private parseModuleItem(context: Context): any {

        switch (this.token) {

            // 'export'
            case Token.ExportKeyword:
                return this.parseExportDeclaration(context);

                // 'import'
            case Token.ImportKeyword:
                if (!(context & Context.OptionsNext && this.nextTokenIsLeftParenOrPeriod(context))) {
                    return this.parseImportDeclaration(context);
                }

            default:

                return this.parseStatementListItem(context);
        }
    }

    // https://tc39.github.io/ecma262/#sec-block

    private parseStatementListItem(context: Context): any {
        switch (this.token) {
            case Token.FunctionKeyword:
                return this.parseFunction(context);
            case Token.ClassKeyword:
                return this.parseClass(context & ~Context.YieldContext);
            case Token.LetKeyword:
                if (!this.isLexical(context)) return this.parseStatement(context);
                return this.parseVariableStatement(context | Context.Let | Context.AllowIn);
            case Token.ConstKeyword:
                return this.parseVariableStatement(context | Context.AllowIn | Context.Const);
                // VariableStatement[?Yield]
            case Token.ExportKeyword:
                if (context & Context.Module) this.early(context, Errors.ExportDeclAtTopLevel);
            case Token.ImportKeyword:
                // We must be careful not to parse a 'import()'
                // expression or 'import.meta' as an import declaration.
                if (context & Context.OptionsNext && this.nextTokenIsLeftParenOrPeriod(context)) {
                    return this.parseExpressionStatement(context | Context.AllowIn);
                }
                if (context & Context.Module) this.early(context, Errors.ImportDeclAtTopLevel);
            default:
                return this.parseStatement(context);
        }
    }

    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations

    private parseStatement(context: Context): any {

        switch (this.token) {
            case Token.VarKeyword:
                return this.parseVariableStatement(context);
            case Token.LeftBrace:
                return this.parseBlockStatement(context);
            case Token.ReturnKeyword:
                return this.parseReturnStatement(context);
            case Token.IfKeyword:
                return this.parseIfStatement(context);
            case Token.BreakKeyword:
                return this.parseBreakStatement(context);
            case Token.ForKeyword:
                return this.parseForStatement(context);
            case Token.ContinueKeyword:
                return this.parseContinueStatement(context);
            case Token.DebuggerKeyword:
                return this.parseDebuggerStatement(context);
            case Token.DoKeyword:
                return this.parseDoWhileStatement(context);
            case Token.Semicolon:
                return this.parseEmptyStatement(context);
            case Token.WhileKeyword:
                return this.parseWhileStatement(context);
            case Token.WithKeyword:
                return this.parseWithStatement(context);
            case Token.SwitchKeyword:
                return this.parseSwitchStatement(context);
            case Token.ThrowKeyword:
                return this.parseThrowStatement(context);
            case Token.TryKeyword:
                return this.parseTryStatement(context);
            case Token.AsyncKeyword:
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                    if (context & Context.Statement) this.early(context, Errors.AsyncFunctionInSingleStatementContext);
                    // Async and async generator declaration is not allowed in statement position,
                    if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
                    return this.parseFunction(context);
                }
            case Token.AwaitKeyword:
            case Token.Identifier:
            case Token.YieldKeyword:
                return this.parseExpressionOrLabeledStatement(context);
            case Token.FunctionKeyword:
                if (context & Context.IfBody) return this.parseFunction(context);
                // falls through
            case Token.ClassKeyword:
                this.early(context, Errors.ForbiddenAsStatement, tokenDesc(this.token));
            default:
                return this.parseExpressionOrLabeledStatement(context);
        }
    }

    // https://tc39.github.io/ecma262/#sec-labelled-statements

    private parseExpressionOrLabeledStatement(context: Context): ESTree.ExpressionStatement | ESTree.LabeledStatement {
        const pos = this.getLocation();

        const expr = this.parseExpression(context | Context.AllowIn, pos);

        let t = this.token;

        if (t === Token.Colon && expr.type === 'Identifier') {

            this.expect(context, Token.Colon);

            const key = '$' + expr.name;

            if (this.labelSet === undefined) this.labelSet = {};
            else if (this.labelSet[key] === true) {
                this.early(context, Errors.Redeclaration, expr.name);
            }

            this.labelSet[key] = true;

            t = this.token;

            let body;

            switch (t) {

                case Token.ContinueKeyword:
                    {
                        if (this.flags & Flags.AllowContinue) {
                            this.early(context, Errors.InvalidNestedStatement, tokenDesc(t));
                        }
                        break;
                    }
                    // Annex B allows a function declaration in non-strict mode
                case Token.FunctionKeyword:
                    {

                        if (this.flags & Flags.AllowContinue) {
                            this.early(context, Errors.StrictFunction);
                        }

                        if (!(context & (Context.TopLevel))) this.early(context, Errors.SloppyFunction);
                        if (context & (Context.Strict | Context.IfBody)) {
                            this.early(context, context & Context.Strict ? Errors.StrictFunction : Errors.SloppyFunction);
                        }

                        body = this.parseFunction(context | Context.Statement);
                        break;
                    }
                default:

                    t = this.token;

                    body = this.parseStatement(context | Context.Statement);

                    // ExpressionStatement has a lookahead restriction for `let [`
                    if (context & Context.Strict &&
                        t === Token.LetKeyword &&
                        this.token === Token.LeftBracket &&
                        this.flags & Flags.LineTerminator) {
                        this.early(context, Errors.UnexpectedToken, tokenDesc(t));
                    }
            }

            this.labelSet[key] = false;

            return this.finishNode(context, pos, {
                type: 'LabeledStatement',
                label: expr,
                body
            });
        } else {

            this.consumeSemicolon(context);
            return this.finishNode(context, pos, {
                type: 'ExpressionStatement',
                expression: expr
            });
        }
    }

    private parseIfStatementChild(context: Context): ESTree.Statement {

        if (context & Context.Strict && this.token === Token.FunctionKeyword) {
            this.early(context, Errors.ForbiddenAsIfDeclaration);
        }

        return this.parseStatement(context | Context.IfBody | Context.Statement);
    }

    private parseIfStatement(context: Context) {
        const pos = this.getLocation();
        if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
        this.expect(context, Token.IfKeyword);
        this.expect(context, Token.LeftParen);
        const test = this.parseExpression(context | Context.AllowIn, pos);
        this.expect(context, Token.RightParen);
        const consequent = this.parseIfStatementChild(context | Context.ValidateEscape);
        let alternate: ESTree.Statement | null = null;
        if (this.parseOptional(context, Token.ElseKeyword)) {
            alternate = this.parseIfStatementChild(context);
        }

        return this.finishNode(context, pos, {
            type: 'IfStatement',
            test,
            alternate,
            consequent
        });
    }

    // https://tc39.github.io/ecma262/#sec-while-statement

    private parseWhileStatement(context: Context): ESTree.WhileStatement {
        const pos = this.getLocation();
        this.expect(context, Token.WhileKeyword);
        this.expect(context, Token.LeftParen);
        const test = this.parseExpression(context | Context.AllowIn, pos);
        this.expect(context, Token.RightParen);
        const savedFlag = this.flags;
        this.flags |= (Flags.AllowContinue | Flags.AllowBreak);
        const body = this.parseMaybeInvalidBlockStatement(context | Context.Statement | Context.ValidateEscape);
        this.flags = savedFlag;
        return this.finishNode(context, pos, {
            type: 'WhileStatement',
            test,
            body
        });
    }

    // https://tc39.github.io/ecma262/#sec-with-statement

    private parseWithStatement(context: Context): ESTree.WhileStatement {
        if (context & Context.Strict) this.early(context, Errors.StrictModeWith);
        const pos = this.getLocation();
        this.expect(context, Token.WithKeyword);
        this.expect(context, Token.LeftParen);
        const object = this.parseExpression(context | Context.AllowIn, pos);
        this.expect(context, Token.RightParen);
        const body = this.parseMaybeInvalidBlockStatement(context & ~Context.TopLevel | Context.ValidateEscape);
        return this.finishNode(context, pos, {
            type: 'WithStatement',
            object,
            body
        });
    }

    // https://tc39.github.io/ecma262/#sec-do-while-statement

    private parseDoWhileStatement(context: Context): ESTree.DoWhileStatement {
        const pos = this.getLocation();
        this.expect(context, Token.DoKeyword);

        const savedFlag = this.flags;
        this.flags |= (Flags.AllowBreak | Flags.AllowContinue);
        const body = this.parseStatement(context | Context.Statement);
        this.flags = savedFlag;

        this.expect(context, Token.WhileKeyword);
        this.expect(context, Token.LeftParen);

        const test = this.parseExpression(context | Context.AllowIn, pos);

        this.expect(context, Token.RightParen);
        this.parseOptional(context, Token.Semicolon);

        return this.finishNode(context, pos, {
            type: 'DoWhileStatement',
            body,
            test
        });
    }

    // https://tc39.github.io/ecma262/#sec-continue-statement

    private parseContinueStatement(context: Context): ESTree.ContinueStatement {
        // Appearing of continue without an IterationStatement leads to syntax error
        if (!(this.flags & Flags.AllowContinue)) {
            this.early(context, Errors.InvalidNestedStatement, tokenDesc(this.token));
        }
        const pos = this.getLocation();
        this.expect(context, Token.ContinueKeyword);
        let label: ESTree.Identifier | undefined | null = null;
        if (!this.canConsumeSemicolon()) {
            label = this.parseIdentifier(context);
            if (this.labelSet === undefined || !this.labelSet['$' + (label as ESTree.Identifier).name]) {
                this.early(context, Errors.UnknownLabel, (label as ESTree.Identifier).name);
            }
        }
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'ContinueStatement',
            label
        });
    }

    // https://tc39.github.io/ecma262/#sec-break-statement

    private parseBreakStatement(context: Context): ESTree.BreakStatement {
        const pos = this.getLocation();
        this.expect(context, Token.BreakKeyword);
        let label: ESTree.Identifier | undefined | null = null;
        if (!this.canConsumeSemicolon()) {
            label = this.parseIdentifier(context);
            if (this.labelSet === undefined || !this.labelSet['$' + (label as ESTree.Identifier).name]) {
                this.early(context, Errors.UnknownLabel, (label as ESTree.Identifier).name);
            }
        } else if (!(this.flags & Flags.AllowBreak)) {
            this.early(context, Errors.InvalidNestedStatement, 'break');
        }
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'BreakStatement',
            label
        });
    }

    // https://tc39.github.io/ecma262/#sec-throw-statement

    private parseThrowStatement(context: Context): ESTree.ThrowStatement {
        const pos = this.getLocation();
        this.expect(context, Token.ThrowKeyword);
        if (this.flags & Flags.LineTerminator) this.early(context, Errors.NewlineAfterThrow);
        const argument: ESTree.Expression = this.parseExpression(context | Context.AllowIn, pos);
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'ThrowStatement',
            argument
        });
    }

    private parseTryStatement(context: Context): ESTree.TryStatement {
        if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
        const pos = this.getLocation();
        this.expect(context, Token.TryKeyword);
        const block = this.parseBlockStatement(context | Context.ValidateEscape);

        let handler: ESTree.CatchClause | null = null;
        let finalizer: ESTree.BlockStatement | null = null;

        if (this.token === Token.CatchKeyword) {
            handler = this.parseCatchBlock(context | Context.ValidateEscape);
        }

        if (this.parseOptional(context, Token.FinallyKeyword)) {
            finalizer = this.parseBlockStatement(context);
        }

        if (!handler && !finalizer) this.early(context, Errors.NoCatchOrFinally);

        return this.finishNode(context, pos, {
            type: 'TryStatement',
            block,
            handler,
            finalizer
        });
    }

    private parseCatchBlock(context: Context): ESTree.CatchClause {
        const pos = this.getLocation();
        this.expect(context, Token.CatchKeyword);
        let param = null;
        if (this.parseOptional(context, Token.LeftParen)) {
            const params: any[] = [];
            param = this.parseBindingIdentifierOrPattern(context, params);
            this.validateBindings(context, params);
            this.expect(context, Token.RightParen);
        }

        const body = this.parseBlockStatement(context);

        return this.finishNode(context, pos, {
            type: 'CatchClause',
            param,
            body
        });
    }

    private parseSwitchStatement(context: Context): ESTree.SwitchStatement {
        const pos = this.getLocation();
        this.expect(context, Token.SwitchKeyword);
        this.expect(context, Token.LeftParen);

        const discriminant = this.parseExpression(context, pos);

        this.expect(context, Token.RightParen);
        this.expect(context, Token.LeftBrace);

        const cases: ESTree.SwitchCase[] = [];

        let seenDefault = false;

        const SavedFlag = this.flags;

        this.flags |= Flags.AllowBreak;

        while (this.token !== Token.RightBrace) {

            const clause = this.parseSwitchCases(context);

            if (clause.test === null) {
                // Error on duplicate 'default' clauses
                if (seenDefault) this.early(context, Errors.MultipleDefaultsInSwitch);
                seenDefault = true;
            }

            cases.push(clause);
        }

        this.flags = SavedFlag;

        this.expect(context, Token.RightBrace);

        return this.finishNode(context, pos, {
            type: 'SwitchStatement',
            discriminant,
            cases
        });
    }

    // https://tc39.github.io/ecma262/#sec-switch-statement

    private parseSwitchCases(context: Context): ESTree.SwitchCase {
        const pos = this.getLocation();
        let test: ESTree.Expression | null = null;

        if (!this.parseOptional(context, Token.DefaultKeyword)) {
            this.expect(context, Token.CaseKeyword);
            test = this.parseExpression(context, pos);
        }

        this.expect(context, Token.Colon);

        const consequent: ESTree.Statement[] = [];

        loop:
            while (true) {
                switch (this.token) {
                    case Token.RightBrace:
                    case Token.DefaultKeyword:
                    case Token.CaseKeyword:
                        break loop;
                    default:
                        consequent.push(this.parseStatementListItem(context));
                }
            }

        return this.finishNode(context, pos, {
            type: 'SwitchCase',
            test,
            consequent,
        });
    }

    // https://tc39.github.io/ecma262/#sec-return-statement

    private parseReturnStatement(context: Context): ESTree.ReturnStatement {
        if (!(this.flags & Flags.InFunctionBody)) this.early(context, Errors.IllegalReturn);
        const pos = this.getLocation();
        this.expect(context, Token.ReturnKeyword);

        let argument: ESTree.Expression | null = null;

        if (!this.canConsumeSemicolon()) {
            argument = this.parseExpression(context | Context.AllowIn, pos);
        }

        this.consumeSemicolon(context);

        return this.finishNode(context, pos, {
            type: 'ReturnStatement',
            argument
        });
    }

    // https://tc39.github.io/ecma262/#sec-debugger-statement

    private parseDebuggerStatement(context: Context): ESTree.DebuggerStatement {
        const pos = this.getLocation();
        if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
        this.expect(context, Token.DebuggerKeyword);
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'DebuggerStatement'
        });
    }

    // https://tc39.github.io/ecma262/#sec-empty-statement

    private parseEmptyStatement(context: Context): ESTree.EmptyStatement {
        const pos = this.getLocation();
        this.nextToken(context);
        return this.finishNode(context, pos, {
            type: 'EmptyStatement'
        });
    }

    private parseMaybeInvalidBlockStatement(context: Context) {
        // Note! In non-strict mode code, functions can only be declared at
        // top level, inside a block, or as the body of an if statement
        // which means that programs like 'with(0) function() {}' are invalid
        if (this.token === Token.FunctionKeyword) this.early(context, Errors.SloppyFunction);
        return this.parseStatement(context);
    }

    private parseBlockStatement(context: Context): any {
        const pos = this.getLocation();
        const body: ESTree.Statement[] = [];

        this.expect(context, Token.LeftBrace);
        if (this.token !== Token.RightBrace) {
            while (this.token !== Token.RightBrace) {
                body.push(this.parseStatementListItem(context & ~Context.TopLevel));
            }
        }

        this.expect(context, Token.RightBrace);
        return this.finishNode(context, pos, {
            type: 'BlockStatement',
            body
        });
    }

    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
    private parseVariableStatement(context: Context) {
        const pos = this.getLocation();
        const t = this.token;
        if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
        this.nextToken(context);
        const declarations = this.parseVariableDeclarationList(context);
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'VariableDeclaration',
            declarations,
            kind: tokenDesc(t)
        });
    }

    private parseVariableDeclarationList(context: Context): ESTree.VariableDeclarator[] {
        const list: ESTree.VariableDeclarator[] = [this.parseVariableDeclaration(context)];
        if (this.token !== Token.Comma) return list;
        while (this.parseOptional(context, Token.Comma)) {
            list.push(this.parseVariableDeclaration(context));
        }
        if (context & Context.ForStatement &&
            !(context & Context.BlockScoped) &&
            isInOrOfKeyword(this.token)) {
            this.early(context, Errors.ForInOfLoopMultiBindings, 'for-' + tokenDesc(this.token));
        }
        return list;
    }

    private parseVariableDeclaration(context: Context): any {
        const pos = this.getLocation();
        const t = this.token;
        const id = this.parseBindingIdentifierOrPattern(context);
        let init: ESTree.Expression | null = null;

        if (t & Token.IsBindingPattern) {

            if (this.parseOptional(context, Token.Assign)) {

                init = this.parseAssignmentExpression(context & ~(Context.BlockScoped | Context.ForStatement));
                if (!(context & Context.BlockScoped) && context & Context.ForStatement) {
                    if (this.token === Token.InKeyword) {
                        this.early(context, Errors.InvalidVarDeclInForLoop, tokenDesc(this.token));
                    } else if (this.token === Token.OfKeyword) {
                        this.early(context, Errors.DeclarationMissingInitializer);
                    }
                } else if (context & Context.ForStatement && isInOrOfKeyword(this.token)) {
                    this.early(context, Errors.InvalidVarDeclInForLoop, tokenDesc(this.token));
                }
            } else if (!isInOrOfKeyword(this.token)) {
                this.early(context, Errors.DeclarationMissingInitializer);
            }

        } else {
            if (this.parseOptional(context, Token.Assign)) {
                init = this.parseAssignmentExpression(context & ~Context.BlockScoped);
                if (context & Context.ForStatement) {
                    if (this.token === Token.OfKeyword) this.early(context, Errors.InvalidVarInitForOf);
                    if (this.token === Token.InKeyword && (context & (Context.Strict | Context.BlockScoped))) {
                        this.early(context, Errors.InvalidVarDeclInForLoop, tokenDesc(this.token));
                    }
                }

            } else if (context & Context.Const && !isInOrOfKeyword(this.token)) {
                this.early(context, Errors.Unexpected);
            }

        }

        return this.finishNode(context, pos, {
            type: 'VariableDeclarator',
            init,
            id
        });
    }

    // https://tc39.github.io/ecma262/#sec-expression-statement

    private parseExpressionStatement(context: Context): ESTree.ExpressionStatement {
        const pos = this.getLocation();
        const expr = this.parseExpression(context, pos);
        this.consumeSemicolon(context);
        return this.finishNode(context, pos, {
            type: 'ExpressionStatement',
            expression: expr
        });
    }

    // https://tc39.github.io/ecma262/#sec-comma-operator

    private parseExpression(context: Context, pos: Location): ESTree.Expression {
        const expr = this.parseAssignmentExpression(context);
        if (this.token !== Token.Comma) return expr;

        const expressions: ESTree.Expression[] = [expr];
        while (this.parseOptional(context, Token.Comma)) {
            expressions.push(this.parseAssignmentExpression(context));
        }

        return this.finishNode(context, pos, {
            type: 'SequenceExpression',
            expressions
        });
    }
    private isIdentifier(context: Context, t: Token): boolean {

        if (context & Context.Strict) {
            if (t & Token.IsYield) return false;

            return (t & Token.IsIdentifier) === Token.IsIdentifier ||
                (t & Token.Contextual) === Token.Contextual;
        }

        return (t & Token.IsIdentifier) === Token.IsIdentifier ||
            (t & Token.Contextual) === Token.Contextual ||
            (t & Token.FutureReserved) === Token.FutureReserved;
    }

    // Reinterpret various expressions as pattern
    // This Is only used for assignment and arrow parameter list
    private reinterpret(context: Context, node: any): void {

        switch (node.type) {
            case 'ArrayPattern':
            case 'AssignmentPattern':
            case 'ObjectPattern':
            case 'RestElement':
            case 'MetaProperty':
            case 'Identifier':
                return; //skip

            case 'ObjectExpression':
                node.type = 'ObjectPattern';
                // ObjectPattern and ObjectExpression are isomorphic
                for (let i = 0; i < node.properties.length; i++) {
                    this.reinterpret(context, node.properties[i]);
                }
                return;

            case 'ArrayExpression':
                node.type = 'ArrayPattern';
                for (let i = 0; i < node.elements.length; ++i) {
                    // skip holes in pattern
                    if (node.elements[i] !== null) {
                        this.reinterpret(context, node.elements[i]);
                    }
                }
                return;

            case 'Property':
                if (node.kind !== "init") this.report(Errors.InvalidDestructuringTarget)
                return this.reinterpret(context, node.value);

            case 'SpreadElement':
                node.type = 'RestElement';
                this.reinterpret(context, node.argument);
                if (node.argument.type === 'AssignmentPattern') {
                    this.early(context, Errors.InvalidRestDefaultValue);
                }
                return;

            case 'AssignmentExpression':
                if (node.operator !== '=') {
                    this.report(Errors.UnexpectedToken, tokenDesc(this.token));
                } else delete node.operator;
                node.type = 'AssignmentPattern';

                this.reinterpret(context, node.left);
                return;

            case 'MemberExpression':
                if (!(context & Context.InArrowParameterList)) return;
                // Fall through
            default:
                this.report(Errors.Unexpected);
        }
    }

    private parseYieldExpression(
        context: Context,
        pos: Location
    ): ESTree.YieldExpression {

        if (this.flags & Flags.ExtendedUnicodeEscape) {
            this.early(context, Errors.UnexpectedEscapedKeyword);
        }

        if (context & Context.InParameter) {
            this.early(context, (context & Context.YieldContext) ?
                Errors.InvalidGeneratorParam :
                Errors.YieldInParameter);
        }

        this.expect(context, Token.YieldKeyword);

        let argument: ESTree.Expression | null = null;
        let delegate = false;

        if (!(this.flags & Flags.LineTerminator)) {
            delegate = this.parseOptional(context, Token.Multiply);
            argument = delegate ?
                this.parseAssignmentExpression(context) :
                this.token & Token.IsExpressionStart ?
                this.parseAssignmentExpression(context) :
                null;
        }

        return this.finishNode(context, pos, {
            type: 'YieldExpression',
            argument,
            delegate
        });
    }

    private parseAssignmentExpression(
        context: Context
    ): ESTree.AssignmentExpression | ESTree.YieldExpression | ESTree.ArrowFunctionExpression {

        const pos = this.getLocation();
        const t = this.token;

        if (context & Context.YieldContext && this.token & Token.IsYield) {
            return this.parseYieldExpression(context, pos);
        }

        const expr = this.parseConditionalExpression(context, pos);

        if (this.token === Token.Arrow && (this.isIdentifier(context, t))) {
            if (t & Token.IsEvalArguments) {
                if (context & Context.Strict) this.early(context, Errors.InvalidBindingStrictMode, tokenDesc(t));
                this.errorLocation = this.getLocation();
                this.flags |= Flags.ReservedWords;
            }
            return this.parseArrowFunctionExpression(context & ~Context.AsyncContext, pos, [expr]);
        }

        if (hasBit(this.token, Token.IsAssignOperator)) {

            if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                this.early(context, Errors.StrictLHSAssignment);
                // Note: A functions parameter list is already parsed as pattern, so no need to reinterpret
            } else if (!(context & Context.InParameter) && this.token === Token.Assign) {
                // Note: We don't know in cases like '((a = 0) => { "use strict"; })' if this is
                // an "normal" parenthese or an arrow function param list, so we set the "SimpleParameterList" flag
                // now. There is no danger in this because this will not throw unless we are parsing out an
                // function body.
                if (context & Context.InParenthesis) {
                    this.errorLocation = this.getLocation();
                    this.flags |= Flags.SimpleParameterList;
                }
                this.reinterpret(context, expr);
            } else if (!isValidSimpleAssignmentTarget(expr)) {
                this.early(context, Errors.InvalidLHSInAssignment);
            }

            const operator = this.token;

            this.nextToken(context);
            // Note! An arrow parameters must not contain yield expressions, but at this stage we doesn't know
            // if this is an "normal" parenthesis or inside and arrow param list, so we set
            // th "HasYield" flag now
            if (context & Context.YieldContext && context & Context.InParenthesis && this.token & Token.IsYield) {
                this.errorLocation = this.getLocation();
                this.flags |= Flags.HasYield;
            }
            if (this.token & Token.IsAwait) {
                this.errorLocation = this.getLocation();
                this.flags |= Flags.HasAwait;
            }
            const right = this.parseAssignmentExpression(context | Context.AllowIn);

            return this.finishNode(context, pos, {
                type: 'AssignmentExpression',
                left: expr,
                operator: tokenDesc(operator),
                right
            });
        }

        return expr;
    }

    // https://tc39.github.io/ecma262/#sec-conditional-operator

    private parseConditionalExpression(context: Context, pos: Location) {
        const expr = this.parseBinaryExpression(context, 0, pos);
        if (!this.parseOptional(context, Token.QuestionMark)) return expr;
        const consequent = this.parseAssignmentExpression(context | Context.AllowIn);
        this.expect(context, Token.Colon);
        if (context & Context.InClass && this.token & Token.IsEvalArguments) {
            this.early(context, Errors.UnexpectedStrictReserved);
        }
        const alternate = this.parseAssignmentExpression(context);
        return this.finishNode(context, pos, {
            type: 'ConditionalExpression',
            test: expr,
            consequent,
            alternate
        });
    }

    // https://tc39.github.io/ecma262/#sec-exp-operator
    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
    // https://tc39.github.io/ecma262/#sec-additive-operators
    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
    // https://tc39.github.io/ecma262/#sec-relational-operators
    // https://tc39.github.io/ecma262/#sec-equality-operators
    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
    // https://tc39.github.io/ecma262/#sec-binary-logical-operators

    private parseBinaryExpression(
        context: Context,
        minPrec: number,
        pos: Location,
        expr: ESTree.Expression = this.parseUnaryExpression(context)
    ): ESTree.Expression {

        const bit = context & Context.AllowIn ^ Context.AllowIn;

        while (hasBit(this.token, Token.IsBinaryOperator)) {
            const t = this.token;
            const prec = t & Token.Precedence;
            const delta = ((t === Token.Exponentiate) as any) << Token.PrecStart;
            if (bit && t === Token.InKeyword) break;
            // Break if equal or higher precendence
            if ((prec) + delta <= minPrec) break;
            this.nextToken(context);

            expr = this.finishNode(context, pos, {
                type: t & Token.IsLogical ? 'LogicalExpression' : 'BinaryExpression',
                left: expr,
                right: this.parseBinaryExpression(context & ~Context.AllowIn, prec, this.getLocation()),
                operator: tokenDesc(t)
            });
        }

        return expr;
    }

    // https://tc39.github.io/ecma262/#sec-unary-operators

    private parseAwaitExpression(context: Context, pos: Location): ESTree.AwaitExpression {
        if (this.flags & Flags.ExtendedUnicodeEscape) {
            this.early(context, Errors.UnexpectedEscapedKeyword);
        }
        this.expect(context, Token.AwaitKeyword);
        return this.finishNode(context, pos, {
            type: 'AwaitExpression',
            argument: this.parseUnaryExpression(context)
        });
    }

    private parseUnaryExpression(context: Context): ESTree.UnaryExpression | ESTree.Expression {
        const pos = this.getLocation();
        let t = this.token;

        if (t & Token.IsAwait && context & Context.AsyncContext) {
            return this.parseAwaitExpression(context, pos);
        }

        if (hasBit(t, Token.IsUnaryOperator)) {
            t = this.token;
            if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
            this.nextToken(context);
            const argument = this.parseUnaryExpression(context);

            if (this.token === Token.Exponentiate) this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
            if (context & Context.Strict && t === Token.DeleteKeyword) {
                if (argument.type === 'Identifier' || (context & Context.OptionsNext &&
                        !(context & Context.Module) &&
                        argument.type == 'MemberExpression' &&
                        (argument.property.type as any) === 'PrivateName')) {
                    this.early(context, Errors.StrictDelete);
                }
            }
            return this.finishNode(context, pos, {
                type: 'UnaryExpression',
                operator: tokenDesc(t),
                argument,
                prefix: true
            });
        }

        return this.parseUpdateExpression(context, pos);
    }

    private isEvalOrArguments(value: string): boolean {
        return value === 'eval' || value === 'arguments';
    }

    // https://tc39.github.io/ecma262/#sec-update-expressions

    private parseUpdateExpression(context: Context, pos: Location): ESTree.Expression {

        let prefix = false;
        let operator: Token | undefined;

        if (hasBit(this.token, Token.IsUpdateOperator)) {
            operator = this.token;
            prefix = true;
            this.nextToken(context);
            if (context & Context.YieldContext && this.token & Token.IsAwait) {
                this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
            }
        }

        const argument = this.parseLeftHandSideExpression(context, pos);

        const isPostfix = hasBit(this.token, Token.IsUpdateOperator) && !(this.flags & Flags.LineTerminator);

        if (!prefix && !isPostfix) return argument;

        if (context & Context.Strict &&
            this.isEvalOrArguments((argument as ESTree.Identifier).name)) {
            this.early(context, Errors.StrictLHSPrefixPostFix, prefix ? 'Prefix' : 'Postfix');
        } else if (!isValidSimpleAssignmentTarget(argument)) {
            this.early(context, Errors.InvalidLhsInPrefixPostFixOp, prefix ? 'Prefix' : 'Postfix');
        }

        if (!prefix) {
            operator = this.token;
            this.nextToken(context);
        }

        return this.finishNode(context, pos, {
            type: 'UpdateExpression',
            argument,
            operator: tokenDesc(operator as Token),
            prefix
        });
    }

    private parseSuperExpression(context: Context): ESTree.Expression {
        const pos = this.getLocation();
        if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
        this.expect(context, Token.SuperKeyword);

        // If we have seen "super" it must be followed by '(', '[' or '.'.
        const t = this.token;

        switch (t) {

            case Token.LeftParen:
                {
                    // The super property has to be within a class constructor
                    if (!(context & Context.AllowSuperProperty)) {
                        this.early(context, context & Context.Method ? Errors.UnexpectedSuper : Errors.BadSuperCall);
                    }
                    break;
                }

            case Token.LeftBracket:
            case Token.Period:
                {
                    if (!(context & Context.Method)) {
                        this.early(context, Errors.UnexpectedSuper);
                    }
                    break;
                }

            default:
                this.early(context, Errors.UnexpectedToken, tokenDesc(t));
        }

        return this.finishNode(context, pos, {
            type: 'Super'
        });
    }

    private parseImportCall(context: Context, pos: Location) {
        const id = this.parseIdentifier(context);

        if (context & Context.OptionsNext && this.parseOptional(context, Token.Period)) {
            // Import.meta - Stage 3 proposal
            if (!(context & Context.Module) || this.tokenValue !== 'meta') {
                this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
            }
            return this.parseMetaProperty(context, id, pos);
        }

        return this.finishNode(context, pos, {
            type: 'Import'
        });
    }

    private parseMetaProperty(context: Context, meta: ESTree.Identifier, pos: Location): ESTree.MetaProperty {
        return this.finishNode(context, pos, {
            meta,
            type: 'MetaProperty',
            property: this.parseIdentifier(context)
        });
    }

    private parseNewExpression(context: Context): ESTree.MetaProperty | ESTree.NewExpression {

        if (this.flags & Flags.ExtendedUnicodeEscape) {
            this.early(context, Errors.UnexpectedEscapedKeyword);
        }

        const pos = this.getLocation();
        const id = this.parseIdentifierName(context, this.token);

        if (this.parseOptional(context | Context.ValidateEscape, Token.Period)) {

            if (this.tokenValue !== 'target') {
                this.early(context, Errors.MetaNotInFunctionBody);
            }
            if (!(context & Context.InParameter)) {
                // An ArrowFunction in global code may not contain `new.target`
                if (context & Context.ArrowFunction && context & Context.TopLevel) {
                    this.early(context, Errors.NewTargetArrow);
                } else if (!(this.flags & Flags.InFunctionBody)) {
                    this.early(context, Errors.MetaNotInFunctionBody);
                }
            }

            return this.parseMetaProperty(context, (id as ESTree.Identifier), pos);
        }

        // Arrow functions cannot be used as constructors, so programs
        // like this: '(new () => {});' are disallowed
        this.flags |= Flags.DisallowArrowFunction;
        const callee = this.parseMemberExpression(context, pos);
        this.flags &= ~Flags.DisallowArrowFunction;

        return this.finishNode(context, pos, {
            type: 'NewExpression',
            callee,
            arguments: this.token === Token.LeftParen ? this.parseCallArguments(context) : []
        });
    }

    private parseLeftHandSideExpression(context: Context, pos: Location): ESTree.Expression {

        let expr;

        if (this.token === Token.SuperKeyword) {
            expr = this.parseSuperExpression(context);
        } else if (this.token === Token.ImportKeyword) {
            if (!(context & Context.OptionsNext)) this.early(context, Errors.Unexpected);
            expr = this.parseImportCall(context | Context.AllowIn, pos);
        } else {
            expr = this.parseMemberExpression(context | Context.AllowIn, pos);
        }

        return expr.type === 'ArrowFunctionExpression' && this.token !== Token.LeftParen ?
            expr :
            this.parseCallExpression(context | Context.AllowIn, pos, expr);
    }

    private parseMemberExpression(
        context: Context,
        pos: Location,
        expr: ESTree.CallExpression | ESTree.Expression = this.parsePrimaryExpression(context, pos)
    ): ESTree.Expression {

        while (true) {

            if (this.parseOptional(context, Token.Period)) {

                const property = context & Context.InClass && this.token === Token.Hash ?
                    this.parsePrivateName(context) :
                    this.parseIdentifierName(context, this.token);
                expr = this.finishNode(context, pos, {
                    type: 'MemberExpression',
                    object: expr,
                    computed: false,
                    property,
                });

                continue;
            }

            if (this.parseOptional(context, Token.LeftBracket)) {
                const start = this.getLocation();
                const property = this.parseExpression(context, start);
                this.expect(context, Token.RightBracket);
                expr = this.finishNode(context, pos, {
                    type: 'MemberExpression',
                    object: expr,
                    computed: true,
                    property,
                });

                continue;
            }

            if (this.token === Token.TemplateCont || this.token === Token.TemplateTail) {
                const quasi = this.token === Token.TemplateTail ?
                    this.parseTemplateLiteral(context | Context.TaggedTemplate) :
                    this.parseTemplate(context | Context.TaggedTemplate);
                expr = this.finishNode(context, pos, {
                    type: 'TaggedTemplateExpression',
                    tag: expr,
                    quasi
                });
                continue;
            }

            return expr;
        }
    }

    private parseTemplateLiteral(context: Context): ESTree.TemplateLiteral {
        const pos = this.getLocation();
        return this.finishNode(context, pos, {
            type: 'TemplateLiteral',
            expressions: [],
            quasis: [this.parseTemplateElement(context)]
        });
    }

    private parseTemplateElement(context: Context): ESTree.TemplateElement {
        const pos = this.getLocation();
        const cooked = this.tokenValue;
        const raw = this.tokenRaw;

        this.expect(context, Token.TemplateTail);

        return this.finishNode(context, pos, {
            type: 'TemplateElement',
            value: {
                cooked,
                raw
            },
            tail: true
        });
    }

    private parseTemplateHead(context: Context, cooked: string, raw: string, pos: Location): ESTree.TemplateElement {
        this.token = this.consumeTemplateBrace(context);

        return this.finishNode(context, pos, {
            type: 'TemplateElement',
            value: {
                cooked,
                raw
            },
            tail: false
        });
    }

    private parseTemplate(
        context: Context,
        expressions: ESTree.Expression[] = [],
        quasis: ESTree.TemplateElement[] = []
    ): ESTree.TemplateLiteral {
        const pos = this.getLocation();
        const cooked = this.tokenValue;
        const raw = this.tokenRaw;

        this.expect(context, Token.TemplateCont);

        expressions.push(this.parseExpression(context, pos));
        const t = this.getLocation();
        quasis.push(this.parseTemplateHead(context, cooked, raw, pos));

        if (this.token === Token.TemplateTail) {
            quasis.push(this.parseTemplateElement1(context, t));
        } else {
            this.parseTemplate(context, expressions, quasis);
        }

        return this.finishNode(context, pos, {
            type: 'TemplateLiteral',
            expressions,
            quasis
        });
    }

    private parseTemplateElement1(context: Context, pos: Location): ESTree.TemplateElement {
        const cooked = this.tokenValue;
        const raw = this.tokenRaw;

        this.expect(context, Token.TemplateTail);

        return this.finishNode(context, pos, {
            type: 'TemplateElement',
            value: {
                cooked,
                raw
            },
            tail: true
        });
    }

    private parseCallExpression(
        context: Context,
        pos: Location,
        expr: ESTree.Expression
    ): ESTree.Expression | ESTree.CallExpression {

        while (true) {

            expr = this.parseMemberExpression(context, pos, expr);

            if (this.token !== Token.LeftParen) return expr;

            expr = this.finishNode(context, pos, {
                type: 'CallExpression',
                callee: expr,
                arguments: this.parseCallArguments(context)
            });
        }
    }

    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions

    private parseCallArguments(context: Context): ESTree.Expression[] {
        this.expect(context, Token.LeftParen);

        const expressions: any[] = [];

        while (this.token !== Token.RightParen) {
            if (this.token === Token.Ellipsis) {
                expressions.push(this.parseSpreadExpression(context, ));
            } else {
                if (this.token & Token.IsYield) {
                    this.flags |= Flags.HasYield;
                    this.errorLocation = this.getLocation();
                }
                expressions.push(this.parseAssignmentExpression(context | Context.AllowIn));
            }
            this.parseOptional(context, Token.Comma);
        }

        this.expect(context, Token.RightParen);
        if (this.token === Token.Arrow) {
            this.report(Errors.UnexpectedToken, tokenDesc(this.token));
        }
        return expressions;
    }

    // https://tc39.github.io/ecma262/#sec-array-initializer

    private parseSpreadExpression(context: Context, pos = this.getLocation()): ESTree.SpreadElement {

        const t = this.token;

        this.expect(context, Token.Ellipsis);

        const arg = this.parseAssignmentExpression(context);
        // Object rest element needs to be the last AssignmenProperty in
        // ObjectAssignmentPattern. (For..in / of statement)
        if (context & Context.ForStatement &&
            this.token === Token.Comma) {
            this.early(context, Errors.UnexpectedToken, tokenDesc(t));
        }
        return this.finishNode(context, pos, {
            type: 'SpreadElement',
            argument: arg
        });
    }

    // https://tc39.github.io/ecma262/#sec-primary-expression

    private parsePrimaryExpression(context: Context, pos: Location): any {

        switch (this.token) {
            case Token.Identifier:
                return this.parseIdentifier(context);
            case Token.NumericLiteral:
            case Token.StringLiteral:
                return this.parseLiteral(context);
            case Token.NullKeyword:
            case Token.TrueKeyword:
            case Token.FalseKeyword:
                return this.parseNullOrTrueOrFalseExpression(context, pos);
            case Token.ThisKeyword:
                return this.parseThisExpression(context);
            case Token.BigInt:
                return this.parseBigIntLiteral(context, pos);
            case Token.LeftParen:
                return this.parseParenthesizedExpression(context | Context.InParenthesis);
            case Token.LeftBracket:
                return this.parseArrayInitializer(context);
            case Token.LeftBrace:
                return this.parseObjectExpression(context & ~Context.AllowSuperProperty);
            case Token.SuperKeyword:
                return this.parseSuperExpression(context);
            case Token.ClassKeyword:
                return this.parseClass(context | Context.Expression);
            case Token.FunctionKeyword:
                return this.parseFunction(context & ~(Context.YieldContext | Context.IfBody) | Context.Expression);
            case Token.NewKeyword:
                return this.parseNewExpression(context);
            case Token.TemplateTail:
                return this.parseTemplateLiteral(context);
            case Token.TemplateCont:
                return this.parseTemplate(context);
            case Token.Divide:
            case Token.DivideAssign:
                return this.parseRegularExpression(context);
            case Token.AsyncKeyword:
                return this.parseAsyncFunctionExpression(context, pos);
            case Token.LetKeyword:
                {
                    // 'let' must not be in expression position in strict mode
                    if (context & Context.Strict) {
                        this.early(context, Errors.InvalidStrictExpPostion, 'let');
                    }
                    const letIdentifier = this.parseIdentifier(context);

                    // Note: ExpressionStatement has a lookahead restriction for `let [`.
                    if (this.token === Token.LeftBracket &&
                        this.flags & Flags.LineTerminator) {
                        this.early(context, Errors.UnexpectedToken, 'let');
                    }

                    return letIdentifier;
                }

            case Token.Hash:
                if (context & Context.InClass) {
                    return this.parsePrivateName(context);
                }
            case Token.YieldKeyword:
                if (context & Context.YieldContext) {
                    this.early(context, Errors.DisallowedInContext, tokenDesc(this.token));
                }
            case Token.AwaitKeyword:
                if (context & Context.Module) {
                    this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
                }
            default:
                if (!this.isIdentifier(context, this.token)) this.early(context, Errors.Unexpected);
                return this.parseIdentifier(context);
        }
    }

    // http://www.ecma-international.org/ecma-262/8.0/#prod-AsyncFunctionExpression

    private parseAsyncFunctionExpression(
        context: Context,
        pos: Location): ESTree.CallExpression | ESTree.ArrowFunctionExpression | ESTree.Identifier {

        const hasEscape = (this.flags & Flags.ExtendedUnicodeEscape) !== 0;

        const flags = this.flags;

        const id = this.parseIdentifier(context);

        if (this.flags & Flags.LineTerminator) return id;

        // To avoid a look-ahead, we simply set the 'AsyncFunction' bit after
        // consuming the 'async' token before parsing out the 'FunctionExpression' itself.
        if (this.token === Token.FunctionKeyword) {
            if (hasEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
            return this.parseFunction(
                context & ~Context.IfBody | Context.Expression | Context.AsyncContext | Context.AsyncFunction,
                false,
                ObjectState.None,
                pos);
        }

        const t = this.token;

        // Check if we this is a "concise body" async arrow function followed by either
        // an identifer or 'yield'
        if (t & (Token.IsIdentifier | Token.IsYield)) {
            if (hasEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
            // If we have a LineTerminator here, it can't be an arrow functions. So simply
            // return the identifer.
            if (this.flags & Flags.LineTerminator) return id;
            // The yield keyword may not be used in an arrow function's body (except when permitted
            // within functions further nested within it). As a consequence, arrow functions
            // cannot be used as generators.
            if (context & Context.YieldContext && t & Token.IsYield) {
                this.early(context, Errors.Unexpected);
            }
            const expr = this.parseIdentifier(context);

            if (this.token !== Token.Arrow) this.early(context, Errors.Unexpected);

            return this.parseArrowFunctionExpression(context | Context.AsyncContext, pos, [expr]);
        }

        // A simple async identifier - E.g 'async' or 'async: await' where the latter is the
        // identifier node in this case.
        if (this.token !== Token.LeftParen) return id;

        const params: string[] = [];

        let state = ParenthesizedState.None;
        const args = [];

        // http://www.ecma-international.org/ecma-262/8.0/#prod-CoverCallExpressionAndAsyncArrowHead

        this.expect(context, Token.LeftParen);

        while (this.token !== Token.RightParen) {

            if (this.token === Token.Ellipsis) {
                const elem = this.parseSpreadExpression(context);
                // Trailing comma in async arrow param list
                if (this.token === Token.Comma) state |= ParenthesizedState.Trailing;
                args.push(elem);
                break;
            }
            // Start of a binding pattern inside parenthesis - '({foo: bar})', '{[()]}'
            if (hasBit(this.token, Token.IsBindingPattern)) {
                this.errorLocation = this.getLocation();
                state |= ParenthesizedState.BindingPattern;
            }

            if (hasBit(this.token, Token.IsEvalArguments)) {
                this.errorLocation = this.getLocation();
                state |= ParenthesizedState.EvalOrArguments;
            }

            if (hasBit(this.token, Token.IsYield)) {
                this.errorLocation = this.getLocation();
                state |= ParenthesizedState.Yield;
            }
            if (this.token === Token.LeftParen) {
                this.errorLocation = this.getLocation();
                state |= ParenthesizedState.NestedParenthesis;
            }

            if (hasBit(this.token, Token.IsAwait)) {
                this.errorLocation = this.getLocation();
                state |= ParenthesizedState.Await;
                this.flags |= Flags.HasAwait;
            }

            args.push(this.parseAssignmentExpression(context | Context.InParenthesis));

            this.parseOptional(context, Token.Comma);
        }

        this.expect(context, Token.RightParen);

        if (this.token === Token.Arrow) {

            if (hasEscape) this.early(context, Errors.UnexpectedEscapedKeyword);

            if (state & ParenthesizedState.BindingPattern) {
                // this.errorLocation = this.getLocation();
                this.flags |= Flags.SimpleParameterList;
            }

            // A async arrows cannot have a line terminator between "async" and the formals
            if (flags & Flags.LineTerminator) {
                this.early(context, Errors.LineBreakAfterAsync);
            }
            if (state & ParenthesizedState.Yield) {
                this.early(context, Errors.InvalidAwaitInArrowParam);
            }
            if (this.flags & Flags.HasAwait) {
                this.early(context, Errors.InvalidAwaitInArrowParam);
            }
            if (state & ParenthesizedState.EvalOrArguments) {
                // Invalid: '"use strict"; (eval = 10) => 42;'
                if (context & Context.Strict) this.early(context, Errors.UnexpectedStrictReserved);
                // Invalid: '(eval = 10) => { "use strict"; }'
                // this.errorLocation = this.getLocation();
                this.flags |= Flags.ReservedWords;
            }
            if (state & ParenthesizedState.NestedParenthesis) {
                this.early(context, Errors.InvalidParenthesizedPattern);
            }
            if (state & ParenthesizedState.Trailing) {
                this.early(context, Errors.UnexpectedToken, tokenDesc(this.token));
            }

            return this.parseArrowFunctionExpression(context | Context.AsyncContext, pos, args, params);
        }

        return this.finishNode(context, pos, {
            type: 'CallExpression',
            callee: id,
            arguments: args
        });
    }

    private parseObjectExpression(context: Context): ESTree.ObjectExpression {

        const pos = this.getLocation();

        this.expect(context, Token.LeftBrace);

        const properties: (ESTree.Property | ESTree.SpreadElement)[] = [];

        // Checking for the 'RightBrace' token here avoid the "bit toggling"
        // in cases where the object body is empty. E.g. '({})'
        if (this.token !== Token.RightBrace) {

            while (this.token !== Token.RightBrace) {
                properties.push(this.token === Token.Ellipsis ?
                    this.parseSpreadExpression(context) :
                    this.parsePropertyDefinition(context & ~Context.InClass));
                if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
            }

            if (this.flags & Flags.DuplicateProtoField && this.token !== Token.Assign) {
                this.early(context, Errors.DuplicateProtoProperty);
            }

            // Unset the 'HasProtoField' flag now, we are done!
            this.flags &= ~(Flags.ProtoField | Flags.DuplicateProtoField);
        }

        this.expect(context, Token.RightBrace);

        return this.finishNode(context, pos, {
            type: 'ObjectExpression',
            properties
        });
    }

    // http://www.ecma-international.org/ecma-262/8.0/#prod-PropertyDefinition

    private parsePropertyDefinition(context: Context): ESTree.Property {

        const pos = this.getLocation();

        let t = this.token;
        let state: ObjectState = ObjectState.None;
        let value: ESTree.Expression | null = null;
        let key: ESTree.Literal | ESTree.Identifier | ESTree.Expression | null = null;

        const isEscaped = (this.flags & Flags.ExtendedUnicodeEscape) !== 0;

        if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Generator;

        if (!(state & ObjectState.Generator) && this.token === Token.AsyncKeyword) {

            const isIdentifier = this.parseIdentifier(context);

            if (this.token & Token.IsShorthand) {
                key = isIdentifier;
            } else {

                if (this.flags & Flags.LineTerminator) this.early(context, Errors.LineBreakAfterAsync);

                // Invalid: '({ \\u0061sync* m(){} });'
                if (isEscaped) this.early(context, Errors.UnexpectedEscapedKeyword);
                state |= ObjectState.Async;

                if (this.parseOptional(context, Token.Multiply)) {
                    state |= ObjectState.Generator;
                }
                t = this.token;
                if (t === Token.LeftBracket) state |= ObjectState.Computed;
                key = this.parsePropertyName(context);
            }
        } else {
            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            key = this.parsePropertyName(context);
        }

        // Invalid: '({  __proto__: null,  other: null,  '__proto__': null });'
        const __proto__ = this.tokenValue === '__proto__';

        if (!(state & ObjectState.Computed) &&
            this.token !== Token.LeftParen &&
            (t === Token.GetKeyword || t === Token.SetKeyword) &&
            this.token !== Token.Colon && this.token !== Token.RightBrace) {

            if (state & (ObjectState.Generator | ObjectState.Async)) {
                this.early(context, Errors.Unexpected);
            }

            if (isEscaped) this.early(context, Errors.UnexpectedEscapedKeyword);
            if (t === Token.GetKeyword) state |= ObjectState.Get;
            else state |= ObjectState.Set;

            key = this.parsePropertyName(context);
            value = this.parseMethodDeclaration(context, state | ObjectState.Method, pos);
        } else {

            switch (this.token) {

                case Token.LeftParen:
                    {
                        // If not 'get' or 'set', it has to be a 'method'
                        if (!(state & ObjectState.Accessors)) {
                            state |= ObjectState.Method;
                        }

                        value = this.parseMethodDeclaration(context, state, pos);
                        break;
                    }

                case Token.Colon:
                    {
                        this.expect(context, Token.Colon);

                        if (context & Context.Strict && this.token & Token.IsEvalArguments) {
                            this.early(context, Errors.UnexpectedStrictReserved);
                        }

                        if (!(state & ObjectState.Computed) && __proto__) {
                            // Annex B defines an early error for duplicate PropertyName of `__proto__`,
                            // in object initializers, but this does not apply to Object Assignment
                            // patterns, so we need to validate this *after* done parsing
                            // the object expression
                            this.flags |= this.flags & Flags.ProtoField ?
                                Flags.DuplicateProtoField :
                                Flags.ProtoField;
                        }
                        if (state & (ObjectState.Generator | ObjectState.Async)) {
                            this.early(context, Errors.DisallowedInContext, tokenDesc(t));
                        }
                        value = this.parseAssignmentExpression(context);
                        break;
                    }

                default:

                    if (state & ObjectState.Async || !this.isIdentifier(context, t)) {
                        this.early(context, Errors.UnexpectedToken, tokenDesc(t));
                    }

                    if (context & (Context.AsyncContext | Context.YieldContext) &&
                        t & (Token.IsAwait | Token.IsYield)) {
                        this.early(context, Errors.DisallowedInContext, tokenDesc(t));
                    }

                    // Here we can be inside an arrow parameter list, so we set
                    // the 'HasAwait' flag now  and throw later on if this turn out
                    // to be a invalid program. E.g. '(async( { await } = {} ) => {}):'
                    if (t & (Token.IsAwait)) {
                        this.errorLocation = this.getLocation();
                        this.flags |= Flags.HasAwait;

                    }

                    if (context & Context.Strict && t & Token.IsEvalArguments) {
                        this.early(context, Errors.UnexpectedStrictReserved);
                    }

                    state |= ObjectState.Shorthand;

                    if (this.parseOptional(context, Token.Assign)) {

                        if (context & Context.YieldContext && this.token & Token.IsYield) {
                            this.errorLocation = this.getLocation();
                            this.flags |= Flags.HasYield;
                        }

                        if (this.token & Token.IsAwait) {
                            this.errorLocation = this.getLocation();
                            this.flags |= Flags.HasAwait;
                        }

                        const right = this.parseAssignmentExpression(context);

                        value = this.finishNode(context, pos, {
                            type: 'AssignmentPattern',
                            left: key,
                            right
                        });
                    } else {
                        value = key;
                    }
            }
        }

        return this.finishNode(context, pos, {
            type: 'Property',
            key,
            value,
            kind: !(state & ObjectState.Accessors) ? 'init' : (state & ObjectState.Set) ? 'set' : 'get',
            computed: !!(state & ObjectState.Computed),
            method: !!(state & ObjectState.Method),
            shorthand: !!(state & ObjectState.Shorthand)
        });
    }

    private parseMethodDeclaration(context: Context, state: ObjectState, pos: Location) {

        if (state & ObjectState.Generator) {
            context |= Context.YieldContext;
        } else {
            context &= ~Context.YieldContext;
        }

        if (state & ObjectState.Async) {
            context |= Context.AsyncContext;
        } else {
            context &= ~Context.AsyncContext;
        }

        return this.parseFunction(context | Context.Method, false, state);
    }

    private parseComputedPropertyName(context: Context): ESTree.Expression {
        const pos = this.getLocation();
        this.nextToken(context);

        const expression = this.parseAssignmentExpression(context | Context.AllowIn);
        this.expect(context, Token.RightBracket);
        return expression;
    }

    private parsePropertyName(context: Context, state = ObjectState.None) {
        const pos = this.getLocation();
        switch (this.token) {
            case Token.NumericLiteral:
            case Token.StringLiteral:
                return this.parseLiteral(context);
            case Token.LeftBracket:
                return this.parseComputedPropertyName(context);
            case Token.Hash:
                if (context & Context.InClass) return this.parsePrivateName(context, state);
            default:
                return this.parseIdentifier(context);
        }
    }

    private parseArrayInitializer(context: Context): ESTree.ArrayExpression {

        const pos = this.getLocation();

        this.expect(context, Token.LeftBracket);

        const elements = [];

        let state = ArrayState.None;

        while (this.token !== Token.RightBracket) {
            if (this.parseOptional(context, Token.Comma)) {
                elements.push(null);
            } else if (this.token === Token.Ellipsis) {
                const element = this.parseSpreadExpression(context);
                // Note! An AssignmentElement may not follow an
                // AssignmentRestElement - e.g. '[...x, y] = [];' - but we don't know
                // yet if this array are followed by an initalizer or not.
                // That is something we will find out after we have swallowed the ']' token.
                // So for now, we mark the comma as found, and continue parsing...
                if (this.token === Token.Comma) {
                    state |= ArrayState.CommaSeparator;
                }
                if (this.token !== Token.RightBracket) this.expect(context, Token.Comma);
                elements.push(element);

            } else {
                // Note! In case we are parsing out a arrow param list, we
                // mark the 'await' keyword here if found. This cover cases
                // like: '"use strict" ([await]) => {}'
                if (this.token & Token.IsAwait) {
                    this.errorLocation = this.getLocation();
                    this.flags |= Flags.HasAwait;
                }
                if (this.token & Token.IsEvalArguments) {
                    this.errorLocation = this.getLocation();
                    state |= ArrayState.EvalOrArguments;
                }
                elements.push(this.parseAssignmentExpression(context | Context.AllowIn));
                if (this.token !== Token.RightBracket) this.expect(context, Token.Comma);
            }
        }

        this.expect(context, Token.RightBracket);

        if (state & ArrayState.CommaSeparator) {
            // We got a comma separator and we have a initializer. Time to throw an error!
            if (this.token === Token.Assign) this.early(context, Errors.ElementAfterRest);
            // Note! This also affects arrow expressions because we are parsing out the
            // arrow param list either in 'parseParenthesizedExpression' or
            // 'parseAsyncFunctionExpression'. So in that case we 'flag' that
            // we found something we don't like, and throw later on.
            //
            // E.g. 'f = ([...[x], y]) => {}'
            //
            this.flags |= Flags.HasCommaSeparator;
        } else if (state & ArrayState.EvalOrArguments) {
            if (context & Context.ForStatement){
                if (context & Context.Strict) this.early(context, Errors.UnexpectedReservedWord);
            }
            else if (this.token === Token.Assign) {
                this.early(context, Errors.UnexpectedReservedWord);
            }
            
        }

        return this.finishNode(context, pos, {
            type: 'ArrayExpression',
            elements
        });
    }

    private parseClass(context: Context, identifierIsOptional? : boolean): ESTree.ClassExpression | ESTree.ClassDeclaration {

        if (this.flags & Flags.ExtendedUnicodeEscape) {
            this.early(context, Errors.UnexpectedEscapedKeyword);
        }

        const pos = this.getLocation();

        this.expect(context, Token.ClassKeyword);

        let id: ESTree.Identifier | null = null;
        let superClass: ESTree.Expression | null = null;
        let state = ObjectState.None;

        if (this.token !== Token.ExtendsKeyword && this.isIdentifier(context, this.token)) {
            id = this.parseBindingIdentifier(context);
        } else if (!(context & Context.Expression) && !identifierIsOptional) {
            this.early(context, Errors.UnNamedClassDecl);
        }

        if (this.parseOptional(context, Token.ExtendsKeyword)) {
            superClass = this.parseLeftHandSideExpression(context | Context.Strict, pos);
            state |= ObjectState.Heritage;
        }

        const body = this.parseClassElementList(context | Context.Strict, state);

        return this.finishNode(context, pos, {
            type: context & Context.Expression ? 'ClassExpression' : 'ClassDeclaration',
            id,
            superClass,
            body
        });
    }

    private parseClassElementList(context: Context, state: ObjectState): ESTree.ClassBody {
        const pos = this.getLocation();

        this.expect(context | Context.ValidateEscape, Token.LeftBrace);

        const body: ESTree.MethodDefinition[] = [];

        while (this.token !== Token.RightBrace) {
            if (!this.parseOptional(context, Token.Semicolon)) {
                const node: any = this.parseClassElement(context | Context.InClass, state);
                body.push(node);
                if (node.kind === 'constructor') state |= ObjectState.HasConstructor;
            }

        }

        this.expect(context, Token.RightBrace);
        return this.finishNode(context, pos, {
            type: 'ClassBody',
            body
        });
    }

    // http://www.ecma-international.org/ecma-262/8.0/#prod-ClassElement

    private parseClassElement(context: Context, state: ObjectState): any {

        let t = this.token;

        const pos = this.getLocation();

        let key;

        if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Generator;

        if (this.token === Token.LeftBracket) state |= ObjectState.Computed;

        key = this.parsePropertyName(context, state);

        if (t === Token.StaticKeyword && this.token !== Token.LeftParen) {

            state |= ObjectState.Static;

            t = this.token;

            if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Generator;

            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;

            if (this.tokenValue === 'prototype') this.early(context, Errors.StaticPrototype);

            key = this.parsePropertyName(context, state);
        }

        if (!(this.token & Token.IsShorthand)) {

            if (t & Token.IsAsync && !(state & ObjectState.Computed) && !(state & ObjectState.Generator)) {

                // No linebreak after async
                if (this.flags & Flags.LineTerminator) this.early(context, Errors.LineBreakAfterAsync);

                state |= ObjectState.Async;

                if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Generator;

                if (this.token === Token.LeftBracket) state |= ObjectState.Computed;

                key = this.parsePropertyName(context, state);
            }

            if (!(state & ObjectState.Computed)) {

                if (!(state & (ObjectState.Async | ObjectState.Generator)) && (t === Token.GetKeyword || t === Token.SetKeyword)) {

                    state |= t === Token.GetKeyword ? ObjectState.Get : ObjectState.Set;

                    if (this.token === Token.LeftBracket) state |= ObjectState.Computed;

                    this.errorLocation = this.getLocation();
                    key = this.parsePropertyName(context, state);

                    if (this.tokenValue === 'prototype') this.early(context, Errors.StaticPrototype);
                }
            }
        }

        if (!(state & (ObjectState.Computed | ObjectState.Static)) && this.tokenValue === 'constructor') {
            state |= ObjectState.Constructor;
        }

        if (this.token === Token.LeftParen) {

            return this.parseFieldOrMethodDeclaration(context, state, key, pos);
        }

        if (context & Context.OptionsNext) {
            if (this.token & (Token.IsIdentifier | Token.IsKeyword) ||
                this.token === Token.Period ||
                this.token === Token.Semicolon ||
                this.token === Token.Assign) {
                let value = null;

                // static public class fields forbidden
                if (state & ObjectState.Static) this.early(context, Errors.Unexpected);
                if (this.parseOptional(context, Token.Assign)) {
                    if (this.token & Token.IsEvalArguments) this.early(context, Errors.UnexpectedStrictReserved);
                    value = this.parseAssignmentExpression(context);
                }

                this.parseOptional(context, Token.Comma);

                return this.finishNode(context, pos, {
                    type: 'FieldDefinition',
                    key,
                    value,
                    computed: !!(state & ObjectState.Computed)
                });
            }
        }

        this.report(Errors.UnexpectedToken, tokenDesc(this.token));
    }

    private parseFieldOrMethodDeclaration(context: Context, state: ObjectState, key: any, pos: Location) {

        if (state & ObjectState.Heritage && state & ObjectState.Constructor) {
            context |= Context.AllowSuperProperty;
        }

        if (state & ObjectState.Constructor) {

            if (state & ObjectState.Special) {
                this.early(context, Errors.ConstructorSpecialMethod);
            }

            if (state & ObjectState.HasConstructor) {
                this.early(context, Errors.DuplicateConstructor);
            }
        }
        return this.finishNode(context, pos, {
            type: 'MethodDefinition',
            kind: (state & ObjectState.Constructor) ? 'constructor' : (state & ObjectState.Get) ? 'get' :
                (state & ObjectState.Set) ? 'set' : 'method',
            static: !!(state & ObjectState.Static),
            computed: !!(state & ObjectState.Computed),
            key,
            value: this.parseMethodDeclaration(context | Context.Method, state | ObjectState.Method, pos)
        });
    }

    private parsePrivateName(context: Context, state: ObjectState = ObjectState.None) {
        const pos = this.getLocation();
        if (state & ObjectState.Static) this.early(context, Errors.Unexpected);
        this.expect(context | Context.ProhibitWhitespace, Token.Hash);

        const t = this.token;
        if (t === Token.ConstructorKeyword) this.early(context, Errors.Unexpected);
        const name = this.tokenValue;
        this.nextToken(context);
        return this.finishNode(context, pos, {
            type: 'PrivateName',
            name
        });
    }

    private parseArrowFunctionExpression(
        context: Context,
        pos: Location,
        params: ESTree.Node[],
        args: string[] = []
    ): ESTree.ArrowFunctionExpression {

        if (this.flags & Flags.LineTerminator) {
            this.early(context, Errors.LineBreakAfterAsync);
        }

        if (this.flags & Flags.HasCommaSeparator) {
            this.early(context, Errors.ElementAfterRest);
        }

        // Invalid: 'new () => {};'
        // Valid: 'new (() => {});'
        if (!(context & Context.InParenthesis) &&
            this.flags & Flags.DisallowArrowFunction) {
            this.early(context, Errors.InvalidArrowConstructor);
        }

        this.expect(context, Token.Arrow);

        if (context & Context.InClass && this.token & Token.IsEvalArguments) {
            this.early(context, Errors.UnexpectedStrictReserved);
        }

        for (const i in params) this.reinterpret(context | Context.InArrowParameterList, params[i]);

        let body;
        let expression = false;

        if (this.token === Token.LeftBrace) {

            body = this.parseFunctionBody(context | Context.AllowIn | Context.ArrowFunction, params);

            // Invalid: '() => {} a || true'
            // Invalid: '() => {} ? a : b'
            if ((context & Context.InParenthesis) && (hasBit(this.token, Token.IsBinaryOperator) || this.token === Token.QuestionMark)) {
                this.report(Errors.UnexpectedToken, tokenDesc(this.token));
            }

        } else {
            body = this.parseAssignmentExpression(context | Context.AllowIn | Context.ArrowFunction);
            expression = true;
        }
        return this.finishNode(context, pos, {
            type: 'ArrowFunctionExpression',
            body,
            params,
            id: null,
            async: !!(context & Context.AsyncContext),
            generator: !!(context & Context.YieldContext),
            expression
        });
    }

    private parseRestElement(context: Context, params: any[] = []) {
        const pos = this.getLocation();
        this.expect(context, Token.Ellipsis);
        const argument = this.parseBindingIdentifierOrPattern(context, params);
        return this.finishNode(context, pos, {
            type: 'RestElement',
            argument
        });
    }

    private parseParenthesizedExpression(context: Context): any {
        const pos = this.getLocation();

        this.expect(context, Token.LeftParen);

        if (this.parseOptional(context, Token.RightParen) && this.token === Token.Arrow) {
            return this.parseArrowFunctionExpression(context & ~(Context.AsyncContext | Context.YieldContext), pos, []);
        }

        let expr: ESTree.Node;
        let state = ParenthesizedState.None;
        const params: string[] = [];

        if (this.token === Token.Ellipsis) {

            expr = this.parseRestElement(context, params);
            this.expect(context, Token.RightParen);
            return this.parseArrowFunctionExpression(context & ~(Context.AsyncContext | Context.YieldContext), pos, [expr], params);
        }

        const sequencepos = this.getLocation();

        let isSequence = false;

        if (context & Context.YieldContext && hasBit(this.token, Token.IsYield)) {
            this.errorLocation = this.getLocation();
            this.flags |= Flags.HasYield;
        }

        // Maybe nested parenthesis - ((foo))
        if (this.token === Token.LeftParen) {
            this.errorLocation = this.getLocation();
            state |= ParenthesizedState.NestedParenthesis;
        }

        // Start of a binding pattern inside parenthesis - '({foo: bar})', '{[()]}'
        if (hasBit(this.token, Token.IsBindingPattern)) {
            this.errorLocation = this.getLocation();
            state |= ParenthesizedState.BindingPattern;
        }

        // The parenthesis contain a future reserved word. Flag it and throw
        // later on if it turns out that we are in a strict mode context
        if (hasBit(this.token, Token.FutureReserved)) {
            this.errorLocation = this.getLocation();
            state |= ParenthesizedState.FutureReserved;
        }

        if (hasBit(this.token, Token.IsEvalArguments)) {
            this.errorLocation = this.getLocation();
            state |= ParenthesizedState.EvalOrArguments;
        }

        if (context & Context.Strict && this.token & Token.IsIdentifier) {
            params.push(this.tokenValue);
        }

        expr = this.parseAssignmentExpression(context);

        if (this.token === Token.Comma) {

            const expressions: any[] = [expr];

            while (this.parseOptional(context, Token.Comma)) {

                if (this.parseOptional(context, Token.RightParen)) {
                    if (this.token === Token.Arrow)
                        return this.parseArrowFunctionExpression(context & ~(Context.AsyncContext | Context.YieldContext), pos, expressions, params);
                } else if (this.token === Token.Ellipsis) {
                    expressions.push(this.parseRestElement(context, params));
                    this.expect(context, Token.RightParen);
                    if (state & ParenthesizedState.NestedParenthesis) {
                        this.early(context, Errors.InvalidParenthesizedPattern);
                    }
                    return this.parseArrowFunctionExpression(context & ~(Context.AsyncContext | Context.YieldContext), pos, expressions, params);
                } else {
                    // Maybe nested parenthesis as a second, third, forth
                    // param etc - '(foo, (foo))', '(foo, bar, (baz))'
                    if (this.token === Token.LeftParen) {
                        // this.errorLocation = this.getLocation();
                        state |= ParenthesizedState.NestedParenthesis;
                    }
                    if (hasBit(this.token, Token.IsEvalArguments)) {
                        // this.errorLocation = this.getLocation();
                        state |= ParenthesizedState.EvalOrArguments;

                    }
                    if (context & Context.Strict && this.token & Token.IsIdentifier) {
                        params.push(this.tokenValue);
                    }
                    expressions.push(this.parseAssignmentExpression(context));
                }
            }

            isSequence = true;

            expr = this.finishNode(context, sequencepos, {
                type: 'SequenceExpression',
                expressions
            });
        }

        this.expect(context, Token.RightParen);

        if (this.token === Token.Arrow) {
            if (state & ParenthesizedState.BindingPattern) {
                // this.errorLocation = this.getLocation();
                this.flags |= Flags.SimpleParameterList;
            }

            if (state & ParenthesizedState.FutureReserved) {
                // this.errorLocation = this.getLocation();
                this.flags |= Flags.ReservedWords;
            }

            if (state & ParenthesizedState.NestedParenthesis) {
                this.early(context, Errors.InvalidParenthesizedPattern);
            }
            if (this.flags & Flags.HasYield) {
                this.early(context, Errors.InvalidArrowYieldParam);
            }
            if (state & ParenthesizedState.EvalOrArguments) {
                // Invalid: '"use strict"; (eval = 10) => 42;'
                if (context & Context.Strict) this.early(context, Errors.UnexpectedStrictReserved);
                // Invalid: '(eval = 10) => { "use strict"; }'
                // this.errorLocation = this.getLocation();
                this.flags |= Flags.ReservedWords;
            }
            return this.parseArrowFunctionExpression(context & ~(Context.AsyncContext | Context.YieldContext), pos, isSequence ? (expr as any).expressions : [expr], params);
        }

        return expr;
    }

    private parseRegularExpression(context: Context): ESTree.RegExpLiteral {
        this.scanRegularExpression(context);
        const pos = this.getLocation();
        const regex = this.tokenRegExp;
        const value = this.tokenValue;
        const raw = this.tokenRaw;

        this.nextToken(context);

        const node = this.finishNode(context, pos, {
            type: 'Literal',
            value: value,
            regex
        });

        if (context & Context.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseNullOrTrueOrFalseExpression(context: Context, pos: Location): ESTree.Literal {
        if (this.flags & Flags.ExtendedUnicodeEscape) this.early(context, Errors.UnexpectedEscapedKeyword);
        const t = this.token;
        const raw = tokenDesc(t);
        this.nextToken(context);
        const node = this.finishNode(context, pos, {
            type: 'Literal',
            value: t === Token.NullKeyword ? null : raw === 'true'
        });

        if (context & Context.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseThisExpression(context: Context): ESTree.ThisExpression {
        const pos = this.getLocation();
        this.nextToken(context);
        return this.finishNode(context, pos, {
            type: 'ThisExpression'
        });
    }

    private parseBigIntLiteral(context: Context, pos: Location): ESTree.BigIntLiteral {
        const value = this.tokenValue;
        const raw = this.tokenRaw;
        this.nextToken(context);
        const node = this.finishNode(context, pos, {
            type: 'Literal',
            value,
            bigint: raw
        });

        if (context & Context.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseLiteral(context: Context) {
        const pos = this.getLocation();
        const raw = this.tokenRaw;
        const value = this.tokenValue;
        if (context & Context.Strict && this.flags & Flags.Octal) {
            this.early(context, Errors.StrictOctalLiteral);
        }

        this.nextToken(context);

        const node = this.finishNode(context, pos, {
            type: 'Literal',
            value
        });

        if (context & Context.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseIdentifier(context: Context) {
        const pos = this.getLocation();
        const name = this.tokenValue;
        this.nextToken(context | Context.TaggedTemplate);

        return this.finishNode(context, pos, {
            type: 'Identifier',
            name
        });
    }

    private parseBindingIdentifierOrPattern(context: Context, params: any[] = []) {
        const t = this.token;
        if (t & (Token.IsAwait | Token.IsYield)) {
            if (t & Token.IsAwait && (context & (Context.AsyncContext | Context.Module))) {
                this.early(context, Errors.UnexpectedReservedWord);
            } else if (t & Token.IsYield && (context & (Context.YieldContext | Context.Strict))) {
                this.early(context, Errors.DisallowedInContext, tokenDesc(this.token));
            }
        }
        if (!(t & Token.IsBindingPattern)) {
            params.push(this.tokenValue);
            return this.parseBindingIdentifier(context);
        }

        if (t === Token.LeftBrace) return this.ObjectAssignmentPattern(context, params);

        return this.parseArrayElementsBindingPattern(context, params);
    }

    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns

    private parseAssignmentRestElement(context: Context, params: any[] = []): ESTree.RestElement {
        const pos = this.getLocation();
        this.expect(context, Token.Ellipsis);
        const argument = this.parseBindingIdentifierOrPattern(context, params);
        return this.finishNode(context, pos, {
            type: 'RestElement',
            argument
        });
    }

    private parseAssignmentPattern(
        context: Context,
        params: any[],
        pos: Location = this.getLocation(),
        pattern: any = this.parseBindingIdentifierOrPattern(context, params)
    ): ESTree.AssignmentPattern {

        if (!this.parseOptional(context, Token.Assign)) return pattern;

        return this.finishNode(context, pos, {
            type: 'AssignmentPattern',
            left: pattern,
            right: this.parseAssignmentExpression(context)
        });
    }

    private parseArrayElementsBindingPattern(context: Context, params: any[] = []) {
        const pos = this.getLocation();
        this.expect(context, Token.LeftBracket);
        const elements: (ESTree.Pattern | null)[] = [];

        while (this.token !== Token.RightBracket) {

            if (this.token === Token.Ellipsis) {
                elements.push(this.parseAssignmentRestElement(context, params));
                break;
            }

            if (this.parseOptional(context, Token.Comma)) {
                elements.push(null);
            } else {
                elements.push(this.parseAssignmentPattern(context | Context.AllowIn, params));
                this.parseOptional(context, Token.Comma);
            }
        }

        this.expect(context, Token.RightBracket);

        return this.finishNode(context, pos, {
            type: 'ArrayPattern',
            elements
        });
    }

    private parseRestProperty(context: Context, params: any[]): ESTree.RestElement {
        const pos = this.getLocation();
        this.expect(context, Token.Ellipsis);
        // Object rest spread must be followed by an identifier in declaration contexts
        if (!(this.token & Token.IsIdentifier)) this.early(context, Errors.InvalidRestBindingPattern);
        const arg = this.parseBindingIdentifierOrPattern(context, params);

        if (this.token === Token.Assign) this.early(context, Errors.InvalidRestBindingPattern);
        // Rest element must be last element
        if (this.token !== Token.RightBrace) this.early(context, Errors.ElementAfterRest);
        return this.finishNode(context, pos, {
            type: 'RestElement',
            argument: arg
        });
    }

    private ObjectAssignmentPattern(context: Context, params: any[]) {

        const pos = this.getLocation();
        const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];

        this.expect(context, Token.LeftBrace);

        while (this.token !== Token.RightBrace) {
            if (this.token === Token.Ellipsis) {
                properties.push(this.parseRestProperty(context, params));
                // Comma is not permitted after the rest element
            } else {
                properties.push(this.parseAssignmentProperty(context, params));
                if (this.token !== Token.RightBrace) this.parseOptional(context, Token.Comma);
            }

        }

        this.expect(context, Token.RightBrace);

        return this.finishNode(context, pos, {
            type: 'ObjectPattern',
            properties
        });
    }

    private parseAssignmentProperty(context: Context, params: any[] = []): ESTree.AssignmentProperty {
        const pos = this.getLocation();
        let state = ObjectState.None;
        let key;
        let value;
        let t = this.token;

        if (t & (Token.IsIdentifier | Token.Keyword)) {

            t = this.token;

            key = this.parseIdentifier(context);

            if (!this.parseOptional(context, Token.Colon)) state |= ObjectState.Shorthand;
            if (state & ObjectState.Shorthand && context & Context.YieldContext && t & Token.IsYield) {
                this.early(context, Errors.DisallowedInContext, tokenDesc(t));
            }

            if (!(state & ObjectState.Shorthand)) {
                value = this.parseAssignmentPattern(context, params);
            } else {

                state |= ObjectState.Shorthand;

                if (context & (Context.YieldContext | Context.Strict) && t & Token.IsYield) {
                    this.early(context, Errors.DisallowedInContext, tokenDesc(t));
                }

                value = this.token === Token.Assign ?
                    this.parseAssignmentPattern(context, params, pos, key) :
                    key;
            }

        } else {

            if (t === Token.LeftBracket) {
                state |= ObjectState.Computed;
                key = this.parseComputedPropertyName(context);
            } else {
                key = (this.token === Token.NumericLiteral || this.token === Token.StringLiteral) ?
                    this.parseLiteral(context) :
                    this.parseIdentifier(context);
            }
            this.expect(context, Token.Colon);

            value = this.parseAssignmentPattern(context, params);
        }

        return this.finishNode(context, pos, {
            type: 'Property',
            kind: 'init',
            key,
            computed: !!(state & ObjectState.Computed),
            value,
            method: false,
            shorthand: !!(state & ObjectState.Shorthand)
        });
    }

    // https://tc39.github.io/ecma262/#sec-variable-statement

    private parseBindingIdentifier(context: Context): ESTree.Identifier {

        const t = this.token;

        if (context & Context.Strict && hasBit(t, Token.IsEvalArguments)) {
            this.early(context, Errors.InvalidBindingStrictMode, tokenDesc(t));
        } else if (!this.isIdentifier(context, t)) {
            this.early(context, Errors.UnexpectedToken, tokenDesc(t));
        } else if (context & Context.BlockScoped && t === Token.LetKeyword) {
            this.early(context, Errors.LetInLexicalBinding);
        }

        const name = this.tokenValue;
        const pos = this.getLocation();
        this.nextToken(context);

        return this.finishNode(context, pos, {
            type: 'Identifier',
            name
        });
    }

    private parseIdentifierName(context: Context, t: Token) {
        if (t & (Token.IsIdentifier | Token.Keyword)) return this.parseIdentifier(context);
        this.early(context, Errors.UnexpectedToken, tokenDesc(t));
    }

    private parseFunction(
        context: Context,
        identifierIsOptional? : boolean,
        state: ObjectState = ObjectState.None,
        pos = this.getLocation()) {

        let id: ESTree.Identifier | null = null;

        if (!(state & ObjectState.Method)) {

            // Unset masks Object / Class Method, and disallow derived class constructors in this context
            context &= ~(Context.Method | Context.AllowSuperProperty);

            const prevContext = context;

            if (this.parseOptional(context, Token.AsyncKeyword)) {
                context |= Context.AsyncContext;
            } else if (!(context & Context.AsyncFunction)) {
                context &= ~Context.AsyncContext;
            }

            this.expect(context, Token.FunctionKeyword);

            if (this.parseOptional(context, Token.Multiply)) {
                if (context & Context.Statement) {
                    this.early(context, Errors.GeneratorInLegacyContext);
                }
                context |= Context.YieldContext;
            } else {
                context &= ~Context.YieldContext;
            }

            if (this.token !== Token.LeftParen) {

                const t = this.token;
                const name = this.tokenValue;

                // https://github.com/tc39/ecma262/issues/632
                // https://github.com/jquery/esprima/issues/1502
                if (context & Context.Strict && t & Token.IsEvalArguments) {
                    this.early(context, Errors.StrictLHSAssignment);
                }

                if (context & (Context.Expression | Context.IfBody)) {

                    if ((context & Context.AsyncContext && t & Token.IsAwait) ||
                        (context & Context.YieldContext && t & Token.IsYield)) {
                        this.early(context, Errors.DisallowedInContext, tokenDesc(t));
                    }

                } else {

                    if ((prevContext & (Context.AsyncContext | Context.Module) && t & Token.IsAwait) ||
                        (prevContext & Context.YieldContext && t & Token.IsYield)) {
                        this.early(context, Errors.DisallowedInContext, tokenDesc(t));
                    }
                }

                id = !(context & (Context.Strict | Context.YieldContext)) && this.token === Token.YieldKeyword ?
                    this.parseIdentifierName(context, t) :
                    this.parseBindingIdentifier(context);

            } else if (!identifierIsOptional && !(context & Context.Expression)) {
                this.early(context, Errors.UnNamedFunctionStmt);
            }
        }

        const formalParameters = this.parseParameterList(context | Context.Expression | Context.InParameter, state);

        const args = formalParameters.args;
        const params = formalParameters.params;
        const body = this.parseFunctionBody(context & ~(Context.IfBody | Context.Expression | Context.TopLevel), args);

        return this.finishNode(context, pos, {
            type: context & (Context.Expression | Context.Method) ? 'FunctionExpression' : 'FunctionDeclaration',
            params,
            body,
            async: !!(context & Context.AsyncContext),
            generator: !!(context & Context.YieldContext),
            expression: false,
            id
        });
    }

    // https://tc39.github.io/ecma262/#sec-function-definitions

    private parseFunctionBody(context: Context, params: any[] = []): any {

        const pos = this.getLocation();

        const body: ESTree.Statement[] = [];

        this.expect(context, Token.LeftBrace);

        if (this.token !== Token.RightBrace) {
            const savedFlags = this.flags;
            this.flags |= Flags.InFunctionBody;
            const previousLabelSet = this.labelSet;
            this.labelSet = undefined;
            this.flags |= Flags.InFunctionBody;
            this.flags &= ~(Flags.AllowBreak | Flags.AllowContinue);

            while (this.token === Token.StringLiteral) {

                const item: any = this.parseDirective(context);

                body.push(item);

                if (!isPrologueDirective(item)) break;

                if (this.flags & Flags.StrictDirective) {
                    if (this.flags & Flags.SimpleParameterList) {
                        this.early(context, Errors.IllegalUseStrict);
                    }
                    if (this.flags & Flags.ReservedWords) this.early(context, Errors.UnexpectedStrictReserved);

                    context |= Context.Strict;
                }
            }

            while (this.token !== Token.RightBrace) {
                body.push(this.parseStatementListItem(context));
            }

            this.labelSet = previousLabelSet;
            this.flags = savedFlags;

        }
        this.expect(context, Token.RightBrace);

        if (context & Context.Strict) this.validateBindings(context, params);

        return this.finishNode(context, pos, {
            type: 'BlockStatement',
            body
        });
    }

    private parseParameterList(context: Context, state: ObjectState): any {

        this.flags &= ~Flags.SimpleParameterList;

        const args: any[] = [];

        const params: ESTree.ArrayPattern | ESTree.RestElement | ESTree.ObjectPattern | ESTree.Identifier[] = [];

        this.expect(context, Token.LeftParen);

        while (this.token !== Token.RightParen) {

            if (state & ObjectState.HasRest) this.early(context, Errors.InvalidParameterAfterRest);

            if (this.token === Token.Ellipsis) {

                this.flags |= Flags.SimpleParameterList;

                if (state & ObjectState.Set) this.early(context, Errors.BadSetterRestParameter);

                params.push(this.parseRestElement(context, args));

                state |= ObjectState.HasRest;

                // Invalid: 'class { static async *method(...a,) { } };'
                if (this.token === Token.Comma) this.early(context, Errors.ParamAfterRest);

                if (this.token === Token.Assign) this.early(context, Errors.InitializerAfterRest);

            } else {

                const pos = this.getLocation();
                if (!(this.token & Token.IsIdentifier)) this.flags |= Flags.SimpleParameterList;

                if (this.token & Token.IsEvalArguments) {
                    if (context & Context.Strict) this.early(context, Errors.StrictLHSAssignment);
                    // this.errorLocation = this.getLocation();
                    this.flags |= Flags.ReservedWords;
                }

                if (this.token & Token.FutureReserved) this.flags |= Flags.ReservedWords;

                const left = this.parseBindingIdentifierOrPattern(context, args);

                if (this.parseOptional(context, Token.Assign)) {

                    this.flags |= Flags.SimpleParameterList;

                    if (this.token & (Token.IsYield | Token.IsAwait) && context & (Context.YieldContext | Context.AsyncContext)) {
                        this.early(context, Errors.DisallowedInContext, tokenDesc(this.token));
                    }

                    params.push(this.finishNode(context, pos, {
                        type: 'AssignmentPattern',
                        left: left,
                        right: this.parseAssignmentExpression(context)
                    }));
                } else {
                    params.push(left);
                }
            }

            if (this.token === Token.RightParen) break;

            this.expect(context, Token.Comma);

            if (this.token === Token.RightParen) break;
        }

        if (state & ObjectState.Method) {
            if (state & ObjectState.Get && params.length > 0) {
                this.early(context, Errors.BadGetterArity);
            }

            if (state & ObjectState.Set && params.length !== 1) {
                this.early(context, Errors.BadSetterArity);
            }
        }

        this.expect(context, Token.RightParen);

        return {
            params,
            args
        };
    }

    // https://tc39.github.io/ecma262/#sec-for-statement
    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements

    private parseForStatement(context: Context): ESTree.ForStatement | ESTree.ForInStatement | ESTree.ForOfStatement {

        const pos = this.getLocation();

        this.expect(context, Token.ForKeyword);

        const awaitToken = !!(context & Context.AsyncContext) && this.parseOptional(context, Token.AwaitKeyword);

        this.expect(context, Token.LeftParen);

        let init: any = null;
        let type: string = 'ForStatement';
        let test: ESTree.Expression | null = null;
        let update: ESTree.Expression | null = null;
        let declarations;
        let right;

        context |= Context.ForStatement | Context.ValidateEscape;

        const t = this.token;
        const savedFlag = this.flags;

        if (t !== Token.Semicolon) {

            // 'var', let', 'const
            if (t === Token.VarKeyword ||
                t === Token.LetKeyword ||
                t === Token.ConstKeyword) {
                switch (t) {
                    case Token.LetKeyword:
                        {
                            if (!this.isLexical(context)) {
                                init = this.parseExpression(context & ~Context.AllowIn, pos);
                                break;
                            }
                        }

                        context |= Context.Let;

                        break;
                        // falls through
                    case Token.ConstKeyword:
                        context |= Context.Const;
                    default: // ignore
                }

                if (!init) {
                    const startPos = this.getLocation();
                    this.nextToken(context);
                    declarations = this.parseVariableDeclarationList(context);
                    init = this.finishNode(context, startPos, {
                        type: 'VariableDeclaration',
                        declarations,
                        kind: tokenDesc(t)
                    });
                }

            } else init = this.parseExpression(context & ~Context.AllowIn, pos);
        }

        this.flags |= (Flags.AllowContinue | Flags.AllowBreak);

        if (this.parseOptional(context, Token.OfKeyword)) {
            type = 'ForOfStatement';
            right = this.parseAssignmentExpression(context | Context.AllowIn);
            if (!declarations) {
                this.reinterpret(context, init);
            }
        } else {

            if (awaitToken) this.report(Errors.Unexpected);

            if (this.parseOptional(context, Token.InKeyword)) {
                type = 'ForInStatement';
                right = this.parseExpression(context | Context.AllowIn, pos);
                if (!declarations) {
                    if (!isValidDestructuringAssignmentTarget(init) || init.type === 'AssignmentExpression') {
                        this.early(context, Errors.InvalidLHSInForLoop);
                    }
                    this.reinterpret(context, init);
                }
            } else {

                this.expect(context, Token.Semicolon);

                if (this.token !== Token.Semicolon) {
                    test = this.parseExpression(context | Context.AllowIn, pos);
                }

                this.expect(context, Token.Semicolon);

                if (this.token !== Token.RightParen) {
                    update = this.parseExpression(context | Context.AllowIn, pos);
                }
            }
        }

        this.expect(context, Token.RightParen);

        const body = this.parseMaybeInvalidBlockStatement(context | Context.Statement);

        this.flags = savedFlag;

        return this.finishNode(context, pos, type === 'ForOfStatement' ? {
            type,
            body,
            left: init,
            right,
            await: awaitToken,
        } : right ? {
            type,
            body,
            left: init,
            right
        } : {
            type,
            body,
            init,
            test,
            update
        });
    }
}
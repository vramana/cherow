import { Chars } from './chars';
import * as ESTree from './estree';
import { hasOwn, toHex, tryCreate, fromCodePoint, hasMask, isValidDestructuringAssignmentTarget, isDirective, getQualifiedJSXName, isValidSimpleAssignmentTarget } from './common';
import { Flags, Context, ScopeMasks, RegExpState, RegExpFlag, ParenthesizedState, IterationState, ObjectState } from './masks';
import { createError, Errors } from './errors';
import { Token, tokenDesc, descKeyword } from './token';
import { isValidIdentifierStart, isvalidIdentifierContinue, isIdentifierStart, isIdentifierPart } from './unicode';
import { Options, SavedState, CollectComments, ErrorLocation, Location } from './interface';

export class Parser {
    private readonly source: string;
    private index: number;
    private column: number;
    private line: number;
    private flags: Flags;
    private tokenValue: any;
    private token: Token;
    private startPos: number;
    private startColumn: number;
    private startLine: number;
    private endPos: number;
    private endColumn: number;
    private endLine: number;
    private tokenRaw: string;
    private labelSet: any;
    private blockScope: any;
    private parentScope: any;
    private functionScope: any;
    private errorLocation: void | ErrorLocation;
    private comments: CollectComments | void;
    private tokenRegExp: void | {
        pattern: string;
        flags: string;
    };

    constructor(
        source: string,
        options: Options
    ) {
        this.flags = Flags.None;
        this.source = source;
        this.index = 0;
        this.column = 0;
        this.line = 1;
        this.endPos = 0;
        this.endColumn = 0;
        this.endLine = 0;
        this.startPos = 0;
        this.startColumn = 0;
        this.startLine = 0;
        this.tokenValue = undefined;
        this.tokenRaw = '';
        this.token = 0;
        this.labelSet = {};
        this.errorLocation = undefined;
        this.tokenRegExp = undefined;
        this.functionScope = undefined;
        this.blockScope = undefined;
        this.parentScope = undefined;
        this.comments = undefined;

        if (options.next) this.flags |= Flags.OptionsNext;
        if (options.comments) this.flags |= Flags.OptionsOnComment;
        if (options.jsx) this.flags |= Flags.OptionsJSX;
        if (options.locations) this.flags |= Flags.OptionsLoc;
        if (options.ranges) this.flags |= Flags.OptionsRanges;
        if (options.raw) this.flags |= Flags.OptionsRaw;
        if (options.v8) this.flags |= Flags.OptionsV8;

        if (this.flags & Flags.OptionsOnComment) this.comments = options.comments;
    }

    // 'strict' are a pre-set bitmask in 'module code',
    // so no need to check for strict directives, and the
    // 'body' are different. (thus the duplicate code path).
    public parseModule(context: Context): ESTree.Program {

        const node: ESTree.Program = {
            type: 'Program',
            body: this.ParseModuleItemList(context | Context.AllowIn),
            sourceType: 'module'
        };

        if (this.flags & Flags.OptionsRanges) {
            node.start = 0;
            node.end = this.source.length;
        }

        if (this.flags & Flags.OptionsLoc) {
            node.loc = {
                start: {
                    line: 1,
                    column: 0,
                },
                end: {
                    line: this.line,
                    column: this.column
                }
            };
        }
        return node;
    }

    public parseScript(context: Context): ESTree.Program {

        const node: ESTree.Program = {
            type: 'Program',
            body: this.parseStatementList(context | Context.AllowIn),
            sourceType: 'script'
        };

        if (this.flags & Flags.OptionsRanges) {
            node.start = 0;
            node.end = this.source.length;
        }
        if (this.flags & Flags.OptionsLoc) {
            node.loc = {
                start: {
                    line: 1,
                    column: 0,
                },
                end: {
                    line: this.line,
                    column: this.column
                }
            };
        }
        return node;
    }

    private error(type: Errors, ...params: string[]): void {
        throw createError(type, this.trackErrorLocation(), ...params);
    }

    private throwError(type: Errors, ...params: string[]): void {
        const loc: any = this.errorLocation;
        throw createError(type, this.errorLocation, ...params);
    }

    private trackErrorLocation(): ErrorLocation {
        return {
            index: this.index,
            line: this.line,
            column: this.column
        };
    }

    private saveState(): SavedState {
        return {
            index: this.index,
            column: this.column,
            line: this.line,
            startLine: this.startLine,
            endLine: this.endLine,
            startColumn: this.startColumn,
            endColumn: this.endColumn,
            token: this.token,
            tokenValue: this.tokenValue,
            tokenRaw: this.tokenRaw,
            startPos: this.startPos,
            endPos: this.endPos,
            tokenRegExp: this.tokenRegExp,
            flags: this.flags,
        };
    }

    private rewindState(state: SavedState) {
        this.index = state.index;
        this.column = state.column;
        this.line = state.line;
        this.token = state.token;
        this.tokenValue = state.tokenValue;
        this.startPos = state.startPos;
        this.endPos = state.endPos;
        this.endLine = state.endLine;
        this.startLine = state.startLine;
        this.startColumn = state.startColumn;
        this.endColumn = state.endColumn;
        this.tokenRegExp = state.tokenRegExp;
        this.tokenRaw = state.tokenRaw;
        this.flags = state.flags;
    }

    private nextToken(context: Context): Token {
        this.token = this.scanToken(context);
        return this.token;
    }

    private hasNext() {
        return this.index < this.source.length;
    }

    private nextChar() {
        return this.source.charCodeAt(this.index);
    }

    private nextUnicodeChar() {
        this.advance();
        const hi = this.nextChar();
        if (hi < 0xd800 || hi > 0xdbff) return hi;
        if (this.index === this.source.length) return hi;
        const lo = this.nextChar();

        if (lo < 0xdc00 || lo > 0xdfff) return hi;
        return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
    }

    /**
     * Advance to next position
     */
    private advance(): void {
        this.index++;
        this.column++;
    }

    private advanceTwice(): void {
        this.index += 2;
        this.column += 2;
    }

    /**
     * Advance to new line
     */
    private advanceNewline() {
        this.flags |= Flags.LineTerminator;
        this.index++;
        this.column = 0;
        this.line++;
    }

    /**
     * Advance if the code unit matches the UTF-16 code unit at the given index.
     *
     * @param code Number
     */
    private consume(code: number): boolean {
        if (this.nextChar() !== code) return false;
        this.advance();
        return true;
    }

    /**
     * Scan the entire source code. Skips whitespace and comments, and
     * return the token at the given index.
     *
     * @param context Context
     */
    private scanToken(context: Context): Token {

        this.flags &= ~(Flags.LineTerminator | Flags.HasUnicode);

        this.endPos = this.index;
        this.endColumn = this.column;
        this.endLine = this.line;

        while (this.hasNext()) {

            this.startPos = this.index;
            this.startColumn = this.column;
            this.startLine = this.line;

            const first = this.nextChar();

            switch (first) {
                case Chars.CarriageReturn:
                case Chars.LineFeed:
                    this.advanceNewline();
                    if (this.hasNext() &&
                        first === Chars.CarriageReturn &&
                        this.nextChar() === Chars.LineFeed) {
                        this.index++;
                    }
                    continue;

                    // 0x7F > chars
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.advanceNewline();
                    continue;

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
                    this.advance();
                    continue;

                    // `/`, `/=`, `/>`
                case Chars.Slash:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (next === Chars.Slash) {
                            this.advance();
                            this.skipSingleLineComment(2);
                            continue;
                        } else if (next === Chars.Asterisk) {
                            this.advance();
                            this.skipMultiLineComment();
                            continue;
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.DivideAssign;
                        }

                        return Token.Divide;
                    }

                    // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
                case Chars.LessThan:
                    {
                        this.advance();

                        const next = this.nextChar();

                        if (!(context & Context.Module) && next === Chars.Exclamation) {
                            this.advance();
                            if (this.consume(Chars.Hyphen) &&
                                this.consume(Chars.Hyphen)) {
                                this.skipSingleLineComment(4);
                            }
                            continue;
                        }

                        if (next === Chars.LessThan) {
                            this.advance();
                            if (this.consume(Chars.EqualSign)) {
                                return Token.ShiftLeftAssign;
                            }
                            return Token.ShiftLeft;
                        }

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.LessThanOrEqual;
                        }

                        if (this.flags & Flags.OptionsJSX &&
                            this.consume(Chars.Slash) &&
                            !this.consume(Chars.Asterisk)) {
                            return Token.JSXClose;
                        }

                        return Token.LessThan;
                    }

                    // -, --, -->, -=,
                case Chars.Hyphen:
                    {
                        this.advance(); // skip '-'

                        const next = this.nextChar();

                        if (next === Chars.Hyphen) {
                            this.advance();
                            if (this.consume(Chars.GreaterThan)) {
                                if (!(context & Context.Module) || this.flags & Flags.LineTerminator) {
                                    this.skipSingleLineComment(3);
                                }
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

                    // `#`
                case Chars.Hash:
                    {
                        if (this.index === 0 &&
                            this.source.charCodeAt(this.index + 1) === Chars.Exclamation) {
                            this.advanceTwice();
                            this.skipShebangComment();
                            continue;
                        }
                    }

                    // `{`
                case Chars.LeftBrace:
                    this.advance();
                    return Token.LeftBrace;

                    // `}`
                case Chars.RightBrace:
                    this.advance();
                    this.flags |= Flags.LineTerminator;
                    return Token.RightBrace;

                    // `~`
                case Chars.Tilde:
                    this.advance();
                    return Token.Complement;

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

                    // `(`
                case Chars.LeftParen:
                    this.advance();
                    return Token.LeftParen;

                    // `)`
                case Chars.RightParen:
                    this.advance();
                    return Token.RightParen;

                    // Template
                case Chars.Backtick:
                    return this.scanTemplate(context);

                    // `'string'`, `"string"`
                case Chars.DoubleQuote:
                case Chars.SingleQuote:
                    return this.scanString(context, first);

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

                    // `%`, `%=`
                case Chars.Percent:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.Modulo;
                    return Token.ModuloAssign;

                    // `!`, `!=`, `!==`
                case Chars.Exclamation:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.Negate;
                    if (!this.consume(Chars.EqualSign)) return Token.LooseNotEqual;
                    return Token.StrictNotEqual;

                    // `^`, `^=`
                case Chars.Caret:
                    this.advance();
                    if (!this.consume(Chars.EqualSign)) return Token.BitwiseXor;
                    return Token.BitwiseXorAssign;

                    // `*`, `**`, `*=`, `**=`
                case Chars.Asterisk:
                    {
                        this.advance();
                        if (!this.hasNext()) return Token.Multiply;
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

                    // `=`, `==`, `===`, `=>`
                case Chars.EqualSign:
                    {
                        this.advance();

                        if (!this.hasNext()) return Token.Assign;

                        const next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            if (this.consume(Chars.EqualSign)) {
                                return Token.StrictEqual;
                            } else {
                                return Token.LooseEqual;
                            }
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

                        // Fixes '<a>= == =</a>'
                        if (context & Context.JSXChild) return Token.GreaterThan;

                        let next = this.nextChar();

                        if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.GreaterThanOrEqual;
                        }

                        if (next !== Chars.GreaterThan) return Token.GreaterThan;
                        this.advance();

                        next = this.nextChar();

                        if (next === Chars.GreaterThan) {
                            this.advance();
                            if (this.consume(Chars.EqualSign)) {
                                return Token.LogicalShiftRightAssign;
                            } else {
                                return Token.LogicalShiftRight;
                            }
                        } else if (next === Chars.EqualSign) {
                            this.advance();
                            return Token.ShiftRightAssign;
                        }

                        return Token.ShiftRight;
                    }

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

                    // '.'
                case Chars.Period:
                    {
                        let index = this.index + 1;

                        const next = this.source.charCodeAt(index);
                        if (next >= Chars.Zero && next <= Chars.Nine) {
                            this.scanNumber(context);
                            return Token.NumericLiteral;
                        } else if (next === Chars.Period) {
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

                    // '0'
                case Chars.Zero:
                    {
                        const index = this.index + 1;

                        if (index + 1 < this.source.length) {
                            switch (this.source.charCodeAt(index)) {
                                case Chars.LowerX:
                                case Chars.UpperX:
                                    return this.scanHexadecimalDigit();
                                case Chars.LowerB:
                                case Chars.UpperB:
                                    return this.scanBinaryDigits(context);
                                case Chars.LowerO:
                                case Chars.UpperO:
                                    return this.scanOctalDigits(context);
                                default: // ignore
                            }
                        }

                        const ch = this.source.charCodeAt(index);
                        if (index < this.source.length && ch >= Chars.Zero && ch <= Chars.Seven) {
                            return this.scanNumberLiteral(context);
                        }
                    }

                    // '1' - '9'
                case Chars.One:
                case Chars.Two:
                case Chars.Three:
                case Chars.Four:
                case Chars.Five:
                case Chars.Six:
                case Chars.Seven:
                case Chars.Eight:
                case Chars.Nine:

                    return this.scanNumber(context);

                    // '\uVar', `\u{N}var`
                case Chars.Backslash:

                    // `A`...`Z`
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

                    // '$'
                case Chars.Dollar:

                    // '_'
                case Chars.Underscore:

                    //  `a`...`z`
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
                    this.error(Errors.Unexpected);
            }
        }

        return Token.EndOfSource;
    }

    private skipShebangComment() {

        loop: while (this.hasNext()) {

            switch (this.nextChar()) {
                case Chars.LineFeed:
                case Chars.CarriageReturn:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.advanceNewline();
                    if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.index++;
                    break loop;
                default:
                    this.advance();
            }
        }
    }

    private skipSingleLineComment(offset: number) {

        const start = this.index;

        loop:
            while (this.hasNext()) {
                switch (this.nextChar()) {
                    case Chars.LineFeed:
                    case Chars.CarriageReturn:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.advanceNewline();
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.index++;
                        break loop;
                    default:
                        this.advance();
                }
            }

        if (this.flags & Flags.OptionsOnComment) {
            this.collectComment('SingleLineComment', this.source.slice(start, this.index), this.startPos, this.index);
        }
    }

    private skipMultiLineComment() {

        const start = this.index;
        let closed = false;

        loop:
            while (this.hasNext()) {
                const ch = this.nextChar();
                switch (ch) {
                    case Chars.Asterisk:
                        this.advance();
                        if (this.consume(Chars.Slash)) {
                            closed = true;
                            break loop;
                        }
                        break;
                    case Chars.CarriageReturn:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                    case Chars.LineFeed:
                        this.advanceNewline();
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.index++;
                        break;
                    default:
                        this.advance();
                }
            }

        if (!closed) this.error(Errors.UnterminatedComment);

        if (this.flags & Flags.OptionsOnComment) {
            this.collectComment('MultiLineComment', this.source.slice(start, this.index - 2), this.startPos, this.index);
        }
    }

    private collectComment(type: ESTree.CommentType, value: string, start: number, end: number): void {
        let loc;

        if (this.flags & Flags.OptionsLoc) {
            loc = {
                start: {
                    line: this.startLine,
                    column: this.startColumn,
                },
                end: {
                    line: this.endLine,
                    column: this.column
                }
            };
        }

        if (typeof this.comments === 'function') {
            this.comments(type, value, start, end, loc);
        } else if (Array.isArray(this.comments)) {

            const node: ESTree.Comment = {
                type,
                value
            };

            if (this.flags & Flags.OptionsRanges) {
                node.start = start;
                node.end = end;
            }

            if (this.flags & Flags.OptionsLoc) {
                node.loc = loc;
            }
            this.comments.push(node);
        }
    }

    private scanIdentifier(context: Context): Token {

        let start = this.index;
        let ret = '';

        loop:
            while (this.hasNext()) {
                let code = this.nextChar();
                switch (code) {
                    case Chars.Backslash:
                        this.flags |= Flags.HasUnicode;
                        ret += this.source.slice(start, this.index);
                        ret += fromCodePoint(this.peekUnicodeEscape());
                        start = this.index;
                        break;
                    default:
                        if (code >= 0xd800 && code <= 0xdc00) code = this.nextUnicodeChar();
                        if (!isIdentifierPart(code)) break loop;
                        this.advance();
                }
            }

        if (start < this.index) ret += this.source.slice(start, this.index);

        const len = ret.length;

        // Invalid: 'function f() { new.t\\u0061rget; }'
        if (this.flags & Flags.HasUnicode && ret === 'target') this.error(Errors.InvalidEscapedReservedWord);

        this.tokenValue = ret;

        // Reserved words are between 2 and 11 characters long and start with a lowercase letter
        if (len >= 2 && len <= 11) {
            const ch = ret.charCodeAt(0);
            if (ch >= Chars.LowerA && ch <= Chars.LowerZ) {
                const token = descKeyword(ret);
                if (token > 0) {
                    return token;
                }
            }
        }
        return Token.Identifier;
    }

    /**
     * Peek unicode escape
     */
    private peekUnicodeEscape(): any {
        this.advance();
        const code = this.peekExtendedUnicodeEscape();
        if (code >= 0xd800 && code <= 0xdc00) this.error(Errors.UnexpectedSurrogate);
        if (!isvalidIdentifierContinue(code)) this.error(Errors.InvalidUnicodeEscapeSequence);
        this.advance();
        return code;
    }

    private scanNumberLiteral(context: Context): Token {

        if (context & Context.Strict) this.error(Errors.StrictOctalEscape);

        if (!(this.flags & Flags.Noctal)) this.flags |= Flags.Noctal;

        this.advance();

        let ch = this.nextChar();

        let code = 0;
        let isDecimal = false;

        while (this.hasNext()) {
            ch = this.nextChar();
            if (!isDecimal && ch >= Chars.Eight) isDecimal = true;
            if (!(Chars.Zero <= ch && ch <= Chars.Nine)) break;
            code = code * 8 + (ch - 48);
            this.advance();
        }

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        this.tokenValue = isDecimal ? parseInt(this.source.slice(this.startPos, this.index), 10) : code;
        return Token.NumericLiteral;
    }

    private scanOctalDigits(context: Context): Token {

        if (context & Context.Strict) this.error(Errors.StrictOctalEscape);

        this.advanceTwice();

        let ch = this.nextChar();
        let code = ch - Chars.Zero;

        // we must have at least one octal digit after 'o'/'O'
        if (ch < Chars.Zero || ch >= Chars.Eight) this.error(Errors.InvalidBinaryDigit);

        this.advance();

        while (this.hasNext()) {
            ch = this.nextChar();
            if (!(Chars.Zero <= ch && ch <= Chars.Seven)) break;
            if (ch < Chars.Zero || ch >= Chars.Eight) this.error(Errors.InvalidBinaryDigit);
            code = (code << 3) | (ch - Chars.Zero);
            this.advance();
        }

        this.tokenValue = code;

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        return Token.NumericLiteral;
    }

    private scanHexadecimalDigit() {

        this.advanceTwice();

        let ch = this.nextChar();
        let code = toHex(ch);

        if (code < 0) this.error(Errors.InvalidRadix);

        this.advance();

        while (this.hasNext()) {
            ch = this.nextChar();
            const digit = toHex(ch);
            if (digit < 0) break;
            code = code << 4 | digit;
            this.advance();
        }

        this.tokenValue = code;

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);
        return Token.NumericLiteral;
    }

    private scanBinaryDigits(context: Context): Token {

        this.advanceTwice();

        let ch = this.nextChar();
        let code = ch - Chars.Zero;

        // Invalid:  '0b'
        if (ch !== Chars.Zero && ch !== Chars.One) {
            this.error(Errors.InvalidBinaryDigit);
        }

        this.advance();

        while (this.hasNext()) {
            ch = this.nextChar();
            if (!(ch === Chars.Zero || ch === Chars.One)) break;
            code = (code << 1) | (ch - Chars.Zero);
            this.advance();
        }

        this.tokenValue = code;

        if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        return Token.NumericLiteral;
    }

    private skipDigits() {
        scan: while (this.hasNext()) {
            switch (this.nextChar()) {
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
                    this.advance();
                    break;
                default:
                    break scan;
            }
        }
    }

    private scanNumber(context: Context): Token {

        const start = this.index;

        this.skipDigits();

        if (this.nextChar() === Chars.Period) {

            if (!(this.flags & Flags.Float)) this.flags |= Flags.Float;

            this.advance();
            this.skipDigits();
        }

        let end = this.index;

        switch (this.nextChar()) {
            // scan exponent, if any
            case Chars.UpperE:
            case Chars.LowerE:

                this.advance();

                if (!(this.flags & Flags.Exponent)) this.flags |= Flags.Exponent;

                // scan exponent
                switch (this.nextChar()) {
                    case Chars.Plus:
                    case Chars.Hyphen:
                        this.advance();
                        if (!this.hasNext()) this.error(Errors.UnexpectedTokenNumber);
                    default: // ignore
                }

                switch (this.nextChar()) {
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
                        this.advance();
                        this.skipDigits();
                        break;
                    default:
                        // we must have at least one decimal digit after 'e'/'E'
                        this.error(Errors.UnexpectedMantissa);
                }

                end = this.index;

                break;

                // BigInt - Stage 3 proposal
            case Chars.LowerN:
                if (this.flags & Flags.OptionsNext) {
                    if (this.flags & Flags.Float) this.error(Errors.Unexpected);
                    this.advance();
                    if (!(this.flags & Flags.BigInt)) this.flags |= Flags.BigInt;
                    end = this.index;
                }

            default: // ignore
        }

        // The source character immediately following a numeric literal must
        // not be an identifier start or a decimal digit.
        if (isIdentifierStart(this.nextChar())) this.error(Errors.UnexpectedTokenNumber);

        const raw = this.source.substring(start, end);

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = raw;

        this.tokenValue = this.flags & Flags.FloatOrExponent ? parseFloat(raw) : parseInt(raw, 10);

        return Token.NumericLiteral;
    }

    private scanRegularExpression(): Token {
        let index = this.startPos + 1;
        const bodyStart = index;
        let preparseState = RegExpState.Empty;

        loop:
            while (true) {

                const ch = this.source.charCodeAt(index);

                index++;
                this.column++;

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
                            this.index = index;
                            return this.token;
                        default: // ignore
                    }
                }

                if (index >= this.source.length) this.error(Errors.UnterminatedRegExp);
            }

        const bodyEnd = index - 1; // drop the slash from the slice

        const flagsStart = index;

        let mask = RegExpFlag.None;

        loop:
            while (index < this.source.length) {
                let code = this.source.charCodeAt(index);
                switch (code) {
                    case Chars.LowerG:
                        if (mask & RegExpFlag.Global) this.error(Errors.DuplicateRegExpFlag, 'g');
                        mask |= RegExpFlag.Global;
                        break;

                    case Chars.LowerI:
                        if (mask & RegExpFlag.IgnoreCase) this.error(Errors.DuplicateRegExpFlag, 'i');
                        mask |= RegExpFlag.IgnoreCase;
                        break;

                    case Chars.LowerM:
                        if (mask & RegExpFlag.Multiline) this.error(Errors.DuplicateRegExpFlag, 'm');
                        mask |= RegExpFlag.Multiline;
                        break;

                    case Chars.LowerU:
                        if (mask & RegExpFlag.Unicode) this.error(Errors.DuplicateRegExpFlag, 'u');
                        mask |= RegExpFlag.Unicode;
                        break;

                    case Chars.LowerY:
                        if (mask & RegExpFlag.Sticky) this.error(Errors.DuplicateRegExpFlag, 'y');
                        mask |= RegExpFlag.Sticky;
                        break;

                        // Stage 3 proposal
                    case Chars.LowerS:
                        if (this.flags & Flags.OptionsNext) {
                            if (mask & RegExpFlag.DotAll) this.error(Errors.DuplicateRegExpFlag, 's');
                            mask |= RegExpFlag.DotAll;
                            break;
                        }

                    default:
                        if (code >= 0xd800 && code <= 0xdc00) code = this.nextUnicodeChar();
                        if (!isIdentifierPart(code)) break loop;
                        this.error(Errors.UnexpectedTokenRegExpFlag);
                }
                index++;
                this.column++;
            }

        this.endPos = this.index;
        this.index = index;

        const pattern = this.source.slice(bodyStart, bodyEnd);
        const flags = this.source.slice(flagsStart, this.index);

        this.tokenRegExp = {
            pattern,
            flags
        };

        this.tokenValue = tryCreate(pattern, flags);

        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(this.startPos, this.index);

        return Token.RegularExpression;
    }

    private scanString(context: Context, quote: number): Token {

        const rawStart = this.index;

        this.advance();

        if (!this.hasNext()) this.error(Errors.UnterminatedString);

        let ret = '';

        let start = this.index;
        let ch;

        while (this.hasNext()) {

            ch = this.nextChar();

            if (ch === quote) break;

            switch (ch) {
                case Chars.Backslash:
                    ret += this.source.slice(start, this.index);
                    ret += this.scanStringEscape(context);
                    this.advance();
                    start = this.index;
                    continue;
                case Chars.CarriageReturn:
                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.error(Errors.UnterminatedString);
                default: // ignore
            }

            this.advance();
        }

        if (start !== this.index) ret += this.source.slice(start, this.index);

        if (ch !== quote) this.error(Errors.UnterminatedString);

        this.advance(); // skip the quote

        this.tokenValue = ret;

        // raw
        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(rawStart, this.index);

        return Token.StringLiteral;
    }

    private peekExtendedUnicodeEscape(): any {

        this.advance(); // 'u'

        if (!this.hasNext()) this.error(Errors.Unexpected);

        let ch = this.nextChar();

        // '\u{DDDDDDDD}'
        if (ch === Chars.LeftBrace) { // {

            let code = 0;

            this.advance();

            if (!this.hasNext()) this.error(Errors.InvalidHexEscapeSequence);

            ch = this.nextChar();

            // At least, one hex digit is required.
            if (ch === Chars.RightBrace) this.error(Errors.InvalidHexEscapeSequence);

            while (ch !== Chars.RightBrace) {
                const digit = toHex(ch);
                if (digit < 0) this.error(Errors.InvalidHexEscapeSequence);
                code = (code << 4) | digit;

                if (code > Chars.LastUnicodeChar) this.error(Errors.UnicodeOutOfRange);

                this.advance();

                // At least one digit is expected
                if (!this.hasNext()) this.error(Errors.InvalidHexEscapeSequence);

                ch = this.nextChar();
            }

            if (ch !== Chars.RightBrace) this.error(Errors.InvalidHexEscapeSequence);

            return code;

            // '\uDDDD'
        } else if (this.index + 3 < this.source.length) {

            let code = toHex(ch);
            if (code < 0) this.error(Errors.InvalidHexEscapeSequence);

            for (let i = 0; i < 3; i++) {
                this.advance();
                if (!this.hasNext()) this.error(Errors.InvalidHexEscapeSequence);
                ch = this.nextChar();
                const digit = toHex(ch);
                if (code < 0) this.error(Errors.InvalidHexEscapeSequence);
                code = code << 4 | digit;
            }

            // Invalid:  "'foo\u000u bar'", "'foo\u000U bar'"
            switch (ch) {
                case Chars.LowerU:
                case Chars.UpperU:
                    this.error(Errors.InvalidHexEscapeSequence);
                default: // ignore
            }

            return code;
        }

        this.error(Errors.InvalidUnicodeEscapeSequence);
    }

    private scanStringEscape(context: Context): string {

        this.advance();

        if (!this.hasNext) this.error(Errors.InvalidUnicodeEscapeSequence);

        const cp = this.nextChar();

        switch (cp) {
            case Chars.LowerB:
                return '\b';
            case Chars.LowerT:
                return '\t';
            case Chars.LowerN:
                return '\n';
            case Chars.LowerV:
                return '\v';
            case Chars.LowerF:
                return '\f';
            case Chars.LowerR:
                return '\r';
            case Chars.Backslash:
                return '\\';
            case Chars.SingleQuote:
                return '\'';
            case Chars.DoubleQuote:
                return '\"';

                // Unicode character specification.
            case Chars.LowerU:
                return fromCodePoint(this.peekExtendedUnicodeEscape());
                // Hexadecimal character specification.
            case Chars.LowerX:
                {
                    this.advance();
                    const ch = this.nextChar();
                    if (!this.hasNext()) this.error(Errors.UnterminatedString);
                    const ch1 = this.nextChar();
                    const hi = toHex(ch1);
                    if (hi < 0) this.error(Errors.InvalidHexEscapeSequence);
                    this.advance();
                    if (!this.hasNext()) this.error(Errors.UnterminatedString);
                    const ch2 = this.nextChar();
                    const lo = toHex(ch2);
                    if (lo < 0) this.error(Errors.InvalidHexEscapeSequence);
                    return fromCodePoint(hi << 4 | lo);
                }

                // Octal character specification.
            case Chars.Zero:
                // falls through
            case Chars.One:
                // falls through
            case Chars.Two:
                // falls through
            case Chars.Three:
                {
                    let code = cp - Chars.Zero;
                    let index = this.index + 1;
                    let column = this.column + 1;

                    if (index < this.source.length) {

                        let next = this.source.charCodeAt(index);

                        if (next < Chars.Zero || next > Chars.Seven) {
                            if (code !== 0 && context & Context.Strict) this.error(Errors.StrictOctalLiteral);
                        } else if (context & Context.Strict) {
                            this.error(Errors.StrictOctalLiteral);
                        } else {
                            code = (code << 3) | (next - Chars.Zero);
                            index++;
                            column++;

                            if (index < this.source.length) {
                                next = this.source.charCodeAt(index);

                                if (next >= Chars.Zero && next <= Chars.Seven) {
                                    code = (code << 3) | (next - Chars.Zero);
                                    index++;
                                    column++;
                                }
                            }

                            this.index = index - 1;
                            this.column = column - 1;
                        }
                    }

                    return String.fromCharCode(code);
                }

            case Chars.Four:
                // falls through
            case Chars.Five:
                // falls through
            case Chars.Six:
                // falls through
            case Chars.Seven:
                {
                    if (context & Context.Strict) this.error(Errors.StrictOctalEscape);

                    let code = cp - Chars.Zero;
                    const index = this.index + 1;
                    const column = this.column + 1;

                    if (index < this.source.length) {
                        const next = this.source.charCodeAt(index);

                        if (next >= Chars.Zero && next <= Chars.Seven) {
                            code = (code << 3) | (next - Chars.Zero);
                            this.index = index;
                            this.column = column;
                        }
                    }

                    return String.fromCharCode(code);
                }

            case Chars.Eight:
                // falls through
            case Chars.Nine:
                this.error(Errors.InvalidEightAndNine);
            case Chars.CarriageReturn:
                // Allow escaped CR+LF newlines in multiline string literals.
                if (this.hasNext() && this.nextChar() === Chars.LineFeed) this.advance();
            case Chars.LineFeed:
            case Chars.LineSeparator:
            case Chars.ParagraphSeparator:
                this.column = -1;
                this.line++;
                return '';
            default:
                // Other escaped characters are interpreted as their non-escaped version.
                return this.source.charAt(cp);
        }
    }

    private scanJSXIdentifier(context: Context) {
        switch (this.token) {
            case Token.Identifier:
                const firstCharPosition = this.index;
                scan:
                    while (this.hasNext()) {
                        const ch = this.nextChar();
                        switch (ch) {
                            case Chars.Hyphen:
                                this.advance();
                                break;
                            default:
                                if ((firstCharPosition === this.index) ? isIdentifierStart(ch) : isIdentifierPart(ch)) {
                                    this.advance();
                                } else {
                                    break scan;
                                }
                        }
                    }

                this.tokenValue += this.source.slice(firstCharPosition, this.index - firstCharPosition);
            default:
                return this.token;
        }
    }

    private scanTemplateNext(context: Context): Token {
        if (!this.hasNext()) this.error(Errors.Unexpected);
        this.index--;
        this.column--;
        return this.scanTemplate(context);
    }

    private scanTemplate(context: Context): Token {
        const start = this.index;
        let tail = true;
        let ret: string | void = '';

        this.advance();

        if (!this.hasNext()) this.error(Errors.UnterminatedTemplate);

        let ch = this.nextChar();

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
                        this.advance();
                        if (!this.hasNext()) this.error(Errors.UnterminatedTemplate);

                        if (ch >= 128) {
                            ret += fromCodePoint(ch);
                        } else {
                            ret += this.scanStringEscape(context);
                        }

                        break;

                    case Chars.CarriageReturn:
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) {
                            if (ret != null) ret += fromCodePoint(ch);
                            ch = this.nextChar();
                            this.index++;
                        }
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.column = -1;
                        this.line++;
                    default:
                        if (ret != null) ret += fromCodePoint(ch);
                }

                this.advance();

                if (!this.hasNext()) this.error(Errors.UnterminatedTemplate);

                ch = this.nextChar();
            }

        this.advance();

        this.tokenValue = ret;

        if (tail) {
            this.tokenRaw = this.source.slice(start + 1, this.index - 1);
            return Token.TemplateTail;
        } else {
            this.tokenRaw = this.source.slice(start + 1, this.index - 2);
            return Token.TemplateCont;
        }
    }

    private ParseModuleItemList(context: Context): ESTree.Statement[] {
        // ecma262/#prod-Module
        // Module :
        //    ModuleBody?
        //
        // ecma262/#prod-ModuleItemList
        // ModuleBody :
        //   ModuleItem*
        const pos = this.getLocations();
        this.nextToken(context);

        const statements: ESTree.Statement[] = [];

        while (this.token !== Token.EndOfSource) {
            statements.push(this.parseModuleItem(context));
        }

        return statements;
    }

    private parseStatementList(context: Context): ESTree.Statement[] {

        this.nextToken(context);

        const statements: ESTree.Statement[] = [];

        while (this.token !== Token.EndOfSource) {
            if (!(this.token & Token.StringLiteral)) break;
            const item: ESTree.Statement = this.parseStatementListItem(context);
            statements.push(item);
            if (!isDirective(item)) break;
            if (item.expression.value === 'use strict') {
                context |= Context.Strict;
                break;
            }
        }

        while (this.token !== Token.EndOfSource) {
            statements.push(this.parseStatementListItem(context));
        }

        return statements;
    }

    private getLocations(): Location {
        return {
            start: this.startPos,
            line: this.startLine,
            column: this.startColumn
        };
    }

    private finishNode(loc: Location, node: any) {

        if (this.flags & Flags.OptionsRanges) {
            node.start = loc.start;
            node.end = this.endPos;
        }

        if (this.flags & Flags.OptionsLoc) {

            node.loc = {
                start: {
                    line: loc.line,
                    column: loc.column,
                },
                end: {
                    line: this.endLine,
                    column: this.endColumn
                }
            };
        }

        return node;
    }

    private finishNodeAt(start: number, end: number, node: any) {

        if (this.flags & Flags.OptionsRanges) {
            node.start = start;
            node.end = end;
        }

        if (this.flags & Flags.OptionsLoc) {

            node.loc = {
                start: {
                    line: this.startLine,
                    column: this.startColumn,
                },
                end: {
                    line: this.endLine,
                    column: this.endColumn
                }
            };
        }

        return node;
    }

    private parseOptional(context: Context, t: Token): boolean {
        if (this.token !== t) return false;
        this.nextToken(context);
        return true;
    }

    private expect(context: Context, t: Token) {
        if (this.token !== t) this.error(Errors.Unexpected);
        this.nextToken(context);
    }

    private isEvalOrArguments(value: string): boolean {
        return value === 'eval' || value === 'arguments';
    }

    private isAsync(t: Token): boolean {

        switch (t) {
            case Token.Colon:
            case Token.Assign:
            case Token.LeftParen:
            case Token.Comma:
                return false;
            default:
                return true;
        }
    }
    private qualifiedPropertyName() {
        switch (this.token) {
            case Token.StringLiteral:
            case Token.NumericLiteral:
            case Token.Multiply:
            case Token.LeftBracket:
            case Token.Identifier:
                return true;
            default:
                return hasMask(this.token, Token.Keyword);
        }
    }

    private canConsumeSemicolon(): boolean {

        // Bail out quickly if we have seen a LineTerminator
        if (this.flags & Flags.LineTerminator) return true;

        switch (this.token) {
            case Token.Semicolon:
            case Token.RightBrace:
            case Token.EndOfSource:
                return true;
            default:
                return false;
        }
    }

    /**
     * Consume a semicolon between tokens, optionally inserting it if necessary.
     */
    private consumeSemicolon(context: Context) {
        if (!this.canConsumeSemicolon()) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        if (this.token === Token.Semicolon) this.expect(context, Token.Semicolon);
    }

    private nextTokenIsFuncKeywordOnSameLine(context: Context): boolean {
        const savedState = this.saveState();
        this.nextToken(context);
        const next = this.token;
        const line = this.line;
        this.rewindState(savedState);
        return this.line === line && next === Token.FunctionKeyword;
    }

    private isIdentifier(context: Context, t: Token): boolean {

        if (context & Context.Module) {
            switch (t) {
                case Token.YieldKeyword:
                case Token.AwaitKeyword:
                case Token.AsyncKeyword:
                    this.error(Errors.UnexpectedReservedWord);
                default:

                    if ((t & Token.FutureReserved) === Token.FutureReserved) this.error(Errors.UnexpectedStrictReserved);
            }

            return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual;
        }

        if (context & Context.Strict) {

            switch (t) {
                case Token.YieldKeyword:
                    if (context & Context.Yield) this.error(Errors.DisallowedInContext, tokenDesc(t));
                    break;
                default:
                    if ((t & Token.Reserved) === Token.Reserved) this.error(Errors.UnexpectedStrictReserved);
            }
            return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual;
        }

        return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual || (t & Token.FutureReserved) === Token.FutureReserved;
    }

    private nextTokenIsLeftParen(context: Context): boolean {
        const savedState = this.saveState();
        this.nextToken(context);
        const next = this.token;
        this.rewindState(savedState);
        return next === Token.LeftParen;
    }

    private isLexical(context: Context): boolean {
        // In ES6 'let' always starts a lexical declaration if followed by an identifier or {
        // or [.
        const savedState = this.saveState();
        this.nextToken(context);
        const next = this.token;
        this.rewindState(savedState);
        return hasMask(next, Token.BindingPattern);
    }

    private parseExportDefault(context: Context, pos: Location): ESTree.ExportDefaultDeclaration {
        //  Supports the following productions, starting after the 'default' token:
        //    'export' 'default' HoistableDeclaration
        //    'export' 'default' ClassDeclaration
        //    'export' 'default' AssignmentExpression[In] ';'
        this.expect(context, Token.DefaultKeyword);

        let declaration: ESTree.FunctionDeclaration | ESTree.ClassDeclaration | ESTree.Expression;

        switch (this.token) {

            // export default HoistableDeclaration[Default]
            case Token.FunctionKeyword:
                declaration = this.parseFunctionDeclaration(context |= (Context.OptionalIdentifier | Context.Export));
                break;

                // export default ClassDeclaration[Default]
            case Token.ClassKeyword:
                declaration = this.parseClassDeclaration(context | (Context.OptionalIdentifier | Context.Export));
                break;

                // export default HoistableDeclaration[Default]
            case Token.AsyncKeyword:
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                    declaration = this.parseFunctionDeclaration(context | (Context.OptionalIdentifier | Context.Export));
                    break;
                }
                // falls through
            default:
                // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                declaration = this.parseAssignmentExpression(context);
                this.consumeSemicolon(context);
        }

        return this.finishNode(pos, {
            type: 'ExportDefaultDeclaration',
            declaration
        });
    }

    private parseExportDeclaration(context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration {
        // ExportDeclaration:
        //    'export' '*' 'from' ModuleSpecifier ';'
        //    'export' ExportClause ('from' ModuleSpecifier)? ';'
        //    'export' VariableStatement
        //    'export' Declaration
        //    'export' 'default' ... (handled in ParseExportDefault)
        if (this.flags & Flags.InFunctionBody) this.error(Errors.ExportDeclAtTopLevel);

        const pos = this.getLocations();
        const specifiers: ESTree.ExportSpecifier[] = [];

        let source = null;
        let isExportFromIdentifier = false;
        let declaration: ESTree.Statement | null = null;

        this.expect(context, Token.ExportKeyword);

        switch (this.token) {

            case Token.DefaultKeyword:
                return this.parseExportDefault(context, pos);

                // export * FromClause ;
            case Token.Multiply:
                return this.parseExportAllDeclaration(context, pos);

            case Token.LeftBrace:
                // There are two cases here:
                //
                // 'export' ExportClause ';'
                // and
                // 'export' ExportClause FromClause ';'
                //
                this.expect(context, Token.LeftBrace);

                while (!this.parseOptional(context, Token.RightBrace)) {
                    if (this.token === Token.DefaultKeyword) isExportFromIdentifier = true;
                    specifiers.push(this.parseExportSpecifier(context));
                    // Invalid: 'export {a,,b}'
                    if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
                }

                if (this.parseOptional(context, Token.FromKeyword)) {
                    // export {default} from 'foo';
                    // export {foo} from 'foo';
                    source = this.parseModuleSpecifier(context);
                } else if (isExportFromIdentifier) this.error(Errors.Unexpected);

                this.consumeSemicolon(context);

                break;

                // export ClassDeclaration
            case Token.ClassKeyword:
                declaration = this.parseClassDeclaration(context | Context.Export);
                break;

                // export LexicalDeclaration
            case Token.ConstKeyword:
                declaration = this.parseVariableStatement(context |= (Context.Const | Context.RequireInitializer));
                break;

                // export LexicalDeclaration
            case Token.LetKeyword:
                declaration = this.parseVariableStatement(context |= (Context.Let | Context.RequireInitializer));
                break;

                // export VariableDeclaration
            case Token.VarKeyword:
                declaration = this.parseVariableStatement(context | Context.RequireInitializer | Context.Export);
                break;

                // export HoistableDeclaration
            case Token.FunctionKeyword:
                declaration = this.parseFunctionDeclaration(context | Context.Export);
                break;

                // export HoistableDeclaration
            case Token.AsyncKeyword:
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                    declaration = this.parseFunctionDeclaration(context | Context.Export);
                    break;
                }
                // Falls through
            default:
                this.error(Errors.MissingMsgDeclarationAfterExport);
        }

        return this.finishNode(pos, {
            type: 'ExportNamedDeclaration',
            source,
            specifiers,
            declaration
        });
    }

    private parseExportSpecifier(context: Context): ESTree.ExportSpecifier {
        const pos = this.getLocations();

        // Valid: `export {default} from "foo";`
        // Invalid: '`export {with as a}`'
        if (this.token !== Token.DefaultKeyword && this.token !== Token.Identifier) this.error(Errors.Unexpected);

        const local = this.parseIdentifier(context);
        let exported = local;

        if (this.parseOptional(context, Token.AsKeyword)) {
            // Invalid: 'export { x as arguments };'
            // Invalid: 'export { x as eval };'
            if (this.isEvalOrArguments(this.tokenValue)) this.error(Errors.UnexpectedReservedWord);
            exported = this.parseIdentifier(context);
        }

        return this.finishNode(pos, {
            type: 'ExportSpecifier',
            local,
            exported
        });
    }

    private parseExportAllDeclaration(context: Context, pos: Location): ESTree.ExportAllDeclaration {
        this.expect(context, Token.Multiply);
        this.expect(context, Token.FromKeyword);

        // Invalid `export * from 123;`
        if (this.token !== Token.StringLiteral) this.error(Errors.UnexpectedToken, tokenDesc(this.token));

        const source = this.parseModuleSpecifier(context);
        this.consumeSemicolon(context);
        return this.finishNode(pos, {
            type: 'ExportAllDeclaration',
            source
        });
    }

    private parseModuleSpecifier(context: Context): ESTree.Literal {
        // ModuleSpecifier :
        //    StringLiteral
        if (this.token !== Token.StringLiteral) this.error(Errors.InvalidModuleSpecifier);
        return this.parseLiteral(context);
    }

    // import {<foo as bar>} ...;
    private parseImportSpecifier(context: Context): ESTree.ImportSpecifier {

        const pos = this.getLocations();

        let imported;
        let local;

        if (this.isIdentifier(context, this.token)) {
            imported = this.parseBindingIdentifier(context);
            local = imported;
            // In the presence of 'as', the left-side of the 'as' can
            // be any IdentifierName. But without 'as', it must be a valid
            // BindingIdentifier.
            if (this.token === Token.AsKeyword) {
                // 'import {a \\u0061s b} from "./foo.js";'
                if (this.flags & Flags.HasUnicode) this.error(Errors.InvalidEscapedReservedWord);
                if (this.token === Token.AsKeyword) {
                    this.expect(context, Token.AsKeyword);
                    local = this.parseBindingPatternOrIdentifier(context);
                } else {
                    this.error(Errors.MissingAsImportSpecifier);
                }
            }
        } else {
            imported = this.parseIdentifier(context);
            local = imported;
            this.expect(context, Token.AsKeyword);
            local = this.parseBindingPatternOrIdentifier(context);
        }

        return this.finishNode(pos, {
            type: 'ImportSpecifier',
            local,
            imported
        });
    }

    // {foo, bar as bas}
    private parseNamedImports(context: Context, specifiers: (ESTree.ImportSpecifier | ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier)[]) {
        //  NamedImports
        //  ImportedDefaultBinding, NameSpaceImport
        //  ImportedDefaultBinding, NamedImports
        this.expect(context, Token.LeftBrace);

        while (!this.parseOptional(context, Token.RightBrace)) {
            // only accepts identifiers or keywords
            specifiers.push(this.parseImportSpecifier(context));
            this.parseOptional(context, Token.Comma);
        }
    }

    // import <* as foo> ...;
    private parseImportNamespaceSpecifier(context: Context): ESTree.ImportNamespaceSpecifier {

        const pos = this.getLocations();

        this.expect(context, Token.Multiply);

        if (this.token !== Token.AsKeyword) this.error(Errors.NoAsAfterImportNamespace);

        this.nextToken(context);

        if (this.token !== Token.Identifier) {
            this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }

        const local = this.parseIdentifier(context);

        return this.finishNode(pos, {
            type: 'ImportNamespaceSpecifier',
            local
        });
    }

    // import <foo> ...;
    private parseImportDefaultSpecifier(context: Context): ESTree.ImportDefaultSpecifier {
        return this.finishNode(this.getLocations(), {
            type: 'ImportDefaultSpecifier',
            local: this.parseIdentifier(context)
        });
    }

    private parseImportDeclaration(context: Context): ESTree.ImportDeclaration {
        // ImportDeclaration :
        //   'import' ImportClause 'from' ModuleSpecifier ';'
        //   'import' ModuleSpecifier ';'
        //
        // ImportClause :
        //   ImportedDefaultBinding
        //   NameSpaceImport
        //   NamedImports
        //   ImportedDefaultBinding ',' NameSpaceImport
        //   ImportedDefaultBinding ',' NamedImports
        //
        // NameSpaceImport :
        //   '*' 'as' ImportedBinding
        if (this.flags & Flags.InFunctionBody) this.error(Errors.ImportDeclAtTopLevel);

        const pos = this.getLocations();
        const specifiers: (ESTree.ImportSpecifier |
            ESTree.ImportDefaultSpecifier |
            ESTree.ImportNamespaceSpecifier)[] = [];

        this.expect(context, Token.ImportKeyword);

        switch (this.token) {

            // import 'foo';
            case Token.StringLiteral:
                {
                    const source = this.parseModuleSpecifier(context);
                    this.consumeSemicolon(context);
                    return this.finishNode(pos, {
                        type: 'ImportDeclaration',
                        specifiers,
                        source
                    });
                }

            case Token.Identifier:
                {
                    const tokenValue = this.tokenValue;
                    specifiers.push(this.parseImportDefaultSpecifier(context));
                    if (this.parseOptional(context, Token.Comma)) {
                        switch (this.token) {
                            case Token.Multiply:
                                // import foo, * as foo
                                specifiers.push(this.parseImportNamespaceSpecifier(context));
                                break;
                            case Token.LeftBrace:
                                // import foo, {bar}
                                this.parseNamedImports(context, specifiers);
                                break;
                            default:
                                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                        }
                    }

                    break;
                }

                // import {bar}
            case Token.LeftBrace:
                this.parseNamedImports(context, specifiers);
                break;

                // import * as foo
            case Token.Multiply:
                specifiers.push(this.parseImportNamespaceSpecifier(context));
                break;

            default:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }

        this.expect(context, Token.FromKeyword);
        const src = this.parseModuleSpecifier(context);

        this.consumeSemicolon(context);

        return this.finishNode(pos, {
            type: 'ImportDeclaration',
            specifiers,
            source: src
        });
    }

    private parseModuleItem(context: Context): any {
        // ecma262/#prod-ModuleItem
        // ModuleItem :
        //    ImportDeclaration
        //    ExportDeclaration
        //    StatementListItem
        switch (this.token) {

            // 'export'
            case Token.ExportKeyword:
                return this.parseExportDeclaration(context);

                // 'import'
            case Token.ImportKeyword:
                if (!(this.flags & Flags.OptionsNext && this.nextTokenIsLeftParen(context))) {
                    return this.parseImportDeclaration(context);
                }

            default:
                return this.parseStatementListItem(context);
        }
    }

    private parseStatementListItem(context: Context): ESTree.Statement {

        switch (this.token) {

            case Token.ClassKeyword:
                return this.parseClassDeclaration(context & ~Context.Constructor);

                // VariableStatement[?Yield]
            case Token.ConstKeyword:
                return this.parseVariableStatement(context | (Context.Const));

            case Token.FunctionKeyword:
                return this.parseFunctionDeclaration(context & ~Context.Method);
            case Token.ExportKeyword:
                if (!(context & Context.Module)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));

            case Token.ImportKeyword:
                // We must be careful not to parse a dynamic import
                // expression as an import declaration.
                if (this.flags & Flags.OptionsNext && this.nextTokenIsLeftParen(context)) return this.parseStatement(context);
                if (!(context & Context.Module)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));

                // VariableStatement[?Yield]
            case Token.LetKeyword:
                // If let follows identifier on the same line, it is an declaration. Parse it as a variable statement
                if (this.isLexical(context)) return this.parseVariableStatement(context | Context.Let);

            default:
                return this.parseStatement(context | Context.AllowIn);
        }
    }

    private parseStatement(context: Context): ESTree.Statement {

        switch (this.token) {

            // EmptyStatement
            case Token.Semicolon:
                return this.parseEmptyStatement(context);

                // VariableStatement[?Yield]
            case Token.VarKeyword:
                return this.parseVariableStatement(context);

                // BlockStatement[?Yield, ?Return]
            case Token.LeftBrace:
                return this.parseBlockStatement(context);

                // [+Return] ReturnStatement[?Yield]
            case Token.ReturnKeyword:
                return this.parseReturnStatement(context);

                // IfStatement[?Yield, ?Return]
            case Token.IfKeyword:
                return this.parseIfStatement(context);

                // BreakStatement[?Yield]
            case Token.BreakKeyword:
                return this.parseBreakStatement(context);

            case Token.ForKeyword:
                return this.parseForStatement(context);

                // DebuggerStatement
            case Token.DebuggerKeyword:
                return this.parseDebuggerStatement(context);

                // ContinueStatement[?Yield]
            case Token.ContinueKeyword:
                return this.parseContinueStatement(context);

                // BreakableStatement[?Yield, ?Return]
                //
                // BreakableStatement[Yield, Return]:
                //   IterationStatement[?Yield, ?Return]
                //   SwitchStatement[?Yield, ?Return]
            case Token.DoKeyword:
                return this.parseDoWhileStatement(context);

            case Token.WhileKeyword:
                return this.parseWhileStatement(context);

                // WithStatement[?Yield, ?Return]
            case Token.WithKeyword:
                return this.parseWithStatement(context);

            case Token.SwitchKeyword:
                return this.parseSwitchStatement(context | Context.Statement);

                // ThrowStatement[?Yield]
            case Token.ThrowKeyword:
                return this.parseThrowStatement(context);

                // TryStatement[?Yield, ?Return]
            case Token.TryKeyword:
                return this.parseTryStatement(context);

                // Both 'class' and 'function' are forbidden by lookahead restriction.
            case Token.ClassKeyword:
            case Token.FunctionKeyword:
                this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));

            case Token.AsyncKeyword:
                // Peek only on the same line: ExpressionStatement's lookahead
                // restriction is phrased as
                //
                //   [lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }]
                if (this.flags & Flags.HasUnicode) this.error(Errors.InvalidEscapedReservedWord);
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                    // Annex B.3.4 - FunctionDeclaration doesn't include generators or async
                    // functions.
                    if (context & Context.Statement) this.error(Errors.Unexpected);
                    // Invalid: `do async function f() {} while (false)`
                    // Invalid: `do async function* g() {} while (false)`
                    // Invalid: `while (false) async function f() {}`
                    // Invalid: `switch (0) { case 1: async function f() {} default: var f; }`
                    if (this.flags & Flags.Break) this.error(Errors.Unexpected);
                    return this.parseFunctionDeclaration(context);
                }
            default:
                // LabelledStatement[?Yield, ?Return]
                return this.parseLabelledStatement(context);
        }
    }

    private parseForStatement(context: Context): ESTree.ForInStatement | ESTree.ForOfStatement | ESTree.ForStatement {

        const pos = this.getLocations();

        this.expect(context, Token.ForKeyword);

        let state = IterationState.None;
        let init = null;
        let declarations = null;
        let kind = '';
        let body;
        let test = null;
        const token = this.token;

        // Asynchronous Iteration - Stage 3 proposal
        if (context & Context.Await && this.parseOptional(context, Token.AwaitKeyword)) {
            // Throw " Unexpected token 'await'" if the option 'next' flag isn't set
            if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(token));
            state |= IterationState.Await;
        }

        const savedFlag = this.flags;

        this.expect(context, Token.LeftParen);

        if (this.token !== Token.Semicolon) {

            switch (this.token) {
                case Token.VarKeyword:
                    state |= IterationState.Var;
                    break;
                case Token.LetKeyword:
                    state |= IterationState.Let;
                    break;
                case Token.ConstKeyword:
                    state |= IterationState.Const;
                    break;
                default: // ignore
            }

            if (state & IterationState.Variable) {

                const startPos = this.getLocations();
                kind = tokenDesc(this.token);

                // 'var'
                if (state & IterationState.Var) this.expect(context, Token.VarKeyword);

                // 'let'
                if (state & IterationState.Let) {
                    this.expect(context, Token.LetKeyword);
                    context |= Context.Let;
                }

                // 'const'
                if (state & IterationState.Const) {
                    this.expect(context, Token.ConstKeyword);
                    context |= Context.Const;
                }

                declarations = this.parseVariableDeclarationList(context | Context.ForStatement);

                init = this.finishNode(startPos, {
                    type: 'VariableDeclaration',
                    declarations,
                    kind
                });
            } else {
                init = this.parseExpression(context & ~Context.AllowIn | Context.ForStatement);
            }
        }

        this.flags = savedFlag;

        switch (this.token) {

            // 'of'
            case Token.OfKeyword:
                this.parseOptional(context, Token.OfKeyword);
                if (state & IterationState.Variable) {
                    // Only a single variable declaration is allowed in a for of statement
                    if (declarations && declarations[0].init != null) this.error(Errors.InvalidVarInitForOf);
                } else {
                    this.reinterpretExpressionAsPattern(context | Context.ForStatement, init);
                    if (!isValidDestructuringAssignmentTarget(init)) this.error(Errors.InvalidLHSInForLoop);
                }

                const right = this.parseAssignmentExpression(context | Context.AllowIn);

                this.expect(context, Token.RightParen);

                this.flags |= (Flags.Continue | Flags.Break);

                body = this.parseStatement(context | Context.ForStatement);

                this.flags = savedFlag;

                return this.finishNode(pos, {
                    type: 'ForOfStatement',
                    body,
                    left: init,
                    right,
                    await: !!(state & IterationState.Await)
                });

                // 'in'
            case Token.InKeyword:

                if (state & IterationState.Await) this.error(Errors.ForAwaitNotOf);

                this.expect(context, Token.InKeyword);

                if (!(state & IterationState.Variable)) {
                    this.reinterpretExpressionAsPattern(context | Context.ForStatement, init);
                } else if (declarations && declarations.length !== 1) {
                    this.error(Errors.Unexpected);
                }

                test = this.parseExpression(context | Context.AllowIn);

                this.expect(context, Token.RightParen);

                this.flags |= (Flags.Continue | Flags.Break);

                body = this.parseStatement(context | Context.ForStatement);

                this.flags = savedFlag;

                return this.finishNode(pos, {
                    type: 'ForInStatement',
                    body,
                    left: init,
                    right: test
                });

            default:

                if (state & IterationState.Await) this.error(Errors.ForAwaitNotOf);

                let update = null;

                // Invalid: `for (var a = ++effects in {});`
                // Invalid: `for (var a = (++effects, -1) in stored = a, {a: 0, b: 1, c: 2}) {  ++iterations;  }`
                if (this.token === Token.RightParen) this.error(Errors.InvalidVarDeclInForIn);

                this.expect(context, Token.Semicolon);

                if (this.token !== Token.Semicolon && this.token !== Token.RightParen) {
                    test = this.parseExpression(context | Context.AllowIn);
                }

                this.expect(context, Token.Semicolon);

                if (this.token !== Token.RightParen) update = this.parseExpression(context | Context.AllowIn);

                this.expect(context, Token.RightParen);

                this.flags |= (Flags.Continue | Flags.Break);

                body = this.parseStatement(context | Context.ForStatement);

                this.flags = savedFlag;

                return this.finishNode(pos, {
                    type: 'ForStatement',
                    body,
                    init,
                    test,
                    update
                });
        }
    }

    private parseSwitchStatement(context: Context): ESTree.SwitchStatement {

        const pos = this.getLocations();

        this.expect(context, Token.SwitchKeyword);
        this.expect(context, Token.LeftParen);

        const discriminant = this.parseExpression(context);

        this.expect(context, Token.RightParen);
        this.expect(context, Token.LeftBrace);

        const cases: ESTree.SwitchCase[] = [];

        let seenDefault = false;

        const SavedFlag = this.flags;

        if (!(this.flags & Flags.Break)) this.flags |= (Flags.Break | Flags.Switch);

        while (this.token !== Token.RightBrace) {

            const clause = this.parseSwitchCase(context);

            if (clause.test === null) {
                // Error on duplicate 'default' clauses
                if (seenDefault) this.error(Errors.MultipleDefaultsInSwitch);

                seenDefault = true;
            }
            cases.push(clause);
        }

        this.flags = SavedFlag;

        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'SwitchStatement',
            discriminant,
            cases
        });
    }

    private parseSwitchCase(context: Context): ESTree.SwitchCase {

        const pos = this.getLocations();

        let test: ESTree.Expression | null = null;

        switch (this.token) {

            // 'case'
            case Token.CaseKeyword:
                this.nextToken(context);
                test = this.parseExpression(context);
                break;

                // 'default'
            case Token.DefaultKeyword:
                this.nextToken(context);
                break;

            default: // ignore
        }

        this.expect(context, Token.Colon);

        const consequent: ESTree.Statement[] = [];

        loop:
            while (true) {
                switch (this.token) {

                    // '}'
                    case Token.RightBrace:

                        // 'default'
                    case Token.DefaultKeyword:

                        // 'case'
                    case Token.CaseKeyword:
                        break loop;
                    default:
                        consequent.push(this.parseStatementListItem(context));
                }
            }

        return this.finishNode(pos, {
            type: 'SwitchCase',
            test,
            consequent,
        });
    }

    private parseThrowStatement(context: Context): ESTree.ThrowStatement {

        const pos = this.getLocations();

        this.expect(context, Token.ThrowKeyword);

        if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterThrow);

        const argument: ESTree.Expression = this.parseExpression(context);

        this.consumeSemicolon(context);

        return this.finishNode(pos, {
            type: 'ThrowStatement',
            argument
        });
    }

    private parseWithStatement(context: Context): ESTree.WithStatement {
        const pos = this.getLocations();

        // Invalid `"use strict"; with ({}) { }`
        if (context & Context.Strict) this.error(Errors.StrictModeWith);

        this.expect(context, Token.WithKeyword);
        this.expect(context, Token.LeftParen);
        const object = this.parseExpression(context);
        this.expect(context, Token.RightParen);
        const body = this.parseStatement(context);
        return this.finishNode(pos, {
            type: 'WithStatement',
            object,
            body
        });
    }

    private parseWhileStatement(context: Context): ESTree.WhileStatement {
        const pos = this.getLocations();

        this.expect(context, Token.WhileKeyword);
        this.expect(context, Token.LeftParen);

        const test = this.parseExpression(context);

        this.expect(context, Token.RightParen);

        const savedFlag = this.flags;

        if (!(this.flags & Flags.Break)) this.flags |= (Flags.Continue | Flags.Break);

        const body = this.parseStatement(context);
        this.flags = savedFlag;

        return this.finishNode(pos, {
            type: 'WhileStatement',
            test,
            body
        });
    }

    private parseDoWhileStatement(context: Context): ESTree.DoWhileStatement {

        const pos = this.getLocations();

        this.expect(context, Token.DoKeyword);

        const savedFlag = this.flags;

        if (!(this.flags & Flags.Break)) this.flags |= (Flags.Continue | Flags.Break);

        const body = this.parseStatement(context);

        this.flags = savedFlag;

        this.expect(context, Token.WhileKeyword);
        this.expect(context, Token.LeftParen);

        const test = this.parseExpression(context);

        this.expect(context, Token.RightParen);
        this.parseOptional(context, Token.Semicolon);

        return this.finishNode(pos, {
            type: 'DoWhileStatement',
            body,
            test
        });
    }

    private parseContinueStatement(context: Context): ESTree.ContinueStatement {
        const pos = this.getLocations();
        this.expect(context, Token.ContinueKeyword);

        let label: ESTree.Identifier | null = null;

        if (!(this.flags & Flags.LineTerminator) && this.token === Token.Identifier) {
            label = this.parseIdentifier(context);
            if (!hasOwn.call(this.labelSet, '@' + label.name)) this.error(Errors.UnknownLabel, label.name);
        }

        if (!(this.flags & Flags.Continue) && !label) this.error(Errors.BadContinue);

        this.consumeSemicolon(context);

        return this.finishNode(pos, {
            type: 'ContinueStatement',
            label
        });
    }

    private parseBreakStatement(context: Context): ESTree.BreakStatement {

        const pos = this.getLocations();

        this.expect(context, Token.BreakKeyword);

        if (this.parseOptional(context, Token.Semicolon)) {

            if (!(this.flags & (Flags.Continue | Flags.Switch))) this.error(Errors.Unexpected);

            return this.finishNode(pos, {
                type: 'BreakStatement',
                label: null
            });
        }

        let label: ESTree.Identifier | null = null;

        if (!(this.flags & Flags.LineTerminator) && this.token === Token.Identifier) {
            label = this.parseIdentifier(context);
            if (!hasOwn.call(this.labelSet, '@' + label.name)) this.error(Errors.UnknownLabel, label.name);
        }

        if (!(this.flags & (Flags.Break | Flags.Switch)) && !label) this.error(Errors.IllegalBreak);

        this.consumeSemicolon(context);

        return this.finishNode(pos, {
            type: 'BreakStatement',
            label
        });
    }

    private parseLabelledStatement(context: Context): ESTree.LabeledStatement | ESTree.ExpressionStatement {

        const pos = this.getLocations();
        const token = this.token;
        const expr = this.parseExpression(context | Context.AllowIn);

        if (this.token === Token.Colon && expr.type === 'Identifier') {

            this.expect(context, Token.Colon);
            // Invalid: `for (const x of []) label1: label2: function f() {}`
            if (!(this.flags & Flags.Switch) && context & Context.ForStatement && this.token === Token.Identifier) {
                this.error(Errors.InvalidLabeledForOf);
            }

            const key = '@' + expr.name;
            if (hasOwn.call(this.labelSet, key)) this.error(Errors.Redeclaration, expr.name);

            this.labelSet[key] = true;
            let body: ESTree.Statement;

            if (this.token === Token.FunctionKeyword) {
                // '13.1.1 - Static Semantics: ContainsDuplicateLabels', says it's a syntax error if
                // LabelledItem: FunctionDeclaration is ever matched. Annex B.3.2 changes this behaviour.
                if (context & Context.Strict) this.error(Errors.StrictFunction);
                // AnnexB allows function declaration as labels, but not async func or generator func because the
                // generator declaration is only matched by a hoistable declaration in StatementListItem.
                // To fix this we need to pass the 'AnnexB' mask, and let it throw in 'parseFunctionDeclaration'
                // We also unset the 'ForStatement' mask because we are no longer inside a 'ForStatement'.
                body = this.parseFunctionDeclaration(context & ~Context.ForStatement | Context.AnnexB);
            } else {
                body = this.parseStatement(context & ~Context.ForStatement);
            }

            delete this.labelSet[key];

            return this.finishNode(pos, {
                type: 'LabeledStatement',
                label: expr,
                body
            });
        } else {

            this.consumeSemicolon(context);
            return this.finishNode(pos, {
                type: 'ExpressionStatement',
                expression: expr
            });
        }
    }
    private parseDebuggerStatement(context: Context): ESTree.DebuggerStatement {
        const pos = this.getLocations();
        this.expect(context, Token.DebuggerKeyword);
        this.consumeSemicolon(context);
        return this.finishNode(pos, {
            type: 'DebuggerStatement'
        });
    }

    private parseIfStatementChild(context: Context): ESTree.Statement {
        // Annex B.3.4 says that unbraced FunctionDeclarations under if/else in
        // non-strict code act as if they were braced: '(if (x) function f() {})'
        // parses as '(if (x) { function f() {} })'.
        //
        if (this.token === Token.FunctionKeyword) {
            if (context & Context.Strict) this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));

            // Pass the 'AnnexB' mask
            return this.parseFunctionDeclaration(context | Context.AnnexB);
        }

        return this.parseStatement(context | Context.Statement);
    }

    private parseIfStatement(context: Context): ESTree.IfStatement {
        const pos = this.getLocations();
        this.expect(context, Token.IfKeyword);
        this.expect(context, Token.LeftParen);
        // An IF node has three kids: test, alternate, and optional else
        const test = this.parseExpression(context | Context.AllowIn);

        this.expect(context, Token.RightParen);
        const savedFlag = this.flags;

        const consequent: ESTree.Statement = this.parseIfStatementChild(context);

        let alternate: ESTree.Statement | null = null;

        if (this.parseOptional(context, Token.ElseKeyword)) alternate = this.parseIfStatementChild(context);

        this.flags = savedFlag;

        return this.finishNode(pos, {
            type: 'IfStatement',
            test,
            alternate,
            consequent
        });
    }

    private parseReturnStatement(context: Context): ESTree.ReturnStatement {
        const pos = this.getLocations();

        if (!(this.flags & Flags.InFunctionBody)) this.error(Errors.IllegalReturn);

        this.expect(context, Token.ReturnKeyword);

        let argument: ESTree.Expression | null = null;

        if (!this.canConsumeSemicolon()) argument = this.parseExpression(context);

        this.consumeSemicolon(context);

        return this.finishNode(pos, {
            type: 'ReturnStatement',
            argument
        });
    }

    private parseFunctionDeclaration(context: Context): ESTree.FunctionDeclaration {

        const pos = this.getLocations();

        // Grab the 'yield' mask before unsetting it in case the "parent" has one
        const parentHasYield = !!(context & Context.Yield);

        if (context & (Context.Await | Context.Yield)) context &= ~(Context.Await | Context.Yield);

        if (this.token === Token.AsyncKeyword) {
            // use 'expect' instead of 'parseOptional' here for perf reasons when it
            // comes to Annex B.3.4. Avoid extra CPU cycle parsing out the 'async' keyword
            // in case this is an invalid generator function.
            this.expect(context, Token.AsyncKeyword);

            if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);

            context |= (Context.Await | Context.AsyncFunctionBody);
        }

        this.expect(context, Token.FunctionKeyword);

        const savedFlags = this.flags;
        const token = this.token;

        if (this.token === Token.Multiply) {
            // Annex B.3.4 doesn't allow generators functions
            if (context & Context.AnnexB) this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
            // If we are in the 'await' context. Check if the 'Next' option are set
            // and allow use of async generators. Throw a decent error message if this isn't the case
            if (context & Context.Await && !(this.flags & Flags.OptionsNext)) {
                this.error(Errors.InvalidAsyncGenerator);
            }
            this.expect(context, Token.Multiply);
            context |= Context.Yield;
        }

        // Invalid: 'export function a() {} export function a() {}'
        if (context & Context.Export && this.token === Token.Identifier) this.addFunctionArg(this.tokenValue);

        let id: ESTree.Identifier | null = null;

        if (this.token !== Token.LeftParen) {

            const name = this.tokenValue;
            // If the parent has the 'yield' mask, and the func decl name is 'yield' we have to throw an decent error message
            if (parentHasYield && this.token === Token.YieldKeyword) this.error(Errors.DisallowedInContext, tokenDesc(this.token));

            // Invalid: 'async function wrap() { async function await() { } };'
            if (context & Context.AsyncFunctionBody && this.flags & Flags.InFunctionBody) {
                // await is not allowed as an identifier in functions nested in async functions
                if (this.token === Token.AwaitKeyword) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                if (!(context & Context.Await)) context &= ~Context.AsyncFunctionBody;
            }

            if (context & Context.Statement && !(context & Context.AnnexB)) {
                if (!this.initBlockScope() && name in this.blockScope) {
                    if (this.blockScope[name] === ScopeMasks.NonShadowable || this.blockScope !== this.functionScope) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                }
                this.blockScope[name] = ScopeMasks.Shadowable;
            }

            id = this.parseBindingIdentifier(context &= ~Context.Statement);

        } else if (!(context & Context.OptionalIdentifier)) {
            this.error(Errors.UnNamedFunctionStmt);
        }

        const savedScope = this.enterFunctionScope();

        const params = this.parseFormalParameterList(context & ~(Context.Statement | Context.OptionalIdentifier), ObjectState.None);
        const body = this.parseFunctionBody(context & ~(Context.Statement | Context.OptionalIdentifier));

        this.exitFunctionScope(savedScope);

        // Only restore flags to original state for func decl avoid polluting 'global'
        this.flags = savedFlags;

        return this.finishNode(pos, {
            type: 'FunctionDeclaration',
            params,
            body,
            async: !!(context & Context.Await),
            generator: !!(context & Context.Yield),
            expression: false,
            id
        });
    }

    private parseTryStatement(context: Context): ESTree.TryStatement {

        const pos = this.getLocations();

        this.expect(context, Token.TryKeyword);

        const block = this.parseBlockStatement(context);

        let handler: ESTree.CatchClause | null = null;
        let finalizer: ESTree.BlockStatement | null = null;

        if (this.token === Token.CatchKeyword) {
            handler = this.parseCatchClause(context);
        }

        if (this.parseOptional(context, Token.FinallyKeyword)) {
            finalizer = this.parseBlockStatement(context);
        }

        if (!handler && !finalizer) this.error(Errors.NoCatchOrFinally);

        return this.finishNode(pos, {
            type: 'TryStatement',
            block,
            handler,
            finalizer
        });
    }

    private parseCatchClause(context: Context): ESTree.CatchClause {
        const pos = this.getLocations();
        this.expect(context, Token.CatchKeyword);

        // Create a lexical scope node around the whole catch clause
        const blockScope = this.blockScope;
        const parentScope = this.parentScope;

        if (blockScope !== undefined) this.parentScope = blockScope;

        this.blockScope = undefined;

        let param = null;

        if (!(this.flags & Flags.OptionsNext) || this.token === Token.LeftParen) {
            this.expect(context, Token.LeftParen);
            if (!hasMask(this.token, Token.BindingPattern)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
            this.addCatchArg(this.tokenValue, ScopeMasks.Shadowable);
            param = this.parseBindingPatternOrIdentifier(context);
            this.expect(context, Token.RightParen);
        }

        const body = this.parseBlockStatement(context | Context.IfClause);

        this.blockScope = blockScope;

        if (blockScope !== undefined) this.parentScope = parentScope;

        return this.finishNode(pos, {
            type: 'CatchClause',
            param,
            body
        });
    }

    private parseBlockStatement(context: Context): ESTree.BlockStatement {
        const pos = this.getLocations();
        const body: ESTree.Statement[] = [];
        const flag = this.flags;
        const blockScope = this.blockScope;
        const parentScope = this.parentScope;
        if (blockScope != null) this.parentScope = blockScope;
        this.blockScope = context & Context.IfClause ? blockScope : undefined;

        this.expect(context, Token.LeftBrace);

        while (this.token !== Token.RightBrace) body.push(this.parseStatementListItem(context | Context.Statement));

        this.expect(context, Token.RightBrace);
        this.flags = flag;

        this.blockScope = blockScope;
        if (parentScope != null) this.parentScope = parentScope;
        return this.finishNode(pos, {
            type: 'BlockStatement',
            body
        });
    }

    private parseVariableStatement(context: Context) {
        const pos = this.getLocations();
        const token = this.token;

        if (this.flags & Flags.HasUnicode) this.error(Errors.InvalidEscapedReservedWord);

        this.nextToken(context);
        // Invalid: 'async() => { var await; }'
        // Invalid: 'function() => { let await; }'
        // Invalid: 'var await = 1'
        if (context & (Context.Module | Context.Await) && this.token === Token.AwaitKeyword) {
            this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }
        // Invalid:'function* l() { var yield = 12 }'
        if (context & Context.Yield && this.flags & Flags.InFunctionBody && this.token === Token.YieldKeyword) {
            this.error(Errors.DisallowedInContext, this.tokenValue);
        }
        const declarations = this.parseVariableDeclarationList(context &= ~Context.ForStatement);
        this.consumeSemicolon(context);
        return this.finishNode(pos, {
            type: 'VariableDeclaration',
            declarations,
            kind: tokenDesc(token)
        });
    }

    private isBindingPattern(t: Token): boolean {
        return t === Token.LeftBracket || t === Token.LeftBrace;
    }

    private parseVariableDeclaration(context: Context): ESTree.VariableDeclarator {
        let init = null;
        const pos = this.getLocations();
        const token = this.token;
        const id = this.parseBindingPatternOrIdentifier(context | Context.Binding);

        // Invalid 'for (var x o\u0066 []) ;';
        if (context & Context.ForStatement && this.flags & Flags.HasUnicode && this.token === Token.OfKeyword) {
            this.error(Errors.InvalidEscapedReservedWord);
        }

        // Invalid 'export let foo';
        // Invalid 'export const foo';
        // Invalid 'export var foo';
        if (context & Context.RequireInitializer && id.type === 'Identifier' && this.token !== Token.Assign) {
            this.error(Errors.MissingInitializer);
        }

        // 'let', 'const'
        if (context & Context.Lexical) {
            if (context & Context.Const) {
                if (!(context & Context.ForStatement) && this.token !== Token.Assign) {
                    this.error(Errors.DeclarationMissingInitializer, 'const');
                }
                if (this.parseOptional(context, Token.Assign)) init = this.parseAssignmentExpression(context);
            } else if ((!(context & Context.ForStatement) && token !== Token.Identifier) || this.token === Token.Assign) {
                this.expect(context, Token.Assign);
                init = this.parseAssignmentExpression(context);
            }
            // 'var'
        } else if (this.parseOptional(context, Token.Assign)) {
            init = this.parseAssignmentExpression(context);
        } else if (!(context & Context.ForStatement) && this.isBindingPattern(token)) {
            this.error(Errors.DeclarationMissingInitializer, 'var');
        }

        return this.finishNode(pos, {
            type: 'VariableDeclarator',
            init,
            id
        });
    }

    private parseVariableDeclarationList(context: Context): ESTree.VariableDeclarator[] {
        const list: ESTree.VariableDeclarator[] = [this.parseVariableDeclaration(context)];
        while (this.parseOptional(context, Token.Comma)) {
            list.push(this.parseVariableDeclaration(context));
        }
        return list;
    }

    private parseEmptyStatement(context: Context): ESTree.EmptyStatement {
        const pos = this.getLocations();
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'EmptyStatement'
        });
    }

    private parseExpression(context: Context): ESTree.Expression | ESTree.SequenceExpression {
        // Expression[in]:
        //      AssignmentExpression[in]
        //      Expression[in] , AssignmentExpression[in]
        const pos = this.getLocations();
        const expr = this.parseAssignmentExpression(context);

        if (this.token === Token.Comma) {

            const expressions: ESTree.Expression[] = [expr];

            while (this.parseOptional(context, Token.Comma)) {
                expressions.push(this.parseAssignmentExpression(context));
            }

            return this.finishNode(pos, {
                type: 'SequenceExpression',
                expressions
            });
        }

        return expr;
    }

    private parseYieldExpression(context: Context, pos: Location): ESTree.YieldExpression {

        // YieldExpression[In] :
        //      yield
        //      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
        //      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
        this.expect(context, Token.YieldKeyword);

        // Invalid: `function *g(x = yield){}`
        if (this.flags & Flags.ArgumentList) this.error(Errors.GeneratorParameter);

        let argument: ESTree.Expression | null = null;
        let delegate = false;

        if (!(this.flags & Flags.LineTerminator)) {
            delegate = this.parseOptional(context, Token.Multiply);
            if (delegate) {
                argument = this.parseAssignmentExpression(context);
            } else if (hasMask(this.token, Token.ExpressionStart)) {
                argument = this.parseAssignmentExpression(context);
            }
        }

        return this.finishNode(pos, {
            type: 'YieldExpression',
            argument,
            delegate
        });
    }

    // 12.15.5 Destructuring Assignment
    private parseAssignmentPattern(context: Context, left: any, pos: Location): ESTree.AssignmentPattern {
        // Invalid: '({async foo(a = await b) {}})'
        if (this.flags & Flags.ArgumentList && this.token === Token.AwaitKeyword) this.error(Errors.Unexpected);
        const right = this.parseAssignmentExpression(context);

        return this.finishNode(pos, {
            type: 'AssignmentPattern',
            left,
            right
        });
    }

    private parseAssignmentExpression(context: Context): ESTree.Expression {

        const pos = this.getLocations();

        if (context & Context.Yield && this.token === Token.YieldKeyword) return this.parseYieldExpression(context, pos);

        const expr: ESTree.Expression = this.parseBinaryExpression(context, 0, pos);

        if (hasMask(this.token, Token.AssignOperator)) {
            const operator = this.token;
            if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                this.error(Errors.StrictLHSAssignment);
            } else if (operator === Token.Assign) {
                this.reinterpretExpressionAsPattern(context, expr);
            } else if (!isValidSimpleAssignmentTarget(expr)) {
                this.error(Errors.InvalidLHSInAssignment);
            }
            this.nextToken(context);
            return this.finishNode(pos, {
                type: 'AssignmentExpression',
                left: expr,
                operator: tokenDesc(operator) as ESTree.AssignmentOperator,
                right: this.parseAssignmentExpression(context),
            });
        }

        return this.parseConditionalExpression(context, expr, pos);
    }

    private parseConditionalExpression(context: Context, expression: ESTree.Expression, pos: Location): ESTree.Expression {

        if (this.token !== Token.QuestionMark) return expression;

        // Valid: '(b = c) => d ? (e, f) : g;'
        // Invalid: '() => {} ? 1 : 2;'
        if (!(context & Context.ConciseBody) && this.flags & Flags.Arrow) return expression;

        this.nextToken(context);

        const consequent = this.parseAssignmentExpression(context & ~Context.ConciseBody);
        this.expect(context, Token.Colon);

        const alternate = this.parseAssignmentExpression(context & ~Context.ConciseBody);

        return this.finishNode(pos, {
            type: 'ConditionalExpression',
            test: expression,
            consequent,
            alternate
        });
    }

    private getBinaryPrecedence(context: Context): number {
        if (hasMask(this.token, Token.BinaryOperator)) return this.token & Token.Precedence;
        return 0;
    }

    private parseUnaryExpression(context: Context): ESTree.UnaryExpression | ESTree.Expression {

        const pos = this.getLocations();
        let expr: any;

        if (hasMask(this.token, Token.UnaryOperator)) {
            if (context & Context.Await && this.token === Token.AwaitKeyword) return this.parseAwaitExpression(context, pos);
            const token = this.token;
            expr = this.buildUnaryExpression(context);
            // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
            // UnaryExpression is a direct reference to a variable, function argument, or function name
            if (context & Context.Strict && token === Token.DeleteKeyword && expr.argument.type === 'Identifier') {
                this.error(Errors.StrictDelete);
            }
            if (this.token === Token.Exponentiate) this.error(Errors.Unexpected);
        } else {
            expr = this.parseUpdateExpression(context, pos);
        }

        if (this.token !== Token.Exponentiate) return expr;
        return this.parseBinaryExpression(context, this.getBinaryPrecedence(context), pos, expr);
    }

    private buildUnaryExpression(context: Context): ESTree.Expression {

        const pos = this.getLocations();

        switch (this.token) {
            case Token.DeleteKeyword:
            case Token.Add:
            case Token.Subtract:
            case Token.Complement:
            case Token.Negate:
            case Token.TypeofKeyword:
            case Token.VoidKeyword:
                const token = this.token;
                this.nextToken(context);
                return this.finishNode(pos, {
                    type: 'UnaryExpression',
                    operator: tokenDesc(token),
                    argument: this.buildUnaryExpression(context),
                    prefix: true
                });
            default:
                return this.parseUpdateExpression(context, pos);
        }
    }

    private parseAwaitExpression(context: Context, pos: Location): ESTree.AwaitExpression {
        this.expect(context, Token.AwaitKeyword);
        const argument = this.buildUnaryExpression(context);
        return this.finishNode(pos, {
            type: 'AwaitExpression',
            argument
        });
    }

    private parseBinaryExpression(
        context: Context,
        precedence: number,
        pos: Location,
        expression = this.parseUnaryExpression(context)
    ): ESTree.Expression {

        loop: while (true) {

            // Get the binary precedence
            const binaryPrecedence = this.getBinaryPrecedence(context);

            // Bail out quickly if no binary precedence
            if (!binaryPrecedence) return expression;

            let operator;

            switch (this.token) {
                case Token.InKeyword:
                    if (!(context & Context.AllowIn)) break loop;
                case Token.Exponentiate:
                    operator = binaryPrecedence >= precedence;
                    break;
                default:
                    operator = binaryPrecedence > precedence;
            }

            if (!operator) break;

            const binaryOperator = this.token;

            this.nextToken(context);

            expression = this.finishNode(pos, {
                type: (binaryOperator === Token.LogicalAnd || binaryOperator === Token.LogicalOr) ?
                    'LogicalExpression' : 'BinaryExpression',
                left: expression,
                right: this.parseBinaryExpression(context, binaryPrecedence, pos),
                operator: tokenDesc(binaryOperator)
            });
        }

        return expression;
    }

    private parseUpdateExpression(context: Context, pos: Location): ESTree.Expression {

        let expr: ESTree.Expression;

        if (hasMask(this.token, Token.UpdateOperator)) {

            const operator = this.token;

            this.nextToken(context);

            expr = this.parseLeftHandSideExpression(context, pos);

            if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                this.error(Errors.StrictLHSPrefix);
            } else if (!isValidSimpleAssignmentTarget(expr)) this.error(Errors.InvalidLHSInAssignment);

            return this.finishNode(pos, {
                type: 'UpdateExpression',
                operator: tokenDesc(operator),
                prefix: true,
                argument: expr
            });
        }

        if (this.flags & Flags.OptionsJSX && this.token === Token.LessThan) {
            return this.parseJSXElement(context | Context.JSXChild);
        }

        expr = this.parseLeftHandSideExpression(context, pos);

        if (hasMask(this.token, Token.UpdateOperator) && !(this.flags & Flags.LineTerminator)) {

            // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
            // Assignment operator(12.15) or of a PostfixExpression or as the UnaryExpression
            // operated upon by a Prefix Increment(12.4.6) or a Prefix Decrement(12.4.7) operator.
            if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                this.error(Errors.StrictLHSPostfix);
            }

            if (!isValidSimpleAssignmentTarget(expr)) this.error(Errors.InvalidLHSInAssignment);

            const operator = this.token;

            this.nextToken(context);

            return this.finishNode(pos, {
                type: 'UpdateExpression',
                argument: expr,
                operator: tokenDesc(operator),
                prefix: false
            });
        }

        return expr;
    }

    private parseImportCall(context: Context, pos: Location): ESTree.Import {
        this.expect(context, Token.ImportKeyword);
        // Invalid: 'function failsParse() { return import.then(); }'
        if (this.token !== Token.LeftParen) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        return this.finishNode(pos, {
            type: 'Import'
        });
    }

    private parseLeftHandSideExpression(context: Context, pos: Location): ESTree.Expression | ESTree.Import {
        switch (this.token) {

            case Token.ImportKeyword:
                if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                return this.parseCallExpression(context | Context.DynamicImport, pos, this.parseImportCall(context, pos));

            case Token.SuperKeyword:
                return this.parseCallExpression(context, pos, this.parseSuper(context));
            default:
                const expr = this.parseMemberExpression(context, pos);
                if (this.flags & Flags.Arrow) return expr;
                return this.parseCallExpression(context, pos, expr);
        }
    }

    private parseParenthesizedExpression(context: Context, pos: Location) {

        this.expect(context, Token.LeftParen);

        // Invalid `for(({a}) in 0);`
        // Invalid `for(({a}) of 0);`
        // Invalid `for(([a]) of 0);`
        // Invalid `for(([a]) in 0);`
        if (context & Context.ForStatement && this.isBindingPattern(this.token)) {
            this.error(Errors.InvalidLHSInForLoop);
        }

        if (this.parseOptional(context, Token.RightParen)) {
            if (this.token === Token.Arrow) return this.parseArrowExpression(context & ~Context.ForStatement, pos, []);
            this.error(Errors.MissingArrowAfterParentheses);
        }

        if (this.token === Token.Ellipsis) {
            const rest = this.parseRestElement(context | Context.Binding);
            this.expect(context, Token.RightParen);
            // Valid: '(...a) => {};'
            if (this.token === Token.Arrow) return this.parseArrowExpression(context & ~Context.ForStatement, pos, [rest]);
            // Invalid: '(...,)'
            // Invalid: '(...a),'
            // Invalid: '(...a)$'
            // Invalid: '(...a), => {};'
            this.error(Errors.UnexpectedToken, this.tokenValue);
        }

        let state = ParenthesizedState.None;
        const sequenceStartPos = this.startPos;

        // 'eval' or 'arguments' are invalid in binding position in strict mode
        // within arrow functions, but not inside parenthesis, so we can't just
        // throw an error right away

        if (context & Context.Strict &&
            this.token === Token.Identifier &&
            this.isEvalOrArguments(this.tokenValue)) state |= ParenthesizedState.Reserved;

        const expr: (ESTree.Expression | ESTree.RestElement)[] = [this.parseAssignmentExpression(context & ~Context.ForStatement)];

        while (this.parseOptional(context, Token.Comma)) {
            if (this.parseOptional(context, Token.RightParen)) {
                if (this.token !== Token.Arrow) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                state |= ParenthesizedState.TrailingComma;
            } else if (this.token === Token.Ellipsis) {
                // Invalid: '(...a) + 1'
                // Invalid: '(((...a)))'
                // Invalid: '(...a)'
                if (!(this.flags & Flags.HasRest)) this.flags |= Flags.HasRest;
                expr.push(this.parseRestElement(context | Context.Binding));
                break;
            } else {
                // Invalid: '((a), b) => 42'
                if (this.token === Token.LeftParen) state |= ParenthesizedState.WrappedInParen;
                if (this.token === Token.Identifier) {
                    // Valid: '"use strict"; (foo, eval)'
                    // Valid: '"use strict"; (foo, arguments)'
                    // Invalid: '"use strict"; ((foo, eval) => 1);'
                    // Invalid: '"use strict"; ((foo, arguments) => 1);'
                    if (this.isEvalOrArguments(this.tokenValue)) state |= ParenthesizedState.Reserved;
                }
                expr.push(this.parseAssignmentExpression(context & ~(Context.ForStatement | Context.Parenthesis)));
            }
        }

        // Save the 'SequenceExpression' end position before parsing out the right parenthesis
        const sequenceEndPos = this.endPos;

        if (!(state & ParenthesizedState.TrailingComma)) this.expect(context, Token.RightParen);

        if (this.token === Token.Arrow) {
            // Invalid: '(a)\n=> 0'
            if (this.flags & Flags.LineTerminator) this.error(Errors.Unexpected);
            // Invalid: '((a), (b)) => 42'
            // Invalid: '((a), b) => 42'
            // Invalid: '(a, (b)) => 42'
            if (state & ParenthesizedState.WrappedInParen) this.error(Errors.Unexpected);
            if (context & Context.Yield && this.flags & Flags.InFunctionBody) this.error(Errors.YieldInParameter);
            // Invalid:  '([a.a]) => 42'
            if (this.flags & Flags.HasMemberExpression) this.throwError(Errors.InvalidParenthesizedPattern);
            // Invalid: '"use strict"; ((foo, eval) => 1);'
            // Invalid: '"use strict"; ((foo, arguments) => 1);'
            if (state & ParenthesizedState.Reserved) this.error(Errors.StrictParamName);
            return this.parseArrowExpression(context & ~Context.ForStatement, pos, expr);
        }

        // Invalid: '(...a)'
        if (this.flags & Flags.HasRest) this.throwError(Errors.UnexpectedRestElement);

        this.flags &= ~Flags.Arrow;

        if (expr.length > 1) {
            return this.finishNodeAt(sequenceStartPos, sequenceEndPos, {
                type: 'SequenceExpression',
                expressions: expr
            });
        }
        return expr[0];
    }

    private parseRestElement(context: Context): ESTree.RestElement {
        const pos = this.getLocations();
        this.expect(context, Token.Ellipsis);
        const argument = this.parseBindingPatternOrIdentifier(context | Context.Binding);
        if (this.token === Token.Assign) this.error(Errors.DefaultRestParameter);
        if (this.token !== Token.RightParen) this.error(Errors.ParameterAfterRestParameter);
        return this.finishNode(pos, {
            type: 'RestElement',
            argument
        });
    }

    private parseBindingPatternOrIdentifier(context: Context): ESTree.Identifier | ESTree.ArrayPattern | ESTree.ObjectPattern {
        switch (this.token) {
            case Token.LeftBracket:
                return this.parseAssignmentElementList(context);
            case Token.LeftBrace:
                return this.parseAssignmentPropertyList(context);
            default:
                return this.parseBindingIdentifier(context);
        }
    }

    private parseBindingIdentifier(context: Context): ESTree.Identifier {

        const name = this.tokenValue;
        const token = this.token;

        // Let is disallowed as a lexically bound name
        if (context & Context.Lexical && token === Token.LetKeyword) {
            this.error(Errors.LetInLexicalBinding);
        }

        if (!this.isIdentifier(context, token)) this.error(Errors.Unexpected);

        if (context & Context.Strict && this.isEvalOrArguments(name)) this.error(Errors.StrictLHSAssignment);

        if (context & Context.Await && token === Token.AwaitKeyword) {
            this.error(Errors.UnexpectedToken, tokenDesc(token));
        }

        if (this.flags & Flags.HasUnicode && this.token === Token.YieldKeyword) this.error(Errors.InvalidEscapedReservedWord);

        if (!(context & Context.ForStatement)) this.addVarOrBlock(context, name);

        const pos = this.getLocations();

        this.nextToken(context);

        return this.finishNode(pos, {
            type: 'Identifier',
            name
        });
    }

    private parseAssignmentElementList(context: Context): ESTree.ArrayPattern {
        const pos = this.getLocations();
        this.expect(context, Token.LeftBracket);

        if (this.flags & Flags.ArgumentList) this.flags |= Flags.NonSimpleParameter;
        const elements: (ESTree.Pattern | null)[] = [];

        // Invalid:'function*g([yield]){}'
        if (context & Context.Yield &&
            context & Context.Binding &&
            this.flags & Flags.ArgumentList &&
            this.token === Token.YieldKeyword) this.error(Errors.DisallowedInContext, tokenDesc(this.token));

        while (this.token !== Token.RightBracket) {
            if (this.parseOptional(context, Token.Comma)) {
                elements.push(null);
            } else {
                if (this.token === Token.Ellipsis) {
                    elements.push(this.parseAssignmentRestElement(context));
                    break;
                }
                elements.push(this.parseArrayAssignmentPattern(context | Context.AllowIn));

                if (this.token !== Token.RightBracket) this.expect(context, Token.Comma);
            }
        }

        this.expect(context, Token.RightBracket);

        return this.finishNode(pos, {
            type: 'ArrayPattern',
            elements
        });
    }

    private parseAssignmentRestElement(context: Context): any {
        const pos = this.getLocations();
        this.expect(context, Token.Ellipsis);
        const argument = this.parseBindingPatternOrIdentifier(context | Context.Binding);
        if (this.token === Token.Assign) this.error(Errors.DefaultRestParameter);
        return this.finishNode(pos, {
            type: 'RestElement',
            argument
        });
    }

    private parseArrayAssignmentPattern(context: Context): any {
        const pos = this.getLocations();

        const left = this.parseBindingPatternOrIdentifier(context | Context.Binding);

        if (!this.parseOptional(context, Token.Assign)) return left;
        return this.parseAssignmentPattern(context, left, pos);
    }

    private parseAssignmentPropertyList(context: Context): ESTree.ObjectPattern {
        const pos = this.getLocations();
        const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];
        if (this.flags & Flags.ArgumentList) this.flags |= Flags.NonSimpleParameter;

        this.expect(context, Token.LeftBrace);

        while (this.token !== Token.RightBrace) {
            if (this.token === Token.Ellipsis) {
                if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                properties.push(this.parseRestProperty(context));
            } else {
                properties.push(this.parseAssignmentProperty(context));
            }
            if (this.token !== Token.RightBrace) this.parseOptional(context, Token.Comma);
        }

        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'ObjectPattern',
            properties
        });
    }

    private parsePropertyName(context: Context) {
        switch (this.token) {
            case Token.StringLiteral:
            case Token.NumericLiteral:
                return this.parseLiteral(context);
            case Token.LeftBracket:
                return this.parseComputedPropertyName(context);
            default:
                return this.parseIdentifier(context);
        }
    }

    private parseAssignmentProperty(context: Context): ESTree.AssignmentProperty | ESTree.RestElement {

        const pos = this.getLocations();
        const method = false;
        const token = this.token;
        const isIdentifier = this.isIdentifier(context, this.token);

        let computed = false;
        let shorthand = false;
        let value: any;
        let key: any;

        if (isIdentifier) {

            const tokenValue = this.tokenValue;

            computed = this.token === Token.LeftBracket;

            key = this.parsePropertyName(context);

            const init = this.finishNode(pos, {
                type: 'Identifier',
                name: tokenValue
            });

            if (this.parseOptional(context, Token.Assign)) {
                // Invalid: 'function*g() { var {yield = 0} = 0; }'
                if (context & Context.Yield &&
                    this.flags & Flags.InFunctionBody &&
                    token === Token.YieldKeyword) this.error(Errors.DisallowedInContext, tokenValue);
                shorthand = true;
                value = this.parseAssignmentPattern(context, init, pos);
            } else if (this.parseOptional(context, Token.Colon)) {

                if (context & Context.Yield && this.flags & Flags.ArgumentList && this.token === Token.YieldKeyword) {
                    this.error(Errors.DisallowedInContext, tokenValue);
                }
                value = this.parseBindingPatternOrIdentifier(context | Context.Binding);
                if (this.parseOptional(context, Token.Assign)) value = this.parseAssignmentPattern(context, value, pos);

            } else {
                // Note! This validation may seem a little odd. However. If we do this later on, we have to
                // parse out the binding identifier - 'yield'. If we do that, the index and token postion have
                // changed. Doing it like this we can report 'yield' as the invalid token, and the correct
                // token position which are *before* we parse out the binding identifier.
                if (context & Context.Binding) {
                    if (context & Context.Yield && token === Token.YieldKeyword) {
                        // Invalid: 'function*g({yield}){}'
                        if (this.flags & Flags.ArgumentList) this.error(Errors.GeneratorParameter);
                        // Valid: 'function g() { var {yield} = 0; }'
                        // Invalid: 'function* g() { var {yield} = 0; }'
                        // Invalid: '"use strict"; function g() { var {yield} = 0; }'
                        if (this.flags & Flags.InFunctionBody) this.error(Errors.DisallowedInContext, tokenValue);
                    }
                }
                shorthand = true;
                value = init;
            }
        } else {
            computed = this.token === Token.LeftBracket;

            key = this.parsePropertyName(context);
            this.expect(context, Token.Colon);

            value = this.parseBindingPatternOrIdentifier(context | Context.Binding);

            if (this.parseOptional(context, Token.Assign)) {
                value = this.parseAssignmentPattern(context, value, pos);
            }
        }

        return this.finishNode(pos, {
            type: 'Property',
            kind: 'init',
            key,
            computed,
            value,
            method,
            shorthand
        });
    }

    private parseRestProperty(context: Context): ESTree.RestElement {
        const pos = this.getLocations();
        this.expect(context, Token.Ellipsis);

        if (this.token !== Token.Identifier) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        const arg = this.parseBindingPatternOrIdentifier(context | Context.Binding);
        if (this.token === Token.Assign) this.error(Errors.DefaultRestProperty);

        return this.finishNode(pos, {
            type: 'RestElement',
            argument: arg
        });
    }

    private parseComputedPropertyName(context: Context): ESTree.Expression {
        this.expect(context, Token.LeftBracket);
        if (context & Context.Yield && this.flags & Flags.ArgumentList) context &= ~Context.Yield;
        const expression = this.parseAssignmentExpression(context | Context.AllowIn);
        this.expect(context, Token.RightBracket);
        return expression;
    }

    private reinterpretExpressionAsPattern(context: Context, params: any) {

        switch (params.type) {
            case 'Identifier':
            case 'MemberExpression':
            case 'AssignmentPattern':
            case 'ArrayPattern':
            case 'ObjectPattern':
                return;
            case 'ObjectExpression':
                params.type = 'ObjectPattern';
                // ObjectPattern and ObjectExpression are isomorphic
                for (let i = 0; i < params.properties.length; i++) {
                    const property = params.properties[i];
                    if (property.kind !== 'init') this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                    this.reinterpretExpressionAsPattern(context, property.type === 'SpreadElement' ? property : property.value);
                }
                return;

            case 'ArrayExpression':
                params.type = 'ArrayPattern';
                for (let i = 0; i < params.elements.length; ++i) {
                    // skip holes in pattern
                    if (params.elements[i] !== null) this.reinterpretExpressionAsPattern(context, params.elements[i]);
                }
                return;

            case 'AssignmentExpression':
                params.type = 'AssignmentPattern';
                if (params.operator !== '=') this.error(Errors.UnexpectedToken, tokenDesc(this.token));

                delete params.operator;
                this.reinterpretExpressionAsPattern(context, params.left);
                return;

            case 'SpreadElement':
                if (params.argument.type === 'AssignmentExpression') {
                    this.error(context & Context.ForStatement ? Errors.InvalidLHSInForIn : Errors.InvalidLHSInAssignment);
                }
                params.type = 'RestElement';
                this.reinterpretExpressionAsPattern(context, params.argument);
                return;

            default:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }
    }

    private parseArrowExpression(context: Context, pos: Location, params: ESTree.Node[]): ESTree.ArrowFunctionExpression {

        // Invalid:  'async abc\n => function () {  }'
        if (this.flags & Flags.LineTerminator) this.error(Errors.UnexpectedArrow);

        this.expect(context, Token.Arrow);

        this.flags &= ~(Flags.Arrow | Flags.AsyncArrow);

        if (Context.Parenthesis) this.flags |= Flags.Arrow;

        const savedScope = this.enterFunctionScope();

        let body: ESTree.Expression | ESTree.BlockStatement;
        let expression = true;

        // An 'simple arrow' is just a plain identifier
        if (!(context & Context.SimpleArrow)) params = this.parseArrowFormalList(context | Context.Binding, params);

        if (this.token === Token.LeftBrace) {
            expression = false;
            body = this.parseFunctionBody(context & ~(Context.SimpleArrow | Context.Yield | Context.Parenthesis));
        } else {
            this.flags &= ~Flags.Arrow;
            body = this.parseAssignmentExpression(context & ~(Context.SimpleArrow | Context.Yield) | Context.ConciseBody | Context.Parenthesis);
        }

        this.exitFunctionScope(savedScope);

        return this.finishNode(pos, {
            type: 'ArrowFunctionExpression',
            id: null,
            params: params,
            body,
            generator: false,
            expression,
            async: !!(context & Context.Await)
        });
    }

    private parseArrowFormalList(context: Context, params: ESTree.Node[]): ESTree.Node[] {

        for (let idx = 0; idx < params.length; idx++) {
            this.parseArrowFormalParameter(context, params[idx]);
        }

        return params;
    }

    private parseArrowFormalParameter(context: Context, params: any) {

        switch (params.type) {

            case 'Identifier':
                this.addFunctionArg(params.name);
                return;

            case 'SpreadElement':
                params.type = 'RestElement';
                this.parseArrowFormalParameter(context, params.argument);
                return;

            case 'RestElement':
                this.parseArrowFormalParameter(context, params.argument);
                return;

            case 'ArrayExpression':
                params.type = 'ArrayPattern';
                for (let i = 0; i < params.elements.length; ++i) {
                    // skip holes in pattern
                    if (params.elements[i] !== null) this.parseArrowFormalParameter(context, params.elements[i]);
                }
                return;

            case 'AssignmentPattern':
                this.parseArrowFormalParameter(context, params.left);
                return;

            case 'ArrayPattern':
                for (let i = 0; i < params.elements.length; ++i) {
                    // skip holes in pattern
                    if (params.elements[i] !== null) this.parseArrowFormalParameter(context, params.elements[i]);
                }
                return;

            case 'ObjectExpression':
                params.type = 'ObjectPattern';
                // ObjectPattern and ObjectExpression are isomorphic
                for (let i = 0; i < params.properties.length; i++) {
                    const property = params.properties[i];
                    this.parseArrowFormalParameter(context, property.type === 'SpreadElement' ? property : property.value);
                }
                return;
            case 'ObjectPattern':
                // ObjectPattern and ObjectExpression are isomorphic
                for (let i = 0; i < params.properties.length; i++) {
                    const property = params.properties[i];
                    this.parseArrowFormalParameter(context, property.type === 'RestElement' ? property : property.value);
                }
                return;

            case 'AssignmentExpression':
                params.type = 'AssignmentPattern';
                delete params.operator;
                this.parseArrowFormalParameter(context, params.left);
                return;

            default:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }
    }

    private parseSuper(context: Context): ESTree.Expression {
        const pos = this.getLocations();

        this.expect(context, Token.SuperKeyword);

        switch (this.token) {
            case Token.LeftParen:
                // The super property has to be within a class constructor
                if (!(context & Context.Constructor)) this.error(Errors.BadSuperCall);
                break;
            case Token.Period:
                if (!(context & Context.Method)) this.error(Errors.BadSuperCall);
                break;
            case Token.LeftBracket:
                if (!(context & Context.Method)) this.error(Errors.BadSuperCall);
                break;
            default:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }

        return this.finishNode(pos, {
            type: 'Super'
        });
    }

    private parseFunctionBody(context: Context): ESTree.BlockStatement {

        const pos = this.getLocations();

        const body: ESTree.Statement[] = [];
        const savedFunction = hasMask(this.flags, Flags.InFunctionBody);
        const savedFlags = this.flags;

        this.flags = this.flags & ~(Flags.Break | Flags.Continue) | Flags.InFunctionBody;

        this.expect(context, Token.LeftBrace);

        const previousLabelSet = this.labelSet;

        this.labelSet = {};

        while (this.token !== Token.RightBrace) {

            const item = this.parseStatementListItem(context);

            body.push(item);

            if (!isDirective(item)) break;

            if (item.expression.value === 'use strict') {
                context |= Context.Strict;
                // Invalid: 'package => { "use strict"}'
                if (this.flags & Flags.HasReservedWord) this.error(Errors.UnexpectedStrictReserved);
                // Invalid:  '(function a(eval) { "use strict"; })'
                // Invalid:  '(function a(arguments) { "use strict"; })'
                if (this.flags & Flags.HasEvalArgInParam) this.error(Errors.StrictParamName);
                // Invalid: 'function a([ option1, option2 ] = []) {  "use strict"; }'
                if (this.flags & Flags.NonSimpleParameter) this.error(Errors.IllegalUseStrict);
                break;
            }
        }

        if (this.flags & Flags.HasReservedWord) this.flags &= ~Flags.HasReservedWord;

        while (this.token !== Token.RightBrace) body.push(this.parseStatementListItem(context));

        this.labelSet = previousLabelSet;
        this.flags = savedFlags;
        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'BlockStatement',
            body
        });
    }

    private parseCallExpression(
        context: Context,
        pos: Location,
        expr: ESTree.Expression
    ): ESTree.Expression {

        while (true) {

            expr = this.parseMemberExpression(context, pos, expr);

            switch (this.token) {

                // '('
                case Token.LeftParen:

                    // parses both 'CallExpression' and async head
                    const args = this.parseArguments(context);

                    switch (this.token) {

                        // '=>'
                        case Token.Arrow:

                            if (this.flags & Flags.AsyncArrow) {
                                expr = this.parseArrowExpression(context | Context.Await, pos, args);
                                break;
                            }
                            // falls through
                        default:

                            if (context & Context.DynamicImport && args.length !== 1 &&
                                expr.type as any === 'Import') this.error(Errors.BadImportCallArity);

                            expr = this.finishNode(pos, {
                                type: 'CallExpression',
                                arguments: args,
                                callee: expr
                            });
                    }

                    // Remove the 'Arrow' flags now, else we are in deep shit
                    this.flags &= ~Flags.Arrow;

                    break;

                default:
                    return expr;
            }
        }
    }

    private parseNonComputedMemberExpression(context: Context, expr: ESTree.Expression, pos: Location): ESTree.MemberExpression {
        const property = this.parseIdentifier(context);
        return this.finishNode(pos, {
            type: 'MemberExpression',
            object: expr,
            computed: false,
            property,
        });
    }

    private parseComputedMemberExpression(context: Context, expr: ESTree.Expression, pos: Location): ESTree.MemberExpression {
        const property = this.parseExpression(context);
        return this.finishNode(pos, {
            type: 'MemberExpression',
            object: expr,
            computed: true,
            property,
        });
    }

    private parseMemberExpression(
        context: Context,
        pos: Location,
        expr: ESTree.CallExpression | ESTree.Expression = this.parsePrimaryExpression(context, pos)
    ): ESTree.Expression {

        while (true) {

            if (this.parseOptional(context, Token.Period)) {
                if (context & Context.Parenthesis && !(this.flags & Flags.HasMemberExpression)) {
                    this.errorLocation = this.trackErrorLocation();
                    this.flags |= Flags.HasMemberExpression;
                }

                expr = this.parseNonComputedMemberExpression(context, expr, pos);
                continue;
            }

            if (this.parseOptional(context, Token.LeftBracket)) {
                // Invalid: `new Type[]`
                if (context & Context.NewExpression && this.token === Token.RightBracket) this.error(Errors.InvalidStartOfExpression);
                expr = this.parseComputedMemberExpression(context | Context.AllowIn, expr, pos);
                this.expect(context, Token.RightBracket);
                expr = this.finishNode(pos, expr);
                continue;
            }

            if (this.token === Token.TemplateCont) {
                const quasi = this.parseTemplate(context, this.getLocations());
                expr = this.parseTaggedTemplateExpression(context, expr, quasi, pos);
                continue;
            }

            if (this.token === Token.TemplateTail) {
                const quasi = this.parseTemplateTail(context, this.getLocations());
                expr = this.parseTaggedTemplateExpression(context, expr, quasi, pos);

                continue;
            }

            return expr;
        }
    }

    private parseArguments(context: Context): ESTree.SpreadElement[] | ESTree.AssignmentExpression[] {

        this.expect(context, Token.LeftParen);

        const args: any[] = [];

        while (this.token !== Token.RightParen) {

            if (this.token === Token.Ellipsis) {
                args.push(this.parseSpreadElement(context));
            } else {
                if (this.flags & Flags.AsyncArrow) {
                    // Invalid `"use strict"; async(eval) => {}`
                    if (this.token === Token.Identifier && this.isEvalOrArguments(this.tokenValue)) this.error(Errors.UnexpectedStrictReserved);
                }
                args.push(this.parseAssignmentExpression(context & ~Context.DynamicImport));
            }

            if (!this.parseOptional(context, Token.Comma)) break;
        }

        this.expect(context, Token.RightParen);

        return args;
    }

    private parseMetaProperty(context: Context, meta: ESTree.Identifier, pos: Location): ESTree.MetaProperty {
        const property = this.parseIdentifier(context);
        return this.finishNode(pos, {
            meta,
            type: 'MetaProperty',
            property
        });
    }

    private parseNewExpression(context: Context): ESTree.MetaProperty | ESTree.NewExpression {

        const pos = this.getLocations();
        if (this.flags & Flags.HasUnicode) this.error(Errors.InvalidEscapedReservedWord);
        const id = this.parseIdentifier(context);

        switch (this.token) {

            // '.'
            case Token.Period:

                this.expect(context, Token.Period);

                if (this.token === Token.Identifier) {
                    if (this.tokenValue !== 'target') this.error(Errors.MetaNotInFunctionBody);
                    if (this.flags & Flags.ArgumentList) return this.parseMetaProperty(context, id, pos);
                    if (!(this.flags & Flags.InFunctionBody)) this.error(Errors.MetaNotInFunctionBody);
                }

                return this.parseMetaProperty(context, id, pos);

                // 'import'
            case Token.ImportKeyword:
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
            default:

                return this.finishNode(pos, {
                    type: 'NewExpression',
                    callee: this.parseMemberExpression(context | Context.NewExpression, pos),
                    arguments: this.token === Token.LeftParen ? this.parseArguments(context) : []
                });
        }
    }

    private parseSpreadElement(context: Context): ESTree.SpreadElement {
        const pos = this.getLocations();

        // Disallow SpreadElement inside dynamic import
        if (context & Context.DynamicImport) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        this.expect(context, Token.Ellipsis);
        if (context & Context.Strict && this.isEvalOrArguments(this.tokenValue)) this.error(Errors.UnexpectedReservedWord);
        return this.finishNode(pos, {
            type: 'SpreadElement',
            argument: this.parseAssignmentExpression(context)
        });
    }

    private parseArrayExpression(context: Context) {
        const pos = this.getLocations();
        this.expect(context, Token.LeftBracket);

        const elements = [];

        while (this.token !== Token.RightBracket) {
            if (this.parseOptional(context, Token.Comma)) {
                elements.push(null);
            } else if (this.token === Token.Ellipsis) {
                const element = this.parseSpreadElement(context);
                if (this.token !== Token.RightBracket) {
                    this.expect(context, Token.Comma);
                }
                elements.push(element);
            } else {
                elements.push(this.parseAssignmentExpression(context | Context.AllowIn));
                if (this.token !== Token.RightBracket) {
                    this.expect(context, Token.Comma);
                }
            }
        }
        this.expect(context, Token.RightBracket);

        return this.finishNode(pos, {
            type: 'ArrayExpression',
            elements
        });
    }

    private parseFunctionExpression(context: Context): ESTree.FunctionExpression {

        const pos = this.getLocations();

        const parentHasYield = !!(context & Context.Yield);

        if (context & (Context.Yield | Context.Await)) context &= ~(Context.Yield | Context.Await);

        if (this.parseOptional(context, Token.AsyncKeyword)) {
            if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
            context |= (Context.Await | Context.AsyncFunctionBody);
        }

        this.expect(context, Token.FunctionKeyword);

        if (this.parseOptional(context, Token.Multiply)) {

            // If we are in the 'await' context. Check if the 'Next' option are set
            // and allow us to use async generators. If not, throw a decent error message if this isn't the case
            if (context & Context.Await && !(this.flags & Flags.OptionsNext)) this.error(Errors.InvalidAsyncGenerator);
            context |= Context.Yield;
        }

        let id: ESTree.Identifier | null = null;

        if (this.token !== Token.LeftParen && this.isIdentifier(context, this.token)) {
            if (context & Context.Strict && this.isEvalOrArguments(this.tokenValue)) this.error(Errors.StrictLHSAssignment);
            if ((context & Context.AwaitOrYield || (context & Context.Strict && parentHasYield)) && this.token === Token.YieldKeyword) {
                this.error(Errors.YieldReservedWord);
            }
            id = this.parseIdentifier(context);
        }

        const savedFlags = this.flags;
        const savedScope = this.enterFunctionScope();
        const params = this.parseFormalParameterList(context, ObjectState.None);
        const body = this.parseFunctionBody(context);

        this.exitFunctionScope(savedScope);

        return this.finishNode(pos, {
            type: 'FunctionExpression',
            params,
            body,
            async: !!(context & Context.Await),
            generator: !!(context & Context.Yield),
            expression: false,
            id
        });
    }

    private parseFormalParameterList(context: Context, flags: ObjectState): ESTree.Node[] {

        this.expect(context, Token.LeftParen);
        this.flags &= ~Flags.NonSimpleParameter;

        // Invalid: 'function t(if) {}'
        // Invalid: '(function t(if) {})'
        if (hasMask(this.token, Token.Reserved)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));

        // Invalid: 'function *g(yield){}'
        // Invalid: '(function *g(yield){})'
        // Invalid: '(function*() { function*(x = yield 3) {} })'
        if (context & Context.Yield && !(context & Context.Method) && this.token === Token.YieldKeyword) this.error(Errors.DisallowedInContext, tokenDesc(this.token));

        this.flags |= Flags.ArgumentList;

        const result = [];

        while (this.token !== Token.RightParen) {
            if (this.token === Token.Ellipsis) {
                if (flags & ObjectState.Set) this.error(Errors.BadSetterRestParameter);
                this.flags |= Flags.NonSimpleParameter;
                result.push(this.parseRestElement(context | Context.Binding));
                this.parseOptional(context, Token.Comma);
                break;
            }
            result.push(this.parseFormalParameter(context, flags));
            if (this.token !== Token.RightParen) this.expect(context, Token.Comma);
        }

        if (flags & ObjectState.Get && result.length > 0) this.error(Errors.BadGetterArity);
        if (flags & ObjectState.Set && result.length !== 1) this.error(Errors.BadSetterArity);
        this.flags &= ~Flags.ArgumentList;

        this.expect(context, Token.RightParen);
        return result;
    }

    private parseFormalParameter(
        context: Context,
        flags: ObjectState
    ): ESTree.AssignmentPattern | ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.RestElement {

        const pos = this.getLocations();

        // Invalid: 'function a(yield){ 'use strict'; }':
        if (hasMask(this.token, Token.FutureReserved)) {
            this.errorLocation = this.trackErrorLocation();
            this.flags |= Flags.HasReservedWord;
        }

        // Invalid: '`async function f(await) {}`':
        //     if (context & Context.Await && this.token === Token.AwaitKeyword) this.error(Errors.UnexpectedToken, tokenDesc(this.token));

        if (this.token === Token.Identifier) {
            if (context & Context.Strict) this.addFunctionArg(this.tokenValue);
            if (this.isEvalOrArguments(this.tokenValue)) {
                this.errorLocation = this.trackErrorLocation();
                this.flags |= Flags.HasEvalArgInParam;
            }
        }

        const param = this.parseBindingPatternOrIdentifier(context | Context.Binding);

        if (!this.parseOptional(context, Token.Assign)) return param;

        return this.parseAssignmentPattern(context, param, pos);
    }

    private parseIdentifierOrArrow(context: Context, pos: Location): ESTree.Identifier | ESTree.ArrowFunctionExpression {
        const token = this.token;
        const tokenValue = this.tokenValue;
        if (!this.isIdentifier(context, this.token)) this.error(Errors.UnexpectedToken, tokenDesc(token));
        const expr = this.parseIdentifier(context);
        context &= ~Context.Await;
        this.flags &= ~Flags.Arrow;
        if (this.token === Token.Arrow) {
            // Invalid: 'var af = switch => 1;'
            if (hasMask(token, Token.Reserved)) this.error(Errors.UnexpectedToken, tokenDesc(token));
            if (hasMask(token, Token.FutureReserved)) {
                if (context & Context.Strict) this.error(Errors.UnexpectedStrictReserved);
                // Invalid 'package => {"use strict"}'
                this.errorLocation = this.trackErrorLocation();
                this.flags |= Flags.HasReservedWord;
            }

            if (context & Context.Strict) {
                // Invalid: '"use strict"; var af = eval => 1;'
                // Invalid: '"use strict"; var af = arguments => 1;'
                if (this.isEvalOrArguments(tokenValue)) this.error(Errors.UnexpectedReservedWord);
            }

            return this.parseArrowExpression(context |= (Context.Arrow | Context.SimpleArrow), pos, [expr]);
        }

        return expr;
    }

    private parsePrimaryExpression(context: Context, pos: Location): ESTree.Expression {
        switch (this.token) {
            case Token.Divide:
            case Token.DivideAssign:
                switch (this.scanRegularExpression()) {
                    case Token.RegularExpression:
                        return this.parseRegularExpression(context);
                    default: // ignore
                }
            case Token.NumericLiteral:
                if (this.flags & Flags.BigInt) return this.parseBigIntLiteral(context);
            case Token.StringLiteral:
                return this.parseLiteral(context);
            case Token.ThisKeyword:
                return this.parseThisExpression(context);
            case Token.NullKeyword:
                return this.parseNullExpression(context);
            case Token.TrueKeyword:
                return this.parseTrueExpression(context);
            case Token.FalseKeyword:
                return this.parseFalseExpression(context);
            case Token.LeftParen:
                return this.parseParenthesizedExpression(context & ~Context.Await | (Context.AllowIn | Context.Parenthesis), pos);
            case Token.LeftBracket:
                return this.parseArrayExpression(context);
            case Token.LeftBrace:
                return this.parseObjectExpression(context);
            case Token.FunctionKeyword:
                return this.parseFunctionExpression(context);
            case Token.NewKeyword:
                return this.parseNewExpression(context);
            case Token.ClassKeyword:
                return this.parseClassExpression(context);
            case Token.TemplateTail:
                return this.parseTemplateTail(context, pos);
            case Token.TemplateCont:
                return this.parseTemplate(context, pos);
            case Token.SuperKeyword:
                return this.parseSuper(context);
            case Token.DoKeyword:
                if (this.flags & Flags.OptionsV8) return this.parseDoExpression(context);
            case Token.AsyncKeyword:
                if (this.flags & Flags.HasUnicode) this.error(Errors.InvalidEscapedReservedWord);
                if (this.nextTokenIsFuncKeywordOnSameLine(context)) return this.parseFunctionExpression(context);

                if (this.flags & Flags.Arrow) this.flags &= ~Flags.Arrow;

                pos = this.getLocations();
                // 'async' could be an plain identifier, so we can't "expect" anything
                let expr = this.parseIdentifier(context);
                const token = this.token;
                const tokenValue = this.tokenValue;
                // Fast path in case linebreak after async. In that case this is an
                // plain identifier
                if (this.flags & Flags.LineTerminator) return expr;
                // Valid: 'async => 1'
                if (this.token === Token.Arrow) return this.parseArrowExpression(context & ~Context.Parenthesis, pos, [expr]);
                // Invalid: 'async => {}'
                // Valid: 'async foo => {}'
                if (this.isIdentifier(context, this.token)) {
                    // Invalid: '(async await => 1);'
                    if (token === Token.AwaitKeyword) this.error(Errors.UnexpectedToken, tokenDesc(token));
                    if (context & Context.Strict) {
                        // Invalid: '"use strict"; (async eval => 1);'
                        // Invalid: '"use strict"; (async arguments => 1);'
                        if (this.isEvalOrArguments(tokenValue)) this.error(Errors.UnexpectedReservedWord);
                    }
                    expr = this.parseIdentifier(context);
                    // Valid: 'async foo => {}'
                    if (this.token === Token.Arrow) return this.parseArrowExpression(context & ~Context.Parenthesis | Context.Await, pos, [expr]);
                    // Invalid: 'async foo 7 {}'
                    // Invalid: 'async foo bar {}'
                    // Invalid: 'foo / {}'
                    this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                }

                this.flags |= Flags.AsyncArrow;

                // Return identifier
                return expr;

                // Invalid: `(async function *() { void yield; });`
            case Token.YieldKeyword:
                if (context & Context.Yield) this.error(Errors.UnexpectedToken, tokenDesc(this.token));

            case Token.LetKeyword:
                // Invalid: '"use strict"; let instanceof Foo'
                // Invalid: '"use strict"; let:0;'
                // Invalid: '"use strict"; for (x of let) {}'
                if (context & Context.Strict) this.error(Errors.InvalidStrictExpPostion, this.tokenValue);
                // fixes let let split across two lines
                if (this.flags & Flags.LineTerminator) this.error(Errors.InvalidStrictLexical);
            default:
                return this.parseIdentifierOrArrow(context & ~Context.Parenthesis, pos);
        }
    }

    private parseTemplateTail(context: Context, pos: Location): ESTree.TemplateLiteral {
        const quasis = this.parseTemplateElement(context, pos);
        return this.finishNode(pos, {
            type: 'TemplateLiteral',
            expressions: [],
            quasis: [quasis]
        });
    }

    private parseTemplateHead(context: Context, cooked: string, raw: string): ESTree.TemplateElement {
        const pos = this.getLocations();
        this.token = this.scanTemplateNext(context);
        return this.finishNode(pos, {
            type: 'TemplateElement',
            value: {
                cooked,
                raw
            },
            tail: false
        });
    }

    private parseTemplateElement(context: Context, pos: Location): ESTree.TemplateElement {
        const cooked = this.tokenValue;
        const raw = this.tokenRaw;
        this.expect(context, Token.TemplateTail);
        return this.finishNode(pos, {
            type: 'TemplateElement',
            value: {
                cooked,
                raw
            },
            tail: true
        });
    }

    private parseTaggedTemplateExpression(context: Context, expr: ESTree.Expression, quasi: any, pos: Location): ESTree.TaggedTemplateExpression {
        return this.finishNode(pos, {
            type: 'TaggedTemplateExpression',
            tag: expr,
            quasi
        });
    }

    private parseTemplate(context: Context, pos: Location): ESTree.TemplateLiteral {

        const expressions: ESTree.Expression[] = [];
        const quasis: ESTree.TemplateElement[] = [];

        while (this.token === Token.TemplateCont) {
            if (this.token === Token.RightBrace) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
            const cooked = this.tokenValue;
            const raw = this.tokenRaw;
            this.expect(context, Token.TemplateCont);
            expressions.push(this.parseExpression(context));
            quasis.push(this.parseTemplateHead(context, cooked, raw));
        }

        while (this.token === Token.TemplateTail) {
            quasis.push(this.parseTemplateElement(context, pos));
        }

        return this.finishNode(pos, {
            type: 'TemplateLiteral',
            expressions,
            quasis
        });
    }


    private parseClassDeclaration(context: Context): ESTree.ClassDeclaration {

        const pos = this.getLocations();

        this.expect(context, Token.ClassKeyword);

        let superClass: ESTree.Expression | null = null;
        let id = null;
        let classBody;
        let flags = ObjectState.None;
        const savedFlags = this.flags;

        if (this.isIdentifier(context, this.token)) {
            const name = this.tokenValue;
            if (context & Context.Statement) {
                if (!this.initBlockScope() && name in this.blockScope) {
                    if (this.blockScope !== this.functionScope || this.blockScope[name] === ScopeMasks.NonShadowable) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                }
                this.blockScope[name] = ScopeMasks.Shadowable;
            }

            // Invalid: 'export class a{}  export class a{}'
            if (context & Context.Export && this.token === Token.Identifier) this.addFunctionArg(this.tokenValue);

            id = this.parseBindingIdentifier(context | Context.Strict);
            // Valid: `export default class {};`
            // Invalid: `class {};`
        } else if (!(context & Context.OptionalIdentifier)) {
            this.error(Errors.UnNamedClassStmt);
        }

        if (this.parseOptional(context, Token.ExtendsKeyword)) {
            superClass = this.parseLeftHandSideExpression(context & ~Context.OptionalIdentifier | Context.Strict, pos);
            flags |= ObjectState.Heritage;
        }

        classBody = this.parseClassBody(context | Context.Strict, flags);
        this.flags = savedFlags;
        return this.finishNode(pos, {
            type: 'ClassDeclaration',
            id,
            superClass,
            body: classBody
        });
    }

    private parseClassExpression(context: Context): ESTree.ClassExpression {

        const pos = this.getLocations();

        this.expect(context, Token.ClassKeyword);

        let superClass: ESTree.Expression | null = null;
        let id = null;
        let classBody;
        let flags = ObjectState.None;
        const savedFlags = this.flags;

        if (this.isIdentifier(context, this.token)) {
            const name = this.tokenValue;
            if (context & Context.Statement) {
                if (!this.initBlockScope() && name in this.blockScope) {
                    if (this.blockScope !== this.functionScope || this.blockScope[name] === ScopeMasks.NonShadowable) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                }
                this.blockScope[name] = ScopeMasks.Shadowable;
            }

            id = this.isIdentifier(context, this.token) ? this.parseIdentifier(context | Context.Strict) : null;

            // Valid: `export default class {};`
            // Invalid: `class {};`
        }

        if (this.parseOptional(context, Token.ExtendsKeyword)) {
            superClass = this.parseLeftHandSideExpression(context | Context.Strict, pos);
            flags |= ObjectState.Heritage;
        }

        classBody = this.parseClassBody(context | Context.Strict, flags);
        this.flags = savedFlags;
        return this.finishNode(pos, {
            type: 'ClassExpression',
            id,
            superClass,
            body: classBody
        });
    }

    private parseClassBody(context: Context, flags: ObjectState): ESTree.ClassBody {
        const pos = this.getLocations();

        this.expect(context, Token.LeftBrace);

        const body: ESTree.MethodDefinition[] = [];

        while (this.token !== Token.RightBrace) {

            if (!this.parseOptional(context, Token.Semicolon)) {
                const node: ESTree.MethodDefinition | ESTree.Property = this.parseClassElement(context, flags);
                body.push(node);
                if (node.kind === 'constructor') context |= Context.HasConstructor;
            }
        }

        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'ClassBody',
            body
        });
    }

    private parseClassElement(context: Context, state: ObjectState): ESTree.MethodDefinition {
        const pos = this.getLocations();
        let key = null;
        let value = null;
        let token = this.token;
        let tokenValue = this.tokenValue;

        if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;

        if (!(state & ObjectState.Yield)) {

            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            if (this.tokenValue === 'constructor') state |= ObjectState.HasConstructor;

            key = this.parsePropertyName(context & ~Context.Strict);

            if (token === Token.StaticKeyword && (this.qualifiedPropertyName() || this.token === Token.Multiply)) {

                token = this.token;

                state |= ObjectState.Static;

                if (this.parseOptional(context, Token.Multiply)) {
                    state |= ObjectState.Yield;
                } else {
                    if (token === Token.LeftBracket) state |= ObjectState.Computed;
                    key = this.parsePropertyName(context);
                }
            }

            if (!(this.flags & Flags.LineTerminator) && (token === Token.AsyncKeyword)) {
                if (this.token !== Token.Colon && this.token !== Token.LeftParen) {
                    state |= ObjectState.Async;
                    token = this.token;
                    tokenValue = this.tokenValue;

                    // Asynchronous Iteration - Stage 3 proposal
                    if (!(this.flags & Flags.OptionsNext) && this.token === Token.Multiply) {
                        this.error(Errors.InvalidAsyncGenerator);
                    }
                    // Async generator
                    if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;

                    switch (this.token) {
                        case Token.LeftBracket:
                            state |= ObjectState.Computed;
                            break;
                            // Invalid: `class X { async static f() {} }`
                        case Token.StaticKeyword:
                            this.error(Errors.InvalidMethod);
                        default: // ignore
                    }

                    key = this.parsePropertyName(context);

                    if (token === Token.ConstructorKeyword) this.error(Errors.ConstructorIsAsync);
                }
            }
        }

        // MethodDeclaration
        if (this.qualifiedPropertyName()) {

            switch (token) {
                case Token.GetKeyword:
                    state |= ObjectState.Get;
                    break;
                case Token.SetKeyword:
                    state |= ObjectState.Set;
                    break;
                case Token.Multiply:
                    state |= ObjectState.Method;
                    break;
            }

            if (state & ObjectState.Async && state & ObjectState.Accessors) {
                this.error(Errors.UnexpectedToken, tokenDesc(token));
            }

            switch (this.token) {

                // '['
                case Token.LeftBracket:
                    state |= ObjectState.Computed;
                    break;

                    // 'constructor'
                case Token.ConstructorKeyword:
                    state |= ObjectState.HasConstructor;
                    break;
                default: // ignore
            }

            key = this.parsePropertyName(context);
            value = this.parseMethodDefinition(context | Context.Method, state);
        }

        if (!(state & ObjectState.Modifiers) || (key && this.token === Token.LeftParen)) {
            if (!(state & ObjectState.Yield)) {
                if (state & ObjectState.Heritage && state & ObjectState.HasConstructor) {
                    context |= Context.Constructor;
                }
            }

            value = this.parseMethodDefinition(context | Context.Method, state);
            state |= ObjectState.Method;
        }

        // Invalid: `class Foo { * }`
        if (state & ObjectState.Yield && !key) this.error(Errors.Unexpected);

        if (state & ObjectState.HasConstructor) state |= ObjectState.Special;

        if (!(state & ObjectState.Computed)) {
            if (state & ObjectState.Static && this.tokenValue === 'prototype') {
                this.error(Errors.StaticPrototype);
            }

            if (!(state & ObjectState.Static) && state & ObjectState.HasConstructor) {
                if (!(state & ObjectState.Special) || !(state & ObjectState.Method) || (value && value.generator)) this.error(Errors.ConstructorSpecialMethod);

                if (context & Context.HasConstructor) this.error(Errors.DuplicateConstructor);
                state |= ObjectState.Constructor;
            }
        }

        return this.finishNode(pos, {
            type: 'MethodDefinition',
            computed: !!(state & ObjectState.Computed),
            key,
            kind: (state & ObjectState.Constructor) ? 'constructor' : (state & ObjectState.Get) ? 'get' :
                (state & ObjectState.Set) ? 'set' : 'method',
            static: !!(state & ObjectState.Static),
            value
        });
    }

    private parseMethodDefinition(context: Context, state: ObjectState): ESTree.FunctionExpression {

        const pos = this.getLocations();

        if (Context.Yield | Context.Await) context &= ~(Context.Yield | Context.Await);

        if (state & ObjectState.Yield && !(state & ObjectState.Get)) context |= Context.Yield;
        if (state & ObjectState.Async) context |= Context.Await;

        const savedFlag = this.flags;
        const savedScope = this.enterFunctionScope();
        const params = this.parseFormalParameterList(context, state);
        const body = this.parseFunctionBody(context);
        this.flags = savedFlag;

        this.exitFunctionScope(savedScope);
        return this.finishNode(pos, {
            type: 'FunctionExpression',
            id: null,
            params,
            body,
            generator: !!(state & ObjectState.Yield),
            async: !!(state & ObjectState.Async),
            expression: false
        });
    }

    private parseObjectExpression(context: Context): ESTree.ObjectExpression {

        const pos = this.getLocations();

        const flags = ObjectState.None;

        if (this.flags & Flags.ArgumentList) this.flags |= Flags.NonSimpleParameter;

        this.expect(context, Token.LeftBrace);

        const properties: (ESTree.Property | ESTree.SpreadElement)[] = [];

        while (!this.parseOptional(context, Token.RightBrace)) {

            if (this.token === Token.Ellipsis) {
                // Object rest spread - Stage 3 proposal
                if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                properties.push(this.parseSpreadElement(context));
            } else {
                properties.push(this.parseObjectElement(context, flags));
            }
            if (this.token !== Token.RightBrace) this.parseOptional(context, Token.Comma);
        }

        return this.finishNode(pos, {
            type: 'ObjectExpression',
            properties
        });
    }

    private parseObjectElement(context: Context, state: ObjectState): ESTree.Property {
      
        const pos = this.getLocations();

        let key: ESTree.Expression | null = null;
        let value: ESTree.Expression | null = null;
        const token = this.token;
        const tokenValue = this.tokenValue;

        if (this.flags & Flags.HasUnicode) state |= ObjectState.HasConstructor;

        if (this.isIdentifier(context & ~Context.Strict, token)) {

            // AsyncMethod[Yield, Await]:
            //   async [no LineTerminator here] PropertyName[?Yield, ?Await] ...
            //
            //  AsyncGeneratorMethod[Yield, Await]:
            //    async [no LineTerminator here] * PropertyName[?Yield, ?Await] ...
            //
            // PropertyName:
            //   LiteralPropertyName
            //   ComputedPropertyName[?Yield, ?Await]
            //
            // LiteralPropertyName:
            //   IdentifierName
            //   StringLiteral
            //   NumericLiteral
            //
            // ComputedPropertyName[Yield, Await]:
            //   [ ...
            this.nextToken(context);

            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;

            if (!(this.flags & Flags.LineTerminator) && (token === Token.AsyncKeyword) && this.isAsync(this.token)) {

                state |= ObjectState.Async;

                // Asynchronous Iteration - Stage 3 proposal
                if (!(this.flags & Flags.OptionsNext) && this.token === Token.Multiply) this.error(Errors.InvalidAsyncGenerator);
                if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;
                key = this.parsePropertyName(context);

            } else {
                key = this.finishNode(pos, {
                    type: 'Identifier',
                    name: tokenValue
                });
            }

        } else if (this.parseOptional(context, Token.Multiply)) {
            state |= ObjectState.Yield;
        } else {
            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            key = this.parsePropertyName(context);
        }

        if (this.qualifiedPropertyName()) {

            switch (token) {
                case Token.GetKeyword:
                    // `({ g\\u0065t m() {} })`
                    if (state & ObjectState.HasConstructor) this.error(Errors.InvalidEscapedReservedWord);
                    state |= ObjectState.Get;
                    break;
                case Token.SetKeyword:
                    // `({ s\\u0065t m(v) {} })`
                    if (state & ObjectState.HasConstructor) this.error(Errors.InvalidEscapedReservedWord);
                    state |= ObjectState.Set;
                    break;
                case Token.Multiply:
                    state |= ObjectState.Method;
                    break;
                default: // ignore;
            }

            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            key = this.parsePropertyName(context);
            value = this.parseMethodDefinition(context | Context.Method, state);

        } else {

            if (!key) this.error(Errors.Unexpected);

            switch (this.token) {

                // ':'
                case Token.Colon:

                    if (state & (ObjectState.Yield | ObjectState.Async)) this.error(Errors.BadPropertyId);

                    if (!(state & ObjectState.Computed) && tokenValue === '__proto__') {
                        if (this.flags & Flags.HasPrototype) this.error(Errors.DuplicateProtoProperty);
                        this.flags |= Flags.HasPrototype;
                    }

                    this.expect(context, Token.Colon);

                    // Invalid: `async ({a: await}) =>  1`
                    if (this.flags & Flags.AsyncArrow && this.token === Token.AwaitKeyword) {
                        this.error(Errors.UnexpectedStrictReserved);
                    }

                    value = this.parseAssignmentExpression(context);

                    if (context & Context.Strict && this.isEvalOrArguments((value as ESTree.Identifier).name)) {
                        this.error(Errors.UnexpectedStrictReserved);
                    }
                    break;

                    // '('
                case Token.LeftParen:

                    value = this.parseMethodDefinition(context | Context.Method, state);
                    state |= ObjectState.Method;
                    break;

                default:

                    if (this.isIdentifier(context , token)) {

                        // Invalid: `"use strict"; for ({ eval } of [{}]) ;`
                        if (context & Context.Strict && this.isEvalOrArguments(tokenValue)) this.error(Errors.UnexpectedReservedWord);
                        // Invalid: '({async foo() { return {await} }})'
                        if (token === Token.AwaitKeyword) this.error(Errors.UnexpectedToken, tokenDesc(token));
                        if (context & Context.Yield &&
                            this.flags & Flags.InFunctionBody &&
                            context & Context.Parenthesis &&
                            token === Token.YieldKeyword) this.error(Errors.DisallowedInContext, tokenValue);

                        const id = this.finishNode(pos, {
                            type: 'Identifier',
                            name: tokenValue
                        });

                        if (this.parseOptional(context, Token.Assign)) {

                            // Invalid: '({ async f = function() {} })'
                            if (state & (ObjectState.Yield | ObjectState.Async)) this.error(Errors.BadPropertyId);
                            state |= ObjectState.Shorthand;
                            // Invalid: 'function*g() { ({yield = 0} = 0); }'
                            if (context & Context.Yield &&
                                this.flags & Flags.InFunctionBody &&
                                token === Token.YieldKeyword) this.error(Errors.DisallowedInContext, tokenValue);
                            const init = this.parseAssignmentExpression(context);
                            value = this.finishNode(pos, {
                                type: 'AssignmentPattern',
                                left: id,
                                right: init
                            });

                            // shorthand
                        } else {

                            state |= ObjectState.Shorthand;
                            value = id;
                        }
                    } else {
                        this.error(Errors.Unexpected);
                    }
            }
        }

        return this.finishNode(pos, {
            type: 'Property',
            key,
            value,
            kind: !(state & ObjectState.Accessors) ? 'init' : (state & ObjectState.Set) ? 'set' : 'get',
            computed: !!(state & ObjectState.Computed),
            method: !!(state & ObjectState.Method),
            shorthand: !!(state & ObjectState.Shorthand)
        });
    }

    private parseRegularExpression(context: Context): ESTree.RegExpLiteral {

        const pos = this.getLocations();
        const regex = this.tokenRegExp;
        const value = this.tokenValue;
        const raw = this.tokenRaw;

        this.nextToken(context);

        const node = this.finishNode(pos, {
            type: 'Literal',
            value: value,
            regex
        });

        if (this.flags & Flags.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseBigIntLiteral(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        const value = this.tokenValue;
        const raw = this.tokenRaw;

        this.nextToken(context);

        const node = this.finishNode(pos, {
            type: 'Literal',
            value,
            bigint: raw
        });

        if (this.flags & Flags.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseLiteral(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        const value = this.tokenValue;
        const raw = this.tokenRaw;

        if (context & Context.Strict && this.flags & Flags.Noctal) this.error(Errors.Unexpected);

        this.nextToken(context);

        const node = this.finishNode(pos, {
            type: 'Literal',
            value
        });

        if (this.flags & Flags.OptionsRaw) node.raw = raw;

        return node;
    }

    private parseIdentifier(context: Context): ESTree.Identifier {
        const name = this.tokenValue;
        const pos = this.getLocations();
        if (this.token === Token.AwaitKeyword) {
            if (context & Context.Await || this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }
        if (!(this.flags & Flags.InFunctionBody) && this.token === Token.YieldKeyword) {
            if (this.flags & Flags.HasUnicode) this.error(Errors.InvalidEscapedReservedWord);
        }
        this.nextToken(context);

        return this.finishNode(pos, {
            type: 'Identifier',
            name
        });
    }

    private parseFalseExpression(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        this.nextToken(context);
        const node = this.finishNode(pos, {
            type: 'Literal',
            value: false
        });

        if (this.flags & Flags.OptionsRaw) node.raw = 'false';

        return node;
    }

    private parseTrueExpression(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        this.nextToken(context);
        const node = this.finishNode(pos, {
            type: 'Literal',
            value: true
        });

        if (this.flags & Flags.OptionsRaw) node.raw = 'true';

        return node;
    }

    private parseThisExpression(context: Context): ESTree.ThisExpression {
        const pos = this.getLocations();
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'ThisExpression'
        });
    }

    private parseNullExpression(context: Context): ESTree.Literal {
        const pos = this.getLocations();
        this.nextToken(context);
        const node = this.finishNode(pos, {
            type: 'Literal',
            value: null
        });

        if (this.flags & Flags.OptionsRaw) node.raw = 'null';
        return node;
    }

    /****
     * Scope
     */

    // Fast path for catch arguments
    private addCatchArg(name: string, type: ScopeMasks = ScopeMasks.Shadowable) {
        this.initBlockScope();
        this.blockScope[name] = type;
    }

    private initBlockScope(): boolean {
        if (this.functionScope == null) {
            this.functionScope = Object.create(null);
            this.blockScope = Object.create(this.functionScope);
            this.parentScope = this.blockScope;
        } else if (this.blockScope == null) {
            this.blockScope = Object.create(this.parentScope);
            this.parentScope = this.blockScope;
        } else {
            return false;
        }

        return true;
    }

    private initFunctionScope(): boolean {
        if (this.functionScope !== undefined) return false;
        this.functionScope = Object.create(null);
        this.blockScope = this.functionScope;
        this.parentScope = this.functionScope;
        return true;
    }

    private addFunctionArg(name: string) {
        if (!this.initFunctionScope() && name in this.functionScope) this.error(Errors.DuplicateIdentifier, name);
        this.functionScope[name] = ScopeMasks.Shadowable;
    }

    private addVarOrBlock(context: Context, name: string) {
        if (context & Context.Lexical) {
            this.addBlockName(name);
        } else {
            this.addVarName(name);
        }
    }

    private addVarName(name: string) {
        if (!this.initFunctionScope() && this.blockScope !== undefined &&
            this.blockScope[name] === ScopeMasks.NonShadowable) {
            this.error(Errors.DuplicateIdentifier, name);
        }
        this.functionScope[name] = ScopeMasks.Shadowable;
    }

    private addBlockName(name: string) {
        switch (name) {
            case 'Infinity':
            case 'NaN':
            case 'undefined':
                this.error(Errors.DuplicateIdentifier, name);
            default: // ignore
        }

        if (!this.initBlockScope() && (
                // Check `var` variables
                this.blockScope[name] === ScopeMasks.Shadowable ||
                // Check variables in current block only
                hasOwn.call(this.blockScope, name)
            )) {
            this.error(Errors.DuplicateIdentifier, name);
        }

        this.blockScope[name] = ScopeMasks.NonShadowable;
    }

    private enterFunctionScope() {

        const functionScope = this.functionScope;
        const blockScope = this.blockScope;
        const parentScope = this.parentScope;

        this.functionScope = undefined;
        this.blockScope = undefined;
        this.parentScope = undefined;

        return {
            functionScope,
            blockScope,
            parentScope
        };
    }

    private exitFunctionScope(t: any) {
        this.functionScope = t.functionScope;
        this.blockScope = t.blockScope;
        this.parentScope = t.parentScope;
    }

    /** V8 */

    private parseDoExpression(context: Context): ESTree.Expression {
        const pos = this.getLocations();
        this.expect(context, Token.DoKeyword);
        const body = this.parseBlockStatement(context);
        return this.finishNode(pos, {
            type: 'DoExpression',
            body
        });
    }

    /** JSX */

    private isValidJSXIdentifier(t: Token): boolean {
        return (t & Token.Identifier) === Token.Identifier || (t & Token.Contextual) === Token.Contextual || (t & Token.Keyword) === Token.Keyword;
    }

    private parseJSXIdentifier(context: Context): ESTree.JSXIdentifier {
        if (!(this.isValidJSXIdentifier(this.token))) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        const name = this.tokenValue;
        const pos = this.getLocations();
        this.nextToken(context);
        return this.finishNode(pos, {
            type: 'JSXIdentifier',
            name
        });
    }

    private parseJSXMemberExpression(context: Context, expr: any, pos: Location): ESTree.JSXMemberExpression {
        return this.finishNode(pos, {
            type: 'JSXMemberExpression',
            object: expr,
            property: this.parseJSXIdentifier(context)
        });
    }

    private parseJSXElementName(context: Context): ESTree.Node {
        const pos = this.getLocations();

        this.scanJSXIdentifier(context);
        // Parse in a 'JSXChild' context to avoid edge cases
        // like `<a>= == =</a>` where '>=' will be seen as an
        // punctuator.
        let expression: ESTree.JSXIdentifier | ESTree.JSXMemberExpression = this.parseJSXIdentifier(context | Context.JSXChild);

        // Namespace
        if (this.token === Token.Colon) return this.parseJSXNamespacedName(context, expression, pos);

        // Member expression
        while (this.parseOptional(context, Token.Period)) {
            expression = this.parseJSXMemberExpression(context, expression, pos);
        }

        return expression;
    }

    private parseJSXNamespacedName(
        context: Context,
        namespace: ESTree.JSXIdentifier | ESTree.JSXMemberExpression,
        pos: Location
    ): ESTree.JSXNamespacedName {
        this.expect(context, Token.Colon);
        const name = this.parseJSXIdentifier(context);
        return this.finishNode(pos, {
            type: 'JSXNamespacedName',
            namespace,
            name
        });
    }

    private parseJSXSpreadAttribute(context: Context) {
        const pos = this.getLocations();
        this.expect(context, Token.LeftBrace);
        this.expect(context, Token.Ellipsis);
        const expression = this.parseExpression(context);
        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'JSXSpreadAttribute',
            argument: expression
        });
    }

    private scanJSXString(): Token {
        const rawStart = this.index;
        const quote = this.nextChar();
        this.advance();
        let ret = '';
        const start = this.index;
        let ch;

        while (ch !== quote) {
            switch (ch) {
                case Chars.CarriageReturn:
                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    this.error(Errors.UnterminatedString);
                default: // ignore
            }

            this.advance();
            ch = this.nextChar();
        }

        // check for unterminated string
        if (ch !== quote) this.error(Errors.UnterminatedString);

        if (start !== this.index) ret += this.source.slice(start, this.index);

        this.advance(); // skip the quote

        this.tokenValue = ret;

        // raw
        if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(rawStart, this.index);

        return Token.StringLiteral;
    }

    private scanJSXAttributeValue(context: Context): Token | undefined {

        this.startPos = this.index;
        this.startColumn = this.column;
        this.startLine = this.line;

        switch (this.nextChar()) {
            case Chars.DoubleQuote:
            case Chars.SingleQuote:
                return this.scanJSXString();
            default:
                this.nextToken(context);
        }
    }

    private parseJSXEmptyExpression(): ESTree.JSXEmptyExpression {
        // For empty JSX Expressions the 'endPos' need to become
        // the 'startPos' and the other way around
        return this.finishNodeAt(this.endPos, this.startPos, {
            type: 'JSXEmptyExpression'
        });
    }

    private parseJSXSpreadChild(context: Context): ESTree.JSXSpreadChild {
        const pos = this.getLocations();
        this.expect(context, Token.Ellipsis);
        const expression = this.parseExpression(context);
        this.expect(context, Token.RightBrace);
        return this.finishNode(pos, {
            type: 'JSXSpreadChild',
            expression
        });
    }

    private parseJSXExpressionContainer(context: Context): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {

        const pos = this.getLocations();

        this.expect(context, Token.LeftBrace);

        let expression;

        switch (this.token) {

            // '...'
            case Token.Ellipsis:
                return this.parseJSXSpreadChild(context);

                // '}'
            case Token.RightBrace:
                expression = this.parseJSXEmptyExpression();
                break;

            default:
                expression = this.parseAssignmentExpression(context);
        }

        this.token = this.scanJSXToken();

        return this.finishNode(pos, {
            type: 'JSXExpressionContainer',
            expression
        });
    }

    private parseJSXExpressionAttribute(context: Context): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {

        const pos = this.getLocations();

        this.expect(context, Token.LeftBrace);

        switch (this.token) {
            case Token.RightBrace:
                this.error(Errors.NonEmptyJSXExpression);
            case Token.Ellipsis:
                return this.parseJSXSpreadChild(context);
            default: // ignore
        }

        const expression = this.parseAssignmentExpression(context);

        this.expect(context, Token.RightBrace);

        return this.finishNode(pos, {
            type: 'JSXExpressionContainer',
            expression
        });
    }

    private parseJSXAttributeName(context: Context): ESTree.JSXIdentifier | ESTree.JSXNamespacedName {
        const pos = this.getLocations();
        const identifier: ESTree.JSXIdentifier = this.parseJSXIdentifier(context);
        if (this.token !== Token.Colon) return identifier;
        return this.parseJSXNamespacedName(context, identifier, pos);
    }

    private parseJSXAttribute(context: Context): ESTree.JSXAttribute {

        const pos = this.getLocations();
        let value = null;
        const attrName = this.parseJSXAttributeName(context);

        switch (this.token) {
            case Token.Assign:
                switch (this.scanJSXAttributeValue(context)) {
                    case Token.StringLiteral:
                        value = this.parseLiteral(context);
                        break;
                    default:
                        value = this.parseJSXExpressionAttribute(context);
                }
            default: // ignore
        }

        return this.finishNode(pos, {
            type: 'JSXAttribute',
            value,
            name: attrName
        });
    }

    private parseJSXAttributes(context: Context): ESTree.JSXAttribute[] {

        const attributes: ESTree.JSXAttribute[] = [];

        loop:
            while (this.hasNext()) {

                switch (this.token) {

                    // '/'
                    case Token.Divide:

                        // `>`
                    case Token.GreaterThan:
                        break loop;

                        // `{`
                    case Token.LeftBrace:
                        attributes.push(this.parseJSXSpreadAttribute(context &= ~Context.JSXChild));
                        break;

                    default:
                        attributes.push(this.parseJSXAttribute(context));
                }
            }

        return attributes;
    }

    private scanJSXToken(): Token {

        // Set 'endPos' and 'startPos' to current index
        this.endPos = this.startPos = this.index;

        if (!this.hasNext()) return Token.EndOfSource;

        const next = this.nextChar();

        if (next === Chars.LessThan) {
            this.advance();
            if (!this.consume(Chars.Slash)) return Token.LessThan;
            return Token.JSXClose;
        }

        if (next === Chars.LeftBrace) {
            this.advance();
            return Token.LeftBrace;
        }

        scan:
            while (this.hasNext()) {
                switch (this.nextChar()) {
                    case Chars.LeftBrace:
                    case Chars.LessThan:
                        break scan;
                    default:
                        this.advance();
                }
            }

        return Token.Identifier;
    }

    private parseJSXOpeningElement(context: Context) {
        const pos = this.getLocations();

        this.expect(context, Token.LessThan);
        const tagName = this.parseJSXElementName(context);

        const attributes = this.parseJSXAttributes(context);

        const selfClosing = this.token === Token.Divide;

        switch (this.token) {

            case Token.GreaterThan:
                this.token = this.scanJSXToken();
                break;

            case Token.Divide:

                this.expect(context, Token.Divide);

                // Because advance() (called by nextToken() called by expect()) expects
                // there to be a valid token after >, it needs to know whether to
                // look for a standard JS token or an JSX text node
                if (context & Context.JSXChild) {

                    this.expect(context, Token.GreaterThan);
                } else {
                    this.token = this.scanJSXToken();
                }

            default: // ignore
        }

        return this.finishNode(pos, {
            type: 'JSXOpeningElement',
            name: tagName,
            attributes,
            selfClosing
        });
    }

    private parseJSXClosingElement(context: Context) {

        const pos = this.getLocations();
        this.expect(context, Token.JSXClose);
        const name = this.parseJSXElementName(context);
        // Because advance() (called by nextToken() called by expect()) expects there
        // to be a valid token after >, it needs to know whether to look for a
        // standard JS token or an JSX text node
        if (context & Context.JSXChild) {
            this.expect(context, Token.GreaterThan);
        } else {
            this.token = this.scanJSXToken();
        }

        return this.finishNode(pos, {
            type: 'JSXClosingElement',
            name
        });
    }

    private parseJSXElement(context: Context): ESTree.JSXElement {

        const pos = this.getLocations();
        const children: (ESTree.JSXText | ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild | ESTree.JSXElement | undefined)[] = [];
        let closingElement = null;

        const openingElement = this.parseJSXOpeningElement(context);

        if (!openingElement.selfClosing) {

            loop: while (this.hasNext()) {
                switch (this.token) {
                    case Token.JSXClose:
                        break loop;
                    default:
                        children.push(this.parseJSXChild(context | Context.JSXChild));
                }
            }

            closingElement = this.parseJSXClosingElement(context);

            const open = getQualifiedJSXName(openingElement.name);
            const close = getQualifiedJSXName(closingElement.name);

            if (open !== close) this.error(Errors.ExpectedJSXClosingTag, close);
        }

        return this.finishNode(pos, {
            type: 'JSXElement',
            children,
            openingElement,
            closingElement,
        });
    }

    private parseJSXText(context: Context): ESTree.JSXText {
        const pos = this.getLocations();
        const value = this.source.slice(this.startPos, this.index);

        this.token = this.scanJSXToken();

        const node = this.finishNode(pos, {
            type: 'JSXText',
            value
        });

        if (this.flags & Flags.OptionsRaw) node.raw = value;

        return node;
    }

    private parseJSXChild(
        context: Context
    ): ESTree.JSXText | ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild | ESTree.JSXElement | undefined {
        switch (this.token) {

            // 'abc'
            case Token.Identifier:
                return this.parseJSXText(context);

                // '{'
            case Token.LeftBrace:
                return this.parseJSXExpressionContainer(context &= ~Context.JSXChild);
                // '<'
            case Token.LessThan:
                return this.parseJSXElement(context &= ~Context.JSXChild);

            default:
                this.error(Errors.Unexpected);
        }
    }
}
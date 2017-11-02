import { Chars } from './chars';
import * as ESTree from './estree';
import { hasOwn, toHex, tryCreate, fromCodePoint, hasMask, isPrologueDirective } from './common';
import { isValidDestructuringAssignmentTarget, isQualifiedJSXName, isValidSimpleAssignmentTarget } from './validate';
import { Flags, Context, RegExpState, RegExpFlag, ScopeMasks, ObjectState, Scanner, ParenthesizedState, IterationState, NumberState, ArrayState, Escape } from './masks';
import { Token, tokenDesc, descKeyword } from './token';
import { createError, Errors } from './errors';
import { isValidIdentifierStart, isvalidIdentifierContinue, isIdentifierStart, isIdentifierPart } from './unicode';
import { Options, SavedState, Delegate, Location, EmitComments } from './interface';
export class Parser {
    
        // The program to be parsed
        private readonly source: string;
    
        // Current position (end position of text of current token)
        private index: number;
    
        // Current position (end position of column of current token)
        private column: number;
    
        // Current position (end position of line of current token)
        private line: number;
    
        // Start position of whitespace before current token
        private startIndex: number;
    
        // Start position of whitespace before current column
        private startColumn: number;
    
        // Start position of whitespace before current line
        private startLine: number;
    
        // End position of source of current index
        private lastIndex: number;
    
        // End position of column of current column
        private lastColumn: number;
    
        // End position of line of current line
        private lastLine: number;
    
        // Contains the current value of parsed source
        private tokenValue: any;
    
        // Hold current token
        private token: Token;
    
        // Raw value of current token
        private tokenRaw: string;
    
        // Mutable parser flags
        private flags: Flags;
    
        private labelSet: any;
        private blockScope: any;
        private parentScope: any;
        private functionScope: any;
        private errorLocation: void | Location;
        private comments: EmitComments;
        private delegate: any;
        private locSource: void | string;
        private lastChar: void | Chars;
        private firstProto: void | boolean;
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
            this.lastIndex = 0;
            this.lastColumn = 0;
            this.lastLine = 0;
            this.startIndex = 0;
            this.startColumn = 0;
            this.startLine = 0;
            this.tokenRaw = '';
            this.token = 0;
            this.tokenValue = undefined;
            this.labelSet = undefined;
            this.errorLocation = undefined;
            this.tokenRegExp = undefined;
            this.functionScope = undefined;
            this.blockScope = undefined;
            this.parentScope = undefined;
            this.comments = undefined;
            this.delegate = undefined;
            this.lastChar = undefined;
            this.firstProto = undefined;
    
            if (options.next) this.flags |= Flags.OptionsNext;
            if (options.comments) this.flags |= Flags.OptionsComments;
            if (options.delegate) this.flags |= Flags.OptionsDelegate;
            if (options.jsx) this.flags |= Flags.OptionsJSX;
            if (options.locations) this.flags |= Flags.OptionsLoc;
            if (options.source) this.flags |= Flags.OptionsSource;
            if (options.ranges) this.flags |= Flags.OptionsRanges;
            if (options.raw) this.flags |= Flags.OptionsRaw;
            if (options.globalReturn) this.flags |= Flags.OptionsGlobalReturn;
            if (options.directives) this.flags |= Flags.OptionsDirectives;
            if (options.v8) this.flags |= Flags.OptionsV8;
    
            if (this.flags & Flags.OptionsComments) this.comments = options.comments;
            if (this.flags & Flags.OptionsDelegate) this.delegate = options.delegate;
            if (this.flags & (Flags.OptionsLoc | Flags.OptionsSource)) this.locSource = String(options.source);
        }
    
        public parse(context: Context): ESTree.Program {
    
            this.nextToken(context);
    
            const body = context & Context.Module ?
                this.parseModuleItemList(context | Context.AllowIn) :
                this.parseStatementList(context, Token.EndOfSource);
    
            const node: ESTree.Program = {
                type: 'Program',
                body,
                sourceType: context & Context.Module ? 'module' : 'script'
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
            if (this.errorLocation) throw createError(type, this.errorLocation, ...params);
            throw createError(type, this.getLocations(), ...params);
        }
    
        // Throw an unexpected token error
        private throwUnexpectedToken() {
            this.error(Errors.UnexpectedToken, tokenDesc(this.token));
        }
    
        private saveState(): SavedState {
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
    
        private rewindState(state: SavedState) {
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
    
        private nextToken(context: Context) {
            this.token = this.scanToken(context);
        }
    
        private hasNext(): boolean {
            return this.index < this.source.length;
        }
    
        private nextChar(): Chars {
            return this.source.charCodeAt(this.index);
        }
    
        private storeRaw(start: number) {
            this.tokenRaw = this.source.slice(start, this.index);
        }
    
        private scanNext(ch: Chars, err: Errors = Errors.UnterminatedString): Chars {
            this.advance();
            if (ch & 0x10000) this.index++;
            if (!this.hasNext()) this.error(err);
            return this.nextUnicodeChar();
        }
    
        private nextUnicodeChar() {
            let index = this.index;
            const hi = this.source.charCodeAt(index++);
    
            if (hi < 0xd800 || hi > 0xdbff) return hi;
            if (index === this.source.length) return hi;
            const lo = this.source.charCodeAt(index);
    
            if (lo < 0xdc00 || lo > 0xdfff) return hi;
            return (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
        }
    
        private advance() {
            this.index++;
            this.column++;
        }
    
        private advanceNewline() {
            this.index++;
            this.column = 0;
            this.line++;
        }
    
        private consumeLineFeed(state: Scanner) {
            this.index++;
            if (!(state & Scanner.LastIsCR)) {
                this.column = 0;
                this.line++;
            }
        }
    
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
    
            this.lastIndex = this.index;
            this.lastColumn = this.column;
            this.lastLine = this.line;
    
            let state = this.index === 0 ? Scanner.LineStart : Scanner.None;
    
            while (this.hasNext()) {
    
                this.startIndex = this.index;
                this.startColumn = this.column;
                this.startLine = this.line;
    
                const first = this.nextChar();
    
                switch (first) {
    
                    case Chars.CarriageReturn:
                        state |= Scanner.LastIsCR | Scanner.LineStart;
                        this.flags |= Flags.LineTerminator;
                        this.advanceNewline();
                        continue;
    
                    case Chars.LineFeed:
                        this.consumeLineFeed(state);
                        this.flags |= Flags.LineTerminator;
                        state = state & ~Scanner.LastIsCR | Scanner.LineStart;
                        continue;
    
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        state = state & ~Scanner.LastIsCR | Scanner.LineStart;
                        this.flags |= Flags.LineTerminator;
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
    
                            if (this.consume(Chars.Slash)) {
                                this.skipComments(state | Scanner.SingleLine);
                                continue;
                            } else if (this.consume(Chars.Asterisk)) {
                                this.skipComments(state | Scanner.MultiLine);
                                continue;
                            } else if (this.consume(Chars.EqualSign)) {
                                return Token.DivideAssign;
                            }
    
                            return Token.Divide;
                        }
    
                        // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
                    case Chars.LessThan:
                        {
                            this.advance();
    
                            let next = this.nextChar();
    
                            if (!(context & Context.Module) && next === Chars.Exclamation) {
                                this.advance();
                                if (this.consume(Chars.Hyphen) &&
                                    this.consume(Chars.Hyphen)) {
                                    this.skipComments(state | Scanner.SingleLine);
                                }
                                continue;
                            }
    
                            switch (next) {
                                case Chars.LessThan:
                                    this.advance();
                                    if (this.consume(Chars.EqualSign)) {
                                        return Token.ShiftLeftAssign;
                                    }
                                    return Token.ShiftLeft;
                                case Chars.EqualSign:
                                    this.advance();
                                    return Token.LessThanOrEqual;
                                case Chars.Slash:
                                    {
    
                                        if (!(this.flags & Flags.OptionsJSX)) return Token.LessThan;
                                        this.advance();
                                        return Token.JSXClose;
                                    }
                                default:
                                    return Token.LessThan;
                            }
                        }
    
                        // -, --, -->, -=,
                    case Chars.Hyphen:
                        {
                            this.advance(); // skip '-'
    
                            const next = this.nextChar();
    
                            if (next === Chars.Hyphen) {
                                this.advance();
                                if (context & Context.Module || !(state & Scanner.LineStart)) return Token.Decrement;
                                if (!this.consume(Chars.GreaterThan)) return Token.Decrement;
                                this.skipComments(state | Scanner.SingleLine);
                                continue;
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
                            if (state & Scanner.LineStart &&
                                this.source.charCodeAt(this.index + 1) === Chars.Exclamation) {
                                this.index += 2;
                                this.column += 2;
                                this.skipComments(state);
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
                        return this.scanTemplate(context, first);
    
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
    
                            const nextChar = this.source.charCodeAt(index);
    
                            if (index < this.source.length && nextChar >= Chars.Zero && nextChar <= Chars.Seven) {
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
                        return this.scanIdentifierOrKeyword(context);
                    default:
                        if (isValidIdentifierStart(first)) return this.scanUnicodeIdentifier(context);
                        if (first >= 0x0D800 && first <= 0x0DBFF) return this.scanSurrogate(context, first);
                        this.error(Errors.Unexpected);
                }
            }
    
            return Token.EndOfSource;
        }
    
        /**
         * Skips single line, shebang and multiline comments
         *
         * @param state Scanner
         */
        private skipComments(state: Scanner) {
    
            const start = this.index;
    
            // It's only pre-closed for shebang and single line comments
            if (!(state & Scanner.MultiLine)) state |= Scanner.Closed;
    
            loop:
                while (this.hasNext()) {
    
                    switch (this.nextChar()) {
    
                        // Line Terminators
                        case Chars.CarriageReturn:
                            this.flags |= Flags.LineTerminator;
                            this.advanceNewline();
                            state |= Scanner.LineStart | Scanner.LastIsCR;
                            if (!(state & Scanner.MultiLine)) break loop;
                            break;
    
                        case Chars.LineFeed:
                            this.flags |= Flags.LineTerminator;
                            this.consumeLineFeed(state);
                            state = state & ~Scanner.LastIsCR | Scanner.LineStart;
                            if (!(state & Scanner.MultiLine)) break loop;
                            break;
    
                        case Chars.LineSeparator:
                        case Chars.ParagraphSeparator:
                            state = state & ~Scanner.LastIsCR | Scanner.LineStart;
                            this.flags |= Flags.LineTerminator;
                            this.advanceNewline();
                            break;
    
                        case Chars.Asterisk:
                            if (state & Scanner.MultiLine) {
                                this.advance();
                                state &= ~Scanner.LastIsCR;
                                if (this.consume(Chars.Slash)) {
                                    state |= Scanner.Closed;
                                    break loop;
                                }
                                break;
                            }
    
                        default:
                            this.advance();
                    }
                }
    
            if (!(state & Scanner.Closed)) this.error(Errors.UnterminatedComment);
    
            if (state & Scanner.Collectable && this.flags & Flags.OptionsComments) {
                let loc = {};
                let commentStart;
                let commentEnd;
                let type = state & Scanner.MultiLine ? 'Block' : 'Line';
                let value = this.source.slice(start, state & Scanner.MultiLine ? this.index - 2 : this.index);
    
                if (this.flags & Flags.OptionsLoc) {
                    loc = {
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
    
                if (this.flags & Flags.OptionsRanges) {
                    commentStart = this.startIndex;
                    commentEnd = this.index;
                }
    
                if (typeof this.comments === 'function') {
                    this.comments(type, value, commentStart as any, commentEnd as any, loc);
                } else if (Array.isArray(this.comments)) {
    
                    const node: any = {
                        type,
                        value,
                        start: commentStart,
                        end: commentEnd,
                        loc
                    };
    
                    if (this.flags & Flags.OptionsDelegate) {
                        this.delegate(node, commentStart, commentEnd, loc);
                    }
    
                    this.comments.push(node);
                }
            }
        }
    
        private scanIdentifierOrKeyword(context: Context): Token {
            const ret = this.scanIdentifier(context);
    
            if (this.flags & Flags.HasUnicode && ret === 'target') {
                this.error(Errors.UnexpectedEscapedKeyword);
            }
    
            const len = ret.length;
            this.tokenValue = ret;
    
            // Reserved words are between 2 and 11 characters long and start with a lowercase letter
            if (len >= 2 && len <= 11) {
                const token = descKeyword(ret);
                if (token > 0) {
                    return token;
                }
            }
            return Token.Identifier;
        }
    
        private scanSurrogate(context: Context, first: Chars): Token {
    
            const surrogateTail = this.source.charCodeAt(this.index + 1);
    
            if (!isIdentifierStart(((first - 0x0d800) << 10) + (this.source.charCodeAt(this.index + 1) - 0x0dc00) + 0x010000)) {
                this.error(Errors.Unexpected);
            }
    
            this.index += 2;
            this.column += 2;
            this.tokenValue = this.scanIdentifier(context, String.fromCharCode(first) + String.fromCharCode(surrogateTail));
    
            return Token.Identifier;
        }
    
        private scanUnicodeIdentifier(context: Context): Token {
            const ret = this.scanIdentifier(context);
            this.tokenValue = ret;
            return Token.Identifier;
        }
    
        private scanIdentifier(context: Context, ret = ''): string {
    
            let start = this.index;
    
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
                            if (!isIdentifierPart(code)) break loop;
                            this.advance();
                    }
                }
    
            if (start < this.index) ret += this.source.slice(start, this.index);
            return ret;
        }
    
        /**
         * Peek unicode escape
         */
        private peekUnicodeEscape(): Chars {
            this.advance();
            const code = this.peekExtendedUnicodeEscape();
    
            if (code >= 0xd800 && code <= 0xdc00) {
                this.error(Errors.UnexpectedSurrogate);
            }
    
            if (!isvalidIdentifierContinue(code)) {
                this.error(Errors.InvalidUnicodeEscapeSequence);
            }
    
            this.advance();
            return code;
        }
    
        private peekExtendedUnicodeEscape(): Chars {
            this.advance();
            let ch = this.nextChar();
            let code = 0;
    
            // '\u{DDDDDDDD}'
            if (ch === Chars.LeftBrace) { // {
    
                ch = this.scanNext(ch, Errors.InvalidHexEscapeSequence);
    
                // At least, one hex digit is required.
                if (ch === Chars.RightBrace) {
                    this.error(Errors.InvalidHexEscapeSequence);
                }
    
                while (ch !== Chars.RightBrace) {
                    const digit = toHex(ch);
                    if (digit < 0) this.error(Errors.InvalidHexEscapeSequence);
                    code = (code << 4) | digit;
    
                    if (code > Chars.LastUnicodeChar) this.error(Errors.UnicodeOutOfRange);
    
                    // At least one digit is expected
                    ch = this.scanNext(ch, Errors.InvalidHexEscapeSequence);
                }
    
                return code;
            }
    
            if (this.index + 3 > this.source.length) {
                this.error(Errors.InvalidUnicodeEscapeSequence);
            }
    
            // '\uDDDD'    
            code = toHex(ch);
    
            if (code < 0) this.error(Errors.InvalidHexEscapeSequence);
    
            for (let i = 0; i < 3; i++) {
                ch = this.scanNext(ch, Errors.InvalidHexEscapeSequence);
                const digit = toHex(ch);
                if (code < 0) this.error(Errors.InvalidHexEscapeSequence);
                code = code << 4 | digit;
            }
    
            return code;
        }
    
        private scanNumberLiteral(context: Context): Token {
    
            if (context & Context.Strict) this.error(Errors.StrictOctalEscape);
    
            this.flags |= Flags.Noctal;
    
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
    
            if (this.flags & Flags.OptionsRaw) this.storeRaw(this.startIndex);
    
            this.tokenValue = isDecimal ? parseInt(this.source.slice(this.startIndex, this.index), 10) : code;
            return Token.NumericLiteral;
        }
    
        private scanOctalDigits(context: Context): Token {
    
            this.index += 2;
            this.column += 2;
    
            let ch = this.nextChar();
            let code = ch - Chars.Zero;
    
            // we must have at least one octal digit after 'o'/'O'
            if (ch < Chars.Zero || ch >= Chars.Eight) this.error(Errors.InvalidBinaryDigit);
    
            this.advance();
    
            while (this.hasNext()) {
                ch = this.nextChar();
                if (!(Chars.Zero <= ch && ch <= Chars.Seven)) break;
                code = (code << 3) | (ch - Chars.Zero);
                this.advance();
            }
    
            this.tokenValue = code;
    
            if (this.flags & Flags.OptionsNext && this.consume(Chars.LowerN)) this.flags |= Flags.BigInt;
    
            if (this.flags & Flags.OptionsRaw) this.storeRaw(this.startIndex);
    
            return Token.NumericLiteral;
        }
    
        private scanHexadecimalDigit() {
    
            this.index += 2;
            this.column += 2;
    
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
    
            if (this.flags & Flags.OptionsRaw) this.storeRaw(this.startIndex);
            return Token.NumericLiteral;
        }
    
        private scanBinaryDigits(context: Context): Token {
    
            this.index += 2;
            this.column += 2;
    
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
    
            if (this.flags & Flags.OptionsRaw) this.storeRaw(this.startIndex);
    
            return Token.NumericLiteral;
        }
    
        private advanceAndSkipDigits() {
            this.advance();
            this.skipDigits();
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
            let state = NumberState.None;
    
            this.skipDigits();
    
            if (this.nextChar() === Chars.Period) {
                state |= NumberState.Float;
                this.advanceAndSkipDigits();
            }
    
            let end = this.index;
    
            let cp = this.nextChar();
    
            switch (cp) {
    
                // scan exponent, if any
                case Chars.UpperE:
                case Chars.LowerE:
    
                    this.advance();
                    state |= NumberState.Exponent;
    
                    // scan exponent
                    switch (this.nextChar()) {
                        case Chars.Plus:
                        case Chars.Hyphen:
                            this.advance();
                            if (!this.hasNext()) this.error(Errors.UnexpectedTokenNumber);
                        default: // ignore
                    }
    
                    cp = this.nextChar();
                    // we must have at least one decimal digit after 'e'/'E'
                    if (!(cp >= Chars.Zero && cp <= Chars.Nine)) this.error(Errors.UnexpectedMantissa);
                    this.advanceAndSkipDigits();
    
                    end = this.index;
    
                    break;
    
                    // BigInt - Stage 3 proposal
                case Chars.LowerN:
                    if (this.flags & Flags.OptionsNext) {
                        if (state & NumberState.Float) this.error(Errors.Unexpected);
                        this.advance();
                        state |= NumberState.BigInt;
                        end = this.index;
                    }
    
                default: // ignore
            }
    
            // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
            // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
            // For example : 3in is an error and not the two input elements 3 and in
            if (isIdentifierStart(this.nextChar())) this.error(Errors.UnexpectedTokenNumber);
    
            const raw = this.source.substring(start, end);
    
            if (this.flags & Flags.OptionsRaw) this.tokenRaw = raw;
    
            if (state & NumberState.BigInt) this.flags |= Flags.BigInt;
    
            this.tokenValue = state & NumberState.FloatOrExponent ? parseFloat(raw) : parseInt(raw, 10);
    
            return Token.NumericLiteral;
        }
    
        private scanRegularExpression(): Token {
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
                                return this.token;
                            default: // ignore
                        }
                    }
    
                    if (!this.hasNext()) this.error(Errors.UnterminatedRegExp);
                }
    
            const bodyEnd = this.index - 1; // drop the slash from the slice
    
            const flagsStart = this.index;
    
            let mask = RegExpFlag.None;
    
            loop:
                while (this.hasNext()) {
                    const code = this.nextChar();
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
                            if (!isIdentifierPart(code)) break loop;
                            this.error(Errors.UnexpectedTokenRegExpFlag);
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
    
            this.tokenValue = tryCreate(pattern, flags);
    
            if (this.flags & Flags.OptionsRaw) this.storeRaw(this.startIndex);
    
            return Token.RegularExpression;
        }
    
        private scanString(context: Context, quote: number): Token {
            const start = this.index;
            const lastChar = this.lastChar;
            let ret = '';
    
            let ch = this.scanNext(quote);
            while (ch !== quote) {
                switch (ch) {
                    case Chars.CarriageReturn:
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.error(Errors.UnterminatedString);
                    case Chars.Backslash:
                        ch = this.scanNext(ch);
    
                        if (ch >= 128) {
                            ret += fromCodePoint(ch);
                        } else {
                            this.lastChar = ch;
                            const code = this.scanEscape(context, ch);
    
                            if (code >= 0) {
                                ret += fromCodePoint(code as Chars);
                            } else {
                                this.handleStringError(code as Escape);
                            }
    
                            this.flags |= Flags.HasUnicode;
    
                            ch = this.lastChar;
                        }
                        break;
    
                    default:
                        ret += fromCodePoint(ch);
                }
    
                ch = this.scanNext(ch);
            }
    
            this.advance(); // Consume the quote
            if (this.flags & Flags.OptionsRaw) this.storeRaw(start);
            this.tokenValue = ret;
            this.lastChar = lastChar;
            return Token.StringLiteral;
        }
    
        private handleStringError(
            code: Escape
        ): void {
            switch (code) {
                case Escape.Empty:
                    return;
                case Escape.StrictOctal:
                    this.error(Errors.StrictOctalEscape);
                case Escape.TemplateOctalLiteral:
                    this.error(Errors.TemplateOctalLiteral);
                case Escape.EightOrNine:
                    this.error(Errors.InvalidEightAndNine);
                case Escape.InvalidHex:
                    this.error(Errors.InvalidHexEscapeSequence);
                case Escape.OutOfRange:
                    this.error(Errors.UnicodeOutOfRange);
                default:
                    this.error(Errors.BadUntaggedTemplate);
            }
        }
    
        private scanEscape(context: Context, cp: Chars, isTemplate: boolean = false): Chars | Escape {
    
            switch (cp) {
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
                        let code = cp - Chars.Zero;
                        let index = this.index + 1;
                        let column = this.column + 1;
    
                        if (isTemplate && !(context & Context.TaggedTemplate)) return Escape.TemplateOctalLiteral;
    
                        if (index < this.source.length) {
                            let next = this.source.charCodeAt(index);
    
                            if (next < Chars.Zero || next > Chars.Seven) {
                                if (code !== 0 && context & Context.Strict) return Escape.StrictOctal;
                            } else if (context & Context.Strict) {
                                return Escape.StrictOctal;
                            } else {
                                this.lastChar = next;
                                code = (code << 3) | (next - Chars.Zero);
                                index++;
                                column++;
    
                                if (index < this.source.length) {
                                    next = this.source.charCodeAt(index);
    
                                    if (next >= Chars.Zero && next <= Chars.Seven) {
                                        this.lastChar = next;
                                        code = (code << 3) | (next - Chars.Zero);
                                        index++;
                                        column++;
                                    }
                                }
    
                                this.index = index - 1;
                                this.column = column - 1;
                            }
                        }
    
                        return code;
                    }
    
                case Chars.Four:
                case Chars.Five:
                case Chars.Six:
                case Chars.Seven:
                    {
                        if (isTemplate && !(context & Context.TaggedTemplate)) {
                            return Escape.TemplateOctalLiteral;
                        }
    
                        if (context & Context.Strict) {
                            return Escape.StrictOctal;
                        }
    
                        let code = cp - Chars.Zero;
                        const index = this.index + 1;
                        const column = this.column + 1;
    
                        if (index < this.source.length) {
                            const next = this.source.charCodeAt(index);
    
                            if (next >= Chars.Zero && next <= Chars.Seven) {
                                code = (code << 3) | (next - Chars.Zero);
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
                        const ch1 = this.lastChar = this.scanNext(cp);
                        const hi = toHex(ch1);
                        if (hi < 0) return Escape.InvalidHex;
                        const ch2 = this.lastChar = this.scanNext(ch1);
                        const lo = toHex(ch2);
                        if (lo < 0) return Escape.InvalidHex;
    
                        return hi << 4 | lo;
                    }
    
                    // UCS-2/Unicode escapes
                case Chars.LowerU:
                    {
                        let ch = this.lastChar = this.scanNext(cp);
                        if (ch === Chars.LeftBrace) {
                            // \u{N}
                            ch = this.lastChar = this.scanNext(ch);
                            let code = toHex(ch);
                            if (code < 0) return Escape.InvalidHex;
    
                            ch = this.lastChar = this.scanNext(ch);
    
                            while (ch !== Chars.RightBrace) {
                                const digit = toHex(ch);
                                if (digit < 0) return Escape.InvalidHex;
                                code = code << 4 | digit;
                                if (code > Chars.LastUnicodeChar) return Escape.OutOfRange;
                                ch = this.lastChar = this.scanNext(ch);
                            }
    
                            return code;
                        } else {
                            // \uNNNN
                            let code = toHex(ch);
                            if (code < 0) return Escape.InvalidHex;
    
                            for (let i = 0; i < 3; i++) {
                                ch = this.lastChar = this.scanNext(ch);
                                const digit = toHex(ch);
                                if (digit < 0) return Escape.InvalidHex;
                                code = code << 4 | digit;
                            }
    
                            return code;
                        }
                    }
    
                default:
                    return this.nextUnicodeChar();
            }
        }
    
        private scanTemplateNext(context: Context): Token {
            if (!this.hasNext()) this.error(Errors.Unexpected);
            this.index--;
            this.column--;
            return this.scanTemplate(context, Chars.RightBrace);
        }
    
        private scanTemplate(context: Context, first: number): Token {
            const start = this.index;
            const lastChar = this.lastChar;
            let tail = true;
            let ret: string | void | null = '';
    
            let ch = this.scanNext(first, Errors.UnterminatedTemplate);
    
            loop:
                while (ch !== Chars.Backtick) {
    
                    switch (ch) {
    
                        // '$'
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
    
                            // '/'
                        case Chars.Backslash:
    
                            ch = this.scanNext(ch, Errors.UnterminatedTemplate);
    
                            if (ch >= 128) {
                                ret += fromCodePoint(ch);
                            } else {
                                this.lastChar = ch;
                                const code = this.scanEscape(context, ch, true);
    
                                if (code >= 0) {
                                    ret += fromCodePoint(code as Chars);
                                } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                                    ret = null;
                                    ch = this.scanLooserTemplateSegment(this.lastChar);
                                    if (ch < 0) {
                                        ch = -ch;
                                        tail = false;
                                    }
                                    break loop;
                                } else {
                                    this.handleStringError(code as Escape);
                                }
                                ch = this.lastChar;
                            }
    
                            break;
    
                            // Line terminators
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
    
                    ch = this.scanNext(ch, Errors.UnterminatedTemplate);
                }
    
            this.advance();
    
            if (ch & 0x10000) this.index++;
    
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
    
        private scanLooserTemplateSegment(ch: Chars): Chars {
    
            while (ch !== Chars.Backtick) {
                switch (ch) {
                    // '$'
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
    
                        // '/'
                    case Chars.Backslash:
                        ch = this.scanNext(ch);
                        break;
    
                        // LineTerminators
                    case Chars.CarriageReturn:
                        if (this.hasNext() && this.nextChar() === Chars.LineFeed) {
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
                        // ignore
                }
    
                ch = this.scanNext(ch);
            }
    
            return ch;
        }
    
        private scanJSXIdentifier(context: Context): Token {
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
                                    break scan;
                            }
                        }
    
                    this.tokenValue += this.source.slice(firstCharPosition, this.index - firstCharPosition);
                default:
                    return this.token;
            }
        }
    
        private parseModuleItemList(context: Context): ESTree.Statement[] {
            // ecma262/#prod-Module
            // Module :
            //    ModuleBody?
            //
            // ecma262/#prod-ModuleItemList
            // ModuleBody :
            //   ModuleItem*
    
            const statements: ESTree.Statement[] = [];
    
            while (this.token !== Token.EndOfSource) {
                if (this.token !== Token.StringLiteral) break;
                const item: ESTree.Statement = this.parseDirective(context);
                statements.push(item);
            }
    
            while (this.token !== Token.EndOfSource) {
                statements.push(this.parseModuleItem(context));
            }
    
            return statements;
        }
    
        private parseDirective(context: Context): ESTree.ExpressionStatement {
            const pos = this.getLocations();
            if (this.flags & Flags.OptionsDirectives) {
                const expr = this.parseExpression(context, pos);
                const directive = this.tokenRaw.slice(1, -1);
                this.consumeSemicolon(context);
                const node = this.finishNode(pos, {
                    type: 'ExpressionStatement',
                    expression: expr,
                    directive
                });
    
                return node;
            }
    
            return context & Context.Module ? this.parseModuleItem(context) : this.parseStatementListItem(context);
        }
    
        private parseStatementList(context: Context, endToken: Token): ESTree.Statement[] {
    
            const statements: ESTree.Statement[] = [];
    
            while (this.token !== endToken) {
                if (this.token !== Token.StringLiteral) break;
                const item: ESTree.Statement = this.parseDirective(context);
                statements.push(item);
                if (!isPrologueDirective(item)) break;
                if (this.flags & Flags.HasStrictDirective) {
                    if (this.flags & Flags.SimpleParameterList) this.error(Errors.IllegalUseStrict);
                    if (this.flags & Flags.BindingPosition) this.error(Errors.UnexpectedStrictReserved);
                    context |= Context.Strict;
                }
            }
    
            while (this.token !== endToken) {
                statements.push(this.parseStatementListItem(context));
            }
    
            return statements;
        }
    
        private getLocations(): Location {
            return {
                index: this.index,
                start: this.startIndex,
                line: this.startLine,
                column: this.startColumn
            };
        }
    
        private finishNode(loc: Location, node: any) {
    
            if (this.flags & Flags.OptionsRanges) {
                node.start = loc.start;
                node.end = this.lastIndex;
            }
    
            if (this.flags & Flags.OptionsLoc) {
    
                node.loc = {
                    start: {
                        line: loc.line,
                        column: loc.column,
                    },
                    end: {
                        line: this.lastLine,
                        column: this.lastColumn
                    }
                };
    
                if (this.flags & Flags.OptionsSource) {
                    node.loc.source = this.locSource;
                }
            }
    
            if (this.flags & Flags.OptionsDelegate) {
                const metadata = {
                    start: {
                        line: loc.line,
                        column: loc.column,
                        offset: loc.index
                    },
                    end: {
                        line: this.lastLine,
                        column: this.lastColumn,
                        offset: this.lastIndex
                    }
                };
    
                this.delegate(node, loc.start, this.lastIndex, metadata);
            }
    
            return node;
        }
    
        private parseOptional(context: Context, t: Token): boolean {
            if (this.token !== t) return false;
            this.nextToken(context);
            return true;
        }
    
        private expect(context: Context, t: Token) {
            if (this.token !== t) this.error(Errors.UnexpectedToken, tokenDesc(t));
            this.nextToken(context);
        }
    
        private isEvalOrArguments(value: string): boolean {
            return value === 'eval' || value === 'arguments';
        }
    
        private isEvalOrArgumentsIdentifier(context: Context, value: string): boolean {
            if (!(context & Context.Strict)) return false;
            return this.isEvalOrArguments(value);
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
            if (!this.canConsumeSemicolon()) this.throwUnexpectedToken();
            if (this.token === Token.Semicolon) this.expect(context, Token.Semicolon);
        }
    
        private nextTokenIsAssign(context: Context) {
            const savedState = this.saveState();
            this.nextToken(context);
            const next = this.token;
            this.rewindState(savedState);
            return next === Token.Assign;
        }
    
        // 'import', 'import.meta'
        private nextTokenIsLeftParenOrPeriod(context: Context): boolean {
            const savedState = this.saveState();
            this.nextToken(context);
            const next = this.token;
            this.rewindState(savedState);
            return next === Token.LeftParen || next === Token.Period;
        }
    
        private isLexical(context: Context): boolean {
            // In ES6 'let' always starts a lexical declaration if followed by an identifier or {
            // or [.
            const savedState = this.saveState();
            this.nextToken(context);
            const next = this.token;
            this.rewindState(savedState);
    
            if (next === Token.Identifier) return true;
    
            // Fast path for '{}' / '[];
            if (hasMask(next, Token.BindingPattern)) return true;
    
            switch (next) {
                case Token.LeftBrace:
                case Token.Identifier:
                case Token.LeftBracket:
                case Token.YieldKeyword:
                    return true;
                default:
                    return hasMask(next, Token.Contextual);
            }
        }
    
        private isIdentifier(context: Context, t: Token): boolean {
            if (context & Context.Strict) {
                if (context & Context.Module) {
                    if ((t & Token.FutureReserved) === Token.FutureReserved) this.error(Errors.UnexpectedStrictReserved);
                }
                return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual;
            }
            return t === Token.Identifier || (t & Token.Contextual) === Token.Contextual || (t & Token.FutureReserved) === Token.FutureReserved;
        }
    
        private isIdentifierOrKeyword(t: Token): boolean | number {
            return t === Token.Identifier || hasMask(t, Token.Keyword);
        }
    
        private parseIdentifierName(context: Context, t: Token) {
            if (!this.isIdentifierOrKeyword(t)) this.throwUnexpectedToken();
            return this.parseIdentifier(context);
        }
    
        private nextTokenIsFuncKeywordOnSameLine(context: Context): boolean {
            const savedState = this.saveState();
            this.nextToken(context);
            const next = this.token;
            const line = this.line;
            this.rewindState(savedState);
            return line === this.line && next === Token.FunctionKeyword;
        }
    
        private parseExportDefault(context: Context, pos: Location): ESTree.ExportDefaultDeclaration {
    
            // Note:  The `default` contextual keyword must not contain Unicode escape sequences.
            if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
    
            this.expect(context, Token.DefaultKeyword);
    
            let declaration: ESTree.FunctionDeclaration | ESTree.ClassDeclaration | ESTree.Expression;
    
            switch (this.token) {
    
                // export default HoistableDeclaration[Default]
                case Token.FunctionKeyword:
                    declaration = this.parseFunctionDeclaration(context | (Context.OptionalIdentifier | Context.TopLevel));
                    break;
    
                    // export default ClassDeclaration[Default]
                case Token.ClassKeyword:
                    declaration = this.parseClassDeclaration(context | (Context.OptionalIdentifier | Context.TopLevel));
                    break;
    
                    // export default HoistableDeclaration[Default]
                case Token.AsyncKeyword:
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        declaration = this.parseFunctionDeclaration(context | (Context.OptionalIdentifier | Context.TopLevel));
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
    
            const pos = this.getLocations();
            const specifiers: ESTree.ExportSpecifier[] = [];
    
            let source = null;
            let isExportedReservedWord = false;
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
    
                    while (this.token !== Token.RightBrace) {
                        if (hasMask(this.token, Token.Reserved)) isExportedReservedWord = true;
                        specifiers.push(this.parseExportSpecifier(context));
                        // Invalid: 'export {a,,b}'
                        if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
                    }
    
                    this.expect(context, Token.RightBrace);
    
                    if (this.token === Token.FromKeyword) {
                        // Note:  The `from` contextual keyword must not contain Unicode escape sequences.
                        if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
                        this.expect(context, Token.FromKeyword);
                        // export {default} from 'foo';
                        // export {foo} from 'foo';
                        source = this.parseModuleSpecifier(context);
                    } else if (isExportedReservedWord) {
                        this.throwUnexpectedToken();
                    }
    
                    this.consumeSemicolon(context);
    
                    break;
    
                    // export ClassDeclaration
                case Token.ClassKeyword:
                    declaration = this.parseClassDeclaration(context | Context.TopLevel);
                    break;
    
                    // export LexicalDeclaration
                case Token.ConstKeyword:
                    declaration = this.parseVariableStatement(context | Context.Const);
                    break;
    
                    // export LexicalDeclaration
                case Token.LetKeyword:
                    declaration = this.parseVariableStatement(context | Context.Let);
                    break;
    
                    // export VariableDeclaration
                case Token.VarKeyword:
                    declaration = this.parseVariableStatement(context | Context.TopLevel);
                    break;
    
                    // export HoistableDeclaration
                case Token.FunctionKeyword:
                    declaration = this.parseFunctionDeclaration(context | Context.TopLevel);
                    break;
    
                    // export HoistableDeclaration
                case Token.AsyncKeyword:
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        declaration = this.parseFunctionDeclaration(context | Context.TopLevel);
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
    
            const local = this.parseIdentifierName(context, this.token);
    
            let exported = local;
            const token = this.token;
    
            if (this.token === Token.AsKeyword) {
                // Note:  The `as` contextual keyword must not contain Unicode escape sequences.
                if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
                this.expect(context, Token.AsKeyword);
                exported = this.parseIdentifierName(context, this.token);
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
    
            if (this.token === Token.Identifier || hasMask(this.token, Token.BindingPattern)) {
                imported = this.parseIdentifier(context);
                local = imported;
                // In the presence of 'as', the left-side of the 'as' can
                // be any IdentifierName. But without 'as', it must be a valid
                // BindingIdentifier.
                if (this.token === Token.AsKeyword) {
                    // Note:  The `as` contextual keyword must not contain Unicode escape sequences.
                    if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
                    this.expect(context, Token.AsKeyword);
                    local = this.parseBindingPatternOrIdentifier(context, pos);
                }
            } else {
                imported = this.parseIdentifier(context);
                local = imported;
                // Note:  The `default` contextual keyword must not contain Unicode escape sequences.
                if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
                this.expect(context, Token.AsKeyword);
                local = this.parseBindingPatternOrIdentifier(context, pos);
            }
    
            return this.finishNode(pos, {
                type: 'ImportSpecifier',
                local,
                imported
            });
        }
    
        // {foo, bar as bas}
        private parseNamedImports(
            context: Context,
            specifiers: (ESTree.ImportSpecifier | ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier)[]
        ) {
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
    
            // Note:  The `default` contextual keyword must not contain Unicode escape sequences.
            if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
    
            this.expect(context, Token.AsKeyword);
    
            if (this.token !== Token.Identifier) {
                this.throwUnexpectedToken();
            }
    
            const local = this.parseIdentifierName(context, this.token);
    
            return this.finishNode(pos, {
                type: 'ImportNamespaceSpecifier',
                local
            });
        }
    
        // import <foo> ...;
        private parseImportDefaultSpecifier(context: Context): ESTree.ImportDefaultSpecifier {
            return this.finishNode(this.getLocations(), {
                type: 'ImportDefaultSpecifier',
                local: this.parseIdentifierName(context, this.token)
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
                                    this.throwUnexpectedToken();
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
                    this.throwUnexpectedToken();
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
                    if (!(this.flags & Flags.OptionsNext && this.nextTokenIsLeftParenOrPeriod(context))) {
                        return this.parseImportDeclaration(context);
                    }
    
                default:
                    return this.parseStatementListItem(context);
            }
        }
    
        private parseStatementListItem(context: Context): any {
    
            switch (this.token) {
                case Token.FunctionKeyword:
                    return this.parseFunctionDeclaration(context);
                case Token.ClassKeyword:
                    return this.parseClassDeclaration(context);
                case Token.LetKeyword:
                    // If let follows identifier on the same line, it is an declaration. Parse it as a variable statement
                    if (this.isLexical(context)) return this.parseVariableStatement(context |= Context.Let);
                    return this.parseStatement(context & ~Context.TopLevel);
                case Token.ConstKeyword:
                    return this.parseVariableStatement(context | Context.Const);
                    // VariableStatement[?Yield]
                case Token.ExportKeyword:
                    if (context & Context.Module) this.error(Errors.ExportDeclAtTopLevel);
                case Token.ImportKeyword:
                    // We must be careful not to parse a 'import()'
                    // expression or 'import.meta' as an import declaration.
                    if (this.flags & Flags.OptionsNext && this.nextTokenIsLeftParenOrPeriod(context)) {
                        return this.parseExpressionStatement(context);
                    }
                    if (context & Context.Module) this.error(Errors.ImportDeclAtTopLevel);
                default:
                    return this.parseStatement(context);
            }
        }
    
        private parseStatement(context: Context): any {
            switch (this.token) {
                case Token.Identifier:
                    return this.parseLabelledStatement(context);
                case Token.LeftParen:
                    return this.parseExpressionStatement(context);
                    // EmptyStatement
                case Token.Semicolon:
                    return this.parseEmptyStatement(context);
                    // BlockStatement[?Yield, ?Return]
                case Token.LeftBrace:
                    return this.parseBlockStatement(context);
                    // VariableStatement[?Yield]
                case Token.VarKeyword:
                    return this.parseVariableStatement(context);
                    // VariableStatement[?Yield]
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
                case Token.ContinueKeyword:
                    return this.parseContinueStatement(context);
                    // DebuggerStatement
                case Token.DebuggerKeyword:
                    return this.parseDebuggerStatement(context);
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
                    return this.parseSwitchStatement(context | Context.TopLevel);
    
                    // ThrowStatement[?Yield]
                case Token.ThrowKeyword:
                    return this.parseThrowStatement(context);
    
                    // TryStatement[?Yield, ?Return]
                case Token.TryKeyword:
                    return this.parseTryStatement(context);
                    // AsyncFunctionDeclaration[Yield, Await, Default]
                    // Both 'class' and 'function' are forbidden by lookahead restriction.
    
                case Token.YieldKeyword:
                    return this.parseLabelledStatement(context);
                case Token.AsyncKeyword:
                    // Here we do a quick lookahead so we just need to parse out the
                    // 'AsyncFunctionDeclaration'. The 'parsePrimaryExpression' will do the
                    // heavy work for us. I doubt this will cause any performance loss, but
                    // if so is the case - this can be reverted later on.
                    // J.K. Thomas
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        // Note: async function are only subject to AnnexB if we forbid them to parse
                        if (context & Context.TopLevel || this.flags & Flags.Iteration) {
                            this.throwUnexpectedToken();
                        }
                        if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
                        return this.parseFunctionDeclaration(context);
                    }
                    // 'Async' is a valid contextual keyword in sloppy mode for labelled statement, so either
                    // parse out 'LabelledStatement' or an plain identifier. We pass down the 'Statement' mask
                    // so we can easily switch async state if needed on "TopLevel" even if we are inside
                    // the PrimaryExpression production
                    return this.parseLabelledStatement(context | Context.TopLevel);
    
                case Token.FunctionKeyword:
                    if (context & Context.AnnexB) {
                        return this.parseFunctionDeclaration(context | Context.AnnexB);
                    }
    
                case Token.ClassKeyword:
                    this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
                default:
                    return this.parseExpressionStatement(context);
            }
        }
    
        private parseBlockStatement(context: Context): ESTree.BlockStatement {
            const pos = this.getLocations();
            const body: ESTree.Statement[] = [];
            this.expect(context, Token.LeftBrace);
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
            if (blockScope != null) this.parentScope = blockScope;
            this.blockScope = context & Context.IfClause ? blockScope : undefined;
            const flag = this.flags;
    
            while (this.token !== Token.RightBrace) {
                body.push(this.parseStatementListItem(context | Context.TopLevel));
            }
            this.flags = flag;
            this.expect(context, Token.RightBrace);
    
    
            this.blockScope = blockScope;
            if (parentScope != null) this.parentScope = parentScope;
            return this.finishNode(pos, {
                type: 'BlockStatement',
                body
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
                this.addCatchArg(this.tokenValue, ScopeMasks.Shadowable);
    
                param = this.parseBindingPatternOrIdentifier(context, pos);
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
    
        private parseThrowStatement(context: Context): ESTree.ThrowStatement {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.ThrowKeyword);
    
            if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterThrow);
    
            const argument: ESTree.Expression = this.parseExpression(context | Context.AllowIn, pos);
    
            this.consumeSemicolon(context);
    
            return this.finishNode(pos, {
                type: 'ThrowStatement',
                argument
            });
        }
    
        private parseWithStatement(context: Context): ESTree.WithStatement {
            const pos = this.getLocations();
    
            // Strict mode code may not include a WithStatement. The occurrence of a WithStatement in such 
            // a context is an grammar error
            if (context & Context.Strict) this.error(Errors.StrictModeWith);
    
            this.expect(context, Token.WithKeyword);
            this.expect(context, Token.LeftParen);
            const object = this.parseExpression(context | Context.AllowIn, pos);
            this.expect(context, Token.RightParen);
            const body = this.parseStatement(context & ~Context.TopLevel);
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
    
            const test = this.parseExpression(context | Context.AllowIn, pos);
    
            this.expect(context, Token.RightParen);
    
            const savedFlag = this.flags;
    
            this.flags |= Flags.Iteration;
    
            const body = this.parseStatement(context & ~Context.TopLevel);
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
    
            this.flags |= Flags.Iteration;
    
            const body = this.parseStatement(context & ~Context.TopLevel);
    
            this.flags = savedFlag;
    
            this.expect(context, Token.WhileKeyword);
            this.expect(context, Token.LeftParen);
    
            const test = this.parseExpression(context & ~Context.TopLevel | Context.AllowIn, pos);
    
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
                label = this.parseIdentifierName(context, this.token);
                this.validateLabel(label.name);
            }
    
            if (!label && !(this.flags & Flags.Iteration)) this.error(Errors.BadContinue);
    
            this.consumeSemicolon(context);
    
            return this.finishNode(pos, {
                type: 'ContinueStatement',
                label
            });
        }
    
        private parseBreakStatement(context: Context): ESTree.BreakStatement {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.BreakKeyword);
    
            let label: ESTree.Identifier | null = null;
    
            if (!(this.flags & Flags.LineTerminator) && this.token === Token.Identifier) {
                label = this.parseIdentifierName(context, this.token);
                this.validateLabel(label.name);
            }
    
            if (!label && !(this.flags & (Flags.Break | Flags.Iteration))) {
                this.error(Errors.IllegalBreak);
            }
    
            this.consumeSemicolon(context);
    
            return this.finishNode(pos, {
                type: 'BreakStatement',
                label
            });
        }
    
        private parseForStatement(context: Context): any {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.ForKeyword);
    
            let init = null;
            let declarations = null;
            let kind = '';
            let body;
            let test = null;
            const token = this.token;
            let state = IterationState.None;
    
            // Asynchronous Iteration - Stage 3 proposal
            if (context & Context.Await && this.parseOptional(context, Token.AwaitKeyword)) {
                // Throw " Unexpected token 'await'" if the option 'next' flag isn't set
                if (!(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(token));
                state |= IterationState.Await;
            }
    
            const savedFlag = this.flags;
    
            // Create a lexical scope node around the whole ForStatement
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
    
            if (blockScope !== undefined) this.parentScope = blockScope;
    
            this.blockScope = undefined;
    
            this.expect(context, Token.LeftParen);
    
            if (this.token !== Token.Semicolon) {
    
                switch (this.token) {
                    case Token.LetKeyword:
                        if (!this.isLexical(context)) break;
                        context |= Context.Let | Context.AllowIn;
                        state |= IterationState.Let;
                        break;
                    case Token.VarKeyword:
                        state |= IterationState.Var;
                        break;
                    case Token.ConstKeyword:
                        context |= Context.Const | Context.AllowIn;
                        state |= IterationState.Const;
                        break;
                    default:
                        // ignore
                }
    
                if (state & (IterationState.Lexical | IterationState.Var)) {
                    const startIndex = this.getLocations();
                    kind = tokenDesc(this.token);
                    this.nextToken(context);
                    declarations = this.parseVariableDeclarationList(context | Context.ForStatement);
    
                    init = this.finishNode(startIndex, {
                        type: 'VariableDeclaration',
                        declarations,
                        kind
                    });
                } else {
                    init = this.parseExpression(context & ~Context.AllowIn | Context.ForStatement, pos);
                }
            }
    
            this.flags = savedFlag;
    
            switch (this.token) {
    
                // 'of'
                case Token.OfKeyword:
                    if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
                    this.parseOptional(context, Token.OfKeyword);
                    if (state & IterationState.Variable) {
                        // Only a single variable declaration is allowed in a for of statement
                        if (declarations && declarations[0].init != null) this.error(Errors.InvalidVarInitForOf);
                    } else {
                        this.reinterpretAsPattern(context, init);
                        if (!isValidDestructuringAssignmentTarget(init)) this.error(Errors.InvalidLHSInForLoop);
                    }
    
                    const right = this.parseAssignmentExpression(context);
    
                    this.expect(context, Token.RightParen);
    
                    this.flags |= Flags.Iteration;
    
                    body = this.parseStatement(context & ~Context.TopLevel | Context.ForStatement);
    
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
    
                    if (state & IterationState.Variable) {
                        if (declarations && declarations.length !== 1) this.error(Errors.Unexpected);
                    } else {
                        this.reinterpretAsPattern(context | Context.ForStatement, init);
                    }
    
                    if (state & IterationState.Await) this.error(Errors.ForAwaitNotOf);
    
                    this.expect(context, Token.InKeyword);
    
                    test = this.parseExpression(context, pos);
    
                    this.expect(context, Token.RightParen);
    
                    this.flags |= Flags.Iteration;
    
                    body = this.parseStatement(context & ~Context.TopLevel | Context.ForStatement);
    
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
    
                    this.expect(context, Token.Semicolon);
    
                    if (this.token !== Token.Semicolon && this.token !== Token.RightParen) {
                        test = this.parseExpression(context, pos);
                    }
    
                    this.expect(context, Token.Semicolon);
    
                    if (this.token !== Token.RightParen) update = this.parseExpression(context, pos);
    
                    this.expect(context, Token.RightParen);
    
                    this.flags |= Flags.Iteration;
    
                    body = this.parseStatement(context & ~Context.TopLevel | Context.ForStatement);
    
                    this.flags = savedFlag;
    
                    this.blockScope = blockScope;
                    if (blockScope !== undefined) this.parentScope = parentScope;
    
                    return this.finishNode(pos, {
                        type: 'ForStatement',
                        body,
                        init,
                        test,
                        update
                    });
            }
        }
    
        private parseIfStatementChild(context: Context): ESTree.Statement {
            if (context & Context.Strict && this.token === Token.FunctionKeyword) {
                this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
            }
            return this.parseStatement(context | (Context.AnnexB | Context.TopLevel));
        }
    
        private parseIfStatement(context: Context): ESTree.IfStatement {
            const pos = this.getLocations();
            this.expect(context, Token.IfKeyword);
            this.expect(context, Token.LeftParen);
            // An IF node has three kids: test, alternate, and optional else
            const test = this.parseExpression(context | Context.AllowIn, pos);
    
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
        private parseDebuggerStatement(context: Context): ESTree.DebuggerStatement {
            const pos = this.getLocations();
            this.expect(context, Token.DebuggerKeyword);
            this.consumeSemicolon(context);
            return this.finishNode(pos, {
                type: 'DebuggerStatement'
            });
        }
    
        private parseSwitchStatement(context: Context): ESTree.SwitchStatement {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.SwitchKeyword);
            this.expect(context, Token.LeftParen);
    
            const discriminant = this.parseExpression(context, pos);
    
            this.expect(context, Token.RightParen);
            this.expect(context, Token.LeftBrace);
    
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
    
            if (blockScope !== undefined) this.parentScope = blockScope;
            this.blockScope = undefined;
    
            const cases: ESTree.SwitchCase[] = [];
    
            let seenDefault = false;
    
            const SavedFlag = this.flags;
    
            this.flags |= (Flags.Break | Flags.Switch);
    
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
    
            this.blockScope = blockScope;
    
            if (blockScope !== undefined) this.parentScope = parentScope;
    
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
                    test = this.parseExpression(context, pos);
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
    
        private parseEmptyStatement(context: Context): ESTree.EmptyStatement {
            const pos = this.getLocations();
            this.nextToken(context);
            return this.finishNode(pos, {
                type: 'EmptyStatement'
            });
        }
    
        private parseFunctionDeclaration(context: Context): ESTree.FunctionDeclaration {
    
            const pos = this.getLocations();
    
            const parentContext = context;
    
            context &= ~(Context.Await | Context.Yield);
    
            if (this.parseOptional(context, Token.AsyncKeyword)) context |= Context.Await;
    
            this.expect(context, Token.FunctionKeyword);
    
            if (this.token === Token.Multiply) {
    
                // Annex B.3.4 doesn't allow generators functions
                if (context & Context.AnnexB) this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
                // If we are in the 'await' context. Check if the 'Next' option are set
                // and allow use of async generators. Throw a decent error message if this isn't the case
                if (context & Context.Await && !(this.flags & Flags.OptionsNext)) this.error(Errors.InvalidAsyncGenerator);
                this.expect(context, Token.Multiply);
                context |= Context.Yield;
            }
    
            let id: ESTree.Identifier | null = null;
    
            const savedFlags = this.flags;
    
            if (this.token !== Token.LeftParen) {
    
                const name = this.tokenValue;
                const token = this.token;
    
                if (!this.isIdentifier(context, token)) this.throwUnexpectedToken();
    
                switch (token) {
                    case Token.YieldKeyword:
                        if (parentContext & Context.Yield) this.error(Errors.DisallowedInContext, tokenDesc(token));
                        break;
                    case Token.AwaitKeyword:
                        if (context & Context.Module) this.throwUnexpectedToken();
                        // 'await' is forbidden only in async function bodies (but not in child functions) and module code.
                        if (context & Context.Await && this.flags & Flags.InFunctionBody) this.error(Errors.DisallowedInContext, tokenDesc(token));
                    default: // ignore
                }
    
                if (context & Context.TopLevel && !(context & Context.AnnexB)) {
                    if (!this.initBlockScope() && (
                            this.blockScope !== this.functionScope && this.blockScope[name] ||
                            this.blockScope[name] === ScopeMasks.NonShadowable
                        )) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                    this.blockScope[name] = ScopeMasks.Shadowable;
                }
    
                id = this.parseBindingIdentifier(context);
    
            } else if (!(context & Context.OptionalIdentifier)) this.error(Errors.UnNamedFunctionStmt);
    
            const savedScope = this.enterFunctionScope();
            const params = this.parseParameterList(context & ~(Context.TopLevel | Context.OptionalIdentifier) | Context.InParameter, ObjectState.None);
            const body = this.parseFunctionBody(context & ~Context.OptionalIdentifier);
            this.exitFunctionScope(savedScope);
    
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
    
        private parseReturnStatement(context: Context): ESTree.ReturnStatement {
            const pos = this.getLocations();
    
            if (!(this.flags & Flags.GlobalReturn)) this.error(Errors.IllegalReturn);
    
            this.expect(context, Token.ReturnKeyword);
    
            let argument: ESTree.Expression | null = null;
    
            if (!this.canConsumeSemicolon()) {
                argument = this.parseExpression(context | Context.AllowIn, pos);
            }
    
            this.consumeSemicolon(context);
    
            return this.finishNode(pos, {
                type: 'ReturnStatement',
                argument
            });
        }
    
        private parseLabelledStatement(context: Context): ESTree.LabeledStatement | ESTree.ExpressionStatement {
            const pos = this.getLocations();
            const token = this.token;
            const expr = this.parseExpression(context | Context.AllowIn, pos);
    
            if (this.token === Token.Colon && expr.type === 'Identifier') {
    
                this.expect(context, Token.Colon);
    
                const key = '@' + expr.name;
                if (this.labelSet === undefined) this.labelSet = {};
                else if (this.labelSet[key] === true) this.error(Errors.Redeclaration, expr.name);
    
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
                    body = this.parseFunctionDeclaration(context | Context.AnnexB | Context.TopLevel);
                } else {
                    body = this.parseStatement(context | Context.TopLevel);
                }
    
                this.labelSet[key] = false;
    
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
    
        private parseExpressionStatement(context: Context): ESTree.ExpressionStatement {
            const pos = this.getLocations();
            const expr = this.parseExpression(context | Context.AllowIn, pos);
            this.consumeSemicolon(context);
            return this.finishNode(pos, {
                type: 'ExpressionStatement',
                expression: expr
            });
        }
    
        private parseVariableStatement(context: Context) {
            const pos = this.getLocations();
            const token = this.token;
            if (this.flags & Flags.HasUnicode) this.error(Errors.Unexpected);
            this.nextToken(context);
            const declarations = this.parseVariableDeclarationList(context | Context.AllowIn);
            this.consumeSemicolon(context);
            return this.finishNode(pos, {
                type: 'VariableDeclaration',
                declarations,
                kind: tokenDesc(token)
            });
        }
    
        private parseVariableDeclarationList(context: Context): ESTree.VariableDeclarator[] {
            const list: ESTree.VariableDeclarator[] = [this.parseVariableDeclaration(context)];
    
            while (this.parseOptional(context, Token.Comma)) {
                list.push(this.parseVariableDeclaration(context));
            }
            return list;
        }
    
        private parseVariableDeclaration(context: Context): ESTree.VariableDeclarator {
            const pos = this.getLocations();
            let init = null;
            const token = this.token;
            const id = this.parseBindingPatternOrIdentifier(context, pos);
    
            // 'let', 'const'
            if (context & Context.Lexical) {
                if (context & Context.Const) {
                    if (!(this.token === Token.InKeyword || this.token === Token.OfKeyword)) {
                        if (this.parseOptional(context, Token.Assign)) {
                            init = this.parseAssignmentExpression(context);
                        } else {
                            this.error(Errors.DeclarationMissingInitializer, 'const');
                        }
                    }
                } else if ((!(context & Context.ForStatement) && token !== Token.Identifier) || this.token === Token.Assign) {
                    this.expect(context, Token.Assign);
                    init = this.parseAssignmentExpression(context);
                }
            } else {
                if (this.parseOptional(context, Token.Assign)) {
                    init = this.parseAssignmentExpression(context);
                    if (context & Context.ForStatement) {
                        if (this.token === Token.InKeyword) {
                            if (context & Context.Strict || hasMask(token, Token.BindingPattern)) {
                                this.error(Errors.InvalidVarDeclInForIn);
                            }
                        }
                    }
                } else if (!(context & Context.ForStatement) && hasMask(token, Token.BindingPattern)) {
                    this.error(Errors.InvalidComplexBindingPattern);
                }
            }
    
            return this.finishNode(pos, {
                type: 'VariableDeclarator',
                init,
                id
            });
        }
    
        private parseExpression(context: Context, pos: Location): ESTree.Expression {
            const expr = this.parseAssignmentExpression(context);
            if (this.token !== Token.Comma) return expr;
    
            const expressions: ESTree.Expression[] = [expr];
            while (this.parseOptional(context, Token.Comma)) {
                expressions.push(this.parseAssignmentExpression(context));
            }
    
            return this.finishNode(pos, {
                type: 'SequenceExpression',
                expressions
            });
        }
    
        private parseYieldExpression(
            context: Context,
            pos: Location
        ): ESTree.YieldExpression {
    
            if (context & Context.InParenthesis) {
                this.errorLocation = pos;
                this.flags |= Flags.HaveSeenYield;
            }
    
            this.expect(context, Token.YieldKeyword);
    
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
    
        private parseAssignmentExpression(context: Context): ESTree.AssignmentExpression | ESTree.ArrowFunctionExpression | ESTree.YieldExpression {
    
            const pos = this.getLocations();
            if (context & Context.Yield && this.token === Token.YieldKeyword) return this.parseYieldExpression(context, pos);
    
            const token = this.token;
            const tokenValue = this.tokenValue;
            const expr = this.parseConditionalExpression(context, pos);
            // If that's the case - parse out a arrow function with a single un-parenthesized parameter.
            // An async one, will be parsed out in 'parsePrimaryExpression'
            if (this.token === Token.Arrow && (this.isIdentifier(context | Context.SimpleArrow, token))) {
                if (!(this.flags & Flags.LineTerminator)) {
                    // Note! This is a simple arrow function with no CoverParenthesizedExpressionAndArrowParameterList production.
                    //
                    // It does 3 things:
                    //
                    // 1.) Checks reserved words
                    // 2.) Eval and arguments
                    // 3.) Invalid non-Identifier productions
                    if (this.isEvalOrArgumentsIdentifier(context, (expr as ESTree.Identifier).name)) {
                        this.error(Errors.UnexpectedStrictReserved);
                    }
                    if (expr.type !== 'Identifier') this.throwUnexpectedToken();
                    // Invalid: 'package => { "use strict"}"'
                    if (hasMask(token, Token.FutureReserved)) {
                        // Note: We track the error location here. Let say we are parsing 'package => { "use strict"}".
                        // In this case the reported error location will be "index: 7, lineNumber 1". "7" is the
                        // last character in the reserved word "package". So we record it from there and report it
                        // as invalid. Maybe wrong? It can be adjusted! But in RL we don't know if a word is wrong or not
                        // before we have read it, so this was designed from that logic.
                        if (!this.errorLocation) this.errorLocation = this.getLocations();
                        this.flags |= Flags.BindingPosition;
                    }
                    return this.parseArrowFunction(context & ~(Context.Await) | Context.SimpleArrow, pos, [expr]);
                }
            }
    
            if (hasMask(this.token, Token.AssignOperator)) {
                const operator = this.token;
                if (this.isEvalOrArgumentsIdentifier(context, (expr as ESTree.Identifier).name)) {
                    this.error(Errors.StrictLHSAssignment);
                } else if (!(context & Context.InParameter) && this.token === Token.Assign) {
                    this.reinterpretAsPattern(context, expr);
                } else if (!isValidSimpleAssignmentTarget(expr)) {
                    this.error(Errors.InvalidLHSInAssignment);
                }
    
                this.nextToken(context);
    
                const right = this.parseAssignmentExpression(context | Context.AllowIn);
    
                return this.finishNode(pos, {
                    type: 'AssignmentExpression',
                    left: expr,
                    operator: tokenDesc(operator),
                    right: right
                });
            }
            return expr;
        }
    
        private reinterpretAsPattern(context: Context, params: any) {
    
            switch (params.type) {
                case 'Identifier':
                    if (context & Context.InArrowParameterList) {
                        if (context & Context.Await) {
                            // Duplicate param validation are only done in "struct mode" for
                            // async arrow functions
                            if (context & Context.Strict) this.addFunctionArg(params.name);
                        } else {
                            this.addFunctionArg(params.name);
                        }
                    }
                    return;
    
                case 'ObjectExpression':
                    if (this.flags & Flags.ParenthesizedPattern) this.error(Errors.InvalidParenthesizedPattern);
                    params.type = 'ObjectPattern';
    
                    // falls through
                case 'ObjectPattern':
                    // ObjectPattern and ObjectExpression are isomorphic
                    for (let i = 0; i < params.properties.length; i++) {
                        const property = params.properties[i];
                        if (property.kind !== 'init') this.throwUnexpectedToken();
                        this.reinterpretAsPattern(context, property.type === 'SpreadElement' ? property : property.value);
                    }
                    return;
    
                case 'ArrayExpression':
                    if (this.flags & Flags.ParenthesizedPattern) this.error(Errors.InvalidParenthesizedPattern);
                    params.type = 'ArrayPattern';
                    // falls through
    
                case 'ArrayPattern':
                    for (let i = 0; i < params.elements.length; ++i) {
                        // skip holes in pattern
                        if (params.elements[i] !== null) this.reinterpretAsPattern(context, params.elements[i]);
                    }
                    return;
    
                case 'AssignmentExpression':
                    if (!(context & Context.InArrowParameterList) && params.operator !== '=') this.throwUnexpectedToken();
                    params.type = 'AssignmentPattern';
                    delete params.operator;
                    // Fall through
    
                case 'AssignmentPattern':
                    this.reinterpretAsPattern(context, params.left);
                    return;
    
                case 'SpreadElement':
                    params.type = 'RestElement';
                    if (context & Context.ForStatement && params.argument.type === 'AssignmentExpression') {
                        this.error(Errors.InvalidLHSInForIn);
                    }
                    // Fall through
                case 'RestElement':
                    this.reinterpretAsPattern(context, params.argument);
                    return;
    
                case 'MemberExpression':
                case 'MetaProperty':
                    if (!(context & Context.InArrowParameterList)) return;
                    // Fall through
    
                default:
                    this.throwUnexpectedToken();
            }
        }
    
        private parseArrowFunction(
            context: Context,
            pos: Location,
            params: ESTree.Node[]
        ): ESTree.ArrowFunctionExpression {
    
            // A line terminator between ArrowParameters and the => should trigger a SyntaxError.
            if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
    
            this.expect(context, Token.Arrow);
    
            // Unsetting the 'AllowCall' mask here, let the parser fail correctly
            // if a non-simple arrow are followed by a call expression.
            //
            //  (a) => {}()
            //
            if (this.flags & Flags.AllowCall) this.flags &= ~Flags.AllowCall;
    
            const savedScope = this.enterFunctionScope();
    
            // A 'simple arrow' is just a plain identifier and doesn't have any param list.
            if (!(context & Context.SimpleArrow)) {
                for (const i in params) this.reinterpretAsPattern(context | Context.InArrowParameterList, params[i]);
            }
    
            let body;
            let expression = false;
    
            if (this.token === Token.LeftBrace) {
                // An arrow function could be a non-trailing member of a comma
                // expression or a semicolon terminating a full expression. In this
                // cases this productions are valid:
                //
                //   a => {}, b;
                //   (a => {}), b;
                //
                // However. If the arrow function ends a statement, ASI permits the
                // next token to start an expression statement wich makes
                // this production invalid:
                //
                //   a => {} /x/g;   // regular expression as a division
                //
                body = this.parseFunctionBody(context | Context.AllowIn);
            } else {
                body = this.parseAssignmentExpression(context | Context.AllowIn);
                expression = true;
            }
    
            this.exitFunctionScope(savedScope);
    
            return this.finishNode(pos, {
                type: 'ArrowFunctionExpression',
                body,
                params,
                id: null,
                async: !!(context & Context.Await),
                generator: !!(context & Context.Yield),
                expression
            });
        }
    
        private parseConditionalExpression(context: Context, pos: Location) {
            const expr = this.parseBinaryExpression(context, 0, pos);
            if (!this.parseOptional(context, Token.QuestionMark)) return expr;
            const consequent = this.parseAssignmentExpression(context | Context.AllowIn);
            this.expect(context, Token.Colon);
            const alternate = this.parseAssignmentExpression(context);
            return this.finishNode(pos, {
                type: 'ConditionalExpression',
                test: expr,
                consequent,
                alternate
            });
        }
    
        private parseBinaryExpression(
            context: Context,
            minPrec: number,
            pos: Location,
            expr: ESTree.Expression = this.parseUnaryExpression(context)
        ): ESTree.Expression {
    
            while (true) {
    
                const prec = this.token & Token.Precedence;
    
                if (prec === 0) return expr;
    
                if (!(context & Context.AllowIn) && this.token === Token.InKeyword) break;
    
                // Only ** is right to left.
                const operator = this.token === Token.Exponentiate ? prec >= minPrec : prec > minPrec;
    
                if (!operator) break;
    
                const binaryOperator = this.token;
    
                this.nextToken(context);
    
                expr = this.finishNode(pos, {
                    type: (binaryOperator === Token.LogicalAnd || binaryOperator === Token.LogicalOr) ?
                        'LogicalExpression' : 'BinaryExpression',
                    left: expr,
                    right: this.parseBinaryExpression(context, prec, this.getLocations()),
                    operator: tokenDesc(binaryOperator)
                });
            }
    
            return expr;
        }
    
        // 12.5 Unary Operators
    
        private parseUnaryExpression(context: Context): ESTree.UnaryExpression | ESTree.Expression {
    
            // Fast path for "await" expression
            if (context & Context.Await && this.token === Token.AwaitKeyword) {
                return this.parseAwaitExpression(context);
            }
    
            const pos = this.getLocations();
    
            let expr: ESTree.UnaryExpression | ESTree.UpdateExpression;
    
            if (hasMask(this.token, Token.UnaryOperator)) {
                const token = this.token;
                expr = this.parseUnaryExpressionFastPath(context);
                // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
                // UnaryExpression is a direct reference to a variable, function argument, or function name
                if (context & Context.Strict && token === Token.DeleteKeyword && expr.argument.type === 'Identifier') {
                    this.error(Errors.StrictDelete);
                }
                if (this.token === Token.Exponentiate) this.error(Errors.Unexpected);
            } else {
                expr = this.parseUpdateExpression(context, pos);
            }
    
            return this.parseExponentiationExpression(context, expr, pos);
        }
    
        // 12.6 Exponentiation Operator
        private parseExponentiationExpression(context: Context, expr: ESTree.Expression, pos: Location): ESTree.Expression {
            // Note: Average microbenchmark result for exponentiation production are 1.4 mill ops /sec
            if (this.token !== Token.Exponentiate) return expr;
            const precedence = hasMask(this.token, Token.BinaryOperator) ? this.token & Token.Precedence : 0;
            return this.parseBinaryExpression(context, precedence, pos, expr);
        }
    
        private parseAwaitExpression(context: Context): ESTree.AwaitExpression {
            const pos = this.getLocations();
            if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
            this.expect(context, Token.AwaitKeyword);
            return this.finishNode(pos, {
                type: 'AwaitExpression',
                argument: this.parseUnaryExpressionFastPath(context)
            });
        }
    
        private parseUnaryExpressionFastPath(context: Context): ESTree.UnaryExpression | ESTree.UpdateExpression {
            const pos = this.getLocations();
            if (hasMask(this.token, Token.UnaryOperator)) {
                const token = this.token;
                this.nextToken(context);
                return this.finishNode(pos, {
                    type: 'UnaryExpression',
                    operator: tokenDesc(token),
                    argument: this.parseUnaryExpressionFastPath(context),
                    prefix: true
                });
            }
            return this.parseUpdateExpression(context, pos);
        }
    
        private parseUpdateExpression(context: Context, pos: Location) {
    
            let expr: ESTree.Expression;
    
            if (hasMask(this.token, Token.UpdateOperator)) {
    
                const operator = this.token;
    
                this.nextToken(context);
    
                expr = this.parseLeftHandSideExpression(context, pos);
    
                if (this.isEvalOrArgumentsIdentifier(context, (expr as ESTree.Identifier).name)) {
                    this.error(Errors.StrictLHSPrefix);
                } else if (!isValidSimpleAssignmentTarget(expr)) this.error(Errors.InvalidLHSInAssignment);
    
                return this.finishNode(pos, {
                    type: 'UpdateExpression',
                    operator: tokenDesc(operator),
                    prefix: true,
                    argument: expr
                });
            }
    
            expr = this.parseLeftHandSideExpression(context, pos);
    
            if (hasMask(this.token, Token.UpdateOperator) && !(this.flags & Flags.LineTerminator)) {
    
                // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
                // Assignment operator(12.15) or of a PostfixExpression or as the UnaryExpression
                // operated upon by a Prefix Increment(12.4.6) or a Prefix Decrement(12.4.7) operator.
                if (this.isEvalOrArgumentsIdentifier(context, (expr as ESTree.Identifier).name)) {
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
    
        private parseSuper(context: Context): ESTree.Expression {
            const pos = this.getLocations();
    
            this.expect(context, Token.SuperKeyword);
    
            switch (this.token) {
    
                // '('
                case Token.LeftParen:
                    // The super property has to be within a class constructor
                    if (!(context & Context.Constructor)) this.error(Errors.BadSuperCall);
                    break;
    
                    // '.'
                case Token.Period:
                    if (!(context & Context.Method)) this.error(Errors.BadSuperCall);
                    break;
    
                    // '['
                case Token.LeftBracket:
                    if (!(context & Context.Method)) this.error(Errors.BadSuperCall);
                    break;
    
                default:
                    this.throwUnexpectedToken();
            }
    
            return this.finishNode(pos, {
                type: 'Super'
            });
        }
    
        private parseImport(context: Context, pos: Location) {
            const id = this.parseIdentifier(context);
    
            switch (this.token) {
    
                // Import.meta - Stage 3 proposal
                case Token.Period:
                    if (!(context & Context.Module)) this.error(Errors.Unexpected);
                    this.expect(context, Token.Period);
                    if (this.tokenValue !== 'meta') this.error(Errors.Unexpected);
                    return this.parseMetaProperty(context, id, pos);
    
                default:
                    return this.finishNode(pos, {
                        type: 'Import'
                    });
            }
        }
    
        // 12.3 Left-Hand-Side Expressions
    
        private parseLeftHandSideExpression(context: Context, pos: Location): ESTree.Expression {
            // LeftHandSideExpression[Yield]:
            // NewExpression[?Yield]
            // CallExpression[?Yield]
            let expr;
    
            switch (this.token) {
    
                // 'super'
                case Token.SuperKeyword:
                    expr = this.parseSuper(context);
                    break;
    
                    // 'import'
                case Token.ImportKeyword:
                    if (!(this.flags & Flags.OptionsNext)) {
                        this.throwUnexpectedToken();
                    }
                    context |= Context.Import;
                    expr = this.parseImport(context, pos);
                    break;
    
                default:
                    expr = this.parseMemberExpression(context, pos);
            }
    
            if (!(this.flags & Flags.AllowCall) && expr.type === 'ArrowFunctionExpression') {
                return expr;
            }
    
            return this.parseCallExpression(context | Context.AllowIn, pos, expr);
        }
    
        private parseMemberExpression(
            context: Context,
            pos: Location,
            expr: ESTree.CallExpression | ESTree.Expression = this.parsePrimaryExpression(context, pos)
        ): ESTree.Expression {
    
            while (true) {
    
                switch (this.token) {
    
                    // '.'
                    case Token.Period:
                        {
                            this.expect(context, Token.Period);
                            const property = this.parseIdentifier(context);
                            expr = this.finishNode(pos, {
                                type: 'MemberExpression',
                                object: expr,
                                computed: false,
                                property,
                            });
                            break;
                        }
    
                        // '['
                    case Token.LeftBracket:
                        {
                            this.expect(context, Token.LeftBracket);
                            const start = this.getLocations();
                            const property = this.parseExpression(context | Context.AllowIn, start);
                            this.expect(context, Token.RightBracket);
                            expr = this.finishNode(pos, {
                                type: 'MemberExpression',
                                object: expr,
                                computed: true,
                                property,
                            });
                            break;
                        }
    
                    case Token.TemplateCont:
                    case Token.TemplateTail:
                        {
                            const quasiPos = this.getLocations();
                            const quasi = this.token === Token.TemplateCont ?
                                this.parseTemplate(context | Context.TaggedTemplate, quasiPos) : this.parseTemplateTail(context | Context.TaggedTemplate, quasiPos);
                            expr = this.parseTaggedTemplateExpression(context, expr, quasi, pos);
                            break;
                        }
                    default:
                        return expr;
                }
            }
        }
    
        private parseCallExpression(
            context: Context,
            pos: Location,
            expr: ESTree.Expression
        ): ESTree.Expression {
    
            while (true) {
    
                expr = this.parseMemberExpression(context, pos, expr);
    
                switch (this.token) {
    
                    case Token.LeftParen:
                        const args = this.parseArguments(context & ~Context.InParameter, pos);
    
                        if (context & Context.Import && args.length !== 1 &&
                            expr.type as string === 'Import') this.error(Errors.BadImportCallArity);
    
                        expr = this.finishNode(pos, {
                            type: 'CallExpression',
                            callee: expr,
                            arguments: args
                        });
    
                        break;
                    default:
                        return expr;
                }
            }
        }
    
        private parseFunctionExpression(context: Context, pos: Location): ESTree.FunctionExpression {
    
            this.expect(context, Token.FunctionKeyword);
    
            if (this.token === Token.Multiply) {
                // If we are in the 'await' context. Check if the 'Next' option are set
                // and allow us to use async generators. If not, throw a decent error message if this isn't the case
                if (context & Context.Await && !(this.flags & Flags.OptionsNext)) this.error(Errors.InvalidAsyncGenerator);
                this.expect(context, Token.Multiply);
                context |= Context.Yield;
            }
    
            let id: ESTree.Identifier | null = null;
    
            if (this.token !== Token.LeftParen) {
                const token = this.token;
                if (!this.isIdentifier(context, token)) this.throwUnexpectedToken();
                if (this.isEvalOrArgumentsIdentifier(context, this.tokenValue)) this.error(Errors.StrictLHSAssignment);
    
                switch (token) {
                    case Token.AwaitKeyword:
                    case Token.YieldKeyword:
                        if (context & (Context.Await | Context.Yield)) {
                            this.error(Errors.DisallowedInContext, tokenDesc(token));
                        }
                        break;
                    default: // ignore
                }
    
                id = this.parseIdentifier(context);
            }
    
            const savedScope = this.enterFunctionScope();
            const params = this.parseParameterList(context | Context.InParameter, ObjectState.None);
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
    
        private parseParameterList(context: Context, state: ObjectState): ESTree.Node[] {
            // FormalParameters [Yield,Await]: (modified)
            //      [empty]
            //      FormalParameterList[?Yield,Await]
            //
            // FormalParameter[Yield,Await]: (modified)
            //      BindingElement[?Yield,Await]
            //
            // BindingElement [Yield,Await]: (modified)
            //      SingleNameBinding[?Yield,?Await]
            //      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
            //
            // SingleNameBinding [Yield,Await]:
            //      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
    
            this.expect(context, Token.LeftParen);
            const result = [];
            this.flags &= ~Flags.SimpleParameterList;
    
            while (this.token !== Token.RightParen) {
    
                if (this.token === Token.Ellipsis) {
                    this.flags |= Flags.SimpleParameterList;
                    result.push(this.parseRestElement(context));
                    this.parseOptional(context, Token.Comma);
                    break;
                }
    
                result.push(this.parseFormalParameter(context));
                if (this.token !== Token.RightParen) this.expect(context, Token.Comma);
            }
    
            if (state & ObjectState.Get && result.length > 0) {
                this.error(Errors.BadGetterArity);
            }
    
            if (state & ObjectState.Set && result.length !== 1) {
                this.error(Errors.BadSetterArity);
            }
    
            this.expect(context, Token.RightParen);
    
            return result;
        }
    
        private parseFormalParameter(
            context: Context,
        ): ESTree.AssignmentPattern | ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.RestElement {
            const pos = this.getLocations();
    
            if (this.token !== Token.Identifier) {
                this.errorLocation = pos;
                this.flags |= Flags.SimpleParameterList;
            }
    
            const left = this.parseBindingPatternOrIdentifier(context, pos);
    
            // Initializer[In, Yield] :
            //     = AssignmentExpression[?In, ?Yield]
            if (!this.parseOptional(context, Token.Assign)) return left;
    
            switch (this.token) {
    
                case Token.YieldKeyword:
                case Token.AwaitKeyword:
                    if (context & Context.Await || (context & (Context.Strict | Context.Yield))) {
                        this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    }
    
                default: // ignore
            }
    
            const right = this.parseAssignmentExpression(context);
    
            return this.finishNode(pos, {
                type: 'AssignmentPattern',
                left,
                right
            });
        }
    
        private parseAsyncFunctionExpression(
            context: Context,
            pos: Location
        ): ESTree.CallExpression | ESTree.FunctionExpression | ESTree.ArrowFunctionExpression | ESTree.Identifier | void {
            // Note: We are "bending" the EcmaScript specs a litle, and expand
            // the AsyncFunctionExpression production to also deal with
            // CoverCallExpressionAndAsyncArrowHead and AsyncArrowFunction productions.
            // This to avoid complications with the CoverCallExpressionAndAsyncArrowHead production
            // and ArrowFunction production where the latter has to parse out programs. like:
            //
            //  async a => {}
            //  () => {}
            //
    
            const isEscaped = !!(this.flags & Flags.HasUnicode);
            const id = this.parseIdentifier(context);
            const flags = this.flags;
    
            this.flags |= Flags.SimpleParameterList;
    
            switch (this.token) {
    
                // 'parseAsyncFunctionExpression'
                case Token.FunctionKeyword:
                    // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
                    // we got an LineTerminator. The 'FunctionExpression' will be parsed out in 'parsePrimaryExpression'
                    if (this.flags & Flags.LineTerminator) return id;
                    return this.parseFunctionExpression(context & ~Context.Yield | Context.Await, pos);
    
                    // 'AsyncArrowFunction[In, Yield, Await]'
                case Token.YieldKeyword:
                case Token.Identifier:
                    // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
                    // we got an LineTerminator. The 'ArrowFunctionExpression' will be parsed out in 'parseAssignmentExpression'
                    if (this.flags & Flags.LineTerminator) return id;
                    const expr = this.parseIdentifier(context);
                    if (this.token === Token.Arrow) return this.parseArrowFunction(context & ~Context.Yield | Context.AllowIn | Context.Await, pos, [expr]);
                    // Invalid: 'async abc'
                    this.throwUnexpectedToken();
    
                    // CoverCallExpressionAndAsyncArrowHead[Yield, Await]:
                case Token.LeftParen:
                    // This could be either a CallExpression or the head of an async arrow function
                    return this.parseAsyncArguments(context | Context.AllowIn, pos, id, flags, isEscaped);
                default:
                    // Async as Identifier
                    return id;
            }
        }
    
        private parseAsyncArguments(
            context: Context,
            pos: Location,
            id: ESTree.Identifier,
            flags: Flags,
            isEscaped: boolean
        ): ESTree.ArrowFunctionExpression {
            // Modified ArgumentList production to deal with async stuff. This so we can
            // speed up the "normal" CallExpression production. This also deal with the
            // CoverCallExpressionAndAsyncArrowHead production directly
            // J.K. Thomas
    
            this.expect(context, Token.LeftParen);
    
            const args: any[] = [];
            let state = ParenthesizedState.None;
    
            while (this.token !== Token.RightParen) {
    
                if (this.token === Token.Ellipsis) {
                    const elem = this.parseSpreadElement(context);
                    // Trailing comma in async arrow param list
                    if (this.token !== Token.RightParen) {
                        state |= ParenthesizedState.Trailing;
                        this.errorLocation = this.errorLocation = this.getLocations();
                    }
                    args.push(elem);
                } else {
                    if (context & Context.Strict) {
                        if (!(state & ParenthesizedState.EvalOrArg) && this.isEvalOrArguments(this.tokenValue)) {
                            this.errorLocation = this.errorLocation = this.getLocations();
                            state |= ParenthesizedState.EvalOrArg;
                        }
                    }
                    if (!(state & ParenthesizedState.Await) && this.token === Token.AwaitKeyword) {
                        this.errorLocation = this.getLocations();
                        state |= ParenthesizedState.Await;
                    }
                    if (!(state & ParenthesizedState.Parenthesized) && this.token === Token.LeftParen) {
                        this.errorLocation = this.getLocations();
                        state |= ParenthesizedState.Parenthesized;
                    }
                    args.push(this.parseAssignmentExpression(context | Context.InAsyncParameterList));
                }
    
                if (this.token === Token.RightParen) break;
    
                this.expect(context, Token.Comma);
    
                if (this.token === Token.RightParen) break;
            }
    
            this.expect(context, Token.RightParen);
    
            if (this.token === Token.Arrow) {
                if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
                // async arrows cannot have a line terminator between "async" and the formals
                if (flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
                // Valid: 'async(a=await)=>12'. 
                // Invalid: 'async(await)=>12'. 
                if (this.flags & Flags.HaveSeenAwait) this.error(Errors.InvalidAwaitInArrowParam);
                if (state & ParenthesizedState.EvalOrArg) this.error(Errors.StrictParamName);
                if (state & ParenthesizedState.Parenthesized) this.error(Errors.InvalidParenthesizedPattern);
                if (state & ParenthesizedState.Await) this.error(Errors.InvalidAwaitInArrowParam);
                if (state & ParenthesizedState.Trailing) this.throwUnexpectedToken();
                return this.parseArrowFunction(context & ~Context.Yield | Context.Await, pos, args);
            }
    
            // We are done, so unset the bitmask
            if (this.flags & Flags.HaveSeenAwait) this.flags &= ~Flags.HaveSeenAwait;
    
            this.errorLocation = undefined;
    
            return this.finishNode(pos, {
                type: 'CallExpression',
                callee: id,
                arguments: args
            });
        }
    
        private parseFunctionBody(context: Context): ESTree.BlockStatement {
            const pos = this.getLocations();
    
            this.expect(context, Token.LeftBrace);
            let body: ESTree.Statement[] = [];
    
            if (this.token !== Token.RightBrace) {
                const previousLabelSet = this.labelSet;
                this.labelSet = undefined;
                const savedFlags = this.flags;
                this.flags |= Flags.InFunctionBody;
                this.flags &= ~(Flags.Switch | Flags.Break | Flags.Iteration);
                body = this.parseStatementList(context & ~Context.Lexical, Token.RightBrace);
                this.labelSet = previousLabelSet;
                this.flags = savedFlags;
            }
    
            this.expect(context, Token.RightBrace);
            return this.finishNode(pos, {
                type: 'BlockStatement',
                body
            });
        }
    
        private parseSpreadElement(context: Context): ESTree.SpreadElement {
            const pos = this.getLocations();
            // Disallow SpreadElement inside dynamic import
            if (context & Context.Import) this.throwUnexpectedToken();
            this.expect(context, Token.Ellipsis);
            const arg = this.parseAssignmentExpression(context);
            return this.finishNode(pos, {
                type: 'SpreadElement',
                argument: arg
            });
        }
    
        private parseArguments(context: Context, pos: Location): ESTree.Expression[] {
            this.expect(context, Token.LeftParen);
    
            const args: any[] = [];
    
            while (this.token !== Token.RightParen) {
                const expr = this.token === Token.Ellipsis ? this.parseSpreadElement(context) :
                    this.parseAssignmentExpression(context);
                args.push(expr);
    
                if (this.token !== Token.RightParen) this.expect(context, Token.Comma);
            }
    
            this.expect(context, Token.RightParen);
    
            return args;
        }
    
        private parseMetaProperty(
            context: Context,
            meta: ESTree.Identifier,
            pos: Location
        ): ESTree.MetaProperty {
            return this.finishNode(pos, {
                meta,
                type: 'MetaProperty',
                property: this.parseIdentifier(context)
            });
        }
    
        private parseNewExpression(context: Context): ESTree.MetaProperty | ESTree.NewExpression {
    
            const pos = this.getLocations();
    
            if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
    
            const id = this.parseIdentifier(context);
    
            switch (this.token) {
    
                // '.'
                case Token.Period:
    
                    this.expect(context, Token.Period);
    
                    if (this.token === Token.Identifier) {
                        if (this.tokenValue !== 'target') this.error(Errors.MetaNotInFunctionBody);
                        if (context & Context.InParameter) return this.parseMetaProperty(context, id, pos);
                        if (!(this.flags & Flags.InFunctionBody)) this.error(Errors.MetaNotInFunctionBody);
                    }
    
                    return this.parseMetaProperty(context, id, pos);
    
                    // 'import'
                case Token.ImportKeyword:
                    this.throwUnexpectedToken();
    
                default:
    
                    return this.finishNode(pos, {
                        type: 'NewExpression',
                        callee: this.parseMemberExpression(context, pos),
                        arguments: this.token === Token.LeftParen ? this.parseArguments(context, pos) : []
                    });
            }
        }
    
        private parsePrimaryExpression(context: Context, pos: Location) {
    
            switch (this.token) {
                case Token.NumericLiteral:
                    if (this.flags & Flags.BigInt) return this.parseBigIntLiteral(context);
                case Token.StringLiteral:
                    return this.parseLiteral(context);
                case Token.Identifier:
                    return this.parseIdentifier(context | Context.TaggedTemplate);
                case Token.FunctionKeyword:
                    return this.parseFunctionExpression(context & ~Context.Yield | Context.InParenthesis, pos);
                case Token.ThisKeyword:
                    return this.parseThisExpression(context);
                case Token.NullKeyword:
                    return this.parseNullExpression(context);
                case Token.TrueKeyword:
                case Token.FalseKeyword:
                    return this.parseTrueOrFalseExpression(context);
                case Token.LeftParen:
                    return this.parseParenthesizedExpression(context | Context.InParenthesis | Context.AllowIn);
                case Token.LeftBracket:
                    return this.parseArrayInitializer(context);
                case Token.NewKeyword:
                    return this.parseNewExpression(context);
                case Token.SuperKeyword:
                    return this.parseSuper(context);
                case Token.ClassKeyword:
                    return this.parseClassExpression(context);
                case Token.LeftBrace:
                    return this.parseObjectExpression(context);
                case Token.TemplateTail:
                    return this.parseTemplateTail(context, pos);
                case Token.TemplateCont:
                    return this.parseTemplate(context, pos);
                case Token.Divide:
                case Token.DivideAssign:
                    return this.parseRegularExpression(context);
                case Token.AsyncKeyword:
                    return this.parseAsyncFunctionExpression(context, pos);
                case Token.DoKeyword:
                    return this.parseDoExpression(context);
                case Token.ThrowKeyword:
                    return this.parseThrowExpression(context);
                case Token.AwaitKeyword:
                    if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedReservedWord);
    
                    if (context & Context.Await) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
    
                    if (context & Context.Module) {
                        // Valid: 'await = 0;'
                        if (!this.nextTokenIsAssign(context)) this.throwUnexpectedToken();
                    }
                    return this.parseIdentifier(context);
                case Token.LetKeyword:
                    if (this.flags & Flags.LineTerminator) this.throwUnexpectedToken();
                    // falls through
                case Token.LessThan:
                    if (this.flags & Flags.OptionsJSX) return this.parseJSXElement(context | Context.JSXChild);
                default:
                    if (!this.isIdentifier(context, this.token)) this.throwUnexpectedToken();
                    return this.parseIdentifier(context);
            }
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
    
                if (context & Context.TopLevel) {
                    if (!this.initBlockScope() && (
                            this.blockScope !== this.functionScope && this.blockScope[name] ||
                            this.blockScope[name] === ScopeMasks.NonShadowable
                        )) {
                        this.error(Errors.DuplicateIdentifier, name);
                    }
                    this.blockScope[name] = ScopeMasks.Shadowable;
                }
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
            let classBody;
            let flags = ObjectState.None;
            const savedFlags = this.flags;
            const id = this.isIdentifier(context, this.token) ? this.parseIdentifier(context | Context.Strict) : null;
    
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
            const isEscaped = !!(this.flags & Flags.HasUnicode);
            if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;
    
            if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
            if (this.tokenValue === 'constructor') state |= ObjectState.HasConstructor;
    
            key = this.parsePropertyName(context & ~Context.Strict);
    
            // cannot use 'await' inside async functions.
            if (context & Context.Await && this.flags & Flags.InFunctionBody && this.token === Token.AwaitKeyword) {
                this.error(Errors.InvalidAwaitInArrowParam);
            }
    
            if (this.canFollowModifier(context, this.token)) {
    
                // 'static'
                if (token === Token.StaticKeyword) {
                    if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
                    token = this.token;
                    state |= ObjectState.Static;
    
                    if (this.parseOptional(context, Token.Multiply)) {
                        state |= ObjectState.Yield;
                    } else {
                        if (token === Token.LeftBracket) state |= ObjectState.Computed;
                        key = this.parsePropertyName(context);
                    }
                }
    
                if (token === Token.AsyncKeyword) {
    
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
                        // Invalid: `class X { async static f() {} }`
                        if (this.token === Token.StaticKeyword) this.error(Errors.InvalidMethod);
                        key = this.parsePropertyName(context);
    
                        if (token === Token.ConstructorKeyword) this.error(Errors.ConstructorIsAsync);
                    }
                }
            }
    
            // MethodDeclaration
            if (this.canFollowModifier(context, this.token)) {
    
                // should fail on escape sequences in contextual keywords.
                if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword)
    
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
                if (state & ObjectState.Heritage && state & ObjectState.HasConstructor) context |= Context.Constructor;
    
    
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
    
        private canFollowModifier(context: Context, t: Token): boolean {
            switch (t) {
                case Token.LeftBracket:
                case Token.Multiply:
                case Token.StringLiteral:
                case Token.NumericLiteral:
                case Token.LeftBracket:
                    return true;
                default:
                    return t === Token.Identifier || hasMask(t, Token.Keyword);
            }
        }
    
        private parseObjectExpression(context: Context): ESTree.ObjectExpression {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.LeftBrace);
    
            if (!(this.flags & Flags.SimpleParameterList)) {
                this.flags |= Flags.SimpleParameterList;
            }
            const properties: (ESTree.Property | ESTree.SpreadElement)[] = [];
            let firstProto = undefined;
    
            while (this.token !== Token.RightBrace) {
    
                if (this.token === Token.Ellipsis) {
                    if (!(this.flags & Flags.OptionsNext)) this.throwUnexpectedToken();
                    properties.push(this.parseSpreadElement(context));
                } else {
                    this.firstProto = firstProto;
                    const elem = this.parseObjectElement(context);
                    if (!firstProto && this.firstProto) firstProto = this.firstProto;
                    properties.push(elem);
                }
                if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
            }
            this.expect(context, Token.RightBrace);
            return this.finishNode(pos, {
                type: 'ObjectExpression',
                properties
            });
        }
    
        private parseObjectElement(context: Context): ESTree.Property {
            const pos = this.getLocations();
            const token = this.token;
            const tokenValue = this.tokenValue;
            const isEscaped = !!(this.flags & Flags.HasUnicode);
            let state = ObjectState.None;
            let firstProto = this.firstProto;
            let key: ESTree.Expression | null = null;
            let value = null;
    
            if (this.isIdentifierOrKeyword(token)) {
                this.nextToken(context);
                if (this.canFollowModifier(context, this.token)) {
                    // should fail on escape sequences in contextual keywords.
                    if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword)
                    switch (token) {
                        case Token.AsyncKeyword:
                            if (this.flags & Flags.LineTerminator) this.error(Errors.LineBreakAfterAsync);
                            // Asynchronous Iteration - Stage 3 proposal
                            if (!(this.flags & Flags.OptionsNext) && this.token === Token.Multiply) {
                                this.error(Errors.InvalidAsyncGenerator);
                            }
                            if (this.parseOptional(context, Token.Multiply)) state |= ObjectState.Yield;
                            state |= ObjectState.Async | ObjectState.Method;
                            break;
                        case Token.GetKeyword:
                            state |= ObjectState.Get;
                            break;
                        case Token.SetKeyword:
                            state |= ObjectState.Set;
                            break;
                        default: // ignore
                    }
    
                    if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
                    key = this.parsePropertyName(context);
    
                } else {
                    key = this.finishNode(pos, {
                        type: 'Identifier',
                        name: this.tokenValue
                    });
                }
    
            } else {
    
                if (this.parseOptional(context, Token.Multiply)) {
                    state |= ObjectState.Yield | ObjectState.Method;
                }
    
                if (this.token === Token.LeftBracket) {
                    state |= ObjectState.Computed;
                }
    
                key = this.parsePropertyName(context);
            }
    
            switch (this.token) {
    
                case Token.LeftParen:
                    if (!(state & ObjectState.Accessors)) state |= ObjectState.Method;
                    value = this.parseMethodDefinition(context | Context.Method, state);
                    break;
    
                case Token.Colon:
    
                    if (state & ObjectState.Yield) this.error(Errors.Unexpected);
                    if (!(state & ObjectState.Computed) && this.tokenValue === '__proto__') {
                        if (firstProto) this.error(Errors.DuplicateProtoProperty);
                        this.firstProto = true;
                    }
                    this.expect(context, Token.Colon);
    
                    if (context & Context.InAsyncParameterList && this.token === Token.AwaitKeyword) {
                        this.errorLocation = this.getLocations();
                        this.flags |= Flags.HaveSeenAwait;
                    }
    
                    value = this.parseAssignmentExpression(context);
    
                    if (this.isEvalOrArgumentsIdentifier(context, (value as any).name)) {
                        this.error(Errors.UnexpectedStrictReserved);
                    }
                    break;
    
                default:
    
                    if (state & ObjectState.Async || !this.isIdentifier(context, token)) {
                        this.throwUnexpectedToken();
                    }
                    if (context & Context.Yield && token === Token.YieldKeyword) {
                        this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    }
    
                    if (token === Token.AwaitKeyword) {
                        if (context & Context.Await) this.throwUnexpectedToken();
                        if (context & Context.InAsyncParameterList) {
                            this.errorLocation = this.getLocations();
                            this.flags |= Flags.HaveSeenAwait;
                        }
                    }
    
                    if (context & (Context.ForStatement | Context.InParenthesis) &&
                        this.isEvalOrArgumentsIdentifier(context, tokenValue)) {
                        this.error(Errors.UnexpectedReservedWord);
                    }
    
                    state |= ObjectState.Shorthand;
    
                    if (this.token === Token.Assign) {
                        value = this.parseAssignmentPattern(context, pos, key);
                    } else {
                        value = key;
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
    
        private parseMethodDefinition(context: Context, state: ObjectState): ESTree.FunctionExpression {
    
            const pos = this.getLocations();
    
            if (Context.Yield | Context.Await) context &= ~(Context.Yield | Context.Await);
    
            if (state & ObjectState.Yield && !(state & ObjectState.Get)) context |= Context.Yield;
            if (state & ObjectState.Async) context |= Context.Await;
    
            const savedFlag = this.flags;
            const savedScope = this.enterFunctionScope();
    
            const params: any = this.parseParameterList(context | Context.InParameter, state);
            if (state & ObjectState.Set) {
                if (params[0].type === 'RestElement') {
                    this.error(Errors.BadSetterRestParameter);
                }
            }
    
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
    
        private parseRestElement(context: Context) {
            const pos = this.getLocations();
    
            this.expect(context, Token.Ellipsis);
            const argument = this.parseBindingPatternOrIdentifier(context, pos);
            if (this.token === Token.Assign) this.throwUnexpectedToken();
            if (this.token !== Token.RightParen) this.error(Errors.ParameterAfterRestParameter);
            return this.finishNode(pos, {
                type: 'RestElement',
                argument
            });
        }
    
        private parseThrowExpression(context: Context) {
    
            if (!(this.flags & Flags.OptionsNext)) {
                this.error(Errors.UnsupportedFeature, tokenDesc(this.token), 'next');
            }
    
            const pos = this.getLocations();
            this.nextToken(context);
            return this.finishNode(pos, {
                type: 'ThrowExpression',
                expressions: this.parseUnaryExpressionFastPath(context)
            });
        }
    
        private parseArrayInitializer(context: Context): ESTree.ArrayExpression {
            const pos = this.getLocations();
            this.expect(context, Token.LeftBracket);
            const elements = [];
            let state = ArrayState.None;
            while (this.token !== Token.RightBracket) {
                if (this.parseOptional(context, Token.Comma)) {
                    elements.push(null);
                } else if (this.token === Token.Ellipsis) {
                    state |= ArrayState.Spread;
                    const element = this.parseSpreadElement(context);
                    if (this.token !== Token.RightBracket) {
                        this.expect(context, Token.Comma);
                    }
                    elements.push(element);
                } else {
                    if (this.isEvalOrArguments(this.tokenValue)) {
                        state |= ArrayState.EvalArg;
                        this.errorLocation = this.getLocations();
                    }
    
                    // Invalid: 'function* f() { [yield {a = 0}]; }'
                    if (context & Context.Yield && this.flags & Flags.InFunctionBody && this.token === Token.YieldKeyword) {
                        this.error(Errors.InvalidShorthandAssignment);
                    }
    
                    elements.push(this.parseAssignmentExpression(context | Context.AllowIn));
                    if (this.token !== Token.RightBracket) {
                        this.expect(context, Token.Comma);
                    }
                }
            }
            this.expect(context, Token.RightBracket);
    
            if (this.token === Token.Assign) {
                if (state & ArrayState.EvalArg) this.error(Errors.StrictParamName);
            }
    
            return this.finishNode(pos, {
                type: 'ArrayExpression',
                elements
            });
        }
    
        // ParenthesizedExpression[Yield, Await]:
        // CoverParenthesizedExpressionAndArrowParameterList[Yield, Await]:
        private parseParenthesizedExpression(context: Context): ESTree.Expression {
    
            const pos = this.getLocations();
            this.expect(context, Token.LeftParen);
    
            if (context & Context.ForStatement) {
                if (hasMask(this.token, Token.BindingPattern)) this.error(Errors.InvalidLHSInForLoop);
                context & ~Context.ForStatement
            }
    
            let state = ParenthesizedState.None;
    
            if (this.parseOptional(context, Token.RightParen)) {
                if (this.token === Token.Arrow) {
                    return this.parseArrowFunction(context & ~(Context.Await | Context.Yield), pos, []);
                }
                this.error(Errors.MissingArrowAfterParentheses);
            }
    
            let expr: ESTree.Expression;
    
            if (this.token === Token.Ellipsis) {
                expr = this.parseRestElement(context);
                this.expect(context, Token.RightParen);
                return this.parseArrowFunction(context & ~(Context.Await | Context.Yield), pos, [expr]);
            }
    
            const sequencePos = this.getLocations();
    
            if (context & Context.Strict) {
                if (!(state & ParenthesizedState.EvalOrArg) && this.isEvalOrArguments(this.tokenValue)) {
                    state |= ParenthesizedState.EvalOrArg;
                }
            }
    
            if (!(state & ParenthesizedState.Parenthesized) && this.token === Token.LeftParen) {
                state |= ParenthesizedState.Parenthesized;
            }
    
            if (!(state & ParenthesizedState.Pattern) && hasMask(this.token, Token.BindingPattern)) {
                this.errorLocation = sequencePos;
                state |= ParenthesizedState.Pattern;
            }
            expr = this.parseAssignmentExpression(context);
    
            if (this.token === Token.Comma) {
    
                const expressions: ESTree.Expression[] = [expr];
    
                while (this.parseOptional(context, Token.Comma)) {
                    if (this.parseOptional(context, Token.RightParen)) {
                        return this.parseArrowFunction(context & ~(Context.Await | Context.Yield), pos, expressions);
                    } else if (this.token === Token.Ellipsis) {
                        expressions.push(this.parseRestElement(context));
                        this.expect(context, Token.RightParen);
                        return this.parseArrowFunction(context & ~(Context.Await | Context.Yield), pos, expressions);
                    } else {
                        if (context & Context.Strict) {
                            const errPos = this.getLocations();
                            if (!(state & ParenthesizedState.EvalOrArg) && this.isEvalOrArguments(this.tokenValue)) {
                                this.errorLocation = errPos;
                                state |= ParenthesizedState.EvalOrArg;
                            }
                        }
                        if (!(state & ParenthesizedState.Parenthesized) && this.token === Token.LeftParen) {
                            this.errorLocation = this.getLocations();
                            state |= ParenthesizedState.Parenthesized;
                        }
    
                        expressions.push(this.parseAssignmentExpression(context));
                    }
                }
    
                expr = this.finishNode(sequencePos, {
                    type: 'SequenceExpression',
                    expressions
                });
            }
    
            if (!(this.flags & Flags.AllowCall)) this.flags |= Flags.AllowCall;
    
            this.expect(context, Token.RightParen);
    
            if (this.token === Token.Arrow) {
                if (this.flags & Flags.HaveSeenYield) this.error(Errors.InvalidArrowYieldParam);
                if (state & ParenthesizedState.EvalOrArg) this.error(Errors.StrictParamName);
                if (state & ParenthesizedState.Parenthesized) this.error(Errors.InvalidParenthesizedPattern);
                return this.parseArrowFunction(context, pos, expr.type === 'SequenceExpression' ? expr.expressions : [expr]);
            }
    
            this.errorLocation = undefined;
    
            if (state & ParenthesizedState.Pattern) {
                this.flags |= Flags.ParenthesizedPattern;
            }
    
            return expr;
        }
    
        private parseRegularExpression(context: Context): ESTree.RegExpLiteral {
            this.scanRegularExpression();
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
    
        private parseTemplateTail(context: Context, pos: Location): ESTree.TemplateLiteral {
            return this.finishNode(pos, {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [this.parseTemplateElement(context)]
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
    
        private parseTemplateElement(context: Context): ESTree.TemplateElement {
            const pos = this.getLocations();
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
    
        private parseTaggedTemplateExpression(
            context: Context,
            expr: ESTree.Expression,
            quasi: any,
            pos: Location
        ): ESTree.TaggedTemplateExpression {
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
                if (this.token === Token.RightBrace) {
                    this.throwUnexpectedToken();
                }
                const cooked = this.tokenValue;
                const raw = this.tokenRaw;
                this.expect(context, Token.TemplateCont);
                // Note: A TemplateSpan should always be followed by an Expression, while a
                // 'TemplateTail' terminates a TemplateLiteral and does not need to be
                // followed by an Expression.
                expressions.push(this.parseExpression(context, pos));
                quasis.push(this.parseTemplateHead(context, cooked, raw));
            }
    
            while (this.token === Token.TemplateTail) {
                quasis.push(this.parseTemplateElement(context));
            }
    
            return this.finishNode(pos, {
                type: 'TemplateLiteral',
                expressions,
                quasis
            });
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
    
            if (value === 'use strict' && !(this.flags & (Flags.HasUnicode | Flags.HasStrictDirective))) {
                this.flags |= Flags.HasStrictDirective;
            }
    
            if (context & Context.Strict && this.flags & Flags.Noctal) this.error(Errors.Unexpected);
    
            this.nextToken(context);
    
            const node = this.finishNode(pos, {
                type: 'Literal',
                value
            });
    
            if (this.flags & Flags.OptionsRaw) node.raw = raw;
    
            return node;
        }
    
        private parseTrueOrFalseExpression(context: Context): ESTree.Literal {
            const pos = this.getLocations();
            const value = this.tokenValue === 'true';
            const raw = this.tokenValue;
            if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
            this.nextToken(context);
            const node = this.finishNode(pos, {
                type: 'Literal',
                value
            });
    
            if (this.flags & Flags.OptionsRaw) node.raw = raw;
    
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
            if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
            this.nextToken(context);
            const node = this.finishNode(pos, {
                type: 'Literal',
                value: null
            });
    
            if (this.flags & Flags.OptionsRaw) node.raw = 'null';
            return node;
        }
    
        private parseIdentifier(context: Context): ESTree.Identifier {
            const name = this.tokenValue;
            const pos = this.getLocations();
            this.nextToken(context);
    
            return this.finishNode(pos, {
                type: 'Identifier',
                name
            });
        }
    
        /****
         * Label
         */
    
        private validateLabel(name: string) {
            if (this.labelSet === undefined || !('@' + name in this.labelSet)) {
                this.error(Errors.UnknownLabel, name);
            }
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
                case 'Number':
                case 'String':
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
    
        /****
         * Pattern
         */
    
        private parseAssignmentPattern(
            context: Context,
            pos: Location = this.getLocations(),
            pattern: any = this.parseBindingPatternOrIdentifier(context, pos)
        ): ESTree.AssignmentPattern {
    
            if (!this.parseOptional(context, Token.Assign)) return pattern;
    
            if (context & Context.InParameter && context & Context.Yield && this.token === Token.YieldKeyword) this.error(Errors.Unexpected);
            const right = this.parseAssignmentExpression(context);
            return this.finishNode(pos, {
                type: 'AssignmentPattern',
                left: pattern,
                right
            });
        }
    
        private parseBindingPatternOrIdentifier(
            context: Context,
            pos: Location
        ): ESTree.Identifier | ESTree.ObjectPattern {
    
            switch (this.token) {
    
                case Token.LeftBracket:
                    return this.parseAssignmentElementList(context);
    
                case Token.LeftBrace:
                    return this.ObjectAssignmentPattern(context, pos);
    
                case Token.YieldKeyword:
                    if (context & Context.Yield) {
                        this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    }
                    if (context & Context.Strict) {
                        if (this.flags & Flags.HasUnicode) this.error(Errors.UnexpectedEscapedKeyword);
                        this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    }
    
                case Token.AwaitKeyword:
                    if (context & (Context.Module | Context.Await)) this.throwUnexpectedToken();
                    return this.parseBindingIdentifier(context);
    
                case Token.LetKeyword:
                    if (context & Context.Strict && this.flags & Flags.HasUnicode) {
                        this.error(Errors.UnexpectedEscapedKeyword);
                    }
                    if (context & Context.Lexical) this.error(Errors.LetInLexicalBinding);
    
                default:
                    if (!this.isIdentifier(context, this.token)) this.throwUnexpectedToken();
                    return this.parseBindingIdentifier(context);
            }
        }
    
        private parseBindingIdentifier(context: Context): ESTree.Identifier {
    
            const pos = this.getLocations();
    
            const name = this.tokenValue;
            const token = this.token;
    
            if (this.isEvalOrArguments(name)) {
                if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
                if (context & Context.InParameter) {
                    this.errorLocation = this.getLocations();
                    this.flags |= Flags.BindingPosition;
                }
            }
    
            if (context & Context.InParameter) {
                // In a parameter list, we only check for duplicate params
                // if inside a strict, method or await context
                if (context & (Context.Strict | Context.Await | Context.Method)) {
                    this.addFunctionArg(name);
                }
            } else {
                this.addVarOrBlock(context, name);
            }
    
            this.nextToken(context);
    
            return this.finishNode(pos, {
                type: 'Identifier',
                name
            });
        }
    
        private parseAssignmentRestElement(context: Context): ESTree.RestElement {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
            const argument = this.parseBindingPatternOrIdentifier(context, pos);
            if (this.token === Token.Assign) this.throwUnexpectedToken();
            return this.finishNode(pos, {
                type: 'RestElement',
                argument
            });
        }
    
        /**
         * ArrayAssignmentPattern[Yield] :
         *   [ Elisionopt AssignmentRestElement[?Yield]opt ]
         *   [ AssignmentElementList[?Yield] ]
         *   [ AssignmentElementList[?Yield] , Elisionopt AssignmentRestElement[?Yield]opt ]
         *
         * AssignmentRestElement[Yield] :
         *   ... DestructuringAssignmentTarget[?Yield]
         *
         * AssignmentElementList[Yield] :
         *   AssignmentElisionElement[?Yield]
         *   AssignmentElementList[?Yield] , AssignmentElisionElement[?Yield]
         *
         * AssignmentElisionElement[Yield] :
         *   Elisionopt AssignmentElement[?Yield]
         *
         * AssignmentElement[Yield] :
         *   DestructuringAssignmentTarget[?Yield] Initializer[In,?Yield]opt
         *
         * DestructuringAssignmentTarget[Yield] :
         *   LeftHandSideExpression[?Yield]
         */
        private parseAssignmentElementList(context: Context) {
            const pos = this.getLocations();
            this.expect(context, Token.LeftBracket);
    
            const elements: (ESTree.Pattern | null)[] = [];
    
            while (this.token !== Token.RightBracket) {
                if (this.parseOptional(context, Token.Comma)) {
                    elements.push(null);
                } else {
                    if (this.token === Token.Ellipsis) {
                        elements.push(this.parseAssignmentRestElement(context));
                        break;
                    }
                    elements.push(this.parseAssignmentPattern(context | Context.AllowIn));
    
                    if (this.token !== Token.RightBracket) this.expect(context, Token.Comma);
                }
            }
    
            this.expect(context, Token.RightBracket);
    
            return this.finishNode(pos, {
                type: 'ArrayPattern',
                elements
            });
        }
    
        private parsePropertyName(context: Context): ESTree.Literal | ESTree.Identifier | ESTree.Expression {
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
    
        private parseComputedPropertyName(context: Context): ESTree.Expression {
            this.expect(context, Token.LeftBracket);
            const expression = this.parseAssignmentExpression(context | Context.AllowIn);
            this.expect(context, Token.RightBracket);
            return expression;
        }
    
        private ObjectAssignmentPattern(context: Context, pos: Location): ESTree.ObjectPattern {
            const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];
            this.expect(context, Token.LeftBrace);
    
            while (this.token !== Token.RightBrace) {
                if (this.token === Token.Ellipsis) {
                    if (!(this.flags & Flags.OptionsNext)) this.throwUnexpectedToken();
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
    
        private parseRestProperty(context: Context): ESTree.RestElement {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
    
            if (this.token !== Token.Identifier) this.throwUnexpectedToken();
            const arg = this.parseBindingPatternOrIdentifier(context, pos);
            if (this.token === Token.Assign) this.throwUnexpectedToken();
    
            return this.finishNode(pos, {
                type: 'RestElement',
                argument: arg
            });
        }
    
        private parseAssignmentProperty(context: Context): ESTree.AssignmentProperty {
    
            let pos = this.getLocations();
            let state = ObjectState.None;
            let key;
            let value;
    
            if (this.isIdentifier(context, this.token)) {
                pos = this.getLocations();
                const token = this.token;
                const tokenValue = this.tokenValue;
    
                key = this.parsePropertyName(context);
                const init = this.finishNode(pos, {
                    type: 'Identifier',
                    name: tokenValue
                });
    
                if (this.parseOptional(context, Token.Colon)) {
                    value = this.parseAssignmentPattern(context);
                } else {
    
                    state |= ObjectState.Shorthand;
    
                    if (context & Context.Yield && token === Token.YieldKeyword) {
                        this.error(Errors.DisallowedInContext, tokenDesc(token));
                    }
    
                    if (this.token === Token.Assign) {
                        value = this.parseAssignmentPattern(context, pos, init);
                    } else {
                        value = init;
                    }
                }
    
            } else {
    
                if (this.token === Token.LeftBracket) state |= ObjectState.Computed;
                key = this.parsePropertyName(context);
                this.expect(context, Token.Colon);
                value = this.parseAssignmentPattern(context);
            }
    
            return this.finishNode(pos, {
                type: 'Property',
                kind: 'init',
                key,
                computed: !!(state & ObjectState.Computed),
                value,
                method: false,
                shorthand: !!(state & ObjectState.Shorthand)
            });
        }
    
        /** V8 */
    
        private parseDoExpression(context: Context): ESTree.Expression {
    
            if (!(this.flags & Flags.OptionsV8)) {
                this.error(Errors.UnsupportedFeature, tokenDesc(this.token), 'v8');
            }
    
            const pos = this.getLocations();
            this.expect(context, Token.DoKeyword);
            const body = this.parseBlockStatement(context);
            return this.finishNode(pos, {
                type: 'DoExpression',
                body
            });
        }
    
        /** JSX */
    
        private parseJSXChildren(context: Context) {
            const children: any = [];
    
            while (this.token !== Token.JSXClose) {
                children.push(this.parseJSXChild(context | Context.JSXChild, this.getLocations()));
            }
    
            return children;
        }
    
        private parseJSXChild(
            context: Context,
            pos: Location,
        ): ESTree.JSXText | ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild | ESTree.JSXElement | undefined {
    
            switch (this.token) {
                case Token.JSXText:
                case Token.Identifier:
                    return this.parseJSXText(context);
                case Token.LeftBrace:
                    return this.parseJSXExpressionContainer(context, pos);
                case Token.LessThan:
                    return this.parseJSXElement(context & ~Context.JSXChild);
                default: // ignore
            }
        }
    
        private parseJSXSpreadChild(context: Context): ESTree.JSXSpreadChild {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
            const expression = this.parseExpression(context, pos);
            this.expect(context, Token.RightBrace);
            return this.finishNode(pos, {
                type: 'JSXSpreadChild',
                expression
            });
        }
    
        private parseJSXText(context: Context): ESTree.JSXText {
    
            const pos = this.getLocations();
            const value = this.source.slice(this.startIndex, this.index);
    
            this.nextJSXToken();
    
            const node = this.finishNode(pos, {
                type: 'JSXText',
                value
            });
    
            if (this.flags & Flags.OptionsRaw) node.raw = value;
    
            return node;
        }
    
        private parseJSXEmptyExpression(pos: Location): ESTree.JSXEmptyExpression {
            return this.finishNode(pos, {
                type: 'JSXEmptyExpression'
            });
        }
    
        private parseJSXExpressionContainer(
            context: Context,
            pos: Location
        ): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {
    
            this.expect(context, Token.LeftBrace);
    
            if (this.token === Token.Ellipsis) {
                return this.parseJSXSpreadChild(context);
            }
    
            const expression = this.token === Token.RightBrace ?
                this.parseJSXEmptyExpression(pos) :
                this.parseAssignmentExpression(context);
    
            this.nextJSXToken();
    
            return this.finishNode(pos, {
                type: 'JSXExpressionContainer',
                expression
            });
        }
    
        private parseJSXClosingFragment(context: Context) {
            const pos = this.getLocations();
            this.expect(context, Token.JSXClose);
            this.expect(context, Token.GreaterThan);
            return this.finishNode(pos, {
                type: 'JSXClosingFragment'
            });
        }
    
        private parseJSXElement(context: Context) {
            const pos = this.getLocations();
            const openingElement = this.parseJSXOpeningElement(context);
            let children: ESTree.JSXElement[] = [];
            let closingElement = null;
    
            if (openingElement.type === 'JSXOpeningFragment') {
                children = this.parseJSXChildren(context);
                closingElement = this.parseJSXClosingFragment(context);
    
                return this.finishNode(pos, {
                    type: 'JSXFragment',
                    children,
                    openingElement,
                    closingElement,
                });
            }
    
            if (!openingElement.selfClosing) {
                children = this.parseJSXChildren(context);
                closingElement = this.parseJSXClosingElement(context);
                const open = isQualifiedJSXName(openingElement.name);
                const close = isQualifiedJSXName(closingElement.name);
                if (open !== close) this.error(Errors.ExpectedJSXClosingTag, close);
            }
    
            return this.finishNode(pos, {
                type: 'JSXElement',
                children,
                openingElement,
                closingElement,
            });
        }
    
        private parseJSXOpeningElement(context: Context) {
            const pos = this.getLocations();
    
            this.expect(context, Token.LessThan);
    
            if (this.token === Token.GreaterThan) {
                this.nextJSXToken();
                return this.finishNode(pos, {
                    type: 'JSXOpeningFragment'
                });
            }
    
            const tagName = this.parseJSXElementName(context);
            const attributes = this.parseJSXAttributes(context);
            const selfClosing = this.token === Token.Divide;
    
            if (this.token === Token.GreaterThan) {
                this.nextJSXToken();
            } else {
                this.expect(context, Token.Divide);
                if (context & Context.JSXChild) {
    
                    this.expect(context, Token.GreaterThan);
                } else {
                    this.nextJSXToken();
                }
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
    
            if (context & Context.JSXChild) {
                this.expect(context, Token.GreaterThan);
            } else {
                this.nextJSXToken();
            }
    
            return this.finishNode(pos, {
                type: 'JSXClosingElement',
                name
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
    
                this.advance();
                ch = this.nextChar();
            }
    
            // check for unterminated string
            if (ch !== quote) this.error(Errors.UnterminatedString);
    
            if (start !== this.index) ret += this.source.slice(start, this.index);
    
            this.advance(); // skip the quote
    
            this.tokenValue = ret;
    
            // raw
            if (this.flags & Flags.OptionsRaw) this.storeRaw(rawStart);
    
            return Token.StringLiteral;
        }
        private scanJSXAttributeValue(context: Context): Token | undefined {
    
            this.startIndex = this.index;
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
    
        private parseJSXSpreadAttribute(context: Context) {
            const pos = this.getLocations();
            this.expect(context, Token.LeftBrace);
            this.expect(context, Token.Ellipsis);
            const expression = this.parseExpression(context, pos);
            this.expect(context, Token.RightBrace);
    
            return this.finishNode(pos, {
                type: 'JSXSpreadAttribute',
                argument: expression
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
    
        private parseJSXExpressionAttribute(context: Context): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.LeftBrace);
    
            if (this.token === Token.Ellipsis) return this.parseJSXSpreadChild(context);
    
            const expression = this.parseAssignmentExpression(context);
    
            this.expect(context, Token.RightBrace);
    
            return this.finishNode(pos, {
                type: 'JSXExpressionContainer',
                expression
            });
        }
    
        private parseJSXAttributes(context: Context): ESTree.JSXAttribute[] {
    
            const attributes: ESTree.JSXAttribute[] = [];
    
            loop:
                while (this.hasNext()) {
    
                    switch (this.token) {
                        case Token.Divide:
                        case Token.GreaterThan:
                            break loop;
                        case Token.LeftBrace:
                            attributes.push(this.parseJSXSpreadAttribute(context &= ~Context.JSXChild));
                            break;
    
                        default:
                            attributes.push(this.parseJSXAttribute(context));
                    }
                }
    
            return attributes;
        }
    
        private nextJSXToken() {
            this.token = this.scanJSXToken();
        }
    
        private scanJSXToken(): Token {
            // Set 'lastIndex' and 'startIndex' to current index
            this.lastIndex = this.startIndex = this.index;
    
            if (this.consume(Chars.LessThan)) {
                if (this.nextChar() !== Chars.Slash) return Token.LessThan;
                this.advance();
                return Token.JSXClose;
            }
    
            if (this.consume(Chars.LeftBrace)) return Token.LeftBrace;
    
            while (this.hasNext()) {
                if (this.nextChar() === Chars.LeftBrace ||
                    this.nextChar() === Chars.LessThan) {
                    break;
                }
    
                this.advance();
            }
    
            return Token.JSXText;
        }
    
        private parseJSXIdentifier(context: Context): ESTree.JSXIdentifier {
            const name = this.tokenValue;
            const pos = this.getLocations();
            this.nextToken(context);
            return this.finishNode(pos, {
                type: 'JSXIdentifier',
                name
            });
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
    
            let expression: ESTree.JSXIdentifier | ESTree.JSXMemberExpression = this.parseJSXIdentifier(context | Context.JSXChild);
    
            // Namespace
            if (this.token === Token.Colon) return this.parseJSXNamespacedName(context, expression, pos);
    
            // Member expression
            while (this.parseOptional(context, Token.Period)) {
                expression = this.parseJSXMemberExpression(context, expression, pos);
            }
    
            return expression;
        }
    }

import { Chars } from './chars';
import * as ESTree from './estree';
import { toHex, fromCodePoint, hasMask, isPrologueDirective } from './common';
import { isValidDestructuringAssignmentTarget, isQualifiedJSXName, isValidSimpleAssignmentTarget, isInOrOfKeyword } from './validate';
import { Flags, Context, RegExpState, RegexFlags, ScopeMasks, ObjectState, ScanState, ParenthesizedState, NumericState, Escape, FieldState } from './masks';
import { Token, tokenDesc, descKeyword } from './token';
import { ErrorMessages, createError, Errors } from './errors';
import { isValidIdentifierStart, isIdentifierStart, isIdentifierPart } from './unicode';
import { Options, SavedState, Location, EmitComments } from './interface';
export class Parser {
    
        // The program to be parsed
        private source: string;
    
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
        private fieldSet: any;
        private errorLocation: void | Location;
        private comments: EmitComments;
        private locSource: void | string;
        private lastChar: void | Chars;
        private tokenRegExp: void | {
            pattern: string;
            flags: string;
        };
    
        constructor(source: string, options: Options | void) {
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
            this.fieldSet = undefined;
            this.errorLocation = undefined;
            this.tokenRegExp = undefined;
            this.functionScope = undefined;
            this.blockScope = undefined;
            this.parentScope = undefined;
            this.comments = undefined;
            this.lastChar = undefined;
    
            if (options != null) {
                if (options.next) this.flags |= Flags.OptionsNext;
                if (options.jsx) this.flags |= Flags.OptionsJSX;
                if (options.loc) this.flags |= Flags.OptionsLoc;
                if (options.ranges) this.flags |= Flags.OptionsRanges;
                if (options.raw) this.flags |= Flags.OptionsRaw;
                if (options.globalReturn) this.flags |= Flags.OptionsGlobalReturn;
                if (options.directives) this.flags |= Flags.OptionsDirectives;
                if (options.comments) this.comments = options.comments;
    
                if (options.source) {
                    this.flags |= Flags.OptionsSource;
                    this.locSource = options.source;
                }
    
                if (options.plugins) {
                    for (let i = 0; i < options.plugins.length; i++) {
                        options.plugins[i](this);
                    }
                }
            }
        }
    
        // https://tc39.github.io/ecma262/#sec-scripts
        public parseScript(context: Context): ESTree.Program {
            this.token = this.scan(context);
            const body = this.parseStatementList(context, Token.EndOfSource);
            return this.finishRootNode({
                type: 'Program',
                body,
                sourceType: 'script'
            });
        }
    
        // https://tc39.github.io/ecma262/#sec-modules
        public parseModule(context: Context): ESTree.Program {
            this.token = this.scan(context);
            const body = this.parseModuleItemList(context);
            return this.finishRootNode({
                type: 'Program',
                body,
                sourceType: 'module'
            });
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
    
            this.lastIndex = this.index;
            this.lastColumn = this.column;
            this.lastLine = this.line;
    
            if (!(context & Context.Strict) && this.flags & Flags.DirectivePrologue) {
                context |= Context.Strict;
            }
            this.token = this.scan(context);
    
            return this.token;
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
    
        private scanNext(err: Errors = Errors.UnterminatedString): Chars {
            this.advance();
            if (!this.hasNext()) this.error(err);
            return this.peekUnicodeChar();
        }
    
        private peekUnicodeChar(): Chars {
            const hi = this.source.charCodeAt(this.index);
            if (hi < Chars.LeadSurrogateMin || hi > Chars.LeadSurrogateMax) return hi;
            const lo = this.source.charCodeAt(this.index + 1);
            if (lo < Chars.TrailSurrogateMin || lo > Chars.TrailSurrogateMax) return hi;
            const a = hi & 0x3FF;
            return Chars.NonBMPMin + (a << 10) | lo & 0x3FF;
        }
    
        private advance() {
            this.index++;
            this.column++;
        }
    
        private advanceNewline(skipLF = true) {
            this.flags |= Flags.PrecedingLineBreak;
            this.index++;
            if (skipLF) {
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
        private scan(context: Context): Token {
    
            this.flags &= ~(Flags.PrecedingLineBreak | Flags.ExtendedUnicodeEscape);
    
            let state = this.index === 0 ? ScanState.LineStart : ScanState.None;
    
            if (this.nextChar() >= 128 && this.nextChar() === Chars.ByteOrderMark) this.index++;
    
            while (this.hasNext()) {
    
                let first = this.nextChar();
    
                if (first >= 128) {
                    // Chars not in the range 0..127 are rare.  Getting them out of the way
                    // early allows subsequent checking to be faster.
                    first = this.peekUnicodeChar();
                }
    
                this.startIndex = this.index;
                this.startColumn = this.column;
                this.startLine = this.line;
    
                switch (first) {
    
                    case Chars.CarriageReturn:
                        state |= ScanState.LastIsCR | ScanState.LineStart;
                        this.advanceNewline();
                        continue;
    
                    case Chars.LineFeed:
                        this.advanceNewline((state & ScanState.LastIsCR) === 0);
                        state = state & ~ScanState.LastIsCR | ScanState.LineStart;
                        continue;
    
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        state = state & ~ScanState.LastIsCR | ScanState.LineStart;
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
                    case Chars.ZeroWidthJoiner:
                    case Chars.ZeroWidthNonJoiner:
                        this.advance();
                        continue;
    
                        // `/`, `/=`, `/>`
                    case Chars.Slash:
                        {
                            this.advance();
    
                            const next = this.nextChar();
    
                            if (this.consume(Chars.Slash)) {
                                this.skipComments(state | ScanState.SingleLine);
                                continue;
                            } else if (this.consume(Chars.Asterisk)) {
                                this.skipComments(state | ScanState.MultiLine);
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
    
                            const next = this.nextChar();
    
                            switch (next) {
    
                                case Chars.LessThan:
                                    {
                                        this.advance();
                                        if (this.consume(Chars.EqualSign)) {
                                            return Token.ShiftLeftAssign;
                                        }
                                        return Token.ShiftLeft;
                                    }
    
                                case Chars.EqualSign:
                                    this.advance();
                                    return Token.LessThanOrEqual;
    
                                case Chars.Exclamation:
                                    {
                                        if (!(context & Context.Module)) {
                                            this.advance(); // skip `<`
                                            // Double 'hyphen' because of the "look and feel" of
                                            // the HTML single line comment (<!--)
                                            if (this.consume(Chars.Hyphen)) {
                                                if (this.consume(Chars.Hyphen)) {
                                                    this.skipComments(state | ScanState.SingleLine);
                                                    continue;
                                                }
                                            }
                                        }
                                    }
                                case Chars.Slash:
                                    {
                                        if (!(this.flags & Flags.OptionsJSX)) break;
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
    
                            switch (next) {
    
                                case Chars.Hyphen:
                                    {
                                        this.advance();
    
                                        if (context & Context.Module || !(state & ScanState.LineStart)) return Token.Decrement;
    
                                        if (this.consume(Chars.GreaterThan)) {
                                            this.skipComments(state | ScanState.SingleLine);
                                            continue;
                                        }
    
                                        return Token.Decrement;
                                    }
    
                                case Chars.EqualSign:
                                    this.advance();
                                    return Token.SubtractAssign;
    
                                default:
                                    return Token.Subtract;
                            }
                        }
    
                        // `#`
                    case Chars.Hash:
                        this.advance();
                        if (state & ScanState.LineStart &&
                            this.consume(Chars.Exclamation)) {
                            this.skipComments(state);
                            continue;
                        }
                        return Token.Hash;
    
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
                            if (context & Context.Expression) return Token.GreaterThan;
    
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
                                this.scanNumber(context, first);
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
    
                        // '0' - '9'
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
    
                        return this.scanNumber(context, first);
    
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
                        return this.scanIdentifier(context, state);
                    default:
                        if (isValidIdentifierStart(first)) {
                            return this.scanIdentifier(context, state | ScanState.Unicode);
                        }
                        this.error(Errors.UnexpectedToken, fromCodePoint(first));
                }
            }
    
            return Token.EndOfSource;
        }
    
        /**
         * Skips single line, hashbang and multiline comments
         *
         * @param state Scanner
         */
        private skipComments(state: ScanState) {
    
            const startPos = this.index;
    
            loop:
                while (this.hasNext()) {
    
                    switch (this.nextChar()) {
    
                        // Line Terminators
                        case Chars.CarriageReturn:
                            if (!(state & ScanState.MultiLine)) break loop;
                            this.advanceNewline();
                            state |= ScanState.LastIsCR;
                            break;
    
                        case Chars.LineFeed:
                            if (!(state & ScanState.MultiLine)) break loop;
                            this.advanceNewline((state & ScanState.LastIsCR) === 0);
                            state = state & ~ScanState.LastIsCR;
                            break;
    
                        case Chars.LineSeparator:
                        case Chars.ParagraphSeparator:
                            // Single line comments can not contain LINE SEPARATOR (U+2028)
                            if (!(state & ScanState.MultiLine)) break loop;
                            state = state & ~ScanState.LastIsCR;
                            this.advanceNewline();
                            break;
    
                        case Chars.Asterisk:
                            if (state & ScanState.MultiLine) {
                                this.advance();
                                state &= ~ScanState.LastIsCR;
                                if (this.consume(Chars.Slash)) {
                                    state |= ScanState.Terminated;
                                    break loop;
                                }
                                break;
                            }
    
                        default:
                            this.advance();
                    }
                }
    
            if (state & ScanState.MultiLine && !(state & ScanState.Terminated)) {
                this.error(Errors.UnterminatedComment);
            }
    
            if (state & ScanState.Collectable && this.comments !== undefined) {
                let loc;
                const start = this.startIndex;
                const end = this.index;
                const type = state & ScanState.MultiLine ? 'Block' : 'Line';
                const value = this.source.slice(startPos, state & ScanState.MultiLine ? this.index - 2 : this.index);
    
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
    
                if (typeof this.comments === 'function') {
                    this.comments(type, value, start as number, end as number, loc);
                } else if (Array.isArray(this.comments)) {
    
                    const node: any = {
                        type,
                        value,
                        start,
                        end,
                        loc
                    };
    
                    this.comments.push(node);
                }
            }
        }
    
        private scanIdentifier(context: Context, state: ScanState): Token {
    
            let start = this.index;
            let ret = '';
            let isEscaped = false;
    
            loop:
                while (this.hasNext()) {
                    const code = this.nextChar();
                    switch (code) {
                        case Chars.Backslash:
                            isEscaped = true;
                            ret += this.source.slice(start, this.index);
                            ret += fromCodePoint(this.peekUnicodeEscape());
                            start = this.index;
                            break;
                        default:
                            if (code >= Chars.LeadSurrogateMin && code <= Chars.TrailSurrogateMax) {
                                this.peekUnicodeChar();
                            } else if (!isIdentifierPart(code)) break loop;
                            this.advance();
                    }
                }
    
            if (start < this.index) ret += this.source.slice(start, this.index);
    
            const len = ret.length;
            this.tokenValue = ret;
    
            if (isEscaped) this.flags |= Flags.ExtendedUnicodeEscape;
    
            if (state & ScanState.Unicode) return Token.Identifier;
    
            // Keywords are between 2 and 11 characters long and start with a lowercase letter
            if (len >= 2 && len <= 11) {
                if (context & Context.ValidateEscape && this.flags & Flags.ExtendedUnicodeEscape) {
                    this.error(Errors.UnexpectedEscapedKeyword);
                }
                const token = descKeyword(ret);
                if (token > 0) return token;
            }
    
            return Token.Identifier;
        }
    
        /**
         * Peek unicode escape
         */
        private peekUnicodeEscape(): Chars {
            this.advance();
            const code = this.peekExtendedUnicodeEscape();
            if (code >= Chars.LeadSurrogateMin && code <= Chars.TrailSurrogateMin) {
                this.error(Errors.UnexpectedSurrogate);
            }
    
            if (!isIdentifierPart(code)) {
                this.error(Errors.InvalidUnicodeEscapeSequence);
            }
    
            this.advance();
            return code;
        }
    
        private peekExtendedUnicodeEscape(): Chars {
    
            let ch = this.scanNext();
    
            let code = 0;
    
            // '\u{DDDDDDDD}'
            if (ch === Chars.LeftBrace) { // {
    
                ch = this.scanNext(Errors.InvalidHexEscapeSequence);
    
                while (ch !== Chars.RightBrace) {
                    const digit = toHex(ch);
                    if (digit < 0) this.error(Errors.InvalidHexEscapeSequence);
                    code = (code << 4) | digit;
                    if (code > Chars.LastUnicodeChar) break;
                    ch = this.scanNext(Errors.InvalidHexEscapeSequence);
                }
    
            } else {
    
                // '\uDDDD'
                code = toHex(ch);
    
                if (code < 0) this.error(Errors.InvalidHexEscapeSequence);
    
                for (let i = 0; i < 3; i++) {
                    ch = this.scanNext(Errors.InvalidHexEscapeSequence);
                    const digit = toHex(ch);
                    if (code < 0) this.error(Errors.InvalidHexEscapeSequence);
                    code = code << 4 | digit;
                }
            }
            return code;
        }
    
        private scanDecimalDigitsOrFragment(): any {
    
            let start = this.index;
            let state = NumericState.None;
            let ret: string | null = '';
    
            const next = this.flags & Flags.OptionsNext;
    
            loop:
                while (this.hasNext()) {
    
                    switch (this.nextChar()) {
                        case Chars.Underscore:
                            if (!next) break loop;
                            if (!(state & NumericState.AllowSeparator)) this.error(Errors.InvalidNumericSeparators);
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
                this.error(Errors.InvalidNumericSeparators);
            }
    
            return ret + this.source.substring(start, this.index);
        }
    
        private scanNumericFragment(state: NumericState): NumericState {
            this.flags |= Flags.ContainsSeparator;
            if (!(state & NumericState.AllowSeparator)) {
                this.error(Errors.InvalidNumericSeparators);
            }
            state &= ~NumericState.AllowSeparator;
            this.advance();
            return state;
        }
    
        private scanNumber(context: Context, ch: number): Token {
            const start = this.index;
            let state = NumericState.None;
            let value: any;
    
            const next = this.flags & Flags.OptionsNext;
    
            if (ch === Chars.Zero) {
    
                this.advance();
    
                ch = this.nextChar();
    
                switch (ch) {
    
                    case Chars.LowerX:
                    case Chars.UpperX:
                        {
                            state = NumericState.Hex | NumericState.AllowSeparator;
    
                            value = toHex(this.scanNext(Errors.Unexpected));
    
                            if (value < 0) this.error(Errors.Unexpected);
    
                            this.advance();
    
                            while (this.hasNext()) {
                                ch = this.nextChar();
    
                                if (next && ch === Chars.Underscore) {
                                    state = this.scanNumericFragment(state);
                                    continue;
                                }
                                state |= NumericState.AllowSeparator;
                                const digit = toHex(ch);
                                if (digit < 0) break;
                                value = value << 4 | digit;
                                this.advance();
                            }
    
                            break;
                        }
                    case Chars.LowerO:
                    case Chars.UpperO:
                        {
                            state = NumericState.Octal | NumericState.AllowSeparator;
    
                            ch = this.scanNext(Errors.Unexpected);
    
                            value = ch - Chars.Zero;
    
                            // we must have at least one octal digit after 'o'/'O'
                            if (ch < Chars.Zero || ch >= Chars.Eight) this.error(Errors.UnexpectedNumber);
    
                            this.advance();
    
                            while (this.hasNext()) {
    
                                ch = this.nextChar();
    
                                if (next && ch === Chars.Underscore) {
                                    state = this.scanNumericFragment(state);
                                    continue;
                                }
                                state |= NumericState.AllowSeparator;
                                if (ch < Chars.Zero || Chars.Nine < ch) break;
                                if (ch < Chars.Zero || ch >= Chars.Eight) {
                                    this.error(Errors.Unexpected);
                                }
                                value = (value << 3) | (ch - Chars.Zero);
                                this.advance();
                            }
    
                            break;
                        }
    
                    case Chars.LowerB:
                    case Chars.UpperB:
                        {
                            state = NumericState.Binary | NumericState.AllowSeparator;
    
                            ch = this.scanNext(Errors.Unexpected);
    
                            // Invalid:  '0b'
                            if (ch !== Chars.Zero && ch !== Chars.One) this.error(Errors.UnexpectedNumber);
    
                            value = ch - Chars.Zero;
    
                            this.advance();
    
                            while (this.hasNext()) {
                                ch = this.nextChar();
                                if (next && ch === Chars.Underscore) {
                                    state = this.scanNumericFragment(state);
                                    continue;
                                }
                                state |= NumericState.AllowSeparator;
                                if (ch < Chars.Zero || Chars.Nine < ch) break;
                                if (!(ch === Chars.Zero || ch === Chars.One)) {
                                    this.error(Errors.Unexpected);
                                }
                                value = (value << 1) | (ch - Chars.Zero);
                                this.advance();
                            }
    
                            break;
                        }
    
                    case Chars.Underscore:
                        this.flags |= Flags.ContainsSeparator;
                        this.advance();
                        // falls through
                    case Chars.Zero:
                    case Chars.One:
                    case Chars.Two:
                    case Chars.Three:
                    case Chars.Four:
                    case Chars.Five:
                    case Chars.Six:
                    case Chars.Seven:
                        {
                            state |= NumericState.ImplicitOctal | NumericState.AllowSeparator;
    
                            while (this.hasNext()) {
                                ch = this.nextChar();
                                if (ch === Chars.Underscore) {
                                    state = this.scanNumericFragment(state);
                                    continue;
                                }
                                state |= NumericState.AllowSeparator;
                                if (ch === Chars.Eight || ch === Chars.Nine) {
                                    state = NumericState.DecimalWithLeadingZero;
                                    break;
                                }
                                if (!(Chars.Zero <= ch && ch <= Chars.Seven)) break;
                                value = (value << 3) | (ch - Chars.Zero);
                                this.advance();
                            }
                        }
                        break;
    
                    case Chars.Eight:
                    case Chars.Nine:
                        state = NumericState.DecimalWithLeadingZero;
                    default: // ignore
                }
    
                if (this.flags & Flags.ContainsSeparator) {
                    if (this.source.charCodeAt(this.index - 1) === Chars.Underscore) {
                        this.error(Errors.InvalidNumericSeparators);
                    }
                }
    
                this.tokenValue = value;
            }
    
            let mainFragment: string = '';
            let decimalFragment: string = '';
            let scientificFragment: string = '';
    
            if (this.flags & Flags.OptionsNext) {
    
                mainFragment = this.scanDecimalDigitsOrFragment();
    
                if (this.nextChar() === Chars.Period) {
                    state |= NumericState.Float;
                    if (state & NumericState.ImplicitOctal) this.error(Errors.UnexpectedNumber);
                    this.advance();
                    decimalFragment = this.scanDecimalDigitsOrFragment();
                }
    
            } else {
                this.scanDecimalDigitsOrFragment();
                if (this.nextChar() === Chars.Period) {
                    state |= NumericState.Float;
                    // Invalid: '06.7'
                    if (state & NumericState.ImplicitOctal) {
                        const next = this.source.charCodeAt(this.index + 1)
                        if (next >= Chars.Zero && next <= Chars.Nine) this.error(Errors.UnexpectedNumber);
                    } else {
                        this.advance();
                        this.scanDecimalDigitsOrFragment();
                    }
                }
            }
    
            const end = this.index;
    
            // BigInt - Stage 3 proposal
            if (next && this.nextChar() === Chars.LowerN) {
                if (state & (NumericState.ImplicitOctal | NumericState.Float)) this.error(Errors.InvalidBigIntLiteral);
                state |= NumericState.BigInt;
                this.advance();
            }
    
            if (!(state & NumericState.Boh)) {
    
                state |= NumericState.Float;
    
                switch (this.nextChar()) {
                    case Chars.UpperE:
                    case Chars.LowerE:
                        this.advance();
                        switch (this.nextChar()) {
                            case Chars.Hyphen:
                            case Chars.Plus:
                                this.advance();
                                if (!this.hasNext()) this.error(Errors.Unexpected);
                            default: // ignore
                        }
    
                        ch = this.nextChar();
    
                        if (!(ch >= Chars.Zero && ch <= Chars.Nine)) this.error(Errors.InvalidBigIntLiteral);
    
                        if (this.flags & Flags.OptionsNext) {
                            const preNumericPart = this.index;
                            const finalFragment = this.scanDecimalDigitsOrFragment();
                            scientificFragment = this.source.substring(end, preNumericPart) + finalFragment;
                        } else {
                            this.scanDecimalDigitsOrFragment();
                        }
    
                    default: // ignore
                }
            }
    
            if (state & NumericState.Noctal) this.flags |= Flags.Octal;
    
            if (this.flags & Flags.OptionsNext &&
                !(state & (NumericState.ImplicitOctal | NumericState.Boh)) &&
                this.flags & Flags.ContainsSeparator) {
    
                let result = mainFragment;
    
                if (decimalFragment) result += '.' + decimalFragment;
                if (scientificFragment) result += scientificFragment;
    
                if (this.flags & Flags.OptionsRaw) this.tokenRaw = this.source.slice(start, this.index);
    
                this.tokenValue = parseFloat(result);
    
                if (state & NumericState.BigInt) return Token.BigInt;
                return Token.NumericLiteral;
            }
    
            // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
            // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
            // For example : 3in is an error and not the two input elements 3 and in
            if (isIdentifierStart(this.nextChar())) this.error(Errors.Unexpected);
    
            const rawValue = this.source.slice(start, this.index);
    
            if (!value || !(state & (NumericState.ImplicitOctal | NumericState.Boh))) {
                this.tokenValue = NumericState.Float ?
                    parseFloat(rawValue) :
                    parseInt(rawValue, 10);
            }
    
            if (this.flags & Flags.OptionsRaw) this.tokenRaw = rawValue;
    
            return state & NumericState.BigInt ? Token.BigInt : Token.NumericLiteral;
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
                                this.error(Errors.UnexpectedTokenRegExp);
                            default: // ignore
                        }
                    }
    
                    if (!this.hasNext()) this.error(Errors.UnterminatedRegExp);
                }
    
            const bodyEnd = this.index - 1; // drop the slash from the slice
            const flagsStart = this.index;
    
            let mask = RegexFlags.None;
    
            loop:
                while (this.hasNext()) {
                    const code = this.nextChar();
                    switch (code) {
    
                        case Chars.LowerG:
                            if (mask & RegexFlags.Global) this.error(Errors.DuplicateRegExpFlag, 'g');
                            mask |= RegexFlags.Global;
                            break;
    
                        case Chars.LowerI:
                            if (mask & RegexFlags.IgnoreCase) this.error(Errors.DuplicateRegExpFlag, 'i');
                            mask |= RegexFlags.IgnoreCase;
                            break;
    
                        case Chars.LowerM:
                            if (mask & RegexFlags.Multiline) this.error(Errors.DuplicateRegExpFlag, 'm');
                            mask |= RegexFlags.Multiline;
                            break;
    
                        case Chars.LowerU:
                            if (mask & RegexFlags.Unicode) this.error(Errors.DuplicateRegExpFlag, 'u');
                            mask |= RegexFlags.Unicode;
                            break;
    
                        case Chars.LowerY:
                            if (mask & RegexFlags.Sticky) this.error(Errors.DuplicateRegExpFlag, 'y');
                            mask |= RegexFlags.Sticky;
                            break;
    
                            // Stage 3 proposal
                        case Chars.LowerS:
                            if (this.flags & Flags.OptionsNext) {
                                if (mask & RegexFlags.DotAll) this.error(Errors.DuplicateRegExpFlag, 's');
                                mask |= RegexFlags.DotAll;
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
    
            this.tokenValue = this.testRegExp(pattern, flags, mask);
    
            if (this.flags & Flags.OptionsRaw) this.storeRaw(this.startIndex);
    
            return Token.RegularExpression;
        }
    
        private testRegExp(pattern: string, flags: string, mask: RegexFlags): RegExp | null {
    
            try {
                RegExp(pattern);
            } catch (e) {
                this.error(Errors.UnexpectedTokenRegExp);
            }
    
            try {
                return new RegExp(pattern, flags);
            } catch (exception) {
                return null;
            }
        }
    
        private scanString(context: Context, quote: number): Token {
    
            let ret = '';
    
            this.advance(); // Consume the quote
            let ch = this.nextChar();
    
            while (ch !== quote) {
                switch (ch) {
                    case Chars.CarriageReturn:
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        this.error(Errors.UnterminatedString);
                    case Chars.Backslash:
                        ch = this.scanNext();
    
                        if (ch >= 128) {
                            ret += fromCodePoint(ch);
                        } else {
    
                            const code = this.scanEscape(context, ch);
    
                            if (code >= 0) {
                                ret += fromCodePoint(code as Chars);
                            } else {
                                this.handleStringError(context, code as Escape);
                            }
    
                            this.flags |= Flags.ExtendedUnicodeEscape;
                        }
                        break;
    
                    default:
                        ret += fromCodePoint(ch);
                }
    
                ch = this.scanNext();
            }
    
            if (!(this.flags & Flags.ExtendedUnicodeEscape) && ret === 'use strict') {
                this.flags |= Flags.DirectivePrologue;
            }
    
            this.advance(); // Consume the quote
            if (this.flags & (Flags.OptionsRaw | Flags.OptionsDirectives)) this.storeRaw(this.startIndex);
            this.tokenValue = ret;
            return Token.StringLiteral;
        }
    
        private handleStringError(context: Context, code: Escape) {
            switch (code) {
                case Escape.Empty:
                    return;
                case Escape.StrictOctal:
                    this.error(context & Context.Template ? Errors.StrictOctalEscape : Errors.TemplateOctalLiteral);
                case Escape.EightOrNine:
                    this.error(Errors.InvalidEightAndNine);
                case Escape.InvalidHex:
                    this.error(Errors.InvalidHexEscapeSequence);
                case Escape.OutOfRange:
                    this.error(Errors.UnicodeOutOfRange);
                default:
                    // Ignore
            }
        }
    
        private scanEscape(context: Context, cp: Chars): Chars | Escape {
    
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
    
                        return code;
                    }
    
                case Chars.Four:
                case Chars.Five:
                case Chars.Six:
                case Chars.Seven:
                    {
    
                        if (context & Context.Strict) {
                            return Escape.StrictOctal;
                        }
    
                        let code = cp - Chars.Zero;
                        const index = this.index + 1;
                        const column = this.column + 1;
    
                        const next = this.source.charCodeAt(index);
    
                        if (next >= Chars.Zero && next <= Chars.Seven) {
                            code = (code << 3) | (next - Chars.Zero);
                            this.lastChar = next;
                            this.index = index;
                            this.column = column;
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
                        const ch1 = this.scanNext();
                        const hi = toHex(ch1);
                        if (hi < 0) return Escape.InvalidHex;
                        const ch2 = this.scanNext();
                        const lo = toHex(ch2);
                        if (lo < 0) return Escape.InvalidHex;
    
                        return hi << 4 | lo;
                    }
    
                    // UCS-2/Unicode escapes
                case Chars.LowerU:
                    {
                        let ch = this.lastChar = this.scanNext();
                        if (ch === Chars.LeftBrace) {
                            // \u{N}
                            ch = this.lastChar = this.scanNext();
                            let code = toHex(ch);
                            if (code < 0) return Escape.InvalidHex;
    
                            ch = this.lastChar = this.scanNext();
    
                            while (ch !== Chars.RightBrace) {
                                const digit = toHex(ch);
                                if (digit < 0) return Escape.InvalidHex;
                                code = code << 4 | digit;
                                if (code > Chars.LastUnicodeChar) return Escape.OutOfRange;
                                ch = this.lastChar = this.scanNext();
                            }
    
                            return code;
                        } else {
                            // \uNNNN
                            let code = toHex(ch);
                            if (code < 0) return Escape.InvalidHex;
    
                            for (let i = 0; i < 3; i++) {
                                ch = this.lastChar = this.scanNext();
                                const digit = toHex(ch);
                                if (digit < 0) return Escape.InvalidHex;
                                code = code << 4 | digit;
                            }
    
                            return code;
                        }
                    }
    
                default:
                    return this.peekUnicodeChar();
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
            let ret: string | null = '';
    
            let ch = this.scanNext(Errors.UnterminatedTemplate);
    
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
    
                            ch = this.scanNext(Errors.UnterminatedTemplate);
    
                            if (ch >= 128) {
                                ret += fromCodePoint(ch);
                            } else {
                                this.lastChar = ch;
                                const code = this.scanEscape(context | Context.Strict, ch);
    
                                if (code >= 0) {
                                    ret += fromCodePoint(code as Chars);
                                } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                                    ret = null;
                                    ch = this.scanLooserTemplateSegment(this.lastChar);
                                    if (ch < 0) {
                                        // Before: '-36'
                                        ch = -ch;
                                        // After: '36'
                                        tail = false;
                                    }
                                    break loop;
                                } else {
                                    this.handleStringError(context | Context.Template, code as Escape);
                                }
                            }
    
                            break;
    
                            // Line terminators
                        case Chars.CarriageReturn:
                        case Chars.LineFeed:
                        case Chars.LineSeparator:
                        case Chars.ParagraphSeparator:
                            this.column = -1;
                            this.line++;
                        default:
                            if (ret != null) ret += fromCodePoint(ch);
                    }
    
                    ch = this.scanNext(Errors.UnterminatedTemplate);
                }
    
            this.advance();
    
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
    
        private scanLooserTemplateSegment(ch: number): Chars {
    
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
                        }
    
                    default:
                        // ignore
                }
    
                ch = this.scanNext();
            }
    
            return ch;
        }
    
        private scanJSXIdentifier(context: Context): Token {
            if (this.token & (Token.IsIdentifier | Token.Keyword)) {
                const firstCharPosition = this.index;
                this.tokenValue += this.source.slice(firstCharPosition, this.index - firstCharPosition);
    
            }
            return this.token;
        }
    
        private parseModuleItemList(context: Context): ESTree.Statement[] {
            const statements: ESTree.Statement[] = [];
    
            while (this.token !== Token.EndOfSource) {
                if (this.token === Token.StringLiteral && this.flags & Flags.OptionsDirectives) {
                    statements.push(this.parseDirective(context));
                } else {
                    statements.push(this.parseModuleItem(context | Context.AllowIn));
                }
            }
    
            return statements;
        }
    
        private parseDirective(context: Context): ESTree.ExpressionStatement {
            const pos = this.getLocations();
            const expr = this.parseExpression(context | Context.AllowIn, pos);
            const directive = this.tokenRaw.slice(1, -1);
            this.consumeSemicolon(context);
            return this.finishNode(context, pos, {
                type: 'ExpressionStatement',
                expression: expr,
                directive
            });
        }
    
        private parseStatementList(context: Context, endToken: Token): ESTree.Statement[] {
    
            const statements: ESTree.Statement[] = [];
            const enableDirectiveNode = (this.flags & Flags.OptionsDirectives) !== 0;
    
            while (this.token === Token.StringLiteral) {
    
                const item: ESTree.Statement = enableDirectiveNode ?
                    this.parseDirective(context) :
                    this.parseStatementListItem(context);
    
                statements.push(item);
    
                if (!isPrologueDirective(item)) break;
    
                if (this.flags & Flags.DirectivePrologue) {
                    if (context & Context.StrictReserved) this.error(Errors.UnexpectedStrictReserved);
                    if (this.flags & Flags.SimpleParameterList) this.error(Errors.IllegalUseStrict);
                    if (this.flags & Flags.Binding) this.error(Errors.UnexpectedStrictReserved);
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
    
        private finishRootNode < T extends ESTree.Node > (node: any): any {
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
        private finishNode < T extends ESTree.Node > (
            context: Context,
            pos: any,
            node: any,
            shouldAdvance = false,
            root = false
        ): any {
    
            if (shouldAdvance) this.nextToken(context);
    
            if (this.flags & Flags.OptionsRanges) {
                node.start = pos.start;
                node.end = this.lastIndex;
            }
    
            if (this.flags & Flags.OptionsLoc) {
    
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
            }
    
            return node;
        }
        private parseOptional(context: Context, t: Token): boolean {
            if (this.token !== t) return false;
            this.nextToken(context);
            return true;
        }
    
        private expect(context: Context, t: Token, msg: Errors = Errors.Unexpected) {
            if (this.token !== t) this.error(msg);
            this.nextToken(context);
        }
    
        private isEvalOrArguments(value: string): boolean {
            return value === 'eval' || value === 'arguments';
        }
    
        /**
         * Consume a semicolon between tokens, optionally inserting it if necessary.
         */
        private consumeSemicolon(context: Context) {
    
            switch (this.token) {
                case Token.Semicolon:
                    this.expect(context, Token.Semicolon);
                case Token.RightBrace:
                case Token.EndOfSource:
                    break;
                default:
                    if (this.flags & Flags.PrecedingLineBreak) break;
                    this.throwUnexpectedToken();
            }
        }
    
        private nextTokenIsAssign(context: Context) {
            const savedState = this.saveState();
            const t = this.nextToken(context);
            this.rewindState(savedState);
            return t === Token.Assign;
        }
    
        // 'import', 'import.meta'
        private nextTokenIsLeftParenOrPeriod(context: Context): boolean {
            const savedState = this.saveState();
            const t = this.nextToken(context);
            this.rewindState(savedState);
            return t === Token.LeftParen || t === Token.Period;
        }
    
        private nextTokenIsFuncKeywordOnSameLine(context: Context): boolean {
            const savedState = this.saveState();
            const t = this.nextToken(context);
            const line = this.line;
            this.rewindState(savedState);
            return line === this.line && t === Token.FunctionKeyword;
        }
    
        private isLexical(context: Context): boolean {
            const savedState = this.saveState();
            const savedFlag = this.flags;
            const t = this.nextToken(context);
            const flags = this.flags;
            this.rewindState(savedState);
            return !(savedFlag & Flags.ExtendedUnicodeEscape && flags & Flags.PrecedingLineBreak) &&
                !!(t & (Token.BindingPattern | Token.IsIdentifier | Token.IsYield) ||
                    (t & Token.Contextual) === Token.Contextual);
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
    
        private parseIdentifierName(context: Context, t: Token) {
            if (t & (Token.IsIdentifier | Token.Keyword)) return this.parseIdentifier(context);
            this.error(Errors.UnexpectedToken, tokenDesc(t));
        }
    
        private parseExportDefault(context: Context, pos: Location): ESTree.ExportDefaultDeclaration {
    
            this.expect(context, Token.DefaultKeyword);
    
            let declaration: ESTree.FunctionDeclaration | ESTree.ClassDeclaration | ESTree.Expression;
    
            switch (this.token) {
    
                // export default HoistableDeclaration[Default]
                case Token.FunctionKeyword:
                    declaration = this.parseFunctionDeclaration(context | (Context.Optional | Context.Declaration));
                    break;
    
                    // export default ClassDeclaration[Default]
                case Token.ClassKeyword:
                    declaration = this.parseClassDeclaration(context | (Context.Optional | Context.Declaration));
                    break;
    
                    // export default HoistableDeclaration[Default]
                case Token.AsyncKeyword:
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        declaration = this.parseFunctionDeclaration(context | (Context.Optional | Context.Declaration));
                        break;
                    }
                    // falls through
                default:
                    // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                    declaration = this.parseAssignmentExpression(context);
                    this.consumeSemicolon(context);
            }
    
            return this.finishNode(context, pos, {
                type: 'ExportDefaultDeclaration',
                declaration
            });
        }
    
        private parseExportDeclaration(context: Context): ESTree.ExportAllDeclaration | ESTree.ExportNamedDeclaration | ESTree.ExportDefaultDeclaration {
    
            const pos = this.getLocations();
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
    
                    const functionScope = this.functionScope;
                    const blockScope = this.blockScope;
                    const parentScope = this.parentScope;
    
                    this.functionScope = undefined;
                    this.blockScope = undefined;
                    if (blockScope != null) this.parentScope = blockScope;
    
                    this.expect(context, Token.LeftBrace);
    
                    while (this.token !== Token.RightBrace) {
                        if (this.token & Token.Reserved) isReserved = true;
                        specifiers.push(this.parseNamedExportDeclaration(context));
                        if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
                    }
    
                    this.expect(context | Context.ValidateEscape, Token.RightBrace);
    
                    if (this.token === Token.FromKeyword) {
                        source = this.parseFromClause(context);
                    } else if (isReserved) this.throwUnexpectedToken();
    
                    this.functionScope = functionScope;
                    this.blockScope = blockScope;
                    this.parentScope = parentScope;
    
                    this.consumeSemicolon(context);
    
                    break;
    
                    // export ClassDeclaration
                case Token.ClassKeyword:
                    declaration = this.parseClassDeclaration(context | Context.Declaration);
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
                    declaration = this.parseVariableStatement(context);
                    break;
    
                    // export HoistableDeclaration
                case Token.FunctionKeyword:
                    declaration = this.parseFunctionDeclaration(context | Context.Declaration);
                    break;
    
                    // export HoistableDeclaration
                case Token.AsyncKeyword:
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        declaration = this.parseFunctionDeclaration(context | Context.Declaration);
                        break;
                    }
                    // Falls through
                default:
                    this.error(Errors.MissingMsgDeclarationAfterExport);
            }
    
            return this.finishNode(context, pos, {
                type: 'ExportNamedDeclaration',
                source,
                specifiers,
                declaration
            });
        }
    
        private parseNamedExportDeclaration(context: Context): ESTree.ExportSpecifier {
            const pos = this.getLocations();
    
            if (this.token & Token.IsIdentifier) this.addBlockName(this.tokenValue);
    
            const local = this.parseIdentifierName(context | Context.ValidateEscape, this.token);
    
            let exported = local;
    
            if (this.parseOptional(context, Token.AsKeyword)) {
                this.checkIfExistInBlockScope(this.tokenValue);
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
            if (this.token !== Token.StringLiteral) this.error(Errors.InvalidModuleSpecifier);
            return this.parseLiteral(context);
        }
    
        // import {<foo as bar>} ...;
        private parseImportSpecifier(context: Context): ESTree.ImportSpecifier {
    
            const pos = this.getLocations();
            const value = this.tokenValue;
            const t = this.token;
            const imported = this.parseIdentifierName(context | Context.ValidateEscape, t);
            let hasAs = false;
    
            if (this.token & Token.Contextual) {
                this.expect(context, Token.AsKeyword);
                this.checkIfExistInBlockScope(this.tokenValue);
                hasAs = true;
            } else {
                hasAs = this.parseOptional(context, Token.AsKeyword);
                this.addBlockName(value);
            }
    
            let local;
    
            if (!hasAs) {
                if (t & Token.Reserved) this.error(Errors.UnexpectedToken, tokenDesc(this.token))
                if (this.isEvalOrArguments(value)) {
                    this.error(Errors.UnexpectedStrictReserved)
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
            specifiers: (ESTree.ImportSpecifier | ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier)[]
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
            specifiers: (ESTree.ImportSpecifier | ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier)[]
        ) {
            const pos = this.getLocations();
            this.expect(context | Context.ValidateEscape, Token.Multiply);
            this.expect(context, Token.AsKeyword, Errors.NoAsAfterImportNamespace);
            this.checkIfExistInBlockScope(this.tokenValue);
            const local = this.parseBindingIdentifier(context);
            specifiers.push(this.finishNode(context, pos, {
                type: 'ImportNamespaceSpecifier',
                local
            }));
        }
    
        // import <foo> ...;
        private parseImportDefaultSpecifier(context: Context): ESTree.ImportDefaultSpecifier {
            return this.finishNode(context, this.getLocations(), {
                type: 'ImportDefaultSpecifier',
                local: this.parseIdentifierName(context, this.token)
            });
        }
    
        private parseImportDeclaration(context: Context): ESTree.ImportDeclaration {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.ImportKeyword);
    
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
            let source;
    
            if (blockScope != null) this.parentScope = blockScope;
            this.blockScope = undefined;
    
            // import 'foo';
            if (this.token === Token.StringLiteral) {
                this.addBlockName(this.tokenValue);
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
    
            this.blockScope = blockScope;
            if (parentScope != null) this.parentScope = parentScope;
    
            return this.finishNode(context, pos, {
                type: 'ImportDeclaration',
                specifiers,
                source
            });
        }
    
        private parseImportClause(context: Context): any {
            const specifiers: (ESTree.ImportSpecifier |
                ESTree.ImportDefaultSpecifier |
                ESTree.ImportNamespaceSpecifier)[] = [] = [];
    
            switch (this.token) {
    
                case Token.Identifier:
                    {
                        this.addBlockName(this.tokenValue);
                        specifiers.push(this.parseImportDefaultSpecifier(context | Context.ValidateEscape));
                        if (this.parseOptional(context, Token.Comma)) {
                            const t = this.token;
                            if (t & Token.IsGenerator) {
                                this.parseImportNamespaceSpecifier(context, specifiers);
                            } else if (t === Token.LeftBrace) {
                                this.parseNamedImport(context, specifiers);
                            } else {
                                this.error(Errors.UnexpectedToken, tokenDesc(t));
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
                    this.error(Errors.UnexpectedToken, tokenDesc(this.token));
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
                    if (this.isLexical(context)) {
                        return this.parseVariableStatement(context | Context.Let | Context.AllowIn);
                    }
                    return this.parseStatement(context & ~Context.Declaration);
                case Token.ConstKeyword:
                    return this.parseVariableStatement(context | Context.Const | Context.AllowIn);
                    // VariableStatement[?Yield]
                case Token.ExportKeyword:
                    if (context & Context.Module) this.error(Errors.ExportDeclAtTopLevel);
                case Token.ImportKeyword:
                    // We must be careful not to parse a 'import()'
                    // expression or 'import.meta' as an import declaration.
                    if (this.flags & Flags.OptionsNext && this.nextTokenIsLeftParenOrPeriod(context)) {
                        return this.parseExpressionStatement(context | Context.AllowIn);
                    }
                    if (context & Context.Module) this.error(Errors.ImportDeclAtTopLevel);
                default:
                    return this.parseStatement(context);
            }
        }
    
        private parseStatement(context: Context): ESTree.Statement {
            switch (this.token) {
                case Token.Identifier:
                    return this.parseExpressionOrLabeledStatement(context);
                    // EmptyStatement
                case Token.Semicolon:
                    return this.parseEmptyStatement(context);
                    // BlockStatement[?Yield, ?Return]
                case Token.LeftBrace:
                    return this.parseBlockStatement(context);
                    // VariableStatement[?Yield]
                case Token.VarKeyword:
                    return this.parseVariableStatement(context | Context.AllowIn);
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
                    return this.parseSwitchStatement(context | Context.Declaration);
    
                    // ThrowStatement[?Yield]
                case Token.ThrowKeyword:
                    return this.parseThrowStatement(context);
    
                    // TryStatement[?Yield, ?Return]
                case Token.TryKeyword:
                    return this.parseTryStatement(context);

                case Token.YieldKeyword:
                case Token.AwaitKeyword:
                    return this.parseExpressionOrLabeledStatement(context);

                    // AsyncFunctionDeclaration[Yield, Await, Default]
                    // Both 'class' and 'function' are forbidden by lookahead restriction.
                case Token.AsyncKeyword:
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        if (context & Context.Declaration || this.flags & Flags.IterationStatement) {
                            this.error(Errors.AsyncFunctionInSingleStatementContext);
                        }
                        return this.parseFunctionDeclaration(context);
                    }
                    return this.parseExpressionOrLabeledStatement(context | Context.Declaration);
    
                case Token.FunctionKeyword:
                    if (context & Context.AnnexB) return this.parseFunctionDeclaration(context);
                    // falls through
    
                case Token.ClassKeyword:
                    this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
                    
                default:
                    return this.parseExpressionStatement(context | Context.AllowIn);
            }
        }
    
        private parseBlockStatement(context: Context): ESTree.BlockStatement {
            const pos = this.getLocations();
            const body: ESTree.Statement[] = [];
            this.expect(context, Token.LeftBrace);
    
            if (this.token !== Token.RightBrace) {
    
                const blockScope = this.blockScope;
                const parentScope = this.parentScope;
                if (blockScope !== undefined) this.parentScope = blockScope;
                this.blockScope = context & Context.ExistingScope ? blockScope : undefined;
                const flag = this.flags;
    
                while (this.token !== Token.RightBrace) {
                    body.push(this.parseStatementListItem(context & ~Context.ExistingScope | Context.Declaration));
                }
    
                this.flags = flag;
    
                this.blockScope = context & Context.ExistingScope ? undefined : blockScope;
                if (parentScope !== undefined) this.parentScope = parentScope;
            }
    
            this.expect(context, Token.RightBrace);
    
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
                this.addCatchArg(this.tokenValue);
    
                param = this.parseBindingIdentifierOrPattern(context);
                this.expect(context, Token.RightParen);
            }
    
            const body = this.parseBlockStatement(context | Context.ExistingScope);
    
            this.blockScope = blockScope;
    
            if (blockScope !== undefined) this.parentScope = parentScope;
    
            return this.finishNode(context, pos, {
                type: 'CatchClause',
                param,
                body
            });
        }
    
        private parseThrowStatement(context: Context): ESTree.ThrowStatement {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.ThrowKeyword);
    
            if (this.flags & Flags.PrecedingLineBreak) this.error(Errors.LineBreakAfterThrow);
    
            const argument: ESTree.Expression = this.parseExpression(context | Context.AllowIn, pos);
    
            this.consumeSemicolon(context);
    
            return this.finishNode(context, pos, {
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
            return this.finishNode(context, pos, {
                type: 'WithStatement',
                object,
                body: this.parseStatement(context | Context.Statement | Context.Declaration)
            });
        }
    
        private parseWhileStatement(context: Context): ESTree.WhileStatement {
            const pos = this.getLocations();
    
            this.expect(context, Token.WhileKeyword);
            this.expect(context, Token.LeftParen);
    
            const test = this.parseExpression(context | Context.AllowIn, pos);
    
            this.expect(context, Token.RightParen);
    
            const savedFlag = this.flags;
    
            this.flags |= Flags.IterationStatement;
    
            const body = this.parseStatement(context & ~Context.Declaration);
            this.flags = savedFlag;
    
            return this.finishNode(context, pos, {
                type: 'WhileStatement',
                test,
                body
            });
        }
    
        private parseDoWhileStatement(context: Context): ESTree.DoWhileStatement {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.DoKeyword);
    
            const savedFlag = this.flags;
            this.flags |= Flags.IterationStatement;
            const body = this.parseStatement(context & ~Context.Declaration);
            this.flags = savedFlag;
    
            this.expect(context, Token.WhileKeyword);
            this.expect(context, Token.LeftParen);
    
            const test = this.parseExpression(context & ~Context.Declaration | Context.AllowIn, pos);
    
            this.expect(context, Token.RightParen);
            this.parseOptional(context, Token.Semicolon);
    
            return this.finishNode(context, pos, {
                type: 'DoWhileStatement',
                body,
                test
            });
        }
    
        private parseContinueStatement(context: Context): ESTree.ContinueStatement {
    
            if (!(this.flags & Flags.IterationStatement)) this.error(Errors.InvalidNestedContinue);
    
            const pos = this.getLocations();
    
            this.expect(context, Token.ContinueKeyword);
    
            let label: any = null;
            if (!(this.flags & Flags.PrecedingLineBreak) && this.token & Token.IsIdentifier) {
                label = this.parseIdentifierName(context, this.token);
    
                if (this.labelSet === undefined || !('$' + label.name in this.labelSet)) {
                    this.error(Errors.UnknownLabel, label.name);
                }
            }
    
            this.consumeSemicolon(context);
    
            return this.finishNode(context, pos, {
                type: 'ContinueStatement',
                label
            });
        }
    
        private parseBreakStatement(context: Context): ESTree.BreakStatement {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.BreakKeyword);
    
            let label: any = null;
    
            if (!(this.flags & Flags.PrecedingLineBreak) && this.token & Token.IsIdentifier) {
                label = this.parseIdentifierName(context, this.token);
                if (this.labelSet === undefined || !('$' + label.name in this.labelSet)) {
                    this.error(Errors.UnknownLabel, label.name);
                }
            }
    
            if (label === null && !(this.flags & (Flags.IterationStatement | Flags.SwitchStatement))) {
                this.error(Errors.IllegalBreak);
            }
    
            this.consumeSemicolon(context);
    
            return this.finishNode(context, pos, {
                type: 'BreakStatement',
                label
            });
        }
    
        private parseForStatement(context: Context): ESTree.ForOfStatement | ESTree.ForInStatement | ESTree.ForStatement {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.ForKeyword);
    
            let declarations: ESTree.VariableDeclarator[] | null = null;
            let init: any = null;
            let body: ESTree.Statement;
    
            // Create a lexical scope node around the whole ForStatement
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
            const awaitToken = (context & Context.Await) !== 0 && this.parseOptional(context, Token.AwaitKeyword);
            const savedFlag = this.flags;
    
            this.blockScope = undefined;
            if (blockScope !== undefined) this.parentScope = blockScope;
    
            this.expect(context, Token.LeftParen);
    
            const token = this.token;
    
            context |= Context.ForStatement | Context.ValidateEscape;
    
            if (this.token !== Token.Semicolon) {
    
                const VarDeclStart = this.getLocations();
    
                if (this.parseOptional(context, Token.VarKeyword)) {
                    declarations = this.parseVariableDeclarationList(context);
                } else if (this.parseOptional(context, Token.ConstKeyword)) {
                    declarations = this.parseVariableDeclarationList(context | Context.Const);
                } else if (this.isLexical(context) && this.parseOptional(context, Token.LetKeyword)) {
                    declarations = this.parseVariableDeclarationList(context | Context.Let);
                } else {
                    init = this.parseExpression(context & ~Context.AllowIn, pos);
                }
                if (declarations) {
                    init = this.finishNode(context, VarDeclStart, {
                        type: 'VariableDeclaration',
                        declarations,
                        kind: tokenDesc(token)
                    });
                }
            }
    
            this.flags |= Flags.IterationStatement;
    
            if (isInOrOfKeyword(this.token)) {
    
                let isForOfStatement = false;
                let right;
    
                if (this.parseOptional(context, Token.OfKeyword)) {
                    isForOfStatement = true;
                    if (awaitToken && !(this.flags & Flags.OptionsNext)) this.error(Errors.UnexpectedToken, tokenDesc(token));
                    right = this.parseAssignmentExpression(context);
                } else if (this.parseOptional(context, Token.InKeyword)) {
                    if (awaitToken) this.error(Errors.UnexpectedToken, tokenDesc(token));
                    if (declarations && declarations.length !== 1) this.error(Errors.Unexpected);
                    right = this.parseExpression(context, pos);                    
                }
    
                if (!declarations) {
                    if (!isValidDestructuringAssignmentTarget(init) || init.type === 'AssignmentExpression') {
                        this.error(Errors.InvalidLHSInForLoop);
                    }
                    this.reinterpretAsPattern(context, init);
                }
                
                this.expect(context, Token.RightParen);
                body = this.parseStatement(context & ~Context.Declaration | Context.ExistingScope);
    
                this.blockScope = blockScope;
                if (blockScope !== undefined) this.parentScope = parentScope;
    
                this.flags = savedFlag;
    
                return this.finishNode(context, pos, isForOfStatement ? {
                    type: 'ForOfStatement',
                    body,
                    left: init,
                    right,
                    await: awaitToken
                } : {
                    type: 'ForInStatement',
                    body,
                    left: init,
                    right
                });
            }
    
            let update: ESTree.Expression | null = null;
            let test: ESTree.Expression | null = null;
    
            this.expect(context, Token.Semicolon);
    
            if (this.token !== Token.Semicolon) test = this.parseExpression(context, pos);
    
            this.expect(context, Token.Semicolon);
    
            if (this.token !== Token.RightParen) update = this.parseExpression(context, pos);
    
            this.expect(context, Token.RightParen);
    
            body = this.parseStatement(context & ~Context.Declaration);
    
            this.blockScope = blockScope;
    
            if (blockScope !== undefined) this.parentScope = parentScope;
    
            this.flags = savedFlag;
    
            return this.finishNode(context, pos, {
                type: 'ForStatement',
                body,
                init,
                test,
                update
            });
        }
    
        private parseIfStatementChild(context: Context): ESTree.Statement {
            if (context & Context.Strict && this.token === Token.FunctionKeyword) {
                this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
            }
            return this.parseStatement(context | (Context.AnnexB | Context.Declaration | Context.Statement));
        }
    
        private parseIfStatement(context: Context): ESTree.IfStatement {
    
            const pos = this.getLocations();
    
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
    
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
    
            return this.finishNode(context, pos, {
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
            return this.finishNode(context, pos, {
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
    
            this.flags |= Flags.SwitchStatement;
    
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
    
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
                type: 'SwitchCase',
                test,
                consequent,
            });
        }
    
        private parseEmptyStatement(context: Context): ESTree.EmptyStatement {
            const pos = this.getLocations();
            this.nextToken(context);
            return this.finishNode(context, pos, {
                type: 'EmptyStatement'
            });
        }
    
        private canParseArgument(): boolean {
    
            // Bail out quickly if we have seen a LineTerminator
            if (this.flags & Flags.PrecedingLineBreak) return false;
    
            switch (this.token) {
                case Token.Semicolon:
                case Token.RightBrace:
                case Token.EndOfSource:
                    return false;
                default:
                    return true;
            }
        }
    
        private parseReturnStatement(context: Context): ESTree.ReturnStatement {
            const pos = this.getLocations();
    
            if (!(this.flags & (Flags.OptionsGlobalReturn | Flags.InFunctionBody))) this.error(Errors.IllegalReturn);
    
            this.expect(context, Token.ReturnKeyword);
    
            let argument: ESTree.Expression | null = null;
    
            if (this.canParseArgument()) {
                argument = this.parseExpression(context | Context.AllowIn, pos);
            }
    
            this.consumeSemicolon(context);
    
            return this.finishNode(context, pos, {
                type: 'ReturnStatement',
                argument
            });
        }
    
        private parseExpressionOrLabeledStatement(context: Context): ESTree.ExpressionStatement | ESTree.LabeledStatement {
            const pos = this.getLocations();
            const token = this.token;
    
            const expr = this.parseExpression(context | Context.ValidateEscape | Context.AllowIn, pos);
    
            if (this.token === Token.Colon && expr.type === 'Identifier') {
    
                this.expect(context, Token.Colon);
    
                const key = '$' + expr.name;
                if (this.labelSet === undefined) this.labelSet = {};
                else if (this.labelSet[key] === true) this.error(Errors.Redeclaration, expr.name);
    
                this.labelSet[key] = true;
    
                if (this.token === Token.FunctionKeyword) {
                    if (context & Context.Statement || this.flags & Flags.IterationStatement) {
                        this.error(Errors.SloppyFunction);
                    } else if (context & Context.Strict) this.error(Errors.StrictFunction);
                }
    
                const body = this.parseStatement(context | Context.AnnexB | Context.Declaration);
    
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
    
        private parseExpressionStatement(context: Context): ESTree.ExpressionStatement {
            const pos = this.getLocations();
            const expr = this.parseExpression(context, pos);
            this.consumeSemicolon(context);
            return this.finishNode(context, pos, {
                type: 'ExpressionStatement',
                expression: expr
            });
        }
    
        private parseVariableStatement(context: Context): ESTree.VariableDeclaration {
            const pos = this.getLocations();
            const t = this.token;
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
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
            while (this.parseOptional(context, Token.Comma)) list.push(this.parseVariableDeclaration(context));
            return list;
        }
    
        private parseVariableDeclaration(context: Context): ESTree.VariableDeclarator {
    
            const pos = this.getLocations();
            const t = this.token;
            const id = this.parseBindingIdentifierOrPattern(context);
    
            let init: ESTree.Expression | null = null;
    
            if (t & Token.BindingPattern) {
    
                if (this.parseOptional(context, Token.Assign)) {
                    init = this.parseAssignmentExpression(context & ~(Context.Lexical | Context.ForStatement));
                    if (!(context & Context.Lexical) && context & Context.ForStatement) {
                        if (this.token === Token.InKeyword) {
                            this.error(Errors.InvalidVarDeclInForIn);
                        } else if (this.token === Token.OfKeyword) {
                            this.error(Errors.DeclarationMissingInitializer);
                        }
                    }
                } else if (!isInOrOfKeyword(this.token)) this.error(Errors.DeclarationMissingInitializer);
    
            } else {
    
                if (this.parseOptional(context, Token.Assign)) {
                    init = this.parseAssignmentExpression(context & ~(Context.Lexical | Context.ForStatement));
                    if (context & Context.ForStatement) {
                        if (this.token === Token.OfKeyword) this.error(Errors.InvalidVarInitForOf);
                        if (this.token === Token.InKeyword && (context & (Context.Strict | Context.Lexical))) {
                            this.error(Errors.InvalidVarDeclInForIn);
                        }
                    }
                } else if (context & Context.Const && !isInOrOfKeyword(this.token)) {
                    this.error(Errors.MissingInitializer, 'const');
                }
            }
    
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
                type: 'SequenceExpression',
                expressions
            });
        }
    
        private parseYieldExpression(
            context: Context,
            pos: Location
        ): ESTree.YieldExpression {
    
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
            if (context & Context.InParameter) this.error(Errors.YieldInParameter);
            this.expect(context, Token.YieldKeyword);
    
            let argument: ESTree.Expression | null = null;
            let delegate = false;
    
            if (!(this.flags & Flags.PrecedingLineBreak)) {
                delegate = this.parseOptional(context, Token.Multiply);
                if (delegate) {
                    argument = this.parseAssignmentExpression(context);
                } else if (hasMask(this.token, Token.ExpressionStart)) {
                    argument = this.parseAssignmentExpression(context);
                }
            }
    
            return this.finishNode(context, pos, {
                type: 'YieldExpression',
                argument,
                delegate
            });
        }
    
        private parseAssignmentExpression(context: Context): ESTree.AssignmentExpression | ESTree.ArrowFunctionExpression | ESTree.YieldExpression {
    
            const pos = this.getLocations();
            if (context & Context.Yield && this.token & Token.IsYield) {
                // Invalid: 'function* foo(a = 1 + (yield 2)) { }'
                if (context & Context.InParameter && !(this.flags & Flags.InFunctionBody)) {
                    this.error(Errors.InvalidGeneratorParam);
                }
                return this.parseYieldExpression(context, pos);
            }
    
            const token = this.token;
            const tokenValue = this.tokenValue;
            const expr = this.parseConditionalExpression(context, pos);
            // If that's the case - parse out a arrow function with a single un-parenthesized parameter.
            // An async one, will be parsed out in 'parsePrimaryExpression'
            if (this.token === Token.Arrow && (this.isIdentifier(context | Context.Arrow, token))) {
    
                if (!(this.flags & Flags.PrecedingLineBreak)) {
                    if (this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                        if (context & Context.Strict) this.error(Errors.UnexpectedStrictReserved);
                        this.flags |= Flags.Binding;
                    }
                    return this.parseArrowFunctionExpression(context & ~(Context.Await) | Context.Arrow, pos, [expr]);
                }
            }
    
            if (hasMask(this.token, Token.AssignOperator)) {
                const operator = this.token;
                if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                    this.error(Errors.StrictLHSAssignment);
                } else if (this.token === Token.Assign) {
                    if (context & Context.InParenthesis) {
                        this.flags |= Flags.SimpleParameterList;
                    } else if (this.flags & Flags.Rest) this.error(Errors.InvalidLHSInAssignment);
                    // Note: A functions arameter list is already parsed as pattern, so no need to reinterpret
                    if (!(context & Context.InParameter)) this.reinterpretAsPattern(context, expr);
                } else if (!isValidSimpleAssignmentTarget(expr)) {
                    this.error(Errors.InvalidLHSInAssignment);
                }
    
                this.nextToken(context);
    
                if (context & Context.Yield && context & Context.InParenthesis && this.token & Token.IsYield) {
                    this.flags |= Flags.Yield;
                }
    
                const right = this.parseAssignmentExpression(context | Context.AllowIn);
    
                return this.finishNode(context, pos, {
                    type: 'AssignmentExpression',
                    left: expr,
                    operator: tokenDesc(operator),
                    right: right
                });
            }
            return expr;
        }
    
        private reinterpretAsPattern(context: Context, node: any) {
    
            switch (node.type) {
                case 'Identifier':
                    if (context & Context.InArrowParameterList) {
                        this.addFunctionArg(node.name);
                    }
                    if (context & Context.Strict && this.isEvalOrArguments(node.name)) {
                        this.error(Errors.InvalidBindingStrictMode, node.name);
                    }
                    return;
    
                case 'ObjectExpression':
                    if (this.flags & Flags.ParenthesizedPattern) this.error(Errors.InvalidParenthesizedPattern);
                    node.type = 'ObjectPattern';
    
                    // falls through
                case 'ObjectPattern':
                    // ObjectPattern and ObjectExpression are isomorphic
                    for (let i = 0; i < node.properties.length; i++) {
                        const prop = node.properties[i];
                        this.reinterpretAsPattern(context, prop.value ? prop.value : prop);
                    }
                    return;
    
                case 'ArrayExpression':
                    if (this.flags & Flags.ParenthesizedPattern) this.error(Errors.InvalidParenthesizedPattern);
                    node.type = 'ArrayPattern';
                    // falls through
    
                case 'ArrayPattern':
                    for (let i = 0; i < node.elements.length; ++i) {
                        // skip holes in pattern
                        if (node.elements[i] !== null) this.reinterpretAsPattern(context, node.elements[i]);
                    }
                    return;
    
                case 'AssignmentExpression':
                    if (node.operator !== '=') this.throwUnexpectedToken();
                    node.type = 'AssignmentPattern';
                    delete node.operator; // operator is not relevant for assignment pattern
                    // Fall through
    
                case 'AssignmentPattern':
    
                    this.reinterpretAsPattern(context, node.left);
                    return;
    
                case 'SpreadElement':
                    node.type = 'RestElement';
    
                    // Fall through
    
                case 'RestElement':
                    this.reinterpretAsPattern(context, node.argument);
                    if (node.argument.type === 'AssignmentPattern') this.error(Errors.InvalidRestDefaultValue);
                    return;
    
                case 'MemberExpression':
                case 'MetaProperty':
                    if (!(context & Context.InArrowParameterList)) return;
                    // Fall through
    
                default:
                    this.error(Errors.InvalidDestructuringTarget);
            }
        }
    
        private parseArrowFunctionExpression(
            context: Context,
            pos: Location,
            params: ESTree.Node[]
        ): ESTree.ArrowFunctionExpression {
    
            // A line terminator between ArrowParameters and the => should trigger a SyntaxError.
            if (this.flags & Flags.PrecedingLineBreak) this.error(Errors.LineBreakAfterAsync);
    
            this.expect(context, Token.Arrow);
    
            // Unsetting the 'AllowCall' mask here, let the parser fail correctly
            // if a non-simple arrow are followed by a call expression.
            //
            //  (a) => {}()
            //
            if (this.flags & Flags.AllowCall) this.flags &= ~Flags.AllowCall;
    
            const functionScope = this.functionScope;
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
    
            this.functionScope = undefined;
            this.blockScope = undefined;
            this.parentScope = undefined;
    
            // A 'simple arrow' is just a plain identifier and doesn't have any param list.
            if (!(context & Context.Arrow)) {
                for (const i in params) this.reinterpretAsPattern(context | Context.InArrowParameterList, params[i]);
            }
    
            let body;
            let expression = false;
    
            // Unset the necessary masks
            context &= ~(Context.InParenthesis | Context.Yield) | Context.AllowIn;
    
            if (!(this.flags & Flags.InFunctionBody)) context |= Context.Declaration;
    
            if (this.token === Token.LeftBrace) {
                body = this.parseFunctionBody(context | Context.Arrow);
            } else {
                if (context & Context.ClassFields && this.isEvalOrArguments(this.tokenValue)) {
                    this.error(Errors.UnexpectedStrictReserved);
                }
                body = this.parseAssignmentExpression(context);
                expression = true;
            }
    
            this.functionScope = functionScope;
            this.blockScope = blockScope;
            this.parentScope = parentScope;
    
            return this.finishNode(context, pos, {
                type: 'ArrowFunctionExpression',
                body,
                params,
                id: null,
                async: (context & Context.Await) !== 0,
                generator: (context & Context.Yield) !== 0,
                expression
            });
        }
    
        private parseConditionalExpression(context: Context, pos: Location) {
            const expr = this.parseBinaryExpression(context, 0, pos);
            if (!this.parseOptional(context, Token.QuestionMark)) return expr;
            const consequent = this.parseAssignmentExpression(context | Context.AllowIn);
            this.expect(context, Token.Colon);
            if (context & Context.ClassFields && this.isEvalOrArguments(this.tokenValue)) {
                this.error(Errors.UnexpectedStrictReserved);
            }
            const alternate = this.parseAssignmentExpression(context);
            return this.finishNode(context, pos, {
                type: 'ConditionalExpression',
                test: expr,
                consequent,
                alternate
            });
        }
    
        private parseBinaryExpression(
            context: Context,
            minPrec: number,
            pos: any,
            expr: ESTree.Expression = this.parseUnaryExpression(context)
        ): ESTree.Expression {
            const bit = context & Context.AllowIn;
            while (hasMask(this.token, Token.BinaryOperator)) {
                const t = this.token;
                const prec = t & Token.Precedence;
                const delta = ((t === Token.Exponentiate) as any) << Token.PrecStart;
                if (!bit && this.token === Token.InKeyword) break;
                if (prec + delta <= minPrec) break;
                this.nextToken(context);
    
                expr = this.finishNode(context, pos, {
                    type: t & Token.IsLogical ? 'LogicalExpression' : 'BinaryExpression',
                    left: expr,
                    right: this.parseBinaryExpression(context, prec, this.getLocations()),
                    operator: tokenDesc(t)
                });
            }
    
            return expr;
        }
    
        // 12.5 Unary Operators
    
        private isPrivateName(expr: any) {
            return expr.property && expr.property.type === 'PrivateName';
        }
    
        private parseUnaryExpression(context: Context): ESTree.UnaryExpression | ESTree.Expression {
    
            const pos = this.getLocations();
            let t = this.token;
    
            if (t & Token.IsAwait && context & Context.Await) {
                return this.parseAwaitExpression(context, pos);
            }
    
            if (hasMask(t, Token.UnaryOperator)) {
                t = this.token;
                this.nextToken(context);
                const argument = this.parseUnaryExpression(context);
                if (this.token === Token.Exponentiate) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                if (context & Context.Strict && t === Token.DeleteKeyword) {
                    if (argument.type === 'Identifier' || (this.flags & Flags.OptionsNext &&
                            !(context & Context.Module) && this.isPrivateName(argument))) {
                        this.error(Errors.StrictDelete);
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
    
        private parseAwaitExpression(context: Context, pos: Location): ESTree.AwaitExpression {
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
            this.expect(context, Token.AwaitKeyword);
            return this.finishNode(context, pos, {
                type: 'AwaitExpression',
                argument: this.parseUnaryExpression(context)
            });
        }
    
        private parseUpdateExpression(context: Context, pos: Location) {
    
            let expr: ESTree.Expression;
            let hasPrefix;
            let t = this.token;
    
            if (hasMask(t, Token.UpdateOperator)) {
                this.nextToken(context);
                hasPrefix = true;
            }
    
            expr = this.parseLeftHandSideExpression(context, pos);
    
            if (!hasPrefix) {
                if (hasMask(this.token, Token.UpdateOperator) && !(this.flags & Flags.PrecedingLineBreak)) {
                    t = this.token;
                    this.nextToken(context);
                } else return expr;
            }
    
            if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                this.error(hasPrefix ? Errors.StrictLHSPrefix : Errors.StrictLHSPostfix);
            }
    
            if (!isValidSimpleAssignmentTarget(expr)) {
                this.error(hasPrefix ? Errors.InvalidLhsInPrefixOp : Errors.InvalidLhsInPostfixOp);
            }
    
            return this.finishNode(context, pos, {
                type: 'UpdateExpression',
                argument: expr,
                operator: tokenDesc(t),
                prefix: !!hasPrefix
            });
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
    
            return this.finishNode(context, pos, {
                type: 'Super'
            });
        }
    
        private parseImportCall(context: Context, pos: Location) {
            const id = this.parseIdentifier(context);
    
            switch (this.token) {
    
                // Import.meta - Stage 3 proposal
                case Token.Period:
                    if (!(context & Context.Module)) this.error(Errors.Unexpected);
                    this.expect(context, Token.Period);
                    if (this.tokenValue !== 'meta') this.error(Errors.Unexpected);
                    return this.parseMetaProperty(context, id, pos);
    
                default:
                    return this.finishNode(context, pos, {
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
                    expr = this.parseImportCall(context | Context.AllowIn, pos);
                    break;
    
                default:
                    expr = this.parseMemberExpression(context | Context.AllowIn, pos);
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
    
                            const property = this.flags & Flags.OptionsNext && context & Context.Method && this.token === Token.Hash ?
                                this.parsePrivateName(context) : this.parseIdentifierName(context, this.token);
                            expr = this.finishNode(context, pos, {
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
                            expr = this.finishNode(context, pos, {
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
                            const quasiStart = this.getLocations();
                            const quasi = this.token === Token.TemplateCont ?
                                this.parseTemplate(context | Context.TaggedTemplate, quasiStart) : this.parseTemplateLiteral(context | Context.TaggedTemplate, quasiStart);
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
                    
                        const args = this.parseArguments(context, pos);
    
                        if (context & Context.Import && args.length !== 1 &&
                            expr.type as string === 'Import') this.error(Errors.BadImportCallArity);
    
                        expr = this.finishNode(context, pos, {
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
    
        private parseFunctionDeclaration(context: Context): ESTree.FunctionDeclaration {
            const parentContext = context;
            return this.parseFunction(context &= ~(Context.Method | Context.Constructor | Context.Yield | Context.Await), parentContext) as ESTree.FunctionDeclaration;
        }
        
        private parseFunctionExpression(context: Context): ESTree.FunctionExpression {
            return this.parseFunction(context &= ~(Context.Constructor | Context.Yield | Context.Method)) as ESTree.FunctionExpression;
        }
    
        private parseFunction(context: Context, parentContext: Context = Context.None): ESTree.FunctionDeclaration | ESTree.FunctionExpression {
    
            const pos = this.getLocations();
    
            if (this.token & Token.IsAsync) {
                if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.Unexpected);
                this.expect(context, Token.AsyncKeyword);
                context |= Context.Await;
            }
    
            this.expect(context, Token.FunctionKeyword);
    
            if (this.token & Token.IsGenerator) {
                if (context & Context.AnnexB) {
                    this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
                }
                if (context & Context.Await && !(this.flags & Flags.OptionsNext)) {
                    this.error(Errors.InvalidAsyncGenerator);
                }
                this.expect(context, Token.Multiply);
                context |= Context.Yield;
            }
    
            let id: ESTree.Identifier | null = null;
    
            if (this.token !== Token.LeftParen) {
    
                const t = this.token;
    
                if (!this.isIdentifier(context, t)) this.throwUnexpectedToken();
    
                if (this.isEvalOrArguments(this.tokenValue)) {
                    if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
                    context |= Context.StrictReserved;
                 }

                if (context & (Context.Expression | Context.AnnexB)) {
    
                    if (context & (Context.Await | Context.Yield) &&
                        (t & (Token.IsAwait | Token.IsYield))) {
                        this.error(Errors.DisallowedInContext, tokenDesc(t));
                    }
    
                    id = this.parseIdentifier(context);
    
                } else {
    
                    if (parentContext & (Context.Await | Context.Yield) &&
                        (t & (Token.IsAwait | Token.IsYield))) {
                        this.error(Errors.DisallowedInContext, tokenDesc(t));
                    }
    
                    if (context & Context.Declaration) {
                        let name = this.tokenValue;
                        if (!this.initBlockScope() && name in this.blockScope) {
                            if (this.blockScope[name] & ScopeMasks.Shadowable || this.blockScope !== this.functionScope) {
                                this.error(Errors.DuplicateBinding, name)
                            }
                        }
                        this.blockScope[this.tokenValue] = ScopeMasks.Shadowable;
                    }
    
                    id = this.parseBindingIdentifier(context);
                }
    
            } else if (!(context & (Context.Expression | Context.Optional))) this.error(Errors.UnNamedFunctionStmt);
    
            const functionScope = this.functionScope;
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
    
            this.functionScope = undefined;
            this.blockScope = undefined;
            this.parentScope = undefined;
    
            const params = this.parseParameterList(context | Context.InParameter, ObjectState.None);
            const body = this.parseFunctionBody(context & ~Context.Expression);
    
            this.functionScope = functionScope;
            this.blockScope = blockScope;
            this.parentScope = parentScope;
    
            return this.finishNode(context, pos, {
                type: (context & Context.Expression) !== 0 ? 'FunctionExpression' : 'FunctionDeclaration',
                params,
                body,
                async: (context & Context.Await) !== 0,
                generator: (context & Context.Yield) !== 0,
                expression: false,
                id
            });
        }
    
        private parseParameterList(context: Context, state: ObjectState): ESTree.AssignmentPattern[] {
            this.expect(context, Token.LeftParen);
            const result = [];
            this.flags &= ~Flags.SimpleParameterList;
    
            while (this.token !== Token.RightParen) {
                if (this.token === Token.Ellipsis) {
                    this.errorLocation = this.getLocations();
                    this.flags |= Flags.SimpleParameterList;
                    if (state & ObjectState.Set) this.error(Errors.BadSetterRestParameter);
                    this.parseOptional(context, Token.Comma);
                    result.push(this.parseRestElement(context));
                    break; // rest parameter must be the last
                }
    
                if (!(context & Context.Strict) && !(this.token & Token.IsIdentifier)) context |= Context.Pattern;
    
                result.push(this.parseFormalParameters(context));
                if (this.token !== Token.RightParen) this.expect(context, Token.Comma);
            }
    
            if (state & ObjectState.Get && result.length > 0) this.error(Errors.BadGetterArity);
    
            if (state & ObjectState.Set && result.length !== 1) this.error(Errors.BadSetterArity);
    
            this.expect(context, Token.RightParen);
    
            return result;
        }
    
        private parseFormalParameters(
            context: Context,
        ): ESTree.AssignmentPattern | ESTree.Identifier | ESTree.ObjectPattern | ESTree.ArrayPattern | ESTree.RestElement {
            const pos = this.getLocations();
    
            // Handle non-identifiers; Default values and destructuring
            if (!(this.token & Token.IsIdentifier)) {
                this.errorLocation = pos;
                this.flags |= Flags.SimpleParameterList;
            }
    
            if (this.isEvalOrArguments(this.tokenValue)) {
                if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
                this.errorLocation = pos;
                this.flags |= Flags.Binding;
            }
    
            const left = this.parseBindingIdentifierOrPattern(context);
    
            if (this.token !== Token.Assign) return left;
    
            this.expect(context, Token.Assign);
    
            if (this.token & (Token.IsYield | Token.IsAwait) && context & (Context.Yield | Context.Await)) {
                this.error(Errors.DisallowedInContext, tokenDesc(this.token));
            }
    
            this.flags |= Flags.SimpleParameterList;
    
            return this.finishNode(context, pos, {
                type: 'AssignmentPattern',
                left,
                right: this.parseAssignmentExpression(context)
            });
        }
    
        private parseAsyncFunctionExpression(
            context: Context,
            pos: Location
        ): ESTree.CallExpression | ESTree.ArrowFunctionExpression | ESTree.Identifier | void {
            const isEscaped = (this.flags & Flags.ExtendedUnicodeEscape) !== 0;
            // Valid: `(\u0061sync ())`
            if (isEscaped && !(context & Context.InParenthesis)) {
                this.error(Errors.Unexpected);
            }
    
            const id = this.parseIdentifier(context);
            const flags = this.flags |= Flags.SimpleParameterList;
    
            switch (this.token) {
    
                case Token.YieldKeyword:
                case Token.Identifier:
                    // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
                    // we got an LineTerminator. The 'ArrowFunctionExpression' will be parsed out in 'parseAssignmentExpression'
                    if (this.flags & Flags.PrecedingLineBreak) return id;
                    const expr = this.parseIdentifier(context);
                    if (this.token === Token.Arrow) return this.parseArrowFunctionExpression(context & ~Context.Yield | Context.AllowIn | Context.Await, pos, [expr]);
                    // Invalid: 'async abc'
                    this.throwUnexpectedToken();
    
                    // CoverCallExpressionAndAsyncArrowHead[Yield, Await]:
                case Token.LeftParen:
                    // This could be either a CallExpression or the head of an async arrow function
                    return this.parseAsyncArguments(context & ~Context.Yield | Context.AllowIn, pos, id, flags, isEscaped);
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
    
            const args = [];
            let state = ParenthesizedState.None;
    
            while (this.token !== Token.RightParen) {
    
                if (this.token === Token.Ellipsis) {
                    const elem = this.parseSpreadExpression(context);
                    // Trailing comma in async arrow param list
                    if (this.token === Token.Comma) {
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
                    if (this.token & Token.IsAwait && !(state & ParenthesizedState.Await)) {
                        this.errorLocation = this.getLocations();
                        state |= ParenthesizedState.Await;
                    }
                    if (!(state & ParenthesizedState.Parenthesized) && this.token === Token.LeftParen) {
                        this.errorLocation = this.getLocations();
                        state |= ParenthesizedState.Parenthesized;
                    }
                    args.push(this.parseAssignmentExpression(context | Context.InAsyncArgs));
                }
    
                if (this.token === Token.RightParen) break;
    
                this.expect(context, Token.Comma);
    
                if (this.token === Token.RightParen) break;
            }
    
            this.expect(context, Token.RightParen);
    
            if (this.token === Token.Arrow) {
    
                if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
                // async arrows cannot have a line terminator between "async" and the formals
                if (flags & Flags.PrecedingLineBreak) this.error(Errors.LineBreakAfterAsync);
                if (this.flags & Flags.Await) this.error(Errors.InvalidAwaitInArrowParam);
                if (state & ParenthesizedState.EvalOrArg) this.error(Errors.StrictParamName);
                if (state & ParenthesizedState.Parenthesized) this.error(Errors.InvalidParenthesizedPattern);
                if (state & ParenthesizedState.Trailing) this.throwUnexpectedToken();
                return this.parseArrowFunctionExpression(context | Context.Await, pos, args);
            }
    
            // We are done, so unset the bitmask
            this.flags &= ~Flags.Await;
    
            this.errorLocation = undefined;
    
            return this.finishNode(context, pos, {
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
    
                this.flags &= ~(Flags.SwitchStatement | Flags.BreakStatement | Flags.IterationStatement);
                body = this.parseStatementList(context & ~Context.Lexical, Token.RightBrace);
                this.labelSet = previousLabelSet;
                this.flags = savedFlags;
            }
    
            this.expect(context, Token.RightBrace);
    
            return this.finishNode(context, pos, {
                type: 'BlockStatement',
                body
            });
        }
    
        private parseSpreadExpression(context: Context): ESTree.SpreadElement {
            const pos = this.getLocations();
            // Disallow SpreadElement inside dynamic import
            if (context & Context.Import) this.throwUnexpectedToken();
            this.expect(context, Token.Ellipsis);
    
            const arg = this.parseAssignmentExpression(context);
            return this.finishNode(context, pos, {
                type: 'SpreadElement',
                argument: arg
            });
        }
    
        private parseArguments(context: Context, pos: Location): ESTree.Expression[] {
            this.expect(context, Token.LeftParen);
    
            const args: any[] = [];
    
            while (this.token !== Token.RightParen) {
                const expr = this.token === Token.Ellipsis ? this.parseSpreadExpression(context) :
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
            return this.finishNode(context, pos, {
                meta,
                type: 'MetaProperty',
                property: this.parseIdentifier(context)
            });
        }
    
        private parseNewExpression(context: Context): ESTree.MetaProperty | ESTree.NewExpression {
    
            const pos = this.getLocations();
    
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
    
            const id = this.parseIdentifier(context);
    
            switch (this.token) {
    
                // '.'
                case Token.Period:
    
                    this.expect(context, Token.Period);
    
                    if (this.token & Token.IsIdentifier) {
                        if (this.tokenValue !== 'target') this.error(Errors.MetaNotInFunctionBody);
                        if (context & Context.InParameter) return this.parseMetaProperty(context, id, pos);
                        if (context & Context.Arrow && context & Context.Declaration) this.error(Errors.NewTargetArrow);
                        if (!(this.flags & Flags.InFunctionBody)) this.error(Errors.MetaNotInFunctionBody);
                    }
    
                    const meta = this.parseMetaProperty(context, id, pos);
    
                    if (this.token === Token.Assign) {
                        this.error(Errors.InvalidLHSInAssignment);
                    }
    
                    return meta;
    
                default:
    
                    return this.finishNode(context, pos, {
                        type: 'NewExpression',
                        callee: this.parseMemberExpression(context, pos),
                        arguments: this.token === Token.LeftParen ? this.parseArguments(context, pos) : []
                    });
            }
        }
    
        private parsePrimaryExpression(context: Context, pos: Location) {
    
            switch (this.token) {
                case Token.NumericLiteral:
                case Token.StringLiteral:
                    return this.parseLiteral(context);
                case Token.BigInt:
                    return this.parseBigIntLiteral(context, pos);
                case Token.Identifier:
                    return this.parseIdentifier(context);
                case Token.FunctionKeyword:
                    return this.parseFunctionExpression(context | Context.Expression | Context.InParenthesis);
                case Token.ThisKeyword:
                    return this.parseThisExpression(context);
                case Token.NullKeyword:
                case Token.TrueKeyword:
                case Token.FalseKeyword:
                    return this.parseNullOrTrueOrFalseExpression(context, pos);
                case Token.LeftParen:
                    return this.parseParenthesizedExpression(context | Context.InParenthesis | Context.AllowIn, pos);
                case Token.LeftBracket:
                    return this.parseArrayInitializer(context);
                case Token.NewKeyword:
                    return this.parseNewExpression(context);
                case Token.SuperKeyword:
                    return this.parseSuper(context);
                case Token.ClassKeyword:
                    return this.parseClassExpression(context | Context.Expression);
                case Token.LeftBrace:
                    return this.parseObjectExpression(context &= ~Context.Constructor);
                case Token.TemplateTail:
                    return this.parseTemplateLiteral(context, pos);
                case Token.TemplateCont:
                    return this.parseTemplate(context, pos);
                case Token.Divide:
                case Token.DivideAssign:
                    return this.parseRegularExpression(context);
                case Token.AsyncKeyword:
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        return this.parseFunctionExpression(context | Context.Await | Context.Expression);
                    }
                    return this.parseAsyncFunctionExpression(context, pos);
                case Token.ThrowKeyword:
                    return this.parseThrowExpression(context, pos);
                case Token.AwaitKeyword:
                    if (context & Context.InAsyncArgs) this.flags |= Flags.Await;
                    if (context & Context.Module) {
                        // Valid: 'await = 0;'
                        if (!this.nextTokenIsAssign(context)) this.throwUnexpectedToken();
                    }
                    return this.parseIdentifier(context);
                case Token.LetKeyword:
                    return this.parseLet(context);
                case Token.LessThan:
                    if (this.flags & Flags.OptionsJSX) return this.parseJSXElement(context | Context.Expression);
                case Token.Hash:
                    if (context & Context.Method && this.flags & Flags.OptionsNext) return this.parsePrivateName(context);
                    // falls through
                case Token.YieldKeyword:
                    if (context & Context.Yield) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    // falls through
                default:
                    if (!this.isIdentifier(context, this.token)) this.throwUnexpectedToken();
                    return this.parseIdentifier(context);
            }
        }
    
        private parseLet(context: Context): ESTree.Identifier {
            const name = this.tokenValue;
            const pos = this.getLocations();
            const flag = this.flags;
            if (context & Context.Strict) this.error(Errors.InvalidStrictExpPostion, tokenDesc(this.token));
    
            this.nextToken(context);
    
            if (this.token === Token.LeftBracket &&
                this.flags & Flags.PrecedingLineBreak) {
                // Note: ExpressionStatement has a lookahead restriction for `let [`.
                this.error(Errors.UnexpectedToken, tokenDesc(this.token));
            }
    
            if (this.token === Token.LetKeyword) this.error(Errors.InvalidStrictExpPostion, tokenDesc(this.token));
            
            return this.finishNode(context, pos, {
                type: 'Identifier',
                name
            });
        }
    
        private validateClassFields() {
            if (this.fieldSet !== undefined) {
    
                let scope: any;
                let method: any;
                let key;
    
                for (let i = 0; i < this.fieldSet.length; i++) {
    
                    key = this.fieldSet[i].key;
    
                    const mask = this.fieldSet[i].mask;
    
                    if (mask & FieldState.Method) {
                        if (method === undefined) method = {};
                        method[key] = mask;
                    }
                    if (mask & FieldState.Scope) {
                        if (scope === undefined) scope = {};
                        else if (scope[key]) this.error(Errors.DuplicateBinding, '#' + key);
                        scope[key] = true;
                    }
                }
    
                if (method !== undefined && method[key] & FieldState.Method) {
                    if (!scope || !scope[key]) this.error(Errors.UndefinedInClassScope, '#' + key);
                }
    
                this.fieldSet = undefined;
            }
        }
    
        private parseClassDeclaration(context: Context): ESTree.ClassDeclaration {
            const pos = this.getLocations();
            let id = null;
            this.expect(context, Token.ClassKeyword);
            if (this.isIdentifier(context, this.token)) {
                const name = this.tokenValue;
                this.checkIfExistInFunctionScope(name);
                this.blockScope[name] = ScopeMasks.Shadowable;
                id = this.parseBindingIdentifier(context);
            } else if (!(context & Context.Optional)) this.error(Errors.UnNamedClassStmt);
    
            return this.parseClassTail(context, id, pos) as ESTree.ClassDeclaration;
        }
    
        private parseClassExpression(context: Context): ESTree.ClassExpression {
            const pos = this.getLocations();
            this.expect(context, Token.ClassKeyword);
            let id = null;
            if (this.isIdentifier(context, this.token)) {
                id = this.parseBindingIdentifier(context);
            }
            return this.parseClassTail(context, id, pos) as ESTree.ClassExpression;
        }
    
        private parseClassTail(
            context: Context,
            id: ESTree.Identifier | null,
            pos: Location
        ): ESTree.ClassDeclaration | ESTree.ClassExpression {
    
            let superClass: ESTree.Expression | null = null;
            let flags = ObjectState.None;
    
            if (this.parseOptional(context, Token.ExtendsKeyword)) {
                superClass = this.parseLeftHandSideExpression(context & ~Context.Optional | Context.Strict, pos);
                flags |= ObjectState.Heritage;
            }
    
            if (this.flags & Flags.OptionsNext && !(context & Context.Method)) this.fieldSet = undefined;
    
            const body = this.parseClassBody(context | Context.Strict, flags);
    
            if (this.flags & Flags.OptionsNext) this.validateClassFields();
    
            return this.finishNode(context, pos, {
                type: context & Context.Expression ? 'ClassExpression' : 'ClassDeclaration',
                id,
                superClass,
                body
            });
        }
    
        private parseClassElementList(context: Context, flags: ObjectState): ESTree.MethodDefinition[] {
            const body: ESTree.MethodDefinition[] = [];
            while (this.token !== Token.RightBrace) {
                if (!this.parseOptional(context, Token.Semicolon)) {
                    const node: any = this.parseClassElement(context, flags);
                    body.push(node);
                    if (node.kind === 'constructor') context |= Context.HasConstructor;
                }
            }
            return body;
        }
    
        private parseClassBody(context: Context, flags: ObjectState): ESTree.ClassBody {
            const pos = this.getLocations();
            this.expect(context | Context.ValidateEscape, Token.LeftBrace);
            let body: ESTree.MethodDefinition[] = [];
            if (this.token !== Token.RightBrace) body = this.parseClassElementList(context, flags);
            this.expect(context, Token.RightBrace);
            return this.finishNode(context, pos, {
                type: 'ClassBody',
                body
            });
        }
    
        private parsePrivateProperty(context: Context, pos: Location | undefined, key: ESTree.Expression) {
            let value: ESTree.Expression | null = null;
            if (this.parseOptional(context, Token.Assign)) value = this.parseAssignmentExpression(context);
            if (this.isEvalOrArguments(this.tokenValue)) {
                this.error(Errors.UnexpectedReservedWord);
            }
            this.parseOptional(context, Token.Comma);
            return this.finishNode(context, pos as Location, {
                type: 'ClassProperty',
                key,
                value,
            });
        }
    
        private parseClassPrivateProperty(context: Context, state: ObjectState) {
            const pos = this.getLocations();
            this.expect(context, Token.Hash);
    
            if (this.token === Token.LeftBracket) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
    
            const tokenValue = this.tokenValue;
    
            if (this.token === Token.ConstructorKeyword) this.error(Errors.InvalidFieldConstructor);
    
            // Note: The grammar only supports `#` IdentifierName
            const key = this.parseIdentifierName(context, this.token);
    
            if (this.token === Token.LeftBracket) this.error(Errors.InvalidComputedClassProperty);
            let value: ESTree.AssignmentExpression | ESTree.ArrowFunctionExpression | ESTree.YieldExpression | null = null;
    
            const fieldValue = tokenValue;
    
            if (this.fieldSet === undefined) this.fieldSet = [];
    
            this.errorLocation = pos;
    
            this.fieldSet.push({
                key: fieldValue,
                mask: FieldState.Scope
            });
    
            if (this.parseOptional(context, Token.Assign)) {
                if (this.isEvalOrArguments(this.tokenValue)) this.error(Errors.UnexpectedReservedWord);
                value = this.parseAssignmentExpression(context | Context.ClassFields);
            }
    
            this.parseOptional(context, Token.Comma);
    
            return this.finishNode(context, pos, {
                type: 'PrivateProperty',
                key,
                value,
                static: (state & ObjectState.Static) !== 0
            });
        }
    
        private parsePrivateName(context: Context) {
            const pos = this.getLocations();
            this.expect(context, Token.Hash);
    
            this.errorLocation = pos;
    
            if (this.fieldSet === undefined) this.fieldSet = [];
    
            this.fieldSet.push({
                key: this.tokenValue,
                mask: FieldState.Method
            });
    
            return this.finishNode(context, pos, {
                type: 'PrivateName',
                id: this.parseIdentifierName(context, this.token),
            });
        }
    
        private parseClassFields(context: Context, key: any, pos: Location): any {
            if (this.token === Token.Assign) {
                key = this.parsePrivateProperty(context | Context.ClassFields, pos, key);
            }
            this.parseOptional(context, Token.Comma);
            return key;
        }
    
        private parseClassElement(context: Context, state: ObjectState): ESTree.MethodDefinition | ESTree.Identifier {
    
            // Stage 3 Proposal - Class-fields
            if (this.flags & Flags.OptionsNext && this.token === Token.Hash) {
                if (!(context & Context.Module)) return this.parseClassPrivateProperty(context | Context.AllowIn, state);
            }
    
            const pos = this.getLocations();
            const token = this.token;
            let currentState = ObjectState.None;
            let count = 0;
            let key;
            let value;
            let fieldpos;
    
            loop: while (token & (Token.IsIdentifier | Token.Keyword)) {
    
                switch (this.token) {
    
                    case Token.StaticKeyword:
                        state |= currentState = ObjectState.Static;
                        key = this.parseIdentifier(context);
                        count++;
                        break;
    
                    case Token.GetKeyword:
                    case Token.SetKeyword:
                        if (state & ObjectState.Accessors) break loop;
                        if (state & ObjectState.Async) break loop;
                        state |= currentState = this.token === Token.GetKeyword ?
                            ObjectState.Get :
                            ObjectState.Set;
                        key = this.parseIdentifier(context);
                        count++;
                        break;
    
                    case Token.AsyncKeyword:
                        if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.Unexpected);
                        if (state & ObjectState.Accessors) break loop;
                        state |= currentState = ObjectState.Async;
                        key = this.parseIdentifier(context);
                        count++;
                        break;
                    default:
                        break loop;
                }
            }
    
            // Generator / Async Iterations ( Stage 3 proposal)
            if (this.token & Token.IsGenerator) {
                if (state & ObjectState.Async && !(this.flags & Flags.OptionsNext)) {
                    this.error(Errors.InvalidAsyncGenerator);
                }
                state |= currentState = ObjectState.Yield;
                this.expect(context, Token.Multiply);
                count++;
            }
    
            if (this.tokenValue === 'prototype') {
                state |= ObjectState.Prototype;
            }
    
            switch (this.token) {
    
                case Token.NumericLiteral:
                    key = this.parseLiteral(context);
                    break;
                case Token.StringLiteral:
    
                    if (this.tokenValue === 'constructor') state |= ObjectState.Constructor;
    
                    fieldpos = this.getLocations();
                    key = this.parseLiteral(context);
    
                    // Stage 3 Proposal - Class-fields
                    if (this.flags & Flags.OptionsNext && this.token !== Token.LeftParen) {
                        if (state & (ObjectState.Prototype | ObjectState.Constructor)) this.error(Errors.Unexpected);
                        return this.parseClassFields(context | Context.AllowIn | Context.ClassFields, key, fieldpos);
                    }
                    break;
    
                case Token.Hash:
                    if (this.flags & Flags.OptionsNext) {
                        key = this.parseClassPrivateProperty(context, state);
    
                        if (this.token !== Token.LeftParen) return key;
                        break;
                    }
                case Token.LeftBracket:
                    state |= ObjectState.Computed;
                    fieldpos = this.getLocations();
                    key = this.parseComputedPropertyName(context | Context.AllowIn, pos);
                    if (this.flags & Flags.OptionsNext && this.token !== Token.LeftParen) {
                        return this.parseClassFields(context | Context.AllowIn | Context.ClassFields, key, fieldpos);
                    }
                    break;
    
                default:
    
                    if (this.isIdentifier(context & ~Context.Strict, this.token)) {
                        if (this.tokenValue === 'constructor') state |= ObjectState.Constructor;
                        fieldpos = this.getLocations();
                        key = this.parseIdentifier(context);
                        if (this.token === Token.LeftBracket) this.throwUnexpectedToken();
                        // Stage 3 Proposal - Class-fields
                        if (this.token !== Token.LeftParen) {
                            if (this.flags & Flags.OptionsNext) {
                                if (state & (ObjectState.Prototype | ObjectState.Constructor)) this.error(Errors.Unexpected);
                                return this.parseClassFields(context | Context.AllowIn | Context.ClassFields, key, fieldpos);
                            }
                            this.error(Errors.UnexpectedToken, tokenDesc(this.token));
                        }
                    } else if (count && currentState !== ObjectState.Yield) {
                        state &= ~currentState;
                        count--;
                    }
            }
    
            if (!key && state & ObjectState.Yield) {
                this.error(Errors.UnexpectedToken, tokenDesc(token));
            }
    
            if (state & ObjectState.Heritage && state & ObjectState.Constructor) context |= Context.Constructor;
    
            if (state & ObjectState.Static) {
                if (state & ObjectState.Prototype) this.error(Errors.StaticPrototype);
                state &= ~ObjectState.Constructor;
            }
    
            if (state & ObjectState.Constructor) {
                if (state & ObjectState.Special) this.error(Errors.ConstructorSpecialMethod);
                if (context & Context.HasConstructor) this.error(Errors.DuplicateConstructor);
            }
    
            if (this.token === Token.LeftParen) {
                value = this.parseMethodDefinition(context & ~(Context.Yield | Context.Await) | Context.Method, state);
            } else {
                this.error(Errors.Unexpected);
            }
    
            return this.finishNode(context, pos, {
                type: 'MethodDefinition',
                key,
                kind: (state & ObjectState.Constructor) ? 'constructor' : (state & ObjectState.Get) ? 'get' :
                    (state & ObjectState.Set) ? 'set' : 'method',
                computed: (state & ObjectState.Computed) !== 0,
                value,
                static: (state & ObjectState.Static) !== 0
            });
        }
    
        // TODO! Remove this when Object Rest / Spread reach Stage 4
        private parseObjectSpreadExpression(context: Context): ESTree.SpreadElement {
            if (!(this.flags & Flags.OptionsNext)) {
                this.throwUnexpectedToken();
            }
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
            const arg = this.parseAssignmentExpression(context);
            if (context & Context.ForStatement && this.token === Token.Comma) {
                this.error(Errors.Unexpected);
            }
            return this.finishNode(context, pos, {
                type: 'SpreadElement',
                argument: arg
            });
        }
    
        private parseObjectExpression(context: Context): ESTree.ObjectExpression {
            const pos = this.getLocations();
    
            this.expect(context, Token.LeftBrace);
            const properties: (ESTree.Property | ESTree.SpreadElement)[] = [];
    
            while (this.token !== Token.RightBrace) {
                properties.push(this.token === Token.Ellipsis ?
                    this.parseObjectSpreadExpression(context) :
                    this.parseObjectElement(context));
                if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
            }
            this.expect(context, Token.RightBrace);
            // Unset the 'HasProtoField' flag now, we are done!
            this.flags &= ~Flags.HasProtoField;
            return this.finishNode(context, pos, {
                type: 'ObjectExpression',
                properties
            });
        }
    
        private parseObjectElement(context: Context): ESTree.Property {
    
            const pos = this.getLocations();
            const t = this.token;
            let state = ObjectState.None;
            let currentState = ObjectState.None;
            let count = 0;
            let key;
            let value;
            const isEscaped = (this.flags & Flags.ExtendedUnicodeEscape) !== 0;
            const tokenValue = this.tokenValue;
    
            if (t & Token.Modifiers) {
                if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
                if (t === Token.GetKeyword) {
                    state |= currentState = ObjectState.Get;
                }
                if (t === Token.SetKeyword) {
                    state |= currentState = ObjectState.Set;
                }
                if (t & Token.IsAsync) {
                    state |= currentState = ObjectState.Async;
                }
                count++;
                key = this.parseIdentifier(context);
            }
    
            // Generator / Async Iterations ( Stage 3 proposal)
            if (this.token & Token.IsGenerator) {
                if (state & ObjectState.Async) {
                    if (!(this.flags & Flags.OptionsNext)) this.error(Errors.InvalidAsyncGenerator);
                }
                state |= currentState = ObjectState.Yield;
                this.expect(context, Token.Multiply);
                count++;
            }
    
            if (state & ObjectState.Async && this.flags & Flags.PrecedingLineBreak) {
                this.error(Errors.LineBreakAfterAsync);
            }
    
            if (this.token === Token.ConstructorKeyword) state |= ObjectState.Constructor;
    
            switch (this.token) {
                case Token.NumericLiteral:
                case Token.StringLiteral:
                    key = this.parseLiteral(context);
                    break;
                case Token.LeftBracket:
                    state |= ObjectState.Computed;
                    key = this.parseComputedPropertyName(context, pos);
                    break;
                default:
                    if (this.token & (Token.IsIdentifier | Token.Keyword)) {
                        key = this.parseIdentifier(context);
                    } else if (count && currentState !== ObjectState.Yield) {
                        state &= ~currentState;
                        count--;
                    }
            }
    
            if (!key && state & ObjectState.Yield) this.error(Errors.UnexpectedToken, tokenDesc(t));
    
            switch (this.token) {
                case Token.LeftParen:
                    if (!(state & ObjectState.Accessors)) state |= ObjectState.Method;
                    value = this.parseMethodDefinition(context & ~(Context.Yield | Context.Await) | Context.Method, state);
                    break;
    
                case Token.Colon:
                    if (state & ObjectState.Special) this.error(Errors.Unexpected);
                    if (!(state & ObjectState.Computed) && this.tokenValue === '__proto__') {
                        if (this.flags & Flags.HasProtoField) this.error(Errors.DuplicateProtoProperty);
                        this.flags |= Flags.HasProtoField;
                    }
                    this.expect(context, Token.Colon);
    
                    if (context & Context.InAsyncArgs && this.token & Token.IsAwait) {
                        this.errorLocation = this.getLocations();
                        this.flags |= Flags.Await;
                    }
    
                    value = this.parseAssignmentExpression(context);
    
                    break;
                default:
    
                    if (state & ObjectState.Special || !this.isIdentifier(context, t)) {
                        this.throwUnexpectedToken();
                    }
    
                    if (context & Context.Yield && t & Token.IsYield) {
                        this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    }
    
                    if (t & Token.IsAwait) {
                        if (context & Context.Await) this.throwUnexpectedToken();
                        this.errorLocation = this.getLocations();
                        this.flags |= Flags.Await;
                    }
    
                    state |= ObjectState.Shorthand;
    
                    if (this.parseOptional(context, Token.Assign)) {
                        if (this.token & Token.IsYield && context & Context.Yield) this.flags |= Flags.Yield;
                        value = this.finishNode(context, pos, {
                            type: 'AssignmentPattern',
                            left: key,
                            right: this.parseAssignmentExpression(context)
                        });
                    } else {
                        value = key;
                    }
            }
    
            return this.finishNode(context, pos, {
                type: 'Property',
                key,
                value,
                kind: !(state & ObjectState.Accessors) ? 'init' : (state & ObjectState.Set) ? 'set' : 'get',
                computed: (state & ObjectState.Computed) !== 0,
                method: (state & ObjectState.Method) !== 0,
                shorthand: (state & ObjectState.Shorthand) !== 0
            });
        }
    
        private parseMethodDefinition(context: Context, state: ObjectState): ESTree.FunctionExpression {
            const pos = this.getLocations();
            if (state & ObjectState.Yield && !(state & ObjectState.Get)) context |= Context.Yield;
            if (state & ObjectState.Async) context |= Context.Await;
            const functionScope = this.functionScope;
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
    
            this.functionScope = undefined;
            this.blockScope = undefined;
            this.parentScope = undefined;
    
            const params = this.parseParameterList(context | Context.InParameter, state);
            const body = this.parseFunctionBody(context);
    
            this.functionScope = functionScope;
            this.blockScope = blockScope;
            this.parentScope = parentScope;
    
            return this.finishNode(context, pos, {
                type: 'FunctionExpression',
                params,
                body,
                async: (context & Context.Await) !== 0,
                generator: (context & Context.Yield) !== 0,
                expression: false,
                id: null
            });
        }
    
        private parseRestElement(context: Context) {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
            const argument = this.parseBindingIdentifierOrPattern(context);
            if (this.token === Token.Assign) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
            if (this.token !== Token.RightParen) {
                this.error(Errors.ParameterAfterRestParameter);
            }
            return this.finishNode(context, pos, {
                type: 'RestElement',
                argument
            });
        }
    
        private parseThrowExpression(context: Context, pos: Location): ESTree.ThrowStatement {
    
            if (!(this.flags & Flags.OptionsNext)) {
                this.error(Errors.UnsupportedFeature, tokenDesc(this.token), 'next');
            }
    
            this.nextToken(context);
            return this.finishNode(context, pos, {
                type: 'ThrowExpression',
                expressions: this.parseUnaryExpression(context)
            });
        }
    
        private parseArrayInitializer(context: Context): ESTree.ArrayExpression {
            const pos = this.getLocations();
            this.expect(context, Token.LeftBracket);
            const elements = [];
    
            while (this.token !== Token.RightBracket) {
                if (this.parseOptional(context, Token.Comma)) {
                    elements.push(null);
                } else if (this.token === Token.Ellipsis) {
    
                    const element = this.parseSpreadExpression(context);
    
                    if (this.token !== Token.RightBracket) {
                        this.errorLocation = this.getLocations();
                        this.flags |= Flags.Rest;
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
    
            return this.finishNode(context, pos, {
                type: 'ArrayExpression',
                elements
            });
        }
    
        // ParenthesizedExpression[Yield, Await]:
        // CoverParenthesizedExpressionAndArrowParameterList[Yield, Await]:
        private parseParenthesizedExpression(context: Context, pos: Location): ESTree.Expression {
    
            this.expect(context, Token.LeftParen);
    
            let state = ParenthesizedState.None;
    
            if (this.parseOptional(context, Token.RightParen)) {
                if (this.token === Token.Arrow) {
                    return this.parseArrowFunctionExpression(context & ~(Context.Await | Context.Yield), pos, []);
                }
                this.error(Errors.MissingArrowAfterParentheses);
            }
    
            let expr: ESTree.Expression;
    
            if (this.token === Token.Ellipsis) {
                expr = this.parseRestElement(context);
                this.expect(context, Token.RightParen);
                return this.parseArrowFunctionExpression(context & ~(Context.Await | Context.Yield), pos, [expr]);
            }
    
            const sequencepos = this.getLocations();
            this.errorLocation = pos;
            let isSequence = false;
    
            if (context & Context.Yield && this.token & Token.IsYield) this.flags |= Flags.Yield;
            if (this.token === Token.LeftParen) state |= ParenthesizedState.Parenthesized;
            if (this.token & Token.BindingPattern) state |= ParenthesizedState.Pattern;
            if (this.token & Token.FutureReserved) state |= ParenthesizedState.FutureReserved;
    
            expr = this.parseAssignmentExpression(context);
    
            if (this.token === Token.Comma) {
    
                const expressions: ESTree.Expression[] = [expr];
    
                while (this.parseOptional(context, Token.Comma)) {
                    if (this.token === Token.RightParen) {
                        const token = this.token;
                        this.expect(context, Token.RightParen);
                        if (this.token === Token.Arrow)
                            return this.parseArrowFunctionExpression(context & ~(Context.Await | Context.Yield), pos, expressions);
                    } else if (this.token === Token.Ellipsis) {
                        expressions.push(this.parseRestElement(context));
                        this.expect(context, Token.RightParen);
                        if (state & ParenthesizedState.Parenthesized) this.error(Errors.InvalidParenthesizedPattern);
                        return this.parseArrowFunctionExpression(context & ~(Context.Await | Context.Yield), pos, expressions);
                    } else {
                        this.errorLocation = this.getLocations();
                        if (this.token === Token.LeftParen) state |= ParenthesizedState.Parenthesized;
                        expressions.push(this.parseAssignmentExpression(context));
                    }
                }
    
                isSequence = true;
    
                expr = this.finishNode(context, sequencepos, {
                    type: 'SequenceExpression',
                    expressions
                });
            }
    
            if (!(this.flags & Flags.AllowCall)) this.flags |= Flags.AllowCall;
    
            this.expect(context, Token.RightParen);
    
            if (this.token === Token.Arrow) {
                if (state & ParenthesizedState.Pattern) {
                    this.flags |= Flags.SimpleParameterList;
                }
    
                if (state & ParenthesizedState.FutureReserved) this.flags |= Flags.Binding;
                if (this.flags & Flags.Yield) this.error(Errors.InvalidArrowYieldParam);
                if (state & ParenthesizedState.Parenthesized) this.error(Errors.InvalidParenthesizedPattern);
                return this.parseArrowFunctionExpression(context, pos, isSequence ? (expr as any).expressions : [expr]);
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
    
            const node = this.finishNode(context, pos, {
                type: 'Literal',
                value: value,
                regex
            });
    
            if (this.flags & Flags.OptionsRaw) node.raw = raw;
    
            return node;
        }
    
        private parseTemplateLiteral(context: Context, pos: Location): ESTree.TemplateLiteral {
            return this.finishNode(context, pos, {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [this.parseTemplateElement(context)]
            });
        }
    
        private parseTemplateHead(context: Context, cooked: string, raw: string): ESTree.TemplateElement {
            const pos = this.getLocations();
            this.token = this.scanTemplateNext(context);
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
            return this.finishNode(context, pos, {
                type: 'TaggedTemplateExpression',
                tag: expr,
                quasi
            });
        }
    
        private parseTemplate(
            context: Context,
            pos: Location,
            expressions: ESTree.Expression[] = [],
            quasis: ESTree.TemplateElement[] = []
        ): ESTree.TemplateLiteral {
    
            const cooked = this.tokenValue;
            const raw = this.tokenRaw;
    
            this.expect(context, Token.TemplateCont);
    
            expressions.push(this.parseExpression(context, pos));
            quasis.push(this.parseTemplateHead(context, cooked, raw));
    
            if (this.token === Token.TemplateTail) {
                quasis.push(this.parseTemplateElement(context));
            } else {
                this.parseTemplate(context, pos, expressions, quasis);
            }
    
            return this.finishNode(context, pos, {
                type: 'TemplateLiteral',
                expressions,
                quasis
            });
        }
    
        private parseBigIntLiteral(context: Context, pos: Location): ESTree.BigIntLiteral {
            const value = this.tokenValue;
            const raw = this.tokenRaw;
    
            const node = this.finishNode(context, pos, {
                type: 'BigIntLiteral',
                value,
                bigint: raw
            }, true);
    
            if (this.flags & Flags.OptionsRaw) node.raw = raw;
    
            return node;
        }
    
        private parseLiteral(context: Context): ESTree.Literal {
            const pos = this.getLocations();
            const value = this.tokenValue;
            const raw = this.tokenRaw;
    
            if (context & Context.Strict && this.flags & Flags.Octal) {
                this.error(Errors.StrictOctalLiteral);
            }
    
            const node = this.finishNode(context, pos, {
                type: 'Literal',
                value
            }, true);
    
            if (this.flags & Flags.OptionsRaw) node.raw = raw;
    
            return node;
        }
    
        private parseNullOrTrueOrFalseExpression(context: Context, pos: Location): ESTree.Literal {
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
            const t = this.token;
            const raw = tokenDesc(t);
            const node = this.finishNode(context, pos, {
                type: 'Literal',
                value: t === Token.NullKeyword ? null : raw === 'true'
            }, true);
    
            if (this.flags & Flags.OptionsRaw) node.raw = raw;
    
            return node;
        }
    
        private parseThisExpression(context: Context): ESTree.ThisExpression {
            const pos = this.getLocations();
            return this.finishNode(context, pos, {
                type: 'ThisExpression'
            }, true);
        }
    
        private parseIdentifier(context: Context): ESTree.Identifier {
            const name = this.tokenValue;
            const pos = this.getLocations();
            return this.finishNode(context | Context.TaggedTemplate, pos, {
                type: 'Identifier',
                name
            }, true);
        }
    
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
                (this.blockScope[name] & ScopeMasks.NonShadowable) !== 0) {
                this.error(Errors.DuplicateIdentifier, name);
            }
            this.functionScope[name] = ScopeMasks.Shadowable;
        }
    
        private checkIfExistInFunctionScope(name: string) {
            if (!this.initBlockScope() && (
                    this.blockScope !== this.functionScope && this.blockScope[name] ||
                    (this.blockScope[name] & ScopeMasks.NonShadowable) !== 0
                )) {
                this.error(Errors.DuplicateIdentifier, name);
            }
        }
    
        private checkIfExistInBlockScope(name: string) {
            if (!this.initBlockScope() && (
                    (this.blockScope[name] & ScopeMasks.Shadowable) !== 0 ||
                    Object.prototype.hasOwnProperty.call(this.blockScope, name)
                )) {
    
                this.error(Errors.DuplicateIdentifier, name);
            }
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
                // Check variables in current block only
                Object.prototype.hasOwnProperty.call(this.blockScope, name) ||
                // Check `var` variables in the current or parent scopes
                (this.blockScope[name] & ScopeMasks.Shadowable) !== 0
            )) {
                this.error(Errors.DuplicateIdentifier, name)
            }
    
            this.blockScope[name] = ScopeMasks.NonShadowable
        }
    
        private parseAssignmentPattern(
            context: Context,
            pos: Location = this.getLocations(),
            pattern: any = this.parseBindingIdentifierOrPattern(context)
        ): ESTree.AssignmentPattern {
    
            if (!this.parseOptional(context, Token.Assign)) return pattern;
    
            return this.finishNode(context, pos, {
                type: 'AssignmentPattern',
                left: pattern,
                right: this.parseAssignmentExpression(context)
            });
        }
    
        private parseBindingIdentifierOrPattern(context: Context): ESTree.Identifier | ESTree.ObjectPattern {
    
            switch (this.token) {
    
                case Token.LeftBracket:
                    return this.parseArrayElementsBindingPattern(context);
    
                case Token.LeftBrace:
                    return this.ObjectAssignmentPattern(context);
    
                case Token.YieldKeyword:
    
                    if (context & (Context.Yield | Context.Strict)) {
                        this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    }
    
                    return this.parseBindingIdentifier(context);
    
                case Token.AwaitKeyword:
                    if (context & (Context.Module | Context.Await)) this.throwUnexpectedToken();
    
                default:
    
                    return this.parseBindingIdentifier(context);
            }
        }
    
        private parseBindingIdentifier(context: Context): ESTree.Identifier {
    
            const t = this.token;
    
            if (!this.isIdentifier(context, t)) {
                this.throwUnexpectedToken();
            } else if (context & Context.Lexical && t === Token.LetKeyword) {
                this.error(Errors.LetInLexicalBinding);
            }
    
            const pos = this.getLocations();
    
            const name = this.tokenValue;
    
            if (!(context & Context.ExistingScope) && this.isEvalOrArguments(name)) {
                if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
            }
    
            if (context & Context.InParameter && context & Context.MarkAsParamDuplicate) {
                this.addFunctionArg(name);
            } else this.addVarOrBlock(context, name);
    
            this.nextToken(context);
    
            return this.finishNode(context, pos, {
                type: 'Identifier',
                name
            });
        }
    
        private parseAssignmentRestElement(context: Context): ESTree.RestElement {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
            const argument = this.parseBindingIdentifierOrPattern(context);
            if (this.token === Token.Assign) this.throwUnexpectedToken();
            return this.finishNode(context, pos, {
                type: 'RestElement',
                argument
            });
        }
    
        private parseArrayElementsBindingPattern(context: Context) {
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
    
            return this.finishNode(context, pos, {
                type: 'ArrayPattern',
                elements
            });
        }
    
        private parseComputedPropertyName(context: Context, pos: Location): ESTree.Expression {
            this.expect(context, Token.LeftBracket);
    
            if (this.token & Token.IsYield) {
                this.errorLocation = pos;
                this.flags |= Flags.Yield;
            }
            const expression = this.parseAssignmentExpression(context | Context.AllowIn);
            this.expect(context, Token.RightBracket);
            return expression;
        }
    
        private ObjectAssignmentPattern(context: Context): ESTree.ObjectPattern {
            const pos = this.getLocations();
            const properties: (ESTree.AssignmentProperty | ESTree.RestElement)[] = [];
            this.expect(context, Token.LeftBrace);
    
            while (this.token !== Token.RightBrace) {
                properties.push(this.token === Token.Ellipsis ?
                    this.parseRestProperty(context) :
                    this.parseAssignmentProperty(context));
                if (this.token !== Token.RightBrace) this.parseOptional(context, Token.Comma);
            }
    
            this.expect(context, Token.RightBrace);
    
            return this.finishNode(context, pos, {
                type: 'ObjectPattern',
                properties
            });
        }
    
        private parseRestProperty(context: Context): ESTree.RestElement {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
    
            if (!(this.token & Token.IsIdentifier)) this.throwUnexpectedToken();
            const arg = this.parseBindingIdentifierOrPattern(context);
            if (this.token === Token.Assign) this.throwUnexpectedToken();
    
            return this.finishNode(context, pos, {
                type: 'RestElement',
                argument: arg
            });
        }
    
        private parseAssignmentProperty(context: Context): ESTree.AssignmentProperty {
    
            const pos = this.getLocations();
            let state = ObjectState.None;
            let key;
            let value;
    
            if (this.isIdentifier(context, this.token)) {
    
                const token = this.token;
    
                key = this.parseIdentifier(context);
    
                if (this.parseOptional(context, Token.Colon)) {
                    value = this.parseAssignmentPattern(context);
                } else {
    
                    state |= ObjectState.Shorthand;
    
                    if (context & Context.Yield && token & Token.IsYield) {
                        this.error(Errors.DisallowedInContext, tokenDesc(token));
                    }
    
                    if (this.token === Token.Assign) {
                        value = this.parseAssignmentPattern(context, pos, key);
                    } else {
                        value = key;
                    }
                }
    
            } else {
    
                switch (this.token) {
                    case Token.LeftBracket:
                        state |= ObjectState.Computed;
                        this.expect(context, Token.LeftBracket);
                        key = this.parseAssignmentExpression(context | Context.AllowIn);
                        this.expect(context, Token.RightBracket);
                        break;
    
                    default:
                        key = this.parseIdentifier(context);
                }
    
                this.expect(context, Token.Colon);
    
                value = this.parseAssignmentPattern(context);
            }
    
            return this.finishNode(context, pos, {
                type: 'Property',
                kind: 'init',
                key,
                computed: (state & ObjectState.Computed) !== 0,
                value,
                method: false,
                shorthand: (state & ObjectState.Shorthand) !== 0
            });
        }
    
        /** JSX */
    
        private parseJSXChildren(context: Context) {
            const children: any = [];
    
            while (this.token !== Token.JSXClose) {
                children.push(this.parseJSXChild(context | Context.Expression, this.getLocations()));
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
                    return this.parseJSXExpressionContainer(context);
                case Token.LessThan:
                    return this.parseJSXElement(context & ~Context.Expression);
                default: // ignore
            }
        }
    
        private parseJSXSpreadChild(context: Context): ESTree.JSXSpreadChild {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
            const expression = this.parseExpression(context, pos);
            this.expect(context, Token.RightBrace);
            return this.finishNode(context, pos, {
                type: 'JSXSpreadChild',
                expression
            });
        }
    
        private parseJSXText(context: Context): ESTree.JSXText {
    
            const pos = this.getLocations();
            const value = this.source.slice(this.startIndex, this.index);
    
            this.nextJSXToken();
    
            const node = this.finishNode(context, pos, {
                type: 'JSXText',
                value
            });
    
            if (this.flags & Flags.OptionsRaw) node.raw = value;
    
            return node;
        }
    
        private parseJSXEmptyExpression(context: Context, pos: Location): ESTree.JSXEmptyExpression {
            return this.finishNode(context, pos, {
                type: 'JSXEmptyExpression'
            });
        }
    
        private parseJSXExpressionContainer(
            context: Context
        ): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {
            const pos = this.getLocations()
            this.expect(context, Token.LeftBrace);
    
            if (this.token === Token.Ellipsis) {
                return this.parseJSXSpreadChild(context);
            }
    
            const expression = this.token === Token.RightBrace ?
                this.parseJSXEmptyExpression(context, pos) :
                this.parseAssignmentExpression(context);
    
            this.nextJSXToken();
    
            return this.finishNode(context, pos, {
                type: 'JSXExpressionContainer',
                expression
            });
        }
    
        private parseJSXClosingElement(context: Context, isFragment: boolean) {
            const pos = this.getLocations();
            this.expect(context, Token.JSXClose);
    
            if (isFragment) {
                this.expect(context, Token.GreaterThan);
                return this.finishNode(context, pos, {
                    type: 'JSXClosingFragment'
                });
            }
    
            const name = this.parseJSXElementName(context);
    
            if (context & Context.Expression) {
                this.expect(context, Token.GreaterThan);
            } else {
                this.nextJSXToken();
            }
    
            return this.finishNode(context, pos, {
                type: 'JSXClosingElement',
                name
            });
        }
    
        private scanJSXString(quote: number): Token {
    
            let ret: string | null = '';
            this.advance();
            let ch = this.nextChar();
    
            while (ch !== quote) {
                ret += fromCodePoint(ch);
                ch = this.scanNext();
            }
    
            this.advance(); // Consume the quote
            if (this.flags & Flags.OptionsRaw) this.storeRaw(this.startIndex);
            this.tokenValue = ret;
            return Token.StringLiteral;
        }
        private scanJSXAttributeValue(context: Context): Token | undefined {
    
            this.startIndex = this.index;
            this.startColumn = this.column;
            this.startLine = this.line;
            const ch = this.nextChar();
            switch (ch) {
                case Chars.DoubleQuote:
                case Chars.SingleQuote:
                    return this.scanJSXString(ch);
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
    
            return this.finishNode(context, pos, {
                type: 'JSXSpreadAttribute',
                argument: expression
            });
        }
    
        private parseJSXAttributeName(context: Context): ESTree.JSXIdentifier | ESTree.JSXNamespacedName {
            const pos = this.getLocations();
            const identifier: ESTree.JSXIdentifier = this.parseJSXIdentifier(context);
            if (this.token === Token.Colon) return this.parseJSXNamespacedName(context, identifier, pos);
            return identifier;
        }
    
        private parseJSXAttribute(context: Context): ESTree.JSXAttribute {
    
            const pos = this.getLocations();
            let value = null;
            const attrName = this.parseJSXAttributeName(context);
    
            if (this.token === Token.Assign) {
                switch (this.scanJSXAttributeValue(context)) {
                    case Token.StringLiteral:
                        value = this.parseLiteral(context);
                        break;
                    default:
                        value = this.parseJSXExpressionAttribute(context);
                }
            }
    
            return this.finishNode(context, pos, {
                type: 'JSXAttribute',
                value,
                name: attrName
            });
        }
    
        private parseJSXExpressionAttribute(context: Context): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.LeftBrace);
    
            const expression = this.parseAssignmentExpression(context);
    
            this.expect(context, Token.RightBrace);
    
            return this.finishNode(context, pos, {
                type: 'JSXExpressionContainer',
                expression
            });
        }
    
        private parseJSXAttributes(context: Context): ESTree.JSXAttribute[] {
            const attributes: ESTree.JSXAttribute[] = [];
            while (!(this.token === Token.GreaterThan || this.token === Token.Divide)) {
                if (this.token === Token.LeftBrace) {
                    attributes.push(this.parseJSXSpreadAttribute(context &= ~Context.Expression));
                } else {
                    attributes.push(this.parseJSXAttribute(context));
                }
            }
    
            return attributes;
        }
    
        private nextJSXToken() {
    
            this.lastIndex = this.startIndex = this.index;
    
            const next = this.nextChar();
    
            if (next === Chars.LessThan) {
                this.advance();
                if (this.consume(Chars.Slash)) {
                    this.token = Token.JSXClose;
                } else {
                    this.token = Token.LessThan;
                }
            } else if (next === Chars.LeftBrace) {
                this.advance();
                this.token = Token.LeftBrace;
            } else {
    
                while (!(this.nextChar() === Chars.LeftBrace || this.nextChar() === Chars.LessThan)) {
                    this.advance();
                }
    
                this.token = Token.JSXText;
            }
        }
    
        private parseJSXIdentifier(context: Context): ESTree.JSXIdentifier {
            const name = this.tokenValue;
            const pos = this.getLocations();
            this.nextToken(context);
            return this.finishNode(context, pos, {
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
            return this.finishNode(context, pos, {
                type: 'JSXNamespacedName',
                namespace,
                name
            });
        }
    
        private parseJSXMemberExpression(context: Context, expr: any, pos: Location): ESTree.JSXMemberExpression {
            return this.finishNode(context, pos, {
                type: 'JSXMemberExpression',
                object: expr,
                property: this.parseJSXIdentifier(context)
            });
        }
    
        private parseJSXElementName(context: Context): ESTree.Node {
            const pos = this.getLocations();
    
            this.scanJSXIdentifier(context);
    
            let expression: ESTree.JSXIdentifier | ESTree.JSXMemberExpression = this.parseJSXIdentifier(context | Context.Expression);
    
            // Namespace
            if (this.token === Token.Colon) return this.parseJSXNamespacedName(context, expression, pos);
    
            // Member expression
            while (this.parseOptional(context, Token.Period)) {
                expression = this.parseJSXMemberExpression(context, expression, pos);
            }
    
            return expression;
        }
    
    
        private parseJSXElement(context: Context) {
            const pos = this.getLocations();
            let openingElement = null;
            let selfClosing = false;
            let isFragment = false;
    
            this.expect(context, Token.LessThan);
    
            if (this.token === Token.GreaterThan) {
                isFragment = true;
                this.nextJSXToken();
                openingElement = this.finishNode(context, pos, {
                    type: 'JSXOpeningFragment'
                });
            } else {
    
                const tagName = this.parseJSXElementName(context);
    
                const attributes = this.parseJSXAttributes(context);
    
                if (this.token === Token.GreaterThan) {
                    this.nextJSXToken();
                } else {
                    this.expect(context, Token.Divide);
                    this.expect(context, Token.GreaterThan);
                    selfClosing = true;
                }
    
                openingElement = this.finishNode(context, pos, {
                    type: 'JSXOpeningElement',
                    name: tagName,
                    attributes,
                    selfClosing
                });
            }
    
            let children: ESTree.JSXElement[] = [];
            let closingElement = null;
    
            if (isFragment || !selfClosing) {
    
                children = this.parseJSXChildren(context);
                closingElement = this.parseJSXClosingElement(context, isFragment);
    
                if (isFragment) {
    
                    return this.finishNode(context, pos, {
                        type: 'JSXFragment',
                        children,
                        openingElement,
                        closingElement,
                    });
                } else {
    
                    const open = isQualifiedJSXName(openingElement.name);
                    const close = isQualifiedJSXName(closingElement.name);
                    if (open !== close) this.error(Errors.ExpectedJSXClosingTag, close);
                }
            }
    
            return this.finishNode(context, pos, {
                type: 'JSXElement',
                children,
                openingElement,
                closingElement,
            });
        }
    }
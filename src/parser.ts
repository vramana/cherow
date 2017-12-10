import { Chars } from './chars';
import * as ESTree from './estree';
import { toHex, fromCodePoint, hasMask, isPrologueDirective } from './common';
import { isValidDestructuringAssignmentTarget, isQualifiedJSXName, isValidSimpleAssignmentTarget } from './validate';
import { Flags, Context, RegExpState, RegexFlags, ScopeMasks, ObjectState, ScanState, ParenthesizedState, NumericState, ArrayState, Escape, FieldState } from './masks';
import { Token, tokenDesc, descKeyword } from './token';
import { ErrorMessages, createError, Errors } from './errors';
import { isValidIdentifierStart, isvalidIdentifierContinue, isIdentifierStart, isIdentifierPart } from './unicode';
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
        private firstProto: void | boolean;
        private plugins: any;
        private tokenRegExp: void | {
            pattern: string;
            flags: string;
        };
    
        constructor(
            source: string,
            options: Options | void
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
            this.fieldSet = undefined;
            this.errorLocation = undefined;
            this.tokenRegExp = undefined;
            this.functionScope = undefined;
            this.blockScope = undefined;
            this.parentScope = undefined;
            this.comments = undefined;
            this.lastChar = undefined;
            this.firstProto = undefined;
            this.plugins = [];
    
            if (options != null) {
                if (options.next) this.flags |= Flags.OptionsNext;
                if (options.jsx) this.flags |= Flags.OptionsJSX;
                if (options.loc) this.flags |= Flags.OptionsLoc;
                if (options.ranges) this.flags |= Flags.OptionsRanges;
                if (options.raw) this.flags |= Flags.OptionsRaw;
                if (options.globalReturn) this.flags |= Flags.OptionsGlobalReturn;
                if (options.directives) this.flags |= Flags.OptionsDirectives;
                if (options.impliedStrict) this.flags |= Flags.OptionsImpliedStrict;
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
            if (this.flags & Flags.OptionsImpliedStrict) this.source = '"use strict";' + this.source;
            this.nextToken(context);
            const body = this.parseStatementList(context, Token.EndOfSource);
            return this.finishRootNode({
                type: 'Program',
                body,
                sourceType: 'script'
            });
        }
    
        // https://tc39.github.io/ecma262/#sec-modules
        public parseModule(context: Context): ESTree.Program {
            this.nextToken(context);
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
            return this.nextUnicodeChar();
        }
    
        private nextUnicodeChar(): Chars {
            let index = this.index;
            let hi = this.source.charCodeAt(index);
            if (hi < Chars.LeadSurrogateMin || hi > Chars.LeadSurrogateMax) return hi;
            const lo = this.source.charCodeAt(index + 1);
            if (lo < Chars.TrailSurrogateMin || lo > Chars.TrailSurrogateMax) return hi;
            const a = hi & 0x3FF;
            return Chars.NonBMPMin + (a << 10) | lo & 0x3FF;
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
    
        private consumeLineFeed(lastIsCR: boolean) {
            this.index++;
            if (lastIsCR) {
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
    
            while (this.hasNext()) {
    
                this.startIndex = this.index;
                this.startColumn = this.column;
                this.startLine = this.line;
    
                let first = this.nextChar();
    
                if (first >= 128) {
                    // Skip initial BOM.
                    if (this.nextChar() === Chars.ByteOrderMark) this.index++;
                    // Chars not in the range 0..127 are rare.  Getting them out of the way
                    // early allows subsequent checking to be faster.
                    first = this.nextUnicodeChar()
                }
    
                switch (first) {
    
                    case Chars.CarriageReturn:
                        state |= ScanState.LastIsCR | ScanState.LineStart;
                        this.flags |= Flags.PrecedingLineBreak;
                        this.advanceNewline();
                        continue;
    
                    case Chars.LineFeed:
                        this.consumeLineFeed((state & ScanState.LastIsCR) === 0);
                        this.flags |= Flags.PrecedingLineBreak;
                        state = state & ~ScanState.LastIsCR | ScanState.LineStart;
                        continue;
    
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        state = state & ~ScanState.LastIsCR | ScanState.LineStart;
                        this.flags |= Flags.PrecedingLineBreak;
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
    
                            let next = this.nextChar();
    
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
    
                                case Chars.Slash:
                                    {
                                      if (this.flags & Flags.OptionsJSX) {
                                       this.advance();
                                        return Token.JSXClose;
                                    }

                                    }
    
                                case Chars.Exclamation:
                                    {
                                        if (!(context & Context.Module)) {
                                            this.advance();
                                            if (this.consume(Chars.Hyphen) &&
                                                this.consume(Chars.Hyphen)) {
                                                this.skipComments(state | ScanState.SingleLine);
                                            }
                                            continue;
                                        }
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
                        if (isValidIdentifierStart(first)) return this.scanIdentifier(context, state | ScanState.Unicode);
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
                            this.flags |= Flags.PrecedingLineBreak;
                            this.advanceNewline();
                            state |= ScanState.LineStart | ScanState.LastIsCR;
                            break;
    
                        case Chars.LineFeed:
                            if (!(state & ScanState.MultiLine)) break loop;
                            this.flags |= Flags.PrecedingLineBreak;
                            this.consumeLineFeed((state & ScanState.LastIsCR) === 0);
                            state = state & ~ScanState.LastIsCR | ScanState.LineStart;
                            break;
    
                        case Chars.LineSeparator:
                        case Chars.ParagraphSeparator:
                            // Single line comments can not contain LINE SEPARATOR (U+2028)
                            if (!(state & ScanState.MultiLine)) break loop;
                            state = state & ~ScanState.LastIsCR | ScanState.LineStart;
                            this.flags |= Flags.PrecedingLineBreak;
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
                let start;
                let end;
                let type = state & ScanState.MultiLine ? 'Block' : 'Line';
                let value = this.source.slice(startPos, state & ScanState.MultiLine ? this.index - 2 : this.index);
    
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
                    start = this.startIndex;
                    end = this.index;
                }
    
                if (typeof this.comments === 'function') {
                    this.comments(type, value, start as number, end as number, loc);
                }
    
                if (Array.isArray(this.comments)) {
    
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
    
            loop:
                while (this.hasNext()) {
                    let code = this.nextChar();
                    switch (code) {
                        case Chars.Backslash:
                            this.flags |= Flags.ExtendedUnicodeEscape;
                            ret += this.source.slice(start, this.index);
                            ret += fromCodePoint(this.peekUnicodeEscape());
                            start = this.index;
                            break;
                        default:
                            if (code >= Chars.LeadSurrogateMin && code <= Chars.TrailSurrogateMax) {
                                code = this.nextUnicodeChar();
                            } else if (!isIdentifierPart(code)) {
                                break loop;
                            }
                            this.advance();
                    }
                }
    
            if (start < this.index) ret += this.source.slice(start, this.index);
    
            const len = ret.length;
            this.tokenValue = ret;
    
            if (state & ScanState.Unicode) return Token.Identifier;
    
            // Keywords are between 2 and 11 characters long and start with a lowercase letter
            if (len >= 2 && len <= 11) {
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
    
        private scanDecimalDigits() {
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
    
        private scanNumber(context: Context, ch: number): Token {
    
            let state = NumericState.Decimal;
    
            const start = this.index;
            let value = 0;
    
            if (ch === Chars.Zero) {
    
                this.advance();
    
                ch = this.nextChar();
    
                switch (ch) {
    
                    case Chars.LowerX:
                    case Chars.UpperX:
                        {
                            state = NumericState.Hex;
    
                            ch = this.scanNext(Errors.Unexpected);
    
                            value = toHex(ch);
    
                            if (value < 0) this.error(Errors.Unexpected);
    
                            this.advance();
    
                            while (this.hasNext()) {
                                ch = this.nextChar();
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
                            state = NumericState.Octal;
    
                            ch = this.scanNext(Errors.Unexpected);
    
                            value = ch - Chars.Zero;
    
                            // we must have at least one octal digit after 'o'/'O'
                            if (ch < Chars.Zero || ch >= Chars.Eight) this.error(Errors.Unexpected);
    
                            this.advance();
    
                            while (this.hasNext()) {
                                ch = this.nextChar();
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
                            state = NumericState.Binary;
    
                            ch = this.scanNext(Errors.Unexpected);
    
                            // Invalid:  '0b'
                            if (ch !== Chars.Zero && ch !== Chars.One) {
                                this.error(Errors.Unexpected);
                            }
    
                            value = ch - Chars.Zero;
    
                            this.advance();
    
                            while (this.hasNext()) {
                                ch = this.nextChar();
                                if (ch < Chars.Zero || Chars.Nine < ch) break;
                                if (!(ch === Chars.Zero || ch === Chars.One)) {
                                    this.error(Errors.Unexpected);
                                }
                                value = (value << 1) | (ch - Chars.Zero);
                                this.advance();
                            }
    
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
                            state = NumericState.ImplicitOctal;
                            while (this.hasNext()) {
                                ch = this.nextChar();
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
            }
    
            // Fast path for plain decimal numbers
            if (state & NumericState.Decimal) {
    
                while (ch >= Chars.Zero && ch <= Chars.Nine) {
                    value = 10 * value + (ch - Chars.Zero);
                    this.advance();
                    ch = this.nextChar();
                }
    
                if (ch !== Chars.Period && !isIdentifierStart(ch)) {
    
                    if (this.flags & Flags.OptionsRaw) this.storeRaw(start);
    
                    this.tokenValue = value;
    
                    return Token.NumericLiteral;
                }
                // falls through
            }
    
            this.scanDecimalDigits();
    
            ch = this.nextChar();
    
            if (ch === Chars.Period) {
                // Invalid: '06.7'
                if (state & NumericState.ImplicitOctal) this.error(Errors.Unexpected);
                state |= NumericState.Float;
                this.advance();
                this.scanDecimalDigits();
            }
    
            // BigInt - Stage 3 proposal
            if (this.nextChar() === Chars.LowerN &&
                state & (NumericState.Decimal | NumericState.Boh | NumericState.DecimalWithLeadingZero)) {
    
                // E.g. Invalid MV number - '2017.8n;'
                if (state & (NumericState.DecimalWithLeadingZero | NumericState.Float)) {
                    this.error(Errors.Unexpected);
                }
    
                // Check that the literal is within our limits for BigInt length.
                // For simplicity, use 4 bits per character to calculate the maximum
                // allowed literal length.
                const maxBigIntCharacters = 1024 * 1024 / 4;
                const length = start - this.index - state & NumericState.Decimal ? 0 : 2;
    
                if (length > maxBigIntCharacters) this.error(Errors.Unexpected);
                state |= NumericState.BigInt;
                this.advance();
    
            } else if (!(state & NumericState.Boh)) {
    
                state |= NumericState.Float;
    
                switch (this.nextChar()) {
                    case Chars.LowerE:
                    case Chars.UpperE:
    
                        // scan exponent
                        this.advance();
                        switch (this.nextChar()) {
                            case Chars.Hyphen:
                            case Chars.Plus:
    
                                this.advance();
    
                                if (!this.hasNext()) this.error(Errors.Unexpected);
    
                            default: // ignore
                        }
    
                        ch = this.nextChar();
    
                        // check for unexpected mantissa
                        if (!(ch >= Chars.Zero && ch <= Chars.Nine)) this.error(Errors.Unexpected);
                        this.scanDecimalDigits();
    
                    default: // ignore
                }
            }
    
            // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
            // The SourceCharacter immediately following a NumericLiteral must not be an IdentifierStart or DecimalDigit.
            // For example : 3in is an error and not the two input elements 3 and in
            if (isIdentifierStart(this.nextChar())) this.error(Errors.Unexpected);
    
            if (state & (NumericState.Boh | NumericState.ImplicitOctal)) {
                if (this.flags & Flags.OptionsRaw) this.storeRaw(start);
                if (state & (NumericState.ImplicitOctal | NumericState.DecimalWithLeadingZero)) this.flags |= Flags.Octal;
                this.tokenValue = value;
            } else {
    
                const rawValue = this.source.slice(start, this.index);
    
                if (state & (NumericState.ImplicitOctal | NumericState.DecimalWithLeadingZero)) this.flags |= Flags.Octal;
    
                if (this.flags & Flags.OptionsRaw) this.tokenRaw = rawValue;
    
                // avoid unnecessarily dispatching to parseFloat.
                this.tokenValue = state & NumericState.Float ? parseFloat(rawValue) : parseInt(rawValue);
            }
    
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
            const astralSubstitute = '\uFFFF';
            let tmp = pattern;
            const self = this;
    
            if (mask & RegexFlags.Unicode) {
                tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, ($0, $1, $2) => {
                    const codePoint = parseInt($1 || $2, 16);
                    if (codePoint > Chars.LastUnicodeChar) this.error(Errors.UnicodeOutOfRange);
                    if (codePoint <= 0xFFFF) return String.fromCharCode(codePoint);
                    return astralSubstitute;
                }).replace(
                    /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                    astralSubstitute
                );
            }
    
            // First, detect invalid regular expressions.
            try {
                RegExp(tmp);
            } catch (e) {
                this.error(Errors.UnexpectedTokenRegExp);
            }
    
            // Return a regular expression object for this pattern-flag pair, or
            // `null` in case the current environment doesn't support the flags it
            // uses.
            try {
                return new RegExp(pattern, flags);
            } catch (exception) {
                /* istanbul ignore next */
                return null;
            }
        }
    
        private scanString(context: Context, quote: number): Token {
            const start = this.index;
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
                                this.handleStringError(code as Escape);
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
            if (this.flags & (Flags.OptionsRaw | Flags.OptionsDirectives)) this.storeRaw(start);
            this.tokenValue = ret;
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
                    // Ignore
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
                        if (isTemplate && !(context & Context.TaggedTemplate)) {
                            return Escape.TemplateOctalLiteral;
                        }
    
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
    
            let ch = this.scanNext(Errors.UnterminatedTemplate);
    
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
    
                            ch = this.scanNext(Errors.UnterminatedTemplate);
    
                            if (ch >= 128) {
                                ret += fromCodePoint(ch);
                            } else {
                                this.lastChar = ch;
                                const code = this.scanEscape(context, ch, true);
    
                                if (code >= 0) {
                                    ret += fromCodePoint(code as Chars);
                                } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                                    ret = null;
                                    ch = this.scanLooserTemplateSegment();
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
    
        private scanLooserTemplateSegment(): Chars {
    
            let ch: void | Chars = this.lastChar;
    
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
                        ch = this.scanNext();
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
    
                ch = this.scanNext();
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
    
            const statements: ESTree.Statement[] = [];
    
            if (this.flags & Flags.OptionsDirectives) {
                while (this.token === Token.StringLiteral) {
                    statements.push(this.parseDirective(context));
                }
            }
    
            while (this.token !== Token.EndOfSource) {
                statements.push(this.parseModuleItem(context | Context.AllowIn));
            }
    
            return statements;
        }
    
        private parseDirective(context: Context): ESTree.ExpressionStatement {
            const pos = this.getLocations();
            const expr = this.parseExpression(context | Context.AllowIn, pos);
            const directive = this.tokenRaw.slice(1, -1);
            this.consumeSemicolon(context);
            const node = this.finishNode(context, pos, {
                type: 'ExpressionStatement',
                expression: expr,
                directive
            });
    
            return node;
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
            startLoc: any,
            node: any,
            shouldAdvance = false,
            root = false
        ): any {
    
            if (shouldAdvance) {
                this.nextToken(context);
            }
    
            if (this.flags & Flags.OptionsRanges) {
                node.start = startLoc.start;
                node.end = this.lastIndex;
            }
    
            if (this.flags & Flags.OptionsLoc) {
    
                node.loc = {
                    start: {
                        line: startLoc.line,
                        column: startLoc.column,
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
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
            const next = this.token;
            this.rewindState(savedState);
    
            if (hasMask(next, Token.BindingPattern)) return true;
    
            switch (next) {
                case Token.Identifier:
                case Token.YieldKeyword:
                    return true;
                default:
                    return hasMask(next, Token.Contextual);
            }
        }
    
        private isIdentifier(context: Context, t: Token): boolean {
            if (context & Context.Strict) {
                if (context & Context.Module && t === Token.AwaitKeyword) return false;
                if (t & Token.EvalOrArguments) return true;
                if (t === Token.YieldKeyword) return false;
                //if (t === Token.AwaitKeyword && context & Context.Await) return false;
    
                return t === Token.Identifier ||
                    (t & Token.Contextual) === Token.Contextual;
            }
    
            if (t & Token.EvalOrArguments) return true;
            // if (t === Token.YieldKeyword && context & Context.Yield) return false;
            //if (t === Token.AwaitKeyword && context & Context.Await) return false;
            return t === Token.Identifier ||
                (t & Token.Contextual) === Token.Contextual ||
                (t & Token.FutureReserved) === Token.FutureReserved;
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
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
    
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
    
            return this.finishNode(context, pos, {
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
    
                    const functionScope = this.functionScope;
                    const blockScope = this.blockScope;
                    const parentScope = this.parentScope;
    
                    this.functionScope = undefined;
                    this.parentScope = undefined;
                    this.blockScope = undefined;
    
                    this.expect(context, Token.LeftBrace);
    
                    while (this.token !== Token.RightBrace) {
    
                        if (hasMask(this.token, Token.Reserved)) isExportedReservedWord = true;
                        specifiers.push(this.parseExportSpecifier(context));
                        // Invalid: 'export {a,,b}'
                        if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
                    }
    
                    this.expect(context, Token.RightBrace);
    
                    this.functionScope = functionScope;
                    this.blockScope = blockScope;
                    this.parentScope = parentScope;
    
                    if (this.token === Token.FromKeyword) {
                        // Note:  The `from` contextual keyword must not contain Unicode escape sequences.
                        if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
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
    
            return this.finishNode(context, pos, {
                type: 'ExportNamedDeclaration',
                source,
                specifiers,
                declaration
            });
        }
    
        private parseExportSpecifier(context: Context): ESTree.ExportSpecifier {
    
            const pos = this.getLocations();
    
            if (this.token === Token.Identifier) this.addBlockName(this.tokenValue);
    
            const local = this.parseIdentifierName(context, this.token);
    
            let exported = local;
            const token = this.token;
    
            if (this.token === Token.AsKeyword) {
                // Note:  The `as` contextual keyword must not contain Unicode escape sequences.
                if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
                this.expect(context, Token.AsKeyword);
                this.checkIfExistInBlockScope(this.tokenValue, true);
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
            this.expect(context, Token.FromKeyword);
            const source = this.parseModuleSpecifier(context);
            this.consumeSemicolon(context);
            return this.finishNode(context, pos, {
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
            const tokenValue = this.tokenValue;
    
            let imported;
            let local;
    
            if (this.isIdentifier(context, this.token)) {
                imported = this.parseIdentifier(context);
                local = imported;
                if (this.token === Token.AsKeyword) {
                    if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
                    this.expect(context, Token.AsKeyword);
                    this.checkIfExistInBlockScope(this.tokenValue, true);
                    local = this.parseIdentifierOrPattern(context);
                } else {
                    if (this.isEvalOrArguments(tokenValue)) this.error(Errors.UnexpectedStrictReserved);
                    this.checkIfExistInBlockScope(tokenValue, true);
                    this.addBlockName(tokenValue);
                }
            } else {
                imported = this.parseIdentifierName(context, this.token);
                this.expect(context, Token.AsKeyword);
                local = this.parseIdentifierOrPattern(context);
            }
    
            return this.finishNode(context, pos, {
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
        private parseImportNamespaceSpecifier(context: Context): ESTree.ImportNamespaceSpecifier {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.Multiply);
    
            if (this.token !== Token.AsKeyword) {
                this.error(Errors.NoAsAfterImportNamespace);
            }
    
            if (this.flags & Flags.ExtendedUnicodeEscape) {
                this.error(Errors.UnexpectedEscapedKeyword);
            }
    
            this.expect(context, Token.AsKeyword);
            this.checkIfExistInBlockScope(this.tokenValue, true);
            if (this.token !== Token.Identifier) this.throwUnexpectedToken();
    
            const local = this.parseIdentifier(context);
    
            return this.finishNode(context, pos, {
                type: 'ImportNamespaceSpecifier',
                local
            });
        }
    
        // import <foo> ...;
        private parseImportDefaultSpecifier(context: Context): ESTree.ImportDefaultSpecifier {
            return this.finishNode(context, this.getLocations(), {
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
    
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
            if (blockScope != null) this.parentScope = blockScope;
            this.blockScope = undefined;
    
            switch (this.token) {
    
                // import 'foo';
                case Token.StringLiteral:
                    {
    
                        this.addBlockName(this.tokenValue);
                        const source = this.parseModuleSpecifier(context);
                        this.consumeSemicolon(context);
                        return this.finishNode(context, pos, {
                            type: 'ImportDeclaration',
                            specifiers,
                            source
                        });
                    }
    
                case Token.Identifier:
                    {
                        const tokenValue = this.tokenValue;
                        this.addBlockName(tokenValue)
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
    
            if (this.flags & Flags.ExtendedUnicodeEscape) {
                this.error(Errors.UnexpectedEscapedKeyword);
            }
    
            this.expect(context, Token.FromKeyword);
            const src = this.parseModuleSpecifier(context);
    
            this.consumeSemicolon(context);
    
            this.blockScope = blockScope;
            if (parentScope != null) this.parentScope = parentScope;
    
            return this.finishNode(context, pos, {
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
                    if (this.isLexical(context)) {
                        return this.parseVariableStatement(context | Context.Let | Context.AllowIn);
                    }
                    return this.parseStatement(context & ~Context.TopLevel);
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
    
        private parseStatement(context: Context): any {
            switch (this.token) {
                case Token.Identifier:
                    return this.parseLabelledStatement(context);
                case Token.LeftParen:
                    return this.parseExpressionStatement(context | Context.AllowIn);
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
                case Token.AwaitKeyword:
                    return this.parseLabelledStatement(context);
    
                case Token.AsyncKeyword:
                    // Here we do a quick lookahead so we just need to parse out the
                    // 'AsyncFunctionDeclaration'. The 'parsePrimaryExpression' will do the
                    // heavy work for us. I doubt this will cause any performance loss, but
                    // if so is the case - this can be reverted later on.
                    // J.K. Thomas
                    if (this.nextTokenIsFuncKeywordOnSameLine(context)) {
                        // Note: async function are only subject to AnnexB if we forbid them to parse
                        if (context & Context.TopLevel || this.flags & Flags.IterationStatement) {
                            this.error(Errors.ForbiddenAsStatement, tokenDesc(this.token));
                        }
                        if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
                        return this.parseFunctionDeclaration(context);
                    }
                    // 'Async' is a valid contextual keyword in sloppy mode for labelled statement, so either
                    // parse out 'LabelledStatement' or an plain identifier. We pass down the 'Statement' mask
                    // so we can easily switch async state if needed on "TopLevel" even if we are inside
                    // the PrimaryExpression production
                    return this.parseLabelledStatement(context | Context.TopLevel);
    
                case Token.FunctionKeyword:
                    if (context & Context.AnnexB) return this.parseFunctionDeclaration(context);
    
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
                if (blockScope != null) this.parentScope = blockScope;
                this.blockScope = context & Context.IfClause ? blockScope : undefined;
                const flag = this.flags;
    
                while (this.token !== Token.RightBrace) {
                    body.push(this.parseStatementListItem(context & ~Context.IfClause | Context.TopLevel));
                }
    
                this.flags = flag;
    
                this.blockScope = blockScope;
                if (parentScope != null) this.parentScope = parentScope;
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
    
                param = this.parseIdentifierOrPattern(context);
                this.expect(context, Token.RightParen);
            }
    
            const body = this.parseBlockStatement(context | Context.IfClause);
    
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
                body: this.parseStatement(context | Context.Iteration)
            });
        }
    
        private parseWhileStatement(context: Context): ESTree.WhileStatement {
            const pos = this.getLocations();
    
            this.expect(context, Token.WhileKeyword);
            this.expect(context, Token.LeftParen);
    
            const test = this.parseExpression(context | Context.AllowIn, pos);
    
            this.expect(context, Token.RightParen);
    
            const savedFlag = this.flags;
    
            this.flags |= Flags.IterationStatement | Flags.Continue;
    
            const body = this.parseStatement(context & ~Context.TopLevel);
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
            this.flags |= Flags.IterationStatement | Flags.Continue;
            const body = this.parseStatement(context & ~Context.TopLevel);
            this.flags = savedFlag;
    
            this.expect(context, Token.WhileKeyword);
            this.expect(context, Token.LeftParen);
    
            const test = this.parseExpression(context & ~Context.TopLevel | Context.AllowIn, pos);
    
            this.expect(context, Token.RightParen);
            this.parseOptional(context, Token.Semicolon);
    
            return this.finishNode(context, pos, {
                type: 'DoWhileStatement',
                body,
                test
            });
        }
    
        private parseContinueStatement(context: Context): ESTree.ContinueStatement {
    
            const pos = this.getLocations();
    
            if (!(this.flags & Flags.Continue)) this.error(Errors.InvalidNestedContinue);
    
            this.expect(context, Token.ContinueKeyword);
    
            let label: ESTree.Identifier | null = null;
            if (!(this.flags & Flags.PrecedingLineBreak) && this.token === Token.Identifier) {
                label = this.parseIdentifierName(context, this.token);
    
                if (this.labelSet === undefined || !('$' + label.name in this.labelSet)) {
                    this.error(Errors.UnknownLabel, label.name);
                }
            }
    
            if (label === null && !(this.flags & Flags.IterationStatement)) this.error(Errors.BadContinue);
    
            this.consumeSemicolon(context);
    
            return this.finishNode(context, pos, {
                type: 'ContinueStatement',
                label
            });
        }
    
        private parseBreakStatement(context: Context): ESTree.BreakStatement {
    
            const pos = this.getLocations();
            if (this.flags & Flags.ExtendedUnicodeEscape) {
                this.error(Errors.UnexpectedEscapedKeyword)
            }
    
            this.expect(context, Token.BreakKeyword);
    
            let label: ESTree.Identifier | null = null;
    
            if (!(this.flags & Flags.PrecedingLineBreak) && this.token === Token.Identifier) {
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
            let test: ESTree.Expression | null = null;
    
            // Create a lexical scope node around the whole ForStatement
            const blockScope = this.blockScope;
            const parentScope = this.parentScope;
            const awaitToken = (context & Context.Await) !== 0 && this.parseOptional(context, Token.AwaitKeyword);
            const savedFlag = this.flags;
    
            if (blockScope !== undefined) this.parentScope = blockScope;
    
            this.blockScope = undefined;
    
            this.expect(context, Token.LeftParen);
    
            const token = this.token;
    
            context |= Context.ForStatement;
    
            if (this.token !== Token.Semicolon) {
                if (hasMask(this.token, Token.VarDeclStart)) {
                    const startIndex = this.getLocations()
                    const kind = tokenDesc(this.token);
                    if (this.parseOptional(context, Token.VarKeyword)) {
                        declarations = this.parseVariableDeclarationList(context);
                    } else if (this.parseOptional(context, Token.ConstKeyword)) {
                        declarations = this.parseVariableDeclarationList(context | Context.Const);
                    } else if (this.isLexical(context) && this.parseOptional(context, Token.LetKeyword)) {
                        declarations = this.parseVariableDeclarationList(context | Context.Let);
                    } else {
                        init = this.parseExpression(context, pos);
                    }
                    if (declarations) {
                        init = this.finishNode(context, startIndex, {
                            type: 'VariableDeclaration',
                            declarations,
                            kind
                        });
                    }
    
                } else {
                    init = this.parseExpression(context & ~Context.AllowIn, pos);
                }
            }
    
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
    
            this.flags |= Flags.IterationStatement | Flags.Continue;
    
            if (this.isInOrOfKeyword(this.token)) {
    
                if (declarations) {
                    if (declarations[0].init != null) this.error(Errors.InvalidVarInitForOf);
                    if (declarations.length !== 1) this.error(Errors.Unexpected);
                } else {
                    if (!isValidDestructuringAssignmentTarget(init) || init.type === 'AssignmentExpression') {
                        this.error(Errors.InvalidLHSInForLoop);
                    }
                    this.reinterpretAsPattern(context, init);
                }
    
                let isForOfStatement = false;
                let right;
    
                if (this.parseOptional(context, Token.OfKeyword)) {
                    isForOfStatement = true;
                    if (awaitToken && !(this.flags & Flags.OptionsNext)) {
                        this.error(Errors.UnexpectedToken, tokenDesc(token));
                    }
                } else if (this.parseOptional(context, Token.InKeyword)) {
                    if (awaitToken) this.error(Errors.UnexpectedToken, tokenDesc(token));
                }
    
                right = this.parseAssignmentExpression(context);
                this.expect(context, Token.RightParen);
                body = this.parseStatement(context & ~Context.TopLevel);
    
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
    
            let update = null;
    
            this.expect(context, Token.Semicolon);
    
            if (this.token !== Token.Semicolon) test = this.parseExpression(context, pos);
            this.expect(context, Token.Semicolon);
            if (this.token !== Token.RightParen) update = this.parseExpression(context, pos);
    
            this.expect(context, Token.RightParen);
            body = this.parseStatement(context & ~Context.TopLevel);
    
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
            return this.parseStatement(context | (Context.AnnexB | Context.TopLevel | Context.Iteration));
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
    
            if (!(this.flags & Flags.GlobalReturn)) this.error(Errors.IllegalReturn);
    
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
    
        private parseLabelledStatement(context: Context): ESTree.LabeledStatement | ESTree.ExpressionStatement {
            const pos = this.getLocations();
            const token = this.token;
    
            const expr = this.parseExpression(context | Context.AllowIn, pos);
    
            if (this.token === Token.Colon && expr.type === 'Identifier') {
    
                this.expect(context, Token.Colon);
    
                const key = '$' + expr.name;
                if (this.labelSet === undefined) this.labelSet = {};
                else if (this.labelSet[key] === true) this.error(Errors.Redeclaration, expr.name);
    
                this.labelSet[key] = true;
                let body;
    
                switch (this.token) {
                    case Token.FunctionKeyword:
                        if (context & Context.Iteration) this.error(Errors.InvalidWithBody);
                        if (context & Context.ForStatement || this.flags & Flags.IterationStatement) this.error(Errors.StrictFunction);
                        // '13.1.1 - Static Semantics: ContainsDuplicateLabels', says it's a syntax error if
                        // LabelledItem: FunctionDeclaration is ever matched. Annex B.3.2 changes this behaviour.
                        if (context & Context.Strict) this.error(Errors.StrictFunction);
                        // AnnexB allows function declaration as labels, but not async func or generator func because the
                        // generator declaration is only matched by a hoistable declaration in StatementListItem.
                        // To fix this we need to pass the 'AnnexB' mask, and let it throw in 'parseFunctionDeclaration'
                        // We also unset the 'ForStatement' mask because we are no longer inside a 'ForStatement'.
                        body = this.parseFunctionDeclaration(context & ~(Context.Iteration | Context.Expression) | Context.AnnexB | Context.TopLevel);
                        break;
                    default:
                        body = this.parseStatement(context | Context.TopLevel);
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
    
        private parseExpressionStatement(context: Context): ESTree.ExpressionStatement {
            const pos = this.getLocations();
            const expr = this.parseExpression(context, pos);
            this.consumeSemicolon(context);
            return this.finishNode(context, pos, {
                type: 'ExpressionStatement',
                expression: expr
            });
        }
    
        private parseVariableStatement(context: Context, shouldConsume = true): ESTree.VariableDeclaration {
            const pos = this.getLocations();
            const token = this.token;
            this.nextToken(context);
            const declarations = this.parseVariableDeclarationList(context);
            if (shouldConsume) this.consumeSemicolon(context);
            return this.finishNode(context, pos, {
                type: 'VariableDeclaration',
                declarations,
                kind: tokenDesc(token)
            });
        }
    
        private parseVariableDeclarationList(context: Context): ESTree.VariableDeclarator[] {
            const list: ESTree.VariableDeclarator[] = [this.parseVariableDeclaration(context)];
            if (this.token !== Token.Comma) return list;
            while (this.parseOptional(context, Token.Comma)) list.push(this.parseVariableDeclaration(context));
            return list;
        }
    
        private isInOrOfKeyword(t: Token): boolean {
            switch (t) {
                case Token.InKeyword:
                case Token.OfKeyword:
                    return true;
                default:
                    return false;
            }
        }
    
        private parseVariableDeclaration(context: Context): ESTree.VariableDeclarator {
    
            const pos = this.getLocations();
            const token = this.token;
            let id = this.parseIdentifierOrPattern(context | Context.ForceBinding);
    
            let init: ESTree.Expression | null = null;
    
            if (hasMask(token, Token.BindingPattern)) {
                if (this.parseOptional(context, Token.Assign)) {
                    init = this.parseAssignmentExpression(context & ~(Context.Lexical | Context.ForStatement));
                    if (!(context & Context.Lexical) && context & Context.ForStatement) {
                        if (this.token === Token.InKeyword) {
                            this.error(Errors.InvalidVarDeclInForIn);
                        }
                    }
                } else if (!this.isInOrOfKeyword(this.token)) {
                    this.error(Errors.DeclarationMissingInitializer);
                }
    
            } else {
    
                if (this.parseOptional(context, Token.Assign)) {
                    init = this.parseAssignmentExpression(context & ~(Context.Lexical | Context.ForStatement));
                    if (context & Context.ForStatement && this.isInOrOfKeyword(this.token)) {
                        if (context & (Context.Strict | Context.Lexical)) {
                            this.error(this.token === Token.InKeyword ?
                                Errors.InvalidVarDeclInForIn :
                                Errors.InvalidVarDeclInForOf);
                        }
                    }
                } else if (context & Context.Const && !this.isInOrOfKeyword(this.token)) {
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
            if (context & Context.Yield && this.token === Token.YieldKeyword) {
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
                    if (expr.type !== 'Identifier') this.throwUnexpectedToken();
                    // Invalid: 'package => { "use strict"}"'
                    if (hasMask(token, Token.FutureReserved)) {
                        this.errorLocation = this.getLocations();
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
                    if (this.flags & Flags.Rest) this.error(Errors.InvalidLHSInAssignment);
                    // Note: A functions arameter list is already parsed as pattern, so no need to reinterpret
                    if (!(context & Context.InParameter)) this.reinterpretAsPattern(context, expr);
                } else if (!isValidSimpleAssignmentTarget(expr)) {
                    this.error(Errors.InvalidLHSInAssignment);
                } else if (context & Context.InParenthesis) {
                    this.flags |= Flags.Operator;
                }
    
                this.nextToken(context);
    
                if (context & Context.Yield && context & Context.InParenthesis && this.token === Token.YieldKeyword) {
                    this.flags |= Flags.Yield
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
    
        private reinterpretAsPattern(context: Context, params: any) {
    
            switch (params.type) {
                case 'PrivateName':
                case 'Identifier':
                    if (context & Context.InArrowParameterList) {
                        this.addFunctionArg(params.name);
                    }
                    if (context & Context.Strict && this.isEvalOrArguments(params.name)) {
                        this.error(Errors.InvalidBindingStrictMode, params.name);
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
                        this.reinterpretAsPattern(context, property.value ? property.value : property);
                    }
                    return;
    
                case 'ArrayExpression':
                    if (this.flags & Flags.ParenthesizedPattern) this.error(Errors.InvalidParenthesizedPattern);
                    params.type = 'ArrayPattern';
                    // falls through
    
                case 'ArrayPattern':
                    for (let i = 0; i < params.elements.length; ++i) {
                        // skip holes in pattern
                        if (params.elements[i] !== null) {
                            this.reinterpretAsPattern(context, params.elements[i]);
                        }
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
    
            if (!(this.flags & Flags.InFunctionBody)) context |= Context.TopLevel;
    
            if (this.token === Token.LeftBrace) {
                body = this.parseFunctionBody(context | Context.Arrow);
            } else {
                if (context & Context.Fields && this.isEvalOrArguments(this.tokenValue)) {
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
            if (context & Context.Fields && this.isEvalOrArguments(this.tokenValue)) {
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
            startLoc: any,
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
    
                expr = this.finishNode(context, startLoc, {
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
            if (!expr.property) return false;
            return expr.property.type === 'PrivateName';
        }
    
        private parseUnaryExpression(context: Context): ESTree.UnaryExpression | ESTree.Expression {
    
            const startLoc = this.getLocations();
    
            if (context & Context.Await && this.token === Token.AwaitKeyword) {
                return this.parseAwaitExpression(context);
            } else if (hasMask(this.token, Token.UnaryOperator)) {
                const operator = this.token;
                this.nextToken(context);
                const operand = this.parseUnaryExpression(context | Context.Unary);
                if (context & Context.Strict && operator === Token.DeleteKeyword) {
                    if (operand.type === 'Identifier') {
                        this.error(Errors.StrictDelete);
                    } else if (this.flags & Flags.OptionsNext && !(context & Context.Module) && this.isPrivateName(operand)) {
                        this.error(Errors.StrictDelete);
                    }
                }
    
                return this.finishNode(context, startLoc, {
                    type: 'UnaryExpression',
                    operator: tokenDesc(operator),
                    argument: operand,
                    prefix: true
                });
            }
    
            const updateExpression = this.parseUpdateExpression(context, startLoc);
    
            if (this.token === Token.Exponentiate) {
                // if (context & Context.Unary) this.error(Errors.Unexpected);
                return this.parseBinaryExpression(context & ~Context.Unary, this.token & Token.Precedence, startLoc, updateExpression);
            }
    
            return updateExpression;
        }
    
        private parseAwaitExpression(context: Context): ESTree.AwaitExpression {
            const pos = this.getLocations();
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
            this.expect(context, Token.AwaitKeyword);
            return this.finishNode(context, pos, {
                type: 'AwaitExpression',
                argument: this.parseUnaryExpression(context)
            });
        }
    
        private parseUpdateExpression(context: Context, pos: Location) {
    
            let expr: ESTree.Expression;
    
            if (hasMask(this.token, Token.UpdateOperator)) {
    
                const operator = this.token;
    
                this.nextToken(context);
    
                expr = this.parseLeftHandSideExpression(context, pos);
    
                if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                    this.error(Errors.StrictLHSPrefix);
                } // else if (!isValidSimpleAssignmentTarget(expr)) this.error(Errors.InvalidLHSInAssignment);
    
                return this.finishNode(context, pos, {
                    type: 'UpdateExpression',
                    operator: tokenDesc(operator),
                    prefix: true,
                    argument: expr
                });
            }
    
            expr = this.parseLeftHandSideExpression(context, pos);
    
            if (hasMask(this.token, Token.UpdateOperator) && !(this.flags & Flags.PrecedingLineBreak)) {
    
                // The identifier eval or arguments may not appear as the LeftHandSideExpression of an
                // Assignment operator(12.15) or of a PostfixExpression or as the UnaryExpression
                // operated upon by a Prefix Increment(12.4.6) or a Prefix Decrement(12.4.7) operator.
                if (context & Context.Strict && this.isEvalOrArguments((expr as ESTree.Identifier).name)) {
                    this.error(Errors.StrictLHSPostfix);
                }
    
                if (!isValidSimpleAssignmentTarget(expr)) this.error(Errors.InvalidLHSInAssignment);
    
                const operator = this.token;
    
                this.nextToken(context);
    
                return this.finishNode(context, pos, {
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
                            if (context & Context.ForStatement && this.token === Token.OfKeyword) {
                                this.errorLocation = pos;
                                this.error(Errors.InvalidLHSInForOf)
                            }
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
    
            const pos = this.getLocations();
    
            const parentContext = context;
    
            context &= ~(Context.Await | Context.Yield | Context.Method);
    
            if (this.parseOptional(context, Token.AsyncKeyword)) context |= Context.Await;
            return this.parseFunction(context & ~Context.Expression, pos, ObjectState.None, parentContext) as ESTree.FunctionDeclaration;
        }
    
        private parseFunctionExpression(
            context: Context,
            pos: Location,
            state: ObjectState = ObjectState.None
        ): ESTree.FunctionExpression {
            return this.parseFunction(context, pos, state) as ESTree.FunctionExpression;
        }
    
        private parseFunction(
            context: Context,
            pos: Location,
            state: ObjectState = ObjectState.None,
            parent: Context = Context.None
        ): ESTree.FunctionExpression | ESTree.FunctionDeclaration {
    
            let id: ESTree.Identifier | null = null;
    
            if (!(context & Context.Method)) {
    
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
    
                if (this.token !== Token.LeftParen) {
    
                    const name = this.tokenValue;
                    const token = this.token;
    
                    if (!this.isIdentifier(context, token)) this.throwUnexpectedToken();
    
                    if (this.isEvalOrArguments(name)) {
                        if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
                    }
    
                    if (context & Context.Expression) {
    
                        if (context & Context.Await && token === Token.AwaitKeyword) {
                            this.error(Errors.DisallowedInContext, tokenDesc(token));
                        }
    
                        if (context & (Context.Await | Context.Yield) && token === Token.YieldKeyword) {
                            this.error(Errors.DisallowedInContext, tokenDesc(token));
                        }
    
                    } else {
    
                        if (context & Context.Await && this.flags & Flags.InFunctionBody && token === Token.AwaitKeyword) {
                            this.error(Errors.DisallowedInContext, tokenDesc(token));
                        }
    
                        if (parent & Context.Yield && token === Token.YieldKeyword) {
                            this.error(Errors.DisallowedInContext, tokenDesc(token));
                        }
                        // Can not use 'await' as identifier inside an async function
                        if (parent & Context.Await && this.token === Token.AwaitKeyword) {
                            this.error(Errors.InvalidAwaitInAsyncFunc);
                        }
    
                        if (context & Context.TopLevel && !(context & Context.AnnexB)) {
                            this.checkIfExistInFunctionScope(name);
                            this.blockScope[name] = ScopeMasks.Shadowable;
                        }
                    }
    
                    id = context & (Context.Expression | Context.AnnexB) ?
                        this.parseIdentifier(context) :
                        this.parseBindingIdentifier(context);
    
                } else if (!(context & (Context.Expression | Context.OptionalIdentifier))) this.error(Errors.UnNamedFunctionStmt);
            }
    
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
                    result.push(this.parseRestElement(context));
                    this.parseOptional(context, Token.Comma);
                    break;
                }
    
                if (!(context & Context.Strict) && this.token !== Token.Identifier) {
                    context |= Context.Pattern;
                }
    
                result.push(this.parseFormalParameters(context & ~Context.ForceBinding));
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
            if (this.token !== Token.Identifier) {
                this.errorLocation = pos;
                this.flags |= Flags.SimpleParameterList;
            }
    
            if (this.isEvalOrArguments(this.tokenValue)) {
                if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
                this.errorLocation = pos;
                this.flags |= Flags.Binding;
            }
    
            const left = this.parseIdentifierOrPattern(context);
    
            if (this.token !== Token.Assign) return left;
    
            this.expect(context, Token.Assign);
            switch (this.token) {
                case Token.YieldKeyword:
                    if (context & Context.Yield) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                case Token.AwaitKeyword:
                    if (context & Context.Await) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                default: // ignore
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
    
            const isEscaped = (this.flags & Flags.ExtendedUnicodeEscape) !== 0;
            const id = this.parseIdentifier(context);
            const flags = this.flags |= Flags.SimpleParameterList;
    
            switch (this.token) {
    
                // 'parseAsyncFunctionExpression'
                case Token.FunctionKeyword:
                    //  The `async` contextual keyword must not contain Unicode escape sequences
                    if (isEscaped) this.error(Errors.Unexpected);
                    // The specs says "async[no LineTerminator here]", so just return an plain identifier in case
                    // we got an LineTerminator. The 'FunctionExpression' will be parsed out in 'parsePrimaryExpression'
                    if (this.flags & Flags.PrecedingLineBreak) return id;
                    return this.parseFunctionExpression(context & ~(Context.Yield | Context.Method) | Context.Await | Context.Expression, pos);
                    // 'AsyncArrowFunction[In, Yield, Await]'
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
                    const elem = this.parseSpreadElement(context);
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
                    if (!(state & ParenthesizedState.Await) && this.token === Token.AwaitKeyword) {
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
                // Valid: 'async(a=await)=>12'. 
                // Invalid: 'async(await)=>12'. 
                if (this.flags & Flags.Await) this.error(Errors.InvalidAwaitInArrowParam);
                if (state & ParenthesizedState.EvalOrArg) this.error(Errors.StrictParamName);
                if (state & ParenthesizedState.Parenthesized) this.error(Errors.InvalidParenthesizedPattern);
                if (state & ParenthesizedState.Await) this.error(Errors.InvalidAwaitInArrowParam);
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
    
        private parseSpreadElement(context: Context): ESTree.SpreadElement {
            const pos = this.getLocations();
            // Disallow SpreadElement inside dynamic import
            if (context & Context.Import) this.throwUnexpectedToken();
            this.expect(context, Token.Ellipsis);
    
            // Object rest element needs to be the last AssignmenProperty in 
            // ObjectAssignmentPattern. (For..in statement)
            if (context & Context.ForStatement && this.token === Token.Comma) {
                this.error(Errors.Unexpected);
            }
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
    
                    if (this.token === Token.Identifier) {
                        if (this.tokenValue !== 'target') this.error(Errors.MetaNotInFunctionBody);
                        if (context & Context.InParameter) return this.parseMetaProperty(context, id, pos);
                        if (context & Context.Arrow && context & Context.TopLevel) this.error(Errors.NewTargetArrow);
                        if (!(this.flags & Flags.InFunctionBody)) this.error(Errors.MetaNotInFunctionBody);
                    }
    
                    const meta = this.parseMetaProperty(context, id, pos);
    
                    if (this.token === Token.Assign) {
                        this.error(Errors.InvalidLHSInAssignment);
                    }
    
                    return meta;
    
                    // 'import'
                case Token.ImportKeyword:
                    this.throwUnexpectedToken();
    
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
                    return this.parseBigIntLiteral(context);
                case Token.Identifier:
                    return this.parseIdentifier(context | Context.TaggedTemplate);
                case Token.FunctionKeyword:
                    return this.parseFunctionExpression(context & ~(Context.Yield | Context.Method) | Context.Expression | Context.InParenthesis, pos);
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
                    return this.parseClassExpression(context | Context.Expression);
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
                case Token.ThrowKeyword:
                    return this.parseThrowExpression(context);
                case Token.AwaitKeyword:
                    if (context & Context.InAsyncArgs) this.flags |= Flags.Await;
                    if (context & Context.Await) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
    
                    if (context & Context.Module) {
                        // Valid: 'await = 0;'
                        if (!this.nextTokenIsAssign(context)) this.throwUnexpectedToken();
                    }
                    return this.parseIdentifier(context);
                case Token.LetKeyword:
                    return this.parseLet(context);
                case Token.LessThan:
                    if (this.flags & Flags.OptionsJSX) return this.parseJSXElement(context | Context.JSXChild);
                case Token.Hash:
                    if (context & Context.Method) return this.parsePrivateName(context);
                case Token.YieldKeyword:
                    if (context & Context.Yield) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    if (context & Context.Strict && this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
                default:
                    if (!this.isIdentifier(context, this.token)) this.throwUnexpectedToken();
                    return this.parseIdentifier(context);
            }
        }
    
        private parseLet(context: Context): ESTree.Identifier {
            const name = this.tokenValue;
            const pos = this.getLocations();
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword)
            if (context & Context.Strict) this.error(Errors.InvalidStrictExpPostion, tokenDesc(this.token));
            this.nextToken(context);
            if (!(context & Context.ForStatement) && this.flags & Flags.PrecedingLineBreak) this.throwUnexpectedToken();
            if (this.token === Token.LetKeyword) this.error(Errors.InvalidStrictExpPostion, tokenDesc(this.token));
            return this.finishNode(context, pos, {
                type: 'Identifier',
                name
            });
        }
    
        private parseClassDeclaration(context: Context): ESTree.ClassDeclaration {
            return this.parseClass(context) as ESTree.ClassDeclaration;
        }
    
        private parseClassExpression(context: Context): ESTree.ClassExpression {
            return this.parseClass(context) as ESTree.ClassExpression;
        }
    
        private parseClass(context: Context): ESTree.ClassDeclaration | ESTree.ClassExpression {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.ClassKeyword);
    
            let superClass: ESTree.Expression | null = null;
            let classBody;
            let flags = ObjectState.None;
            let id = null;
            let next = (this.flags & Flags.OptionsNext) !== 0;
    
            const savedFlags = this.flags;
    
            if (this.isIdentifier(context, this.token)) {
                const name = this.tokenValue;
    
                if (!(context & Context.Expression)) {
                    this.checkIfExistInFunctionScope(name);
                    this.blockScope[name] = ScopeMasks.Shadowable;
                }
    
                id = context & Context.Expression ? this.parseIdentifier(context | Context.Strict) : this.parseBindingIdentifier(context | Context.Strict);
                // Valid: `export default class {};`
                // Invalid: `class {};`
            } else if (!(context & Context.Expression) && !(context & Context.OptionalIdentifier)) {
                this.error(Errors.UnNamedClassStmt);
            }
    
            if (this.parseOptional(context, Token.ExtendsKeyword)) {
                superClass = this.parseLeftHandSideExpression(context & ~Context.OptionalIdentifier | Context.Strict, pos);
                flags |= ObjectState.Heritage;
            }
    
            if (next && !(context & Context.Method)) this.fieldSet = undefined;
    
            classBody = this.parseClassBody(context & ~Context.Expression | Context.Strict, flags);
    
            if (next) {
    
                if (this.fieldSet !== undefined) {
    
                    let scope: any = undefined;
                    let method: any = undefined;
                    let key;
    
                    for (let i = 0; i < this.fieldSet.length; i++) {
    
                        key = this.fieldSet[i].key;
    
                        const mask = this.fieldSet[i].mask;
    
                        if (mask & FieldState.Method) {
                            if (method === undefined) method = {};
                            method[key] = mask;
                        } else if (mask & FieldState.Scope) {
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
    
            return this.finishNode(context, pos, {
                type: context & Context.Expression ? 'ClassExpression' : 'ClassDeclaration',
                id,
                superClass,
                body: classBody
            });
        }
    
        private parseClassBody(context: Context, flags: ObjectState): ESTree.ClassBody {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.LeftBrace);
    
            const body: ESTree.MethodDefinition[] = [];
            if (this.token !== Token.RightBrace) {
    
                while (this.token !== Token.RightBrace) {
                    if (!this.parseOptional(context, Token.Semicolon)) {
                        const node: any = this.parseClassElement(context, flags);
                        body.push(node);
                        if (node.kind === 'constructor') context |= Context.HasConstructor;
                    }
                }
            }
            this.expect(context, Token.RightBrace);
    
            return this.finishNode(context, pos, {
                type: 'ClassBody',
                body
            });
        }
    
        private parsePrivateProperty(context: Context, pos: Location | undefined, key: ESTree.Expression) {
            let value: ESTree.AssignmentExpression | ESTree.ArrowFunctionExpression | ESTree.YieldExpression | null = null;
            if (this.parseOptional(context, Token.Assign)) {
                if (this.isEvalOrArguments(this.tokenValue)) this.error(Errors.UnexpectedReservedWord);
                value = this.parseAssignmentExpression(context);
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
            let key = this.parseIdentifierName(context, this.token);
    
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
                value = this.parseAssignmentExpression(context | Context.Fields);
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
                key = this.parsePrivateProperty(context | Context.Fields, pos, key);
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
            let token = this.token;
            let currentState = ObjectState.None;
            let count = 0;
            let key;
            let value;
            let isEscaped = (this.flags & Flags.ExtendedUnicodeEscape) !== 0;
            let fieldPos;
    
            loop: while (this.isIdentifierOrKeyword(token)) {
    
                switch (this.token) {
    
                    case Token.StaticKeyword:
                        if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
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
                        if (state & ObjectState.Accessors) break loop;
                        if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
                        state |= currentState = ObjectState.Async;
                        key = this.parseIdentifier(context);
                        count++;
                        break;
                    default:
                        break loop;
                }
            }
           
            // Generator / Async Iterations ( Stage 3 proposal)
            if (this.token === Token.Multiply) {
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
    
                    fieldPos = this.getLocations();
                    key = this.parseLiteral(context);
    
                    // Stage 3 Proposal - Class-fields
                    if (this.flags & Flags.OptionsNext && this.token !== Token.LeftParen) {
                        if (state & (ObjectState.Prototype | ObjectState.Constructor)) this.error(Errors.Unexpected);
                        return this.parseClassFields(context | Context.AllowIn | Context.Fields, key, fieldPos);
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
                    fieldPos = this.getLocations();
                    key = this.parseComputedPropertyName(context | Context.AllowIn, pos);
                    if (this.flags & Flags.OptionsNext && this.token !== Token.LeftParen) {
                        return this.parseClassFields(context | Context.AllowIn | Context.Fields, key, fieldPos);
                    }
                    break;
    
                default:
    
                    if (this.isIdentifier(context & ~Context.Strict, this.token)) {
                        if (this.tokenValue === 'constructor') state |= ObjectState.Constructor;
                        fieldPos = this.getLocations();
                        key = this.parseIdentifier(context);
                        if (this.token === Token.LeftBracket) this.throwUnexpectedToken();
                        // Stage 3 Proposal - Class-fields
                        if (this.token !== Token.LeftParen) {
                            if (this.flags & Flags.OptionsNext) {
                                if (state & (ObjectState.Prototype | ObjectState.Constructor)) this.error(Errors.Unexpected);
                                return this.parseClassFields(context | Context.AllowIn | Context.Fields, key, fieldPos);
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
    
    
        private parseObjectExpression(context: Context): ESTree.ObjectExpression {
    
            const pos = this.getLocations();
    
            this.expect(context, Token.LeftBrace);
    
            const properties: (ESTree.Property | ESTree.SpreadElement)[] = [];
            let firstProto;
    
            while (this.token !== Token.RightBrace) {
    
                if (this.token === Token.Ellipsis) {
                    if (!(this.flags & Flags.OptionsNext)) this.throwUnexpectedToken();
                    properties.push(this.parseSpreadElement(context));
                    if (context & Context.ForStatement && this.token === Token.Comma) this.error(Errors.Unexpected);
                } else {
                    this.firstProto = firstProto;
                    const elem = this.parseObjectElement(context);
                    if (!firstProto && this.firstProto) firstProto = this.firstProto;
                    properties.push(elem);
                }
                if (this.token !== Token.RightBrace) this.expect(context, Token.Comma);
            }
            this.expect(context, Token.RightBrace);
            return this.finishNode(context, pos, {
                type: 'ObjectExpression',
                properties
            });
        }
    
        private parseObjectElement(context: Context): ESTree.Property {
    
            const pos = this.getLocations();
            const token = this.token;
            let state = ObjectState.None;
            let currentState = ObjectState.None;
            let count = 0;
            let key;
            let value;
            let firstProto = this.firstProto;
            let isEscaped = (this.flags & Flags.ExtendedUnicodeEscape) !== 0;
            const tokenValue = this.tokenValue;
    
            switch (this.token) {
    
                case Token.GetKeyword:
                case Token.SetKeyword:
                    if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
                    state |= currentState = this.token === Token.GetKeyword ?
                        ObjectState.Get :
                        ObjectState.Set;
                    key = this.parseIdentifier(context);
                    count++;
                    break;
    
                case Token.AsyncKeyword:
                    if (isEscaped) this.error(Errors.UnexpectedEscapedKeyword);
                    state |= currentState = ObjectState.Async;
                    key = this.parseIdentifier(context);
                    count++;
                    break;
                default:
            }
    
            // Generator / Async Iterations ( Stage 3 proposal)
            if (this.token === Token.Multiply) {
                if (state & ObjectState.Async && !(this.flags & Flags.OptionsNext)) {
                    this.error(Errors.InvalidAsyncGenerator);
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
                    if (this.isIdentifierOrKeyword(this.token)) {
                        key = this.parseIdentifier(context);
                    } else if (count && currentState !== ObjectState.Yield) {
                        state &= ~currentState;
                        count--;
                    }
            }
    
            if (!key && state & ObjectState.Yield) this.error(Errors.UnexpectedToken, tokenDesc(token));
    
            switch (this.token) {
                case Token.LeftParen:
                    if (!(state & ObjectState.Accessors)) state |= ObjectState.Method;
                    value = this.parseMethodDefinition(context & ~(Context.Yield | Context.Await) | Context.Method, state);
                    break;
    
                case Token.Colon:
                    if (state & ObjectState.Special) this.error(Errors.Unexpected);
                    if (!(state & ObjectState.Computed) && this.tokenValue === '__proto__') {
                        if (firstProto) this.error(Errors.DuplicateProtoProperty);
                        this.firstProto = true;
                    }
    
    
    
                    this.expect(context, Token.Colon);
    
                    if (context & Context.InAsyncArgs && this.token === Token.AwaitKeyword) {
                        this.errorLocation = this.getLocations();
                        this.flags |= Flags.Await;
                    }
    
                    value = this.parseAssignmentExpression(context);
    
                    if (context & Context.Strict && this.isEvalOrArguments((value as any).name)) {
                        this.error(Errors.UnexpectedStrictReserved);
                    }
                    break;
                default:
    
                    if (state & ObjectState.Special || !this.isIdentifier(context, token)) {
                        this.throwUnexpectedToken();
                    }
    
                    if (context & Context.Yield && token === Token.YieldKeyword) {
                        this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    }
    
                    if (token === Token.AwaitKeyword) {
                        if (context & Context.Await) this.throwUnexpectedToken();
                        this.errorLocation = this.getLocations();
                        this.flags |= Flags.Await;
                    }
    
                    if (context & (Context.ForStatement | Context.InParenthesis) &&
                        context & Context.Strict && this.isEvalOrArguments(tokenValue)) {
                        this.error(Errors.UnexpectedReservedWord);
                    }
                    state |= ObjectState.Shorthand
    
                    if (this.token === Token.Assign) {
                        value = this.parseAssignmentPattern(context, pos, key);
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
            if (state & ObjectState.Yield && !(state & ObjectState.Get)) context |= Context.Yield;
            if (state & ObjectState.Async) context |= Context.Await;
            return this.parseFunctionExpression(context | Context.Expression, this.getLocations(), state);
        }
    
        private parseRestElement(context: Context) {
            const pos = this.getLocations();
    
            this.expect(context, Token.Ellipsis);
            const argument = this.parseIdentifierOrPattern(context);
            if (this.token === Token.Assign) this.error(Errors.UnexpectedToken, tokenDesc(this.token));
            if (!(context & Context.ForceBinding) && this.token !== Token.RightParen) {
                this.error(Errors.ParameterAfterRestParameter);
            }
            return this.finishNode(context, pos, {
                type: 'RestElement',
                argument
            });
        }
    
        private parseThrowExpression(context: Context): ESTree.ThrowStatement {
    
            if (!(this.flags & Flags.OptionsNext)) {
                this.error(Errors.UnsupportedFeature, tokenDesc(this.token), 'next');
            }
    
            const pos = this.getLocations();
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
            let state = ArrayState.None;
    
            while (this.token !== Token.RightBracket) {
                if (this.parseOptional(context, Token.Comma)) {
                    elements.push(null);
                } else if (this.token === Token.Ellipsis) {
                    state |= ArrayState.Spread;
    
                    const element = this.parseSpreadElement(context);
    
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
    
            if (this.token === Token.Assign) {
                if (state & ArrayState.EvalArg) this.error(Errors.StrictParamName);
            }
    
            return this.finishNode(context, pos, {
                type: 'ArrayExpression',
                elements
            });
        }
    
        // ParenthesizedExpression[Yield, Await]:
        // CoverParenthesizedExpressionAndArrowParameterList[Yield, Await]:
        private parseParenthesizedExpression(context: Context): ESTree.Expression {
    
            const pos = this.getLocations();
    
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
    
            const sequencePos = this.getLocations();
            this.errorLocation = pos;
            let isSequence = false;
    
            if (context & Context.Yield && this.token === Token.YieldKeyword) this.flags |= Flags.Yield;
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
                        if (this.token === Token.Arrow) {
                            return this.parseArrowFunctionExpression(context & ~(Context.Await | Context.Yield), pos, expressions);
                        }
                        this.error(Errors.UnexpectedToken, tokenDesc(token));
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
    
                expr = this.finishNode(context, sequencePos, {
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
    
        private parseTemplateTail(context: Context, pos: Location): ESTree.TemplateLiteral {
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
    
        private parseTemplate(context: Context, pos: Location): ESTree.TemplateLiteral {
    
            const expressions: ESTree.Expression[] = [];
            const quasis: ESTree.TemplateElement[] = [];
    
            while (this.token === Token.TemplateCont) {
    
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
    
            return this.finishNode(context, pos, {
                type: 'TemplateLiteral',
                expressions,
                quasis
            });
        }
    
        private parseBigIntLiteral(context: Context): ESTree.Literal {
            const pos = this.getLocations();
            const value = this.tokenValue;
            const raw = this.tokenRaw;
    
            const node = this.finishNode(context, pos, {
                type: 'Literal',
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
    
        private parseTrueOrFalseExpression(context: Context): ESTree.Literal {
            const pos = this.getLocations();
            const value = this.tokenValue === 'true';
            const raw = this.tokenValue;
            if (this.flags & Flags.ExtendedUnicodeEscape) this.error(Errors.UnexpectedEscapedKeyword);
            const node = this.finishNode(context, pos, {
                type: 'Literal',
                value
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
    
        private parseNullExpression(context: Context): ESTree.Literal {
            const pos = this.getLocations();
            const node = this.finishNode(context, pos, {
                type: 'Literal',
                value: null
            }, true);
    
            if (this.flags & Flags.OptionsRaw) node.raw = 'null';
            return node;
        }
    
        private parseIdentifier(context: Context): ESTree.Identifier {
            const name = this.tokenValue;
            const pos = this.getLocations();
            return this.finishNode(context, pos, {
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
    
        private checkIfExistInBlockScope(name: string, binding: boolean = false) {
            if (!this.initBlockScope() && (
                    (this.blockScope[name] & ScopeMasks.Shadowable) !== 0 ||
                    Object.prototype.hasOwnProperty.call(this.blockScope, name)
                )) {
    
                this.error(binding ? Errors.DuplicateBinding : Errors.DuplicateIdentifier, name);
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
    
            this.checkIfExistInBlockScope(name);
            this.blockScope[name] = ScopeMasks.NonShadowable;
        }
    
        private parseAssignmentPattern(
            context: Context,
            pos: Location = this.getLocations(),
            pattern: any = this.parseIdentifierOrPattern(context)
        ): ESTree.AssignmentPattern {
    
            if (!this.parseOptional(context, Token.Assign)) return pattern;
    
            if (context & Context.InParameter) {
    
                switch (this.token) {
                    case Token.YieldKeyword:
                        if (context & Context.Yield) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    case Token.AwaitKeyword:
                        if (context & Context.Await) this.error(Errors.DisallowedInContext, tokenDesc(this.token));
                    default: // ignore
                }
            }
    
            return this.finishNode(context, pos, {
                type: 'AssignmentPattern',
                left: pattern,
                right: this.parseAssignmentExpression(context)
            });
        }
    
        private parseIdentifierOrPattern(context: Context): ESTree.Identifier | ESTree.ObjectPattern {
    
            switch (this.token) {
    
                case Token.LeftBracket:
                    return this.parseAssignmentElementList(context);
    
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
    
            if (context & Context.ForceBinding && !this.isIdentifier(context, this.token)) {
                this.error(Errors.Unexpected);
            } else if (!this.isIdentifier(context, this.token)) {
                this.throwUnexpectedToken();
            } else if (context & Context.Lexical && this.token === Token.LetKeyword) {
                this.error(Errors.LetInLexicalBinding);
            }
    
            const pos = this.getLocations();
    
            const name = this.tokenValue;
    
            if (!(context & Context.IfClause) && this.isEvalOrArguments(name)) {
                if (context & Context.Strict) this.error(Errors.StrictLHSAssignment);
            }
    
            if (context & Context.InParameter && context & (Context.Strict | Context.YieldAwait | Context.Pattern)) {
                this.addFunctionArg(name);
            }
    
            this.addVarOrBlock(context, name);
    
            this.nextToken(context);
    
            return this.finishNode(context, pos, {
                type: 'Identifier',
                name
            });
        }
    
        private parseAssignmentRestElement(context: Context): ESTree.RestElement {
            const pos = this.getLocations();
            this.expect(context, Token.Ellipsis);
            const argument = this.parseIdentifierOrPattern(context);
            if (this.token === Token.Assign) this.throwUnexpectedToken();
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
                type: 'ArrayPattern',
                elements
            });
        }
   
        private parseComputedPropertyName(context: Context, pos: Location): ESTree.Expression {
            this.expect(context, Token.LeftBracket);
    
            if (this.token === Token.YieldKeyword) {
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
                if (this.token === Token.Ellipsis) {
                    if (!(this.flags & Flags.OptionsNext)) this.throwUnexpectedToken();
                    properties.push(this.parseRestProperty(context));
                } else {
                    properties.push(this.parseAssignmentProperty(context));
                }
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
    
            if (this.token !== Token.Identifier) this.throwUnexpectedToken();
            const arg = this.parseIdentifierOrPattern(context);
            if (this.token === Token.Assign) this.throwUnexpectedToken();
    
            return this.finishNode(context, pos, {
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
    
                const token = this.token;
    
                key = this.parseIdentifier(context);
    
    
                if (this.parseOptional(context, Token.Colon)) {
                    value = this.parseAssignmentPattern(context);
                } else {
    
                    state |= ObjectState.Shorthand;
    
                    if (context & Context.Yield && token === Token.YieldKeyword) {
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
            context: Context,
            pos: Location
        ): ESTree.JSXExpressionContainer | ESTree.JSXSpreadChild {
    
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
    
        private parseJSXClosingFragment(context: Context) {
            const pos = this.getLocations();
            this.expect(context, Token.JSXClose);
            this.expect(context, Token.GreaterThan);
            return this.finishNode(context, pos, {
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
    
                return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
                return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
    
            return this.finishNode(context, pos, {
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
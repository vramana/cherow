import * as ESTree from './estree';
import { Chars } from './chars';
import { Errors, report } from './errors';
import { Parser, Delegate } from './types';
import { Token, tokenDesc } from './token';
import { scan } from './scanner';
import { constructError } from './errors';
import { parseExpression, parseIdentifier} from './expressions';
import {
    isValidIdentifierStart,
    isValidIdentifierPart,
    mustEscape
} from './unicode';

/**
 * A set of flags for maintaining the internal state machine.
 */
export const enum ScannerState {
    None = 0,
    NewLine    = 1 << 0,
    SameLine   = 1 << 1,
    LastIsCR   = 1 << 2,
    LineStart  = 1 << 3,
    Terminated = 1 << 4
}
export const enum ModifierState {
    None = 0,
    Generator = 1 << 0,
    Await = 1 << 1,
    Getter = 1 << 2,
    Setter = 1 << 3,
    Constructor = 1 << 4,
    Static = 1 << 5,
    Computed = 1 << 6,
}

/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
   Empty                = 0,
   OptionsNext          = 1 << 0,
   OptionsRanges        = 1 << 1,
   OptionsJSX           = 1 << 2,
   OptionsRaw           = 1 << 3,
   OptionsLoc           = 1 << 4,
   OptionsDelegate      = 1 << 5,
   OptionsImpliedStrict = 1 << 6,
   OptionsGlobalReturn  = 1 << 7,
   OptionsGlobalAwait   = 1 << 8,
   OptionsComments      = 1 << 9,
   OptionsShebang       = 1 << 10,
   Strict               = 1 << 11,
   Module               = 1 << 12,
   TaggedTemplate       = 1 << 13,
   InClass              = 1 << 14,
   AllowIn              = 1 << 15,
   Async                = 1 << 16,
   Yield                = 1 << 17,
   InParameter          = 1 << 18,
   IsReserved           = 1 << 19,
   InFunctionBody       = 1 << 20,
   AllowSingleStatement = 1 << 21,
   BlockScope           = 1 << 22,
   ForStatement         = 1 << 23,
   RequireIdentifier    = 1 << 24,
   Method               = 1 << 25,
   AllowSuperProperty   = 1 << 26,
   InParen              = 1 << 27,
}
export const enum ObjectState {
    None        = 0,
    Async       = 1 << 0,
    Generator   = 1 << 1,
    Getter      = 1 << 2,
    Setter      = 1 << 3,
    Computed    = 1 << 4,
    Method      = 1 << 5,
    Shorthand   = 1 << 6,
    Static      = 1 << 7,
    Constructor = 1 << 8,
}

/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
    None = 0,
    NewLine = 1 << 0,
    AllowBinding = 1 << 1,
    AllowDestructuring = 1 << 2,
    SimpleParameterList = 1 << 3,
    Switch = 1 << 4,
    Iteration = 1 << 5,
    StrictReserved = 1 << 6,
    Octal = 1 << 7,
    SimpleAssignmentTarget = 1 << 8,
    HasProtoField = 1 << 9,
    HasDuplicateProto = 1 << 10,
    StrictFunctionName = 1 << 11,
    StrictEvalArguments = 1 << 12,
    InFunctionBody = 1 << 13,
    AllowBreakOrContinue = Switch | Iteration
}
export const enum Labels {
    None      = 0,
    NotNested = 1 << 0,
    Nested    = 1 << 1
}
/**
 * Validate break and continue statement
 *
 * @param parser Parser instance
 * @param label label
 * @param isContinue true if validation continue statement
 */
export function validateBreakOrContinueLabel(parser: Parser, label: string, isContinue: boolean = false) {
    const state = hasLabel(parser, label);
    if (!state) report(parser, Errors.UnknownLabel, label);
    if (isContinue && !(state & Labels.Nested)) report(parser, Errors.IllegalContinue, label);
}

/**
 * Add label to the stack
 *
 * @param parser Parser instance
 * @param label label
 */
export function addLabel(parser: Parser, label: string) {
    if (parser.labelSet === undefined) parser.labelSet = {};
    parser.labelSet['$' + label] = parser.token & Token.IsIterationStatement ? Labels.Nested : Labels.NotNested;
}

/**
 * Remove label from the stack
 *
 * @param parser Parser instance
 * @param label label
 */
export function popLabel(parser: Parser, label: string) {
    parser.labelSet['$' + label] = Labels.None;
}

/**
 * Returns either true or false. Depends if the label exist.
 *
 * @param parser Parser instance
 * @param label Label
 */
export function hasLabel(parser: Parser, label: string): Labels {
    return !parser.labelSet ? Labels.None : parser.labelSet['$' + label];
}

/**
 * Finish each the node for each parse. Set line / and column on the node if the 
 * options are set for it
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param meta Line / column
 * @param node AST node
 */
export function finishNode < T extends ESTree.Node > (
    context: Context,
    parser: Parser,
    meta: any,
    node: any,
): T {

    if (context & Context.OptionsRanges) {
        node.start = meta.index;
        node.end = parser.lastIndex;
    }

    if (context & Context.OptionsLoc) {

        node.loc = {
            start: {
                line: meta.line,
                column: meta.column,
            },
            end: {
                line: parser.lastLine,
                column: parser.lastColumn
            }
        };
    }
    if (context & Context.OptionsDelegate) {
        (parser.delegate as Delegate)(node);
    }

    return node;
}


/**
 * Finish each the node for each parse. Set line / and column on the node if the 
 * options are set for it
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param meta Line / column
 * @param node AST node
 */
export const isIdentifierPart = (code: Chars) => isValidIdentifierPart(code) ||
    code === Chars.Backslash ||
    code === Chars.Dollar ||
    code === Chars.Underscore ||
    (code >= Chars.Zero && code <= Chars.Nine); // 0..9;


/**
 * Expect token. Throws if no match
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param t Token
 * @param Err Errors
 */
export function expect(parser: Parser, context: Context, t: Token, err: Errors = Errors.Unexpected): void {
    if (parser.token !== t) {
        return report(parser, err);
    }
    nextToken(parser, context);
}

/**
 * Consume token and advance if it exist, else return false
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param t Token
 */
export function consume(parser: Parser, context: Context, t: Token) {
    if (parser.token === t) {
        nextToken(parser, context);
        return true;
    }
    return false;
}

/**
 * Advance and return the next token in the stream
 *
 * @param parser Parser instance
 * @param context Context masks
 */
export function nextToken(parser: Parser, context: Context) {
    parser.lastIndex = parser.index;
    parser.lastLine = parser.line;
    parser.lastColumn = parser.column;

    return parser.token = scan(parser, context);
}

export const hasBit = (mask: number, flags: number) => (mask & flags) === flags;

/**
 * Scans private name. Stage 3 proposal related
 *
 * @param parser Parser instance
 * @param context Context masks
 */
export function scanPrivateName(parser: Parser, context: Context): Token {
    if ( /*!(context & Context.InClass) || */ !isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
        report(parser, Errors.Unexpected);
    }
    if (context & Context.Module) report(parser, Errors.Unexpected);
    return Token.Hash;
}

/**
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
 *
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function consumeSemicolon(parser: Parser, context: Context): boolean {
    const { token } = parser;

    if (token & Token.ASI || parser.flags & Flags.NewLine) { // EOF, '}', ';'
        return consume(parser, context, Token.Semicolon);
    }
    report(parser, !(context & Context.Async) && token & Token.IsAwait ?
        Errors.AwaitOutsideAsync :
        Errors.UnexpectedToken, tokenDesc(token));
    return false;
}

/**
 * Allow destructuring and binding. Used for block statement at
 * Toplevel
 * 
 * @param parser Parser state
 * @param context Context mask
 * @param callback Callback function
 */
export function allowExpressionCoverGrammar < T > (
    parser: Parser,
    context: Context,
    callback: (parser: Parser, context: Context) => T
) {
    parser.flags |= (Flags.AllowDestructuring | Flags.AllowBinding);
    return callback(parser, context);
}

/**
 * Bit fiddle current grammar state and keep track of the state during the parse and restore
 * it back to original state after finish parsing or throw.
 * 
 * Ideas for this is basicly from V8 and SM, but also the Esprima parser does this in a similar way. 
 * 
 * However this implementation is an major improvement over similiar implementations, and 
 * does not require additonal bitmasks to be set / unset during the parsing outside this function.
 * 
 * @param parser Parser state
 * @param context Context mask
 * @param callback Callback function
 * @param errMsg Optional error message
 */
export function parseExpressionCoverGrammar < T > (
    parser: Parser,
    context: Context,
    callback: (parser: Parser, context: Context) => T
) {
    const prevFlags = parser.flags;
    const prevpendingExpressionError = parser.pendingExpressionError;
    parser.flags |= Flags.AllowBinding | Flags.AllowDestructuring;
    parser.pendingExpressionError = undefined;
    const res = callback(parser, context);
    // If there exist an pending expression error, we throw an error at
    // the same location it was recorded
    if (!!parser.pendingExpressionError) {
        const { error, line, column, index } = parser.pendingExpressionError;
        constructError(index, line, column, error)
    }
    parser.flags &= ~(Flags.AllowBinding | Flags.AllowDestructuring);
    if (prevFlags & Flags.AllowBinding) parser.flags |= Flags.AllowBinding;
    if (prevFlags & Flags.AllowDestructuring) parser.flags |= Flags.AllowDestructuring;
    parser.pendingExpressionError = prevpendingExpressionError;
    return res;
}

/**
 * Restor current grammar to previous state, or unset necessary bitmasks
 * 
 * @param parser Parser state
 * @param context Context mask
 * @param callback Callback function
 */
export function restoreExpressionCoverGrammar < T > (
    parser: Parser,
    context: Context,
    callback: (parser: Parser, context: Context) => T
) {
    const prevFlags = parser.flags;
    const prevpendingExpressionError = parser.pendingExpressionError;
    parser.flags |= Flags.AllowBinding | Flags.AllowDestructuring;
    parser.pendingExpressionError = undefined;
    const res = callback(parser, context);
    if (parser.flags & Flags.AllowBinding && prevFlags & Flags.AllowBinding) parser.flags |= Flags.AllowBinding;
    else parser.flags &= ~Flags.AllowBinding;
    if (parser.flags & Flags.AllowDestructuring && prevFlags & Flags.AllowDestructuring) parser.flags |= Flags.AllowDestructuring;
    else parser.flags &= ~Flags.AllowDestructuring;
    parser.pendingExpressionError = prevpendingExpressionError || parser.pendingExpressionError;
    return res;
}

/**
 * Set / unset yield / await context masks based on the
 * ModifierState masks before invoking the callback and
 * returning it's content
 * 
 * @param parser Parser instance
 * @param context Context masks
 * @param state Modifier state
 * @param callback 
 */

export function swapContext < T > (parser: Parser, context: Context, state: ModifierState, callback: (parser: Parser, context: Context) => T): T {

    context &= ~(Context.Async | Context.Yield);

    if (state & ModifierState.Generator) context |= Context.Yield;

    if (state & ModifierState.Await) context |= Context.Async;

    return callback(parser, context);
}

export function hasNext(parser: Parser) {
    return parser.index < parser.source.length;
}
export function advance(parser: Parser) {
    parser.index++;
    parser.column++;
}

export function nextChar(parser: Parser) {
    return parser.source.charCodeAt(parser.index);
}

export function nextUnicodeChar(parser: Parser) {
    let { index } = parser;

    const hi = parser.source.charCodeAt(index);
    if (hi < Chars.LeadSurrogateMin || hi > Chars.LeadSurrogateMax) return hi;
    const lo = parser.source.charCodeAt(index + 1);
    if (lo < Chars.TrailSurrogateMin || lo > Chars.TrailSurrogateMax) return hi;
    return Chars.NonBMPMin + ((hi & 0x3FF) << 10) | lo & 0x3FF;
}

export function advanceAndOrSkipUC(parser: Parser) {
    const hi = parser.source.charCodeAt(parser.index++);
    let code = hi;

    if (hi >= 0xd800 && hi <= 0xdbff && hasNext(parser)) {
        const lo = parser.source.charCodeAt(parser.index);
        if (lo >= 0xdc00 && lo <= 0xdfff) {
            code = (hi & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
            parser.index++;
        }
    }

    parser.column++;
    return code;
}

export function consumeOpt(parser: Parser, code: number) {
    if (parser.source.charCodeAt(parser.index) !== code) return false;
    parser.index++;
    parser.column++;
    return true;
}

export function consumeLineFeed(parser: Parser, state: ScannerState) {
    parser.flags |= Flags.NewLine;
    parser.index++;
    if ((state & ScannerState.LastIsCR) === 0) {
        parser.column = 0;
        parser.line++;
    }
}

export function advanceNewline(parser: Parser) {
    parser.flags |= Flags.NewLine;
    parser.index++;
    parser.column = 0;
    parser.line++;
}

export const fromCodePoint = (code: Chars) => {
    return code <= 0xFFFF ?
        String.fromCharCode(code) :
        String.fromCharCode(((code - Chars.NonBMPMin) >> 10) +
            Chars.LeadSurrogateMin, ((code - Chars.NonBMPMin) & (1024 - 1)) + Chars.TrailSurrogateMin);
};


export function toHex(code: number): number {
    if (code < Chars.Zero) return -1;
    if (code <= Chars.Nine) return code - Chars.Zero;
    if (code < Chars.UpperA) return -1;
    if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
    if (code < Chars.LowerA) return -1;
    if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
    return -1;
}

export function storeRaw(parser: Parser, start: number) {
    parser.tokenRaw = parser.source.slice(start, parser.index);
}

export function lookahead < T > (parser: Parser, context: Context, callback: (parser: Parser, context: Context) => T): any {

    const savePos = parser.index;
    const {
        tokenValue,
        flags,
        line,
        column,
        startColumn,
        lastColumn,
        startLine,
        lastLine,
        lastIndex,
        startIndex,
        tokenRaw,
        token,
        lastChar,
        tokenRegExp
    } = parser;
    const res = callback(parser, context);
    parser.index = savePos;
    parser.token = token;
    parser.tokenValue = tokenValue;
    parser.tokenValue = tokenValue;
    parser.flags = flags;
    parser.line = line;
    parser.column = column;
    parser.tokenRaw = tokenRaw;
    parser.lastChar = lastChar;

    parser.startColumn = startColumn;
    parser.lastColumn = lastColumn;
    parser.startLine = startLine;
    parser.lastLine = lastLine;
    parser.lastIndex = lastIndex;
    parser.startIndex = startIndex;

    parser.tokenRegExp = tokenRegExp;
    return res;
}

export function escapeForPrinting(code: number): string {
    switch (code) {
        case Chars.Null:
            return '\\0';
        case Chars.Backspace:
            return '\\b';
        case Chars.Tab:
            return '\\t';
        case Chars.LineFeed:
            return '\\n';
        case Chars.VerticalTab:
            return '\\v';
        case Chars.FormFeed:
            return '\\f';
        case Chars.CarriageReturn:
            return '\\r';
        default:
            if (!mustEscape(code)) return fromCodePoint(code);
            if (code < 0x10) return `\\x0${code.toString(16)}`;
            if (code < 0x100) return `\\x${code.toString(16)}`;
            if (code < 0x1000) return `\\u0${code.toString(16)}`;
            if (code < 0x10000) return `\\u${code.toString(16)}`;
            return `\\u{${code.toString(16)}}`;
    }
}

export function isValidSimpleAssignmentTarget(node: any): boolean {
    if (node.type === 'Identifier' || node.type === 'MemberExpression') {
        return true;
    }
    return false;
}

export function getLocation(parser: Parser) {
    return {
        line: parser.startLine,
        column: parser.startColumn,
        index: parser.startIndex,
    };
}

export const toAssignable = (parser: Parser, context: Context, node: any) => {

    switch (node.type) {
        case 'Identifier':
        case 'ArrayPattern':
        case 'AssignmentPattern':
        case 'ObjectPattern':
        case 'RestElement':
        case 'MetaProperty':
            return;
        case 'ArrayExpression':
            node.type = 'ArrayPattern';
            for (let i = 0; i < node.elements.length; ++i) {
                // skip holes in pattern
                if (node.elements[i] !== null) {
                    toAssignable(parser, context, node.elements[i]);
                }
            }
            return;
        case 'ObjectExpression':
            node.type = 'ObjectPattern';

            for (let i = 0; i < node.properties.length; i++) {
                toAssignable(parser, context, node.properties[i]);
            }

            return;

        case 'Property':
            toAssignable(parser, context, node.value);
            return;

        case 'SpreadElement':
            node.type = 'RestElement';
            toAssignable(parser, context, node.argument);
            break;
        case 'AssignmentExpression':
            if (node.operator !== '=') {
                return report(parser, Errors.Unexpected);
            }
            node.type = 'AssignmentPattern';
            delete node.operator; // operator is not relevant for assignment pattern
            toAssignable(parser, context, node.left); // recursive descent
            return;

        case 'MemberExpression':
            if (!(context & Context.InParameter)) return;
            // Fall through

        default:
            report(parser, Errors.Unexpected);
    }
};

export function isIdentifier(context: Context, t: Token): boolean {

    if (context & Context.Strict) {
        if (t & Token.IsYield) return false;

        return (t & Token.IsIdentifier) === Token.IsIdentifier ||
            (t & Token.Contextual) === Token.Contextual;
    }

    return (t & Token.IsIdentifier) === Token.IsIdentifier ||
        (t & Token.Contextual) === Token.Contextual ||
        (t & Token.FutureReserved) === Token.FutureReserved;
}

export function isLexical(parser: Parser, context: Context): boolean {
    nextToken(parser, context);
    const {
        token
    } = parser;
    return !!(token & (Token.IsIdentifier | Token.IsBindingPattern | Token.IsYield | Token.IsAwait) ||
        token === Token.LetKeyword ||
        (token & Token.Contextual) === Token.Contextual);
}

export function isEndOfCaseOrDefaultClauses(parser: Parser): boolean {
    return parser.token === Token.DefaultKeyword ||
        parser.token === Token.RightBrace ||
        parser.token === Token.CaseKeyword;
}

export function nextTokenIsLeftParenOrPeriod(parser: Parser, context: Context): boolean {
    nextToken(parser, context);
    return parser.token === Token.LeftParen || parser.token === Token.Period;
}
export function nextTokenIsFuncKeywordOnSameLine(parser: Parser, context: Context): boolean {
    nextToken(parser, context);
    return !(parser.flags & Flags.NewLine) && parser.token === Token.FunctionKeyword;
}

export function isPropertyWithPrivateFieldKey(context: Context, expr: any): boolean {
    if (!expr.property) return false;
    return expr.property.type === 'PrivateName';
}

export const isPrologueDirective = (node: ESTree.Statement): node is ESTree.ExpressionStatement & {
    expression: ESTree.Literal & {
        value: string
    };
} => node.type === 'ExpressionStatement' && node.expression.type === 'Literal';


export function parseAndDisallowDestructuringAndBinding(parser: Parser, context: Context, callback: any) {
    parser.flags &= ~(Flags.AllowDestructuring | Flags.AllowBinding);
    return callback(parser, context);
}

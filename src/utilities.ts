import * as ESTree from './estree';
import { Chars } from './chars';
import { Errors, report, tolerant, ErrorMessages } from './errors';
import { Parser, Delegate, Location } from './types';
import { Token, tokenDesc } from './token';
import { scan } from './lexer/scan';
import { constructError } from './errors';
import { parseIdentifier } from './parser/expressions';
import { isValidIdentifierStart, isValidIdentifierPart, mustEscape } from './unicode';

// Context masks
export const enum Context {
    Empty                   = 0,
    OptionsNext             = 1 << 0,
    OptionsRanges           = 1 << 1,
    OptionsJSX              = 1 << 2,
    OptionsRaw              = 1 << 3,
    OptionsLoc              = 1 << 4,
    OptionsDelegate         = 1 << 5,
    OptionsImpliedStrict    = 1 << 6,
    OptionsGlobalReturn     = 1 << 7,
    OptionsComments         = 1 << 8,
    OptionsShebang          = 1 << 9,
    OptionsRawidentifiers   = 1 << 10,
    OptionsTolerant         = 1 << 11,
    OptionsNode             = 1 << 12,
    Strict                  = 1 << 13,
    Module                  = 1 << 14,
    TaggedTemplate          = 1 << 15,
    InClass                 = 1 << 16,
    AllowIn                 = 1 << 17,
    Async                   = 1 << 18,
    Yield                   = 1 << 19,
    InParameter             = 1 << 20,
    InFunctionBody          = 1 << 21,
    AllowSingleStatement    = 1 << 22,
    BlockScope              = 1 << 23,
    ForStatement            = 1 << 24,
    RequireIdentifier       = 1 << 25,
    Method                  = 1 << 26,
    AllowSuperProperty      = 1 << 27,
    InParen                 = 1 << 28,
    InJSXChild              = 1 << 29,
    DisallowEscapedKeyword  = 1 << 30,
}

// Mutual parser flags
export const enum Flags {
    None                    = 0,
    NewLine                 = 1 << 0,
    AllowBinding            = 1 << 1,
    AllowDestructuring      = 1 << 2,
    SimpleParameterList     = 1 << 3,
    InSwitchStatement       = 1 << 4,
    InIterationStatement    = 1 << 5,
    HasStrictReserved       = 1 << 6,
    HasOctal                = 1 << 7,
    SimpleAssignmentTarget  = 1 << 8,
    HasProtoField           = 1 << 9,
    StrictFunctionName      = 1 << 10,
    StrictEvalArguments     = 1 << 11,
    InFunctionBody          = 1 << 12,
    HasAwait                = 1 << 13,
    HasYield                = 1 << 14,
    EscapedKeyword          = 1 << 15,
    AllowBreakOrContinue = InSwitchStatement | InIterationStatement,
}

// Label tracking state
export const enum Labels {
    None        = 0,
    NotNested   = 1 << 0,
    Nested      = 1 << 1,
}

export const enum NumericState {
    None            = 0,
    SeenSeparator   = 1 << 0,
    EigthOrNine     = 1 << 1,
    Float           = 1 << 2,
    BigInt          = 1 << 3,
}

export const enum ScannerState {
    None        = 0,
    NewLine     = 1 << 0,
    LastIsCR    = 1 << 1,
}

export const enum ModifierState {
    None        = 0,
    Generator   = 1 << 0,
    Await       = 1 << 1,
}

export const enum CoverParenthesizedState {
    None,
    SequenceExpression  = 1 << 0,
    HasEvalOrArguments  = 1 << 1,
    HasReservedWords    = 1 << 2,
    HasYield            = 1 << 3,
    HasBinding          = 1 << 4,
}

export const enum Escape {
    Empty        = -1,
    StrictOctal  = -2,
    EightOrNine  = -3,
    InvalidHex   = -4,
    OutOfRange   = -5,
}

export const enum RegexFlags {
    Empty       = 0,
    IgnoreCase = 1 << 0,
    Global     = 1 << 1,
    Multiline  = 1 << 2,
    Unicode    = 1 << 3,
    Sticky     = 1 << 4,
    DotAll     = 1 << 5,
}

export const enum CoverCallState {
    Empty           = 0,
    SeenSpread      = 1 << 0,
    HasSpread       = 1 << 1,
    SimpleParameter = 1 << 2,
    EvalOrArguments = 1 << 3,
    Yield           = 1 << 4,
    Await           = 1 << 5,
}

export const enum RegexState {
    Empty  = 0,
    Escape = 0x1,
    Class  = 0x2,
}

// Shared between class expr / decl & object literal
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
    Heritage    = 1 << 9,
}

/**
 * Validate break and continue statement
 *
 * @param parser Parser object
 * @param label label
 * @param isContinue true if validation continue statement
 */
export function validateBreakOrContinueLabel(parser: Parser, context: Context, label: string, isContinue: boolean) {
    const state = hasLabel(parser, label);
    if (!state) tolerant(parser, context, Errors.UnknownLabel, label);
    if (isContinue && !(state & Labels.Nested)) tolerant(parser, context, Errors.IllegalContinue, label);
}

/**
 * Add label to the stack
 *
 * @param parser Parser object
 * @param label label
 */
export function addLabel(parser: Parser, label: string) {
    if (parser.labelSet === undefined) parser.labelSet = {};
    parser.labelSet['$' + label] = parser.token & Token.IsIterationStatement ? Labels.Nested : Labels.NotNested;
}

/**
 * Remove label from the stack
 *
 * @param parser Parser object
 * @param label label
 */
export function popLabel(parser: Parser, label: string) {
    parser.labelSet['$' + label] = Labels.None;
}

/**
 * Returns either true or false. Depends if the label exist.
 *
 * @param parser Parser object
 * @param label Label
 */
export function hasLabel(parser: Parser, label: string): Labels {
    return !parser.labelSet ? Labels.None : parser.labelSet['$' + label];
}

/**
 * Finish each the node for each parse. Set line / and column on the node if the
 * options are set for it
 *
 * @param parser Parser object
 * @param context Context masks
 * @param meta Line / column
 * @param node AST node
 */
export function finishNode < T extends ESTree.Node >(
    context: Context,
    parser: Parser,
    meta: Location,
    node: any,
): T {

    const { lastIndex, lastLine, lastColumn, sourceFile, index, delegate } = parser;

    if (context & Context.OptionsRanges) {
        node.start = meta.index;
        node.end = lastIndex;
    }

    if (context & Context.OptionsLoc) {

        node.loc = {
            start: {
                line: meta.line,
                column: meta.column,
            },
            end: {
                line: lastLine,
                column: lastColumn,
            },
        };

        if (sourceFile) node.loc.source = sourceFile;
    }

    if (context & Context.OptionsDelegate) (delegate as Delegate)(node, meta.index, index);

    return node;
}
/**
 * Consumes the next token. If the consumed token is not of the expected type
 * then report an error and return null. Otherwise return true.
 *
 * @param parser Parser object
 * @param context Context masks
 * @param t Token
 * @param Err Optionally error message to be thrown
 */
export function expect(parser: Parser, context: Context, t: Token, err: Errors = Errors.UnexpectedToken): boolean {
    if (parser.token !== t) report(parser, err, tokenDesc(parser.token));
    nextToken(parser, context);
    return true;
}

/**
 * If the next token matches the given token, this consumes the token
 * and returns true. Otherwise return false.
 *
 * @param parser Parser object
 * @param context Context masks
 * @param t Token
 */
export function consume(parser: Parser, context: Context, t: Token) {
    if (parser.token !== t) return false;
    nextToken(parser, context);
    return true;
}

/**
 * Advance and return the next token in the stream
 *
 * @param parser Parser object
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
 * Automatic Semicolon Insertion
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function consumeSemicolon(parser: Parser, context: Context): void | boolean {
    const { token } = parser;

    if (token & Token.ASI || parser.flags & Flags.NewLine) { // EOF, '}', ';'
        return consume(parser, context, Token.Semicolon);
    }
    report(parser, !(context & Context.Async) && token & Token.IsAwait ?
        Errors.AwaitOutsideAsync :
        Errors.UnexpectedToken, tokenDesc(token));
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
export function parseExpressionCoverGrammar < T >(
    parser: Parser,
    context: Context,
    callback: (parser: Parser, context: Context) => T,
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
        constructError(parser, context, index, line, column, error);
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
export function restoreExpressionCoverGrammar < T >(
    parser: Parser,
    context: Context,
    callback: (parser: Parser, context: Context) => T,
) {
    const prevFlags = parser.flags;
    const prevpendingExpressionError = parser.pendingExpressionError;
    parser.flags |= Flags.AllowBinding | Flags.AllowDestructuring;
    // Clear pending expression error
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
 * @param parser Parser object
 * @param context Context masks
 * @param state Modifier state
 * @param callback Callback function to be invoked
 * @param methodState Optional Objectstate.
 */

export function swapContext < T >(
    parser: Parser,
    context: Context,
    state: ModifierState,
    callback: (parser: Parser, context: Context, state: ObjectState) => T,
    methodState: ObjectState = ObjectState.None): T {

    context &= ~(Context.Async | Context.Yield | Context.InParameter);

    if (state & ModifierState.Generator) context |= Context.Yield;

    if (state & ModifierState.Await) context |= Context.Async;

    return callback(parser, context, methodState);
}

/**
 * Validates function params
 *
 * Note! In case anyone want to enable full scoping, replace 'paramSet' with an similiar
 * object on the parser object itself. Then push / set the tokenValue to
 * it an use an bitmask to mark it as an 'variable' not 'blockscope'. Then when
 * implementing lexical scoping, you can use that for validation.
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param params Array of token values
 */

export function validateParams(parser: Parser, context: Context, params: string[]) {
    const paramSet: any = new Map();
    for (let i = 0; i < params.length; i++) {
        const key = '@' + params[i];
        if (paramSet.get(key)) {
        tolerant(parser, context, Errors.ParamDupe);
        } else paramSet.set(key, true);
    }
}

/**
 * Reinterpret various expressions as pattern
 * This is only used for assignment and arrow parameter list
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param node AST node
 */

export const reinterpret = (parser: Parser, context: Context, node: any) => {

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
                    reinterpret(parser, context, node.elements[i]);
                }
            }
            return;
        case 'ObjectExpression':
            node.type = 'ObjectPattern';

            for (let i = 0; i < node.properties.length; i++) {
                reinterpret(parser, context, node.properties[i]);
            }

            return;

        case 'Property':
            reinterpret(parser, context, node.value);
            return;

        case 'SpreadElement':
            node.type = 'RestElement';
            if (node.argument.type !== 'ArrayExpression' &&
                node.argument.type !== 'ObjectExpression' &&
                !isValidSimpleAssignmentTarget(node.argument)) {
                tolerant(parser, context, Errors.RestDefaultInitializer);
              }

            reinterpret(parser, context, node.argument);
            break;
        case 'AssignmentExpression':
            node.type = 'AssignmentPattern';
            delete node.operator; // operator is not relevant for assignment pattern
            reinterpret(parser, context, node.left); // recursive descent
            return;

        case 'MemberExpression':
            if (!(context & Context.InParameter)) return;
            // Fall through

        default:
            tolerant(parser, context, context & Context.InParameter
                ? Errors.NotBindable
                : Errors.InvalidDestructuringTarget, node.type);
    }
};

/**
 * Does a lookahead.
 *
 * @param parser Parser object
 * @param context  Context masks
 * @param callback Callback function to be invoked
 */
export function lookahead < T >(parser: Parser, context: Context, callback: (parser: Parser, context: Context) => T): T {
    const { tokenValue, flags, line, column, startColumn, index, lastColumn, startLine, lastLine,  lastIndex, startIndex,
        tokenRaw, token, lastValue, tokenRegExp } = parser;
    const res = callback(parser, context);
    parser.index = index;
    parser.token = token;
    parser.tokenValue = tokenValue;
    parser.tokenValue = tokenValue;
    parser.flags = flags;
    parser.line = line;
    parser.column = column;
    parser.tokenRaw = tokenRaw;
    parser.lastValue = lastValue;
    parser.startColumn = startColumn;
    parser.lastColumn = lastColumn;
    parser.startLine = startLine;
    parser.lastLine = lastLine;
    parser.lastIndex = lastIndex;
    parser.startIndex = startIndex;
    parser.tokenRegExp = tokenRegExp;
    return res;
}

/**
 * Returns true if this an valid simple assignment target
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function isValidSimpleAssignmentTarget(node: ESTree.Node): boolean {
    return (node.type === 'Identifier' || node.type === 'MemberExpression') ? true : false;
}

/**
 * Get current node location
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function getLocation(parser: Parser): Location {
    return {
        line: parser.startLine,
        column: parser.startColumn,
        index: parser.startIndex,
    };
}

/**
 * Returns true if this is an valid identifier
 *
 * @param context  Context masks
 * @param t  Token
 */
export function isValidIdentifier(context: Context, t: Token): boolean {

    if (context & Context.Strict) {

        if (context & Context.Module && t & Token.IsAwait) return false;
        if (t & Token.IsYield) return false;

        return (t & Token.IsIdentifier) === Token.IsIdentifier ||
            (t & Token.Contextual) === Token.Contextual;
    }

    return (t & Token.IsIdentifier) === Token.IsIdentifier ||
        (t & Token.Contextual) === Token.Contextual ||
        (t & Token.FutureReserved) === Token.FutureReserved;
}

/**
 * Returns true if this an valid lexical binding and not an identifier
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function isLexical(parser: Parser, context: Context): boolean {
    nextToken(parser, context);
    const { token } = parser;
    return !!(token & (Token.IsIdentifier | Token.IsBindingPattern | Token.IsYield | Token.IsAwait) ||
        token === Token.LetKeyword ||
        (token & Token.Contextual) === Token.Contextual);
}

/**
 * Returns true if this is end of case or default clauses
 *
 * @param parser Parser object
 */
export function isEndOfCaseOrDefaultClauses(parser: Parser): boolean {
    return parser.token === Token.DefaultKeyword ||
        parser.token === Token.RightBrace ||
        parser.token === Token.CaseKeyword;
}

/**
 * Validates if the next token in the stream is a left paren or a period
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function nextTokenIsLeftParenOrPeriod(parser: Parser, context: Context): boolean {
    nextToken(parser, context);
    return parser.token === Token.LeftParen || parser.token === Token.Period;
}

/**
 * Validates if the next token in the stream is a identifier or left paren
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function nextTokenisIdentifierOrParen(parser: Parser, context: Context): boolean | number {
    nextToken(parser, context);
    const { token } = parser;
    return token & (Token.IsIdentifier | Token.IsYield) || token === Token.LeftParen;
}

/**
 * Validates if the next token in the stream is left parenthesis.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function nextTokenIsLeftParen(parser: Parser, context: Context): boolean {
    nextToken(parser, context);
    return parser.token === Token.LeftParen || parser.token === Token.LeftBracket;
}

/**
 * Validates if the next token in the stream is a function keyword on the same line.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function nextTokenIsFuncKeywordOnSameLine(parser: Parser, context: Context): boolean {
    nextToken(parser, context);
    return !(parser.flags & Flags.NewLine) && parser.token === Token.FunctionKeyword;
}

/**
 * Checks if the property has any private field key
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function isPropertyWithPrivateFieldKey(expr: any): boolean {
    return !expr.property ? false : expr.property.type === 'PrivateName';
}

/**
 * Validates an identifier and either parse it or throw
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseAndValidateIdentifier(parser: Parser, context: Context): void | ESTree.Identifier {

    const { token} = parser;

    if (context & Context.Strict) {

        // Module code is also "strict mode code"
        if (context & Context.Module && token & Token.IsAwait) {
            tolerant(parser, context, Errors.DisallowedInContext, tokenDesc(token));
        }

        if (token & Token.IsYield) tolerant(parser, context, Errors.DisallowedInContext, tokenDesc(token));

        if ((token & Token.IsIdentifier) === Token.IsIdentifier ||
            (token & Token.Contextual) === Token.Contextual) {
            return parseIdentifier(parser, context);
        }

        report(parser, Errors.UnexpectedToken, tokenDesc(token));
    }

    if (context & Context.Yield && token & Token.IsYield) {
        tolerant(parser, context, Errors.DisallowedInContext, tokenDesc(token));
    } else if (context & Context.Async && token & Token.IsAwait) {
        tolerant(parser, context, Errors.DisallowedInContext, tokenDesc(token));
    }

    if ((token & Token.IsIdentifier) === Token.IsIdentifier ||
        (token & Token.Contextual) === Token.Contextual ||
        (token & Token.FutureReserved) === Token.FutureReserved) {
        return parseIdentifier(parser, context);
    }
    report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
}

export function nameIsArgumentsOrEval(value: string): boolean {
    return value === 'eval' || value === 'arguments';
}

/**
 * Records an error from current position. If we report an error later, we'll do it from
 * this position.
 *
 * @param parser Parser object
 */
export function setPendingError(parser: Parser) {

    parser.errorLocation = {
        line: parser.line,
        column: parser.column,
        index: parser.index,
    };
}

/**
 * Returns tagName for JSX element
 *
 * @param elementName JSX Element name
 */
export function isEqualTagNames(
    elementName: ESTree.JSXNamespacedName | ESTree.JSXIdentifier | ESTree.JSXMemberExpression,
): any {
    switch (elementName.type) {
        case 'JSXIdentifier':
            return elementName.name;
        case 'JSXNamespacedName':
            return isEqualTagNames(elementName.namespace) + ':' + isEqualTagNames(elementName.name);
        case 'JSXMemberExpression':
            return isEqualTagNames(elementName.object) + '.' + isEqualTagNames(elementName.property);

            /* istanbul ignore next */
        default:
            // ignore
    }
}

/**
 * Returns true if this is an instance field ( stage 3 proposal)
 *
 * @param parser Parser object
 */
export function isInstanceField(parser: Parser): boolean {
    const { token } = parser;
    return token === Token.RightBrace || token === Token.Semicolon || token === Token.Assign;
}
/**
 *
 * @param parser Parser object
 * @param context Context masks
 * @param expr  AST expressions
 * @param prefix
 */
export function validateUpdateExpression(parser: Parser, context: Context, expr: ESTree.Expression, prefix: string) {
    if (context & Context.Strict && nameIsArgumentsOrEval((expr as ESTree.Identifier).name)) {
        tolerant(parser, context, Errors.StrictLHSPrefixPostFix, prefix);
    }
    if (!isValidSimpleAssignmentTarget(expr)) {
        tolerant(parser, context, Errors.InvalidLHSInAssignment);
    }

}


/**
 * Record expression error
 * 
 * @param parser Parser object
 * @param error Error message
 */
export function recordExpressionError(parser: Parser, type: Errors) {
    parser.pendingExpressionError = {
        error: ErrorMessages[type],
        line: parser.startLine,
        column: parser.startColumn,
        index: parser.startIndex,
    };
}

/**
 * Validate coer parenthesized expression
 * 
 * @param parser Parser object
 * @param state CoverParenthesizedState
 */
export function validateCoverParenthesizedExpression(
    parser: Parser,
    state: CoverParenthesizedState
): CoverParenthesizedState {
    const { token } = parser;
    if (token & Token.IsBindingPattern) {
        parser.flags |= Flags.SimpleParameterList;
    } else {
        if ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
            setPendingError(parser);
            state |= CoverParenthesizedState.HasEvalOrArguments;
        } else if ((token & Token.FutureReserved) === Token.FutureReserved) {
            setPendingError(parser);
            state |= CoverParenthesizedState.HasReservedWords;
        } else if ((token & Token.IsAwait) === Token.IsAwait) {
            setPendingError(parser);
            parser.flags |= Flags.HasAwait;
        }
    }
    return state;
}

/**
 * Validate coer parenthesized expression
 * 
 * @param parser Parser object
 * @param state CoverParenthesizedState
 */
export function validateAsyncArgumentList(
    parser: Parser,
    context: Context,
    state: CoverCallState
): CoverCallState {
    const { token } = parser;
    if (!(parser.flags & Flags.AllowBinding)) {
        tolerant(parser, context, Errors.NotBindable);
    } else if (token & Token.IsBindingPattern) {
        parser.flags |= Flags.SimpleParameterList;
    } else {
        if ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
            setPendingError(parser);
            state |= CoverCallState.EvalOrArguments;
        } else if ((token & Token.IsAwait) === Token.IsAwait) {
            setPendingError(parser);
            state |= CoverCallState.Await;
        } else if ((token & Token.IsYield) === Token.IsYield) {
            setPendingError(parser);
            state |= CoverCallState.Yield;
        }
        
    }
    return state;
}
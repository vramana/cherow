import * as ESTree from './estree';
import { Token } from './token';
import { Errors } from './errors';
export declare const enum Context {
    Empty = 0,
    OptionsNext = 1,
    OptionsRanges = 2,
    OptionsJSX = 4,
    OptionsRaw = 8,
    OptionsWebCompat = 16,
    OptionsLoc = 32,
    OptionsGlobalReturn = 64,
    OptionsExperimental = 128,
    OptionsNative = 256,
    RequireIdentifier = 512,
    Strict = 1024,
    Module = 2048,
    TopLevel = 4096,
    DisallowInContext = 8192,
    InClass = 16384,
    AllowPossibleRegEx = 32768,
    TaggedTemplate = 65536,
    OptionsDirectives = 131072,
    SuperProperty = 262144,
    SuperCall = 524288,
    ParentheziedContext = 1048576,
    YieldContext = 2097152,
    AwaitContext = 4194304,
    InArgList = 8388608,
    InConstructor = 16777216,
    InMethod = 33554432,
    AllowNewTarget = 67108864,
    AllowReturn = 134217728,
    Expression = 268435456,
    OptionsGlobalAwait = 536870912,
    LocationTracking = 34
}
export declare const enum Flags {
    Empty = 0,
    NewLine = 1,
    LastIsCR = 2,
    Float = 4,
    Octal = 8,
    Binary = 16,
    SeenPrototype = 32,
    SimpleParameterList = 64,
    HasPrivateName = 128,
    InArrowContext = 256,
    HasStrictReserved = 512,
    StrictEvalArguments = 1024,
    HasConstructor = 2048,
    HasAwait = 4096,
    HasYield = 8192,
    ContainsSeparator = 16384
}
export declare const enum Type {
    None = 0,
    ArgList = 1,
    Variable = 2,
    Let = 4,
    Const = 8,
    ClassExprDecl = 16,
    ConciseBody = 64
}
export declare const enum Origin {
    None = 0,
    Statement = 1,
    ForStatement = 2,
    Export = 4,
    ExportDefault = 8,
    CatchClause = 16,
    AsyncArgs = 32,
    ArgList = 64,
    ClassExprDecl = 128,
    Declaration = 256,
    AsyncArrow = 512,
    Arrow = 1024,
    AsyncFunction = 2048,
    ArrayLiteral = 4096,
    ObjectExpression = 8192
}
export declare const enum ScopeType {
    None = 0,
    BlockStatement = 1,
    ForStatement = 2,
    SwitchStatement = 3,
    CatchClause = 4,
    ArgumentList = 5
}
export declare const enum Modifiers {
    None = 0,
    Method = 1,
    Computed = 2,
    Shorthand = 4,
    Generator = 8,
    Async = 16,
    Static = 32,
    Constructor = 64,
    ClassField = 128,
    Getter = 256,
    Setter = 512,
    Extends = 1024,
    GetSet = 768
}
export declare const enum Arrows {
    None = 0,
    ConciseBody = 1,
    Plain = 2,
    Async = 4,
    Parenthesized = 6
}
export declare const enum Grammar {
    None = 0,
    Bindable = 1,
    Assignable = 2,
    NotBindable = 4,
    NotAssignable = 8,
    NotAssignbleOrBindable = 12,
    BindableAndAssignable = 3
}
export declare const enum ParenthesizedState {
    None = 0,
    ReservedWords = 1,
    Yield = 2,
    Await = 4,
    SequenceExpression = 8,
    Arrow = 16
}
export declare type OnComment = void | ESTree.Comment[] | ((type: string, value: string, start?: number, end?: number) => any);
export declare type OnToken = void | Token[] | ((token: Token, start?: number, end?: number) => any);
export interface ScopeState {
    var: any;
    lexVars: any;
    lex: any;
}
export interface LexicalScope {
    childScope: any;
    flags: ScopeType;
    functions: void | {
        pattern?: string;
        flags?: string;
    };
}
export interface ParserState {
    source: string;
    onComment: any;
    onToken: any;
    flags: Flags;
    grammar: Grammar;
    index: number;
    line: number;
    startIndex: number;
    endIndex: number;
    startLine: number;
    startColumn: number;
    column: number;
    token: Token;
    tokenValue: any;
    tokenRaw: string;
    currentChar: any;
    length: number;
    lastRegExpError: any;
    numCapturingParens: number;
    largestBackReference: number;
    lastChar: number;
    assignable: boolean;
    bindable: boolean;
    exportedNames: any[];
    exportedBindings: any[];
    labelSet: any;
    labelSetStack: {
        [key: string]: boolean;
    }[];
    iterationStack: (boolean | LabelState)[];
    switchStatement: LabelState;
    iterationStatement: LabelState;
    labelDepth: number;
    functionBoundaryStack: any;
    pendingCoverInitializeError: Errors | null;
    tokenRegExp: void | {
        pattern: string;
        flags: string;
    };
}
export declare function unreachable(...values: never[]): never;
export declare function pushComment(context: Context, array: any[]): any;
export declare function pushToken(context: Context, array: any[]): any;
export declare function finishNode<T extends ESTree.Node>(state: ParserState, context: Context, start: number, node: T): T;
export declare function optional(state: ParserState, context: Context, t: Token): boolean;
export declare function expect(state: ParserState, context: Context, t: Token): void;
export declare function consumeSemicolon(state: ParserState, context: Context): void | boolean;
export declare function addVariable(state: ParserState, context: Context, scope: any, bindingType: Type, origin: Origin, checkDuplicates: boolean, isVarDecl: boolean, key: string): void;
export declare function checkForDuplicateLexicals(scope: ScopeState, key: string, context: Context, origin: Origin): boolean;
export declare function checkIfExistInLexicalBindings(state: ParserState, context: Context, scope: ScopeState, origin: Origin, skipParent: any): boolean;
export declare function checkIfExistInLexicalParentScope(state: ParserState, context: Context, scope: ScopeState, origin: Origin, key: string): void;
export declare function addFunctionName(state: any, context: Context, scope: any, bindingType: Type, origin: Origin, isVarDecl: boolean): void;
export declare function validateFunctionArgs(state: ParserState, arg: any, isSimple: boolean): void;
export declare function lookAheadOrScan<T>(state: ParserState, context: Context, callback: (state: ParserState, context: Context) => T, isLookahead: boolean): T;
export declare function isLexical(state: ParserState, context: Context): boolean;
export declare function reinterpret(state: ParserState, ast: any): void;
export declare function nameIsArgumentsOrEval(value: string): boolean;
export declare function isValidIdentifier(context: Context, t: Token): boolean;
export declare function validateBindingIdentifier(state: ParserState, context: Context, type: Type, token?: Token): boolean;
export declare function addToExportedNamesAndCheckForDuplicates(state: ParserState, exportedName: any): void;
export declare function addToExportedBindings(state: ParserState, exportedName: any): void;
export declare function nextTokenIsFuncKeywordOnSameLine(state: ParserState, context: Context): boolean;
export declare function addLabel(state: ParserState, label: string): void;
export declare function addCrossingBoundary(state: ParserState): void;
export declare function validateContinueLabel(state: ParserState, label: string): void;
export declare function validateBreakStatement(state: ParserState, label: any): void;
export declare function getLabel(state: ParserState, label: string, iterationStatement?: boolean, crossBoundary?: boolean): LabelState;
export declare function addVariableAndDeduplicate(state: ParserState, context: Context, scope: ScopeState, type: Type, origin: Origin, isVarDecl: boolean, name: string): void;
export declare function createScope(type: ScopeType): ScopeState;
export declare function createSubScope(parent: ScopeState, type: ScopeType): ScopeState;
export declare function nextTokenIsLeftParenOrPeriod(state: ParserState, context: Context): boolean;
export declare function secludeGrammar<T>(state: ParserState, context: Context, minprec: number | undefined, callback: (state: ParserState, context: Context, precedence: number) => T): T;
export declare function acquireGrammar<T>(state: ParserState, context: Context, minprec: number, callback: (state: ParserState, context: Context, precedence: number) => T): T;
export declare function isValidSimpleAssignmentTarget(node: ESTree.Node): boolean;
//# sourceMappingURL=common.d.ts.map
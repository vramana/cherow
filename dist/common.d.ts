import * as ESTree from './estree';
import { Token } from './token';
export declare const enum Context {
    Empty = 0,
    OptionsNext = 1,
    OptionsRanges = 2,
    OptionsJSX = 4,
    OptionsRaw = 8,
    OptionsDisableWebCompat = 16,
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
    InGlobal = 1048576,
    YieldContext = 2097152,
    AwaitContext = 4194304,
    InArgList = 8388608,
    InConstructor = 16777216,
    InMethod = 33554432,
    AllowNewTarget = 67108864,
    AllowReturn = 134217728
}
export declare const enum Flags {
    Empty = 0,
    NewLine = 1,
    LastIsCR = 2,
    Float = 4,
    Octal = 8,
    Binary = 16,
    SeenPrototype = 32,
    SimpleParameterList = 64
}
export declare const enum Type {
    None = 0,
    ArgList = 1,
    Variable = 2,
    Let = 4,
    Const = 8,
    ClassExprDecl = 16
}
export declare const enum Origin {
    None = 0,
    Statement = 1,
    ForStatement = 2,
    Export = 4,
    CatchClause = 8,
    AsyncArgs = 16,
    ArgList = 32,
    ClassExprDecl = 64,
    Declaration = 128
}
export declare const enum ScopeType {
    None = 0,
    BlockStatement = 1,
    ForStatement = 2,
    SwitchStatement = 3,
    CatchClause = 4,
    ArgumentList = 5
}
export declare const enum LabelledState {
    None = 0,
    AllowAsLabelled = 1,
    Disallow = 2
}
export declare const enum ObjectState {
    None = 0,
    Method = 1,
    Computed = 2,
    Shorthand = 4,
    Generator = 8,
    Async = 16,
    Static = 32,
    Constructor = 64,
    Getter = 128,
    Setter = 256,
    GetSet = 384
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
    index: number;
    line: number;
    startIndex: number;
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
    inCatch: boolean;
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
    arrowScope: any;
    tokenRegExp: void | {
        pattern: string;
        flags: string;
    };
}
export declare function unimplemented(): never;
export declare function unreachable(...values: never[]): never;
export declare function pushComment(context: Context, array: any[]): any;
export declare function pushToken(context: Context, array: any[]): any;
export declare function finishNode<T extends ESTree.Node>(context: Context, start: number, end: number, node: T): T;
export declare function optional(state: ParserState, context: Context, token: Token): boolean;
export declare function expect(state: ParserState, context: Context, t: Token): boolean;
export declare function consumeSemicolon(state: ParserState, context: Context): void | boolean;
export declare function addVariable(state: ParserState, context: Context, scope: any, bindingType: Type, checkDuplicates: boolean, isVariableDecl: boolean, key: string): void;
export declare function checkForDuplicateLexicals(scope: ScopeState, key: string, context: Context): boolean;
export declare function checkIfExistInLexicalBindings(state: ParserState, context: Context, scope: ScopeState, skipParent?: any): boolean;
export declare function checkIfExistInLexicalParentScope(state: ParserState, context: Context, scope: ScopeState, key: any): void;
export declare function addFunctionName(state: any, context: Context, scope: any, bindingType: Type, isVariableDecl: boolean): void;
export declare function checkFunctionsArgForDuplicate(state: ParserState, lex: any, wereSimpleArgs: boolean): void;
export declare function lookAheadOrScan<T>(state: ParserState, context: Context, callback: (state: ParserState, context: Context) => T, isLookahead: boolean): T;
export declare function isLexical(state: ParserState, context: Context): boolean;
export declare function reinterpret(ast: any): void;
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
export declare function addVariableAndDeduplicate(state: ParserState, context: Context, scope: ScopeState, type: Type, isVariableDecl: boolean, name: string): void;
export declare function createScope(type: ScopeType): ScopeState;
export declare function createSubScope(parent: ScopeState, type: ScopeType): ScopeState;
export declare function nextTokenIsLeftParenOrPeriod(state: ParserState, context: Context): boolean;
export declare function nextTokenIsLeftParen(parser: ParserState, context: Context): boolean;
//# sourceMappingURL=common.d.ts.map
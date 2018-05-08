import * as ESTree from './estree';
import { Errors } from './errors';
import { Parser, Location } from './types';
import { Token } from './token';
export declare const enum Context {
    Empty = 0,
    OptionsNext = 1,
    OptionsRanges = 2,
    OptionsJSX = 4,
    OptionsRaw = 8,
    OptionsLoc = 16,
    OptionsGlobalReturn = 32,
    OptionsComments = 64,
    OptionsShebang = 128,
    OptionsRawidentifiers = 256,
    OptionsTolerant = 512,
    OptionsNode = 1024,
    OptionsExperimental = 2048,
    Strict = 4096,
    Module = 8192,
    TaggedTemplate = 16384,
    InClass = 32768,
    AllowIn = 65536,
    Async = 131072,
    Yield = 262144,
    InParameter = 524288,
    InFunctionBody = 1048576,
    AllowSingleStatement = 2097152,
    BlockScope = 4194304,
    ForStatement = 8388608,
    RequireIdentifier = 16777216,
    Method = 33554432,
    AllowSuperProperty = 67108864,
    InParen = 134217728,
    InJSXChild = 268435456,
    DisallowEscapedKeyword = 536870912,
    AllowDecorator = 1073741824,
}
export declare const enum Flags {
    None = 0,
    NewLine = 1,
    AllowBinding = 2,
    AllowDestructuring = 4,
    SimpleParameterList = 8,
    InSwitchStatement = 16,
    InIterationStatement = 32,
    HasStrictReserved = 64,
    HasOctal = 128,
    SimpleAssignmentTarget = 256,
    HasProtoField = 512,
    StrictFunctionName = 1024,
    StrictEvalArguments = 2048,
    InFunctionBody = 4096,
    HasAwait = 8192,
    HasYield = 16384,
    EscapedKeyword = 32768,
    AllowBreakOrContinue = 48,
}
export declare const enum Labels {
    None = 0,
    NotNested = 1,
    Nested = 2,
}
export declare const enum NumericState {
    None = 0,
    SeenSeparator = 1,
    EigthOrNine = 2,
    Float = 4,
    BigInt = 8,
}
export declare const enum ScannerState {
    None = 0,
    NewLine = 1,
    LastIsCR = 2,
}
export declare const enum ModifierState {
    None = 0,
    Generator = 1,
    Await = 2,
}
export declare const enum CoverParenthesizedState {
    None = 0,
    SequenceExpression = 1,
    HasEvalOrArguments = 2,
    HasReservedWords = 4,
    HasYield = 8,
    HasBinding = 16,
}
export declare const enum Escape {
    Empty = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5,
}
export declare const enum RegexFlags {
    Empty = 0,
    IgnoreCase = 1,
    Global = 2,
    Multiline = 4,
    Unicode = 8,
    Sticky = 16,
    DotAll = 32,
}
export declare const enum CoverCallState {
    Empty = 0,
    SeenSpread = 1,
    HasSpread = 2,
    SimpleParameter = 4,
    EvalOrArguments = 8,
    Yield = 16,
    Await = 32,
}
export declare const enum RegexState {
    Empty = 0,
    Escape = 1,
    Class = 2,
}
export declare const enum ObjectState {
    None = 0,
    Async = 1,
    Generator = 2,
    Getter = 4,
    Setter = 8,
    Computed = 16,
    Method = 32,
    Shorthand = 64,
    Static = 128,
    Constructor = 256,
    Heritage = 512,
}
export declare function validateBreakOrContinueLabel(parser: Parser, context: Context, label: string, isContinue: boolean): void;
export declare function addLabel(parser: Parser, label: string): void;
export declare function popLabel(parser: Parser, label: string): void;
export declare function hasLabel(parser: Parser, label: string): Labels;
export declare function finishNode<T extends ESTree.Node>(context: Context, parser: Parser, meta: Location, node: any): T;
export declare function expect(parser: Parser, context: Context, token: Token, err?: Errors): boolean;
export declare function consume(parser: Parser, context: Context, token: Token): boolean;
export declare function nextToken(parser: Parser, context: Context): Token;
export declare const hasBit: (mask: number, flags: number) => boolean;
export declare function consumeSemicolon(parser: Parser, context: Context): void | boolean;
export declare function parseExpressionCoverGrammar<T>(parser: Parser, context: Context, callback: (parser: Parser, context: Context) => T): T;
export declare function restoreExpressionCoverGrammar<T>(parser: Parser, context: Context, callback: (parser: Parser, context: Context) => T): T;
export declare function swapContext<T>(parser: Parser, context: Context, state: ModifierState, callback: (parser: Parser, context: Context, state: ObjectState) => T, methodState?: ObjectState): T;
export declare function validateParams(parser: Parser, context: Context, params: string[]): void;
export declare const reinterpret: (parser: Parser, context: Context, node: any) => void;
export declare function lookahead<T>(parser: Parser, context: Context, callback: (parser: Parser, context: Context) => T): T;
export declare function isValidSimpleAssignmentTarget(node: ESTree.Node): boolean;
export declare function getLocation(parser: Parser): Location;
export declare function isValidIdentifier(context: Context, t: Token): boolean;
export declare function isLexical(parser: Parser, context: Context): boolean;
export declare function isEndOfCaseOrDefaultClauses(parser: Parser): boolean;
export declare function nextTokenIsLeftParenOrPeriod(parser: Parser, context: Context): boolean;
export declare function nextTokenisIdentifierOrParen(parser: Parser, context: Context): boolean | number;
export declare function nextTokenIsLeftParen(parser: Parser, context: Context): boolean;
export declare function nextTokenIsFuncKeywordOnSameLine(parser: Parser, context: Context): boolean;
export declare function isPropertyWithPrivateFieldKey(expr: any): boolean;
export declare function parseAndValidateIdentifier(parser: Parser, context: Context): void | ESTree.Identifier;
export declare function nameIsArgumentsOrEval(value: string): boolean;
export declare function setPendingError(parser: Parser): void;
export declare function isEqualTagNames(elementName: ESTree.JSXNamespacedName | ESTree.JSXIdentifier | ESTree.JSXMemberExpression): string;
export declare function isInstanceField(parser: Parser): boolean;
export declare function validateUpdateExpression(parser: Parser, context: Context, expr: ESTree.Expression, prefix: string): void;
export declare function setPendingExpressionError(parser: Parser, type: Errors): void;
export declare function validateCoverParenthesizedExpression(parser: Parser, state: CoverParenthesizedState): CoverParenthesizedState;
export declare function validateAsyncArgumentList(parser: Parser, context: Context, state: CoverCallState): CoverCallState;

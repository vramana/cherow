import * as ESTree from './estree';
import { Token } from './token';
import { ParserState, Location } from './types';
export declare const enum Context {
    Empty = 0,
    OptionsRaw = 1,
    OptionsNext = 2,
    OptionsLoc = 4,
    OptionsRanges = 8,
    OptionsJSX = 16,
    OptionsRawidentifiers = 32,
    OptionsGlobalReturn = 64,
    OptionsShebang = 128,
    OptionsComments = 256,
    OptionsExperimental = 512,
    ExpressionStart = 1024,
    InGenerator = 2048,
    InAsync = 4096,
    InParam = 8192,
    Strict = 16384,
    Module = 32768,
    TaggedTemplate = 65536,
    Tokenize = 131072,
    InClass = 262144,
    NewTarget = 524288,
    InFunctionBody = 1048576,
    DisallowIn = 2097152,
    RequireIdentifier = 4194304,
    DisallowGenerator = 8388608,
    InJSXChild = 16777216
}
export declare const enum Flags {
    Empty = 0,
    LineTerminator = 1,
    HasOctal = 2,
    EdgeCase = 4,
    SimpleParameterList = 8
}
export declare const enum BindingOrigin {
    Empty = 0,
    ForStatement = 1,
    FunctionArgs = 2,
    CatchClause = 4,
    Export = 8,
    Import = 16,
    Statement = 32
}
export declare const enum BindingType {
    Empty = 0,
    Args = 1,
    Var = 2,
    Let = 4,
    Const = 8,
    Class = 16,
    Variable = 14
}
export declare const enum LabelledFunctionState {
    Allow = 0,
    Disallow = 1
}
export declare function finishNode<T extends ESTree.Node>(state: ParserState, context: Context, meta: Location, node: any): T;
export declare function getLocation(state: ParserState): Location;
export declare function optional(state: ParserState, context: Context, token: Token): boolean;
export declare function expect(state: ParserState, context: Context, t: Token): boolean;
export declare function nextTokenIsLeftParenOrPeriod(state: ParserState, context: Context): boolean;
export declare function nextTokenIsIdentifierOrLeftParen(state: ParserState, context: Context): number | boolean;
export declare function nextTokenIsFuncKeywordOnSameLine(state: ParserState, context: Context): boolean;
export declare function isLexical(state: ParserState, context: Context): boolean;
export declare function consumeSemicolon(state: ParserState, context: Context): void | boolean;
export declare function isStartOfExpression(t: Token): boolean;
export declare function addLabel(state: ParserState, label: string): void;
export declare function addCrossingBoundary(state: ParserState): void;
export declare function validateContinueLabel(state: ParserState, label: string): void;
export declare function validateBreakStatement(state: ParserState, label: any): void;
export declare function getLabel(state: ParserState, label: string, iterationStatement?: boolean, crossBoundary?: boolean): LabelState;
export declare function reinterpret(state: ParserState, context: Context, node: any): void;
export declare function isEqualTagNames(elementName: ESTree.JSXNamespacedName | ESTree.JSXIdentifier | ESTree.JSXMemberExpression): string;
//# sourceMappingURL=common.d.ts.map
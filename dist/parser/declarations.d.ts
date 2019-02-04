import * as ESTree from '../estree';
import { Context, ParserState, Type, Origin, ScopeState } from '../common';
export declare function parseClassDeclaration(state: ParserState, context: Context, scope: ScopeState): ESTree.ClassDeclaration;
export declare function parseFunctionDeclaration(state: ParserState, context: Context, scope: ScopeState, origin: Origin, isAsync: boolean): ESTree.FunctionDeclaration;
export declare function parseHostedClassDeclaration(state: ParserState, context: Context, scope: ScopeState, isNotDefault: boolean): ESTree.ClassDeclaration;
export declare function parseHoistableFunctionDeclaration(state: ParserState, context: Context, scope: ScopeState, origin: Origin, isAsync: boolean): ESTree.FunctionDeclaration;
export declare function parseLexicalDeclaration(state: ParserState, context: Context, type: Type, origin: Origin, scope: ScopeState): ESTree.VariableDeclaration;
export declare function parseVariableDeclarationList(state: ParserState, context: Context, type: Type, origin: Origin, checkDuplicates: boolean, scope: ScopeState): ESTree.VariableDeclarator[];
export declare function isInOrOf(state: ParserState): boolean;
//# sourceMappingURL=declarations.d.ts.map
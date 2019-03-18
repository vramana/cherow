import * as ESTree from '../estree';
import { Context, ParserState, Type, Origin, ScopeState } from '../common';
export declare function parseClassDeclaration(state: ParserState, context: Context, scope: ScopeState): ESTree.ClassDeclaration;
export declare function parseFunctionDeclaration(state: ParserState, context: Context, scope: ScopeState, origin: Origin, isAsync: 0 | 1): ESTree.FunctionDeclaration;
export declare function parseHostedClassDeclaration(state: ParserState, context: Context, scope: ScopeState, isNotDefault: 0 | 1): ESTree.ClassDeclaration;
export declare function parseHoistableFunctionDeclaration(state: ParserState, context: Context, scope: ScopeState, origin: Origin, isAsync: 0 | 1): ESTree.FunctionDeclaration;
export declare function parseLexicalDeclaration(state: ParserState, context: Context, type: Type, origin: Origin, scope: ScopeState): ESTree.VariableDeclaration;
export declare function parseVariableDeclarationList(state: ParserState, context: Context, type: Type, origin: Origin, checkDuplicates: 0 | 1, scope: ScopeState): ESTree.VariableDeclarator[];
//# sourceMappingURL=declarations.d.ts.map
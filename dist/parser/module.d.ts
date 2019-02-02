import * as ESTree from '../estree';
import { Context, ParserState, Origin, ScopeState } from '../common';
export declare function parseModuleItem(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[];
export declare function parseImportDeclaration(state: ParserState, context: Context, scope: ScopeState): any;
export declare function parseAsyncFunctionOrAssignmentExpression(state: ParserState, context: Context, scope: ScopeState, origin: Origin): ESTree.FunctionDeclaration | ESTree.AssignmentExpression;
//# sourceMappingURL=module.d.ts.map
import { ParserState, Location } from './../types';
import { Context, BindingType, BindingOrigin } from '../common';
import * as ESTree from '../estree';
export declare function parseClassDeclaration(state: ParserState, context: Context): any;
export declare function parseFunctionDeclaration(state: ParserState, context: Context, isAsync: boolean, pos?: Location): ESTree.FunctionDeclaration;
export declare function parseVariableDeclarationList(state: ParserState, context: Context, type: BindingType, origin: BindingOrigin): ESTree.VariableDeclarator[];
export declare function isInOrOf(state: ParserState): boolean;
//# sourceMappingURL=declarations.d.ts.map
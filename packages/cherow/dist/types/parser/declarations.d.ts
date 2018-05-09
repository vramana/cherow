import * as ESTree from '../estree';
import { Parser } from '../types';
import { Context } from '../utilities';
export declare function parseClassDeclaration(parser: Parser, context: Context): ESTree.ClassDeclaration;
export declare function parseFunctionDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration;
export declare function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration;
export declare function parseVariableDeclarationList(parser: Parser, context: Context, isConst: boolean): ESTree.VariableDeclarator[];

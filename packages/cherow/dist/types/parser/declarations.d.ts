import * as ESTree from '../estree';
import { IParser } from '../types';
import { Context } from '../utilities';
export declare function parseClassDeclaration(parser: IParser, context: Context): ESTree.ClassDeclaration;
export declare function parseFunctionDeclaration(parser: IParser, context: Context): ESTree.FunctionDeclaration;
export declare function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser: IParser, context: Context): ESTree.FunctionDeclaration;
export declare function parseVariableDeclarationList(parser: IParser, context: Context, isConst: boolean): ESTree.VariableDeclarator[];

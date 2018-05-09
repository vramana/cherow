import { Parser, ESTree, Context } from 'cherow';
export declare function parseClassDeclaration(parser: Parser, context: Context): ESTree.ClassDeclaration;
export declare function parseFunctionDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration;
export declare function parseAsyncFunctionOrAsyncGeneratorDeclaration(parser: Parser, context: Context): ESTree.FunctionDeclaration;
export declare function parseVariableDeclarationList(parser: Parser, context: Context, isConst: boolean): ESTree.VariableDeclarator[];

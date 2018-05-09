import { ESTree, Context, Parser } from 'cherow';
export declare function parseExpressionOrDeclareStatement(parser: Parser, context: Context): any;
export declare function parseVariableStatement(parser: Parser, context: Context, shouldConsume?: boolean): ESTree.VariableDeclaration;

import { ESTree, Context, Parser } from 'cherow';
/**
 * Parse either expression statement or declare (TypeScript)
 *
 * @export
 * @param {Parser} parser Parser object
 * @param {Context} context Context masks
 * @returns {*}
 */
export declare function parseExpressionOrDeclareStatement(parser: Parser, context: Context): any;
export declare function parseVariableStatement(parser: Parser, context: Context, shouldConsume?: boolean): ESTree.VariableDeclaration;

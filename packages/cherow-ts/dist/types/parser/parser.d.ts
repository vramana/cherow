import { ESTree, Parser, Context } from 'cherow';
import { Options } from '../types';
/**
 * Creates the parser object
 *
 * @param source The source coode to parser
 * @param sourceFile Optional source file info to be attached in every node
 */
export declare function createParser(source: string, sourceFile: string | void): any;
/**
 * Creating the parser
 *
 * @param source The source coode to parser
 * @param options The parser options
 * @param context Context masks
 */
export declare function parse(source: string, options: Options | void, context: Context): ESTree.Program;
/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */
export declare function parseStatementList(parser: Parser, context: Context): ESTree.Statement[];

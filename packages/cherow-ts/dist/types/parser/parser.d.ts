import { ESTree, IParser, Context } from 'cherow';
import { Options } from '../types';
export declare function createParser(source: string, sourceFile: string | void): any;
export declare function parse(source: string, options: Options | void, context: Context): ESTree.Program;
export declare function parseStatementList(parser: IParser, context: Context): ESTree.Statement[];

import * as ESTree from '../estree';
import { Options, IParser } from '../types';
import { Context } from '../utilities';
export declare function createParser(source: string, sourceFile: string | void): IParser;
export declare function parse(source: string, options: Options | void, context: Context): ESTree.Program;
export declare function parseStatementList(parser: IParser, context: Context): ESTree.Statement[];

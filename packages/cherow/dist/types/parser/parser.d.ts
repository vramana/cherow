import * as ESTree from '../estree';
import { Options, Parser } from '../types';
import { Context } from '../utilities';
export declare function createParser(source: string, sourceFile: string | void): Parser;
export declare function parse(source: string, options: Options | void, context: Context): ESTree.Program;
export declare function parseStatementList(parser: Parser, context: Context): ESTree.Statement[];
export declare function parseScript(source: string, options?: Options): ESTree.Program;
export declare function parseModule(source: string, options?: Options): ESTree.Program;

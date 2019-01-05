import { Options } from '../types';
import { Context } from '../common';
import * as ESTree from '../estree';
export declare function parseSource(source: string, options: Options | void, context: Context): any;
export declare function parse(source: string, options?: Options): ESTree.Program;
export declare function parseScript(source: string, options?: Options): ESTree.Program;
export declare function parseModule(source: string, options?: Options): ESTree.Program;
//# sourceMappingURL=parser.d.ts.map
import * as ESTree from './estree';
import { OnComment, OnToken, Context } from './common';
export declare type EcmaVersion = 1 | 2 | 3 | 4 | 5 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020;
export interface Options {
    ecmaVersion?: EcmaVersion;
    module?: boolean;
    attachComments?: boolean;
    next?: boolean;
    ranges?: boolean;
    loc?: boolean;
    jsx?: boolean;
    raw?: boolean;
    source?: string;
    impliedStrict?: boolean;
    globalReturn?: boolean;
    globalAwait?: boolean;
    experimental?: boolean;
    native?: boolean;
    tokenize?: boolean;
    webCompat?: boolean;
    onComment?: OnComment;
    onToken?: OnToken;
    directives?: boolean;
}
export declare const version = "2.0";
export declare function parseSource(source: string, options: Options | void, context: Context): ESTree.Program;
export declare function parse(source: string, options?: Options): ESTree.Program;
export declare function parseScript(source: string, options?: Options): ESTree.Program;
export declare function parseModule(source: string, options?: Options): ESTree.Program;
export declare function parseExpressions(source: string, options?: Options): ESTree.Program;
//# sourceMappingURL=cherow.d.ts.map
import { Context } from './masks';
import { Parser } from './parser';
import * as ESTree from './estree';
export const version = 'VERSION';

export type PluginHandler = (core: Parser) => void;
export interface Options {
    next?: boolean;
    ranges?: boolean;
    comments?: boolean;
    loc?: boolean;
    raw?: boolean;
    jsx?: boolean;
    source?: string;
    globalReturn?: boolean;
    tolerant?: boolean;
    sourceType?: 'module' | 'script';
    plugins?: PluginHandler[];
    attachComment?: boolean;
    impliedStrict?: boolean;
}

// https://tc39.github.io/ecma262/#sec-scripts
export function parseScript(source: string, options?: Options): ESTree.Program {
    return new Parser(source, options).parseProgram(options && options.impliedStrict ? Context.Strict | Context.TopLevel : Context.TopLevel);
}

// https://tc39.github.io/ecma262/#sec-modules
export function parseModule(source: string, options?: Options): ESTree.Program {
    return new Parser(source, options).parseProgram(Context.Strict | Context.Module | Context.TopLevel);
}
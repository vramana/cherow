import { Context } from './masks';
import { Parser } from './parser';
import * as ESTree from './estree';

export const version = '__VERSION__';

export type PluginHandler = (core: Parser) => void;
export interface Options {
    next?: boolean;
    ranges?: boolean;
    loc?: boolean;
    raw?: boolean;
    jsx?: boolean;
    source?: string;
    globalReturn?: boolean;
    tolerant?: boolean;
    comments?: boolean;
    plugins?: PluginHandler[];
    attachComment?: boolean;
    impliedStrict?: boolean;
}

export function parseScript(source: string, options?: Options): ESTree.Program {
    return new Parser(source, options).parseProgram(options && options.impliedStrict ? Context.Strict | Context.TopLevel : Context.TopLevel);
}

export function parseModule(source: string, options?: Options): ESTree.Program {
    return new Parser(source, options).parseProgram(Context.Strict | Context.Module | Context.TopLevel);
}
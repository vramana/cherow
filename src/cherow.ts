import { Context } from './masks';
import { Parser } from './parser';
import { Options } from './interface';

// https://tc39.github.io/ecma262/#sec-scripts
export function parseScript(source: string, options?: Options) {
    if (options && options.impliedStrict) source = '"use strict";' + source;
    return new Parser(source, options).parseScript(Context.None);
}

// https://tc39.github.io/ecma262/#sec-modules
export function parseModule(source: string, options?: Options) {
    return new Parser(source, options).parseModule(Context.Strict | Context.Module);
}
import { Context } from './masks';
import { Parser } from './parser';
import { Options } from './interface';

// https://tc39.github.io/ecma262/#sec-scripts
export function parseScript(sourceText: string, options: Options = {}) {
    return new Parser(sourceText, options).parseScript(Context.None);
}

// https://tc39.github.io/ecma262/#sec-modules
export function parseModule(sourceText: string, options: Options = {}) {
    return new Parser(sourceText, options).parseModule(Context.Strict | Context.Module);
}

export function parse(sourceText: string, options: Options = {}) {
    return options && typeof options.sourceType === 'string' && options.sourceType === 'module'
            ? this.parseModule(sourceText, options)
            : this.parseScript(sourceText, options);
}
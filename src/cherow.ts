import { Context } from './masks';
import { Parser } from './parser';
import { Options } from './interface';

export function parseScript(source: string, options: Options = {}) {
    return new Parser(source, options).parse(Context.None);
}

export function parseModule(source: string, options: Options = {}) {
    return new Parser(source, options).parse(Context.Strict | Context.Module);
}

export function parse(source: string, options: Options = {}) {
    return options && typeof options.sourceType === 'string' && options.sourceType === 'module'
            ? this.parseModule(source, options)
            : this.parseScript(source, options);
}

// current version
export const version = '0.13.0';
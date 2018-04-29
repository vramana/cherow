import { parse } from './parser/parser';
import * as ESTree from './estree';
import * as Parser from './parser/index';
import * as Scanner from './scanner/index';
import { Options } from './types';
import { Context } from './utilities';

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source source code to parse
 * @param options parser options
 */

export function parseScript(source: string, options?: Options): ESTree.Program {
    return parse(source, options, Context.Empty);
}

/**
 * Parse module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */

export function parseModule(source: string, options?: Options): ESTree.Program {
    return parse(source, options, Context.Strict | Context.Module);
}

export const version = '__VERSION__';

export { ESTree, Parser, Scanner };
export * from './chars';
export * from './errors';
export * from './token';
export * from './types';
export * from './unicode';
export * from './utilities';
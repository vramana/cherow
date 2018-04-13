import { parse } from './parser/parser';
import * as ESTree from './estree';
import * as Parser from './parser/index';
import { Options } from './types';
import { Context } from './utilities';
import { validateRegExp } from './regExp';

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source  source code to parse
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
 * @param source  source code to parse
 * @param options parser options
 */

export function parseModule(source: string, options?: Options): ESTree.Program {
    return parse(source, options, Context.Strict | Context.Module);
}


/**
 * Validate regular expression
 *
 * @param source  regular expression pattern to validate
 * @param isUnicode True if the validator should handle unicode
 */
 export function validateRegularExpression(source: string, isUnicode: boolean): boolean {
    return validateRegExp(source, isUnicode);
}

export const version = '__VERSION__';

export { ESTree, Parser };
export * from './chars';
export * from './comments';
export * from './errors';
export * from './scanner';
export * from './token';
export * from './types';
export * from './unicode';
export * from './utilities';
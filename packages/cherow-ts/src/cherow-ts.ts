import { parse } from './parser/parser';
import * as ESTree from './estree';
import * as Parser from './parser/index';
import * as Scanner from './lexer/index';
import { Options } from './types';
import { Context } from './utilities';
/**
 * Parse TypeScript
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseTS(source: string, options?: Options): ESTree.Program {
  return options && options.module
    ? parse(source, options, Context.Strict | Context.Module)
    : parse(source, options, Context.Empty);
}

import { Context, Parser, ESTree } from 'cherow';
import { Options } from './types';

/**
 * Parse Flow / JavaScript
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseFlow(source: string, options?: Options): ESTree.Program {
  return options && options.module
    ? Parser.parse(source, options, Context.Strict | Context.Module)
    : Parser.parse(source, options, Context.Empty);
}

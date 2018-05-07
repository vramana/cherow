import { Options } from './types';
import { ESTree, Parser, Context } from '@cherow';

/**
 * Parse TypeScript
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseTS(source: string, options?: Options): ESTree.Program {
  return options && options.module
    ? Parser.parse(source, options, Context.Strict | Context.Module)
    : Parser.parse(source, options, Context.Empty);
}

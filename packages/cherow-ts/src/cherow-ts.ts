import * as ESTree from '../../cherow/src/estree';
import { Options } from './types';
import { Context } from '../../cherow/src/utilities';
import { createParser, parse } from '../../cherow/src/parser';

/**
 * Parse TypeScript
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseTS(
  source: string,
  options?: Options
): ESTree.Program {
  return options && options.module
    ? parse(source, options, Context.Strict | Context.Module)
    : parse(source, options, Context.Empty);
}

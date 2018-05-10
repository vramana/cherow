import { ESTree } from 'cherow';
import { Options } from './types';
/**
 * Parse TypeScript
 *
 * @param source source code to parse
 * @param options parser options
 */
export declare function parseTS(source: string, options?: Options): ESTree.Program;

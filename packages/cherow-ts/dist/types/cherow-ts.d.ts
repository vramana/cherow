import { Options } from './types';
import { ESTree } from 'cherow';
export declare function parseTS(source: string, options?: Options): ESTree.Program;

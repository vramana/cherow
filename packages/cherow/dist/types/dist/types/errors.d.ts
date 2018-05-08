import { Parser } from './types';
import { Context } from './utilities';
export declare function constructError(parser: Parser, context: Context, index: number, line: number, column: number, description: string): void;
export declare function report(parser: Parser, type: Errors, ...params: string[]): void;
export declare function tolerant(parser: Parser, context: Context, type: Errors, ...params: string[]): void;

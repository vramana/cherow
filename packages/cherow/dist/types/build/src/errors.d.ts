import { IParser } from './types';
import { Context } from './utilities';
export declare function constructError(parser: IParser, context: Context, index: number, line: number, column: number, description: string): void;
export declare function report(parser: IParser, type: Errors, ...params: string[]): void;
export declare function tolerant(parser: IParser, context: Context, type: Errors, ...params: string[]): void;

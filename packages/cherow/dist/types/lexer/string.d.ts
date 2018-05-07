import { IParser } from '../types';
import { Token } from '../token';
import { Context, Escape } from '../utilities';
export declare function scanEscapeSequence(parser: IParser, context: Context, first: number): number;
export declare function throwStringError(parser: IParser, context: Context, code: Escape): void;
export declare function scanString(parser: IParser, context: Context, quote: number): Token;

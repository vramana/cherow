import { Parser } from '../types';
import { Token } from '../token';
import { Context, Escape } from '../utilities';
export declare function scanEscapeSequence(parser: Parser, context: Context, first: number): number;
export declare function throwStringError(parser: Parser, context: Context, code: Escape): void;
export declare function scanString(parser: Parser, context: Context, quote: number): Token;

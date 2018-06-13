import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../common';
/**
 * Scan a string literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param parser Parser object
 * @param context Context masks
 * @param quote codepoint
 */
export declare function scanStringLiteral(parser: Parser, context: Context, quote: number): Token;
export declare const table: ((parser: Parser, context: Context, first: number) => number)[];

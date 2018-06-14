import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../common';
/**
 * Scans identifier
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first codepoint
 */
export declare function scanIdentifier(parser: Parser, context: Context, first: number): Token;
/**
 * Scans maybe identifier
 *
 * @param parser Parser object
 */
export declare function scanMaybeIdentifier(parser: Parser, context: Context, first: number): Token;

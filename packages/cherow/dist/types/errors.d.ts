import { Parser } from './types';
import { Context } from './utilities';
/**
 * Collect line, index, and colum from either the recorded error
 * or directly from the parser and returns it
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param index  The 0-based end index of the error.
 * @param line The 0-based line position of the error.
 * @param column The 0-based column position of the error.
 * @param parser The 0-based end index of the current node.
 * @param description Error description
 */
export declare function constructError(parser: Parser, context: Context, index: number, line: number, column: number, description: string): void;
/**
 * Throws an error
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param type Error type
 * @param params Error params
 */
export declare function report(parser: Parser, type: Errors, ...params: string[]): void;
/**
 * If in tolerant mode, all errors are pushed to a top-level error array containing
 * otherwise throws
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param type Error type
 * @param params Error params
 */
export declare function tolerant(parser: Parser, context: Context, type: Errors, ...params: string[]): void;

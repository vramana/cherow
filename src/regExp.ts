import { isIdentifierPart, fromCodePoint, Context } from './utilities';
import { Chars } from './chars';
import { isValidIdentifierStart, isValidIdentifierPart } from "./unicode"
import { Errors, ErrorMessages } from './errors';
import { createParser } from './parser/index';
import { Parser } from './types';

/**
 * Public regular expression validator
 * 
 * @param source regexp pattern to validate
 * @param isUnicode true if unicode.
 */

export function validateRegExp(source: string, isUnicode: boolean): boolean {
    const parser = createParser(source, undefined, undefined);
    return validatePattern(parser, Context.Empty, isUnicode);
}

/**
 * Validate regular expression pattern
 * 
 * @param Parser Parser instance
 * @param isUnicode true if unicode.
 */
export function validatePattern(parser: Parser, context: Context, isUnicode: boolean): boolean {
    // Note: If the 'node' option is on, we return false and use the native 'RegExp'
    if (context & Context.OptionsNode) return false;
    return false;
}
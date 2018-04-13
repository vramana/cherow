import { isIdentifierPart, fromCodePoint, hasNext, consumeOpt, advance } from './utilities';
import { Chars } from './chars';
import { isValidIdentifierStart, isValidIdentifierPart } from "./unicode"
import { Errors, ErrorMessages } from './errors';
import { createParser } from './parser/parser';
import { Parser } from './types';

/**
 * Public regular expression validator
 * 
 * @param source regexp pattern to validate
 * @param isUnicode true if unicode.
 */

export function validateRegExp(source: string, isUnicode: boolean): boolean {
    const parser = createParser(source, undefined, undefined);
    validatePattern(parser, isUnicode);
    return true;
}

/**
 * Validate regular expression pattern
 * 
 * @param Parser Parser instance
 * @param isUnicode true if unicode.
 */
export function validatePattern(parser: Parser, isUnicode: boolean): boolean {
    return false;
}    
 

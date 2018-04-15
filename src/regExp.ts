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
    verifyRegExpPattern(parser, context, 0, source.length);
}

/**
 * Validate regular expression pattern
 * 
 * @param Parser Parser instance
 * @param isUnicode true if unicode.
 */
export function verifyRegExpPattern(
    parser: Parser,
    isUnicode: boolean,
    start: number,
    end: number
) {
    const groupNames: string[] = [];
    const referenceNames: string[] = [];
    if (isUnicode) context |= ValidatorState.NamedGroups;
    parsePattern(parser, context, start, end, groupNames, referenceNames);
    if (!(context & ValidatorState.Unicode) && groupNames.length > 0) {
        parsePattern(parser, context & ~ValidatorState.Unicode, /* empty */ [], /* empty*/ [])
    }
}

/**
 * Parse regexp pattern
 * 
 * @param Parser Parser instance
 * @param context Validator context
 * @param start Start of regexp pattern
 * @param end End of regexp pattern
 * @param groupnames Collection of groupnames
 * @param referenceNames Collection of reference names
 */
export function parsePattern(
    parser: Parser,
    context: ValidatorState,
    start: number,
    end: number,
    groupNames: string[],
    referenceNames: string[]
) {
    return false;
    // while (start !== end) {
    // To be added
    // }
}
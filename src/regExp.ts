import { isIdentifierPart, fromCodePoint, hasNext, consumeOpt, advance } from './utilities';
import { Chars } from './chars';
import { isValidIdentifierStart, isValidIdentifierPart } from "./unicode"
import { Errors, ErrorMessages } from './errors';
import { createParser } from './parser/parser';
import { Parser } from './types';

export const enum ValidatorState {
    Empty = 0,
    Unicode = 1 << 0,
    Invalid = 1 << 1,
}

/**
 * Public regular expression validator
 * 
 * @param source regexp pattern to validate
 * @param isUnicode true if unicode.
 */
export function validateRegExp(source: string, isUnicode: boolean): boolean {
    const parser = createParser(source, undefined, undefined);
    verifyRegExpPattern(parser, isUnicode, 0, source.length);
    return true;
}

/**
 * Validate regular expression pattern
 * 
 * @param Parser Parser instance
 * @param isUnicode true if unicode.
 * @param start Start of regexp pattern
 * @param end End of regexp pattern
 */
export function verifyRegExpPattern(
    parser: Parser,
    isUnicode: boolean,
    start: number,
    end: number
) {
    const groupNames: string[] = [];
    const referenceNames: string[] = [];
    let context = isUnicode ? ValidatorState.Unicode : ValidatorState.Empty;
    parsePattern(parser, context, start, end, groupNames, referenceNames);
    if (!isUnicode && groupNames.length > 0) {
        parsePattern(parser, context & ~ValidatorState.Unicode, start, end, /* empty */ [], /* empty*/ [])
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
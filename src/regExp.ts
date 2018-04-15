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

/**
 * Parses strict identity escape
 * 
 * @see [Link](https://tc39.github.io/ecma262/#prod-IdentityEscape)
 * @see [Link](https://tc39.github.io/ecma262/#prod-SyntaxCharacter)
 * 
 * 
 * @param parser Parser context
 * @param context Validator context masks
 */
function parseIdentityEscape(parser: Parser, context: ValidatorState): boolean {

    const ch = nextChar(parser, context);

    if (context & ValidatorState.Unicode) {

        switch (ch) {
            case Chars.Caret:
            case Chars.Dollar:
            case Chars.Backslash:
            case Chars.Period:
            case Chars.Asterisk:
            case Chars.Plus:
            case Chars.QuestionMark:
            case Chars.LeftParen:
            case Chars.RightParen:
            case Chars.LeftBracket:
            case Chars.RightBracket:
            case Chars.LeftBrace:
            case Chars.RightBrace:
            case Chars.VerticalBar:
            case Chars.Slash:
                advance(parser);
                return true;
            default:
                return false;
        }
    } else {

        switch (ch) {
            case Chars.LowerC:
            case Chars.LowerK:
                return false
            default:
                advance(parser)
                return true
        }
    }
}

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
    const parser: Parser = createParser(source);
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
    end: number): boolean {
    const groupNames: string[] = [];
    const referenceNames: string[] = [];
    let context = isUnicode ? ValidatorState.Unicode : ValidatorState.Empty;
    parsePattern(parser, context, start, end, groupNames, referenceNames);
    if (!(context & ValidatorState.Unicode) && parser.groupNames.length > 0) {
        parsePattern(parser, context & ~ValidatorState.Unicode | ValidatorState.NamedGroups, start, end, /* empty */ [], /* empty */ [])
    }
    return true;
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
 * Validates back reference names
 * 
 * @param parser Parser instance
 */
export function validateNamedBackReferences(parser: Parser) {
    let { namedBackReferences, capturingParens, backReferenceNames, groupNames } = parser;
    // if (parser.namedBackReferences === 0) return;
    if (namedBackReferences > capturingParens) report(Errors.InvalidEscape);
    for (let i = 0; i < backReferenceNames.length; i++) {
        // TODO! Get rid if 'indexOf'
        if (groupNames.indexOf(backReferenceNames[i]) === -1) {
            report(Errors.InvalidNamedCaptureRef);
        }
    }
}

/**
 * Parse property class
 * 
 * @param parser Parser context
 * @param context Validator context
 */
function parsePropertyClass(parser: Parser, context: ValidatorState): boolean {

    let { start: index, source, end } = parser;

    // Invalid: '/\\p{}/u'
    if (source.charCodeAt(index) === Chars.RightBrace) return false;

    let name: string = '';

    while (index !== end) {
        let ch = source.charCodeAt(index);
        if (!isUnicodePropertyNameCharacter(ch)) break;
        name += fromCodePoint(ch)
        index++;
    }

    if (source.charCodeAt(index) !== Chars.EqualSign) {
        parser.start = index;
        validateUnicodePropertyName(parser, context, name)
        return true
    }

    index++; // skip '='

    let value = '';
    while (index !== end) {
        const ch = source.charCodeAt(index);
        if (!isUnicodePropertyValueCharacter(parser, context, ch)) break;
        value += fromCodePoint(ch)
        index++;
    }

    parser.start = index;

    validateUnicodePropertyValue(parser, context, name, value)
    return true
}

/**
 * Get backreference index, and returns it's value
 * 
 * @param parser Parser context
 */

function getBackReferenceIndex(parser: Parser): number {
    let { start, source, end } = parser;
    let ch = source.charCodeAt(start);
    if (ch === Chars.Zero) return 0; // Seen as 'false'
    let value = 0;
    while (start !== end) {
        ch = source.charCodeAt(start);
        if (!isDecimalDigit(ch)) break;
        value = 10 * value + (ch - Chars.Zero)
        start++;
    }

    return value;
}

/**
 * Parses backreference
 * 
 * @see [Link](https://tc39.github.io/ecma262/#sec-atomescape)
 * 
 * @param parser Parser context
 * @param context Validator context masks
 */

function parseBackReference(parser: Parser, context: ValidatorState): boolean {
    const n = getBackReferenceIndex(parser);
    if (n) {

        if (context & ValidatorState.Unicode) {
            if (n > parser.namedBackReferences) parser.namedBackReferences = n;
            return true;
        }

        //  n ≤ NcapturingParens.
        if (n <= parser.capturingParens) return true;
    }
    return false;
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

/**
 * Parses character escape
 * 
 * @see [Link](https://tc39.github.io/ecma262/#prod-CharacterEscape)
 * 
 * @param parser Parser context
 * @param context Validator context masks
 */

function parseCharacterEscape(parser: Parser, context: ValidatorState): boolean {

    const { start, source } = parser;

    switch (nextChar(parser, context)) {
        
    // 'c'
    case Chars.LowerC:
        {
            const next = source.charCodeAt(start + 1);
            if (!isControlLetter(next)) return false;
            return true
        }

    // '0'
    case Chars.Zero: 
        {
            const next = source.charCodeAt(start + 1);
            // [lookahead ∉ DecimalDigit]
            if (isDecimalDigit(next)) return false;    
            advance(parser);
            return true
        }

   // 'x':
    case Chars.LowerX:
        {
           advance(parser);
           if (parseHexDigitOrSequence(parser, context, 2)) return true
           else if (context & ValidatorState.Unicode) report(Errors.InvalidEscape);
           return false
        }

    // 'u'
    case Chars.LowerU:
       return parseRegExpUnicodeEscapeSequence(parser, context);

    // '1' - '7'
    case Chars.One: 
    case Chars.Two:
    case Chars.Three:
    case Chars.Four:
    case Chars.Five:
    case Chars.Six:
    case Chars.Seven: 
       {
         if (context & ValidatorState.Unicode) return false;
         return parseImplicitOctalEscapes(parser, context)
       }

    case Chars.LowerF:
    case Chars.UpperF:
    case Chars.LowerN:
    case Chars.UpperN:
    case Chars.LowerR:
    case Chars.UpperR:
    case Chars.LowerT:
    case Chars.UpperT:
    case Chars.LowerV:
    case Chars.UpperV: {
      advance(parser);
      return true;
    }

    default:
        // Note: I'm going to merge in the function below, so
        // if we reach down here - return false 
            
        // Secind note: The unicode check will be simplified soon
      return parseIdentityEscape(parser, context);
    }
}

/**
 * Parse quantifier
 * 
 * @param parser Parser context
 * @param context Validator context masks
 */
export function parseQuantifier(parser: Parser, context: ValidatorState) {
    const { start, source } = parser;
    switch (source.charCodeAt(start)) {
        case Chars.Asterisk:
        case Chars.Plus:
        case Chars.QuestionMark:
            parser.start = start + 1;
            break;
        case Chars.LeftBrace:
            if (!parseBracedQuantifier(parser, context)) return false;
        default:
    }
    
    if (parser.start === start) return false;
    consumeOpt(parser, Chars.QuestionMark)
    return true;
}


/**
 * Parse assertion
 * 
 * @param parser Parser context
 * @param context Validator context masks
 */

function parseAssertion(parser: Parser, context: ValidatorState): boolean {
    // TODO! Use a global mutual Flag!
    parser.isQuantifiable = false
    let { start: index, source } = parser;

    switch (source.charCodeAt(index)) {

        // `^', `$'
        case Chars.Caret:
        case Chars.Dollar:
            parser.start++;
            return true;

        // `\'
        case Chars.Backslash:
            {
                index++;
                const next = source.charCodeAt(index);
                if (next === Chars.LowerB || next === Chars.UpperB) {
                    parser.start = index;
                    return true;
                }
                return false;
            }

        // `('
        case Chars.LeftParen:
            {
                index++;
                let next = source.charCodeAt(index);
                if (next === Chars.QuestionMark) {
                    index++;
                    let lookbehind = false;
                    if (source.charCodeAt(index) === Chars.LessThan) {
                        index++;
                        lookbehind = true;
                    }
                    next = source.charCodeAt(index);
                    if (next === Chars.EqualSign || next === Chars.Exclamation) {
                        parser.start = index + 1;
                        parseDisjunction(parser, context)
                        if (!consumeOpt(parser, Chars.RightParen)) {
                            report(Errors.UnterminatedGroup);
                        }
                        parser.isQuantifiable = !lookbehind
                        return true
                    }
                }
            }

        default:
            return false;
    }
}

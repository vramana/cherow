import { Parser } from '../types';
import { Token } from '../token';
import { Context } from '../common';
import { Chars } from '../chars';
export declare const hasBit: (mask: number, flags: number) => boolean;
export declare const enum Escape {
    Empty = -1,
    StrictOctal = -2,
    EightOrNine = -3,
    InvalidHex = -4,
    OutOfRange = -5
}
export declare const enum ClassRangesState {
    Empty = 0,
    IsTrailSurrogate = 1,
    IsSurrogateLead = 4,
    SeenUnicoderange = 256,
    InCharacterRange = 1024
}
export declare const enum RegExpFlags {
    Empty = 0,
    Global = 1,
    IgnoreCase = 2,
    Multiline = 4,
    Unicode = 8,
    Sticky = 16,
    DotAll = 32
}
export declare const enum RegexpState {
    InvalidClassEscape = 1,
    ValidClassEscape = 64,
    UnicodeMode = 1024,
    SloppyMode = 4096,
    OnlySloppy = 16384,
    Valid = 65536,
    Invalid = 262144,
    InvalidCharClassInSloppy = 16777216,
    Quantifier = 33554432,
    MissingDigits = 67108864,
    EndOfRegex = 134217728,
    InvalidCharClass = 1114112,
    InvalidCharClassRange = 1114113
}
/**
 * Consume an token in the scanner on match. This is an equalent to
 * 'consume' used in the parser code itself.
 *
 * @param parser Parser object
 * @param ch Codepoint
 */
export declare function consumeOpt(parser: Parser, ch: number): boolean;
/**
 * Advance to new line
 *
 * @param parser Parser object
 */
export declare function advanceNewline(parser: Parser, ch: number): void;
/**
 * Skips BOM and shebang
 *
 * parser Parser object
 */
export declare function skipBomAndShebang(parser: Parser, context: Context): void;
/**
* Scans private name. Stage 3 proposal related
*
* @param parser Parser object
* @param context Context masks
*/
export declare function scanPrivateName(parser: Parser, context: Context): Token;
export declare function readNext(parser: Parser, ch: number): number;
export declare function nextUnicodeChar(parser: Parser): number;
export declare function isDecimalDigit(code: number): boolean;
export declare function toHex(code: number): number;
export declare const fromCodePoint: (code: Chars) => string;
export declare function validateQuantifierPrefix(parser: Parser): boolean | number;
export declare function isFlagStart(code: number): boolean;
/**
* Returns true if valid unicode continue
*
* @param {number} code
* @returns {boolean}
*/
export declare function isValidUnicodeidcontinue(code: number): boolean;
/**
* Adjust correct regexp validator state
*
*
* @param parser Parser object
* @param code Code point
*/
export declare function setValidationState(prevState: RegexpState, currState: RegexpState): RegexpState;
/**
* Adjust correct regexp validator state
*
*
* @param parser Parser object
* @param flagState State returned by the regular expression flag
* @param bodyState State returned after parsing the regex body
*/
export declare function setRegExpState(parser: Parser, flagState: RegexpState, bodyState: RegexpState): RegexpState;
/**
 * Parse back reference index
 *
 * @see [Link](https://www.ecma-international.org/ecma-262/8.0/#prod-DecimalEscape)
 *
 * @param parser Parser object
 * @param code Code point
 */
export declare function parseBackReferenceIndex(parser: Parser, code: number): RegexpState;
/**
* Get unicode range
*
* @param range Left unicode range
* @param state Current lexer state
* @param right Right unicode range
*/
export declare function getUnicodeRange(range: any, state: RegexpState, right: number): RegexpState;
/**
* Get non-unicode range
*
* @param range Left unicode range
* @param state Current lexer state
* @param right Right unicode range
*/
export declare function getRange(ch: number, range: number, state: RegexpState): RegexpState;
export declare function mapToToken(token: Token): (parser: Parser) => Token;
export declare function escapeInvalidCharacters(code: number): string;
/**
* Throws a string error for either string or template literal
*
* @param parser Parser object
* @param context Context masks
*/
export declare function recordStringErrors(parser: Parser, code: Escape): void;
export declare function isIdentifierPart(code: Chars): boolean;

import { Chars, CharacterFlags, CharacterType } from '../chars';
import { Parser } from '../types';
import { Errors, report } from '../errors';
import { Token, descKeyword, tokenDesc } from '../token';
import { isValidIdentifierStart } from '../unicode';
import { isValidIdentifierPart, mustEscape } from '../unicode';
import { Flags, Context, ScannerState } from '../utilities';

/**
 * Return true if more chars in the stream. Otherwise return false.
 *
 * @param parser Parser object
 */
export function hasNext(parser: Parser) {
    return parser.index < parser.source.length;
}

/**
 * Advance to the next token in the stream
 *
 * @param parser Parser object
 */

export function advance(parser: Parser) {
    parser.index++;
    parser.column++;
}

/**
 * Return the next codepoint in the stream by index
 *
 * @param parser Parser object
 */
export function nextChar(parser: Parser): number {
    return parser.source.charCodeAt(parser.index);
}

/**
 * Return the next unicodechar in the stream
 *
 * @param parser Parser object
 */
export function nextUnicodeChar(parser: Parser) {
    const { index } = parser;
    const hi = parser.source.charCodeAt(index);
    if (hi < Chars.LeadSurrogateMin || hi > Chars.LeadSurrogateMax) return hi;
    const lo = parser.source.charCodeAt(index + 1);
    if (lo < Chars.TrailSurrogateMin || lo > Chars.TrailSurrogateMax) return hi;
    return Chars.NonBMPMin + ((hi & 0x3FF) << 10) | lo & 0x3FF;
}

/**
 * Returns true if this is a valid identifier part
 *
 * @param code Codepoint
 */

export const isIdentifierPart = (code: number) => (CharacterType[code] & CharacterFlags.IdentifierStart) !== 0 || isValidIdentifierPart(code);

export function escapeForPrinting(code: number): string {
    switch (code) {
        case Chars.Null:
            return '\\0';
        case Chars.Backspace:
            return '\\b';
        case Chars.Tab:
            return '\\t';
        case Chars.LineFeed:
            return '\\n';
        case Chars.VerticalTab:
            return '\\v';
        case Chars.FormFeed:
            return '\\f';
        case Chars.CarriageReturn:
            return '\\r';
        default:
            if (!mustEscape(code)) return fromCodePoint(code);
            if (code < 0x10) return `\\x0${code.toString(16)}`;
            if (code < 0x100) return `\\x${code.toString(16)}`;
            if (code < 0x1000) return `\\u0${code.toString(16)}`;
            if (code < 0x10000) return `\\u${code.toString(16)}`;
            return `\\u{${code.toString(16)}}`;
    }
}

/**
 * Consume an token in the scanner on match. This is an equalent to
 * 'consume' used in the parser code itself.
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function consumeOpt(parser: Parser, code: number): boolean {
    if (parser.source.charCodeAt(parser.index) !== code) return false;
    parser.index++;
    parser.column++;
    return true;
}

/**
 * Consumes line feed
 *
 * @param parser Parser object
 * @param state  Scanner state
 */
export function consumeLineFeed(parser: Parser, state: ScannerState) {
    parser.flags |= Flags.NewLine;
    parser.index++;
    if ((state & ScannerState.LastIsCR) === 0) {
        parser.column = 0;
        parser.line++;
    }
}

/**
 * Scans private name. Stage 3 proposal related
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanPrivateName(parser: Parser, context: Context): Token {
    if (!(context & Context.InClass) || !isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
        report(parser, Errors.UnexpectedToken, tokenDesc(parser.token));
    }
    return Token.Hash;
}

/**
 * Advance to new line
 *
 * @param parser Parser object
 */
export function advanceNewline(parser: Parser) {
    parser.flags |= Flags.NewLine;
    parser.index++;
    parser.column = 0;
    parser.line++;
}

export const fromCodePoint = (code: Chars) => {
    return code <= 0xFFFF ?
        String.fromCharCode(code) :
        String.fromCharCode(((code - Chars.NonBMPMin) >> 10) +
            Chars.LeadSurrogateMin, ((code - Chars.NonBMPMin) & (1024 - 1)) + Chars.TrailSurrogateMin);
};

export function readNext(parser: Parser): number {
    advance(parser);
    if (!hasNext(parser)) report(parser, Errors.UnicodeOutOfRange);
    return nextUnicodeChar(parser);
}

export function toHex(code: number): number {
    if (code < Chars.Zero) return -1;
    if (code <= Chars.Nine) return code - Chars.Zero;
    if (code < Chars.UpperA) return -1;
    if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
    if (code < Chars.LowerA) return -1;
    if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
    return -1;
}

export function advanceOnMaybeAstral(parser: Parser, ch: number) {
    advance(parser);
    if (ch > 0xFFFF) parser.index++;
}

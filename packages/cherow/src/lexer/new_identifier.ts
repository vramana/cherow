import { mustEscape, isIdentifierStart, isIdentifierPart } from '../unicode';
import { Parser } from '../types';
import { Chars } from '../chars';
import { consumeOptAstral, skipToNewline, advanceNewline, toHex } from './common';
import { Token, descKeyword } from '../token';
import { Context } from '../utilities';

export function scanIdentifier(parser: Parser, context: Context) {
    while (parser.index < parser.source.length) {
        if (!isIdentifierPart(parser.source.charCodeAt(parser.index))) break;
        parser.index++; parser.column++;
    }

    const value = parser.source.slice(parser.startIndex, parser.index);
    const next = parser.source.charCodeAt(parser.index);
    parser.tokenValue = value;

    if (next <= 127 && next !== Chars.Backslash) return getKeywordOrIdentifierToken(value);

    // Handle surrogate
    if ((next & 0xfc00) === 0xd800) {
        if (consumeOptAstral(parser, next)) {
            if (!isIdentifierPart(parser.source.charCodeAt(parser.index))) return -1;
        }
    }

    return scanIdentifierSuffix(parser, context, value);
}

/**
 * Scans identifier suffix
 *
 * @param parser Parser object
 * @param context Context masks
 * @param value Identifier part
 */
function scanIdentifierSuffix(
    parser: Parser,
    context: Context,
    value: string,
): Token {

    let { index: start } = parser;
    let escaped: boolean = false;

    while (parser.index < parser.source.length) {
        const codePoint = parser.source.charCodeAt(parser.index);
        if ((codePoint & 0xfc00) === 0xd800) {
            if (consumeOptAstral(parser, codePoint)) {
                if (!isIdentifierPart(parser.source.charCodeAt(parser.index))) return -1;
                continue;
            }
        }
        if (codePoint === Chars.Backslash) {
            value += parser.source.slice(start, parser.index);
            const cooked = scanIdentifierUnicodeEscape(parser, context);
            if (cooked < 0 || !isIdentifierStart(cooked)) {
                return Token.EndOfSource;
            }
            escaped = true;
            value += String.fromCodePoint(cooked);
            start = parser.index;
            continue;
        }

        if (!isIdentifierPart(codePoint)) break;
        parser.index++; parser.column++;
    }

    parser.tokenValue = value += parser.source.slice(start, parser.index);

    // Maybe escaped keywords
    if (escaped) {
        const t = getKeywordOrIdentifierToken(value);
        if ((t & Token.IsIdentifier) === Token.IsIdentifier || (t & Token.Contextual) === Token.Contextual) {
            return t;
        } else if ((t & Token.FutureReserved) === Token.FutureReserved ||
            t === Token.LetKeyword ||
            t === Token.StaticKeyword) {
            return Token.StrictReservedWord;
        } else return Token.EscapedKeyword;
    }

    return Token.Identifier;
}

/**
 * Get keyword or identifier token
 *
 * @param value Identifier or maybe keyword
 */
function getKeywordOrIdentifierToken(value: string): Token {
    const len = value.length;
    if (len >= 2 && len <= 11) {
        const token = descKeyword(value);
        if (token > 0) return token;
    }

    return Token.Identifier;
}

/**
 * Scans maybe a identifier
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first Codepoint
 */
export function scanMaybeIdentifier(parser: Parser, context: Context, first: number): Token | undefined {
    let index = parser.index;
    // Absorb any byte order mark at the start
    if (parser.source.charCodeAt(index) === 0xFFEE || // "Opposite" endian BOM
        parser.source.charCodeAt(index) === 0xFEFF) { // "Correct" BOM
        index++;
        parser.index = index;
    } else if (index < parser.source.length &&
        parser.source.charCodeAt(index) === Chars.Hash) {
        index++;
        if (index < parser.source.length &&
            parser.source.charCodeAt(index) === Chars.Exclamation) {
            parser.index = index + 1;
            skipToNewline(parser);
        }
    }

    if (first === Chars.LineSeparator || first === Chars.ParagraphSeparator) {
        advanceNewline(parser);
    }

    if (isIdentifierStart(parser.source.charCodeAt(parser.index))) {
        return scanIdentifier(parser, context);
    }

    let code = parser.source.charCodeAt(parser.index++);

    if ((code & 0xfc00) === 0xd800) {
        const lo = parser.source.charCodeAt(parser.index);
        if (lo >= 0xdc00 && lo <= 0xdfff) {
            code = (code & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
            parser.index++;
            return scanIdentifier(parser, context);

        }
    }

    parser.index++;
    parser.column++;
    return Token.Illegal;
}

function peekUnicodeEscape(parser: Parser, context: Context) {
    if (parser.source.charCodeAt(parser.index) === Chars.LeftBrace) { // {
        parser.index++;
        const startPos = parser.index - 2;
        const codePoint = scanUnlimitedLengthHexNumber(parser, 0x10FFFF, startPos);
        if (codePoint < 0 || parser.source.charCodeAt(parser.index) !== Chars.RightBrace) {
            return -1; // TODO! Error recovery
        }
        parser.index++;
        parser.column++;
        return codePoint;
    }

    return scanHexNumber(parser, 4);
}

function scanUnlimitedLengthHexNumber(parser: Parser, maxValue: number, startPos: number): number {
    let codePoint = 0;
    let digit = toHex(parser.source.charCodeAt(parser.index));
    if (digit < 0) return -1; // TODO! Error recovery
    while (digit >= 0) {
        codePoint = codePoint * 16 + digit;
        if (codePoint > maxValue) return -1; // TODO! Error recovery
        parser.index++;
        parser.column++;
        digit = toHex(parser.source.charCodeAt(parser.index));
    }

    return codePoint;
}

function scanHexNumber(parser: Parser, maxLength: number): number {
    const start = parser.index - 2;
    let codePoint = 0;
    for (let i = 0; i < maxLength; i++) {
        const ch = parser.source.charCodeAt(parser.index);
        const digit = toHex(ch);
        if (digit < 0) return -1; // TODO! Error recovery
        codePoint = codePoint * 16 + digit;
        parser.index++;
        parser.column++;
    }
    return codePoint;
}

function scanIdentifierUnicodeEscape(parser: Parser, context: Context): number {
    if (parser.source.charCodeAt(parser.index + 1) === Chars.LowerU) {
        parser.index += 2;
        parser.column += 2;
        return peekUnicodeEscape(parser, context);
    }
    return -1;
}

export function scanUnicodeEscape(parser: Parser, context: Context): Token {
    const cookedChar = scanIdentifierUnicodeEscape(parser, context);
    if (cookedChar < 0 || !isIdentifierStart(cookedChar)) return Token.Illegal;
    return scanIdentifierSuffix(parser, context, String.fromCodePoint(cookedChar));
}

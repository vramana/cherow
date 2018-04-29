import { Chars } from '../chars';
import { Parser } from '../types';
import { Errors, report, tolerant } from '../errors';
import { Token, descKeyword, tokenDesc } from '../token';
import { isValidIdentifierStart } from '../unicode';
import { Context, Flags } from '../utilities';
import {
    consumeOpt,
    isIdentifierPart,
    escapeForPrinting,
    toHex,
    readNext,
    fromCodePoint,
    hasNext,
    nextChar,
    advance,
    nextUnicodeChar,
    advanceOnMaybeAstral
} from './common';

/**
 * Scan identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-names-and-keywords)
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */

export function scanIdentifier(parser: Parser, context: Context, first ?: number): Token {
    let start = parser.index;
    let ret: string = '';
    let isEscaped = false;
    if (first) advanceOnMaybeAstral(parser, first);
    loop:
        while (hasNext(parser)) {
            const index = parser.index;
            let ch = parser.source.charCodeAt(index);
            switch (ch) {

                case Chars.Backslash:
                    ret += parser.source.slice(start, index);
                    ret += scanUnicodeCodePointEscape(parser);
                    start = parser.index;
                    isEscaped = true;
                    break;

                default:
                    if (ch >= 0xD800 && ch <= 0xDBFF) {
                        const lo = parser.source.charCodeAt(index + 1);
                        ch = (ch & 0x3ff) << 10 | lo & 0x3ff | 0x10000;
                    }
                    if (!isIdentifierPart(ch)) break loop;
                    advanceOnMaybeAstral(parser, ch);
            }
        }
    if (start < parser.index) ret += parser.source.slice(start, parser.index);
    parser.tokenValue = ret;

    const len = ret.length;

    // Keywords are between 2 and 11 characters long and start with a lowercase letter
    // https://tc39.github.io/ecma262/#sec-keywords
    if (len >= 2 && len <= 11) {
        const token = descKeyword(ret);
        if (token > 0) {
            if (isEscaped) {
                if (context & Context.DisallowEscapedKeyword) {
                    tolerant(parser, context, Errors.InvalidEscapedReservedWord);
                }
                // Here we fall back to a mutual parser flag if the escaped keyword isn't disallowed through
                // context masks. This is similiar to how V8 does it - they are using an
                // 'escaped_keyword' token.
                // - J.K. Thomas
                parser.flags |= Flags.EscapedKeyword;
            }
            return token;
        }
    }

    if (context & Context.OptionsRawidentifiers) parser.tokenRaw = parser.source.slice(start, parser.index);
    return Token.Identifier;
}

/**
 * Scanning chars in the range 0...127, and treat them as an possible
 * identifier. This allows subsequent checking to be faster.
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param first Code point
 */

export function scanMaybeIdentifier(parser: Parser, context: Context, first: number): Token {
    first = nextUnicodeChar(parser);
    if (!isValidIdentifierStart(first)) {
        report(parser, Errors.UnexpectedChar, escapeForPrinting(first));
    }
    return scanIdentifier(parser, context, first);
}

/**
 * Scan unicode codepoint escape
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanUnicodeCodePointEscape(parser: Parser): string | void {

    const { index } = parser;

    if (index + 5 < parser.source.length) {

        if (parser.source.charCodeAt(index + 1) !== Chars.LowerU) {
            report(parser, Errors.Unexpected);
        }

        parser.index += 2;
        parser.column += 2;

        const code = scanIdentifierUnicodeEscape(parser);

        if (code >= Chars.LeadSurrogateMin && code <= Chars.LeadSurrogateMax) {
            report(parser, Errors.UnexpectedSurrogate);
        }

        if (!isIdentifierPart(code)) {
            report(parser, Errors.InvalidUnicodeEscapeSequence);
        }

        return fromCodePoint(code);
    }

    report(parser, Errors.Unexpected);
}

/**
 * Scan identifier unicode escape
 *
 * @param {Parser} Parser instance
 * @param {context} Context masks
 */
function scanIdentifierUnicodeEscape(parser: Parser): Chars {

    // Accept both \uxxxx and \u{xxxxxx}. In the latter case, the number of
    // hex digits between { } is arbitrary. \ and u have already been read.
    let ch = nextChar(parser);
    let codePoint = 0;

    // '\u{DDDDDDDD}'
    if (ch === Chars.LeftBrace) { // {
        ch = readNext(parser);

        let digit = toHex(ch);

        while (digit >= 0) {
            codePoint = (codePoint << 4) | digit;
            if (codePoint > Chars.NonBMPMax) {
                report(parser, Errors.UndefinedUnicodeCodePoint);
            }
            advance(parser);
            digit = toHex(nextChar(parser));
        }

        if (nextChar(parser) !== Chars.RightBrace) {
            report(parser, Errors.InvalidHexEscapeSequence);
        }

        consumeOpt(parser, Chars.RightBrace);

        // '\uDDDD'
    } else {

        for (let i = 0; i < 4; i++) {
            ch = nextChar(parser);
            const digit = toHex(ch);
            if (digit < 0) report(parser, Errors.InvalidHexEscapeSequence);
            codePoint = (codePoint << 4) | digit;
            advance(parser);
        }
    }

    return codePoint;
}
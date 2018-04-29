import { Chars } from '../chars';
import { Parser } from '../types';
import { Errors, report, tolerant } from '../errors';
import { Token, descKeyword, tokenDesc } from '../token';
import { isValidIdentifierStart } from '../unicode';
import { scanEscapeSequence, throwStringError } from './string';
import { Context, Escape,  NumericState } from '../utilities';
import { readNext, fromCodePoint, hasNext, nextChar, advance } from './common';

/**
 * Consumes template brace
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function consumeTemplateBrace(parser: Parser, context: Context): Token {
    if (!hasNext(parser)) report(parser, Errors.UnterminatedTemplate);
    // Upon reaching a '}', consume it and rewind the scanner state
    parser.index--;
    parser.column--;
    return scanTemplate(parser, context);
}

/**
 * Scan template
 *
 * @param parser Parser object
 * @param context Context masks
 * @param first Codepoint
 */
export function scanTemplate(parser: Parser, context: Context): Token {
    const { index: start, lastValue } = parser;
    let tail = true;
    let ret: string | void = '';

    let ch = readNext(parser);

    loop:
        while (ch !== Chars.Backtick) {

            switch (ch) {
                // Break after a literal `${` (thus the dedicated code path).
                case Chars.Dollar:
                    {
                        const index = parser.index + 1;
                        if (index < parser.source.length &&
                            parser.source.charCodeAt(index) === Chars.LeftBrace) {
                            parser.index = index;
                            parser.column++;
                            tail = false;
                            break loop;
                        }
                        ret += '$';
                        break;
                    }

                case Chars.Backslash:
                    ch = readNext(parser);

                    if (ch >= 128) {
                        ret += fromCodePoint(ch);
                    } else {
                        parser.lastValue = ch;
                        // Because octals are forbidden in escaped template sequences and the fact that
                        // both string and template scanning uses the same method - 'scanEscapeSequence',
                        // we set the strict context mask.
                        const code = scanEscapeSequence(parser, context | Context.Strict, ch);
                        if (code >= 0) {
                            ret += fromCodePoint(code);
                        } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
                            ret = undefined;
                            ch = scanLooserTemplateSegment(parser, parser.lastValue);
                            if (ch < 0) {
                                tail = false;
                            }
                            break loop;
                        } else {
                            throwStringError(parser, context | Context.TaggedTemplate, code as Escape);
                        }
                        ch = parser.lastValue;
                    }

                    break;

                case Chars.CarriageReturn:
                case Chars.LineFeed:
                case Chars.LineSeparator:
                case Chars.ParagraphSeparator:
                    parser.column = -1;
                    parser.line++;
                    // falls through

                default:
                    if (ret != null) ret += fromCodePoint(ch);
            }

            ch = readNext(parser);
        }

    advance(parser);
    parser.tokenValue = ret;
    parser.lastValue = lastValue;

    if (tail) {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 1);
        return Token.TemplateTail;
    } else {
        parser.tokenRaw = parser.source.slice(start + 1, parser.index - 2);
        return Token.TemplateCont;
    }
}

/**
 * Scan looser template segment
 *
 * @param parser Parser object
 * @param ch codepoint
 */
function scanLooserTemplateSegment(parser: Parser, ch: number): number {
    while (ch !== Chars.Backtick) {
        if (ch === Chars.Dollar && parser.source.charCodeAt(parser.index + 1) === Chars.LeftBrace) {
            advance(parser);
            return -ch;
        }

        // Skip '\' and continue to scan the template token to search
        // for the end, without validating any escape sequences
        ch = readNext(parser);
    }

    return ch;
}

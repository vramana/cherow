import { Chars } from '../chars';
import { Parser } from '../types';
import { Errors, report, tolerant } from '../errors';
import { Token } from '../token';
import { isValidIdentifierStart } from '../unicode';
import { Context, RegexFlags, RegexState } from '../utilities';
import { isIdentifierPart, fromCodePoint, hasNext, nextChar, advance } from './common';

/**
 * Scans regular expression
 * 
 * @param parser Parser object
 * @param context Context masks
 */

export function scanRegularExpression(parser: Parser, context: Context): Token {

    const bodyStart = parser.index;

    let preparseState = RegexState.Empty;

    loop:
        while (true) {
            const ch = nextChar(parser);
            advance(parser);

            if (preparseState & RegexState.Escape) {
                preparseState &= ~RegexState.Escape;
            } else {
                switch (ch) {
                    case Chars.Slash:
                        if (!preparseState) break loop;
                        else break;
                    case Chars.Backslash:
                        preparseState |= RegexState.Escape;
                        break;
                    case Chars.LeftBracket:
                        preparseState |= RegexState.Class;
                        break;
                    case Chars.RightBracket:
                        preparseState &= RegexState.Escape;
                        break;
                    case Chars.CarriageReturn:
                    case Chars.LineFeed:
                    case Chars.LineSeparator:
                    case Chars.ParagraphSeparator:
                        report(parser, Errors.UnterminatedRegExp);
                    default: // ignore
                }
            }

            if (!hasNext(parser)) {
                report(parser, Errors.UnterminatedRegExp);
            }
        }

    const bodyEnd = parser.index - 1;

    let mask = RegexFlags.Empty;

    const { index: flagStart } = parser;

    loop:
        while (hasNext(parser)) {
            const code = nextChar(parser);

            switch (code) {
                case Chars.LowerG:

                    if (mask & RegexFlags.Global) tolerant(parser, context, Errors.DuplicateRegExpFlag, 'g');
                    mask |= RegexFlags.Global;
                    break;

                case Chars.LowerI:
                    if (mask & RegexFlags.IgnoreCase) tolerant(parser, context, Errors.DuplicateRegExpFlag, 'i');
                    mask |= RegexFlags.IgnoreCase;
                    break;

                case Chars.LowerM:
                    if (mask & RegexFlags.Multiline) tolerant(parser, context, Errors.DuplicateRegExpFlag, 'm');
                    mask |= RegexFlags.Multiline;
                    break;

                case Chars.LowerU:
                    if (mask & RegexFlags.Unicode) tolerant(parser, context, Errors.DuplicateRegExpFlag, 'u');
                    mask |= RegexFlags.Unicode;
                    break;

                case Chars.LowerY:
                    if (mask & RegexFlags.Sticky) tolerant(parser, context, Errors.DuplicateRegExpFlag, 'y');
                    mask |= RegexFlags.Sticky;
                    break;

                case Chars.LowerS:
                    if (mask & RegexFlags.DotAll) tolerant(parser, context, Errors.DuplicateRegExpFlag, 's');
                    mask |= RegexFlags.DotAll;
                    break;

                default:
                    if (!isIdentifierPart(code)) break loop;
                    report(parser, Errors.UnexpectedTokenRegExpFlag, fromCodePoint(code));
            }

            advance(parser);
        }

    const flags = parser.source.slice(flagStart, parser.index);

    const pattern = parser.source.slice(bodyStart, bodyEnd);

    parser.tokenRegExp = { pattern, flags };

    if (context & Context.OptionsRaw) parser.tokenRaw = parser.source.slice(parser.startIndex, parser.index);

    parser.tokenValue = validate(parser, context, pattern, flags);

    return Token.RegularExpression;
}

/**
 * Validates regular expressions
 *
 *
 * @param parser Parser instance
 * @param context Context masks
 * @param pattern Regexp body
 * @param flags Regexp flags
 */
function validate(
    parser: Parser,
    context: Context,
    pattern: string,
    flags: string) {

    if (!(context & Context.OptionsNode)) {
        try {
            RegExp(pattern);
        } catch (e) {
            report(parser, Errors.UnterminatedRegExp);
        }
    }
    try {
        return new RegExp(pattern, flags);
    } catch (e) {
        return null;
    }
}
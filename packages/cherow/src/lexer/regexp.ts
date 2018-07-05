import { ParserState } from '../types';
import { Chars } from '../chars';
import { Context } from '../common';
import { Token } from '../token';
import { Errors, report } from '../errors';
import { validateRegexBody } from '../runtime/regexp';
import { setRegExpState, RegexpState, RegExpFlags, isFlagStart } from '../runtime/common';

/**
 * Scans regular expression pattern
 *
 * @export
 * @param parser Parser object
 * @param context Context masks
 */
export function scanRegularExpression(state: ParserState, context: Context): Token {

    const { flags, pattern} = verifyRegExpPattern(state, context);
    state.tokenRegExp = { pattern, flags };

    if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);

    try {
      state.tokenValue = new RegExp(pattern, flags);
    } catch (e) {
      state.tokenValue = null;
    }

    return Token.RegularExpression;
}

/**
 * Validates regular expression pattern
 *
 * @export
 * @param parser Parser object
 * @param context Context masks
 */

export function verifyRegExpPattern(parser: ParserState, context: Context): {
    flags: string; pattern: string; state: RegexpState;
} {
    const bodyStart = parser.index;
    const bodyState = validateRegexBody(parser, context, 0, RegexpState.Valid);
    const bodyEnd = parser.index - 1;
    const { index: flagStart } = parser;
    const flagState = scanRegexFlags(parser);
    const flags = parser.source.slice(flagStart, parser.index);
    const pattern = parser.source.slice(bodyStart, bodyEnd);
    const state = setRegExpState(parser, flagState, bodyState);
    return { flags, pattern, state };
}

/**
 * Scan regular expression flags
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanRegexFlags(parser: ParserState): RegexpState {

    let mask = RegExpFlags.Empty;

    loop:
        while (parser.index < parser.length) {
            const c = parser.source.charCodeAt(parser.index);
            switch (c) {
                case Chars.LowerG:
                    if (mask & RegExpFlags.Global) report(parser, Errors.DuplicateRegExpFlag, 'g');
                    mask |= RegExpFlags.Global;
                    break;
                case Chars.LowerI:
                    if (mask & RegExpFlags.IgnoreCase) report(parser, Errors.DuplicateRegExpFlag, 'i');
                    mask |= RegExpFlags.IgnoreCase;
                    break;
                case Chars.LowerM:
                    if (mask & RegExpFlags.Multiline) report(parser, Errors.DuplicateRegExpFlag, 'm');
                    mask |= RegExpFlags.Multiline;
                    break;
                case Chars.LowerU:
                    if (mask & RegExpFlags.Unicode) {
                        report(parser, Errors.Unexpected, 'u');
                        return RegexpState.Invalid;
                    }
                    mask |= RegExpFlags.Unicode;
                    break;

                case Chars.LowerY:
                    if (mask & RegExpFlags.Sticky) report(parser, Errors.DuplicateRegExpFlag, 'y');
                    mask |= RegExpFlags.Sticky;
                    break;
                case Chars.LowerS:
                    if (mask & RegExpFlags.DotAll) report(parser, Errors.DuplicateRegExpFlag, 's');
                    mask |= RegExpFlags.DotAll;
                    break;

                default:
                    if (!isFlagStart(c)) break loop;
                    return RegexpState.Invalid;
            }
            parser.index++;
            parser.column++;
        }

    return mask & RegExpFlags.Unicode ? RegexpState.UnicodeMode : RegexpState.SloppyMode;
}

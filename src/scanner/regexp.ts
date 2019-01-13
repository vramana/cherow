import { Chars, isIdentifierPart } from '../chars';
import { Context, ParserState } from '../common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { fromCodePoint } from './common';

export enum RegexState {
  Empty = 0,
  Escape = 0x1,
  Class = 0x2
}

export enum RegexFlags {
  Empty = 0,
  IgnoreCase = 1 << 0,
  Global = 1 << 1,
  Multiline = 1 << 2,
  Unicode = 1 << 3,
  Sticky = 1 << 4,
  DotAll = 1 << 5
}

/**
 * Scans regular expression
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function scanRegularExpression(state: ParserState, context: Context): Token {
  const bodyStart = state.index;

  let preparseState = RegexState.Empty;

  loop: while (true) {
    const ch = state.source.charCodeAt(state.index);
    state.index++;
    state.column++;

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
          report(state, Errors.UnterminatedRegExp);
        default: // ignore
      }
    }

    if (state.index >= state.source.length) {
      report(state, Errors.UnterminatedRegExp);
    }
  }

  const bodyEnd = state.index - 1;

  let mask = RegexFlags.Empty;

  const { index: flagStart } = state;

  loop: while (state.index < state.source.length) {
    const code = state.source.charCodeAt(state.index);

    switch (code) {
      case Chars.LowerG:
        if (mask & RegexFlags.Global) report(state, Errors.DuplicateRegExpFlag, 'g');
        mask |= RegexFlags.Global;
        break;

      case Chars.LowerI:
        if (mask & RegexFlags.IgnoreCase) report(state, Errors.DuplicateRegExpFlag, 'i');
        mask |= RegexFlags.IgnoreCase;
        break;

      case Chars.LowerM:
        if (mask & RegexFlags.Multiline) report(state, Errors.DuplicateRegExpFlag, 'm');
        mask |= RegexFlags.Multiline;
        break;

      case Chars.LowerU:
        if (mask & RegexFlags.Unicode) report(state, Errors.DuplicateRegExpFlag, 'u');
        mask |= RegexFlags.Unicode;
        break;

      case Chars.LowerY:
        if (mask & RegexFlags.Sticky) report(state, Errors.DuplicateRegExpFlag, 'y');
        mask |= RegexFlags.Sticky;
        break;

      case Chars.LowerS:
        if (mask & RegexFlags.DotAll) report(state, Errors.DuplicateRegExpFlag, 's');
        mask |= RegexFlags.DotAll;
        break;

      default:
        if (!isIdentifierPart(code)) break loop;
        report(state, Errors.UnexpectedTokenRegExpFlag, fromCodePoint(code));
    }

    state.index++;
    state.column++;
  }

  const flags = state.source.slice(flagStart, state.index);

  const pattern = state.source.slice(bodyStart, bodyEnd);

  state.tokenRegExp = { pattern, flags };

  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);

  state.tokenValue = validate(state, pattern, flags);

  return Token.RegularExpression;
}

/**
 * Validates regular expressions
 *
 *
 * @param state Parser instance
 * @param context Context masks
 * @param pattern Regexp body
 * @param flags Regexp flags
 */
function validate(state: ParserState, pattern: string, flags: string): RegExp | null {
  try {
    RegExp(pattern);
  } catch (e) {
    report(state, Errors.UnterminatedRegExp);
  }

  try {
    return new RegExp(pattern, flags);
  } catch (e) {
    return null;
  }
}

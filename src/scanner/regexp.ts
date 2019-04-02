import { Chars } from '../chars';
import { Context, ParserState } from '../common';
import { Token } from '../token';
import { nextChar } from './common';
import { isIdentifierPart } from './charClassifier';

/**
 * Scans regular expression
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function scanRegularExpression(state: ParserState, context: Context): Token {
  if (state.index >= state.source.length) {
    return Token.Illegal;
  }

  const enum RegexState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2
  }
  const bodyStart = state.index;
  // Scan: ('/' | '/=') RegularExpressionBody '/' RegularExpressionFlags
  let preparseState = RegexState.Empty;

  loop: while (true) {
    const ch = state.currentChar;
    nextChar(state);

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
          return Token.Illegal;
        default: // ignore
      }
    }

    if (state.index >= state.source.length) {
      return Token.Illegal;
    }
  }

  const bodyEnd = state.index - 1;

  const enum RegexFlags {
    Empty = 0,
    IgnoreCase = 1 << 0,
    Global = 1 << 1,
    Multiline = 1 << 2,
    Unicode = 1 << 3,
    Sticky = 1 << 4,
    DotAll = 1 << 5
  }

  let mask = RegexFlags.Empty;

  const { index: flagStart } = state;

  while (isIdentifierPart(nextChar(state))) {
    switch (state.currentChar) {
      case Chars.LowerG:
        if (mask & RegexFlags.Global) return Token.Illegal;
        mask |= RegexFlags.Global;
        break;

      case Chars.LowerI:
        if (mask & RegexFlags.IgnoreCase) return Token.Illegal;
        mask |= RegexFlags.IgnoreCase;
        break;

      case Chars.LowerM:
        if (mask & RegexFlags.Multiline) return Token.Illegal;
        mask |= RegexFlags.Multiline;
        break;

      case Chars.LowerU:
        if (mask & RegexFlags.Unicode) return Token.Illegal;
        mask |= RegexFlags.Unicode;
        break;

      case Chars.LowerY:
        if (mask & RegexFlags.Sticky) return Token.Illegal;
        mask |= RegexFlags.Sticky;
        break;

      case Chars.LowerS:
        if (mask & RegexFlags.DotAll) return Token.Illegal;
        mask |= RegexFlags.DotAll;
        break;

      default:
        return Token.Illegal;
    }
  }
  const flags = state.source.slice(flagStart, state.index);

  const pattern = state.source.slice(bodyStart, bodyEnd);

  state.tokenRegExp = { pattern, flags };

  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);

  state.tokenValue = validate(pattern, flags);

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
function validate(pattern: string, flags: string): RegExp | null | Token {
  try {
    RegExp(pattern);
  } catch (e) {
    return Token.Illegal;
  }

  try {
    return new RegExp(pattern, flags);
  } catch (e) {
    return null;
  }
}

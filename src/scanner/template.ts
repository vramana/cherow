import { ParserState, Context } from '../common';
import { Chars } from '../chars';
import { Token } from '../token';
import { Escape, fromCodePoint, scanNext } from './common';
import { table, reportInvalidEscapeError } from './string';
import { report, Errors } from '../errors';

/**
 * Scan template
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanTemplate(state: ParserState, context: Context): Token {
  const { index: start, lastChar } = state;
  let tail = true;
  let ret: string | void = '';

  let ch = scanNext(state, Errors.UnterminatedTemplate);

  loop: while (ch !== Chars.Backtick) {
    switch (ch) {
      case Chars.Dollar: {
        const index = state.index + 1;
        if (index < state.source.length && state.source.charCodeAt(index) === Chars.LeftBrace) {
          state.index = index;
          state.column++;
          tail = false;
          break loop;
        }
        ret += '$';
        break;
      }

      case Chars.Backslash:
        ch = scanNext(state, Errors.UnterminatedTemplate);

        if (ch >= 128) {
          ret += fromCodePoint(ch);
        } else {
          state.lastChar = ch;
          const code = table[ch](state, context, ch);

          if (code >= 0) {
            ret += fromCodePoint(code);
          } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
            ret = undefined;
            ch = scanLooserTemplateSegment(state, state.lastChar);
            if (ch < 0) {
              ch = -ch;
              tail = false;
            }
            break loop;
          } else {
            reportInvalidEscapeError(state, code as Escape);
          }
          ch = state.lastChar;
        }

        break;

      case Chars.CarriageReturn:
        if (state.index < state.length && state.source.charCodeAt(state.index) === Chars.LineFeed) {
          if (ret != null) ret += fromCodePoint(ch);
          ch = state.source.charCodeAt(state.index);
          state.index++;
        }
      // falls through

      case Chars.LineFeed:
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        state.column = -1;
        state.line++;
      // falls through

      default:
        if (ret != null) ret += fromCodePoint(ch);
    }

    ch = scanNext(state, Errors.UnterminatedTemplate);
  }

  state.index++;
  state.column++; // Consume the quote or opening brace
  state.tokenValue = ret;
  state.lastChar = lastChar;
  if (tail) {
    state.tokenRaw = state.source.slice(start + 1, state.index - 1);
    return Token.TemplateTail;
  } else {
    state.tokenRaw = state.source.slice(start + 1, state.index - 2);
    return Token.TemplateCont;
  }
}

/**
 * Scan looser template segment
 *
 * @param parser Parser object
 * @param ch codepoint
 */
function scanLooserTemplateSegment(state: ParserState, ch: number): number {
  while (ch !== Chars.Backtick) {
    if (ch === Chars.Dollar && state.source.charCodeAt(state.index + 1) === Chars.LeftBrace) {
      state.index++;
      state.column++;
      return -ch;
    }

    // Skip '\' and continue to scan the template token to search
    // for the end, without validating any escape sequences
    ch = scanNext(state, Errors.UnterminatedTemplate);
  }

  return ch;
}

/**
 * Consumes template brace
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function consumeTemplateBrace(state: ParserState, context: Context): Token {
  if (state.index >= state.length) return report(state, Errors.Unexpected);
  state.index--;
  state.column--;
  return scanTemplate(state, context);
}

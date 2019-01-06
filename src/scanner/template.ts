import { ParserState, Context } from '../common';
import { Chars } from '../chars';
import { Token } from '../token';
import { Escape, fromCodePoint, scanNext } from './common';
import { table, handleStringError } from './string';
import { report, Errors } from '../errors';

export function scanTemplate(state: ParserState, context: Context): Token {
  const { index: start, lastChar } = state;
  let tail = true;
  let ret: string | void = '';

  let ch = scanNext(state);

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
        ch = scanNext(state);

        if (ch >= 128) {
          ret += fromCodePoint(ch);
        } else {
          state.lastChar = ch;
          const code = table[ch](state, context, ch);

          if (code >= 0) {
            ret += fromCodePoint(code);
          } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
            ret = undefined;
            ch = scanBadTemplate(state, state.lastChar);
            if (ch < 0) {
              ch = -ch;
              tail = false;
            }
            break loop;
          } else {
            handleStringError(state, code as Escape);
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

    ch = scanNext(state);
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

function scanBadTemplate(state: ParserState, ch: number): number {
  while (ch !== Chars.Backtick) {
    switch (ch) {
      case Chars.Dollar: {
        const index = state.index + 1;
        if (index < state.source.length && state.source.charCodeAt(index) === Chars.LeftBrace) {
          state.index = index;
          state.column++;
          return -ch;
        }
        break;
      }

      case Chars.Backslash:
        ch = scanNext(state);
        break;

      case Chars.CarriageReturn:
        if (state.index < state.length && state.source.charCodeAt(state.index) === Chars.LineFeed) {
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
      // do nothing
    }

    ch = scanNext(state);
  }

  return ch;
}

export function scanTemplateNext(state: ParserState, context: Context): Token {
  if (state.index >= state.length) return report(state, Errors.Unexpected);
  state.index--;
  state.column--;
  return scanTemplate(state, context);
}

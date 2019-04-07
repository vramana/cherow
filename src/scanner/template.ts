import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { nextCodePoint, fromCodePoint, Escape, handleEscapeError } from './common';
import { scanEscape } from './string';
import { report, Errors } from '../errors';
import { CharTypes, CharFlags } from './charClassifier';

export function scanTemplate(state: ParserState, context: Context): Token {
  const { index: start } = state;
  let tail = true;
  let result: string | void = '';

  while (nextCodePoint(state) !== Chars.Backtick) {
    if (state.currentChar === Chars.Dollar) {
      if (state.index + 1 < state.length && state.source.charCodeAt(state.index + 1) === Chars.LeftBrace) {
        state.index++;
        state.column++;
        tail = false;
        break;
      } else {
        result += '$';
      }
    } else if (state.currentChar === Chars.Backslash) {
      nextCodePoint(state); // consumes '/'
      if (state.currentChar >= 0x7e) {
        result += fromCodePoint(state.currentChar);
      } else {
        const code = scanEscape(state, context | Context.Strict, state.currentChar);

        if (code >= 0) {
          result += fromCodePoint(code);
        } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
          result = undefined;
          state.currentChar = scanLooserTemplateSegment(state, state.currentChar);
          if (state.currentChar < 0) {
            state.currentChar = -state.currentChar;
            tail = false;
          }
          break;
        } else {
          handleEscapeError(state, code as Escape, /* isTemplate */ true);
        }
      }
    } else {
      if (state.index >= state.length) {
        report(state, Errors.UnterminatedTemplate);
      }

      if (CharTypes[state.currentChar] & CharFlags.LineTerminator) {
        if (state.index < state.source.length && nextCodePoint(state) === Chars.LineFeed) {
          if (result != null) result += fromCodePoint(state.currentChar);
        }
        state.column = -1;
        state.line++;

        // falls through
      } else {
        if (result != null) result += fromCodePoint(state.currentChar);
      }
    }
  }

  nextCodePoint(state);
  state.tokenValue = result;
  if (tail) {
    state.tokenRaw = state.source.slice(start + 1, state.index - 1);
    return Token.TemplateTail;
  }

  state.tokenRaw = state.source.slice(start + 1, state.index - 2);
  return Token.TemplateSpan;
}

export function scanTemplateTail(state: ParserState, context: Context): Token {
  if (state.index >= state.length) return Token.Illegal;
  state.index--;
  return scanTemplate(state, context);
}

function scanLooserTemplateSegment(state: ParserState, ch: number): number {
  while (ch !== Chars.Backtick) {
    // Break after a literal `${` (thus the dedicated code path).
    if (ch === Chars.Dollar) {
      const index = state.index + 1;
      if (index < state.source.length && state.source.charCodeAt(index) === Chars.LeftBrace) {
        state.index = index;
        state.column++;
        return -ch;
      }
    } else if (ch === Chars.Backslash) {
      ch = nextCodePoint(state);
    } else if (
      CharTypes[state.currentChar] & CharFlags.LineTerminator ||
      (state.currentChar ^ Chars.LineSeparator) <= 1
    ) {
      if (ch === Chars.CarriageReturn) {
        if (state.index < state.source.length && nextCodePoint(state) === Chars.LineFeed) {
          ch = nextCodePoint(state);
          state.index++;
        }
      }
      state.column = -1;
      state.line++;
    }
    if (state.index >= state.length) {
      report(state, Errors.UnterminatedTemplate);
    }
    ch = nextCodePoint(state);
  }

  return ch;
}

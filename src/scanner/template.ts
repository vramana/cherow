import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { nextChar, fromCodePoint, Escape } from './common';
import { scanEscape } from './string';
import { report, Errors } from '../errors';

export function scanTemplate(state: ParserState, context: Context): any {
  const { index: start } = state;
  let result: string | void = '';
  let badEscape: boolean = false;
  nextChar(state);
  while (state.index < state.source.length) {
    if (state.currentChar === Chars.Backtick) {
      nextChar(state); // Consume '`'
      state.tokenValue = result;
      state.tokenRaw = state.source.slice(start + 1, state.index - 1);
      return Token.TemplateTail | (badEscape ? Token.BadEscape : 0);
    } else if (state.currentChar === Chars.Dollar) {
      if (state.index + 1 < state.length && state.source.charCodeAt(state.index + 1) === Chars.LeftBrace) {
        nextChar(state);
        state.tokenRaw = state.source.slice(start + 1, state.index - 2);
        return Token.TemplateSpan | (badEscape ? Token.BadEscape : 0);
      } else {
        result += '$';
      }
    } else if ((state.currentChar & 8) === 8 && state.currentChar === Chars.Backslash) {
      nextChar(state);
      if (state.currentChar > 0x7f) {
        result += fromCodePoint(state.currentChar);
      } else {
        const cooked = scanEscape(state, context, state.currentChar, /* isTemplate */ false);
        if (cooked === Escape.Invalid) badEscape = true;
        state.tokenValue += fromCodePoint(cooked);
      }
    } else {
      // The TRV of LineTerminatorSequence :: <CR> is the CV 0x000A.
      // The TRV of LineTerminatorSequence :: <CR><LF> is the sequence
      // consisting of the CV 0x000A.
      if ((state.currentChar as number) === Chars.CarriageReturn) {
        if (state.index < state.source.length && state.source.charCodeAt(state.index + 1) === Chars.LineFeed) {
          if (result != null) result += fromCodePoint(state.currentChar);
          nextChar(state);
        }
      }

      if (result != null) {
        result += fromCodePoint(state.currentChar);
      }
    }

    if (state.index >= state.length) report(state, Errors.UnterminatedTemplate);
    nextChar(state);
  }

  report(state, Errors.UnterminatedTemplate);
}

export function scanTemplateTail(state: ParserState, context: Context): Token {
  if (state.index >= state.length) return Token.Illegal;
  state.index--;
  return scanTemplate(state, context);
}

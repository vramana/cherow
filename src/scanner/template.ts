import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { nextChar, fromCodePoint, Escape, handleEscapeError } from './common';
import { scanEscape } from './string';
import { report, Errors } from '../errors';

export function scanTemplate(state: ParserState, context: Context): any {
  const { index: start } = state;
  let result: string | void = '';
  nextChar(state);
  while (state.index < state.source.length) {
    if (state.currentChar === Chars.Backtick) {
      nextChar(state); // Consume '`'
      state.tokenValue = result;
      state.tokenRaw = state.source.slice(start + 1, state.index - 1);
      return Token.TemplateTail;
    } else if (state.currentChar === Chars.Dollar) {
      if (state.index + 1 < state.length && state.source.charCodeAt(state.index + 1) === Chars.LeftBrace) {
        nextChar(state);
        state.tokenRaw = state.source.slice(start + 1, state.index - 2);
        return Token.TemplateSpan;
      } else {
        result += '$';
      }
    } else if ((state.currentChar & 8) === 8 && state.currentChar === Chars.Backslash) {
      nextChar(state);
      if (state.currentChar > 0x7f) {
        result += fromCodePoint(state.currentChar);
      } else {
        const code = scanEscape(state, context | Context.Strict, state.currentChar);

        if (code >= 0) {
          result += fromCodePoint(code);
        } else if (code !== Escape.Empty && context & Context.TaggedTemplate) {
          result = undefined;
          state.currentChar = scanLooserTemplateSegment(state, state.currentChar);
          state.currentChar = -state.currentChar;
          state.tokenRaw = state.source.slice(start + 1, state.index - 2);
          state.tokenValue = result;
          return Token.TemplateSpan;
        } else {
          handleEscapeError(state, code as Escape, /* isTemplate */ true);
        }
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

function scanLooserTemplateSegment(state: ParserState, ch: number): number {
  while (ch !== Chars.Backtick) {
    if (ch === Chars.Dollar && state.source.charCodeAt(state.index + 1) === Chars.LeftBrace) {
      state.currentChar = state.source.charCodeAt(state.index++);
      return -ch;
    }

    // Skip '\' and continue to scan the template token to search
    // for the end, without validating any escape sequences
    if (state.index >= state.length) report(state, Errors.UnterminatedTemplate);
    nextChar(state);
  }

  return ch;
}

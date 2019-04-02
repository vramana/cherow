import { ParserState, Context } from '../common';
import { Token } from '../token';
import { Chars } from '../chars';
import { CharTypes, CharFlags } from './charClassifier';
import { nextChar, fromCodePoint } from './common';
import { scanEscape } from './string';

export function scanTemplate(state: ParserState, context: Context, startedWithBacktick: boolean): Token {
  let badEscape = false;
  let marker = state.index;
  while (state.index < state.source.length) {
    // '${'
    if (
      (state.currentChar as number) === Chars.Dollar &&
      state.index + 1 < state.length &&
      state.source.charCodeAt(state.index + 1) === Chars.LeftBrace
    ) {
      state.tokenValue += state.source.substring(marker, state.index);
      return (startedWithBacktick ? Token.TemplateHead : Token.TemplateMiddle) | (badEscape ? Token.BadEscape : 0);
    }
    // '`'
    if ((state.currentChar as number) === Chars.Backtick) {
      state.tokenValue += state.source.substring(marker, state.index);
      nextChar(state);
      return (
        (startedWithBacktick ? Token.NoSubstitutionTemplateLiteral : Token.TemplateTail) |
        (badEscape ? Token.BadEscape : 0)
      );
    }

    // Escape character
    if (CharTypes[state.currentChar] & CharFlags.BackSlash) {
      state.tokenValue += state.source.slice(marker, state.index);
      nextChar(state);
      const cooked = scanEscape(state, context, state.currentChar, /* isTemplate */ true);
      if (cooked === -1) badEscape = true;
      state.tokenValue += fromCodePoint(cooked);
      marker = state.index;
      continue;
    }

    // The TRV of LineTerminatorSequence :: <CR> is the CV 0x000A.
    // The TRV of LineTerminatorSequence :: <CR><LF> is the sequence
    // consisting of the CV 0x000A.
    if ((state.currentChar as number) === Chars.CarriageReturn) {
      state.tokenValue += state.source.substring(marker, state.index);
      nextChar(state); // Consume '\n'

      if (state.index < state.length && (state.currentChar as number) === Chars.LineFeed) {
        nextChar(state);
      }
      state.tokenValue += '\n';
      marker = state.index;
      continue;
    }
    nextChar(state);
  }
  return Token.Illegal;
}

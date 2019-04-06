import { nextCodePoint } from './common';
import { CharTypes, CharFlags } from './charClassifier';
import { Chars } from '../chars';
import { Token } from '../token';
import { ParserState, Flags } from '../common';
import { report, Errors } from '../errors';

export function skipSingleLineComment(state: ParserState): Token {
  while (state.index < state.source.length) {
    if (CharTypes[state.currentChar] & CharFlags.LineTerminator || (state.currentChar ^ Chars.LineSeparator) <= 1) {
      break;
    }
    nextCodePoint(state);
  }
  return Token.WhiteSpace;
}

export function parseMultiComment(state: ParserState): any {
  while (state.index < state.length) {
    if (state.currentChar === Chars.Asterisk) {
      nextCodePoint(state);
      if ((state.currentChar as number) === Chars.Slash) {
        nextCodePoint(state);
        return Token.WhiteSpace;
      }
    }

    // ES 2020 11.3 Line Terminators
    if (
      ((state.currentChar & 83) < 3 && CharTypes[state.currentChar] & CharFlags.LineTerminator) ||
      (state.currentChar ^ Chars.LineSeparator) <= 1
    ) {
      state.flags |= Flags.NewLine;
    }
    nextCodePoint(state);
  }

  report(state, Errors.UnterminatedComment);
}

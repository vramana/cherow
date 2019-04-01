import { nextChar } from './common';
import { CharTypes, CharFlags } from './charClassifier';
import { Chars } from '../chars';
import { Token } from '../token';
import { ParserState, Context } from '../common';

export function parseSingleComment(state: ParserState): Token {
  while (state.index < state.source.length) {
    nextChar(state);
    if (CharTypes[state.currentChar] & CharFlags.LineTerminator || (state.currentChar & ~1) == 0x2028) {
      break;
    }
    nextChar(state);
  }
  return Token.WhiteSpace;
}

export function parseMultiComment(state: ParserState): Token {
  while (state.index < state.length) {
    nextChar(state);

    while (state.currentChar === Chars.Asterisk) {
      if (state.index >= state.source.length) {
        return Token.Illegal;
      }
      nextChar(state);
      if ((state.currentChar as number) === Chars.Slash) {
        nextChar(state);
        return Token.WhiteSpace;
      }
    }

    if (CharTypes[state.currentChar] & CharFlags.LineTerminator || (state.currentChar & ~1) == 0x2028) {
    }
  }
  return Token.Illegal;
}

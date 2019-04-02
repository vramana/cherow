import { nextChar } from './common';
import { CharTypes, CharFlags } from './charClassifier';
import { Chars } from '../chars';
import { Token } from '../token';
import { ParserState, Context } from '../common';

export function scanHtmlComment(state: ParserState, context: Context) {
  if (context & Context.Module) return Token.Illegal;
  return skipSingleLineComment(state);
}

export function skipSingleLineComment(state: ParserState): Token {
  while (state.index < state.source.length) {
    if (CharTypes[state.currentChar] & CharFlags.LineTerminator || (state.currentChar & ~1) === 0x2028) {
      break;
    }
    nextChar(state);
  }
  return Token.WhiteSpace;
}

export function parseMultiComment(state: ParserState): Token {
  do {
    while (state.currentChar === Chars.Asterisk) {
      nextChar(state);
      if ((state.currentChar as number) === Chars.Slash) {
        nextChar(state);
        return Token.WhiteSpace;
      }
    }
    nextChar(state);
  } while (CharTypes[state.currentChar] & CharFlags.MultilineCommentCharacterNeedsSlowPath);

  // Slow path
  while (state.index < state.length) {
    while (state.currentChar === Chars.Asterisk) {
      nextChar(state);
      if ((state.currentChar as number) === Chars.Slash) {
        nextChar(state);
        return Token.WhiteSpace;
      }
    }

    if (state.index >= state.source.length) {
      return Token.Illegal;
    }

    if (CharTypes[state.currentChar] & CharFlags.LineTerminator || (state.currentChar & ~1) === 0x2028) {
    } else {
      nextChar(state);
    }
  }
  return Token.Illegal;
}

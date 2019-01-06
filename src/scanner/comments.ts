import { Chars } from '../chars';
import { Token } from '../token';
import { Context } from '../common';
import { ParserState } from '../common';
import { report, Errors } from '../errors';
import {
  hasNext,
  advanceOne,
  nextChar,
  SeekState,
  consumeOpt,
  advanceNewline,
  consumeLineFeed,
  consumeAny
} from './common';

// https://tc39.github.io/proposal-hashbang/out.html
export function skipHashBang(state: ParserState, context: Context) {
  let index = state.index;
  if (index === state.source.length) return;
  if (state.source.charCodeAt(index) === Chars.ByteOrderMark) {
    index++;
    state.index = index;
  }

  if (context & Context.OptionsNext && index < state.source.length && state.source.charCodeAt(index) === Chars.Hash) {
    index++;
    if (index < state.source.length && state.source.charCodeAt(index) === Chars.Exclamation) {
      state.index = index + 1;
      skipSingleLineComment(state);
    } else {
      report(state, Errors.Unexpected);
    }
  }
}

export function skipSingleLineComment(state: ParserState): Token {
  while (hasNext(state)) {
    switch (nextChar(state)) {
      case Chars.CarriageReturn:
        advanceNewline(state);
        if (hasNext(state) && nextChar(state) === Chars.LineFeed) state.index++;
        state.flags | SeekState.NewLine;
        return Token.WhiteSpace;

      case Chars.LineFeed:
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        advanceNewline(state);
        state.flags | SeekState.NewLine;
        return Token.WhiteSpace;

      default:
        consumeAny(state);
    }
  }

  return Token.WhiteSpace;
}

export function skipBlockComment(state: ParserState): Token {
  while (hasNext(state)) {
    switch (nextChar(state)) {
      case Chars.Asterisk:
        advanceOne(state);
        state.flags &= ~SeekState.LastIsCR;
        if (consumeOpt(state, Chars.Slash)) return Token.WhiteSpace;
        break;

      case Chars.CarriageReturn:
        state.flags |= SeekState.NewLine | SeekState.LastIsCR;
        advanceNewline(state);
        break;

      case Chars.LineFeed:
        consumeLineFeed(state, (state.flags & SeekState.LastIsCR) !== 0);
        state.flags = (state.flags & ~SeekState.LastIsCR) | SeekState.NewLine;
        break;

      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        state.flags = (state.flags & ~SeekState.LastIsCR) | SeekState.NewLine;
        advanceNewline(state);
        break;

      default:
        state.flags &= ~SeekState.LastIsCR;
        consumeAny(state);
    }
  }

  return report(state, Errors.UnterminatedComment);
}

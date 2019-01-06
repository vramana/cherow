import { Chars } from '../chars';
import { Token } from '../token';
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
import { ParserState } from '../common';
import { report, Errors } from '../errors';

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

  return report(state, Errors.Unexpected);
}

import { Chars } from '../chars';
import { Token } from '../token';
import { Context, Flags } from '../common';
import { ParserState } from '../common';
import { report, Errors } from '../errors';
import { consumeOpt, advanceNewline, consumeLineFeed, consumeAny } from './common';

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
  while (state.index < state.length) {
    switch (state.source.charCodeAt(state.index)) {
      case Chars.CarriageReturn:
        advanceNewline(state);
        if (state.index < state.length && state.source.charCodeAt(state.index) === Chars.LineFeed) state.index++;
        state.flags | Flags.NewLine;
        return Token.WhiteSpace;

      case Chars.LineFeed:
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        advanceNewline(state);
        state.flags | Flags.NewLine;
        return Token.WhiteSpace;

      default:
        consumeAny(state);
    }
  }
  return Token.WhiteSpace;
}

export function skipBlockComment(state: ParserState): Token {
  while (state.index < state.length) {
    switch (state.source.charCodeAt(state.index)) {
      case Chars.Asterisk:
        state.index++;
        state.column++;
        state.flags &= ~Flags.LastIsCR;
        if (consumeOpt(state, Chars.Slash)) return Token.WhiteSpace;
        break;

      case Chars.CarriageReturn:
        state.flags |= Flags.NewLine | Flags.LastIsCR;
        advanceNewline(state);
        break;

      case Chars.LineFeed:
        consumeLineFeed(state, (state.flags & Flags.LastIsCR) !== 0);
        state.flags = (state.flags & ~Flags.LastIsCR) | Flags.NewLine;
        break;

      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        state.flags = (state.flags & ~Flags.LastIsCR) | Flags.NewLine;
        advanceNewline(state);
        break;

      default:
        state.flags &= ~Flags.LastIsCR;
        consumeAny(state);
    }
  }

  return report(state, Errors.UnterminatedComment);
}

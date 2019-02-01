import { Chars } from '../chars';
import { Token } from '../token';
import { Context, Flags } from '../common';
import { ParserState } from '../common';
import { report, Errors } from '../errors';
import { consumeOpt, consumeLineFeed } from './common';

export const enum CommentType {
  Single,
  Multi,
  HTMLOpen,
  HTMLClose,
  HashBang
}

export const CommentTypes = ['SingleLine', 'MultiLine', 'HTMLOpen', 'HTMLClose', 'HashbangComment'];

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
      skipSingleLineComment(state, CommentType.HashBang);
    } else {
      report(state, Errors.Unexpected);
    }
  }
}

export function skipSingleHTMLComment(state: ParserState, context: Context, type: CommentType): Token {
  if (context & Context.Module) report(state, Errors.HtmlCommentInModule);
  return skipSingleLineComment(state, type);
}
/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param state Parser object
 * @param returnToken Token to be returned
 */
export function skipSingleLineComment(state: ParserState, type: CommentType): Token {
  const { index: start } = state;
  while (state.index < state.length) {
    const next = state.source.charCodeAt(state.index);
    // Fast check for characters that require special handling.
    // Catches 0, \n, \r, 0x2028, and 0x2029 as efficiently
    // as possible, and lets through all common ASCII characters.
    if (
      (next - 0xe) & 0x2000 &&
      (next === Chars.CarriageReturn || next === Chars.LineFeed || (next ^ Chars.ParagraphSeparator) <= 1)
    ) {
      ++state.index;
      state.column = 0;
      ++state.line;
      if (
        state.index < state.length &&
        next === Chars.CarriageReturn &&
        state.source.charCodeAt(state.index) === Chars.LineFeed
      )
        ++state.index;
      state.flags |= Flags.NewLine;
      break;
    } else {
      ++state.index;
      ++state.column;
    }
  }
  if (state.onComment)
    state.onComment(CommentTypes[type & 0xff], state.source.slice(start, state.index), start, state.index);
  return Token.WhiteSpace;
}

export function skipBlockComment(state: ParserState): Token {
  const { index: start } = state;

  while (state.index < state.length) {
    const next = state.source.charCodeAt(state.index);
    if (next === Chars.Asterisk) {
      state.index++;
      state.column++;
      state.flags &= ~Flags.LastIsCR;
      if (consumeOpt(state, Chars.Slash)) {
        if (state.onComment)
          state.onComment(
            CommentTypes[CommentType.Multi & 0xff],
            state.source.slice(start, state.index - 2),
            start,
            state.index
          );
        return Token.WhiteSpace;
      }
    } else if ((next - 0xe) & 0x2000) {
      if ((next & 83) < 3 && next === Chars.CarriageReturn) {
        state.flags |= Flags.NewLine | Flags.LastIsCR;
        state.index++;
        state.column = 0;
        state.line++;
      } else if (next === Chars.LineFeed) {
        consumeLineFeed(state, (state.flags & Flags.LastIsCR) !== 0);
        state.flags = (state.flags & ~Flags.LastIsCR) | Flags.NewLine;
      } else if ((next ^ Chars.ParagraphSeparator) <= 1) {
        state.flags = (state.flags & ~Flags.LastIsCR) | Flags.NewLine;
        state.index++;
        state.column = 0;
        state.line++;
      }
    } else {
      state.flags &= ~Flags.LastIsCR;
      state.index++;
      state.column++;
    }
  }

  return report(state, Errors.UnterminatedComment);
}

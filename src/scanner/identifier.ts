import { ParserState, Context, Flags } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars, isIdentifierPart } from '../chars';
import { Errors, report } from '../errors';

export function scanMaybeIdentifier(state: ParserState, _: Context, first: number): Token | void {
  switch (first) {
    case Chars.NonBreakingSpace:
    case Chars.Ogham:
    case Chars.EnQuad:
    case Chars.EmQuad:
    case Chars.EnSpace:
    case Chars.EmSpace:
    case Chars.ThreePerEmSpace:
    case Chars.FourPerEmSpace:
    case Chars.SixPerEmSpace:
    case Chars.FigureSpace:
    case Chars.PunctuationSpace:
    case Chars.ThinSpace:
    case Chars.HairSpace:
    case Chars.NarrowNoBreakSpace:
    case Chars.MathematicalSpace:
    case Chars.IdeographicSpace:
    case Chars.Zwj:
    case Chars.Zwnj:
      state.index++;
      state.column++;
      return Token.WhiteSpace;
    case Chars.LineSeparator:
    case Chars.ParagraphSeparator:
      state.flags = (state.flags & ~Flags.LastIsCR) | Flags.NewLine;
      state.index++;
      state.column = 0;
      state.line++;
      return Token.WhiteSpace;
  }
  // TODO
  report(state, Errors.IllegalCaracter, String.fromCharCode(first));
}

export function scanIdentifier(state: ParserState): Token {
  let { index, column } = state;
  while (isIdentifierPart(state.source.charCodeAt(index))) {
    index++;
    column++;
  }
  state.tokenValue = state.source.slice(state.startIndex, index);
  if (state.source.charCodeAt(index) === Chars.Backslash) {
    //state.tokenValue += fromCodePoint(scanIdentifierRest(state));
  }
  state.index = index;
  state.column = column;
  return descKeywordTable[state.tokenValue] || Token.Identifier;
}

import { ParserState, Context, Flags } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars, isIdentifierStart, isIdentifierPart, AsciiLookup, CharType } from '../chars';
import { Errors, report } from '../errors';
import { fromCodePoint } from './common';

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

/**
 * Scan identifier or keyword.
 *
 * Note: A valid keyword start with a lowercase letter and are between 2 and 11 characters long
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanIdentifierOrKeyword(state: ParserState, context: Context): Token {
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

  const len = state.tokenValue.length;
  if (len >= 2 && len <= 11) {
    const keyword: Token | undefined = descKeywordTable[state.tokenValue];
    if (keyword !== undefined) return keyword;
  }
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, index);
  return Token.Identifier;
}

/**
 * Scan identifier
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanIdentifier(state: ParserState, context: Context): Token {
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
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, index);
  return Token.Identifier;
}

/**
 * Scans private name. Stage 3 proposal related
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanPrivateName(state: ParserState, _: Context): Token {
  let { index, column } = state;
  index++;
  column++;
  const start = index;
  // This validation is only to prevent `# x` and `# 3foo` cases.
  // Note: We have to be inside a class context for this to be valid
  if (/*!(context & Context.InClass) ||*/ !isIdentifierStart(state.source.charCodeAt(index))) {
    report(state, Errors.UnexpectedToken, fromCodePoint(state.source.charCodeAt(index)));
  }
  while (isIdentifierStart(state.source.charCodeAt(index))) {
    index++;
    column++;
  }
  state.tokenValue = state.source.slice(start, index);
  state.index = index;
  state.column = column;
  return Token.PrivateName;
}

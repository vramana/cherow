import { ParserState, Context, Flags } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars, isIdentifierStart, isIdentifierPart } from '../chars';
import { Errors, report } from '../errors';
import { fromCodePoint, toHex } from './common';

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
  while (isIdentifierPart(state.source.charCodeAt(state.index))) {
    state.index++;
    state.column++;
  }
  state.tokenValue = state.source.slice(state.startIndex, state.index);
  if (state.source.charCodeAt(state.index) === Chars.Backslash) {
    state.index = index;
    state.column = column;
    return scanIdentifierRest(state, context);
  }

  const len = state.tokenValue.length;
  if (len >= 2 && len <= 11) {
    const keyword: Token | undefined = descKeywordTable[state.tokenValue];
    if (keyword !== undefined) return keyword;
  }
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
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
    state.index = index;
    state.column = column;
    return scanIdentifierRest(state, context);
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

export function scanIdentifierRest(state: ParserState, context: Context): Token {
  let hasEscape = false;
  let result = '';
  let start = state.index;
  while (state.index < state.length) {
    let ch = state.source.charCodeAt(state.index);
    if (isIdentifierPart(ch)) {
      state.index++;
      state.column++;
    } else if ((ch & 8) === 8 && ch === Chars.Backslash) {
      hasEscape = true;
      result += state.source.substring(start, state.index);
      let cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) report(state, Errors.InvalidIdentChar);
      result += fromCodePoint(cookedChar);
      start = state.index;
    } else if (ch >= 0xd800 && ch <= 0xdbff) {
      if (state.index >= state.length) report(state, Errors.Unexpected);
      let lo = state.source.charCodeAt(state.index);
      ++state.index;
      ++state.column;
      if (!(lo >= 0xdc00 && lo <= 0xdfff)) {
        report(state, Errors.Unexpected);
      }
      ch = ((ch & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
    } else {
      break;
    }
  }

  state.tokenValue = result += state.source.substring(start, state.index);

  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);

  const len = state.tokenValue.length;

  if (len >= 2 && len <= 11) {
    const keyword: Token | undefined = descKeywordTable[state.tokenValue];

    if (keyword !== undefined) {
      return !hasEscape || keyword === Token.Identifier
        ? keyword
        : keyword & (Token.IsYield | Token.IsAsync)
        ? Token.EscapedKeyword
        : (keyword & Token.FutureReserved) === Token.FutureReserved
        ? hasEscape
          ? Token.EscapedStrictReserved
          : keyword
        : context & Context.Strict && keyword === Token.StaticKeyword
        ? Token.EscapedStrictReserved
        : keyword === Token.LetKeyword
        ? Token.EscapedStrictReserved
        : Token.EscapedKeyword;
    }
  }

  return Token.Identifier;
}

export function scanIdentifierUnicodeEscape(state: ParserState) {
  // Read 'u' characters
  state.index++;
  state.column++;
  if (state.source.charCodeAt(state.index) !== Chars.LowerU) report(state, Errors.UnsupportedIdentEscape);
  state.index++;
  state.column++;
  return scanUnicodeEscape(state);
}

/**
 * Scans identifier unicode escape
 *
 * @param state ParserState instance
 */
function scanUnicodeEscape(state: ParserState): number {
  let { index, source, length } = state;
  let ch = state.source.charCodeAt(index++);
  let value = 0;
  if (ch === Chars.LeftBrace) {
    value = toHex(source.charCodeAt(index++));

    if (value < 0 || index === length) return report(state, Errors.InvalidIdentChar);

    ch = source.charCodeAt(index++);

    while (ch !== Chars.RightBrace) {
      const digit = toHex(ch);
      if (digit < 0) return report(state, Errors.InvalidIdentChar);
      value = (value << 4) | digit;
      if (value > 0x10ffff) report(state, Errors.UnicodeOverflow);
      ch = source.charCodeAt(index++);
    }

    if (value < 0 || ch !== Chars.RightBrace) report(state, Errors.InvalidDynamicUnicode);
  } else {
    // \uNNNN
    value = toHex(ch);
    if (value < 0) report(state, Errors.InvalidIdentChar);

    for (let i = 0; i < 3; i++) {
      if (index === length) report(state, Errors.InvalidUnicodeEscape);
      ch = source.charCodeAt(index++);
      const digit = toHex(ch);
      if (digit < 0) report(state, Errors.InvalidIdentChar);
      value = (value << 4) | digit;
    }
  }
  state.index = state.column = index;
  return value;
}

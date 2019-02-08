import { ParserState, Context, Flags } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars, isIdentifierStart, isIdentifierPart } from '../chars';
import { Errors, report } from '../errors';
import { fromCodePoint, toHex, advanceOne, advance } from './common';

/**
 * Scan identifier or keyword.
 *
 * Note: A valid keyword start with a lowercase letter and are between 2 and 11 characters long
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanIdentifierOrKeyword(state: ParserState, context: Context, first: number): Token {
  const { index, column } = state;
  while (isIdentifierPart((first = state.source.charCodeAt(state.index)))) {
    advanceOne(state);
  }
  state.tokenValue = state.source.slice(state.startIndex, state.index);
  if (state.index < state.length && first === Chars.Backslash) {
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
export function scanIdentifier(state: ParserState, context: Context, first: number): Token {
  const { index, column } = state;
  while (isIdentifierPart((first = state.source.charCodeAt(state.index)))) {
    advanceOne(state);
  }
  state.tokenValue = state.source.slice(state.startIndex, state.index);
  if (state.index < state.length && first === Chars.Backslash) {
    state.index = index;
    state.column = column;
    return scanIdentifierRest(state, context);
  }
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
  return Token.Identifier;
}

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
      advanceOne(state);
      return Token.WhiteSpace;
    case Chars.LineSeparator:
    case Chars.ParagraphSeparator:
      state.flags = (state.flags & ~Flags.LastIsCR) | Flags.NewLine;
      ++state.index;
      state.column = 0;
      ++state.line;
      return Token.WhiteSpace;
  }

  if (state.index < state.length && first >= 0xd800 && 0xdbff <= 0xdbff) {
    const lo = state.source.charCodeAt(state.index);
    if (lo >= 0xdc00 && lo <= 0xdfff) {
      first = ((first & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
      ++state.index;
    }
    ++state.column;
    state.tokenValue = state.source.slice(state.startIndex, state.index);
    return Token.Identifier;
  }

  report(state, Errors.IllegalCaracter, String.fromCharCode(first));
}

/**
 * Scans private name. Stage 3 proposal related
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanPrivateName(state: ParserState, _: Context): Token {
  advanceOne(state);
  const start = state.index;
  // This validation is only to prevent `# x` and `# 3foo` cases.
  // Note: We have to be inside a class context for this to be valid
  if (/*!(context & Context.InClass) ||*/ !isIdentifierStart(state.source.charCodeAt(state.index))) {
    report(state, Errors.UnexpectedToken, fromCodePoint(state.source.charCodeAt(state.index)));
  }
  while (isIdentifierStart(state.source.charCodeAt(state.index))) {
    advanceOne(state);
  }
  state.tokenValue = state.source.slice(start, state.index);
  return Token.PrivateName;
}

export function nextIdentifierChar(state: ParserState) {
  let hi = state.source.charCodeAt(state.index);
  if (hi >= 0xd800 && hi <= 0xdbff) {
    let lo = state.source.charCodeAt(state.index + 1);
    if ((lo & 0xfc00) === 0xdc00) {
      hi = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
      ++state.index;
    }
    ++state.column;
  }

  return hi;
}

export function scanIdentifierRest(state: ParserState, context: Context): Token {
  let hasEscape = false;
  let result = '';
  let start = state.index;
  while (state.index < state.length) {
    let ch = nextIdentifierChar(state);
    if (isIdentifierPart(ch)) {
      advanceOne(state);
    } else if ((ch & 8) === 8 && ch === Chars.Backslash) {
      hasEscape = true;
      result += state.source.substring(start, state.index);
      const cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) report(state, Errors.InvalidIdentChar);
      result += fromCodePoint(cookedChar);
      start = state.index;
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
        : context & Context.Strict && (keyword === Token.StaticKeyword || keyword === Token.LetKeyword)
        ? Token.EscapedStrictReserved
        : Token.EscapedKeyword;
    }
  }

  return Token.Identifier;
}

export function scanIdentifierUnicodeEscape(state: ParserState) {
  // Read 'u' characters
  advanceOne(state);
  if (state.source.charCodeAt(state.index) !== Chars.LowerU) report(state, Errors.UnsupportedIdentEscape);
  advanceOne(state);
  return scanUnicodeEscape(state);
}

/**
 * Scans identifier unicode escape
 *
 * @param state ParserState instance
 */
function scanUnicodeEscape(state: ParserState): number {
  let ch = state.source.charCodeAt(state.index++);
  let value = 0;
  if (ch === Chars.LeftBrace) {
    value = toHex(state.source.charCodeAt(state.index++));
    if (value < 0 || state.index === state.length) return report(state, Errors.InvalidIdentChar);
    ch = state.source.charCodeAt(state.index++);
    while (ch !== Chars.RightBrace) {
      const digit = toHex(ch);
      if (digit < 0) return report(state, Errors.InvalidIdentChar);
      value = (value << 4) | digit;
      if (value > 0x10ffff) report(state, Errors.UnicodeOverflow);
      ch = state.source.charCodeAt(state.index++);
    }

    if (value < 0 || ch !== Chars.RightBrace) report(state, Errors.InvalidDynamicUnicode);
  } else {
    // \uNNNN
    value = toHex(ch);
    if (value < 0) report(state, Errors.InvalidIdentChar);

    for (let i = 0; i < 3; i++) {
      if (state.index === state.length) report(state, Errors.InvalidUnicodeEscape);
      ch = state.source.charCodeAt(state.index++);
      const digit = toHex(ch);
      if (digit < 0) report(state, Errors.InvalidIdentChar);
      value = (value << 4) | digit;
    }
  }
  state.column = state.index;
  return value;
}

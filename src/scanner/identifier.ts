import { ParserState, Context } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars } from '../chars';
import { nextChar, consumeOptAstral, fromCodePoint, convertToHex, Escape } from './common';
import { CharTypes, CharFlags, isIdentifierStart, isIdentifierPart } from './charClassifier';

export function scanIdentifier(state: ParserState, context: Context): Token {
  let hasEscape = false;
  let canBeKeyword = true;
  if (state.currentChar <= 0x7f) {
    if ((CharTypes[state.currentChar] & CharFlags.BackSlash) === 0) {
      let allChars = 0;
      do {
        allChars |= state.currentChar;
      } while ((CharTypes[nextChar(state)] & CharFlags.IdentifierPart) !== 0);

      state.tokenValue = state.source.slice(state.startIndex, state.index);

      if (allChars & ~0xff) {
        return descKeywordTable[state.tokenValue] || Token.Identifier;
      }
    } else {
      hasEscape = true;
      const cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) return Token.Illegal;
      canBeKeyword = (CharTypes[cookedChar] & CharFlags.KeywordCandidate) !== 0;
      state.tokenValue += fromCodePoint(cookedChar);
    }
  }

  return scanIdentifierSlowCase(state, context, hasEscape, canBeKeyword);
}

export function scanIdentifierSlowCase(
  state: ParserState,
  context: Context,
  hasEscape: boolean,
  canBeKeyword: boolean
): Token {
  let start = state.index;
  while (state.index < state.source.length) {
    if (state.currentChar === Chars.Backslash) {
      hasEscape = true;
      let cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) return Token.Illegal;
      canBeKeyword = canBeKeyword && (CharTypes[cookedChar] & CharFlags.KeywordCandidate) !== 0;
      nextChar(state);
      state.tokenValue += fromCodePoint(cookedChar);
      start = state.index - 1;
    } else if (isIdentifierPart(state.currentChar) || consumeOptAstral(state, state.currentChar)) {
      nextChar(state);
    } else {
      break;
    }
  }

  if (state.index <= state.source.length) {
    state.tokenValue += state.source.slice(start, state.index);
  }

  const length = state.tokenValue.length;

  if (canBeKeyword && (length >= 2 && length <= 11)) {
    const keyword: Token | undefined = descKeywordTable[state.tokenValue];
    if (keyword === undefined) return Token.Identifier;
    if (!hasEscape) return keyword;

    if (keyword === Token.YieldKeyword) return keyword;

    if ((keyword & Token.FutureReserved) === Token.FutureReserved) {
      return context & Context.Strict && hasEscape ? Token.EscapedStrictReserved : keyword;
    }

    return context & Context.Strict && (keyword === Token.LetKeyword || keyword === Token.StaticKeyword)
      ? Token.EscapedStrictReserved
      : Token.EscapedKeyword;
  }
  return Token.Identifier;
}

export function scanPrivateName(state: ParserState): Token {
  if (!isIdentifierStart(state.source.charCodeAt(state.index + 1))) {
    return Token.Illegal;
  }
  nextChar(state);
  const { index } = state;
  while ((CharTypes[nextChar(state)] & CharFlags.IdentifierPart) !== 0) {}
  state.tokenValue = state.source.slice(index, state.index);
  return Token.PrivateField;
}

export function scanIdentifierUnicodeEscape(state: ParserState): number {
  // Check for Unicode escape of the form '\uXXXX'
  // and return code point value if valid Unicode escape is found. Otherwise return -1.
  if (state.index + 5 < state.length && state.source.charCodeAt(state.index + 1) === Chars.LowerU) {
    state.currentChar = state.source.charCodeAt((state.index += 2));
    return scanUnicodeEscapeValue(state);
  }
  return Escape.Invalid;
}

export function scanUnicodeEscapeValue(state: ParserState): number {
  let codePoint = 0;
  if (state.currentChar === Chars.LeftBrace) {
    nextChar(state);

    do {
      if ((CharTypes[state.currentChar] & (CharFlags.Decimal | CharFlags.Hex)) === 0) {
        return Escape.Invalid;
      }
      codePoint = codePoint * 0x10 + convertToHex(state.currentChar);
      if (codePoint > Chars.LastUnicodeChar) {
        return Escape.Invalid;
      }
      nextChar(state);
    } while ((state.currentChar as number) !== Chars.RightBrace);

    // At least 4 characters have to be read
    if (codePoint < 0 || (state.currentChar as number) !== Chars.RightBrace) {
      return Escape.Invalid;
    }
    nextChar(state);
    return codePoint;
  }

  const char2 = state.source.charCodeAt(state.index + 1);
  const char3 = state.source.charCodeAt(state.index + 2);
  const char4 = state.source.charCodeAt(state.index + 3);

  if (
    (CharTypes[state.currentChar] & (CharFlags.Decimal | CharFlags.Hex)) === 0 ||
    (CharTypes[char2] & (CharFlags.Decimal | CharFlags.Hex)) === 0 ||
    (CharTypes[char3] & (CharFlags.Decimal | CharFlags.Hex)) === 0 ||
    (CharTypes[char4] & (CharFlags.Decimal | CharFlags.Hex)) === 0
  ) {
    return Escape.Invalid;
  }

  codePoint =
    (((convertToHex(state.currentChar) << 4) | convertToHex(char2)) << 8) |
    (convertToHex(char3) << 4) |
    convertToHex(char4);

  state.currentChar = state.source.charCodeAt((state.index += 4));

  return codePoint;
}

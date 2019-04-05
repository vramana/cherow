import { ParserState, Context } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars } from '../chars';
import { nextChar, consumeMultiUnitCodePoint, fromCodePoint, toHex, Escape } from './common';
import { CharTypes, CharFlags, isIdentifierStart, isIdentifierPart } from './charClassifier';
import { report, Errors } from '../errors';

export function scanIdentifier(state: ParserState, context: Context): Token {
  let hasEscape = false;
  let canBeKeyword = (CharTypes[state.currentChar] & CharFlags.KeywordCandidate) !== 0;
  if (state.currentChar <= 0x7f) {
    if ((CharTypes[state.currentChar] & CharFlags.BackSlash) === 0) {
      while ((CharTypes[nextChar(state)] & CharFlags.IdentifierPart) !== 0) {}
      state.tokenValue = state.source.slice(state.startIndex, state.index);
      if (state.currentChar > 0x7f) return scanIdentifierSlowCase(state, context, hasEscape, canBeKeyword);

      if ((CharTypes[state.currentChar] & CharFlags.BackSlash) === 0) {
        return descKeywordTable[state.tokenValue] || Token.Identifier;
      }
    } else {
      hasEscape = true;
      const cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) report(state, Errors.InvalidExtendedUnicodeEscape);
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
    if ((state.currentChar & 8) === 8 && state.currentChar === Chars.Backslash) {
      state.tokenValue += state.source.slice(start, state.index);
      hasEscape = true;
      let cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) report(state, Errors.InvalidExtendedUnicodeEscape);
      canBeKeyword = canBeKeyword && (CharTypes[cookedChar] & CharFlags.KeywordCandidate) !== 0;
      state.tokenValue += fromCodePoint(cookedChar);
      start = state.index;
    } else if (isIdentifierPart(state.currentChar) || consumeMultiUnitCodePoint(state, state.currentChar)) {
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
  nextChar(state);
  const { index } = state;
  if (!isIdentifierStart(state.currentChar)) {
    report(state, Errors.InvalidOrUnexpectedToken);
  }
  while (CharTypes[nextChar(state)] & CharFlags.IdentifierPart) {}
  state.tokenValue = state.source.slice(index, state.index);
  return Token.PrivateField;
}

export function scanIdentifierUnicodeEscape(state: ParserState): any {
  // Check for Unicode escape of the form '\uXXXX'
  // and return code point value if valid Unicode escape is found. Otherwise return -1.
  if (state.index + 5 < state.length && state.source.charCodeAt(state.index + 1) === Chars.LowerU) {
    state.currentChar = state.source.charCodeAt((state.index += 2));
    return scanUnicodeEscapeValue(state);
  }
  report(state, Errors.InvalidUnicodeIdentName);
}

export function scanUnicodeEscapeValue(state: ParserState): number {
  let codePoint = 0;
  if (state.currentChar === Chars.LeftBrace) {
    nextChar(state);

    do {
      if ((CharTypes[state.currentChar] & CharFlags.Hex) === 0) {
        report(state, Errors.InvalidExtendedUnicodeEscape);
      }
      codePoint = codePoint * 0x10 + toHex(state.currentChar);
      if (codePoint > Chars.LastUnicodeChar) {
        report(state, Errors.UnicodeOutOfRange);
      }
      nextChar(state);
    } while ((state.currentChar as number) !== Chars.RightBrace);

    // At least 4 characters have to be read
    if (codePoint < 1 || (state.currentChar as number) !== Chars.RightBrace) {
      report(state, Errors.InvalidDynamicUnicode);
    }
    nextChar(state);
    return codePoint;
  }

  const c2 = state.source.charCodeAt(state.index + 1);
  const c3 = state.source.charCodeAt(state.index + 2);
  const c4 = state.source.charCodeAt(state.index + 3);

  if (
    (CharTypes[state.currentChar] & CharFlags.Hex) === 0 ||
    (CharTypes[c2] & CharFlags.Hex) === 0 ||
    (CharTypes[c3] & CharFlags.Hex) === 0 ||
    (CharTypes[c4] & CharFlags.Hex) === 0
  ) {
    report(state, Errors.InvalidIdentCharIdentEscape);
  }

  codePoint = (((toHex(state.currentChar) << 4) | toHex(c2)) << 8) | (toHex(c3) << 4) | toHex(c4);

  state.currentChar = state.source.charCodeAt((state.index += 4));

  return codePoint;
}

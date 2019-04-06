import { ParserState, Context } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars } from '../chars';
import { nextCodePoint, consumeMultiUnitCodePoint, fromCodePoint, toHex, Escape, handleEscapeError } from './common';
import { CharTypes, CharFlags, isIdentifierStart, isIdentifierPart } from './charClassifier';
import { report, Errors } from '../errors';

export function scanIdentifier(state: ParserState, context: Context): Token {
  let hasEscape = false;
  let canBeKeyword = (CharTypes[state.currentChar] & CharFlags.KeywordCandidate) !== 0;
  if (state.currentChar <= 0x7e) {
    if ((CharTypes[state.currentChar] & CharFlags.BackSlash) === 0) {
      while ((CharTypes[nextCodePoint(state)] & CharFlags.IdentifierPart) !== 0) {}
      state.tokenValue = state.source.slice(state.startIndex, state.index);
      if (state.currentChar > 0x7e) return scanIdentifierSlowCase(state, context, hasEscape, canBeKeyword);

      if ((CharTypes[state.currentChar] & CharFlags.BackSlash) === 0) {
        return descKeywordTable[state.tokenValue] || Token.Identifier;
      }
    } else {
      hasEscape = true;
      const code = scanIdentifierUnicodeEscape(state);
      if (code >= 0) {
        if (!isIdentifierPart(code)) report(state, Errors.InvalidExtendedUnicodeEscape);
        canBeKeyword = (CharTypes[code] & CharFlags.KeywordCandidate) !== 0;
        state.tokenValue += fromCodePoint(code);
      } else handleEscapeError(state, code, /* isTemplate */ false);
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
      let code = scanIdentifierUnicodeEscape(state);
      if (code >= 0) {
        if (!isIdentifierPart(code)) report(state, Errors.InvalidExtendedUnicodeEscape);
        canBeKeyword = canBeKeyword && (CharTypes[code] & CharFlags.KeywordCandidate) !== 0;
        state.tokenValue += fromCodePoint(code);
        start = state.index;
      } else handleEscapeError(state, code, /* isTemplate */ false);
    } else if (isIdentifierPart(state.currentChar) || consumeMultiUnitCodePoint(state, state.currentChar)) {
      nextCodePoint(state);
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
  nextCodePoint(state); // consumes '#'
  const { index } = state;
  if (!isIdentifierStart(state.currentChar)) {
    report(state, Errors.InvalidOrUnexpectedToken);
  }
  while (CharTypes[nextCodePoint(state)] & CharFlags.IdentifierPart) {}
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

export function scanUnicodeEscapeValue(state: ParserState): number | Escape {
  let codePoint = 0;
  // First handle a delimited Unicode escape, e.g. \u{1F4A9}
  if (state.currentChar === Chars.LeftBrace) {
    while (CharTypes[nextCodePoint(state)] & CharFlags.Hex) {
      codePoint = (codePoint << 4) | toHex(state.currentChar);
      // Check this early to avoid `code` wrapping to a negative on overflow (which is
      // reserved for abnormal conditions).
      if (codePoint > Chars.NonBMPMax) {
        return Escape.OutOfRange;
      }
    }

    // At least 4 characters have to be read
    if (codePoint < 1 || (state.currentChar as number) !== Chars.RightBrace) {
      return Escape.InvalidHex;
    }
    nextCodePoint(state); // consumes '}'
    return codePoint;
  }

  if ((CharTypes[state.currentChar] & CharFlags.Hex) === 0) return Escape.InvalidIdentChar; // first one is mandatory

  const c2 = state.source.charCodeAt(state.index + 1);
  if ((CharTypes[c2] & CharFlags.Hex) === 0) return Escape.InvalidIdentChar;
  const c3 = state.source.charCodeAt(state.index + 2);
  if ((CharTypes[c3] & CharFlags.Hex) === 0) return Escape.InvalidIdentChar;
  const c4 = state.source.charCodeAt(state.index + 3);
  if ((CharTypes[c4] & CharFlags.Hex) === 0) return Escape.InvalidIdentChar;

  codePoint = (toHex(state.currentChar) << 12) | (toHex(c2) << 8) | (toHex(c3) << 4) | toHex(c4);

  state.currentChar = state.source.charCodeAt((state.index += 4));

  return codePoint;
}

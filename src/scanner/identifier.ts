import { ParserState, Context } from '../common';
import { Token, descKeywordTable } from '../token';
import { Chars } from '../chars';
import { nextChar, scanHexNumber, scanUnlimitedLengthHexNumber, consumeOptAstral, fromCodePoint } from './common';
import { CharTypes, CharFlags, isIdentifierPart } from './charClassifier';

export function scanIdentifier(state: ParserState, context: Context): Token {
  let hasEscape = false;
  let canBeKeyword = false;
  if (state.currentChar <= 0x7f) {
    const { index } = state;
    let allChars = 0;

    if ((CharTypes[state.currentChar] & CharFlags.NeedSlowPath) === 0) {
      while ((CharTypes[nextChar(state)] & CharFlags.IdentifierPart) !== 0) {
        allChars |= state.currentChar;
      }

      state.tokenValue = state.source.slice(index, state.index);
      if (allChars & ~0xff) {
        return descKeywordTable[state.tokenValue] || Token.Identifier;
      }
      canBeKeyword = true;
    } else {
      hasEscape = true;
      const cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) return Token.Illegal;
      canBeKeyword = (CharTypes[cookedChar] & CharFlags.NoKeywordCandidate) !== CharFlags.NoKeywordCandidate;
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
    if ((CharTypes[state.currentChar] & CharFlags.NeedSlowPath) !== 0) {
      hasEscape = true;
      let cookedChar = scanIdentifierUnicodeEscape(state);
      if (!isIdentifierPart(cookedChar)) return Token.Illegal;
      canBeKeyword =
        canBeKeyword && (CharTypes[cookedChar] & CharFlags.NoKeywordCandidate) !== CharFlags.NoKeywordCandidate;
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

export function scanIdentifierUnicodeEscape(state: ParserState): Token {
  nextChar(state);
  if (state.currentChar !== Chars.LowerU) return -1;
  nextChar(state);
  return scanUnicodeEscape(state);
}

export function scanUnicodeEscape(state: ParserState): Token {
  if (state.currentChar === Chars.LeftBrace) {
    let begin = state.index - 2;
    nextChar(state);
    let cp = scanUnlimitedLengthHexNumber(state, 0x10ffff, begin);
    if (cp < 0 || (state.currentChar as number) !== Chars.RightBrace) {
      return -1;
    }
    nextChar(state);
    return cp;
  }

  return scanHexNumber(state, 4);
}

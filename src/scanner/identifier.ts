import { ParserState, Context, unimplemented } from '../common';
import { hasNext, toHex, fromCodePoint } from './common';
import { Token, descKeywordTable } from '../token';
import { unicodeLookup } from '../unicode';
import { Chars, AsciiLookup, CharType, isIdentifierPart } from '../chars';

// WORK IN PROGRESS

export function scanKnownIdentifier(state: ParserState): Token {
  while (isIdentifierPart(state.source.charCodeAt(state.index))) state.index++;
  state.tokenValue = state.source.slice(state.startIndex, state.index);
  if (state.source.charCodeAt(state.index) === Chars.Backslash) {
    state.tokenValue += fromCodePoint(scanIdentifierRest(state));
  }
  return descKeywordTable[state.tokenValue] || Token.Identifier;
}

export function scanMaybeIdentifier(parser: ParserState, context: Context): Token {
  let p = parser;
  let c = context;

  // TODO
  return unimplemented();
}

export function scanIdentifierRest(state: ParserState): Token {
  let a = scanIdentifierUnicodeEscape(state);
  // state.tokenValue += fromCodePoint(a);
  //while (state.index < state.length) {}
  // TODO
  return a;
}
export const enum EscapeState {
  UnterminatedEscape,
  InvalidHex = 3
}
/**
 * Scans identifier unicode escape
 *
 * @param state ParserState instance
 */
export function scanIdentifierUnicodeEscape(state: ParserState): any {
  if (state.index === state.source.length) return EscapeState.UnterminatedEscape;
  let ch = state.source.charCodeAt(state.index++);
  ch = state.source.charCodeAt(state.index++);
  ch = state.source.charCodeAt(state.index++);
  let value = 0;
  if (ch === Chars.LeftBrace) {
    if (state.index === state.source.length) return EscapeState.UnterminatedEscape;
    // \u{N}
    // The first digit is required, so handle it *out* of the loop.
    ch = state.source.charCodeAt((state.index += 1));
    let code = toHex(ch);

    if (code < 0) return EscapeState.InvalidHex;

    if (state.index === state.source.length) return EscapeState.UnterminatedEscape;

    ch = state.source.charCodeAt((state.index += 1));
    let digits = 1;
    while (ch !== Chars.RightBrace) {
      const digit = toHex(ch);

      if (digit < 0) return EscapeState.InvalidHex;
      code = (code << 4) | digit;
      // Check this early to avoid `code` wrapping to a negative on overflow (which is
      // reserved for abnormal conditions).
      if (code > 0x10ffff) break;
      if (state.index === state.source.length) return EscapeState.UnterminatedEscape;
      ch = state.source.charCodeAt(state.index++);
      digits++;
    }

    return code;
  } else {
    // \uNNNN
    let code = toHex(ch);
    if (code < 0) return EscapeState.InvalidHex;

    for (let i = 0; i < 3; i++) {
      if (state.index === state.source.length) return EscapeState.UnterminatedEscape;
      ch = state.source.charCodeAt(state.index++);
      const digit = toHex(ch);
      if (digit < 0) return EscapeState.InvalidHex;
      code = (code << 4) | digit;
    }

    return code;
  }
}

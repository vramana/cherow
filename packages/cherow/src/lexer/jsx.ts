import { ParserState } from '../types';
import { Token } from '../token';
import { Chars, AsciiLookup, CharType } from '../chars';
import { nextChar, consume, fromCodePoint } from './common';
import { Context } from '../common';
import { nextToken } from './scan';
import { report, Errors } from '../errors';
import { readNext } from '../lexer/string';
import { unicodeLookup } from '../unicode';

// JSX Specification
// https://facebook.github.io/jsx/

/**
 * Mini scanner
 *
 * @param state state object
 * @param context Context masks
 */
export function scanJSXToken(state: ParserState): Token {
  if (state.index >= state.source.length) return state.token = Token.EndOfSource;
  state.lastIndex = state.startIndex = state.index;
  const char = state.source.charCodeAt(state.index);
  if (char === Chars.LessThan) {
      state.index++;
      state.column++;
      return state.token = consume(state, Chars.Slash) ? Token.JSXClose : Token.LessThan;
  } else if (char === Chars.LeftBrace) {
      state.index++;
      state.column++;
      return state.token = Token.LeftBrace;
  }

  while (state.index < state.source.length) {
      state.index++;
      state.column++;
      const next = state.source.charCodeAt(state.index);
      if (next === Chars.LeftBrace || next === Chars.LessThan) break;

  }
  return state.token = Token.JSXText;
}

/**
 * Scans JSX Attribute value
 *
 * @param state state object
 * @param context Context masks
 */

export function scanJSXAttributeValue(state: ParserState, context: Context): Token {
  state.lastIndex = state.index;
  if (state.nextChar === Chars.SingleQuote || state.nextChar === Chars.DoubleQuote) {
      return scanJSXString(state, context, state.nextChar);
  }
  return nextToken(state, context);
}

/**
 * Scans JSX String
 *
 * @param state state object
 * @param context Context masks
 * @param quote Code point
 */
function scanJSXString(state: ParserState, context: Context, quote: number): Token {
  nextChar(state); // skip the quote
  state.tokenValue = '';
  while (state.nextChar !== quote) {
      state.tokenValue += fromCodePoint(state.nextChar);
      nextChar(state);
      if (state.index >= state.source.length) report(state, Errors.UnterminatedString);
  }
  nextChar(state);
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
  return Token.StringLiteral;
}

/**
 * Scans JSX Identifier
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function scanJSXIdentifier(state: ParserState): Token {
  if (state.token & (Token.Identifier | Token.Keyword)) {
      const firstCharPosition = state.index;
      let ch = state.source.charCodeAt(state.index);
      while ((ch === Chars.Hyphen || (AsciiLookup[state.nextChar] & CharType.IDStart) > 0 ||
              (unicodeLookup[(state.nextChar >>> 5) + 34816] >>> state.nextChar & 31 & 1) > 0)) {
          ch = readNext(state);
      }
      state.tokenValue += state.source.substr(firstCharPosition, state.index - firstCharPosition);
  }
  return state.token;
}

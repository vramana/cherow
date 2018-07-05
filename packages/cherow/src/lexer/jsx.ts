import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { nextChar, consume, fromCodePoint } from './common';
import { Context } from '../common';
import { nextToken } from './scan';
import { report, Errors } from '../errors';

// JSX Specification
// https://facebook.github.io/jsx/

/**
 * Mini scanner
 *
 * @param state state object
 * @param context Context masks
 */
export function scanJSXToken(state: ParserState): Token {
  if (state.index >= state.source.length) return Token.EndOfSource;
  state.lastIndex = state.startIndex = state.index;
  const char = state.source.charCodeAt(state.index);
  if (char === Chars.LessThan) {
      state.index++;
      state.column++;
      return consume(state, Chars.Slash) ? Token.JSXClose : Token.LessThan;
  } else if (char === Chars.LeftBrace) {
      state.index++;
      state.column++;
      return Token.LeftBrace;
  }

  while (state.index < state.source.length) {
      state.index++;
      state.column++;
      const next = state.source.charCodeAt(state.index);
      if (next === Chars.LeftBrace || next === Chars.LessThan) break;

  }
  return Token.JSXText;
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

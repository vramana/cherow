import { Chars, isIdentifierStart } from '../chars';
import { Context, ParserState } from '../common';
import { report, Errors } from '../errors';
import { Token, KeywordDescTable } from 'token';
import { isIDContinue } from '../unicode';

export const enum Type {
  None = 0,
  MaybeQuantifier = 1 << 0,
  SeenAssertion = 1 << 1,
  SeenUnfixableAssertion = 1 << 2,
  TopLevel = 1 << 2
}

export const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

export function scanNext(state: ParserState, err: Errors): number {
  state.index++;
  state.column++;
  if (state.index >= state.length) report(state, err);
  return state.source.charCodeAt(state.index);
}

export function isFlagStart(code: number): boolean {
  return (
    isIDContinue(code) ||
    code === Chars.Backslash ||
    code === Chars.Dollar ||
    code === Chars.Underscore ||
    code === Chars.Zwnj ||
    code === Chars.Zwj
  );
}

export function nextChar(parser: ParserState) {
  return parser.source.charCodeAt(parser.index);
}

export function nextUnicodeChar(state: ParserState) {
  let { index } = state;
  const hi = state.source.charCodeAt(index++);

  if (hi < 0xd800 || hi > 0xdbff) return hi;
  if (index === state.source.length) return hi;
  const lo = state.source.charCodeAt(index);

  if (lo < 0xdc00 || lo > 0xdfff) return hi;
  return ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
}

export function consumeAny(state: ParserState) {
  const hi = state.source.charCodeAt(state.index++);
  let code = hi;

  if (hi >= 0xd800 && hi <= 0xdbff && state.index < state.length) {
    const lo = state.source.charCodeAt(state.index);
    if (lo >= 0xdc00 && lo <= 0xdfff) {
      code = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
      state.index++;
    }
  }

  state.column++;
  return code;
}

export function consumeOpt(state: ParserState, code: number): boolean {
  if (state.source.charCodeAt(state.index) !== code) return false;
  state.index++;
  state.column++;
  return true;
}

export function consumeLineFeed(state: ParserState, lastIsCR: boolean): void {
  state.index++;
  if (!lastIsCR) {
    state.column = 0;
    state.line++;
  }
}

// Avoid 90% of the ceremony of String.fromCodePoint
export function fromCodePoint(code: number): string {
  if (code > 0xffff) {
    return String.fromCharCode(code >>> 10) + String.fromCharCode(code & 0x3ff);
  } else {
    return String.fromCharCode(code);
  }
}

export function toHex(code: number): number {
  if (code < Chars.Zero) return -1;
  if (code <= Chars.Nine) return code - Chars.Zero;
  if (code < Chars.UpperA) return -1;
  if (code <= Chars.UpperF) return code - Chars.UpperA + 10;
  if (code < Chars.LowerA) return -1;
  if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
  return -1;
}

export function isDigit(ch: number): boolean {
  return ch >= Chars.Zero && ch <= Chars.Nine;
}

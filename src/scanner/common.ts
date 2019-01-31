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

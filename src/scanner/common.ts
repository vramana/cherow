import { Chars } from '../chars';
import { ParserState } from '../common';
import { unicodeLookup } from '../unicode';

export function nextChar(state: ParserState): number {
  return (state.currentChar = state.source.charCodeAt(++state.index));
}

export function consumeOptAstral(state: ParserState, hi: number): boolean {
  if ((hi & 0xfc00) !== 0xd800) return false;
  if (state.index === state.source.length) return false;
  const lo = state.source.charCodeAt(state.index + 1);
  if ((lo & 0xfc00) !== 0xdc00) return false;
  nextChar(state);
  hi = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
  if (((unicodeLookup[(hi >>> 5) + 0] >>> hi) & 31 & 1) === 0) throw 'This is an ERROR!!';
  state.currentChar = hi;
  return true;
}

/**
 * Optimized version of 'fromCodePoint'
 *
 * @param {number} code
 * @returns {string}
 */
export function fromCodePoint(code: number): string {
  if (code > 0xffff) {
    return String.fromCharCode(code >>> 10) + String.fromCharCode(code & 0x3ff);
  } else {
    return String.fromCharCode(code);
  }
}
/**
 * Converts a value to a hex value
 *
 * @param cp CodePoint
 */
export function toHex(code: number): number {
  if (code <= Chars.Nine) return code - Chars.Zero;
  code = code | 32;
  if (code < Chars.LowerA || code < Chars.Zero) return -1;
  if (code <= Chars.LowerF) return code - Chars.LowerA + 10;
  return -1;
}

export function scanHexNumber(state: ParserState, expected_length: number) {
  let x = 0;
  for (let i = 0; i < expected_length; i++) {
    let d = toHex(state.currentChar);
    if (d < 0) {
      return -1;
    }
    x = x * 16 + d;

    nextChar(state);
  }

  return x;
}

export function scanUnlimitedLengthHexNumber(state: ParserState, max_value: any, _: any) {
  let x = 0;
  let d = toHex(state.currentChar);
  if (d < 0) return -1;

  while (d >= 0) {
    x = x * 16 + d;
    if (x > max_value) {
      return -1;
    }
    nextChar(state);
    d = toHex(state.currentChar);
  }

  return x;
}

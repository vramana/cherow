import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { mustEscape } from '../unicode';
import { Context, Flags } from '../common';
import { isIDStart } from '../unicode';
import { report, Errors } from '../errors';
import { scanIdentifier } from './identifier';

export const enum Escape {
  Empty = -1,
      StrictOctal = -2,
      EightOrNine = -3,
      InvalidHex = -4,
      OutOfRange = -5,
}
export function fromCodePoint (code: Chars): string {
  return code <= 0xFFFF ?
      String.fromCharCode(code) :
      String.fromCharCode(
          ((code - Chars.NonBMPMin) >> 10) + Chars.LeadSurrogateMin,
          ((code - Chars.NonBMPMin) & (1024 - 1)) + Chars.TrailSurrogateMin);
}

export function consume(state: ParserState, code: number): boolean {
  if (state.source.charCodeAt(state.index) !== code) return false;
  state.index++;
  state.column++;
  return true;
}

export function nextChar(state: ParserState): number {
  ++state.column;
  return state.nextChar = state.source.charCodeAt(++state.index);
}

export function nextUnicodeChar(state: ParserState): number {
  let { index } = state;
  const hi = state.source.charCodeAt(index++);

  if (hi < 0xD800 || hi > 0xDBFF) return hi;
  if (index === state.source.length) return hi;
  const lo = state.source.charCodeAt(index);

  if (lo < 0xDC00 || lo > 0xDFFF) return hi;
  return (hi & 0x3FF) << 10 | lo & 0x3FF | 0x10000;
}


export function toHex(code: number): number {
  code -= Chars.Zero;
  if (code <= 9) return code;
  code = (code | 0x20) - (Chars.LowerA - Chars.Zero);
  if (code <= 5) return code + 10;
  return -1;
}

// CharFuncLookup functions
export function mapToToken(token: Token): (state: ParserState) => Token {
  return state => {
      nextChar(state);
      return token;
  };
}

export function escapeInvalidCharacters(code: number): string {
  switch (code) {
      case Chars.Null:
          return '\\0';
      case Chars.Backspace:
          return '\\b';
      case Chars.Tab:
          return '\\t';
      case Chars.LineFeed:
          return '\\n';
      case Chars.VerticalTab:
          return '\\v';
      case Chars.FormFeed:
          return '\\f';
      case Chars.CarriageReturn:
          return '\\r';
      case Chars.Hash:
          return '\\#';
      case Chars.At:
          return '\\@';
      default:
          if (!mustEscape(code)) return fromCodePoint(code);
          if (code < 0x10) return `\\x0${code.toString(16)}`;
          if (code < 0x100) return `\\x${code.toString(16)}`;
          if (code < 0x1000) return `\\u0${code.toString(16)}`;
          if (code < 0x10000) return `\\u${code.toString(16)}`;
          return `\\u{${code.toString(16)}}`;
  }
}
/**
 * Skips BOM and shebang
 *
 * parser Parser object
 */
export function skipBomAndShebang(state: ParserState, context: Context): void {
  let index = state.index;
  if (index === state.source.length) return;
  if (state.nextChar === Chars.ByteOrderMark) {
      index++;
      state.index = index;
  }

  if (context & Context.OptionsShebang &&
      index < state.source.length &&
      state.source.charCodeAt(index) === Chars.Hash) {
      index++;
      if (index < state.source.length && state.source.charCodeAt(index) === Chars.Exclamation) {
          state.index = index + 1;
          while (state.index < state.length) {
              const next = state.source.charCodeAt(state.index);
              if ((next & 83) < 3 && (
                      next === Chars.LineFeed ||
                      next === Chars.CarriageReturn ||
                      next === Chars.LineSeparator ||
                      next === Chars.ParagraphSeparator)) {
                  state.flags |= Flags.LineTerminator;
                  state.index++;
                  state.column = 0;
                  state.line++;
                  if (state.index < state.length && next === Chars.CarriageReturn &&
                      state.source.charCodeAt(state.index) === Chars.LineFeed) {
                      state.index++;
                  }
                  break;
              }
              state.index++;
              state.column++;
          }
      }
   }
 }


/**
 * Scans private name. Stage 3 proposal related
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanPrivateName(state: ParserState, context: Context): Token {
  nextChar(state);
  // This validation is only to prevent `# x` and `# 3foo` cases.
  // Note: We have to be inside a class context for this to be valid
  if (!(context & Context.InClass) || state.index < state.source.length && !isIDStart(state.nextChar)) {
      report(state, Errors.UnexpectedToken, fromCodePoint(state.nextChar));
  }
  state.startIndex = state.index;
  state.startColumn = state.column;
  scanIdentifier(state, context);
  return Token.Hash;
}

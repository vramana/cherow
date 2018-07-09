import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { mustEscape, isIDStart } from '../unicode';
import { Context, Flags } from '../common';
import { report, Errors } from '../errors';
import { scanIdentifier } from './identifier';

export const enum InvalidEscapeType {
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
          ((code - 0x10000) >> 10) + 0xD800,
          ((code - 0x10000) & (1024 - 1)) + 0xDC00);
}

export function consume(state: ParserState, code: number): boolean {
  if (state.source.charCodeAt(state.index) !== code) return false;
  state.index++;
  state.column++;
  return true;
}

export function skipToNewLine(state: ParserState): Token {
  state.index++;
  state.column = 0;
  state.line++;
  state.flags |= Flags.LineTerminator;
  return Token.WhiteSpace;
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

/**
 * Skips any byte order mark at the start
 *
 * parser Parser object
 */
export function skipBomAndShebang(state: ParserState, context: Context): void {
  let index = state.index;
  if (state.nextChar === Chars.ByteOrderMark ||
      state.nextChar === Chars.BigEndian) {
      index++;
      state.index = index;
  }

  if (context & Context.OptionsShebang &&
      index < state.source.length &&
      state.source.charCodeAt(index) === Chars.Hash) {
      index++;
      // '#!'
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

/**
 * Does a lookahead and if the 'isLookaHead' is set to false or the result is true it will continue parsing
 * and never rewind the parser state
 *
 * @param state ParserState instance
 * @param callback Callback function to be called
 * @param isLookahead Boolean
 */
export function lookAheadOrScan <T> (state: ParserState, context: Context, callback: (state: ParserState, context: Context) => T, isLookahead: boolean): T {
  const savedIndex = state.index;
  const savedLine = state.line;
  const savedColumn = state.column;
  const savedlastIndex = state.lastIndex;
  const startIndex = state.startIndex;
  const savedLastLine = state.startLine;
  const savedLastColumn = state.lastColumn;
  const savedStartColumn = state.startColumn;
  const savedFlags = state.flags;
  const savedTokenValue = state.tokenValue;
  const savedNextChar = state.nextChar;
  const savedToken = state.token;
  const savedTokenRaw = state.tokenRaw;
  const savedTokenRegExp = state.tokenRegExp;
  const savedCommentStart = state.commentStart;
  const savedCommentType = state.commentType;
  const savedCapturingParens = state.capturingParens;
  const savedAssignable = state.assignable;
  const savedDestructible = state.destructible;
  const result = callback(state, context);

  if (!result || isLookahead) {
      state.index = savedIndex;
      state.line = savedLine;
      state.column = savedColumn;
      state.lastIndex = savedlastIndex;
      state.startIndex = startIndex;
      state.startLine = savedLastLine;
      state.lastColumn = savedLastColumn;
      state.startColumn = savedStartColumn;
      state.flags = savedFlags;
      state.tokenValue = savedTokenValue;
      state.nextChar = savedNextChar;
      state.token = savedToken;
      state.tokenRaw = savedTokenRaw;
      state.tokenRegExp = savedTokenRegExp ;
      state.commentStart = savedCommentStart;
      state.commentType = savedCommentType;
      state.capturingParens = savedCapturingParens;
      state.assignable = savedAssignable;
      state.destructible = savedDestructible;
  }

  return result;
}

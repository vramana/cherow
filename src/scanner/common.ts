import { Chars } from '../chars';
import { Context, ParserState } from '../common';
import { report, reportRegExp, Errors } from '../errors';
import { Token } from 'token';
import { isIDContinue } from '../unicode';

/**
 * A set of flags for maintaining the internal state machine.
 */
export const enum SeekState {
  None = 0,
  NewLine = 1 << 0,
  SameLine = 1 << 1,
  LastIsCR = 1 << 2
}

export const enum Type {
  None = 0,
  MaybeQuantifier = 1 << 0,
  SeenAssertion = 1 << 1,
  SeenUnfixableAssertion = 1 << 2,
  TopLevel = 1 << 2
}

export const enum RegexpState {
  None = 0,
  Valid = 1 << 0,
  Invalid = 1 << 2,
  Unicode = 1 << 4,
  Plain = 1 << 5,
  MissingDigits = 1 << 6,
  InvalidPlainClass = 1 << 23,
  InvalidUnicodeClass = 1 << 24,
  Escape = 1 << 25,
  InvalidClass = 0x110000,
  InvalidClassRange = 0x110001
}

// Skip initial BOM and/or shebang.
export function skipHashBang(state: ParserState) {
  let index = state.index;
  if (index === state.source.length) return;
  if (state.source.charCodeAt(index) === Chars.ByteOrderMark) {
    index++;
    state.index = index;
  }

  if (index < state.source.length && state.source.charCodeAt(index) === Chars.Hash) {
    index++;
    if (index < state.source.length && state.source.charCodeAt(index) === Chars.Exclamation) {
      state.index = index + 1;
      // skipToNewline(state, SeekState.None);
    } else {
      report(state, Errors.Unexpected);
    }
  }
}

export function hasNext(parser: ParserState) {
  return parser.index < parser.length;
}

export function advanceOne(parser: ParserState) {
  parser.index++;
  parser.column++;
}

export function advance(parser: ParserState, ch: number) {
  advanceOne(parser);
  if (ch > 0xffff) parser.index++;
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

export function nextUnicodeChar(parser: ParserState) {
  let { index } = parser;
  const hi = parser.source.charCodeAt(index++);

  if (hi < 0xd800 || hi > 0xdbff) return hi;
  if (index === parser.source.length) return hi;
  const lo = parser.source.charCodeAt(index);

  if (lo < 0xdc00 || lo > 0xdfff) return hi;
  return ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
}

/**
 * An optimized equivalent of `advance(parser, nextUnicodeChar(parser))` that returns its result.
 */
export function consumeAny(parser: ParserState) {
  const hi = parser.source.charCodeAt(parser.index++);
  let code = hi;

  if (hi >= 0xd800 && hi <= 0xdbff && hasNext(parser)) {
    const lo = parser.source.charCodeAt(parser.index);
    if (lo >= 0xdc00 && lo <= 0xdfff) {
      code = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
      parser.index++;
    }
  }

  parser.column++;
  return code;
}

export function consumeOpt(parser: ParserState, code: number) {
  if (parser.source.charCodeAt(parser.index) !== code) return false;
  parser.index++;
  parser.column++;
  return true;
}

// Note: currently unused.
export function consumeOptAstral(parser: ParserState, code: number) {
  let { index } = parser;
  const hi = parser.source.charCodeAt(index++);
  if (hi < 0xd800 || hi > 0xdbff) return false;
  if (index === parser.source.length) return false;

  const lo = parser.source.charCodeAt(index++);
  if (lo < 0xdc00 || lo > 0xdfff) return false;

  const codePoint = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
  if (codePoint !== code) return false;

  parser.index = index;
  parser.column++;
  return true;
}

/**
 * Use to consume a line feed instead of `advanceNewline`.
 */
export function consumeLineFeed(parser: ParserState, lastIsCR: boolean) {
  parser.index++;
  if (!lastIsCR) {
    parser.column = 0;
    parser.line++;
  }
}

export function advanceNewline(parser: ParserState) {
  parser.index++;
  parser.column = 0;
  parser.line++;
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

export function storeRaw(parser: ParserState, start: number) {
  parser.tokenRaw = parser.source.slice(start, parser.index);
}

export function skipToNewline(parser: ParserState): Token {
  while (hasNext(parser)) {
    switch (nextChar(parser)) {
      case Chars.CarriageReturn:
        advanceNewline(parser);
        if (hasNext(parser) && nextChar(parser) === Chars.LineFeed) parser.index++;
        parser.flags | SeekState.NewLine;
        return Token.WhiteSpace;

      case Chars.LineFeed:
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        advanceNewline(parser);
        parser.flags | SeekState.NewLine;
        return Token.WhiteSpace;

      default:
        consumeAny(parser);
    }
  }

  return Token.WhiteSpace;
}

export function isDigit(ch: number): boolean {
  return ch >= Chars.Zero && ch <= Chars.Nine;
}

export function scanIntervalQuantifier(state: ParserState): boolean {
  let hasLow = false;
  let hasHi = false;
  let minValue = 0;
  let maxValue = 0;
  let next = state.source.charCodeAt(state.index);
  let start = true;
  let isInvalid = false;

  while (next >= Chars.Zero && next <= Chars.Nine) {
    ++state.index;
    hasLow = true;
    if (start) {
      start = false;
      if (next === Chars.Zero) {
        next = state.source.charCodeAt(state.index);
        if (!(next >= Chars.Zero && next <= Chars.Nine)) break;
        isInvalid = true;
        ++state.index;
      }
    }
    minValue = minValue * 10 + (next - Chars.Zero);
    next = state.source.charCodeAt(state.index);
  }

  if (consumeOpt(state, Chars.Comma)) {
    start = true;
    while (state.index < state.length) {
      next = state.source.charCodeAt(state.index);
      if (!(next >= Chars.Zero && next <= Chars.Nine)) break;
      ++state.index;
      hasHi = true;
      if (start) {
        start = false;
        if (next === Chars.Zero) {
          next = state.source.charCodeAt(state.index);
          if (!(next >= Chars.Zero && next <= Chars.Nine)) break;
          isInvalid = true;
          ++state.index;
        }
      }
      maxValue = maxValue * 10 + (next - Chars.Zero);
    }
  }

  return consumeOpt(state, Chars.RightBrace)
    ? !isInvalid && (hasLow !== hasHi || (hasLow && hasHi && minValue <= maxValue))
    : false;
}

export function setState(
  state: ParserState,
  currentState: RegexpState,
  newState: RegexpState,
  error: Errors
): RegexpState {
  if (currentState & (newState & RegexpState.Unicode ? RegexpState.Plain : RegexpState.Unicode))
    return reportRegExp(state, error);
  return currentState === RegexpState.Valid ? newState : currentState;
}

export function updateState(state: ParserState, currentState: RegexpState, updatedState: RegexpState): RegexpState {
  if (updatedState === RegexpState.Invalid) {
    return RegexpState.Invalid;
  } else if (updatedState & (RegexpState.Plain | RegexpState.Unicode)) {
    return setState(
      state,
      currentState,
      updatedState & RegexpState.Plain ? RegexpState.Plain : RegexpState.Unicode,
      Errors.InvalidRegExpWithUFlag
    );
  }
  return currentState;
}

export function parseRegexCapturingGroupNameRemainder(
  state: ParserState,
  context: Context,
  firstCharOrd: number,
  namedGroups: any
): any {
  if (nextChar(state) === Chars.GreaterThan) {
    state.tokenValue = String.fromCodePoint(firstCharOrd);
  } else {
    // parseIdentifierRest(firstCharOrd, '');
  }

  let name = state.tokenValue;
  if (namedGroups.has(name)) {
    return reportRegExp(state, Errors.AlreadyDeclaredGroupName, name);
  }
  namedGroups.add(name);

  // named capturing group
  ++state.numCapturingParens;

  if (!consumeOpt(state, Chars.GreaterThan)) {
    if (context & Context.OptionsDisableWebCompat) {
      return reportRegExp(state, Errors.NothingToRepat);
    }
  }

  return RegexpState.Valid;
}

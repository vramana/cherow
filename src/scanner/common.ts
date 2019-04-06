import { Chars } from '../chars';
import { ParserState } from '../common';
import { unicodeLookup } from '../unicode';
import { report, Errors } from '../errors';

export const enum Escape {
  Empty = 0,
  Invalid = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5,
  InvalidIdentChar = -6,
  MissingBrace = -7
}

export function nextCodePoint(state: ParserState): number {
  return (state.currentChar = state.source.charCodeAt(++state.index));
}

export function consumeMultiUnitCodePoint(state: ParserState, hi: number): boolean {
  // See: https://tc39.github.io/ecma262/#sec-ecmascript-language-types-string-type
  if ((hi & 0xfc00) !== 0xd800) return false;
  const lo = state.source.charCodeAt(state.index + 1);
  if ((lo & 0xfc00) !== 0xdc00) return false;
  nextCodePoint(state);
  hi = ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
  if (((unicodeLookup[(hi >>> 5) + 0] >>> hi) & 31 & 1) === 0) {
    report(state, Errors.UnexpectedChar, fromCodePoint(hi));
  }
  state.currentChar = hi;
  return true;
}

// ECMA-262 11.2 White Space
export function isExoticECMAScriptWhitespace(code: number): boolean {
  /**
   * There are 25 white space characters we need to correctly class.
   * Lucky for us that we have already classified the lower ASCII range (127) white space, so
   * what we have to do now is to validate against the remaining
   * 15 Unicode category "Zs" ("Space_Separator") chars.
   *
   * - 0x1680
   * - 0x2000
   * - 0x2001
   * - 0x2002
   * - 0x2003
   * - 0x2004
   * - 0x2005
   * - 0x2006
   * - 0x2007
   * - 0x2008
   * - 0x2009
   * - 0x200a
   * - 0x2028 // <LS> LineTerminator (LINE SEPARATOR)
   * - 0x2029 // <PS> LineTerminator (PARAGRAPH SEPARATOR)
   * - 0x202f
   * - 0x205f
   * - 0x3000
   * - 0xfeff // <ZWNBSP>
   */
  return (
    code === Chars.NonBreakingSpace ||
    code === Chars.NextLine ||
    code === Chars.Ogham ||
    (code >= Chars.EnQuad && code <= Chars.ZeroWidthSpace) ||
    code === Chars.NarrowNoBreakSpace ||
    code === Chars.MathematicalSpace ||
    code === Chars.IdeographicSpace ||
    code === Chars.ByteOrderMark
  );
}

/**
 * Optimized version of 'fromCodePoint'
 *
 * @param {number} code
 * @returns {string}
 */
export function fromCodePoint(codePoint: number): string {
  return codePoint <= 65535
    ? String.fromCharCode(codePoint)
    : String.fromCharCode(codePoint >>> 10) + String.fromCharCode(codePoint & 0x3ff);
}

/**
 * Converts a value to a hex value
 *
 * @param code CodePoint
 */
export function toHex(code: number): number {
  return code < Chars.UpperA ? code - Chars.Zero : (code - Chars.UpperA + 10) & 0xf;
}

export function handleEscapeError(state: ParserState, code: Escape, isTemplate: boolean): void {
  switch (code) {
    case Escape.Empty:
      return;

    case Escape.StrictOctal:
      report(state, isTemplate ? Errors.TemplateOctalLiteral : Errors.StrictOctalEscape);

    case Escape.EightOrNine:
      report(state, Errors.InvalidEightAndNine);

    case Escape.InvalidHex:
      report(state, Errors.InvalidHexEscapeSequence);

    case Escape.OutOfRange:
      report(state, Errors.UnicodeOutOfRange);

    case Escape.InvalidIdentChar:
      report(state, Errors.InvalidIdentCharIdentEscape);

    default:
    // unreachable
  }
}

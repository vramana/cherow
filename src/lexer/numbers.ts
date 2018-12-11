import { ParserState } from '../types';
import { Token } from '../token';
import { Context, Flags } from '../common';
import { Chars, AsciiLookup, CharType } from '../chars';
import { nextChar, consume, toHex } from './common';
import { Errors, report } from '../errors';
import { unicodeLookup } from '../unicode';

// lookup table
export const parseLeadingZeroTable: Array < Function > = [];

// binary integer. see [https://tc39.github.io/ecma262/#prod-BinaryIntegerLiteral)
parseLeadingZeroTable[Chars.LowerB] = parseLeadingZeroTable[Chars.UpperB] = (state: ParserState, context: Context) => scanOctalOrBinaryDigits(state, context, 2);
// octal integer. see [https://tc39.github.io/ecma262/#prod-OctalIntegerLiteral)
parseLeadingZeroTable[Chars.LowerO] = parseLeadingZeroTable[Chars.UpperO] = (state: ParserState, context: Context) => scanOctalOrBinaryDigits(state, context, 8);
// hex integer. see [https://tc39.github.io/ecma262/#prod-HexIntegerLiteral)
parseLeadingZeroTable[Chars.LowerX] = parseLeadingZeroTable[Chars.UpperX] = scanHexDigits;

// scan implicit oct
parseLeadingZeroTable.fill(scanImplicitOctalDigits, Chars.Zero, Chars.Seven + 1);
// non octal. see [https://tc39.github.io/ecma262/#prod-annexB-NonOctalDigit]
parseLeadingZeroTable[Chars.Eight] = parseLeadingZeroTable[Chars.Nine] = (state: ParserState, context: Context) => context & Context.Strict ? report(state, Errors.Unexpected) : scanNumeric(state, context, true);

/**
 *  Scans numeric and decimal literal literal
 *
 * @see [https://tc39.github.io/ecma262/#prod-DecimalLiteral)
 * @see [https://tc39.github.io/ecma262/#prod-NumericLiteral)
 *
 * @param state state object
 * @param context Context masks
 */
export function scanNumeric(state: ParserState, context: Context, isFloat: boolean = false): Token {

  if (isFloat) {
      state.tokenValue = 0;
  } else {

      // Hot path - fast path for decimal digits that fits into 4 bytes
      const maxDigits = 10;
      let digit = maxDigits - 1;
      state.tokenValue = state.nextChar - Chars.Zero;
      while (digit >= 0 && nextChar(state) <= Chars.Nine && state.nextChar >= Chars.Zero) {
          state.tokenValue = state.tokenValue * 10 + state.nextChar - Chars.Zero;
          --digit;
      }
      // Performance comes first, readability in 9th place
      if (digit >= 0 && state.nextChar !== Chars.Period &&
              ((AsciiLookup[state.nextChar] & CharType.IDStart) < 0 ||
                  (unicodeLookup[(state.nextChar >>> 5) + 34816] >>> state.nextChar & 31 & 1) < 1)) {
          if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
          return Token.NumericLiteral;
      }
  }

  // Consume any decimal dot and fractional component
  if (isFloat || state.nextChar === Chars.Period) {
      if (!isFloat) {
          nextChar(state);
          // Note: It's a Syntax Error if the MV is not an integer (BigInt), so we need to
          // set the 'isFloat' to true so it eventually can be catched later
          isFloat = true;
      }

      while (nextChar(state) <= Chars.Nine && state.nextChar >= Chars.Zero) {}
  }

  let isBigInt = false;

  // Consume bigInt
  if (state.nextChar === Chars.LowerN) {
      if (isFloat) report(state, Errors.Unexpected);
      isBigInt = true;
      nextChar(state);
  }

  // Consume any exponential notation
  if (state.nextChar === Chars.UpperE || state.nextChar === Chars.LowerE) {
      nextChar(state);
      if (state.nextChar === Chars.Plus || state.nextChar === Chars.Hyphen) {
          nextChar(state);
      }

      // Exponential notation must contain at least one digit
      if (!(state.nextChar >= Chars.Zero && state.nextChar <= Chars.Nine)) {
          report(state, Errors.MissingExponent);
      }

      // Consume exponential digits.
      while (nextChar(state) <= Chars.Nine && state.nextChar >= Chars.Zero) {}
  }

  // Numbers can't be followed by  an identifier start
  if ((AsciiLookup[state.nextChar] & CharType.IDStart) > 0 ||
      (unicodeLookup[(state.nextChar >>> 5) + 34816] >>> state.nextChar & 31 & 1) > 0) {
      report(state, state.nextChar >= Chars.MaxAsciiCharacter ? Errors.IDStartAfterNumber : Errors.IDStartAfterNumber);
  }

  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
  state.tokenValue = parseFloat(state.source.slice(state.startIndex, state.index));
  return isBigInt ? Token.BigInt : Token.NumericLiteral;
}

/**
 * Scans implicit octals
 *
 * @see [https://tc39.github.io/ecma262/#sec-additional-syntax-numeric-literals)
 *
 * @param state state object
 * @param context Context masks
 */
export function scanImplicitOctalDigits(state: ParserState, context: Context): Token {
  let { index, column } = state;
  // Octal integer literals are not permitted in strict mode code.
  if (context & Context.Strict) report(state, Errors.Unexpected);
  let next = state.source.charCodeAt(state.index);
  state.tokenValue = 0;
  state.flags |= Flags.HasOctal;
  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  while (index < state.length && next >= Chars.Zero && next <= Chars.Nine) {
      // Use the decimal scanner for 08 and 09
      if (next >= Chars.Eight) {
          if (context & Context.Strict) report(state, Errors.DeprecatedOctal);
          return scanNumeric(state, context, false);
      }
      state.tokenValue = state.tokenValue * 8 + (next - Chars.Zero);
      index++;
      column++;
      next = state.source.charCodeAt(index);
  }

  state.index = index;
  state.column = column;
  if ((AsciiLookup[next] & CharType.IDStart) > 0 || (unicodeLookup[(next >>> 5) + 34816] >>> next & 31 & 1) > 0) {
      report(state, state.nextChar >= Chars.MaxAsciiCharacter ? Errors.IDStartAfterNumber : Errors.IDStartAfterNumber);
  }
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
  return Token.NumericLiteral;
}

/**
 * Scans octal or binary digits
 *
 * @see [https://tc39.github.io/ecma262/#prod-BinaryDigits)
 * @see [https://tc39.github.io/ecma262/#prod-OctalDigit)
 *
 * @param state state object
 * @param base base number
 */

export function scanOctalOrBinaryDigits(state: ParserState, context: Context, base: number): Token {
  state.index++;
  state.column++;
  nextChar(state);
  if (!(state.nextChar >= Chars.Zero && state.nextChar <= Chars.Nine)) report(state, Errors.MissingDigits);
  let digits = 0;
  state.tokenValue = 0;
  while (state.index < state.length) {
      const converted = state.nextChar - Chars.Zero;
      if (!(state.nextChar >= Chars.Zero && state.nextChar <= Chars.Nine) || converted >= base) break;
      state.tokenValue = state.tokenValue * base + converted;
      nextChar(state);
      digits++;
  }

  if (digits === 0) report(state, Errors.Unexpected);
  const isBigInt = consume(state, Chars.LowerN);
  const next = state.source.charCodeAt(state.index);
  if ((AsciiLookup[next] & CharType.IDStart) > 0 || (unicodeLookup[(next >>> 5) + 34816] >>> next & 31 & 1) > 0) {
      report(state, state.nextChar >= Chars.MaxAsciiCharacter ? Errors.IDStartAfterNumber : Errors.IDStartAfterNumber);
  }
  if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
  return isBigInt ? Token.BigInt : Token.NumericLiteral;
}

/**
 * Scans hex digits
 *
 * @see [https://tc39.github.io/ecma262/#prod-HexDigits)
 *
 * @param state state object
 * @param context Context masks
 */
export function scanHexDigits(state: ParserState, context: Context): Token {
    state.index++;
    state.column++;
    state.tokenValue = toHex(nextChar(state));
    if (state.tokenValue < 0) report(state, Errors.MissingHexDigits);
    while (state.index < state.length) {
        const digit = toHex(nextChar(state));
        if (digit < 0) break;
        state.tokenValue = state.tokenValue * 16 + digit;
    }
    const isBigInt = consume(state, Chars.LowerN);
    if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
    return isBigInt ? Token.BigInt : Token.NumericLiteral;
}

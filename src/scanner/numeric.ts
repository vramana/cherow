import { ParserState, Context, Flags } from '../common';
import { toHex, isDigit } from './common';
import { Chars, isIdentifierStart } from '../chars';
import { Token } from '../token';
import { Errors, report } from '../errors';

/**
 * Returns eiter a BigInt or NumericLiteral token
 * @param state
 */
export function returnBigIntOrNumericToken(state: ParserState): Token {
  if (state.source.charCodeAt(state.index) === Chars.LowerN) {
    if (state.flags & Flags.Float) report(state, Errors.InvalidBigInt);
    state.index++;
    state.column++;
    return Token.BigIntLiteral;
  } else {
    if ((state.flags & (Flags.Binary | Flags.Octal)) === 0) state.tokenValue = +state.tokenValue;
    return Token.NumericLiteral;
  }
}

/**
 * Scans numeric literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 *
 * @param state Parser object
 * @param context Context masks
 */
export function scanNumeric(state: ParserState, context: Context): Token {
  let { index, column } = state;
  while (isDigit(state.source.charCodeAt(index))) {
    index++;
    column++;
  }
  if (state.source.charCodeAt(index) === Chars.Period) {
    index++;
    column++;
    state.flags = Flags.Float;
    while (isDigit(state.source.charCodeAt(index))) {
      index++;
      column++;
    }
  }
  let end = index;

  switch (state.source.charCodeAt(index)) {
    case Chars.UpperE:
    case Chars.LowerE: {
      index++;
      column++;
      state.flags = Flags.Float;
      if (state.source.charCodeAt(index) === Chars.Plus || state.source.charCodeAt(index) === Chars.Hyphen) {
        index++;
        column++;
      }

      if (!isDigit(state.source.charCodeAt(index))) report(state, Errors.MissingExponent); // must have at least one char after +-
      index++;
      column++;
      while (isDigit(state.source.charCodeAt(index))) {
        index++;
        column++;
      }
      end = index;
    }
    default: // ignore
  }

  const code = state.source.charCodeAt(index);
  if (code !== Chars.LowerN && (isDigit(code) || isIdentifierStart(code))) report(state, Errors.IDStartAfterNumber);
  state.index = index;
  state.column = column;
  state.tokenValue = state.source.slice(state.startIndex, end);
  if (context & Context.OptionsRaw) state.tokenRaw = state.tokenValue;
  return returnBigIntOrNumericToken(state);
}

/**
 * Scans hex integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HexIntegerLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanHexIntegerLiteral(state: ParserState): number {
  let { index, column } = state;
  let value = toHex(state.source.charCodeAt(index));
  if (value < 0) report(state, Errors.Unexpected);
  index++;
  column++;
  while (index < state.length) {
    const digit = toHex(state.source.charCodeAt(index));
    if (digit < 0) break;
    value = value * 16 + digit;
    index++;
    column++;
  }
  state.index = index;
  state.column = column;
  state.tokenValue = value;
  return returnBigIntOrNumericToken(state);
}

/**
 * Scans binary and octal integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalIntegerLiteral)
 * @see [Link](https://tc39.github.io/ecma262/#prod-BinaryIntegerLiteral)
 *
 * @param parser Parser object
 * @param base Context masks
 */
export function scanBinaryOrOctalDigits(state: ParserState, base: 2 | 8): Token {
  let { index, column } = state;
  let value = 0;
  let numberOfDigits = 0;
  while (index < state.length) {
    const ch = state.source.charCodeAt(index);
    const converted = ch - Chars.Zero;
    if (!(ch >= Chars.Zero && ch <= Chars.Nine) || converted >= base) break;
    value = value * base + converted;
    index++;
    column++;
    numberOfDigits++;
  }

  if (numberOfDigits === 0) report(state, Errors.ExpectedNumberInRadix, '' + base);

  // Set this flag here to avoid unnecessary 'cast' to numbers when
  // checking for 'BigIntLiteral'
  state.flags |= Flags.Binary;
  state.index = index;
  state.column = column;
  state.tokenValue = value;
  return returnBigIntOrNumericToken(state);
}

/**
 * Scans implicit octal digits
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalDigits)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanImplicitOctalDigits(state: ParserState, context: Context): number {
  if (context & Context.Strict) report(state, Errors.LegacyOctalsInStrictMode);
  let { index, column } = state;
  let code = 0;
  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  while (index < state.length) {
    const next = state.source.charCodeAt(index);
    if (next < Chars.Zero || next > Chars.Seven) {
      // Note: Implicit octal digits should fail with BigInt so we add
      // the 'Float' mask to make sure that happen. Hackish??
      state.flags |= Flags.Float;
      return scanNumeric(state, context);
    } else {
      code = code * 8 + (next - Chars.Zero);
      index++;
      column++;
    }
  }
  state.flags |= Flags.Octal;
  state.index = index;
  state.column = column;
  state.tokenValue = code;
  return Token.NumericLiteral;
}

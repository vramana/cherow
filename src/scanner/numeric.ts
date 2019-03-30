import { ParserState, Context, Flags } from '../common';
import { toHex, isDigit, advanceOne, consumeOpt } from './common';
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
    advanceOne(state);
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
export function scanNumeric(state: ParserState, context: Context, first: number): Token {
  state.tokenValue = 0;
  let digit = 9;
  while (isDigit(first)) {
    state.tokenValue = 10 * state.tokenValue + (first - Chars.Zero);
    advanceOne(state);
    first = state.source.charCodeAt(state.index);
    --digit;
  }

  if (digit >= 0 && state.index < state.length && first !== Chars.Period && !isIdentifierStart(first)) {
    if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.startIndex, state.index);
    return returnBigIntOrNumericToken(state);
  }
  if (first === Chars.Period) {
    advanceOne(state);
    state.flags = Flags.Float;
    while (isDigit((first = state.source.charCodeAt(state.index)))) {
      advanceOne(state);
    }
  }

  if ((first | 32) === Chars.LowerE) {
    advanceOne(state);
    state.flags = Flags.Float;
    first = state.source.charCodeAt(state.index);
    if (first === Chars.Plus || first === Chars.Hyphen) {
      first = state.source.charCodeAt(++state.index);
      ++state.column;
    }
    if (first >= Chars.Zero && first <= Chars.Nine) {
      first = state.source.charCodeAt(++state.index);
      ++state.column;
      while (isDigit((first = state.source.charCodeAt(state.index)))) {
        advanceOne(state);
      }
    } else report(state, Errors.MissingExponent); // must have at least one char after +-
  }

  if (first !== Chars.LowerN && ((first >= Chars.Zero && first <= Chars.Nine) || isIdentifierStart(first)))
    report(state, Errors.IDStartAfterNumber);
  state.tokenValue = state.source.slice(state.startIndex, state.index);
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
  let ch = state.source.charCodeAt(state.index);
  let value = 0;
  let digit = toHex(ch);
  if (digit < 0) report(state, Errors.Unexpected);
  while (digit >= 0) {
    value = value * 16 + digit;
    advanceOne(state);
    digit = toHex(state.source.charCodeAt(state.index));
  }
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
  let value = 0;
  let numberOfDigits = 0;
  while (state.index < state.length) {
    const ch = state.source.charCodeAt(state.index);
    const converted = ch - Chars.Zero;
    if (!(ch >= Chars.Zero && ch <= Chars.Nine) || converted >= base) break;
    value = value * base + converted;
    advanceOne(state);
    numberOfDigits++;
  }

  if (numberOfDigits === 0) report(state, Errors.ExpectedNumberInRadix, '' + base);

  // Set this flag here to avoid unnecessary 'cast' to numbers when
  // checking for 'BigIntLiteral'
  state.flags |= Flags.Binary;
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
export function scanImplicitOctalDigits(state: ParserState, context: Context, first: number): number {
  if ((context & Context.Strict) !== 0) report(state, Errors.LegacyOctalsInStrictMode);
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
      return scanNumeric(state, context, first);
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

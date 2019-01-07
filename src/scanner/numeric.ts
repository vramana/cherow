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
      state.flags = Flags.Scientific;
      if (state.source.charCodeAt(index) === Chars.Plus || state.source.charCodeAt(index) === Chars.Hyphen) {
        index++;
        column++;
      }

      if (isDigit(state.source.charCodeAt(index))) {
        index++;
        column++;
        while (isDigit(state.source.charCodeAt(index))) {
          index++;
          column++;
        }
        end = index;
      } else {
        report(state, Errors.Unexpected);
      }
    }
    default: // ignore
  }

  const code = state.source.charCodeAt(index);
  if (code !== Chars.LowerN && (isDigit(code) || isIdentifierStart(code))) report(state, Errors.Unexpected);
  state.index = index;
  state.column = column;
  state.tokenValue = state.source.substring(state.startIndex, end);
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
  let value: any = '';
  let { index, column } = state;
  while (index < state.length) {
    const ch = state.source.charCodeAt(index);
    const converted = ch - Chars.Zero;
    if (!(ch >= Chars.Zero && ch <= Chars.Nine) || converted >= base) break;
    value = value * base + converted;
    index++;
    column++;
  }
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
  if (context & Context.Strict) report(state, Errors.Unexpected);
  let { index, column } = state;
  let code = 0;
  state.flags |= Flags.Octal;

  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  while (index < state.length) {
    const next = state.source.charCodeAt(index);
    if (next < Chars.Zero || next > Chars.Seven) {
      return scanNumeric(state, context);
    } else {
      code = code * 8 + (next - Chars.Zero);
      index++;
      column++;
    }
  }

  state.index = index;
  state.column = column;
  state.tokenValue = code;
  return Token.NumericLiteral;
}

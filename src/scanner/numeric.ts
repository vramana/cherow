import { ParserState, Context, Flags } from '../common';
import { toHex, isDigit } from './common';
import { Chars } from '../chars';
import { Token } from '../token';
import { Errors, report } from '../errors';
import { unicodeLookup } from '../unicode';

/**
 * Adds BigInt suffix
 * @param state
 */
export function addMaybeBigIntSuffix(state: ParserState): Token {
  if (state.source.charCodeAt(state.index) === Chars.LowerN) {
    state.index++;
    state.column++;
    return Token.BigIntLiteral;
  } else {
    if ((state.flags & (Flags.BinarySpecifier | Flags.OctalSpecifier)) === 0) state.tokenValue = +state.tokenValue;
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
export function scanNumeric(state: ParserState): Token {
  const start = state.index;
  while (isDigit(state.source.charCodeAt(state.index))) state.index++;
  if (state.source.charCodeAt(state.index) === Chars.Period) {
    state.index++;
    while (isDigit(state.source.charCodeAt(state.index))) state.index++;
  }
  let end = state.index;
  if (state.source.charCodeAt(state.index) === Chars.UpperE || state.source.charCodeAt(state.index) === Chars.LowerE) {
    state.index++;
    state.flags = Flags.Scientific;
    if (state.source.charCodeAt(state.index) === Chars.Plus || state.source.charCodeAt(state.index) === Chars.Hyphen)
      state.index++;
    if (isDigit(state.source.charCodeAt(state.index))) {
      state.index++;
      while (isDigit(state.source.charCodeAt(state.index))) state.index++;
      end = state.index;
    } else {
      report(state, Errors.Unexpected);
    }
  }

  const code = state.source.charCodeAt(state.index);
  if (code !== Chars.LowerN && (isDigit(code) || ((unicodeLookup[(code >>> 5) + 34816] >>> code) & 31 & 1) !== 0)) {
    report(state, Errors.Unexpected);
  }

  state.tokenValue = state.source.substring(start, end);
  // if (context & Context.OptionsRaw) state.tokenRaw = state.tokenValue;
  return addMaybeBigIntSuffix(state);
}

/**
 * Scans hex integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HexIntegerLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanHexIntegerLiteral(state: ParserState): number {
  let value = toHex(state.source.charCodeAt(state.index));
  if (value < 0) report(state, Errors.Unexpected);
  state.index++;
  state.column++;
  while (state.index < state.length) {
    const digit = toHex(state.source.charCodeAt(state.index));
    if (digit < 0) break;
    value = value * 16 + digit;
    state.index++;
    state.column++;
  }
  state.tokenValue = value;
  return addMaybeBigIntSuffix(state);
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
function scanBinaryOrOctalDigits(state: ParserState, base: 2 | 8): Token {
  let value: any = '';
  while (state.index < state.length) {
    const ch = state.source.charCodeAt(state.index);
    const converted = ch - Chars.Zero;
    if (!(ch >= Chars.Zero && ch <= Chars.Nine) || converted >= base) break;
    value = value * base + converted;
    state.index++;
    state.column++;
  }
  state.tokenValue = value;
  return addMaybeBigIntSuffix(state);
}

/**
 * Scans implicit octal digits
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalDigits)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanImplicitOctalDigits(state: ParserState, context: Context): number {
  if (context & Context.Strict) report(state, Errors.Unexpected);
  let index = state.index;
  let column = state.column;
  let code = 0;
  state.flags |= Flags.Octal;

  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  while (index < state.length) {
    const next = state.source.charCodeAt(index);
    if (next < Chars.Zero || next > Chars.Seven) {
      return scanNumeric(state);
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

export function scanHexBinOct(parser: ParserState, context: Context) {
  if (parser.index + 2 < parser.length) {
    if (
      parser.source.charCodeAt(parser.index + 1) === Chars.UpperX ||
      parser.source.charCodeAt(parser.index + 1) === Chars.LowerX
    ) {
      parser.index += 2;
      parser.column += 2;
      return scanHexIntegerLiteral(parser);
    } else if (
      parser.source.charCodeAt(parser.index + 1) === Chars.UpperB ||
      parser.source.charCodeAt(parser.index + 1) === Chars.LowerB
    ) {
      parser.index += 2;
      parser.column += 2;
      return scanBinaryOrOctalDigits(parser, /* base */ 2);
    } else if (
      parser.source.charCodeAt(parser.index + 1) === Chars.UpperO ||
      parser.source.charCodeAt(parser.index + 1) === Chars.LowerO
    ) {
      parser.index += 2;
      parser.column += 2;
      return scanBinaryOrOctalDigits(parser, /* base */ 8);
    }
  }
  return scanImplicitOctalDigits(parser, context);
}

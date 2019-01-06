import { ParserState, Context, Flags } from '../common';
import { toHex } from './common';
import { Chars } from '../chars';
import { Token } from '../token';
import * as Errors from '../errors';
import { unicodeLookup } from '../unicode';

export function isDigit(ch: number): boolean {
  return ch >= Chars.Zero && ch <= Chars.Nine;
}

/**
 * Adds BigInt suffix
 * @param parser
 */
export function addMaybeBigIntSuffix(parser: ParserState): Token {
  if (parser.source.charCodeAt(parser.index) === Chars.LowerN) {
    parser.index++;
    parser.column++;
    return Token.BigIntLiteral;
  } else {
    if ((parser.flags & (Flags.BinarySpecifier | Flags.OctalSpecifier)) === 0) parser.tokenValue = +parser.tokenValue;
    return Token.NumericLiteral;
  }
}

/**
 * Scans numeric literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NumericLiteral)
 *
 * @param parser Parser object
 */
export function scanNumeric(parser: ParserState): Token {
  const start = parser.index;
  while (isDigit(parser.source.charCodeAt(parser.index))) parser.index++;
  if (parser.source.charCodeAt(parser.index) === Chars.Period) {
    parser.index++;
    while (isDigit(parser.source.charCodeAt(parser.index))) parser.index++;
  }
  let end = parser.index;
  if (
    parser.source.charCodeAt(parser.index) === Chars.UpperE ||
    parser.source.charCodeAt(parser.index) === Chars.LowerE
  ) {
    parser.index++;
    parser.flags = Flags.Scientific;
    if (
      parser.source.charCodeAt(parser.index) === Chars.Plus ||
      parser.source.charCodeAt(parser.index) === Chars.Hyphen
    )
      parser.index++;
    if (isDigit(parser.source.charCodeAt(parser.index))) {
      parser.index++;
      while (isDigit(parser.source.charCodeAt(parser.index))) parser.index++;
      end = parser.index;
    } else {
      Errors.report(parser.index, parser.line, parser.column, Errors.unterminatedComment());
    }
  }

  let code = parser.source.charCodeAt(parser.index);
  if (code !== Chars.LowerN && (isDigit(code) || ((unicodeLookup[(code >>> 5) + 34816] >>> code) & 31 & 1) !== 0)) {
    Errors.report(parser.index, parser.line, parser.column, Errors.unterminatedComment());
  }

  parser.tokenValue = parser.source.substring(start, end);
  // if (context & Context.OptionsRaw) parser.tokenRaw = parser.tokenValue;
  return addMaybeBigIntSuffix(parser);
}

/**
 * Scans hex integer literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-HexIntegerLiteral)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanHexIntegerLiteral(parser: ParserState): number {
  let value = toHex(parser.source.charCodeAt(parser.index));
  if (value < 0) Errors.report(parser.index, parser.line, parser.column, Errors.unterminatedComment());
  parser.index++;
  parser.column++;
  while (parser.index < parser.length) {
    const digit = toHex(parser.source.charCodeAt(parser.index));
    if (digit < 0) break;
    value = value * 16 + digit;
    parser.index++;
    parser.column++;
  }
  parser.tokenValue = value;
  return addMaybeBigIntSuffix(parser);
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
function scanBinaryOrOctalDigits(parser: ParserState, base: 2 | 8): Token {
  let value: any = '';
  while (parser.index < parser.length) {
    const ch = parser.source.charCodeAt(parser.index);
    const converted = ch - Chars.Zero;
    if (!(ch >= Chars.Zero && ch <= Chars.Nine) || converted >= base) break;
    value = value * base + converted;
    parser.index++;
    parser.column++;
  }
  parser.tokenValue = value;
  return addMaybeBigIntSuffix(parser);
}

/**
 * Scans implicit octal digits
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-OctalDigits)
 *
 * @param parser Parser object
 * @param context Context masks
 */
function scanImplicitOctalDigits(parser: ParserState, context: Context): number {
  if (context & Context.Strict) Errors.report(parser.index, parser.line, parser.column, Errors.unterminatedComment());
  let index = parser.index;
  let column = parser.column;
  let code = 0;
  parser.flags |= Flags.Octal;

  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  while (index < parser.length) {
    const next = parser.source.charCodeAt(index);
    if (next < Chars.Zero || next > Chars.Seven) {
      return scanNumeric(parser);
    } else {
      code = code * 8 + (next - Chars.Zero);
      index++;
      column++;
    }
  }

  parser.index = index;
  parser.column = column;
  parser.tokenValue = code;
  return Token.NumericLiteral;
}

export function scanDonna(parser: ParserState, context: Context) {
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

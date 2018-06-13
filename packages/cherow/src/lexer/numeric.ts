import { Parser } from '../types';
import { Chars } from '../chars';
import { Token } from '../token';
import { Context, Flags } from '../common';
import { consumeOpt, toHex } from './common';
import { Errors, recordErrors, report } from '../errors';
import { isValidIdentifierStart } from '../unicode';

/**
 *  Scans numeric literal
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanNumeric(parser: Parser): Token {
  const { index, column } = parser;

  let next = parser.source.charCodeAt(parser.index);
  let isFloat = next === Chars.Period;

  if (isFloat) {
      parser.tokenValue = scanDecimalDigitsOrSeparator(parser);
  } else {
      let seenSeparator = false;

      // Most number values fit into 4 bytes, but for long numbers
      // we would need a workaround...
      const maximumDigits = 10;
      let digit = maximumDigits - 1;
      parser.tokenValue = 0;
      while (digit >= 0 && (next >= Chars.Zero && next <= Chars.Nine || next === Chars.Underscore)) {
          if (next === Chars.Underscore) {
              parser.index++; parser.column++;
              next = parser.source.charCodeAt(parser.index);
              if (next === Chars.Underscore) report(parser, Errors.Unexpected);
              seenSeparator = true;
              next = next;
              continue;
          }
          seenSeparator = false;
          parser.tokenValue = parser.tokenValue * 10 + next - Chars.Zero;
          parser.index++; parser.column++;
          --digit;
          next = parser.source.charCodeAt(parser.index);
      }

      if (seenSeparator) report(parser, Errors.Unexpected);

      if (digit >= 0 && next !== Chars.Period && (parser.index >= parser.length || !isValidIdentifierStart(next))) {
          return Token.NumericLiteral;
      } else {
          parser.index = index;
          parser.column = column;
          parser.tokenValue = scanDecimalDigitsOrSeparator(parser);
      }
  }

  if (consumeOpt(parser, Chars.Period)) {
      isFloat = true;
      if (parser.source.charCodeAt(parser.index) === Chars.Underscore) report(parser, Errors.ZeroDigitNumericSeparator);
      parser.tokenValue = `${parser.tokenValue}.${scanDecimalDigitsOrSeparator(parser)}`;
  }

  const end = parser.index;

  let bigInt = false;

  if (parser.source.charCodeAt(parser.index) === Chars.LowerN) {
      if (isFloat) report(parser, Errors.Unexpected);
      bigInt = true;
      parser.index++; parser.column++;
  }

  if (consumeOpt(parser, Chars.LowerE) || consumeOpt(parser, Chars.UpperE)) {
      next = parser.source.charCodeAt(parser.index);
      if (consumeOpt(parser, Chars.Plus) || consumeOpt(parser, Chars.Hyphen)) {
          next = parser.source.charCodeAt(parser.index);
      }
      if (!(next >= Chars.Zero && next <= Chars.Nine)) report(parser, Errors.Unexpected);
      const preNumericPart = parser.index;
      const finalFragment = scanDecimalDigitsOrSeparator(parser);
      parser.tokenValue = parser.tokenValue += parser.source.substring(end, preNumericPart) + finalFragment;
  }

  if (isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
      report(parser, Errors.Unexpected);
  } else if (isFloat) parser.tokenValue = parseFloat(parser.tokenValue);
  return bigInt ? Token.BigInt : Token.NumericLiteral;
}


/**
*  Scans numeric literal
*
* @param parser Parser object
* @param context Context masks
*/
export function parseLeadingZero(parser: Parser, context: Context): Token {
  const index = parser.index + 1;
  const next = parser.source.charCodeAt(index);
  if (next >= Chars.Zero && next <= Chars.Seven) {
      return scanImplicitOctalDigits(parser, context);
  }

  switch (next) {
      case Chars.LowerX:
      case Chars.UpperX:
          parser.index++;
          return scanHexDigits(parser);
      case Chars.LowerB:
      case Chars.UpperB:
          return scanOctalOrBinaryDigits(parser, 2);
      case Chars.LowerO:
      case Chars.UpperO:
          return scanOctalOrBinaryDigits(parser, 8);
      case Chars.Underscore:
          report(parser, Errors.TrailingNumericSeparator);
      case Chars.Eight:
      case Chars.Nine:
          if (context & Context.Strict) recordErrors(parser, context, Errors.Unexpected);
      default:
          return scanNumeric(parser);
  }
}

/**
*  Scans octal or binary digits
*
* @param parser Parser object
* @param base
*/

export function scanOctalOrBinaryDigits(parser: Parser, base: number): Token {
  parser.index++; parser.column++;
  if (parser.index >= parser.length) report(parser, Errors.InvalidOrUnexpectedToken);
  parser.index++; parser.column++;
  let code = parser.source.charCodeAt(parser.index);
  if (!(code >= Chars.Zero && code <= Chars.Nine)) report(parser, Errors.InvalidOrUnexpectedToken);
  let seenSeparator = false;
  parser.tokenValue = 0;
  let digits = 0;

  while (parser.index < parser.length) {
      code = parser.source.charCodeAt(parser.index);
      if (code === Chars.Underscore) {
          parser.index++; parser.column++;
          if (parser.source.charCodeAt(parser.index) === Chars.Underscore) report(parser, Errors.ContinuousNumericSeparator);
          seenSeparator = true;
          continue;
      }
      seenSeparator = false;
      const converted = code - Chars.Zero;
      if (!(code >= Chars.Zero && code <= Chars.Nine) || converted >= base) break;
      parser.tokenValue = parser.tokenValue * base + converted;
      parser.index++; parser.column++;
      digits++;
  }

  if (digits === 0) {
      report(parser, Errors.InvalidOrUnexpectedToken);
  }

  if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
  if (consumeOpt(parser, Chars.LowerN)) return Token.BigInt;
  if (isValidIdentifierStart(parser.source.charCodeAt(parser.index))) {
      report(parser, Errors.Unexpected);
  }
  return Token.NumericLiteral;
}

/**
* Scans hex
*
* @param parser Parser object
* @param context Context masks
*/
export function scanHexDigits(parser: Parser): Token {
  parser.index++; parser.column++;
  parser.tokenValue = toHex(parser.source.charCodeAt(parser.index));
  if (parser.tokenValue < 0) report(parser, Errors.Unexpected);
  parser.index++; parser.column++;
  let seenSeparator = false;
  while (parser.index < parser.length) {
      const next = parser.source.charCodeAt(parser.index);
      if (next === Chars.Underscore) {
          parser.index++; parser.column++;
          if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
          seenSeparator = true;
          continue;
      }

      const digit = toHex(next);
      if (digit < 0) break;
      seenSeparator = false;
      parser.tokenValue = parser.tokenValue * 16 + digit;
      parser.index++; parser.column++;
  }
  if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
  if (consumeOpt(parser, Chars.LowerN)) return Token.BigInt;
  return Token.NumericLiteral;
}

/**
* Scans implicit octals
*
* @param parser Parser object
* @param context Context masks
*/
export function scanImplicitOctalDigits(parser: Parser, context: Context): Token {
  if (context & Context.Strict) recordErrors(parser, context, Errors.Unexpected);
  let next = parser.source.charCodeAt(parser.index);
  parser.tokenValue = 0;
  let index = parser.index;
  let column = parser.column;

  parser.flags |= Flags.HasOctal;

  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  while (index < parser.length) {
      next = parser.source.charCodeAt(index);
      if (next === Chars.Underscore) report(parser, Errors.TrailingNumericSeparator);
      if (next === Chars.Eight || next === Chars.Nine) return scanNumeric(parser);
      if (!(next >= Chars.Zero && next <= Chars.Seven)) break;
      parser.tokenValue = parser.tokenValue * 8 + (next - Chars.Zero);
      index++; column++;
  }

  parser.index = index;
  parser.column = column;
  if (isValidIdentifierStart(next)) report(parser, Errors.Unexpected);
  return Token.NumericLiteral;
}

/**
* Scans decimal digit or separator
*
* @param parser Parser object
* @param context Context masks
*/
export function scanDecimalDigitsOrSeparator(parser: Parser): string {
  let start = parser.index;
  let allowSeparator = false;
  let result = '';
  while (parser.index < parser.length) {
      const ch = parser.source.charCodeAt(parser.index);
      if (ch === Chars.Underscore) {
          result += parser.source.substring(start, parser.index);
          if (parser.source.charCodeAt(parser.index + 1) === Chars.Underscore) report(parser, Errors.TrailingNumericSeparator);
          allowSeparator = true;
          parser.index++; parser.column++;
          start = parser.index;
          continue;
      }

      if (!(ch >= Chars.Zero && ch <= Chars.Nine)) break;
      allowSeparator = false;
      parser.index++; parser.column++;

  }
  if (allowSeparator) {
      report(parser, Errors.TrailingNumericSeparator);
  }
  return result + parser.source.substring(start, parser.index);
}

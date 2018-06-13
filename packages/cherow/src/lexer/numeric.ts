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
  const {
      index,
      column
  } = parser;

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
              parser.index++;
              parser.column++;
              next = parser.source.charCodeAt(parser.index);
              if (next === Chars.Underscore) report(parser, Errors.Unexpected);
              seenSeparator = true;
              next = next;
              continue;
          }
          seenSeparator = false;
          parser.tokenValue = parser.tokenValue * 10 + next - Chars.Zero;
          parser.index++;
          parser.column++;
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
      if (parser.source.charCodeAt(parser.index) === Chars.Underscore) report(parser, Errors.Unexpected);
      parser.tokenValue = `${parser.tokenValue}.${scanDecimalDigitsOrSeparator(parser)}`;
  }

  const end = parser.index;

  let bigInt = false;

  if (parser.source.charCodeAt(parser.index) === Chars.LowerN) {
    if (isFloat)  report(parser, Errors.Unexpected);
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
  if (index < parser.source.length) {
      const next = parser.source.charCodeAt(index);
      if (next >= Chars.Zero && next <= Chars.Seven) {
          return scanImplicitOctalDigits(parser, context);
      }
      switch (next) {
          case Chars.LowerX:
          case Chars.UpperX:
              parser.index++;
              return scanHexDigits(parser, context);
          case Chars.LowerB:
          case Chars.UpperB:
              parser.index++;
              return scanBinaryDigits(parser, context);
          case Chars.LowerO:
          case Chars.UpperO:
              parser.index++;
              return scanOctalDigits(parser, context);
          default:
      }
  }
  return scanNumeric(parser);
}


/**
*  Scans numeric literal
*
* @param parser Parser object
* @param context Context masks
*/
export function scanOctalDigits(parser: Parser, context: Context): Token {
  parser.index++;
  parser.column++;
  const c = context;
  let value = 0;
  let digits = 0;
  let seenSeparator = false;

  while (parser.index < parser.length) {
      let code = parser.source.charCodeAt(parser.index);
      if (code === Chars.Underscore) {
          parser.index++;
          parser.column++;
          if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
          seenSeparator = true;
          continue;
      }
      if (!(code >= Chars.Zero && code <= Chars.Seven)) break;
      seenSeparator = false;
      value = value * 8 + (code - Chars.Zero);
      parser.index++;
      parser.column++;
      code = parser.source.charCodeAt(parser.index);
      digits++;
  }

  if (digits === 0) {
      recordErrors(parser, context, Errors.InvalidOrUnexpectedToken);
  }
  parser.tokenValue = value;
  if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
  if (consumeOpt(parser, Chars.LowerN)) return Token.BigInt;
  return Token.NumericLiteral;
}


/**
* Scans binary digits
*
* @param parser Parser object
* @param context Context masks
*/
export function scanHexDigits(parser: Parser, context: Context): Token {
  parser.index++;
  parser.column++;
  let value = toHex(parser.source.charCodeAt(parser.index));
  if (value < 0) recordErrors(parser, context, Errors.Unexpected);
  parser.index++;
  parser.column++;
  let seenSeparator = false;
  while (parser.index < parser.length) {
      const next = parser.source.charCodeAt(parser.index);
      if (next === Chars.Underscore) {
          parser.index++;
          parser.column++;
          if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
          seenSeparator = true;
          continue;
      }

      const digit = toHex(next);
      if (digit < 0) {
          break;
      }
      seenSeparator = false;
      value = value * 16 + digit;
      parser.index++;
      parser.column++;
  }
  if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
  parser.tokenValue = value;
  if (consumeOpt(parser, Chars.LowerN)) return Token.BigInt;
  return Token.NumericLiteral;
}

/**
* Scans binary digits
*
* @param parser Parser object
* @param context Context masks
*/
export function scanBinaryDigits(parser: Parser, context: Context): Token {
  parser.index++;
  parser.column++;
  const c = context;
  let value = 0;
  let digits = 0;
  let seenSeparator = false;

  while (parser.index < parser.length) {
      let code = parser.source.charCodeAt(parser.index);
      if (code === Chars.Underscore) {
          parser.index++;
          parser.column++;
          if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
          seenSeparator = true;
          continue;
      }
      if (!(code >= Chars.Zero && code <= Chars.Seven)) break;
      seenSeparator = false;
      value = value * 2 + (code - Chars.Zero);
      parser.index++;
      parser.column++;
      code = parser.source.charCodeAt(parser.index);
      digits++;
  }
  if (seenSeparator) report(parser, Errors.TrailingNumericSeparator);
  if (digits === 0) recordErrors(parser, context, Errors.InvalidOrUnexpectedToken);
  parser.tokenValue = value;
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

  let value = 0;
  let index = parser.index;
  let column = parser.column;
  let digits = 0;

  parser.flags |= Flags.HasOctal;

  // Implicit octal, unless there is a non-octal digit.
  // (Annex B.1.1 on Numeric Literals)
  while (index < parser.length) {
      next = parser.source.charCodeAt(index);
      if (next === Chars.Underscore) report(parser, Errors.TrailingNumericSeparator);
      if (next === Chars.Eight || next === Chars.Nine) return scanNumeric(parser);
      if (!(next >= Chars.Zero && next <= Chars.Seven)) break;
      value = value * 8 + (next - Chars.Zero);
      index++;
      column++;
      digits++;
  }
  if (digits === 0) recordErrors(parser, context, Errors.Unexpected);
  parser.tokenValue = value;
  parser.index = index;
  parser.column = column;
  if (consumeOpt(parser, Chars.LowerN)) return Token.BigInt;
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
  let isPreviousTokenSeparator = false;
  let result = '';
  while (parser.index < parser.length) {
      const ch = parser.source.charCodeAt(parser.index);
      if (ch === Chars.Underscore) {
          if (allowSeparator) {
              allowSeparator = false;
              isPreviousTokenSeparator = true;
              result += parser.source.substring(start, parser.index);
          } else if (isPreviousTokenSeparator) {
              report(parser, Errors.ContinuousNumericSeparator);
          } else {
              report(parser, Errors.TrailingNumericSeparator);
          }
          parser.index++;
          parser.column++;
          start = parser.index;
          continue;
      }

      if (!(ch >= Chars.Zero && ch <= Chars.Nine)) break;
      allowSeparator = true;
      isPreviousTokenSeparator = false;
      parser.index++;
      parser.column++;

  }
  if (parser.source.charCodeAt(parser.index + 1) === Chars.Underscore) {
      report(parser, Errors.TrailingNumericSeparator);
  }
  return result + parser.source.substring(start, parser.index);
}

import { ParserState, Context, Flags } from '../common';
import { Token } from '../token';
import { nextCodeUnit, toHex } from './common';
import { CharTypes, CharFlags, isIdentifierStart } from './charClassifier';
import { Chars } from '../chars';
import { report, Errors } from '../errors';

export const enum NumberKind {
  ImplicitOctal = 1 << 0,
  Binary = 1 << 1,
  Octal = 1 << 2,
  Hex = 1 << 3,
  Decimal = 1 << 4,
  DecimalWithLeadingZero = 1 << 5
}

export function scanNumber(state: ParserState, context: Context, isFloat: boolean): Token {
  let kind: NumberKind = NumberKind.Decimal;
  let value: number | string = 0;
  let atStart = !isFloat;
  if (isFloat) {
    while (CharTypes[state.currentChar] & CharFlags.Decimal) {
      nextCodeUnit(state);
    }
  } else {
    if (state.currentChar === Chars.Zero) {
      nextCodeUnit(state);

      // Hex
      if ((state.currentChar | 32) === Chars.LowerX) {
        kind = NumberKind.Hex;
        let digits = 0;
        while (CharTypes[nextCodeUnit(state)] & CharFlags.Hex) {
          value = value * 0x10 + toHex(state.currentChar);
          digits++;
        }
        if (digits < 1) report(state, Errors.MissingHexDigits);
        // Octal
      } else if ((state.currentChar | 32) === Chars.LowerO) {
        kind = NumberKind.Octal;
        let digits = 0;
        while (CharTypes[nextCodeUnit(state)] & CharFlags.Octal) {
          value = value * 8 + (state.currentChar - Chars.Zero);
          digits++;
        }
        if (digits < 1) report(state, Errors.ExpectedNumberInRadix, `${8}`);
      } else if ((state.currentChar | 32) === Chars.LowerB) {
        kind = NumberKind.Binary;
        let digits = 0;
        while (CharTypes[nextCodeUnit(state)] & CharFlags.Binary) {
          value = value * 2 + (state.currentChar - Chars.Zero);
          digits++;
        }
        if (digits < 1) report(state, Errors.ExpectedNumberInRadix, `${2}`);
      } else if (CharTypes[state.currentChar] & CharFlags.Octal) {
        // Octal integer literals are not permitted in strict mode code
        if (context & Context.Strict) report(state, Errors.LegacyOctalsInStrictMode);
        else state.flags = Flags.HasOctal;
        kind = NumberKind.ImplicitOctal;
        do {
          if (CharTypes[state.currentChar] & CharFlags.ImplicitOctalDigits) {
            kind = NumberKind.DecimalWithLeadingZero;
            atStart = false;
            break;
          }
          value = value * 8 + (state.currentChar - Chars.Zero);
        } while (CharTypes[nextCodeUnit(state)] & CharFlags.Decimal);
      } else if (CharTypes[state.currentChar] & CharFlags.ImplicitOctalDigits) {
        if (context & Context.Strict) report(state, Errors.LegacyOctalsInStrictMode);
        else state.flags = Flags.HasOctal;
        kind = NumberKind.DecimalWithLeadingZero;
      }
    }

    // Parse decimal digits and allow trailing fractional part
    if (kind & (NumberKind.Decimal | NumberKind.DecimalWithLeadingZero)) {
      if (atStart) {
        // scan subsequent decimal digits
        let digit = 9;
        while (digit >= 0 && CharTypes[state.currentChar] & CharFlags.Decimal) {
          value = 0xa * value + (state.currentChar - Chars.Zero);
          nextCodeUnit(state);
          --digit;
        }

        if (digit >= 0 && state.currentChar !== Chars.Period && !isIdentifierStart(state.currentChar)) {
          state.tokenValue = value;
          return Token.NumericLiteral;
        }
      }

      while (CharTypes[state.currentChar] & CharFlags.Decimal) {
        nextCodeUnit(state);
      }
      // Scan any decimal dot and fractional component
      if (state.currentChar === Chars.Period) {
        isFloat = true;
        nextCodeUnit(state); // consumes '.'
        while (CharTypes[state.currentChar] & CharFlags.Decimal) {
          nextCodeUnit(state);
        }
      }
    }
  }

  let isBigInt = false;
  if (
    state.currentChar === Chars.LowerN &&
    (kind & (NumberKind.Decimal | NumberKind.Binary | NumberKind.Octal | NumberKind.Hex)) !== 0
  ) {
    if (isFloat) report(state, Errors.InvalidBigInt);
    isBigInt = true;
    nextCodeUnit(state);
    // Scan any exponential notation
  } else if ((state.currentChar | 32) === Chars.LowerE) {
    if ((kind & (NumberKind.Decimal | NumberKind.DecimalWithLeadingZero)) === 0) {
      report(state, Errors.InvalidNumber);
    }

    nextCodeUnit(state);

    // '-', '+'
    if (CharTypes[state.currentChar] & CharFlags.Exponent) {
      nextCodeUnit(state);
    }

    let exponentDigits = 0;
    // Consume exponential digits
    while (CharTypes[state.currentChar] & CharFlags.Decimal) {
      nextCodeUnit(state);
      exponentDigits++;
    }
    // Exponential notation must contain at least one digit
    if (exponentDigits < 1) {
      report(state, Errors.MissingExponent);
    }
  }
  // The source character immediately following a numeric literal must
  // not be an identifier start or a decimal digit
  if (CharTypes[state.currentChar] & CharFlags.Decimal || isIdentifierStart(state.currentChar)) {
    report(state, Errors.IDStartAfterNumber);
  }
  state.tokenValue =
    kind & (NumberKind.ImplicitOctal | NumberKind.Binary | NumberKind.Hex | NumberKind.Octal)
      ? value
      : kind & NumberKind.DecimalWithLeadingZero
      ? parseFloat(state.source.slice(state.startIndex, state.index))
      : isBigInt
      ? parseInt(state.source.slice(state.startIndex, state.index), 0xa)
      : +state.source.slice(state.startIndex, state.index);

  return isBigInt ? Token.Bigint : Token.NumericLiteral;
}

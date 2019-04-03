import { ParserState, Context } from '../common';
import { Token } from '../token';
import { nextChar, toHex } from './common';
import { CharTypes, CharFlags, isIdentifierStart } from './charClassifier';
import { Chars } from '../chars';

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
  if (isFloat) {
    while (CharTypes[state.currentChar] & CharFlags.Decimal) {
      nextChar(state);
    }
  } else {
    if (state.currentChar === Chars.Zero) {
      nextChar(state);

      // Hex
      if ((state.currentChar | 32) === Chars.LowerX) {
        nextChar(state);
        kind = NumberKind.Hex;
        let digits = 0;
        do {
          value = value * 0x10 + toHex(state.currentChar);
          digits++;
        } while (CharTypes[nextChar(state)] & (CharFlags.Decimal | CharFlags.Hex));
        if (digits < 1) return Token.Illegal;
        // Octal
      } else if ((state.currentChar | 32) === Chars.LowerO) {
        nextChar(state);
        kind = NumberKind.Octal;
        let digits = 0;
        do {
          value = value * 8 + (state.currentChar - Chars.Zero);
          digits++;
        } while (nextChar(state) - Chars.Zero <= 7);
        if (digits < 1) return Token.Illegal;
      } else if ((state.currentChar | 32) === Chars.LowerB) {
        nextChar(state);
        kind = NumberKind.Binary;
        let digits = 0;
        do {
          value = value * 2 + (state.currentChar - Chars.Zero);
          digits++;
        } while (nextChar(state) - Chars.Zero <= 1);

        if (digits < 1) return Token.Illegal;
      } else if (state.currentChar >= Chars.Zero && state.currentChar <= Chars.Seven) {
        // Octal integer literals are not permitted in strict mode code
        if (context & Context.Strict) {
          return Token.Illegal;
        }
        kind = NumberKind.ImplicitOctal;
        do {
          if (state.currentChar >= Chars.Eight) {
            kind = NumberKind.DecimalWithLeadingZero;
            isFloat = false;
            break;
          }
          value = value * 8 + (state.currentChar - Chars.Zero);
        } while (nextChar(state) - Chars.Zero <= 7);
      } else if (state.currentChar - Chars.Zero > 7) {
        kind = NumberKind.DecimalWithLeadingZero;
      }
    }

    // Parse decimal digits and allow trailing fractional part
    if (kind & (NumberKind.Decimal | NumberKind.DecimalWithLeadingZero)) {
      if (isFloat) {
        // scan subsequent decimal digits
        let digit = 9;
        while (digit >= 0 && CharTypes[state.currentChar] & CharFlags.Decimal) {
          value = 0xa * value + (state.currentChar - Chars.Zero);
          nextChar(state);
          --digit;
        }

        if (digit >= 0 && state.currentChar !== Chars.Period && !isIdentifierStart(state.currentChar)) {
          state.tokenValue = value;
          return Token.NumericLiteral;
        }
      }

      while (CharTypes[state.currentChar] & CharFlags.Decimal) {
        nextChar(state);
      }
      // Scan any decimal dot and fractional component
      if (state.currentChar === Chars.Period) {
        isFloat = true;
        nextChar(state); // consumes '.'
        while (CharTypes[state.currentChar] & CharFlags.Decimal) {
          nextChar(state);
        }
      }
    }
  }

  let isBigInt = false;
  if (
    state.currentChar === Chars.LowerN /*&& !isFloat */ &&
    (kind & (NumberKind.Decimal | NumberKind.Binary | NumberKind.Octal | NumberKind.Hex)) !== 0
  ) {
    isBigInt = true;
    nextChar(state);
    // Scan any exponential notation
  } else if ((state.currentChar | 32) === Chars.LowerE) {
    if ((kind & (NumberKind.Decimal | NumberKind.DecimalWithLeadingZero)) === 0) {
      return Token.Illegal;
    }

    nextChar(state);

    // '-', '+'
    if (CharTypes[state.currentChar] & CharFlags.Exponent) {
      nextChar(state);
    }

    // Exponential notation must contain at least one digit
    if ((CharTypes[state.currentChar] & CharFlags.Decimal) < 1) {
      return Token.Illegal;
    }
    // Consume exponential digits
    while (CharTypes[state.currentChar] & CharFlags.Decimal) {
      nextChar(state);
    }
  }
  // The source character immediately following a numeric literal must
  // not be an identifier start or a decimal digit
  if (CharTypes[state.currentChar] & CharFlags.Decimal || isIdentifierStart(state.currentChar)) {
    return Token.Illegal;
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

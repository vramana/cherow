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

        let digit = toHex(state.currentChar);

        if (digit < 0) return Token.Illegal;
        do {
          state.tokenValue = state.tokenValue * 0x10 + digit;
          nextChar(state);
          digit = toHex(state.currentChar);
        } while (digit >= 0);
        // Octal
      } else if ((state.currentChar | 32) === Chars.LowerO) {
        nextChar(state);
        kind = NumberKind.Octal;
        let digits = 0;
        while (CharTypes[state.currentChar] & CharFlags.Octal) {
          state.tokenValue = state.tokenValue * 8 + (state.currentChar - Chars.Zero);
          nextChar(state);
          digits++;
        }
        if (digits < 1) return Token.Illegal;
      } else if ((state.currentChar | 32) === Chars.LowerB) {
        nextChar(state);
        kind = NumberKind.Binary;
        let digits = 0;
        while (CharTypes[state.currentChar] & CharFlags.Binary) {
          state.tokenValue = state.tokenValue * 2 + (state.currentChar - Chars.Zero);
          nextChar(state);
          digits++;
        }
        if (digits < 1) return Token.Illegal;
      } else if (CharTypes[state.currentChar] & CharFlags.Octal) {
        if (context & Context.Strict) {
          return Token.Illegal;
        }
        kind = NumberKind.ImplicitOctal;
        while (state.index < state.length) {
          if ((CharTypes[state.currentChar] & CharFlags.Octal) === 0) {
            nextChar(state);
            kind = NumberKind.DecimalWithLeadingZero;
            isFloat = false;
            break;
          }
          state.tokenValue = state.tokenValue * 8 + (state.currentChar - Chars.Zero);
          nextChar(state);
        }
      } else if (CharTypes[state.currentChar] & CharFlags.NonOctalDecimalDigit) {
        kind = NumberKind.DecimalWithLeadingZero;
      }
    }

    // Parse decimal digits and allow trailing fractional part.
    if (kind & (NumberKind.Decimal | NumberKind.DecimalWithLeadingZero)) {
      // This is an optimization for parsing Decimal numbers as SMI's.
      if (isFloat) {
        let value = 0;
        // scan subsequent decimal digits
        let digit = 9;
        while (CharTypes[state.currentChar] & CharFlags.Decimal && digit >= 0) {
          value = 0xa * (value as number) + (state.currentChar - Chars.Zero);
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

      if (state.currentChar === Chars.Period) {
        isFloat = true;
        nextChar(state);
        while (CharTypes[state.currentChar] & CharFlags.Decimal) {
          nextChar(state);
        }
      }
    }
  }

  let isBigInt = false;
  if (state.currentChar === Chars.LowerN && !isFloat && kind & (NumberKind.Decimal | NumberKind.Binary)) {
    isBigInt = true;
    nextChar(state);
  } else if ((state.currentChar | 32) === Chars.LowerE) {
    if ((kind & (NumberKind.Decimal | NumberKind.DecimalWithLeadingZero)) === 0) {
      return Token.Illegal;
    }

    // scan exponent
    nextChar(state);

    // '-', '+'
    if (CharTypes[state.currentChar] & CharFlags.Exponent) {
      nextChar(state);
    }

    // we must have at least one decimal digit after 'e'/'E'
    if ((CharTypes[state.currentChar] & CharFlags.Decimal) < 1) {
      return Token.Illegal;
    }

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
    kind & NumberKind.ImplicitOctal
      ? state.tokenValue
      : kind & NumberKind.DecimalWithLeadingZero
      ? parseFloat(state.source.slice(state.startIndex, state.index))
      : isBigInt
      ? parseInt(state.source.slice(state.startIndex, state.index), 0xa)
      : +state.source.slice(state.startIndex, state.index);

  return isBigInt ? Token.Bigint : Token.NumericLiteral;
}

import * as t from 'assert';
import { CharType, LatinLetters, Chars, isIdentifierStart, isIdentifierPart } from "../../src/chars";

describe('Lexer - Chars', () => {
  const items: [Chars, CharType, boolean][] = [

      //  'A-Z - a - z'
      [0x56, CharType.Letters, true],
      [0x4A, CharType.Letters, true],
      [0x5A, CharType.Letters, true],
      [0x6A, CharType.Letters, true],
      //  Decimals
      [0x31, CharType.Decimal, false], // Decimal isn't a valid IDStart
      [0x34, CharType.Decimal, false],
      [0x35, CharType.Decimal, false],
      [0x35, CharType.Decimal, false],

      // '<', '#', '%', '<', '<'

      [0x3C, CharType.Invalid, false], // Neither IDStart nor IDPart
      [0x23, CharType.Invalid, false],
      [0x25, CharType.Invalid, false],

      // Whitespace

      [0x09, CharType.Whitespace, false],
      [0x0C, CharType.Whitespace, false],

  ];

  for (const [token, expected, IDStart] of items) {
      it(`should stringify 'ASCII char ${token}'`, () => {
          t.equal(LatinLetters[token], expected);
          t.equal(IDStart ? isIdentifierPart(token) : isIdentifierStart(token), IDStart);
      });
  }
});

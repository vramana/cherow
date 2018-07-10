import * as t from 'assert';
import { CharType, AsciiLookup, Chars } from '../../src/chars';

describe('Lexer - Chars', () => {
  const items: [Chars, CharType, boolean][] = [

      //  'A-Z - a - z'
      [0x56, CharType.Letters, true],
      [0x4A, CharType.Letters, true],
      [0x5A, CharType.Letters, true],
      [0x6A, CharType.Letters, true],
      [0x41, CharType.Letters, true],
      [0x45, CharType.Letters, true],
      [0x46, CharType.Letters, true],
      [0x4D, CharType.Letters, true],
      [0x50, CharType.Letters, true],
      [0x55, CharType.Letters, true],
      [0x58, CharType.Letters, true],
      [0x5A, CharType.Letters, true],

      // '$', '_'

      [0x24, CharType.Letters, true],
      [0x5F, CharType.Letters, true],

      //  '0 - 9'
      [0x31, CharType.Decimal, false], // Decimal isn't a valid IDStart
      [0x34, CharType.Decimal, false],
      [0x35, CharType.Decimal, false],
      [0x36, CharType.Decimal, false],
      [0x37, CharType.Decimal, false],
      [0x38, CharType.Decimal, false],
      [0x39, CharType.Decimal, false],
  ];

  for (const [char, expected, IDStart] of items) {
      it(`should validate 'ASCII char ${char}'`, () => {
          t.equal(AsciiLookup[char], expected);
          t.equal(IDStart ? (AsciiLookup[char] & CharType.IDContinue) > 0 : (AsciiLookup[char] & CharType.IDStart) > 0, IDStart);
      });
  }
});

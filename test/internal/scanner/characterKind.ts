import * as t from 'assert';
import { Context } from '../../../src/common';
import { CharFlags, CharTypes } from '../../../src/scanner/charClassifier';

describe('src/scanner/scan', () => {
  const tokens: Array<[Context, number]> = [
    [CharFlags.WhiteSpace, 9],
    [CharFlags.LineTerminator, 10],
    [CharFlags.LineTerminator, 10],
    [CharFlags.WhiteSpace, 32],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 36],
    [CharFlags.IdentifierPart | CharFlags.Decimal, 48],
    [CharFlags.IdentifierPart | CharFlags.Decimal, 55],
    [CharFlags.Unknown, 64],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 70],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 71],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 72],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 74],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 75],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 77],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 78],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 103],
    [CharFlags.BackSlash | CharFlags.IdentifierStart, 92],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 122]
  ];

  for (const [ctx, cp] of tokens) {
    it(`should recognise codepoint ${cp}`, () => {
      const found = CharTypes[cp];
      t.deepEqual(
        {
          char: true
        },
        {
          char: (found & ctx) === ctx
        }
      );
    });
  }
});

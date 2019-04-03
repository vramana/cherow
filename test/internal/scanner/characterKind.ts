import * as t from 'assert';
import { Context } from '../../../src/common';
import { CharFlags, CharTypes } from '../../../src/scanner/charClassifier';

describe('src/scanner/scan', () => {
  const tokens: Array<[Context, number]> = [
    [CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, 9],
    [CharFlags.WhiteSpaceOrLineTerminator | CharFlags.LineTerminator, 10],
    [CharFlags.LineTerminator, 10],
    [CharFlags.WhiteSpaceOrLineTerminator, 10],
    [CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, 32],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 36],
    [CharFlags.Binary, 48],
    [CharFlags.Octal, 48],
    [CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Binary | CharFlags.Octal, 48],
    [CharFlags.IdentifierPart | CharFlags.Decimal | CharFlags.Octal, 55],
    [CharFlags.Unknown, 64],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 70],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 71],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 72],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 74],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 75],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 77],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 78],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 103],
    [CharFlags.NeedSlowPath, 92],
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

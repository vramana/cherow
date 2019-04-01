import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';
import { CharFlags, CharTypes } from '../../../src/scanner/charClassifier';

describe('src/scanner/scan', () => {
  const tokens: Array<[Context, number]> = [
    [CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, 9],
    [CharFlags.WhiteSpaceOrLineTerminator | CharFlags.StringTerminator | CharFlags.LineTerminator, 10],
    [CharFlags.LineTerminator, 10],
    [CharFlags.StringTerminator, 10],
    [CharFlags.WhiteSpaceOrLineTerminator, 10],
    [CharFlags.WhiteSpace | CharFlags.WhiteSpaceOrLineTerminator, 32],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 36],
    [CharFlags.Binary, 48],
    [CharFlags.Octal, 48],
    [
      CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Binary | CharFlags.Octal,
      48
    ],
    [CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate | CharFlags.Decimal | CharFlags.Octal, 55],
    [CharFlags.Unknown, 64],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 70],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 71],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 72],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 74],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 75],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 77],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidate, 78],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart, 103],
    [CharFlags.StringTerminator | CharFlags.NeedSlowPath, 92],
    [CharFlags.IdentifierStart | CharFlags.IdentifierPart | CharFlags.NoKeywordCandidateStart, 122]
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

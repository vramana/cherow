import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('src/scanner/scan', () => {
  const tokens: Array<[Context, Token, string, number]> = [
    // Numeric literals
    [Context.Empty, Token.NumericLiteral, '0', 0],
    [Context.Empty, Token.NumericLiteral, '1', 1],
    [Context.Empty, Token.NumericLiteral, '3', 3],
    [Context.Empty, Token.NumericLiteral, '10', 10],
    [Context.Empty, Token.NumericLiteral, '32', 32],
    [Context.Empty, Token.NumericLiteral, '98', 98],
    [Context.Empty, Token.NumericLiteral, '7890', 7890],
    [Context.Empty, Token.NumericLiteral, '123', 123],
    [Context.Empty, Token.NumericLiteral, '.5', 0.5],
    [Context.Empty, Token.NumericLiteral, '.9', 0.9],
    [Context.Empty, Token.NumericLiteral, '.123', 0.123],
    [Context.Empty, Token.NumericLiteral, '.1234567890', 0.123456789],
    [Context.Empty, Token.NumericLiteral, '.0000', 0.0],
    [Context.Empty, Token.NumericLiteral, '32.', 32],
    [Context.Empty, Token.NumericLiteral, '8.', 8],
    [Context.Empty, Token.NumericLiteral, '1234567890.', 1234567890],
    [Context.Empty, Token.NumericLiteral, '456.', 456],
    [Context.Empty, Token.NumericLiteral, '2.3', 2.3],
    [Context.Empty, Token.NumericLiteral, '5.5', 5.5],
    [Context.Empty, Token.NumericLiteral, '0.00', 0],
    [Context.Empty, Token.NumericLiteral, '0.001', 0.001],
    [Context.Empty, Token.NumericLiteral, '0.0', 0],
    [Context.Empty, Token.NumericLiteral, '4.0', 4],
    [Context.Empty, Token.NumericLiteral, '0.0', 0],
    [Context.Empty, Token.NumericLiteral, '456.345', 456.345],
    [Context.Empty, Token.NumericLiteral, '1234567890.0987654321', 1234567890.0987654321],

    // Numeric literals with exponent
    [Context.Empty, Token.NumericLiteral, '0e1', 0],
    [Context.Empty, Token.NumericLiteral, '1e2', 100],
    [Context.Empty, Token.NumericLiteral, '5e6', 5000000],
    [Context.Empty, Token.NumericLiteral, '10e10', 100000000000],
    [Context.Empty, Token.NumericLiteral, '7890e789', Infinity],
    [Context.Empty, Token.NumericLiteral, '1234567890e1234567890', Infinity],
    [Context.Empty, Token.NumericLiteral, '.0E10', 0],
    [Context.Empty, Token.NumericLiteral, '.5E00', 0.5],
    [Context.Empty, Token.NumericLiteral, '.10E1', 1],
    [Context.Empty, Token.NumericLiteral, '1.e2', 1e2],
    [Context.Empty, Token.NumericLiteral, '1.e-2', 0.01],
    [Context.Empty, Token.NumericLiteral, '1.E2', 100],
    [Context.Empty, Token.NumericLiteral, '1.E-2', 0.01],
    [Context.Empty, Token.NumericLiteral, '.5e3', 500],
    [Context.Empty, Token.NumericLiteral, '.5e-3', 0.0005],
    [Context.Empty, Token.NumericLiteral, '0.5e3', 500],
    [Context.Empty, Token.NumericLiteral, '55.55e10', 555500000000],
    [Context.Empty, Token.NumericLiteral, '0e-100', 0],
    [Context.Empty, Token.NumericLiteral, '0E-100', 0],
    [Context.Empty, Token.NumericLiteral, '0e+1', 0],
    [Context.Empty, Token.NumericLiteral, '0e01', 0],
    [Context.Empty, Token.NumericLiteral, '6e+1', 60],
    [Context.Empty, Token.NumericLiteral, '9e+1', 90],
    [Context.Empty, Token.NumericLiteral, '1E-1', 0.1],
    [Context.Empty, Token.NumericLiteral, '0e-1', 0],
    [Context.Empty, Token.NumericLiteral, '7E1', 70],
    [Context.Empty, Token.NumericLiteral, '0e0', 0],
    [Context.Empty, Token.NumericLiteral, '0E0', 0],
    [Context.Empty, Token.NumericLiteral, '.6e1', 6],
    [Context.Empty, Token.NumericLiteral, '1.1E-100', 1.1e-100],
    [Context.Empty, Token.NumericLiteral, '.1e-100', 1e-101],
    [Context.Empty, Token.NumericLiteral, '0e+100', 0],
    [Context.Empty, Token.NumericLiteral, '1E+100', 1e100],
    [Context.Empty, Token.NumericLiteral, '.1E+100', 1e99],

    // Hex
    [Context.Empty, Token.NumericLiteral, '0xcafe', 51966],
    [Context.Empty, Token.NumericLiteral, '0x12345678', 305419896],
    [Context.Empty, Token.NumericLiteral, '0x0001', 1],
    [Context.Empty, Token.NumericLiteral, '0x0', 0],
    [Context.Empty, Token.NumericLiteral, '0x2', 2],
    [Context.Empty, Token.NumericLiteral, '0xD', 13],
    [Context.Empty, Token.NumericLiteral, '0xf', 15],
    [Context.Empty, Token.NumericLiteral, '0xb', 11],
    [Context.Empty, Token.NumericLiteral, '0x7', 7],
    [Context.Empty, Token.NumericLiteral, '0x45', 69],
    [Context.Empty, Token.NumericLiteral, '0xC0', 192],
    [Context.Empty, Token.NumericLiteral, '0xF6', 246],
    [Context.Empty, Token.NumericLiteral, '0xd1', 209],
    [Context.Empty, Token.NumericLiteral, '0xAc', 172],
    [Context.Empty, Token.NumericLiteral, '0xD2', 210],
    [Context.Empty, Token.NumericLiteral, '0x23', 35],
    [Context.Empty, Token.NumericLiteral, '0X1', 1],
    [Context.Empty, Token.NumericLiteral, '0Xd', 13],
    [Context.Empty, Token.NumericLiteral, '0Xf', 15],
    [Context.Empty, Token.NumericLiteral, '0X010000000', 268435456],
    [Context.Empty, Token.NumericLiteral, '0X01', 1],
    [Context.Empty, Token.NumericLiteral, '0X010', 16],
    [Context.Empty, Token.NumericLiteral, '0Xa', 10],
    [Context.Empty, Token.NumericLiteral, '0x1234ABCD', 305441741],
    [Context.Empty, Token.NumericLiteral, '0x9a', 154],
    [Context.Empty, Token.NumericLiteral, '0x1234567890abcdefABCEF', 1.3754889323622168e24],
    [Context.Empty, Token.NumericLiteral, '0X1234567890abcdefABCEF1234567890abcdefABCEF', 2.6605825358829506e49],
    [
      Context.Empty,
      Token.NumericLiteral,
      '0X14245890abcdefABCE234567890ab234567890abcdeF1234567890abefABCEF',
      5.694046700000817e74
    ],

    // Binary
    [Context.Empty, Token.NumericLiteral, '0b0', 0],
    [Context.Empty, Token.NumericLiteral, '0b00', 0],
    [Context.Empty, Token.NumericLiteral, '0b11', 3],
    [Context.Empty, Token.NumericLiteral, '0b10', 2],
    [Context.Empty, Token.NumericLiteral, '0B01', 1],
    [Context.Empty, Token.NumericLiteral, '0B00', 0],
    [Context.Empty, Token.NumericLiteral, '0b010', 2],
    [Context.Empty, Token.NumericLiteral, '0b10', 2],
    [Context.Empty, Token.NumericLiteral, '0b011', 3],
    [Context.Empty, Token.NumericLiteral, '0B011', 3],
    [Context.Empty, Token.NumericLiteral, '0B01', 1],
    [Context.Empty, Token.NumericLiteral, '0B01001', 9],
    [Context.Empty, Token.NumericLiteral, '0B011111111111111111111111111111', 536870911],
    [Context.Empty, Token.NumericLiteral, '0B00000111111100000011', 32515],
    [Context.Empty, Token.NumericLiteral, '0B0000000000000000000000000000000000000000000000001111111111', 1023],

    // Octals
    [Context.Empty, Token.NumericLiteral, '0O12345670', 2739128],
    [Context.Empty, Token.NumericLiteral, '0o45', 37],
    [Context.Empty, Token.NumericLiteral, '0o5', 5],
    [Context.Empty, Token.NumericLiteral, '0o12', 10],
    [Context.Empty, Token.NumericLiteral, '0o70', 56],
    [Context.Empty, Token.NumericLiteral, '0o0', 0],
    [Context.Empty, Token.NumericLiteral, '0O1', 1],
    [Context.Empty, Token.NumericLiteral, '0o07', 7],
    [Context.Empty, Token.NumericLiteral, '0O011', 9],
    [Context.Empty, Token.NumericLiteral, '0O077', 63],
    [Context.Empty, Token.NumericLiteral, '0O1234567', 342391],
    [Context.Empty, Token.NumericLiteral, '0O12345670003567234567435', 96374499007469390000],

    // Implicit octal
    [Context.Empty, Token.NumericLiteral, '0123', 83],
    [Context.Empty, Token.NumericLiteral, '01', 1],
    [Context.Empty, Token.NumericLiteral, '043', 35],
    [Context.Empty, Token.NumericLiteral, '07', 7],
    [Context.Empty, Token.NumericLiteral, '09', 9],
    [Context.Empty, Token.NumericLiteral, '09.3', 9.3],
    [Context.Empty, Token.NumericLiteral, '09.3e1', 93],
    [Context.Empty, Token.NumericLiteral, '09.3e-1', 0.93],
    [Context.Empty, Token.NumericLiteral, '098', 98],
    [Context.Empty, Token.NumericLiteral, '0098', 98],
    [Context.Empty, Token.NumericLiteral, '000000000098', 98],
    [Context.Empty, Token.NumericLiteral, '0000000000234567454548', 234567454548],

    // BigInt
    [Context.Empty, Token.Bigint, '1n', 1],
    [Context.Empty, Token.Bigint, '0o45n', 37],
    [Context.Empty, Token.Bigint, '0b10n', 2],
    [Context.Empty, Token.Bigint, '0x9an', 154]
  ];

  for (const [ctx, token, op, value] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const state = create(op);
      const found = scanSingleToken(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          value: state.tokenValue,
          index: state.index
        },
        {
          token: token,
          hasNext: false,
          value,
          index: op.length
        }
      );
    });

    it(`scans '${op}' with more to go`, () => {
      const state = create(`${op} `);
      const found = scanSingleToken(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          value: state.tokenValue,
          index: state.index
        },
        {
          token: token,
          hasNext: true,
          value,
          index: op.length
        }
      );
    });
  }

  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const state = create(source);
      t.throws(() => scanSingleToken(state, context));
    });
  }

  fail('fails on 11.1n', '11.1n', Context.Strict);
  fail('fails on 0.1n', '0.1n', Context.Strict);
  fail('fails on 2017.8n', '2017.8n', Context.Strict);
  fail('fails on 0xgn', '0xgn', Context.Strict);
  fail('fails on 0e0n', '0e0n', Context.Strict);
  fail('fails on 0o9n', '0o9n', Context.Strict);
  fail('fails on 0b2n', '0b2n', Context.Strict);
  fail('fails on 008.3', '008.3', Context.Strict);
  fail('fails on 008.3n', '008.3n', Context.Empty);
  fail('fails on 0b001E-100', '0b001E-100', Context.Empty);
  fail('fails on 0b2', '0b2', Context.Empty);
  fail('fails on 00b0', '00b0', Context.Empty);
  fail('fails on 0b', '0b', Context.Empty);
  fail('fails on 0\\u00620', '0\\u00620', Context.Empty);
  fail('fails on 00', '00', Context.Strict);
  fail('fails on 000', '000', Context.Strict);
  fail('fails on 005', '005', Context.Strict);
  fail('fails on 08', '08', Context.Strict);
  fail('fails on 0o8', '0o8', Context.Empty);
  fail('fails on 0x', '0x', Context.Empty);
  fail('fails on 10e', '10e', Context.Empty);
  fail('fails on 07e8', '07e8', Context.Empty);
  fail('fails on 10e-', '10e-', Context.Empty);
  fail('fails on 10e+', '10e+', Context.Empty);
  fail('fails on 10ef', '10ef', Context.Empty);
  fail('fails on decimal integer followed by identifier', '12adf00', Context.Empty);
  fail('fails on decimal integer followed by identifier', '3in1', Context.Empty);
  fail('fails on decimal integer followed by identifier', '3.e', Context.Empty);
  fail('fails on decimal integer followed by identifier', '3.e+abc', Context.Empty);
  fail('fails on Binary-integer-literal-like sequence with a leading 0', '00b0;', Context.Empty);
  fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0o8', Context.Strict);
  fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0b3', Context.Strict);
  fail('fails on Octal-integer-literal-like sequence without any digits', '0o', Context.Strict);
  fail('fails on Binary-integer-literal-like sequence without any digits', '0b;', Context.Strict);
  fail('fails on Binary-integer-literal-like sequence containing an invalid digit', '0b2;', Context.Strict);
  fail('fails on Binary-integer-literal-like sequence containing an invalid digit', '0077', Context.Strict);
  fail('fails on invalid BigInt literal', '1ne-1', Context.OptionsNext);
});

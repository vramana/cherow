import * as t from 'assert';
import { scan, hasNext } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token, tokenDesc } from '../../src/token';

describe('Lexer - Numbers', () => {
  describe('seek()', () => {
    context('script', () => run(false));
    context('module', () => run(true));
  });

  function run(isModule: boolean) {
    interface Opts {
      source: string;
      value: any;
      hasNext: boolean;
      line: number;
      column: number;
    }

    const tokens: Array<[Context, Token, string, number | string]> = [
      [Context.Empty, Token.NumericLiteral, '1', 1],
      [Context.Empty, Token.NumericLiteral, '54', 54],
      [Context.Empty, Token.NumericLiteral, '7890', 7890],
      [Context.Empty, Token.NumericLiteral, '.54', 0.54],
      [Context.Empty, Token.NumericLiteral, '1234567890.0987654321', 1234567890.0987654],
      [Context.Empty, Token.NumericLiteral, '2e3', 2000],
      [Context.Empty, Token.NumericLiteral, '43.78', 43.78],
      [Context.Empty, Token.NumericLiteral, '54.98', 54.98],
      [Context.Empty, Token.NumericLiteral, '9.10', 9.1],
      [Context.Empty, Token.NumericLiteral, '6e7', 60000000],
      [Context.Empty, Token.NumericLiteral, '.54E5', 54000],
      [Context.Empty, Token.NumericLiteral, '.1E-100', 1e-101],
      [Context.Empty, Token.NumericLiteral, '.0E-100', '0'],
      [Context.Empty, Token.NumericLiteral, '0.E+100', '0'],
      [Context.Empty, Token.NumericLiteral, '1e+100', 1e100],
      [Context.Empty, Token.NumericLiteral, '.1E+100', 1e99],

      /* Float */

      [Context.Empty, Token.NumericLiteral, '1.1213', 1.1213],
      [Context.Empty, Token.NumericLiteral, '09.1213', 9.1213],
      [Context.Empty, Token.NumericLiteral, '1.1', 1.1],

      /* Hex */

      [Context.Empty, Token.NumericLiteral, '0x12', 18],
      [Context.Empty, Token.NumericLiteral, '0x45', 69],
      [Context.Empty, Token.NumericLiteral, '0x9a', 154],
      [Context.Empty, Token.NumericLiteral, '0xAc', 172],
      [Context.Empty, Token.NumericLiteral, '0xE4', 228],
      [Context.Empty, Token.NumericLiteral, '0xf5', 245],
      [Context.Empty, Token.NumericLiteral, '0xf5', 245],
      [Context.Empty, Token.NumericLiteral, '0xf43fad5f43Fad5f43fad5', 1.845491295160757e25],

      /* Octals */

      [Context.Empty, Token.NumericLiteral, '0o12345670', 2739128],
      [Context.Empty, Token.NumericLiteral, '0o5', 5],
      [Context.Empty, Token.NumericLiteral, '0o34', 28],
      [Context.Empty, Token.NumericLiteral, '0o1', 1],
      [Context.Empty, Token.NumericLiteral, '0o12', 10],
      [Context.Empty, Token.NumericLiteral, '0o45', 37],

      /* Binary */

      [Context.Empty, Token.NumericLiteral, '0b01', 1],
      [Context.Empty, Token.NumericLiteral, '0b00', 0],
      [Context.Empty, Token.NumericLiteral, '0b1', 1],
      [Context.Empty, Token.NumericLiteral, '0b0', 0],
      [Context.Empty, Token.NumericLiteral, '0b10', 2],
      [Context.Empty, Token.NumericLiteral, '0o1', 1],

      /* Legacy octal */

      [Context.Empty, Token.NumericLiteral, '00', 0],
      [Context.Empty, Token.NumericLiteral, '043', 35],
      [Context.Empty, Token.NumericLiteral, '065', 53],
      [Context.Empty, Token.NumericLiteral, '09', 9],
      [Context.Empty, Token.NumericLiteral, '09.7', 9.7],
      [Context.Empty, Token.NumericLiteral, '09.E+100', 9e100],
      [Context.Empty, Token.NumericLiteral, '08.7', 8.7],
      [Context.Empty, Token.NumericLiteral, '08.E+100', 8e100],
      [Context.Empty, Token.NumericLiteral, '06', 6],
      [Context.Empty, Token.NumericLiteral, '09', 9],
      [Context.Empty, Token.NumericLiteral, '087', 87],
      [Context.Empty, Token.NumericLiteral, '000008', 8],
      [Context.Empty, Token.NumericLiteral, '000008.4', 8.4],
      [Context.Empty, Token.NumericLiteral, '000003.4', 3.4],
      [Context.Empty, Token.NumericLiteral, '0', 0],
      [Context.Empty, Token.NumericLiteral, '01', 1],
      [Context.Empty, Token.NumericLiteral, '02', 2],
      [Context.Empty, Token.NumericLiteral, '03', 3],
      [Context.Empty, Token.NumericLiteral, '04', 4],
      [Context.Empty, Token.NumericLiteral, '05', 5],
      [Context.Empty, Token.NumericLiteral, '06', 6],
      [Context.Empty, Token.NumericLiteral, '07', 7],
      [Context.Empty, Token.NumericLiteral, '08', 8],
      [Context.Empty, Token.NumericLiteral, '09', 9],
      [Context.Empty, Token.NumericLiteral, '00', 0],
      [Context.Empty, Token.NumericLiteral, '001', 1],
      [Context.Empty, Token.NumericLiteral, '002', 2],
      [Context.Empty, Token.NumericLiteral, '003', 3],
      [Context.Empty, Token.NumericLiteral, '004', 4],
      [Context.Empty, Token.NumericLiteral, '005', 5],
      [Context.Empty, Token.NumericLiteral, '006', 6],
      [Context.Empty, Token.NumericLiteral, '007', 7],
      [Context.Empty, Token.NumericLiteral, '008', 8],
      [Context.Empty, Token.NumericLiteral, '009', 9],
      [Context.Empty, Token.NumericLiteral, '0000009', 9],
      [Context.Empty, Token.NumericLiteral, '000008.4e+100', 8.4e100],

      /* BigInt */

      [Context.OptionsNext, Token.BigIntLiteral, '1n', '1'], // The 'raw' value have the BigInt value with the 'n' suffix (1n)
      [Context.OptionsNext, Token.BigIntLiteral, '856n', '856'],
      [Context.OptionsNext, Token.BigIntLiteral, '0b10n', 2],
      [Context.OptionsNext, Token.BigIntLiteral, '0xFFFFn', 0xffff]
    ];

    for (const [ctx, token, op, value] of tokens) {
      it(`scans '${op}'`, () => {
        const state = create(op, undefined);
        const found = scan(state, ctx);

        t.deepEqual(
          {
            token: tokenDesc(found),
            hasNext: hasNext(state),
            value: state.tokenValue,
            line: state.line
            // column: state.column
          },
          {
            token: tokenDesc(token),
            hasNext: false,
            value,
            line: 1
            //column: op.length
          }
        );
      });
    }

    if (isModule) {
    }
  }
});

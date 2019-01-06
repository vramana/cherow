import * as t from 'assert';
import { scan, hasNext } from '../../src/scanner';
import { Context } from '../../src/common';
import { Chars } from '../../src/chars';
import { create } from '../../src/state';
import { Token, tokenDesc } from '../../src/token';

describe('Lexer - Identifiers', () => {
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

    const tokens: Array<[Context, Token, string, string]> = [
      [Context.Empty, Token.Identifier, 'a', 'a'],
      [Context.Empty, Token.Identifier, 'abc', 'abc']
      //   [Context.Empty, Token.Identifier, 'a  a', 'a '],
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

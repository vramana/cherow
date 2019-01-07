import * as t from 'assert';
import { next } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token } from '../../src/token';

describe('Lexer - OnToken', () => {
  interface Opts {
    source: string;
    token: Token;
    hasNext: boolean;
    line: number;
    column: number;
    index: number;
  }
  function pass(name: string, opts: Opts) {
    it(name, () => {
      let token: any;
      const state = create(opts.source, undefined, function(t: Token, start: number | void, end: number | void) {
        token = {
          token: t,
          start,
          end
        };
      });
      next(state, Context.Empty);
      t.deepEqual(
        {
          hasNext: state.index < state.length,
          line: state.line,
          column: token.end,
          index: state.index,
          token: token.token
        },
        {
          token: opts.token,
          hasNext: state.index < state.length,
          line: state.line,
          column: state.column,
          index: state.index
        }
      );
    });
  }

  pass('tokenize right brace', {
    source: '}',
    token: Token.RightBrace,
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize left bracket', {
    source: '[',
    token: Token.LeftBracket,
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });
});

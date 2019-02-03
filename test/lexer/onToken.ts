import * as t from 'assert';
import { scanSingleToken } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token } from '../../src/token';

describe('Lexer - OnToken', () => {
  interface Opts {
    source: string;
    token: string;
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
      scanSingleToken(state, Context.Empty);
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
    token: 'Punctuator',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize left bracket', {
    source: '[',
    token: 'Punctuator',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize boolean', {
    source: 'false',
    token: 'BooleanLiteral',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize boolean', {
    source: '123',
    token: 'NumericLiteral',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize boolean', {
    source: '"Hello"',
    token: 'StringLiteral',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize boolean', {
    source: '`a`',
    token: 'TemplateLiteral',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize boolean', {
    source: 'const',
    token: 'Keyword',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize boolean', {
    source: 'hello',
    token: 'Identifier',
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });
});

import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('Lexer - Identifiers', () => {
  const tokens: Array<[Context, Token, string, string]> = [
    [Context.Empty, Token.EndOfSource, '//', ''],
    [Context.Empty, Token.EndOfSource, '// foo', ''],
    [Context.Empty, Token.EndOfSource, '// foo\n', ''],
    [Context.Empty, Token.EndOfSource, '// /', ''],
    [Context.Empty, Token.EndOfSource, '// */', ''],
    [Context.Empty, Token.EndOfSource, '// /* */ foo', ''],
    [Context.Empty, Token.EndOfSource, '//\\n \\r \\x0a \\u000a foo bar', ''],
    [Context.Empty, Token.EndOfSource, '//\\unope \\u{nope} \\xno ', ''],
    [Context.Empty, Token.EndOfSource, '/**/', ''],
    [Context.Empty, Token.EndOfSource, '/* comment */', ''],
    [Context.Empty, Token.EndOfSource, '/* \n */', ''],
    [Context.Empty, Token.EndOfSource, '/* \n\n\n */', ''],
    [Context.Empty, Token.EndOfSource, '/* \\n \\r \\x0a \\u000a */', ''],
    [Context.Empty, Token.EndOfSource, '/* /* */', ''],
    [Context.Empty, Token.EndOfSource, '\n--' + '>', '']
  ];

  for (const [ctx, token, op, value] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const state = create(op);
      const found = scanSingleToken(state, ctx);

      t.deepEqual(
        {
          token: found,
          hasNext: state.index < state.source.length,
          index: state.index
        },
        {
          token: token,
          hasNext: false,
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

  fail('fails on /**', '/**', Context.Empty);
});

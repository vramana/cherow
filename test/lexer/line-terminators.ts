import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('Lexer - Line terminators', () => {
  const tokens: Array<[Context, Token, string, string]> = [
    [Context.Empty, Token.EndOfSource, '\n', ''],
    [Context.Empty, Token.EndOfSource, '\r\n', ''],
    [Context.Empty, Token.EndOfSource, '\r', ''],
    [Context.Empty, Token.EndOfSource, '\u2028', ''],
    [Context.Empty, Token.EndOfSource, '\u2029', ''],
    [Context.Empty, Token.EndOfSource, '/*\u2029 multi line \u2029 comment \u2029 x = 1;*/', ''],
    [Context.Empty, Token.Identifier, '\u000Dx', 'x'],
    [Context.Empty, Token.Identifier, '\nx', 'x'],
    [Context.Empty, Token.Identifier, '\rx', 'x'],
    [Context.Empty, Token.Identifier, '\u2028x', 'x'],
    [Context.Empty, Token.Identifier, '\u2029x', 'x'],
    [Context.Empty, Token.Identifier, '\u000Ax', 'x']
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
  }

  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const state = create(source);
      t.throws(() => scanSingleToken(state, context));
    });
  }

  fail('fails on /**', '/**', Context.Empty);
});

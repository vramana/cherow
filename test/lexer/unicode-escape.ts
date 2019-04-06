import * as t from 'assert';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

describe('Lexer - Unicode Escape', () => {
  const tokens: Array<[Context, Token, string, string]> = [
    [Context.Empty, Token.Identifier, '\\u0049', 'I'],
    [Context.Empty, Token.Identifier, '\\u0627\\u0644\\u0642\\u0637', 'القط'],
    [Context.Empty, Token.Identifier, '\\u0066', 'f'],
    [Context.Empty, Token.Identifier, '\\u0066', 'f'],
    [Context.Empty, Token.Identifier, '\\u0061', 'a'],
    [Context.Empty, Token.Identifier, '\\u{61}', 'a'],
    [Context.Empty, Token.Identifier, '\\u{0000061}', 'a'],
    [Context.Empty, Token.Identifier, '\\u{0066}', 'f'],
    [Context.Empty, Token.LetKeyword, 'l\\u0065t', 'let'],
    [Context.Empty, Token.Identifier, '\\u{0000000066}', 'f'],
    [Context.Empty, Token.Identifier, '\\u{000000000000000066}', 'f'],
    [Context.Empty, Token.Identifier, '\\u{00000000000000000000000066}', 'f'],
    [Context.Empty, Token.Identifier, '\\u0062\\u0066', 'bf'],
    [Context.Empty, Token.Identifier, '\\u0067', 'g'],
    [Context.Empty, Token.Identifier, '\\u0062\\u0066', 'bf'],
    [Context.Empty, Token.Identifier, '\\u0062\\u0066', 'bf'],
    [Context.Empty, Token.Identifier, '\\u01F602', 'Ƕ02'],
    [Context.Empty, Token.Identifier, '\\u{41}', 'A'],
    [Context.Empty, Token.Identifier, '\\u{0041}', 'A'],
    [Context.Empty, Token.Identifier, '\\u{03BB}', 'λ'],
    [Context.Empty, Token.Identifier, '\\u{6728}', '木']
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

  fail('fails on \\u{1F4A9}', '\\u{1F4A9}', Context.Empty);
  fail('fails on \\u162P', '\\u162P', Context.Empty);
  fail('fails on \\u{FFYZ}', '\\u{FFYZ}', Context.Empty);
  fail('fails on \\u41', '\\u41', Context.Empty);
  fail('fails on "\\u41"', '"\\u41"', Context.Empty);
  fail('fails on \\u123', '\\u123', Context.Empty);
  fail('fails on \\u\\u\\u', '\\u\\u\\u', Context.Empty);
  fail('fails on \\u005Cuc548', '\\u005Cuc548', Context.Empty);
  fail('fails on \\u{000006100000000}', '\\u{000006100000000}', Context.Empty);
  fail('fails on "\\u{000006100000000}"', '"\\u{000006100000000}"', Context.Empty);
});

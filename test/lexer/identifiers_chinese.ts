import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Identifiers (chinese)', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context) {
          it(name, () => {
              const state = new State(opts.source, undefined, undefined);

              t.deepEqual({
                  token: nextToken(state, context),
                  value: state.tokenValue,
                  line: state.line,
                  column: state.column,
              },          {
                  token: Token.Identifier,
                  value: opts.value,
                  line: opts.line,
                  column: opts.column,
              });
          });
      }

      test(`${name}`, Context.Empty);
  }

  pass('scans \'𠀾a\'', {
      source: '𠀾a',
      'value': '𠀾a',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 3,
  });

  pass('scans \'a𠀾\'', {
      source: 'a𠀾',
      'value': 'a𠀾',
      raw: 'a𠀾',
      token: Token.Identifier,
      line: 1,
      column: 3,
  });

  pass('scans \'a𠀾a\'', {
      source: 'a𠀾a',
      'value': 'a𠀾a',
      raw: 'a𠀾a',
      token: Token.Identifier,
      line: 1,
      column: 4,
  });

  pass('scans \'中国\'', {
      source: 'not中国',
      'value': 'not中国',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 5,
  });

  pass('scans \'not角质\'', {
      source: 'not角质',
      'value': 'not角质',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 5,
  });

  pass('scans \'not死\'', {
      source: 'not死',
      'value': 'not死',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 4,
  });
});

import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Identifiers (dutch)', () => {

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

  pass('scans \'nummer123\'', {
      source: 'nummer123',
      'value': 'nummer123',
      raw: 'nummer123',
      token: Token.Identifier,
      line: 1,
      column: 9,
  });

});

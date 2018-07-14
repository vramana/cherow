import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

// Both Await and Yield is valid as identifiers in sloppy mode,
// so we are testing their escaped version in strict mode / module code.
describe('Lexer - Yield and await as escaped identifiers', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context) {
          it(name, () => {
              const state = new State(opts.source, undefined, undefined);
              t.deepEqual({
                  token: nextToken(state, context | Context.Strict | Context.OptionsRawidentifiers),
                  raw: state.tokenRaw,
                  value: state.tokenValue,
                  line: state.line,
                  column: state.column,
              },          {
                  token: opts.token,
                  raw: opts.raw,
                  value: opts.value,
                  line: opts.line,
                  column: opts.column,
              });
          });
      }

      test(`${name} `, Context.Empty);
  }

  pass('scans "hasOwnProperty"', {
    source: 'hasOwnProperty',
    value: 'hasOwnProperty',
    raw: 'hasOwnProperty',
    token: Token.Identifier,
    line: 1,
    column: 14,
  });

  pass('scans "yi\\u0065ld"', {
      source: 'yi\\u0065ld',
      value: 'yield',
      raw: 'yi\\u0065ld',
      token: Token.Invalid,
      line: 1,
      column: 10,
  });

  pass('scans "aw\\u0061it"', {
      source: 'aw\\u0061it',
      value: 'await',
      raw: 'aw\\u0061it',
      token: Token.Invalid,
      line: 1,
      column: 10,
  });
});

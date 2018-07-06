import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Surrogate Identifiers', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context) {
          it(name, () => {
              const state = new State(opts.source, undefined, undefined);

              t.deepEqual({
                  token: nextToken(state, context | Context.OptionsRawidentifiers),
                  value: state.tokenValue,
                  line: state.line,
                  column: state.column,
              }, {
                  token: Token.Identifier,
                  value: opts.value,
                  line: opts.line,
                  column: opts.column,
              });
          });
      }

      test(`${name}`, Context.Empty);
  }

  pass("scans '𐊧'", {
      source: "𐊧",
      "value": "𐊧",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '𐊧'", {
      source: "𐊧",
      "value": "𐊧",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans 'T‿'", {
      source: "T‿ ",
      value: "T‿",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '𐒦'", {
      source: "𐒦",
      value: "𐒦",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass("scans '𫠝'", {
      source: "𫠝",
      value: "𫠝",
      raw: "'abc'",
      token: Token.Identifier,
      line: 1,
      column: 2,
  });
});

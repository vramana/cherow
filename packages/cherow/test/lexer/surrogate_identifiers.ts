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

  pass('scans \'𐊧\'', {
      source: '𐊧',
      'value': '𐊧',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass('scans \'𐊧\'', {
      source: '𐊧',
      'value': '𐊧',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass('scans \'T‿\'', {
      source: 'T‿ ',
      value: 'T‿',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass('scans \'𐒦\'', {
      source: '𐒦',
      value: '𐒦',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 2,
  });

  pass('scans \'𫠝\'', {
      source: '𫠝',
      value: '𫠝',
      raw: '\'abc\'',
      token: Token.Identifier,
      line: 1,
      column: 2,
  });
/*
  function toHighSurrogate(code: number) {
    return (code >> 10) + (0xD800 - (0x10000 >> 10));
}

function toLowSurrogate(code: number) {
    return (code & ((1 << 10) - 1)) + 0xDC00;
}

// Is this an overkill, maybe???

// Run tests against all surrogate pairs
for (var i = 0x10000; i < 0x10ffff; ++i) {
    var high = toHighSurrogate(i);
    var low = toLowSurrogate(i);
    var str = String.fromCharCode(high, low);

    pass(`scans ${str}`, {
        source: `${str}`,
        value: `${str}`,
        raw: `"${str}"`,
        token: Token.Identifier,
        line: 1,
        column: `${str}`.length,
    });
  }
*/
});

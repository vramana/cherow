import * as t from 'assert';
import { next, scanIdentifierRest } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';
import { Token } from 'token';

describe('Lexer - Identifiers', () => {
  describe('Identifiers', () => {
    context('script', () => run(false));
    context('module', () => run(true));
  });

  function run(isModule: boolean) {
    interface Opts {
      source: string;
      value: any;
      hasNext: boolean;
      raw: string;
      token: Token;
      line: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const state = create(opts.source, undefined);
        const found = scanIdentifierRest(state, Context.OptionsRaw);
        t.deepEqual(
          {
            value: state.tokenValue,
            hasNext: state.index < state.length,
            token: found,
            raw: state.tokenRaw,
            line: state.line,
            column: state.column
          },
          {
            value: opts.value,
            hasNext: opts.hasNext,
            raw: opts.raw,
            token: opts.token,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    pass('scan \\u0070bc', {
      value: 'pbc',
      source: '\\u0070bc',
      hasNext: false,
      raw: '\\u0070bc',
      token: Token.Identifier,
      line: 1,
      column: 4
    });

    pass('scan \\u{000000000000000000070}bc', {
      value: 'pbc',
      source: '\\u{000000000000000000070}bc',
      hasNext: false,
      raw: '\\u{000000000000000000070}bc',
      token: Token.Identifier,
      line: 1,
      column: 4
    });

    pass('scan surrogate pair', {
      value: 'false',
      source: 'f\\u0061lse',
      hasNext: false,
      raw: 'f\\u0061lse',
      token: Token.EscapedKeyword,
      line: 1,
      column: 6
    });

    pass("scans 'c\\u006fntinue'", {
      source: 'c\\u006fntinue',
      value: 'continue',
      hasNext: false,
      raw: 'c\\u006fntinue',
      token: Token.EscapedKeyword,
      line: 1,
      column: 9
    });

    pass("scans 'e\\u0078port'", {
      source: 'e\\u0078port',
      hasNext: false,
      value: 'export',
      raw: 'e\\u0078port',
      token: Token.EscapedKeyword,
      line: 1,
      column: 7
    });

    // TODO: (Fkleuver) - Token.ts
    /*
    pass('scans \'\\u0065num\'', {
      source: '\\u0065num',
      value: 'enum',
      hasNext: false,
      raw: '\\u0065num',
      token: Token.EscapedKeyword,
      line: 1,
      column: 9,
  });
*/
    pass("scans 'd\\u0065fault'", {
      source: 'd\\u0065fault',
      value: 'default',
      hasNext: false,
      raw: 'd\\u0065fault',
      token: Token.EscapedKeyword,
      line: 1,
      column: 8
    });

    pass("scans 'yi\\u0065ld'", {
      source: 'yi\\u0065ld',
      value: 'yield',
      hasNext: false,
      raw: 'yi\\u0065ld',
      token: Token.EscapedStrictReserved,
      line: 1,
      column: 6
    });

    if (isModule) {
    }
  }
});

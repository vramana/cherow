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
      index: number;
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
            index: state.index,
            line: state.line,
            column: state.column
          },
          {
            value: opts.value,
            hasNext: opts.hasNext,
            raw: opts.raw,
            token: opts.token,
            index: opts.index,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan br\\u0065ak', {
      value: 'break',
      source: 'br\\u0065ak',
      hasNext: false,
      raw: 'br\\u0065ak',
      token: Token.EscapedKeyword,
      index: 10,
      line: 1,
      column: 6
    });

    pass('scan \\u0070bc', {
      value: 'interface',
      source: 'int\\u0065rface',
      hasNext: false,
      raw: 'int\\u0065rface',
      token: Token.EscapedStrictReserved,
      index: 14,
      line: 1,
      column: 10
    });

    pass('scan \\u0070bc', {
      value: 'package',
      source: 'p\\u0061ckage',
      hasNext: false,
      raw: 'p\\u0061ckage',
      token: Token.EscapedStrictReserved,
      index: 12,
      line: 1,
      column: 8
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    pass('scan \\u0070bc', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
      line: 1,
      column: 4
    });

    if (isModule) {
    }
  }
});

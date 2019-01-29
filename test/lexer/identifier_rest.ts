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

    function fail(name: string, source: string, context: Context) {
      it(name, () => {
        const state = create(source, undefined);
        t.throws(() => scanIdentifierRest(state, context));
      });
    }

    fail('fails on \\u003B;', '\\u003B;', Context.Empty);
    fail('fails on \\uD8.1', '\\uD8.1', Context.Empty);
    fail('fails on \\uD.01', '\\uD.01', Context.Empty);
    fail('fails on \\u', '\\u', Context.Empty);
    fail('fails on \\u0x11ffff', '\\u0x11ffff', Context.Empty);
    fail('fails on abc\\u', 'abc\\u', Context.Empty);
    fail('fails on \\u00Xvwxyz', '\\u00Xvwxyz', Context.Empty);
    fail('fails on \\u00', '\\u00', Context.Empty);
    fail('fails on \\u{}', '\\u{}', Context.Empty);
    fail('fails on \\u{10401', '\\u{10401', Context.Empty);
    fail('fails on a\\u', 'a\\u', Context.Empty);
    fail('fails on \\u0', 'a\\u0', Context.Empty);
    fail('fails on \\123\\uD800', '\\123\\uD800', Context.Empty);
    fail('fails on 123\\uDAAA', '123\\uDAAA', Context.Empty);

    pass('scan br\\u0065ak', {
      value: 'break',
      source: 'br\\u0065ak',
      hasNext: false,
      raw: 'br\\u0065ak',
      token: Token.EscapedKeyword,
      index: 10,
      line: 1,
      column: 10
    });

    pass('scan int\\u0065rface', {
      value: 'interface',
      source: 'int\\u0065rface',
      hasNext: false,
      raw: 'int\\u0065rface',
      token: Token.EscapedStrictReserved,
      index: 14,
      line: 1,
      column: 14
    });

    pass('scan p\\u0061ckage', {
      value: 'package',
      source: 'p\\u0061ckage',
      hasNext: false,
      raw: 'p\\u0061ckage',
      token: Token.EscapedStrictReserved,
      index: 12,
      line: 1,
      column: 12
    });

    pass('scan l\\u0065t', {
      value: 'let',
      source: 'l\\u0065t',
      hasNext: false,
      raw: 'l\\u0065t',
      token: Token.EscapedStrictReserved,
      index: 8,
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
      column: 8
    });

    pass('scan \\u{24}', {
      value: '$',
      source: '\\u{24}',
      hasNext: false,
      raw: '\\u{24}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{24}', {
      value: '$',
      source: '\\u{24}',
      hasNext: false,
      raw: '\\u{24}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{5F}', {
      value: '_',
      source: '\\u{5F}',
      hasNext: false,
      raw: '\\u{5F}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{61}', {
      value: 'a',
      source: '\\u{61}',
      hasNext: false,
      raw: '\\u{61}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{65}', {
      value: 'e',
      source: '\\u{65}',
      hasNext: false,
      raw: '\\u{65}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{7A}', {
      value: 'z',
      source: '\\u{7A}',
      hasNext: false,
      raw: '\\u{7A}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{5A}', {
      value: 'Z',
      source: '\\u{5A}',
      hasNext: false,
      raw: '\\u{5A}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{5A}', {
      value: 'Z',
      source: '\\u{5A}',
      hasNext: false,
      raw: '\\u{5A}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u0061', {
      value: 'a',
      source: '\\u0061',
      hasNext: false,
      raw: '\\u0061',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    pass('scan \\u{5A}', {
      value: 'Z',
      source: '\\u{5A}',
      hasNext: false,
      raw: '\\u{5A}',
      token: Token.Identifier,
      index: 6,
      line: 1,
      column: 6
    });

    if (isModule) {
    }
  }
});

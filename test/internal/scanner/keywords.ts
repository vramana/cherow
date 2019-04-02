import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

describe('lexer - Keywords', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const state = create(opts.source);
      const token = scanSingleToken(state, opts.ctx);
      t.deepEqual(
        {
          token,
          value: state.tokenValue,
          index: state.index
        },
        {
          token: opts.token,
          value: opts.value,
          index: opts.index
        }
      );
    });
  }

  pass('scan break keyword', {
    source: 'break',
    ctx: Context.OptionsNext,
    token: Token.BreakKeyword,
    value: 'break',
    raw: 'break',
    index: 5
  });

  pass('scan let keyword', {
    source: 'let',
    ctx: Context.OptionsNext,
    token: Token.LetKeyword,
    value: 'let',
    raw: 'let',
    index: 3
  });

  pass('scan break keyword', {
    source: 'public',
    ctx: Context.OptionsNext,
    token: Token.PublicKeyword,
    value: 'public',
    raw: 'public',
    index: 6
  });

  pass('scan interface keyword', {
    source: 'interface',
    ctx: Context.OptionsNext,
    token: Token.InterfaceKeyword,
    value: 'interface',
    raw: 'interface',
    index: 9
  });

  pass('scan enum keyword', {
    source: 'enum',
    ctx: Context.OptionsNext,
    token: Token.EnumKeyword,
    value: 'enum',
    raw: 'enum',
    index: 4
  });

  pass('scan yield keyword', {
    source: 'yield',
    ctx: Context.OptionsNext,
    token: Token.YieldKeyword,
    value: 'yield',
    raw: 'yield',
    index: 5
  });

  describe('lexer - Escaped keywords', () => {
    pass('scan escaped async keyword', {
      source: '\\u0061sync',
      ctx: Context.Strict,
      token: Token.EscapedKeyword,
      value: 'async',
      raw: 'async',
      index: 10
    });

    pass('scan escaped break keyword', {
      source: 't\\u0061rget',
      ctx: Context.OptionsNext,
      token: Token.Identifier,
      value: 'target',
      raw: 'target',
      index: 11
    });

    pass('scan escaped break keyword', {
      source: 'br\\u0065ak',
      ctx: Context.OptionsNext,
      token: Token.EscapedKeyword,
      value: 'break',
      raw: 'break',
      index: 10
    });

    pass('scan escaped break keyword', {
      source: 'int\\u0065rface',
      ctx: Context.Strict,
      token: Token.EscapedStrictReserved,
      value: 'interface',
      raw: 'interface',
      index: 14
    });
    pass('scan escaped break keyword', {
      source: 'int\\u0065rface',
      ctx: Context.Empty,
      token: Token.InterfaceKeyword,
      value: 'interface',
      raw: 'interface',
      index: 14
    });
  });
});

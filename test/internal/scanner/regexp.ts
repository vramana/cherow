import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

describe('lexer - identifiers', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const state = create(opts.source);
      const token = scanSingleToken(state, opts.ctx);
      t.deepEqual(
        {
          token,
          value: state.tokenValue,
          index: state.index,
          regExp: state.tokenRegExp
        },
        {
          token: opts.token,
          value: opts.value,
          index: opts.index,
          regExp: opts.regExp
        }
      );
    });
  }

  pass('scan regexp with IgnoreCase flag', {
    source: '/i/i',
    ctx: Context.AllowRegExp,
    token: Token.RegularExpression,
    value: /i/i,
    regExp: { flags: 'i', pattern: 'i' },
    raw: '\\u044D',
    newline: false,
    index: 4
  });

  pass('scan regexp with unicode flag', {
    source: '/kleuver/u',
    ctx: Context.AllowRegExp,
    token: Token.RegularExpression,
    value: /kleuver/u,
    regExp: { flags: 'u', pattern: 'kleuver' },
    raw: '\\u044D',
    newline: false,
    index: 10
  });

  pass('scan idescan regexp with multiple flags', {
    source: '/i/usimy',
    ctx: Context.AllowRegExp,
    token: Token.RegularExpression,
    value: /i/imsuy,
    regExp: { flags: 'usimy', pattern: 'i' },
    raw: '\\u044D',
    newline: false,
    index: 8
  });
});

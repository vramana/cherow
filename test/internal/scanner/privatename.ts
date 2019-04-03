import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

describe('lexer - privatename', () => {
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

  pass('scan identifier with backslash middle', {
    source: '#hello',
    ctx: Context.OptionsNext,
    token: Token.PrivateField,
    value: 'hello',
    raw: 't\\u0061rget',
    newline: false,
    index: 6
  });
});

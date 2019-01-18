import * as t from 'assert';
import { next } from '../../src/scanner';
import { create } from '../../src/state';
import { Context, pushToken } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - RegExp', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const state = create(opts.source, undefined, pushToken(Context.OptionsLoc, []));
      t.deepEqual(
        {
          token: next(state, Context.AllowPossibleRegEx),
          line: state.line,
          value: state.tokenValue,
          column: state.column,
          index: state.index
        },
        {
          token: Token.RegularExpression,
          line: opts.line,
          value: opts.value,
          column: opts.column,
          index: opts.index
        }
      );
    });
  }

  function fail(name: string, context: Context, opts: any) {
    it(name, () => {
      const state = create(opts.source, undefined, undefined);
      t.throws(() => {
        next(state, context);
      });
    });
  }

  pass('should scan simple regular expression', {
    source: '/f/',
    value: /f/,
    line: 1,
    column: 3,
    index: 3
  });

  pass('should scan simple regular expression', {
    source: '/[/]/',
    value: /[/]/,
    line: 1,
    column: 5,
    index: 5
  });
});

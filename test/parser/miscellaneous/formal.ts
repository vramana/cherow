import { Context } from '../../../src/common';
import { fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - Formal params', () => {
  describe('Failure', () => {
    for (const arg of [
      '{}',
      '[]',
      '[{}]',
      '{a}',
      'a, {b}',
      'a, b, {c, d, e}',
      'initializer = true',
      'a, b, c = 1',
      '...args',
      'a, b, ...rest',
      '[a, b, ...rest]',
      '{ bindingPattern = {} }',
      '{ initializedBindingPattern } = { initializedBindingPattern: true }'
    ]) {
      it(`var o = { m(${arg}) { 'use strict'; }`, () => {
        t.throws(() => {
          parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
        });
      });

      it(`var o = { m(${arg}) { 'use strict'; }`, () => {
        t.throws(() => {
          parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
        });
      });

      it(`var o = { m(${arg}) { 'use strict'; }`, () => {
        t.throws(() => {
          parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
        });
      });

      it(`var o = { m(${arg}) { 'use strict'; }`, () => {
        t.throws(() => {
          parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
        });
      });

      it(`var o = { m(${arg}) { 'use strict'; }`, () => {
        t.throws(() => {
          parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
        });
      });

      it(`var a = (${arg}) => { 'use strict'; }`, () => {
        t.throws(() => {
          parseSource(`var a = (${arg}) => { 'use strict'; }`, undefined, Context.Empty);
        });
      });

      it(`'use strict'; function f(${arg}) { 'use strict'; }`, () => {
        t.throws(() => {
          parseSource(`'use strict'; function f(${arg}) { 'use strict'; }`, undefined, Context.Empty);
        });
      });
    }
  });

  for (const arg of [
    '{}',
    '[]',
    '[{}]',
    '{a}',
    'a, {b}',
    'a, b, {c, d, e}',
    'initializer = true',
    'a, b, c = 1',
    '...args',
    'a, b, ...rest',
    '[a, b, ...rest]',
    '{ bindingPattern = {} }',
    '{ initializedBindingPattern } = { initializedBindingPattern: true }'
  ]) {
    it(`var o = { m(${arg}) { 'use strict'; }`, () => {
      t.throws(() => {
        parseSource(`var o = { m(${arg}) { 'use strict'; }`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; function f(${arg}) { 'use strict'; }`, () => {
      t.throws(() => {
        parseSource(`'use strict'; function f(${arg}) { 'use strict'; }`, undefined, Context.Empty);
      });
    });
  }
});

import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Async arrows', () => {

  describe('Failure', () => {
    const invalidSyntax = [
      '"use strict"; async(x = await) => {  }',
      'async() => { (a = await/r/g) => {} };',
      'async(a = (...await) => {}) => {};',
      'async(...a, b) => b',
      '\'use strict\'; async yield => X',
      '\'use strict\'; async (yield) => X',
      'var asyncFn = async () => var await = \'test\';',
      'async(...a = b) => b',
      'async (...x = []) => {}',
      'async(...a = b) => b',
    ];

    for (const arg of invalidSyntax) {

        it(`${arg}`, () => {
            t.throws(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    const invalidYieldInArrowParamList = [
      '{x=(yield)}',
      '[x=(yield)]',
      'x=f(yield)',
      'x, y=f(yield)',
      '{x=f(yield)}',
      '[x=f(yield)]',
      '{x}=yield',
      '[x]=yield',
    ];

    for (const arg of invalidYieldInArrowParamList) {

      it(`(function *g(z = ( async ${arg} ) => {}) { });`, () => {
        t.throws(() => {
            parse(`(function *g(z = ( async ${arg} ) => {}) { });`, undefined, Context.Empty);
        });
    });
    }
  });

  describe('Pass', () => {

      const validSyntax = [
        'async () => {}',
        'async () => { return 42 }',
        'async x => { return x; }',
        'async (x) => { return x; }',
        'async (x, y) => { return x + y; }',
        'async (x, y, z) => { return x + y + z; }',
        'async (x, y) => { x.a = y; }',
        '(a, async promise => await promise)',
        'async(a = (await) => {}) => {};',
        'async () => 42',
        'async(yield) => b',
        'async ({a = b}) => a',
        'async a => a',
        'async function foo(a = async () => await b) {}',
        '({async: 1})',
        'async yield => 1',
        'f(a, async (b, c) => await [b, c], d)',
        'f(a, async (b, c) => await [b, c], d)',
        'async()',
      ];

      for (const arg of validSyntax) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parse(`${arg}`, undefined, Context.Empty);
              });
          });
      }
  });
});

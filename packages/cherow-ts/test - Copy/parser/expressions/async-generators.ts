import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Async function', () => {

  describe('Failure', () => {
    const invalidSyntax = [
      '(async function*([...x, y] = [1, 2, 3]) {})',
      '(async function* h([...{ x } = []]) {})',
      '(async function* h([...{ x } = []] = []) {})',
      '(async function*(x = await 1) { });',
      '(async function*() { await: 1; });',
      '(async function *foo(...a,) {})',
      '(async function *foo([...[ x ] = []])',
      '(async function *foo([...{ x } = []]) {})',
      '(async function *foo([...{ x } = []] = []) {})',
    ];

    for (const arg of invalidSyntax) {

        it(`${arg}`, () => {
            t.throws(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }
  });

  describe('Pass', () => {

      const validSyntax = [
        '(async function* h([[,] = g()]) { })',
        '(async function* g([[x]]): boolean | string | number | false | true  { })',
        '(async function* h([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }]) { })',
        '(async function* h([fn = function () {}, xFn = function x() {}]) { })',
        '(async function* h([{ x, y, z } = { x: 44, y: 55, z: 66 }]) { })',
        '(async function* h([]: string[]) { })',
        'async function *foo<T, U>(first: T, second: U): T & U { }',
        '(async function*({ x: string, }): cherow_ts { })',
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

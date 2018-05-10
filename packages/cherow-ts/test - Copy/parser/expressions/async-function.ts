import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Async function', () => {

  describe('Failure', () => {
    const invalidSyntax = [
      '(async function () { var await; });',
      '(async function () { void await; });',
      '(async function () { await: ; });',
      'var f = async() => ((async(x = await 1) => x)();',
      'class C { async constructor() {} }',
      'class C {}; class C2 extends C { async constructor() {} }',
      '(async[\'foo14\'] => 1)',
      '(async[\'foo15\'] foo16 => 1)',
      '(async[\'foo17\'] () => 1)',
      '(async()[\'foo18\'] => 1)',
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
        '(async function foo() { }.prototype)',
        '(function f() { ({ async [yield]() {} }); })',
        'async function foo(a = class {async bar(a: string): any { await b }}) {}',
        'async function foo(a: number, b: boolean): boolean | string | number { await a }',
        'async function *extend<T, U>(first: T, second: U): T & U { }',
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

import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Arrows', () => {

  describe('Failure', () => {
    const invalidSyntax = [
      '"use strict"; let => 1',
            '"use strict"; (enum => 1)',
            '"use strict"; (eval => 1)',
            '"use strict"; (arguments => 1)',
            '"use strict"; (package => 1)',
            '(if) => {}',
            '(a, if) => {}',
            'a + b => {}',
            '(a + b) => {}',
            '(c, a[\'b\']) => {}',
            '(...a = b) => b',
            '(...rest - a) => b',
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

      it(`(function *g(z = ( ${arg} ) => {}) { });`, () => {
        t.throws(() => {
            parse(`(function *g(z = ( ${arg} ) => {}) { });`, undefined, Context.Empty);
        });
    });
    }
  });

  describe('Pass', () => {

      const validSyntax = [
        '(() => {}) + 2',
        'new (() => {});',
        'bar ? ( (x) => x ) : baz;',
        'bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;',
        'bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;',
        '() => 0 + 1',
        '(a,b) => 0 + 1',
        `(a,b,...c) => 0 + 1`,
        '() => (a) = 0',
        'var x = (a,...b) =>{}',
        'foo((x, y) => {});',
        'e => { 42; };',
        'e => ({ property: 42 });',
        'let Y = F => (x=>F(y=>(x(x))(y)))(x=>F(y=>(x(x))(y)))',
        'factorial = x =>  x < 1 ? 1 : x * factorial(x-1)',
        'a => (a + 1)',
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

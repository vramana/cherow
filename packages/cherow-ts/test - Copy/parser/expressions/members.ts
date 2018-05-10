import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Members', () => {

  describe('Failure', () => {
    const invalidSyntax = [
      '-x ** y',
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
        'a[b, c]',
        '(a[b]||(c[d]=e))',
        'a&&(b=c)&&(d=e)'
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

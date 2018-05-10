import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Array', () => {

  describe('Failure', () => {});

  describe('Pass', () => {

      const validSyntax = [
          '[1 <= 0]',
          '[...{a}] = b;',
          '[...{a}] = b;',
          '[a, ...{0: b}] = 1',
          '[1, "z", "a", "Symbol(foo)"]',
          'var array = [,,,,,];',
          '[{...null}]',
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

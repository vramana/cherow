import * as t from 'assert';
import { pass } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - Const', () => {

  describe('Failure', () => {

    const invalidSyntax = [
      `do const x = 1; while (false)`,
      'while (false) const x = 1;',
      'label: const x;',
      'while (false) const x;',
      'const [...x = []] = [];',
      'const [...{ x }, y] = [1, 2, 3];',
      'const [...x, y] = [1, 2, 3];',
      // Babylon PR: https://github.com/babel/babylon/pull/195
      'const { foo: enum } = bar();',
      'function foo({ bar: enum }) {}',

      'const x',
      'if (true) {} else const x;',
      'if (true) {} else const x = 1;',
      'const x, y = 1;',
      'do const x = 1; while (false)',
      'function foo({ bar: enum }) {}',
  ];

    for (const arg of invalidSyntax) {
      it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });

      it(`${arg}`, () => {
        t.throws(() => {
            parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
        });
    });
  }
});

    const validSyntax = [
        'const a = Infinity;',
        'const b = -Infinity;',
        'const c = +Infinity;',
        'const c = foo;',
        'const d = /abc/;',
        'const e = /abc/g;',
        'const f = /abc/gi;',
        'const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];',
        '{ const x = 42 }',
        '{ const x = 14, y = 3, z = 1977 }',
        'const z = 4; { const z = 5; }',
        'const [gen = function* () {}, foo = function* x() {}] = [];',
        'const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];',
        'const [{ x }] = [null];',
        'const [...x] = [1, 2, 3];',
        'const {} = obj;',
        'const { x: y = 33 } = { };',
        'const fn = function() {};',
        'const x = x + 1;',
        'const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };',
    ];

      for (const arg of validSyntax) {
        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });

        it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
          });
      });
    }
});

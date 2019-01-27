import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Spread', () => {
  const invalidSyntax = [
    '(...[1, 2, 3])',
    'return ...[1,2,3];',
    'var ...x = [1,2,3];',
    'var [...x,] = [1,2,3];',
    'var [...x, y] = [1,2,3];',
    'var { x } = {x: ...[1,2,3]}',
    '[...]',
    '[a, ...]',
    '[..., ]',
    '[..., ...]',
    '[ (...a)]',
    // Two spreads combined is a syntax error
    'var a = []; [......a];',
    'function foo(){};var a = []; foo(......a);'
  ];
  for (const arg of invalidSyntax) {
    it(`function fn() { 'use strict';} fn(${arg});`, () => {
      t.throws(() => {
        parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`function fn() {} fn(${arg});`, () => {
      t.throws(() => {
        parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
      });
    });
  }
});

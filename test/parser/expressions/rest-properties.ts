import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Spread properties', () => {
  describe('Failure', () => {
    const invalidSyntax = ['({...})'];
    for (const arg of invalidSyntax) {
      it(`${arg}`, () => {
        t.throws(() => {
          parseSource(`${arg}`, undefined, Context.Empty);
        });
      });
    }
  });

  describe('Pass', () => {
    const validSyntax = [
      '({...obj})',
      '({...obj1,})',
      '({...obj1,...obj2})',
      '({a,...obj1,b:1,...obj2,c:2})',
      '({...(obj)})',
      '({...a,b,c})',
      '({...(a,b),c})',
      'let aa = { x: 1, y: 2, ...a };',
      'let xyab = { x: 1, ...a, y: 2, ...b, ...a };',
      'let x = { ...y, get z() {} };',
      'x = { ...y, z: 1};',
      'x = { ...y }',
      'x = { ...y, ...{ get z() {} } };',
      'x = { ...undefined, ...null };'
    ];
    for (const arg of validSyntax) {
      it(`${arg}`, () => {
        t.doesNotThrow(() => {
          parseSource(`${arg}`, undefined, Context.Empty);
        });
      });
    }
  });
});

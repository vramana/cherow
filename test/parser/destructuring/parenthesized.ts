import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Destructuring - Parenthesized', () => {
  for (const arg of [
    'var {(a)} = 0',
    'var {a:(b)} = 0',
    '({(a)} = 0)',
    '({a:(b = 0)} = 1)',
    '(new.target) = 1',
    '([a += a] = a)',
    '(`a`) => b;',
    '({ x }) = { x: 5 };',
    '({a}) = 1;',
    '(var {a:b} = {})',
    '({start, stop}) = othernode;',
    '{a, b} = {a: 1, b: 2}',
    '({a, b}) = {a: 1, b:2};',
    '({b}) = b;',
    '([b]) = b;',
    '({a}) = 2;',
    '([b]) = b;',
    'var [(a)] = 0',
    '[(a = 0)] = 1',
    '([{constructor(){}}] = b);',
    '({ src: ([dest]) } = obj)'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of [
    '[(a)] = 0',
    '[(a) = 0] = 1',
    '[(a.b)] = 0',
    '({a:(b)} = 0)',
    '({a:(b) = 0} = 1)',
    '({a:(b.c)} = 0)',
    '({a:(b = 0)})'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
});

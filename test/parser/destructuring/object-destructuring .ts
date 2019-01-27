import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Destructuring - Assignment', () => {
  const validSyntax = [
    'let a; ({a:((((a1))))} = {a:20})',
    'let a, r1; ({a:a1 = r1 = 44} = {})',
    'let a, r1; ({a:a1 = r1} = {})',
    'var a; [a = class aClass {}] = []',
    'let [...{a}] = [{}];',
    'let a; [...{a}] = [{}];',
    'let a; [...[a = 1]] = [[]];',
    'let obj = {x:1}; [...obj.x] = [10];',
    "let obj = {x:1}; [...obj['x']] = [10];",
    'function foo() { return {x:1}; }; [...foo().x] = [10];',
    'let [...[...[...a]]] = [[[]]];',
    "var foo = 'x'; var {[bar]:x1} = {}",
    "var foo = 'x'; var x1; ({[bar]:x1} = {})",
    "var foo = 'x'; var {[bar + 'foo']:x1} = {}",
    "var foo = 'x'; var x1; ({[bar +'foo']:x1} = {})",
    "class foo { method() { ({x:super['x']} = {}); } }",
    'function foo() { return {}; }; ({x:foo().x} = {});',
    "function foo() { return {}; }; ({x:foo()['x']} = {});",
    'var z, y; ({x:z = 1, x1:y = 20} = {});',
    'var x, y; ({x, x1:y = 20} = {});',
    'var {x, x1:y = 20} = {};',
    'var {x:z = 1, x1:y = 20} = {};',
    '({x:y} = {});',
    'var {x} = {};',
    'var {x} = {}, {y} = {};',
    'var foo = { x = 10 } = {};',
    'var foo = { q } = { x = 10 } = {};',
    'var foo; foo = { x = 10 } = {};',
    'var foo; foo = { q } = { x = 10 } = {};',
    'var x; ({ x = 10 } = {});',
    'var q, x; ({ q } = { x = 10 } = {});',
    'var x; [{ x = 10 } = {}]',
    'var x; (true ? { x = true } = {} : { x = false } = {})',
    'var q, x; (q, { x = 10 } = {});',
    'var { x = 10 } = { x = 20 } = {};',
    'var { __proto__: x, __proto__: y } = {}',
    '({ __proto__: x, __proto__: y } = {})',
    'var { x = 10 } = (o = { x = 20 } = {});',
    'var x; (({ x = 10 } = { x = 20 } = {}) => x)({})',
    // Object destructuring with shorthand initializer
    '({x = 1} = {});',
    '({x, y = 1, z = 2} = {});',
    'var a = 1; ({x = {a = 1} = {}} = {});',
    '[{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];',
    'var [{x : [{y:{z = 1}, z1 = 2}] }, {x2 = 3}, {x3 : {y3:[{z3 = 4}]}} ] = [{x:[{y:{}}]}, {}, {x3:{y3:[{}]}}];'
  ];

  for (const arg of validSyntax) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
});

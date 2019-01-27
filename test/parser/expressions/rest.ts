import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Rest', () => {
  for (const arg of [
    'function foo(...a, ...b) {}',
    'function foo(a, ...b, c) => {}',
    'var obj = class { method(a, b = 1, ...c = [2,3]) {} };',
    "function f(...a) { 'use strict'; }",
    "function f(a, ...b) { 'use strict'; }",
    // Arrow function
    '(a = ...NaN, b = [...[1,2,3]], ...rest) => {};',
    '(a = (...NaN), ...b = [...[1,2,3]], rest) => {};',
    '(a = [...NaN], ...b = [...[1,2,3]], rest) => {};',
    '(a, ...b, ...rest) => {};',
    '(...rest = ...NaN) => {};',
    'var x = { set setter(...x) {} }',
    'var x = class { set setter(...x) {} }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
      });
    });
  }

  for (const arg of [
    'a, ...args, b',
    '...args,   b',
    'a, ...args,   b',
    '...args,\tb',
    'a,...args\t,b',
    '...args\r\n, b',
    'a, ... args,\r\nb',
    '...args\r,b',
    'a, ... args,\rb',
    '...args\t\n\t\t\n,  b',
    'a, ... args,  \n  \n  b'
  ]) {
    it(`function foo(${arg}){ return args;}(1, [], /regexp/, 'str', function(){});`, () => {
      t.throws(() => {
        parseSource(`function foo(${arg}){ return args;}`, undefined, Context.OptionsNext | Context.Module);
      });
    });
  }

  fail('Expressions - New', [
    ['var obj = class { method(a, b = 1, ...c = [2,3]) {} };', Context.Empty],
    ['function f(...a) { "use strict"; }', Context.Empty],
    ['x = { set f(...y) {} }', Context.Empty],
    [`function f(a, ...b, c);`, Context.Empty],
    [`function f(a, ...b = 0);`, Context.Empty],
    ['0, function(...a,) { };', Context.Empty],
    // Esprima issue: https://github.com/jquery/esprima/issues/1800
    ['[a, ...(b = c)] = 0', Context.Empty],
    ['function f(a, ...b, c) {}', Context.Empty]
  ]);

  const validSyntax = [
    'a, ...args',
    '...   args',
    'a, ...   args',
    '...\targs',
    'a, ...\targs',
    '...\r\nargs',
    'a, ...\r\nargs',
    '...\rargs',
    'a, ...\rargs',
    '...\t\n\t\t\n  args',
    'a, ...  \n  \n  args',
    '...{ length, 0: a, 1: b}',
    '...{}',
    '...[a, b]',
    '...[]',
    '...[...[a, b, ...c]]',
    '...eval',
    'eval, ...args',
    '...arguments',
    'arguments, ...args'
  ];
  for (const arg of validSyntax) {
    it(`function foo(${arg}){ return args;}(1, [], /regexp/, 'str', function(){});`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo(${arg}){ return args;}`, undefined, Context.OptionsNext | Context.Module);
      });
    });
  }
});

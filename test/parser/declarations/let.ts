import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Declarations - Let', () => {
  fail('Declarations - Let (fail)', [
    // Bindings

    ['const a = b, a = c', Context.OptionsDisableWebCompat],
    ['const a = b; const a = c', Context.OptionsDisableWebCompat],
    ['let a = b; const a = c', Context.OptionsDisableWebCompat],
    ['const a = b; let a = c', Context.OptionsDisableWebCompat],
    ['var x = a; let x = b;', Context.OptionsDisableWebCompat],
    ['var x = a; const x = b;', Context.OptionsDisableWebCompat],
    ['let x = a; let x = b;', Context.OptionsDisableWebCompat],
    ['let x = a; const x = b;', Context.OptionsDisableWebCompat],
    ['var x; let x;', Context.OptionsDisableWebCompat],
    ['let x; var x;', Context.OptionsDisableWebCompat],
    ['let x; { var x; }', Context.OptionsDisableWebCompat],
    ['let x; {var x}', Context.OptionsDisableWebCompat],
    ['{ let f; let f; }', Context.OptionsDisableWebCompat],
    ['{ let f; function f() {} }', Context.OptionsDisableWebCompat],
    ['{ let f; const f = b; }', Context.OptionsDisableWebCompat],

    // Bindings - Blockstatement

    ['let x; { var x; var y; }', Context.OptionsDisableWebCompat],
    ['let x; { var x; }', Context.OptionsDisableWebCompat],
    ['let let = 1', Context.OptionsDisableWebCompat],
    ['let [foo];', Context.OptionsDisableWebCompat],
    ['let [foo = x];', Context.OptionsDisableWebCompat],
    ['let [foo], bar;', Context.OptionsDisableWebCompat],
    ['let foo, [bar];', Context.OptionsDisableWebCompat],
    ['let [foo:bar] = obj;', Context.OptionsDisableWebCompat],
    ['let [({x: 1})] = [];', Context.OptionsDisableWebCompat],
    ['let [(x)] = [];"', Context.OptionsDisableWebCompat],
    ['let [({x: 1}) = y] = [];', Context.OptionsDisableWebCompat],
    ['let [(x) = y] = [];', Context.OptionsDisableWebCompat],
    ['var [({x: 1})] = [];', Context.OptionsDisableWebCompat],
    ['var [(x)] = [];', Context.OptionsDisableWebCompat],
    ['var [({x: 1}) = y] = [];', Context.OptionsDisableWebCompat],
    ['var [(x) = y] = [];', Context.OptionsDisableWebCompat],
    ['let {a: a} of []', Context.OptionsDisableWebCompat],
    ['let {[Symbol.iterator]: a} of []', Context.OptionsDisableWebCompat],
    ['(let {"a": a = 1} of [])', Context.OptionsDisableWebCompat],
    ['let {0: a = 1} of []', Context.OptionsDisableWebCompat],
    ['const [a] of []', Context.OptionsDisableWebCompat],
    ['const {0: a} of []', Context.OptionsDisableWebCompat],
    ['const {a: a = 1} of []', Context.OptionsDisableWebCompat],
    ['a: let a', Context.OptionsDisableWebCompat],
    ['const const;', Context.OptionsDisableWebCompat],
    ['for (const let = 1;;;) {}', Context.OptionsDisableWebCompat],
    ['for (let let;;;) {}', Context.OptionsDisableWebCompat],
    ['for (let [let];;;) {}', Context.OptionsDisableWebCompat],
    ['for (let x, y, z, let = 1;;;) {}', Context.OptionsDisableWebCompat],
    ['for (let [let];;;) {}', Context.OptionsDisableWebCompat],
    ['for (let x = 0 in y){}', Context.OptionsDisableWebCompat],
    ['"use strict"; const const = 1;', Context.OptionsDisableWebCompat],
    ['let x,;', Context.OptionsDisableWebCompat],
    ['"use strict"; const let = 1;', Context.OptionsDisableWebCompat],
    ['const x = 0,', Context.OptionsDisableWebCompat],
    [
      `const x = 0,
    y = 1,`,
      Context.OptionsDisableWebCompat
    ],
    ['let [... ...foo] = obj;', Context.OptionsDisableWebCompat],
    ['let [...] = obj;', Context.OptionsDisableWebCompat],
    ['let [.x] = obj; ', Context.OptionsDisableWebCompat],
    ['let [..x] = obj;', Context.OptionsDisableWebCompat],
    ['let [foo];', Context.OptionsDisableWebCompat],
    ['let [foo=a];', Context.OptionsDisableWebCompat],
    ['let [foo], bar;', Context.OptionsDisableWebCompat],
    ['let foo, [bar]; ', Context.OptionsDisableWebCompat],
    ['let {,} = x;', Context.OptionsDisableWebCompat],
    ['let {,,} = x; ', Context.OptionsDisableWebCompat],
    ['let {,,foo} = x;', Context.OptionsDisableWebCompat],
    ['let {foo,,bar} = x;', Context.OptionsDisableWebCompat],
    ['let\nfoo()', Context.OptionsDisableWebCompat],
    ['let [...foo, bar] = obj;', Context.OptionsDisableWebCompat],
    ['let [...foo,] = obj;', Context.OptionsDisableWebCompat],
    ['let [...foo,,] = obj;', Context.OptionsDisableWebCompat],
    ['let [...[foo, bar],] = obj;', Context.OptionsDisableWebCompat],
    ['let [...[foo, bar],,] = obj;', Context.OptionsDisableWebCompat],
    ['let [...bar = foo] = obj;', Context.OptionsDisableWebCompat],
    ['let [... ...foo] = obj;', Context.OptionsDisableWebCompat],
    ['let [...] = obj;', Context.OptionsDisableWebCompat],
    ['let [.x] = obj;', Context.OptionsDisableWebCompat],
    ['let [..x] = obj;', Context.OptionsDisableWebCompat],
    ['let {,} = obj;', Context.OptionsDisableWebCompat],
    ['let {,,} = obj;', Context.OptionsDisableWebCompat],
    ['let {x,,} = obj;', Context.OptionsDisableWebCompat],
    ['let {,x} = obj;', Context.OptionsDisableWebCompat],
    ['let {,,x} = obj;', Context.OptionsDisableWebCompat],
    ['let {x,, y} = obj;', Context.OptionsDisableWebCompat],
    ['let {x};', Context.OptionsDisableWebCompat],
    ['let {x}, {y} = z;', Context.OptionsDisableWebCompat],
    ['let x, {y};', Context.OptionsDisableWebCompat],
    ['let {x}, y;', Context.OptionsDisableWebCompat],
    ['let x = y, {z};', Context.OptionsDisableWebCompat],
    ['let {x:y};', Context.OptionsDisableWebCompat],
    ['let {x=y};', Context.OptionsDisableWebCompat],
    ['let {x:y=z};', Context.OptionsDisableWebCompat],
    ['let {x:y=z} = obj, {a:b=c};', Context.OptionsDisableWebCompat],
    ['let {x:y=z}, {a:b=c} = obj;', Context.OptionsDisableWebCompat],
    ['let {a:=c} = z;', Context.OptionsDisableWebCompat],
    ['let {[x]} = z;', Context.OptionsDisableWebCompat],
    ['let {[x]};', Context.OptionsDisableWebCompat],
    ['let {[x]: y};', Context.OptionsDisableWebCompat],
    ['let {[x] = y} = z;', Context.OptionsDisableWebCompat],
    ['let {[x]: y = z};', Context.OptionsDisableWebCompat],
    ['for (let\nfoo();;);', Context.OptionsDisableWebCompat],
    ['for (let foo);', Context.OptionsDisableWebCompat],
    ['for (let foo, bar);', Context.OptionsDisableWebCompat],
    ['for (let foo = bar);', Context.OptionsDisableWebCompat],
    ['for (let foo = bar, zoo = boo);', Context.OptionsDisableWebCompat],
    ['for (let\nfoo);', Context.OptionsDisableWebCompat],
    ['for (let\nfoo());', Context.OptionsDisableWebCompat],
    ['for (let foo, bar in x);', Context.OptionsDisableWebCompat],
    ['for (let foo = bar in x);', Context.OptionsDisableWebCompat],
    ['for (let foo = bar, zoo = boo in x);', Context.OptionsDisableWebCompat],
    ['for (let\nfoo() in x);', Context.OptionsDisableWebCompat],
    ['for (let foo, bar of x);', Context.OptionsDisableWebCompat],
    ['for (let foo = bar of x);', Context.OptionsDisableWebCompat],
    ['for (let\nfoo() of x);', Context.OptionsDisableWebCompat],
    ['for (let [foo];;);', Context.OptionsDisableWebCompat],
    ['for (let [foo = x];;);', Context.OptionsDisableWebCompat],
    ['for (let [foo], bar;;);', Context.OptionsDisableWebCompat],
    ['for (let foo, [bar];;);', Context.OptionsDisableWebCompat],
    ['for (let [...foo, bar] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,,] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],,] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [...bar = foo] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [... ...foo] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [...] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [.x] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let [..x] = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let {,} = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let {,,} = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let {x,,} = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let {x,, y} = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let {x};;);', Context.OptionsDisableWebCompat],
    ['for (let {x}, {y} = z;;);', Context.OptionsDisableWebCompat],
    ['for (let x, {y};;);', Context.OptionsDisableWebCompat],
    ['for (let {x}, y;;);', Context.OptionsDisableWebCompat],
    ['for (let x = y, {z};;);', Context.OptionsDisableWebCompat],
    ['for (let {x=y};;);', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z};;);', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z} = obj, {a:b=c};;);', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z}, {a:b=c} = obj;;);', Context.OptionsDisableWebCompat],
    ['for (let {a:=c} = z;;);', Context.OptionsDisableWebCompat],
    ['for (let {[x]} = z;;);', Context.OptionsDisableWebCompat],
    ['for (let {[x]};;);', Context.OptionsDisableWebCompat],
    ['for (let {[x] = y} = z;;);', Context.OptionsDisableWebCompat],
    ['for (let {[x]: y = z};;);', Context.OptionsDisableWebCompat],
    ['for (let [] = x);', Context.OptionsDisableWebCompat],
    ['for (let [,] = x);', Context.OptionsDisableWebCompat],
    ['for (let [,,] = x);', Context.OptionsDisableWebCompat],
    ['for (let [foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo,] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo,,] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [,foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [,,foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo,,bar] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo] = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (let [foo] = arr, bar);', Context.OptionsDisableWebCompat],
    ['for (let foo, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (let foo = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (let [foo, bar=b] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo=a, bar=b] = arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo]);', Context.OptionsDisableWebCompat],
    ['for (let [foo], bar);', Context.OptionsDisableWebCompat],
    ['for (let foo, [bar]);', Context.OptionsDisableWebCompat],
    ['for (let [...foo] = obj);', Context.OptionsDisableWebCompat],
    ['for (let [foo, ...bar] = obj);', Context.OptionsDisableWebCompat],
    ['for (let [...foo, bar] = obj);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,] = obj);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,,] = obj);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],] = obj);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],,] = obj);', Context.OptionsDisableWebCompat],
    ['let [...bar = foo] = obj;', Context.OptionsDisableWebCompat],
    ['let [... ...foo] = obj;', Context.OptionsDisableWebCompat],
    ['let [...] = obj;', Context.OptionsDisableWebCompat],
    ['let [.x] = obj;', Context.OptionsDisableWebCompat],
    ['let [..x] = obj;', Context.OptionsDisableWebCompat],
    ['for (let {} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {,} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {,x} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {,,x} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x, y} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x,, y} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, {y} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, y = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, obj);', Context.OptionsDisableWebCompat],
    ['for (let {x = y} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x = y, z} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x, y = z} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x = y, z = a} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x : y} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x : y, z} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x : y, z : a} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x : y = z} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {x : y, z, a : b = c} = obj)', Context.OptionsDisableWebCompat],
    ['for (let {x}, {y} = z);', Context.OptionsDisableWebCompat],
    ['for (let x, {y});', Context.OptionsDisableWebCompat],
    ['for (let {x});', Context.OptionsDisableWebCompat],
    ['for (let {x}, y);', Context.OptionsDisableWebCompat],
    ['for (let x = y, {z});', Context.OptionsDisableWebCompat],
    ['for (let {x}, y);', Context.OptionsDisableWebCompat],
    ['for (let {x:y});', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z} = obj, {a:b=c});', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z});', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z}, {a:b=c} = obj);', Context.OptionsDisableWebCompat],
    ['for (let {a:=c} = z);', Context.OptionsDisableWebCompat],
    ['for (let {[x]: y} = z);', Context.OptionsDisableWebCompat],
    ['for (let {[x]: y});', Context.OptionsDisableWebCompat],
    ['for (let {[x] = y} = z);', Context.OptionsDisableWebCompat],
    ['for (let {[x]: y = z});', Context.OptionsDisableWebCompat],
    ['for (let {[x]: y = z} = a);', Context.OptionsDisableWebCompat],
    ['for (let {a, [x]: y} = a);', Context.OptionsDisableWebCompat],
    ['for (let [foo] = arr, [bar] in arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo], bar in arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo] = arr, bar in arr);', Context.OptionsDisableWebCompat],
    ['for (let foo, [bar] in arr);', Context.OptionsDisableWebCompat],
    ['for (let foo = arr, [bar] in arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo = x]);', Context.OptionsDisableWebCompat],
    ['for (let foo, [bar]);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,] in obj);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,,] in obj);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],,] in obj);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],] in obj);', Context.OptionsDisableWebCompat],
    ['for (let [...] in obj);', Context.OptionsDisableWebCompat],
    ['for (let [... ...foo] in obj);', Context.OptionsDisableWebCompat],
    ['for (let [.x] in obj);', Context.OptionsDisableWebCompat],
    ['for (let [..x] in obj);', Context.OptionsDisableWebCompat],
    ['for (let {,} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {,,} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {,x} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {,,x} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {x,, y} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, {y} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, y in obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, obj in obj2);', Context.OptionsDisableWebCompat],
    ['for (let x = a, {y} in obj);', Context.OptionsDisableWebCompat],
    ['for (let x, {y} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {x}, {y} in z);', Context.OptionsDisableWebCompat],
    ['for (let x, {y});', Context.OptionsDisableWebCompat],
    ['for (let {x}, y);', Context.OptionsDisableWebCompat],
    ['for (let x = y, {z});', Context.OptionsDisableWebCompat],
    ['for (let {x}, y);', Context.OptionsDisableWebCompat],
    ['for (let {x:y});', Context.OptionsDisableWebCompat],
    ['for (let {x=y});', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z});', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z} = obj, {a:b=c});', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z}, {a:b=c} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {a:=c} in z);', Context.OptionsDisableWebCompat],
    ['for (let {[x]} in obj);', Context.OptionsDisableWebCompat],
    ['for (let {[x] = y} in obj);', Context.OptionsDisableWebCompat],
    ['for (let [foo], bar of arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo] = arr, bar of arr);', Context.OptionsDisableWebCompat],
    ['for (let foo, [bar] of arr);', Context.OptionsDisableWebCompat],
    ['for (let [foo = x]);', Context.OptionsDisableWebCompat],
    ['for (let [foo], bar);', Context.OptionsDisableWebCompat],
    ['for (let foo, [bar]);', Context.OptionsDisableWebCompat],
    ['for (let [...foo, bar] of obj);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,] of obj);', Context.OptionsDisableWebCompat],
    ['for (let [...foo,,] of obj);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],] of obj);', Context.OptionsDisableWebCompat],
    ['for (let [...[foo, bar],,] of obj);', Context.OptionsDisableWebCompat],
    ['for (let [.x] of obj);', Context.OptionsDisableWebCompat],
    ['for (let [... ...foo] of obj);', Context.OptionsDisableWebCompat],
    ['for (let {,} of obj);', Context.OptionsDisableWebCompat],
    ['for (let {,,} of obj);', Context.OptionsDisableWebCompat],
    ['for (let {,x} of obj);', Context.OptionsDisableWebCompat],
    ['for (let {,,x} of obj);', Context.OptionsDisableWebCompat],
    ['for (let {x,, y} of obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, {y} of obj);', Context.OptionsDisableWebCompat],
    ['for (let {x} = a, obj of obj2);', Context.OptionsDisableWebCompat],
    ['for (let {x});', Context.OptionsDisableWebCompat],
    ['for (let {x}, {y} of z);', Context.OptionsDisableWebCompat],
    ['for (let x, {y});', Context.OptionsDisableWebCompat],
    ['for (let {x=y});', Context.OptionsDisableWebCompat],
    ['for (let {x:y=z});', Context.OptionsDisableWebCompat],
    ['for (let {[x] = y} of obj);', Context.OptionsDisableWebCompat],
    ['class x { foo() { let[foo]; }}', Context.OptionsDisableWebCompat],
    ['_ => { let[foo]; }', Context.OptionsDisableWebCompat],
    ['let\n{foo};', Context.OptionsDisableWebCompat],
    ['function f(){ let\n{foo}; }', Context.OptionsDisableWebCompat],
    ['_ => let {foo};', Context.OptionsDisableWebCompat],
    ['_ => { let\n{foo}; }', Context.OptionsDisableWebCompat],
    ['class x { foo() { let\n{foo}; }}', Context.OptionsDisableWebCompat],
    ['if (true) let x = 1;', Context.OptionsDisableWebCompat]
  ]);

  for (const arg of [
    'let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: "" };',
    'let { fn = function () {}, xFn = function x() {} } = {};',
    'switch (true) { case true: let x = 1; }',
    `let a = [];
    for (let i = 0; i < 5; a.push(function () { return i; }), ++i) { }
    for (let k = 0; k < 5; ++k) {
    }`,
    'let { x, } = { x: 23 };',
    'let { w: [x, y, z] = [4, 5, 6] } = {};',
    'let { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };',
    'let { x: y = 33 } = { };',
    'let { x: y, } = { x: 23 };',
    'let xCls = class x {};',
    'let cls = class {};',
    'let\n{x} = x;',
    'let {x}\n= x;',
    'let xCls2 = class { static name() {} };',
    'let { s: t = a(), u: v = b(), w: x = c(), y: z = d() } = { s: null, u: 0, w: false, y: "" };',
    'let {} = obj;',
    'let {} = undefined;',
    `{ let a; }`,
    `let a`,
    `while(true) var a`,
    `let a = 123`,
    `switch (answer) { case 42: let t = 42; break; }`,
    'let [, , ...x] = [1, 2];',
    'let [ , , ...x] = [1, 2, 3, 4, 5];',
    'let [[x]] = [null];',
    'let test262id8;',
    'let arrow = () => {};',
    `let xCls = class x {};
    let cls = class {};
    let xCls2 = class { static name() {} };`,
    'let [[x]] = [null];',
    'let [arrow = () => {}] = [];',
    'let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];',
    'let [{ x }] = [];',
    'let [...x] = [1, 2, 3];',
    'let { x, } = { x: 23 };',
    'let { x: y = 33 } = { };',
    'let { x: y } = { x: 23 };',
    'let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: null };',
    'let {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};',
    `let x = "outer_x";
    let y = "outer_y";
    for (let x = "inner_x", i = 0; i < 1; i++) {
      let y = "inner_y";
    }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.OptionsDisableWebCompat);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  pass('Statements - Let (pass)', [
    [
      'let;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'let'
            }
          }
        ]
      }
    ],
    // Acorn issue #774
    [
      `while (false) async // ASI
      {}`,
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: false
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'async'
              }
            }
          },
          {
            type: 'BlockStatement',
            body: []
          }
        ]
      }
    ],
    [
      `for (var x in null) let // ASI
      x = 1;`,
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'let'
              }
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            right: {
              type: 'Literal',
              value: null
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ]
      }
    ],
    [
      `for (var x of []) let // ASI
      x = 1;`,
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'let'
              }
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            right: {
              type: 'ArrayExpression',
              elements: []
            },
            await: false
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ]
      }
    ],
    [
      `while (false) let // ASI
      x = 1;`,
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: false
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'let'
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ]
      }
    ],
    [
      `while (false) let // ASI
      {}`,
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: false
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'let'
              }
            }
          },
          {
            type: 'BlockStatement',
            body: []
          }
        ]
      }
    ],
    [
      'function foo() { for (let in x) {} }',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ForInStatement',
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  left: {
                    type: 'Identifier',
                    name: 'let'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'for (let in x) {}',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'BlockStatement',
              body: []
            },
            left: {
              type: 'Identifier',
              name: 'let'
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        ]
      }
    ],
    [
      'let.let = foo',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'let'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'let'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '"use strict"; let x;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"use strict"',
              value: 'use strict'
            },
            directive: 'use strict'
          },
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '"use strict"; let x; x = 8;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"use strict"',
              value: 'use strict'
            },
            directive: 'use strict'
          },
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',

                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x',
                raw: 'x'
              },
              operator: '=',
              right: {
                type: 'Literal',
                raw: '8',
                value: 8
              }
            }
          }
        ]
      }
    ],
    [
      '"use strict"; let x = 8;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"use strict"',
              value: 'use strict'
            },
            directive: 'use strict'
          },
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  raw: '8',
                  value: 8
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'let'
            }
          }
        ]
      }
    ],
    [
      'let = 1',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'let'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ]
      }
    ],
    [
      'let = b',
      Context.OptionsDisableWebCompat,
      {
        body: [
          {
            expression: {
              left: {
                name: 'let',
                type: 'Identifier'
              },
              operator: '=',
              right: {
                name: 'b',
                type: 'Identifier'
              },
              type: 'AssignmentExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'let foo, bar',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'bar'
                },
                init: null
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [] = x;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: []
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [,] = x;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [null]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [foo=a] = arr;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'arr'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [foo=a, bar] = arr;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'arr'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [...foo] = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [foo, ...bar] = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [x, ...[foo, bar]] = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'foo'
                          },
                          {
                            type: 'Identifier',
                            name: 'bar'
                          }
                        ]
                      }
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {} = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: []
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {x} = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {x,} = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {x, y} = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {x} = a, {y} = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {x} = a, y = obj;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let foo;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'let a, [...x] = y',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'y'
                },
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'x'
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let {...x} = y',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'y'
                },
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'x'
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var let;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'let'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var [let] = x;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'x'
                },
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'let'
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var {let} = x;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'x'
                },
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'let'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'let'
                      },
                      method: false,
                      shorthand: true
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let.foo;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'let'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'let();',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'let'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    /** ['let {let: foo} = x;', Context.OptionsDisableWebCompat, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "VariableDeclaration",
          "kind": "let",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": {
                "type": "Identifier",
                "name": "x"
              },
              "id": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "Property",
                    "kind": "init",
                    "key": {
                      "type": "Identifier",
                      "name": "let"
                    },
                    "computed": false,
                    "value": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "method": false,
                    "shorthand": false
                  }
                ]
              }
            }
          ]
        }
      ]
    }],

    ['let {a, let: foo} = x;', Context.OptionsDisableWebCompat, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "VariableDeclaration",
          "kind": "let",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": {
                "type": "Identifier",
                "name": "x"
              },
              "id": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "Property",
                    "kind": "init",
                    "key": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "computed": false,
                    "value": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "method": false,
                    "shorthand": true
                  },
                  {
                    "type": "Property",
                    "kind": "init",
                    "key": {
                      "type": "Identifier",
                      "name": "let"
                    },
                    "computed": false,
                    "value": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "method": false,
                    "shorthand": false
                  }
                ]
              }
            }
          ]
        }
      ]
    }],*/
    [
      'for (var let;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'let'
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (let;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'Identifier',
              name: 'let'
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (;let;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: null,
            test: {
              type: 'Identifier',
              name: 'let'
            },
            update: null
          }
        ]
      }
    ],
    [
      '_ => { let: foo; }',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'LabeledStatement',
                    label: {
                      type: 'Identifier',
                      name: 'let'
                    },
                    body: {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    }
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: '_'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      'let: let;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'let'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'let'
              }
            }
          }
        ]
      }
    ],
    [
      'if (x) let;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'x'
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'let'
              }
            },
            alternate: null
          }
        ]
      }
    ],
    [
      'for (let [...[foo, bar]] in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            {
                              type: 'Identifier',
                              name: 'bar'
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let [x, ...[foo, bar]] in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      },
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            {
                              type: 'Identifier',
                              name: 'bar'
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let [a=[...b], ...c] in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'SpreadElement',
                              argument: {
                                type: 'Identifier',
                                name: 'b'
                              }
                            }
                          ]
                        }
                      },
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'c'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: []
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x,} in obj);  ',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x = y} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x, y = z} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'y'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'z'
                          }
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x = y, z = a} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'z'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'a'
                          }
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x : y} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x, y : z} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x : y = z} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'y'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'z'
                          }
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {x : y, z, a : b = c} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'b'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'c'
                          }
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {[x]: y} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: true,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {[x]: y = z} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: true,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'y'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'z'
                          }
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let {a, [x]: y} in obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: true,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (let [] of x);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: []
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [,] of x);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [null]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [foo,] of arr);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [foo,,] of arr);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      null
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [foo,,bar] of arr);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      null,
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [foo=a] of arr);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [foo, bar=b] of arr);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [foo=a, bar=b] of arr);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [...[foo, bar]] of obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            {
                              type: 'Identifier',
                              name: 'bar'
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [a=[...b], ...c] of obj);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'SpreadElement',
                              argument: {
                                type: 'Identifier',
                                name: 'b'
                              }
                            }
                          ]
                        }
                      },
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'c'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],
    [
      'let foo = bar;',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: {
                  type: 'Identifier',
                  name: 'bar'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ]
  ]);
});

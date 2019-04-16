import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Statements - For', () => {
  fail('Statements - For (fail)', [
    // Bindings

    ['for (let x;;) { var x; }', Context.Empty],
    ['for (const x = y;;) { var x; }', Context.Empty],
    ['for (let x in y) { var x; }', Context.Empty],
    ['for (const x in y) { var x; }', Context.Empty],
    ['for (let x of y) { var x; }', Context.Empty],
    ['for ([...[(x, y)]] in [[[]]]) ;', Context.Empty],
    ['for (const a;;);', Context.Empty],
    ['for (const a,b,c;;);', Context.Empty],
    ['for (const [x, x] in {}) {}', Context.Empty],
    ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.Empty],

    // General

    ['for (var x = 1 of y);', Context.Empty],
    ['for (const let = 1; let < 1; let++) {}', Context.Empty],
    ['for (const let in {}) {}', Context.Empty],
    ['for (const let of []) {}', Context.Empty],
    ['for (let [let] = 1; let < 1; let++) {}', Context.Empty],
    ['for (let [let] in {}) {}', Context.Empty],
    ['for (let [let] of []) {}', Context.Empty],
    ['for (const [let] = 1; let < 1; let++) {}', Context.Empty],
    ['for (const [let] in {}) {}', Context.Empty],
    ['for (const [let] of []) {}', Context.Empty],
    ['for (let let = 1; let < 1; let++) {}', Context.Empty],
    ['for (let let in {}) {}', Context.Empty],
    ['for (let let of []) {}', Context.Empty],
    ['for (var [foo] = arr, [bar] = arr2);', Context.Empty],
    ['for (var [foo,,bar] = arr);', Context.Empty],
    ['for (var [foo,bar] = arr);', Context.Empty],
    ['for (var [,,foo] = arr);', Context.Empty],
    ['for (var [,foo] = arr);', Context.Empty],
    ['for (var [foo,,] = arr);', Context.Empty],
    ['for (var [foo,] = arr);', Context.Empty],
    ['for (var [foo] = arr);', Context.Empty],
    ['for (var [,,] = x);', Context.Empty],
    ['for (var [,] = x);', Context.Empty],
    ['for (var [] = x);', Context.Empty],
    ['for (var [foo] = arr, [bar] = arr2);', Context.Empty],
    ['for (var [foo] = arr, bar);', Context.Empty],
    ['for (var [foo] = arr, bar = arr2);', Context.Empty],
    ['for (var foo = arr, [bar] = arr2);', Context.Empty],
    ['for (var [foo=a] = arr);', Context.Empty],
    ['for (var [foo=a, bar] = arr);', Context.Empty],
    ['for (var [foo, bar=b] = arr);', Context.Empty],
    ['for (var [foo=a, bar=b] = arr);', Context.Empty],
    ['for (var [foo]);', Context.Empty],
    ['for (var [foo = x]);', Context.Empty],
    ['for (var [foo], bar);', Context.Empty],
    ['for (var foo, [bar]);', Context.Empty],
    ['for (var [...foo] = obj);', Context.Empty],
    ['for (var [foo, ...bar] = obj);', Context.Empty],
    ['for (var [...foo, bar] = obj);', Context.Empty],
    ['for (var [...foo,] = obj);', Context.Empty],
    ['for (var [...foo,,] = obj);', Context.Empty],
    ['for (var [...[foo, bar]] = obj);', Context.Empty],
    ['for (var [...[foo, bar],] = obj);', Context.Empty],
    ['for (var [...[foo, bar],,] = obj);', Context.Empty],
    ['for (var [x, ...[foo, bar]] = obj);', Context.Empty],
    ['for (var [...bar = foo] = obj);', Context.Empty],
    ['for (var [...] = obj);', Context.Empty],
    ['for (var {} = obj);', Context.Empty],
    ['for (var {,} = obj);', Context.Empty],
    ['for (var {,,} = obj);', Context.Empty],
    ['for (var {x} = obj);', Context.Empty],
    ['for (var {x,} = obj);', Context.Empty],
    ['for (var {x,,} = obj);', Context.Empty],
    ['for (var {,x} = obj);', Context.Empty],
    ['for (var {,,x} = obj);', Context.Empty],
    ['for (var {x, y} = obj);', Context.Empty],
    ['for (var {x,, y} = obj);', Context.Empty],
    ['for (var {x} = a, {y} = obj);', Context.Empty],
    ['for (var {x} = a, y = obj);', Context.Empty],
    ['for (var {x} = a, obj);', Context.Empty],
    ['for (var x = a, {y} = obj);', Context.Empty],
    ['for (var x, {y} = obj);', Context.Empty],
    ['for (var {x = y} = obj);', Context.Empty],
    ['for (var {x = y, z} = obj);', Context.Empty],
    ['for (var {x, y = z} = obj);', Context.Empty],
    ['for (var {x = y, z = a} = obj);', Context.Empty],
    ['for (var {x}, {y} = z);', Context.Empty],
    ['for (var {x}, y);', Context.Empty],
    ['for (var x = y, {z});', Context.Empty],
    ['for (var {x}, y);', Context.Empty],
    ['for (var {x=y});', Context.Empty],
    ['for (var {x:y=z});', Context.Empty],
    ['for (var {x:y=z} = obj, {a:b=c});', Context.Empty],
    ['for (var {x:y=z}, {a:b=c} = obj);', Context.Empty],
    ['for (var {a:=c} = z);', Context.Empty],
    ['for (var {[x]: y} = z);', Context.Empty],
    ['for (var {[x]} = z);', Context.Empty],
    ['for (var {[x]: y});', Context.Empty],
    ['for (var {[x]: y = z});', Context.Empty],
    ['for (var {[x]: y = z} = a);', Context.Empty],
    ['for (var {a, [x]: y} = a);', Context.Empty],

    ['for(index=0; index<10; index+=4; index++; index--) ;', Context.Empty],

    ['for({var index=0; index+=1;} index++<=10; index*2;) {	[].add(""+index);};', Context.Empty],
    ['for ( ; false; ) class C {}', Context.Empty],
    [`for ( ; false; ) function f() {}`, Context.Empty],
    ['for ( ; false; ) label1: label2: function f() {}', Context.Empty],
    ['for ( ; false; ) label1: label2: function f() {}', Context.Empty],
    ['for ((i in {}));', Context.Empty],
    ['for (let [];;);', Context.Empty],
    ['for (let [a = 0];;);', Context.Empty],
    ['for (let a = 0, [];;);', Context.Empty],
    ['for (let [] = 0, [];;);', Context.Empty],
    ['for (let {};;);', Context.Empty],
    ['for (let {a = 0};;);', Context.Empty],
    ['for (let a = 0, {};;);', Context.Empty],
    ['for (let [] = 0, {};;);', Context.Empty],
    ['for (let [...x = []] = []; a < 1; ) {}', Context.Empty],
    ['for (let [...{ x } = []] = []; a < 1; ) {}', Context.Empty],
    ['for (var a in arr;1;){ break; }', Context.Empty],
    ['for ( ; false; ) class C {}', Context.Empty],
    ['for ( ; false; ) function f() {}', Context.Empty],
    ['for ( ; false; ) function* g() {}', Context.Empty],
    ['for (const [...{ x }, y] = [1, 2, 3]; iterCount < 1; ) {}', Context.Empty],
    ['for (var [...[ x ] = []] = []; iterCount < 1; ) {}', Context.Empty],
    ['for (var a in arr;1;){ break; }', Context.Empty]
  ]);

  for (const arg of [
    // tests for possible destructuring regression
    'for (var {j}=x; j<10; ++j) { const foo = j }',
    `        for ("boolean" == typeof a && (l = a, a = arguments[s] ||
          {}, s++), "object" == typeof a ||
          g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
  if (null != (e = arguments[s]))
      for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) ||
      (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n)
      ? n : [])
      : o = n && w.isPlainObject(n)
      ? n : {}, a[t] = w.extend(l, o, r))
      : void 0 !== r && (a[t] = r));`,
    `for(x, y;;);`,
    `for(x = 0;;);`,
    `for(x; x < 0;);`,
    `for(x; x < 0; x++);`,
    `for(var x = 0;;);`,
    `for(let x = 0;;);`,
    `for(var a = 0;;) { let a; }`,
    `for (var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined }; a < 1; ) {}`,
    `for (var [[] = function() { a += 1; }()] = [[23]]; b < 1; ) {}`,
    `for (let { w = a(), x = b(), y = c(), z = d() } = { w: null, x: 0, y: false, z: '' }; e < 1; ) {}`,
    `for (let [,] = a(); b < 1; ) {}`,
    `for (let [x, y, z] = [1, 2, 3]; a < 1; ) {}`,
    `for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};
      for (const { x, } = { x: 23 }; a < 1; ) {};`,
    `for (const {} = obj; a < 1; ) {}`,
    'for (j=x; j<10; ++j) { [foo] = [j] }',
    'for (j=x; j<10; ++j) { let foo = j }',
    'for (j=x; j<10; ++j) { function foo() {return j} }',
    'for ({j}=x; j<10; ++j) { var [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { let foo = j }',
    'for ({j}=x; j<10; ++j) { const [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { function foo() {return j} }',
    'for (var j=x; j<10; ++j) { foo = j }',
    'for (var {j}=x; j<10; ++j) { var [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { function foo(){return j} }',
    'for (let j=x; j<10; ++j) { const foo = j }',
    'for (let j=x; j<10; ++j) { let [foo] = [j] }',
    `let = 1;
    for ( let; ; )
      break;`,
    'for (x of [1,2,3]) {}',
    'for (x in {a: 1}) {}',
    'for ([x] of [[1],[2],[3]]) {}',
    'for ([x] in {ab: 1}) {}',
    'for (j=x; j<10; ++j) { foo = j }',
    'for (j=x; j<10; ++j) { [foo] = [j] }',
    'for (j=x; j<10; ++j) { [[foo]=[42]] = [] }',
    'for (j=x; j<10; ++j) { var foo = j }',
    'for (j=x; j<10; ++j) { var [foo] = [j] }',
    'for (j=x; j<10; ++j) { var [[foo]=[42]] = [] }',
    'for (j=x; j<10; ++j) { var foo; foo = j }',
    'for (j=x; j<10; ++j) { var foo; [foo] = [j] }',
    'for (j=x; j<10; ++j) { var foo; [[foo]=[42]] = [] }',
    'for (j=x; j<10; ++j) { let foo; foo = j }',
    'for (j=x; j<10; ++j) { let foo; [foo] = [j] }',
    'for (j=x; j<10; ++j) { let foo; [[foo]=[42]] = [] }',
    'for (j=x; j<10; ++j) { let foo = j }',
    'for (j=x; j<10; ++j) { let [foo] = [j] }',
    'for (j=x; j<10; ++j) { const foo = j }',
    'for (j=x; j<10; ++j) { const [foo] = [j] }',
    'for (j=x; j<10; ++j) { function foo() {return j} }',
    'for ([...x] in {ab: 1}) {}',
    'for (j=x; j<10; ++j) { foo = j }',
    'for (j=x; j<10; ++j) { [foo] = [j] }',
    'for (j=x; j<10; ++j) { let foo = j }',
    'for (j=x; j<10; ++j) { function foo() {return j} }',
    'for ({j}=x; j<10; ++j) { var [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { const [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { function foo() {return j} }',
    'for (var j=x; j<10; ++j) { foo = j }',
    'for (var {j}=x; j<10; ++j) { var [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { function foo(){return j} }',
    'for (let j=x; j<10; ++j) { const foo = j }',
    'for (let j=x; j<10; ++j) { let [foo] = [j] }',

    'for ({j}=x; j<10; ++j) { foo = j }',
    'for ({j}=x; j<10; ++j) { [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { [[foo]=[42]] = [] }',
    'for ({j}=x; j<10; ++j) { var foo = j }',
    'for ({j}=x; j<10; ++j) { var [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { var [[foo]=[42]] = [] }',
    'for ({j}=x; j<10; ++j) { var foo; foo = j }',
    'for ({j}=x; j<10; ++j) { var foo; [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { var foo; [[foo]=[42]] = [] }',
    'for ({j}=x; j<10; ++j) { let foo; foo = j }',
    'for ({j}=x; j<10; ++j) { let foo; [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { let foo; [[foo]=[42]] = [] }',
    'for ({j}=x; j<10; ++j) { let foo = j }',
    'for ({j}=x; j<10; ++j) { let [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { const foo = j }',
    'for ({j}=x; j<10; ++j) { const [foo] = [j] }',
    'for ({j}=x; j<10; ++j) { function foo() {return j} }',

    'for (var j=x; j<10; ++j) { foo = j }',
    'for (var j=x; j<10; ++j) { [foo] = [j] }',
    'for (var j=x; j<10; ++j) { [[foo]=[42]] = [] }',
    'for (var j=x; j<10; ++j) { var foo = j }',
    'for (var j=x; j<10; ++j) { var [foo] = [j] }',
    'for (var j=x; j<10; ++j) { var [[foo]=[42]] = [] }',
    'for (var j=x; j<10; ++j) { var foo; foo = j }',
    'for (var j=x; j<10; ++j) { var foo; [foo] = [j] }',
    'for (var j=x; j<10; ++j) { var foo; [[foo]=[42]] = [] }',
    'for (var j=x; j<10; ++j) { let foo; foo = j }',
    'for (var j=x; j<10; ++j) { let foo; [foo] = [j] }',
    'for (var j=x; j<10; ++j) { let foo; [[foo]=[42]] = [] }',
    'for (var j=x; j<10; ++j) { let foo = j }',
    'for (var j=x; j<10; ++j) { let [foo] = [j] }',
    'for (var j=x; j<10; ++j) { const foo = j }',
    'for (var j=x; j<10; ++j) { const [foo] = [j] }',
    'for (var j=x; j<10; ++j) { function foo() {return j} }',

    'for (var {j}=x; j<10; ++j) { foo = j }',
    'for (var {j}=x; j<10; ++j) { [foo] = [j] }',
    'for (var {j}=x; j<10; ++j) { [[foo]=[42]] = [] }',
    'for (var {j}=x; j<10; ++j) { var foo = j }',
    'for (var {j}=x; j<10; ++j) { var [foo] = [j] }',
    'for (var {j}=x; j<10; ++j) { var [[foo]=[42]] = [] }',
    'for (var {j}=x; j<10; ++j) { var foo; foo = j }',
    'for (var {j}=x; j<10; ++j) { var foo; [foo] = [j] }',
    'for (var {j}=x; j<10; ++j) { var foo; [[foo]=[42]] = [] }',
    'for (var {j}=x; j<10; ++j) { let foo; foo = j }',
    'for (var {j}=x; j<10; ++j) { let foo; [foo] = [j] }',
    'for (var {j}=x; j<10; ++j) { let foo; [[foo]=[42]] = [] }',
    'for (var {j}=x; j<10; ++j) { let foo = j }',
    'for (var {j}=x; j<10; ++j) { let [foo] = [j] }',
    'for (var {j}=x; j<10; ++j) { const foo = j }',
    'for (var {j}=x; j<10; ++j) { const [foo] = [j] }',
    'for (var {j}=x; j<10; ++j) { function foo() {return j} }',
    'for (let j=x; j<10; ++j) { foo = j }',
    'for (let j=x; j<10; ++j) { [foo] = [j] }',
    'for (let j=x; j<10; ++j) { [[foo]=[42]] = [] }',
    'for (let j=x; j<10; ++j) { var foo = j }',
    'for (let j=x; j<10; ++j) { var [foo] = [j] }',
    'for (let j=x; j<10; ++j) { var [[foo]=[42]] = [] }',
    'for (let j=x; j<10; ++j) { var foo; foo = j }',
    'for (let j=x; j<10; ++j) { var foo; [foo] = [j] }',
    'for (let j=x; j<10; ++j) { var foo; [[foo]=[42]] = [] }',
    'for (let j=x; j<10; ++j) { let foo; foo = j }',
    'for (let j=x; j<10; ++j) { let foo; [foo] = [j] }',
    'for (let j=x; j<10; ++j) { let foo; [[foo]=[42]] = [] }',
    'for (let j=x; j<10; ++j) { let foo = j }',
    'for (let j=x; j<10; ++j) { let [foo] = [j] }',
    'for (let j=x; j<10; ++j) { const foo = j }',
    'for (let j=x; j<10; ++j) { const [foo] = [j] }',
    'for (let j=x; j<10; ++j) { function foo() {return j} }',
    'for (let {j}=x; j<10; ++j) { foo = j }',
    'for (let {j}=x; j<10; ++j) { [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { [[foo]=[42]] = [] }',
    'for (let {j}=x; j<10; ++j) { var foo = j }',
    'for (let {j}=x; j<10; ++j) { var [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { var [[foo]=[42]] = [] }',
    'for (let {j}=x; j<10; ++j) { var foo; foo = j }',
    'for (let {j}=x; j<10; ++j) { var foo; [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { var foo; [[foo]=[42]] = [] }',
    'for (let {j}=x; j<10; ++j) { let foo; foo = j }',
    'for (let {j}=x; j<10; ++j) { let foo; [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { let foo; [[foo]=[42]] = [] }',
    'for (let {j}=x; j<10; ++j) { let foo = j }',
    'for (let {j}=x; j<10; ++j) { let [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { const foo = j }',
    'for (let {j}=x; j<10; ++j) { const [foo] = [j] }',
    'for (let {j}=x; j<10; ++j) { function foo(){return j} }',
    'for (j of x) { foo = j }',
    'for (j of x) { [foo] = [j] }',
    'for (j of x) { [[foo]=[42]] = [] }',
    'for (j of x) { var foo = j }',
    'for (j of x) { var [foo] = [j] }',
    'for (j of x) { var [[foo]=[42]] = [] }',
    'for (j of x) { var foo; foo = j }',
    'for (j of x) { var foo; [foo] = [j] }',
    'for (j of x) { var foo; [[foo]=[42]] = [] }',
    'for (j of x) { let foo; foo = j }',
    'for (j of x) { let foo; [foo] = [j] }',
    'for (j of x) { let foo; [[foo]=[42]] = [] }',
    'for (j of x) { let foo = j }',
    'for (j of x) { let [foo] = [j] }',
    'for (j of x) { const foo = j }',
    'for (j of x) { const [foo] = [j] }',
    'for (j of x) { function foo() {return j} }',
    'for ({j} of x) { foo = j }',
    'for ({j} of x) { [foo] = [j] }',
    'for ({j} of x) { [[foo]=[42]] = [] }',
    'for ({j} of x) { var foo = j }',
    'for ({j} of x) { var [foo] = [j] }',
    'for ({j} of x) { var [[foo]=[42]] = [] }',
    'for ({j} of x) { var foo; foo = j }',
    'for ({j} of x) { var foo; [foo] = [j] }',
    'for ({j} of x) { var foo; [[foo]=[42]] = [] }',
    'for ({j} of x) { let foo; foo = j }',
    'for ({j} of x) { let foo; [foo] = [j] }',
    'for ({j} of x) { let foo; [[foo]=[42]] = [] }',
    'for ({j} of x) { let foo = j }',
    'for ({j} of x) { let [foo] = [j] }',
    'for ({j} of x) { const foo = j }',
    'for ({j} of x) { const [foo] = [j] }',
    'for ({j} of x) { function foo() {return j} }',
    'for (var j of x) { foo = j }',
    'for (var j of x) { [foo] = [j] }',
    'for (var j of x) { [[foo]=[42]] = [] }',
    'for (var j of x) { var foo = j }',
    'for (var j of x) { var [foo] = [j] }',
    'for (var j of x) { var [[foo]=[42]] = [] }',
    'for (var j of x) { var foo; foo = j }',
    'for (var j of x) { var foo; [foo] = [j] }',
    'for (var j of x) { var foo; [[foo]=[42]] = [] }',
    'for (var j of x) { let foo; foo = j }',
    'for (var j of x) { let foo; [foo] = [j] }',
    'for (var j of x) { let foo; [[foo]=[42]] = [] }',
    'for (var j of x) { let foo = j }',
    'for (var j of x) { let [foo] = [j] }',
    'for (var j of x) { const foo = j }',
    'for (var j of x) { const [foo] = [j] }',
    'for (var j of x) { function foo() {return j} }',
    'for (var {j} of x) { foo = j }',
    'for (var {j} of x) { [foo] = [j] }',
    'for (var {j} of x) { [[foo]=[42]] = [] }',
    'for (var {j} of x) { var foo = j }',
    'for (var {j} of x) { var [foo] = [j] }',
    'for (var {j} of x) { var [[foo]=[42]] = [] }',
    'for (var {j} of x) { var foo; foo = j }',
    'for (var {j} of x) { var foo; [foo] = [j] }',
    'for (var {j} of x) { var foo; [[foo]=[42]] = [] }',
    'for (var {j} of x) { let foo; foo = j }',
    'for (var {j} of x) { let foo; [foo] = [j] }',
    'for (var {j} of x) { let foo; [[foo]=[42]] = [] }',
    'for (var {j} of x) { let foo = j }',
    'for (var {j} of x) { let [foo] = [j] }',
    'for (var {j} of x) { const foo = j }',
    'for (var {j} of x) { const [foo] = [j] }',
    'for (var {j} of x) { function foo() {return j} }',
    'for (let j of x) { foo = j }',
    'for (let j of x) { [foo] = [j] }',
    'for (let j of x) { [[foo]=[42]] = [] }',
    'for (let j of x) { var foo = j }',
    'for (let j of x) { var [foo] = [j] }',
    'for (let j of x) { var [[foo]=[42]] = [] }',
    'for (let j of x) { var foo; foo = j }',
    'for (let j of x) { var foo; [foo] = [j] }',
    'for (let j of x) { var foo; [[foo]=[42]] = [] }',
    'for (let j of x) { let foo; foo = j }',
    'for (let j of x) { let foo; [foo] = [j] }',
    'for (let j of x) { let foo; [[foo]=[42]] = [] }',
    'for (let j of x) { let foo = j }',
    'for (let j of x) { let [foo] = [j] }',
    'for (let j of x) { const foo = j }',
    'for (let j of x) { const [foo] = [j] }',
    'for (let j of x) { function foo() {return j} }',
    'for (let {j} of x) { foo = j }',
    'for (let {j} of x) { [foo] = [j] }',
    'for (let {j} of x) { [[foo]=[42]] = [] }',
    'for (let {j} of x) { var foo = j }',
    'for (let {j} of x) { var [foo] = [j] }',
    'for (let {j} of x) { var [[foo]=[42]] = [] }',
    'for (let {j} of x) { var foo; foo = j }',
    'for (let {j} of x) { var foo; [foo] = [j] }',
    'for (let {j} of x) { var foo; [[foo]=[42]] = [] }',
    'for (let {j} of x) { let foo; foo = j }',
    'for (let {j} of x) { let foo; [foo] = [j] }',
    'for (let {j} of x) { let foo; [[foo]=[42]] = [] }',
    'for (let {j} of x) { let foo = j }',
    'for (let {j} of x) { let [foo] = [j] }',
    'for (let {j} of x) { const foo = j }',
    'for (let {j} of x) { const [foo] = [j] }',
    'for (let {j} of x) { function foo() {return j} }',
    'for (j=x; j<10; ++j) { function foo() {return j} }',
    'for ({j}=x; j<10; ++j) { function foo() {return j} }',
    'for (var j=x; j<10; ++j) { function foo() {return j} }',
    'for (var {j}=x; j<10; ++j) { function foo() {return j} }',
    'for (let j=x; j<10; ++j) { function foo() {return j} }',
    'for (let {j}=x; j<10; ++j) { function foo() {return j} }',
    'for (j of x) { function foo() {return j} }',
    'for ({j} of x) { function foo() {return j} }',
    'for (var j of x) { function foo() {return j} }',
    'for (var {j} of x) { function foo() {return j} }',
    'for (let j of x) { function foo() {return j} }',
    'for (let {j} of x) { function foo() {return j} }',
    'for (const j of x) { function foo() {return j} }',
    'for (const {j} of x) { function foo() {return j} }',
    'for (j in x) { function foo() {return j} }',
    'for ({j} in x) { function foo() {return j} }',
    'for (var j in x) { function foo() {return j} }',
    'for (var {j} in x) { function foo() {return j} }',
    'for (let j in x) { function foo() {return j} }',
    'for (let {j} in x) { function foo() {return j} }',
    'for (const j in x) { function foo() {return j} }',
    'for (const {j} in x) { function foo() {return j} }',
    'while (j) { function foo() {return j} }',
    'do { function foo() {return j} } while (j)',
    'for (const j of x) { foo = j }',
    'for (const j of x) { [foo] = [j] }',
    'for (const j of x) { [[foo]=[42]] = [] }',
    'for (const j of x) { var foo = j }',
    'for (const j of x) { var [foo] = [j] }',
    'for (const j of x) { var [[foo]=[42]] = [] }',
    'for (const j of x) { var foo; foo = j }',
    'for (const j of x) { var foo; [foo] = [j] }',
    'for (const j of x) { var foo; [[foo]=[42]] = [] }',
    'for (const j of x) { let foo; foo = j }',
    'for (const j of x) { let foo; [foo] = [j] }',
    'for (const j of x) { let foo; [[foo]=[42]] = [] }',
    'for (const j of x) { let foo = j }',
    'for (const j of x) { let [foo] = [j] }',
    'for (const j of x) { const foo = j }',
    'for (const j of x) { const [foo] = [j] }',
    'for (const j of x) { function foo() {return j} }',
    'for (let = 1; let < 1; let++) {}',
    'for (let in {}) {}',
    'for (var let = 1; let < 1; let++) {}',
    'for (var let in {}) {}',
    'for (var [let] = 1; let < 1; let++) {}',
    'for (var [let] in {}) {}',
    'for (const {j} of x) { foo = j }',
    'for (const {j} of x) { [foo] = [j] }',
    'for (const {j} of x) { [[foo]=[42]] = [] }',
    'for (const {j} of x) { var foo = j }',
    'for (const {j} of x) { var [foo] = [j] }',
    'for (const {j} of x) { var [[foo]=[42]] = [] }',
    'for (const {j} of x) { var foo; foo = j }',
    'for (const {j} of x) { var foo; [foo] = [j] }',
    'for (const {j} of x) { var foo; [[foo]=[42]] = [] }',
    'for (const {j} of x) { let foo; foo = j }',
    'for (const {j} of x) { let foo; [foo] = [j] }',
    'for (const {j} of x) { let foo; [[foo]=[42]] = [] }',
    'for (const {j} of x) { let foo = j }',
    'for (const {j} of x) { let [foo] = [j] }',
    'for (const {j} of x) { const foo = j }',
    'for (const {j} of x) { const [foo] = [j] }',
    'for (const {j} of x) { function foo() {return j} }',
    'for (j in x) { foo = j }',
    'for (j in x) { [foo] = [j] }',
    'for (j in x) { [[foo]=[42]] = [] }',
    'for (j in x) { var foo = j }',
    'for (j in x) { var [foo] = [j] }',
    'for (j in x) { var [[foo]=[42]] = [] }',
    'for (j in x) { var foo; foo = j }',
    'for (j in x) { var foo; [foo] = [j] }',
    'for (j in x) { var foo; [[foo]=[42]] = [] }',
    'for (j in x) { let foo; foo = j }',
    'for (j in x) { let foo; [foo] = [j] }',
    'for (j in x) { let foo; [[foo]=[42]] = [] }',
    'for (j in x) { let foo = j }',
    'for (j in x) { let [foo] = [j] }',
    'for (j in x) { const foo = j }',
    'for (j in x) { const [foo] = [j] }',
    'for (j in x) { function foo() {return j} }',
    'for ({j} in x) { foo = j }',
    'for ({j} in x) { [foo] = [j] }',
    'for ({j} in x) { [[foo]=[42]] = [] }',
    'for ({j} in x) { var foo = j }',
    'for ({j} in x) { var [foo] = [j] }',
    'for ({j} in x) { var [[foo]=[42]] = [] }',
    'for ({j} in x) { var foo; foo = j }',
    'for ({j} in x) { var foo; [foo] = [j] }',
    'for ({j} in x) { var foo; [[foo]=[42]] = [] }',
    'for ({j} in x) { let foo; foo = j }',
    'for ({j} in x) { let foo; [foo] = [j] }',
    'for ({j} in x) { let foo; [[foo]=[42]] = [] }',
    'for ({j} in x) { let foo = j }',
    'for ({j} in x) { let [foo] = [j] }',
    'for ({j} in x) { const foo = j }',
    'for ({j} in x) { const [foo] = [j] }',
    'for ({j} in x) { function foo() {return j} }',
    'for (var j in x) { foo = j }',
    'for (var j in x) { [foo] = [j] }',
    'for (var j in x) { [[foo]=[42]] = [] }',
    'for (var j in x) { var foo = j }',
    'for (var j in x) { var [foo] = [j] }',
    'for (var j in x) { var [[foo]=[42]] = [] }',
    'for (var j in x) { var foo; foo = j }',
    'for (var j in x) { var foo; [foo] = [j] }',
    'for (var j in x) { var foo; [[foo]=[42]] = [] }',
    'for (var j in x) { let foo; foo = j }',
    'for (var j in x) { let foo; [foo] = [j] }',
    'for (var j in x) { let foo; [[foo]=[42]] = [] }',
    'for (var j in x) { let foo = j }',
    'for (var j in x) { let [foo] = [j] }',
    'for (var j in x) { const foo = j }',
    'for (var j in x) { const [foo] = [j] }',
    'for (var j in x) { function foo() {return j} }',
    'for (var {j} in x) { foo = j }',
    'for (var {j} in x) { [foo] = [j] }',
    'for (var {j} in x) { [[foo]=[42]] = [] }',
    'for (var {j} in x) { var foo = j }',
    'for (var {j} in x) { var [foo] = [j] }',
    'for (var {j} in x) { var [[foo]=[42]] = [] }',
    'for (var {j} in x) { var foo; foo = j }',
    'for (var {j} in x) { var foo; [foo] = [j] }',
    'for (var {j} in x) { var foo; [[foo]=[42]] = [] }',
    'for (var {j} in x) { let foo; foo = j }',
    'for (var {j} in x) { let foo; [foo] = [j] }',
    'for (var {j} in x) { let foo; [[foo]=[42]] = [] }',
    'for (var {j} in x) { let foo = j }',
    'for (var {j} in x) { let [foo] = [j] }',
    'for (var {j} in x) { const foo = j }',
    'for (var {j} in x) { const [foo] = [j] }',
    'for (var {j} in x) { function foo() {return j} }',
    'for (let j in x) { foo = j }',
    'for (let j in x) { [foo] = [j] }',
    'for (let j in x) { [[foo]=[42]] = [] }',
    'for (let j in x) { var foo = j }',
    'for (let j in x) { var [foo] = [j] }',
    'for (let j in x) { var [[foo]=[42]] = [] }',
    'for (let j in x) { var foo; foo = j }',
    'for (let j in x) { var foo; [foo] = [j] }',
    'for (let j in x) { var foo; [[foo]=[42]] = [] }',
    'for (let j in x) { let foo; foo = j }',
    'for (let j in x) { let foo; [foo] = [j] }',
    'for (let j in x) { let foo; [[foo]=[42]] = [] }',
    'for (let j in x) { let foo = j }',
    'for (let j in x) { let [foo] = [j] }',
    'for (let j in x) { const foo = j }',
    'for (let j in x) { const [foo] = [j] }',
    'for (let j in x) { function foo() {return j} }',
    'for (let {j} in x) { foo = j }',
    'for (let {j} in x) { [foo] = [j] }',
    'for (let {j} in x) { [[foo]=[42]] = [] }',
    'for (let {j} in x) { var foo = j }',
    'for (let {j} in x) { var [foo] = [j] }',
    'for (let {j} in x) { var [[foo]=[42]] = [] }',
    'for (let {j} in x) { var foo; foo = j }',
    'for (let {j} in x) { var foo; [foo] = [j] }',
    'for (let {j} in x) { var foo; [[foo]=[42]] = [] }',
    'for (let {j} in x) { let foo; foo = j }',
    'for (let {j} in x) { let foo; [foo] = [j] }',
    'for (let {j} in x) { let foo; [[foo]=[42]] = [] }',
    'for (let {j} in x) { let foo = j }',
    'for (let {j} in x) { let [foo] = [j] }',
    'for (let {j} in x) { const foo = j }',
    'for (let {j} in x) { const [foo] = [j] }',
    'for (let {j} in x) { function foo() {return j} }',
    'for (const j in x) { foo = j }',
    'for (const j in x) { [foo] = [j] }',
    'for (const j in x) { [[foo]=[42]] = [] }',
    'for (const j in x) { var foo = j }',
    'for (const j in x) { var [foo] = [j] }',
    'for (const j in x) { var [[foo]=[42]] = [] }',
    'for (const j in x) { var foo; foo = j }',
    'for (const j in x) { var foo; [foo] = [j] }',
    'for (const j in x) { var foo; [[foo]=[42]] = [] }',
    'for (const j in x) { let foo; foo = j }',
    'for (const j in x) { let foo; [foo] = [j] }',
    'for (const j in x) { let foo; [[foo]=[42]] = [] }',
    'for (const j in x) { let foo = j }',
    'for (const j in x) { let [foo] = [j] }',
    'for (const j in x) { const foo = j }',
    'for (const j in x) { const [foo] = [j] }',
    'for (const j in x) { function foo() {return j} }',
    'for (const {j} in x) { foo = j }',
    'for (const {j} in x) { [foo] = [j] }',
    'for (const {j} in x) { [[foo]=[42]] = [] }',
    'for (const {j} in x) { var foo = j }',
    'for (const {j} in x) { var [foo] = [j] }',
    'for (const {j} in x) { var [[foo]=[42]] = [] }',
    'for (const {j} in x) { var foo; foo = j }',
    'for (const {j} in x) { var foo; [foo] = [j] }',
    'for (const {j} in x) { var foo; [[foo]=[42]] = [] }',
    'for (const {j} in x) { let foo; foo = j }',
    'for (const {j} in x) { let foo; [foo] = [j] }',
    'for (const {j} in x) { let foo; [[foo]=[42]] = [] }',
    'for (const {j} in x) { let foo = j }',
    'for (const {j} in x) { let [foo] = [j] }',
    'for (const {j} in x) { const foo = j }',
    'for (const {j} in x) { const [foo] = [j] }',
    'for (const {j} in x) { function foo() {return j} }',
    'while (j) { foo = j }',
    'while (j) { [foo] = [j] }',
    'while (j) { [[foo]=[42]] = [] }',
    'while (j) { var foo = j }',
    'while (j) { var [foo] = [j] }',
    'while (j) { var [[foo]=[42]] = [] }',
    'while (j) { var foo; foo = j }',
    'while (j) { var foo; [foo] = [j] }',
    'while (j) { var foo; [[foo]=[42]] = [] }',
    'while (j) { let foo; foo = j }',
    'while (j) { let foo; [foo] = [j] }',
    'while (j) { let foo; [[foo]=[42]] = [] }',
    'while (j) { let foo = j }',
    'while (j) { let [foo] = [j] }',
    'while (j) { const foo = j }',
    'while (j) { const [foo] = [j] }',
    'while (j) { function foo() {return j} }',
    'do { foo = j } while (j)',
    'do { [foo] = [j] } while (j)',
    'do { [[foo]=[42]] = [] } while (j)',
    'do { var foo = j } while (j)',
    'do { var [foo] = [j] } while (j)',
    'do { var [[foo]=[42]] = [] } while (j)',
    'do { var foo; foo = j } while (j)',
    'do { var foo; [foo] = [j] } while (j)',
    'do { var foo; [[foo]=[42]] = [] } while (j)',
    'do { let foo; foo = j } while (j)',
    'do { let foo; [foo] = [j] } while (j)',
    'do { let foo; [[foo]=[42]] = [] } while (j)',
    'do { let foo = j } while (j)',
    'do { let [foo] = [j] } while (j)',
    'do { const foo = j } while (j)',
    'do { const [foo] = [j] } while (j)',
    'do { function foo() {return j} } while (j)',
    'for (a(b in c)[1] in d);',
    'for (const [[...x] = [2, 1, 3]] = []; iterCount < 1; ) {}',
    'for (const [cover = (function () {}), xCover = (0, function() {})] = []; iterCount < 1; ) {}',
    'for (const [x = 23] = [undefined]; iterCount < 1; ) {}',
    'for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]; iterCount < 1; ) {}',
    'for (const [...[,]] = g(); iterCount < 1; ) {}',
    `var __str, index, index_n;
    __str="";

    outer : for(index=0; index<4; index+=1) {
        nested : for(index_n=0; index_n<=index; index_n++) {
      if (index*index_n >= 4)break nested;
      __str+=""+index+index_n;
        }
    }`,
    `__str="";

    outer : for(index=0; index<4; index+=1) {
        nested : for(index_n=0; index_n<=index; index_n++) {
      if (index*index_n >= 4)break outer;
      __str+=""+index+index_n;
        }
    }`,
    `__str="";

    outer : for(index=0; index<4; index+=1) {
        nested : for(index_n=0; index_n<=index; index_n++) {
      if (index*index_n >= 4)break ;
      __str+=""+index+index_n;
        }
    }`,
    `let z = 1;
    let s = 0;
    for (const x = 1; z < 2; z++) {
      s += x + z;
    }`,
    `var probeBefore = function() { return x; };
    var probeTest, probeIncr, probeBody;
    var run = true;

    for (
        var _ = eval('var x = 1;');
        run && (probeTest = function() { return x; });
        probeIncr = function() { return x; }
      )
      probeBody = function() { return x; }, run = false;

    var x = 2;`,
    `let x = 'outside';
    var probeBefore = function() { return x; };
    var probeDecl, probeTest, probeIncr, probeBody;
    var run = true;

    for (
        let x = 'inside', _ = probeDecl = function() { return x; };
        run && (probeTest = function() { return x; });
        probeIncr = function() { return x; }
      )
      probeBody = function() { return x; }, run = false;`,
    `var probeFirst;
    var probeSecond = null;

    for (let x = 'first'; probeSecond === null; x = 'second')
      if (!probeFirst)
        probeFirst = function() { return x; };
      else
        probeSecond = function() { return x; };`,
    // tests for possible destructuring regression
    'for (var {j}=x; j<10; ++j) { const foo = j }',
    `        for ("boolean" == typeof a && (l = a, a = arguments[s] ||
             {}, s++), "object" == typeof a ||
             g(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
     if (null != (e = arguments[s]))
         for (t in e) n = a[t], a !== (r = e[t]) && (l && r && (w.isPlainObject(r) ||
         (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n)
         ? n : [])
         : o = n && w.isPlainObject(n)
         ? n : {}, a[t] = w.extend(l, o, r))
         : void 0 !== r && (a[t] = r));`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'for (let foo, bar;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo = bar;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [,] = x;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let\nfoo;;);',
      Context.Empty,
      {
        body: [
          {
            body: {
              type: 'EmptyStatement'
            },
            init: {
              declarations: [
                {
                  id: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  init: null,
                  type: 'VariableDeclarator'
                }
              ],
              kind: 'let',
              type: 'VariableDeclaration'
            },
            test: null,
            type: 'ForStatement',
            update: null
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'for (let [] = x;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a + b * c * d;b;c);',
      Context.Empty,
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
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  operator: '*'
                },
                right: {
                  type: 'Identifier',
                  name: 'd'
                },
                operator: '*'
              },
              operator: '+'
            },
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for (a * b + c * d;b;c);',
      Context.Empty,
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
              type: 'BinaryExpression',
              left: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
                },
                operator: '*'
              },
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'c'
                },
                right: {
                  type: 'Identifier',
                  name: 'd'
                },
                operator: '*'
              },
              operator: '+'
            },
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for ((a * b + c) * d;b;c);',
      Context.Empty,
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
              type: 'BinaryExpression',
              left: {
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  operator: '*'
                },
                right: {
                  type: 'Identifier',
                  name: 'c'
                },
                operator: '+'
              },
              right: {
                type: 'Identifier',
                name: 'd'
              },
              operator: '*'
            },
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for (const [...x] in y){}',
      Context.Empty,
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
              type: 'VariableDeclaration',
              kind: 'const',
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
                          type: 'Identifier',
                          name: 'x'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        ]
      }
    ],
    [
      'for (const [...x] in y){}',
      Context.Empty,
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
              type: 'VariableDeclaration',
              kind: 'const',
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
                          type: 'Identifier',
                          name: 'x'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        ]
      }
    ],
    [
      'for (const {...x} in y){}',
      Context.Empty,
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
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
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
            },
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        ]
      }
    ],
    [
      'for (var a=1;;);',
      Context.Empty,
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
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
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
      'for (var a=1, b;;);',
      Context.Empty,
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
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'b'
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
      'for (var a, b=1;;);',
      Context.Empty,
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
                    name: 'a'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  id: {
                    type: 'Identifier',
                    name: 'b'
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
      'for (var a=1, b=2;;);',
      Context.Empty,
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
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 2
                  },
                  id: {
                    type: 'Identifier',
                    name: 'b'
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
      'for (const a in b);',
      Context.Empty,
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
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        ]
      }
    ],
    [
      'for (var a = b in c);',
      Context.OptionsWebCompat,
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
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for (var a = ++b in c);',
      Context.OptionsWebCompat,
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
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'UpdateExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    operator: '++',
                    prefix: true
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for (var a = 0 in stored = a, {});',
      Context.OptionsWebCompat,
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
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 0
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'stored'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                },
                {
                  type: 'ObjectExpression',
                  properties: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'for (var a = (++effects, -1) in x);',
      Context.OptionsWebCompat,
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
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'UpdateExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'effects'
                        },
                        operator: '++',
                        prefix: true
                      },
                      {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                          type: 'Literal',
                          value: 1
                        },
                        prefix: true
                      }
                    ]
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
      'for (var a in stored = a, {a: 0, b: 1, c: 2});',
      Context.Empty,
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
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'stored'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                },
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        value: 0
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'Literal',
                        value: 1
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'c'
                      },
                      value: {
                        type: 'Literal',
                        value: 2
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'for (var a = (++effects, -1) in stored = a, {a: 0, b: 1, c: 2});',
      Context.OptionsWebCompat,
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
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'UpdateExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'effects'
                        },
                        operator: '++',
                        prefix: true
                      },
                      {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                          type: 'Literal',
                          value: 1
                        },
                        prefix: true
                      }
                    ]
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'stored'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                },
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        value: 0
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'Literal',
                        value: 1
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'c'
                      },
                      value: {
                        type: 'Literal',
                        value: 2
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'for ([a.b] in c) d',
      Context.Empty,
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
                name: 'd'
              }
            },
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for ([a.b].foo in c) d',
      Context.Empty,
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
                name: 'd'
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for ({a: b.c} in d) e',
      Context.Empty,
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
                name: 'e'
              }
            },
            left: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  value: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'c'
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'd'
            }
          }
        ]
      }
    ],
    [
      'for ({a: b.c}.foo in d) e',
      Context.Empty,
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
                name: 'e'
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    value: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'c'
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false
                  }
                ]
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            },
            right: {
              type: 'Identifier',
              name: 'd'
            }
          }
        ]
      }
    ],
    [
      'for (let a of b);',
      Context.Empty,
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
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'b'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (a of b=c);',
      Context.Empty,
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
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'c'
              }
            },
            await: false
          }
        ]
      }
    ],
    [
      'for ([a.b] of c) d',
      Context.Empty,
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
                name: 'd'
              }
            },
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'c'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for ([a.b].foo of c) d',
      Context.Empty,
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
                name: 'd'
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            },
            right: {
              type: 'Identifier',
              name: 'c'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for ({a: b.c} of d) e',
      Context.Empty,
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
                name: 'e'
              }
            },
            left: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  value: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'c'
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'd'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for ({a: b.c}.foo of d) e',
      Context.Empty,
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
                name: 'e'
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    value: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'c'
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false
                  }
                ]
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            },
            right: {
              type: 'Identifier',
              name: 'd'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (let [,,] = x;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [null, null]
                  },
                  init: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo,] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo] = arr, [bar] = arr2;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                      }
                    ]
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr2'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo] = arr, bar;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                      }
                    ]
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr'
                  }
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo, ...bar] = obj;;);',
      Context.Empty,
      {
        body: [
          {
            body: {
              type: 'EmptyStatement'
            },
            init: {
              declarations: [
                {
                  id: {
                    elements: [
                      {
                        name: 'foo',
                        type: 'Identifier'
                      },
                      {
                        argument: {
                          name: 'bar',
                          type: 'Identifier'
                        },
                        type: 'RestElement'
                      }
                    ],
                    type: 'ArrayPattern'
                  },
                  init: {
                    name: 'obj',
                    type: 'Identifier'
                  },
                  type: 'VariableDeclarator'
                }
              ],
              kind: 'let',
              type: 'VariableDeclaration'
            },
            test: null,
            type: 'ForStatement',
            update: null
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'for (let {x} = obj;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo, bar=b] in arr);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
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
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a;;);',
      Context.Empty,
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
                    name: 'a'
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
      'for (var a,b,c;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var x = 0; x < 1000000; x++);',
      Context.Empty,
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
                  init: {
                    type: 'Literal',
                    value: 0
                  },
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            test: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Literal',
                value: 1000000
              },
              operator: '<'
            },
            update: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '++',
              prefix: false
            }
          }
        ]
      }
    ],
    [
      'for (let a;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let a,b,c;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a;;) { let a; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            test: null,
            update: null,
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo in x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
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
            },
            right: {
              type: 'Identifier',
              name: 'x'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo;;);',
      Context.Empty,
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
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'foo'
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
      'for (;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: null,
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a;;);',
      Context.Empty,
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
              name: 'a'
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (;b;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: null,
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (;;c);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: null,
            test: null,
            update: {
              type: 'Identifier',
              name: 'c'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a;b;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'Identifier',
              name: 'a'
            },
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a;;c);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'Identifier',
              name: 'a'
            },
            test: null,
            update: {
              type: 'Identifier',
              name: 'c'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (;b;c);',
      Context.Empty,
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
              name: 'b'
            },
            update: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for (let [foo=a, bar=b] in arr);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
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
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [...foo] = obj;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo=a, bar=b] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo, bar=b] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo=a] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo = arr, [bar] = arr2;;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr2'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - For (pass)', valids);
});

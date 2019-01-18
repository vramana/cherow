import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Statements - For', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['for (let x;;) { var x; }', Context.OptionsDisableWebCompat],
    ['for (const x = y;;) { var x; }', Context.OptionsDisableWebCompat],
    ['for (let x in y) { var x; }', Context.OptionsDisableWebCompat],
    ['for (const x in y) { var x; }', Context.OptionsDisableWebCompat],
    ['for (let x of y) { var x; }', Context.OptionsDisableWebCompat],
    ['for (const a;;);', Context.OptionsDisableWebCompat],
    ['for (const a,b,c;;);', Context.OptionsDisableWebCompat],
    // ['for (const [x, x] in {}) {}', Context.OptionsDisableWebCompat],
    ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.OptionsDisableWebCompat],

    // General
    ['for (var [foo] = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (var [foo,,bar] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo,bar] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [,,foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [,foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo,,] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo,] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [,,] = x);', Context.OptionsDisableWebCompat],
    ['for (var [,] = x);', Context.OptionsDisableWebCompat],
    ['for (var [] = x);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr, bar);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr, bar = arr2);', Context.OptionsDisableWebCompat],
    ['for (var foo = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (var [foo=a] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo=a, bar] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo, bar=b] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo=a, bar=b] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo]);', Context.OptionsDisableWebCompat],
    ['for (var [foo = x]);', Context.OptionsDisableWebCompat],
    ['for (var [foo], bar);', Context.OptionsDisableWebCompat],
    ['for (var foo, [bar]);', Context.OptionsDisableWebCompat],
    ['for (var [...foo] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [foo, ...bar] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...foo, bar] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...foo,] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...foo,,] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...[foo, bar]] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...[foo, bar],] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...[foo, bar],,] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [x, ...[foo, bar]] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...bar = foo] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...] = obj);', Context.OptionsDisableWebCompat],
    ['for (var {} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x,,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,x} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,,x} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x, y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x,, y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = a, {y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = a, y = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = a, obj);', Context.OptionsDisableWebCompat],
    ['for (var x = a, {y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var x, {y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x = y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x = y, z} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x, y = z} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x = y, z = a} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x}, {y} = z);', Context.OptionsDisableWebCompat],
    ['for (var {x}, y);', Context.OptionsDisableWebCompat],
    ['for (var x = y, {z});', Context.OptionsDisableWebCompat],
    ['for (var {x}, y);', Context.OptionsDisableWebCompat],
    ['for (var {x=y});', Context.OptionsDisableWebCompat],
    ['for (var {x:y=z});', Context.OptionsDisableWebCompat],
    ['for (var {x:y=z} = obj, {a:b=c});', Context.OptionsDisableWebCompat],
    ['for (var {x:y=z}, {a:b=c} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {a:=c} = z);', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y} = z);', Context.OptionsDisableWebCompat],
    ['for (var {[x]} = z);', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y});', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y = z});', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y = z} = a);', Context.OptionsDisableWebCompat],
    ['for (var {a, [x]: y} = a);', Context.OptionsDisableWebCompat]
  ];

  fail('Statements - For (fail)', inValids);

  const programs = [
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
  ];

  for (const arg of programs) {
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      'for (let [,,] = x;;);',
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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
      Context.OptionsDisableWebCompat,
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

import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - For await of', () => {

    describe('Failures', () => {

        const Failures = [
            '(a = 1 of [])',
            '(var a = 0 in null)',
            '(var [a] = 0 in null)',
            '(a = 1 of [)',
            '(a  1 of [])',
            '(a = 1) of [])',
            '(a.b = 1 of [])',
            '((a.b = 1) of [])',
            '([a] = 1 of [])',
            '(([a] = 1) of [])',
            '([a = 1] = 1 of [])',
            '(([a = 1] = 1) of [])',
            '([a = 1 = 1, ...b] = 1 of [])',
            '(([a = 1 = 1, ...b] = 1) of [])',
            '({a} = 1 of [])',
            '(({a} = 1) of [])',
            '({a: a} = 1 of [])',
            '(({a: a} = 1) of [])',
            '({\'a\': a} = 1 of [])',
            '(({\'a\': a} = 1) of [])',
            '({"a": a} = 1 of [])',
            '(({"a": a} = 1) of [])',
            '({[Symbol.iterator]: a} = 1 of [])',
            '(({[Symbol.iterator]: a} = 1) of [])',
            '({0: a} = 1 of [])',
            '(({0: a} = 1) of [])',
            '({a = 1} = 1 of [])',
            '(({a = 1} = 1) of [])',
            '({a: a = 1} = 1 of [])',
            '(({a: a = 1} = 1) of [])',
            '({\'a\': a = 1} = 1 of [])',
            '(({\'a\': a = 1} = 1) of [])',
            '({"a": a = 1} = 1 of [])',
            '(({"a": a = 1} = 1) of [])',
            '({[Symbol.iterator]: a = 1} = 1 of [])',
            '(({[Symbol.iterator]: a = 1} = 1) of [])',
            '({0: a = 1} = 1 of [])',
            '(({0: a = 1} = 1) of [])',
            '(function a() {} of [])',
            '([1] of [])',
            '({a: 1} of [])',
            '(var a = 1 of [])',
            '(var a, b of [])',
            '(var [a] = 1 of [])',
            '(var [a], b of [])',
            '(var [a = 1] = 1 of [])',
            '(var [a = 1], b of [])',
            '(var [a = 1 = 1, ...b] of [])',
            '(var [a = 1, ...b], c of [])',
            '(var {a} = 1 of [])',
            '(var {a}, b of [])',
            '(var {a: a} = 1 of [])',
            '(var {a: a}, b of [])',
            '(var {\'a\': a} = 1 of [])',
            '(var {\'a\': a}, b of [])',
            '(var {"a": a} = 1 of [])',
            '(var {"a": a}, b of [])',
            '(var {[Symbol.iterator]: a} = 1 of [])',
            '(var {[Symbol.iterator]: a}, b of [])',
            '(var {0: a} = 1 of [])',
            '(var {0: a}, b of [])',
            '(var {a = 1} = 1 of [])',
            '(var {a = 1}, b of [])',
            '(var {a: a = 1} = 1 of [])',
            '(var {a: a = 1}, b of [])',
            '(var {\'a\': a = 1} = 1 of [])',
            '(var {\'a\': a = 1}, b of [])',
            '(var {"a": a = 1} = 1 of [])',
            '(var {"a": a = 1}, b of [])',
            '(var {[Symbol.iterator]: a = 1} = 1 of [])',
            '(var {[Symbol.iterator]: a = 1}, b of [])',
            '(var {0: a = 1} = 1 of [])',
            '(var {0: a = 1}, b of [])',
            '(let a = 1 of [])',
            '(let a, b of [])',
            '(let [a] = 1 of [])',
            '(let [a], b of [])',
            '(let [a = 1] = 1 of [])',
            '(let [a = 1], b of [])',
            '(let [a = 1, ...b] = 1 of [])',
            '(let [a = 1, ...b], c of [])',
            '(let {a} = 1 of [])',
            '(let {a}, b of [])',
            '(let {a: a} = 1 of [])',
            '(let {a: a}, b of [])',
            '(let {\'a\': a} = 1 of [])',
            '(let {\'a\': a}, b of [])',
            '(let {"a": a} = 1 of [])',
            '(let {"a": a}, b of [])',
            '(let {[Symbol.iterator]: a} = 1 of [])',
            '(let {[Symbol.iterator]: a}, b of [])',
            '(let {0: a} = 1 of [])',
            '(let {0: a}, b of [])',
            '(let {a = 1} = 1 of [])',
            '(let {a = 1}, b of [])',
            '(let {a: a = 1} = 1 of [])',
            '(let {a: a = 1}, b of [])',
            '(let {\'a\': a = 1} = 1 of [])',
            '(let {\'a\': a = 1}, b of [])',
            '(let {"a": a = 1} = 1 of [])',
            '(let {"a": a = 1}, b of [])',
            '(let {[Symbol.iterator]: a = 1} = 1 of [])',
            '(let {[Symbol.iterator]: a = 1}, b of [])',
            '(let {0: a = 1} = 1 of [])',
            '(let {0: a = 1}, b of [])',
            '(const a = 1 of [])',
            '(const a, b of [])',
            '(const [a] = 1 of [])',
            '(const [a], b of [])',
            '(const [a = 1] = 1 of [])',
            '(const [a = 1], b of [])',
            '(const [a = 1, ...b] = 1 of [])',
            '(const [a = 1, ...b], b of [])',
            '(const {a} = 1 of [])',
            '(cons  {a} = 1 of [])',
            '(const {a = 1 of [])',
            '(const {a} = 1 of of [])',
            '(const {a} = 1 of in [])',
            '(const {a}, b of [])',
            '(const {a: a} = 1 of [])',
            '(const {a: a}, b of [])',
            '(const {\'a\': a} = 1 of [])',
            '(const {\'a\': a}, b of [])',
            '(const {"a": a} = 1 of [])',
            '(const {"a": a}, b of [])',
            '(const {[Symbol.iterator]: a} = 1 of [])',
            '(const {[Symbol.iterator]: a}, b of [])',
            '(const {0: a} = 1 of [])',
            '(const {0: a}, b of [])',
            '(const {a = 1} = 1 of [])',
            '(const {a = 1}, b of [])',
            '(const {a: a = 1} = 1 of [])',
            '(const {a: a = 1}, b of [])',
            '(const {\'a\': a = 1} = 1 of [])',
            '(const {\'a\': a = 1} = 1 of [)',
            '(const {\'a: a = 1} = 1 of [)',
            '(const {\'a\': a = 1}, b of [])',
            '(const {"a": a = 1} = 1 of [])',
            '(const {"a": a = 1}, b of [])',
            '(const {[Symbol.iterator]: a = 1} = 1 of [])',
            '(const {[Symbol.iterator]: a = 1}, b of [])',
            '(const {0: a = 1} = 1 of [])',
            '(const {0: a = 1}, b of [])',
            '(let [...x, y] of [[1, 2, 3]])',
            '(let [...[x], y] of [[1, 2, 3]])',
            '(let [...x, y] of [[1, 2, 3]])',
            '(let [...{ x }, y] of [[1, 2, 3]])',
            '(const [...[ x ] = []] of [[]])',
            '(const [...x, y] of [[1, 2, 3]])',
            '(var [...x = []] of [[]])',
            '(const [...x = []] of [[]])',
            '([[(x, y)]] of [[[]]])',
            '([[(x, y)]] of [[[]])',
            '(let [...x, y] of [[1, 2, 3]])',
            '(let [...[ x ] = []] of (async function*() {yield* [[]];})())',
            '(constt [...[x], y] of (async function*() {  yield* [[1, 2, 3]]; })())',
            '(let [...[x], y] of (async function*() {  yield* [[1, 2, 3]]; })())',
       ];

        for (const arg of Failures) {
            it(`async function f() { for await ${arg} { } } `, () => {
                t.throws(() => {
                    parse(`async function f() { for await ${arg} { } }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await ${arg} { } }`, () => {
                t.throws(() => {
                    parse(`async function * f() { for await ${arg} { } }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await ${arg} { } }`, () => {
                t.throws(() => {
                    parse(`async function * f() { for await ${arg} { } }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { 'use strict'; for await ${arg}; }`, () => {
                t.throws(() => {
                    parse(`async function f() { 'use strict'; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for await ${arg}; }`, () => {
                t.throws(() => {
                    parse(`async function * f() { 'use strict'; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for await ${arg} { } }`, () => {
                t.throws(() => {
                    parse(`async function * f() { 'use strict'; for await ${arg} { } }`, undefined, Context.Empty);
                });
            });
        }

        fail('async function fn() { for await ([[x[yield]]] of [[[]]]) }', Context.Empty, {
            source: 'async function fn() { for await ([[x[yield]]] of [[[]]]) }',
        });

        fail('async function fn() { for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'async function fn() { for await ([ x[yield] ] of [[]]) }',
        });

        fail('async function fn() { for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'async function fn() { for await ([ x[yield] ] of [[]])',
        });

        fail('for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'for await ([ x[yield] ] of [[]]) }',
        });

        fail('for await ([ x[yield] ] in [[]]) }', Context.Empty, {
            source: 'for await ([ x[yield] ] in [[]]) }',
        });

        fail('for await (let [...{ x } = []] = []; a < 1; ) {}', Context.Async, {
            source: 'for await (let [...{ x } = []] = []; a < 1; ) {}',
        });

        fail('for await (let [...{ x } = []] = []; a < 1; ) {}', Context.Strict, {
            source: 'for await (let [...{ x } = []] = []; a < 1; ) {}',
        });
    });

    describe('Pass', () => {

        const test262 = [
            '([ _ = flag1 = true, _ = flag2 = true ] of [[14]])',
            '([ xFnexp = function x() {}, fnexp = function() {} ] of [[]])',
            '([arguments = 4, eval = 5] of [[]])',
            '([[ _ ]] of [[null]])',
            '([[ _ ]] of [[ , ]])',
            '([{ x }] of [[null]])',
            '([{ x }] of [[undefined]])',
            '([{ x }] of [[{ x: 2 }]])',
            '([x.y] of [[23]])',
            `([,] of ['string literal'

        ])`,
            '([...[x]] of [[ , ]])',
            '([...[x]] of [[undefined]])',
            '([...[x]] of [[]])',
            '([...[x[yield]]] of [[86]])',
            '([...{ 0: x, length }] of [[null]])',
            '([...{ 0: x, length }] of [[ , ]])',
            '([ ...a ] of [[]])',
            '({} of [false])',
            `({} of [0
            ])`,
            '({ x } of [{ x: 1 }])',
            '({ x = 1 } of [{ x: null }])',
            '({ x = 1 } of [{ x: 2 }])',
            '({ a } of [{}])',
            '({ x: x[yield] } of [{ x: 23 }])',
            '({ a: x } of [{ a: 1 }])',
            '({ a: x, } of [{ a: 2 }])',
            '({ xy: x.y } of [{ xy: 4 }])',
            '({...rest} of [{}])',
            '(const [[] = function() {}()] of [[[23]]])',
            '(const [[...x] = [2, 1, 3]] of [[]])',
            '(const [x = 23] of [[undefined]])',
            '(const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] of [[]])',
            '(const [...{ 0: v, 1: w, 2: x, 3: y, length: z }] of [[7, 8, 9]])',
            '(const [[,] = g()] of (async function*() { yield* [[[]]]; })())',
            '(const [x = 23] of (async function*() { yield* [[,]]; })())',
            '(const {a, b, ...rest} of (async function*() { yield* [{x: 1, y: 2, a: 5, b: 3}]; })())',
            '(const [x = 23]  of (async function*() { yield* [[,]]; })())',
            '(const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: undefined }])',
            '(const {} of [null])',
            '(let [x] of [{}])',
            '(let [[] = function() {}()] of [[[23]]])',
            '(let [x = 23] of [[]])',
            '(let [w = a(), x = b(), y = c(), z = d()] of [[null, 0, false, \'\']])',
            '(let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]])',
            '(let [...[,]] of [g()])',
            '(let [, ...x] of [(function*() {})()])',
            '(let [[x, y, z] = [4, 5, 6]] of (async function*() {  yield* [[]]; })())',
            '(let [...{ 0: v, 1: w, 2: x, 3: y, length: z }] of (async function*() {yield* [[7, 8, 9]]; })())',
            '(let [[x, y, z] = [4, 5, 6]] of (async function*() {  yield* [[]]; })())',
            '(let { a } of [b])',
            '(let { x: y = function() {} } of [{}])',
            '(let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: undefined }])',
            '(var [[x, y, z] = [4, 5, 6]] of [[[7, 8, 9]]])',
            '(var [x = 23] of [[,]])',
            '(var [x = 23] of [[undefined]])',
            '({ a: x, y } of [{ a: 3 }])',
            '({ x: { y } } of [{ x: { y: 2 } }])',
            '({...src.y} of [{ x: 1, y: 2}])',
            '(const [arrow = () => {}] of [[]])',
        ];

        for (const arg of test262) {

            it(`async function f() { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function f() { for await ${arg} {} }`, undefined, Context.Empty);
                });
            });
        }

        const programs = [
            '(a of [])',
            '(a.b of [])',
            '([a] of [])',
            '([a = 1] of [])',
            '([a = 1, ...b] of [])',
            '({a} of [])',
            '({a: a} of [])',
            '({\'a\': a} of [])',
            '({"a": a} of [])',
            '({[Symbol.iterator]: a} of [])',
            '({0: a} of [])',
            '({a = 1} of [])',
            '({a: a = 1} of [])',
            '({\'a\': a = 1} of [])',
            '({"a": a = 1} of [])',
            '({[Symbol.iterator]: a = 1} of [])',
            '({0: a = 1} of [])',
            '(var a of [])',
            '(var [a] of [])',
            '(var [a = 1] of [])',
            '(var [a = 1, ...b] of [])',
            '(var {a} of [])',
            '(var {a: a} of [])',
            '(var {\'a\': a} of [])',
            '(var {"a": a} of [])',
            '(var {[Symbol.iterator]: a} of [])',
            '(var {0: a} of [])',
            '(var {a = 1} of [])',
            '(var {a: a = 1} of [])',
            '(var {\'a\': a = 1} of [])',
            '(var {"a": a = 1} of [])',
            '(var {[Symbol.iterator]: a = 1} of [])',
            '(var {0: a = 1} of [])',
            '(let a of [])',
            '(let [a] of [])',
            '(let [a = 1] of [])',
            '(let [a = 1, ...b] of [])',
            '(let {a} of [])',
            '(let {a: a} of [])',
            '(let {\'a\': a} of [])',
            '(let {"a": a} of [])',
            '(let {[Symbol.iterator]: a} of [])',
            '(let {0: a} of [])',
            '(let {a = 1} of [])',
            '(let {a: a = 1} of [])',
            '(let {\'a\': a = 1} of [])',
            '(let {"a": a = 1} of [])',
            '(let {[Symbol.iterator]: a = 1} of [])',
            '(let {0: a = 1} of [])',
            '(const a of [])',
            '(const [a] of [])',
            '(const [a = 1] of [])',
            '(const [a = 1, ...b] of [])',
            '(const {a} of [])',
            '(const {a: a} of [])',
            '(const {\'a\': a} of [])',
            '(const {"a": a} of [])',
            '(const {[Symbol.iterator]: a} of [])',
            '(const {0: a} of [])',
            '(const {a = 1} of [])',
            '(const {a: a = 1} of [])',
            '(const {\'a\': a = 1} of [])',
            '(const {"a": a = 1} of [])',
            '(const {[Symbol.iterator]: a = 1} of [])',
            '(const {0: a = 1} of [])',
            '(let x in y)',
            '(let x of y)',

        ];

        for (const arg of programs) {
            it(`async function f() { 'use strict'; let a; for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function f() { 'use strict'; let a; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { let a; for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function f() { let a; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function f() { for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { let a; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { let a; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { let a; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { let a; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { 'use strict'; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function f() { 'use strict'; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await\n ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { for await\n ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { 'use strict'; let a; for await\n ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function f() { for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function f() { for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for await ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { 'use strict'; for await ${arg}; }`, undefined, Context.Empty);
                });
            });

            it(`async function * f() { 'use strict'; for\nawait ${arg}; }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * f() { 'use strict'; for\nawait ${arg}; }`, undefined, Context.Empty);
                });
            });
        }

        fail('for await (const line of readLines(filePath)) {\n  console.log(line);\n}', Context.Empty, {
            source: 'for await (const line of readLines(filePath)) {\n  console.log(line);\n}',
       });

        fail('for await (const line of readLines(filePath)) {\n  console.log(line);\n}', Context.Empty, {
        source: 'for await (const line of readLines(filePath)) {\n  console.log(line);\n}',
        });
        });
});

import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

describe('Expressions - Generators', () => {

    describe('Failures', () => {

        const invalidSyntax = [
            `f = function*([...{ x } = []]) {}`,
            `f = function*([...{ x } = []] = []) {}`,
            `f = function*([...x = []] = []) {}`,
            `f = function*([...x, y] = [1, 2, 3]) {}`,
            `f = function*([...{ x }, y] = [1, 2, 3]) {}`,
            `f = function*([...{ x } = []]) {}`,
            `var gen = function *g() {
                var yield;
              };`,
            `var g = function*() { yield 3 + yield 4; };`,
            `'use strict'; (function *g() { ( x, y=yield ) => {} });`,
            '(function *g() { ( x, y=yield ) => {} });',
            '"use strict"; (function *g() { ( x = class { [(yield, 1)]() { }  ) => {} });',
            'var g = function*(yield) {};',
            'var gen = function *() { void yield; };',
            'let gfe = function* yield() { }',
        ];

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            `var gen = function *() {
                yield [...yield yield];
              };`,
              `(function* () { yield\nv })`,
              `var gen = function *() {
                yield [...yield];
              };`,
              '(function* () { yield *v });',
              '(function* () { fn(yield); });',
              '(function* () { yield; });',
              '(function* () { yield yield 10 });',
              '(function* () { yield });',
              '(function* () { yield v });',
              '(function* () { yield; });',
              `var g1 = function*() { yield; };
                var g2 = function*() { yield 1; };`,
                `var g = function*() {
                    ({  yield: 1 });
                  };`,
                  `var gen = function *() {
                    yield {
                        ...yield,
                        y: 1,
                        ...yield yield,
                      };
                  };`,
                '(function* () { yield *v });',
                `var gfe = function* () { switch (1) { case yield: break; } }`,
                `var gfe = function* () { switch (1) { case yield* 'foo': break; } }`,
                `var o = { *gf() { yield* 'foo'; } }`,
                `f = function*([[,] = g()]) {}`,
                `f = function*([[x, y, z] = [4, 5, 6]]) {}`,
                `f = function*([[] = function() { return  function*() {}(); }()]) {}`,
                `f = function*([[] = function() {}()]) {}`,
                `f = function*([x = 23]) {}`,
                `f = function*([...[x, y, z]]) {}`,
                `f = function*([...x]) {}`,
                `f = function*([[,] = g()] = []) {}`,
                `f = function*([,]) {}`,
                `var f = function*([...x]) {};`,
                `f = function*([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {}`,
                `f = function*([[...x] = function() { initCount += 1; }()] = [[2, 1, 3]]) {}`,
                `f = function*([x = 23] = [,]) {}`,
                `f = function*([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}`,
                `f = function*({ w: [x, y, z] = [4, 5, 6] } = {}) {}`,
                `f = function*({ x, } = { x: 23 }) {}`,
                `f = function*({ x: y = 33 } = { }) {}`,
                `f = function*({a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3}) {}`,
                `var f = function*({}) {};`,
                `f = function*({ w: [x, y, z] = [4, 5, 6] }) {}`,
                `f = function*({ x: y }) {}`,
                `var f = function *(a) { yield a+1; return; };`,
                `var gen = function *g() {
                    yield [...yield];
                  };`,
                `var gen = function *g() {
                    yield {
                        ...yield,
                        y: 1,
                        ...yield yield,
                      };
                  };`,
                `var gen = function *g() {
                    yield [...yield];
                  };`,
                `ref = function*(a,) {};`,
                `var g1 = function*() { yield; };
                var g2 = function*() { yield 1; };`,
                `var g = function*() { yield yield 1; };`,
                `var gen = function *() {
                    yield {
                        ...yield,
                        y: 1,
                        ...yield yield,
                      };
                  };`,
                `var g = function*() {
                    yield *
                    g2();
                  };
                  var g2 = function*() {};`,
        ];

        for (const arg of validSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });
});
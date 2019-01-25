import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Statements - For await of', () => {
  fail('Statements - For await of (fail)', [
    [
      'async function fn() { for await (var [...[ x ] = []] of (async function*() { yield* [[]]; })()) {}}',
      Context.Strict
    ]
  ]);

  for (const arg of [
    'for await ([v2 = 10, vNull = 11, vHole = 12, vUndefined = 13, vOob = 14] of [[2, null, , undefined]]) {}',
    'for await ([ a = x += 1, b = x *= 2 ] of [[]]) {}',
    'for await ([ a = x += 1, b = x *= 2 ] of [[]]) {}',
    'for await ([[ _ ]] of [[ , ]]) {}',
    'for await ([[ x ]] of [[]]) {}',
    'for await ([{ x }] of [[null]]) {}',
    'for await ([{ x }] of [[ , ]]) {}',
    'for await ([{ x = yield }] of [[{}]]) {}',
    'for await ([{ x }] of [[{ x: 2 }]]) {}',
    `for await ([] of ["foo"
    ]) {}`,
    'for await ({ xCls = class x {}, cls = class {}, xCls2 = class { static name() {} } } of [{}]) {}',
    'for await ([...{ 0: x, length }] of [[]]) {}',
    'for await ({} of [false]) {}',
    'for await ({ w, x, y } of [{ x: 5 }]) {}',
    'for await ({ xCover = (0, function() {}), cover = (function() {}) } of [{}]) {}',
    'for await ({ eval = 3, arguments = 4 } of [{}]) {}',
    'for await ({ unresolvable } of [{}]) {}',
    'for await ({ eval = 3, arguments = 4 } of [{}]) {}',
    'for await ({ x = yield } of [{}]) {}',
    'for await ({ y: x = 1 } of [{ y: null }]) {}',
    'for await ({ x: x[yield] } of [{ x: 23 }]) {}',
    'for await ({ x: { x = yield } } of [{ x: {} }]) {}',
    'for await ({...src.y} of [{ x: 1, y: 2}]) {}',
    'for await (const [x] of [iter]) {}',
    'for await (const [[x]] of [[null]]) {}',
    'for await (const [x = 23] of [[,]]) {}',
    'for await (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[{ x: 11, y: 22, z: 33 }]]) {}',
    'for await (const [...[,]] of [g()]) {}',
    'for await (const [...x] of [[1, 2, 3]]) {}',
    'for await (const [x] of (async function*() { yield* [[]]; })()) {}',
    'for await (const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] of (async function*() { yield* [[{ u: 777, w: 888, y: 999 }]]; })()) {}',
    'for await (const { cover = (function () {}), xCover = (0, function() {})  } of (async function*() { yield* [{}]; })()) {}',
    'for await (const { w: [x, y, z] = [4, 5, 6] } of (async function*() { yield* [{ w: [7, undefined, ] }]; })()) {}',
    'for await (let [[...x] = function() {}()] of [[[2, 1, 3]]]) {}',
    'for await (let [x = 23] of [[]]) {}',
    'for await (let [...[]] of [function*() {}()]) {}',
    `for await (let [x] of (async function*() {
      yield* [{}];
    })()) {}`,
    'for await (let [x = 23] of (async function*() { yield* [[undefined]]; })()) {}',
    'for await (let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of (async function*() { yield* [[{ x: 11, y: 22, z: 33 }]]; })()) {}',
    'for await (let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {}',
    'for await (var [cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] of [[]]) {}',
    'for await (var [x] of [[]]) {}',
    'for await (var { w: { x, y, z } = undefined } of [{ }]) { return; }',
    'for await ([ xGen = function* x() {}, gen = function*() {} ] of [[]]) {}',
    'for await ({} of [false]) {}',
    'for await ({ x, y } of [{ x: 3 }]) {}',
    'for await ({ xCover = (0, function() {}), cover = (function() {}) } of [{}]) {}',
    'for await ({ y: x = 1 } of [{ y: 2 }]) {}',
    'for await ({ x: { x = yield } } of [{ x: {} }]) {}',
    'for await (const [cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] of [[]]) {}',
    'for await (const [{ x }] of [[null]]) {}',
    'for await (const [...{ 0: v, 1: w, 2: x, 3: y, length: z }] of [[7, 8, 9]]) {}',
    'for await (const {} of [undefined]) {}',
    'for await (const { x, } of [{ x: 23 }]) {}',
    'for await (const { w: { x, y, z } = { x: 4, y: 5, z: 6 } } of [{ w: { x: undefined, z: 7 } }]) {}',
    'for await (let [{ x, y, z } = { x: 44, y: 55, z: 66 }] of (async function*() { yield* [[{ x: 11, y: 22, z: 33 }]]; })()) {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`async function fn() { ${arg} }`, undefined, Context.Empty);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`async function *fn() { ${arg} }`, undefined, Context.Empty);
      });
    });
  }
});

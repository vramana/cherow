import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Module - Export', () => {

    describe('Failures', () => {

        const failures = [
            'export {',
            'export async;',
            'var a; export { a',
            'var a; export { a,',
            'var a; export { a, ;',
            'var a; export { a as };',
            'var a, b; export { a as , b};',
            'class C { method() { export default null; } }',
            '{ export default null; }',
            'class C { *method() { export default null; } }',
            `for (const x = 0; false;)
            export default null;`,
            'switch(0) { case 1: export default null; default: }',
            'switch(0) { case 1: export default null; default: }',
            'export }',
            'var foo, bar; export { foo bar };',
            'export { , };',
            'export default;',
            'export default var x = 7;',
            'export default let x = 7;',
            'export default const x = 7;',
            'export *;',
            'export * from;',
            'export { Q } from;',
            'export default from \'module.js\';',
            'export { for }',
            'export { for as foo }',
            'export * as z from "c";',
            'export function() {}',
            'export function*() {}',
            'export class {}',
            'export class extends C {}',
            'export default (function * yield() {})',
            'export default (async function await() {})',
            'export default (async function *await() {})',
            'export default async function await() {}',
            'export async function await() {}',
            'export async function() {}',
            'export async',
            'export async\nfunction async() { await 1; }',
            'export * as namespace from \'./foo\' null;',
            'export {try};',
            'export * +',
            'export default from "foo"',
            'export {default}',
            'export {try as bar};',
            'export var await',
            'export typeof foo;',
            'export new Foo();',
            'export *',
            'export { default }',
            'export { if }',
            'export { default as foo }',
            'export { if as foo }',
            'export * from foo',
            'export { bar } from foo',
            'export const const1;',
            'function foo() { }; export foo;',
            'export function () { }',
            'export function* () { }',
            'export B, * as A, { C, D } from "test";',
            // missing binding identifier
            'export class { }',
            'function foo() { }; export [ foo ];',
            'function foo() { export default function() { } }',
            'function foo() { }; export { , foo };',
            'function foo() { }; () => { export { foo }; }',
            'function foo() { }; try { export { foo }; } catch(e) { }',
            // 'Syntax error if export is followed by non-identifier'
            'export 12;',
            'function foo() { }; export { foo as 100 };',
        ];

        for (const arg of failures) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }

        fail('import "foo"', Context.Empty, {
            source: 'import "foo"',
        });

        fail('import icefapper from 12', Context.Strict | Context.Module, {
            source: 'import icefapper from 12',
        });

        fail('import { x }, def from "foo";', Context.Strict | Context.Module, {
            source: 'import { x }, def from "foo";',
        });

        fail('import default from "foo"', Context.Strict | Context.Module, {
            source: 'import default from "foo"',
        });

        fail('import { for } from "foo";', Context.Strict | Context.Module, {
            source: 'import { for } from "foo";',
        });

        fail('import };', Context.Strict | Context.Module, {
            source: 'import };',
        });
    });

    describe('Pass', () => {
        const programs = [
            'export let x = 0;',
            'export var y = 0;',
            'export const z = 0;',
            'export default x;',
            'export function func() { };',
            'export class C { };',
            'export { };',
            'export { x as default };',
            'function f() {}; f(); export { f };',
            'var a, b, c; export { a, b as baz, c };',
            'var d, e; export { d as dreary, e, };',
            'export default function f() {}',
            'export default function() {}',
            'export default function *a() {}',
            'export var foo = function () {};',
            'export default function*() {}',
            'export default class C {}',
            'export default class {}',
            'export default class extends C {}',
            'export default 42',
            'var x; export default x = 7',
            'export { Q } from \'somemodule.js\';',
            'export * from \'somemodule.js\';',
            'var foo; export { foo as for };',
            'export { arguments } from \'m.js\';',
            'export {foo, bar,};',
            'export { for } from \'m.js\';',
            'export { yield } from \'m.js\'',
            'export { static } from \'m.js\'',
            'export { let } from \'m.js\'',
            'export default [];',
            'export default 42;',
            'export default { foo: 1 };',
            'export * from "foo";',
            'export {default} from "foo";',
            'export {foo as bar} from "foo";',
            'export function *foo () {}',
            'export var foo = 1;',
            'var a; export { a as b, a as c };',
            'var a; export { a as await };',
            'var a; export { a as enum };',
            'export {thing}; import thing from \'a.js\';',
            'export {thing}; import {thing} from \'a.js\';',
            'export {thing}; import * as thing from \'a.js\';',
            'export { x as y };',
            'export { a as b } from \'m.js\';',
            'export * from \'p.js\';',
            'export var foo;',
            'export function goo() {};',
            'export let hoo;',
            'export const joo = 42;',
            'export default (function koo() {});',
            'export {aa as bb, x};',
            'export {foob};',
            'export var document',
            'export var document = {}',
            'export var document',
            'export default async function() { await 1; }',
            'export default async function async() { await 1; }',
            'export async function async() { await 1; }',
            'export let document = { }',
            'export const document = { }',
            'export class Class {}',
            'export default 42',
            'export default class A {}',
            'export default (class{});',
            'export { a, b }',
            'export { a as default }',
            'export { a, b as dec }',
            'export { default } from "other"',
            'export default function foo() {} false',
            'export default /foo/',
            'export var namedOther = null;',
            'export var starAsVarDecl;',
            'export let starAsLetDecl;',
            'export const starAsConstDecl = null;',
            'export function starAsFuncDecl() {}',
            'export function* starAsGenDecl() {}',
            'export class starAsClassDecl {}',
            'export { starAsBindingId };',
            'export { starAsBindingId as starIdName };',
            'export default class Foo {}++x',
            'export { x as y } from \'./y.js\';\nexport { x as z } from \'./z.js\';',
            'export { default as y } from \'./y.js\';\nexport default 42;',
            'export default function(x) {};',
            'export {a as super }',
            'export default function () { };',
            'export default function _fn2 () { }',
            'var a; export default a = 10;',
            'export default () => 3',
            'function _default() { }; export default _default',
            // Named generator function statement
            'function* g() { }; export default g',
            'class c { }; export default c',
            'var _ = { method: function() { return \'method_result\'; }, method2: function() { return \'method2_result\'; } }; export default _',
        ];

        for (const arg of programs) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Strict | Context.Module);
                });
            });
        }
    });
});

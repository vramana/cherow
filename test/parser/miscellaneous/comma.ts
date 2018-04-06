import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Trailing comma', () => {

    describe('Failure', () => {

        const TrailingCommasInParameters = [
            ' function  a(b,,) {}',
            ' function* a(b,,) {}',
            '(function  a(b,,) {});',
            '(function* a(b,,) {});',
            '(function   (b,,) {});',
            '(function*  (b,,) {});',
            ' function  a(b,c,d,,) {}',
            ' function* a(b,c,d,,) {}',
            '(function  a(b,c,d,,) {});',
            '(function* a(b,c,d,,) {});',
            '(function   (b,c,d,,) {});',
            '(function*  (b,c,d,,) {});',
            '(b,,) => {};',
            '(b,c,d,,) => {};',
            'a(1,,);',
            'a(1,2,3,,);',
            ' function  a1(,) {}',
            ' function* a2(,) {}',
            '(function  a3(,) {});',
            '(function* a4(,) {});',
            '(function    (,) {});',
            '(function*   (,) {});',
            '(,) => {};',
            'a1(,);',
            ' function  a(...b,) {}',
            ' function* a(...b,) {}',
            '(function  a(...b,) {});',
            '(function* a(...b,) {});',
            '(function   (...b,) {});',
            '(function*  (...b,) {});',
            ' function  a(b, c, ...d,) {}',
            ' function* a(b, c, ...d,) {}',
            '(function  a(b, c, ...d,) {});',
            '(function* a(b, c, ...d,) {});',
            '(function   (b, c, ...d,) {});',
            '(function*  (b, c, ...d,) {});',
            '(...b,) => {};',
            '(b, c, ...d,) => {};',
            '(,);',
            '(a,);',
            '(a,b,c,);',
        ];

        for (const arg of TrailingCommasInParameters) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`function foo() {${arg}}`, () => {
                t.throws(() => {
                    parse(`function foo() {${arg}}`, undefined, Context.Empty);
                });
            });

            it(`function foo() {'use strict'; ${arg}}`, () => {
                t.throws(() => {
                    parse(`function foo() {'use strict'; ${arg}}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const TrailingCommasInParameters = [
            ' function  a(b,) {}',
            ' function* a(b,) {}',
            '(function  a(b,) {});',
            '(function* a(b,) {});',
            '(function   (b,) {});',
            '(function*  (b,) {});',
            ' function  a(b,c,d,) {}',
            ' function* a(b,c,d,) {}',
            '(function  a(b,c,d,) {});',
            '(function* a(b,c,d,) {});',
            '(function   (b,c,d,) {});',
            '(function*  (b,c,d,) {});',
            '(b,) => {};',
            '(b,c,d,) => {};',
            'a(1,);',
            'a(1,2,3,);',
            'a(...[],);',
            'a(1, 2, ...[],);',
            'a(...[], 2, ...[],);',
        ];

        for (const arg of TrailingCommasInParameters) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`function foo() {${arg}}`, () => {
                t.doesNotThrow(() => {
                    parse(`function foo() {${arg}}`, undefined, Context.Empty);
                });
            });

            it(`function foo() {'use strict'; ${arg}}`, () => {
                t.doesNotThrow(() => {
                    parse(`function foo() {'use strict'; ${arg}}`, undefined, Context.Empty);
                });
            });
        }

        const programs = [
            'a,',
            '{a}, {b}, ',
            '{a} = {a: 30}, {b} = {b: 40}, ',
            '[a], ',
            '[a] = [30], ',
            '[a] = [30], [b] = [40], ',
            'a, b, ',
            'a = 30, ',
            //"...a,",
            //", ",
            //", a",
            //"a..., , ",
            //"a, ...b,",
        ];

        for (const arg of programs) {

            it(`({ m(${arg}) {} })`, () => {
                t.doesNotThrow(() => {
                    parse(`({ m(${arg}) {} })`, undefined, Context.Empty);
                });
            });

            it(`(class { static * m(${arg}) {} })`, () => {
                t.doesNotThrow(() => {
                    parse(`(class { static * m(${arg}) {} })`, undefined, Context.Empty);
                });
            });

            it(`function* f(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parse(`function* f(${arg}) {}`, undefined, Context.Empty);
                });
            });

            it(`async function f(${arg}) {}`, () => {
                t.doesNotThrow(() => {
                    parse(`async function f(${arg}) {}`, undefined, Context.Empty);
                });
            });

            it(`fun = (${arg}) => {}`, () => {
                t.doesNotThrow(() => {
                    parse(`fun = (${arg}) => {}`, undefined, Context.Empty);
                });
            });

            it(`let fun = (${arg}) => foo`, () => {
                t.doesNotThrow(() => {
                    parse(`let fun = (${arg}) => foo`, undefined, Context.Empty);
                });
            });

        }

    });
});
import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - Async generators', () => {

    describe('Failures', () => {

        const Failures = [
            'var yield;',
            'var await;',
            'var foo, yield;',
            'var foo, await;',
            'try { } catch (yield) { }',
            'try { } catch (await) { }',
            'function yield() { }',
            '(async function * yield() { })',
            '(async function * await() { })',
            'async function * foo(yield) { }',
            '(async function * foo(yield) { })',
            'async function * foo(await) { }',
            '(async function * foo(await) { })',
            'yield = 1;',
            'await = 1;',
            'var foo = yield = 1;',
            'var foo = await = 1;',
            '++yield;',
            'yield++;',
            'await++;',
            'yield *',
            '(yield *)',
            'yield 3 + yield 4;',
            'yield: 34',
            'yield ? 1 : 2',
            'yield / yield',
            '+ yield',
            '+ yield 3',
            'yield\n*3',
            'var [yield] = [42];',
            'var [await] = [42];',
            'var {foo: yield} = {a: 42};',
            'yield\n{yield: 42}',
            'yield /* comment */\n {yield: 42}',
            'yield //comment\n {yield: 42}',
            'var {foo: await} = {a: 42};',
            '[yield] = [42];',
            '[await] = [42];',
            '({a: yield} = {a: 42});',
            '({a: await} = {a: 42});',
            'var [yield 24] = [42];',
            'var [await 24] = [42];',
            'var {foo: yield 24} = {a: 42};',
            'var {foo: await 24} = {a: 42};',
            '[yield 24] = [42];',
            '[await 24] = [42];',
            '({a: yield 24} = {a: 42});',
            '({a: await 24} = {a: 42});',
            '({ await })',
            'yield --> comment ',
            '(yield --> comment)',
           'yield /* comment */ --> comment ',
            'for (yield \'x\' in {});',
            'for (await \'x\' in {});',
            'for (yield \'x\' of {});',
            'for (await \'x\' of {});',
            'for (yield \'x\' in {} in {});',
            'for (await \'x\' in {} in {});',
            'for (yield \'x\' in {} of {});',
            'for (await \'x\' in {} of {});',
            'class C extends yield { }',
        ];

        for (const arg of Failures) {
            it(`async function * gen() { ${arg} } `, () => {
                t.throws(() => {
                    parse(`async function * gen() { ${arg} } `, undefined, Context.Empty);
                });
            });

            it(`"use strict"; async function * gen() { ${arg} } `, () => {
                t.throws(() => {
                    parse(`"use strict"; async function * gen() { ${arg} } `, undefined, Context.Empty);
                });
            });

            it(`async function * gen() { ${arg} } `, () => {
                t.throws(() => {
                    parse(`async function * gen() { ${arg} } `, undefined, Context.Strict | Context.Module);
                });
            });
        }

        fail('async function* f(...x = []) { }', Context.Empty, {
            source: 'async function* f(...x = []) { }',
        });

        fail('async function* eval() { "use strict"; }', Context.Empty, {
            source: 'async function* eval() { "use strict"; }',
        });

        fail('async function fn() { for await ([ x[yield] ] of [[]]) }', Context.Empty, {
            source: 'async function fn() { for await ([ x[yield] ] of [[]]) }',
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

        const programs = [
            'yield 2;',
            'yield * 2;',
            'yield * \n 2;',
            'yield * \r 2;',
            'yield * \t 2;',
            'yield * \n\f\r 2;',
            'yield * \f\n\r 2;',
            'yield yield 1;',
            'yield * yield * 1;',
            'yield 3 + (yield 4);',
            'yield 3 + (yield 4) + 4;',
            'yield * 3 + (yield * 4);',
            '(yield * 3) + (yield * 4);',
            'yield 3; yield 4;',
            'yield * 3; yield * 4;',
            '(function (yield) { })',
            '(function yield() { })',
            '(function (await) { })',
            '(function await() { })',
            'yield { yield: 12 }',
            'yield /* comment */ { yield: 12 }',
            'class C extends await { }',
            'yield * \n { yield: 12 }',
            'yield /* comment */ * \n { yield: 12 }',
            'yield 1; return',
            'yield 1; return;',
            'yield * 1; return',
            'yield * 1; return;',
            'yield 1; return 7',
            'yield * 1; return 7',
            'yield 1; return 7; yield \'foo\';',
            'yield * 1; return 3; yield * \'foo\';',
            '({ yield: 1 })',
            '({ yield })',
            '({ get yield() { } })',
            '({ await: 1 })',
            '({ get await() { } })',
            '({ [yield]: x } = { })',
            '({ [await 1]: x } = { })',
            'yield',
            'yield\n',
            'yield /* comment */',
            'yield // comment\n',
            'yield // comment\n\r\f',
            '(yield)',
            '[yield]',
            '{yield}',
            'yield, yield',
            'yield; yield',
            'yield; yield; yield; yield;',
            '(yield) ? yield : yield',
            '(yield) \n ? yield : yield',
            'yield\nfor (;;) {}',
            'await 10',
            'await 10; return',
            'await 10; return 20',
            'await 10; return 20; yield \'foo\'',
            'await (yield 10)',
            'await (  yield     10  ) ',
            'await (yield 10); return',
            'await (yield 10); return 80',
            'await (yield 10); return 50; yield \'foo\'',
            'yield await 10',
            'yield await 10; return',
            'yield await 10; return;',
            'yield await 10; return 10',
            'yield await 10; return 10; yield \'foo\'',
            'await /* comment */ 10',
            'await // comment\n 10',
            'yield await /* comment\n */ 10',
            'yield await // comment\n 10',
            'await (yield /* comment */)',
            'await (yield // comment\n)',
            'for await (x of xs);',
            'for await (let x of xs);',
            'await a; yield b;',
        ];

        for (const arg of programs) {
            it(`async function * gen() { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parse(`async function * gen() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`(async function * () { ${arg} })`, () => {
              t.doesNotThrow(() => {
               parse(`(async function * () { ${arg} })`, undefined, Context.Empty);
             });
             });

            it(`(async function * gen() { ${arg} })`, () => {
              t.doesNotThrow(() => {
                parse(`(async function * gen() { ${arg} })`, undefined, Context.Empty);
            });
            });

            it(`({ async * gen () { ${arg} } })`, () => {
              t.doesNotThrow(() => {
                parse(`({ async * gen () { ${arg} } })`, undefined, Context.Empty);
            });

            });
        }

    });
});

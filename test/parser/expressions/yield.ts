import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

// NOTE! Several tests that doesn't fail in here now. I will fix this as soon as I know everything
// parses as it should

describe('Expressions - Yield', () => {

    describe('Failures', () => {

        const StrictErrors = [
            'var yield;',
            'var foo, yield;',
            'try { } catch (yield) { }',
            'function yield() { }',
            '(function yield() { })',
            'function foo(yield) { }',
            'function foo(bar, yield) { }',
            'function * yield() { }',
            '(function * yield() { })',
            'yield = 1;',
            'var foo = yield = 1;',
            '++yield;',
            'yield++;',
            'yield: 34;',
        ];

        for (const arg of StrictErrors) {
            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; function foo() { ${arg}}`, () => {
                t.throws(() => {
                    parse(`"use strict"; function foo() { ${arg}}`, undefined, Context.Empty);
                });
            });

            it(`function foo() { "use strict"; ${arg} }`, () => {
                t.throws(() => {
                    parse(`function foo() { "use strict"; ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (function not_gen() {${arg}})`, () => {
                t.throws(() => {
                    parse(`"use strict"; (function not_gen() {${arg}})`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (function * gen() { function not_gen() { ${arg}} }`, () => {
                t.throws(() => {
                    parse(`"use strict"; (function * gen() { function not_gen() { ${arg}} }`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (function * gen() { (function not_gen() { ${arg}}) })`, () => {
                t.throws(() => {
                    parse(`"use strict"; (function * gen() { (function not_gen() { ${arg}}) })`, undefined, Context.Empty);
                });
            });
        }

        const invalidSyntax = [
            'var obj = { *g(yield) {} };',
            'function *a(){yield\n*a}',
            'var obj = { *g(yield) {} };',
            'function *g() { try {} catch (yield) {} }',
            '(function *(x, ...yield){})',
            'function *g(a, b, c, ...yield){}',
            '"use strict"; (yield) => 42',
            `var obj = { *g(yield) {} };`,
            `"use strict"; function not_gen() { (function yield() { }) }`,
            '"use strict"; function not_gen() { function foo(bar, yield) { } }',
            '"use strict"; function not_gen() { try { } catch (yield) { } }',
            '"use strict"; function not_gen() { function yield() { } }',
            '"use strict"; var [yield] = [42];',
            '"use strict"; function not_gen() { function yield() { } }',
            'function test_func() { "use strict"; function * yield() { } }',
            'function test_func() { "use strict"; function * yield() { } }',
            '"use strict"; function * gen() { function not_gen() { function foo(yield) { } }',
            '"use strict"; function * gen() { function not_gen() {  yield = 1;}',
            '"use strict"; function * gen() { function not_gen() { try { } catch (yield) { } }',
            'function *a(){yield*}',
            '(a = yield 3) {}',
            '(yield 3) {}',
            '(a = yield) {}',
            '(yield = 1) {}',
            '(yield) {}',
        ];

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        const yieldInParameters = [
            `(a = yield) => {}`,
            `(a = yield /a/g) => {}`, // Should parse as division, not yield expression with regexp.
            `yield => {};`,
            `(yield) => {};`,
            `(yield = 0) => {};`,
            `([yield]) => {};`,
            `([yield = 0]) => {};`,
            `([...yield]) => {};`,
            `({a: yield}) => {};`,
            // `({yield}) => {};`, // generator issue!!
            // `({yield = 0}) => {};`, // generator issue!!
        ];

        const yieldInBody = [
            // `() => yield;`,
            // `() => yield /a/g;`,
            `() => { var x = yield; }`,
            `() => { var x = yield /a/g; }`,

            `() => { var yield; };`,
            //     `() => { var yield = 0; };`,
            `() => { var [yield] = []; };`,
            `() => { var [yield = 0] = []; };`,
            `() => { var [...yield] = []; };`,
            `() => { var {a: yield} = {}; };`,
            `() => { var {yield} = {}; };`,
            //   `() => { var {yield = 0} = {}; };`,

            `() => { let yield; };`,
            //   `() => { let yield = 0; };`,
            `() => { let [yield] = []; };`,
            `() => { let [yield = 0] = []; };`,
            `() => { let [...yield] = []; };`,
            `() => { let {a: yield} = {}; };`,
            `() => { let {yield} = {}; };`,
            // `() => { let {yield = 0} = {}; };`,

            `() => { const yield = 0; };`,
            `() => { const [yield] = []; };`,
            `() => { const [yield = 0] = []; };`,
            `() => { const [...yield] = []; };`,
            `() => { const {a: yield} = {}; };`,
            `() => { const {yield} = {}; };`,
            // `() => { const {yield = 0} = {}; };`,
        ];

        for (const test of [...yieldInParameters, ...yieldInBody]) {

            // Script context.
            it(`"use strict"; ${test}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${test}`, undefined, Context.Empty);
                });
            });

            // Function context.
            it(`"use strict"; function f() { ${test} }`, () => {
                t.throws(() => {
                    parse(`"use strict"; function f() { ${test} }`, undefined, Context.Empty);
                });
            });

            // Generator
            it(`"use strict"; function* g() { ${test} }`, () => {
                t.throws(() => {
                    parse(`"use strict"; function* g() { ${test} }`, undefined, Context.Empty);
                });
            });
        }

        // Generator context.
        for (const test of yieldInParameters) {
            it(`function* g() { ${test} }`, () => {
                t.throws(() => {
                    parse(`function* g() { ${test} }`, undefined, Context.Empty);
                });
            });
        }

        for (const arg of ['(function * yield() { })']) {
            it(`function not_gen() { ${arg}}`, () => {
                t.throws(() => {
                    parse(`function a() { ${arg}}`, undefined, Context.Empty);
                });
            });
        }

        fail('function* g() { yield = 1; }', Context.Empty, {
            source: 'function* g() { yield = 1; }',
        });

        fail('function *a(){yield\n*a}', Context.Empty, {
            source: 'function *a(){yield\n*a}',
        });

        fail('function *a(){yield*}', Context.Empty, {
            source: 'function *a(){yield*}',
        });

        fail('"use strict"; +yield;', Context.Empty, {
            source: '"use strict"; +yield;',
        });

        fail('"use strict"; var [yield] = 0;', Context.Empty, {
            source: '"use strict"; var [yield] = 0;',
        });

        fail('"use strict"; yield:0;', Context.Empty, {
            source: '"use strict"; yield:0;',
        });

        fail('"use strict"; function a(a=yield){}}', Context.Empty, {
            source: '"use strict"; function a(a=yield){}}',
        });

        fail('"use strict"; function a(yield){}}', Context.Empty, {
            source: '"use strict"; function a(yield){}}',
        });

        fail('"use strict"; function a([yield]){}', Context.Empty, {
            source: '"use strict"; function a([yield]){}',
        });

        /*fail('"use strict"; function a({yield}){}', Context.Empty, {
            source: '"use strict"; function a({yield}){}',
        });

        fail('"use strict"; function a({yield=0}){}', Context.Empty, {
            source: '"use strict"; function a({yield=0}){}',
        });

        fail('"use strict"; function a({a:yield}){}', Context.Empty, {
            source: '"use strict"; function a({a:yield}){}',
        });*/

        fail('"use strict"; function a([yield,...a]){}', Context.Empty, {
            source: '"use strict"; function a([yield,...a]){}',
        });
        /*
                fail('function* g(){ (a = yield) => 0; }', Context.Empty, {
                    source: 'function* g(){ (a = yield) => 0; }',
                });

                fail('function* g(){ (a = yield b) => 0; }', Context.Empty, {
                    source: 'function* g(){ (a = yield b) => 0; }',
                });*/

        fail('function* g(){ !function*(a = yield){} }', Context.Empty, {
            source: 'function* g(){ !function*(a = yield){} }',
        });

        // fail('function* g(){ !function*(a = x + f(yield)){} }', Context.Empty, {
        //  source: 'function* g(){ !function*(a = x + f(yield)){} }',
        // });

        // fail('function* g(){ !function*({a = yield}){} }', Context.Empty, {
        //  source: 'function* g(){ !function*({a = yield}){} }',
        // });
    });

    describe('Pass', () => {

        const validSyntax = [
            `function* f() {
                let result;
                while (1) {
                    result = yield result;
                }
            }`,
            `function* g() {
                yield arguments[0];
                yield arguments[1];
                yield arguments[2];
                yield arguments[3];
              }`,
              `function * foo() { var v = { [yield]: foo } }`,
              '(function not_gen() { ({ get yield() { 1 } }) })',
              '(function * gen() { (function not_gen() { try { } catch (yield) { } }) })',
              'function *a(){yield 0}',
              'function * gen() { yield a; }',
              'function * gen() { yield * \n a; }',
              'function * gen() { yield yield a; }',
              'function * gen() { (yield * a) + (yield * b);; }',
              'function * gen() { yield * a; return }',
              'function * gen() { yield, yield }',
              'function * gen() { (yield) ? yield : yield }',
              'function * gen() { yield /* comment */ }',
              'function * gen() { (yield) \n ? yield : yield }',
              'x = class extends (a) {}',
              'function * gen() { (yield) }',
              'function *a(){yield null}',
              'function *a(){yield+0}',
              'function *a(){yield "a"}',
              'function *a(){yield delete 0}',
              'function *a(){yield typeof 0}',
              'function *a(){yield 2e308}',
              'function*a(){yield*a}',
              'function a(){yield*a}',
              'function *a(){({get b(){yield}})}',
              'function a(){({*[yield](){}})}',
              'function *a(){({*[yield](){}})}',
              'function *a(){({set b(yield){}})}',
              'function *a(){yield delete 0}',
              `yield: 34`,
              'function yield(yield) { yield: yield (yield + yield(0)); }',
              '({ get yield() { 1 } })',
              `yield[100]`,
              'try { } catch (yield) { }',
              'var foo = yield = 1;',
              'function foo(bar, yield) { }',
              'yield = 1;',
              '++yield;',
              'function *a(){yield ++a;}',
              'function * gen() { yield * 2; }',
              'function * gen() { (yield * 3) + (yield * 4); }',
              'function * gen() { ({ yield: 1 }) }',
              '(function * () { x = class extends (yield) {} });',
              '(function * () { x = class extends (a ? null : yield) { } });',
              '(function * () { yield * 1; return 37; yield * "icefapper"; });',
              '(function * () { ({ [yield]: x } = { }) });',
              'function* g(){ x ? yield : y }',
              'function *g() { yield ~x }',
              'function *g() { yield class x {} }',
              'function *g() { yield --x }',
              'function *g() { yield !x }',
              'function *g() { yield void x }',
              'try {} catch (yield) {}',
              '({ yield() {} })',
              '"use strict"; ({ yield() {} })',
              'function *g() { yield yield }',
              'function* g() {  yield* [1, 2, 3]; }',
              'function* g() { exprValue = yield * {}; }',
              'function* g() { yield* "abc"; }',
              `function* g() {
                try {
                  yield * {};
                } catch (err) {
                  caught = err;
                }
              }`,
              `function* g1() { (yield 1) }`,
              `function* g2() { [yield 1] }`,
              `function* g3() { {yield 1} }`,
              `function* g4() { yield 1, yield 2; }`,
              `function* g5() { (yield 1) ? yield 2 : yield 3; }`,
              `function* g(a, b, c, d) {
                arguments[0] = 32;
                arguments[1] = 54;
                arguments[2] = 333;
                yield a;
                yield b;
                yield c;
                yield d;
              }`
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
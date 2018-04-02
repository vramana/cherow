import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

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

            // Note! This will work as soon as I'm done with directives

            //it(`function foo() { "use strict"; ${arg} }`, () => {
            //t.throws(() => {
            // parse(`function foo() { "use strict"; ${arg} }`, undefined, Context.Empty)
            //  })
            //});

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
});
import { fail, pass } from '../utils';

describe('Miscellaneous - Trailing comma', () => {

    fail(`(,) => 0;`, {
        source: '(,) => 0;',
    });

    fail(`f(,);`, {
        source: 'f(,);',
    });

    fail(`class A { constructor(,) {} }`, {
        source: 'class A { constructor(,) {} }',
    });

    fail(`function f(,){}`, {
        source: 'function f(,){}',
    });

    fail(`function f(...a,) {}`, {
        source: 'function f(...a,) {}',
        module: true
    });

    fail(`async (,) => a`, {
        source: 'async (,) => a',
        module: true
    });

    fail(`export default (function foo(,) { })`, {
        source: 'export default (function foo(,) { })',
        module: true
    });

    fail(`export default function foo(,) { }`, {
        source: 'export default function foo(,) { }',
        module: true
    });

    fail(`async (...a,) => a`, {
        source: 'async (...a,) => a',
        module: true
    });

    
    fail(`class A {foo(...a,) {}}`, {
        source: 'class A {foo(...a,) {}}',
        module: true
    });
});
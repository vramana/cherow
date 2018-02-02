import { pass, fail } from '../test-utils';

describe('Module-code - Miscellaneous', () => {

    fail(`class C {}
    new C().#x;`, {
        source: `class C {}
        new C().#x;`,
        module: true,
        line: 2
    });

    fail(`yield;`, {
            source: `yield;`,
            module: true,
            line: 1
        });

    fail(`?`, {
            source: `?';`,
            module: true,
            line: 1
        });

    fail(`var g;
        function* g() {}`, {
            source: `var g;
            function* g() {}';`,
            module: true,
            line: 2
        });

    fail(`var await = 5;`, {
            source: `var await = 5;`,
            module: true,
            line: 1
        });

    fail(`await 5;`, {
            source: `await 5;';`,
            module: true,
            line: 1
        });

    fail(`function f() { await 5; }`, {
            source: `function f() { await 5; }`,
            module: true,
            line: 1
        });

    fail(`export var await;`, {
            source: `export var await;`,
            module: true,
            line: 1
        });

    fail(`await => 1;`, {
            source: `await => 1;';`,
            module: true,
            line: 1
        });
});
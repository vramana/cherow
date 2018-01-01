import { pass, fail } from '../utils';

describe('Module-code - Miscellaneous', () => {

        fail(`yield;`, {
            source: `yield;`,
            module: true
        });

        fail(`?`, {
            source: `?';`,
            module: true
        });

        fail(`var g;
        function* g() {}`, {
            source: `var g;
            function* g() {}';`,
            module: true
        });

        fail(`var await = 5;`, {
            source: `var await = 5;`,
            module: true,
            message: 'Unexpected token \'await\'',
            line: 1,
            column: 4,
            index: 9
        });

        fail(`await 5;`, {
            source: `await 5;';`,
            module: true
        });

        fail(`function f() { await 5; }`, {
            source: `function f() { await 5; }`,
            module: true,
            message: 'Unexpected token \'await\'',
            line: 1,
            column: 15,
            index: 20
        });

        fail(`export var await;`, {
            source: `export var await;`,
            module: true
        });

        fail(`await => 1;`, {
            source: `await => 1;';`,
            module: true,
            message: 'Unexpected token \'await\'',
            line: 1,
            column: 0,
            index: 5
        });
});
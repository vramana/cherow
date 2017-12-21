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
});
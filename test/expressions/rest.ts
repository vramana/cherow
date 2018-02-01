import { pass, fail } from '../utils';

describe('Expressions - Rest', () => {

    fail(`var obj = class { method(a, b = 1, ...c = [2,3]) {} };`, {
        source: `var obj = class { method(a, b = 1, ...c = [2,3]) {} };`
    });

    fail(`function f(c, a, ...a) { }`, {
        source: `function f(c, a, ...a) { }`
    });

    fail(`function f(...a) { 'use strict'; }`, {
        source: `function f(...a) { 'use strict'; }`
    });

    fail(`function f(a, ...b) { 'use strict'; }`, {
        source: `function f(a, ...b) { 'use strict'; }`
    });
});
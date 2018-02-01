import { pass, fail } from '../utils';

describe('Expressions - Prefix decrement', () => {

    fail(`"use strict"; --arguments`, {
        source: '"use strict"; --arguments',
        message: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        line: 1,
        column: 16,
        index: 25
    });

    fail(`"use strict"; --eval`, {
        source: '"use strict"; --eval',
        message: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        line: 1,
        column: 16,
        index: 20
    });

    fail(`function f() { new.target--; }`, {
        source: 'function f() { --new.target; }',
        message: 'Invalid left-hand side expression in prefix operation',
        line: 1,
        column: 15,
        index: 17
    });

    fail(`function f() { --(new.target);}`, {
        source: 'function f() { --(new.target);}',
        message: 'Invalid left-hand side expression in prefix operation',
        line: 1,
        column: 15,
        index: 17
    });

    fail(`function* g() { (yield)--; }`, {
        source: 'function* g() { --(yield); }',
        message: 'Invalid left-hand side expression in prefix operation',
        line: 1,
        column: 16,
        index: 18
    });

    fail(`--1;`, {
        source: '--1;',
    });

    fail(`++1;`, {
        source: '++1;',
    });

    fail(`"use strict"; `, {
        source: '"use strict"; --arguments;',
    });

});
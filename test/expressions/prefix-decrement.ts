import { pass, fail } from '../utils';

describe('Expressions - Prefix decreement', () => {

    fail(`"use strict"; --arguments`, {
        source: '"use strict"; --arguments',
    });

    fail(`"use strict"; --eval`, {
        source: '"use strict"; --eval',
    });

    fail(`function f() { new.target--; }`, {
        source: 'function f() { --new.target; }',
    });

    fail(`function f() { --(new.target);}`, {
        source: 'function f() { --(new.target);}',
    });

    fail(`function* g() { (yield)--; }`, {
        source: 'function* g() { --(yield); }',
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
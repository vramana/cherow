import { pass, fail, testErrorLocation } from '../utils';

describe('Expressions - Arrow', () => {

    testErrorLocation(`"use strict"; var af = (eval) => 1;`, {
            source: '"use strict"; var af = (eval) => 1;',
            message: 'The identifier \'eval\' must not be in binding position in strict mode',
            line: 1,
            column: 23,
            index: 24
        });

    testErrorLocation(`"use strict"; var af = eval => 1;`, {
            source: '"use strict"; var af = eval => 1;',
            message: 'Unexpected eval or arguments in strict mode',
            line: 1,
            column: 23,
            index: 27
        });

    testErrorLocation(`"use strict"; var af = eval => 1;`, {
            source: '"use strict"; var af = arguments => 1;',
            message: 'Unexpected eval or arguments in strict mode',
            line: 1,
            column: 23,
            index: 32
        });

    testErrorLocation(`[]=>0`, {
            source: '[]=>0',
            message: 'Unexpected token \'=>\'',
            line: 1,
            column: 2,
            index: 4
        });

    testErrorLocation(`() ? 0`, {
            source: '() ? 0',
            message: 'Missing => after parentheses',
            line: 1,
            column: 3,
            index: 4
        });

    testErrorLocation(`(a)\n=> 0`, {
            source: '(a)\n=> 0',
            message: 'No line break is allowed after async',
            line: 2,
            column: 0,
            index: 6
        });

    testErrorLocation(`1 + ()`, {
            source: '1 + ()',
            message: 'Missing => after parentheses',
            line: 1,
            column: 5,
            index: 6
        });

    testErrorLocation(`a\n=> 0`, {
            source: 'a\n=> 0',
            message: 'Unexpected token \'=>\'',
            line: 2,
            column: 0,
            index: 4
        });

    fail(`(a,...a)/*\u2028*/ => 0`, {
            source: '(a,...a)/*\u2028*/ => 0',
        });

    fail(`a\n=> 0`, {
            source: 'a\n=> 0',
        });

    fail(`((a),...a) => 1`, {
            source: '((a),...a) => 1',
        });

    fail(`(a,...a)\n`, {
            source: '(a,...a)\n',
        });

    fail(`(a,...a)/*\u2028*/ => 0`, {
            source: '(a,...a)/*\u2028*/ => 0',
        });

    fail(`(a,...a)/*\u2029*/ => 0`, {
            source: '(a,...a)/*\u2029*/ => 0',
        });

    fail(`() <= 0`, {
            source: '() <= 0',
        });

    testErrorLocation(`() + 0`, {
            source: '() + 0',
            message:  'Missing => after parentheses',
            line: 1,
            column: 3,
            index: 4
        });

    fail(`(a,...a)/*\u202a*/`, {
            source: '(a,...a)/*\u202a*/',
        });

    fail(`(a,...a)/*\n*/ => 0`, {
            source: '(a,...a)/*\n*/ => 0',
        });

    fail(`(a,...a)/*\r\n*/ => 0`, {
            source: '(a,...a)/*\r\n*/ => 0',
        });

    fail(`eval => {"use strict"};`, {
            source: 'eval => {"use strict"};',
        });

    testErrorLocation(`(a,...[a]) => 0;`, {
            source: '(a,...[a]) => 0;',
            message: '\'a\' has already been declared ',
            line: 1,
            column: 0,
            index: 1
        });

    fail(`(x, x) => y;`, {
            source: '(x, x) => y;',
        });

    fail(`var f = (a = 0) => { "use strict"; };`, {
            source: 'var f = (a = 0) => { "use strict"; };',
        });

    fail(`left = (aSize.width/2) - ()`, {
            source: 'left = (aSize.width/2) - ()',
        });

    fail(`(10) => 0;`, {
            source: '(10) => 0;',
        });

    testErrorLocation(`() <= 42;`, {
            source: '() <= 42;',
            message: 'Missing => after parentheses',
            line: 1,
            column: 3,
            index: 5
        });

    testErrorLocation(`"use strict"; (a) => 00;`, {
            source: '"use strict"; (a) => 00;',
            message: 'Octal literals are not allowed in strict mode',
            line: 1,
            column: 21,
            index: 23
        });

    testErrorLocation(`"use strict"; (eval, a) => 42;`, {
            source: '"use strict"; (eval, a) => 42;',
            message: 'The identifier \'eval\' must not be in binding position in strict mode',
            line: 1,
            column: 21,
            index: 22
        });

    fail(`((a)) => 42;`, {
            source: '((a)) => 42;',
        });

    fail(`"use strict"; (eval = 10) => 42;`, {
            source: '"use strict"; (eval = 10) => 42;',
        });

    fail(`(a, (b)) => 42;`, {
            source: '(a, (b)) => 42;',
        });
    });
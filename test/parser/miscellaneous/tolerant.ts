import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import { parseModule, parseScript } from '../../../src/cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Tolerant mode', () => {

    const tolerantSyntax = [
        '/* /* if(foo) {}',
        '/* var fo0 = 1;',
        //'var o = {one: function() {} two:2, three: 3 "four":4};'
        // 'f(a b c);'
        //  'var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};'
        '"use strict"; delete x',
        '"use strict"; var arguments;',
        // '"use strict"; eval = 0;',
        '"use strict"; function arguments() {};',
        '"use strict"; function interface() {};',
        '"use strict"; (function eval() {});',
        '"use strict"; (function arguments() {});',
        '"use strict"; (function interface() {});',
        '"use strict"; function f(foo,  foo) {};',
        '"use strict"; (function f(eval) {});',
        '"use strict"; (function f(arguments) {});',
        '"use strict"; x = { set f(eval) {} }',
        '"\\1"; "use strict";',
        'function hello() { "octal directive\\1"; "use strict"; }',
        //'foo("bar") = baz',
        //'1 = 2',
        '--4',
        'var x = /[P QR]/\g',
        '3++',
        '"use strict"; ++arguments;',
        '"use strict"; var eval;',
        '(function () { "use strict"; 021 }())',
        '(function () { "use strict"; with (i); }())',
        'return',
        '/* foo ',
        'var foo = 1; /* ',
        '"use strict"; let eval;',
        '/* '

    ];

    for (const arg of tolerantSyntax) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parseScript(`${arg}`, {
                    tolerant: true
                })
            });
        });

    }
});
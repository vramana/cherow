import * as t from 'assert';
//import { ValidatorState, validateRegExp } from '../../../../src/regexp/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Lookbehind', () => {

    describe.skip('Failure', () => {
        const invalidSyntax = [
            '/(?<a)/u',
            '/(?<=a)?/u',
            '/(?<=a)+/u',
            '/(?<=a)*/u',
            '/(?<=a){1}/u',
            // Annex B 1.4.
            '/(?<=.)*/',
            '/(?<=.)*/u',
            '/(?<=.)?/',
            '/(?<=.)+/',
            '/.(?=.){2,3}/u',
            '/.(?<=.){2,3}/u',
            '/.(?!.){2,3}/u',
            '/.(?<!.){2,3}/u',
            '/(?<=.)*/u',
            '/(?<a\uD801\uDCA4>.)/u',"/(?<\\>.)/",
            "/(?<a\\>.)/",
            "/\\1(?:.)/u",
            "/\\1(?<=a)./u",
            "/\\1(?<!a)./u",
            "/(?<a\\uD801\uDCA4>.)/",
            "/(?<a\\uD801>.)/",
            "/(?<a\\uDCA4>.)/",
            "/(?<\\u{0041}>.)/",
            "/(?<a\\u{10FFFF}>.)/",
            "/(?<a\\uD801>.)/",
            "/(?<a\\uDCA4>.)/",
            "/(?<a\uD801>.)/",
            "/(?<a\uDCA4>.)/",
            "/(?<\\u{0041}>.)/",
            "/(?<a\\u{104A4}>.)/",
            "/(?<a\\u{110000}>.)/u",
            "/(?<a\\uD801>.)/u",
            "/(?<a\\uDCA4>.)/u",
            "/(?<a\uD801>.)/u",
            "/(?<a\uDCA4>.)/u",
            "/(?<a\\uD801>.)/u",
            "/(?<a\\uDCA4>.)/u",
            "/(?<a\u{104A4}>.)/",
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {

                t.throws(() => {
                    validateRegExp(`${arg}`, true);
                });
            });
        }
    });

    describe.skip('Pass', () => {
        const vadlidSyntax = [
            '/(?<=(?<a>\\w){3})f/u',
            '/((?<=\\w{3}))f/u',
            '/(?<a>(?<=\\w{3}))f/u',
            '/(?<!(?<a>\\d){3})f/u',
            '/(?<!(?<a>\\D){3})f|f/u',
            '/(?<a>(?<!\\D{3}))f|f/u',
            '/(?<=(?<fst>.)|(?<snd>.))/u',
            '/(?<=(?<a>\w){3})f/u',
            '/\w+(?<=$)',
            '/(?<=^[a-c]{3})def/',
            '/(?<=^)\w+(?<=$)/',
            '/(abc\\1)/.',
            '^foo(?<!foo)$/',
            '/.*(?<=(..|...|....))(.*)/',
            '/.*(?<=(xx|xxx))(.*)/',
            '/^faaao?(?<=^f[oa]+(?=o))/',
        ];

        for (const arg of vadlidSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, true);
                });
            });
        }
    });
});





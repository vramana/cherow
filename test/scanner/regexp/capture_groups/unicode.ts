import * as assert from 'clean-assert';
import * as t from 'assert';
// import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';


describe.skip('RegExp named capture groups', () => {

    describe('Failure', () => {
        const invalidSyntax = [
            "/(?<☀>a)\\k<☀>/u",
            "/(?<\\u0020>a)\\k<\\u0020>/u",
            "/(?<a>a)(?<\\u0061>a)/u",
            "/(?<a>a)(?<\\u{61}>a)/u",
            "/(?<a>a)\\k<b>/u",
            "/(?<a>a)\\2/u",
            "/(?<a>a)\\k<a/u",
            "/(?<a>a)\\k<a/",
            "/(?<a>a)\\k</u",
            "/(?<a>a)\\k</u",
            "/\\k<a>/u",
            "/\\k<a>/u",
            "/\\k/u",
            "/(?<aa)/u",
            "/(?<42a>a)/u",
            "/(?<:a>a)/u",
            "/(?<a:>a)/u",
            "/(?<a>a)(?<a>a)/u",
            "/(?<a>a)(?<b>b)(?<a>a)/u",
            "/\\k<a>/u",
            "/\\k<a/u",
            "/\\k/u",
            "/(?<a>.)\\k/u",
            "/(?<a>.)\\k<a/u",
            "/(?<a>.)\\k<b>/u",
            "/(?<a>a)\\k<ab>/u",
            "/(?<ab>a)\\k<a>/u",
            "/\\k<a>(?<ab>a)/u",
            "/(?<a>\\a)/u",
            '/(?<❤>a)/u',
            '/(?<𐒤>a)/u',
            "/(?<a\\uD801>.)/u",
            "/(?<a\\u{110000}>.)/u",
            //"/(?<a\uD801>.)/u",
            "/(?<a\uDCA4>.)/u",
            "/(?<a\\uD801>.)/u",
            "/(?<a\\uDCA4>.)/u",
            "/(?<\\>.)/u",
            "/(?<a\\>.)/u",
            "/(?<𠮷>a)\\k<\\u{20bb7}>/u",
            //"/(?<abc>a)\\k<\\u0061\\u0062\\u0063>/u",
            //"/(?<\\u0061\\u0062\\u0063>a)\\k<abc>/u",
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {

                t.throws(() => {
                    validateRegExp(`${arg}`, ValidatorState.Unicode);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            "/(?<a>a)\\k<a>/u",
            "/(?<a>a)\\1/u",
            "/(?<a>a)(?<b>a)/u",
            "/\\k<a>(?<a>a)/u",
            "/\\1(?<a>a)/u",
            "/(?<$abc>a)\\k<$abc>/u",

        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, ValidatorState.Unicode);
                });
            });
        }
    });
});
import * as assert from 'clean-assert';
import * as t from 'assert';
// import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('RegExp named capture groups', () => {

    describe('Failure', () => {
        const invalidSyntax = [
            "/(?<a>a)(?<a>a)/",
            "/(?<a>a)\\k<b>/",
            "/(?<)/",
            "/(?a/",
            '/(?<a>.)\\k/',
            '/(?<a>a)(?<b>b)(?<a>a)/',
            "/(?<>a)/",
            "/(?<aa)/",
            "/(?<42a>a)/",
            "/(?<:a>a)/",
            "/(?<a:>a)/",
            "/(?<a>a)(?<a>a)/",
            "/(?<a>a)(?<b>b)(?<a>a)/",
            "/(?<a>.)\\k/",
            "/(?<a>.)\\k<a/",
            "/(?<a>.)\\k<b>/",
            "/(?<a>a)\\k<ab>/",
            "/(?<ab>a)\\k<a>/",
            "/\\k<a>(?<ab>a)/",
            "/\\k<a(?<a>a)/",
            "/\\k<a>(?<b>x)/",
            "/\\k<a(?<a>.)/",
            "/\\k(?<a>.)/",
            "/(?<𐒤>a)/",
            '/(?<❤>a)/',
            '/(?<a\\u{10FFFF}>.)/',
            "/(?<a\uDCA4>.)/",
            "/(?<name\\p{ASCII_Hex_Digit}>.)/",
            "/(?<name>)\\k<name\\p{ASCII_Hex_Digit}>/",
            "/(?<\\u0000>)/",
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {

                t.throws(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });

    describe('Pass', () => {
        const validSyntax = [
            "/(a)/",
            "/(?:a)/",
            "/(?<a>)/",
            "/\\k/",
            "/\\k/",
            "/(?<a>a)\\k<a>/u",
            "/(?<a>)/",
            "/\\k/",
            "/(?<name>a)/",
            "/(?<$>)(?<_>)/",
            "/(?<a>)\\1/",
            "/(?<\\u0041bc\\u0041>)\\k<\\u0041bc\\u0041>/",
            "/(?<b>b)\k<a>(?<a>a)\k<b>/",
            "/(?<a>a)(?<b>b)\k<a>/",
            "/(?<a>a)(?<b>b)\k<a>|(?<c>c)/",
            // '/(?<=(?<a>\w){3})f/',
            '/(?<a>a)/',
            '/(?<a42>a)/',
            '/(?<_>a)/',
            '/(?<$>a)/',
            '/.(?<$>a)./',
            '/.(?<a>a)(.)/',
            '/.(?<a>a)(?<b>.)/',
            '/.(?<a>\w\w)/',
            '/(?<a>\w\w\w)/',
            '/(?<a>\w\w)(?<b>\w)/',
            '/(?<a42>a)',
            '/(?<_>a)/',
            '/(?<$>a)/',
            '/.(?<$>a)./',
            '/.(?<a>a)(.)/',
            '/.(a)./',
            '/(a)/',
            '/(a)/',
            '/.(a)./',
            '/.(a)(.)/',
            '/.(a)(.)/',
            '/.(\w\w)/',
            '/(\w\w\w)/',
            '/(\w\w)(\w)/',
            '/(?<a>\w\w)(?<b>\w)/',
            '/(?<a>\w\w\w)/',
            '/.(?<a>a)(?<b>.)/',
            '/(?<$>a)/',
            '/(?<_>a)/',
            '/(?<a42>a)/',
            '/(?<a>a)/',
            '/(.)(?<a>a)\\1\\2/',
            '/(.)(?<a>a)(?<b>\\1)(\\2)/',
            '/(?<lt><)a/',
            '/(?<gt>>)a/',
            //    '/(?<$𐒤>a)/',
            '/(?<_\u200C>a)/',
            '/(?<_\u200D>a)/',
            '/(?<ಠ_ಠ>a)/',
            "(?<name>\\p{ASCII_Hex_Digit}.)\\k<name>\\p{ASCII_Hex_Digit}",
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });
});
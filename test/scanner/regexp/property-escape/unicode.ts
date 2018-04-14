import * as assert from 'clean-assert';
import * as t from 'assert';
// import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';


describe.skip('Unicode property escape', () => {

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
        const vadlidSyntax = [
            '/[\p{Hex}-\uFFFF]/u',
            "/\\p{ASCII}/u",
            "/\\p{Emoji}/u",
            "\\p{Pd}",
            "/\\p{General_Category=Letter}/u",
            "/\\p{Script=Hiragana}/u",
            "\\P{gc=Dash_Punctuation}",
            "\\p{gc=Nd}",
            "\\p{gc=digit}",
            "\\p{digit}",
            "\\P{gc=Decimal_Number}",
            "\\P{gc=digit}",
            "\\P{Nd}",
            "\\p{gc=Me}",
            "\\p{Enclosing_Mark}",
            "\\P{General_Category=Me}",
            "\\P{gc=Me}",
            "\\P{Me}",
            "\\p{Pf}",
            "\\p{Final_Punctuation}",
            "\\p{gc=Final_Punctuation}",
            "\\P{General_Category=Pf}",
            "\\P{Final_Punctuation}",
            "\\P{gc=Format}",
            "\\P{Cf}",
            "\\p{gc=Initial_Punctuation}",
            "\\p{Pi}",
            "\\P{gc=Pi}",
            "\\P{Pi}",
            "\\p{gc=Format}",
            "/[\\p{Script=Hiragana}\\-\\p{Script=Katakana}]/u",
        ]

        for (const arg of vadlidSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, ValidatorState.Unicode);
                });
            });
        }
    });
});
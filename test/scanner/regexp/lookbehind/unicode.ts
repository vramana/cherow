import * as assert from 'clean-assert';
import * as t from 'assert';
import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Lookbehind', () => {

    describe('Failure', () => {
        const invalidSyntax = [
            "/(?<a)/u",
            "/(?<=a)?/u",
            "/(?<=a)+/u", 
            "/(?<=a)*/u",
            "/(?<=a){1}/u",
            // Annex B 1.4.
            "/(?<=.)*/",
            "/(?<=.)*/u",
            "/(?<=.)?/",
            "/(?<=.)+/",
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
        const vadlidSyntax = [
            "/(?<=(?<a>\\w){3})f/u",
            "/((?<=\\w{3}))f/u",
            "/(?<a>(?<=\\w{3}))f/u",
            "/(?<!(?<a>\\d){3})f/u",
            "/(?<!(?<a>\\D){3})f|f/u",
            "/(?<a>(?<!\\D{3}))f|f/u",
            "/(?<=(?<fst>.)|(?<snd>.))/u",
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


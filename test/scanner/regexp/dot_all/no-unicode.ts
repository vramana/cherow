import * as assert from 'clean-assert';
import * as t from 'assert';
import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Dot all', () => {

    describe.skip('Failure', () => {
        const invalidSyntax = [
            '/(?<$𐒤>a)/',
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {

                t.throws(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });

    describe.skip('Pass', () => {
        const vadlidSyntax = [
            '/^.$/s',
            '\u0085',
            '\u2029',
            '/^.$/',
            '/(?:)/',
            '/./s',
            '(?<\u{0041}>.)'
        ];

        for (const arg of vadlidSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });
});
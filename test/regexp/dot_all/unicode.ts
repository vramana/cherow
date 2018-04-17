import * as t from 'assert';
//import { ValidatorState, validateRegExp } from '../../../../src/regexp/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Dot all', () => {

    describe.skip('Failure', () => {
        const invalidSyntax = [
            '/\\p/u',
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
            '/^.$/u'
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
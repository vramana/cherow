import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';
import { validateRegularExpression } from '../../../src/cherow';

describe('Literals - Reggular expression', () => {

/*
    // This tests will not work before I push the validator code

    describe('Cherow.validateRegularExpression()', () => {

        const invalidSyntax = [
            "/(?=/"
        ]

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    validateRegularExpression(`${arg}`, false)
                })
            })
        }
    });
*/
    describe('Failure', () => {

        const invalidSyntax = [
            "/(?=/"
        ]

        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.OptionsNode)
                })
            })
        }
    });

    describe('Pass', () => {

        const invalidSyntax = [
            '/${1,2/u',
            "/foo/u",
            "/foo|bar/u",
        ]

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.OptionsNode)
                })
            })
        }
    });
});
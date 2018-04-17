import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Literals - Reggular expression', () => {

    describe('Failure', () => {

        const invalidSyntax = [
            '/(?=/'
        ];

        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.OptionsNode);
                });
            });
        }
    });

    describe('Pass', () => {

        const invalidSyntax = [
            '/${1,2/u',
            '/foo/u',
            '/foo|bar/u',
        ];

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.OptionsNode);
                });
            });
        }
    });
});
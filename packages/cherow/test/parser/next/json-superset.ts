import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Next - JSON superset', () => {

    describe('Failure', () => {});

    describe('Pass', () => {
        const validSyntax = [
            'const PS = "\\u2029";',
        ];

        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.OptionsNext | Context.Strict | Context.Module);
                });
            });
        }
    });

});
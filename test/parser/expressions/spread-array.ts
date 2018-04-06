import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Spread array', () => {

    describe('Failure', () => {

        const invalidSyntax = [
            '[...]',
            '[a, ...]',
            '[..., ]',
            '[..., ...]',
            '[ (...a)]',
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict";  ${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            '[...a]',
            '[a, ...b]',
            '[...a,]',
            '[...a, ,]',
            '[, ...a]',
            '[...a, ...b]',
            '[...a, , ...b]',
            '[...[...a]]',
            '[, ...a]',
            '[, , ...a]',
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });

            });

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });

            });

            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }
    });
});
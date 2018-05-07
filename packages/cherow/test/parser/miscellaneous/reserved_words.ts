import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Reserved words', () => {

    describe('Failure', () => {

        const programs = [
            'var super;',
            'var foo, super;',
            'try { } catch (super) { }',
            'function super() { }',
            'function foo(super) { }',
            'function foo(bar, super) { }',
            '(super) => { }',
            '(bar, super) => { }',
            'super = 1;',
            'var foo = super = 1;',
            '++super;',
            'super++;',
            'function foo super',
        ];

        for (const arg of programs) {

            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Module);
                });
            });
        }
    });

    describe('Pass', () => {});
});
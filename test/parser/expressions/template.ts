import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

describe('Expressions - Template', () => {

    describe('Failure', () => {

        const invalidSyntax = [
            '`\\08`',
            '`\\01`',
            '`\\01${0}right`',
            '`left${0}\\01`',
            '`left${0}\\01${1}right`',
            '`\\1`',
            '`\\1${0}right`',
            '`left${0}\\1`',
            '`left${0}\\1${1}right`',
            '`\\xg`',
            '`\\xg${0}right`',
            '`left${0}\\xg`',
            '`left${0}\\xg${1}right`',
            '`\\xAg`',
            '`\\xAg${0}right`',
            '`left${0}\\xAg`',
            '`left${0}\\xAg${1}right`',
            '`\\u0`',
            '`\\u0${0}right`',
            '`left${0}\\u0`',
            '`left${0}\\u0${1}right`',
            '`\\u0g`',
            '`\\u0g${0}right`',
            '`left${0}\\u0g`',
            '`left${0}\\u0g${1}right`',
            '`\\u00g`',
            '`\\u00g${0}right`',
            '`left${0}\\u00g`',
            '`left${0}\\u00g${1}right`',
            '`\\u000g`',
            '`\\u000g${0}right`',
            '`left${0}\\u000g`',
            '`left${0}\\u000g${1}right`',
            '`\\u{}`',
            '`\\u{}${0}right`',
            '`left${0}\\u{}`',
            '`left${0}\\u{}${1}right`',
            '`\\u{-0}`',
            '`\\u{-0}${0}right`',
            '`left${0}\\u{-0}`',
            '`left${0}\\u{-0}${1}right`',
            '`\\u{g}`',
            '`\\u{g}${0}right`',
            '`left${0}\\u{g}`',
            '`left${0}\\u{g}${1}right`',
            '`\\u{0`',
            '`\\u{0${0}right`',
            '`left${0}\\u{0`',
            '`left${0}\\u{0${1}right`',
            '`\\u{\\u{0}`',
            '`\\u{\\u{0}${0}right`',
            '`left${0}\\u{\\u{0}`',
            '`left${0}\\u{\\u{0}${1}right`',
            '`\\u{110000}`',
            '`\\u{110000}${0}right`',
            '`left${0}\\u{110000}`',
            '`left${0}\\u{110000}${1}right`',
            '`\\1``\\2`',
            //"tag` ${`\\u`}`",
            '`\\u```',
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }
    });

    describe('Pass', () => {

        const validSyntax = [
            'tag`\\08`',
            'tag`\\01`',
            'tag`\\01${0}right`',
            'tag`left${0}\\01`',
            'tag`left${0}\\01${1}right`',
            'tag`\\1`',
            'tag`\\1${0}right`',
            'tag`left${0}\\1`',
            'tag`left${0}\\1${1}right`',
            'tag`\\xg`',
            'tag`\\xg${0}right`',
            'tag`left${0}\\xg`',
            'tag`left${0}\\xg${1}right`',
            'tag`\\xAg`',
            'tag`\\xAg${0}right`',
            'tag`left${0}\\xAg`',
            'tag`left${0}\\xAg${1}right`',
            'tag`\\u0`',
            'tag`\\u0${0}right`',
            'tag`left${0}\\u0`',
            'tag`left${0}\\u0${1}right`',
            'tag`\\u0g`',
            'tag`\\u0g${0}right`',
            'tag`left${0}\\u0g`',
            'tag`left${0}\\u0g${1}right`',
            'tag`\\u00g`',
            'tag`\\u00g${0}right`',
            'tag`left${0}\\u00g`',
            'tag`left${0}\\u00g${1}right`',
            'tag`\\u000g`',
            'tag`\\u000g${0}right`',
            'tag`left${0}\\u000g`',
            'tag`left${0}\\u000g${1}right`',
            'tag`\\u{}`',
            'tag`\\u{}${0}right`',
            'tag`left${0}\\u{}`',
            'tag`left${0}\\u{}${1}right`',
            'tag`\\u{-0}`',
            'tag`\\u{-0}${0}right`',
            'tag`left${0}\\u{-0}`',
            'tag`left${0}\\u{-0}${1}right`',
            'tag`\\u{g}`',
            'tag`\\u{g}${0}right`',
            'tag`left${0}\\u{g}`',
            'tag`left${0}\\u{g}${1}right`',
            'tag`\\u{0`',
            'tag`\\u{0${0}right`',
            'tag`left${0}\\u{0`',
            'tag`left${0}\\u{0${1}right`',
            'tag`\\u{\\u{0}`',
            'tag`\\u{\\u{0}${0}right`',
            'tag`left${0}\\u{\\u{0}`',
            'tag`left${0}\\u{\\u{0}${1}right`',
            'tag`\\u{110000}`',
            'tag`\\u{110000}${0}right`',
            'tag`left${0}\\u{110000}`',
            'tag`left${0}\\u{110000}${1}right`',
            'tag` ${tag`\\u`}`',
            //"tag` ``\\u`",
            'tag`\\u`` `',
            //"tag`\\u``\\u`",
            '` ${tag`\\u`}`',
            //"` ``\\u`",
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
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
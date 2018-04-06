import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

describe('Expressions - Object rest', () => {

    describe('Failure', () => {

        const invalidSyntax = [
            '{ ...var z = y}',
            '{ ...var}',
            '{ ...foo bar}',
            '{* ...foo}',
            '{get ...foo}',
            '{set ...foo}',
            '{async ...foo}',
        ];
        for (const arg of invalidSyntax) {

            it(`x = ${arg}`, () => {
                t.throws(() => {
                    parse(`x = ${arg};`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; x = ${arg}`, () => {
                t.throws(() => {
                    parse(`x = ${arg};`, undefined, Context.Empty);
                });
            });
        }
    });
});
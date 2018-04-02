import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Rest spread', () => {

    describe('Failure', () => {

        const invalidSyntax = [
            'return ...[1,2,3];',
            'var ...x = [1,2,3];',
            'var [...x,] = [1,2,3];',
            'var [...x, y] = [1,2,3];',
            'var { x } = {x: ...[1,2,3]}',
        ];
        for (const arg of invalidSyntax) {

            it(`function fn() { 'use strict';} fn(${arg});`, () => {
                t.throws(() => {
                    parse(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`function fn() {} fn(${arg});`, () => {
                t.throws(() => {
                    parse(`function fn() { } fn(${arg});`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }
    });

    describe('Pass', () => {

    });
});
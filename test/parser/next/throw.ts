import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Next - Throw expression', () => {

    describe('Failure', () => {});

    describe('Pass', () => {

        const validSyntax = [
            'function test() { (throw 1, 2); }',
            'var __throw = (this && this.__throw) || function (e) { throw e; };',
            'function c(d = throw new TypeError()) { }',
            'const a = condition ? 1 : throw new Error();',
            'const w = condition ? throw true ? x : y : z;',
            'function test() {  (throw 1); }',
            'function test() { true && throw 1; }',
            'function test() { throw 1; }',
            'const b = condition || throw new Error();',
            'function save(filename = throw new TypeError("Argument required")) { }',
            `class Product {
                get id() { return this._id; }
                set id(value) { this._id = value || throw new Error("Invalid value"); }
              }`
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }
    });
});
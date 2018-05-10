import { pass, fail } from '../../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - While', () => {

    describe('Failure', () => {

    const invalidSyntax = [
        `while 1 break;`,
        'while 0 break;',
        `while 'hood' break;`,
        `while (false) async function* g() {}`,
        `while (false) label1: label2: function f() {}`,
        `while({1}){
            break ;
         };`,
    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    fail('while (false) function f() {}', Context.Empty, {
            source: 'while (false) function f() {}',
        });

    fail('while (false) function* g() {}', Context.Empty, {
            source: 'while (false) function* g() {}',
        });

    fail('while (false) class C {}', Context.Empty, {
            source: 'while (false) class C {}',
        });

    fail('while (false) let x = 1;', Context.Empty, {
            source: 'while (false) let x = 1;',
        });

    fail('while (false) async function f() {}', Context.Empty, {
            source: 'while (false) async function f() {}',
        });

    fail('while 0 break;', Context.Empty, {
            source: 'while 0 break;',
        });

    fail('while true break;', Context.Empty, {
            source: 'while true break;',
        });

    fail('while "hood" break;', Context.Empty, {
            source: 'while "hood" break;',
        });

    fail('while ( false ) Label: continue Label;', Context.OptionsNext, {
            source: 'while ( false ) Label: continue Label;',
        });

    fail(`while({1}){
            break ;
         };`, Context.Empty, {
            source: `while({1}){
                break ;
             };`,
        });

    fail(`while '' break;`, Context.Empty, {
            source: `while '' break;`,
        });

    fail(`while() {}`, Context.Empty, {
            source: `while() {}`,
        });
    });

    describe('Pass', () => {

    const validSyntax = [
        `while(function a(){return 1;}()){ break }`,
        'while(function __func(){return 1;}()){ break }',
        'while (true) { continue\nthere; }',
        'while (true) { continue // Comment\nthere; }',
        'while (true) { continue /* Multiline\nComment */there; }',
        'while (true) { break\nthere; }',
        'while (i-->0) {}',
        'while (true) { break /* Multiline\nComment */there; }',
        `while (false) let // ASI
        x = 1;`,
        `while (false) let // ASI
        {}`,
    ];

    for (const arg of validSyntax) {
        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    });
});

import * as t from 'assert';
//import { ValidatorState, validateRegExp } from '../../../../src/regexp/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Unicode property escape', () => {

describe.skip('Pass', () => {
    const vadlidSyntax = [
        '/\P{Ll}/',
        '/\P{Lu}/',
        '/\p{ASCII}+/u',
        '/\P{Assigned}+/u',
        '/[^\P{Assigned}]+/u',
        "/\\p{/",
        "/\\p{ASCII/",
        '/\\P{Letter}/u',
        "/[\\p{Script=Hiragana}\\-\\p{Script=Katakana}]/u",
        "/\\p{Script=Hiragana}/u",
        "/\\p{General_Category=Letter}/u",
        "/\\p{Emoji}/u",
        "/\\p{ASCII}/u",
    ];

    for (const arg of vadlidSyntax) {

        it(`${arg}`, () => {

            t.doesNotThrow(() => {
                validateRegExp(`${arg}`, false);
            });
        });
    }
});
});
import * as assert from 'clean-assert';
import * as t from 'assert';
import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('Unicode property escape', () => {

describe.skip('Pass', () => {
    const vadlidSyntax = [
        '/\P{Ll}/',
        '/\P{Lu}/',
        '/\p{ASCII}+/u',
        '/\P{Assigned}+/u',
        '/[^\P{Assigned}]+/u'
    ];

    for (const arg of vadlidSyntax) {

        it(`${arg}`, () => {

            t.doesNotThrow(() => {
                validateRegExp(`${arg}`, ValidatorState.Empty);
            });
        });
    }
});
});
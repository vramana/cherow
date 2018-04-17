import * as assert from 'clean-assert';
import * as t from 'assert';
//import { ValidatorState, validateRegExp } from '../../../src/regexp';
import { Context } from '../../../src/utilities';
import * as ESTree from '../../../src/estree';

// These tests are exist only so we can verify if we throw error messages in the same
// location as V8, SM and others.

describe.skip('Regular expressions', () => {

    const fail = (regexp: string, err: string) => {
        it(regexp, () => {
            try {
                validateRegExp(regexp, false);
            } catch (e) {
                t.equal(e.description, err)
            }
        });
    };
    // TODO! Adjust a few of this messages
    fail('/(/', 'Unterminated regexp group');
    fail("/(?a/", 'Invalid regexp group');
    fail("/(?a)/", 'Invalid regexp group');
    fail("/\\k/u", 'Invalid regexp group');
    fail("/(/", 'Unterminated regexp group');
    fail("/(?/", 'Invalid regexp group');
    fail("/(?=/u", 'Unterminated regexp group');
    fail("/(?=a)*/u", 'Invalid regexp group');
    fail("/a{2,1}/",  'Numbers out of order in {} quantifier');
    fail("/(a{2,1}/",  'Numbers out of order in {} quantifier');
    fail("/a{2,1}?/",  'Numbers out of order in {} quantifier');
    fail("/(*)/", 'Nothing to repeat');
    fail("/(/", 'Unterminated regexp group');
    fail('/$*/', 'Nothing to repeat');
    fail('/^*/', 'Nothing to repeat');
    fail('/\\2(a)(/','Unterminated regexp group');
    fail('/(?/', 'Invalid regexp group');
    fail('/(*)/', 'Nothing to repeat');
    fail('/(/',  'Unterminated regexp group');
    fail('/(?!/', 'Unterminated regexp group');
    fail('/(?!/', 'Unterminated regexp group');
    fail('/(?!foo/',  'Unterminated regexp group');
    fail('/(?<>a)/',  'Invalid regexp group');
    fail('/(?<:a>a)/', 'Invalid regexp group');
    fail('/(?<aa)/', 'Invalid regexp group');
    fail('/(?<𐒤>a)/', 'Invalid regexp group');
    fail('/(?<❤>a)/', 'Invalid regexp group');
    fail('/(?<=a){1}/', 'Nothing to repeat');
    fail("/a{2,1}/", 'Numbers out of order in {} quantifier');
    fail("/a{2,1}?/", 'Numbers out of order in {} quantifier');
    fail("/a{2,1}/", 'Numbers out of order in {} quantifier');
    fail("/(*)/", 'Nothing to repeat');
    fail("/+/", 'Nothing to repeat');
    fail("/?/", 'Nothing to repeat');
    fail("/^*/", 'Nothing to repeat');
    fail("/$*/", 'Nothing to repeat');
    fail("/${2,1}/", 'Nothing to repeat');
    fail( "/[\\u0001-\\u0000]/", 'Invalid range in character class');
    fail("/[\\u{1}-\\u{2}]/", 'Invalid range in character class');
    fail( "/[\\u{2}-\\u{1}]/", 'Invalid range in character class');
    fail("/[0-9--+]/", 'Invalid range in character class');
    fail("/[\\c-a]/", 'Invalid range in character class');
    fail("/[🌷-🌸]/", 'Invalid range in character class');
    fail( "/[\\u0000-🌸-\\u0000]/", 'Invalid range in character class');
    fail("/[\\u0000-\\ud83c\\udf38-\\u0000]/", 'Invalid range in character class');
    fail("/[🌸-🌷]/", 'Invalid range in character class');
    fail("/[\\uD834\\uDF06-\\uD834\\uDF08a-z]/", 'Invalid range in character class');
});

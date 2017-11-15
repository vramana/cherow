import { n, fail } from '../utils/test-utils';

describe('Declarations - Lexical', () => {

    fail('with(true) let a', 'with(true) let a');
    fail('with(true) class a {}', 'with(true) class a {}');
    fail('with(true) const a', 'with(true) const a');
    fail('with(true) let a', 'with(true) let a');
});



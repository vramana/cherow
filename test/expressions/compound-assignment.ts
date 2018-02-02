import { pass, fail } from '../test-utils';

describe('Expressions - Compaund assignment', () => {

    fail(`1 >>>= 1;`, {
        source: '1 >>>= 1;'
    });

    fail(`1 -= 1;`, {
        source: '1 -= 1;',
    });

    fail(`1 *= 1;`, {
        source: '1 *= 1;',
    });

    fail(`1 &= 1;`, {
        source: '1 &= 1;',
    });

    fail(`1 |= 1;`, {
        source: '1 |= 1;',
    });

});
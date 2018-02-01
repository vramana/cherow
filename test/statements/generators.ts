import { pass, fail } from '../utils';

describe('Statements - Generators', () => {

    fail('function *gen() { void yield; }', {
        source: `function *gen() { void yield; }`,
        next: true,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 23,
        index: 28
    });

    fail('function *gen() { void yi\\u0065ld; }', {
        source: `function *gen() { void yi\\u0065ld; }`,
        next: true,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 23,
        index: 33
    });
});

import { pass, fail } from '../utils';

describe('Statements - Async generator', () => {

    fail('async function *gen() { void yield; }', {
        source: `async function *gen() { void yield; }`,
        next: true,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 29,
        index: 34,
    });

    fail('async function *gen() { void yi\\u0065ld; }', {
        source: `async function *gen() { void yi\\u0065ld; }`,
        next: true,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 29,
        index: 39,
    });
});

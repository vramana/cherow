import { pass, fail } from '../utils';

describe('Statements - Async generator', () => {

    fail('async function *gen() { void yield; }', {
        source: `async function *gen() { void yield; }`,
        next: true
    });

    fail('async function *gen() { void yi\\u0065ld; }', {
        source: `async function *gen() { void yi\\u0065ld; }`,
        next: true
    });
});


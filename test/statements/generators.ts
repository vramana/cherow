import { pass, fail } from '../utils';

describe('Statements - Generators', () => {

    fail('function *gen() { void yield; }', {
        source: `function *gen() { void yield; }`,
        next: true
    });

    fail('function *gen() { void yi\\u0065ld; }', {
        source: `function *gen() { void yi\\u0065ld; }`,
        next: true
    });
});

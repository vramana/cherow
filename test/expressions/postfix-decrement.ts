import { pass, fail } from '../utils';

describe('Expressions - Postfix decrement', () => {

    fail(`function f() { new.target--; }`, {
        source: 'function f() { new.target--; }',
    });

    fail(`function* g() { (yield)--; }`, {
        source: 'function* g() { (yield)--; }',
    });

    fail(`"use strict"; arguments--;`, {
        source: '"use strict"; arguments--;',
    });

    fail(`1--;`, {
        source: '1--;',
    });

    
    
});
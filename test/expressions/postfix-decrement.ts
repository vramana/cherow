import { pass, fail, testErrorLocation } from '../utils';

describe('Expressions - Postfix decrement', () => {

    testErrorLocation(`function f() { new.target--; }`, {
        source: 'function f() { new.target--; }',
        message: 'Invalid left-hand side expression in postfix operation',
        line: 1,
        column: 15,
        index: 18
    });

    testErrorLocation(`function* g() { (yield)--; }`, {
        source: 'function* g() { (yield)--; }',
        message: 'Invalid left-hand side expression in postfix operation',
        line: 1,
        column: 16,
        index: 17
    });

    testErrorLocation(`"use strict"; arguments--;`, {
        source: '"use strict"; arguments--;',
        message: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        line: 1,
        column: 14,
        index: 23
    });

    testErrorLocation(`1--;`, {
        source: '1--;',
        message: 'Invalid left-hand side expression in postfix operation',
        line: 1,
        column: 0,
        index: 1
    });

});
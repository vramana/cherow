import { pass, fail } from '../utils';

describe('Expressions - Async function', () => {

      fail(`(async function*(x = await 1) { });`, {
        source: '(async function*(x = await 1) { });',
        next: true,
        message: '\'await\' may not be used as an identifier in this context',
        line: 1,
        column: 21,
        index: 26
    });

      fail(`"use strict"; (async function*(x = await 1) { });`, {
        source: '"use strict"; (async function*(x = await 1) { });',
        next: true,
        message: '\'await\' may not be used as an identifier in this context',
        line: 1,
        column: 35,
        index: 40
    });
});
import { pass, fail } from '../utils';

describe('Expressions - Async function', () => {

      fail(`(async function*(x = await 1) { });`, {
        source: '(async function*(x = await 1) { });',
        next: true
    });

      fail(`"use strict"; (async function*(x = await 1) { });`, {
        source: '"use strict"; (async function*(x = await 1) { });',
        next: true
    });
});
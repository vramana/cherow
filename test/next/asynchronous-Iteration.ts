import { pass, fail, testErrorLocation } from '../utils';

describe('Next - Asynchronous Iteration', () => {

        testErrorLocation('assignment expression in a function body with yield as an identifier in strict mode', {
            source: `"use strict"; async function *gen() {
            return {
                 ...(function() {
                    var yield;
                 }()),
              }
          }`,
            next: true,
            message: '\'yield\' may not be used as an identifier in this context',
            line: 3,
            column: 20,
            index: 80
        });

        testErrorLocation(`(async function* yield() { });`, {
            source: `(async function* yield() { });`,
            next: true,
            message: '\'yield\' may not be used as an identifier in this context',
            line: 1,
            column: 17,
            index: 22
        });

        testErrorLocation(`var g = function* yield() {};`, {
            source: `var g = function* yield() {};`,
            next: true,
            message: '\'yield\' may not be used as an identifier in this context',
            line: 1,
            column: 18,
            index: 23
        });

        testErrorLocation(`var C = class { async *gen() {} }`, {
            source: `var C = class { async *gen() {} }`,
            message: 'Generator function or method can\'t be async',
            line: 1,
            column: 22,
            index: 23
        });

        testErrorLocation('rest parameter has an initializer', {
            source: `0, async function* g(...x = []) {};`,
            next: true,
            message: 'Unexpected token \'=\'',
            line: 1,
            column: 26,
            index: 27
        });
        testErrorLocation('named await as identifier reference escaped', {
            source: `var gen = async function *g() { void \\u0061wait; };`,
            next: true,
            message: 'Unexpected escaped keyword',
            line: 1,
            column: 37,
            index: 47
        });
        testErrorLocation('`await` is used as binding identifier', {
            source: `(async function* await() { });`,
            next: true,
            message: '\'await\' may not be used as an identifier in this context',
            line: 1,
            column: 17,
            index: 22
        });
        testErrorLocation('\\u0061sync function* f(){}', {
            source: `\\u0061sync function* f(){}`,
            next: true,
            message: 'Unexpected escaped keyword',
            line: 1,
            column: 0,
            index: 10
        });
        testErrorLocation('f = async function* h([...[ x ] = []] = []) { }', {
            source: `f = async function* h([...[ x ] = []] = []) { }`,
            next: true,
            message: 'Unexpected token \'=\'',
            line: 1,
            column: 22,
            index: 23
        });
       fail('"use strict"; (async function* eval() { });', {
            source: `"use strict"; (async function* eval() { });`,
            next: true
        });
       fail('(async function*() { super(); });', {
            source: `(async function*() { super(); });`,
            next: true
        });
       fail('"use strict"; (async function*(eval) { });', {
            source: `"use strict"; (async function*(eval) { });`,
            next: true
        });
       fail('async function *gen() {  var yi\\u0065ld; }', {
            source: `async function *gen() {  var yi\\u0065ld; }`,
            next: true
        });
       fail('(async function*(x = await 1) { });', {
            source: `(async function*(x = await 1) { });`,
            next: true
        });
       fail('async function *() { yield; }', {
            source: `async function *() { yield; }`,
            next: true
        });
       testErrorLocation('async function*() { yield 1; };', {
            source: `async function*() { yield 1; };`,
            next: true,
            message: 'Function statement requires a name',
            line: 1,
            column: 15,
            index: 16
        });

        testErrorLocation('async generator await as binding identifier escaped', {
            source: `var obj = {
            async *method() {
              var \\u0061wait;
            }
          };`,
            next: true,
            message: 'Unexpected token \'await\'',
            line: 3,
            column: 18,
            index: 70
        });

       pass(`async function *g() { yield; }`, {
            source: 'async function *g() { yield; }',
            ranges: true,
            next: true,
            raw: true,
            expected: {
                body: [{
                    async: true,
                    body: {
                        body: [{
                            end: 28,
                            expression: {
                                argument: null,
                                delegate: false,
                                end: 27,
                                start: 22,
                                type: 'YieldExpression'
                            },
                            start: 22,
                            type: 'ExpressionStatement'
                        }, ],
                        end: 30,
                        start: 20,
                        type: 'BlockStatement'
                    },
                    end: 30,
                    expression: false,
                    generator: true,
                    id: {
                        end: 17,
                        name: 'g',
                        start: 16,
                        type: 'Identifier'
                    },
                    params: [],
                    start: 0,
                    type: 'FunctionDeclaration'
                }, ],
                end: 30,
                sourceType: 'script',
                start: 0,
                type: 'Program'
            }
        });

       pass(`Non object returned by [Symbol.asyncIterator]()`, {
            source: `async function *gen() {
                yield* obj;
              }`,
            next: true,
            raw: true,
            expected: {
                body: [{
                    async: true,
                    body: {
                        body: [{
                            expression: {
                                argument: {
                                    name: 'obj',
                                    type: 'Identifier'
                                },
                                delegate: true,
                                type: 'YieldExpression'
                            },
                            type: 'ExpressionStatement'
                        }],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: true,
                    id: {
                        name: 'gen',
                        type: 'Identifier'
                    },
                    params: [],
                    type: 'FunctionDeclaration'
                }],
                sourceType: 'script',
                type: 'Program'
            }
        });
    });
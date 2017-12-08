import { pass, fail } from '../utils';

describe('Next - Asynchronous Iteration', () => {
    
        fail('assignment expression in a function body with yield as an identifier in strict mode', {
            source: `"use strict"; async function *gen() {
            return {
                 ...(function() {
                    var yield;
                 }()),
              }
          }`,
            next: true
        });
    
        fail('rest parameter has an initializer', {
            source: `0, async function* g(...x = []) {};`,
            next: true
        });
        fail('named await as identifier reference escaped', {
            source: `var gen = async function *g() { void \\u0061wait; };`,
            next: true
        });
        fail('`await` is used as binding identifier', {
            source: `(async function* await() { });`,
            next: true
        });
        fail('\\u0061sync function* f(){}', {
            source: `\\u0061sync function* f(){}`,
            next: true
        });
        fail('f = async function* h([...[ x ] = []] = []) { }', {
            source: `f = async function* h([...[ x ] = []] = []) { }`,
            next: true
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
        fail('async function*() { yield 1; };', {
            source: `async function*() { yield 1; };`,
            next: true
        });
    
        fail('async generator await as binding identifier escaped', {
            source: `var obj = {
            async *method() {
              var \\u0061wait;
            }
          };`,
            next: true
        });
    
        pass(`async function *g() { yield; }`, {
            source: 'async function *g() { yield; }',
            ranges: true,
            next: true,
            raw: true,
            expected: {
                "body": [{
                    "async": true,
                    "body": {
                        "body": [{
                            "end": 28,
                            "expression": {
                                "argument": null,
                                "delegate": false,
                                "end": 27,
                                "start": 22,
                                "type": "YieldExpression"
                            },
                            "start": 22,
                            "type": "ExpressionStatement"
                        }, ],
                        "end": 30,
                        "start": 20,
                        "type": "BlockStatement"
                    },
                    "end": 30,
                    "expression": false,
                    "generator": true,
                    "id": {
                        "end": 17,
                        "name": "g",
                        "start": 16,
                        "type": "Identifier"
                    },
                    "params": [],
                    "start": 0,
                    "type": "FunctionDeclaration"
                }, ],
                "end": 30,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            }
        });
    
        pass(`Non object returned by [Symbol.asyncIterator]()`, {
            source: `async function *gen() {
                yield* obj;
              }`,
            next: true,
            raw: true,
            expected: {
                "body": [{
                    "async": true,
                    "body": {
                        "body": [{
                            "expression": {
                                "argument": {
                                    "name": "obj",
                                    "type": "Identifier"
                                },
                                "delegate": true,
                                "type": "YieldExpression"
                            },
                            "type": "ExpressionStatement"
                        }],
                        "type": "BlockStatement"
                    },
                    "expression": false,
                    "generator": true,
                    "id": {
                        "name": "gen",
                        "type": "Identifier"
                    },
                    "params": [],
                    "type": "FunctionDeclaration"
                }],
                "sourceType": "script",
                "type": "Program"
            }
        });
    });
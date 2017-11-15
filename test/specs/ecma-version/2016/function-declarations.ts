import { n, test } from '../../utils/test-utils';

describe('ES2016 - B.3.4 Function declarations in `IfStatement` Statement Clauses', () => {

        test('if (x) function f() { return 23; } else function f() { return 42; }', {
            type: 'Program',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'x',
                },
                consequent: {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'f',
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Literal',
                                value: 23,
                            },
                        }, ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
                alternate: {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'f',
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ReturnStatement',
                            argument: {
                                type: 'Literal',
                                value: 42,
                            },
                        }, ],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            }, ],
            sourceType: 'script',
        });

        test('if (x) function f() {}', {
            type: 'Program',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'x',
                },
                consequent: {
                    type: 'FunctionDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'f',
                    },
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
                alternate: null,
            }, ],
            sourceType: 'script',
        });
    });
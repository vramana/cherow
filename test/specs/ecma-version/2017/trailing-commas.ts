import { n, test } from '../../utils/test-utils';

describe('ES2017 - Trailing Commas', () => {
    
        test('f(x,);', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'f',
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('class X { constructor(a,) {} }', {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'X',
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'constructor',
                        },
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                            }, ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                            },
                            expression: false,
                            generator: false,
                            async: false,
                        },
                        kind: 'constructor',
                        static: false,
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });
    
        test('class P { f(a,b,) { } }', {
            'type': 'Program',
            'body': [{
                'type': 'ClassDeclaration',
                'id': {
                    'type': 'Identifier',
                    'name': 'P'
                },
                'superClass': null,
                'body': {
                    'type': 'ClassBody',
                    'body': [{
                        'type': 'MethodDefinition',
                        'computed': false,
                        'key': {
                            'type': 'Identifier',
                            'name': 'f'
                        },
                        'kind': 'method',
                        'static': false,
                        'value': {
                            'type': 'FunctionExpression',
                            'id': null,
                            'params': [{
                                    'type': 'Identifier',
                                    'name': 'a'
                                },
                                {
                                    'type': 'Identifier',
                                    'name': 'b'
                                }
                            ],
                            'body': {
                                'type': 'BlockStatement',
                                'body': []
                            },
                            'generator': false,
                            'async': false,
                            'expression': false
                        }
                    }]
                }
            }],
            'sourceType': 'script'
        });

        test('new f(x,);', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'f',
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'x',
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('f(...a,);', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'f',
                    },
                    arguments: [{
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                        },
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('function foo(a,) { }', {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'foo',
                },
                params: [{
                    type: 'Identifier',
                    name: 'a',
                }, ],
                body: {
                    type: 'BlockStatement',
                    body: [],
                },
                generator: false,
                expression: false,
                async: false,
            }, ],
            sourceType: 'script',
        });

        test('(function(a,) { })', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [{
                        type: 'Identifier',
                        name: 'a',
                    }, ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                    },
                    generator: false,
                    expression: false,
                    async: false,
                },
            }, ],
            sourceType: 'script',
        });

        test('(a,) => a', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    id: null,
                    params: [{
                        type: 'Identifier',
                        name: 'a',
                    }, ],
                    body: {
                        type: 'Identifier',
                        name: 'a',
                    },
                    generator: false,
                    expression: true,
                    async: false,
                },
            }, ],
            sourceType: 'script',
        });

        test('class A {foo(a,) {}}', {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A',
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'foo',
                        },
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                            }, ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                            },
                            expression: false,
                            generator: false,
                            async: false,
                        },
                        kind: 'method',
                        static: false,
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('class A {static foo(a,) {}}', {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A',
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'foo',
                        },
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                            }, ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                            },
                            expression: false,
                            generator: false,
                            async: false,
                        },
                        kind: 'method',
                        static: true,
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('foo(a,)', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                    },
                    arguments: [{
                        type: 'Identifier',
                        name: 'a',
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('foo(...a,)', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                    },
                    arguments: [{
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                        },
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('new foo(...a,)', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'NewExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'foo',
                    },
                    arguments: [{
                        type: 'SpreadElement',
                        argument: {
                            type: 'Identifier',
                            name: 'a',
                        },
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('({foo(a,) {}})', {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'foo',
                        },
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            id: null,
                            params: [{
                                type: 'Identifier',
                                name: 'a',
                            }, ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                            },
                            expression: false,
                            generator: false,
                            async: false,
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                    }, ],
                },
            }, ],
            sourceType: 'script',
        });

        test('let f = (x,y,) => x;', {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'Identifier',
                        name: 'f',
                    },
                    init: {
                        type: 'ArrowFunctionExpression',
                        id: null,
                        params: [{
                                type: 'Identifier',
                                name: 'x',
                            },
                            {
                                type: 'Identifier',
                                name: 'y',
                            },
                        ],
                        body: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        generator: false,
                        expression: true,
                        async: false,
                    },
                }, ],
                kind: 'let',
            }, ],
            sourceType: 'script',
        });
    });
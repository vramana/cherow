import { pass, fail } from '../utils';

describe('Next - Spread', () => {

    fail('function test({...{a}}) {}', {
        source: `function test({...{a}}) {}`,
        next: true
    });
    fail('function test({...{}}) {}', {
        source: `function test({...{}}) {}`,
        next: true
    });
    fail('var {...x = 1} = {}', {
        source: `var {...x = 1} = {}`,
        next: true
    });
    fail('var {...[]} = {}', {
        source: `var {...[]} = {}`,
        next: true
    });
    fail('function test({...[]}) {}', {
        source: `function test({...[]}) {}`,
        next: true
    });
    fail('import(...[1])', {
        source: `import(...[1])`,
        next: true
    });

    pass(`result = {...x} = { get v() { } };`, {
        source: 'result = {...x} = { get v() { } };',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "left": {
                        "type": "Identifier",
                        "name": "result",
                        "start": 0,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "operator": "=",
                    "right": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "ObjectPattern",
                            "properties": [{
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 13,
                                    "end": 14,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 14
                                        }
                                    }
                                },
                                "start": 10,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            }],
                            "start": 9,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "v",
                                    "start": 24,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    }
                                },
                                "value": {
                                    "type": "FunctionExpression",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 28,
                                        "end": 31,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 31
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 25,
                                    "end": 31,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    }
                                },
                                "kind": "get",
                                "computed": false,
                                "method": false,
                                "shorthand": false,
                                "start": 20,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 31
                                    }
                                }
                            }],
                            "start": 18,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            }
                        },
                        "start": 9,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        }
                    },
                    "start": 0,
                    "end": 33,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 33
                        }
                    }
                },
                "start": 0,
                "end": 34,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 34
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 34,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            }
        }
    });

    pass(`obj = { then: 1, catch: 2 }`, {
        source: 'obj = { then: 1, catch: 2 }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            "type": "Program",
            "start": 0,
            "end": 27,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 27
                }
            },
            "body": [{
                "type": "ExpressionStatement",
                "start": 0,
                "end": 27,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 27
                    }
                },
                "expression": {
                    "type": "AssignmentExpression",
                    "start": 0,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    },
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "start": 0,
                        "end": 3,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 3
                            }
                        },
                        "name": "obj"
                    },
                    "right": {
                        "type": "ObjectExpression",
                        "start": 6,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        },
                        "properties": [{
                                "type": "Property",
                                "start": 8,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 8,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    },
                                    "name": "then"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 14,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    },
                                    "value": 1,
                                    "raw": "1"
                                },
                                "kind": "init"
                            },
                            {
                                "type": "Property",
                                "start": 17,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
                                    "start": 17,
                                    "end": 22,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 22
                                        }
                                    },
                                    "name": "catch"
                                },
                                "value": {
                                    "type": "Literal",
                                    "start": 24,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    },
                                    "value": 2,
                                    "raw": "2"
                                },
                                "kind": "init"
                            }
                        ]
                    }
                }
            }],
            "sourceType": "module"
        }
    });

    pass(`let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };`, {
        source: 'let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };',
        next: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            },
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "z"
                                }
                            }
                        ]
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [{
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": 1
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": 2
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": 3
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": 4
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        }
    });

    pass(`let { x, ...y, ...z } = obj;`, {
        source: 'let { x, ...y, ...z } = obj;',
        next: true,
        expected: {
            "body": [{
                "declarations": [{
                    "id": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "x",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "argument": {
                                    "name": "y",
                                    "type": "Identifier"
                                },
                                "type": "RestElement"
                            },
                            {
                                "argument": {
                                    "name": "z",
                                    "type": "Identifier"
                                },
                                "type": "RestElement"
                            }
                        ],
                        "type": "ObjectPattern"
                    },
                    "init": {
                        "name": "obj",
                        "type": "Identifier"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "let",
                "type": "VariableDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`({x, ...y, a, ...b, c})`, {
        source: '({x, ...y, a, ...b, c})',
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "properties": [{
                            "computed": false,
                            "key": {
                                "name": "x",
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true,
                            "type": "Property",
                            "value": {
                                "name": "x",
                                "type": "Identifier"
                            }
                        },
                        {
                            "argument": {
                                "name": "y",
                                "type": "Identifier"
                            },
                            "type": "SpreadElement"
                        },
                        {
                            "computed": false,
                            "key": {
                                "name": "a",
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true,
                            "type": "Property",
                            "value": {
                                "name": "a",
                                "type": "Identifier"
                            }
                        },
                        {
                            "argument": {
                                "name": "b",
                                "type": "Identifier"
                            },
                            "type": "SpreadElement"
                        },
                        {
                            "computed": false,
                            "key": {
                                "name": "c",
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true,
                            "type": "Property",
                            "value": {
                                "name": "c",
                                "type": "Identifier"
                            }
                        }
                    ],
                    "type": "ObjectExpression"
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`export const [bar, { baz, ...foo }] = qux`, {
        source: 'export const [bar, { baz, ...foo }] = qux',
        next: true,
        module: true,
        expected: {
            "body": [{
                "declaration": {
                    "declarations": [{
                        "id": {
                            "elements": [{
                                    "name": "bar",
                                    "type": "Identifier"
                                },
                                {
                                    "properties": [{
                                            "computed": false,
                                            "key": {
                                                "name": "baz",
                                                "type": "Identifier"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": true,
                                            "type": "Property",
                                            "value": {
                                                "name": "baz",
                                                "type": "Identifier"
                                            }
                                        },
                                        {
                                            "argument": {
                                                "name": "foo",
                                                "type": "Identifier"
                                            },
                                            "type": "RestElement"
                                        }
                                    ],
                                    "type": "ObjectPattern"
                                }
                            ],
                            "type": "ArrayPattern"
                        },
                        "init": {
                            "name": "qux",
                            "type": "Identifier"
                        },
                        "type": "VariableDeclarator"
                    }, ],
                    "kind": "const",
                    "type": "VariableDeclaration"
                },
                "source": null,
                "specifiers": [],
                "type": "ExportNamedDeclaration"
            }],
            "sourceType": "module",
            "type": "Program"
        }
    });

    pass(`function f({ x, y, ...z }) {}`, {
        source: 'function f({ x, y, ...z }) {}',
        next: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "f"
                },
                "params": [{
                    "type": "ObjectPattern",
                    "properties": [{
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        },
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "Identifier",
                                "name": "z"
                            }
                        }
                    ]
                }],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "generator": false,
                "expression": false,
                "async": false
            }],
            "sourceType": "script"
        }
    });
});
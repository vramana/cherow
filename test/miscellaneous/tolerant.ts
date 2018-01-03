import { pass, fail } from '../utils';

describe('Miscellaneous - Tolerant mode', () => {

    pass(`/*`, {
        source: `/*`,
        tolerant: true,
        expected: {
            "body": [],
            "errors": [{
                "description": "Unterminated comment",
                "index": 2,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`var foo = 1; /* `, {
        source: `var foo = 1; /*`,
        tolerant: true,
        expected: {
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "foo",
                        "type": "Identifier"
                    },
                    "init": {
                        "type": "Literal",
                        "value": 1,
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }],
            "errors": [{
                "description": "Unterminated comment",
                "index": 15,
                "lineNumber": 1,
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`/* /* if(foo) {}`, {
        source: `/* /* if(foo) {}`,
        tolerant: true,
        expected: {
            "body": [],
            "errors": [{
                "description": "Unterminated comment",
                "index": 16,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`f({} b c);`, {
        source: `f({} b c);`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "arguments": [{
                            "properties": [],
                            "type": "ObjectExpression"
                        },
                        {
                            "name": "c",
                            "type": "Identifier"
                        }
                    ],
                    "callee": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "type": "CallExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Unexpected token",
                "index": 6,
                "lineNumber": 1,
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`f(a b c);`, {
        source: `f(a b c);`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "arguments": [{
                            "name": "a",
                            "type": "Identifier"
                        },
                        {
                            "name": "c",
                            "type": "Identifier"
                        }
                    ],
                    "callee": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "type": "CallExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Unexpected token",
                "index": 5,
                "lineNumber": 1,
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`f({} b c);`, {
        source: `f({} b c);`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "arguments": [{
                            "properties": [],
                            "type": "ObjectExpression"
                        },
                        {
                            "name": "c",
                            "type": "Identifier"
                        }
                    ],
                    "callee": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "type": "CallExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Unexpected token",
                "index": 6,
                "lineNumber": 1
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`var o = {one: function() {} two:2};`, {
        source: `var o = {one: function() {} two:2};`,
        tolerant: true,
        expected: {
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "o",
                        "type": "Identifier"
                    },
                    "init": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "one",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "async": false,
                                    "body": {
                                        "body": [],
                                        "type": "BlockStatement"
                                    },
                                    "expression": false,
                                    "generator": false,
                                    "id": null,
                                    "params": [],
                                    "type": "FunctionExpression"
                                }
                            },
                            {
                                "computed": false,
                                "key": undefined,
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 2,
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }],
            "errors": [{
                "description": "Unexpected token",
                "index": 31,
                "lineNumber": 1,
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`var o = {one: function() {} two:2 three: 3};`, {
        source: `var o = {one: function() {} two:2 three: 3};`,
        tolerant: true,
        expected: {
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "o",
                        "type": "Identifier"
                    },
                    "init": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "one",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "async": false,
                                    "body": {
                                        "body": [],
                                        "type": "BlockStatement"
                                    },
                                    "expression": false,
                                    "generator": false,
                                    "id": null,
                                    "params": [],
                                    "type": "FunctionExpression"
                                }
                            },
                            {
                                "computed": false,
                                "key": undefined,
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 2,
                                },
                            },
                            {
                                "computed": false,
                                "key": undefined,
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 3,
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }],
            "errors": [{
                    "description": "Unexpected token",
                    "index": 31,
                    "lineNumber": 1,
                },
                {
                    "description": "Unexpected token",
                    "index": 39,
                    "lineNumber": 1,
                },
            ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`var o = {one: function() {} two:2, three: 3 "four":4};`, {
        source: `var o = {one: function() {} two:2, three: 3 "four":4};`,
        tolerant: true,
        expected: {
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "o",
                        "type": "Identifier"
                    },
                    "init": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "one",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "async": false,
                                    "body": {
                                        "body": [],
                                        "type": "BlockStatement"
                                    },
                                    "expression": false,
                                    "generator": false,
                                    "id": null,
                                    "params": [],
                                    "type": "FunctionExpression"
                                }
                            },
                            {
                                "computed": false,
                                "key": undefined,
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 2,
                                },
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "three",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 3,
                                }
                            },
                            {
                                "computed": false,
                                "key": undefined,
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 4,
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }],
            "errors": [{
                    "description": "Unexpected token",
                    "index": 31,
                    "lineNumber": 1,
                },
                {
                    "description": "Unexpected token",
                    "index": 50,
                    "lineNumber": 1,
                },
            ],
            "sourceType": "script",
            "type": "Program",
        }
    });

    pass(`var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};`, {
        source: `var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};`,
        tolerant: true,
        expected: {
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "o",
                        "type": "Identifier"
                    },
                    "init": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "one",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "async": false,
                                    "body": {
                                        "body": [],
                                        "type": "BlockStatement"
                                    },
                                    "expression": false,
                                    "generator": false,
                                    "id": null,
                                    "params": [],
                                    "type": "FunctionExpression"
                                }
                            },
                            {
                                "computed": false,
                                "key": undefined,
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 2
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "three",
                                    "type": "Identifier",
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "properties": [{
                                            "computed": false,
                                            "key": {
                                                "name": "aa",
                                                "type": "Identifier"
                                            },
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "type": "Property",
                                            "value": {
                                                "type": "Literal",
                                                "value": "a"
                                            }
                                        },
                                        {
                                            "computed": false,
                                            "key": undefined,
                                            "kind": "init",
                                            "method": false,
                                            "shorthand": false,
                                            "type": "Property",
                                            "value": {
                                                "type": "Literal",
                                                "value": "b"
                                            }
                                        }
                                    ],
                                    "type": "ObjectExpression"
                                }
                            },
                            {
                                "computed": false,
                                "key": undefined,
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 4
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }],
            "errors": [{
                    "description": "Unexpected token",
                    "index": 31,
                    "lineNumber": 1,
                },
                {
                    "description": "Unexpected token",
                    "index": 53,
                    "lineNumber": 1,
                },
                {
                    "description": "Unexpected token",
                    "index": 64,
                    "lineNumber": 1,
                }
            ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`x = { y: z; }`, {
        source: `x = { y: z; }`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "name": "x",
                        "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                        "properties": [{
                            "computed": false,
                            "key": {
                                "name": "y",
                                "type": "Identifier"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false,
                            "type": "Property",
                            "value": {
                                "name": "z",
                                "type": "Identifier"
                            }
                        }],
                        "type": "ObjectExpression"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Unexpected token",
                "index": 11,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`return`, {
        source: `return`,
        tolerant: true,
        expected: {
            "body": [{
                "argument": null,
                "type": "ReturnStatement"
            }],
            "errors": [{
                "description": "Illegal return statement",
                "index": 6,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`(function () { 'use strict'; with (i); }())`, {
        source: `(function () { 'use strict'; with (i); }())`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "arguments": [],
                    "callee": {
                        "async": false,
                        "body": {
                            "body": [{
                                    "directive": "use strict",
                                    "expression": {
                                        "type": "Literal",
                                        "value": "use strict",
                                    },
                                    "type": "ExpressionStatement"
                                },
                                {
                                    "body": {
                                        "type": "EmptyStatement"
                                    },
                                    "object": {
                                        "name": "i",
                                        "type": "Identifier"
                                    },
                                    "type": "WithStatement"
                                }
                            ],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "params": [],
                        "type": "FunctionExpression"
                    },
                    "type": "CallExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Strict mode code may not include a with statement",
                "index": 33,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program",
        }
    });

    pass(`(function () { 'use strict'; 021 }())`, {
        source: `(function () { 'use strict'; 021 }())`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "arguments": [],
                    "callee": {
                        "async": false,
                        "body": {
                            "body": [{
                                    "directive": "use strict",
                                    "expression": {
                                        "type": "Literal",
                                        "value": "use strict"
                                    },
                                    "type": "ExpressionStatement"
                                },
                                {
                                    "expression": {
                                        "type": "Literal",
                                        "value": 17,
                                    },
                                    "type": "ExpressionStatement"
                                }
                            ],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "params": [],
                        "type": "FunctionExpression"
                    },
                    "type": "CallExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Octal literals are not allowed in strict mode",
                "index": 32,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; delete x`, {
        source: `"use strict"; delete x`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "expression": {
                        "argument": {
                            "name": "x",
                            "type": "Identifier"
                        },
                        "operator": "delete",
                        "prefix": true,
                        "type": "UnaryExpression"
                    },
                    "type": "ExpressionStatement"
                }
            ],
            "errors": [{
                "description": "Identifier expressions must not be deleted in strict mode",
                "index": 22,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; try {} catch (eval) {}`, {
        source: `"use strict"; try {} catch (eval) {}`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "block": {
                        "body": [],
                        "type": "BlockStatement"
                    },
                    "finalizer": null,
                    "handler": {
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "param": {
                            "name": "eval",
                            "type": "Identifier"
                        },
                        "type": "CatchClause"
                    },
                    "type": "TryStatement",
                }
            ],
            "errors": [{
                "description": "Eval or arguments can't be assigned to in strict mode code",
                "index": 32,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; var eval;`, {
        source: `"use strict"; var eval;`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "declarations": [{
                        "id": {
                            "name": "eval",
                            "type": "Identifier",
                        },
                        "init": null,
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }
            ],
            "errors": [{
                "description": "Eval or arguments can't be assigned to in strict mode code",
                "index": 22,
                "lineNumber": 1,
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; eval = 0;`, {
        source: `"use strict"; eval = 0;`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "expression": {
                        "left": {
                            "name": "eval",
                            "type": "Identifier"
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0
                        },
                        "type": "AssignmentExpression"
                    },
                    "type": "ExpressionStatement"
                }
            ],
            "errors": [{
                "description": "Eval or arguments can't be assigned to in strict mode code",
                "index": 20,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; eval++;`, {
        source: `"use strict"; eval++;`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "expression": {
                        "argument": {
                            "name": "eval",
                            "type": "Identifier"
                        },
                        "operator": "++",
                        "prefix": false,
                        "type": "UpdateExpression"
                    },
                    "type": "ExpressionStatement"
                }
            ],
            "errors": [{
                "description": "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                "index": 21,
                "lineNumber": 1
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; arguments = 0;`, {
        source: `"use strict"; arguments = 0;`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "expression": {
                        "left": {
                            "name": "arguments",
                            "type": "Identifier"
                        },
                        "operator": "=",
                        "right": {
                            "type": "Literal",
                            "value": 0
                        },
                        "type": "AssignmentExpression"
                    },
                    "type": "ExpressionStatement"
                }
            ],
            "errors": [{
                "description": "Eval or arguments can't be assigned to in strict mode code",
                "index": 25,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; function arguments() {};`, {
        source: `"use strict"; function arguments() {};`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "async": false,
                    "body": {
                        "body": [],
                        "type": "BlockStatement"
                    },
                    "expression": false,
                    "generator": false,
                    "id": {
                        "name": "arguments",
                        "type": "Identifier",
                    },
                    "params": [],
                    "type": "FunctionDeclaration"
                },
                {
                    "type": "EmptyStatement"
                }
            ],
            "errors": [{
                    "description": "Eval or arguments can't be assigned to in strict mode code",
                    "index": 32,
                    "lineNumber": 1,
                },
                {
                    "description": "Eval or arguments can't be assigned to in strict mode code",
                    "index": 32,
                    "lineNumber": 1,
                }
            ],
            "sourceType": "script",
            "type": "Program",
        }
    });

    pass(`"use strict"; (function eval() {});`, {
        source: `"use strict"; (function eval() {});`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "expression": {
                        "async": false,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": false,
                        "id": {
                            "name": "eval",
                            "type": "Identifier"
                        },
                        "params": [],
                        "type": "FunctionExpression"
                    },
                    "type": "ExpressionStatement"
                }
            ],
            "errors": [{
                "description": "Eval or arguments can't be assigned to in strict mode code",
                "index": 28,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; (function interface() {});`, {
        source: `"use strict"; (function interface() {});`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "expression": {
                        "async": false,
                        "body": {
                            "body": [],
                            "type": "BlockStatement"
                        },
                        "expression": false,
                        "generator": false,
                        "id": null,
                        "params": [{
                            "name": "interface",
                            "type": "Identifier"
                        }],
                        "type": "FunctionExpression"
                    },
                    "type": "ExpressionStatement"
                }
            ],
            "errors": [{
                    "description": "Unexpected token 'interface'",
                    "index": 33,
                    "lineNumber": 1,
                },
                {
                    "description": "Unexpected token",
                    "index": 33,
                    "lineNumber": 1,
                },
                {
                    "description": "Unexpected token '('",
                    "index": 34,
                    "lineNumber": 1,
                }
            ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; function f(eval) {};`, {
        source: `"use strict"; function f(eval) {};`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "async": false,
                    "body": {
                        "body": [],
                        "type": "BlockStatement"
                    },
                    "expression": false,
                    "generator": false,
                    "id": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "params": [{
                        "name": "eval",
                        "type": "Identifier"
                    }],
                    "type": "FunctionDeclaration"
                },
                {
                    "type": "EmptyStatement"
                }
            ],
            "errors": [{
                    "description": "Eval or arguments can't be assigned to in strict mode code",
                    "index": 29,
                    "lineNumber": 1,
                },
                {
                    "description": "Eval or arguments can't be assigned to in strict mode code",
                    "index": 29,
                    "lineNumber": 1,
                }
            ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; function f(foo,  foo) {};`, {
        source: `"use strict"; function f(foo,  foo) {};`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "async": false,
                    "body": {
                        "body": [],
                        "type": "BlockStatement"
                    },
                    "expression": false,
                    "generator": false,
                    "id": {
                        "name": "f",
                        "type": "Identifier"
                    },
                    "params": [{
                            "name": "foo",
                            "type": "Identifier"
                        },
                        {
                            "name": "foo",
                            "type": "Identifier"
                        }
                    ],
                    "type": "FunctionDeclaration"
                },
                {
                    "type": "EmptyStatement"
                }
            ],
            "errors": [{
                "description": "'foo' has already been declared ",
                "index": 34,
                "lineNumber": 1
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; var x = { 014: 3}`, {
        source: `"use strict"; var x = { 014: 3}`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict"
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "declarations": [{
                        "id": {
                            "name": "x",
                            "type": "Identifier"
                        },
                        "init": {
                            "properties": [{
                                "computed": false,
                                "key": {
                                    "type": "Literal",
                                    "value": 12
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 3
                                }
                            }],
                            "type": "ObjectExpression"
                        },
                        "type": "VariableDeclarator"
                    }],
                    "kind": "var",
                    "type": "VariableDeclaration"
                }
            ],
            "errors": [{
                    "description": "Octal literals are not allowed in strict mode",
                    "index": 27,
                    "lineNumber": 1
                },
                {
                    "description": "Octal literals are not allowed in strict mode",
                    "index": 30,
                    "lineNumber": 1
                }
            ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`var x = 'abc\\8';`, {
        source: `var x = 'abc\\8';`,
        tolerant: true,
        expected: {
            "body": [{
                "declarations": [{
                    "id": {
                        "name": "x",
                        "type": "Identifier"
                    },
                    "init": {
                        "type": "Literal",
                        "value": "abc"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "var",
                "type": "VariableDeclaration"
            }],
            "errors": [{
                    "description": "Escapes \\8 or \\9 are not syntactically valid escapes",
                    "index": 13,
                    "lineNumber": 1,
                },
                {
                    "description": "Invalid hexadecimal escape sequence",
                    "index": 13,
                    "lineNumber": 1,
                },
                {
                    "description": "Unicode escape code point out of range",
                    "index": 13,
                    "lineNumber": 1,
                }
            ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`({x(eval){"use strict"}})`, {
        source: `({x(eval){"use strict"}})`,
        tolerant: true,
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
                        "method": true,
                        "shorthand": false,
                        "type": "Property",
                        "value": {
                            "async": false,
                            "body": {
                                "body": [{
                                    "directive": "use strict",
                                    "expression": {
                                        "type": "Literal",
                                        "value": "use strict"
                                    },
                                    "type": "ExpressionStatement"
                                }],
                                "type": "BlockStatement"
                            },
                            "expression": false,
                            "generator": false,
                            "id": null,
                            "params": [{
                                "name": "eval",
                                "type": "Identifier"
                            }, ],
                            "type": "FunctionExpression"
                        }
                    }],
                    "type": "ObjectExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Unexpected eval or arguments in strict mode",
                "index": 23,
                "lineNumber": 1,
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`for (5 in []) {}`, {
        source: `for (5 in []) {}`,
        tolerant: true,
        expected: {
            "body": [{
                "body": {
                    "body": [],
                    "type": "BlockStatement"
                },
                "left": {
                    "type": "Literal",
                    "value": 5,
                },
                "right": {
                    "elements": [],
                    "type": "ArrayExpression"
                },
                "type": "ForInStatement"
            }],
            "errors": [{
                    "description": "Invalid left-hand side in for-loop",
                    "index": 13,
                    "lineNumber": 1,
                },
                {
                    "description": "Invalid destructuring assignment target",
                    "index": 13,
                    "lineNumber": 1,
                }
            ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`--4`, {
        source: `--4`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "argument": {
                        "type": "Literal",
                        "value": 4
                    },
                    "operator": "--",
                    "prefix": true,
                    "type": "UpdateExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Invalid left-hand side expression in prefix operation",
                "index": 3,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`3++`, {
        source: `3++`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "argument": {
                        "type": "Literal",
                        "value": 3
                    },
                    "operator": "++",
                    "prefix": false,
                    "type": "UpdateExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Invalid left-hand side expression in postfix operation",
                "index": 3,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`1 = 2`, {
        source: `1 = 2`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "type": "Literal",
                        "value": 1
                    },
                    "operator": "=",
                    "right": {
                        "type": "Literal",
                        "value": 2
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Invalid destructuring assignment target",
                "index": 3,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`foo("bar") = baz`, {
        source: `foo("bar") = baz`,
        tolerant: true,
        expected: {
            "body": [{
                "expression": {
                    "left": {
                        "arguments": [{
                            "type": "Literal",
                            "value": "bar"
                        }],
                        "callee": {
                            "name": "foo",
                            "type": "Identifier"
                        },
                        "type": "CallExpression"
                    },
                    "operator": "=",
                    "right": {
                        "name": "baz",
                        "type": "Identifier"
                    },
                    "type": "AssignmentExpression"
                },
                "type": "ExpressionStatement"
            }],
            "errors": [{
                "description": "Invalid destructuring assignment target",
                "index": 12,
                "lineNumber": 1,
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`"use strict"; let eval;`, {
        source: `"use strict"; let eval;`,
        tolerant: true,
        expected: {
            "body": [{
                    "directive": "use strict",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
                    },
                    "type": "ExpressionStatement"
                },
                {
                    "declarations": [{
                        "id": {
                            "name": "eval",
                            "type": "Identifier",
                        },
                        "init": null,
                        "type": "VariableDeclarator"
                    }],
                    "kind": "let",
                    "type": "VariableDeclaration"
                }
            ],
            "errors": [{
                "description": "Eval or arguments can't be assigned to in strict mode code",
                "index": 22,
                "lineNumber": 1
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });
});
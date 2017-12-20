import { pass, fail } from '../utils';

describe('Declarations - Functions', () => {

    fail(`(function(...a, b){})`, {
        source: '(function(...a, b){})',
        loc: true,
        ranges: true,
        raw: true
    });

    fail(`(function((a)){})`, {
        source: '(function((a)){})',
        loc: true,
        ranges: true,
        raw: true
    });
        
    pass(`function a() {"use strict"; 0O0; }`, {
        source: `function a() {"use strict"; 0O0; }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "start": 14,
                                    "end": 26,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 14
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 26
                                        }
                                    },
                                    "raw": "\"use strict\""
                                },
                                "start": 14,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": 0,
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
                                    },
                                    "raw": "0O0"
                                },
                                "start": 28,
                                "end": 32,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 34
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "a",
                        "start": 9,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 10
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
                }
            ],
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

    
    pass(`function a(...[]) { }`, {
        source: `function a(...[]) { }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [
                        {
                            "type": "RestElement",
                            "argument": {
                                "type": "ArrayPattern",
                                "elements": [],
                                "start": 14,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "start": 11,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 18,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "a",
                        "start": 9,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "start": 0,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 21,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            }
        }
    });

    pass(`function hello(a) { sayHi(); }`, {
        source: `function hello(a) { sayHi(); }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "a",
                            "start": 15,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "sayHi",
                                        "start": 20,
                                        "end": 25,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "arguments": [],
                                    "start": 20,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "start": 20,
                                "end": 28,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "hello",
                        "start": 9,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    },
                    "start": 0,
                    "end": 30,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 30
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 30,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 30
                }
            }
        }
    });

    pass(`var hi = function arguments() { };`, {
        source: `var hi = function arguments() { };`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 30,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 30
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 33
                                        }
                                    }
                                },
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "id": {
                                    "type": "Identifier",
                                    "name": "arguments",
                                    "start": 18,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
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
                            "id": {
                                "type": "Identifier",
                                "name": "hi",
                                "start": 4,
                                "end": 6,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 6
                                    }
                                }
                            },
                            "start": 4,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            }
                        }
                    ],
                    "kind": "var",
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
            ],
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

    pass(`function universe(__proto__) { }`, {
        source: `function universe(__proto__) { }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "__proto__",
                            "start": 18,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 29,
                        "end": 32,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 29
                            },
                            "end": {
                                "line": 1,
                                "column": 32
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "universe",
                        "start": 9,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "start": 0,
                    "end": 32,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 32
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 32,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 32
                }
            }
        }
    });

    pass(`(function(){})`, {
        source: `a = function () {  };
        b`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "Identifier",
                            "name": "a",
                            "start": 0,
                            "end": 1,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 1
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "FunctionExpression",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 16,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 4,
                            "end": 20,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 20
                                }
                            }
                        },
                        "start": 0,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        }
                    },
                    "start": 0,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    }
                },
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "b",
                        "start": 30,
                        "end": 31,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 8
                            },
                            "end": {
                                "line": 2,
                                "column": 9
                            }
                        }
                    },
                    "start": 30,
                    "end": 31,
                    "loc": {
                        "start": {
                            "line": 2,
                            "column": 8
                        },
                        "end": {
                            "line": 2,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 31,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 2,
                    "column": 9
                }
            }
        }
    });

    
        pass(`(function(){})`, {
            source: '(function(){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 11,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 1,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "start": 0,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            }
        });

        pass(`(function x() { y; z() });`, {
            source: '(function x() { y; z() });',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "Identifier",
                                            "name": "y",
                                            "start": 16,
                                            "end": 17,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 17
                                                }
                                            }
                                        },
                                        "start": 16,
                                        "end": 18,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 18
                                            }
                                        }
                                    },
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "z",
                                                "start": 19,
                                                "end": 20,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 20
                                                    }
                                                }
                                            },
                                            "arguments": [],
                                            "start": 19,
                                            "end": 22,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        "start": 19,
                                        "end": 22,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 22
                                            }
                                        }
                                    }
                                ],
                                "start": 14,
                                "end": 24,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 24
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 10,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            },
                            "start": 1,
                            "end": 24,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 24
                                }
                            }
                        },
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 26,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 26
                    }
                }
            }
        });


        pass(`(function eval() { });`, {
            source: '(function eval() { });',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 17,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "eval",
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
                            },
                            "start": 1,
                            "end": 20,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 20
                                }
                            }
                        },
                        "start": 0,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                }
            }
        });

        pass(`(function arguments() { });`, {
            source: '(function arguments() { });',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 22,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "arguments",
                                "start": 10,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                }
                            },
                            "start": 1,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            }
                        },
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
                        }
                    }
                ],
                "sourceType": "script",
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
                }
            }
        });

        pass(`(function x(y, z) { })`, {
            source: '(function x(y, z) { })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "y",
                                    "start": 12,
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                },
                                {
                                    "type": "Identifier",
                                    "name": "z",
                                    "start": 15,
                                    "end": 16,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 16
                                        }
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 18,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 10,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            },
                            "start": 1,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        "start": 0,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                }
            }
        });

        pass(`(function(a = b){})`, {
            source: '(function(a = b){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 10,
                                        "end": 11,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 10
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 11
                                            }
                                        }
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b",
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
                                        }
                                    },
                                    "start": 10,
                                    "end": 15,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 15
                                        }
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 16,
                                "end": 18,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 18
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 1,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
                        "start": 0,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }
        });

        pass(`(function(...a){})`, {
            source: '(function(...a){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 15,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 1,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        },
                        "start": 0,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 18,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 18
                    }
                }
            }
        });

        pass(`(function(a, ...b){})`, {
            source: '(function(a, ...b){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 10,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "b",
                                        "start": 16,
                                        "end": 17,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 17
                                            }
                                        }
                                    },
                                    "start": 13,
                                    "end": 17,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 13
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 17
                                        }
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 18,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 1,
                            "end": 20,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 20
                                }
                            }
                        },
                        "start": 0,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                }
            }
        });
/*
        pass(`(function({a}){})`, {
            source: '(function({a}){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
         }
        });*/
/*
        pass(`(function({a: x, a: y}){})`, {
            source: '(function({a: x, a: y}){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
         }
        });*/

        pass(`(function([a]){})`, {
            source: '(function([a]){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 11,
                                            "end": 12,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 11
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 12
                                                }
                                            }
                                        }
                                    ],
                                    "start": 10,
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 14,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 1,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "start": 0,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 17,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 17
                    }
                }
            }
        });

        pass(`(function([]){})`, {
            source: '(function([]){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "ArrayPattern",
                                    "elements": [],
                                    "start": 10,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 13,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 1,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "start": 0,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 16,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 16
                    }
                }
            }
        });
});
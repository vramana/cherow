import { fail, pass } from '../utils';

describe('Statements - Super', () => {

    fail(`class a extends b { c() { function* d(c = super.e()){} } }`, {
        source: 'class a extends b { c() { function* d(c = super.e()){} } }',
    });

    fail(`function* a(b){ super.c }`, {
        source: 'function* a(b){ super.c }',
    });

    fail(`!function* (a){ super.b }`, {
        source: '!function* (a){ super.b }',
    });

    fail(`class A extends B { constructor() { super; } }`, {
        source: 'class A extends B { constructor() { super; } }',
    });

    fail(`class A extends B { constructor() { (super)() } }`, {
        source: 'class A extends B { constructor() { (super)() } }',
    });

    fail(`!{ a() { !function* (){ super.b(); } } };`, {
        source: '!{ a() { !function* (){ super.b(); } } };',
    });

    fail(`"class A extends B { *g1() { return super() } }}`, {
        source: 'class A extends B { *g1() { return super() } }}',
    });

    fail(`function wrap() { function* foo(a = super(), b = super.foo()) { } }`, {
        source: 'function wrap() { function* foo(a = super(), b = super.foo()) { } }',
    });

    fail(`function wrap() { function foo(a = super(), b = super.foo()) {}}`, {
        source: 'function wrap() { function foo(a = super(), b = super.foo()) {}}',
    });

    fail(`class A extends B { constructor() { super; } }`, {
        source: 'class A extends B { constructor() { super; } }',
    });

    fail(`({ a() { (super).b(); } });`, {
        source: '({ a() { (super).b(); } });',
    });

    fail(`({ a() { (super).b(); } });`, {
        source: '({ a() { (super).b(); } });',
    });

    fail(`({ a() { (super).b(); } });`, {
        source: '({ a() { (super).b(); } });',
    });

    fail(`class C { m() { new super(); }  }`, {
        source: 'class C { m() { new super(); }  }',
    });

    pass(`value of reference returned by SuperProperty`, {
        source: `class A {
            constructor() {
              bar = (() => { return super['fromA']; })();
            }
        }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "A",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": null,
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "constructor",
                                    "start": 22,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 23
                                        }
                                    }
                                },
                                "kind": "constructor",
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "bar",
                                                        "start": 52,
                                                        "end": 55,
                                                        "loc": {
                                                            "start": {
                                                                "line": 3,
                                                                "column": 14
                                                            },
                                                            "end": {
                                                                "line": 3,
                                                                "column": 17
                                                            }
                                                        }
                                                    },
                                                    "operator": "=",
                                                    "right": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "ArrowFunctionExpression",
                                                            "body": {
                                                                "type": "BlockStatement",
                                                                "body": [
                                                                    {
                                                                        "type": "ReturnStatement",
                                                                        "argument": {
                                                                            "type": "MemberExpression",
                                                                            "object": {
                                                                                "type": "Super",
                                                                                "start": 74,
                                                                                "end": 79,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 3,
                                                                                        "column": 36
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 3,
                                                                                        "column": 41
                                                                                    }
                                                                                }
                                                                            },
                                                                            "computed": true,
                                                                            "property": {
                                                                                "type": "Literal",
                                                                                "value": "fromA",
                                                                                "start": 80,
                                                                                "end": 87,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 3,
                                                                                        "column": 42
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 3,
                                                                                        "column": 49
                                                                                    }
                                                                                },
                                                                                "raw": "'fromA'"
                                                                            },
                                                                            "start": 74,
                                                                            "end": 88,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 3,
                                                                                    "column": 36
                                                                                },
                                                                                "end": {
                                                                                    "line": 3,
                                                                                    "column": 50
                                                                                }
                                                                            }
                                                                        },
                                                                        "start": 67,
                                                                        "end": 89,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 3,
                                                                                "column": 29
                                                                            },
                                                                            "end": {
                                                                                "line": 3,
                                                                                "column": 51
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                "start": 65,
                                                                "end": 91,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 3,
                                                                        "column": 27
                                                                    },
                                                                    "end": {
                                                                        "line": 3,
                                                                        "column": 53
                                                                    }
                                                                }
                                                            },
                                                            "params": [],
                                                            "id": null,
                                                            "async": false,
                                                            "generator": false,
                                                            "expression": false,
                                                            "start": 59,
                                                            "end": 91,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 21
                                                                },
                                                                "end": {
                                                                    "line": 3,
                                                                    "column": 53
                                                                }
                                                            }
                                                        },
                                                        "arguments": [],
                                                        "start": 58,
                                                        "end": 94,
                                                        "loc": {
                                                            "start": {
                                                                "line": 3,
                                                                "column": 20
                                                            },
                                                            "end": {
                                                                "line": 3,
                                                                "column": 56
                                                            }
                                                        }
                                                    },
                                                    "start": 52,
                                                    "end": 94,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 56
                                                        }
                                                    }
                                                },
                                                "start": 52,
                                                "end": 95,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 14
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 57
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 36,
                                        "end": 109,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 26
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 33,
                                    "end": 109,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 13
                                        }
                                    }
                                },
                                "static": false,
                                "start": 22,
                                "end": 109,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 8,
                        "end": 119,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 5,
                                "column": 9
                            }
                        }
                    },
                    "start": 0,
                    "end": 119,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 5,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 119,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 9
                }
            }
        }
    });

    pass(`right shift between boolean and null`, {
        source: `class A extends B {
            constructor() {
                () => super()
            }
        }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "A",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": {
                        "type": "Identifier",
                        "name": "B",
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
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "constructor",
                                    "start": 32,
                                    "end": 43,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 23
                                        }
                                    }
                                },
                                "kind": "constructor",
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "ArrowFunctionExpression",
                                                    "body": {
                                                        "type": "CallExpression",
                                                        "callee": {
                                                            "type": "Super",
                                                            "start": 70,
                                                            "end": 75,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 3,
                                                                    "column": 22
                                                                },
                                                                "end": {
                                                                    "line": 3,
                                                                    "column": 27
                                                                }
                                                            }
                                                        },
                                                        "arguments": [],
                                                        "start": 70,
                                                        "end": 77,
                                                        "loc": {
                                                            "start": {
                                                                "line": 3,
                                                                "column": 22
                                                            },
                                                            "end": {
                                                                "line": 3,
                                                                "column": 29
                                                            }
                                                        }
                                                    },
                                                    "params": [],
                                                    "id": null,
                                                    "async": false,
                                                    "generator": false,
                                                    "expression": true,
                                                    "start": 64,
                                                    "end": 77,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 3,
                                                            "column": 29
                                                        }
                                                    }
                                                },
                                                "start": 64,
                                                "end": 77,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 29
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 46,
                                        "end": 91,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 26
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 43,
                                    "end": 91,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 13
                                        }
                                    }
                                },
                                "static": false,
                                "start": 32,
                                "end": 91,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 13
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 101,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 5,
                                "column": 9
                            }
                        }
                    },
                    "start": 0,
                    "end": 101,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 5,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 101,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 9
                }
            }
        }
    });

    pass(`class A extends B { "constructor"() { super() } }`, {
        source: 'class A extends B { "constructor"() { super() } }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "A",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": {
                        "type": "Identifier",
                        "name": "B",
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
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Literal",
                                    "value": "constructor",
                                    "start": 20,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 33
                                        }
                                    },
                                    "raw": "\"constructor\""
                                },
                                "kind": "constructor",
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "Super",
                                                        "start": 38,
                                                        "end": 43,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 38
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 43
                                                            }
                                                        }
                                                    },
                                                    "arguments": [],
                                                    "start": 38,
                                                    "end": 45,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 38
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 45
                                                        }
                                                    }
                                                },
                                                "start": 38,
                                                "end": 45,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 38
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 45
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 36,
                                        "end": 47,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 36
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 47
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 33,
                                    "end": 47,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 33
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 47
                                        }
                                    }
                                },
                                "static": false,
                                "start": 20,
                                "end": 47,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 47
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 49,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 49
                            }
                        }
                    },
                    "start": 0,
                    "end": 49,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 49
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 49,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 49
                }
            }
        }
    });

    pass(`class A extends B { constructor(a = super()){} }`, {
        source: 'class A extends B { constructor(a = super()){} }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ClassDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "A",
                        "start": 6,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        }
                    },
                    "superClass": {
                        "type": "Identifier",
                        "name": "B",
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
                    "body": {
                        "type": "ClassBody",
                        "body": [
                            {
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "constructor",
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
                                },
                                "kind": "constructor",
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "params": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 32,
                                                "end": 33,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 32
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 33
                                                    }
                                                }
                                            },
                                            "right": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "Super",
                                                    "start": 36,
                                                    "end": 41,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 36
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 41
                                                        }
                                                    }
                                                },
                                                "arguments": [],
                                                "start": 36,
                                                "end": 43,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 36
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 43
                                                    }
                                                }
                                            },
                                            "start": 32,
                                            "end": 43,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 32
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 43
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 44,
                                        "end": 46,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 44
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 46
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 31,
                                    "end": 46,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 31
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "static": false,
                                "start": 20,
                                "end": 46,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 46
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 48,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        }
                    },
                    "start": 0,
                    "end": 48,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 48,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 48
                }
            }
        }
    });
});
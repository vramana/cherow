import { pass, fail } from '../utils';

describe('Declarations - Let', () => {

    fail('let Infinity', {
        source: 'let Infinity'
    });
    fail('let let| split across two lines', {
        source: `let
    let = foo;`
    });
    fail('l\\u0065t', {
        source: 'l\\u0065t'
    });
    fail('"use strict"; for (let in o) { }', {
        source: '"use strict"; for (let in o) { }'
    });
    fail('let [x]', {
        source: 'let [x]'
    });
    
    fail('(function() { "use strict"; { let f; var f; } })', {
        source: '(function() { "use strict"; { let f; var f; } })'
    });

    fail('le\\u0074 x = 5', {
        source: 'le\\u0074 x = 5'
    });

    fail('let {x}', {
        source: 'let {x}'
    });

    fail('for (;false;) let x;', {
        source: 'for (;false;) let x;'
    });

    fail('if (true) {} else let x;', {
        source: 'if (true) {} else let x;'
    });

    fail('a: let a', {
        source: 'a: let a'
    });

    fail('if (true) let x = 1;', {
        source: 'if (true) let x = 1;'
    });

    fail('while (false) let x;', {
        source: 'while (false) let x;'
    });

    fail('let Infinity', {
        source: `function f() {
            let
            await 0;
        }`
    });

    fail('{ let f; var f; }', {
        source: '{ let f; var f; }'
    });

    pass(`let [a,,b] = c`, {
        source: `let [a,,b] = c`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "Identifier",
                        "name": "c",
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
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                                "type": "Identifier",
                                "name": "a",
                                "start": 5,
                                "end": 6,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 6
                                    }
                                }
                            },
                            null,
                            {
                                "type": "Identifier",
                                "name": "b",
                                "start": 8,
                                "end": 9,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 9
                                    }
                                }
                            }
                        ],
                        "start": 4,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "start": 4,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                }],
                "kind": "let",
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
            }],
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

    pass(`let {a: b} = ({});`, {
        source: `let {a: b} = ({});`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [],
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
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [{
                            "type": "Property",
                            "kind": "init",
                            "key": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 5,
                                "end": 6,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 6
                                    }
                                }
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "b",
                                "start": 8,
                                "end": 9,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 9
                                    }
                                }
                            },
                            "method": false,
                            "shorthand": false,
                            "start": 5,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            }
                        }],
                        "start": 4,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "start": 4,
                    "end": 17,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    }
                }],
                "kind": "let",
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
            }],
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

    pass(`let instanceof Foo`, {
        source: `let instanceof Foo`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "Identifier",
                        "name": "let",
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
                        }
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "Foo",
                        "start": 15,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "operator": "instanceof",
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
            }],
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

    pass(`let async = ""`, {
        source: `let async = ""`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "Literal",
                        "value": "",
                        "start": 12,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        },
                        "raw": "\"\""
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "async",
                        "start": 4,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "start": 4,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                }],
                "kind": "let",
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
            }],
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

    pass(`let arrow = () => {};`, {
        source: `let arrow = () => {};`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ArrowFunctionExpression",
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
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "start": 12,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "arrow",
                        "start": 4,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
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
                }],
                "kind": "let",
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
            }],
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

    pass(`let xCls2 = class { static name() {} };`, {
        source: `let xCls2 = class { static name() {} };`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                "type": "MethodDefinition",
                                "key": {
                                    "type": "Identifier",
                                    "name": "name",
                                    "start": 27,
                                    "end": 31,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    }
                                },
                                "kind": "method",
                                "computed": false,
                                "value": {
                                    "type": "FunctionExpression",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 34,
                                        "end": 36,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 34
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 36
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 31,
                                    "end": 36,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 31
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 36
                                        }
                                    }
                                },
                                "static": true,
                                "start": 20,
                                "end": 36,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 36
                                    }
                                }
                            }],
                            "start": 18,
                            "end": 38,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 38
                                }
                            }
                        },
                        "start": 12,
                        "end": 38,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 38
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "xCls2",
                        "start": 4,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "start": 4,
                    "end": 38,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 38
                        }
                    }
                }],
                "kind": "let",
                "start": 0,
                "end": 39,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 39
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 39,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 39
                }
            }
        }
    });

    pass(`{ let x = 14, y = 3, z = 1977 }`, {
        source: `{ let x = 14, y = 3, z = 1977 }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "BlockStatement",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 14,
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
                                },
                                "raw": "14"
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "x",
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
                            "start": 6,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 3,
                                "start": 18,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                },
                                "raw": "3"
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "y",
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
                            "start": 14,
                            "end": 19,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 19
                                }
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 1977,
                                "start": 25,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 25
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 29
                                    }
                                },
                                "raw": "1977"
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "z",
                                "start": 21,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 21
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                }
                            },
                            "start": 21,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 21
                                },
                                "end": {
                                    "line": 1,
                                    "column": 29
                                }
                            }
                        }
                    ],
                    "kind": "let",
                    "start": 2,
                    "end": 29,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 2
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    }
                }],
                "start": 0,
                "end": 31,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 31
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 31,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 31
                }
            }
        }
    });

    pass(`{ let x = 42 }`, {
        source: `{ let x = 42 }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "BlockStatement",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "Literal",
                            "value": 42,
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
                            },
                            "raw": "42"
                        },
                        "id": {
                            "type": "Identifier",
                            "name": "x",
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
                        "start": 6,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    }],
                    "kind": "let",
                    "start": 2,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 2
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                }],
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
            }],
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

    pass(`let gen = function*() {};`, {
    source: `let gen = function*() {};`,
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        "type": "Program",
        "body": [{
            "type": "VariableDeclaration",
            "declarations": [{
                "type": "VariableDeclarator",
                "init": {
                    "type": "FunctionExpression",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 22,
                        "end": 24,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 1,
                                "column": 24
                            }
                        }
                    },
                    "async": false,
                    "generator": true,
                    "expression": false,
                    "id": null,
                    "start": 10,
                    "end": 24,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 24
                        }
                    }
                },
                "id": {
                    "type": "Identifier",
                    "name": "gen",
                    "start": 4,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "start": 4,
                "end": 24,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 4
                    },
                    "end": {
                        "line": 1,
                        "column": 24
                    }
                }
            }],
            "kind": "let",
            "start": 0,
            "end": 25,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 25
                }
            }
        }],
        "sourceType": "script",
        "start": 0,
        "end": 25,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 25
            }
        }
    }
    });
    })
import { fail, pass } from '../test-utils';

describe('Statements - Super', () => {

    fail(`new super()`, {
        source: 'new super()',
        line: 1,
    });

    fail(`class a extends b { c() { function* d(c = super.e()){} } }`, {
        source: 'class a extends b { c() { function* d(c = super.e()){} } }',
        line: 1,
    });

    fail(`function* a(b){ super.c }`, {
        source: 'function* a(b){ super.c }',
        line: 1,
    });

    fail(`!function* (a){ super.b }`, {
        source: '!function* (a){ super.b }',
        line: 1,
    });

    fail(`class A extends B { constructor() { super; } }`, {
        source: 'class A extends B { constructor() { super; } }',
        line: 1,
    });

    fail(`class A extends B { constructor() { (super)() } }`, {
        source: 'class A extends B { constructor() { (super)() } }',
        line: 1,
    });

    fail(`!{ a() { !function* (){ super.b(); } } };`, {
        source: '!{ a() { !function* (){ super.b(); } } };',
        line: 1,
    });

    fail(`"class A extends B { *g1() { return super() } }}`, {
        source: 'class A extends B { *g1() { return super() } }}',
        line: 1,
    });

    fail(`function wrap() { function* foo(a = super(), b = super.foo()) { } }`, {
        source: 'function wrap() { function* foo(a = super(), b = super.foo()) { } }',
        line: 1,
    });

    fail(`function wrap() { function foo(a = super(), b = super.foo()) {}}`, {
        source: 'function wrap() { function foo(a = super(), b = super.foo()) {}}',
        line: 1,
    });

    fail(`class A extends B { constructor() { super; } }`, {
        source: 'class A extends B { constructor() { super; } }',
        line: 1,
    });

    fail(`({ a() { (super).b(); } });`, {
        source: '({ a() { (super).b(); } });',
        line: 1,
    });

    fail(`({ a() { (super).b(); } });`, {
        source: '({ a() { (super).b(); } });',
        line: 1,
    });

    fail(`({ a() { (super).b(); } });`, {
        source: '({ a() { (super).b(); } });',
        line: 1,
    });

    fail(`class C { m() { new super(); }  }`, {
        source: 'class C { m() { new super(); }  }',
        line: 1,
    });

    fail(`class X { x(){super();} }`, {
        source: 'class X { x(){super();} }',
        line: 1,
    });

    fail(`() => {super();}`, {
        source: '() => {super();}',
        line: 1,
    });

    fail(`class X { x(){class X { constructor(){super();} }} }`, {
        source: 'class X { x(){class X { constructor(){super();} }} }',
        line: 1,
    });

    fail(`class X { x(){class X { x(){super();} }} }`, {
        source: 'class X { x(){class X { x(){super();} }} }',
    });

    fail(`class X { x(){function x(){super();}} }`, {
        source: 'class X { x(){function x(){super();}} }',
    });

    fail(`class X { x(){function x(){super.x;}} }`, {
        source: 'class X { x(){function x(){super.x;}} }',
    });

    fail(`function x(){class X { constructor(){super.x;} }}`, {
        source: 'function x(){class X { constructor(){super.x;} }}',
    });

    fail(`function x(){function x(){super();}}`, {
        source: 'function x(){function x(){super();}}',
        line: 1,
    });

    fail(`function x(){() => {super();}}`, {
        source: 'function x(){() => {super();}}',
        line: 1,
    });

    fail(`() => {class X { x(){super();} }}`, {
        source: '() => {class X { x(){super();} }}',
        line: 1,
    });

    fail(`() => {() => {super();}}`, {
        source: '() => {() => {super();}}',
        line: 1,
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
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'constructor',
                                    start: 22,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 12
                                        },
                                        end: {
                                            line: 2,
                                            column: 23
                                        }
                                    }
                                },
                                kind: 'constructor',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'bar',
                                                        start: 52,
                                                        end: 55,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 14
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 17
                                                            }
                                                        }
                                                    },
                                                    operator: '=',
                                                    right: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'ArrowFunctionExpression',
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [
                                                                    {
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'MemberExpression',
                                                                            object: {
                                                                                type: 'Super',
                                                                                start: 74,
                                                                                end: 79,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 3,
                                                                                        column: 36
                                                                                    },
                                                                                    end: {
                                                                                        line: 3,
                                                                                        column: 41
                                                                                    }
                                                                                }
                                                                            },
                                                                            computed: true,
                                                                            property: {
                                                                                type: 'Literal',
                                                                                value: 'fromA',
                                                                                start: 80,
                                                                                end: 87,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 3,
                                                                                        column: 42
                                                                                    },
                                                                                    end: {
                                                                                        line: 3,
                                                                                        column: 49
                                                                                    }
                                                                                },
                                                                                raw: '\'fromA\''
                                                                            },
                                                                            start: 74,
                                                                            end: 88,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 3,
                                                                                    column: 36
                                                                                },
                                                                                end: {
                                                                                    line: 3,
                                                                                    column: 50
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 67,
                                                                        end: 89,
                                                                        loc: {
                                                                            start: {
                                                                                line: 3,
                                                                                column: 29
                                                                            },
                                                                            end: {
                                                                                line: 3,
                                                                                column: 51
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 65,
                                                                end: 91,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 27
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 53
                                                                    }
                                                                }
                                                            },
                                                            params: [],
                                                            id: null,
                                                            async: false,
                                                            generator: false,
                                                            expression: false,
                                                            start: 59,
                                                            end: 91,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 21
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 53
                                                                }
                                                            }
                                                        },
                                                        arguments: [],
                                                        start: 58,
                                                        end: 94,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 56
                                                            }
                                                        }
                                                    },
                                                    start: 52,
                                                    end: 94,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 56
                                                        }
                                                    }
                                                },
                                                start: 52,
                                                end: 95,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 57
                                                    }
                                                }
                                            }
                                        ],
                                        start: 36,
                                        end: 109,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 26
                                            },
                                            end: {
                                                line: 4,
                                                column: 13
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 33,
                                    end: 109,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 23
                                        },
                                        end: {
                                            line: 4,
                                            column: 13
                                        }
                                    }
                                },
                                static: false,
                                start: 22,
                                end: 109,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 4,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 119,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 5,
                                column: 9
                            }
                        }
                    },
                    start: 0,
                    end: 119,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 5,
                            column: 9
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 119,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 5,
                    column: 9
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
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: {
                        type: 'Identifier',
                        name: 'B',
                        start: 16,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'constructor',
                                    start: 32,
                                    end: 43,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 12
                                        },
                                        end: {
                                            line: 2,
                                            column: 23
                                        }
                                    }
                                },
                                kind: 'constructor',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'ArrowFunctionExpression',
                                                    body: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Super',
                                                            start: 70,
                                                            end: 75,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 22
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 27
                                                                }
                                                            }
                                                        },
                                                        arguments: [],
                                                        start: 70,
                                                        end: 77,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 22
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 29
                                                            }
                                                        }
                                                    },
                                                    params: [],
                                                    id: null,
                                                    async: false,
                                                    generator: false,
                                                    expression: true,
                                                    start: 64,
                                                    end: 77,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 16
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 29
                                                        }
                                                    }
                                                },
                                                start: 64,
                                                end: 77,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 29
                                                    }
                                                }
                                            }
                                        ],
                                        start: 46,
                                        end: 91,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 26
                                            },
                                            end: {
                                                line: 4,
                                                column: 13
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 43,
                                    end: 91,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 23
                                        },
                                        end: {
                                            line: 4,
                                            column: 13
                                        }
                                    }
                                },
                                static: false,
                                start: 32,
                                end: 91,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 4,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        start: 18,
                        end: 101,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 5,
                                column: 9
                            }
                        }
                    },
                    start: 0,
                    end: 101,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 5,
                            column: 9
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 101,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 5,
                    column: 9
                }
            }
        }
    });

    pass(`class C { get m() { super.x; } }`, {
        source: 'class C { get m() { super.x; } }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'C',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                kind: 'get',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'm',
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Super',
                                                        start: 20,
                                                        end: 25,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 25
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        start: 26,
                                                        end: 27,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 27
                                                            }
                                                        }
                                                    },
                                                    start: 20,
                                                    end: 27,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 27
                                                        }
                                                    }
                                                },
                                                start: 20,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
                                                    }
                                                }
                                            }
                                        ],
                                        start: 18,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 15,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                start: 10,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                }
            ],
            start: 0,
            end: 32,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 32
                }
            }
        }
    });

    pass(`class C { get m() { new super[27]() } }`, {
        source: 'class C { get m() {new super[27]() } }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'C',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                kind: 'get',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'm',
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'NewExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Super',
                                                            start: 23,
                                                            end: 28,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 23
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 28
                                                                }
                                                            }
                                                        },
                                                        computed: true,
                                                        property: {
                                                            type: 'Literal',
                                                            value: 27,
                                                            start: 29,
                                                            end: 31,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 29
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 31
                                                                }
                                                            },
                                                            raw: '27'
                                                        },
                                                        start: 19,
                                                        end: 32,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 19
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 32
                                                            }
                                                        }
                                                    },
                                                    arguments: [],
                                                    start: 19,
                                                    end: 34,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                start: 19,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                }
                                            }
                                        ],
                                        start: 18,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 15,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    }
                                },
                                start: 10,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        }
                    },
                    start: 0,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    }
                }
            ],
            start: 0,
            end: 38,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 38
                }
            }
        }
    });

    pass(`class C { get m() { super.x; } }`, {
        source: 'class C { get m() { super.x; } }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'C',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                kind: 'get',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'm',
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Super',
                                                        start: 20,
                                                        end: 25,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 25
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        start: 26,
                                                        end: 27,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 27
                                                            }
                                                        }
                                                    },
                                                    start: 20,
                                                    end: 27,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 27
                                                        }
                                                    }
                                                },
                                                start: 20,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 28
                                                    }
                                                }
                                            }
                                        ],
                                        start: 18,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 15,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                start: 10,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    start: 0,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                }
            ],
            start: 0,
            end: 32,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 32
                }
            }
        }
    });

    pass(`class C { set m(a) { () => z.super ; } }`, {
        source: 'class C { set m(a) { () => z.super ; } }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'C',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                kind: 'set',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'm',
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 16,
                                            end: 17,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 17
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'ArrowFunctionExpression',
                                                    body: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'z',
                                                            start: 27,
                                                            end: 28,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 27
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 28
                                                                }
                                                            }
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'super',
                                                            start: 29,
                                                            end: 34,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 29
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 34
                                                                }
                                                            }
                                                        },
                                                        start: 27,
                                                        end: 34,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 27
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 34
                                                            }
                                                        }
                                                    },
                                                    params: [],
                                                    id: null,
                                                    async: false,
                                                    generator: false,
                                                    expression: true,
                                                    start: 21,
                                                    end: 34,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                start: 21,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                }
                                            }
                                        ],
                                        start: 19,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 15,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                },
                                start: 10,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    },
                    start: 0,
                    end: 40,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 40
                        }
                    }
                }
            ],
            start: 0,
            end: 40,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 40
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
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: {
                        type: 'Identifier',
                        name: 'B',
                        start: 16,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Literal',
                                    value: 'constructor',
                                    start: 20,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    },
                                    raw: '"constructor"'
                                },
                                kind: 'constructor',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Super',
                                                        start: 38,
                                                        end: 43,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 38
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 43
                                                            }
                                                        }
                                                    },
                                                    arguments: [],
                                                    start: 38,
                                                    end: 45,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 45
                                                        }
                                                    }
                                                },
                                                start: 38,
                                                end: 45,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 38
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 45
                                                    }
                                                }
                                            }
                                        ],
                                        start: 36,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 33,
                                    end: 47,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 47
                                        }
                                    }
                                },
                                static: false,
                                start: 20,
                                end: 47,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 47
                                    }
                                }
                            }
                        ],
                        start: 18,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    },
                    start: 0,
                    end: 49,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 49
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 49,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 49
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
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
                        start: 6,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        }
                    },
                    superClass: {
                        type: 'Identifier',
                        name: 'B',
                        start: 16,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'constructor',
                                    start: 20,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                kind: 'constructor',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
                                                start: 32,
                                                end: 33,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 32
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 33
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Super',
                                                    start: 36,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 36
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    }
                                                },
                                                arguments: [],
                                                start: 36,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 36
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                }
                                            },
                                            start: 32,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 44,
                                        end: 46,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 44
                                            },
                                            end: {
                                                line: 1,
                                                column: 46
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 31,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                static: false,
                                start: 20,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 18,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }
    });
});
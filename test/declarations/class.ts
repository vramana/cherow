import { pass, fail } from '../test-utils';

describe('Declarations - Class', () => {

    const objectGetter = (arg: string) => `({
        get m(${arg}) {}
    })`;

    const objectSetter = (arg: string) => `({
        set m(${arg}) {}
    })`;

    const getter = (arg: string) => `(class {
        get m(${arg}) {}
    })`;

    const AllTogether = (arg: string) => `(class {
        get m(${arg}) {}
        static get m(${arg}) {}
        set m(${arg}) {}
        static set m(${arg}) {}
    })`;

    const staticGetter = (arg: string) => `(class {
        static get m(${arg}) {}
    })`;

    const Setter = (arg: string) => `(class {
        set m(${arg}) {}
    })`;

    const staticSetter = (arg: string) => `(class {
        static set m(${arg}) {}
    })`;

    const tests = [
        AllTogether,
        objectGetter,
        objectSetter,
        getter,
        staticGetter,
        Setter,
        staticSetter,
    ];

    for (const test of tests) {
        fail(test('a, '), {
            source: test('a, ')
        });
        fail(test('[]], '), {
            source: test('[], ')
        });

        fail(test('[]], '), {
            module: true,
            source: test('[], ')
        });

        fail(test('{}, '), {
            source: test('{}, ')
        });

        fail(test('{}, '), {
            module: true,
            source: test('{}, ')
        });

        fail(test('a = 0, '), {
            source: test('a = 0, ')
        });
        fail(test('[] = [], '), {
            source: test('[] = [], ')
        });
        fail(test('{} = {}, '), {
            source: test('{} = {}, ')
        });

        fail(test(','), {
            source: test(',')
        });
        fail(test(', a'), {
            source: test(', a')
        });
        fail(test(', ...a'), {
            source: test(', ...a')
        });
        fail(test(', ...a'), {
            source: test('a, ...b, ')
        });
        fail(test('a, , b'), {
            source: test('a, , b')
        });

        fail(test('a, , b'), {
            module: true,
            source: test('a, , b')
        });
    }

    fail(`class C {async *method(...x = []) {}}`, {
        source: 'class C {async *method(...x = []) {}}',
        message: 'Rest elements cannot have a initializer',
        line: 1
    });

    fail(`class {}`, {
        source: `class {}`,
        line: 1,
        column: 5,
        index: 5
    });

    fail(`class extends A{}`, {
        source: `class extends A{}`,
        line: 1,
        column: 5,
        index: 5
    });

    fail(`class a{ *() {} }`, {
        source: `class a{ *() {} }`,
        line: 1,
        column: 11,
        index: 11
    });

    fail(`class a { \\u0061sync* m(){} }`, {
        source: `class a { \\u0061sync* m(){} }`,
        line: 1,
        column: 9,
        index: 9
    });

    fail(`class C { st\\u0061tic m() {}  }`, {
        source: `class C { st\\u0061tic m() {}  }`,
        line: 1,
        column: 9,
        index: 9
    });

    fail('class a{ get get a() {} }', {
        source: `class a{ get get a() {} }`,
        message: 'Unexpected token identifier',
        line: 1,
        column: 13,
        index: 13
    });

    fail('class A { get constructor() {} }', {
        source: `class A { get constructor() {} }`,
        message: 'Class constructor may not be an accessor',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`class A {
        static get prototype() {}
      }`, {
        source: `class A {
            static get prototype() {}
          }`,
          message: 'Classes may not have static property named prototype',
          line: 2,
          column: 23,
          index: 33
    });

    fail('class A { set constructor(_) {} }', {
        source: `class A { set constructor(_) {} }`,
        message: 'Class constructor may not be an accessor',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`class a{ get async a() {} }`, {
        source: `class a{ get async a() {} }`,
        message: 'Unexpected token identifier',
        line: 1,
        column: 13,
        index: 13
    });

    fail('class C { *method() { with ({}) {} } }', {
        source: `class C { *method() { with ({}) {} } }`,
        message: 'Strict mode code may not include a with statement',
        line: 1,
        column: 21,
        index: 21
    });

    fail('class C { method() { with ({}) {} } }', {
        source: `class C { method() { with ({}) {} } }`,
        message: 'Strict mode code may not include a with statement',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`(class {*foo(a = yield b) {}})`, {
        source: `(class {*foo(a = yield b) {}})`,
        message: '\'yield\' may not be used as an identifier in this context',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`function* foo(a = class extends (yield b) {}) {}`, {
        source: `function* foo(a = class extends (yield b) {}) {}`,
        message: 'Generator parameters must not contain yield expressions',
        line: 1,
        column: 33,
        index: 33
    });

    fail(`class a {static "prototype"(){}}`, {
        source: `class a {static "prototype"(){}}`,
        message: 'Classes may not have static property named prototype',
        line: 1,
        column: 15,
        index: 15
    });

    fail(`class a{ static *'prot\\u006ftype'() {}}`, {
        source: `class a{ static *'prot\\u006ftype'() {} }`,
        line: 1
    });

    fail(`class a{ static 'prototype'() {} {}}`, {
        source: `class a{ static 'prototype'() {} }`,
        line: 1
    });

    fail(`class a{ static set prototype(_) {}}`, {
        source: `class a{ static *'prot\\u006ftype'() {} }`,
        line: 1
    });

    fail(`class a{ static prototype() {}}`, {
        source: `class a{ static prototype() {} }`,
        line: 1
    });

    pass(`(class { static set constructor(_) {} })`, {
        source: `(class { static set constructor(_) {} })`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    kind: 'set',
                                    static: true,
                                    computed: false,
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
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: '_',
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
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 35,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 31,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    },
                                    start: 9,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        },
                        start: 1,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 39
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

    pass(`(class {static constructor() {}})`, {
        source: `(class {static constructor() {}})`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    kind: 'method',
                                    static: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        name: 'constructor',
                                        start: 15,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
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
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 26,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        }
                                    },
                                    start: 8,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        start: 1,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                }
            ],
            start: 0,
            end: 33,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 33
                }
            }
        }
    });

    pass(`(class { constructor() {}})`, {
        source: `(class {constructor() {}})`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    kind: 'constructor',
                                    static: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        name: 'constructor',
                                        start: 8,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 22,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 19,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    start: 8,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        start: 1,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                }
            ],
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });

    pass(`(class {constructor() {}; static constructor() {}})`, {
        source: `(class {constructor() {}; static constructor() {}})`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    kind: 'constructor',
                                    static: false,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        name: 'constructor',
                                        start: 8,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 22,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 19,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    start: 8,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                {
                                    type: 'MethodDefinition',
                                    kind: 'method',
                                    static: true,
                                    computed: false,
                                    key: {
                                        type: 'Identifier',
                                        name: 'constructor',
                                        start: 33,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 47,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 47
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 44,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 44
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    start: 26,
                                    end: 49,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 49
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            }
                        },
                        start: 1,
                        end: 50,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 50
                            }
                        }
                    },
                    start: 0,
                    end: 51,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 51
                        }
                    }
                }
            ],
            start: 0,
            end: 51,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 51
                }
            }
        }
    });

    pass(`(class {prototype() {}})`, {
        source: `(class {prototype() {}})`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    key: {
                                        type: 'Identifier',
                                        name: 'prototype',
                                        start: 8,
                                        end: 17,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 17
                                            }
                                        }
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 20,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 17,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    },
                                    static: false,
                                    start: 8,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        start: 1,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 24,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 24
                }
            }
        }
    });

    pass(`class a{ get get() {} }`, {
        source: `class a{ get get() {} }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'a',
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'get',
                            start: 13,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        kind: 'get',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 19,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 16,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        static: false,
                        start: 9,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    }],
                    start: 7,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                },
                start: 0,
                end: 23,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 23
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 23,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 23
                }
            }
        }
    });

    pass(`class C { async *gen() {  var v = yield* obj;  return "return-value"; }}`, {
        source: `class C { async *gen() {  var v = yield* obj;  return "return-value"; }}`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'gen',
                            start: 17,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        kind: 'method',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                        type: 'VariableDeclaration',
                                        declarations: [{
                                            type: 'VariableDeclarator',
                                            init: {
                                                type: 'YieldExpression',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'obj',
                                                    start: 41,
                                                    end: 44,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 41
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 44
                                                        }
                                                    }
                                                },
                                                delegate: true,
                                                start: 34,
                                                end: 44,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 44
                                                    }
                                                }
                                            },
                                            id: {
                                                type: 'Identifier',
                                                name: 'v',
                                                start: 30,
                                                end: 31,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            start: 30,
                                            end: 44,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 44
                                                }
                                            }
                                        }],
                                        kind: 'var',
                                        start: 26,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        }
                                    },
                                    {
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: 'return-value',
                                            start: 54,
                                            end: 68,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 54
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 68
                                                }
                                            },
                                            raw: '"return-value"'
                                        },
                                        start: 47,
                                        end: 69,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 47
                                            },
                                            end: {
                                                line: 1,
                                                column: 69
                                            }
                                        }
                                    }
                                ],
                                start: 23,
                                end: 71,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 71
                                    }
                                }
                            },
                            async: true,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 20,
                            end: 71,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 71
                                }
                            }
                        },
                        static: false,
                        start: 10,
                        end: 71,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 71
                            }
                        }
                    }],
                    start: 8,
                    end: 72,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 72
                        }
                    }
                },
                start: 0,
                end: 72,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 72
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 72,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 72
                }
            }
        }
    });

    pass(`class C {eval() {}}`, {
        source: `class C {eval() {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'eval',
                                    start: 9,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 16,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 13,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                static: false,
                                start: 9,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    start: 0,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 19,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 19
                }
            }
        }
    });

    pass(`class C {*eval() {}}`, {
        source: `class C {*eval() {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'eval',
                                    start: 10,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 17,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 14,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                static: false,
                                start: 9,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    start: 0,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 20,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 20
                }
            }
        }
    });

    pass(`class C {get eval() {}}`, {
        source: `class C {get eval() {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'eval',
                                    start: 13,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 20,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 17,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                static: false,
                                start: 9,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 23
                }
            }
        }
    });

    pass(`class C {get arguments() {}}`, {
        source: `class C {get arguments() {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'arguments',
                                    start: 13,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 25,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 22,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                static: false,
                                start: 9,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
                    start: 0,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            }
        }
    });

    pass(`class C {set arguments(_) {}}`, {
        source: `class C {set arguments(_) {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'arguments',
                                    start: 13,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '_',
                                            start: 23,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 26,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 22,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                static: false,
                                start: 9,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    start: 0,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 29,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 29
                }
            }
        }
    });

    pass(`class C {static arguments() {}}`, {
        source: `class C {static arguments() {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'arguments',
                                    start: 16,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 28,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
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
                                    start: 25,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                static: true,
                                start: 9,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    },
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 31,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 31
                }
            }
        }
    });

    pass(`class C {static *arguments() {}}`, {
        source: `class C {static *arguments() {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'arguments',
                                    start: 17,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 26,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                static: true,
                                start: 9,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
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
            sourceType: 'script',
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

    pass(`class C {static set arguments(_) {}}`, {
        source: `class C {static set arguments(_) {}}`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'arguments',
                                    start: 20,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '_',
                                            start: 30,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 33,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 29,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 35
                                        }
                                    }
                                },
                                static: true,
                                start: 9,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 36,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }
    });

    pass('class A{}', {
        source: 'class A{}',
        loc: true,
        ranges: true,
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
                        body: [],
                        start: 7,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }
    });

    pass('class C { m() { } }', {
        source: 'class C { m() { } }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'm',
                                    start: 10,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 14,
                                        end: 17,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 17
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 11,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    start: 0,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 19,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 19
                }
            }
        }
    });

    pass('class foo { constructor() { super.x } };', {
        source: 'class foo { constructor() { super.x } };',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 6,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 9
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
                                    start: 12,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
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
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Super',
                                                        start: 28,
                                                        end: 33,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 28
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 33
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        start: 34,
                                                        end: 35,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 34
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 35
                                                            }
                                                        }
                                                    },
                                                    start: 28,
                                                    end: 35,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 28
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 35
                                                        }
                                                    }
                                                },
                                                start: 28,
                                                end: 35,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 35
                                                    }
                                                }
                                            }
                                        ],
                                        start: 26,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 23,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                static: false,
                                start: 12,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            }
                        ],
                        start: 10,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        }
                    },
                    start: 0,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 39,
                    end: 40,
                    loc: {
                        start: {
                            line: 1,
                            column: 39
                        },
                        end: {
                            line: 1,
                            column: 40
                        }
                    }
                }
            ],
            sourceType: 'script',
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

    pass(' class C { get x() { } }', {
        source: 'class C { get x() { } }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 18,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 15,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 23
                }
            }
        }
    });

    pass('class foo {};', {
        source: 'class foo {};',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 6,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [],
                        start: 10,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    start: 0,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 12,
                    end: 13,
                    loc: {
                        start: {
                            line: 1,
                            column: 12
                        },
                        end: {
                            line: 1,
                            column: 13
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 13,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }
    });

    pass('class foo extends null {};', {
        source: 'class foo extends null {};',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 6,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    superClass: {
                        type: 'Literal',
                        value: null,
                        start: 0,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    body: {
                        type: 'ClassBody',
                        body: [],
                        start: 23,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 25,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 25
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });

    pass(`class UserRepo{ async get(id) { return id; } }`, {
        source: 'class UserRepo{ async get(id) { return id; } }',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 46,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 46
              }
            },
            body: [
              {
                type: 'ClassDeclaration',
                start: 0,
                end: 46,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 46
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 6,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  name: 'UserRepo'
                },
                superClass: null,
                body: {
                  type: 'ClassBody',
                  start: 14,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  },
                  body: [
                    {
                      type: 'MethodDefinition',
                      start: 16,
                      end: 44,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 44
                        }
                      },
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 22,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        },
                        name: 'get'
                      },
                      static: false,
                      kind: 'method',
                      value: {
                        type: 'FunctionExpression',
                        start: 25,
                        end: 44,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 44
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: true,
                        params: [
                          {
                            type: 'Identifier',
                            start: 26,
                            end: 28,
                            loc: {
                              start: {
                                line: 1,
                                column: 26
                              },
                              end: {
                                line: 1,
                                column: 28
                              }
                            },
                            name: 'id'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          start: 30,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          },
                          body: [
                            {
                              type: 'ReturnStatement',
                              start: 32,
                              end: 42,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 32
                                },
                                end: {
                                  line: 1,
                                  column: 42
                                }
                              },
                              argument: {
                                type: 'Identifier',
                                start: 39,
                                end: 41,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 39
                                  },
                                  end: {
                                    line: 1,
                                    column: 41
                                  }
                                },
                                name: 'id'
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`class UserRepo{ async notget(id) { return id; } }`, {
        source: 'class UserRepo{ async notget(id) { return id; } }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ClassDeclaration',
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
                },
                id: {
                  type: 'Identifier',
                  start: 6,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  name: 'UserRepo'
                },
                superClass: null,
                body: {
                  type: 'ClassBody',
                  start: 14,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  },
                  body: [
                    {
                      type: 'MethodDefinition',
                      start: 16,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      },
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 22,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        },
                        name: 'notget'
                      },
                      static: false,
                      kind: 'method',
                      value: {
                        type: 'FunctionExpression',
                        start: 28,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: true,
                        params: [
                          {
                            type: 'Identifier',
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
                            name: 'id'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
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
                          },
                          body: [
                            {
                              type: 'ReturnStatement',
                              start: 35,
                              end: 45,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 45
                                }
                              },
                              argument: {
                                type: 'Identifier',
                                start: 42,
                                end: 44,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 44
                                  }
                                },
                                name: 'id'
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`class A {*async() { }}`, {
        source: 'class A {*async() { }}',
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
                                  name: 'async',
                                  start: 10,
                                  end: 15,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
                                      },
                                      end: {
                                          line: 1,
                                          column: 15
                                      }
                                  }
                              },
                              kind: 'method',
                              computed: false,
                              value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      body: [],
                                      start: 18,
                                      end: 21,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 18
                                          },
                                          end: {
                                              line: 1,
                                              column: 21
                                          }
                                      }
                                  },
                                  async: false,
                                  generator: true,
                                  expression: false,
                                  id: null,
                                  start: 15,
                                  end: 21,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 15
                                      },
                                      end: {
                                          line: 1,
                                          column: 21
                                      }
                                  }
                              },
                              static: false,
                              start: 9,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              }
                          }
                      ],
                      start: 8,
                      end: 22,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 22
                          }
                      }
                  },
                  start: 0,
                  end: 22,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 22
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 22,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 22
              }
          }
      }
      });

    pass(`class A {static* async() { }}`, {
        source: 'class A {static* async() { }}',
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
                                  name: 'async',
                                  start: 17,
                                  end: 22,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 17
                                      },
                                      end: {
                                          line: 1,
                                          column: 22
                                      }
                                  }
                              },
                              kind: 'method',
                              computed: false,
                              value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      body: [],
                                      start: 25,
                                      end: 28,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 25
                                          },
                                          end: {
                                              line: 1,
                                              column: 28
                                          }
                                      }
                                  },
                                  async: false,
                                  generator: true,
                                  expression: false,
                                  id: null,
                                  start: 22,
                                  end: 28,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 22
                                      },
                                      end: {
                                          line: 1,
                                          column: 28
                                      }
                                  }
                              },
                              static: true,
                              start: 9,
                              end: 28,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 28
                                  }
                              }
                          }
                      ],
                      start: 8,
                      end: 29,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 29
                          }
                      }
                  },
                  start: 0,
                  end: 29,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 29
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 29,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 29
              }
          }
      }
      });

    pass(`class A {async await() { }};`, {
        source: 'class A {async await() { }};',
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
                                  name: 'await',
                                  start: 15,
                                  end: 20,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 15
                                      },
                                      end: {
                                          line: 1,
                                          column: 20
                                      }
                                  }
                              },
                              kind: 'method',
                              computed: false,
                              value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      body: [],
                                      start: 23,
                                      end: 26,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 23
                                          },
                                          end: {
                                              line: 1,
                                              column: 26
                                          }
                                      }
                                  },
                                  async: true,
                                  generator: false,
                                  expression: false,
                                  id: null,
                                  start: 20,
                                  end: 26,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 20
                                      },
                                      end: {
                                          line: 1,
                                          column: 26
                                      }
                                  }
                              },
                              static: false,
                              start: 9,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              }
                          }
                      ],
                      start: 8,
                      end: 27,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 27
                          }
                      }
                  },
                  start: 0,
                  end: 27,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 27
                      }
                  }
              },
              {
                  type: 'EmptyStatement',
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
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 28,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 28
              }
          }
      }
      });

    pass(`class A {static async await() { }};`, {
        source: 'class A {static async await() { }};',
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
                                  name: 'await',
                                  start: 22,
                                  end: 27,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 22
                                      },
                                      end: {
                                          line: 1,
                                          column: 27
                                      }
                                  }
                              },
                              kind: 'method',
                              computed: false,
                              value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      body: [],
                                      start: 30,
                                      end: 33,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 30
                                          },
                                          end: {
                                              line: 1,
                                              column: 33
                                          }
                                      }
                                  },
                                  async: true,
                                  generator: false,
                                  expression: false,
                                  id: null,
                                  start: 27,
                                  end: 33,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 27
                                      },
                                      end: {
                                          line: 1,
                                          column: 33
                                      }
                                  }
                              },
                              static: true,
                              start: 9,
                              end: 33,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 33
                                  }
                              }
                          }
                      ],
                      start: 8,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 8
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      }
                  },
                  start: 0,
                  end: 34,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 34
                      }
                  }
              },
              {
                  type: 'EmptyStatement',
                  start: 34,
                  end: 35,
                  loc: {
                      start: {
                          line: 1,
                          column: 34
                      },
                      end: {
                          line: 1,
                          column: 35
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 35,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 35
              }
          }
      }
      });

    pass(`class A {static async foo() { }};`, {
        source: 'class A {static async foo() { }};',
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
                                  name: 'foo',
                                  start: 22,
                                  end: 25,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 22
                                      },
                                      end: {
                                          line: 1,
                                          column: 25
                                      }
                                  }
                              },
                              kind: 'method',
                              computed: false,
                              value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                      type: 'BlockStatement',
                                      body: [],
                                      start: 28,
                                      end: 31,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 28
                                          },
                                          end: {
                                              line: 1,
                                              column: 31
                                          }
                                      }
                                  },
                                  async: true,
                                  generator: false,
                                  expression: false,
                                  id: null,
                                  start: 25,
                                  end: 31,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 25
                                      },
                                      end: {
                                          line: 1,
                                          column: 31
                                      }
                                  }
                              },
                              static: true,
                              start: 9,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 31
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
              },
              {
                  type: 'EmptyStatement',
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
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 33,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 33
              }
          }
      }
      });

    pass(`class A { static get() {}}`, {
        source: `class A { static get() {}}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'get',
                            start: 17,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        kind: 'method',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 23,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        static: true,
                        start: 10,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    }],
                    start: 8,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                },
                start: 0,
                end: 26,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 26
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });

    pass(`class A extends B {get foo() {}}`, {
        source: `class A extends B {get foo() {}}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 23,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        kind: 'get',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 26,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 26
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        static: false,
                        start: 19,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    }],
                    start: 18,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
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
            }],
            sourceType: 'script',
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

    pass(`class A {set a(v) {}}`, {
        source: `class A {set a(v) {}}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: 'set',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'v',
                                start: 15,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 18,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 14,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        static: false,
                        start: 9,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    }],
                    start: 8,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                start: 0,
                end: 21,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    });

    pass(`class A { static set a(v) {}}`, {
        source: `class A { static set a(v) {}}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'a',
                            start: 21,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        },
                        kind: 'set',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'v',
                                start: 23,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 26,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 22,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            }
                        },
                        static: true,
                        start: 10,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    }],
                    start: 8,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                },
                start: 0,
                end: 29,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 29
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 29,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 29
                }
            }
        }
    });

    pass(`class A {*gen(v) { yield v; }}`, {
        source: `class A {*gen(v) { yield v; }}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'gen',
                            start: 10,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        kind: 'method',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'v',
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
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'v',
                                            start: 25,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        delegate: false,
                                        start: 19,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    start: 19,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                }],
                                start: 17,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            },
                            async: false,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 13,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        static: false,
                        start: 9,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    }],
                    start: 8,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                },
                start: 0,
                end: 30,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 30
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass(`(class { *static() {} })`, {
        source: `(class { *static() {} })`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'static',
                                start: 10,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 19,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                },
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 16,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            static: false,
                            start: 9,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        }],
                        start: 7,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 1,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                },
                start: 0,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 24,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 24
                }
            }
        }
    });

    pass(`class A {'constructor'() {}}`, {
        source: `class A {'constructor'() {}}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Literal',
                            value: 'constructor',
                            start: 9,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            },
                            raw: '\'constructor\''
                        },
                        kind: 'constructor',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 25,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 22,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        static: false,
                        start: 9,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    }],
                    start: 8,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                },
                start: 0,
                end: 28,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 28
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 28,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 28
                }
            }
        }
    });

    pass(`class A { static get [foo]() {} }`, {
        source: `class A { static get [foo]() {} }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 22,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        kind: 'get',
                        computed: true,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 26,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 26
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        static: true,
                        start: 10,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    }],
                    start: 8,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                },
                start: 0,
                end: 33,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 33
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 33,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 33
                }
            }
        }
    });

    pass(`class A { set foo(v) {} get foo() {} }`, {
        source: `class A { set foo(v) {} get foo() {} }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 14,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            },
                            kind: 'set',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [{
                                    type: 'Identifier',
                                    name: 'v',
                                    start: 18,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 21,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 17,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            static: false,
                            start: 10,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 28,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            kind: 'get',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 34,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 34
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
                                start: 31,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            static: false,
                            start: 24,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
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
            }],
            sourceType: 'script',
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

    pass(`class A { foo() {} get foo() {} }`, {
        source: `class A { foo() {} get foo() {} }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 10,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 16,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 13,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            static: false,
                            start: 10,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 23,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            },
                            kind: 'get',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 26,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            static: false,
                            start: 19,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        }
                    ],
                    start: 8,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                },
                start: 0,
                end: 33,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 33
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 33,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 33
                }
            }
        }
    });

    pass(`class Semicolon { ; }`, {
        source: `class Semicolon { ; }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Semicolon',
                    start: 6,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [],
                    start: 16,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 16
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                start: 0,
                end: 21,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 21
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    });

    pass(`class A { get ['constructor']() {} }`, {
        source: `class A { get ['constructor']() {} }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
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
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Literal',
                            value: 'constructor',
                            start: 15,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            },
                            raw: '\'constructor\''
                        },
                        kind: 'get',
                        computed: true,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 32,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        static: false,
                        start: 10,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    }],
                    start: 8,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                },
                start: 0,
                end: 36,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 36
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 36,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 36
                }
            }
        }
    });

    pass(`class Foo { static *bar() { } }`, {
        source: 'class Foo { static *bar() { } }',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Foo',
                    start: 6,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [{
                        type: 'MethodDefinition',
                        key: {
                            type: 'Identifier',
                            name: 'bar',
                            start: 20,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        kind: 'method',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 26,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            },
                            async: false,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 23,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        static: true,
                        start: 12,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    }],
                    start: 10,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                },
                start: 0,
                end: 31,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 31
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 31,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 31
                }
            }
        }
    });

    pass(`class A {constructor(){}};`, {
        source: 'class A {constructor(){}};',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
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
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'constructor',
                                start: 9,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
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
                                    body: [],
                                    start: 22,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 20,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            static: false,
                            start: 9,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        }],
                        start: 8,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 0,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 25,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 25
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 26
                }
            }
        }
    });

    pass(`class A {static[a](){}; static[b](){}};`, {
        source: 'class A {static[a](){}; static[b](){}};',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
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
                        body: [{
                                type: 'MethodDefinition',
                                key: {
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
                                },
                                kind: 'method',
                                computed: true,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 20,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 18,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                static: true,
                                start: 9,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 31,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: true,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 35,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 33,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                static: true,
                                start: 24,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
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
                },
                {
                    type: 'EmptyStatement',
                    start: 38,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 38
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 39,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 39
                }
            }
        }
    });

    pass(`class A {static a(){} static get a(){} static set a(b){} };`, {
        source: 'class A {static a(){} static get a(){} static set a(b){} };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
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
                        body: [{
                                type: 'MethodDefinition',
                                key: {
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
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 19,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 17,
                                    end: 21,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 21
                                        }
                                    }
                                },
                                static: true,
                                start: 9,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 33,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 36,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
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
                                    start: 34,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 34
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                },
                                static: true,
                                start: 22,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 50,
                                    end: 51,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 50
                                        },
                                        end: {
                                            line: 1,
                                            column: 51
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 52,
                                        end: 53,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 52
                                            },
                                            end: {
                                                line: 1,
                                                column: 53
                                            }
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 54,
                                        end: 56,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 54
                                            },
                                            end: {
                                                line: 1,
                                                column: 56
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 51,
                                    end: 56,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 51
                                        },
                                        end: {
                                            line: 1,
                                            column: 56
                                        }
                                    }
                                },
                                static: true,
                                start: 39,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 39
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    },
                    start: 0,
                    end: 58,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 58
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 58,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 58
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 59,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 59
                }
            }
        }
    });

    pass(`class A {static ["prototype"](){}};`, {
        source: 'class A {static ["prototype"](){}};',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
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
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 'prototype',
                                start: 17,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                },
                                raw: '"prototype"'
                            },
                            kind: 'method',
                            computed: true,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 31,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 29,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            },
                            static: true,
                            start: 9,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        }],
                        start: 8,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    },
                    start: 0,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 34,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 34
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 35,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 35
                }
            }
        }
    });

    pass(`class C {eval() {}}`, {
        source: 'class C {eval() {}}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
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
                                kind: 'method',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'eval',
                                    start: 9,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 16,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 13,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                start: 9,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    start: 0,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                }
            ],
            start: 0,
            end: 19,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 19
                }
            }
        }
    });

    pass(`class C {eval() {}}`, {
        source: 'class C {eval() {}}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        module: true,
        expected: {
            type: 'Program',
            sourceType: 'module',
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
                                kind: 'method',
                                static: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    name: 'eval',
                                    start: 9,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 16,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 13,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                start: 9,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    },
                    start: 0,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                }
            ],
            start: 0,
            end: 19,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 19
                }
            }
        }
    });

    pass(`class A {static(){};};`, {
        source: 'class A {static(){};};',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
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
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'static',
                                start: 9,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 17,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 15,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            static: false,
                            start: 9,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }],
                        start: 8,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 21,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 21
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }
    });

    pass(`class X {
        constructor() {
          this.value = 42;
        }
        async getValue() {
          return this.value;
        }
        setValue(value) {
          this.value = value;
        }
        async increment() {
          var value = await this.getValue();
          this.setValue(value + 1);
          return this.getValue();
        }
        async getBaseClassName() {
          return 'X';
        }
        static async getStaticValue() {
          return 44;
        }
        async 10() {
          return 46;
        }
        async ["foo"]() {
          return 47;
        }
      }`, {
        source: `class X {
            constructor() {
              this.value = 42;
            }
            async getValue() {
              return this.value;
            }
            setValue(value) {
              this.value = value;
            }
            async increment() {
              var value = await this.getValue();
              this.setValue(value + 1);
              return this.getValue();
            }
            async getBaseClassName() {
              return 'X';
            }
            static async getStaticValue() {
              return 44;
            }
            async 10() {
              return 46;
            }
            async ["foo"]() {
              return 47;
            }
          }`,
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'X',
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
                    body: [{
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
                                    body: [{
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'ThisExpression',
                                                    start: 52,
                                                    end: 56,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 18
                                                        }
                                                    }
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'value',
                                                    start: 57,
                                                    end: 62,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 24
                                                        }
                                                    }
                                                },
                                                start: 52,
                                                end: 62,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 24
                                                    }
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Literal',
                                                value: 42,
                                                start: 65,
                                                end: 67,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 29
                                                    }
                                                },
                                                raw: '42'
                                            },
                                            start: 52,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 29
                                                }
                                            }
                                        },
                                        start: 52,
                                        end: 68,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 14
                                            },
                                            end: {
                                                line: 3,
                                                column: 30
                                            }
                                        }
                                    }],
                                    start: 36,
                                    end: 82,
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
                                end: 82,
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
                            end: 82,
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
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'getValue',
                                start: 101,
                                end: 109,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 18
                                    },
                                    end: {
                                        line: 5,
                                        column: 26
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'ThisExpression',
                                                start: 135,
                                                end: 139,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 25
                                                    }
                                                }
                                            },
                                            computed: false,
                                            property: {
                                                type: 'Identifier',
                                                name: 'value',
                                                start: 140,
                                                end: 145,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            start: 135,
                                            end: 145,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 31
                                                }
                                            }
                                        },
                                        start: 128,
                                        end: 146,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 14
                                            },
                                            end: {
                                                line: 6,
                                                column: 32
                                            }
                                        }
                                    }],
                                    start: 112,
                                    end: 160,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 29
                                        },
                                        end: {
                                            line: 7,
                                            column: 13
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 109,
                                end: 160,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 26
                                    },
                                    end: {
                                        line: 7,
                                        column: 13
                                    }
                                }
                            },
                            static: false,
                            start: 95,
                            end: 160,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 12
                                },
                                end: {
                                    line: 7,
                                    column: 13
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'setValue',
                                start: 173,
                                end: 181,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 12
                                    },
                                    end: {
                                        line: 8,
                                        column: 20
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [{
                                    type: 'Identifier',
                                    name: 'value',
                                    start: 182,
                                    end: 187,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 21
                                        },
                                        end: {
                                            line: 8,
                                            column: 26
                                        }
                                    }
                                }],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'ThisExpression',
                                                    start: 205,
                                                    end: 209,
                                                    loc: {
                                                        start: {
                                                            line: 9,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 9,
                                                            column: 18
                                                        }
                                                    }
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'value',
                                                    start: 210,
                                                    end: 215,
                                                    loc: {
                                                        start: {
                                                            line: 9,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 9,
                                                            column: 24
                                                        }
                                                    }
                                                },
                                                start: 205,
                                                end: 215,
                                                loc: {
                                                    start: {
                                                        line: 9,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 9,
                                                        column: 24
                                                    }
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Identifier',
                                                name: 'value',
                                                start: 218,
                                                end: 223,
                                                loc: {
                                                    start: {
                                                        line: 9,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 9,
                                                        column: 32
                                                    }
                                                }
                                            },
                                            start: 205,
                                            end: 223,
                                            loc: {
                                                start: {
                                                    line: 9,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 9,
                                                    column: 32
                                                }
                                            }
                                        },
                                        start: 205,
                                        end: 224,
                                        loc: {
                                            start: {
                                                line: 9,
                                                column: 14
                                            },
                                            end: {
                                                line: 9,
                                                column: 33
                                            }
                                        }
                                    }],
                                    start: 189,
                                    end: 238,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 28
                                        },
                                        end: {
                                            line: 10,
                                            column: 13
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 181,
                                end: 238,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 20
                                    },
                                    end: {
                                        line: 10,
                                        column: 13
                                    }
                                }
                            },
                            static: false,
                            start: 173,
                            end: 238,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 12
                                },
                                end: {
                                    line: 10,
                                    column: 13
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'increment',
                                start: 257,
                                end: 266,
                                loc: {
                                    start: {
                                        line: 11,
                                        column: 18
                                    },
                                    end: {
                                        line: 11,
                                        column: 27
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                            type: 'VariableDeclaration',
                                            declarations: [{
                                                type: 'VariableDeclarator',
                                                init: {
                                                    type: 'AwaitExpression',
                                                    argument: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            object: {
                                                                type: 'ThisExpression',
                                                                start: 303,
                                                                end: 307,
                                                                loc: {
                                                                    start: {
                                                                        line: 12,
                                                                        column: 32
                                                                    },
                                                                    end: {
                                                                        line: 12,
                                                                        column: 36
                                                                    }
                                                                }
                                                            },
                                                            computed: false,
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'getValue',
                                                                start: 308,
                                                                end: 316,
                                                                loc: {
                                                                    start: {
                                                                        line: 12,
                                                                        column: 37
                                                                    },
                                                                    end: {
                                                                        line: 12,
                                                                        column: 45
                                                                    }
                                                                }
                                                            },
                                                            start: 303,
                                                            end: 316,
                                                            loc: {
                                                                start: {
                                                                    line: 12,
                                                                    column: 32
                                                                },
                                                                end: {
                                                                    line: 12,
                                                                    column: 45
                                                                }
                                                            }
                                                        },
                                                        arguments: [],
                                                        start: 303,
                                                        end: 318,
                                                        loc: {
                                                            start: {
                                                                line: 12,
                                                                column: 32
                                                            },
                                                            end: {
                                                                line: 12,
                                                                column: 47
                                                            }
                                                        }
                                                    },
                                                    start: 297,
                                                    end: 318,
                                                    loc: {
                                                        start: {
                                                            line: 12,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 12,
                                                            column: 47
                                                        }
                                                    }
                                                },
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'value',
                                                    start: 289,
                                                    end: 294,
                                                    loc: {
                                                        start: {
                                                            line: 12,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 12,
                                                            column: 23
                                                        }
                                                    }
                                                },
                                                start: 289,
                                                end: 318,
                                                loc: {
                                                    start: {
                                                        line: 12,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 12,
                                                        column: 47
                                                    }
                                                }
                                            }],
                                            kind: 'var',
                                            start: 285,
                                            end: 319,
                                            loc: {
                                                start: {
                                                    line: 12,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 12,
                                                    column: 48
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'ThisExpression',
                                                        start: 334,
                                                        end: 338,
                                                        loc: {
                                                            start: {
                                                                line: 13,
                                                                column: 14
                                                            },
                                                            end: {
                                                                line: 13,
                                                                column: 18
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'setValue',
                                                        start: 339,
                                                        end: 347,
                                                        loc: {
                                                            start: {
                                                                line: 13,
                                                                column: 19
                                                            },
                                                            end: {
                                                                line: 13,
                                                                column: 27
                                                            }
                                                        }
                                                    },
                                                    start: 334,
                                                    end: 347,
                                                    loc: {
                                                        start: {
                                                            line: 13,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 13,
                                                            column: 27
                                                        }
                                                    }
                                                },
                                                arguments: [{
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'value',
                                                        start: 348,
                                                        end: 353,
                                                        loc: {
                                                            start: {
                                                                line: 13,
                                                                column: 28
                                                            },
                                                            end: {
                                                                line: 13,
                                                                column: 33
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        start: 356,
                                                        end: 357,
                                                        loc: {
                                                            start: {
                                                                line: 13,
                                                                column: 36
                                                            },
                                                            end: {
                                                                line: 13,
                                                                column: 37
                                                            }
                                                        },
                                                        raw: '1'
                                                    },
                                                    operator: '+',
                                                    start: 348,
                                                    end: 357,
                                                    loc: {
                                                        start: {
                                                            line: 13,
                                                            column: 28
                                                        },
                                                        end: {
                                                            line: 13,
                                                            column: 37
                                                        }
                                                    }
                                                }],
                                                start: 334,
                                                end: 358,
                                                loc: {
                                                    start: {
                                                        line: 13,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 13,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            start: 334,
                                            end: 359,
                                            loc: {
                                                start: {
                                                    line: 13,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 13,
                                                    column: 39
                                                }
                                            }
                                        },
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'ThisExpression',
                                                        start: 381,
                                                        end: 385,
                                                        loc: {
                                                            start: {
                                                                line: 14,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 14,
                                                                column: 25
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'getValue',
                                                        start: 386,
                                                        end: 394,
                                                        loc: {
                                                            start: {
                                                                line: 14,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 14,
                                                                column: 34
                                                            }
                                                        }
                                                    },
                                                    start: 381,
                                                    end: 394,
                                                    loc: {
                                                        start: {
                                                            line: 14,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 14,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                arguments: [],
                                                start: 381,
                                                end: 396,
                                                loc: {
                                                    start: {
                                                        line: 14,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 14,
                                                        column: 36
                                                    }
                                                }
                                            },
                                            start: 374,
                                            end: 397,
                                            loc: {
                                                start: {
                                                    line: 14,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 14,
                                                    column: 37
                                                }
                                            }
                                        }
                                    ],
                                    start: 269,
                                    end: 411,
                                    loc: {
                                        start: {
                                            line: 11,
                                            column: 30
                                        },
                                        end: {
                                            line: 15,
                                            column: 13
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 266,
                                end: 411,
                                loc: {
                                    start: {
                                        line: 11,
                                        column: 27
                                    },
                                    end: {
                                        line: 15,
                                        column: 13
                                    }
                                }
                            },
                            static: false,
                            start: 251,
                            end: 411,
                            loc: {
                                start: {
                                    line: 11,
                                    column: 12
                                },
                                end: {
                                    line: 15,
                                    column: 13
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'getBaseClassName',
                                start: 430,
                                end: 446,
                                loc: {
                                    start: {
                                        line: 16,
                                        column: 18
                                    },
                                    end: {
                                        line: 16,
                                        column: 34
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: 'X',
                                            start: 472,
                                            end: 475,
                                            loc: {
                                                start: {
                                                    line: 17,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 17,
                                                    column: 24
                                                }
                                            },
                                            raw: '\'X\''
                                        },
                                        start: 465,
                                        end: 476,
                                        loc: {
                                            start: {
                                                line: 17,
                                                column: 14
                                            },
                                            end: {
                                                line: 17,
                                                column: 25
                                            }
                                        }
                                    }],
                                    start: 449,
                                    end: 490,
                                    loc: {
                                        start: {
                                            line: 16,
                                            column: 37
                                        },
                                        end: {
                                            line: 18,
                                            column: 13
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 446,
                                end: 490,
                                loc: {
                                    start: {
                                        line: 16,
                                        column: 34
                                    },
                                    end: {
                                        line: 18,
                                        column: 13
                                    }
                                }
                            },
                            static: false,
                            start: 424,
                            end: 490,
                            loc: {
                                start: {
                                    line: 16,
                                    column: 12
                                },
                                end: {
                                    line: 18,
                                    column: 13
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'getStaticValue',
                                start: 516,
                                end: 530,
                                loc: {
                                    start: {
                                        line: 19,
                                        column: 25
                                    },
                                    end: {
                                        line: 19,
                                        column: 39
                                    }
                                }
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: 44,
                                            start: 556,
                                            end: 558,
                                            loc: {
                                                start: {
                                                    line: 20,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 20,
                                                    column: 23
                                                }
                                            },
                                            raw: '44'
                                        },
                                        start: 549,
                                        end: 559,
                                        loc: {
                                            start: {
                                                line: 20,
                                                column: 14
                                            },
                                            end: {
                                                line: 20,
                                                column: 24
                                            }
                                        }
                                    }],
                                    start: 533,
                                    end: 573,
                                    loc: {
                                        start: {
                                            line: 19,
                                            column: 42
                                        },
                                        end: {
                                            line: 21,
                                            column: 13
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 530,
                                end: 573,
                                loc: {
                                    start: {
                                        line: 19,
                                        column: 39
                                    },
                                    end: {
                                        line: 21,
                                        column: 13
                                    }
                                }
                            },
                            static: true,
                            start: 503,
                            end: 573,
                            loc: {
                                start: {
                                    line: 19,
                                    column: 12
                                },
                                end: {
                                    line: 21,
                                    column: 13
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 10,
                                start: 592,
                                end: 594,
                                loc: {
                                    start: {
                                        line: 22,
                                        column: 18
                                    },
                                    end: {
                                        line: 22,
                                        column: 20
                                    }
                                },
                                raw: '10'
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: 46,
                                            start: 620,
                                            end: 622,
                                            loc: {
                                                start: {
                                                    line: 23,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 23,
                                                    column: 23
                                                }
                                            },
                                            raw: '46'
                                        },
                                        start: 613,
                                        end: 623,
                                        loc: {
                                            start: {
                                                line: 23,
                                                column: 14
                                            },
                                            end: {
                                                line: 23,
                                                column: 24
                                            }
                                        }
                                    }],
                                    start: 597,
                                    end: 637,
                                    loc: {
                                        start: {
                                            line: 22,
                                            column: 23
                                        },
                                        end: {
                                            line: 24,
                                            column: 13
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 594,
                                end: 637,
                                loc: {
                                    start: {
                                        line: 22,
                                        column: 20
                                    },
                                    end: {
                                        line: 24,
                                        column: 13
                                    }
                                }
                            },
                            static: false,
                            start: 586,
                            end: 637,
                            loc: {
                                start: {
                                    line: 22,
                                    column: 12
                                },
                                end: {
                                    line: 24,
                                    column: 13
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Literal',
                                value: 'foo',
                                start: 657,
                                end: 662,
                                loc: {
                                    start: {
                                        line: 25,
                                        column: 19
                                    },
                                    end: {
                                        line: 25,
                                        column: 24
                                    }
                                },
                                raw: '"foo"'
                            },
                            kind: 'method',
                            computed: true,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: 47,
                                            start: 689,
                                            end: 691,
                                            loc: {
                                                start: {
                                                    line: 26,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 26,
                                                    column: 23
                                                }
                                            },
                                            raw: '47'
                                        },
                                        start: 682,
                                        end: 692,
                                        loc: {
                                            start: {
                                                line: 26,
                                                column: 14
                                            },
                                            end: {
                                                line: 26,
                                                column: 24
                                            }
                                        }
                                    }],
                                    start: 666,
                                    end: 706,
                                    loc: {
                                        start: {
                                            line: 25,
                                            column: 28
                                        },
                                        end: {
                                            line: 27,
                                            column: 13
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 663,
                                end: 706,
                                loc: {
                                    start: {
                                        line: 25,
                                        column: 25
                                    },
                                    end: {
                                        line: 27,
                                        column: 13
                                    }
                                }
                            },
                            static: false,
                            start: 650,
                            end: 706,
                            loc: {
                                start: {
                                    line: 25,
                                    column: 12
                                },
                                end: {
                                    line: 27,
                                    column: 13
                                }
                            }
                        }
                    ],
                    start: 8,
                    end: 718,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 28,
                            column: 11
                        }
                    }
                },
                start: 0,
                end: 718,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 28,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 718,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 28,
                    column: 11
                }
            }
        }
    });

    pass(`class C {
        get 0() { return 'get string'; }
        set 0(param) { stringSet = param; }
      }`, {
        source: `class C {
            get 0() { return 'get string'; }
            set 0(param) { stringSet = param; }
          }`,
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Literal',
                                    value: 0,
                                    start: 26,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 2,
                                            column: 17
                                        }
                                    },
                                    raw: '0'
                                },
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Literal',
                                                    value: 'get string',
                                                    start: 39,
                                                    end: 51,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 29
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 41
                                                        }
                                                    },
                                                    raw: '\'get string\''
                                                },
                                                start: 32,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 42
                                                    }
                                                }
                                            }
                                        ],
                                        start: 30,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 20
                                            },
                                            end: {
                                                line: 2,
                                                column: 44
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 27,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 17
                                        },
                                        end: {
                                            line: 2,
                                            column: 44
                                        }
                                    }
                                },
                                static: false,
                                start: 22,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 2,
                                        column: 44
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Literal',
                                    value: 0,
                                    start: 71,
                                    end: 72,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 16
                                        },
                                        end: {
                                            line: 3,
                                            column: 17
                                        }
                                    },
                                    raw: '0'
                                },
                                kind: 'set',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'param',
                                            start: 73,
                                            end: 78,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 23
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
                                                    type: 'AssignmentExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'stringSet',
                                                        start: 82,
                                                        end: 91,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 27
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 36
                                                            }
                                                        }
                                                    },
                                                    operator: '=',
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'param',
                                                        start: 94,
                                                        end: 99,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 39
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 44
                                                            }
                                                        }
                                                    },
                                                    start: 82,
                                                    end: 99,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 44
                                                        }
                                                    }
                                                },
                                                start: 82,
                                                end: 100,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 45
                                                    }
                                                }
                                            }
                                        ],
                                        start: 80,
                                        end: 102,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 25
                                            },
                                            end: {
                                                line: 3,
                                                column: 47
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 72,
                                    end: 102,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 17
                                        },
                                        end: {
                                            line: 3,
                                            column: 47
                                        }
                                    }
                                },
                                static: false,
                                start: 67,
                                end: 102,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 12
                                    },
                                    end: {
                                        line: 3,
                                        column: 47
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 114,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 4,
                                column: 11
                            }
                        }
                    },
                    start: 0,
                    end: 114,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 114,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`class C { static async *method(x, y = x, z = y) {}}`, {
        source: 'class C { static async *method(x, y = x, z = y) {}}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 24,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 31,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        },
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'y',
                                                start: 34,
                                                end: 35,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 35
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'x',
                                                start: 38,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 38
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                }
                                            },
                                            start: 34,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'z',
                                                start: 41,
                                                end: 42,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 41
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 42
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'y',
                                                start: 45,
                                                end: 46,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 45
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 46
                                                    }
                                                }
                                            },
                                            start: 41,
                                            end: 46,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 46
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 48,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 48
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 30,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 50
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 51,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 51
                            }
                        }
                    },
                    start: 0,
                    end: 51,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 51
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 51,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 51
                }
            }
        }
    });

    pass(`class C { static async *method(a,) {  } }`, {
        source: 'class C { static async *method(a,) {  } }',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 24,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 31,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 35,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 30,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    });

    pass(`class C { static async *gen() { for await (let value of iterable) { yield value; } }}`, {
        source: 'class C { static async *gen() { for await (let value of iterable) { yield value; } }}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'gen',
                                    start: 24,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ForOfStatement',
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'Identifier',
                                                                    name: 'value',
                                                                    start: 74,
                                                                    end: 79,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 74
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 79
                                                                        }
                                                                    }
                                                                },
                                                                delegate: false,
                                                                start: 68,
                                                                end: 79,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 68
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 79
                                                                    }
                                                                }
                                                            },
                                                            start: 68,
                                                            end: 80,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 68
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 80
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 66,
                                                    end: 82,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 66
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 82
                                                        }
                                                    }
                                                },
                                                left: {
                                                    type: 'VariableDeclaration',
                                                    declarations: [
                                                        {
                                                            type: 'VariableDeclarator',
                                                            init: null,
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'value',
                                                                start: 47,
                                                                end: 52,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 47
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 52
                                                                    }
                                                                }
                                                            },
                                                            start: 47,
                                                            end: 52,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 47
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 52
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    kind: 'let',
                                                    start: 43,
                                                    end: 52,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 43
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 52
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'iterable',
                                                    start: 56,
                                                    end: 64,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 56
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 64
                                                        }
                                                    }
                                                },
                                                await: true,
                                                start: 32,
                                                end: 82,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 32
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 82
                                                    }
                                                }
                                            }
                                        ],
                                        start: 30,
                                        end: 84,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30
                                            },
                                            end: {
                                                line: 1,
                                                column: 84
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 27,
                                    end: 84,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 84
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 84,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 84
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 85,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 85
                            }
                        }
                    },
                    start: 0,
                    end: 85,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 85
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 85,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 85
                }
            }
        }
    });

    pass(`var log = [];
    var obj = {
      [Symbol.iterator]() {
        var throwCount = 0;
        return {
          name: "syncIterator",
          get next() {
            log.push({ name: "get next" });
            return function() {
              return {
                value: "next-value-1",
                done: false
              };
            };
          },
          get throw() {
            log.push({
              name: "get throw",
              thisValue: this
            });
            return function() {
              log.push({
                name: "call throw",
                thisValue: this,
                args: [...arguments]
              });

              throwCount++;
              if (throwCount == 1) {
                return {
                  name: "throw-result-1",
                  get value() {
                    log.push({
                      name: "get throw value (1)",
                      thisValue: this
                    });
                    return "throw-value-1";
                  },
                  get done() {
                    log.push({
                      name: "get throw done (1)",
                      thisValue: this
                    });
                    return false;
                  }
                };
              }

              return {
                name: "throw-result-2",
                get value() {
                  log.push({
                    name: "get throw value (2)",
                    thisValue: this
                  });
                  return "throw-value-2";
                },
                get done() {
                  log.push({
                    name: "get throw done (2)",
                    thisValue: this
                  });
                  return true;
                }
              };
            };
          }
        };
      }
    };`, {
        source: `var log = [];
        var obj = {
          [Symbol.iterator]() {
            var throwCount = 0;
            return {
              name: "syncIterator",
              get next() {
                log.push({ name: "get next" });
                return function() {
                  return {
                    value: "next-value-1",
                    done: false
                  };
                };
              },
              get throw() {
                log.push({
                  name: "get throw",
                  thisValue: this
                });
                return function() {
                  log.push({
                    name: "call throw",
                    thisValue: this,
                    args: [...arguments]
                  });

                  throwCount++;
                  if (throwCount == 1) {
                    return {
                      name: "throw-result-1",
                      get value() {
                        log.push({
                          name: "get throw value (1)",
                          thisValue: this
                        });
                        return "throw-value-1";
                      },
                      get done() {
                        log.push({
                          name: "get throw done (1)",
                          thisValue: this
                        });
                        return false;
                      }
                    };
                  }

                  return {
                    name: "throw-result-2",
                    get value() {
                      log.push({
                        name: "get throw value (2)",
                        thisValue: this
                      });
                      return "throw-value-2";
                    },
                    get done() {
                      log.push({
                        name: "get throw done (2)",
                        thisValue: this
                      });
                      return true;
                    }
                  };
                };
              }
            };
          }
        };`,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'ArrayExpression',
                                elements: []
                            },
                            id: {
                                type: 'Identifier',
                                name: 'log'
                            }
                        }
                    ],
                    kind: 'var'
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'MemberExpression',
                                            object: {
                                                type: 'Identifier',
                                                name: 'Symbol'
                                            },
                                            computed: false,
                                            property: {
                                                type: 'Identifier',
                                                name: 'iterator'
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'VariableDeclaration',
                                                        declarations: [
                                                            {
                                                                type: 'VariableDeclarator',
                                                                init: {
                                                                    type: 'Literal',
                                                                    value: 0,
                                                                    raw: '0'
                                                                },
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'throwCount'
                                                                }
                                                            }
                                                        ],
                                                        kind: 'var'
                                                    },
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'name'
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 'syncIterator',
                                                                        raw: '"syncIterator"'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'next'
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
                                                                                        type: 'CallExpression',
                                                                                        callee: {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'log'
                                                                                            },
                                                                                            computed: false,
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'push'
                                                                                            }
                                                                                        },
                                                                                        arguments: [
                                                                                            {
                                                                                                type: 'ObjectExpression',
                                                                                                properties: [
                                                                                                    {
                                                                                                        type: 'Property',
                                                                                                        key: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'name'
                                                                                                        },
                                                                                                        value: {
                                                                                                            type: 'Literal',
                                                                                                            value: 'get next',
                                                                                                            raw: '"get next"'
                                                                                                        },
                                                                                                        kind: 'init',
                                                                                                        computed: false,
                                                                                                        method: false,
                                                                                                        shorthand: false
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    type: 'ReturnStatement',
                                                                                    argument: {
                                                                                        type: 'FunctionExpression',
                                                                                        params: [],
                                                                                        body: {
                                                                                            type: 'BlockStatement',
                                                                                            body: [
                                                                                                {
                                                                                                    type: 'ReturnStatement',
                                                                                                    argument: {
                                                                                                        type: 'ObjectExpression',
                                                                                                        properties: [
                                                                                                            {
                                                                                                                type: 'Property',
                                                                                                                key: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'value'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    type: 'Literal',
                                                                                                                    value: 'next-value-1',
                                                                                                                    raw: '"next-value-1"'
                                                                                                                },
                                                                                                                kind: 'init',
                                                                                                                computed: false,
                                                                                                                method: false,
                                                                                                                shorthand: false
                                                                                                            },
                                                                                                            {
                                                                                                                type: 'Property',
                                                                                                                key: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'done'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    type: 'Literal',
                                                                                                                    value: false,
                                                                                                                    raw: 'false'
                                                                                                                },
                                                                                                                kind: 'init',
                                                                                                                computed: false,
                                                                                                                method: false,
                                                                                                                shorthand: false
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        async: false,
                                                                                        generator: false,
                                                                                        expression: false,
                                                                                        id: null
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        async: false,
                                                                        generator: false,
                                                                        expression: false,
                                                                        id: null
                                                                    },
                                                                    kind: 'get',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'throw'
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
                                                                                        type: 'CallExpression',
                                                                                        callee: {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'log'
                                                                                            },
                                                                                            computed: false,
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'push'
                                                                                            }
                                                                                        },
                                                                                        arguments: [
                                                                                            {
                                                                                                type: 'ObjectExpression',
                                                                                                properties: [
                                                                                                    {
                                                                                                        type: 'Property',
                                                                                                        key: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'name'
                                                                                                        },
                                                                                                        value: {
                                                                                                            type: 'Literal',
                                                                                                            value: 'get throw',
                                                                                                            raw: '"get throw"'
                                                                                                        },
                                                                                                        kind: 'init',
                                                                                                        computed: false,
                                                                                                        method: false,
                                                                                                        shorthand: false
                                                                                                    },
                                                                                                    {
                                                                                                        type: 'Property',
                                                                                                        key: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'thisValue'
                                                                                                        },
                                                                                                        value: {
                                                                                                            type: 'ThisExpression'
                                                                                                        },
                                                                                                        kind: 'init',
                                                                                                        computed: false,
                                                                                                        method: false,
                                                                                                        shorthand: false
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                },
                                                                                {
                                                                                    type: 'ReturnStatement',
                                                                                    argument: {
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
                                                                                                            type: 'MemberExpression',
                                                                                                            object: {
                                                                                                                type: 'Identifier',
                                                                                                                name: 'log'
                                                                                                            },
                                                                                                            computed: false,
                                                                                                            property: {
                                                                                                                type: 'Identifier',
                                                                                                                name: 'push'
                                                                                                            }
                                                                                                        },
                                                                                                        arguments: [
                                                                                                            {
                                                                                                                type: 'ObjectExpression',
                                                                                                                properties: [
                                                                                                                    {
                                                                                                                        type: 'Property',
                                                                                                                        key: {
                                                                                                                            type: 'Identifier',
                                                                                                                            name: 'name'
                                                                                                                        },
                                                                                                                        value: {
                                                                                                                            type: 'Literal',
                                                                                                                            value: 'call throw',
                                                                                                                            raw: '"call throw"'
                                                                                                                        },
                                                                                                                        kind: 'init',
                                                                                                                        computed: false,
                                                                                                                        method: false,
                                                                                                                        shorthand: false
                                                                                                                    },
                                                                                                                    {
                                                                                                                        type: 'Property',
                                                                                                                        key: {
                                                                                                                            type: 'Identifier',
                                                                                                                            name: 'thisValue'
                                                                                                                        },
                                                                                                                        value: {
                                                                                                                            type: 'ThisExpression'
                                                                                                                        },
                                                                                                                        kind: 'init',
                                                                                                                        computed: false,
                                                                                                                        method: false,
                                                                                                                        shorthand: false
                                                                                                                    },
                                                                                                                    {
                                                                                                                        type: 'Property',
                                                                                                                        key: {
                                                                                                                            type: 'Identifier',
                                                                                                                            name: 'args'
                                                                                                                        },
                                                                                                                        value: {
                                                                                                                            type: 'ArrayExpression',
                                                                                                                            elements: [
                                                                                                                                {
                                                                                                                                    type: 'SpreadElement',
                                                                                                                                    argument: {
                                                                                                                                        type: 'Identifier',
                                                                                                                                        name: 'arguments'
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            ]
                                                                                                                        },
                                                                                                                        kind: 'init',
                                                                                                                        computed: false,
                                                                                                                        method: false,
                                                                                                                        shorthand: false
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    type: 'ExpressionStatement',
                                                                                                    expression: {
                                                                                                        type: 'UpdateExpression',
                                                                                                        argument: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'throwCount'
                                                                                                        },
                                                                                                        operator: '++',
                                                                                                        prefix: false
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    type: 'IfStatement',
                                                                                                    test: {
                                                                                                        type: 'BinaryExpression',
                                                                                                        left: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'throwCount'
                                                                                                        },
                                                                                                        right: {
                                                                                                            type: 'Literal',
                                                                                                            value: 1,
                                                                                                            raw: '1'
                                                                                                        },
                                                                                                        operator: '=='
                                                                                                    },
                                                                                                    alternate: null,
                                                                                                    consequent: {
                                                                                                        type: 'BlockStatement',
                                                                                                        body: [
                                                                                                            {
                                                                                                                type: 'ReturnStatement',
                                                                                                                argument: {
                                                                                                                    type: 'ObjectExpression',
                                                                                                                    properties: [
                                                                                                                        {
                                                                                                                            type: 'Property',
                                                                                                                            key: {
                                                                                                                                type: 'Identifier',
                                                                                                                                name: 'name'
                                                                                                                            },
                                                                                                                            value: {
                                                                                                                                type: 'Literal',
                                                                                                                                value: 'throw-result-1',
                                                                                                                                raw: '"throw-result-1"'
                                                                                                                            },
                                                                                                                            kind: 'init',
                                                                                                                            computed: false,
                                                                                                                            method: false,
                                                                                                                            shorthand: false
                                                                                                                        },
                                                                                                                        {
                                                                                                                            type: 'Property',
                                                                                                                            key: {
                                                                                                                                type: 'Identifier',
                                                                                                                                name: 'value'
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
                                                                                                                                                type: 'CallExpression',
                                                                                                                                                callee: {
                                                                                                                                                    type: 'MemberExpression',
                                                                                                                                                    object: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'log'
                                                                                                                                                    },
                                                                                                                                                    computed: false,
                                                                                                                                                    property: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'push'
                                                                                                                                                    }
                                                                                                                                                },
                                                                                                                                                arguments: [
                                                                                                                                                    {
                                                                                                                                                        type: 'ObjectExpression',
                                                                                                                                                        properties: [
                                                                                                                                                            {
                                                                                                                                                                type: 'Property',
                                                                                                                                                                key: {
                                                                                                                                                                    type: 'Identifier',
                                                                                                                                                                    name: 'name'
                                                                                                                                                                },
                                                                                                                                                                value: {
                                                                                                                                                                    type: 'Literal',
                                                                                                                                                                    value: 'get throw value (1)',
                                                                                                                                                                    raw: '"get throw value (1)"'
                                                                                                                                                                },
                                                                                                                                                                kind: 'init',
                                                                                                                                                                computed: false,
                                                                                                                                                                method: false,
                                                                                                                                                                shorthand: false
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                type: 'Property',
                                                                                                                                                                key: {
                                                                                                                                                                    type: 'Identifier',
                                                                                                                                                                    name: 'thisValue'
                                                                                                                                                                },
                                                                                                                                                                value: {
                                                                                                                                                                    type: 'ThisExpression'
                                                                                                                                                                },
                                                                                                                                                                kind: 'init',
                                                                                                                                                                computed: false,
                                                                                                                                                                method: false,
                                                                                                                                                                shorthand: false
                                                                                                                                                            }
                                                                                                                                                        ]
                                                                                                                                                    }
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            type: 'ReturnStatement',
                                                                                                                                            argument: {
                                                                                                                                                type: 'Literal',
                                                                                                                                                value: 'throw-value-1',
                                                                                                                                                raw: '"throw-value-1"'
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                async: false,
                                                                                                                                generator: false,
                                                                                                                                expression: false,
                                                                                                                                id: null
                                                                                                                            },
                                                                                                                            kind: 'get',
                                                                                                                            computed: false,
                                                                                                                            method: false,
                                                                                                                            shorthand: false
                                                                                                                        },
                                                                                                                        {
                                                                                                                            type: 'Property',
                                                                                                                            key: {
                                                                                                                                type: 'Identifier',
                                                                                                                                name: 'done'
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
                                                                                                                                                type: 'CallExpression',
                                                                                                                                                callee: {
                                                                                                                                                    type: 'MemberExpression',
                                                                                                                                                    object: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'log'
                                                                                                                                                    },
                                                                                                                                                    computed: false,
                                                                                                                                                    property: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'push'
                                                                                                                                                    }
                                                                                                                                                },
                                                                                                                                                arguments: [
                                                                                                                                                    {
                                                                                                                                                        type: 'ObjectExpression',
                                                                                                                                                        properties: [
                                                                                                                                                            {
                                                                                                                                                                type: 'Property',
                                                                                                                                                                key: {
                                                                                                                                                                    type: 'Identifier',
                                                                                                                                                                    name: 'name'
                                                                                                                                                                },
                                                                                                                                                                value: {
                                                                                                                                                                    type: 'Literal',
                                                                                                                                                                    value: 'get throw done (1)',
                                                                                                                                                                    raw: '"get throw done (1)"'
                                                                                                                                                                },
                                                                                                                                                                kind: 'init',
                                                                                                                                                                computed: false,
                                                                                                                                                                method: false,
                                                                                                                                                                shorthand: false
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                type: 'Property',
                                                                                                                                                                key: {
                                                                                                                                                                    type: 'Identifier',
                                                                                                                                                                    name: 'thisValue'
                                                                                                                                                                },
                                                                                                                                                                value: {
                                                                                                                                                                    type: 'ThisExpression'
                                                                                                                                                                },
                                                                                                                                                                kind: 'init',
                                                                                                                                                                computed: false,
                                                                                                                                                                method: false,
                                                                                                                                                                shorthand: false
                                                                                                                                                            }
                                                                                                                                                        ]
                                                                                                                                                    }
                                                                                                                                                ]
                                                                                                                                            }
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            type: 'ReturnStatement',
                                                                                                                                            argument: {
                                                                                                                                                type: 'Literal',
                                                                                                                                                value: false,
                                                                                                                                                raw: 'false'
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                },
                                                                                                                                async: false,
                                                                                                                                generator: false,
                                                                                                                                expression: false,
                                                                                                                                id: null
                                                                                                                            },
                                                                                                                            kind: 'get',
                                                                                                                            computed: false,
                                                                                                                            method: false,
                                                                                                                            shorthand: false
                                                                                                                        }
                                                                                                                    ]
                                                                                                                }
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                },
                                                                                                {
                                                                                                    type: 'ReturnStatement',
                                                                                                    argument: {
                                                                                                        type: 'ObjectExpression',
                                                                                                        properties: [
                                                                                                            {
                                                                                                                type: 'Property',
                                                                                                                key: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'name'
                                                                                                                },
                                                                                                                value: {
                                                                                                                    type: 'Literal',
                                                                                                                    value: 'throw-result-2',
                                                                                                                    raw: '"throw-result-2"'
                                                                                                                },
                                                                                                                kind: 'init',
                                                                                                                computed: false,
                                                                                                                method: false,
                                                                                                                shorthand: false
                                                                                                            },
                                                                                                            {
                                                                                                                type: 'Property',
                                                                                                                key: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'value'
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
                                                                                                                                    type: 'CallExpression',
                                                                                                                                    callee: {
                                                                                                                                        type: 'MemberExpression',
                                                                                                                                        object: {
                                                                                                                                            type: 'Identifier',
                                                                                                                                            name: 'log'
                                                                                                                                        },
                                                                                                                                        computed: false,
                                                                                                                                        property: {
                                                                                                                                            type: 'Identifier',
                                                                                                                                            name: 'push'
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    arguments: [
                                                                                                                                        {
                                                                                                                                            type: 'ObjectExpression',
                                                                                                                                            properties: [
                                                                                                                                                {
                                                                                                                                                    type: 'Property',
                                                                                                                                                    key: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'name'
                                                                                                                                                    },
                                                                                                                                                    value: {
                                                                                                                                                        type: 'Literal',
                                                                                                                                                        value: 'get throw value (2)',
                                                                                                                                                        raw: '"get throw value (2)"'
                                                                                                                                                    },
                                                                                                                                                    kind: 'init',
                                                                                                                                                    computed: false,
                                                                                                                                                    method: false,
                                                                                                                                                    shorthand: false
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    type: 'Property',
                                                                                                                                                    key: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'thisValue'
                                                                                                                                                    },
                                                                                                                                                    value: {
                                                                                                                                                        type: 'ThisExpression'
                                                                                                                                                    },
                                                                                                                                                    kind: 'init',
                                                                                                                                                    computed: false,
                                                                                                                                                    method: false,
                                                                                                                                                    shorthand: false
                                                                                                                                                }
                                                                                                                                            ]
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'ReturnStatement',
                                                                                                                                argument: {
                                                                                                                                    type: 'Literal',
                                                                                                                                    value: 'throw-value-2',
                                                                                                                                    raw: '"throw-value-2"'
                                                                                                                                }
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    async: false,
                                                                                                                    generator: false,
                                                                                                                    expression: false,
                                                                                                                    id: null
                                                                                                                },
                                                                                                                kind: 'get',
                                                                                                                computed: false,
                                                                                                                method: false,
                                                                                                                shorthand: false
                                                                                                            },
                                                                                                            {
                                                                                                                type: 'Property',
                                                                                                                key: {
                                                                                                                    type: 'Identifier',
                                                                                                                    name: 'done'
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
                                                                                                                                    type: 'CallExpression',
                                                                                                                                    callee: {
                                                                                                                                        type: 'MemberExpression',
                                                                                                                                        object: {
                                                                                                                                            type: 'Identifier',
                                                                                                                                            name: 'log'
                                                                                                                                        },
                                                                                                                                        computed: false,
                                                                                                                                        property: {
                                                                                                                                            type: 'Identifier',
                                                                                                                                            name: 'push'
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    arguments: [
                                                                                                                                        {
                                                                                                                                            type: 'ObjectExpression',
                                                                                                                                            properties: [
                                                                                                                                                {
                                                                                                                                                    type: 'Property',
                                                                                                                                                    key: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'name'
                                                                                                                                                    },
                                                                                                                                                    value: {
                                                                                                                                                        type: 'Literal',
                                                                                                                                                        value: 'get throw done (2)',
                                                                                                                                                        raw: '"get throw done (2)"'
                                                                                                                                                    },
                                                                                                                                                    kind: 'init',
                                                                                                                                                    computed: false,
                                                                                                                                                    method: false,
                                                                                                                                                    shorthand: false
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    type: 'Property',
                                                                                                                                                    key: {
                                                                                                                                                        type: 'Identifier',
                                                                                                                                                        name: 'thisValue'
                                                                                                                                                    },
                                                                                                                                                    value: {
                                                                                                                                                        type: 'ThisExpression'
                                                                                                                                                    },
                                                                                                                                                    kind: 'init',
                                                                                                                                                    computed: false,
                                                                                                                                                    method: false,
                                                                                                                                                    shorthand: false
                                                                                                                                                }
                                                                                                                                            ]
                                                                                                                                        }
                                                                                                                                    ]
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                type: 'ReturnStatement',
                                                                                                                                argument: {
                                                                                                                                    type: 'Literal',
                                                                                                                                    value: true,
                                                                                                                                    raw: 'true'
                                                                                                                                }
                                                                                                                            }
                                                                                                                        ]
                                                                                                                    },
                                                                                                                    async: false,
                                                                                                                    generator: false,
                                                                                                                    expression: false,
                                                                                                                    id: null
                                                                                                                },
                                                                                                                kind: 'get',
                                                                                                                computed: false,
                                                                                                                method: false,
                                                                                                                shorthand: false
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                }
                                                                                            ]
                                                                                        },
                                                                                        async: false,
                                                                                        generator: false,
                                                                                        expression: false,
                                                                                        id: null
                                                                                    }
                                                                                }
                                                                            ]
                                                                        },
                                                                        async: false,
                                                                        generator: false,
                                                                        expression: false,
                                                                        id: null
                                                                    },
                                                                    kind: 'get',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null
                                        },
                                        kind: 'init',
                                        computed: true,
                                        method: true,
                                        shorthand: false
                                    }
                                ]
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj'
                            }
                        }
                    ],
                    kind: 'var'
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`class C { async *method([...[x, y, z]]) { } };`, {
        source: 'class C { async *method([...[x, y, z]]) { } };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'RestElement',
                                                    argument: {
                                                        type: 'ArrayPattern',
                                                        elements: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'x',
                                                                start: 29,
                                                                end: 30,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 29
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 30
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                type: 'Identifier',
                                                                name: 'y',
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
                                                            {
                                                                type: 'Identifier',
                                                                name: 'z',
                                                                start: 35,
                                                                end: 36,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 35
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 36
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 28,
                                                        end: 37,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 28
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 37
                                                            }
                                                        }
                                                    },
                                                    start: 25,
                                                    end: 37,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 37
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 24,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 40,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 23,
                                    end: 43,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 43
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    },
                    start: 0,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 45
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 45,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 45
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    });

    pass(`class C { async *method([arrow = () => {}] = []) { } };`, {
        source: 'class C { async *method([arrow = () => {}] = []) { } };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ArrayPattern',
                                                elements: [
                                                    {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'arrow',
                                                            start: 25,
                                                            end: 30,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 25
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 30
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'ArrowFunctionExpression',
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [],
                                                                start: 39,
                                                                end: 41,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 39
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 41
                                                                    }
                                                                }
                                                            },
                                                            params: [],
                                                            id: null,
                                                            async: false,
                                                            generator: false,
                                                            expression: false,
                                                            start: 33,
                                                            end: 41,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 33
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 41
                                                                }
                                                            }
                                                        },
                                                        start: 25,
                                                        end: 41,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 25
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 41
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 24,
                                                end: 42,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 42
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ArrayExpression',
                                                elements: [],
                                                start: 45,
                                                end: 47,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 45
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 47
                                                    }
                                                }
                                            },
                                            start: 24,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 49,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 49
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 23,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 54,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 54
                            }
                        }
                    },
                    start: 0,
                    end: 54,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 54
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 54,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 54
                        },
                        end: {
                            line: 1,
                            column: 55
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 55,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 55
                }
            }
        }
    });

    pass(`class C { async *method({ cover = (function () {}), xCover = (0, function() {})  } = {}) { } };`, {
        source: 'class C { async *method({ cover = (function () {}), xCover = (0, function() {})  } = {}) { } };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'cover',
                                                            start: 26,
                                                            end: 31,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 26
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 31
                                                                }
                                                            }
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'AssignmentPattern',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'cover',
                                                                start: 26,
                                                                end: 31,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 26
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 31
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'FunctionExpression',
                                                                params: [],
                                                                body: {
                                                                    type: 'BlockStatement',
                                                                    body: [],
                                                                    start: 47,
                                                                    end: 49,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 47
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 49
                                                                        }
                                                                    }
                                                                },
                                                                async: false,
                                                                generator: false,
                                                                expression: false,
                                                                id: null,
                                                                start: 35,
                                                                end: 49,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 35
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 49
                                                                    }
                                                                }
                                                            },
                                                            start: 26,
                                                            end: 50,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 26
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 50
                                                                }
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: true,
                                                        start: 26,
                                                        end: 50,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 50
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'xCover',
                                                            start: 52,
                                                            end: 58,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 52
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 58
                                                                }
                                                            }
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'AssignmentPattern',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'xCover',
                                                                start: 52,
                                                                end: 58,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 52
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 58
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'SequenceExpression',
                                                                expressions: [
                                                                    {
                                                                        type: 'Literal',
                                                                        value: 0,
                                                                        start: 62,
                                                                        end: 63,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 62
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 63
                                                                            }
                                                                        },
                                                                        raw: '0'
                                                                    },
                                                                    {
                                                                        type: 'FunctionExpression',
                                                                        params: [],
                                                                        body: {
                                                                            type: 'BlockStatement',
                                                                            body: [],
                                                                            start: 76,
                                                                            end: 78,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 1,
                                                                                    column: 76
                                                                                },
                                                                                end: {
                                                                                    line: 1,
                                                                                    column: 78
                                                                                }
                                                                            }
                                                                        },
                                                                        async: false,
                                                                        generator: false,
                                                                        expression: false,
                                                                        id: null,
                                                                        start: 65,
                                                                        end: 78,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 65
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 78
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 62,
                                                                end: 78,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 62
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 78
                                                                    }
                                                                }
                                                            },
                                                            start: 52,
                                                            end: 79,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 52
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 79
                                                                }
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: true,
                                                        start: 52,
                                                        end: 79,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 52
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 79
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 24,
                                                end: 82,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 82
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ObjectExpression',
                                                properties: [],
                                                start: 85,
                                                end: 87,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 85
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 87
                                                    }
                                                }
                                            },
                                            start: 24,
                                            end: 87,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 87
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 89,
                                        end: 92,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 89
                                            },
                                            end: {
                                                line: 1,
                                                column: 92
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 23,
                                    end: 92,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 92
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 92,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 92
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 94,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 94
                            }
                        }
                    },
                    start: 0,
                    end: 94,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 94
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 94,
                    end: 95,
                    loc: {
                        start: {
                            line: 1,
                            column: 94
                        },
                        end: {
                            line: 1,
                            column: 95
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 95,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 95
                }
            }
        }
    });

    pass(`class C { async *method({ poisoned }) { } };`, {
        source: 'class C { async *method({ poisoned }) { } };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 17,
                                    end: 23,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'poisoned',
                                                        start: 26,
                                                        end: 34,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 34
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'poisoned',
                                                        start: 26,
                                                        end: 34,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 34
                                                            }
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
                                                    start: 26,
                                                    end: 34,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 24,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 38,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 23,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 41
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    start: 0,
                    end: 43,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 43
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 43,
                    end: 44,
                    loc: {
                        start: {
                            line: 1,
                            column: 43
                        },
                        end: {
                            line: 1,
                            column: 44
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 44,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 44
                }
            }
        }
    });

    pass(`class C { static async *method({ x = thrower() } = {}) { }};`, {
        source: 'class C { static async *method({ x = thrower() } = {}) { }};',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 24,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
                                                            start: 33,
                                                            end: 34,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 33
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 34
                                                                }
                                                            }
                                                        },
                                                        computed: false,
                                                        value: {
                                                            type: 'AssignmentPattern',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'x',
                                                                start: 33,
                                                                end: 34,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 33
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 34
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'CallExpression',
                                                                callee: {
                                                                    type: 'Identifier',
                                                                    name: 'thrower',
                                                                    start: 37,
                                                                    end: 44,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 37
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 44
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [],
                                                                start: 37,
                                                                end: 46,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 37
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 46
                                                                    }
                                                                }
                                                            },
                                                            start: 33,
                                                            end: 46,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 33
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 46
                                                                }
                                                            }
                                                        },
                                                        method: false,
                                                        shorthand: true,
                                                        start: 33,
                                                        end: 46,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 33
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 46
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 31,
                                                end: 48,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 48
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ObjectExpression',
                                                properties: [],
                                                start: 51,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 51
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 53
                                                    }
                                                }
                                            },
                                            start: 31,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 53
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 55,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 55
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 30,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 58,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 58
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 59,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 59
                            }
                        }
                    },
                    start: 0,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 59,
                    end: 60,
                    loc: {
                        start: {
                            line: 1,
                            column: 59
                        },
                        end: {
                            line: 1,
                            column: 60
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 60,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 60
                }
            }
        }
    });

    pass(`class C { static async *gen() { yield* obj; }}`, {
        source: 'class C { static async *gen() { yield* obj; }}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'gen',
                                    start: 24,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                kind: 'method',
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
                                                    type: 'YieldExpression',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'obj',
                                                        start: 39,
                                                        end: 42,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 39
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 42
                                                            }
                                                        }
                                                    },
                                                    delegate: true,
                                                    start: 32,
                                                    end: 42,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 32
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 42
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
                                        start: 30,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 27,
                                    end: 45,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 45
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        }
                    },
                    start: 0,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    });

    pass(`class C { *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) { } };`, {
        source: 'class C { *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) { } };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 11,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'ObjectPattern',
                                                        properties: [
                                                            {
                                                                type: 'Property',
                                                                kind: 'init',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'x',
                                                                    start: 21,
                                                                    end: 22,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 21
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 22
                                                                        }
                                                                    }
                                                                },
                                                                computed: false,
                                                                value: {
                                                                    type: 'Identifier',
                                                                    name: 'x',
                                                                    start: 21,
                                                                    end: 22,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 21
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 22
                                                                        }
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: true,
                                                                start: 21,
                                                                end: 22,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 21
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 22
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                type: 'Property',
                                                                kind: 'init',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'y',
                                                                    start: 24,
                                                                    end: 25,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 24
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                computed: false,
                                                                value: {
                                                                    type: 'Identifier',
                                                                    name: 'y',
                                                                    start: 24,
                                                                    end: 25,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 24
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                method: false,
                                                                shorthand: true,
                                                                start: 24,
                                                                end: 25,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 24
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 25
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                type: 'Property',
                                                                kind: 'init',
                                                                key: {
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
                                                                value: {
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
                                                                method: false,
                                                                shorthand: true,
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
                                                            }
                                                        ],
                                                        start: 19,
                                                        end: 30,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 19
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 30
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'ObjectExpression',
                                                        properties: [
                                                            {
                                                                type: 'Property',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'x',
                                                                    start: 35,
                                                                    end: 36,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 35
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 36
                                                                        }
                                                                    }
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    value: 44,
                                                                    start: 38,
                                                                    end: 40,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 38
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 40
                                                                        }
                                                                    },
                                                                    raw: '44'
                                                                },
                                                                kind: 'init',
                                                                computed: false,
                                                                method: false,
                                                                shorthand: false,
                                                                start: 35,
                                                                end: 40,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 35
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 40
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                type: 'Property',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'y',
                                                                    start: 42,
                                                                    end: 43,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 42
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 43
                                                                        }
                                                                    }
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    value: 55,
                                                                    start: 45,
                                                                    end: 47,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 45
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 47
                                                                        }
                                                                    },
                                                                    raw: '55'
                                                                },
                                                                kind: 'init',
                                                                computed: false,
                                                                method: false,
                                                                shorthand: false,
                                                                start: 42,
                                                                end: 47,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 42
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 47
                                                                    }
                                                                }
                                                            },
                                                            {
                                                                type: 'Property',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'z',
                                                                    start: 49,
                                                                    end: 50,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 49
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 50
                                                                        }
                                                                    }
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    value: 66,
                                                                    start: 52,
                                                                    end: 54,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 52
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 54
                                                                        }
                                                                    },
                                                                    raw: '66'
                                                                },
                                                                kind: 'init',
                                                                computed: false,
                                                                method: false,
                                                                shorthand: false,
                                                                start: 49,
                                                                end: 54,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 49
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 54
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 33,
                                                        end: 56,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 33
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 56
                                                            }
                                                        }
                                                    },
                                                    start: 19,
                                                    end: 56,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 56
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 18,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 59,
                                        end: 62,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 59
                                            },
                                            end: {
                                                line: 1,
                                                column: 62
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 17,
                                    end: 62,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 62
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 62
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 64,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 64
                            }
                        }
                    },
                    start: 0,
                    end: 64,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 64
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 64,
                    end: 65,
                    loc: {
                        start: {
                            line: 1,
                            column: 64
                        },
                        end: {
                            line: 1,
                            column: 65
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 65,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 65
                }
            }
        }
    });

    pass(`class C { *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {}}`, {
        source: 'class C { *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {}}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 11,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ArrayPattern',
                                                elements: [
                                                    {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'ObjectPattern',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        start: 21,
                                                                        end: 22,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 21
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 22
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        start: 21,
                                                                        end: 22,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 21
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 22
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                    start: 21,
                                                                    end: 22,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 21
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 22
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'y',
                                                                        start: 24,
                                                                        end: 25,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 24
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 25
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'y',
                                                                        start: 24,
                                                                        end: 25,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 24
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 25
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                    start: 24,
                                                                    end: 25,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 24
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
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
                                                                    value: {
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
                                                                    method: false,
                                                                    shorthand: true,
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
                                                                }
                                                            ],
                                                            start: 19,
                                                            end: 30,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 19
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 30
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        start: 35,
                                                                        end: 36,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 35
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 36
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 44,
                                                                        start: 38,
                                                                        end: 40,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 38
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 40
                                                                            }
                                                                        },
                                                                        raw: '44'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 35,
                                                                    end: 40,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 35
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 40
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'y',
                                                                        start: 42,
                                                                        end: 43,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 42
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 43
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 55,
                                                                        start: 45,
                                                                        end: 47,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 45
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 47
                                                                            }
                                                                        },
                                                                        raw: '55'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 42,
                                                                    end: 47,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 42
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 47
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'z',
                                                                        start: 49,
                                                                        end: 50,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 49
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 50
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 66,
                                                                        start: 52,
                                                                        end: 54,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 52
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 54
                                                                            }
                                                                        },
                                                                        raw: '66'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 49,
                                                                    end: 54,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 49
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 54
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 33,
                                                            end: 56,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 33
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 56
                                                                }
                                                            }
                                                        },
                                                        start: 19,
                                                        end: 56,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 19
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 56
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 18,
                                                end: 57,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 57
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ArrayExpression',
                                                elements: [],
                                                start: 60,
                                                end: 62,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 60
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 62
                                                    }
                                                }
                                            },
                                            start: 18,
                                            end: 62,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 62
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 64,
                                        end: 66,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 64
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 17,
                                    end: 66,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 66
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 66,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 66
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 67,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 67
                            }
                        }
                    },
                    start: 0,
                    end: 67,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 67
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 67,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 67
                }
            }
        }
    });

    pass(`class C { *method({ w: { x, y, z } = undefined }) {}}`, {
        source: 'class C { *method({ w: { x, y, z } = undefined }) {}}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 11,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'w',
                                                        start: 20,
                                                        end: 21,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 21
                                                            }
                                                        }
                                                    },
                                                    computed: false,
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'ObjectPattern',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        start: 25,
                                                                        end: 26,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 25
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 26
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'x',
                                                                        start: 25,
                                                                        end: 26,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 25
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 26
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                    start: 25,
                                                                    end: 26,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 25
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 26
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'y',
                                                                        start: 28,
                                                                        end: 29,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 28
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 29
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'y',
                                                                        start: 28,
                                                                        end: 29,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 28
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 29
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                    start: 28,
                                                                    end: 29,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 28
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 29
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    kind: 'init',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'z',
                                                                        start: 31,
                                                                        end: 32,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 31
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 32
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'Identifier',
                                                                        name: 'z',
                                                                        start: 31,
                                                                        end: 32,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 31
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 32
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: true,
                                                                    start: 31,
                                                                    end: 32,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 31
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 32
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 23,
                                                            end: 34,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 23
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 34
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'Identifier',
                                                            name: 'undefined',
                                                            start: 37,
                                                            end: 46,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 37
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 46
                                                                }
                                                            }
                                                        },
                                                        start: 23,
                                                        end: 46,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 46
                                                            }
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: false,
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
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 50,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 50
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 17,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 53,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 53
                            }
                        }
                    },
                    start: 0,
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 53
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 53,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 53
                }
            }
        }
    });

    pass(`class C { static *method([[...x] = values]) {}}`, {
        source: 'class C { static *method([[...x] = values]) {}}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'ArrayPattern',
                                                        elements: [
                                                            {
                                                                type: 'RestElement',
                                                                argument: {
                                                                    type: 'Identifier',
                                                                    name: 'x',
                                                                    start: 30,
                                                                    end: 31,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 30
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 31
                                                                        }
                                                                    }
                                                                },
                                                                start: 27,
                                                                end: 31,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 27
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 31
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 26,
                                                        end: 32,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 32
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'values',
                                                        start: 35,
                                                        end: 41,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 35
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 41
                                                            }
                                                        }
                                                    },
                                                    start: 26,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 25,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
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
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 24,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 47,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 47
                            }
                        }
                    },
                    start: 0,
                    end: 47,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 47
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 47,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 47
                }
            }
        }
    });

    pass(`class C { static *method([gen = function* () {}, xGen = function* x() {}] = []) { } };`, {
        source: 'class C { static *method([gen = function* () {}, xGen = function* x() {}] = []) { } };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'method',
                                    start: 18,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ArrayPattern',
                                                elements: [
                                                    {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'gen',
                                                            start: 26,
                                                            end: 29,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 26
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 29
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'FunctionExpression',
                                                            params: [],
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [],
                                                                start: 45,
                                                                end: 47,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 45
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 47
                                                                    }
                                                                }
                                                            },
                                                            async: false,
                                                            generator: true,
                                                            expression: false,
                                                            id: null,
                                                            start: 32,
                                                            end: 47,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 32
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 47
                                                                }
                                                            }
                                                        },
                                                        start: 26,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'xGen',
                                                            start: 49,
                                                            end: 53,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 49
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 53
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: 'FunctionExpression',
                                                            params: [],
                                                            body: {
                                                                type: 'BlockStatement',
                                                                body: [],
                                                                start: 70,
                                                                end: 72,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 70
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 72
                                                                    }
                                                                }
                                                            },
                                                            async: false,
                                                            generator: true,
                                                            expression: false,
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'x',
                                                                start: 66,
                                                                end: 67,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 66
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 67
                                                                    }
                                                                }
                                                            },
                                                            start: 56,
                                                            end: 72,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 56
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 72
                                                                }
                                                            }
                                                        },
                                                        start: 49,
                                                        end: 72,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 49
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 72
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 25,
                                                end: 73,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 73
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'ArrayExpression',
                                                elements: [],
                                                start: 76,
                                                end: 78,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 76
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 78
                                                    }
                                                }
                                            },
                                            start: 25,
                                            end: 78,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 78
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 80,
                                        end: 83,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 80
                                            },
                                            end: {
                                                line: 1,
                                                column: 83
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 24,
                                    end: 83,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 83
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 83,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 83
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 85,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 85
                            }
                        }
                    },
                    start: 0,
                    end: 85,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 85
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 85,
                    end: 86,
                    loc: {
                        start: {
                            line: 1,
                            column: 85
                        },
                        end: {
                            line: 1,
                            column: 86
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 86,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 86
                }
            }
        }
    });

    pass(`class A {get a(){} set b(c){};};`, {
        source: 'class A {get a(){} set b(c){};};',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
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
                        body: [{
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 13,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 16,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 14,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                static: false,
                                start: 9,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 23,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'Identifier',
                                        name: 'c',
                                        start: 25,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 27,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 24,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
                                static: false,
                                start: 19,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    },
                    start: 0,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 31,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 31
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                }
            ],
            sourceType: 'script',
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

    pass(`class C {
        static get 'line\
      Continuation'() { return 'get string'; }
        static set 'line\
      Continuation'(param) { stringSet = param; }
      }`, {
        source: `class C {
            static get 'line\
          Continuation'() { return 'get string'; }
            static set 'line\
          Continuation'(param) { stringSet = param; }
          }`,
        raw: true,
        expected: {
              body: [
                {
                  body: {
                    body: [
                      {
                        computed: false,
                        key: {
                          raw: '\'line          Continuation\'',
                          type: 'Literal',
                          value: 'line          Continuation',
                        },
                        kind: 'get',
                        static: true,
                        type: 'MethodDefinition',
                        value: {
                          async: false,
                          body: {
                            body: [
                              {
                                argument: {
                                  raw: '\'get string\'',
                                  type: 'Literal',
                                  value: 'get string',
                                },
                                type: 'ReturnStatement'
                              }
                            ],
                            type: 'BlockStatement',
                          },
                          expression: false,
                          generator: false,
                          id: null,
                         params: [],
                          type: 'FunctionExpression'
                        }
                      },
                      {
                        computed: false,
                        key: {
                          raw: '\'line          Continuation\'',
                          type: 'Literal',
                          value: 'line          Continuation',
                        },
                        kind: 'set',
                        static: true,
                        type: 'MethodDefinition',
                        value: {
                          async: false,
                          body: {
                            body: [
                              {
                                expression: {
                                  left: {
                                    name: 'stringSet',
                                    type: 'Identifier',
                                  },
                                  operator: '=',
                                  right: {
                                    name: 'param',
                                    type: 'Identifier'
                                  },
                                  type: 'AssignmentExpression'
                                },
                                type: 'ExpressionStatement'
                              }
                            ],
                            type: 'BlockStatement'
                          },
                          expression: false,
                          generator: false,
                          id: null,
                          params: [
                            {
                              name: 'param',
                              type: 'Identifier'
                            }
                          ],
                         type: 'FunctionExpression'
                        }
                     }
                   ],
                    type: 'ClassBody',
                  },
                  id: {
                    name: 'C',
                    type: 'Identifier',
                  },
                 superClass: null,
                  type: 'ClassDeclaration'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`(class { yield() {}});`, {
        source: '(class { yield() {}});',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    key: {
                                        type: 'Identifier',
                                        name: 'yield',
                                        start: 9,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        }
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 17,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 14,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    static: false,
                                    start: 9,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        start: 1,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    start: 0,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 22,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 22
                }
            }
        }
    });

    pass(`class C { static get catch () {}}`, {
        source: 'class C { static get catch () {}}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
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
                                key: {
                                    type: 'Identifier',
                                    name: 'catch',
                                    start: 21,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 30,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 27,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 33,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 33
                }
            }
        }
    });

});

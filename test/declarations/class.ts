import { pass, fail } from '../utils';

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

    fail(`class {}`, {
        source: `class {}`
    });

    fail(`class extends A{}`, {
        source: `class extends A{}`
    });

    fail(`class a{ *() {} }`, {
        source: `class a{ *() {} }`
    });

    fail(`class a { \\u0061sync* m(){} }`, {
        source: `class a { \\u0061sync* m(){} }`
    });

    fail(`class A {} class A {}`, {
        source: `class A {}
        class A {}`
    });

    fail(`class C { st\\u0061tic m() {}  }`, {
        source: `class C { st\\u0061tic m() {}  }`
    });

    fail('class a{ get get a() {} }', {
        source: `class a{ get get a() {} }`
    });

    fail(`class a{ get async a() {} }`, {
        source: `class a{ get async a() {} }`
    });

    fail(`(class { *static x() {} })`, {
        source: `(class { *static x() {} })`
    });

    fail(`(class {*foo(a = yield b) {}})`, {
        source: `(class {*foo(a = yield b) {}})`
    });

    fail(`function* foo(a = class extends (yield b) {}) {}`, {
        source: `function* foo(a = class extends (yield b) {}) {}`
    });

    fail(`(class {*foo(a = yield b) {}})`, {
        source: `(class {*foo(a = yield b) {}})`
    });

    fail(`class a {static "prototype"(){}}`, {
        source: `class a {static "prototype"(){}}`
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

    pass(`class A {}`, {
        source: `class A {}`,
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
                    body: [],
                    start: 8,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                },
                start: 0,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 10,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 10
                }
            }
        }
    });

    pass(`class A extends class B extends C {} {}`, {
        source: `class A extends class B extends C {} {}`,
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
                    type: 'ClassExpression',
                    id: {
                        type: 'Identifier',
                        name: 'B',
                        start: 22,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    superClass: {
                        type: 'Identifier',
                        name: 'C',
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
                    body: {
                        type: 'ClassBody',
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
                    start: 16,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 16
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                },
                body: {
                    type: 'ClassBody',
                    body: [],
                    start: 37,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 37
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
            }],
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

    pass(`class A {get() {}}`, {
        source: `class A {get() {}}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 18,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 18
              }
            },
            body: [
              {
                type: 'ClassDeclaration',
                start: 0,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                },
                id: {
                  type: 'Identifier',
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
                  },
                  name: 'A'
                },
                superClass: null,
                body: {
                  type: 'ClassBody',
                  start: 8,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  body: [
                    {
                      type: 'MethodDefinition',
                      start: 9,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      },
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 9,
                        end: 12,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 12
                          }
                        },
                        name: 'get'
                      },
                      static: false,
                      kind: 'method',
                      value: {
                        type: 'FunctionExpression',
                        start: 12,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 15,
                          end: 17,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
                            },
                            end: {
                              line: 1,
                              column: 17
                            }
                          },
                          body: []
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

});
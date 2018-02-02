import { pass, fail } from '../test-utils';

describe('Expressions - Class', () => {

    fail(`(class {a:0})`, {
        source: '(class {a:0})',
        line: 1,
    });

    fail(`class C {  static set ['prototype'](x) {}  }`, {
        source: 'class C {  static set ["prototype"](x) {}  }',
        line: 1,
    });

    fail(`(class {3:0})`, {
        source: '(class {3:0})',
        line: 1,
    });

    fail(`(class {[3]:0})`, {
        source: '(class {[3]:0})',
        line: 1,
    });

    fail(`(class {[3]:0})`, {
        source: '(class {[3]:0})',
        next: true,
        line: 1,
    });

    fail(`(class {)`, {
        source: '(class {)',
        line: 1,
    });

    fail(`(class extends a,b {})`, {
        source: '(class extends a,b {})',
        line: 1,
    });

    fail(`(class extends !a {})`, {
        source: '(class extends !a {})',
        line: 1,
    });

    fail(`(class [a] {})`, {
        source: '(class [a] {})',
        line: 1,
    });

    fail(`(class {[a,b](){}})`, {
        source: '(class {[a,b](){}})',
        line: 1,
    });

    // Esprima issue #1875
    pass(`class UserRepo{ async get(id) { return id; }  }`, {
        source: `class UserRepo{ async get(id) { return id; }  }`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'UserRepo',
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
                                    name: 'get',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'id',
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
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'id',
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
                                            }
                                        ],
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
                                    },
                                    async: true,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                    }
                                },
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
                                }
                            }
                        ],
                        start: 14,
                        end: 47,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
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

    pass(`(class {prototype() {}})`, {
        source: `(class {prototype() {}})`,
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
                                        name: 'prototype'
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: []
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null
                                    },
                                    static: false
                                }
                            ]
                        }
                    }
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`(class extends (a,b) {})`, {
        source: `(class extends (a,b) {})`,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'ClassExpression',
                id: null,
                superClass: {
                    type: 'SequenceExpression',
                    expressions: [
                        {
                            type: 'Identifier',
                            name: 'a'
                        },
                        {
                            type: 'Identifier',
                            name: 'b'
                        }
                    ]
                },
                body: {
                    type: 'ClassBody',
                    body: []
                }
            }
        }
    ],
    sourceType: 'script'
}
    });

    pass(`(class extends 0{})`, {
        source: '(class extends 0{})',
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
                        superClass: {
                            type: 'Literal',
                            value: 0,
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
                            },
                            raw: '0'
                        },
                        body: {
                            type: 'ClassBody',
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
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
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

    pass(`(class {;;;\n;a(){}b(){}})`, {
        source: '(class {;;;\n;a(){}b(){}})',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    body: {
                      body: [
                        {
                         computed: false,
                          key: {
                            name: 'a',
                            type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                            async: false,
                            body: {
                              body: [],
                             type: 'BlockStatement'
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
                            name: 'b',
                            type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                            async: false,
                            body: {
                              body: [],
                              type: 'BlockStatement'
                            },
                            expression: false,
                            generator: false,
                            id: null,
                            params: [],
                            type: 'FunctionExpression'
                         }
                        }
                      ],
                      type: 'ClassBody'
                    },
                    id: null,
                    superClass: null,
                    type: 'ClassExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`(class {get a() {}})`, {
        source: '(class {get a() {}})',
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
                                        name: 'a',
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
                                    }
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass(`(class extends (a,b) {})`, {
        source: '(class extends (a,b) {})',
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
                        superClass: {
                            type: 'SequenceExpression',
                            expressions: [
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
                                },
                                {
                                    type: 'Identifier',
                                    name: 'b',
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
                                }
                            ],
                            start: 16,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        body: {
                            type: 'ClassBody',
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

    pass(`(class {static(){}})`, {
        source: '(class {static(){}})',
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
                                        name: 'static',
                                        start: 8,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
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
                                    }
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass(`(class {static constructor(){}})`, {
        source: '(class {static constructor(){}})',
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
                                        start: 26,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    static: true,
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
                                }
                            ],
                            start: 7,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        start: 1,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 31
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

    pass(`(class{[3+5](){}})`, {
        source: '(class{[3+5](){}})',
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
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Literal',
                                            value: 3,
                                            start: 8,
                                            end: 9,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 9
                                                }
                                            },
                                            raw: '3'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 5,
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
                                            },
                                            raw: '5'
                                        },
                                        operator: '+',
                                        start: 8,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
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
                                            start: 14,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 12,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    static: false,
                                    start: 7,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                }
                            ],
                            start: 6,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        start: 1,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });
/*
    pass(`({ a(){ (class {[super.a](){}}); } })`, {
        source: '({ a(){ (class {[super.a](){}}); } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 3,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
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
                                                    type: 'ClassExpression',
                                                    id: null,
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        body: [
                                                            {
                                                                type: 'MethodDefinition',
                                                                key: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'Super',
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
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
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
                                                                    start: 17,
                                                                    end: 24,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 17
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 24
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
                                                                    start: 25,
                                                                    end: 29,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 25
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 29
                                                                        }
                                                                    }
                                                                },
                                                                static: false,
                                                                start: 16,
                                                                end: 29,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 16
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 29
                                                                    }
                                                                }
                                                            }
                                                        ],
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
                                                },
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
                                            }
                                        ],
                                        start: 6,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
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
                                    start: 4,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 3,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    start: 0,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 37,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 37
                }
            }
        }
    });
*/
    pass(`var C = class { async *method({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) { } };`, {
        source: 'var C = class { async *method({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) { } };',
        loc: true,
        ranges: true,
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
                                                name: 'method',
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
                                                                        name: 'w',
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
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'AssignmentPattern',
                                                                        left: {
                                                                            type: 'ArrayPattern',
                                                                            elements: [
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    name: 'x',
                                                                                    start: 36,
                                                                                    end: 37,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 1,
                                                                                            column: 36
                                                                                        },
                                                                                        end: {
                                                                                            line: 1,
                                                                                            column: 37
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    name: 'y',
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
                                                                                },
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    name: 'z',
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
                                                                                }
                                                                            ],
                                                                            start: 35,
                                                                            end: 44,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 1,
                                                                                    column: 35
                                                                                },
                                                                                end: {
                                                                                    line: 1,
                                                                                    column: 44
                                                                                }
                                                                            }
                                                                        },
                                                                        right: {
                                                                            type: 'ArrayExpression',
                                                                            elements: [
                                                                                {
                                                                                    type: 'Literal',
                                                                                    value: 4,
                                                                                    start: 48,
                                                                                    end: 49,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 1,
                                                                                            column: 48
                                                                                        },
                                                                                        end: {
                                                                                            line: 1,
                                                                                            column: 49
                                                                                        }
                                                                                    },
                                                                                    raw: '4'
                                                                                },
                                                                                {
                                                                                    type: 'Literal',
                                                                                    value: 5,
                                                                                    start: 51,
                                                                                    end: 52,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 1,
                                                                                            column: 51
                                                                                        },
                                                                                        end: {
                                                                                            line: 1,
                                                                                            column: 52
                                                                                        }
                                                                                    },
                                                                                    raw: '5'
                                                                                },
                                                                                {
                                                                                    type: 'Literal',
                                                                                    value: 6,
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
                                                                                    },
                                                                                    raw: '6'
                                                                                }
                                                                            ],
                                                                            start: 47,
                                                                            end: 56,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 1,
                                                                                    column: 47
                                                                                },
                                                                                end: {
                                                                                    line: 1,
                                                                                    column: 56
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 35,
                                                                        end: 56,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 35
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 56
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 32,
                                                                    end: 56,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 32
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 56
                                                                        }
                                                                    }
                                                                }
                                                            ],
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
                                                        right: {
                                                            type: 'ObjectExpression',
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'w',
                                                                        start: 63,
                                                                        end: 64,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 63
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 64
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'ArrayExpression',
                                                                        elements: [
                                                                            {
                                                                                type: 'Literal',
                                                                                value: 7,
                                                                                start: 67,
                                                                                end: 68,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 1,
                                                                                        column: 67
                                                                                    },
                                                                                    end: {
                                                                                        line: 1,
                                                                                        column: 68
                                                                                    }
                                                                                },
                                                                                raw: '7'
                                                                            },
                                                                            {
                                                                                type: 'Identifier',
                                                                                name: 'undefined',
                                                                                start: 70,
                                                                                end: 79,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 1,
                                                                                        column: 70
                                                                                    },
                                                                                    end: {
                                                                                        line: 1,
                                                                                        column: 79
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
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 63,
                                                                    end: 82,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 63
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 82
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 61,
                                                            end: 84,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 61
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 84
                                                                }
                                                            }
                                                        },
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
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
                                                    start: 86,
                                                    end: 89,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 86
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 89
                                                        }
                                                    }
                                                },
                                                async: true,
                                                generator: true,
                                                expression: false,
                                                id: null,
                                                start: 29,
                                                end: 89,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 89
                                                    }
                                                }
                                            },
                                            static: false,
                                            start: 16,
                                            end: 89,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 89
                                                }
                                            }
                                        }
                                    ],
                                    start: 14,
                                    end: 91,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 91
                                        }
                                    }
                                },
                                start: 8,
                                end: 91,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 91
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'C',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            start: 4,
                            end: 91,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 91
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 92,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 92
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 92,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 92
                }
            }
        }
    });

    pass(`class A { a(){} };`, {
        source: 'class A { a(){} };',
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
                                    name: 'a',
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
                                        start: 13,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 11,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                static: false,
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
                            }
                        ],
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
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 17,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 17
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`class A {static a(){};};`, {
        source: 'class A {static a(){};};',
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
                },
                {
                    type: 'EmptyStatement',
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

    pass(`(class extends 0{});`, {
        source: '(class extends 0{});',
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
                        superClass: {
                            type: 'Literal',
                            value: 0,
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
                            },
                            raw: '0'
                        },
                        body: {
                            type: 'ClassBody',
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
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
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

    pass(`(class A {});`, {
        source: '(class A {});',
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
                        id: {
                            type: 'Identifier',
                            name: 'A',
                            start: 7,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [],
                            start: 9,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        start: 1,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
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

    pass(`(class {a() {}})`, {
        source: `(class {a() {}})`,
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
                                        name: 'a'
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: []
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null
                                    },
                                    static: false
                                }
                            ]
                        }
                    }
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`(class {3() {}})`, {
        source: `(class {3() {}})`,
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
                                        type: 'Literal',
                                        value: 3
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: []
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null
                                    },
                                    static: false
                                }
                            ]
                        }
                    }
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`(class{[3+5](){}})`, {
        source: `(class{[3+5](){}})`,
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
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Literal',
                                            value: 3
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 5
                                        },
                                        operator: '+'
                                    },
                                    kind: 'method',
                                    computed: true,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: []
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null
                                    },
                                    static: false
                                }
                            ]
                        }
                    }
                }
            ],
            sourceType: 'script'
        }
    });

    pass('(class extends A {})', {
        source: '(class extends A {})',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: {
                            type: 'Identifier',
                            name: 'A',
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
                        },
                        body: {
                            type: 'ClassBody',
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
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass('(class {;;;\n;\n})', {
        source: '(class {;;;\n;\n})',
        expected: {
              body: [
                {
                  expression: {
                    body: {
                      body: [],
                     type: 'ClassBody',
                    },
                    id: null,
                    superClass: null,
                    type: 'ClassExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass('(class {set a(b) {}})', {
        source: '(class {set a(b) {}})',
        loc: true,
        ranges: true,
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
                                        name: 'a',
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
                                    },
                                    kind: 'set',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            }
                                        ],
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
                                        start: 13,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    },
                                    static: false,
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
            ],
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

    pass('(class {get a() {}})', {
        source: '(class {get a() {}})',
        loc: true,
        ranges: true,
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
                                        name: 'a',
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
                                    }
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass('(class {prototype() {}})', {
        source: '(class {prototype() {}})',
        loc: true,
        ranges: true,
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

    pass('(class {a() {}})', {
        source: '(class {a() {}})',
        loc: true,
        ranges: true,
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
                                        name: 'a',
                                        start: 8,
                                        end: 9,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 9
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
                                            start: 12,
                                            end: 14,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
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
                                    static: false,
                                    start: 8,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        start: 1,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 16,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 16
                }
            }
        }
    });

    pass('(class extends (a,b) {})', {
        source: '(class extends (a,b) {})',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: {
                            type: 'SequenceExpression',
                            expressions: [
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
                                },
                                {
                                    type: 'Identifier',
                                    name: 'b',
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
                                }
                            ],
                            start: 16,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        body: {
                            type: 'ClassBody',
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

    pass('(class {static(){}})', {
        source: '(class {static(){}})',
        loc: true,
        ranges: true,
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
                                        name: 'static',
                                        start: 8,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
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
                                    }
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass('(class {static constructor(){}})', {
        source: '(class {static constructor(){}})',
        loc: true,
        ranges: true,
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
                                        start: 26,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    static: true,
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
                                }
                            ],
                            start: 7,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        start: 1,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 31
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

    pass('(class { ;; });', {
        source: '(class { ;; });',
        loc: true,
        ranges: true,
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
                            body: [],
                            start: 7,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        start: 1,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 15,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }
    });

    pass('(class { m() {} });', {
        source: '(class { m() {} });',
        loc: true,
        ranges: true,
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
                                        name: 'm',
                                        start: 9,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
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
                                            start: 13,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
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
                                    static: false,
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
                                }
                            ],
                            start: 7,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        start: 1,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 17
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

    pass('(class { m() {}; n(x) {} });', {
        source: '(class { m() {}; n(x) {} });',
        loc: true,
        ranges: true,
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
                                        name: 'm',
                                        start: 9,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
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
                                            start: 13,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
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
                                    static: false,
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
                                {
                                    type: 'MethodDefinition',
                                    key: {
                                        type: 'Identifier',
                                        name: 'n',
                                        start: 17,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
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
                                                start: 19,
                                                end: 20,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 20
                                                    }
                                                }
                                            }
                                        ],
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
                                    static: false,
                                    start: 17,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        start: 1,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 26
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

    pass('(class { get() {} });', {
        source: '(class { get() {} });',
        loc: true,
        ranges: true,
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
                                        name: 'get',
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
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
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
                                        }
                                    },
                                    static: false,
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
                                    }
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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
                }
            ],
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

    pass('(class { get static() {} });', {
        source: '(class { get static() {} });',
        loc: true,
        ranges: true,
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
                                        name: 'static',
                                        start: 13,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
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
                                }
                            ],
                            start: 7,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        },
                        start: 1,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 26
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

    pass('(class { set static(v) {} });', {
        source: '(class { set static(v) {} });',
        loc: true,
        ranges: true,
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
                                        name: 'static',
                                        start: 13,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
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
                                                name: 'v',
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
                                            }
                                        ],
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
                                        start: 19,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 19
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    static: false,
                                    start: 9,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        start: 1,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 27
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

    pass('(class { static async *x(){} });', {
        source: '(class { static async *x(){} });',
        loc: true,
        ranges: true,
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
                                        name: 'x',
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
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
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
                                        async: true,
                                        generator: true,
                                        expression: false,
                                        id: null,
                                        start: 24,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
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
                            start: 7,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        },
                        start: 1,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 30
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

    pass('(class { static async x(){} });', {
        source: '(class { static async x(){} });',
        loc: true,
        ranges: true,
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
                                        name: 'x',
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
                                    kind: 'method',
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
                                        async: true,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 23,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        }
                                    },
                                    static: true,
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
                            start: 7,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        },
                        start: 1,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 29
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

    /*
    pass('(class { async set(){}  });', {
        source: '(class { async set(){}  });',
        loc: true,
        ranges: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [
                                {
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "set",
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
                                    "kind": "method",
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [],
                                            "start": 20,
                                            "end": 22,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        "async": true,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 18,
                                        "end": 22,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 22
                                            }
                                        }
                                    },
                                    "static": false,
                                    "start": 9,
                                    "end": 22,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 9
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 22
                                        }
                                    }
                                }
                            ],
                            "start": 7,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
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

    */
    pass('(class { async async(){}  });', {
        source: '(class { async async(){}  });',
        loc: true,
        ranges: true,
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
                                        name: 'async',
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
                                        async: true,
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
                                }
                            ],
                            start: 7,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        start: 1,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 27
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

    pass('(class { *a(){}  });', {
        source: '(class { *a(){}  });',
        loc: true,
        ranges: true,
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
                                        name: 'a',
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
                                            start: 13,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: true,
                                        expression: false,
                                        id: null,
                                        start: 11,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    static: false,
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
                                }
                            ],
                            start: 7,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        start: 1,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 18
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

    pass('(class { async(){}  });', {
        source: '(class { async(){}  });',
        loc: true,
        ranges: true,
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
                                        name: 'async',
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
                                }
                            ],
                            start: 7,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
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

    pass(`(class {})`, {
        source: '(class {})',
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
                        start: 1,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 9
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
                }
            ],
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

    pass(`(class {;;;\n;a(){}b(){}})`, {
        source: '(class {;;;\n;a(){}b(){}})',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    body: {
                      body: [
                        {
                         computed: false,
                          key: {
                            name: 'a',
                            type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                            async: false,
                            body: {
                              body: [],
                             type: 'BlockStatement'
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
                            name: 'b',
                            type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                            async: false,
                            body: {
                              body: [],
                              type: 'BlockStatement'
                            },
                            expression: false,
                            generator: false,
                            id: null,
                            params: [],
                            type: 'FunctionExpression'
                         }
                        }
                      ],
                      type: 'ClassBody'
                    },
                    id: null,
                    superClass: null,
                    type: 'ClassExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`(class {get a() {}})`, {
        source: '(class {get a() {}})',
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
                                        name: 'a',
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
                                    }
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass(`(class extends (a,b) {})`, {
        source: '(class extends (a,b) {})',
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
                        superClass: {
                            type: 'SequenceExpression',
                            expressions: [
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
                                },
                                {
                                    type: 'Identifier',
                                    name: 'b',
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
                                }
                            ],
                            start: 16,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        body: {
                            type: 'ClassBody',
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

    pass(`(class {static(){}})`, {
        source: '(class {static(){}})',
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
                                        name: 'static',
                                        start: 8,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
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
                                    }
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass(`(class {static constructor(){}})`, {
        source: '(class {static constructor(){}})',
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
                                        start: 26,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    static: true,
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
                                }
                            ],
                            start: 7,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        start: 1,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 31
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

    pass(`({ a(){ (class {[super.a](){}}); } })`, {
        source: '({ a(){ (class {[super.a](){}}); } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 3,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
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
                                                    type: 'ClassExpression',
                                                    id: null,
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        body: [
                                                            {
                                                                type: 'MethodDefinition',
                                                                key: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'Super',
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
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
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
                                                                    start: 17,
                                                                    end: 24,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 17
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 24
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
                                                                    start: 25,
                                                                    end: 29,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 25
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 29
                                                                        }
                                                                    }
                                                                },
                                                                static: false,
                                                                start: 16,
                                                                end: 29,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 16
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 29
                                                                    }
                                                                }
                                                            }
                                                        ],
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
                                                },
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
                                            }
                                        ],
                                        start: 6,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
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
                                    start: 4,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 3,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    start: 0,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 37,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 37
                }
            }
        }
    });

    pass(`class A { a(){} };`, {
        source: 'class A { a(){} };',
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
                                    name: 'a',
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
                                        start: 13,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 11,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                static: false,
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
                            }
                        ],
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
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
                {
                    type: 'EmptyStatement',
                    start: 17,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 17
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`class A {static a(){};};`, {
        source: 'class A {static a(){};};',
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
                },
                {
                    type: 'EmptyStatement',
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

    pass(`(class A {});`, {
        source: '(class A {});',
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
                        id: {
                            type: 'Identifier',
                            name: 'A',
                            start: 7,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [],
                            start: 9,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        start: 1,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
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

    pass('var C = class { async *method() { var x = () => { } } }', {
        source: 'var C = class { async *method() { var x = () => { } } }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
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
                                                name: 'method',
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
                                            kind: 'method',
                                            computed: false,
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
                                                                        type: 'ArrowFunctionExpression',
                                                                        body: {
                                                                            type: 'BlockStatement',
                                                                            body: [],
                                                                            start: 48,
                                                                            end: 51,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 1,
                                                                                    column: 48
                                                                                },
                                                                                end: {
                                                                                    line: 1,
                                                                                    column: 51
                                                                                }
                                                                            }
                                                                        },
                                                                        params: [],
                                                                        id: null,
                                                                        async: false,
                                                                        generator: false,
                                                                        expression: false,
                                                                        start: 42,
                                                                        end: 51,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 42
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 51
                                                                            }
                                                                        }
                                                                    },
                                                                    id: {
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
                                                                    start: 38,
                                                                    end: 51,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 38
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 51
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            kind: 'var',
                                                            start: 34,
                                                            end: 51,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 34
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 51
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 32,
                                                    end: 53,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 32
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 53
                                                        }
                                                    }
                                                },
                                                async: true,
                                                generator: true,
                                                expression: false,
                                                id: null,
                                                start: 29,
                                                end: 53,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 53
                                                    }
                                                }
                                            },
                                            static: false,
                                            start: 16,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 53
                                                }
                                            }
                                        }
                                    ],
                                    start: 14,
                                    end: 55,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 55
                                        }
                                    }
                                },
                                start: 8,
                                end: 55,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 55
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'C',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            start: 4,
                            end: 55,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 55
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`({ a(){ (class {[super.a](){}}); } })`, {
        source: '({ a(){ (class {[super.a](){}}); } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 3,
                                    end: 4,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 4
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
                                                    type: 'ClassExpression',
                                                    id: null,
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        body: [
                                                            {
                                                                type: 'MethodDefinition',
                                                                key: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'Super',
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
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
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
                                                                    start: 17,
                                                                    end: 24,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 17
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 24
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
                                                                    start: 25,
                                                                    end: 29,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 25
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 29
                                                                        }
                                                                    }
                                                                },
                                                                static: false,
                                                                start: 16,
                                                                end: 29,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 16
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 29
                                                                    }
                                                                }
                                                            }
                                                        ],
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
                                                },
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
                                            }
                                        ],
                                        start: 6,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
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
                                    start: 4,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 3,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        }
                    },
                    start: 0,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 37,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 37
                }
            }
        }
    });

});
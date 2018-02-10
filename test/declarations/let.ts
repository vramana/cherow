import { pass, fail } from '../test-utils';

describe('Declarations - Let', () => {

    fail('let {a: o.a} = obj;', {
        source: 'let {a: o.a} = obj;',
        message:  'Unexpected token identifier',
        line: 1,
        column: 10,
        index: 10
    });

    fail('let Infinity', {
        source: 'let Infinity'
    });

    fail('let let| split across two lines', {
        source: `let
    let = foo;`,
    message: 'let is disallowed as a lexically bound name',
    line: 1,
    column: 3,
    index: 3
    });

    fail(`do let
    [x] = 0
    while (false);`, {
        source: `do let
        [x] = 0
        while (false);`,
        message: 'Unexpected token let',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`for (var x in null) let
    [a] = 0;`, {
        source: `for (var x in null) let
        [a] = 0;`,
        message: 'Unexpected token let',
        line: 1,
        column: 23,
        index: 23
    });

    fail(`if (false) let
    [a] = 0;`, {
        source: `if (false) let
        [a] = 0;`,
        message: 'Unexpected token let',
        line: 1,
        column: 14,
        index: 14
    });

    fail('let [x]', {
        source: 'let [x]',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 7,
        index: 7
    });

    fail('let {x}', {
        source: 'let {x}',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 7,
        index: 7
    });

    fail('for (;false;) let x;', {
        source: 'for (;false;) let x;',
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
        line: 1,
        column: 17,
        index: 17
    });

    fail('if (true) {} else let x;', {
        source: 'if (true) {} else let x;',
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
        line: 1,
        column: 21,
        index: 21
    });

    fail('a: let a', {
        source: 'a: let a',
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
        line: 1,
        column: 6,
        index: 6
    });

    fail('if (true) let x = 1;', {
        source: 'if (true) let x = 1;',
        message:  'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
        line: 1,
        column: 13,
        index: 13
    });

    fail('while (false) let x;', {
        source: 'while (false) let x;',
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'identifier\'',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`function f() {
        let
        await 0;
    }`, {
        source: `function f() {
            let
            await 0;
        }`,
        message: 'A semicolon was expected (or a \'}\' if appropriate), but got \'number\'',
        line: 3,
        column: 17,
        index: 48
    });

    fail('let test = 2, let = 1;', {
        source: 'let test = 2, let = 1;',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 13,
        index: 13
    });

    fail('let [a, let, b] = [1, 2, 3];', {
        source: 'let [a, let, b] = [1, 2, 3];',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 7,
        index: 7
    });

    // 'let' should not be an allowed name in destructuring let declarations
    fail('let [a, let, b] = [1, 2, 3];', {
        source: 'let [a, let, b] = [1, 2, 3];',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 7,
        index: 7
    });

    fail('for(let let in { }) { };', {
        source: 'for(let let in { }) { };',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 7,
        index: 7
    });

    pass(`let eval = 1, arguments = 2`, {
        source: `let eval = 1, arguments = 2`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 1,
                                start: 11,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                },
                                raw: '1'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'eval',
                                start: 4,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            start: 4,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 2,
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
                                },
                                raw: '2'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'arguments',
                                start: 14,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            start: 14,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }
                    ],
                    kind: 'let',
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
                }
            ],
            sourceType: 'script',
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
        }
    });

    pass(`let [a,,b] = c`, {
        source: `let [a,,b] = c`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'Identifier',
                        name: 'c',
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
                    id: {
                        type: 'ArrayPattern',
                        elements: [{
                                type: 'Identifier',
                                name: 'a',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            null,
                            {
                                type: 'Identifier',
                                name: 'b',
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
                            }
                        ],
                        start: 4,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 4,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                }],
                kind: 'let',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }
    });

    pass(`let++;`, {
        source: 'let++;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'let',
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            }
                        },
                        operator: '++',
                        prefix: false,
                        start: 0,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 6,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 6
                }
            }
        }
    });

    pass(`let: 34`, {
        source: 'let: 34',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [
                {
                  body: {
                    end: 7,
                    expression: {
                      end: 7,
                      loc: {
                       end: {
                          column: 7,
                          line: 1
                        },
                        start: {
                          column: 5,
                          line: 1,
                        }
                      },
                      raw: '34',
                      start: 5,
                      type: 'Literal',
                     value: 34
                    },
                    loc: {
                      end: {
                        column: 7,
                        line: 1,
                      },
                      start: {
                        column: 5,
                        line: 1,
                      }
                    },
                    start: 5,
                    type: 'ExpressionStatement'
                  },
                  end: 7,
                  label: {
                    end: 3,
                    loc: {
                      end: {
                        column: 3,
                        line: 1,
                      },
                      start: {
                        column: 0,
                       line: 1,
                      }
                    },
                    name: 'let',
                    start: 0,
                    type: 'Identifier'
                  },
                  loc: {
                    end: {
                     column: 7,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    }
                  },
                  start: 0,
                  type: 'LabeledStatement'
                }
             ],
              end: 7,
              loc: {
                end: {
                  column: 7,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`let(100)`, {
        source: 'let(100)',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'let',
                            start: 0,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Literal',
                                value: 100,
                                start: 4,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                },
                                raw: '100'
                            }
                        ],
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
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
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'ObjectExpression',
                        properties: [],
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
                    id: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            kind: 'init',
                            key: {
                                type: 'Identifier',
                                name: 'a',
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            computed: false,
                            value: {
                                type: 'Identifier',
                                name: 'b',
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
                            method: false,
                            shorthand: false,
                            start: 5,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        }],
                        start: 4,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 4,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                }],
                kind: 'let',
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
            }],
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

    pass(`let instanceof Foo`, {
        source: `let instanceof Foo`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'let',
                        start: 0,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'Foo',
                        start: 15,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    operator: 'instanceof',
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
            }],
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

    pass(`let async = ""`, {
        source: `let async = ""`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'Literal',
                        value: '',
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
                        },
                        raw: '""'
                    },
                    id: {
                        type: 'Identifier',
                        name: 'async',
                        start: 4,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    start: 4,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                }],
                kind: 'let',
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
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
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'ArrowFunctionExpression',
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
                        params: [],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 12,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    id: {
                        type: 'Identifier',
                        name: 'arrow',
                        start: 4,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    start: 4,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                }],
                kind: 'let',
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

    pass(`let xCls2 = class { static name() {} };`, {
        source: `let xCls2 = class { static name() {} };`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [{
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'name',
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
                                },
                                kind: 'method',
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
                                static: true,
                                start: 20,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }],
                            start: 18,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            }
                        },
                        start: 12,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        }
                    },
                    id: {
                        type: 'Identifier',
                        name: 'xCls2',
                        start: 4,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    start: 4,
                    end: 38,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 38
                        }
                    }
                }],
                kind: 'let',
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

    pass(`{ let x = 14, y = 3, z = 1977 }`, {
        source: `{ let x = 14, y = 3, z = 1977 }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'BlockStatement',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 14,
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
                                },
                                raw: '14'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            start: 6,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 3,
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
                                },
                                raw: '3'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'y',
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
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 1977,
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
                                },
                                raw: '1977'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'z',
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
                            start: 21,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        }
                    ],
                    kind: 'let',
                    start: 2,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 29
                        }
                    }
                }],
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

    pass(`{ let x = 42 }`, {
        source: `{ let x = 42 }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'BlockStatement',
                body: [{
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'Literal',
                            value: 42,
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
                            },
                            raw: '42'
                        },
                        id: {
                            type: 'Identifier',
                            name: 'x',
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
                        start: 6,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    }],
                    kind: 'let',
                    start: 2,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 12
                        }
                    }
                }],
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
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
        type: 'Program',
        body: [{
            type: 'VariableDeclaration',
            declarations: [{
                type: 'VariableDeclarator',
                init: {
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
                    generator: true,
                    expression: false,
                    id: null,
                    start: 10,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                },
                id: {
                    type: 'Identifier',
                    name: 'gen',
                    start: 4,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                },
                start: 4,
                end: 24,
                loc: {
                    start: {
                        line: 1,
                        column: 4
                    },
                    end: {
                        line: 1,
                        column: 24
                    }
                }
            }],
            kind: 'let',
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
        }],
        sourceType: 'script',
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
    }
    });

    pass(`let // ASI
    a;`, {
        source: `let // ASI
        a;`,
        raw: true,
        expected: {
              body: [
                {
                  declarations: [
                    {
                      id: {
                       name: 'a',
                        type: 'Identifier'
                      },
                     init: null,
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'let',
                  type: 'VariableDeclaration'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`let // ASI
    a;`, {
        source: `l\\u0065t // ASI
        a;`,
        raw: true,
        expected: {
              body: [
               {
                  expression: {
                    name: 'let',
                    type: 'Identifier'
                  },
                  type: 'ExpressionStatement'
                },
                {
                 expression: {
                    name: 'a',
                    type: 'Identifier'
                  },
                 type: 'ExpressionStatement'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });
    });
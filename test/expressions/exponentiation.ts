import { pass, fail } from '../test-utils';

describe('Expressions - Exponentiation', () => {

    fail(`~3 ** 2;`, {
        source: '~3 ** 2;',
        message: 'Unexpected token **',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`delete o.p ** 2;`, {
        source: 'delete o.p ** 2;',
        message: 'Unexpected token **',
        line: 1,
        column: 10,
        index: 10
    });

    fail(`!1 ** 2;`, {
        source: '!1 ** 2;',
        line: 1
    });

    fail(`-3 ** 2;`, {
        source: '-3 ** 2;',
        line: 1
    });

    fail(`+1 ** 2;`, {
        source: '+1 ** 2;',
        line: 1
    });

    fail(`typeof 1 ** 2;`, {
        source: 'typeof 1 ** 2;',
        line: 1
    });

    fail(`void 1 ** 2;`, {
        source: 'void 1 ** 2;',
        line: 1
    });

    fail(`~3 ** 2;`, {
        source: '~3 ** 2;',
        line: 1
    });

    fail(`void x ** y`, {
        source: 'void x ** y',
        line: 1
    });

    fail(`delete x ** y`, {
        source: 'delete x ** y',
        line: 1
    });

    fail(`-x ** y`, {
        source: '-x ** y',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; ; if (~O.p ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if (~O.p ** 10) { foo(); }',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; ; if (~x ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if (~x ** 10) { foo(); }',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; ; if (void O.p ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if (void O.p ** 10) { foo(); }',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; ; if (++~O.p ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if (++~O.p ** 10) { foo(); }',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; ; if (--+O.p ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if (--+O.p ** 10) { foo(); }',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; ; if ({ x } **= { x: 2 }) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if ({ x } **= { x: 2 }) { foo(); }',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; ; if ([ x ] **= [ 2 ]) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if ([ x ] **= [ 2 ]) { foo(); }',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; foo(delete x ** 10)`, {
        source: 'var O = { p: 1 }, x = 10; foo(delete x ** 10)',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; foo({ x } **= { x: 2 })`, {
        source: 'var O = { p: 1 }, x = 10; foo({ x } **= { x: 2 })',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; foo(-x ** 10)`, {
        source: 'var O = { p: 1 }, x = 10; foo(-x ** 10)',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; foo(typeof x ** 10)`, {
        source: 'var O = { p: 1 }, x = 10; foo(typeof x ** 10)',
        line: 1
    });

    fail(`var O = { p: 1 }, x = 10; foo()`, {
        source: 'var O = { p: 1 }, x = 10; foo(!O.p ** 10)',
        line: 1
    });

    pass(`(-2) ** 2;
    ((-2) ** 2);`, {
        source: `(-2) ** 2;
        ((-2) ** 2);`,
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
                        type: 'BinaryExpression',
                        left: {
                            type: 'UnaryExpression',
                            operator: '-',
                            argument: {
                                type: 'Literal',
                                value: 2,
                                start: 2,
                                end: 3,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 3
                                    }
                                },
                                raw: '2'
                            },
                            prefix: true,
                            start: 1,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
                        },
                        operator: '**',
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
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'UnaryExpression',
                            operator: '-',
                            argument: {
                                type: 'Literal',
                                value: 2,
                                start: 22,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 11
                                    },
                                    end: {
                                        line: 2,
                                        column: 12
                                    }
                                },
                                raw: '2'
                            },
                            prefix: true,
                            start: 21,
                            end: 23,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 10
                                },
                                end: {
                                    line: 2,
                                    column: 12
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 2,
                            start: 28,
                            end: 29,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 17
                                },
                                end: {
                                    line: 2,
                                    column: 18
                                }
                            },
                            raw: '2'
                        },
                        operator: '**',
                        start: 20,
                        end: 29,
                        loc: {
                            start: {
                                line: 2,
                                column: 9
                            },
                            end: {
                                line: 2,
                                column: 18
                            }
                        }
                    },
                    start: 19,
                    end: 31,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 20
                        }
                    }
                }
            ],
            start: 0,
            end: 31,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 20
                }
            }
        }
    });

    pass(`var O = { p: 1 }, x = 10; ; if ( (delete O.p) ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if ( (delete O.p) ** 10) { foo(); }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 8,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'O',
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
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 10,
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
                                },
                                raw: '10'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            },
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'IfStatement',
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'UnaryExpression',
                            operator: 'delete',
                            argument: {
                                type: 'MemberExpression',
                                object: {
                                    type: 'Identifier',
                                    name: 'O',
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
                                computed: false,
                                property: {
                                    type: 'Identifier',
                                    name: 'p',
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
                                },
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
                            prefix: true,
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
                        right: {
                            type: 'Literal',
                            value: 10,
                            start: 49,
                            end: 51,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 49
                                },
                                end: {
                                    line: 1,
                                    column: 51
                                }
                            },
                            raw: '10'
                        },
                        operator: '**',
                        start: 33,
                        end: 51,
                        loc: {
                            start: {
                                line: 1,
                                column: 33
                            },
                            end: {
                                line: 1,
                                column: 51
                            }
                        }
                    },
                    alternate: null,
                    consequent: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'foo',
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
                                    arguments: [],
                                    start: 55,
                                    end: 60,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 55
                                        },
                                        end: {
                                            line: 1,
                                            column: 60
                                        }
                                    }
                                },
                                start: 55,
                                end: 61,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 55
                                    },
                                    end: {
                                        line: 1,
                                        column: 61
                                    }
                                }
                            }
                        ],
                        start: 53,
                        end: 63,
                        loc: {
                            start: {
                                line: 1,
                                column: 53
                            },
                            end: {
                                line: 1,
                                column: 63
                            }
                        }
                    },
                    start: 28,
                    end: 63,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
                        },
                        end: {
                            line: 1,
                            column: 63
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 63,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 63
                }
            }
        }
    });

    pass(`var O = { p: 1 }, x = 10; ; if ((+x) ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if ( (+x) ** 10) { foo(); }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 8,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'O',
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
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 10,
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
                                },
                                raw: '10'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            },
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'IfStatement',
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'UnaryExpression',
                            operator: '+',
                            argument: {
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
                            prefix: true,
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
                        right: {
                            type: 'Literal',
                            value: 10,
                            start: 41,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 41
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            },
                            raw: '10'
                        },
                        operator: '**',
                        start: 33,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 33
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    alternate: null,
                    consequent: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'foo',
                                        start: 47,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 47
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    },
                                    arguments: [],
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
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                }
                            }
                        ],
                        start: 45,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 45
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    start: 28,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
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

    pass(`var O = { p: 1 }, x = 10; ; if ( --x ** 10 ) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if ( --x ** 10 ) { foo(); }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 8,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'O',
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
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 10,
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
                                },
                                raw: '10'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            },
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'IfStatement',
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'UpdateExpression',
                            argument: {
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
                            operator: '--',
                            prefix: true,
                            start: 33,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
                            start: 40,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 40
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            },
                            raw: '10'
                        },
                        operator: '**',
                        start: 33,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 33
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    alternate: null,
                    consequent: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'foo',
                                        start: 47,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 47
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    },
                                    arguments: [],
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
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                }
                            }
                        ],
                        start: 45,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 45
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    start: 28,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
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

    pass(`var O = { p: 1 }, x = 10; ; if ( O.p++ ** 1) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if ( O.p++ ** 1) { foo(); }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 8,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'O',
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
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 10,
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
                                },
                                raw: '10'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            },
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'IfStatement',
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'UpdateExpression',
                            argument: {
                                type: 'MemberExpression',
                                object: {
                                    type: 'Identifier',
                                    name: 'O',
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
                                property: {
                                    type: 'Identifier',
                                    name: 'p',
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
                                start: 33,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            operator: '++',
                            prefix: false,
                            start: 33,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 33
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 1,
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
                            },
                            raw: '1'
                        },
                        operator: '**',
                        start: 33,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 33
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    alternate: null,
                    consequent: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'foo',
                                        start: 47,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 47
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    },
                                    arguments: [],
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
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                }
                            }
                        ],
                        start: 45,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 45
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    },
                    start: 28,
                    end: 55,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
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

    pass(`var O = { p: 1 }, x = 10; ; if ( (void x) ** 10) { foo(); }`, {
        source: 'var O = { p: 1 }, x = 10; ; if ( (void x) ** 10) { foo(); }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 8,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'O',
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
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 10,
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
                                },
                                raw: '10'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                            },
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'IfStatement',
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'UnaryExpression',
                            operator: 'void',
                            argument: {
                                type: 'Identifier',
                                name: 'x',
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
                            prefix: true,
                            start: 34,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 34
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 10,
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
                            raw: '10'
                        },
                        operator: '**',
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
                    alternate: null,
                    consequent: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'foo',
                                        start: 51,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 51
                                            },
                                            end: {
                                                line: 1,
                                                column: 54
                                            }
                                        }
                                    },
                                    arguments: [],
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
                                start: 51,
                                end: 57,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 51
                                    },
                                    end: {
                                        line: 1,
                                        column: 57
                                    }
                                }
                            }
                        ],
                        start: 49,
                        end: 59,
                        loc: {
                            start: {
                                line: 1,
                                column: 49
                            },
                            end: {
                                line: 1,
                                column: 59
                            }
                        }
                    },
                    start: 28,
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
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

    pass(`-(3 ** 2)`, {
        source: '-(3 ** 2)',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '-',
                    argument: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Literal',
                            value: 3,
                            start: 2,
                            end: 3,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 3
                                }
                            },
                            raw: '3'
                        },
                        right: {
                            type: 'Literal',
                            value: 2,
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
                            },
                            raw: '2'
                        },
                        operator: '**',
                        start: 2,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    prefix: true,
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
            }],
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

    pass(`2 ** typeof 1`, {
        source: '2 ** typeof 1',
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
                        type: 'Literal',
                        value: 2,
                        start: 0,
                        end: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        raw: '2'
                    },
                    right: {
                        type: 'UnaryExpression',
                        operator: 'typeof',
                        argument: {
                            type: 'Literal',
                            value: 1,
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
                            },
                            raw: '1'
                        },
                        prefix: true,
                        start: 5,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    operator: '**',
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
            }],
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

    pass(`2 ** +s`, {
        source: '2 ** +s',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 7,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            },
            body: [{
                type: 'ExpressionStatement',
                start: 0,
                end: 7,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                },
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    },
                    left: {
                        type: 'Literal',
                        start: 0,
                        end: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        value: 2,
                        raw: '2'
                    },
                    operator: '**',
                    right: {
                        type: 'UnaryExpression',
                        start: 5,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        operator: '+',
                        prefix: true,
                        argument: {
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
                            name: 's'
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`2 ** -1 * 2`, {
        source: '2 ** -1 * 2',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 11,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            },
            body: [{
                type: 'ExpressionStatement',
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    },
                    left: {
                        type: 'BinaryExpression',
                        start: 0,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        left: {
                            type: 'Literal',
                            start: 0,
                            end: 1,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 1
                                }
                            },
                            value: 2,
                            raw: '2'
                        },
                        operator: '**',
                        right: {
                            type: 'UnaryExpression',
                            start: 5,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            },
                            operator: '-',
                            prefix: true,
                            argument: {
                                type: 'Literal',
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
                                value: 1,
                                raw: '1'
                            }
                        }
                    },
                    operator: '*',
                    right: {
                        type: 'Literal',
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
                        value: 2,
                        raw: '2'
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`16 / 2 ** 2`, {
        source: '16 / 2 ** 2',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 11,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            },
            body: [{
                type: 'ExpressionStatement',
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    },
                    left: {
                        type: 'Literal',
                        start: 0,
                        end: 2,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        },
                        value: 16,
                        raw: '16'
                    },
                    operator: '/',
                    right: {
                        type: 'BinaryExpression',
                        start: 5,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        left: {
                            type: 'Literal',
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
                            },
                            value: 2,
                            raw: '2'
                        },
                        operator: '**',
                        right: {
                            type: 'Literal',
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
                            value: 2,
                            raw: '2'
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`2 ** ++exponent`, {
        source: '2 ** ++exponent',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'BinaryExpression',
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
                    },
                    left: {
                        type: 'Literal',
                        start: 0,
                        end: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        value: 2,
                        raw: '2'
                    },
                    operator: '**',
                    right: {
                        type: 'UpdateExpression',
                        start: 5,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        },
                        operator: '++',
                        prefix: true,
                        argument: {
                            type: 'Identifier',
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
                            },
                            name: 'exponent'
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`2 ** 2 * 4, 16`, {
        source: '2 ** 2 * 4, 16',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'SequenceExpression',
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
                    },
                    expressions: [{
                            type: 'BinaryExpression',
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
                            },
                            left: {
                                type: 'BinaryExpression',
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
                                },
                                left: {
                                    type: 'Literal',
                                    start: 0,
                                    end: 1,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 0
                                        },
                                        end: {
                                            line: 1,
                                            column: 1
                                        }
                                    },
                                    value: 2,
                                    raw: '2'
                                },
                                operator: '**',
                                right: {
                                    type: 'Literal',
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
                                    },
                                    value: 2,
                                    raw: '2'
                                }
                            },
                            operator: '*',
                            right: {
                                type: 'Literal',
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
                                },
                                value: 4,
                                raw: '4'
                            }
                        },
                        {
                            type: 'Literal',
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
                            value: 16,
                            raw: '16'
                        }
                    ]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`3 * 2 ** 3, 24`, {
        source: '3 * 2 ** 3, 24',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'SequenceExpression',
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
                    },
                    expressions: [{
                            type: 'BinaryExpression',
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
                            },
                            left: {
                                type: 'Literal',
                                start: 0,
                                end: 1,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 1
                                    }
                                },
                                value: 3,
                                raw: '3'
                            },
                            operator: '*',
                            right: {
                                type: 'BinaryExpression',
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
                                },
                                left: {
                                    type: 'Literal',
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
                                    },
                                    value: 2,
                                    raw: '2'
                                },
                                operator: '**',
                                right: {
                                    type: 'Literal',
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
                                    },
                                    value: 3,
                                    raw: '3'
                                }
                            }
                        },
                        {
                            type: 'Literal',
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
                            value: 24,
                            raw: '24'
                        }
                    ]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`(2 ** 3) === 8`, {
        source: '(2 ** 3) === 8',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'BinaryExpression',
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
                    },
                    left: {
                        type: 'BinaryExpression',
                        start: 1,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        left: {
                            type: 'Literal',
                            start: 1,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            },
                            value: 2,
                            raw: '2'
                        },
                        operator: '**',
                        right: {
                            type: 'Literal',
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
                            value: 3,
                            raw: '3'
                        }
                    },
                    operator: '===',
                    right: {
                        type: 'Literal',
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
                        },
                        value: 8,
                        raw: '8'
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`x ** ~y`, {
        source: 'x ** ~y',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 7,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            },
            body: [{
                type: 'ExpressionStatement',
                start: 0,
                end: 7,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                },
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    },
                    left: {
                        type: 'Identifier',
                        start: 0,
                        end: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        name: 'x'
                    },
                    operator: '**',
                    right: {
                        type: 'UnaryExpression',
                        start: 5,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        operator: '~',
                        prefix: true,
                        argument: {
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
                            name: 'y'
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`x ** !y`, {
        source: 'x ** !y',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 7,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            },
            body: [{
                type: 'ExpressionStatement',
                start: 0,
                end: 7,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 7
                    }
                },
                expression: {
                    type: 'BinaryExpression',
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    },
                    left: {
                        type: 'Identifier',
                        start: 0,
                        end: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        name: 'x'
                    },
                    operator: '**',
                    right: {
                        type: 'UnaryExpression',
                        start: 5,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        operator: '!',
                        prefix: true,
                        argument: {
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
                            name: 'y'
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`(++x ** y) - (--p ** q)`, {
        source: '(++x ** y) - (--p ** q)',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'BinaryExpression',
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
                    },
                    left: {
                        type: 'BinaryExpression',
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
                        },
                        left: {
                            type: 'UpdateExpression',
                            start: 1,
                            end: 4,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 4
                                }
                            },
                            operator: '++',
                            prefix: true,
                            argument: {
                                type: 'Identifier',
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
                                },
                                name: 'x'
                            }
                        },
                        operator: '**',
                        right: {
                            type: 'Identifier',
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
                            name: 'y'
                        }
                    },
                    operator: '-',
                    right: {
                        type: 'BinaryExpression',
                        start: 14,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        },
                        left: {
                            type: 'UpdateExpression',
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
                            },
                            operator: '--',
                            prefix: true,
                            argument: {
                                type: 'Identifier',
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
                                },
                                name: 'p'
                            }
                        },
                        operator: '**',
                        right: {
                            type: 'Identifier',
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
                            },
                            name: 'q'
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`x ** ++y`, {
        source: 'x ** ++y',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'BinaryExpression',
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
                    },
                    left: {
                        type: 'Identifier',
                        start: 0,
                        end: 1,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 1
                            }
                        },
                        name: 'x'
                    },
                    operator: '**',
                    right: {
                        type: 'UpdateExpression',
                        start: 5,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        operator: '++',
                        prefix: true,
                        argument: {
                            type: 'Identifier',
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
                            },
                            name: 'y'
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });
});
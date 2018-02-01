import { pass, fail } from '../test-utils';

describe('Miscellaneous - AnnexB', () => {

    describe('Numeric (B1.1)', () => {

        pass(`/}?/u;`, {
            source: `/}?/u;`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: null,
                            regex: {
                                pattern: '}?',
                                flags: 'u'
                            },
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
                            },
                            raw: '/}?/u'
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

        pass(`/{*/u;`, {
            source: `/{*/u;`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: null,
                            regex: {
                                pattern: '{*',
                                flags: 'u'
                            },
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
                            },
                            raw: '/{*/u'
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

        pass(`/.{.}/;`, {
            source: `/.{.}/;`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: {},
                            regex: {
                                pattern: '.{.}',
                                flags: ''
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
                            },
                            raw: '/.{.}/'
                        },
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
                        }
                    }
                ],
                sourceType: 'script',
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
                }
            }
        });

        pass(`/[\\w-\\s]/;`, {
            source: `/[\\w-\\s]/;`,
            raw: true,
            expected: {
                  body: [
                    {
                      expression: {
                        raw: '/[\\w-\\s]/',
                        regex: {
                          flags: '',
                          pattern: '[\\w-\\s]',
                        },
                        type: 'Literal',
                        value: /[\w-\s]/,
                      },
                      type: 'ExpressionStatement'
                    }
                 ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`/[\\s-\\w]/;`, {
            source: `/[\\s-\\w]/;`,
            raw: true,
            expected: {
                  body: [
                    {
                     expression: {
                        raw: '/[\\s-\\w]/',
                        regex: {
                          flags: '',
                          pattern: '[\\s-\\w]'
                        },
                       type: 'Literal',
                        value: /[\s-\w]/,
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`/(?!.){0,}?/;`, {
            source: `/(?!.){0,}?/;`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: {},
                            regex: {
                                pattern: '(?!.){0,}?',
                                flags: ''
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
                            },
                            raw: '/(?!.){0,}?/'
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

        pass(`/(?!.){0,}?/u`, {
            source: `/(?!.){0,}?/u;`,
            raw: true,
            expected: {
                  body: [
                    {
                      expression: {
                        raw: '/(?!.){0,}?/u',
                        regex: {
                          flags: 'u',
                          pattern: '(?!.){0,}?',
                        },
                        type: 'Literal',
                        value: null,
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`/{/;`, {
            source: `/{/;`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: {},
                            regex: {
                                pattern: '{',
                                flags: ''
                            },
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
                            },
                            raw: '/{/'
                        },
                        start: 0,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 4,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 4
                    }
                }
            }
        });
});

    describe('Numeric (B1.1)', () => {

    pass(`004`, {
        source: `004`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 4,
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
                        },
                        raw: '004'
                    },
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
                }
            ],
            sourceType: 'script',
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
        }
    });

    pass(`076`, {
        source: `076`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 62,
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
                        },
                        raw: '076'
                    },
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
                }
            ],
            sourceType: 'script',
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
        }
    });
    pass(`02`, {
                source: `02`,
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Literal',
                                value: 2,
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
                                raw: '02'
                            },
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
                            }
                        }
                    ],
                    sourceType: 'script',
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
                    }
                }
            });

    describe('Comments (B3.1)', () => {
/*
                fail (`var foo = [23] -->[0];`, {
                    source: `var foo = [23] -->[0];`,
                    message: 'Invalid left-hand side expression in postfix operation',
                    line: 1,
                    column: 10,
                    index: 11
                });*/

                pass(`multiline HTML close`, {
                    source: `/*
                    */--> foo`,
                    loc: true,
                    ranges: true,
                    raw: true,
                    expected: {
                        type: 'Program',
                        body: [],
                        sourceType: 'script',
                        start: 0,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 2,
                                column: 29
                            }
                        }
                    }
                });

                pass(`multiline HTML close ASI`, {
                    source: `var foo = [23]
                    -->[0];`,
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
                                            type: 'ArrayExpression',
                                            elements: [
                                                {
                                                    type: 'Literal',
                                                    value: 23,
                                                    start: 11,
                                                    end: 13,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 11
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 13
                                                        }
                                                    },
                                                    raw: '23'
                                                }
                                            ],
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
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
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
                                    }
                                ],
                                kind: 'var',
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
                        ],
                        sourceType: 'script',
                        start: 0,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 2,
                                column: 27
                            }
                        }
                    }
                });

                pass(`single line HTML open`, {
                    source: `var x = 0;
                    x = -1 <!--x;`,
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
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                    }
                                ],
                                kind: 'var',
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
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 31,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 20
                                            },
                                            end: {
                                                line: 2,
                                                column: 21
                                            }
                                        }
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'UnaryExpression',
                                        operator: '-',
                                        argument: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 36,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 26
                                                }
                                            },
                                            raw: '1'
                                        },
                                        prefix: true,
                                        start: 35,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 24
                                            },
                                            end: {
                                                line: 2,
                                                column: 26
                                            }
                                        }
                                    },
                                    start: 31,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 20
                                        },
                                        end: {
                                            line: 2,
                                            column: 26
                                        }
                                    }
                                },
                                start: 31,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 20
                                    },
                                    end: {
                                        line: 2,
                                        column: 26
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
                                line: 2,
                                column: 33
                            }
                        }
                    }
                });
                pass(`simgle line HTML close`, {
                            source: '-->the comment extends to these characters',
                            loc: true,
                            ranges: true,
                            raw: true,
                            expected: {
                                  body: [],
                                  end: 42,
                                  loc: {
                                    end: {
                                      column: 42,
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
                });

        });

    describe('Function code', () => {

            pass(`try {  throw null; } catch (f) { if (true) function f() { return 123; } else function _f() {} }`, {
                source: 'try {  throw null; } catch (f) { if (true) function f() { return 123; } else function _f() {} }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'TryStatement',
                        block: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'Literal',
                                    value: null,
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
                                    },
                                    raw: 'null'
                                },
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
                            }],
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
                        },
                        handler: {
                            type: 'CatchClause',
                            param: {
                                type: 'Identifier',
                                name: 'f',
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Literal',
                                        value: true,
                                        start: 37,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        },
                                        raw: 'true'
                                    },
                                    alternate: {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 91,
                                            end: 93,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 91
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 93
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: '_f',
                                            start: 86,
                                            end: 88,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 86
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 88
                                                }
                                            }
                                        },
                                        start: 77,
                                        end: 93,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 77
                                            },
                                            end: {
                                                line: 1,
                                                column: 93
                                            }
                                        }
                                    },
                                    consequent: {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Literal',
                                                    value: 123,
                                                    start: 65,
                                                    end: 68,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 65
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 68
                                                        }
                                                    },
                                                    raw: '123'
                                                },
                                                start: 58,
                                                end: 69,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 58
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 69
                                                    }
                                                }
                                            }],
                                            start: 56,
                                            end: 71,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 56
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 71
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                        },
                                        start: 43,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 43
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
                                            }
                                        }
                                    },
                                    start: 33,
                                    end: 93,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 93
                                        }
                                    }
                                }],
                                start: 31,
                                end: 95,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 95
                                    }
                                }
                            },
                            start: 21,
                            end: 95,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 95
                                }
                            }
                        },
                        finalizer: null,
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
                    }],
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

            pass(` switch (0) { default:  let f;  if (true) function f() {  } else ;  }`, {
                source: 'switch (0) { default:  let f;  if (true) function f() {  } else ;  }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'SwitchStatement',
                        discriminant: {
                            type: 'Literal',
                            value: 0,
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
                            raw: '0'
                        },
                        cases: [{
                            type: 'SwitchCase',
                            test: null,
                            consequent: [{
                                    type: 'VariableDeclaration',
                                    declarations: [{
                                        type: 'VariableDeclarator',
                                        init: null,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                    }],
                                    kind: 'let',
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
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Literal',
                                        value: true,
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
                                        },
                                        raw: 'true'
                                    },
                                    alternate: {
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
                                    },
                                    consequent: {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 54,
                                            end: 58,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 54
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 58
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                        start: 41,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    },
                                    start: 31,
                                    end: 65,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 65
                                        }
                                    }
                                }
                            ],
                            start: 13,
                            end: 65,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 65
                                }
                            }
                        }],
                        start: 0,
                        end: 68,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 68
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 68,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 68
                        }
                    }
                }
            });

            pass(`var init = f;  if (true) function f() {  } else ;`, {
                source: 'var init = f;  if (true) function f() {  } else ;',
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
                                    name: 'f',
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
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'init',
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
                            }],
                            kind: 'var',
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
                        {
                            type: 'IfStatement',
                            test: {
                                type: 'Literal',
                                value: true,
                                start: 19,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                raw: 'true'
                            },
                            alternate: {
                                type: 'EmptyStatement',
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
                                }
                            },
                            consequent: {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 38,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'f',
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
                            },
                            start: 15,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
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

            pass(`if (true) function f() { initialBV = f; f = 123; currentBV = f; return 'decl'; }`, {
                source: 'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'IfStatement',
                        test: {
                            type: 'Literal',
                            value: true,
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
                            },
                            raw: 'true'
                        },
                        alternate: null,
                        consequent: {
                            type: 'FunctionDeclaration',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'initialBV',
                                                start: 25,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Identifier',
                                                name: 'f',
                                                start: 37,
                                                end: 38,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            start: 25,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        },
                                        start: 25,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'f',
                                                start: 40,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 40
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
                                                    }
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Literal',
                                                value: 123,
                                                start: 44,
                                                end: 47,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 44
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 47
                                                    }
                                                },
                                                raw: '123'
                                            },
                                            start: 40,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        },
                                        start: 40,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 48
                                            }
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'currentBV',
                                                start: 49,
                                                end: 58,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 49
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 58
                                                    }
                                                }
                                            },
                                            operator: '=',
                                            right: {
                                                type: 'Identifier',
                                                name: 'f',
                                                start: 61,
                                                end: 62,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 61
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 62
                                                    }
                                                }
                                            },
                                            start: 49,
                                            end: 62,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 49
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 62
                                                }
                                            }
                                        },
                                        start: 49,
                                        end: 63,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 49
                                            },
                                            end: {
                                                line: 1,
                                                column: 63
                                            }
                                        }
                                    },
                                    {
                                        type: 'ReturnStatement',
                                        argument: {
                                            type: 'Literal',
                                            value: 'decl',
                                            start: 71,
                                            end: 77,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 71
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 77
                                                }
                                            },
                                            raw: '"decl"'
                                        },
                                        start: 64,
                                        end: 78,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 64
                                            },
                                            end: {
                                                line: 1,
                                                column: 78
                                            }
                                        }
                                    }
                                ],
                                start: 23,
                                end: 80,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 80
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'f',
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
                            },
                            start: 10,
                            end: 80,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 80
                                }
                            }
                        },
                        start: 0,
                        end: 80,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 80
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 80,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 80
                        }
                    }
                }
            });

            pass(`try {  throw {};  } catch ({ f }) {  if (true) function f() {  } else ;  }`, {
                source: 'try {  throw {};  } catch ({ f }) {  if (true) function f() {  } else ;  }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'TryStatement',
                        block: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    properties: [],
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
                            }],
                            start: 4,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        handler: {
                            type: 'CatchClause',
                            param: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    method: false,
                                    shorthand: true,
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
                                }],
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Literal',
                                        value: true,
                                        start: 41,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        },
                                        raw: 'true'
                                    },
                                    alternate: {
                                        type: 'EmptyStatement',
                                        start: 70,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 70
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
                                            }
                                        }
                                    },
                                    consequent: {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 60,
                                            end: 64,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 60
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 64
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
                                            start: 56,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 56
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            }
                                        },
                                        start: 47,
                                        end: 64,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 47
                                            },
                                            end: {
                                                line: 1,
                                                column: 64
                                            }
                                        }
                                    },
                                    start: 37,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 37
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    }
                                }],
                                start: 34,
                                end: 74,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 34
                                    },
                                    end: {
                                        line: 1,
                                        column: 74
                                    }
                                }
                            },
                            start: 20,
                            end: 74,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 74
                                }
                            }
                        },
                        finalizer: null,
                        start: 0,
                        end: 74,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 74
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 74,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 74
                        }
                    }
                }
            });

            pass(` switch (0) { default:  let f; if (true) function f() {  }  }`, {
                source: 'switch (0) { default:  let f; if (true) function f() {  }  }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'SwitchStatement',
                        discriminant: {
                            type: 'Literal',
                            value: 0,
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
                            raw: '0'
                        },
                        cases: [{
                            type: 'SwitchCase',
                            test: null,
                            consequent: [{
                                    type: 'VariableDeclaration',
                                    declarations: [{
                                        type: 'VariableDeclarator',
                                        init: null,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                    }],
                                    kind: 'let',
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
                                {
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Literal',
                                        value: true,
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
                                        },
                                        raw: 'true'
                                    },
                                    alternate: null,
                                    consequent: {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 53,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 53
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                        start: 40,
                                        end: 57,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 57
                                            }
                                        }
                                    },
                                    start: 30,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                }
                            ],
                            start: 13,
                            end: 57,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 57
                                }
                            }
                        }],
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
                    }],
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

            pass(`try {  throw {};  } catch ({ f }) {  if (true) function f() {  }  }`, {
                source: '  try {  throw {};  } catch ({ f }) {  if (true) function f() {  }  }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'TryStatement',
                        block: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    properties: [],
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
                            }],
                            start: 6,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        handler: {
                            type: 'CatchClause',
                            param: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                        name: 'f',
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
                                }],
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'IfStatement',
                                    test: {
                                        type: 'Literal',
                                        value: true,
                                        start: 43,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 43
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        },
                                        raw: 'true'
                                    },
                                    alternate: null,
                                    consequent: {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 62,
                                            end: 66,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 62
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 66
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                        },
                                        start: 49,
                                        end: 66,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 49
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        }
                                    },
                                    start: 39,
                                    end: 66,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 39
                                        },
                                        end: {
                                            line: 1,
                                            column: 66
                                        }
                                    }
                                }],
                                start: 36,
                                end: 69,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 36
                                    },
                                    end: {
                                        line: 1,
                                        column: 69
                                    }
                                }
                            },
                            start: 22,
                            end: 69,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 69
                                }
                            }
                        },
                        finalizer: null,
                        start: 2,
                        end: 69,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 69
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 69,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 69
                        }
                    }
                }
            });

            pass(`{  let f = 123;  if (false) ; else function f() {  }  }`, {
                source: '{  let f = 123;  if (false) ; else function f() {  }  }',
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
                                        value: 123,
                                        start: 11,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        },
                                        raw: '123'
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    start: 7,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                }],
                                kind: 'let',
                                start: 3,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            },
                            {
                                type: 'IfStatement',
                                test: {
                                    type: 'Literal',
                                    value: false,
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
                                    },
                                    raw: 'false'
                                },
                                alternate: {
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 48,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 48
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
                                        start: 44,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 44
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        }
                                    },
                                    start: 35,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                },
                                consequent: {
                                    type: 'EmptyStatement',
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
                            }
                        ],
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
                    }],
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

            pass(` switch (0) { default:  let f; switch (1) {  case 1:   function f() {  }  }  }`, {
                source: 'switch (0) { default:  let f; switch (1) {  case 1:   function f() {  }  }  }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'SwitchStatement',
                        discriminant: {
                            type: 'Literal',
                            value: 0,
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
                            raw: '0'
                        },
                        cases: [{
                            type: 'SwitchCase',
                            test: null,
                            consequent: [{
                                    type: 'VariableDeclaration',
                                    declarations: [{
                                        type: 'VariableDeclarator',
                                        init: null,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                    }],
                                    kind: 'let',
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
                                {
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Literal',
                                        value: 1,
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
                                        },
                                        raw: '1'
                                    },
                                    cases: [{
                                        type: 'SwitchCase',
                                        test: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        consequent: [{
                                            type: 'FunctionDeclaration',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 67,
                                                end: 71,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 67
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 71
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: {
                                                type: 'Identifier',
                                                name: 'f',
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
                                            start: 54,
                                            end: 71,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 54
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 71
                                                }
                                            }
                                        }],
                                        start: 44,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 44
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
                                            }
                                        }
                                    }],
                                    start: 30,
                                    end: 74,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 74
                                        }
                                    }
                                }
                            ],
                            start: 13,
                            end: 74,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 74
                                }
                            }
                        }],
                        start: 0,
                        end: 77,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 77
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 77,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 77
                        }
                    }
                }
            });

            pass(` try {  throw {};  } catch ({ f }) {  switch (1) {  case 1:  function f() {  }  }  }`, {
                source: 'try {  throw {};  } catch ({ f }) {  switch (1) {  case 1:  function f() {  }  }  }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'TryStatement',
                        block: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    properties: [],
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
                            }],
                            start: 4,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        handler: {
                            type: 'CatchClause',
                            param: {
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    method: false,
                                    shorthand: true,
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
                                }],
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Literal',
                                        value: 1,
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
                                        },
                                        raw: '1'
                                    },
                                    cases: [{
                                        type: 'SwitchCase',
                                        test: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 56,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 56
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            },
                                            raw: '1'
                                        },
                                        consequent: [{
                                            type: 'FunctionDeclaration',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 73,
                                                end: 77,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 73
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 77
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: {
                                                type: 'Identifier',
                                                name: 'f',
                                                start: 69,
                                                end: 70,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 69
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 70
                                                    }
                                                }
                                            },
                                            start: 60,
                                            end: 77,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 60
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 77
                                                }
                                            }
                                        }],
                                        start: 51,
                                        end: 77,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 51
                                            },
                                            end: {
                                                line: 1,
                                                column: 77
                                            }
                                        }
                                    }],
                                    start: 37,
                                    end: 80,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 37
                                        },
                                        end: {
                                            line: 1,
                                            column: 80
                                        }
                                    }
                                }],
                                start: 34,
                                end: 83,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 34
                                    },
                                    end: {
                                        line: 1,
                                        column: 83
                                    }
                                }
                            },
                            start: 20,
                            end: 83,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 83
                                }
                            }
                        },
                        finalizer: null,
                        start: 0,
                        end: 83,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 83
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 83,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 83
                        }
                    }
                }
            });

            pass(`try { throw null;} catch (f) {switch (1) { default: function f() { return 123; } } }`, {
                source: 'try { throw null;} catch (f) {switch (1) { default: function f() { return 123; } } }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'TryStatement',
                        block: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'Literal',
                                    value: null,
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
                                    },
                                    raw: 'null'
                                },
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
                            }],
                            start: 4,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        handler: {
                            type: 'CatchClause',
                            param: {
                                type: 'Identifier',
                                name: 'f',
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'SwitchStatement',
                                    discriminant: {
                                        type: 'Literal',
                                        value: 1,
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
                                        },
                                        raw: '1'
                                    },
                                    cases: [{
                                        type: 'SwitchCase',
                                        test: null,
                                        consequent: [{
                                            type: 'FunctionDeclaration',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'Literal',
                                                        value: 123,
                                                        start: 74,
                                                        end: 77,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 74
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 77
                                                            }
                                                        },
                                                        raw: '123'
                                                    },
                                                    start: 67,
                                                    end: 78,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 67
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 78
                                                        }
                                                    }
                                                }],
                                                start: 65,
                                                end: 80,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 65
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 80
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: {
                                                type: 'Identifier',
                                                name: 'f',
                                                start: 61,
                                                end: 62,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 61
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 62
                                                    }
                                                }
                                            },
                                            start: 52,
                                            end: 80,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 52
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 80
                                                }
                                            }
                                        }],
                                        start: 43,
                                        end: 80,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 43
                                            },
                                            end: {
                                                line: 1,
                                                column: 80
                                            }
                                        }
                                    }],
                                    start: 30,
                                    end: 82,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 82
                                        }
                                    }
                                }],
                                start: 29,
                                end: 84,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 84
                                    }
                                }
                            },
                            start: 19,
                            end: 84,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 84
                                }
                            }
                        },
                        finalizer: null,
                        start: 0,
                        end: 84,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 84
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 84,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 84
                        }
                    }
                }
            });

            pass(`let f = 123; switch (1) { default: function f() {  } }`, {
                source: 'let f = 123; switch (1) { default: function f() {  } }',
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
                                    value: 123,
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
                                    },
                                    raw: '123'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'f',
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
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            }],
                            kind: 'let',
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
                            type: 'SwitchStatement',
                            discriminant: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            cases: [{
                                type: 'SwitchCase',
                                test: null,
                                consequent: [{
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 48,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 48
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
                                        start: 44,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 44
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        }
                                    },
                                    start: 35,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                }],
                                start: 26,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                }
                            }],
                            start: 13,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
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
                }
            });

            pass(`var init = f;  switch (1) { default:   function f() {  }  }`, {
                source: 'var init = f;  switch (1) { default:   function f() {  }  }',
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
                                    name: 'f',
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
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'init',
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
                            }],
                            kind: 'var',
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
                        {
                            type: 'SwitchStatement',
                            discriminant: {
                                type: 'Literal',
                                value: 1,
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
                                },
                                raw: '1'
                            },
                            cases: [{
                                type: 'SwitchCase',
                                test: null,
                                consequent: [{
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 52,
                                        end: 56,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 52
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
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                        }
                                    },
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
                                }],
                                start: 28,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                }
                            }],
                            start: 15,
                            end: 59,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
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

            pass(`var init = f; if (false) function _f() {} else function f() {  }`, {
                source: 'var init = f; if (false) function _f() {} else function f() {  }',
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
                                    name: 'f',
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
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'init',
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
                            }],
                            kind: 'var',
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
                        {
                            type: 'IfStatement',
                            test: {
                                type: 'Literal',
                                value: false,
                                start: 18,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                },
                                raw: 'false'
                            },
                            alternate: {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 60,
                                    end: 64,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 60
                                        },
                                        end: {
                                            line: 1,
                                            column: 64
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'f',
                                    start: 56,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 56
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                },
                                start: 47,
                                end: 64,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 47
                                    },
                                    end: {
                                        line: 1,
                                        column: 64
                                    }
                                }
                            },
                            consequent: {
                                type: 'FunctionDeclaration',
                                params: [],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: '_f',
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
                            },
                            start: 14,
                            end: 64,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 64
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
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
                }
            });

            pass(` {  let f = 123; if (false) function _f() {} else function f() {  }  }`, {
                source: '{  let f = 123; if (false) function _f() {} else function f() {  }  }',
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
                                        value: 123,
                                        start: 11,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        },
                                        raw: '123'
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    start: 7,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                }],
                                kind: 'let',
                                start: 3,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            },
                            {
                                type: 'IfStatement',
                                test: {
                                    type: 'Literal',
                                    value: false,
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
                                    },
                                    raw: 'false'
                                },
                                alternate: {
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 62,
                                        end: 66,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 62
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                    },
                                    start: 49,
                                    end: 66,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 49
                                        },
                                        end: {
                                            line: 1,
                                            column: 66
                                        }
                                    }
                                },
                                consequent: {
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: '_f',
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
                                    start: 27,
                                    end: 43,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 43
                                        }
                                    }
                                },
                                start: 16,
                                end: 66,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 66
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 69,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 69
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 69,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 69
                        }
                    }
                }
            });

            pass(`function arguments() {}`, {
                source: 'function arguments() {}',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'FunctionDeclaration',
                        params: [],
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
                        id: {
                            type: 'Identifier',
                            name: 'arguments',
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

            pass(`try {  throw null;  } catch (f) {  {   function f() { return 123; }  }  }`, {
                source: 'try {  throw null;  } catch (f) {  {   function f() { return 123; }  }  }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'TryStatement',
                        block: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ThrowStatement',
                                argument: {
                                    type: 'Literal',
                                    value: null,
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
                                    },
                                    raw: 'null'
                                },
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
                            }],
                            start: 4,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        handler: {
                            type: 'CatchClause',
                            param: {
                                type: 'Identifier',
                                name: 'f',
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [{
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Literal',
                                                    value: 123,
                                                    start: 61,
                                                    end: 64,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 61
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 64
                                                        }
                                                    },
                                                    raw: '123'
                                                },
                                                start: 54,
                                                end: 65,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 54
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 65
                                                    }
                                                }
                                            }],
                                            start: 52,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 52
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 67
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: {
                                            type: 'Identifier',
                                            name: 'f',
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
                                            }
                                        },
                                        start: 39,
                                        end: 67,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 39
                                            },
                                            end: {
                                                line: 1,
                                                column: 67
                                            }
                                        }
                                    }],
                                    start: 35,
                                    end: 70,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 70
                                        }
                                    }
                                }],
                                start: 32,
                                end: 73,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 32
                                    },
                                    end: {
                                        line: 1,
                                        column: 73
                                    }
                                }
                            },
                            start: 22,
                            end: 73,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 73
                                }
                            }
                        },
                        finalizer: null,
                        start: 0,
                        end: 73,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 73
                            }
                        }
                    }],
                    sourceType: 'script',
                    start: 0,
                    end: 73,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 73
                        }
                    }
                }
            });
        });

    describe('Expressions - Yield', () => {

            pass(`var outer = (function*() { yield* iter; })();`, {
                source: 'var outer = (function*() { yield* iter; })();',
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
                                type: 'CallExpression',
                                callee: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [{
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'YieldExpression',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'iter',
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
                                                delegate: true,
                                                start: 27,
                                                end: 38,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            start: 27,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        }],
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
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 13,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                },
                                arguments: [],
                                start: 12,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'outer',
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
                            end: 44,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 44
                                }
                            }
                        }],
                        kind: 'var',
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
                    }],
                    sourceType: 'script',
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
                }
            });

            describe('Expressions - Object', () => {

                fail(`({  __proto__: null,  other: null,  '__proto__': null });`, {
                 source: `({  __proto__: null,  other: null,  '__proto__': null });`,
                 message: 'Property name __proto__ appears more than once in object literal',
                 line: 1,
                 column: 53,
                 index: 53
                 });

                pass(`o = { __proto__: function() {} };`, {
                   source: 'o = { __proto__: function() {} };',
                   loc: true,
                   ranges: true,
                   raw: true,
                   expected: {
                       type: 'Program',
                       body: [{
                           type: 'ExpressionStatement',
                           expression: {
                               type: 'AssignmentExpression',
                               left: {
                                   type: 'Identifier',
                                   name: 'o',
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
                                   }
                               },
                               operator: '=',
                               right: {
                                   type: 'ObjectExpression',
                                   properties: [{
                                       type: 'Property',
                                       key: {
                                           type: 'Identifier',
                                           name: '__proto__',
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
                                           start: 17,
                                           end: 30,
                                           loc: {
                                               start: {
                                                   line: 1,
                                                   column: 17
                                               },
                                               end: {
                                                   line: 1,
                                                   column: 30
                                               }
                                           }
                                       },
                                       kind: 'init',
                                       computed: false,
                                       method: false,
                                       shorthand: false,
                                       start: 6,
                                       end: 30,
                                       loc: {
                                           start: {
                                               line: 1,
                                               column: 6
                                           },
                                           end: {
                                               line: 1,
                                               column: 30
                                           }
                                       }
                                   }],
                                   start: 4,
                                   end: 32,
                                   loc: {
                                       start: {
                                           line: 1,
                                           column: 4
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

                pass(`obj = {  __proto__: proto,   ["__proto__"]: {},   ["__proto__"]: ownProp };`, {
                   source: 'obj = {  __proto__: proto,   ["__proto__"]: {},   ["__proto__"]: ownProp };',
                   loc: true,
                   ranges: true,
                   raw: true,
                   expected: {
                       type: 'Program',
                       body: [{
                           type: 'ExpressionStatement',
                           expression: {
                               type: 'AssignmentExpression',
                               left: {
                                   type: 'Identifier',
                                   name: 'obj',
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
                               operator: '=',
                               right: {
                                   type: 'ObjectExpression',
                                   properties: [{
                                           type: 'Property',
                                           key: {
                                               type: 'Identifier',
                                               name: '__proto__',
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
                                           value: {
                                               type: 'Identifier',
                                               name: 'proto',
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
                                           kind: 'init',
                                           computed: false,
                                           method: false,
                                           shorthand: false,
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
                                       },
                                       {
                                           type: 'Property',
                                           key: {
                                               type: 'Literal',
                                               value: '__proto__',
                                               start: 30,
                                               end: 41,
                                               loc: {
                                                   start: {
                                                       line: 1,
                                                       column: 30
                                                   },
                                                   end: {
                                                       line: 1,
                                                       column: 41
                                                   }
                                               },
                                               raw: '"__proto__"'
                                           },
                                           value: {
                                               type: 'ObjectExpression',
                                               properties: [],
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
                                           kind: 'init',
                                           computed: true,
                                           method: false,
                                           shorthand: false,
                                           start: 29,
                                           end: 46,
                                           loc: {
                                               start: {
                                                   line: 1,
                                                   column: 29
                                               },
                                               end: {
                                                   line: 1,
                                                   column: 46
                                               }
                                           }
                                       },
                                       {
                                           type: 'Property',
                                           key: {
                                               type: 'Literal',
                                               value: '__proto__',
                                               start: 51,
                                               end: 62,
                                               loc: {
                                                   start: {
                                                       line: 1,
                                                       column: 51
                                                   },
                                                   end: {
                                                       line: 1,
                                                       column: 62
                                                   }
                                               },
                                               raw: '"__proto__"'
                                           },
                                           value: {
                                               type: 'Identifier',
                                               name: 'ownProp',
                                               start: 65,
                                               end: 72,
                                               loc: {
                                                   start: {
                                                       line: 1,
                                                       column: 65
                                                   },
                                                   end: {
                                                       line: 1,
                                                       column: 72
                                                   }
                                               }
                                           },
                                           kind: 'init',
                                           computed: true,
                                           method: false,
                                           shorthand: false,
                                           start: 50,
                                           end: 72,
                                           loc: {
                                               start: {
                                                   line: 1,
                                                   column: 50
                                               },
                                               end: {
                                                   line: 1,
                                                   column: 72
                                               }
                                           }
                                       }
                                   ],
                                   start: 6,
                                   end: 74,
                                   loc: {
                                       start: {
                                           line: 1,
                                           column: 6
                                       },
                                       end: {
                                           line: 1,
                                           column: 74
                                       }
                                   }
                               },
                               start: 0,
                               end: 74,
                               loc: {
                                   start: {
                                       line: 1,
                                       column: 0
                                   },
                                   end: {
                                       line: 1,
                                       column: 74
                                   }
                               }
                           },
                           start: 0,
                           end: 75,
                           loc: {
                               start: {
                                   line: 1,
                                   column: 0
                               },
                               end: {
                                   line: 1,
                                   column: 75
                               }
                           }
                       }],
                       sourceType: 'script',
                       start: 0,
                       end: 75,
                       loc: {
                           start: {
                               line: 1,
                               column: 0
                           },
                           end: {
                               line: 1,
                               column: 75
                           }
                       }
                   }
               });

                pass(`o = { __proto__: undefined };`, {
                   source: 'o = { __proto__: undefined };',
                   loc: true,
                   ranges: true,
                   raw: true,
                   expected: {
                       type: 'Program',
                       body: [{
                           type: 'ExpressionStatement',
                           expression: {
                               type: 'AssignmentExpression',
                               left: {
                                   type: 'Identifier',
                                   name: 'o',
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
                                   }
                               },
                               operator: '=',
                               right: {
                                   type: 'ObjectExpression',
                                   properties: [{
                                       type: 'Property',
                                       key: {
                                           type: 'Identifier',
                                           name: '__proto__',
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
                                       value: {
                                           type: 'Identifier',
                                           name: 'undefined',
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
                                       kind: 'init',
                                       computed: false,
                                       method: false,
                                       shorthand: false,
                                       start: 6,
                                       end: 26,
                                       loc: {
                                           start: {
                                               line: 1,
                                               column: 6
                                           },
                                           end: {
                                               line: 1,
                                               column: 26
                                           }
                                       }
                                   }],
                                   start: 4,
                                   end: 28,
                                   loc: {
                                       start: {
                                           line: 1,
                                           column: 4
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

                pass(`o = { __proto__: 1 };`, {
                   source: 'o = { __proto__: 1 };',
                   loc: true,
                   ranges: true,
                   raw: true,
                   expected: {
                       type: 'Program',
                       body: [{
                           type: 'ExpressionStatement',
                           expression: {
                               type: 'AssignmentExpression',
                               left: {
                                   type: 'Identifier',
                                   name: 'o',
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
                                   }
                               },
                               operator: '=',
                               right: {
                                   type: 'ObjectExpression',
                                   properties: [{
                                       type: 'Property',
                                       key: {
                                           type: 'Identifier',
                                           name: '__proto__',
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
                                       value: {
                                           type: 'Literal',
                                           value: 1,
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
                                           },
                                           raw: '1'
                                       },
                                       kind: 'init',
                                       computed: false,
                                       method: false,
                                       shorthand: false,
                                       start: 6,
                                       end: 18,
                                       loc: {
                                           start: {
                                               line: 1,
                                               column: 6
                                           },
                                           end: {
                                               line: 1,
                                               column: 18
                                           }
                                       }
                                   }],
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

                pass(`o = {  __proto__: proto };`, {
                   source: 'o = {  __proto__: proto };',
                   loc: true,
                   ranges: true,
                   raw: true,
                   expected: {
                       type: 'Program',
                       body: [{
                           type: 'ExpressionStatement',
                           expression: {
                               type: 'AssignmentExpression',
                               left: {
                                   type: 'Identifier',
                                   name: 'o',
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
                                   }
                               },
                               operator: '=',
                               right: {
                                   type: 'ObjectExpression',
                                   properties: [{
                                       type: 'Property',
                                       key: {
                                           type: 'Identifier',
                                           name: '__proto__',
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
                                       },
                                       value: {
                                           type: 'Identifier',
                                           name: 'proto',
                                           start: 18,
                                           end: 23,
                                           loc: {
                                               start: {
                                                   line: 1,
                                                   column: 18
                                               },
                                               end: {
                                                   line: 1,
                                                   column: 23
                                               }
                                           }
                                       },
                                       kind: 'init',
                                       computed: false,
                                       method: false,
                                       shorthand: false,
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
                                   }],
                                   start: 4,
                                   end: 25,
                                   loc: {
                                       start: {
                                           line: 1,
                                           column: 4
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

                pass(`o = { __proto__: null };`, {
                   source: 'o = { __proto__: null };',
                   loc: true,
                   ranges: true,
                   raw: true,
                   expected: {
                       type: 'Program',
                       body: [{
                           type: 'ExpressionStatement',
                           expression: {
                               type: 'AssignmentExpression',
                               left: {
                                   type: 'Identifier',
                                   name: 'o',
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
                                   }
                               },
                               operator: '=',
                               right: {
                                   type: 'ObjectExpression',
                                   properties: [{
                                       type: 'Property',
                                       key: {
                                           type: 'Identifier',
                                           name: '__proto__',
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
                                       value: {
                                           type: 'Literal',
                                           value: null,
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
                                           },
                                           raw: 'null'
                                       },
                                       kind: 'init',
                                       computed: false,
                                       method: false,
                                       shorthand: false,
                                       start: 6,
                                       end: 21,
                                       loc: {
                                           start: {
                                               line: 1,
                                               column: 6
                                           },
                                           end: {
                                               line: 1,
                                               column: 21
                                           }
                                       }
                                   }],
                                   start: 4,
                                   end: 23,
                                   loc: {
                                       start: {
                                           line: 1,
                                           column: 4
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
           });

            describe('B.3.2', () => {

        fail(`"use strict"; label: function f(){}`, {
            source: `"use strict"; label: function f(){}`,
            message: 'In strict mode code, functions can only be declared at top level or inside a block',
            line: 1,
            column: 20,
            index: 20
        });
    });

        });

    describe('B.3.4', () => {

            fail(`"use strict"; if (0) function f(){}`, {
                source: `"use strict"; if (0) function f(){}`,
                message: 'FunctionDeclarations in IfStatements are disallowed in strict mode',
                line: 1,
                column: 20,
                index: 20
            });

            fail(`"use strict";  if (0) function f(){} else;`, {
                source: `"use strict";  if (0) function f(){} else;`,
                message: 'FunctionDeclarations in IfStatements are disallowed in strict mode',
                line: 1,
                column: 21,
                index: 21
            });

            fail(`"use strict"; if (0); else function f(){}`, {
                source: `"use strict"; if (0); else function f(){}`,
                message: 'FunctionDeclarations in IfStatements are disallowed in strict mode',
                line: 1,
                column: 26,
                index: 26
            });

            fail(`"use strict"; if (0); else function f(){}`, {
                source: `"use strict"; label foo: function f(){}`,
                message: 'Unexpected token',
                line: 1,
                column: 19,
                index: 19
            });

            fail(`while(true) function a(){}`, {
                source: `while(true) function a(){}`,
                message: 'function can\'t appear in single-statement context',
                line: 1,
                column: 11,
                index: 11
            });

            fail(`with(true) function a(){}`, {
                source: `with(true) function a(){}`,
                message: 'function can\'t appear in single-statement context',
                line: 1,
                column: 10,
                index: 10
            });

            pass(`if (x) function f() { return 23; } else function f() { return 42; }`, {
                source: 'if (x) function f() { return 23; } else function f() { return 42; }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'IfStatement',
                            test: {
                                type: 'Identifier',
                                name: 'x',
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
                            alternate: {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Literal',
                                                value: 42,
                                                start: 62,
                                                end: 64,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 62
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 64
                                                    }
                                                },
                                                raw: '42'
                                            },
                                            start: 55,
                                            end: 65,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 55
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 65
                                                }
                                            }
                                        }
                                    ],
                                    start: 53,
                                    end: 67,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 53
                                        },
                                        end: {
                                            line: 1,
                                            column: 67
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'f',
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
                                start: 40,
                                end: 67,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 40
                                    },
                                    end: {
                                        line: 1,
                                        column: 67
                                    }
                                }
                            },
                            consequent: {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Literal',
                                                value: 23,
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
                                                raw: '23'
                                            },
                                            start: 22,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
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
                                id: {
                                    type: 'Identifier',
                                    name: 'f',
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
                                start: 7,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
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

            pass(`if (x) function f() {}`, {
                source: 'if (x) function f() {}',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'IfStatement',
                            test: {
                                type: 'Identifier',
                                name: 'x',
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
                            alternate: null,
                            consequent: {
                                type: 'FunctionDeclaration',
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
                                id: {
                                    type: 'Identifier',
                                    name: 'f',
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
                                start: 7,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
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
        });

    describe('B.3.5', () => {
            // TODO!
        });
});
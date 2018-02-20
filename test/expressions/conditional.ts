import { pass, fail } from '../test-utils';

describe('Expressions - Conditional', () => {

    fail(`for (true ? 0 : 0 in {}; false; ) ;`, {
        source: 'for (true ? 0 : 0 in {}; false; ) ;',
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 23,
        index: 23
    });

    fail(`for ("" in {} ? 0 : 0; false; ) ;`, {
        source: 'for ("" in {} ? 0 : 0; false; ) ;',
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 21,
        index: 21
    });

    pass(`x = (0) ? 1 : 2`, {
        source: 'x = (0) ? 1 : 2',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            consequent: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            alternate: {
                                type: 'Literal',
                                value: 2,
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
                                },
                                raw: '2'
                            },
                            start: 4,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 15
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
    pass(`a ? b : c`, {
            source: 'a ? b : c',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Identifier',
                                name: 'a',
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
                            consequent: {
                                type: 'Identifier',
                                name: 'b',
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
                                type: 'Identifier',
                                name: 'c',
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

    pass(`y ? 1 : 2`, {
            source: 'y ? 1 : 2',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Identifier',
                                name: 'y',
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
                            consequent: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            alternate: {
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

    pass(`x && y ? 1 : 2`, {
            source: 'x && y ? 1 : 2',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'LogicalExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                right: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                operator: '&&',
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
                            },
                            consequent: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            alternate: {
                                type: 'Literal',
                                value: 2,
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
                                raw: '2'
                            },
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
                        },
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

    pass(`a ? !b : !c;`, {
            source: 'a ? !b : !c;',
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
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Identifier',
                                name: 'a',
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
                            consequent: {
                                type: 'UnaryExpression',
                                operator: '!',
                                argument: {
                                    type: 'Identifier',
                                    name: 'b',
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
                                prefix: true,
                                start: 4,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                }
                            },
                            alternate: {
                                type: 'UnaryExpression',
                                operator: '!',
                                argument: {
                                    type: 'Identifier',
                                    name: 'c',
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
                                prefix: true,
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
                    }
                ],
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
            }
        });

    pass(`x = (0) ? 1 : 2`, {
            source: 'x = (0) ? 1 : 2',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'x',
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
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                consequent: {
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: 2,
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
                                    },
                                    raw: '2'
                                },
                                start: 4,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
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

    pass(`function foo() { return b ? foo : void (a(), b()); }`, {
            source: 'function foo() { return b ? foo : void (a(), b()); }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'ConditionalExpression',
                                        test: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                        consequent: {
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
                                        alternate: {
                                            type: 'UnaryExpression',
                                            operator: 'void',
                                            argument: {
                                                type: 'SequenceExpression',
                                                expressions: [
                                                    {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'a',
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
                                                        arguments: [],
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
                                                    {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Identifier',
                                                            name: 'b',
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
                                                        arguments: [],
                                                        start: 45,
                                                        end: 48,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 45
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 48
                                                            }
                                                        }
                                                    }
                                                ],
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
                                            prefix: true,
                                            start: 34,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            }
                                        },
                                        start: 24,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    start: 17,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
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
                            name: 'foo',
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
                        start: 0,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    }
                ],
                start: 0,
                end: 52,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 52
                    }
                }
            }
        });

    pass(`var x;
        a ? x = foo : b ? x = bar : y = baz;`, {
            source: `var x;
            a ? x = foo : b ? x = bar : y = baz;`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
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
                            }
                        ],
                        kind: 'var',
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
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Identifier',
                                name: 'a',
                                start: 19,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 2,
                                        column: 13
                                    }
                                }
                            },
                            consequent: {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 23,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 2,
                                            column: 17
                                        }
                                    }
                                },
                                operator: '=',
                                right: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 27,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 20
                                        },
                                        end: {
                                            line: 2,
                                            column: 23
                                        }
                                    }
                                },
                                start: 23,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 16
                                    },
                                    end: {
                                        line: 2,
                                        column: 23
                                    }
                                }
                            },
                            alternate: {
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 33,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 26
                                        },
                                        end: {
                                            line: 2,
                                            column: 27
                                        }
                                    }
                                },
                                consequent: {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 37,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 30
                                            },
                                            end: {
                                                line: 2,
                                                column: 31
                                            }
                                        }
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'bar',
                                        start: 41,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 34
                                            },
                                            end: {
                                                line: 2,
                                                column: 37
                                            }
                                        }
                                    },
                                    start: 37,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 30
                                        },
                                        end: {
                                            line: 2,
                                            column: 37
                                        }
                                    }
                                },
                                alternate: {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'y',
                                        start: 47,
                                        end: 48,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 40
                                            },
                                            end: {
                                                line: 2,
                                                column: 41
                                            }
                                        }
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'baz',
                                        start: 51,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 44
                                            },
                                            end: {
                                                line: 2,
                                                column: 47
                                            }
                                        }
                                    },
                                    start: 47,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 40
                                        },
                                        end: {
                                            line: 2,
                                            column: 47
                                        }
                                    }
                                },
                                start: 33,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 26
                                    },
                                    end: {
                                        line: 2,
                                        column: 47
                                    }
                                }
                            },
                            start: 19,
                            end: 54,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 12
                                },
                                end: {
                                    line: 2,
                                    column: 47
                                }
                            }
                        },
                        start: 19,
                        end: 55,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 2,
                                column: 48
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
                        line: 2,
                        column: 48
                    }
                }
            }
        });
});
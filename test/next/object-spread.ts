import { pass, fail } from '../utils';

describe('Next - Spread', () => {

    fail('function test({...{a}}) {}', {
        source: `function test({...{a}}) {}`,
        next: true
    });
    fail('function test({...{}}) {}', {
        source: `function test({...{}}) {}`,
        next: true
    });
    fail('var {...x = 1} = {}', {
        source: `var {...x = 1} = {}`,
        next: true
    });
    fail('var {...[]} = {}', {
        source: `var {...[]} = {}`,
        next: true
    });
    fail('function test({...[]}) {}', {
        source: `function test({...[]}) {}`,
        next: true
    });
    fail('import(...[1])', {
        source: `import(...[1])`,
        next: true
    });

    pass(`var o = { *method() { return {...yield, y: 1, ...yield}; } }`, {
        source: 'var o = { *method() { return {...yield, y: 1, ...yield}; } }',
        loc: true,
        ranges: true,
        next: true,
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
                                        value: {
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
                                                                    type: 'SpreadElement',
                                                                    argument: {
                                                                        type: 'YieldExpression',
                                                                        argument: null,
                                                                        delegate: false,
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
                                                                    start: 30,
                                                                    end: 38,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 30
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 38
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'y',
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
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 1,
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
                                                                        },
                                                                        raw: '1'
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 40,
                                                                    end: 44,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 40
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 44
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'SpreadElement',
                                                                    argument: {
                                                                        type: 'YieldExpression',
                                                                        argument: null,
                                                                        delegate: false,
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
                                                                    },
                                                                    start: 46,
                                                                    end: 54,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 46
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 54
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 29,
                                                            end: 55,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 29
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 55
                                                                }
                                                            }
                                                        },
                                                        start: 22,
                                                        end: 56,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 22
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 56
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 20,
                                                end: 58,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 58
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 17,
                                            end: 58,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 58
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
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
                                end: 60,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 60
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'o',
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
                            end: 60,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 60
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`let xyab = { x: 1, ...a, y: 2, ...b, ...a };`, {
        source: 'let xyab = { x: 1, ...a, y: 2, ...b, ...a };',
        loc: true,
        ranges: true,
        next: true,
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
                                            name: 'x',
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    {
                                        type: 'SpreadElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        value: {
                                            type: 'Literal',
                                            value: 2,
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
                                            },
                                            raw: '2'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    {
                                        type: 'SpreadElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                        start: 31,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        }
                                    },
                                    {
                                        type: 'SpreadElement',
                                        argument: {
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
                                        }
                                    }
                                ],
                                start: 11,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'xyab',
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
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        }
                    ],
                    kind: 'let',
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

    pass(`x = { ...y, ...{ get z() {} } };`, {
        source: 'x = { ...y, ...{ get z() {} } };',
        loc: true,
        ranges: true,
        next: true,
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
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'SpreadElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                    start: 6,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
                                {
                                    type: 'SpreadElement',
                                    argument: {
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
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
                                                kind: 'get',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 17,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                }
                                            }
                                        ],
                                        start: 15,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
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
                                }
                            ],
                            start: 4,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
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

    pass(`x = { ...undefined, ...null };`, {
        source: 'x = { ...undefined, ...null };',
        loc: true,
        ranges: true,
        next: true,
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
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'SpreadElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'undefined',
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
                                },
                                {
                                    type: 'SpreadElement',
                                    argument: {
                                        type: 'Literal',
                                        value: null,
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
                                        },
                                        raw: 'null'
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
                                }
                            ],
                            start: 4,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
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
                }
            ],
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

    pass(`let aa = { x: 1, y: 2, ...a };`, {
        source: 'let aa = { x: 1, y: 2, ...a };',
        loc: true,
        ranges: true,
        next: true,
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
                                            name: 'x',
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        value: {
                                            type: 'Literal',
                                            value: 2,
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
                                            },
                                            raw: '2'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    {
                                        type: 'SpreadElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                    }
                                ],
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
                            },
                            id: {
                                type: 'Identifier',
                                name: 'aa',
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
                            start: 4,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        }
                    ],
                    kind: 'let',
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
            ],
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

    pass(`result = {...x} = { get v() { } };`, {
        source: 'result = {...x} = { get v() { } };',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    left: {
                        type: 'Identifier',
                        name: 'result',
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
                    operator: '=',
                    right: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'RestElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'x',
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
                            }],
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
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'v',
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
                                    async: false,
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            }],
                            start: 18,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        },
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
            }],
            sourceType: 'script',
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
        }
    });

    pass(`obj = { then: 1, catch: 2 }`, {
        source: 'obj = { then: 1, catch: 2 }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'AssignmentExpression',
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
                    },
                    operator: '=',
                    left: {
                        type: 'Identifier',
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
                        name: 'obj'
                    },
                    right: {
                        type: 'ObjectExpression',
                        start: 6,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        properties: [{
                                type: 'Property',
                                start: 8,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
                                    start: 8,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    },
                                    name: 'then'
                                },
                                value: {
                                    type: 'Literal',
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
                                    value: 1,
                                    raw: '1'
                                },
                                kind: 'init'
                            },
                            {
                                type: 'Property',
                                start: 17,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                },
                                method: false,
                                shorthand: false,
                                computed: false,
                                key: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'catch'
                                },
                                value: {
                                    type: 'Literal',
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
                                    },
                                    value: 2,
                                    raw: '2'
                                },
                                kind: 'init'
                            }
                        ]
                    }
                }
            }],
            sourceType: 'module'
        }
    });

    pass(`let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };`, {
        source: 'let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };',
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    id: {
                        type: 'ObjectPattern',
                        properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                computed: false,
                                value: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'y'
                                },
                                computed: false,
                                value: {
                                    type: 'Identifier',
                                    name: 'y'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true
                            },
                            {
                                type: 'RestElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'z'
                                }
                            }
                        ]
                    },
                    init: {
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x'
                                },
                                computed: false,
                                value: {
                                    type: 'Literal',
                                    value: 1
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'y'
                                },
                                computed: false,
                                value: {
                                    type: 'Literal',
                                    value: 2
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a'
                                },
                                computed: false,
                                value: {
                                    type: 'Literal',
                                    value: 3
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b'
                                },
                                computed: false,
                                value: {
                                    type: 'Literal',
                                    value: 4
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false
                            }
                        ]
                    }
                }],
                kind: 'let'
            }],
            sourceType: 'script'
        }
    });

    pass(`let { x, ...y, ...z } = obj;`, {
        source: 'let { x, ...y, ...z } = obj;',
        next: true,
        expected: {
            body: [{
                declarations: [{
                    id: {
                        properties: [{
                                computed: false,
                                key: {
                                    name: 'x',
                                    type: 'Identifier'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                type: 'Property',
                                value: {
                                    name: 'x',
                                    type: 'Identifier'
                                }
                            },
                            {
                                argument: {
                                    name: 'y',
                                    type: 'Identifier'
                                },
                                type: 'RestElement'
                            },
                            {
                                argument: {
                                    name: 'z',
                                    type: 'Identifier'
                                },
                                type: 'RestElement'
                            }
                        ],
                        type: 'ObjectPattern'
                    },
                    init: {
                        name: 'obj',
                        type: 'Identifier'
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'let',
                type: 'VariableDeclaration'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`({x, ...y, a, ...b, c})`, {
        source: '({x, ...y, a, ...b, c})',
        next: true,
        expected: {
            body: [{
                expression: {
                    properties: [{
                            computed: false,
                            key: {
                                name: 'x',
                                type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            type: 'Property',
                            value: {
                                name: 'x',
                                type: 'Identifier'
                            }
                        },
                        {
                            argument: {
                                name: 'y',
                                type: 'Identifier'
                            },
                            type: 'SpreadElement'
                        },
                        {
                            computed: false,
                            key: {
                                name: 'a',
                                type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            type: 'Property',
                            value: {
                                name: 'a',
                                type: 'Identifier'
                            }
                        },
                        {
                            argument: {
                                name: 'b',
                                type: 'Identifier'
                            },
                            type: 'SpreadElement'
                        },
                        {
                            computed: false,
                            key: {
                                name: 'c',
                                type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            type: 'Property',
                            value: {
                                name: 'c',
                                type: 'Identifier'
                            }
                        }
                    ],
                    type: 'ObjectExpression'
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`export const [bar, { baz, ...foo }] = qux`, {
        source: 'export const [bar, { baz, ...foo }] = qux',
        next: true,
        module: true,
        expected: {
            body: [{
                declaration: {
                    declarations: [{
                        id: {
                            elements: [{
                                    name: 'bar',
                                    type: 'Identifier'
                                },
                                {
                                    properties: [{
                                            computed: false,
                                            key: {
                                                name: 'baz',
                                                type: 'Identifier'
                                            },
                                            kind: 'init',
                                            method: false,
                                            shorthand: true,
                                            type: 'Property',
                                            value: {
                                                name: 'baz',
                                                type: 'Identifier'
                                            }
                                        },
                                        {
                                            argument: {
                                                name: 'foo',
                                                type: 'Identifier'
                                            },
                                            type: 'RestElement'
                                        }
                                    ],
                                    type: 'ObjectPattern'
                                }
                            ],
                            type: 'ArrayPattern'
                        },
                        init: {
                            name: 'qux',
                            type: 'Identifier'
                        },
                        type: 'VariableDeclarator'
                    }, ],
                    kind: 'const',
                    type: 'VariableDeclaration'
                },
                source: null,
                specifiers: [],
                type: 'ExportNamedDeclaration'
            }],
            sourceType: 'module',
            type: 'Program'
        }
    });

    pass(`function f({ x, y, ...z }) {}`, {
        source: 'function f({ x, y, ...z }) {}',
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'f'
                },
                params: [{
                    type: 'ObjectPattern',
                    properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            computed: false,
                            value: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true
                        },
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            computed: false,
                            value: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: true
                        },
                        {
                            type: 'RestElement',
                            argument: {
                                type: 'Identifier',
                                name: 'z'
                            }
                        }
                    ]
                }],
                body: {
                    type: 'BlockStatement',
                    body: []
                },
                generator: false,
                expression: false,
                async: false
            }],
            sourceType: 'script'
        }
    });
});
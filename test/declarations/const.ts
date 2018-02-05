import { pass, fail } from '../test-utils';

describe('Declarations - Const', () => {

    fail('for (;false;) const x = 1;', {
        source: 'for (;false;) const x = 1;',
        message: 'Unexpected token',
        line: 1,
        column: 13,
        index: 13
    });

    fail('if (true) {} else const x = 1;', {
        source: 'if (true) {} else const x = 1;',
        message: 'Unexpected token',
        line: 1,
        column: 17,
        index: 17
    });

    fail('label: const x = 1;', {
        source: 'label: const x = 1;',
        message: 'Unexpected token',
        line: 1,
        column: 6,
        index: 6
    });

    fail('switch (true) { default: const x; }', {
        source: 'switch (true) { default: const x; }',
        message: 'Missing initializer in const declaration',
        line: 1,
        column: 32,
        index: 32
    });

    fail('while (false) const x;', {
        source: 'while (false) const x;',
        message:  'Unexpected token',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`const
            let = "irrelevant initializer";`, {
        source: `const let = "irrelevant initializer";`,
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 5,
        index: 5
    });

    fail('const x, y = 1;', {
        source: 'const x, y = 1;',
        message: 'Missing initializer in const declaration',
        line: 1,
        column: 7,
        index: 7
    });

    fail('const [...[x], y] = [1, 2, 3];', {
        source: 'const [...[x], y] = [1, 2, 3];',
        message: 'Unexpected token',
        line: 1,
        column: 13,
        index: 13
    });
    fail('const [...x = []] = [];', {
        source: 'const [...x = []] = [];',
        message: 'Unexpected token',
        line: 1,
        column: 11,
        index: 11
    });
    fail('const a;', {
        source: 'const a;',
        message: 'Missing initializer in const declaration',
        line: 1,
        column: 7,
        index: 7
    });

    pass(`const x = function foo() {} /42/i`, {
        source: `const x = function foo() {} /42/i`,
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
                                type: 'BinaryExpression',
                                left: {
                                    type: 'BinaryExpression',
                                    left: {
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
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
                                            start: 19,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            }
                                        },
                                        start: 10,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'Literal',
                                        value: 42,
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
                                        raw: '42'
                                    },
                                    operator: '/',
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
                                right: {
                                    type: 'Identifier',
                                    name: 'i',
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
                                operator: '/',
                                start: 10,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
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
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        }
                    ],
                    kind: 'const',
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

    pass(`const await = 10; `, {
        source: `const await = 10;`,
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
                        value: 10,
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
                        },
                        raw: '10'
                    },
                    id: {
                        type: 'Identifier',
                        name: 'await',
                        start: 6,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    start: 6,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    }
                }],
                kind: 'const',
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
            }],
            sourceType: 'script',
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
        }
    });

    pass(`const x = 42`, {
        source: `const x = 42`,
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
                kind: 'const',
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
            }],
            sourceType: 'script',
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

    pass(`const [[...x] = values] = [2, 1, 3];`, {
        source: `const [[...x] = values] = [2, 1, 3];`,
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
                        type: 'ArrayExpression',
                        elements: [{
                                type: 'Literal',
                                value: 2,
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
                                },
                                raw: '2'
                            },
                            {
                                type: 'Literal',
                                value: 1,
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
                                },
                                raw: '1'
                            },
                            {
                                type: 'Literal',
                                value: 3,
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
                                },
                                raw: '3'
                            }
                        ],
                        start: 26,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 26
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    id: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ArrayPattern',
                                elements: [{
                                    type: 'RestElement',
                                    argument: {
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
                                    }
                                }],
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
                            right: {
                                type: 'Identifier',
                                name: 'values',
                                start: 16,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
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
                        }],
                        start: 6,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 6,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }],
                kind: 'const',
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

    pass(`const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];`, {
        source: `const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];`,
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
                        type: 'ArrayExpression',
                        elements: [{
                            type: 'ObjectExpression',
                            properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 11,
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
                                        },
                                        raw: '11'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
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
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                    value: {
                                        type: 'Literal',
                                        value: 22,
                                        start: 61,
                                        end: 63,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 61
                                            },
                                            end: {
                                                line: 1,
                                                column: 63
                                            }
                                        },
                                        raw: '22'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 58,
                                    end: 63,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 58
                                        },
                                        end: {
                                            line: 1,
                                            column: 63
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'z',
                                        start: 65,
                                        end: 66,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 65
                                            },
                                            end: {
                                                line: 1,
                                                column: 66
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 33,
                                        start: 68,
                                        end: 70,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 68
                                            },
                                            end: {
                                                line: 1,
                                                column: 70
                                            }
                                        },
                                        raw: '33'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 65,
                                    end: 70,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 65
                                        },
                                        end: {
                                            line: 1,
                                            column: 70
                                        }
                                    }
                                }
                            ],
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
                        }],
                        start: 48,
                        end: 73,
                        loc: {
                            start: {
                                line: 1,
                                column: 48
                            },
                            end: {
                                line: 1,
                                column: 73
                            }
                        }
                    },
                    id: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ObjectPattern',
                                properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                        method: false,
                                        shorthand: true,
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
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        method: false,
                                        shorthand: true,
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
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        method: false,
                                        shorthand: true,
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
                            right: {
                                type: 'ObjectExpression',
                                properties: [{
                                        type: 'Property',
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
                                        value: {
                                            type: 'Literal',
                                            value: 44,
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
                                            raw: '44'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        value: {
                                            type: 'Literal',
                                            value: 55,
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
                                            },
                                            raw: '55'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 30,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 30
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        value: {
                                            type: 'Literal',
                                            value: 66,
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
                                            raw: '66'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 37,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    }
                                ],
                                start: 21,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            start: 7,
                            end: 44,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 44
                                }
                            }
                        }],
                        start: 6,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    },
                    start: 6,
                    end: 73,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 73
                        }
                    }
                }],
                kind: 'const',
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

    pass(`const [...[x, y, z]] = [3, 4, 5];`, {
        source: `const [...[x, y, z]] = [3, 4, 5];`,
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
                        type: 'ArrayExpression',
                        elements: [{
                                type: 'Literal',
                                value: 3,
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
                                raw: '3'
                            },
                            {
                                type: 'Literal',
                                value: 4,
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
                                },
                                raw: '4'
                            },
                            {
                                type: 'Literal',
                                value: 5,
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
                                },
                                raw: '5'
                            }
                        ],
                        start: 23,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    id: {
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'RestElement',
                            argument: {
                                type: 'ArrayPattern',
                                elements: [{
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
                                    {
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
                                    {
                                        type: 'Identifier',
                                        name: 'z',
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
                                start: 10,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
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
                        }],
                        start: 6,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    start: 6,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 32
                        }
                    }
                }],
                kind: 'const',
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

    pass(`const arrow = () => {};`, {
        source: `const arrow = () => {};`,
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
                        params: [],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
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
                        }
                    },
                    id: {
                        type: 'Identifier',
                        name: 'arrow',
                        start: 6,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    start: 6,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                }],
                kind: 'const',
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

    pass(`const { x: y } = { x: 23 };`, {
        source: `const { x: y } = { x: 23 };`,
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
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
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
                            },
                            value: {
                                type: 'Literal',
                                value: 23,
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
                                raw: '23'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                        }],
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
                    id: {
                        type: 'ObjectPattern',
                        properties: [{
                            type: 'Property',
                            kind: 'init',
                            key: {
                                type: 'Identifier',
                                name: 'x',
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
                            computed: false,
                            value: {
                                type: 'Identifier',
                                name: 'y',
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
                            method: false,
                            shorthand: false,
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
                            }
                        }],
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
                kind: 'const',
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
            }],
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

    pass(`{ const x = 14, y = 3, z = 1977 }`, {
        source: `{ const x = 14, y = 3, z = 1977 }`,
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
                                raw: '14'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'x',
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
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 3,
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
                                raw: '3'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'y',
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
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 1977,
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
                                },
                                raw: '1977'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'z',
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
                            start: 23,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        }
                    ],
                    kind: 'const',
                    start: 2,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    }
                }],
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
});
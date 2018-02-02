import { pass, fail } from '../test-utils';

describe('Destructuring - Cover init names', () => {

// CoverInitName nested in array destructuring.

pass(`[{a = 0}] = [{}];`, {
    source: '[{a = 0}] = [{}];',
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
                        type: 'ArrayPattern',
                        elements: [
                            {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                            }
                                        },
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            start: 2,
                                            end: 7,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 7
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: true,
                                        start: 2,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    }
                                ],
                                start: 1,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            }
                        ],
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
                    operator: '=',
                    right: {
                        type: 'ArrayExpression',
                        elements: [
                            {
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
                            }
                        ],
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
            }
        ],
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

pass(`var [{a = 0}] = [{}];`, {
    source: 'var [{a = 0}] = [{}];',
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
                                    type: 'ObjectExpression',
                                    properties: [],
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
                                }
                            ],
                            start: 16,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
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
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
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
                                                right: {
                                                    type: 'Literal',
                                                    value: 0,
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
                                                    raw: '0'
                                                },
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
                                            method: false,
                                            shorthand: true,
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
                                        }
                                    ],
                                    start: 5,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                }
                            ],
                            start: 4,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 13
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
                    }
                ],
                kind: 'var',
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

pass(`{ let [{a = 0}] = [{}]; }`, {
    source: '{ let [{a = 0}] = [{}]; }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
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
                                            type: 'ObjectExpression',
                                            properties: [],
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
                                        }
                                    ],
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
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
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
                                                    computed: false,
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        left: {
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
                                                        right: {
                                                            type: 'Literal',
                                                            value: 0,
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
                                                            raw: '0'
                                                        },
                                                        start: 8,
                                                        end: 13,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 8
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 13
                                                            }
                                                        }
                                                    },
                                                    method: false,
                                                    shorthand: true,
                                                    start: 8,
                                                    end: 13,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 8
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 13
                                                        }
                                                    }
                                                }
                                            ],
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
                                        }
                                    ],
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
                            }
                        ],
                        kind: 'let',
                        start: 2,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    }
                ],
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
        ],
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

pass(`{ const [{a = 0}] = [{}]; }`, {
    source: '{ const [{a = 0}] = [{}]; }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
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
                                            type: 'ObjectExpression',
                                            properties: [],
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
                                        }
                                    ],
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
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
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
                                                    computed: false,
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        left: {
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
                                                        right: {
                                                            type: 'Literal',
                                                            value: 0,
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
                                                            raw: '0'
                                                        },
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
                                                    method: false,
                                                    shorthand: true,
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
                                            start: 9,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 9
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
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
                        kind: 'const',
                        start: 2,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    }
                ],
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

pass(`for ([{a = 0}] of []);`, {
    source: 'for ([{a = 0}] of []);',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ForOfStatement',
                body: {
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
                },
                left: {
                    type: 'ArrayPattern',
                    elements: [
                        {
                            type: 'ObjectPattern',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        right: {
                                            type: 'Literal',
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        start: 7,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 7,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                }
                            ],
                            start: 6,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        }
                    ],
                    start: 5,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                await: false,
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

pass(`for (const [{a = 0}] of []);`, {
    source: 'for (const [{a = 0}] of []);',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ForOfStatement',
                body: {
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
                },
                left: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                kind: 'init',
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
                                                computed: false,
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    left: {
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
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0,
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
                                                        raw: '0'
                                                    },
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
                                                method: false,
                                                shorthand: true,
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
                                            }
                                        ],
                                        start: 12,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    }
                                ],
                                start: 11,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            start: 11,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        }
                    ],
                    kind: 'const',
                    start: 5,
                    end: 20,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 20
                        }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 24,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 24
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                },
                await: false,
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

pass(`function f([{a = 0}]) {}`, {
    source: 'function f([{a = 0}]) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'FunctionDeclaration',
                params: [
                    {
                        type: 'ArrayPattern',
                        elements: [
                            {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
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
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
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
                                        method: false,
                                        shorthand: true,
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
                                    }
                                ],
                                start: 12,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
                        start: 11,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
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
                id: {
                    type: 'Identifier',
                    name: 'f',
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

pass(`var h = ([{a = 0}]) => {};`, {
    source: 'var h = ([{a = 0}]) => {};',
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
                            type: 'ArrowFunctionExpression',
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
                            params: [
                                {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'a',
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
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'a',
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
                                                        right: {
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
                                                        start: 11,
                                                        end: 16,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 11
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 16
                                                            }
                                                        }
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: true,
                                                    start: 11,
                                                    end: 16,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 11
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 16
                                                        }
                                                    }
                                                }
                                            ],
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
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        id: {
                            type: 'Identifier',
                            name: 'h',
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
                    }
                ],
                kind: 'var',
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

// CoverInitName nested in rest pattern.

pass(`[...[{a = 0}]] = [{}];`, {
    source: '[...[{a = 0}]] = [{}];',
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
                        type: 'ArrayPattern',
                        elements: [
                            {
                                type: 'RestElement',
                                argument: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
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
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        left: {
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
                                                        right: {
                                                            type: 'Literal',
                                                            value: 0,
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
                                                            raw: '0'
                                                        },
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
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: true,
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
                                                }
                                            ],
                                            start: 5,
                                            end: 12,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 12
                                                }
                                            }
                                        }
                                    ],
                                    start: 4,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
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
                            }
                        ],
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
                    operator: '=',
                    right: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'ObjectExpression',
                                properties: [],
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
                            }
                        ],
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

pass(`var [...[{a = 0}]] = [{}];`, {
    source: 'var [...[{a = 0}]] = [{}];',
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
                                    type: 'ObjectExpression',
                                    properties: [],
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
                                }
                            ],
                            start: 21,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        },
                        id: {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'AssignmentPattern',
                                                            left: {
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
                                                            right: {
                                                                type: 'Literal',
                                                                value: 0,
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
                                                                raw: '0'
                                                            },
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
                                                        method: false,
                                                        shorthand: true,
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
                                                start: 9,
                                                end: 16,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 9
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 16
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
                                    start: 5,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                }
                            ],
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
                    }
                ],
                kind: 'var',
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

pass(`{ const [...[{a = 0}]] = [{}]; }`, {
    source: '{ const [...[{a = 0}]] = [{}]; }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
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
                                            type: 'ObjectExpression',
                                            properties: [],
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
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'RestElement',
                                            argument: {
                                                type: 'ArrayPattern',
                                                elements: [
                                                    {
                                                        type: 'ObjectPattern',
                                                        properties: [
                                                            {
                                                                type: 'Property',
                                                                kind: 'init',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'a',
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
                                                                computed: false,
                                                                value: {
                                                                    type: 'AssignmentPattern',
                                                                    left: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
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
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 0,
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
                                                                        raw: '0'
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
                                                                method: false,
                                                                shorthand: true,
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
                                                            }
                                                        ],
                                                        start: 13,
                                                        end: 20,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 13
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 20
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 12,
                                                end: 21,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 21
                                                    }
                                                }
                                            },
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
                            }
                        ],
                        kind: 'const',
                        start: 2,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 30
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

pass(`for ([...[{a = 0}]] of []);`, {
    source: 'for ([...[{a = 0}]] of []);',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ForOfStatement',
                body: {
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
                left: {
                    type: 'ArrayPattern',
                    elements: [
                        {
                            type: 'RestElement',
                            argument: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a',
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
                                                    right: {
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
                                                    start: 11,
                                                    end: 16,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 11
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 16
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: true,
                                                start: 11,
                                                end: 16,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 11
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 16
                                                    }
                                                }
                                            }
                                        ],
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
                        }
                    ],
                    start: 5,
                    end: 19,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 19
                        }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                await: false,
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

pass(`for (let [...[{a = 0}]] of []);`, {
    source: 'for (let [...[{a = 0}]] of []);',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ForOfStatement',
                body: {
                    type: 'EmptyStatement',
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
                left: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'ObjectPattern',
                                                    properties: [
                                                        {
                                                            type: 'Property',
                                                            kind: 'init',
                                                            key: {
                                                                type: 'Identifier',
                                                                name: 'a',
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
                                                                type: 'AssignmentPattern',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'a',
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
                                                                right: {
                                                                    type: 'Literal',
                                                                    value: 0,
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
                                                                    },
                                                                    raw: '0'
                                                                },
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
                                                            method: false,
                                                            shorthand: true,
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
                                                        }
                                                    ],
                                                    start: 14,
                                                    end: 21,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 21
                                                        }
                                                    }
                                                }
                                            ],
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
                                        start: 10,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    }
                                ],
                                start: 9,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            start: 9,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        }
                    ],
                    kind: 'let',
                    start: 5,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                await: false,
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

pass(`function f([...[{a = 0}]]) {}`, {
    source: 'function f([...[{a = 0}]]) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'FunctionDeclaration',
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
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'a',
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
                                                    computed: false,
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'a',
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
                                                        right: {
                                                            type: 'Literal',
                                                            value: 0,
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
                                                            raw: '0'
                                                        },
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
                                                    method: false,
                                                    shorthand: true,
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
                                                }
                                            ],
                                            start: 16,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            }
                                        }
                                    ],
                                    start: 15,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                start: 12,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 11,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    }
                ],
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
                id: {
                    type: 'Identifier',
                    name: 'f',
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

// CoverInitName nested in object destructuring.

pass(`({p: {a = 0}} = {p: {}});`, {
    source: '({p: {a = 0}} = {p: {}});',
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
                        type: 'ObjectPattern',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'p',
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
                                    }
                                },
                                value: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
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
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
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
                                                right: {
                                                    type: 'Literal',
                                                    value: 0,
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
                                                    raw: '0'
                                                },
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
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
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
                                        }
                                    ],
                                    start: 5,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            }
                        ],
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
                    operator: '=',
                    right: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'p',
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
                                    type: 'ObjectExpression',
                                    properties: [],
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            }
                        ],
                        start: 16,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
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
        ],
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

pass(`var {p: {a = 0}} = {p: {}};`, {
    source: 'var {p: {a = 0}} = {p: {}};',
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
                                    value: {
                                        type: 'ObjectExpression',
                                        properties: [],
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
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
                                }
                            ],
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
                        id: {
                            type: 'ObjectPattern',
                            properties: [
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'p',
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
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a',
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
                                                    right: {
                                                        type: 'Literal',
                                                        value: 0,
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
                                                        raw: '0'
                                                    },
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
                                                method: false,
                                                shorthand: true,
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
                                            }
                                        ],
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
                                        }
                                    },
                                    method: false,
                                    shorthand: false,
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
                                    }
                                }
                            ],
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
                        start: 4,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    }
                ],
                kind: 'var',
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

pass(`{ const {p: {a = 0}} = {p: {}}; }`, {
    source: '{ const {p: {a = 0}} = {p: {}}; }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'BlockStatement',
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
                                                type: 'ObjectExpression',
                                                properties: [],
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
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
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
                                        }
                                    ],
                                    start: 23,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'p',
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
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'AssignmentPattern',
                                                            left: {
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
                                                            right: {
                                                                type: 'Literal',
                                                                value: 0,
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
                                                                raw: '0'
                                                            },
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
                                                        method: false,
                                                        shorthand: true,
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
                                                    }
                                                ],
                                                start: 12,
                                                end: 19,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 12
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 19
                                                    }
                                                }
                                            },
                                            method: false,
                                            shorthand: false,
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

pass(`for (var {p: {a = 0}} of []);`, {
    source: 'for (var {p: {a = 0}} of []);',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ForOfStatement',
                body: {
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
                left: {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
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
                                        computed: false,
                                        value: {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    kind: 'init',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'a',
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
                                                    computed: false,
                                                    value: {
                                                        type: 'AssignmentPattern',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'a',
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
                                                        right: {
                                                            type: 'Literal',
                                                            value: 0,
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
                                                            raw: '0'
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
                                                    method: false,
                                                    shorthand: true,
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
                                                }
                                            ],
                                            start: 13,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 10,
                                        end: 20,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 20
                                            }
                                        }
                                    }
                                ],
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
                    kind: 'var',
                    start: 5,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                },
                right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                await: false,
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

pass(`function f({p: {a = 0}}) {}`, {
    source: 'function f({p: {a = 0}}) {}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'FunctionDeclaration',
                params: [
                    {
                        type: 'ObjectPattern',
                        properties: [
                            {
                                type: 'Property',
                                kind: 'init',
                                key: {
                                    type: 'Identifier',
                                    name: 'p',
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
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
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
                                            computed: false,
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
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
                                                right: {
                                                    type: 'Literal',
                                                    value: 0,
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
                                                    raw: '0'
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
                                            method: false,
                                            shorthand: true,
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
                                        }
                                    ],
                                    start: 15,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                method: false,
                                shorthand: false,
                                start: 12,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        start: 11,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    }
                ],
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
                    name: 'f',
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

pass(`var h = ({p: {a = 0}}) => {};`, {
    source: 'var h = ({p: {a = 0}}) => {};',
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
                            type: 'ArrowFunctionExpression',
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
                            params: [
                                {
                                    type: 'ObjectPattern',
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
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'a',
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
                                                            type: 'AssignmentPattern',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'a',
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
                                                            right: {
                                                                type: 'Literal',
                                                                value: 0,
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
                                                                raw: '0'
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
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: true,
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
                                                    }
                                                ],
                                                start: 13,
                                                end: 20,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 13
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 20
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 10,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            }
                                        }
                                    ],
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
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        id: {
                            type: 'Identifier',
                            name: 'h',
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
                    }
                ],
                kind: 'var',
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
});
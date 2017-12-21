import { pass, fail } from '../utils';

describe('Expressions - Object', () => {

    pass(`object = { __proto__: undefined };`, {
        source: 'object = { __proto__: undefined };',
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
                            name: 'object',
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
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
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
                                    value: {
                                        type: 'Identifier',
                                        name: 'undefined',
                                        start: 22,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                }
                            ],
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
                }
            ],
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

    pass(`object = { __proto__: 1 };`, {
        source: 'object = { __proto__: 1 };',
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
                            name: 'object',
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
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
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
                                    value: {
                                        type: 'Literal',
                                        value: 1,
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
                                        },
                                        raw: '1'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
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
    pass(`object = { __proto__: false };`, {
        source: 'object = { __proto__: false };',
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
                            name: 'object',
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
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
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
                                    value: {
                                        type: 'Literal',
                                        value: false,
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
                                        },
                                        raw: 'false'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
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

    pass(`object = { __proto__: 'string literal' };`, {
        source: 'object = { __proto__: "string literal" };',
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
                            name: 'object',
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
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
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
                                    value: {
                                        type: 'Literal',
                                        value: 'string literal',
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
                                        },
                                        raw: '"string literal"'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 40
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

    pass(`object = { __proto__: Symbol("") };`, {
        source: 'object = { __proto__: Symbol("") };',
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
                            name: 'object',
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
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
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
                                    value: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'Symbol',
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
                                        arguments: [
                                            {
                                                type: 'Literal',
                                                value: '',
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
                                                raw: '""'
                                            }
                                        ],
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
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 11,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
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

    pass(`({})`, {
        source: '({})',
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
                        properties: [],
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

    pass(`({ answer: 0 })`, {
        source: '({ answer: 0 })',
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
                                    name: 'answer',
                                    start: 3,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                value: {
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 12,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 12
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 14
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

    pass(`({ if: 0 })`, {
        source: '({ if: 0 })',
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
                                    name: 'if',
                                    start: 3,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 10
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
                }
            ],
            sourceType: 'script',
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
        }
    });

    pass(`({ true: 0 })`, {
        source: '({ true: 0 })',
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
                                    name: 'true',
                                    start: 3,
                                    end: 7,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 7
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 12
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

    pass(`({ x: 1, x: 2 })`, {
        source: '({ x: 1, x: 2 })',
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
                                    name: 'x',
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
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            {
                                type: 'Property',
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
                                value: {
                                    type: 'Literal',
                                    value: 2,
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
                                    raw: '2'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            }
                        ],
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

    pass(`({ get width() { return m_width } })`, {
        source: '({ get width() {  } })',
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
                                    name: 'width',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
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

    pass(`({ get undef() {} })`, {
        source: '({ get undef() {} })',
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
                                    name: 'undef',
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }
                        ],
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

    pass(`({ get if() {} })`, {
        source: '({ get if() {} })',
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
                                    name: 'if',
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
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

    pass(`({ get true() {} })`, {
        source: '({ get true() {} })',
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
                                    name: 'true',
                                    start: 7,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            }
                        ],
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

    pass(`({ get "undef"() {} })`, {
        source: '({ get "undef"() {} })',
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
                                    type: 'Literal',
                                    value: 'undef',
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
                                    },
                                    raw: '"undef"'
                                },
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
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

    pass(`({ get 10() {} })`, {
        source: '({ get 10() {} })',
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
                                    type: 'Literal',
                                    value: 10,
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
                                    },
                                    raw: '10'
                                },
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
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

    pass(`({ set width(w) { w } })`, {
        source: '({ set width(w) { w } })',
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
                                    name: 'width',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
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
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
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
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            }
                        ],
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

    pass(`({ set if(w) { w } })`, {
        source: '({ set if(w) { w } })',
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
                                    name: 'if',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
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
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
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
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
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

    pass(`({ set "null"(w) { w } })`, {
        source: '({ set "null"(w) { w } })',
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
                                    type: 'Literal',
                                    value: 'null',
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
                                    },
                                    raw: '"null"'
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
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
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
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
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 24
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

    pass(`({ set 10(w) { w } })`, {
        source: '({ set 10(w) { w } })',
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
                                    type: 'Literal',
                                    value: 10,
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
                                    },
                                    raw: '10'
                                },
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'w',
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
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'w',
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
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            }
                        ],
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

    pass(`({ get: 2 })`, {
            source: '({ get: 2 })',
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
                                        name: 'get',
                                        start: 3,
                                        end: 6,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 6
                                            }
                                        }
                                    },
                                    value: {
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 3,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                }
                            ],
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

    pass(`({ __proto__: 2 })`, {
            source: '({ __proto__: 2 })',
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
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    value: {
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
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
                                }
                            ],
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

    pass(`({"__proto__": 2 })`, {
            source: '({"__proto__": 2 })',
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
                            type: 'Literal',
                            value: '__proto__',
                            start: 2,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"__proto__"'
                        },
                        value: {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 2,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    }
                ],
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

    pass(`({a})`, {
            source: '({a})',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                }
                            ],
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
                            }
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
                        }
                    }
                ],
                sourceType: 'script',
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
            }
        });

    pass(`({let})`, {
            source: '({let})',
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
                                        name: 'let',
                                        start: 2,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'let',
                                        start: 2,
                                        end: 5,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 5
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 2,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
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

    pass(`({ enum: 0 })`, {
            source: '({ enum: 0 })',
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
                                        name: 'enum',
                                        start: 3,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 0,
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
                                        raw: '0'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 3,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 12
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

    pass(`({a, b: 0, c})`, {
            source: '({a, b: 0, c})',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
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
                                    kind: 'init',
                                    computed: false,
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
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'c',
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
                                        type: 'Identifier',
                                        name: 'c',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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

    pass(`({a, b})`, {
            source: '({a, b})',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
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
                                }
                            ],
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

    pass(`({a(){}})`, {
            source: '({a(){}})',
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
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
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
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 3,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
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

    pass(`({a(){let a;}})`, {
            source: '({a(){let a;}})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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
                              },
                              body: [
                                {
                                  type: 'VariableDeclaration',
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
                                  },
                                  declarations: [
                                    {
                                      type: 'VariableDeclarator',
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
                                      id: {
                                        type: 'Identifier',
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
                                        name: 'a'
                                      },
                                      init: null
                                    }
                                  ],
                                  kind: 'let'
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

    pass(`({a(b){}})`, {
            source: '({a(b){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'ObjectExpression',
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
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
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
                                name: 'b'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              start: 6,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 8
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

    pass(`({a(b,...c){}})`, {
            source: '({a(b,...c){}})',
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
                                        type: 'FunctionExpression',
                                        params: [
                                            {
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
                                            {
                                                type: 'RestElement',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
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
                                            }
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 3,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 2,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 14
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

    pass(`({a(b,c){}})`, {
            source: '({a(b,c){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 10,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 10
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
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
                                name: 'b'
                              },
                              {
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
                                name: 'c'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({a(b,c){let d;}})`, {
            source: '({a(b,c){let d;}})',
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
                                        type: 'FunctionExpression',
                                        params: [
                                            {
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
                                            {
                                                type: 'Identifier',
                                                name: 'c',
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
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'VariableDeclaration',
                                                    declarations: [
                                                        {
                                                            type: 'VariableDeclarator',
                                                            init: null,
                                                            id: {
                                                                type: 'Identifier',
                                                                name: 'd',
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
                                                        }
                                                    ],
                                                    kind: 'let',
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
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 3,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 2,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                }
                            ],
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

    pass(`({set a(eval){}})`, {
            source: '({set a(eval){}})',
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
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'eval',
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
                                            }
                                        ],
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
                                    kind: 'set',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 2,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
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

    pass(`({ set a([{b = 0}]){}, })`, {
            source: '({ set a([{b = 0}]){}, })',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 3,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 3
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                            name: 'a'
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'ArrayPattern',
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
                                },
                                elements: [
                                  {
                                    type: 'ObjectPattern',
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
                                    },
                                    properties: [
                                      {
                                        type: 'Property',
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
                                        },
                                        method: false,
                                        shorthand: true,
                                        computed: false,
                                        key: {
                                          type: 'Identifier',
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
                                          name: 'b'
                                        },
                                        kind: 'init',
                                        value: {
                                          type: 'AssignmentPattern',
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
                                          },
                                          left: {
                                            type: 'Identifier',
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
                                            name: 'b'
                                          },
                                          right: {
                                            type: 'Literal',
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
                                            value: 0,
                                            raw: '0'
                                          }
                                        }
                                      }
                                    ]
                                  }
                                ]
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({ async })`, {
            source: '({ async })',
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
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 3,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 10
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
                    }
                ],
                sourceType: 'script',
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
            }
        });

    pass(`({ async, await })`, {
            source: '({ async, await })',
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
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'async',
                                        start: 3,
                                        end: 8,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 8
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 3,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'await',
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
                                    value: {
                                        type: 'Identifier',
                                        name: 'await',
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
                                    kind: 'init',
                                    computed: false,
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

    pass(`({*a(){}})`, {
            source: '({*a(){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'ObjectExpression',
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
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
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
                            name: 'a'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
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
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 6,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 8
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

    pass(`({*yield(){}})`, {
            source: '({*yield(){}})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            name: 'yield'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
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
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({*[yield](){}})`, {
            source: '({*[yield](){}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 14,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 14
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'Identifier',
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
                            },
                            name: 'yield'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: true,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({0x0:0})`, {
            source: '({0x0:0})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
                            start: 2,
                            end: 5,
                            loc: {
                              start: {
                                line: 1,
                                column: 2
                              },
                              end: {
                                line: 1,
                                column: 5
                              }
                            },
                            value: 0,
                            raw: '0x0'
                          },
                          value: {
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
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({2e308:0})`, {
            source: '({2e308:0})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 10,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 10
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 9,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 9
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
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
                            },
                            value: Infinity,
                            raw: '2e308'
                          },
                          value: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({get b() {}})`, {
            source: '({get b() {}})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                            name: 'b'
                          },
                          kind: 'get',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({set c(x) {}})`, {
            source: '({set c(x) {}})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                            name: 'c'
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
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
                                name: 'x'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({__proto__:0})`, {
            source: '({__proto__:0})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 2,
                            end: 11,
                            loc: {
                              start: {
                                line: 1,
                                column: 2
                              },
                              end: {
                                line: 1,
                                column: 11
                              }
                            },
                            name: '__proto__'
                          },
                          value: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({get __proto__() {}})`, {
            source: '({get __proto__() {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            },
                            name: '__proto__'
                          },
                          kind: 'get',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({set __proto__(x) {}})`, {
            source: '({set __proto__(x) {}})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Identifier',
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
                            },
                            name: '__proto__'
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
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
                                name: 'x'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({["nUmBeR"+9]:"nein"})`, {
            source: '({["nUmBeR"+9]:"nein"})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
                      start: 1,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 3,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            left: {
                              type: 'Literal',
                              start: 3,
                              end: 11,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 3
                                },
                                end: {
                                  line: 1,
                                  column: 11
                                }
                              },
                              value: 'nUmBeR',
                              raw: '"nUmBeR"'
                            },
                            operator: '+',
                            right: {
                              type: 'Literal',
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
                              value: 9,
                              raw: '9'
                            }
                          },
                          value: {
                            type: 'Literal',
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
                            },
                            value: 'nein',
                            raw: '"nein"'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({[2*308]:0})`, {
            source: '({[2*308]:0})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 11,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 11
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            left: {
                              type: 'Literal',
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
                              value: 2,
                              raw: '2'
                            },
                            operator: '*',
                            right: {
                              type: 'Literal',
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
                              value: 308,
                              raw: '308'
                            }
                          },
                          value: {
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
                            value: 0,
                            raw: '0'
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({get [6+3]() {}, set [5/4](x) {}})`, {
            source: '({get [6+3]() {}, set [5/4](x) {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 16,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 16
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 7,
                            end: 10,
                            loc: {
                              start: {
                                line: 1,
                                column: 7
                              },
                              end: {
                                line: 1,
                                column: 10
                              }
                            },
                            left: {
                              type: 'Literal',
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
                              value: 6,
                              raw: '6'
                            },
                            operator: '+',
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
                          },
                          kind: 'get',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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
                              body: []
                            }
                          }
                        },
                        {
                          type: 'Property',
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
                          },
                          method: false,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
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
                            },
                            left: {
                              type: 'Literal',
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
                              value: 5,
                              raw: '5'
                            },
                            operator: '/',
                            right: {
                              type: 'Literal',
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
                              },
                              value: 4,
                              raw: '4'
                            }
                          },
                          kind: 'set',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
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
                                name: 'x'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({[6+3]() {}})`, {
            source: '({[6+3]() {}})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: true,
                          shorthand: false,
                          computed: true,
                          key: {
                            type: 'BinaryExpression',
                            start: 3,
                            end: 6,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 6
                              }
                            },
                            left: {
                              type: 'Literal',
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
                              value: 6,
                              raw: '6'
                            },
                            operator: '+',
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
                              value: 3,
                              raw: '3'
                            }
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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

    pass(`({3() {}})`, {
            source: '({3() {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    expression: {
                      type: 'ObjectExpression',
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
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
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
                            value: 3,
                            raw: '3'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 3,
                            end: 8,
                            loc: {
                              start: {
                                line: 1,
                                column: 3
                              },
                              end: {
                                line: 1,
                                column: 8
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              start: 6,
                              end: 8,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 6
                                },
                                end: {
                                  line: 1,
                                  column: 8
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

    pass(`({"moo"() {}})`, {
            source: '({"moo"() {}})',
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
                body: [
                  {
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
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'Property',
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
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
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
                            },
                            value: 'moo',
                            raw: '"moo"'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                              type: 'BlockStatement',
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

    pass(`x = { y, z }`, {
            source: 'x = { y, z }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                            type: 'Identifier',
                                            name: 'y',
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
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: true,
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
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        value: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        kind: 'init',
                                        computed: false,
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
                                    }
                                ],
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

    pass(`({ __proto__: null, get __proto__(){} })`, {
            source: '({ __proto__: null, get __proto__(){} })',
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
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: null,
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
                                        },
                                        raw: 'null'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 3,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 24,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    },
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
                                    kind: 'get',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 20,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                }
                            ],
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

    pass(`({__proto__ = 0, __proto__ = 0} = {})`, {
            source: '({__proto__ = 0, __proto__ = 0} = {})',
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
                                            name: '__proto__',
                                            start: 2,
                                            end: 11,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 11
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: '__proto__',
                                                start: 2,
                                                end: 11,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 2
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
                                            start: 2,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: true,
                                        start: 2,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
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
                                            name: '__proto__',
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
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: '__proto__',
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
                                            right: {
                                                type: 'Literal',
                                                value: 0,
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
                                                },
                                                raw: '0'
                                            },
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
                                        shorthand: true,
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
                                    }
                                ],
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
                            operator: '=',
                            right: {
                                type: 'ObjectExpression',
                                properties: [],
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

    pass(`({ __proto__, "__proto__": null })`, {
            source: '({ __proto__, "__proto__": null })',
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
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 3,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 3
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
                                    start: 3,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 3
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Literal',
                                        value: '__proto__',
                                        start: 14,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        },
                                        raw: '"__proto__"'
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: null,
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
                                        raw: 'null'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 14,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
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
                    }
                ],
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

    pass(`x = { get() { } }`, {
            source: 'x = { get() { } }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'get',
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
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 12,
                                                end: 15,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 12
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
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
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
                                    }
                                ],
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

    pass(`x = { method() { } }`, {
            source: 'x = { method() { } }',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'method',
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
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
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
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 12,
                                            end: 18,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 18
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
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
                                    }
                                ],
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

    pass(`({"esprima"(sucks, big, time) {}})`, {
            source: '({"esprima"(sucks, big, time) {}})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ExpressionStatement',
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
                    },
                    expression: {
                      type: 'ObjectExpression',
                      start: 1,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 2,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          },
                          method: true,
                          shorthand: false,
                          computed: false,
                          key: {
                            type: 'Literal',
                            start: 2,
                            end: 11,
                            loc: {
                              start: {
                                line: 1,
                                column: 2
                              },
                              end: {
                                line: 1,
                                column: 11
                              }
                            },
                            value: 'esprima',
                            raw: '"esprima"'
                          },
                          kind: 'init',
                          value: {
                            type: 'FunctionExpression',
                            start: 11,
                            end: 32,
                            loc: {
                              start: {
                                line: 1,
                                column: 11
                              },
                              end: {
                                line: 1,
                                column: 32
                              }
                            },
                            id: null,
                            generator: false,
                            expression: false,
                            async: false,
                            params: [
                              {
                                type: 'Identifier',
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
                                name: 'sucks'
                              },
                              {
                                type: 'Identifier',
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
                                },
                                name: 'big'
                              },
                              {
                                type: 'Identifier',
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
                                },
                                name: 'time'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
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

    fail(`({[1,2]:3})`, {
            source: '({[1,2]:3})',
        });

    fail(`({ *a })`, {
            source: '({ *a })',
        });

    fail(`({ *a: 0 })`, {
            source: '({ *a: 0 })',
        });

    fail(`({ *[0]: 0 })`, {
            source: '({ *[0]: 0 })',
        });

    fail(`x = { get y(z) {} }`, {
            source: 'x = { get y(z) {} }',
        });

    fail(`x = { set y() {} }`, {
            source: 'x = { set y() {} }',
        });

    fail(`x = { set y(a, b) {} }`, {
            source: 'x = { set y(a, b) {} }',
        });

    fail(`({ *method(x = yield) {} });`, {
            source: '({ *method(x = yield) {} });',
        });

    fail(`({ *[0]: 0 })`, {
            source: '({ *[0]: 0 })',
        });

    fail(`({ g\\u0065t m() {} });`, {
            source: '({ g\\u0065t m() {} });',
        });

    fail(`({ __proto__: null, __proto__: null })`, {
            source: '({ __proto__: null, __proto__: null })',
        });

    fail(`({ "__proto__": null, '__proto__': null })`, {
            source: '({ "__proto__": null, "__proto__": null })',
        });
});
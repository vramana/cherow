import { pass } from '../utils';

describe('Destructuring - Duplicate proto', () => {

    pass(`({__proto__: a, __proto__: b} = {});`, {
        source: '({__proto__: a, __proto__: b} = {});',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
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
                                    }
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 16,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 16,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                }
                            ],
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
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [],
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
                }
            ],
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

    pass(`var {__proto__: a, __proto__: b} = {};`, {
        source: 'var {__proto__: a, __proto__: b} = {};',
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
                                properties: [],
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
                            id: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: '__proto__',
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
                                        computed: false,
                                        value: {
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
                                        method: false,
                                        shorthand: false,
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
                                    },
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: '__proto__',
                                            start: 19,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                        method: false,
                                        shorthand: false,
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
                            start: 4,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        }
                    ],
                    kind: 'var',
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
            ],
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

    // Destructuring binding with "let".

    pass(`let {__proto__: a, __proto__: b} = {};`, {
        source: 'let {__proto__: a, __proto__: b} = {};',
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
                                properties: [],
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
                            id: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: '__proto__',
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
                                        computed: false,
                                        value: {
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
                                        method: false,
                                        shorthand: false,
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
                                    },
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: '__proto__',
                                            start: 19,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                        method: false,
                                        shorthand: false,
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
                            start: 4,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        }
                    ],
                    kind: 'let',
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
            ],
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

    // Destructuring binding with "const".
    pass(` const {__proto__: a, __proto__: b} = {};`, {
        source: 'const {__proto__: a, __proto__: b} = {};',
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
                                properties: [],
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
                            id: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        method: false,
                                        shorthand: false,
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
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: '__proto__',
                                            start: 21,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
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
                                            name: 'b',
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
                                        method: false,
                                        shorthand: false,
                                        start: 21,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
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
                            start: 6,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        }
                    ],
                    kind: 'const',
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

    pass(`function f1({__proto__: a, __proto__: b}) {}`, {
        source: 'function f1({__proto__: a, __proto__: b}) {}',
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
                                        name: '__proto__',
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
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    method: false,
                                    shorthand: false,
                                    start: 13,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                },
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: '__proto__',
                                        start: 27,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    method: false,
                                    shorthand: false,
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
                                }
                            ],
                            start: 12,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 12
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 42,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 42
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f1',
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

    pass(`var f3 = ({__proto__: a, __proto__: b} = {}) => {}`, {
        source: 'var f3 = ({__proto__: a, __proto__: b} = {}) => {}',
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
                                    start: 48,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 48
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ObjectPattern',
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
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: '__proto__',
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
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'b',
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
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 25,
                                                    end: 37,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 37
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 10,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: [],
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
                                        start: 10,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 9,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 50
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'f3',
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
                            end: 50,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 50
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 50,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 50
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 50,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 50
                }
            }
        }
    });
});
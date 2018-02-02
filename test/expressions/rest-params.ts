import { pass, fail } from '../test-utils';

describe('Expressions - Rest params', () => {

    pass(`function f(...b) {};`, {
        source: 'function f(...b) {};',
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
                    type: 'RestElement',
                    argument: {
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
                    },
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
        },
        {
            type: 'EmptyStatement',
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

    pass(`var x = function(a, ...b) {};`, {
        source: 'var x = function(a, ...b) {};',
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
                                type: 'FunctionExpression',
                                params: [
                                    {
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
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                    }
                                ],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
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

    pass(`function f(a, ...b) {};`, {
        source: 'function f(a, ...b) {};',
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
                        {
                            type: 'RestElement',
                            argument: {
                                type: 'Identifier',
                                name: 'b',
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
                        }
                    ],
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
                },
                {
                    type: 'EmptyStatement',
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

    pass(`var fn = (a, b, ...c) => c;`, {
        source: 'var fn = (a, b, ...c) => c;',
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
                                    type: 'Identifier',
                                    name: 'c',
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
                                params: [
                                    {
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
                                    {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'c',
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 9,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'fn',
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

    pass(`function f(a, ...b) {}`, {
        source: 'function f(a, ...b) {}',
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
                        {
                            type: 'RestElement',
                            argument: {
                                type: 'Identifier',
                                name: 'b',
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
                        }
                    ],
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

    pass(`function empty(...{}) {}`, {
        source: 'function empty(...{}) {}',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
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
                        name: 'empty',
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

    pass(`function emptyWithArray(...{p: []}) {}`, {
        source: 'function emptyWithArray(...{p: []}) {}',
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
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                        computed: false,
                                        value: {
                                            type: 'ArrayPattern',
                                            elements: [],
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
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 28,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    }
                                ],
                                start: 27,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            start: 24,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'emptyWithArray',
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

    pass(`function emptyWithObject(...{p: {}}) {}`, {
        source: 'function emptyWithObject(...{p: {}}) {}',
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
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                            type: 'ObjectPattern',
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
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 28,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            },
                            start: 25,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 25
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'emptyWithObject',
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
                    },
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
            ],
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

    pass(`function singleElement(...{a: b}) {}`, {
        source: 'function singleElement(...{a: b}) {}',
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
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                    }
                                ],
                                start: 26,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
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
                        }
                    ],
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
                    id: {
                        type: 'Identifier',
                        name: 'singleElement',
                        start: 9,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 22
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

    pass(`function singleElementWithArray(...{p: [a]}) {}`, {
        source: 'function singleElementWithArray(...{p: [a]}) {}',
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
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p',
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
                                        computed: false,
                                        value: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
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
                                                }
                                            ],
                                            start: 39,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 36,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    }
                                ],
                                start: 35,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 35
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                }
                            },
                            start: 32,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'singleElementWithArray',
                        start: 9,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 31
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
            sourceType: 'script',
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

    pass(`function multiElement(...{a: r, b: s, c: t}) {}`, {
        source: 'function multiElement(...{a: r, b: s, c: t}) {}',
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
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'r',
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
                                        shorthand: false,
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
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 's',
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
                                        method: false,
                                        shorthand: false,
                                        start: 32,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'c',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 't',
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
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 25,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                }
                            },
                            start: 22,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'multiElement',
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
            sourceType: 'script',
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

    pass(`function multiElementWithLeading(x, y, ...{a: r, b: s, c: t}) {}`, {
        source: 'function multiElementWithLeading(x, y, ...{a: r, b: s, c: t}) {}',
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
                            type: 'Identifier',
                            name: 'x',
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
                        {
                            type: 'Identifier',
                            name: 'y',
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
                            type: 'RestElement',
                            argument: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'r',
                                            start: 46,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 46
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
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
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 's',
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
                                        method: false,
                                        shorthand: false,
                                        start: 49,
                                        end: 53,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 49
                                            },
                                            end: {
                                                line: 1,
                                                column: 53
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'c',
                                            start: 55,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 55
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 56
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 't',
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
                                        method: false,
                                        shorthand: false,
                                        start: 55,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 55
                                            },
                                            end: {
                                                line: 1,
                                                column: 59
                                            }
                                        }
                                    }
                                ],
                                start: 42,
                                end: 60,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 42
                                    },
                                    end: {
                                        line: 1,
                                        column: 60
                                    }
                                }
                            },
                            start: 39,
                            end: 60,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 39
                                },
                                end: {
                                    line: 1,
                                    column: 60
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'multiElementWithLeading',
                        start: 9,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
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

    pass(`function emptyWithRest(...[...[]]) {}`, {
        source: 'function emptyWithRest(...[...[]]) {}',
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
                            type: 'RestElement',
                            argument: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'ArrayPattern',
                                            elements: [],
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
                                            }
                                        },
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
                                    }
                                ],
                                start: 26,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            },
                            start: 23,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        }
                    ],
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
                    id: {
                        type: 'Identifier',
                        name: 'emptyWithRest',
                        start: 9,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 22
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

    pass(`function singleElementWithLeading(x, ...[a]) {}`, {
        source: 'function singleElementWithLeading(x, ...[a]) {}',
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
                            type: 'Identifier',
                            name: 'x',
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
                        {
                            type: 'RestElement',
                            argument: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    }
                                ],
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
                            start: 37,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 37
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'singleElementWithLeading',
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
            sourceType: 'script',
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

    fail(`function f(a, ...b, c);`, {
        source: 'function f(a, ...b, c);',
    });

    fail(`function f(a, ...b = 0);`, {
        source: 'function f(a, ...b = 0);',
    });
});

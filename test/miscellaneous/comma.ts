import { pass, fail } from '../utils';

describe('Miscellaneous - Comma (ES2017)', () => {

    fail(`{ foo(a, b,) {} };`, {
        source: `{ foo(a, b,) {} };`,
    });

    fail(`() => (...a, )`, {
        source: `() => (...a, )`,
    });

    fail(`() => (a, , b)`, {
        source: `() => (a, , b)`,
    });

    fail(`() => (, a)`, {
        source: `() => (, a)`,
    });

    fail(`() => (a, , )`, {
        source: `() => (a, , )`,
    });

    fail(`() => (...a, , )`, {
        source: `() => (...a, , )`,
    });

    fail(`() => (a, => null)`, {
        source: `() => (a, => null)`,
    });

    pass(`var foo = (a, b,) => {};`, {
        source: 'var foo = (a, b,) => {};',
        ranges: true,
        loc: true,
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 10,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var foo = function(a, b,) {};`, {
        source: 'var foo = function(a, b,) {};',
        ranges: true,
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
                                        start: 19,
                                        end: 20
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 22,
                                        end: 23
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 26,
                                    end: 28
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 10,
                                end: 28
                            },
                            id: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 4,
                                end: 7
                            },
                            start: 4,
                            end: 28
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 29
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 29
        }
    });

    pass(`foo(a, b,);`, {
        source: 'foo(a, b,);',
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 0,
                            end: 3
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                start: 4,
                                end: 5
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                start: 7,
                                end: 8
                            }
                        ],
                        start: 0,
                        end: 10
                    },
                    start: 0,
                    end: 11
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 11
        }
    });

    pass(`function foo(a, b,) {};`, {
        source: 'function foo(a, b,) {};',
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'a',
                            start: 13,
                            end: 14
                        },
                        {
                            type: 'Identifier',
                            name: 'b',
                            start: 16,
                            end: 17
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 20,
                        end: 22
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 9,
                        end: 12
                    },
                    start: 0,
                    end: 22
                },
                {
                    type: 'EmptyStatement',
                    start: 22,
                    end: 23
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23
        }
    });

    pass(`var [a, ...[b, c]] = d;`, {
        source: 'var [a, ...[b, c]] = d;',
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Identifier',
                                name: 'd',
                                start: 21,
                                end: 22
                            },
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 5,
                                        end: 6
                                    },
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    start: 12,
                                                    end: 13
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'c',
                                                    start: 15,
                                                    end: 16
                                                }
                                            ],
                                            start: 11,
                                            end: 17
                                        },
                                        start: 8,
                                        end: 17
                                    }
                                ],
                                start: 4,
                                end: 18
                            },
                            start: 4,
                            end: 22
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 23
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23
        }
    });
});
import { pass, fail } from '../test-utils';

describe('Statements - For await', () => {

    for (const decl of ['', 'var', 'let', 'const']) {
        for (const head of ['a', 'a = 0', 'a, b', '[a]', '[a] = 0', '{a}', '{a} = 0']) {

            // Ends with C-style for loop syntax.
            fail(`for await (${decl} ${head} ;;) ;`, {
                source: `for await (${decl} ${head} ;;) ;`,
                line: 1
            });

            // Ends with for-in loop syntax.
            fail(`for await (${decl} ${head} in null) ;`, {
                source: `for await (${decl} ${head} in null) ;`,
                line: 1
            });
        }
    }
    pass('async function f() { let a; for await (a of [])  }', {
        source: 'async function f() { let a; for await (a of [])  {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'a',
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
                            }],
                            kind: 'let',
                            start: 21,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        {
                            type: 'ForOfStatement',
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                                }
                            },
                            left: {
                                type: 'Identifier',
                                name: 'a',
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
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 28,
                            end: 51,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 28
                                },
                                end: {
                                    line: 1,
                                    column: 51
                                }
                            }
                        }
                    ],
                    start: 19,
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 53
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 53,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 53
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 53,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 53
                }
            }
        }
    });

    pass('async function f() { for await ({a: a} of []) {} }', {
        source: 'async function f() { for await ({a: a} of []) {} } ',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 46,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 46
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            }
                        },
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
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
                            }],
                            start: 32,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
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
                        await: true,
                        start: 21,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    }],
                    start: 19,
                    end: 50,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 50
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
            }],
            sourceType: 'script',
            start: 0,
            end: 51,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 51
                }
            }
        }
    });

    pass('async function f() { for await ({a = 1} of []) {}  }', {
        source: 'async function f() { for await ({a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 47,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 47
                                },
                                end: {
                                    line: 1,
                                    column: 49
                                }
                            }
                        },
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    right: {
                                        type: 'Literal',
                                        value: 1,
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: true,
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
                            }],
                            start: 32,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
                            start: 43,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 43
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        },
                        await: true,
                        start: 21,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    }],
                    start: 19,
                    end: 51,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 51
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 51,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 51
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 51,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 51
                }
            }
        }
    });

    pass('async function f() { for await ({[Symbol.iterator]: a = 1} of []) {} }', {
        source: 'async function f() { for await ({[Symbol.iterator]: a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 66,
                            end: 68,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 66
                                },
                                end: {
                                    line: 1,
                                    column: 68
                                }
                            }
                        },
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'MemberExpression',
                                    object: {
                                        type: 'Identifier',
                                        name: 'Symbol',
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
                                    computed: false,
                                    property: {
                                        type: 'Identifier',
                                        name: 'iterator',
                                        start: 41,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
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
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    right: {
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
                                        }
                                    },
                                    start: 52,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 52
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 33,
                                end: 57,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 57
                                    }
                                }
                            }],
                            start: 32,
                            end: 58,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 58
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
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
                        await: true,
                        start: 21,
                        end: 68,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 68
                            }
                        }
                    }],
                    start: 19,
                    end: 70,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 70
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 70,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 70
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 70,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 70
                }
            }
        }
    });

    pass('async function f() { for await ({0: a = 1} of []) {}  }', {
        source: 'async function f() { for await ({0: a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 50,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 50
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            }
                        },
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 0,
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
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    right: {
                                        type: 'Literal',
                                        value: 1,
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
                                    start: 36,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 33,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 41
                                    }
                                }
                            }],
                            start: 32,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
                            start: 46,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 46
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            }
                        },
                        await: true,
                        start: 21,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    }],
                    start: 19,
                    end: 54,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 54
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
            }],
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

    pass('async function f() { for await (var {a} of []) {} }', {
        source: 'async function f() { for await (var {a} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 47,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 47
                                },
                                end: {
                                    line: 1,
                                    column: 49
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        method: false,
                                        shorthand: true,
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
                                    }],
                                    start: 36,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                start: 36,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 36
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }],
                            kind: 'var',
                            start: 32,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
                            start: 43,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 43
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        },
                        await: true,
                        start: 21,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    }],
                    start: 19,
                    end: 51,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 51
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 51,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 51
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 51,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 51
                }
            }
        }
    });

    pass('async function f() { for await (var {a: a = 1} of []) {} }', {
        source: 'async function f() { for await (var {a: a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 1,
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
                                            start: 40,
                                            end: 45,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 45
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 37,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        }
                                    }],
                                    start: 36,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                start: 36,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 36
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }],
                            kind: 'var',
                            start: 32,
                            end: 46,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 46
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
                            start: 50,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 50
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            }
                        },
                        await: true,
                        start: 21,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    }],
                    start: 19,
                    end: 58,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 58
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 58,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 58
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 58,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 58
                }
            }
        }
    });

    pass('async function f() { for await (var {"a": a = 1} of []) {} }', {
        source: 'async function f() { for await (var {"a": a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 56,
                            end: 58,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 56
                                },
                                end: {
                                    line: 1,
                                    column: 58
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Literal',
                                            value: 'a',
                                            start: 37,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 1,
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
                                            start: 42,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 42
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 37,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    }],
                                    start: 36,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    }
                                },
                                start: 36,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 36
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            }],
                            kind: 'var',
                            start: 32,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
                            start: 52,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 52
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        },
                        await: true,
                        start: 21,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    }],
                    start: 19,
                    end: 60,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 60
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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

    pass('async function f() { for await (let {"a": a = 1} of []) {} }', {
        source: 'async function f() { for await (let {"a": a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 56,
                            end: 58,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 56
                                },
                                end: {
                                    line: 1,
                                    column: 58
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Literal',
                                            value: 'a',
                                            start: 37,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 1,
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
                                            start: 42,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 42
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 37,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    }],
                                    start: 36,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    }
                                },
                                start: 36,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 36
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            }],
                            kind: 'let',
                            start: 32,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
                            start: 52,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 52
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        },
                        await: true,
                        start: 21,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    }],
                    start: 19,
                    end: 60,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 60
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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

    pass('async function f() { for await (const {a = 1} of []) {} }', {
        source: 'async function f() { for await (const {a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 53,
                            end: 55,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 53
                                },
                                end: {
                                    line: 1,
                                    column: 55
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            right: {
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
                                                }
                                            },
                                            start: 39,
                                            end: 44,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 39
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 44
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        start: 39,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 39
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    }],
                                    start: 38,
                                    end: 45,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 45
                                        }
                                    }
                                },
                                start: 38,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 38
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            }],
                            kind: 'const',
                            start: 32,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
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
                            }
                        },
                        await: true,
                        start: 21,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    }],
                    start: 19,
                    end: 57,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 57
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 57,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 57
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 57,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 57
                }
            }
        }
    });

    pass('async function f() { for await (const {0: a = 1} of []) {} }', {
        source: 'async function f() { for await (const {0: a = 1} of []) {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 56,
                            end: 58,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 56
                                },
                                end: {
                                    line: 1,
                                    column: 58
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Literal',
                                            value: 0,
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
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 1,
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
                                            start: 42,
                                            end: 47,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 42
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 47
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 39,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 39
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    }],
                                    start: 38,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 38
                                        },
                                        end: {
                                            line: 1,
                                            column: 48
                                        }
                                    }
                                },
                                start: 38,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 38
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            }],
                            kind: 'const',
                            start: 32,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
                            start: 52,
                            end: 54,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 52
                                },
                                end: {
                                    line: 1,
                                    column: 54
                                }
                            }
                        },
                        await: true,
                        start: 21,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    }],
                    start: 19,
                    end: 60,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 60
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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

    pass('async function f() { "use strict"; let a; for\nawait (a of [])  }', {
        source: 'async function f() { "use strict"; let a; for\nawait (a of [])  {} }',
        next: true,
        expected: {
            body: [{
                async: true,
                body: {
                    body: [{
                            directive: 'use strict',
                            expression: {
                                type: 'Literal',
                                value: 'use strict',
                            },
                            type: 'ExpressionStatement',
                        },
                        {
                            declarations: [{
                                id: {
                                    name: 'a',
                                    type: 'Identifier',
                                },
                                init: null,
                                type: 'VariableDeclarator'
                            }, ],
                            kind: 'let',
                            type: 'VariableDeclaration'
                        },
                        {
                            await: true,
                            body: {
                                body: [],
                                type: 'BlockStatement'
                            },
                            left: {
                                name: 'a',
                                type: 'Identifier'
                            },
                            right: {
                                elements: [],
                                type: 'ArrayExpression'
                            },
                            type: 'ForOfStatement',
                        },
                    ],
                    type: 'BlockStatement',
                },
                expression: false,
                generator: false,
                id: {
                    name: 'f',
                    type: 'Identifier'
                },
                params: [],
                type: 'FunctionDeclaration'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('async function * f() { "use strict"; for await (a of [])  }', {
        source: 'async function * f() { "use strict"; for await (a of [])  {} }',
        next: true,
        expected: {
            body: [{
                async: true,
                body: {
                    body: [{
                            directive: 'use strict',
                            expression: {
                                type: 'Literal',
                                value: 'use strict',
                            },
                            type: 'ExpressionStatement',
                        },
                        {
                            await: true,
                            body: {
                                body: [],
                                type: 'BlockStatement'
                            },
                            left: {
                                name: 'a',
                                type: 'Identifier'
                            },
                            right: {
                                elements: [],
                                type: 'ArrayExpression',
                            },
                            type: 'ForOfStatement'
                        }
                    ],
                    type: 'BlockStatement'
                },
                expression: false,
                generator: true,
                id: {
                    name: 'f',
                    type: 'Identifier',
                },
                params: [],
                type: 'FunctionDeclaration'
            }],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass('async function f() { let a; for await (a of [])  }', {
        source: 'async function f() { let a; for await (a of [])  {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'a',
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
                            }],
                            kind: 'let',
                            start: 21,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        {
                            type: 'ForOfStatement',
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                                }
                            },
                            left: {
                                type: 'Identifier',
                                name: 'a',
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
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
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
                            await: true,
                            start: 28,
                            end: 51,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 28
                                },
                                end: {
                                    line: 1,
                                    column: 51
                                }
                            }
                        }
                    ],
                    start: 19,
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 53
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 53,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 53
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 53,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 53
                }
            }
        }
    });

    pass('async function f() { for await (a of [])  }', {
        source: 'async function f() { for await (a of [])  {} }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
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
                        left: {
                            type: 'Identifier',
                            name: 'a',
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
                        right: {
                            type: 'ArrayExpression',
                            elements: [],
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
                        await: true,
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
                    }],
                    start: 19,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 46,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 46
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    });

    pass(`statement in an async function declaration`, {
        source: `async function fn() {
            for await ([ x = 'x' in {} ] of [[]]) {
            }
          }`,
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 72,
                            end: 87,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 50
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 47,
                                    end: 48,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 25
                                        },
                                        end: {
                                            line: 2,
                                            column: 26
                                        }
                                    }
                                },
                                right: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Literal',
                                        value: 'x',
                                        start: 51,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 29
                                            },
                                            end: {
                                                line: 2,
                                                column: 32
                                            }
                                        },
                                        raw: '\'x\''
                                    },
                                    right: {
                                        type: 'ObjectExpression',
                                        properties: [],
                                        start: 58,
                                        end: 60,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 36
                                            },
                                            end: {
                                                line: 2,
                                                column: 38
                                            }
                                        }
                                    },
                                    operator: 'in',
                                    start: 51,
                                    end: 60,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 29
                                        },
                                        end: {
                                            line: 2,
                                            column: 38
                                        }
                                    }
                                },
                                start: 47,
                                end: 60,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 25
                                    },
                                    end: {
                                        line: 2,
                                        column: 38
                                    }
                                }
                            }],
                            start: 45,
                            end: 62,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 40
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'ArrayExpression',
                                elements: [],
                                start: 67,
                                end: 69,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 45
                                    },
                                    end: {
                                        line: 2,
                                        column: 47
                                    }
                                }
                            }],
                            start: 66,
                            end: 70,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 44
                                },
                                end: {
                                    line: 2,
                                    column: 48
                                }
                            }
                        },
                        await: true,
                        start: 34,
                        end: 87,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 20,
                    end: 99,
                    loc: {
                        start: {
                            line: 1,
                            column: 20
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                start: 0,
                end: 99,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 99,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`async function f() { for await (x of xs); }`, {
        source: 'async function f() { for await (x of xs); }',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'EmptyStatement',
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
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
                            type: 'Identifier',
                            name: 'xs',
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
                        await: true,
                        start: 21,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    }],
                    start: 19,
                    end: 43,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 43
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
                start: 0,
                end: 43,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 43
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 43,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 43
                }
            }
        }
    });

    pass(`async function f() { for\nawait (x of xs); }`, {
        source: 'async function f() { for\nawait (x of xs); }',
        expected: {
            body: [{
                async: true,
                body: {
                    body: [{
                        await: true,
                        body: {
                            type: 'EmptyStatement'
                        },
                        left: {
                            name: 'x',
                            type: 'Identifier'
                        },
                        right: {
                            name: 'xs',
                            type: 'Identifier'
                        },
                        type: 'ForOfStatement'
                    }],
                    type: 'BlockStatement'
                },
                expression: false,
                generator: false,
                id: {
                    name: 'f',
                    type: 'Identifier',
                },
                params: [],
                type: 'FunctionDeclaration'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`f = async() => { for await (x of xs); }`, {
        source: 'f = async() => { for await (x of xs); }',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    left: {
                        type: 'Identifier',
                        name: 'f',
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
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ForOfStatement',
                                body: {
                                    type: 'EmptyStatement',
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
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                right: {
                                    type: 'Identifier',
                                    name: 'xs',
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
                                    }
                                },
                                await: true,
                                start: 17,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            }],
                            start: 15,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        },
                        params: [],
                        id: null,
                        async: true,
                        generator: false,
                        expression: false,
                        start: 4,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 4
                            },
                            end: {
                                line: 1,
                                column: 39
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
            }],
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

    pass(`obj = { async f() { for await (x of xs); } }`, {
        source: 'obj = { async f() { for await (x of xs); } }',
        ranges: true,
        raw: true,
        loc: true,
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
                                name: 'f',
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                        type: 'ForOfStatement',
                                        body: {
                                            type: 'EmptyStatement',
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
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                        right: {
                                            type: 'Identifier',
                                            name: 'xs',
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
                                        await: true,
                                        start: 20,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        }
                                    }],
                                    start: 18,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                },
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 15,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: true,
                            shorthand: false,
                            start: 8,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            }
                        }],
                        start: 6,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 44
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
            }],
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

    pass(`class A { async f() { for await (x of xs); } }`, {
        source: 'class A { async f() { for await (x of xs); } }',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A',
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
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [{
                        type: 'MethodDefinition',
                        key: {
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
                        kind: 'method',
                        computed: false,
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ForOfStatement',
                                    body: {
                                        type: 'EmptyStatement',
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
                                    left: {
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
                                    right: {
                                        type: 'Identifier',
                                        name: 'xs',
                                        start: 38,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        }
                                    },
                                    await: true,
                                    start: 22,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                }],
                                start: 20,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            async: true,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 17,
                            end: 44,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 44
                                }
                            }
                        },
                        static: false,
                        start: 10,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        }
                    }],
                    start: 8,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                },
                start: 0,
                end: 46,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 46
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    });

    pass(`async function f() { for await (var x of xs); }`, {
        source: 'async function f() { for await (var x of xs); }',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'EmptyStatement',
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
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
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
                            }],
                            kind: 'var',
                            start: 32,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 32
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'xs',
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
                        await: true,
                        start: 21,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    }],
                    start: 19,
                    end: 47,
                    loc: {
                        start: {
                            line: 1,
                            column: 19
                        },
                        end: {
                            line: 1,
                            column: 47
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'f',
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
            }],
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

    fail(`for await (x of xs);`, {
        source: 'for await (x of xs);',
        line: 1
    });

    fail(`function f() { for await (x of xs); }`, {
        source: 'function f() { for await (x of xs); }',
        line: 1
    });

    fail(`f = function() { for await (x of xs); }`, {
        source: 'f = function() { for await (x of xs); }',
        line: 1
    });

    fail(`f = () => { for await (x of xs); }`, {
        source: 'f = () => { for await (x of xs); }',
        line: 1
    });

    fail(`async function f() { for await (let x = 0;;); }`, {
        source: 'async function f() { for await (let x = 0;;); }',
        line: 1
    });

    fail(`async function f() { for await (x;;); }`, {
        source: 'async function f() { for await (x;;); }',
        line: 1
    });
});
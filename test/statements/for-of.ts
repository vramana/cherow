import { pass, fail } from '../test-utils';

describe('Statements - For of', () => {

    fail(`for (const x = 1 of y);`, {
        source: 'for (const x = 1 of y);',
        line: 1,
    });

    fail(`for (var [p]=q of r);`, {
        source: 'for (var [p]=q of r);',
        line: 1,
    });

    fail(`for (let x = 1 of y);`, {
        source: 'for (let x = 1 of y);',
        line: 1,
    });

    fail(`for (this of that);`, {
        source: 'for (this of that);',
        line: 1,
    });

    fail(`"use strict"; for (x of let) {}`, {
        source: '"use strict"; for (x of let) {}',
        line: 1,
    });

    fail(`for (let let of x);`, {
        source: 'for (let let of x);',
        line: 1,
    });

    fail(`for (const of 42);`, {
        source: 'for (const of 42);',
        line: 1,
    });

    pass('for ([arguments, eval] of [[2, 3]]) {}', {
        source: 'for ([arguments, eval] of [[2, 3]]) {}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ForOfStatement',
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
                    left: {
                        type: 'ArrayPattern',
                        elements: [
                            {
                                type: 'Identifier',
                                name: 'arguments',
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
                            {
                                type: 'Identifier',
                                name: 'eval',
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
                            }
                        ],
                        start: 5,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'ArrayExpression',
                                elements: [
                                    {
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
                                    {
                                        type: 'Literal',
                                        value: 3,
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
                                        },
                                        raw: '3'
                                    }
                                ],
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
                                }
                            }
                        ],
                        start: 26,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 26
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    },
                    await: false,
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

    pass('for (j of x) { function foo() {return j} }', {
        source: 'for (j of x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                            start: 31,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        }
                                    ],
                                    start: 30,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 24,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                start: 15,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    left: {
                        type: 'Identifier',
                        name: 'j',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
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
                    line: 1,
                    column: 42
                }
            }
        }
    });
/*
    pass('for ({j} of x) { const [foo] = [j] }', {
        source: 'for ({j} of x) { const [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {}}
    });
*/
    pass('for (var j of x) { function foo() {return j} }', {
        source: 'for (var j of x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                        }
                                    ],
                                    start: 34,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 34
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
                                start: 19,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 46
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
                                    type: 'Identifier',
                                    name: 'j',
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
                        kind: 'var',
                        start: 5,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
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
            ],
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

    pass('for (var {j} of x) { function foo() {return j} }', {
        source: 'for (var {j} of x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                        }
                                    ],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 30,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 21,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 48
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
                                                name: 'j',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                            method: false,
                                            shorthand: true,
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
                            }
                        ],
                        kind: 'var',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }
    });

    pass('for (let {j} of x) { function foo() {return j} }', {
        source: 'for (let {j} of x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                        }
                                    ],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 30,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 21,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 48
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
                                                name: 'j',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                            method: false,
                                            shorthand: true,
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
                            }
                        ],
                        kind: 'let',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }
    });

    pass('for (const j of x) { let foo = j }', {
        source: 'for (const j of x) { let foo = j }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'Identifier',
                                            name: 'j',
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
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
                                            start: 25,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        start: 25,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    }
                                ],
                                kind: 'let',
                                start: 21,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 34
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
                                    type: 'Identifier',
                                    name: 'j',
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
                        kind: 'const',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
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

    pass('for (let {j} of x) { let foo = j }', {
        source: 'for (let {j} of x) { let foo = j }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'Identifier',
                                            name: 'j',
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
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
                                            start: 25,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        start: 25,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    }
                                ],
                                kind: 'let',
                                start: 21,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 34
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
                                                name: 'j',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                            method: false,
                                            shorthand: true,
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
                            }
                        ],
                        kind: 'let',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
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

    pass('for ([x] of [[a],[b],[c]]) {}', {
        source: 'for ([x] of [[a],[b],[c]]) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
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
                    left: {
                        type: 'ArrayPattern',
                        elements: [
                            {
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
                            }
                        ],
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
                        }
                    },
                    right: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'ArrayExpression',
                                elements: [
                                    {
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
                                    }
                                ],
                                start: 13,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            {
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'Identifier',
                                        name: 'b',
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
                                start: 17,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            {
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'Identifier',
                                        name: 'c',
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
                                start: 21,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 12,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 25
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

    pass('for (const j of x) { foo = j }', {
        source: 'for (const j of x) { foo = j }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'foo',
                                        start: 21,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'j',
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
                                    start: 21,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                start: 21,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 30
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
                                    type: 'Identifier',
                                    name: 'j',
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
                        kind: 'const',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
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

    pass('for (const {j} of x) { let [foo] = [j] }', {
        source: 'for (const {j} of x) { let [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
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
                                                    type: 'Identifier',
                                                    name: 'j',
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
                                                }
                                            ],
                                            start: 35,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
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
                                                }
                                            ],
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
                                    }
                                ],
                                kind: 'let',
                                start: 23,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            }
                        ],
                        start: 21,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 40
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
                                                name: 'j',
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
                                                name: 'j',
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
                                        }
                                    ],
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
                                    }
                                },
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
                                }
                            }
                        ],
                        kind: 'const',
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
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
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

    pass('for (j of x) { function foo() {return j} }', {
        source: 'for (j of x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                            start: 31,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        }
                                    ],
                                    start: 30,
                                    end: 40,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 40
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 24,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                },
                                start: 15,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    left: {
                        type: 'Identifier',
                        name: 'j',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
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
                    line: 1,
                    column: 42
                }
            }
        }
    });

    pass('for (let {j} of x) { function foo() {return j} }', {
        source: 'for (let {j} of x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                        }
                                    ],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 30,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 21,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 48
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
                                                name: 'j',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                            method: false,
                                            shorthand: true,
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
                            }
                        ],
                        kind: 'let',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }
    });

    pass('function* g() { for(const x of yield) {} }', {
        source: 'function* g() { for(const x of yield) {} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ForOfStatement',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                left: {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            init: null,
                                            id: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                        }
                                    ],
                                    kind: 'const',
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
                                },
                                right: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
                                    start: 31,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    }
                                },
                                await: false,
                                start: 16,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            }
                        ],
                        start: 14,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'g',
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
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
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
                    line: 1,
                    column: 42
                }
            }
        }
    });

    pass('for ([x] of [for (const j of x) { function foo() {return j} }', {
        source: 'for (const j of x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
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
                                                type: 'Identifier',
                                                name: 'j',
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
                                        }
                                    ],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 30,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 30
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 21,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 48
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
                                    type: 'Identifier',
                                    name: 'j',
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
                        kind: 'const',
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
                    right: {
                        type: 'Identifier',
                        name: 'x',
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
                    await: false,
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }
    });

    pass(`"use strict";  for (var value of arguments) {  }`, {
        source: '"use strict";  for (var value of arguments) {  }',
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
                        value: 'use strict',
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
                        raw: '"use strict"'
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
                    },
                    directive: 'use strict'
                },
                {
                    type: 'ForOfStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 44,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 44
                            },
                            end: {
                                line: 1,
                                column: 48
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
                                    type: 'Identifier',
                                    name: 'value',
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
                                },
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
                        kind: 'var',
                        start: 20,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    right: {
                        type: 'Identifier',
                        name: 'arguments',
                        start: 33,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 33
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    await: false,
                    start: 15,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }
    });

    pass(`for (var x of list) process(x);`, {
            source: 'for (var x of list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ForOfStatement',
                        body: {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'process',
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
                                },
                                arguments: [
                                    {
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
                                    }
                                ],
                                start: 20,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            },
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
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
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
                            kind: 'var',
                            start: 5,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'list',
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

    pass(`for(var a of b);`, {
            source: 'for(var a of b);',
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
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
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
                                }
                            ],
                            kind: 'var',
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
                        right: {
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
                        await: false,
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

    pass(`for(a of b);`, {
            source: 'for(a of b);',
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
                        left: {
                            type: 'Identifier',
                            name: 'a',
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
                        right: {
                            type: 'Identifier',
                            name: 'b',
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
                        await: false,
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

    pass(`for(let [a] of b);`, {
            source: 'for(let [a] of b);',
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
                                            }
                                        ],
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
                                        }
                                    },
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
                                    }
                                }
                            ],
                            kind: 'let',
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
                        },
                        right: {
                            type: 'Identifier',
                            name: 'b',
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
                        await: false,
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

    pass(`for (x of let) {}`, {
            source: 'for (x of let) {}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ForOfStatement',
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
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
                            type: 'Identifier',
                            name: 'let',
                            start: 10,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            }
                        },
                        await: false,
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

    pass(`for (var x of list);`, {
            source: 'for (var x of list);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ForOfStatement',
                    await: false,
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
                    },
                    left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 10,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 10
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
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
                          id: {
                            type: 'Identifier',
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
                            name: 'x'
                          },
                          init: null
                        }
                      ],
                      kind: 'var'
                    },
                    right: {
                      type: 'Identifier',
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
                      name: 'list'
                    },
                    body: {
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
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`for (p of q);`, {
            source: 'for (p of q);',
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
                    type: 'ForOfStatement',
                    await: false,
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
                    left: {
                      type: 'Identifier',
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
                      name: 'p'
                    },
                    right: {
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
                      name: 'q'
                    },
                    body: {
                      type: 'EmptyStatement',
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
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`for (let of of xyz);`, {
            source: 'for (let of of xyz);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
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
                },
                body: [
                  {
                    type: 'ForOfStatement',
                    await: false,
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
                    },
                    left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 11
                        }
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
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
                          },
                          id: {
                            type: 'Identifier',
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
                            },
                            name: 'of'
                          },
                          init: null
                        }
                      ],
                      kind: 'let'
                    },
                    right: {
                      type: 'Identifier',
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
                      },
                      name: 'xyz'
                    },
                    body: {
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
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`for (var {x, y} of z);`, {
            source: 'for (var {x, y} of z);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
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
                                                    name: 'x',
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
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                                method: false,
                                                shorthand: true,
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
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'y',
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
                                                    type: 'Identifier',
                                                    name: 'y',
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
                                                method: false,
                                                shorthand: true,
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
                            kind: 'var',
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
                        },
                        right: {
                            type: 'Identifier',
                            name: 'z',
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

    pass(`for (let [p, q] of r);`, {
            source: 'for (let [p, q] of r);',
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
                    type: 'ForOfStatement',
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
                    },
                    left: {
                      type: 'VariableDeclaration',
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
                      },
                      declarations: [
                        {
                          type: 'VariableDeclarator',
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
                          },
                          id: {
                            type: 'ArrayPattern',
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
                            },
                            elements: [
                              {
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
                                name: 'p'
                              },
                              {
                                type: 'Identifier',
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
                                name: 'q'
                              }
                            ]
                          },
                          init: null
                        }
                      ],
                      kind: 'let'
                    },
                    right: {
                      type: 'Identifier',
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
                      name: 'r'
                    },
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
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`for (const {x, y} of z);`, {
            source: 'for (const {x, y} of z);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ForOfStatement',
                        body: {
                            type: 'EmptyStatement',
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
                                                    name: 'x',
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
                                                    name: 'x',
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
                                                    name: 'y',
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
                                                    name: 'y',
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
                                }
                            ],
                            kind: 'const',
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
                        right: {
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
                        await: false,
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

    pass(`for(let of of b);`, {
            source: 'for(let of of b);',
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
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'Identifier',
                                        name: 'of',
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
                                        }
                                    },
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
                                    }
                                }
                            ],
                            kind: 'let',
                            start: 4,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
                        right: {
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
                        await: false,
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

    pass(`function a(a, b, c) { 'use strict';  for (var value of x) {   a = b;  } }`, {
            source: 'function a(a, b, c) { "use strict";  for (var value of x) {   a = b;  } }',
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
                            {
                                type: 'Identifier',
                                name: 'c',
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
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Literal',
                                        value: 'use strict',
                                        start: 22,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 34
                                            }
                                        },
                                        raw: '"use strict"'
                                    },
                                    start: 22,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 35
                                        }
                                    },
                                    directive: 'use strict'
                                },
                                {
                                    type: 'ForOfStatement',
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'AssignmentExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        start: 62,
                                                        end: 63,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 62
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 63
                                                            }
                                                        }
                                                    },
                                                    operator: '=',
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'b',
                                                        start: 66,
                                                        end: 67,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 66
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 67
                                                            }
                                                        }
                                                    },
                                                    start: 62,
                                                    end: 67,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 62
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 67
                                                        }
                                                    }
                                                },
                                                start: 62,
                                                end: 68,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 62
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 68
                                                    }
                                                }
                                            }
                                        ],
                                        start: 58,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 58
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
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
                                                    type: 'Identifier',
                                                    name: 'value',
                                                    start: 46,
                                                    end: 51,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 46
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 51
                                                        }
                                                    }
                                                },
                                                start: 46,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 46
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 51
                                                    }
                                                }
                                            }
                                        ],
                                        kind: 'var',
                                        start: 42,
                                        end: 51,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 42
                                            },
                                            end: {
                                                line: 1,
                                                column: 51
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                    await: false,
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
                                }
                            ],
                            start: 20,
                            end: 73,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 73
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
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
                ],
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

        pass(`for (const a of ([...b, c])) {}`, {
            source: `for (const a of ([...b, c])) {}`,
            raw: true,
            expected: {
                  "body": [
                    {
                      "await": false,
                      "body": {
                        "body": [],
                        "type": "BlockStatement",
                      },
                      "left": {
                        "declarations": [
                          {
                            "id": {
                              "name": "a",
                              "type": "Identifier",
                            },
                            "init": null,
                            "type": "VariableDeclarator"
                          }
                        ],
                        "kind": "const",
                        "type": "VariableDeclaration",
                      },
                      "right": {
                        "elements": [
                          {
                            "argument": {
                              "name": "b",
                              "type": "Identifier",
                            },
                            "type": "SpreadElement",
                          },
                          {
                            "name": "c",
                            "type": "Identifier",
                          },
                        ],
                        "type": "ArrayExpression",
                      },
                     "type": "ForOfStatement"
                    },
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });
});

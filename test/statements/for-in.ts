import { pass, fail } from '../utils';

describe('Statements - For In', () => {

    const programs = [
        '[]',
        '[,]',
        '[a]',
        '[a = 0]',
        '[...a]',
        '[...[]]',
        '[...[a]]',
        '{}',
        '{p: x}',
        '{p: x = 0}',
        '{x}',
        '{x = 0}',
    ];

    const invalidSyntax = [
        ...programs.map((arg) => `var ${arg}`),
        'let x',
        ...programs.map((arg) => `let ${arg}`),
        'const x',
        ...programs.map((arg) => `const ${arg}`),
        'x',
        ...programs.map((arg) => `${arg}`),
        'o.p',
        'o[0]',
        'f()',
    ];

    const validSyntax = [
        'var x',
        'let x',
        'const x',
    ];

    for (const x of validSyntax) {

        fail(`"use strict"; for (${x} = 0 in {});`, {
            source: `"use strict"; for (${x} = 0 in {});`
        });
    }

    for (const x of invalidSyntax) {
        fail(`for (${x} = 0 in {});`, {
            source: `for (${x} = 0 in {});`
        });
    }

    pass(`for(var x = arguments in []){}`, {
        source: `for(var x = arguments in []){}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
                body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 28,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 28
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                },
                left: {
                    type: 'VariableDeclaration',
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: {
                            type: 'Identifier',
                            name: 'arguments',
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
                        }
                    }],
                    kind: 'var',
                    start: 4,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 4
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
            }],
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

    pass(`function* g1() { for (var x = yield in {}) ; }`, {
        source: `function* g1() { for (var x = yield in {}) ; }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForInStatement',
                        body: {
                            type: 'EmptyStatement',
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
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
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
                            }],
                            kind: 'var',
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
                            }
                        },
                        right: {
                            type: 'ObjectExpression',
                            properties: [],
                            start: 39,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 39
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            }
                        },
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
                    }],
                    start: 15,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'g1',
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

    pass(`with (0)
    for (var b = 0 in 0);  // don't assert in parser`, {
        source: `with (0)
        for (var b = 0 in 0);  // don't assert in parser`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 65,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 56
                }
            },
            body: [{
                type: 'WithStatement',
                start: 0,
                end: 38,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 29
                    }
                },
                object: {
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
                body: {
                    type: 'ForInStatement',
                    start: 17,
                    end: 38,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 29
                        }
                    },
                    left: {
                        type: 'VariableDeclaration',
                        start: 22,
                        end: 31,
                        loc: {
                            start: {
                                line: 2,
                                column: 13
                            },
                            end: {
                                line: 2,
                                column: 22
                            }
                        },
                        declarations: [{
                            type: 'VariableDeclarator',
                            start: 26,
                            end: 31,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 17
                                },
                                end: {
                                    line: 2,
                                    column: 22
                                }
                            },
                            id: {
                                type: 'Identifier',
                                start: 26,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 17
                                    },
                                    end: {
                                        line: 2,
                                        column: 18
                                    }
                                },
                                name: 'b'
                            },
                            init: {
                                type: 'Literal',
                                start: 30,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 21
                                    },
                                    end: {
                                        line: 2,
                                        column: 22
                                    }
                                },
                                value: 0,
                                raw: '0'
                            }
                        }],
                        kind: 'var'
                    },
                    right: {
                        type: 'Literal',
                        start: 35,
                        end: 36,
                        loc: {
                            start: {
                                line: 2,
                                column: 26
                            },
                            end: {
                                line: 2,
                                column: 27
                            }
                        },
                        value: 0,
                        raw: '0'
                    },
                    body: {
                        type: 'EmptyStatement',
                        start: 37,
                        end: 38,
                        loc: {
                            start: {
                                line: 2,
                                column: 28
                            },
                            end: {
                                line: 2,
                                column: 29
                            }
                        }
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`for (var x = 3 in []) { }`, {
        source: 'for (var x = 3 in []) { }',
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
            body: [{
                type: 'ForInStatement',
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
                left: {
                    type: 'VariableDeclaration',
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
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        init: {
                            type: 'Literal',
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
                            value: 3,
                            raw: '3'
                        }
                    }],
                    kind: 'var'
                },
                right: {
                    type: 'ArrayExpression',
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
                    elements: []
                },
                body: {
                    type: 'BlockStatement',
                    start: 22,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 22
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    body: []
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`for([{a=0}] in b);`, {
        source: 'for([{a=0}] in b);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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
                    type: 'ArrayPattern',
                    elements: [{
                        type: 'ObjectPattern',
                        properties: [{
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                        }],
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
                    }],
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
            }],
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

    pass(`for(let [a=b in c] in null);`, {
        source: 'for(let [a=b in c] in null);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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
                    declarations: [{
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                            type: 'ArrayPattern',
                            elements: [{
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
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                        type: 'Identifier',
                                        name: 'c',
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
                                    operator: 'in',
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
                                start: 9,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }],
                            start: 8,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        start: 8,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }],
                    kind: 'let',
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
                right: {
                    type: 'Literal',
                    value: null,
                    start: 22,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 22
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    },
                    raw: 'null'
                },
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
            }],
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
    /*
        pass(`for(var a in b, c);`, {
            source: 'for(var a in b, c);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {}
        });*/

    pass(`for(x in list) process(x);`, {
        source: 'for(x in list) process(x);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
                body: {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'process',
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
                        arguments: [{
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
                        }],
                        start: 15,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    start: 15,
                    end: 26,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 26
                        }
                    }
                },
                left: {
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
                right: {
                    type: 'Identifier',
                    name: 'list',
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
            }],
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

    pass(`for (var x in list) process(x);`, {
        source: 'for (var x in list) process(x);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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
                        arguments: [{
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
                        }],
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
                    declarations: [{
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
                    }],
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
            }],
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

    pass(`for (let x in list) process(x);`, {
        source: 'for (let x in list) process(x);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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
                        arguments: [{
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
                        }],
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
                    declarations: [{
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
                    }],
                    kind: 'let',
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
            }],
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

    pass(`for(var a in b);`, {
        source: 'for(var a in b);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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
                    declarations: [{
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
                    }],
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
            }],
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

    pass(`for(a in b);`, {
        source: 'for(a in b);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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

    pass(`for(a.b in c);`, {
        source: 'for(a.b in c);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
                body: {
                    type: 'EmptyStatement',
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
                left: {
                    type: 'MemberExpression',
                    object: {
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
                    computed: false,
                    property: {
                        type: 'Identifier',
                        name: 'b',
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
                right: {
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
            }],
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

    pass(`for(let of in of);`, {
        source: 'for(let of in of);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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
                    declarations: [{
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
                    }],
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
                    name: 'of',
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
            }],
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

    pass(`function* g1() { for (var x = yield in {}) ; }`, {
        source: 'function* g1() { for (var x = yield in {}) ; }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'FunctionDeclaration',
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
                },
                id: {
                    type: 'Identifier',
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
                    name: 'g1'
                },
                generator: true,
                expression: false,
                async: false,
                params: [],
                body: {
                    type: 'BlockStatement',
                    start: 15,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    },
                    body: [{
                        type: 'ForInStatement',
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
                        },
                        left: {
                            type: 'VariableDeclaration',
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
                            declarations: [{
                                type: 'VariableDeclarator',
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
                                },
                                id: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'x'
                                },
                                init: {
                                    type: 'YieldExpression',
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
                                    },
                                    delegate: false,
                                    argument: null
                                }
                            }],
                            kind: 'var'
                        },
                        right: {
                            type: 'ObjectExpression',
                            start: 39,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 39
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            },
                            properties: []
                        },
                        body: {
                            type: 'EmptyStatement',
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
                        }
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`for(a in b);`, {
        source: 'for(a in b);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ForInStatement',
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

    fail(`for ({...rest, b} in [{} ]) ;`, {
        source: 'for ({...rest, b} in [{} ]) ;',
        next: true
    });

    fail(`for(let of 0);`, {
        source: 'for(let of 0);',
    });

    fail(`for (a=12 in e) break;`, {
        source: 'for (a=12 in e) break;',
    });

    fail(`for (var a, b in e) break;`, {
        source: 'for (var a, b in e) break;',
    });

    fail(`for (var a = 12 in e) break;`, {
        source: 'for (var a = 12 in e) break;',
    });

    fail(`for (a in b 5`, {
        source: 'for (a in b 5',
    });

    fail(`for (a to e) break;`, {
        source: 'for (a to e) break;',
    });

    fail(`for (a 12 b; 12) break;`, {
        source: 'for (a 12 b; 12) break;',
    });

    fail(`for(let a = 0 in b);`, {
        source: 'for(let a = 0 in b);',
    });

    fail(`for(const a = 0 in b);`, {
        source: 'for(const a = 0 in b);',
    });

    fail(`for(let ? b : c in 0);`, {
        source: 'for(let ? b : c in 0);',
    });

    fail(`for (var {x}=0 in y);`, {
        source: 'for (var {x}=0 in y);',
    });

    fail(`for (var [p]=0 in q);`, {
        source: 'for (var [p]=0 in q);',
    });

    fail(`"use strict"; for (var [p]=1 in q);`, {
        source: '"use strict"; for (var [p]=1 in q);',
    });

    fail(`for(({a}) in 0);`, {
        source: 'for(({a}) in 0);',
    });

    fail(`for(([a]) in 0);`, {
        source: 'for(([a]) in 0);',
    });

    fail(`for(([a]) in 0);`, {
        source: 'for(([a]) in 0);',
    });

    fail(`for(var [a = 0] = 0 in {});`, {
        source: 'for(var [a = 0] = 0 in {});',
    });

    fail(`for(var {p: x} = 0 in {});`, {
        source: 'for(var {p: x} = 0 in {});',
    });

    fail(`for(let {p: x} = 0 in {});`, {
        source: 'for(let {p: x} = 0 in {});',
    });

    fail(`for(var [a] = 0 in {});`, {
        source: 'for(var [a] = 0 in {});',
    });

    fail(`for(var [...[a]] = 0 in {});`, {
        source: 'for(var [...[a]] = 0 in {});',
    });

    fail(`for(var [,] = 0 in {});`, {
        source: 'for(var [,] = 0 in {});',
    });

    fail(`for(const [,] = 0 in {});`, {
        source: 'for(const [,] = 0 in {});',
    });

    fail(`for(let [,] = 0 in {});`, {
        source: 'for(let [,] = 0 in {});',
    });

    fail(`for(var [] = 0 in {});`, {
        source: 'for(var [] = 0 in {});',
    });

    fail(`for(const [] = 0 in {});`, {
        source: 'for(const [] = 0 in {});',
    });

    fail(`for (new F() = 0 in {});`, {
        source: 'for (new F() = 0 in {});',
    });

    fail(`for (i++ = 0 in {});`, {
        source: 'for (i++ = 0 in {});',
    });

    fail(`for (0 = 0 in {});`, {
        source: 'for (0 = 0 in {});',
    });

    fail(`class C extends D { constructor() { for (super() = 0 in {}); } }`, {
        source: 'class C extends D { constructor() { for (super() = 0 in {}); } }',
    });

    fail(`for (var [x] = [] in null);`, {
        source: 'for (var [x] = [] in null);',
    });

    fail(`for (var [x] = x in y) var x;`, {
        source: 'for (var [x] = x in y) var x;',
    });

    fail(`for (var [arguments] = ({ get y(){} }) in y ) (x);`, {
        source: 'for (var [arguments] = ({ get y(){} }) in y ) (x);',
    });

    fail(`for (var [arguments] = ({ get y(){} }) in y ) (x);`, {
        source: 'try {\n' +
            '    for (var [e] = /x/ in d) {\n' +
            '        (function () {});\n' +
            '    }\n' +
            '} catch (e) {}\n' +
            'try {\n' +
            '    let(x = Object.freeze(this, /x/))\n' +
            '    e = {}.toString\n' +
            '    function y() {}\n' +
            '} catch (e) {}',
    });
    // Declarations in for-in loop heads must not contain "in"-expression initializers
    fail(`for (var x = 3 in {}; ; ) break;`, {
        source: 'for (var x = 3 in {}; ; ) break;',
    });

    fail(`for (var x, y = 3 in {}; ; ) break;`, {
        source: 'for (var x, y = 3 in {}; ; ) break;',
    });

    fail(`for (var x = 5, y = 3 in {}; ; ) break;`, {
        source: 'for (var x = 5, y = 3 in {}; ; ) break;',
    });

    fail(`for (const x = 3 in {}; ; ) break;`, {
        source: 'for (const x = 3 in {}; ; ) break;',
    });

    fail(`for (const x = 5, y = 3 in {}; ; ) break;`, {
        source: 'for (const x = 5, y = 3 in {}; ; ) break;',
    });

    fail(`for (let x, y = 3 in {}; ; ) break;`, {
        source: 'for (let x, y = 3 in {}; ; ) break;',
    });

    fail(`for (let x = 2, y = 3 in {}; ; ) break;`, {
        source: 'for (let x = 2, y = 3 in {}; ; ) break;',
    });

    fail(`for ({...rest, b} in [{} ]) ;`, {
        source: 'for ({...rest, b} in [{} ]) ;',
    });
});
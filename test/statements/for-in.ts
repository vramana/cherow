import { pass, fail } from '../test-utils';

describe('Statements - For in', () => {

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

    pass(`for (a(b in c)[0] in d);`, {
        source: 'for (a(b in c)[0] in d);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ForInStatement',
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
                        type: 'MemberExpression',
                        object: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'a',
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
                            arguments: [
                                {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                        type: 'Identifier',
                                        name: 'c',
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
                                    operator: 'in',
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
                        computed: true,
                        property: {
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
                        name: 'd',
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

    pass(`for (a.in in a);`, {
        source: 'for (a.in in a);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
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
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'a',
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
                        property: {
                            type: 'Identifier',
                            name: 'in',
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
                    right: {
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

    pass('for ([x] in {ab: a}) {}', {
        source: 'for ([x] in {ab: a}) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'ab',
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
                                value: {
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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

    pass('for ([...x] in {ab: a}) {}', {
        source: 'for ([...x] in {ab: a}) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    left: {
                        type: 'ArrayPattern',
                        elements: [
                            {
                                type: 'RestElement',
                                argument: {
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
                        }
                    },
                    right: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'ab',
                                    start: 16,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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

    pass('for (let {j} in x) { function foo() {return j} }', {
        source: 'for (let {j} in x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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

    pass('for (const j in x) { var [foo] = [j] }', {
        source: 'for (const j in x) { var [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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
                                                }
                                            ],
                                            start: 33,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 26,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 29
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 25,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        start: 25,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    }
                                ],
                                kind: 'var',
                                start: 21,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 38
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

    pass('for (let {j} in x) { var [foo] = [j] }', {
        source: 'for (let {j} in x) { var [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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
                                                }
                                            ],
                                            start: 33,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 26,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 29
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 25,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        start: 25,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    }
                                ],
                                kind: 'var',
                                start: 21,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 38
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

    pass('for (var {j} in x) { let [foo] = [j] }', {
        source: 'for (var {j} in x) { let [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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
                                                }
                                            ],
                                            start: 33,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 26,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 29
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 25,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        start: 25,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    }
                                ],
                                kind: 'let',
                                start: 21,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 38
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

    pass('for (j in x) { let [foo] = [j] }', {
        source: 'for (j in x) { let [foo] = [j] }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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
                                            start: 27,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 27
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'ArrayPattern',
                                            elements: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 20,
                                                    end: 23,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 23
                                                        }
                                                    }
                                                }
                                            ],
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
                                        },
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
                                    }
                                ],
                                kind: 'let',
                                start: 15,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 32
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

    pass('for (j in x) { function foo() {return j} }', {
        source: 'for (j in x) { function foo() {return j} }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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

    pass('for (let j in x) { let foo = j }', {
        source: 'for (let j in x) { let foo = j }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
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
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
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
                                            }
                                        },
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
                                    }
                                ],
                                kind: 'let',
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
                            }
                        ],
                        start: 17,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 32
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

    pass('for (var b in { x: 0 }) { 3; }', {
        source: 'for (var b in { x: 0 }) { 3; }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 3,
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
                        start: 24,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 24
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
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
                                value: {
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
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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

    pass('for (x in null, { key: 0 }) {}', {
        source: 'for (x in null, { key: 0 }) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                        type: 'SequenceExpression',
                        expressions: [
                            {
                                type: 'Literal',
                                value: null,
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
                            },
                            {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'key',
                                            start: 18,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 0,
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
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 18,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    }
                                ],
                                start: 16,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            }
                        ],
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

    pass('for (x.y in { attr: null }) {}', {
        source: 'for (x.y in { attr: null }) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                        type: 'MemberExpression',
                        object: {
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
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'y',
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'attr',
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
                                value: {
                                    type: 'Literal',
                                    value: null,
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 14,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 12,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 26
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

    pass('for(()=>{a in b};;);', {
        source: 'for(()=>{a in b};;);',
        loc: true,
        ranges: true,
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
                type: 'ForStatement',
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
                init: {
                  type: 'ArrowFunctionExpression',
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
                  },
                  id: null,
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
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
                    },
                    body: [
                      {
                        type: 'ExpressionStatement',
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
                        expression: {
                          type: 'BinaryExpression',
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
                          left: {
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
                            name: 'a'
                          },
                          operator: 'in',
                          right: {
                            type: 'Identifier',
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
                            name: 'b'
                          }
                        }
                      }
                    ]
                  }
                },
                test: null,
                update: null,
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

    pass('for (x in {a: b}) {}', {
        source: 'for (x in {a: b}) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForInStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        type: 'ObjectExpression',
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
                            }
                        ],
                        start: 10,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 16
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

    fail(`for ([{ get x() {} }] in [[{}]]) ;`, {
        source: 'for ([{ get x() {} }] in [[{}]]) ;',
        message: 'Invalid destructuring assignment target',
        line: 1,
        column: 31,
        index: 31
    });

    fail(`for (var x in {}) function* g() {}`, {
        source: 'for (var x in {}) function* g() {}',
        message: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for ([[(x, y)]] in [[[]]]) ;`, {
        source: 'for ([[(x, y)]] in [[[]]]) ;',
        message:  '\'SequenceExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 25,
        index: 25
    });

    fail(`for (const x in {}) {  var x;  }`, {
        source: 'for (const x in {}) {  var x;  }',
        message: 'Missing initializer in const declaration',
        line: 1,
        column: 28,
        index: 28
    });

    fail(`"use strict"; for ({ eval = 0 } in [{}]) ;`, {
        source: '"use strict"; for ({ eval = 0 } in [{}]) ;',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 25,
        index: 25
    });

    fail(`"use strict"; for ([[x[yield]]] in [[[]]]) ;`, {
        source: '"use strict"; for ([[x[yield]]] in [[[]]]) ;',
        message: 'Unexpected keyword \'yield\'',
        line: 1,
        column: 23,
        index: 23
    });

    fail(`"use strict"; for ([arguments] in [[]]) ;`, {
        source: '"use strict"; for ([arguments] in [[]]) ;',
        message: 'Unexpected reserved word',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`"use strict"; for ({ eval = 0 } in [{}]) ;`, {
        source: '"use strict"; for ({ eval = 0 } in [{}]) ;',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 25,
        index: 25
    });

    fail(`for (var x in null) let // ASI
    {}`, {
        source: 'for ([...{ get x() {} }] in [[[]]]) ;',
        message: 'Invalid destructuring assignment target',
        line: 1,
        column: 34,
        index: 34
    });

    fail(`for (let x = 2, y = 3 in {}; ; ) break;`, {
        source: 'for (let x = 2, y = 3 in {}; ; ) break;',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 21,
        index: 21
    });

    fail(`for (var x = 5, y = 3 in {}; ; ) break;`, {
        source: 'for (var x = 5, y = 3 in {}; ; ) break;',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 21,
        index: 21
    });

    fail(`for (const x = 3 in {}; ; ) break;`, {
        source: 'for (const x = 3 in {}; ; ) break;',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`for (let x, y = 3 in {}; ; ) break;`, {
        source: 'for (let x, y = 3 in {}; ; ) break;',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for ({...rest, b} in [{} ]) ;`, {
        source: 'for ({...rest, b} in [{} ]) ;',
        message:  'Unexpected token ...',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`for(let [,] = 0 in {});`, {
        source: 'for(let [,] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 15,
        index: 15
    });

    fail(`for(var [] = 0 in {});`, {
        source: 'for(var [] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`for (new F() = 0 in {});`, {
        source: 'for (new F() = 0 in {});',
        message: '\'NewExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 12,
        index: 12
    });

    fail(`for (i++ = 0 in {});`, {
        source: 'for (i++ = 0 in {});',
        message: '\'UpdateExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 8,
        index: 8
    });

    fail(`for (0 = 0 in {});`, {
        source: 'for (0 = 0 in {});',
        message:  '\'Literal\' is not a valid assignment left hand side',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`class C extends D { constructor() { for (super() = 0 in {}); } }`, {
        source: 'class C extends D { constructor() { for (super() = 0 in {}); } }',
        message: '\'CallExpression\' is not a valid assignment left hand side',
        line: 1,
        column: 48,
        index: 48
    });

    fail(`for (var [x] = [] in null);`, {
        source: 'for (var [x] = [] in null);',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for (var [x] = x in y) var x;`, {
        source: 'for (var [x] = x in y) var x;',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 16,
        index: 16
    });

    fail(`for (var [arguments] = ({ get y(){} }) in y ) (x);`, {
        source: 'for (var [arguments] = ({ get y(){} }) in y ) (x);',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 24,
        index: 24
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
            line: 2
    });
    // Declarations in for-in loop heads must not contain "in"-expression initializers
    fail(`for (var x = 3 in {}; ; ) break;`, {
        source: 'for (var x = 3 in {}; ; ) break;',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`for (var x, y = 3 in {}; ; ) break;`, {
        source: 'for (var x, y = 3 in {}; ; ) break;',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for(let of 0);`, {
        source: 'for(let of 0);',
        message: 'Unexpected token number',
        line: 1,
        column: 10,
        index: 10
    });

    fail(`for (a=12 in e) break;`, {
        source: 'for (a=12 in e) break;',
        message:  'Unexpected token )',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`for (var a, b in e) break;`, {
        source: 'for (var a, b in e) break;',
        message: 'Invalid left-hand side in for-in loop: Must have a single binding.',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`for (a in b 5`, {
        source: 'for (a in b 5',
        message: 'Unexpected token number',
        line: 1,
        column: 11,
        index: 11
    });

    fail(`for (a to e) break;`, {
        source: 'for (a to e) break;',
        message: 'Unexpected token identifier',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`for (a 12 b; 12) break;`, {
        source: 'for (a 12 b; 12) break;',
        message: 'Unexpected token number',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`for(let a = 0 in b);`, {
        source: 'for(let a = 0 in b);',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`for(const a = 0 in b);`, {
        source: 'for(const a = 0 in b);',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 15,
        index: 15
    });

    fail(`for(let ? b : c in 0);`, {
        source: 'for(let ? b : c in 0);',
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`for (var {x}=0 in y);`, {
        source: 'for (var {x}=0 in y);',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`for (var [p]=0 in q);`, {
        source: 'for (var [p]=0 in q);',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`"use strict"; for (var [p]=1 in q);`, {
        source: '"use strict"; for (var [p]=1 in q);',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 28,
        index: 28
    });

    fail(`for(var [a = 0] = 0 in {});`, {
        source: 'for(var [a = 0] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 19,
        index: 19
    });

    fail(`for(var {p: x} = 0 in {});`, {
        source: 'for(var {p: x} = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`for(let {p: x} = 0 in {});`, {
        source: 'for(let {p: x} = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`for(var [a] = 0 in {});`, {
        source: 'for(var [a] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 15,
        index: 15
    });

    fail(`for(var [...[a]] = 0 in {});`, {
        source: 'for(var [...[a]] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`for(var [,] = 0 in {});`, {
        source: 'for(var [,] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 15,
        index: 15
    });

    fail(`for(const [,] = 0 in {});`, {
        source: 'for(const [,] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`for(const [,] = 0 in {});`, {
        source: 'for(const [,] = 0 in {});',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
    });

    fail(`for (const i = void 0 in [1, 2, 3]) {}`, {
        source: 'for (const i = void 0 in [1, 2, 3]) {}',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
    });

    fail(`for (let i = void 0 in [1, 2, 3]) {}`, {
        source: 'for (let i = void 0 in [1, 2, 3]) {}',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
    });

    fail(`for (let i = 1 in {}) {}`, {
        source: 'for (let i = 1 in {}) {}',
        message: '\'for-in\' loop variable declaration may not have an initializer',
        line: 1,
    });

    fail(`for (let i = void 0 of [1, 2, 3]) {}`, {
        source: 'for (let i = void 0 of [1, 2, 3]) {}',
        message: '\'for-of\' loop variable declaration may not have an initializer',
        line: 1,
    });

    fail(`for (var i = 1 of {}) {}`, {
        source: 'for (var i = 1 of {}) {}',
        message: '\'for-of\' loop variable declaration may not have an initializer',
        line: 1,
    });

    fail(`"use strict"; for ([ x = yield ] in [[]]) ;`, {
        source: '"use strict"; for ([ x = yield ] in [[]]) ;',
        line: 1,
    });

    fail(`for (var a = b = c = (d in e) in z);`, {
        source: 'for (var a = b = c = (d in e) in z);',
        line: 1,
    });

    fail(`for (var x = y = z in q);`, {
        source: 'for (var x = y = z in q); ',
        line: 1,
    });

    fail(`for (x=0 in y);`, {
        source: 'for (x=0 in y);',
        line: 1,
    });

    fail(`"use strict"; for (x in let) {}`, {
        source: '"use strict"; for (x in let) {}',
        line: 1,
    });

    fail(`"use strict"; for (var x = 42 in list) process(x);`, {
        source: '"use strict"; for (var x = 42 in list) process(x);',
        line: 1,
    });

});
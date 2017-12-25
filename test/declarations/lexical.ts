import { pass, fail } from '../utils';
import { parseScript } from '../../src/cherow';
describe('Declarations - Lexical', () => {

    const invalidSyntax = [
        '[]',
        '[a]',
        '[] = []',
        '[a--] = [];',
        '[a + 1] = [];',
        '[++a] = [];',
        'a; [a--] = [];',
        'a; [1, a] = [];',
        '[...a, ...b] = [];',
        '[...a, b] = [];',
        '[...a = 1] = [];',
        ' [((a)] = [];',
        '[a)] = [];',
        '{a: ...[]}',
        '{x:x}.x'
    ];

    for (const arg of invalidSyntax) {

        fail(`let ${arg}`, {
            source: `let ${arg}`
        });

        fail(`const ${arg}`, {
            source: `const ${arg}`
        });

        fail(`for (let ${arg} = {}; ;  ) { }`, {
            source: `for (let ${arg} = {}; ;  ) { }`
        });

        fail(`for (let ${arg} of '' ) { }`, {
            source: `for (let ${arg} of '' ) { }`
        });
    }

    const vaidSyntax = [
        '[a, b] = [1];',
        '[,] = [];',
        '[a,] = [];',
        '[a] = [,,];',
        '[...a] = [];',
        '[a = 1] = [];',
        '[a = 1, b] = [];',
        '[[a]] = [[]];',
        '[[...a], ...b] = [[],];',
    ];

    for (const arg of vaidSyntax) {
        console.log(arg);

        pass(`let ${arg}`, {
            source: `let ${arg}`,
            expected: parseScript(`let ${arg}`)
        });

        pass(`const ${arg}`, {
            source: `const ${arg}`,
            expected: parseScript(`const ${arg}`)
        });

        pass(`var ${arg}`, {
            source: `var ${arg}`,
            expected: parseScript(`var ${arg}`)
        });
    }
    pass(`let a`, {
        source: 'let a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'VariableDeclaration',
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
                },
                declarations: [{
                    type: 'VariableDeclarator',
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
                    id: {
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
                        name: 'a'
                    },
                    init: null
                }],
                kind: 'let'
            }],
            sourceType: 'script'
        }
    });

    pass(`let.let = foo`, {
        source: 'let.let = foo',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    left: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'let',
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
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'let',
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
                    },
                    operator: '=',
                    right: {
                        type: 'Identifier',
                        name: 'foo',
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
            }],
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

    pass(`switch (answer) { case 42: let t = 42; break; }`, {
        source: 'switch (answer) { case 42: let t = 42; break; }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer',
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
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 42,
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
                        },
                        raw: '42'
                    },
                    consequent: [{
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 42,
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
                                    },
                                    raw: '42'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 't',
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
                                start: 31,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            }],
                            kind: 'let',
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
                        },
                        {
                            type: 'BreakStatement',
                            label: null,
                            start: 39,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 39
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        }
                    ],
                    start: 18,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 45
                        }
                    }
                }],
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

    pass(`let;`, {
        source: 'let;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'let',
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
            }],
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

    pass(`while(true) var a`, {
        source: 'while(true) var a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'WhileStatement',
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
                },
                test: {
                    type: 'Literal',
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
                    },
                    value: true,
                    raw: 'true'
                },
                body: {
                    type: 'VariableDeclaration',
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
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        id: {
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
                            name: 'a'
                        },
                        init: null
                    }],
                    kind: 'var'
                }
            }],
            sourceType: 'script'
        }
    });

    fail(`while(true) let a`, {
        source: 'while(true) let a',
    });

    fail(`while(true) const a`, {
        source: 'while(true) const a',
    });

    fail(`with(true) let a`, {
        source: 'with(true) let a',
    });

    fail(`with(true) class a {}`, {
        source: 'with(true) class a {}',
    });

    fail(`a: let a`, {
        source: 'a: let a',
    });

    fail(`const x = 0, y = 1,;`, {
        source: 'const x = 0, y = 1,;',
    });

    fail(`let x,;`, {
        source: 'let x,;',
    });

    fail(`let x,`, {
        source: 'let x,',
    });

    fail(`let let;`, {
        source: 'let let;',
    });

    fail(`for (const let = 1;;;) {}`, {
        source: 'for (const let = 1;;;) {}',
    });

    fail(`const let`, {
        source: 'const let',
    });

    fail(`let []`, {
        source: 'let []',
    });

    fail(`const const;`, {
        source: 'const const;',
    });
});
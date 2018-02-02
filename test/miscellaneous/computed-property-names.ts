import { pass, fail } from '../test-utils';

describe('Miscellaneous - Computed property names', () => {

        describe('Basic', () => {

            pass(`var object = { a: 'A', [1]: 'B', c: 'C',  [ID(2)]: 'D', };`, {
                source: `var object = { a: 'A', [1]: 'B', c: 'C',  [ID(2)]: 'D', };`,
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
                                                value: {
                                                    type: 'Literal',
                                                    value: 'A',
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
                                                    },
                                                    raw: '\'A\''
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
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
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Literal',
                                                    value: 1,
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
                                                    },
                                                    raw: '1'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'B',
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
                                                    },
                                                    raw: '\'B\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 23,
                                                end: 31,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                                    type: 'Literal',
                                                    value: 'C',
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
                                                    },
                                                    raw: '\'C\''
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 33,
                                                end: 39,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 39
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'ID',
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
                                                    arguments: [
                                                        {
                                                            type: 'Literal',
                                                            value: 2,
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
                                                            },
                                                            raw: '2'
                                                        }
                                                    ],
                                                    start: 43,
                                                    end: 48,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 43
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 48
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'D',
                                                    start: 51,
                                                    end: 54,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 51
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 54
                                                        }
                                                    },
                                                    raw: '\'D\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 42,
                                                end: 54,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 54
                                                    }
                                                }
                                            }
                                        ],
                                        start: 13,
                                        end: 57,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 57
                                            }
                                        }
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'object',
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
                                    start: 4,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
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
                    ],
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

            pass(`var object = { a: 'A', ['b']: 'B', c: 'C', [ID('d')]: 'D', };`, {
                source: `var object = { a: 'A', ['b']: 'B', c: 'C', [ID('d')]: 'D', };`,
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
                                                value: {
                                                    type: 'Literal',
                                                    value: 'A',
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
                                                    },
                                                    raw: '\'A\''
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
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
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Literal',
                                                    value: 'b',
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
                                                    },
                                                    raw: '\'b\''
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'B',
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
                                                    },
                                                    raw: '\'B\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
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
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                                value: {
                                                    type: 'Literal',
                                                    value: 'C',
                                                    start: 38,
                                                    end: 41,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 41
                                                        }
                                                    },
                                                    raw: '\'C\''
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 35,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 35
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'ID',
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
                                                    arguments: [
                                                        {
                                                            type: 'Literal',
                                                            value: 'd',
                                                            start: 47,
                                                            end: 50,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 47
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 50
                                                                }
                                                            },
                                                            raw: '\'d\''
                                                        }
                                                    ],
                                                    start: 44,
                                                    end: 51,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 44
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 51
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'D',
                                                    start: 54,
                                                    end: 57,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 54
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 57
                                                        }
                                                    },
                                                    raw: '\'D\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 43,
                                                end: 57,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 43
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 57
                                                    }
                                                }
                                            }
                                        ],
                                        start: 13,
                                        end: 60,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 60
                                            }
                                        }
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'object',
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
                                    start: 4,
                                    end: 60,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 60
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 0,
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 61,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 61
                        }
                    }
                }
            });
        });

        describe('Class', () => {

            pass(`class C { get ['a']() { return 'A'; } }`, {
                source: 'class C { get ["a"]() { return "A"; } }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Literal',
                                            value: 'a',
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
                                            raw: '"a"'
                                        },
                                        kind: 'get',
                                        computed: true,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'A',
                                                            start: 31,
                                                            end: 34,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 31
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 34
                                                                }
                                                            },
                                                            raw: '"A"'
                                                        },
                                                        start: 24,
                                                        end: 35,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 35
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 22,
                                                end: 37,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 22
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
                                            start: 19,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 10,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    }
                                ],
                                start: 8,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
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

            pass(`class C { set ['a'](_) { return 'A'; } }`, {
                source: 'class C { set ["a"](_) { return "A"; } }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Literal',
                                            value: 'a',
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
                                            raw: '"a"'
                                        },
                                        kind: 'set',
                                        computed: true,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: '_',
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
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'A',
                                                            start: 32,
                                                            end: 35,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 32
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 35
                                                                }
                                                            },
                                                            raw: '"A"'
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
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
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
                                        static: false,
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
                                    }
                                ],
                                start: 8,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
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

            pass(`class C { constructor() {} ["constructor"]() {} }`, {
                source: 'class C { constructor() {} ["constructor"]() {} }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Identifier',
                                            name: 'constructor',
                                            start: 10,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        kind: 'constructor',
                                        computed: false,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
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
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 21,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 10,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Literal',
                                            value: 'constructor',
                                            start: 28,
                                            end: 41,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 41
                                                }
                                            },
                                            raw: '"constructor"'
                                        },
                                        kind: 'method',
                                        computed: true,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
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
                                            id: null,
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
                                        static: false,
                                        start: 27,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    }
                                ],
                                start: 8,
                                end: 49,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 49
                                    }
                                }
                            },
                            start: 0,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 49
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 49,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 49
                        }
                    }
                }
            });

            pass(`class C { constructor() {} ["constructor"]() {} }`, {
                source: 'class C { constructor() {} ["constructor"]() {} }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Identifier',
                                            name: 'constructor',
                                            start: 10,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        kind: 'constructor',
                                        computed: false,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
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
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 21,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 26
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 10,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
                                    },
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Literal',
                                            value: 'constructor',
                                            start: 28,
                                            end: 41,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 41
                                                }
                                            },
                                            raw: '"constructor"'
                                        },
                                        kind: 'method',
                                        computed: true,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
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
                                            id: null,
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
                                        static: false,
                                        start: 27,
                                        end: 47,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 27
                                            },
                                            end: {
                                                line: 1,
                                                column: 47
                                            }
                                        }
                                    }
                                ],
                                start: 8,
                                end: 49,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 49
                                    }
                                }
                            },
                            start: 0,
                            end: 49,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 49
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 49,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 49
                        }
                    }
                }
            });

            pass(`class C { *['a']() { yield 1; yield 2; } }`, {
                source: 'class C { *["a"]() { yield 1; yield 2; } }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Literal',
                                            value: 'a',
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
                                            },
                                            raw: '"a"'
                                        },
                                        kind: 'method',
                                        computed: true,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'YieldExpression',
                                                            argument: {
                                                                type: 'Literal',
                                                                value: 1,
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
                                                                },
                                                                raw: '1'
                                                            },
                                                            delegate: false,
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
                                                        end: 29,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 29
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'YieldExpression',
                                                            argument: {
                                                                type: 'Literal',
                                                                value: 2,
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
                                                                },
                                                                raw: '2'
                                                            },
                                                            delegate: false,
                                                            start: 30,
                                                            end: 37,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 30
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 37
                                                                }
                                                            }
                                                        },
                                                        start: 30,
                                                        end: 38,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 30
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 38
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 19,
                                                end: 40,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 40
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
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
                                        },
                                        static: false,
                                        start: 10,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        }
                                    }
                                ],
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

            pass(`class C {  a() { return 'A'} ['b']() { return 'B'; } c() { return 'C'; } [ID('d')]() { return 'D'; } }`, {
                source: `class C {  a() { return 'A'} ['b']() { return 'B'; } c() { return 'C'; } [ID('d')]() { return 'D'; } }`,
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
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
                                        kind: 'method',
                                        computed: false,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'A',
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
                                                            },
                                                            raw: '\'A\''
                                                        },
                                                        start: 17,
                                                        end: 27,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 17
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 27
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 15,
                                                end: 28,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
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
                                            start: 12,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 11,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Literal',
                                            value: 'b',
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
                                            },
                                            raw: '\'b\''
                                        },
                                        kind: 'method',
                                        computed: true,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'B',
                                                            start: 46,
                                                            end: 49,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 46
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 49
                                                                }
                                                            },
                                                            raw: '\'B\''
                                                        },
                                                        start: 39,
                                                        end: 50,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 39
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 50
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 37,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 34,
                                            end: 52,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 52
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 29,
                                        end: 52,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 52
                                            }
                                        }
                                    },
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Identifier',
                                            name: 'c',
                                            start: 53,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 53
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 54
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
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'C',
                                                            start: 66,
                                                            end: 69,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 66
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 69
                                                                }
                                                            },
                                                            raw: '\'C\''
                                                        },
                                                        start: 59,
                                                        end: 70,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 59
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 70
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 57,
                                                end: 72,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 57
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 72
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 54,
                                            end: 72,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 54
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 72
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 53,
                                        end: 72,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 53
                                            },
                                            end: {
                                                line: 1,
                                                column: 72
                                            }
                                        }
                                    },
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'Identifier',
                                                name: 'ID',
                                                start: 74,
                                                end: 76,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 74
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 76
                                                    }
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Literal',
                                                    value: 'd',
                                                    start: 77,
                                                    end: 80,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 77
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 80
                                                        }
                                                    },
                                                    raw: '\'d\''
                                                }
                                            ],
                                            start: 74,
                                            end: 81,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 74
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 81
                                                }
                                            }
                                        },
                                        kind: 'method',
                                        computed: true,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'D',
                                                            start: 94,
                                                            end: 97,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 94
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 97
                                                                }
                                                            },
                                                            raw: '\'D\''
                                                        },
                                                        start: 87,
                                                        end: 98,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 87
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 98
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 85,
                                                end: 100,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 85
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 100
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 82,
                                            end: 100,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 82
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 100
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 73,
                                        end: 100,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 73
                                            },
                                            end: {
                                                line: 1,
                                                column: 100
                                            }
                                        }
                                    }
                                ],
                                start: 8,
                                end: 102,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 102
                                    }
                                }
                            },
                            start: 0,
                            end: 102,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 102
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 102,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 102
                        }
                    }
                }
            });

            pass(`class C { 123() { }}`, {
                source: 'class C { 123() { }}',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
                                        key: {
                                            type: 'Literal',
                                            value: 123,
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
                                            },
                                            raw: '123'
                                        },
                                        kind: 'method',
                                        computed: false,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 16,
                                                end: 19,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 16
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
                                            start: 13,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            }
                                        },
                                        static: false,
                                        start: 10,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
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

            pass(`class C { static a() { return 'A'; } }`, {
                source: 'class C { static a() { return "A"; } }',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ClassDeclaration',
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                                body: [
                                    {
                                        type: 'MethodDefinition',
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
                                        kind: 'method',
                                        computed: false,
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Literal',
                                                            value: 'A',
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
                                                            },
                                                            raw: '"A"'
                                                        },
                                                        start: 23,
                                                        end: 34,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 34
                                                            }
                                                        }
                                                    }
                                                ],
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
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 18,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        static: true,
                                        start: 10,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 36
                                            }
                                        }
                                    }
                                ],
                                start: 8,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
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
        });

        describe('Object', () => {

            pass(`var object = {  [1.2]: 'A', [NaN]: 'G', [1e55]: 'B', [-Infinity]: 'F' }`, {
                source: `var object = {  [1.2]: 'A', [NaN]: 'G', [1e55]: 'B', [-Infinity]: 'F' }`,
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
                                                    type: 'Literal',
                                                    value: 1.2,
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
                                                    },
                                                    raw: '1.2'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'A',
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
                                                    raw: '\'A\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
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
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'NaN',
                                                    start: 29,
                                                    end: 32,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 29
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 32
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'G',
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
                                                    },
                                                    raw: '\'G\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 28,
                                                end: 38,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Literal',
                                                    value: 1e+55,
                                                    start: 41,
                                                    end: 45,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 41
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 45
                                                        }
                                                    },
                                                    raw: '1e55'
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'B',
                                                    start: 48,
                                                    end: 51,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 48
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 51
                                                        }
                                                    },
                                                    raw: '\'B\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 40,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 40
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 51
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'UnaryExpression',
                                                    operator: '-',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'Infinity',
                                                        start: 55,
                                                        end: 63,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 55
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 63
                                                            }
                                                        }
                                                    },
                                                    prefix: true,
                                                    start: 54,
                                                    end: 63,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 54
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 63
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'F',
                                                    start: 66,
                                                    end: 69,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 66
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 69
                                                        }
                                                    },
                                                    raw: '\'F\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 53,
                                                end: 69,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 53
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 69
                                                    }
                                                }
                                            }
                                        ],
                                        start: 13,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
                                            }
                                        }
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'object',
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
                                    start: 4,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 0,
                            end: 71,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 71
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 71,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 71
                        }
                    }
                }
            });

            pass(`var object = { a: 'A', [sym1]: 'B',  c: 'C',  [ID(sym2)]: 'D',  };`, {
                source: `var object = { a: 'A', [sym1]: 'B',  c: 'C',  [ID(sym2)]: 'D',  };`,
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
                                                value: {
                                                    type: 'Literal',
                                                    value: 'A',
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
                                                    },
                                                    raw: '\'A\''
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
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
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'sym1',
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
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'B',
                                                    start: 31,
                                                    end: 34,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 31
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 34
                                                        }
                                                    },
                                                    raw: '\'B\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 23,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                                value: {
                                                    type: 'Literal',
                                                    value: 'C',
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
                                                    },
                                                    raw: '\'C\''
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
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
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'ID',
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
                                                    arguments: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'sym2',
                                                            start: 50,
                                                            end: 54,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 50
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 54
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 47,
                                                    end: 55,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 47
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 55
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 'D',
                                                    start: 58,
                                                    end: 61,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 58
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 61
                                                        }
                                                    },
                                                    raw: '\'D\''
                                                },
                                                kind: 'init',
                                                computed: true,
                                                method: false,
                                                shorthand: false,
                                                start: 46,
                                                end: 61,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 46
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 61
                                                    }
                                                }
                                            }
                                        ],
                                        start: 13,
                                        end: 65,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 13
                                            },
                                            end: {
                                                line: 1,
                                                column: 65
                                            }
                                        }
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'object',
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
                                    start: 4,
                                    end: 65,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 65
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 0,
                            end: 66,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 66
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 66,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 66
                        }
                    }
                }
            });
        });
    });
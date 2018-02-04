import { pass, fail } from '../test-utils';

describe('Next - Rest property', () => {

    fail('let { ...x = y } = z;', {
        source: `let { ...x = y } = z;`,
        next: true,
        message: '`...` must be followed by an identifier in declaration contexts',
        line: 1,
        column: 10,
        index: 10
    });

    fail('let { ...x = y } = z;', {
        source: `let { ...x = y } = z;`,
        next: true,
        message: '`...` must be followed by an identifier in declaration contexts',
        line: 1,
        column: 10,
        index: 10
    });

    fail('let { a, ...b, c } = x;', {
        source: `let { a, ...b, c } = x;`,
        next: true,
        message: 'Rest elements cannot have a default value',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`async function f() { for await (x in xs); }`, {
        source: 'async function f() { for await (x in xs); }',
        line: 1,
    });

    fail(`let {...obj1,...obj2} = foo`, {
        source: 'let {...obj1,...obj2} = foo',
        line: 1,
    });

    fail(`let {...obj1,a} = foo`, {
        source: 'let {...obj1,a} = foo',
        line: 1,
    });

    fail(`let {...(obj)} = foo`, {
        source: 'let {...(obj)} = foo',
        line: 1,
    });

    fail(`({...(a,b)} = foo)`, {
        source: '({...(a,b)} = foo)',
        line: 1,
    });

    fail(`({...(a,b)}) => {}`, {
        source: '({...(a,b)}) => {}',
        line: 1,
    });

    fail(`let {...obj1,} = foo`, {
        source: 'let {...obj1,} = foo',
        line: 1,
    });

    fail(`let {...(a,b)} = foo`, {
        source: 'let {...(a,b)} = foo',
        line: 1,
    });

    pass(`let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };`, {
        source: 'let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };',
        loc: true,
        ranges: true,
        next: true,
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
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 23,
                                        end: 27,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 23
                                            },
                                            end: {
                                                line: 1,
                                                column: 27
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        value: {
                                            type: 'Literal',
                                            value: 2,
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
                                            },
                                            raw: '2'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 29,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
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
                                            name: 'a',
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
                                            value: 3,
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
                                            },
                                            raw: '3'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 35,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
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
                                            type: 'Identifier',
                                            name: 'b',
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
                                        value: {
                                            type: 'Literal',
                                            value: 4,
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
                                            },
                                            raw: '4'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                        }
                                    }
                                ],
                                start: 21,
                                end: 47,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 47
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
                                        },
                                        computed: false,
                                        value: {
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
                                        },
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
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                    },
                                    {
                                        type: 'RestElement',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        start: 12,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    }
                                ],
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
                            start: 4,
                            end: 47,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 47
                                }
                            }
                        }
                    ],
                    kind: 'let',
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

    pass(`let { ...x } = y;`, {
        source: 'let { ...x } = y;',
        loc: true,
        ranges: true,
        next: true,
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
                            id: {
                                type: 'ObjectPattern',
                                properties: [
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
                            }
                        }
                    ],
                    kind: 'let',
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

});
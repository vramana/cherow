import { pass, fail, testErrorLocation } from '../utils';

describe('Expressions - Spread', () => {

    testErrorLocation(`[...a, b] = c;`, {
        source: '[...a, b] = c;',
        message: 'Invalid left-hand side in assignment',
        line: 1,
        column: 5,
        index: 6
    });

    pass(`[{ a, b }, ...c] = d;`, {
        source: '[{ a, b }, ...c] = d;',
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
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'a',
                                                start: 3,
                                                end: 4,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 3
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 4
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'Identifier',
                                                name: 'a',
                                                start: 3,
                                                end: 4,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 3
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 4
                                                    }
                                                }
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
                                            start: 3,
                                            end: 4,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 3
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 4
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            key: {
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
                                            value: {
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
                                            kind: 'init',
                                            computed: false,
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
                                        }
                                    ],
                                    start: 1,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'c',
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
                        },
                        operator: '=',
                        right: {
                            type: 'Identifier',
                            name: 'd',
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
                    },
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    });

    pass(`[a, ...[b, c]] = d;`, {
        source: '[a, ...[b, c]] = d;',
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
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
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
                                                name: 'b',
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
                                            {
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
                                            }
                                        ],
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
                                    },
                                    start: 4,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
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
                        },
                        operator: '=',
                        right: {
                            type: 'Identifier',
                            name: 'd',
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
                }
            ],
            sourceType: 'script',
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
        }
    });

    pass(`[...a] = b;`, {
        source: '[...a] = b;',
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
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'RestElement',
                                    argument: {
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
                                    start: 1,
                                    end: 5,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 5
                                        }
                                    }
                                }
                            ],
                            start: 0,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        operator: '=',
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
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 11,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }
    });

    pass(`var [a, ...b] = c;`, {
        source: 'var [a, ...b] = c;',
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
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
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
                                    {
                                        type: 'RestElement',
                                        argument: {
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
                                        start: 8,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    }
                                ],
                                start: 4,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            },
                            start: 4,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`var [...a] = b;`, {
        source: 'var [...a] = b;',
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
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'RestElement',
                                        argument: {
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
                                    }
                                ],
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
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 15,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }
    });
});

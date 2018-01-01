import { pass, fail } from '../utils';

describe('Miscellaneous - Global code', () => {

    fail(`() => { super(); };`, {
        source: `() => { super(); };`,
        message: 'super() is only valid in derived class constructors',
        line: 1,
        column: 8,
        index: 13
    });

    fail(`super();`, {
        source: `super();`,
    });

    fail(`super.property;`, {
        source: `super.property;`,
    });

    fail(`export default null;`, {
        source: `export default null;`,
        module: true
    });

    fail(`super.property;`, {
        source: `super.property;`,
    });

    fail(`() => {
        super();
      };`, {
        source: `() => {
            super();
          };`,
    });

    fail(`super.property;`, {
        source: `super.property;`,
    });

    pass(`var undefined = 1;`, {
        source: `var undefined = 1;`,
        loc: true,
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
                                type: 'Literal',
                                value: 1,
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
                                type: 'Identifier',
                                name: 'undefined',
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

    pass(`var undefined;`, {
        source: `var undefined;`,
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
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'undefined',
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
                    kind: 'var',
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
            ],
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

    pass(`function f() { return 1; } function f() { return 2; }`, {
        source: `function f() { return 1; } function f() { return 2; }`,
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
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Literal',
                                    value: 1,
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
                                },
                                start: 15,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
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
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Literal',
                                    value: 2,
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
                            }
                        ],
                        start: 40,
                        end: 53,
                        loc: {
                            start: {
                                line: 1,
                                column: 40
                            },
                            end: {
                                line: 1,
                                column: 53
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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
                    start: 27,
                    end: 53,
                    loc: {
                        start: {
                            line: 1,
                            column: 27
                        },
                        end: {
                            line: 1,
                            column: 53
                        }
                    }
                }
            ],
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

    pass(`function f() { return 1; }
    function f() { return 2; }
    function f() { return 3; }`, {
        source: `function f() { return 1; }
        function f() { return 2; }
        function f() { return 3; }`,
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
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Literal',
                                    value: 1,
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
                                },
                                start: 15,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
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
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Literal',
                                    value: 2,
                                    start: 57,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 30
                                        },
                                        end: {
                                            line: 2,
                                            column: 31
                                        }
                                    }
                                },
                                start: 50,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 23
                                    },
                                    end: {
                                        line: 2,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 48,
                        end: 61,
                        loc: {
                            start: {
                                line: 2,
                                column: 21
                            },
                            end: {
                                line: 2,
                                column: 34
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 44,
                        end: 45,
                        loc: {
                            start: {
                                line: 2,
                                column: 17
                            },
                            end: {
                                line: 2,
                                column: 18
                            }
                        }
                    },
                    start: 35,
                    end: 61,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 34
                        }
                    }
                },
                {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Literal',
                                    value: 3,
                                    start: 92,
                                    end: 93,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 30
                                        },
                                        end: {
                                            line: 3,
                                            column: 31
                                        }
                                    }
                                },
                                start: 85,
                                end: 94,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 23
                                    },
                                    end: {
                                        line: 3,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 83,
                        end: 96,
                        loc: {
                            start: {
                                line: 3,
                                column: 21
                            },
                            end: {
                                line: 3,
                                column: 34
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 79,
                        end: 80,
                        loc: {
                            start: {
                                line: 3,
                                column: 17
                            },
                            end: {
                                line: 3,
                                column: 18
                            }
                        }
                    },
                    start: 70,
                    end: 96,
                    loc: {
                        start: {
                            line: 3,
                            column: 8
                        },
                        end: {
                            line: 3,
                            column: 34
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 96,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 3,
                    column: 34
                }
            }
        }
    });
});
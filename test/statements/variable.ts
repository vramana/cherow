import { pass, fail } from '../test-utils';

describe('Statements - Variable', () => {

    fail(`var x && 1;`, {
        source: 'var x && 1;',
        message: 'Unexpected token',
        line: 1,
        column: 5,
        index: 5,
    });

    fail(`var x | true;`, {
        source: 'var x | true;',
        message: 'Unexpected token',
        line: 1,
        column: 5,
        index: 5,
    });

    fail(`"use strict"; (function () { var eval; })`, {
        source: '"use strict"; (function () { var eval; })',
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 32,
        index: 32,
    });

    fail(`"use strict"; function foo() { var arguments, arguments = 42;}`, {
        source: '"use strict"; function foo() { var arguments, arguments = 42;}',
        message: 'The identifier \'arguments\' must not be in binding position in strict mode',
        line: 1,
        column: 34,
        index: 34,
    });

    fail(`"use strict"; var eval;`, {
        source: '"use strict"; var eval;',
        message: 'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 17,
        index: 17,
    });

    fail(`"use strict"; for (var arguments = 42 in null) {};`, {
        source: '"use strict"; for (var arguments = 42 in null) {};',
        message: 'The identifier \'arguments\' must not be in binding position in strict mode',
        line: 1,
        column: 22,
        index: 22,
    });

    fail(`var {a:a};`, {
        source: 'var {a:a};',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 9,
        index: 9,
    });

    fail(`var {a};`, {
        source: 'var {a};',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 7,
        index: 7,
    });

    fail(`var [a];`, {
        source: 'var [a];',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 7,
        index: 7,
    });

    fail(`var new A = 0;`, {
        source: 'var new A = 0;',
        message: 'Unexpected token new',
        line: 1,
        column: 3,
        index: 3,
    });

    fail(`var (a)=0;`, {
        source: 'var (a)=0;',
        line: 1,
        column: 3,
        index: 3,
    });

    fail(`var a[0]=0;`, {
        source: 'var a[0]=0;',
        line: 1,
        column: 5,
        index: 5,
    });

    fail(`"use strict"; var eval;`, {
        source: '"use strict"; var eval;    ',
        line: 1,
        column: 17,
        index: 17,
    });

    fail(`var a.b;`, {
        source: 'var a.b;',
        line: 1,
        column: 5,
        index: 5,
    });

    fail(`var x=0, y=0;
    var z=
    x
    ++
    ++
    y`, {
        source: `var x=0, y=0;
        var z=
        x
        ++
        ++
        y`,
        message:  'Unexpected token',
        line: 4,
        column: 10,
        index: 49,
    });

    fail(`"use strict"; function foo() { var a, arguments, b;}`, {
        source: '"use strict"; function foo() { var a, arguments, b;}',
        message: 'The identifier \'arguments\' must not be in binding position in strict mode',
        line: 1,
        column: 37,
        index: 37,
    });

    pass(`"use strict"; var foo = { }; foo.eval = {};`, {
        source: '"use strict"; var foo = { }; foo.eval = {};',
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
                    directive: 'use strict',
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
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'ObjectExpression',
                                properties: [],
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
                            id: {
                                type: 'Identifier',
                                name: 'foo',
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
                            start: 18,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 14,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'Identifier',
                                name: 'foo',
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
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'eval',
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
                            },
                            start: 29,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 29
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [],
                            start: 40,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 40
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            }
                        },
                        start: 29,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 29
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    start: 29,
                    end: 43,
                    loc: {
                        start: {
                            line: 1,
                            column: 29
                        },
                        end: {
                            line: 1,
                            column: 43
                        }
                    }
                }
            ],
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

    pass(`var foo = { eval: 1 };`, {
        source: 'var foo = { eval: 1 };',
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
                                            name: 'eval',
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
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
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
                        }
                    ],
                    kind: 'var',
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
            sourceType: 'script',
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

    pass(`var foo = { }; foo.eval = {};`, {
        source: 'var foo = { }; foo.eval = {};',
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
                                properties: [],
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
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
                                type: 'Identifier',
                                name: 'foo',
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
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'eval',
                                start: 19,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            start: 15,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [],
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
                        },
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
                    start: 15,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 15
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

    pass(`var foo, let;`, {
        source: 'var foo, let;',
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
                        {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                                type: 'Identifier',
                                name: 'let',
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
            ],
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

    pass(`var foo = let = 1;`, {
        source: 'var foo = let = 1;',
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
                                type: 'AssignmentExpression',
                                left: {
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
                                operator: '=',
                                right: {
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
                                    },
                                    raw: '1'
                                },
                                start: 10,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
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

    pass(`var foo = {}; foo.if;`, {
        source: 'var foo = {}; foo.if;',
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
                                properties: [],
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 14,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'if',
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
                        start: 14,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        }
                    },
                    start: 14,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
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

    pass(`var foo = {}; foo.interface;`, {
        source: 'var foo = {}; foo.interface;',
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
                                properties: [],
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 14,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'interface',
                            start: 18,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        start: 14,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    },
                    start: 14,
                    end: 28,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 1,
                            column: 28
                        }
                    }
                }
            ],
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

    pass(`var f = new new foo()();`, {
        source: 'var f = new new foo()();',
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
                                type: 'NewExpression',
                                callee: {
                                    type: 'NewExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'foo',
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
                                    arguments: [],
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
                                arguments: [],
                                start: 8,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'f',
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

    pass(`var f = new foo[bar].baz(baz)()[bar].baz;`, {
        source: 'var f = new foo[bar].baz(baz)()[bar].baz;',
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
                                type: 'MemberExpression',
                                object: {
                                    type: 'MemberExpression',
                                    object: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'NewExpression',
                                            callee: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'foo',
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
                                                        }
                                                    },
                                                    computed: true,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'bar',
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
                                                computed: false,
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'baz',
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
                                                start: 8,
                                                end: 24,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 8
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 24
                                                    }
                                                }
                                            },
                                            arguments: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'baz',
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
                                                }
                                            ],
                                            start: 8,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        arguments: [],
                                        start: 8,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        }
                                    },
                                    computed: true,
                                    property: {
                                        type: 'Identifier',
                                        name: 'bar',
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
                                        }
                                    },
                                    start: 8,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    }
                                },
                                computed: false,
                                property: {
                                    type: 'Identifier',
                                    name: 'baz',
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
                            id: {
                                type: 'Identifier',
                                name: 'f',
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
                            start: 4,
                            end: 40,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 40
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 41,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        }
    });

    pass(`set: 1`, {
        source: 'set: 1',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [
                {
                  body: {
                    end: 6,
                    expression: {
                      end: 6,
                      loc: {
                        end: {
                          column: 6,
                          line: 1
                        },
                        start: {
                          column: 5,
                          line: 1
                        }
                      },
                      raw: '1',
                      start: 5,
                      type: 'Literal',
                      value: 1,
                    },
                    loc: {
                      end: {
                        column: 6,
                        line: 1,
                      },
                      start: {
                        column: 5,
                        line: 1,
                      }
                    },
                   start: 5,
                   type: 'ExpressionStatement'
                  },
                  end: 6,
                  label: {
                    end: 3,
                    loc: {
                      end: {
                        column: 3,
                        line: 1,
                      },
                      start: {
                        column: 0,
                        line: 1
                      }
                    },
                    name: 'set',
                    start: 0,
                    type: 'Identifier'
                  },
                  loc: {
                    end: {
                      column: 6,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    },
                  },
                  start: 0,
                  type: 'LabeledStatement'
                }
              ],
              end: 6,
              loc: {
                end: {
                 column: 6,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`var x`, {
        source: 'var x',
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
                        name: 'x'
                    },
                    init: null
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`var [x, y, z] = [1, 2, 3];`, {
        source: 'var [x, y, z] = [1, 2, 3];',
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
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'Literal',
                                        value: 1,
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
                                    {
                                        type: 'Literal',
                                        value: 2,
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
                                    {
                                        type: 'Literal',
                                        value: 3,
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
                                    }
                                ],
                                start: 16,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 16
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
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
                                    {
                                        type: 'Identifier',
                                        name: 'y',
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
                                        name: 'z',
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
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`var [[...x] = function() {}()] = [[2, 1, 3]];`, {
        source: 'var [[...x] = function() {}()] = [[2, 1, 3]];',
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
                                type: 'ArrayExpression',
                                elements: [
                                    {
                                        type: 'ArrayExpression',
                                        elements: [
                                            {
                                                type: 'Literal',
                                                value: 2,
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
                                            {
                                                type: 'Literal',
                                                value: 1,
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
                                            {
                                                type: 'Literal',
                                                value: 3,
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
                                            }
                                        ],
                                        start: 34,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        }
                                    }
                                ],
                                start: 33,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
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
                                            type: 'CallExpression',
                                            callee: {
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
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
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 14,
                                                end: 27,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 27
                                                    }
                                                }
                                            },
                                            arguments: [],
                                            start: 14,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        start: 5,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    }
                                ],
                                start: 4,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            },
                            start: 4,
                            end: 44,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 44
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 45
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 45,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 45
                }
            }
        }
    });

    pass(`var [cover = (function () {}), xCover = (0, function() {})] = [];`, {
        source: 'var [cover = (function () {}), xCover = (0, function() {})] = [];',
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
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'cover',
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
                                            type: 'FunctionExpression',
                                            params: [],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
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
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 14,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        start: 5,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    },
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'xCover',
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
                                        },
                                        right: {
                                            type: 'SequenceExpression',
                                            expressions: [
                                                {
                                                    type: 'Literal',
                                                    value: 0,
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
                                                {
                                                    type: 'FunctionExpression',
                                                    params: [],
                                                    body: {
                                                        type: 'BlockStatement',
                                                        body: [],
                                                        start: 55,
                                                        end: 57,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 55
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 57
                                                            }
                                                        }
                                                    },
                                                    async: false,
                                                    generator: false,
                                                    expression: false,
                                                    id: null,
                                                    start: 44,
                                                    end: 57,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 44
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 57
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 41,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            }
                                        },
                                        start: 31,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    }
                                ],
                                start: 4,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 59
                                    }
                                }
                            },
                            start: 4,
                            end: 64,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 64
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 65,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 65
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 65,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 65
                }
            }
        }
    });

    pass(`var [,] = function*() {}();`, {
        source: 'var [,] = function*() {}();',
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
                                type: 'CallExpression',
                                callee: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 22,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 22
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 10,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                arguments: [],
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
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    null
                                ],
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
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 27,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            }
        }
    });

    pass(`var {} = null;`, {
        source: 'var {} = null;',
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
                                value: null,
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
                            id: {
                                type: 'ObjectPattern',
                                properties: [],
                                start: 4,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
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

    pass(`var { x: y = 33 } = { };`, {
        source: 'var { x: y = 33 } = { };',
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
                                type: 'ObjectExpression',
                                properties: [],
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
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 33,
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
                                        method: false,
                                        shorthand: false,
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
                                    }
                                ],
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

    pass(`var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`, {
        source: 'var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'w',
                                            start: 50,
                                            end: 51,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 50
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 51
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'ObjectExpression',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
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
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'undefined',
                                                        start: 58,
                                                        end: 67,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 58
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 67
                                                            }
                                                        }
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 55,
                                                    end: 67,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 55
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 67
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'Identifier',
                                                        name: 'z',
                                                        start: 69,
                                                        end: 70,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 69
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 70
                                                            }
                                                        }
                                                    },
                                                    value: {
                                                        type: 'Literal',
                                                        value: 7,
                                                        start: 72,
                                                        end: 73,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 72
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 73
                                                            }
                                                        }
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 69,
                                                    end: 73,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 69
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 73
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 53,
                                            end: 75,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 53
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 75
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 50,
                                        end: 75,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 50
                                            },
                                            end: {
                                                line: 1,
                                                column: 75
                                            }
                                        }
                                    }
                                ],
                                start: 48,
                                end: 77,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 48
                                    },
                                    end: {
                                        line: 1,
                                        column: 77
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
                                            name: 'w',
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
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'ObjectPattern',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                        method: false,
                                                        shorthand: true,
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
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        method: false,
                                                        shorthand: true,
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
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        method: false,
                                                        shorthand: true,
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
                                                start: 9,
                                                end: 20,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 9
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 20
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
                                                        value: {
                                                            type: 'Literal',
                                                            value: 4,
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
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 25,
                                                        end: 29,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 25
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 29
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        value: {
                                                            type: 'Literal',
                                                            value: 5,
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
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 31,
                                                        end: 35,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 31
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 35
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                            value: 6,
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
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 37,
                                                        end: 41,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 37
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 41
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 23,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                }
                                            },
                                            start: 9,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 9
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 6,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        }
                                    }
                                ],
                                start: 4,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            },
                            start: 4,
                            end: 77,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 77
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 78,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 78
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 78,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 78
                }
            }
        }
    });

    pass(`var arrow = () => {};`, {
        source: 'var arrow = () => {};',
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
                                type: 'ArrowFunctionExpression',
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
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 12,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'arrow',
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
                            start: 4,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`var xGen = function* x() {};`, {
        source: 'var xGen = function* x() {};',
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
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                async: false,
                                generator: true,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                start: 11,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'xGen',
                                start: 4,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            start: 4,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }
                    ],
                    kind: 'var',
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
            ],
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

    pass(`var [arrow = () => {}] = [];`, {
        source: 'var [arrow = () => {}] = [];',
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
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'arrow',
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
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 19,
                                                end: 21,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 21
                                                    }
                                                }
                                            },
                                            params: [],
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            start: 13,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        },
                                        start: 5,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    }
                                ],
                                start: 4,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            },
                            start: 4,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }
                    ],
                    kind: 'var',
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
            ],
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

    pass(`var x, y;`, {
        source: 'var x, y;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            },
            body: [{
                type: 'VariableDeclaration',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
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
                            name: 'x'
                        },
                        init: null
                    },
                    {
                        type: 'VariableDeclarator',
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
                        },
                        id: {
                            type: 'Identifier',
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
                            },
                            name: 'y'
                        },
                        init: null
                    }
                ],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`tvar x = 0`, {
        source: 'var x = 0',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            },
            body: [{
                type: 'VariableDeclaration',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                },
                declarations: [{
                    type: 'VariableDeclarator',
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
                        name: 'x'
                    },
                    init: {
                        type: 'Literal',
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
                        value: 0,
                        raw: '0'
                    }
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`var eval = 0, arguments = 1`, {
        source: 'var eval = 0, arguments = 1',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 27,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            },
            body: [{
                type: 'VariableDeclaration',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                },
                declarations: [{
                        type: 'VariableDeclarator',
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
                        },
                        id: {
                            type: 'Identifier',
                            start: 4,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            },
                            name: 'eval'
                        },
                        init: {
                            type: 'Literal',
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
                            },
                            value: 0,
                            raw: '0'
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        start: 14,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 14,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            },
                            name: 'arguments'
                        },
                        init: {
                            type: 'Literal',
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
                            value: 1,
                            raw: '1'
                        }
                    }
                ],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`var {propName: localVar = defaultValue} = obj`, {
        source: 'var {propName: localVar = defaultValue} = obj',
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
                                name: 'obj',
                                start: 42,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 42
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
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
                                            name: 'propName',
                                            start: 5,
                                            end: 13,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 13
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
                                                type: 'Identifier',
                                                name: 'localVar',
                                                start: 15,
                                                end: 23,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 15
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'defaultValue',
                                                start: 26,
                                                end: 38,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 38
                                                    }
                                                }
                                            },
                                            start: 15,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 5,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    }
                                ],
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
                            start: 4,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 45
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 45,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 45
                }
            }
        }
    });

    pass(`var o = { await: 10 }`, {
        source: 'var o = { await: 10 }',
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
                                            name: 'await',
                                            start: 10,
                                            end: 15,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: 10,
                                            start: 17,
                                            end: 19,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 19
                                                }
                                            },
                                            raw: '10'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
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
                            },
                            id: {
                                type: 'Identifier',
                                name: 'o',
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
                        }
                    ],
                    kind: 'var',
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

    pass(`var [a = 1, b = 2] = arr`, {
        source: 'var [a = 1, b = 2] = arr',
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
                                name: 'arr',
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
                            id: {
                                type: 'ArrayPattern',
                                elements: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
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
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            raw: '1'
                                        },
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
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                        right: {
                                            type: 'Literal',
                                            value: 2,
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
                                            raw: '2'
                                        },
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
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 24
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

    pass(`var x = 0, y = 1, z = 2`, {
        source: 'var x = 0, y = 1, z = 2',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'VariableDeclaration',
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
                },
                declarations: [{
                        type: 'VariableDeclarator',
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
                            name: 'x'
                        },
                        init: {
                            type: 'Literal',
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
                            value: 0,
                            raw: '0'
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        start: 11,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        id: {
                            type: 'Identifier',
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
                            },
                            name: 'y'
                        },
                        init: {
                            type: 'Literal',
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
                            value: 1,
                            raw: '1'
                        }
                    },
                    {
                        type: 'VariableDeclarator',
                        start: 18,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        },
                        id: {
                            type: 'Identifier',
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
                            },
                            name: 'z'
                        },
                        init: {
                            type: 'Literal',
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
                            },
                            value: 2,
                            raw: '2'
                        }
                    }
                ],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`var implements, interface, package`, {
        source: 'var implements, interface, package',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'VariableDeclaration',
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
                },
                declarations: [{
                        type: 'VariableDeclarator',
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
                        },
                        id: {
                            type: 'Identifier',
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
                            },
                            name: 'implements'
                        },
                        init: null
                    },
                    {
                        type: 'VariableDeclarator',
                        start: 16,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 16,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            name: 'interface'
                        },
                        init: null
                    },
                    {
                        type: 'VariableDeclarator',
                        start: 27,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 27,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            },
                            name: 'package'
                        },
                        init: null
                    }
                ],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`tvar yield;`, {
        source: 'var yield;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'VariableDeclaration',
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
                },
                declarations: [{
                    type: 'VariableDeclarator',
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
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'yield'
                    },
                    init: null
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`var async = await;`, {
        source: 'var async = await;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'VariableDeclaration',
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
                },
                declarations: [{
                    type: 'VariableDeclarator',
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
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'async'
                    },
                    init: {
                        type: 'Identifier',
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
                        name: 'await'
                    }
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`var let`, {
        source: 'var let',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'VariableDeclaration',
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
                },
                declarations: [{
                    type: 'VariableDeclarator',
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
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'let'
                    },
                    init: null
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`{ let x }`, {
        source: '{ let x }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            },
            body: [{
                type: 'BlockStatement',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 2,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
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
                        id: {
                            type: 'Identifier',
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
                            name: 'x'
                        },
                        init: null
                    }],
                    kind: 'let'
                }]
            }],
            sourceType: 'script'
        }
    });

    pass(`{ let x = 0, y = 1, z = 2 }`, {
        source: '{ let x = 0, y = 1, z = 2 }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 27,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            },
            body: [{
                type: 'BlockStatement',
                start: 0,
                end: 27,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 2,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    },
                    declarations: [{
                            type: 'VariableDeclarator',
                            start: 6,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            },
                            id: {
                                type: 'Identifier',
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
                                name: 'x'
                            },
                            init: {
                                type: 'Literal',
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
                                value: 0,
                                raw: '0'
                            }
                        },
                        {
                            type: 'VariableDeclarator',
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
                            },
                            id: {
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
                                name: 'y'
                            },
                            init: {
                                type: 'Literal',
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
                                },
                                value: 1,
                                raw: '1'
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            start: 20,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            },
                            id: {
                                type: 'Identifier',
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
                                },
                                name: 'z'
                            },
                            init: {
                                type: 'Literal',
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
                                value: 2,
                                raw: '2'
                            }
                        }
                    ],
                    kind: 'let'
                }]
            }],
            sourceType: 'script'
        }
    });

    pass(`var static;`, {
        source: 'var static;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'VariableDeclaration',
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
                },
                declarations: [{
                    type: 'VariableDeclarator',
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
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'static'
                    },
                    init: null
                }],
                kind: 'var'
            }],
            sourceType: 'script'
        }
    });

    pass(`(let[a])`, {
        source: '(let[a])',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            },
            body: [{
                type: 'ExpressionStatement',
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                expression: {
                    type: 'MemberExpression',
                    start: 1,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    },
                    object: {
                        type: 'Identifier',
                        start: 1,
                        end: 4,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        },
                        name: 'let'
                    },
                    property: {
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
                        name: 'a'
                    },
                    computed: true
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`{ const x = 0, y = 1, z = 2 }`, {
        source: '{ const x = 0, y = 1, z = 2 }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'BlockStatement',
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
                },
                body: [{
                    type: 'VariableDeclaration',
                    start: 2,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 2
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    },
                    declarations: [{
                            type: 'VariableDeclarator',
                            start: 8,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            id: {
                                type: 'Identifier',
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
                                name: 'x'
                            },
                            init: {
                                type: 'Literal',
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
                                },
                                value: 0,
                                raw: '0'
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            start: 15,
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            },
                            id: {
                                type: 'Identifier',
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
                                name: 'y'
                            },
                            init: {
                                type: 'Literal',
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
                                value: 1,
                                raw: '1'
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            start: 22,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            },
                            id: {
                                type: 'Identifier',
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
                                },
                                name: 'z'
                            },
                            init: {
                                type: 'Literal',
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
                                value: 2,
                                raw: '2'
                            }
                        }
                    ],
                    kind: 'const'
                }]
            }],
            sourceType: 'script'
        }
    });

    pass('{ var foo; };', {
        source: '{ var foo; };',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: null,
                                    id: {
                                        type: 'Identifier',
                                        name: 'foo',
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
                                }
                            ],
                            kind: 'var',
                            start: 2,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        }
                    ],
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
                },
                {
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
            ],
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

    pass('{ var {foo=a} = {}; };', {
        source: '{ var {foo=a} = {}; };',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: {
                                        type: 'ObjectExpression',
                                        properties: [],
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
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 7,
                                                    end: 10,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 7
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 10
                                                        }
                                                    }
                                                },
                                                computed: false,
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'foo',
                                                        start: 7,
                                                        end: 10,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 7
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 10
                                                            }
                                                        }
                                                    },
                                                    right: {
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
                                                    start: 7,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 7
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                start: 7,
                                                end: 12,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 7
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 12
                                                    }
                                                }
                                            }
                                        ],
                                        start: 6,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        }
                                    },
                                    start: 6,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 2,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    ],
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
                },
                {
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
            ],
            sourceType: 'script',
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

    pass('{ var foo = a; };', {
        source: '{ var foo = a; };',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    id: {
                                        type: 'Identifier',
                                        name: 'foo',
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
                                    start: 6,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 2,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 14
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
                {
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

    pass('{ var {foo} = {foo: a}; };', {
        source: '{ var {foo} = {foo: a}; };',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
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
                                                    name: 'foo',
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
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 7,
                                                    end: 10,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 7
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
                                                    name: 'foo',
                                                    start: 7,
                                                    end: 10,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 7
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 10
                                                        }
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                start: 7,
                                                end: 10,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 7
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 10
                                                    }
                                                }
                                            }
                                        ],
                                        start: 6,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
                                            }
                                        }
                                    },
                                    start: 6,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 2,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        }
                    ],
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
                    }
                },
                {
                    type: 'EmptyStatement',
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

    pass('{ var {foo=a} = {}; }; ', {
        source: '{ var {foo=a} = {}; };',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'VariableDeclaration',
                            declarations: [
                                {
                                    type: 'VariableDeclarator',
                                    init: {
                                        type: 'ObjectExpression',
                                        properties: [],
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
                                    id: {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                kind: 'init',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'foo',
                                                    start: 7,
                                                    end: 10,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 7
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 10
                                                        }
                                                    }
                                                },
                                                computed: false,
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'foo',
                                                        start: 7,
                                                        end: 10,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 7
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 10
                                                            }
                                                        }
                                                    },
                                                    right: {
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
                                                    start: 7,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 7
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    }
                                                },
                                                method: false,
                                                shorthand: true,
                                                start: 7,
                                                end: 12,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 7
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 12
                                                    }
                                                }
                                            }
                                        ],
                                        start: 6,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        }
                                    },
                                    start: 6,
                                    end: 18,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 18
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 2,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    ],
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
                },
                {
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
            ],
            sourceType: 'script',
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

    pass('var foo = a;', {
        source: 'var foo = a',
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
                                type: 'Identifier',
                                name: 'a',
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
                        }
                    ],
                    kind: 'var',
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

    pass('{ var [foo] = [a]; }', {
        source: '{ var [foo] = [b]; };',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                                            }
                                        ],
                                        start: 14,
                                        end: 17,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
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
                                                name: 'foo',
                                                start: 7,
                                                end: 10,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 7
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 10
                                                    }
                                                }
                                            }
                                        ],
                                        start: 6,
                                        end: 11,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 11
                                            }
                                        }
                                    },
                                    start: 6,
                                    end: 17,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 17
                                        }
                                    }
                                }
                            ],
                            kind: 'var',
                            start: 2,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        }
                    ],
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
                {
                    type: 'EmptyStatement',
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

    pass('var foo = { x = 10 };', {
        source: 'var foo = { x = 10 };',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
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
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 10,
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
                                            start: 12,
                                            end: 18,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
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
                                        shorthand: true,
                                        start: 12,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
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
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass('var foo = { x = 10 };', {
        source: 'var foo = { x = 10 };',
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
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
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
                                        value: {
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 10,
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
                                            start: 12,
                                            end: 18,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 12
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
                                        shorthand: true,
                                        start: 12,
                                        end: 18,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 18
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
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
                            end: 20,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 20
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass('var x; (true ? { x = true } : { x = false })', {
        source: 'var x; (true ? { x = true } : { x = false })',
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
                            init: null,
                            id: {
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
                        }
                    ],
                    kind: 'var',
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
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Literal',
                            value: true,
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
                        },
                        consequent: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                    value: {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                        right: {
                                            type: 'Literal',
                                            value: true,
                                            start: 21,
                                            end: 25,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 25
                                                }
                                            }
                                        },
                                        start: 17,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 17,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        alternate: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
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
                                    value: {
                                        type: 'AssignmentPattern',
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
                                            type: 'Literal',
                                            value: false,
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
                                        start: 32,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
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
                                    shorthand: true,
                                    start: 32,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 32
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                }
                            ],
                            start: 30,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 43
                                }
                            }
                        },
                        start: 8,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    start: 7,
                    end: 44,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 44
                        }
                    }
                }
            ],
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

    pass('var { x = 10 } = (o = { x = 20 });', {
        source: 'var { x = 10 } = (o = { x = 20 });',
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
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'o',
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
                                operator: '=',
                                right: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'x',
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
                                                }
                                            },
                                            value: {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'x',
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
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 20,
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
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: true,
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
                                        }
                                    ],
                                    start: 22,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                start: 18,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
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
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 10,
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
                                            start: 6,
                                            end: 12,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 6
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 12
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: true,
                                        start: 6,
                                        end: 12,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 12
                                            }
                                        }
                                    }
                                ],
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
                            },
                            start: 4,
                            end: 33,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 33
                                }
                            }
                        }
                    ],
                    kind: 'var',
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
});
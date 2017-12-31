import { pass, fail, testErrorLocation } from '../utils';

describe('Expressions - Arrow', () => {

    testErrorLocation(`"use strict"; var af = (eval) => 1;`, {
            source: '"use strict"; var af = (eval) => 1;',
            message: 'The identifier \'eval\' must not be in binding position in strict mode',
            line: 1,
            column: 23,
            index: 24
        });

    testErrorLocation(`"use strict"; var af = eval => 1;`, {
            source: '"use strict"; var af = eval => 1;',
            message: 'Unexpected eval or arguments in strict mode',
            line: 1,
            column: 23,
            index: 27
        });

    testErrorLocation(`"use strict"; var af = eval => 1;`, {
            source: '"use strict"; var af = arguments => 1;',
            message: 'Unexpected eval or arguments in strict mode',
            line: 1,
            column: 23,
            index: 32
        });

    testErrorLocation(`[]=>0`, {
            source: '[]=>0',
            message: 'Unexpected token \'=>\'',
            line: 1,
            column: 2,
            index: 4
        });

    testErrorLocation(`() ? 0`, {
            source: '() ? 0',
            message: 'Missing => after parentheses',
            line: 1,
            column: 3,
            index: 4
        });

    testErrorLocation(`(a)\n=> 0`, {
            source: '(a)\n=> 0',
            message: 'No line break is allowed after async',
            line: 2,
            column: 0,
            index: 6
        });

    testErrorLocation(`1 + ()`, {
            source: '1 + ()',
            message: 'Missing => after parentheses',
            line: 1,
            column: 5,
            index: 6
        });

    testErrorLocation(`a\n=> 0`, {
            source: 'a\n=> 0',
            message: 'Unexpected token \'=>\'',
            line: 2,
            column: 0,
            index: 4
        });

    fail(`(a,...a)/*\u2028*/ => 0`, {
            source: '(a,...a)/*\u2028*/ => 0',
        });

    fail(`a\n=> 0`, {
            source: 'a\n=> 0',
        });

    fail(`((a),...a) => 1`, {
            source: '((a),...a) => 1',
        });

    fail(`(a,...a)\n`, {
            source: '(a,...a)\n',
        });

    fail(`(a,...a)/*\u2028*/ => 0`, {
            source: '(a,...a)/*\u2028*/ => 0',
        });

    fail(`(a,...a)/*\u2029*/ => 0`, {
            source: '(a,...a)/*\u2029*/ => 0',
        });

    fail(`() <= 0`, {
            source: '() <= 0',
        });

    testErrorLocation(`() + 0`, {
            source: '() + 0',
            message:  'Missing => after parentheses',
            line: 1,
            column: 3,
            index: 4
        });

    fail(`(a,...a)/*\u202a*/`, {
            source: '(a,...a)/*\u202a*/',
        });

    fail(`(a,...a)/*\n*/ => 0`, {
            source: '(a,...a)/*\n*/ => 0',
        });

    fail(`(a,...a)/*\r\n*/ => 0`, {
            source: '(a,...a)/*\r\n*/ => 0',
        });

    fail(`eval => {"use strict"};`, {
            source: 'eval => {"use strict"};',
        });

    testErrorLocation(`(a,...[a]) => 0;`, {
            source: '(a,...[a]) => 0;',
            message: '\'a\' has already been declared ',
            line: 1,
            column: 0,
            index: 1
        });

    fail(`(x, x) => y;`, {
            source: '(x, x) => y;',
        });

    fail(`var f = (a = 0) => { "use strict"; };`, {
            source: 'var f = (a = 0) => { "use strict"; };',
        });

    fail(`left = (aSize.width/2) - ()`, {
            source: 'left = (aSize.width/2) - ()',
        });

    fail(`(10) => 0;`, {
            source: '(10) => 0;',
        });

    testErrorLocation(`() <= 42;`, {
            source: '() <= 42;',
            message: 'Missing => after parentheses',
            line: 1,
            column: 3,
            index: 5
        });

    testErrorLocation(`"use strict"; (a) => 00;`, {
            source: '"use strict"; (a) => 00;',
            message: 'Octal literals are not allowed in strict mode',
            line: 1,
            column: 21,
            index: 23
        });

    testErrorLocation(`"use strict"; (eval, a) => 42;`, {
            source: '"use strict"; (eval, a) => 42;',
            message: 'The identifier \'eval\' must not be in binding position in strict mode',
            line: 1,
            column: 21,
            index: 22
        });

    pass(`(...[]) => 0`, {
            source: '(...[]) => 0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            params: [
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'ArrayPattern',
                                        elements: [],
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
                                    start: 1,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    }
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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

    pass(`(()=>0)`, {
            source: '(()=>0)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
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
                    }
                ],
                sourceType: 'script',
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
            }
        });

    pass(`(()=>0)`, {
                source: '(()=>0)',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
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
                    }],
                    sourceType: 'script',
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
                }
            });

    pass(`() => 0`, {
                source: '() => 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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
                    }],
                    sourceType: 'script',
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
                }
            });

    pass(`(...a) => 0`, {
                source: '(...a) => 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            params: [{
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
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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
                    }],
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

    pass(`() => {}`, {
                source: '() => {}',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 6,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                            }
                        },
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
                        }
                    }],
                    sourceType: 'script',
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
                    }
                }
            });

    pass(`(a) => 0`, {
                source: '(a) => 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            params: [{
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
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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
                            }
                        },
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
                        }
                    }],
                    sourceType: 'script',
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
                    }
                }
            });
            /*
                    pass(`([a]) => 0`, {
                        source: '([a]) => 0',
                        loc: true,
                        ranges: true,
                        raw: true,
                        expected: {
                            "type": "Program",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "ArrowFunctionExpression",
                                        "body": {
                                            "type": "Literal",
                                            "value": 0,
                                            "start": 9,
                                            "end": 10,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 9
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 10
                                                }
                                            },
                                            "raw": "0"
                                        },
                                        "params": [
                                            {
                                                "type": "ArrayPattern",
                                                "elements": [
                                                    {
                                                        "type": "Identifier",
                                                        "name": "a",
                                                        "start": 2,
                                                        "end": 3,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 2
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 3
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 1,
                                                "end": 4,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 1
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 4
                                                    }
                                                }
                                            }
                                        ],
                                        "id": null,
                                        "async": false,
                                        "generator": false,
                                        "expression": true,
                                        "start": 0,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 0
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 0,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 0
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                }
                            ],
                            "sourceType": "script",
                            "start": 0,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        }
                    }); */

    pass(`a => 0`, {
                source: 'a => 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
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
                    },
                    body: [{
                        type: 'ExpressionStatement',
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
                        },
                        expression: {
                            type: 'ArrowFunctionExpression',
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
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: false,
                            params: [{
                                type: 'Identifier',
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
                                },
                                name: 'a'
                            }],
                            body: {
                                type: 'Literal',
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
                                value: 0,
                                raw: '0'
                            }
                        }
                    }],
                    sourceType: 'script'
                }
            });

    pass(`() => () => 0`, {
                source: '() => () => 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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

    pass(`() => 0, 1`, {
                source: '() => 0, 1',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'SequenceExpression',
                            expressions: [{
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                        type: 'Literal',
                                        value: 0,
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
                                        raw: '0'
                                    },
                                    params: [],
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: true,
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
                                {
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
                                }
                            ],
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
                    }],
                    sourceType: 'script',
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
                }
            });

    pass(`() => 0 + 1`, {
                source: '() => 0 + 1',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                right: {
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
                                operator: '+',
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
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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
                    }],
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

    pass(`(a,b) => 0 + 1`, {
                source: '(a,b) => 0 + 1',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                right: {
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
                                operator: '+',
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
                                }
                            },
                            params: [{
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
                                    type: 'Identifier',
                                    name: 'b',
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
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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

    pass(`(a,b,...c) => 0 + 1`, {
                source: '(a,b,...c) => 0 + 1',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                right: {
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
                                operator: '+',
                                start: 14,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            params: [{
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
                                    type: 'Identifier',
                                    name: 'b',
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
                                    type: 'RestElement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'c',
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
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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
                    }],
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

    pass(`() => (a) = 0`, {
                source: '() => (a) = 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                operator: '=',
                                right: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
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
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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

    pass(`a => b => c => 0`, {
                source: 'a => b => c => 0',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'ArrowFunctionExpression',
                                    body: {
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
                                    params: [{
                                        type: 'Identifier',
                                        name: 'c',
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
                                    }],
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: true,
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
                                params: [{
                                    type: 'Identifier',
                                    name: 'b',
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
                                }],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 5,
                                end: 16,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 16
                                    }
                                }
                            },
                            params: [{
                                type: 'Identifier',
                                name: 'a',
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
                            }],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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

    pass(`(e) => "test"`, {
                source: '(e) => "test"',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Literal',
                                    value: 'test',
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
                                    },
                                    raw: '"test"'
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'e',
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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

    pass(`(x)=>{}`, {
                source: `async () => {}
                () => {}
                async b => {}
                async b => {}
                async () => {}
                async () => {}
                () => {}
                a => {}
                a => {}
                async () => {}
                () => {}
                a => {}
                async () => {}
                () => {}
                async () => {}
                a => {}
                async () => {}
                async () => {}
                () => {}`,
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 12,
                                    end: 14,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 14
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
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
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 37,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 22
                                        },
                                        end: {
                                            line: 2,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 31,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 16
                                    },
                                    end: {
                                        line: 2,
                                        column: 24
                                    }
                                }
                            },
                            start: 31,
                            end: 39,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 16
                                },
                                end: {
                                    line: 2,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 67,
                                    end: 69,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 27
                                        },
                                        end: {
                                            line: 3,
                                            column: 29
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 62,
                                        end: 63,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 22
                                            },
                                            end: {
                                                line: 3,
                                                column: 23
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 56,
                                end: 69,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 16
                                    },
                                    end: {
                                        line: 3,
                                        column: 29
                                    }
                                }
                            },
                            start: 56,
                            end: 69,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 16
                                },
                                end: {
                                    line: 3,
                                    column: 29
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 97,
                                    end: 99,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 27
                                        },
                                        end: {
                                            line: 4,
                                            column: 29
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 92,
                                        end: 93,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 22
                                            },
                                            end: {
                                                line: 4,
                                                column: 23
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 86,
                                end: 99,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 16
                                    },
                                    end: {
                                        line: 4,
                                        column: 29
                                    }
                                }
                            },
                            start: 86,
                            end: 99,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 16
                                },
                                end: {
                                    line: 4,
                                    column: 29
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 128,
                                    end: 130,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 28
                                        },
                                        end: {
                                            line: 5,
                                            column: 30
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 116,
                                end: 130,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 16
                                    },
                                    end: {
                                        line: 5,
                                        column: 30
                                    }
                                }
                            },
                            start: 116,
                            end: 130,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 16
                                },
                                end: {
                                    line: 5,
                                    column: 30
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 159,
                                    end: 161,
                                    loc: {
                                        start: {
                                            line: 6,
                                            column: 28
                                        },
                                        end: {
                                            line: 6,
                                            column: 30
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 147,
                                end: 161,
                                loc: {
                                    start: {
                                        line: 6,
                                        column: 16
                                    },
                                    end: {
                                        line: 6,
                                        column: 30
                                    }
                                }
                            },
                            start: 147,
                            end: 161,
                            loc: {
                                start: {
                                    line: 6,
                                    column: 16
                                },
                                end: {
                                    line: 6,
                                    column: 30
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 184,
                                    end: 186,
                                    loc: {
                                        start: {
                                            line: 7,
                                            column: 22
                                        },
                                        end: {
                                            line: 7,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 178,
                                end: 186,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 16
                                    },
                                    end: {
                                        line: 7,
                                        column: 24
                                    }
                                }
                            },
                            start: 178,
                            end: 186,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 16
                                },
                                end: {
                                    line: 7,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 208,
                                    end: 210,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 21
                                        },
                                        end: {
                                            line: 8,
                                            column: 23
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 203,
                                        end: 204,
                                        loc: {
                                            start: {
                                                line: 8,
                                                column: 16
                                            },
                                            end: {
                                                line: 8,
                                                column: 17
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 203,
                                end: 210,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 16
                                    },
                                    end: {
                                        line: 8,
                                        column: 23
                                    }
                                }
                            },
                            start: 203,
                            end: 210,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 16
                                },
                                end: {
                                    line: 8,
                                    column: 23
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 232,
                                    end: 234,
                                    loc: {
                                        start: {
                                            line: 9,
                                            column: 21
                                        },
                                        end: {
                                            line: 9,
                                            column: 23
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 227,
                                        end: 228,
                                        loc: {
                                            start: {
                                                line: 9,
                                                column: 16
                                            },
                                            end: {
                                                line: 9,
                                                column: 17
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 227,
                                end: 234,
                                loc: {
                                    start: {
                                        line: 9,
                                        column: 16
                                    },
                                    end: {
                                        line: 9,
                                        column: 23
                                    }
                                }
                            },
                            start: 227,
                            end: 234,
                            loc: {
                                start: {
                                    line: 9,
                                    column: 16
                                },
                                end: {
                                    line: 9,
                                    column: 23
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 263,
                                    end: 265,
                                    loc: {
                                        start: {
                                            line: 10,
                                            column: 28
                                        },
                                        end: {
                                            line: 10,
                                            column: 30
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 251,
                                end: 265,
                                loc: {
                                    start: {
                                        line: 10,
                                        column: 16
                                    },
                                    end: {
                                        line: 10,
                                        column: 30
                                    }
                                }
                            },
                            start: 251,
                            end: 265,
                            loc: {
                                start: {
                                    line: 10,
                                    column: 16
                                },
                                end: {
                                    line: 10,
                                    column: 30
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 288,
                                    end: 290,
                                    loc: {
                                        start: {
                                            line: 11,
                                            column: 22
                                        },
                                        end: {
                                            line: 11,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 282,
                                end: 290,
                                loc: {
                                    start: {
                                        line: 11,
                                        column: 16
                                    },
                                    end: {
                                        line: 11,
                                        column: 24
                                    }
                                }
                            },
                            start: 282,
                            end: 290,
                            loc: {
                                start: {
                                    line: 11,
                                    column: 16
                                },
                                end: {
                                    line: 11,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 312,
                                    end: 314,
                                    loc: {
                                        start: {
                                            line: 12,
                                            column: 21
                                        },
                                        end: {
                                            line: 12,
                                            column: 23
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 307,
                                        end: 308,
                                        loc: {
                                            start: {
                                                line: 12,
                                                column: 16
                                            },
                                            end: {
                                                line: 12,
                                                column: 17
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 307,
                                end: 314,
                                loc: {
                                    start: {
                                        line: 12,
                                        column: 16
                                    },
                                    end: {
                                        line: 12,
                                        column: 23
                                    }
                                }
                            },
                            start: 307,
                            end: 314,
                            loc: {
                                start: {
                                    line: 12,
                                    column: 16
                                },
                                end: {
                                    line: 12,
                                    column: 23
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 343,
                                    end: 345,
                                    loc: {
                                        start: {
                                            line: 13,
                                            column: 28
                                        },
                                        end: {
                                            line: 13,
                                            column: 30
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 331,
                                end: 345,
                                loc: {
                                    start: {
                                        line: 13,
                                        column: 16
                                    },
                                    end: {
                                        line: 13,
                                        column: 30
                                    }
                                }
                            },
                            start: 331,
                            end: 345,
                            loc: {
                                start: {
                                    line: 13,
                                    column: 16
                                },
                                end: {
                                    line: 13,
                                    column: 30
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 368,
                                    end: 370,
                                    loc: {
                                        start: {
                                            line: 14,
                                            column: 22
                                        },
                                        end: {
                                            line: 14,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 362,
                                end: 370,
                                loc: {
                                    start: {
                                        line: 14,
                                        column: 16
                                    },
                                    end: {
                                        line: 14,
                                        column: 24
                                    }
                                }
                            },
                            start: 362,
                            end: 370,
                            loc: {
                                start: {
                                    line: 14,
                                    column: 16
                                },
                                end: {
                                    line: 14,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 399,
                                    end: 401,
                                    loc: {
                                        start: {
                                            line: 15,
                                            column: 28
                                        },
                                        end: {
                                            line: 15,
                                            column: 30
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 387,
                                end: 401,
                                loc: {
                                    start: {
                                        line: 15,
                                        column: 16
                                    },
                                    end: {
                                        line: 15,
                                        column: 30
                                    }
                                }
                            },
                            start: 387,
                            end: 401,
                            loc: {
                                start: {
                                    line: 15,
                                    column: 16
                                },
                                end: {
                                    line: 15,
                                    column: 30
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 423,
                                    end: 425,
                                    loc: {
                                        start: {
                                            line: 16,
                                            column: 21
                                        },
                                        end: {
                                            line: 16,
                                            column: 23
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 418,
                                        end: 419,
                                        loc: {
                                            start: {
                                                line: 16,
                                                column: 16
                                            },
                                            end: {
                                                line: 16,
                                                column: 17
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 418,
                                end: 425,
                                loc: {
                                    start: {
                                        line: 16,
                                        column: 16
                                    },
                                    end: {
                                        line: 16,
                                        column: 23
                                    }
                                }
                            },
                            start: 418,
                            end: 425,
                            loc: {
                                start: {
                                    line: 16,
                                    column: 16
                                },
                                end: {
                                    line: 16,
                                    column: 23
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 454,
                                    end: 456,
                                    loc: {
                                        start: {
                                            line: 17,
                                            column: 28
                                        },
                                        end: {
                                            line: 17,
                                            column: 30
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 442,
                                end: 456,
                                loc: {
                                    start: {
                                        line: 17,
                                        column: 16
                                    },
                                    end: {
                                        line: 17,
                                        column: 30
                                    }
                                }
                            },
                            start: 442,
                            end: 456,
                            loc: {
                                start: {
                                    line: 17,
                                    column: 16
                                },
                                end: {
                                    line: 17,
                                    column: 30
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 485,
                                    end: 487,
                                    loc: {
                                        start: {
                                            line: 18,
                                            column: 28
                                        },
                                        end: {
                                            line: 18,
                                            column: 30
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 473,
                                end: 487,
                                loc: {
                                    start: {
                                        line: 18,
                                        column: 16
                                    },
                                    end: {
                                        line: 18,
                                        column: 30
                                    }
                                }
                            },
                            start: 473,
                            end: 487,
                            loc: {
                                start: {
                                    line: 18,
                                    column: 16
                                },
                                end: {
                                    line: 18,
                                    column: 30
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 510,
                                    end: 512,
                                    loc: {
                                        start: {
                                            line: 19,
                                            column: 22
                                        },
                                        end: {
                                            line: 19,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 504,
                                end: 512,
                                loc: {
                                    start: {
                                        line: 19,
                                        column: 16
                                    },
                                    end: {
                                        line: 19,
                                        column: 24
                                    }
                                }
                            },
                            start: 504,
                            end: 512,
                            loc: {
                                start: {
                                    line: 19,
                                    column: 16
                                },
                                end: {
                                    line: 19,
                                    column: 24
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 512,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 19,
                            column: 24
                        }
                    }
                }
            });

    pass(`a => a => a => async a => a`, {
                source: `() => {}
                () => {}
                a => {}
                b => {
                async cherow => cherow(a, b, c);
                }
                () => {}
                () => {
                  a = a.b.c(a,b)
                  a = () => {
                  async () => {}
                  }
                }
                ((a, b) => { return a + b.d.e.a; })(1, 5), 6
                async b => {}
                async b => {}
                async a => {}
                ((a, b) => { return a + b; })(1, 5), () => {
                  async cherow => a.b.c.d.e.f.g
                }
                () => {
                  async a => {}
                }
                ((a, b))
                a = () => {}
                () => {}
                async cherow => a
                (async cherow => a)(b)`,
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 6,
                                    end: 8,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 8
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
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
                                }
                            },
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
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 31,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 22
                                        },
                                        end: {
                                            line: 2,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 25,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 16
                                    },
                                    end: {
                                        line: 2,
                                        column: 24
                                    }
                                }
                            },
                            start: 25,
                            end: 33,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 16
                                },
                                end: {
                                    line: 2,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 55,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 21
                                        },
                                        end: {
                                            line: 3,
                                            column: 23
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 50,
                                        end: 51,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 16
                                            },
                                            end: {
                                                line: 3,
                                                column: 17
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 50,
                                end: 57,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 16
                                    },
                                    end: {
                                        line: 3,
                                        column: 23
                                    }
                                }
                            },
                            start: 50,
                            end: 57,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 16
                                },
                                end: {
                                    line: 3,
                                    column: 23
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'ArrowFunctionExpression',
                                                body: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'cherow',
                                                        start: 113,
                                                        end: 119,
                                                        loc: {
                                                            start: {
                                                                line: 5,
                                                                column: 32
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 38
                                                            }
                                                        }
                                                    },
                                                    arguments: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'a',
                                                            start: 120,
                                                            end: 121,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 39
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 40
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'b',
                                                            start: 123,
                                                            end: 124,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 42
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 43
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'c',
                                                            start: 126,
                                                            end: 127,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 45
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 46
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 113,
                                                    end: 128,
                                                    loc: {
                                                        start: {
                                                            line: 5,
                                                            column: 32
                                                        },
                                                        end: {
                                                            line: 5,
                                                            column: 47
                                                        }
                                                    }
                                                },
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'cherow',
                                                        start: 103,
                                                        end: 109,
                                                        loc: {
                                                            start: {
                                                                line: 5,
                                                                column: 22
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 28
                                                            }
                                                        }
                                                    }
                                                ],
                                                id: null,
                                                async: true,
                                                generator: false,
                                                expression: true,
                                                start: 97,
                                                end: 128,
                                                loc: {
                                                    start: {
                                                        line: 5,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 47
                                                    }
                                                }
                                            },
                                            start: 97,
                                            end: 129,
                                            loc: {
                                                start: {
                                                    line: 5,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 5,
                                                    column: 48
                                                }
                                            }
                                        }
                                    ],
                                    start: 79,
                                    end: 147,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 21
                                        },
                                        end: {
                                            line: 6,
                                            column: 17
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 74,
                                        end: 75,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 16
                                            },
                                            end: {
                                                line: 4,
                                                column: 17
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 74,
                                end: 147,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 16
                                    },
                                    end: {
                                        line: 6,
                                        column: 17
                                    }
                                }
                            },
                            start: 74,
                            end: 147,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 16
                                },
                                end: {
                                    line: 6,
                                    column: 17
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 170,
                                    end: 172,
                                    loc: {
                                        start: {
                                            line: 7,
                                            column: 22
                                        },
                                        end: {
                                            line: 7,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 164,
                                end: 172,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 16
                                    },
                                    end: {
                                        line: 7,
                                        column: 24
                                    }
                                }
                            },
                            start: 164,
                            end: 172,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 16
                                },
                                end: {
                                    line: 7,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
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
                                                    start: 215,
                                                    end: 216,
                                                    loc: {
                                                        start: {
                                                            line: 9,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 9,
                                                            column: 19
                                                        }
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'MemberExpression',
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'a',
                                                                start: 219,
                                                                end: 220,
                                                                loc: {
                                                                    start: {
                                                                        line: 9,
                                                                        column: 22
                                                                    },
                                                                    end: {
                                                                        line: 9,
                                                                        column: 23
                                                                    }
                                                                }
                                                            },
                                                            computed: false,
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'b',
                                                                start: 221,
                                                                end: 222,
                                                                loc: {
                                                                    start: {
                                                                        line: 9,
                                                                        column: 24
                                                                    },
                                                                    end: {
                                                                        line: 9,
                                                                        column: 25
                                                                    }
                                                                }
                                                            },
                                                            start: 219,
                                                            end: 222,
                                                            loc: {
                                                                start: {
                                                                    line: 9,
                                                                    column: 22
                                                                },
                                                                end: {
                                                                    line: 9,
                                                                    column: 25
                                                                }
                                                            }
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'c',
                                                            start: 223,
                                                            end: 224,
                                                            loc: {
                                                                start: {
                                                                    line: 9,
                                                                    column: 26
                                                                },
                                                                end: {
                                                                    line: 9,
                                                                    column: 27
                                                                }
                                                            }
                                                        },
                                                        start: 219,
                                                        end: 224,
                                                        loc: {
                                                            start: {
                                                                line: 9,
                                                                column: 22
                                                            },
                                                            end: {
                                                                line: 9,
                                                                column: 27
                                                            }
                                                        }
                                                    },
                                                    arguments: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'a',
                                                            start: 225,
                                                            end: 226,
                                                            loc: {
                                                                start: {
                                                                    line: 9,
                                                                    column: 28
                                                                },
                                                                end: {
                                                                    line: 9,
                                                                    column: 29
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'Identifier',
                                                            name: 'b',
                                                            start: 227,
                                                            end: 228,
                                                            loc: {
                                                                start: {
                                                                    line: 9,
                                                                    column: 30
                                                                },
                                                                end: {
                                                                    line: 9,
                                                                    column: 31
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 219,
                                                    end: 229,
                                                    loc: {
                                                        start: {
                                                            line: 9,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 9,
                                                            column: 32
                                                        }
                                                    }
                                                },
                                                start: 215,
                                                end: 229,
                                                loc: {
                                                    start: {
                                                        line: 9,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 9,
                                                        column: 32
                                                    }
                                                }
                                            },
                                            start: 215,
                                            end: 229,
                                            loc: {
                                                start: {
                                                    line: 9,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 9,
                                                    column: 32
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    start: 248,
                                                    end: 249,
                                                    loc: {
                                                        start: {
                                                            line: 10,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 10,
                                                            column: 19
                                                        }
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'ArrowFunctionExpression',
                                                    body: {
                                                        type: 'BlockStatement',
                                                        body: [
                                                            {
                                                                type: 'ExpressionStatement',
                                                                expression: {
                                                                    type: 'ArrowFunctionExpression',
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [],
                                                                        start: 290,
                                                                        end: 292,
                                                                        loc: {
                                                                            start: {
                                                                                line: 11,
                                                                                column: 30
                                                                            },
                                                                            end: {
                                                                                line: 11,
                                                                                column: 32
                                                                            }
                                                                        }
                                                                    },
                                                                    params: [],
                                                                    id: null,
                                                                    async: true,
                                                                    generator: false,
                                                                    expression: false,
                                                                    start: 278,
                                                                    end: 292,
                                                                    loc: {
                                                                        start: {
                                                                            line: 11,
                                                                            column: 18
                                                                        },
                                                                        end: {
                                                                            line: 11,
                                                                            column: 32
                                                                        }
                                                                    }
                                                                },
                                                                start: 278,
                                                                end: 292,
                                                                loc: {
                                                                    start: {
                                                                        line: 11,
                                                                        column: 18
                                                                    },
                                                                    end: {
                                                                        line: 11,
                                                                        column: 32
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 258,
                                                        end: 312,
                                                        loc: {
                                                            start: {
                                                                line: 10,
                                                                column: 28
                                                            },
                                                            end: {
                                                                line: 12,
                                                                column: 19
                                                            }
                                                        }
                                                    },
                                                    params: [],
                                                    id: null,
                                                    async: false,
                                                    generator: false,
                                                    expression: false,
                                                    start: 252,
                                                    end: 312,
                                                    loc: {
                                                        start: {
                                                            line: 10,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 12,
                                                            column: 19
                                                        }
                                                    }
                                                },
                                                start: 248,
                                                end: 312,
                                                loc: {
                                                    start: {
                                                        line: 10,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 12,
                                                        column: 19
                                                    }
                                                }
                                            },
                                            start: 248,
                                            end: 312,
                                            loc: {
                                                start: {
                                                    line: 10,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 12,
                                                    column: 19
                                                }
                                            }
                                        }
                                    ],
                                    start: 195,
                                    end: 330,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 22
                                        },
                                        end: {
                                            line: 13,
                                            column: 17
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 189,
                                end: 330,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 16
                                    },
                                    end: {
                                        line: 13,
                                        column: 17
                                    }
                                }
                            },
                            start: 189,
                            end: 330,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 16
                                },
                                end: {
                                    line: 13,
                                    column: 17
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'SequenceExpression',
                                expressions: [
                                    {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'BinaryExpression',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'a',
                                                                start: 367,
                                                                end: 368,
                                                                loc: {
                                                                    start: {
                                                                        line: 14,
                                                                        column: 36
                                                                    },
                                                                    end: {
                                                                        line: 14,
                                                                        column: 37
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        object: {
                                                                            type: 'Identifier',
                                                                            name: 'b',
                                                                            start: 371,
                                                                            end: 372,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 14,
                                                                                    column: 40
                                                                                },
                                                                                end: {
                                                                                    line: 14,
                                                                                    column: 41
                                                                                }
                                                                            }
                                                                        },
                                                                        computed: false,
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'd',
                                                                            start: 373,
                                                                            end: 374,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 14,
                                                                                    column: 42
                                                                                },
                                                                                end: {
                                                                                    line: 14,
                                                                                    column: 43
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 371,
                                                                        end: 374,
                                                                        loc: {
                                                                            start: {
                                                                                line: 14,
                                                                                column: 40
                                                                            },
                                                                            end: {
                                                                                line: 14,
                                                                                column: 43
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'e',
                                                                        start: 375,
                                                                        end: 376,
                                                                        loc: {
                                                                            start: {
                                                                                line: 14,
                                                                                column: 44
                                                                            },
                                                                            end: {
                                                                                line: 14,
                                                                                column: 45
                                                                            }
                                                                        }
                                                                    },
                                                                    start: 371,
                                                                    end: 376,
                                                                    loc: {
                                                                        start: {
                                                                            line: 14,
                                                                            column: 40
                                                                        },
                                                                        end: {
                                                                            line: 14,
                                                                            column: 45
                                                                        }
                                                                    }
                                                                },
                                                                computed: false,
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'a',
                                                                    start: 377,
                                                                    end: 378,
                                                                    loc: {
                                                                        start: {
                                                                            line: 14,
                                                                            column: 46
                                                                        },
                                                                        end: {
                                                                            line: 14,
                                                                            column: 47
                                                                        }
                                                                    }
                                                                },
                                                                start: 371,
                                                                end: 378,
                                                                loc: {
                                                                    start: {
                                                                        line: 14,
                                                                        column: 40
                                                                    },
                                                                    end: {
                                                                        line: 14,
                                                                        column: 47
                                                                    }
                                                                }
                                                            },
                                                            operator: '+',
                                                            start: 367,
                                                            end: 378,
                                                            loc: {
                                                                start: {
                                                                    line: 14,
                                                                    column: 36
                                                                },
                                                                end: {
                                                                    line: 14,
                                                                    column: 47
                                                                }
                                                            }
                                                        },
                                                        start: 360,
                                                        end: 379,
                                                        loc: {
                                                            start: {
                                                                line: 14,
                                                                column: 29
                                                            },
                                                            end: {
                                                                line: 14,
                                                                column: 48
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 358,
                                                end: 381,
                                                loc: {
                                                    start: {
                                                        line: 14,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 14,
                                                        column: 50
                                                    }
                                                }
                                            },
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    start: 349,
                                                    end: 350,
                                                    loc: {
                                                        start: {
                                                            line: 14,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 14,
                                                            column: 19
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    start: 352,
                                                    end: 353,
                                                    loc: {
                                                        start: {
                                                            line: 14,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 14,
                                                            column: 22
                                                        }
                                                    }
                                                }
                                            ],
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            start: 348,
                                            end: 381,
                                            loc: {
                                                start: {
                                                    line: 14,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 14,
                                                    column: 50
                                                }
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Literal',
                                                value: 1,
                                                start: 383,
                                                end: 384,
                                                loc: {
                                                    start: {
                                                        line: 14,
                                                        column: 52
                                                    },
                                                    end: {
                                                        line: 14,
                                                        column: 53
                                                    }
                                                },
                                                raw: '1'
                                            },
                                            {
                                                type: 'Literal',
                                                value: 5,
                                                start: 386,
                                                end: 387,
                                                loc: {
                                                    start: {
                                                        line: 14,
                                                        column: 55
                                                    },
                                                    end: {
                                                        line: 14,
                                                        column: 56
                                                    }
                                                },
                                                raw: '5'
                                            }
                                        ],
                                        start: 347,
                                        end: 388,
                                        loc: {
                                            start: {
                                                line: 14,
                                                column: 16
                                            },
                                            end: {
                                                line: 14,
                                                column: 57
                                            }
                                        }
                                    },
                                    {
                                        type: 'Literal',
                                        value: 6,
                                        start: 390,
                                        end: 391,
                                        loc: {
                                            start: {
                                                line: 14,
                                                column: 59
                                            },
                                            end: {
                                                line: 14,
                                                column: 60
                                            }
                                        },
                                        raw: '6'
                                    }
                                ],
                                start: 347,
                                end: 391,
                                loc: {
                                    start: {
                                        line: 14,
                                        column: 16
                                    },
                                    end: {
                                        line: 14,
                                        column: 60
                                    }
                                }
                            },
                            start: 347,
                            end: 391,
                            loc: {
                                start: {
                                    line: 14,
                                    column: 16
                                },
                                end: {
                                    line: 14,
                                    column: 60
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 419,
                                    end: 421,
                                    loc: {
                                        start: {
                                            line: 15,
                                            column: 27
                                        },
                                        end: {
                                            line: 15,
                                            column: 29
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 414,
                                        end: 415,
                                        loc: {
                                            start: {
                                                line: 15,
                                                column: 22
                                            },
                                            end: {
                                                line: 15,
                                                column: 23
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 408,
                                end: 421,
                                loc: {
                                    start: {
                                        line: 15,
                                        column: 16
                                    },
                                    end: {
                                        line: 15,
                                        column: 29
                                    }
                                }
                            },
                            start: 408,
                            end: 421,
                            loc: {
                                start: {
                                    line: 15,
                                    column: 16
                                },
                                end: {
                                    line: 15,
                                    column: 29
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 449,
                                    end: 451,
                                    loc: {
                                        start: {
                                            line: 16,
                                            column: 27
                                        },
                                        end: {
                                            line: 16,
                                            column: 29
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 444,
                                        end: 445,
                                        loc: {
                                            start: {
                                                line: 16,
                                                column: 22
                                            },
                                            end: {
                                                line: 16,
                                                column: 23
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 438,
                                end: 451,
                                loc: {
                                    start: {
                                        line: 16,
                                        column: 16
                                    },
                                    end: {
                                        line: 16,
                                        column: 29
                                    }
                                }
                            },
                            start: 438,
                            end: 451,
                            loc: {
                                start: {
                                    line: 16,
                                    column: 16
                                },
                                end: {
                                    line: 16,
                                    column: 29
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 479,
                                    end: 481,
                                    loc: {
                                        start: {
                                            line: 17,
                                            column: 27
                                        },
                                        end: {
                                            line: 17,
                                            column: 29
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 474,
                                        end: 475,
                                        loc: {
                                            start: {
                                                line: 17,
                                                column: 22
                                            },
                                            end: {
                                                line: 17,
                                                column: 23
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: true,
                                generator: false,
                                expression: false,
                                start: 468,
                                end: 481,
                                loc: {
                                    start: {
                                        line: 17,
                                        column: 16
                                    },
                                    end: {
                                        line: 17,
                                        column: 29
                                    }
                                }
                            },
                            start: 468,
                            end: 481,
                            loc: {
                                start: {
                                    line: 17,
                                    column: 16
                                },
                                end: {
                                    line: 17,
                                    column: 29
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'SequenceExpression',
                                expressions: [
                                    {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'BinaryExpression',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'a',
                                                                start: 518,
                                                                end: 519,
                                                                loc: {
                                                                    start: {
                                                                        line: 18,
                                                                        column: 36
                                                                    },
                                                                    end: {
                                                                        line: 18,
                                                                        column: 37
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'Identifier',
                                                                name: 'b',
                                                                start: 522,
                                                                end: 523,
                                                                loc: {
                                                                    start: {
                                                                        line: 18,
                                                                        column: 40
                                                                    },
                                                                    end: {
                                                                        line: 18,
                                                                        column: 41
                                                                    }
                                                                }
                                                            },
                                                            operator: '+',
                                                            start: 518,
                                                            end: 523,
                                                            loc: {
                                                                start: {
                                                                    line: 18,
                                                                    column: 36
                                                                },
                                                                end: {
                                                                    line: 18,
                                                                    column: 41
                                                                }
                                                            }
                                                        },
                                                        start: 511,
                                                        end: 524,
                                                        loc: {
                                                            start: {
                                                                line: 18,
                                                                column: 29
                                                            },
                                                            end: {
                                                                line: 18,
                                                                column: 42
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 509,
                                                end: 526,
                                                loc: {
                                                    start: {
                                                        line: 18,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 18,
                                                        column: 44
                                                    }
                                                }
                                            },
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    start: 500,
                                                    end: 501,
                                                    loc: {
                                                        start: {
                                                            line: 18,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 18,
                                                            column: 19
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    start: 503,
                                                    end: 504,
                                                    loc: {
                                                        start: {
                                                            line: 18,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 18,
                                                            column: 22
                                                        }
                                                    }
                                                }
                                            ],
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            start: 499,
                                            end: 526,
                                            loc: {
                                                start: {
                                                    line: 18,
                                                    column: 17
                                                },
                                                end: {
                                                    line: 18,
                                                    column: 44
                                                }
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'Literal',
                                                value: 1,
                                                start: 528,
                                                end: 529,
                                                loc: {
                                                    start: {
                                                        line: 18,
                                                        column: 46
                                                    },
                                                    end: {
                                                        line: 18,
                                                        column: 47
                                                    }
                                                },
                                                raw: '1'
                                            },
                                            {
                                                type: 'Literal',
                                                value: 5,
                                                start: 531,
                                                end: 532,
                                                loc: {
                                                    start: {
                                                        line: 18,
                                                        column: 49
                                                    },
                                                    end: {
                                                        line: 18,
                                                        column: 50
                                                    }
                                                },
                                                raw: '5'
                                            }
                                        ],
                                        start: 498,
                                        end: 533,
                                        loc: {
                                            start: {
                                                line: 18,
                                                column: 16
                                            },
                                            end: {
                                                line: 18,
                                                column: 51
                                            }
                                        }
                                    },
                                    {
                                        type: 'ArrowFunctionExpression',
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'ArrowFunctionExpression',
                                                        body: {
                                                            type: 'MemberExpression',
                                                            object: {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'MemberExpression',
                                                                        object: {
                                                                            type: 'MemberExpression',
                                                                            object: {
                                                                                type: 'MemberExpression',
                                                                                object: {
                                                                                    type: 'Identifier',
                                                                                    name: 'a',
                                                                                    start: 577,
                                                                                    end: 578,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 19,
                                                                                            column: 34
                                                                                        },
                                                                                        end: {
                                                                                            line: 19,
                                                                                            column: 35
                                                                                        }
                                                                                    }
                                                                                },
                                                                                computed: false,
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'b',
                                                                                    start: 579,
                                                                                    end: 580,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 19,
                                                                                            column: 36
                                                                                        },
                                                                                        end: {
                                                                                            line: 19,
                                                                                            column: 37
                                                                                        }
                                                                                    }
                                                                                },
                                                                                start: 577,
                                                                                end: 580,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 19,
                                                                                        column: 34
                                                                                    },
                                                                                    end: {
                                                                                        line: 19,
                                                                                        column: 37
                                                                                    }
                                                                                }
                                                                            },
                                                                            computed: false,
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: 'c',
                                                                                start: 581,
                                                                                end: 582,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 19,
                                                                                        column: 38
                                                                                    },
                                                                                    end: {
                                                                                        line: 19,
                                                                                        column: 39
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 577,
                                                                            end: 582,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 19,
                                                                                    column: 34
                                                                                },
                                                                                end: {
                                                                                    line: 19,
                                                                                    column: 39
                                                                                }
                                                                            }
                                                                        },
                                                                        computed: false,
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'd',
                                                                            start: 583,
                                                                            end: 584,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 19,
                                                                                    column: 40
                                                                                },
                                                                                end: {
                                                                                    line: 19,
                                                                                    column: 41
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 577,
                                                                        end: 584,
                                                                        loc: {
                                                                            start: {
                                                                                line: 19,
                                                                                column: 34
                                                                            },
                                                                            end: {
                                                                                line: 19,
                                                                                column: 41
                                                                            }
                                                                        }
                                                                    },
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'e',
                                                                        start: 585,
                                                                        end: 586,
                                                                        loc: {
                                                                            start: {
                                                                                line: 19,
                                                                                column: 42
                                                                            },
                                                                            end: {
                                                                                line: 19,
                                                                                column: 43
                                                                            }
                                                                        }
                                                                    },
                                                                    start: 577,
                                                                    end: 586,
                                                                    loc: {
                                                                        start: {
                                                                            line: 19,
                                                                            column: 34
                                                                        },
                                                                        end: {
                                                                            line: 19,
                                                                            column: 43
                                                                        }
                                                                    }
                                                                },
                                                                computed: false,
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'f',
                                                                    start: 587,
                                                                    end: 588,
                                                                    loc: {
                                                                        start: {
                                                                            line: 19,
                                                                            column: 44
                                                                        },
                                                                        end: {
                                                                            line: 19,
                                                                            column: 45
                                                                        }
                                                                    }
                                                                },
                                                                start: 577,
                                                                end: 588,
                                                                loc: {
                                                                    start: {
                                                                        line: 19,
                                                                        column: 34
                                                                    },
                                                                    end: {
                                                                        line: 19,
                                                                        column: 45
                                                                    }
                                                                }
                                                            },
                                                            computed: false,
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'g',
                                                                start: 589,
                                                                end: 590,
                                                                loc: {
                                                                    start: {
                                                                        line: 19,
                                                                        column: 46
                                                                    },
                                                                    end: {
                                                                        line: 19,
                                                                        column: 47
                                                                    }
                                                                }
                                                            },
                                                            start: 577,
                                                            end: 590,
                                                            loc: {
                                                                start: {
                                                                    line: 19,
                                                                    column: 34
                                                                },
                                                                end: {
                                                                    line: 19,
                                                                    column: 47
                                                                }
                                                            }
                                                        },
                                                        params: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'cherow',
                                                                start: 567,
                                                                end: 573,
                                                                loc: {
                                                                    start: {
                                                                        line: 19,
                                                                        column: 24
                                                                    },
                                                                    end: {
                                                                        line: 19,
                                                                        column: 30
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        id: null,
                                                        async: true,
                                                        generator: false,
                                                        expression: true,
                                                        start: 561,
                                                        end: 590,
                                                        loc: {
                                                            start: {
                                                                line: 19,
                                                                column: 18
                                                            },
                                                            end: {
                                                                line: 19,
                                                                column: 47
                                                            }
                                                        }
                                                    },
                                                    start: 561,
                                                    end: 590,
                                                    loc: {
                                                        start: {
                                                            line: 19,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 19,
                                                            column: 47
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 541,
                                            end: 608,
                                            loc: {
                                                start: {
                                                    line: 18,
                                                    column: 59
                                                },
                                                end: {
                                                    line: 20,
                                                    column: 17
                                                }
                                            }
                                        },
                                        params: [],
                                        id: null,
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        start: 535,
                                        end: 608,
                                        loc: {
                                            start: {
                                                line: 18,
                                                column: 53
                                            },
                                            end: {
                                                line: 20,
                                                column: 17
                                            }
                                        }
                                    }
                                ],
                                start: 498,
                                end: 608,
                                loc: {
                                    start: {
                                        line: 18,
                                        column: 16
                                    },
                                    end: {
                                        line: 20,
                                        column: 17
                                    }
                                }
                            },
                            start: 498,
                            end: 608,
                            loc: {
                                start: {
                                    line: 18,
                                    column: 16
                                },
                                end: {
                                    line: 20,
                                    column: 17
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'ArrowFunctionExpression',
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
                                                    start: 662,
                                                    end: 664,
                                                    loc: {
                                                        start: {
                                                            line: 22,
                                                            column: 29
                                                        },
                                                        end: {
                                                            line: 22,
                                                            column: 31
                                                        }
                                                    }
                                                },
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'a',
                                                        start: 657,
                                                        end: 658,
                                                        loc: {
                                                            start: {
                                                                line: 22,
                                                                column: 24
                                                            },
                                                            end: {
                                                                line: 22,
                                                                column: 25
                                                            }
                                                        }
                                                    }
                                                ],
                                                id: null,
                                                async: true,
                                                generator: false,
                                                expression: false,
                                                start: 651,
                                                end: 664,
                                                loc: {
                                                    start: {
                                                        line: 22,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 22,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            start: 651,
                                            end: 664,
                                            loc: {
                                                start: {
                                                    line: 22,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 22,
                                                    column: 31
                                                }
                                            }
                                        }
                                    ],
                                    start: 631,
                                    end: 682,
                                    loc: {
                                        start: {
                                            line: 21,
                                            column: 22
                                        },
                                        end: {
                                            line: 23,
                                            column: 17
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 625,
                                end: 682,
                                loc: {
                                    start: {
                                        line: 21,
                                        column: 16
                                    },
                                    end: {
                                        line: 23,
                                        column: 17
                                    }
                                }
                            },
                            start: 625,
                            end: 682,
                            loc: {
                                start: {
                                    line: 21,
                                    column: 16
                                },
                                end: {
                                    line: 23,
                                    column: 17
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'SequenceExpression',
                                expressions: [
                                    {
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 701,
                                        end: 702,
                                        loc: {
                                            start: {
                                                line: 24,
                                                column: 18
                                            },
                                            end: {
                                                line: 24,
                                                column: 19
                                            }
                                        }
                                    },
                                    {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 704,
                                        end: 705,
                                        loc: {
                                            start: {
                                                line: 24,
                                                column: 21
                                            },
                                            end: {
                                                line: 24,
                                                column: 22
                                            }
                                        }
                                    }
                                ],
                                start: 701,
                                end: 705,
                                loc: {
                                    start: {
                                        line: 24,
                                        column: 18
                                    },
                                    end: {
                                        line: 24,
                                        column: 22
                                    }
                                }
                            },
                            start: 699,
                            end: 707,
                            loc: {
                                start: {
                                    line: 24,
                                    column: 16
                                },
                                end: {
                                    line: 24,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 724,
                                    end: 725,
                                    loc: {
                                        start: {
                                            line: 25,
                                            column: 16
                                        },
                                        end: {
                                            line: 25,
                                            column: 17
                                        }
                                    }
                                },
                                operator: '=',
                                right: {
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 734,
                                        end: 736,
                                        loc: {
                                            start: {
                                                line: 25,
                                                column: 26
                                            },
                                            end: {
                                                line: 25,
                                                column: 28
                                            }
                                        }
                                    },
                                    params: [],
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    start: 728,
                                    end: 736,
                                    loc: {
                                        start: {
                                            line: 25,
                                            column: 20
                                        },
                                        end: {
                                            line: 25,
                                            column: 28
                                        }
                                    }
                                },
                                start: 724,
                                end: 736,
                                loc: {
                                    start: {
                                        line: 25,
                                        column: 16
                                    },
                                    end: {
                                        line: 25,
                                        column: 28
                                    }
                                }
                            },
                            start: 724,
                            end: 736,
                            loc: {
                                start: {
                                    line: 25,
                                    column: 16
                                },
                                end: {
                                    line: 25,
                                    column: 28
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 759,
                                    end: 761,
                                    loc: {
                                        start: {
                                            line: 26,
                                            column: 22
                                        },
                                        end: {
                                            line: 26,
                                            column: 24
                                        }
                                    }
                                },
                                params: [],
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 753,
                                end: 761,
                                loc: {
                                    start: {
                                        line: 26,
                                        column: 16
                                    },
                                    end: {
                                        line: 26,
                                        column: 24
                                    }
                                }
                            },
                            start: 753,
                            end: 761,
                            loc: {
                                start: {
                                    line: 26,
                                    column: 16
                                },
                                end: {
                                    line: 26,
                                    column: 24
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 794,
                                            end: 795,
                                            loc: {
                                                start: {
                                                    line: 27,
                                                    column: 32
                                                },
                                                end: {
                                                    line: 27,
                                                    column: 33
                                                }
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'ArrowFunctionExpression',
                                                body: {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    start: 829,
                                                    end: 830,
                                                    loc: {
                                                        start: {
                                                            line: 28,
                                                            column: 33
                                                        },
                                                        end: {
                                                            line: 28,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'cherow',
                                                        start: 819,
                                                        end: 825,
                                                        loc: {
                                                            start: {
                                                                line: 28,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 28,
                                                                column: 29
                                                            }
                                                        }
                                                    }
                                                ],
                                                id: null,
                                                async: true,
                                                generator: false,
                                                expression: true,
                                                start: 813,
                                                end: 830,
                                                loc: {
                                                    start: {
                                                        line: 28,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 28,
                                                        column: 34
                                                    }
                                                }
                                            }
                                        ],
                                        start: 794,
                                        end: 831,
                                        loc: {
                                            start: {
                                                line: 27,
                                                column: 32
                                            },
                                            end: {
                                                line: 28,
                                                column: 35
                                            }
                                        }
                                    },
                                    arguments: [
                                        {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 832,
                                            end: 833,
                                            loc: {
                                                start: {
                                                    line: 28,
                                                    column: 36
                                                },
                                                end: {
                                                    line: 28,
                                                    column: 37
                                                }
                                            }
                                        }
                                    ],
                                    start: 794,
                                    end: 834,
                                    loc: {
                                        start: {
                                            line: 27,
                                            column: 32
                                        },
                                        end: {
                                            line: 28,
                                            column: 38
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'cherow',
                                        start: 784,
                                        end: 790,
                                        loc: {
                                            start: {
                                                line: 27,
                                                column: 22
                                            },
                                            end: {
                                                line: 27,
                                                column: 28
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: true,
                                generator: false,
                                expression: true,
                                start: 778,
                                end: 834,
                                loc: {
                                    start: {
                                        line: 27,
                                        column: 16
                                    },
                                    end: {
                                        line: 28,
                                        column: 38
                                    }
                                }
                            },
                            start: 778,
                            end: 834,
                            loc: {
                                start: {
                                    line: 27,
                                    column: 16
                                },
                                end: {
                                    line: 28,
                                    column: 38
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 834,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 28,
                            column: 38
                        }
                    }
                }
            });

    pass(`(x=1) => x * x`, {
                source: '(x=1) => x * x',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BinaryExpression',
                                    left: {
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
                                    right: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                    operator: '*',
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
                                    }
                                },
                                params: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
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
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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

    pass(`(a, ...[]) => 1`, {
                source: '(a, ...[]) => 1',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
                                params: [
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
                                            elements: [],
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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
                            },
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

    pass(`(x)=>{\'use strict\';}`, {
                source: '(x)=>{\'use strict\';}',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    body: [{
                        end: 20,
                        expression: {
                            async: false,
                            body: {
                                body: [{
                                    directive: 'use strict',
                                    end: 19,
                                    expression: {
                                        end: 18,
                                        loc: {
                                            end: {
                                                column: 18,
                                                line: 1,
                                            },
                                            start: {
                                                column: 6,
                                                line: 1,
                                            }
                                        },
                                        raw: '\'use strict\'',
                                        start: 6,
                                        type: 'Literal',
                                        value: 'use strict',
                                    },
                                    loc: {
                                        end: {
                                            column: 19,
                                            line: 1,
                                        },
                                        start: {
                                            column: 6,
                                            line: 1,
                                        }
                                    },
                                    start: 6,
                                    type: 'ExpressionStatement'
                                }],
                                end: 20,
                                loc: {
                                    end: {
                                        column: 20,
                                        line: 1,
                                    },
                                    start: {
                                        column: 5,
                                        line: 1,
                                    }
                                },
                                start: 5,
                                type: 'BlockStatement',
                            },
                            end: 20,
                            expression: false,
                            generator: false,
                            id: null,
                            loc: {
                                end: {
                                    column: 20,
                                    line: 1,
                                },
                                start: {
                                    column: 0,
                                    line: 1,
                                }
                            },
                            params: [{
                                end: 2,
                                loc: {
                                    end: {
                                        column: 2,
                                        line: 1,
                                    },
                                    start: {
                                        column: 1,
                                        line: 1,
                                    }
                                },
                                name: 'x',
                                start: 1,
                                type: 'Identifier'
                            }],
                            start: 0,
                            type: 'ArrowFunctionExpression',
                        },
                        loc: {
                            end: {
                                column: 20,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        start: 0,
                        type: 'ExpressionStatement',
                    }],
                    end: 20,
                    loc: {
                        end: {
                            column: 20,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    sourceType: 'script',
                    start: 0,
                    type: 'Program'
                }
            });

    pass(`async ({a = b}) => a;`, {
                source: 'async ({a = b}) => a;',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                params: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
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
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    left: {
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
                                                    right: {
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
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: true,
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
                                                }
                                            }
                                        ],
                                        start: 7,
                                        end: 14,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 14
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: true,
                                generator: false,
                                expression: true,
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

    pass(`({y}) => x;`, {
                source: '({y}) => x;',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
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
                                params: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'y',
                                                    start: 2,
                                                    end: 3,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 2
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 3
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Identifier',
                                                    name: 'y',
                                                    start: 2,
                                                    end: 3,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 2
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 3
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: true,
                                                start: 2,
                                                end: 3,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 2
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 3
                                                    }
                                                }
                                            }
                                        ],
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
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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

    pass(`([x = 10]) => x`, {
                source: '([x = 10]) => x',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
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
                                params: [
                                    {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'AssignmentPattern',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    start: 2,
                                                    end: 3,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 2
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 3
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Literal',
                                                    value: 10,
                                                    start: 6,
                                                    end: 8,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 6
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 8
                                                        }
                                                    },
                                                    raw: '10'
                                                },
                                                start: 2,
                                                end: 8,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 2
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 8
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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
                            },
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

    pass(`({x = 10, y: { z = 10 }}) => [x, z]`, {
                source: '({x = 10, y: { z = 10 }}) => [x, z]',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'ArrayExpression',
                                    elements: [
                                        {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 30,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            }
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'z',
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
                                        }
                                    ],
                                    start: 29,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 35
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    start: 2,
                                                    end: 3,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 2
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 3
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        start: 2,
                                                        end: 3,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 2
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 3
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 10,
                                                        start: 6,
                                                        end: 8,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 6
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 8
                                                            }
                                                        },
                                                        raw: '10'
                                                    },
                                                    start: 2,
                                                    end: 8,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 2
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 8
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: true,
                                                start: 2,
                                                end: 8,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 2
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 8
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'y',
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
                                                value: {
                                                    type: 'ObjectPattern',
                                                    properties: [
                                                        {
                                                            type: 'Property',
                                                            key: {
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
                                                            value: {
                                                                type: 'AssignmentPattern',
                                                                left: {
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
                                                                right: {
                                                                    type: 'Literal',
                                                                    value: 10,
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
                                                                    },
                                                                    raw: '10'
                                                                },
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
                                                            kind: 'init',
                                                            computed: false,
                                                            method: false,
                                                            shorthand: true,
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
                                                    start: 13,
                                                    end: 23,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 13
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 23
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 10,
                                                end: 23,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 10
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 23
                                                    }
                                                }
                                            }
                                        ],
                                        start: 1,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 1
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 0,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            },
                            start: 0,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }
            });

    pass(`({x = 10}) => x`, {
                source: '({x = 10}) => x',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
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
                                params: [
                                    {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    start: 2,
                                                    end: 3,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 2
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 3
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        start: 2,
                                                        end: 3,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 2
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 3
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 10,
                                                        start: 6,
                                                        end: 8,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 6
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 8
                                                            }
                                                        },
                                                        raw: '10'
                                                    },
                                                    start: 2,
                                                    end: 8,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 2
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 8
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: true,
                                                start: 2,
                                                end: 8,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 2
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 8
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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
                            },
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

    pass(`([y]) => x;`, {
                source: '([y]) => x;',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
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
                                params: [
                                    {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'Identifier',
                                                name: 'y',
                                                start: 2,
                                                end: 3,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 2
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 3
                                                    }
                                                }
                                            }
                                        ],
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
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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

    pass(`(x=1) => x * x;`, {
                source: '(x=1) => x * x;',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BinaryExpression',
                                    left: {
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
                                    right: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                    operator: '*',
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
                                    }
                                },
                                params: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                        right: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
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
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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

    pass(`(eval = 10) => 42;`, {
                source: '(eval = 10) => 42;',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'Literal',
                                    value: 42,
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
                                    },
                                    raw: '42'
                                },
                                params: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'eval',
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
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 10,
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
                                            },
                                            raw: '10'
                                        },
                                        start: 1,
                                        end: 10,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 1
                                            },
                                            end: {
                                                line: 1,
                                                column: 10
                                            }
                                        }
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
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

    pass(`(a, b=(c)=>{}) => {}`, {
                source: '(a, b=(c)=>{}) => {}',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
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
                                params: [
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
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'b',
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
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 11,
                                                end: 13,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 11
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 13
                                                    }
                                                }
                                            },
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                                }
                                            ],
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: false,
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
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
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

    pass(`(async function foo(a) { await a });`, {
                source: '(async function foo(a) { await a });',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'FunctionExpression',
                                params: [
                                    {
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
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AwaitExpression',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                async: true,
                                generator: false,
                                expression: false,
                                id: {
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
                                start: 1,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            start: 0,
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        }
                    ],
                    sourceType: 'script',
                    start: 0,
                    end: 36,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 36
                        }
                    }
                }
            });

    fail(`"use strict"; var af = (eval) => 1;`, {
                source: '"use strict"; var af = (eval) => 1;',
            });

    fail(`((a)) => 42;`, {
            source: '((a)) => 42;',
        });

    fail(`"use strict"; (eval = 10) => 42;`, {
            source: '"use strict"; (eval = 10) => 42;',
        });

    fail(`(a, (b)) => 42;`, {
            source: '(a, (b)) => 42;',
        });
    });
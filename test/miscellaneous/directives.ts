import { pass, fail } from '../test-utils';

describe('Miscellaneous - Directives', () => {

    pass('"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"', {
        source: '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"',
        expected: {
              body: [
                {
                  directive: '\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0',
                 expression: {
                    type: 'Literal',
                    value: '\n\r\t\u000b\b\f\\\'"\u0000',
                  },
                  type: 'ExpressionStatement'
                },
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass('"Hello\\312World"', {
        source: '"Hello\\312World"',
        expected: {
              body: [
               {
                  directive: 'Hello\\312World',
                  expression: {
                    type: 'Literal',
                    value: 'HelloÊWorld',
                  },
                  type: 'ExpressionStatement'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass('"Hello\\0World"', {
        source: '"Hello\\0World"',
        expected: {
              body: [
                {
                  directive: 'Hello\\0World',
                  expression: {
                    type: 'Literal',
                    value: 'Hello\u0000World',
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`single "use strict" wrapped inside parenthesis'`, {
            source: '("use strict"); foo = 42;',
            loc: true,
            ranges: true,
            raw: true,
            module: true,

            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict"'
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
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
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
                            operator: '=',
                            right: {
                                type: 'Literal',
                                value: 42,
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
                                },
                                raw: '42'
                            },
                            start: 16,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        },
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
                    }
                ],
                sourceType: 'module',
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
            }
        });
    pass(`single "use strict" wrapped inside parenthesis'`, {
            source: '("use strict"); eval = 42;',
            loc: true,
            ranges: true,
            raw: true,

            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 1,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"use strict"'
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
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'eval',
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
                            },
                            operator: '=',
                            right: {
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

    pass(`single "use strict" is "USE STRICT"'`, {
            source: '"cherow"; 1;',
            raw: true,
            module: true,

            expected: {
                body: [{
                        directive: 'cherow',
                        expression: {
                            raw: '"cherow"',
                            type: 'Literal',
                            value: 'cherow',
                        },
                        type: 'ExpressionStatement'
                    },
                    {
                        expression: {
                            raw: '1',
                            type: 'Literal',
                            value: 1,
                        },
                        type: 'ExpressionStatement'
                    },
                ],
                sourceType: 'module',
                type: 'Program'
            }
        });

    pass(`single "use strict" is "USE STRICT"'`, {
            source: '"USE STRICT";  var public = 1;',
            loc: true,
            ranges: true,
            raw: true,

            expected: {
                type: 'Program',
                body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'USE STRICT',
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
                            raw: '"USE STRICT"'
                        },
                        directive: 'USE STRICT',
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
                        declarations: [{
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'public',
                                start: 19,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            start: 19,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 29
                                }
                            }
                        }],
                        kind: 'var',
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

    pass(`single "use strict" inside function body'`, {
            source: 'function wrap() { "use asm"; "use strict"; foo }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use asm',
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
                                    },
                                    raw: '"use asm"'
                                },
                                directive: 'use asm',
                                start: 18,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
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
                                    type: 'Literal',
                                    value: 'use strict',
                                    start: 29,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    },
                                    raw: '"use strict"'
                                },
                                directive: 'use strict',
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
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 43,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                start: 43,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 43
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 16,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'wrap',
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
                }],
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

    pass(`single "use strict"' in block statement`, {
            source: '{ "use strict"; }',
            loc: true,
            ranges: true,
            raw: true,

            expected: {
                type: 'Program',
                body: [{
                    type: 'BlockStatement',
                    body: [{
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
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
                            },
                            raw: '"use strict"'
                        },
                        start: 2,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    }],
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
                }],
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

    pass(`innocuous string that evaluates to "use strict" is not promoted to Use Strict directive'`, {
            source: '"use\\x20strict"; with (x) foo = bar;',
            raw: true,

            expected: {
                body: [{
                        directive: 'use\\x20strict',
                        expression: {
                            raw: '"use\\x20strict"',
                            type: 'Literal',
                            value: 'use strict'
                        },
                        type: 'ExpressionStatement'
                    },
                    {
                        body: {
                            expression: {
                                left: {
                                    name: 'foo',
                                    type: 'Identifier'
                                },
                                operator: '=',
                                right: {
                                    name: 'bar',
                                    type: 'Identifier'
                                },
                                type: 'AssignmentExpression'
                            },
                            type: 'ExpressionStatement'
                        },
                        object: {
                            name: 'x',
                            type: 'Identifier'
                        },
                        type: 'WithStatement'
                    }
                ],
                sourceType: 'script',
                type: 'Program'
            }
        });

    pass(`single "use strict" in a default parameter'`, {
            source: 'function a() { "use strict" } "use strict"; foo;',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'Literal',
                                    value: 'use strict',
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
                                    },
                                    raw: '"use strict"'
                                },
                                directive: 'use strict',
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
                            }],
                            start: 13,
                            end: 29,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 29
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
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 'use strict',
                            start: 30,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 30
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            },
                            raw: '"use strict"'
                        },
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
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 44,
                            end: 47,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 44
                                },
                                end: {
                                    line: 1,
                                    column: 47
                                }
                            }
                        },
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

    pass(`single "use strict"'`, {
            source: '"use strict"',
            loc: true,
            ranges: true,
            raw: true,

            expected: {
                body: [{
                    directive: 'use strict',
                    end: 12,
                    expression: {
                        end: 12,
                        loc: {
                            end: {
                                column: 12,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            }
                        },
                        raw: '"use strict"',
                        start: 0,
                        type: 'Literal',
                        value: 'use strict',
                    },
                    loc: {
                        end: {
                            column: 12,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    start: 0,
                    type: 'ExpressionStatement',
                }, ],
                end: 12,
                loc: {
                    end: {
                        column: 12,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                sourceType: 'script',
                start: 0,
                type: 'Program',
            }
        });

    fail('strict directive after legacy octal ', {
            source: '"\\1;" "use strict";',
            message: 'Unexpected token string',
            line: 1,
            column: 5,
            index: 5
        });
    fail('strict directive after legacy octal in function body', {
            source: '"use strict"; function f(){"\\1";}',
            message: 'Octal escapes are not allowed in strict mode',
            line: 1,
            column: 27,
            index: 27
        });
    fail('strict directive after legacy octal followed by null', {
            source: '"\\1;" "use strict"; null',
            message:  'Unexpected token string',
            line: 1,
            column: 5,
            index: 5
        });
    fail('strict directive before legacy octal', {
            source: '"use strict"; "\\1;"',
            message: 'Octal escapes are not allowed in strict mode',
            line: 1,
            column: 13,
            index: 13
        });
    fail('strict directive before asdfasdfadsfaddsf octal', {
            source: '"\\1;"',
            module: true,
            message: 'Octal escapes are not allowed in strict mode',
            line: 1,
            column: 0,
            index: 0
        });
    fail('strict directive before legacy octal followed by null', {
            source: '"use strict"; "\\1;" null',
            message: 'Octal escapes are not allowed in strict mode',
            line: 1,
            column: 13,
            index: 13
        });
    fail('legacy octal inside function body', {
            source: '"use strict"; function f(){"\\1";}',
            message: 'Octal escapes are not allowed in strict mode',
            line: 1,
            column: 27,
            index: 27
        });

    fail('invalid newlines after ASCII \\x0', {
            source: '"random\\x0\nnewline"',
            message: 'Invalid hexadecimal escape sequence',
            line: 1,
            column: 0,
            index: 0
        });
    fail('invalid newlines after Unicode \\u', {
            source: '"random\\u\nnewline"',
            message: 'Invalid hexadecimal escape sequence',
            line: 1,
            column: 0,
            index: 0
        });
    fail('invalid newlines after Unicode \\u0', {
            source: '"random\\u0\nnewline"',
            message: 'Invalid hexadecimal escape sequence',
            line: 1,
            column: 0,
            index: 0
        });
    fail('invalid newlines after Unicode \\ua', {
            source: '"random\\ua\nnewline"',
            message: 'Invalid hexadecimal escape sequence',
            line: 1,
            column: 0,
            index: 0
        });
    fail('invalid paragraph separators after Unicode \\ua', {
            source: '"random\\ua\u2029newline"',
            module: true
        });
    fail('invalid carriage returns after Unicode \\ua', {
            source: '"random\\ua\rnewline"'
        });
    fail('invalid newlines after Unicode \\u00', {
            source: '"random\\u00\nnewline"'
        });
    fail('invalid newlines after Unicode \\u0a', {
            source: '"random\\u0a\nnewline"'
        });
    fail('invalid newlines after Unicode \\u000', {
            source: '"random\\u000\nnewline"'
        });
    fail('invalid newlines after Unicode \\u00a', {
            source: '"random\\u00a\nnewline"'
        });
    fail('invalid newlines after Unicode \\u{', {
            source: '"rrandom\\u{\nnewline"'
        });
    fail('invalid newlines after Unicode \\u{0', {
            source: '"random\\u{0\nnewline"'
        });
    fail('invalid newlines after Unicode \\u{a', {
            source: '"random\\u{a\nnewline"'
        });
    fail('invalid carriage returns after Unicode \\u{a', {
            source: '"random\\u{a\rnewline"'
        });
    fail('catches invalid space after ASCII \\x', {
            source: '\'random\\x foo\''
        });
    fail('catches invalid space after ASCII \\x0', {
            source: '\'random\\x0 foo\''
        });
    fail('catches invalid space after Unicode \\u', {
            source: '\'random\\u foo\''
        });
    fail('catches invalid space after Unicode \\u0', {
            source: '\'random\\u0 foo\'',
            directives: true
        });
    fail('catches invalid space after Unicode \\ua', {
            source: '\'random\\ua foo\'',
            directives: true
        });
    fail('catches invalid space after Unicode \\u00', {
            source: '\'random\\u00 foo\''
        });
    fail('catches invalid space after Unicode \\u0a', {
            source: '\'random\\u0a foo\''
        });
    fail('catches invalid space after Unicode \\u000', {
            source: '\'random\\u000 foo\'',
            directives: true
        });
    fail('catches invalid space after Unicode \\u00a', {
            source: '\'random\\u00a foo\'',
            directives: true
        });
    fail('catches invalid space after Unicode \\u{', {
            source: '\'random\\u{ foo\''
        });
    fail('catches invalid space after Unicode \\u{0', {
            source: '\'random\\u{0 foo\''
        });
    fail('catches invalid space after Unicode \\u{a', {
            source: '\'random\\u{a foo\''
        });
    fail('catches invalid \\ after ASCII \\x', {
            source: '\'random\\x\\ foo\''
        });
    fail('catches invalid \\ after ASCII \\x0', {
            source: '\'random\\x0\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u', {
            source: '\'random\\u\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u0', {
            source: '\'random\\u0\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\ua', {
            source: '\'random\\ua\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u00', {
            source: '\'random\\u00\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u0a', {
            source: '\'random\\u0a\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u000', {
            source: '\'random\\u000\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u00a', {
            source: '\'random\\u00a\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u{', {
            source: '\'random\\u{\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u{0', {
            source: '\'random\\u{0\\ foo\''
        });
    fail('catches invalid \\ after Unicode \\u{a', {
            source: '\'random\\u{a\\ foo\''
        });
    fail('catches invalid x after ASCII \\x', {
            source: '\'random\\xx foo\''
        });
    fail('catches invalid x after ASCII \\x0', {
            source: '\'random\\x0x foo\''
        });
    fail('catches invalid x after Unicode \\u', {
            source: '\'random\\ux foo\'',
            directives: true
        });
    fail('catches invalid x after Unicode \\u0', {
            source: '\'random\\u0x foo\''
        });
    fail('catches invalid x after Unicode \\ua', {
            source: '\'random\\uax foo\''
        });
    fail('catches invalid x after Unicode \\u00', {
            source: '\'random\\u00x foo\''
        });
    fail('catches invalid x after Unicode \\u0a', {
            source: '\'random\\u0ax foo\''
        });
    fail('catches invalid x after Unicode \\u000', {
            source: '\'random\\u000x foo\'',
            directives: true
        });
    fail('catches invalid x after Unicode \\u00a', {
            source: '\'random\\u00ax foo\'',
            directives: true
        });
    fail('catches invalid x after Unicode \\u{', {
            source: '\'random\\u{x foo\''
        });
    fail('catches invalid x after Unicode \\u{0', {
            source: '\'random\\u{0x foo\''
        });
    fail('catches invalid x after Unicode \\u{a', {
            source: '\'random\\u{ax foo\''
        });
    fail('catches invalid X after ASCII \\x', {
            source: '\'random\\xX foo\''
        });
    fail('catches invalid X after ASCII \\x0', {
            source: '\'random\\x0X foo\''
        });
    fail('catches invalid X after Unicode \\u', {
            source: '\'random\\uX foo\''
        });
    fail('catches invalid X after Unicode \\u0', {
            source: '\'random\\u0X foo\''
        });
    fail('catches invalid X after Unicode \\ua', {
            source: '\'random\\uaX foo\''
        });
    fail('catches invalid X after Unicode \\u00', {
            source: '\'random\\u00X foo\'',
            directives: true
        });
    fail('catches invalid X after Unicode \\u0a', {
            source: '\'random\\u0aX foo\'',
            directives: true
        });
    fail('catches invalid X after Unicode \\u000', {
            source: '\'random\\u000X foo\'',
            directives: true
        });
    fail('catches invalid X after Unicode \\u00a', {
            source: '\'random\\u00aX foo\''
        });
    fail('catches invalid X after Unicode \\u{', {
            source: '\'random\\u{X foo\''
        });
    fail('catches invalid X after Unicode \\u{0', {
            source: '\'random\\u{0X foo\''
        });
    fail('catches invalid X after Unicode \\u{a', {
            source: '\'random\\u{aX foo\''
        });
    fail('catches invalid u after ASCII \\x', {
            source: '\'random\\xu foo\''
        });
    fail('catches invalid u after ASCII \\x0', {
            source: '\'random\\x0u foo\''
        });
    fail('catches invalid u after Unicode \\u', {
            source: '\'random\\uu foo\''
        });
    fail('catches invalid u after Unicode \\u0', {
            source: '\'random\\u0u foo\'',
            directives: true
        });
    fail('catches invalid u after Unicode \\ua', {
            source: '\'random\\uau foo\'',
            directives: true
        });
    fail('catches invalid u after Unicode \\u00', {
            source: '\'random\\u00u foo\''
        });
    fail('catches invalid u after Unicode \\u0a', {
            source: '\'random\\u0au foo\'',
            directives: true
        });
    fail('catches invalid u after Unicode \\u000', {
            source: '\'random\\u000u foo\''
        });
    fail('catches invalid u after Unicode \\u00a', {
            source: '\'random\\u00au foo\''
        });
    fail('catches invalid u after Unicode \\u{', {
            source: '\'random\\u{u foo\'',
            directives: true
        });
    fail('catches invalid u after Unicode \\u{0', {
            source: '\'random\\u{0u foo\''
        });
    fail('catches invalid u after Unicode \\u{a', {
            source: '\'random\\u{au foo\''
        });
    fail('catches invalid U after ASCII \\x', {
            source: '\'random\\xU foo\''
        });
    fail('catches invalid U after ASCII \\x0', {
            source: '\'random\\x0U foo\''
        });
    fail('catches invalid U after Unicode \\u', {
            source: '\'random\\uU foo\''
        });
    fail('catches invalid U after Unicode \\u0', {
            source: '\'random\\u0U foo\''
        });
    fail('catches invalid U after Unicode \\ua', {
            source: '\'random\\uaU foo\''
        });
    fail('catches invalid U after Unicode \\u00', {
            source: '\'random\\u00U foo\''
        });
    fail('catches invalid U after Unicode \\u0a', {
            source: '\'random\\u0aU foo\''
        });
    fail('catches invalid U after Unicode \\u000', {
            source: '\'random\\u000U foo\''
        });
    fail('catches invalid U after Unicode \\u00a', {
            source: '\'random\\u00aU foo\''
        });
    fail('catches invalid U after Unicode \\u{', {
            source: '\'random\\u{U foo\''
        });
    fail('catches invalid U after Unicode \\u{0', {
            source: '\'random\\u{0U foo\''
        });
    fail('catches invalid U after Unicode \\u{a', {
            source: '\'random\\u{aU foo\''
        });
    fail('catches invalid { after ASCII \\x', {
            source: '\'random\\x{ foo\''
        });
    fail('catches invalid { after ASCII \\x0', {
            source: '\'random\\x0{ foo\''
        });
    fail('catches invalid { after Unicode \\u', {
            source: '\'random\\u{ foo\''
        });
    fail('catches invalid { after Unicode \\u0', {
            source: '\'random\\u0{ foo\''
        });
    fail('catches invalid { after Unicode \\ua', {
            source: '\'random\\ua{ foo\''
        });
    fail('catches invalid { after Unicode \\u00', {
            source: '\'random\\u00{ foo\''
        });
    fail('catches invalid { after Unicode \\u0a', {
            source: '\'random\\u0a{ foo\''
        });
    fail('catches invalid { after Unicode \\u000', {
            source: '\'random\\u000{ foo\''
        });
    fail('catches invalid { after Unicode \\u000', {
            source: '\'random\\u000{ foo\'',
            module: true,
            directives: true
        });
    fail('catches invalid { after Unicode \\u00a', {
            source: '\'random\\u00a{ foo\'',
            directives: true
        });
    fail('catches invalid { after Unicode \\u{', {
            source: '\'random\\u{{ foo\'',
            directives: true
        });
    fail('catches invalid { after Unicode \\u{0', {
            source: '\'random\\u{0{ foo\''
        });
    fail('catches invalid { after Unicode \\u{a', {
            source: '\'random\\u{a{ foo\''
        });
    fail('catches invalid } after ASCII \\x', {
            source: '\'random\\x} foo\''
        });
    fail('catches invalid } after ASCII \\x0', {
            source: '\'random\\x0} foo\''
        });
    fail('catches invalid } after Unicode \\u', {
            source: '\'random\\u} foo\''
        });
    fail('catches invalid } after Unicode \\u0', {
            source: '\'random\\u0} foo\'',
            directives: true
        });
    fail('catches invalid } after Unicode \\ua', {
            source: '\'random\\ua} foo\'',
            directives: true
        });
    fail('catches invalid } after Unicode \\u00', {
            source: '\'random\\u00} foo\'',
            directives: true
        });
    fail('catches invalid } after Unicode \\u0a', {
            source: '\'random\\u0a} foo\'',
            directives: true
        });
    fail('catches invalid } after Unicode \\u000', {
            source: '\'random\\u000} foo\'',
            directives: true
        });
    fail('catches invalid } after Unicode \\u00a', {
            source: '\'random\\u00a} foo\'',
            directives: true
        });
    fail('catches invalid } after Unicode \\u00a', {
            source: '\'random\\u00a} foo\'',
            module: true
        });
    fail('catches invalid } after Unicode \\u{', {
            source: '\'random\\u{} foo\'',
            directives: true
        });
    fail('catches invalid } after Unicode \\u{', {
            source: '\'random\\u{} foo\'',
            module: true
        });
    });
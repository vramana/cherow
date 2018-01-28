import { fail, pass } from '../utils';

describe('Expressions - Function', () => {

    fail(`var f = function(a = 0) { "use strict"; }`, {
        source: 'var f = function(a = 0) { "use strict"; }',
        message: 'Illegal \'use strict\' directive in function with non-simple parameter list',
        line: 1,
        column: 40,
        index: 41
    });

    fail(`"use strict"; function *g() { 0, function(x = yield) { paramValue = x; }; }`, {
        source: '"use strict"; function *g() { 0, function(x = yield) { paramValue = x; }; }',
        message: 'Unexpected token \'yield\'',
        line: 1,
        column: 46,
        index: 51
    });

    fail(`0, function() { super(); };`, {
        source: '0, function() { super(); };',
        message: 'super() is only valid in derived class constructors',
        line: 1,
        column: 16,
        index: 21
    });

    fail(`0, function(x = super()) {};`, {
        source: '0, function(x = super()) {};',
        message: 'super() is only valid in derived class constructors',
        line: 1,
        column: 16,
        index: 21
    });

    fail(`"use strict"; function foo() { eval = 42; };`, {
        source: '"use strict"; function foo() { eval = 42; };',
        message: 'Eval or arguments can\'t be assigned to in strict mode code',
        line: 1,
        column: 36,
        index: 37
    });

    fail(`(function((a)){})`, {
        source: '(function((a)){})',
        message: 'Unexpected token \'(\'',
        line: 1,
        column: 10,
        index: 11
    });

    fail(`(function(a){ let a; })`, {
        source: '(function(a){ let a; })',
        message: '\'a\' has already been declared ',
        line: 1,
        column: 18,
        index: 19
    });

    fail(`(function(a){ const a; })`, {
        source: '(function(a){ const a; })',
        message: '\'a\' has already been declared ',
        line: 1,
        column: 20,
        index: 21
    });

    fail(`(function ({ a(){} }) {})`, {
        source: '(function ({ a(){} }) {})',
        message: 'Unexpected token',
        line: 1,
        column: 11,
        index: 12
    });

    fail(`'use strict'; (function({a: x}, {b: x}){})`, {
        source: '"use strict"; (function({a: x}, {b: x}){})',
        message: '\'x\' has already been declared ',
        line: 1,
        column: 32,
        index: 33
    });

    fail(`(function((a)){})`, {
        source: '(function((a)){})',
        message: 'Unexpected token \'(\'',
        line: 1,
        column: 10,
        index: 11
    });

    fail(`(function(...a, b){})`, {
        source: '(function(...a, b){})',
        message: 'Rest parameter must be last formal parameter',
        line: 1,
        column: 10,
        index: 13
    });

    fail(`var _13_1_18_fun = function (eval) { "use strict"; }`, {
        source: 'var _13_1_18_fun = function (eval) { "use strict"; }',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 29,
        index: 33
    });

    pass(`(function foo() {} /42/i)`, {
        source: `(function foo() {} /42/i)`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'BinaryExpression',
                            left: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
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
                                start: 1,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            right: {
                                type: 'Literal',
                                value: 42,
                                start: 20,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                },
                                raw: '42'
                            },
                            operator: '/',
                            start: 1,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'i',
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
                        operator: '/',
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
                    },
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
            ],
            sourceType: 'script',
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

    pass(`function fn() {
   return
   function foo() {}
   /42/i
 }`, {
      source: `function fn() {
        return
        function foo() {}
        /42/i
      }`,
      loc: true,
      ranges: true,
      raw: true,
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
                            argument: null,
                            start: 24,
                            end: 30,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 8
                                },
                                end: {
                                    line: 2,
                                    column: 14
                                }
                            }
                        },
                        {
                            type: 'FunctionDeclaration',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 54,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 23
                                    },
                                    end: {
                                        line: 3,
                                        column: 25
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 48,
                                end: 51,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 17
                                    },
                                    end: {
                                        line: 3,
                                        column: 20
                                    }
                                }
                            },
                            start: 39,
                            end: 56,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 8
                                },
                                end: {
                                    line: 3,
                                    column: 25
                                }
                            }
                        },
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'Literal',
                                value: {},
                                regex: {
                                    pattern: '42',
                                    flags: 'i'
                                },
                                start: 65,
                                end: 70,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 8
                                    },
                                    end: {
                                        line: 4,
                                        column: 13
                                    }
                                },
                                raw: '/42/i'
                            },
                            start: 65,
                            end: 70,
                            loc: {
                                start: {
                                    line: 4,
                                    column: 8
                                },
                                end: {
                                    line: 4,
                                    column: 13
                                }
                            }
                        }
                    ],
                    start: 14,
                    end: 78,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 5,
                            column: 7
                        }
                    }
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
                    start: 9,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                start: 0,
                end: 78,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 5,
                        column: 7
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
                line: 5,
                column: 7
            }
        }
    }
    });

    pass(`test(); function foo() {} /42/i`, {
      source: `test(); function foo() {} /42/i`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'test',
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
                    },
                    arguments: [],
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
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
                    }
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'foo',
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
                    }
                },
                start: 8,
                end: 25,
                loc: {
                    start: {
                        line: 1,
                        column: 8
                    },
                    end: {
                        line: 1,
                        column: 25
                    }
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: {},
                    regex: {
                        pattern: '42',
                        flags: 'i'
                    },
                    start: 26,
                    end: 31,
                    loc: {
                        start: {
                            line: 1,
                            column: 26
                        },
                        end: {
                            line: 1,
                            column: 31
                        }
                    },
                    raw: '/42/i'
                },
                start: 26,
                end: 31,
                loc: {
                    start: {
                        line: 1,
                        column: 26
                    },
                    end: {
                        line: 1,
                        column: 31
                    }
                }
            }
        ],
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

    pass(`!function fn() {} /42/i;`, {
      source: `!function fn() {} /42/i;`,
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'UnaryExpression',
                            operator: '!',
                            argument: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'fn',
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
                                start: 1,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            },
                            prefix: true,
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
                        right: {
                            type: 'Literal',
                            value: 42,
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
                            raw: '42'
                        },
                        operator: '/',
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
                    right: {
                        type: 'Identifier',
                        name: 'i',
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
                    operator: '/',
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

    pass(`(function () {
          return function fn() {} /42/i
        })`, {
        source: `(function () {
            return function fn() {} /42/i
          })`,
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
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'BinaryExpression',
                                            left: {
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
                                                    start: 48,
                                                    end: 50,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 33
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 35
                                                        }
                                                    }
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: {
                                                    type: 'Identifier',
                                                    name: 'fn',
                                                    start: 43,
                                                    end: 45,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 28
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 30
                                                        }
                                                    }
                                                },
                                                start: 34,
                                                end: 50,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 35
                                                    }
                                                }
                                            },
                                            right: {
                                                type: 'Literal',
                                                value: 42,
                                                start: 52,
                                                end: 54,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 39
                                                    }
                                                },
                                                raw: '42'
                                            },
                                            operator: '/',
                                            start: 34,
                                            end: 54,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 39
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'i',
                                            start: 55,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 41
                                                }
                                            }
                                        },
                                        operator: '/',
                                        start: 34,
                                        end: 56,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 19
                                            },
                                            end: {
                                                line: 2,
                                                column: 41
                                            }
                                        }
                                    },
                                    start: 27,
                                    end: 56,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 12
                                        },
                                        end: {
                                            line: 2,
                                            column: 41
                                        }
                                    }
                                }
                            ],
                            start: 13,
                            end: 68,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 3,
                                    column: 11
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 68,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 3,
                                column: 11
                            }
                        }
                    },
                    start: 0,
                    end: 69,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 3,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 69,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 3,
                    column: 12
                }
            }
        }
    });

    pass(`function a({a} = {a: 1}) {}`, {
        source: `function a({a} = {a: 1}) {}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'AssignmentPattern',
                            left: {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
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
                                        computed: false,
                                        value: {
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
                                        method: false,
                                        shorthand: true,
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
                                start: 11,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
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
                                        value: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 18,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    }
                                ],
                                start: 17,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            start: 11,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        }
                    ],
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

    pass(`(function x(y, z) { })`, {
        source: `(function x(y, z) { })`,
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
                                name: 'y',
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
                            {
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
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
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
                        start: 1,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
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

    pass(`(function({a: x, a: y}){})`, {
        source: `(function({a: x, a: y}){})`,
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
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        kind: 'init',
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
                                        computed: false,
                                        value: {
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
                                    },
                                    {
                                        type: 'Property',
                                        kind: 'init',
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
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        method: false,
                                        shorthand: false,
                                        start: 17,
                                        end: 21,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 21
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 25
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

    pass(`function* g(){ (function yield(){}); }`, {
        source: `function* g(){ (function yield(){}); }`,
        loc: true,
        ranges: true,
        raw: true,
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 32,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 34
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'yield',
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
                                    start: 16,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                start: 15,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'g',
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
import { pass, fail } from '../test-utils';

describe('Expressions - Arrows', () => {

    fail(`bar ? (=> 0) : baz;`, {
        source: 'bar ? (=> 0) : baz;',
        message:  'Unexpected token',
        line: 1,
    });

    fail(`() => {} || true`, {
        source: '() => {} || true',
        message:  'Unexpected token ||',
        line: 1,
    });

    fail(`() => {} ? a : b`, {
        source: '() => {} ? a : b',
        message: 'Unexpected token ?',
        line: 1,
    });

    fail(`() => {}a`, {
        source: '() => {}a',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(localVar |= defaultValue) => {}`, {
        source: '(localVar |= defaultValue) => {}',
        line: 1,
    });

    fail(`() => {} 1`, {
        source: '() => {} 1',
        message:  'Unexpected token',
        line: 1,
    });

    fail(`() => {} a()`, {
        source: '() => {} a()',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`() => {} a`, {
        source: '() => {} a',
        message:  'Unexpected token',
        line: 1,
    });

    fail(`(()) => 0;`, {
        source: '(()) => 0',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`function *g() { ({x = yield}) => {} }`, {
        source: 'function *g() { ({x = yield}) => {} }',
        line: 1,
    });

    fail(`((x, y)) => 0`, {
        source: '((x, y)) => 0',
        message: 'Invalid parenthesized pattern',
        line: 1,
    });

    fail(`(x, (y)) => 0`, {
        source: '(x, (y)) => 0',
        message: 'Invalid parenthesized pattern',
        line: 1,
    });

    fail(`((x, y, z)) => 0`, {
        source: '((x, y, z)) => 0',
        message: 'Invalid parenthesized pattern',
        line: 1,
    });

    fail(`((x, y), z) => 0`, {
        source: '((x, y), z) => 0',
        message: 'Invalid parenthesized pattern',
        line: 1,
    });

    fail(`(eval = 10) => { "use strict"; }`, {
        source: '(eval = 10) => { "use strict"; }',
        message: 'Illegal \'use strict\' directive in function with non-simple parameter list',
        line: 1,
    });

    fail(`arguments => { 'use strict'; 0 }`, {
        source: 'arguments => { "use strict"; 0 }',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
    });

    fail(`(interface) => { 'use strict'; 0 }`, {
        source: '(interface) => { "use strict"; 0 }',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
    });

    fail(`32 => {}`, {
        source: '32 => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(32) => {}`, {
        source: '(32) => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`if => {}`, {
        source: 'if => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`a++ => {}`, {
        source: 'a++ => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(a, b++) => {}`, {
        source: '(a, b++) => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(a, foo ? bar : baz) => {}`, {
        source: '(a, foo ? bar : baz) => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(a.b, c) => {}`, {
        source: '(a.b, c) => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(a['b'], c) => {}`, {
        source: '(a["b"], c) => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(...a = b) => b`, {
        source: '(...a = b) => b',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(-a) => {}`, {
        source: '(-a) => {}',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(...rest - a) => b`, {
        source: '(...rest - a) => b',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`(a, ...b - 10) => b`, {
        source: '(a, ...b - 10) => b',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`((x, y), z) => 0`, {
        source: '((x, y), z) => 0',
        message: 'Invalid parenthesized pattern',
        line: 1,
    });

    fail(`"use strict"; var af = package => 1;`, {
        source: '"use strict"; var af = package => 1;',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`function *g() { (x = yield) => {}; }`, {
        source: 'function *g() { (x = yield) => {}; }',
        message: 'Arrow parameters must not contain yield expressions',
        line: 1,
    });

    fail(`"use strict"; var af = (arguments) => 1;`, {
        source: '"use strict"; var af = (arguments) => 1;',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 24,
        index: 24
    });

    fail(`((a = 0) => { "use strict"; })`, {
        source: '((a = 0) => { "use strict"; })',
        message: 'Illegal \'use strict\' directive in function with non-simple parameter list',
        line: 1,
        column: 4,
        index: 4
    });

    fail(`"use strict"; var af = eval => 1;`, {
        source: '"use strict"; var af = eval => 1;',
        message:  'The identifier \'eval\' must not be in binding position in strict mode',
        line: 1,
        column: 27,
        index: 27
    });

    fail(`"use strict"; var af = (eval) => 1;`, {
        source: '"use strict"; var af = (eval) => 1;',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 24,
        index: 24
    });

    fail(`"use strict"; var af = eval => 1;`, {
        source: '"use strict"; var af = arguments => 1;',
        message: 'The identifier \'arguments\' must not be in binding position in strict mode',
        line: 1,
        column: 32,
        index: 32
    });

    fail('() => { new.target; };', {
        source: '() => { new.target; };',
        line: 1,
        column: 12
    });

    fail('(a\n=> a)(1)', {
        source: '(a\n=> a)(1)',
        line: 1,
        column: 2

    });

    fail('(a/*\n*/=> a)(1)', {
        source: '(a/*\n*/=> a)(1)',
        line: 1

    });

    fail('((a)\n=> a)(1)', {
        source: '((a)\n=> a)(1)',
        line: 1

    });

    fail('((a)/*\n*/=> a)(1)', {
        source: '((a)/*\n*/=> a)(1)',
        line: 1

    });

    fail('((a, b)\n=> a + b)(1, 2)', {
        source: '((a, b)\n=> a + b)(1, 2)',
        line: 1

    });

    fail('((a, b)/*\n*/=> a + b)(1, 2)', {
        source: '((a, b)/*\n*/=> a + b)(1, 2)',
        line: 1
    });

    fail('"use strict"; (a,a) =>{}', {
        source: '"use strict";  (a,a) =>{}',
        line: 1,
        column: 25
    });

    fail(`[]=>0`, {
        source: '[]=>0',
        message: 'Unexpected token',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`() ? 0`, {
        source: '() ? 0',
        message: 'Unexpected token',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`(a)\n=> 0`, {
        source: '(a)\n=> 0',
        message: 'No line break is allowed after async',
        line: 1,
        column: 3,
        index: 3
    });

    fail(`1 + ()`, {
        source: '1 + ()',
        message: 'Unexpected token',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`a\n=> 0`, {
        source: 'a\n=> 0',
        message: 'No line break is allowed after async',
        line: 1,
        column: 1,
        index: 1
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

    fail(`() <= 42;`, {
        source: '() <= 42;',
        message: 'Unexpected token',
        line: 1,
        column: 2,
        index: 2
    });

    fail(`"use strict"; (a) => 00;`, {
        source: '"use strict"; (a) => 00;',
        message: 'Octal literals are not allowed in strict mode',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`"use strict"; (eval, a) => 42;`, {
        source: '"use strict"; (eval, a) => 42;',
        message: 'Unexpected eval or arguments in strict mode',
        line: 1,
        column: 15,
        index: 15
    });

    pass(`(a) => b;  // 1 args
    (a, b) => c;  // n args
    () => b;  // 0 args
    (a) => (b) => c;  // func returns func returns func
    (a) => ((b) => c);  // So these parens are dropped
    () => (b,c) => d;  // func returns func returns func
    a=>{return b;}
    a => 'e';  // Dropping the parens`, {
        source: `(a) => b;  // 1 args
        (a, b) => c;  // n args
        () => b;  // 0 args
        (a) => (b) => c;  // func returns func returns func
        (a) => ((b) => c);  // So these parens are dropped
        () => (b,c) => d;  // func returns func returns func
        a=>{return b;}
        a => 'e';  // Dropping the parens`,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'Identifier',
                            name: 'b'
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'Identifier',
                            name: 'c'
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            },
                            {
                                type: 'Identifier',
                                name: 'b'
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'Identifier',
                            name: 'b'
                        },
                        params: [],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'c'
                            },
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'b'
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'c'
                            },
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'b'
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'd'
                            },
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'b'
                                },
                                {
                                    type: 'Identifier',
                                    name: 'c'
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true
                        },
                        params: [],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true
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
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'b'
                                    }
                                }
                            ]
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false
                    }
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'Literal',
                            value: 'e',
                            raw: '\'e\''
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a'
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: true
                    }
                }
            ]
        }
    });

    pass(`(() => {}) || true;
    (() => {}) ? a : b;`, {
        source: `(() => {}) || true;
        (() => {}) ? a : b;`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'LogicalExpression',
                        left: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        right: {
                            type: 'Literal',
                            value: true,
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
                            },
                            raw: 'true'
                        },
                        operator: '||',
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
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 35,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 15
                                    },
                                    end: {
                                        line: 2,
                                        column: 17
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
                            start: 29,
                            end: 37,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 9
                                },
                                end: {
                                    line: 2,
                                    column: 17
                                }
                            }
                        },
                        consequent: {
                            type: 'Identifier',
                            name: 'a',
                            start: 41,
                            end: 42,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 21
                                },
                                end: {
                                    line: 2,
                                    column: 22
                                }
                            }
                        },
                        alternate: {
                            type: 'Identifier',
                            name: 'b',
                            start: 45,
                            end: 46,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 25
                                },
                                end: {
                                    line: 2,
                                    column: 26
                                }
                            }
                        },
                        start: 28,
                        end: 46,
                        loc: {
                            start: {
                                line: 2,
                                column: 8
                            },
                            end: {
                                line: 2,
                                column: 26
                            }
                        }
                    },
                    start: 28,
                    end: 47,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 27
                        }
                    }
                }
            ],
            start: 0,
            end: 47,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 27
                }
            }
        }
    });

    pass(`(() => {}) + 2`, {
        source: '(() => {}) + 2',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        right: {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
                        },
                        operator: '+',
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

    pass(`bar ? ( (x) => x ) : baz;`, {
        source: 'bar ? ( (x) => x ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Identifier',
                                name: 'x',
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
                            params: [
                                {
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
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
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
                            }
                        },
                        alternate: {
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

    pass(`bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;`, {
        source: 'bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'BinaryExpression',
                                        left: {
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
                                        },
                                        right: {
                                            type: 'Identifier',
                                            name: 'u',
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
                                        operator: '*',
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
                                        }
                                    },
                                    right: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Identifier',
                                            name: 'y',
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
                                        right: {
                                            type: 'Identifier',
                                            name: 'v',
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
                                        operator: '*',
                                        start: 34,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    },
                                    operator: '+',
                                    start: 28,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'u',
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
                                    {
                                        type: 'Identifier',
                                        name: 'v',
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 18,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            },
                            params: [
                                {
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
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 8,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        },
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
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
                    },
                    start: 0,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 46,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 46
                }
            }
        }
    });

    pass(`bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;`, {
        source: 'bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'SequenceExpression',
                            expressions: [
                                {
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                        type: 'Literal',
                                        value: 0,
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
                                        raw: '0'
                                    },
                                    params: [
                                        {
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
                                        {
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
                                        }
                                    ],
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: true,
                                    start: 8,
                                    end: 19,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 19
                                        }
                                    }
                                },
                                {
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                        type: 'Literal',
                                        value: 1,
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
                                        },
                                        raw: '1'
                                    },
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'c',
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
                                        {
                                            type: 'Identifier',
                                            name: 'd',
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
                                    id: null,
                                    async: false,
                                    generator: false,
                                    expression: true,
                                    start: 21,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                }
                            ],
                            start: 8,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        },
                        alternate: {
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
                    },
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

    pass(`bar ? ( (a, (a, (b, c) => 0)) ) : baz;`, {
        source: 'bar ? ( (a, (a, (b, c) => 0)) ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'SequenceExpression',
                            expressions: [
                                {
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
                                {
                                    type: 'SequenceExpression',
                                    expressions: [
                                        {
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
                                        {
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'b',
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
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: true,
                                            start: 16,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        }
                                    ],
                                    start: 13,
                                    end: 27,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 27
                                        }
                                    }
                                }
                            ],
                            start: 9,
                            end: 28,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 28
                                }
                            }
                        },
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
                            start: 34,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 34
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        },
                        start: 0,
                        end: 37,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 37
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

    pass(`bar ? ( foo ? bar : baz => {} ) : baz;`, {
        source: 'bar ? ( foo ? bar : baz => {} ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 8,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            },
                            consequent: {
                                type: 'Identifier',
                                name: 'bar',
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
                            alternate: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 27,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'baz',
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
                                id: null,
                                async: false,
                                generator: false,
                                expression: false,
                                start: 20,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            },
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
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
                            start: 34,
                            end: 37,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 34
                                },
                                end: {
                                    line: 1,
                                    column: 37
                                }
                            }
                        },
                        start: 0,
                        end: 37,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 37
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

    pass(`bar ? ( (a, {}) => {} ) : baz;`, {
        source: 'bar ? ( (a, {}) => {} ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
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
                            params: [
                                {
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
                                {
                                    type: 'ObjectPattern',
                                    properties: [],
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
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
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

    pass(`bar ? ( (x, y = 9) => {} ) : baz;`, {
        source: 'bar ? ( (x, y = 9) => {} ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'ArrowFunctionExpression',
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
                            params: [
                                {
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
                                {
                                    type: 'AssignmentPattern',
                                    left: {
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
                                    right: {
                                        type: 'Literal',
                                        value: 9,
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
                                        raw: '9'
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
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
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
                    },
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 33,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 33
                }
            }
        }
    });

    pass(`bar ? ( (...a) => {} ) : baz;`, {
        source: 'bar ? ( (...a) => {} ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
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
                                    type: 'RestElement',
                                    argument: {
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
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        alternate: {
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

    pass(`bar ? ( ([x] = []) => {} ) : baz;`, {
        source: 'bar ? ( ([x] = []) => {} ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'ArrowFunctionExpression',
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
                            params: [
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
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
                                    right: {
                                        type: 'ArrayExpression',
                                        elements: [],
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
                                }
                            ],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
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
                    },
                    start: 0,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 33
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 33,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 33
                }
            }
        }
    });

    pass(`bar ? ( (x = 9, ...a) => {} ) : baz;`, {
        source: 'bar ? ( (x = 9, ...a) => {} ) : baz;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ConditionalExpression',
                        test: {
                            type: 'Identifier',
                            name: 'bar',
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
                        consequent: {
                            type: 'ArrowFunctionExpression',
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
                            params: [
                                {
                                    type: 'AssignmentPattern',
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
                                        type: 'Literal',
                                        value: 9,
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
                                        raw: '9'
                                    },
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
                                {
                                    type: 'RestElement',
                                    argument: {
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
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
                            start: 8,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        alternate: {
                            type: 'Identifier',
                            name: 'baz',
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

    pass(`(x, y = 9, {b}, z = 8, ...a) => {}`, {
        source: '(x, y = 9, {b}, z = 8, ...a) => {}',
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
                        params: [
                            {
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
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                    type: 'Literal',
                                    value: 9,
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
                                    raw: '9'
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
                            },
                            {
                                type: 'ObjectPattern',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
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
                                        value: {
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
                                        kind: 'init',
                                        computed: false,
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
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'z',
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
                                right: {
                                    type: 'Literal',
                                    value: 8,
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
                                    raw: '8'
                                },
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
                            },
                            {
                                type: 'RestElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'a',
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
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
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
                    },
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

    pass(`(x = 9) => {}`, {
        source: '(x = 9) => {}',
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
                                    value: 9,
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
                                    raw: '9'
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
                        expression: false,
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

    pass(`([x = 0]) => {}`, {
        source: '([x = 0]) => {}',
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
                                        }
                                    }
                                ],
                                start: 1,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
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

    pass(`(a, (a, (b, c) => 0))`, {
        source: '(a, (a, (b, c) => 0))',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'SequenceExpression',
                        expressions: [
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
                                type: 'SequenceExpression',
                                expressions: [
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
                                        type: 'ArrowFunctionExpression',
                                        body: {
                                            type: 'Literal',
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        params: [
                                            {
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
                                            {
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
                                            }
                                        ],
                                        id: null,
                                        async: false,
                                        generator: false,
                                        expression: true,
                                        start: 8,
                                        end: 19,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 8
                                            },
                                            end: {
                                                line: 1,
                                                column: 19
                                            }
                                        }
                                    }
                                ],
                                start: 5,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
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
            body: [{
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
                    params: [{
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
                    }],
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

    pass(`(a, ...[]) => 1`, {
        source: '(a, ...[]) => 1',
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
            }],
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
            body: [{
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
                    params: [{
                        type: 'ObjectPattern',
                        properties: [{
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
                        }],
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
                    }],
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
            }],
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
            body: [{
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
                    params: [{
                        type: 'ObjectPattern',
                        properties: [{
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
                        }],
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
                    }],
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

    pass(`([x = 10]) => x`, {
        source: '([x = 10]) => x',
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
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
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
                        }],
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
                    }],
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
            }],
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
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'ArrayExpression',
                        elements: [{
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
                    params: [{
                        type: 'ObjectPattern',
                        properties: [{
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
                                    properties: [{
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
                                    }],
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
                    }],
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
            }],
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
            body: [{
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
                    params: [{
                        type: 'ObjectPattern',
                        properties: [{
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
                        }],
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
                    }],
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
            }],
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
            body: [{
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
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
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
                        }],
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
                    }],
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

    pass(`(x=1) => x * x;`, {
        source: '(x=1) => x * x;',
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
                    params: [{
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
                    }],
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
            }],
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
            body: [{
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
                    params: [{
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
                    }],
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

    pass(`(a, b=(c)=>{}) => {}`, {
        source: '(a, b=(c)=>{}) => {}',
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
                                params: [{
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
                                }],
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
            }],
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
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'FunctionExpression',
                    params: [{
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
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [{
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
                        }],
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
            }],
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

    pass('(a,b) =>{}', {
        source: '(a,b) =>{}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    expression: false,
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

    pass('var x = (a,b) =>{}', {
        source: 'var x = (a,b) =>{}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
                        type: 'ArrowFunctionExpression',
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
                        params: [{
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
                            {
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
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
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
                }],
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

    pass('(a,...b) =>{}', {
        source: '(a,...b) =>{}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
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
                            type: 'RestElement',
                            argument: {
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
                            start: 3,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            }
                        }
                    ],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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

    pass('var x = (a,...b) =>{}', {
        source: 'var x = (a,...b) =>{}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
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
                        params: [{
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
                            {
                                type: 'RestElement',
                                argument: {
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
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
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
                }],
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
            }],
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

    pass('a =>{}', {
        source: 'a =>{}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    expression: false,
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
            }],
            sourceType: 'script',
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
        }
    });

    pass('(...a) =>{}', {
        source: '(...a) =>{}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    expression: false,
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

    pass('var x = a =>{}', {
        source: 'var x = a =>{}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'VariableDeclaration',
                declarations: [{
                    type: 'VariableDeclarator',
                    init: {
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
                        params: [{
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
                        }],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
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
                }],
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

    pass('(a,b) => [a]', {
        source: '(a,b) => [a]',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'ArrayExpression',
                        elements: [{
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
                        }],
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

    pass('() => { value: b}', {
        source: '() => { value: b}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'LabeledStatement',
                            label: {
                                type: 'Identifier',
                                name: 'value',
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
                            body: {
                                type: 'ExpressionStatement',
                                expression: {
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
                            }
                        }],
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
                    },
                    params: [],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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

    fail('((x)) => a', {
        source: '((x)) => a',
    });

    fail('(x, (y, z)) => a', {
        source: '(x, (y, z)) => a',
    });

    fail('((x, y), z) => a', {
        source: '((x, y), z) =>  a',
    });

    pass('((x, y) => { x.a = y; }', {
        source: '(x, y) => { x.a = y; }',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'MemberExpression',
                                    object: {
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
                                    computed: false,
                                    property: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                operator: '=',
                                right: {
                                    type: 'Identifier',
                                    name: 'y',
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
                        }],
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
                    },
                    params: [{
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
                        {
                            type: 'Identifier',
                            name: 'y',
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
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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
            }],
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

    pass('(x, y) => x.a = y', {
        source: '(x, y) => x.a = y',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'MemberExpression',
                            object: {
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
                            computed: false,
                            property: {
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
                            type: 'Identifier',
                            name: 'y',
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
                    params: [{
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
                        {
                            type: 'Identifier',
                            name: 'y',
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

    pass('x => (y, z) => z * (x + y)', {
        source: 'x => (y, z) => z * (x + y)',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BinaryExpression',
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
                                type: 'BinaryExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                right: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                operator: '+',
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
                                }
                            },
                            operator: '*',
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
                        params: [{
                                type: 'Identifier',
                                name: 'y',
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
                                type: 'Identifier',
                                name: 'z',
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
                        id: null,
                        async: false,
                        generator: false,
                        expression: true,
                        start: 5,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    },
                    params: [{
                        type: 'Identifier',
                        name: 'x',
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

    pass('(a = b, c) => {}', {
        source: '(a = b, c) => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    params: [{
                            type: 'AssignmentPattern',
                            left: {
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
                            right: {
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
                        },
                        {
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
                        }
                    ],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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

    pass('(x, ...a) => {}', {
        source: '(x, ...a) => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    params: [{
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
                        {
                            type: 'RestElement',
                            argument: {
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
                        }
                    ],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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
            }],
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

    pass('({a} = {}) => {}', {
        source: '({a} = {}) => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                    name: 'a',
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
                            }],
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
                        },
                        right: {
                            type: 'ObjectExpression',
                            properties: [],
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
                    }],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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

    pass('({a} = {}) => {}', {
        source: '({a} = {}) => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                    name: 'a',
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
                            }],
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
                        },
                        right: {
                            type: 'ObjectExpression',
                            properties: [],
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
                    }],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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

    pass('(interface, eval) => {}', {
        source: '(interface, eval) => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
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
                    params: [{
                            type: 'Identifier',
                            name: 'interface',
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
                        },
                        {
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
                        }
                    ],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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
            }],
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

    pass('(bar, arguments) => {}', {
        source: '(bar, arguments) => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                        }
                    },
                    params: [{
                            type: 'Identifier',
                            name: 'bar',
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
                        },
                        {
                            type: 'Identifier',
                            name: 'arguments',
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
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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
            }],
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

    pass('(arguments, interface) => {}', {
        source: '(arguments, interface) => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
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
                    params: [{
                            type: 'Identifier',
                            name: 'arguments',
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
                        },
                        {
                            type: 'Identifier',
                            name: 'interface',
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
                        }
                    ],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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

    pass('yield => {}', {
        source: 'yield => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    params: [{
                        type: 'Identifier',
                        name: 'yield',
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
                        }
                    }],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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

    pass('arguments => {}', {
        source: 'arguments => {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    params: [{
                        type: 'Identifier',
                        name: 'arguments',
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
                        }
                    }],
                    id: null,
                    async: false,
                    generator: false,
                    expression: false,
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
            }],
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

    pass(`(...[]) => 0`, {
        source: '(...[]) => 0',
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
                    params: [{
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
                    }],
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

    pass(`([a]) => 0`, {
        source: '([a]) => 0',
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
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'Identifier',
                            name: 'a',
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
                        }],
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
                    }],
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

    pass(`(() => null)();`, {
        source: '(() => null)();',
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
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'Literal',
                                value: null,
                                start: 7,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                raw: 'null'
                            },
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: true,
                            start: 1,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            }
                        },
                        arguments: [],
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

    pass(`(() => {})()`, {
        source: '(() => {})()',
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
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            params: [],
                            id: null,
                            async: false,
                            generator: false,
                            expression: false,
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
                        arguments: [],
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
});
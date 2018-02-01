import { pass, fail } from '../test-utils';

describe('Expressions - Yield', () => {

fail(`function *a(){yield\n*a}`, {
    source: 'function *a(){yield\n*a}',
    line: 1
});

fail(`"use strict"; function not_gen() { (function yield() { }) }`, {
    source: '"use strict"; function not_gen() { (function yield() { }) }',
    line: 1
});

fail(`"use strict"; function not_gen() { function foo(bar, yield) { } }`, {
    source: '"use strict"; function not_gen() { function foo(bar, yield) { } }',
    line: 1
});

fail(`"use strict"; function not_gen() { try { } catch (yield) { } }`, {
    source: '"use strict"; function not_gen() { try { } catch (yield) { } }',
    line: 1
});

fail(`"use strict"; function not_gen() { function yield() { } }`, {
    source: '"use strict"; function not_gen() { function yield() { } }',
    line: 1
});

fail(`"use strict"; var [yield] = [42];`, {
    source: '"use strict"; var [yield] = [42];',
    line: 1
});

fail(`"use strict"; function not_gen() { function yield() { } }`, {
    source: '"use strict"; function not_gen() { function yield() { } }',
    line: 1
});

fail(`function test_func() { "use strict"; function * yield() { }}`, {
    source: 'function test_func() { "use strict"; function * yield() { } }',
    line: 1
});

fail(`function test_func() { "use strict"; function * yield() { } }`, {
    source: 'function test_func() { "use strict"; function * yield() { } }',
    line: 1
});

fail(`"use strict"; function * gen() { function not_gen() { function foo(yield) { } }`, {
    source: '"use strict"; function * gen() { function not_gen() { function foo(yield) { } }',
    line: 1
});

fail(`"use strict"; function * gen() { function not_gen() { yield = 1; }`, {
    source: '"use strict"; function * gen() { function not_gen() {  yield = 1;}',
    line: 1
});

fail(`"use strict"; function * gen() { function not_gen() { try { } catch (yield) { } }`, {
    source: '"use strict"; function * gen() { function not_gen() { try { } catch (yield) { } }',
    line: 1
});

fail(`function *a(){yield*}`, {
    source: 'function *a(){yield*}',
    line: 1
});

fail(`(a = yield 3) {}`, {
    source: '(a = yield 3) {}',
    line: 1
});

fail(`(yield 3) {}`, {
    source: '(yield 3) {}',
    line: 1
});

fail(`(a = yield) {}`, {
    source: '(a = yield) {}',
    line: 1
});

fail(`(yield = 1) {}`, {
    source: '(yield = 1) {}',
    line: 1
});

fail(`(yield) {}`, {
    source: '(yield) {}',
    line: 1
});

const yieldInParameters = [
        `(a = yield) => {}`,
        `(a = yield /a/g) => {}`, // Should parse as division, not yield expression with regexp.
        `yield => {};`,
        `(yield) => {};`,
        `(yield = 0) => {};`,
        `([yield]) => {};`,
        `([yield = 0]) => {};`,
        `([...yield]) => {};`,
        `({a: yield}) => {};`,
        `({yield}) => {};`,
        `({yield = 0}) => {};`,
    ];

const yieldInBody = [
        `() => yield;`,
        `() => yield /a/g;`,
        `() => { var x = yield; }`,
        `() => { var x = yield /a/g; }`,

        `() => { var yield; };`,
        `() => { var yield = 0; };`,
        `() => { var [yield] = []; };`,
        `() => { var [yield = 0] = []; };`,
        `() => { var [...yield] = []; };`,
        `() => { var {a: yield} = {}; };`,
        `() => { var {yield} = {}; };`,
        `() => { var {yield = 0} = {}; };`,

        `() => { let yield; };`,
        `() => { let yield = 0; };`,
        `() => { let [yield] = []; };`,
        `() => { let [yield = 0] = []; };`,
        `() => { let [...yield] = []; };`,
        `() => { let {a: yield} = {}; };`,
        `() => { let {yield} = {}; };`,
        `() => { let {yield = 0} = {}; };`,

        `() => { const yield = 0; };`,
        `() => { const [yield] = []; };`,
        `() => { const [yield = 0] = []; };`,
        `() => { const [...yield] = []; };`,
        `() => { const {a: yield} = {}; };`,
        `() => { const {yield} = {}; };`,
        `() => { const {yield = 0} = {}; };`,
    ];

    // Script context.
for (const test of [...yieldInParameters, ...yieldInBody]) {
        fail(`"use strict"; ${test}`, {
            source: `"use strict"; ${test}`
        });
    }

    // Function context.
for (const test of [...yieldInParameters, ...yieldInBody]) {
    fail(`"use strict"; function f() { ${test} }`, {
        source: `"use strict"; function f() { ${test} }`
    });
}

// Generator context.
for (const test of yieldInParameters) {
    fail(`function* g() { ${test} }`, {
        source: `function* g() { ${test} }`
    });
}

for (const test of [...yieldInParameters, ...yieldInBody]) {
    fail(`"use strict"; function* g() { ${test} }`, {
        source: `"use strict"; function* g() { ${test} }`
    });
}

pass(`(function not_gen() { ({ get yield() { 1 } }) })`, {
    source: '(function not_gen() { ({ get yield() { 1 } }) })',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'yield',
                                                start: 29,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 34
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'Literal',
                                                                value: 1,
                                                                start: 39,
                                                                end: 40,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 39
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 40
                                                                    }
                                                                },
                                                                raw: '1'
                                                            },
                                                            start: 39,
                                                            end: 40,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 39
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 40
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 37,
                                                    end: 42,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 37
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 42
                                                        }
                                                    }
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 34,
                                                end: 42,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 34
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 42
                                                    }
                                                }
                                            },
                                            kind: 'get',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 25,
                                            end: 42,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 42
                                                }
                                            }
                                        }
                                    ],
                                    start: 23,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 23
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    }
                                },
                                start: 22,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            }
                        ],
                        start: 20,
                        end: 47,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
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
                    id: {
                        type: 'Identifier',
                        name: 'not_gen',
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
                    start: 1,
                    end: 47,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 47
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

pass(`(function * gen() { (function not_gen() { try { } catch (yield) { } }) })`, {
    source: '(function * gen() { (function not_gen() { try { } catch (yield) { } }) })',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'TryStatement',
                                                block: {
                                                    type: 'BlockStatement',
                                                    body: [],
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
                                                    }
                                                },
                                                handler: {
                                                    type: 'CatchClause',
                                                    param: {
                                                        type: 'Identifier',
                                                        name: 'yield',
                                                        start: 57,
                                                        end: 62,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 57
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 62
                                                            }
                                                        }
                                                    },
                                                    body: {
                                                        type: 'BlockStatement',
                                                        body: [],
                                                        start: 64,
                                                        end: 67,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 64
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 67
                                                            }
                                                        }
                                                    },
                                                    start: 50,
                                                    end: 67,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 50
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 67
                                                        }
                                                    }
                                                },
                                                finalizer: null,
                                                start: 42,
                                                end: 67,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 67
                                                    }
                                                }
                                            }
                                        ],
                                        start: 40,
                                        end: 69,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 69
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'not_gen',
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
                                    start: 21,
                                    end: 69,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 21
                                        },
                                        end: {
                                            line: 1,
                                            column: 69
                                        }
                                    }
                                },
                                start: 20,
                                end: 70,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 70
                                    }
                                }
                            }
                        ],
                        start: 18,
                        end: 72,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 72
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
                    start: 1,
                    end: 72,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 72
                        }
                    }
                },
                start: 0,
                end: 73,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 73
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 73,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 73
            }
        }
    }
});

pass(`function *a(){yield 0}`, {
    source: 'function *a(){yield 0}',
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
                                type: 'YieldExpression',
                                argument: {
                                    type: 'Literal',
                                    value: 0,
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
                                    raw: '0'
                                },
                                delegate: false,
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
                    start: 13,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 13
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                },
                async: false,
                generator: true,
                expression: false,
                id: {
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

pass('function * gen() { yield a; }', {
        source: 'function * gen() { yield a; }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                    delegate: false,
                                    start: 19,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                },
                                start: 19,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass('function * gen() { yield * \n a; }', {
        source: 'function * gen() { yield * \n a; }',
        expected: {
              body: [
                {
                  async: false,
                  body: {
                    body: [
                      {
                        expression: {
                          argument: {
                            name: 'a',
                            type: 'Identifier'
                          },
                          delegate: true,
                          type: 'YieldExpression'
                        },
                        type: 'ExpressionStatement'
                      }
                    ],
                    type: 'BlockStatement'
                  },
                  expression: false,
                  generator: true,
                  id: {
                    name: 'gen',
                   type: 'Identifier'
                  },
                  params: [],
                  type: 'FunctionDeclaration'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

pass('function * gen() { yield yield a; }', {
        source: 'function * gen() { yield yield a; }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'YieldExpression',
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
                                        delegate: false,
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
                                    delegate: false,
                                    start: 19,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                start: 19,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass('function * gen() { (yield * a) + (yield * b);; }', {
        source: 'function * gen() { (yield * a) + (yield * b);; }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                        delegate: true,
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
                                    right: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 42,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 42
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        },
                                        delegate: true,
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
                                    },
                                    operator: '+',
                                    start: 19,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    }
                                },
                                start: 19,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            },
                            {
                                type: 'EmptyStatement',
                                start: 45,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 45
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass('function * gen() { yield * a; return }', {
        source: 'function * gen() { yield * a; return }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'a',
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
                                        }
                                    },
                                    delegate: true,
                                    start: 19,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
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
                            },
                            {
                                type: 'ReturnStatement',
                                argument: null,
                                start: 30,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
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
                        name: 'gen',
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

pass('function * gen() { yield, yield }', {
        source: 'function * gen() { yield, yield }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'SequenceExpression',
                                    expressions: [
                                        {
                                            type: 'YieldExpression',
                                            argument: null,
                                            delegate: false,
                                            start: 19,
                                            end: 24,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 24
                                                }
                                            }
                                        },
                                        {
                                            type: 'YieldExpression',
                                            argument: null,
                                            delegate: false,
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
                                    start: 19,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                start: 19,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass('function * gen() { (yield) ? yield : yield }', {
        source: 'function * gen() { (yield) ? yield : yield }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'ConditionalExpression',
                                    test: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
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
                                    consequent: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 29,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 34
                                            }
                                        }
                                    },
                                    alternate: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 37,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    },
                                    start: 19,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                },
                                start: 19,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass('function * gen() { yield /* comment */ }', {
        source: 'function * gen() { yield /* comment */ }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
                                    start: 19,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                start: 19,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
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
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass('function * gen() { (yield) \n ? yield : yield }', {
        source: 'function * gen() { (yield) \n ? yield : yield }',
        expected: {
              body: [
                {
                  async: false,
                  body: {
                    body: [
                      {
                        expression: {
                          alternate: {
                            argument: null,
                            delegate: false,
                            type: 'YieldExpression'
                          },
                          consequent: {
                            argument: null,
                            delegate: false,
                            type: 'YieldExpression'
                          },
                          test: {
                            argument: null,
                            delegate: false,
                            type: 'YieldExpression'
                          },
                          type: 'ConditionalExpression'
                        },
                        type: 'ExpressionStatement'
                      }
                    ],
                    type: 'BlockStatement'
                  },
                  expression: false,
                  generator: true,
                  id: {
                    name: 'gen',
                    type: 'Identifier'
                  },
                  params: [],
                 type: 'FunctionDeclaration'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

pass('x = class extends (yield) {}', {
        source: 'x = class extends (a) {}',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
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
                        },
                        operator: '=',
                        right: {
                            type: 'ClassExpression',
                            id: null,
                            superClass: {
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
                            body: {
                                type: 'ClassBody',
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

pass('function * gen() { (yield) }', {
        source: 'function * gen() { (yield) }',
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
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
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
                                start: 19,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 28
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass(`function *a(){yield null}`, {
        source: 'function *a(){yield null}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Literal',
                                        value: null,
                                        start: 20,
                                        end: 24,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 24
                                            }
                                        },
                                        raw: 'null'
                                    },
                                    delegate: false,
                                    start: 14,
                                    end: 24,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 24
                                        }
                                    }
                                },
                                start: 14,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function *a(){yield+0}`, {
        source: 'function *a(){yield+0}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'UnaryExpression',
                                        operator: '+',
                                        argument: {
                                            type: 'Literal',
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        prefix: true,
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
                                    delegate: false,
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
                        start: 13,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function *a(){yield "a"}`, {
        source: 'function *a(){yield "a"}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Literal',
                                        value: 'a',
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
                                        },
                                        raw: '"a"'
                                    },
                                    delegate: false,
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
                                    }
                                },
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
                                }
                            }
                        ],
                        start: 13,
                        end: 24,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
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
                    id: {
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

pass(`function *a(){yield delete 0}`, {
        source: 'function *a(){yield delete 0}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'UnaryExpression',
                                        operator: 'delete',
                                        argument: {
                                            type: 'Literal',
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        prefix: true,
                                        start: 20,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    delegate: false,
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
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function *a(){yield typeof 0}`, {
        source: 'function *a(){yield typeof 0}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'UnaryExpression',
                                        operator: 'typeof',
                                        argument: {
                                            type: 'Literal',
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        prefix: true,
                                        start: 20,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    delegate: false,
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
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function *a(){yield 2e308}`, {
        source: 'function *a(){yield 2e308}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Literal',
                                        value: Infinity,
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
                                        raw: '2e308'
                                    },
                                    delegate: false,
                                    start: 14,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    }
                                },
                                start: 14,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
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
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function*a(){yield*a}`, {
        source: 'function*a(){yield*a}',
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
                                    type: 'YieldExpression',
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
                                    delegate: true,
                                    start: 13,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    }
                                },
                                start: 13,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            }
                        ],
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
                    async: false,
                    generator: true,
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

pass(`function a(){yield*a}`, {
        source: 'function a(){yield*a}',
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
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'yield',
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
                                        }
                                    },
                                    right: {
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
                                    operator: '*',
                                    start: 13,
                                    end: 20,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 20
                                        }
                                    }
                                },
                                start: 13,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            }
                        ],
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

pass(`function *a(){({get b(){yield}})}`, {
        source: 'function *a(){({get b(){yield}})}',
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
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'Identifier',
                                                                name: 'yield',
                                                                start: 24,
                                                                end: 29,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 24
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 29
                                                                    }
                                                                }
                                                            },
                                                            start: 24,
                                                            end: 29,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 24
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 29
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 23,
                                                    end: 30,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 23
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30
                                                        }
                                                    }
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 21,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            kind: 'get',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 16,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        }
                                    ],
                                    start: 15,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                start: 14,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function a(){({*[yield](){}})}`, {
        source: 'function a(){({*[yield](){}})}',
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
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'yield',
                                                start: 17,
                                                end: 22,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 22
                                                    }
                                                }
                                            },
                                            value: {
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
                                                id: null,
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
                                            kind: 'init',
                                            computed: true,
                                            method: true,
                                            shorthand: false,
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
                                        }
                                    ],
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
                            }
                        ],
                        start: 12,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 30
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

pass(`function *a(){({*[yield](){}})}`, {
        source: 'function *a(){({*[yield](){}})}',
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
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'YieldExpression',
                                                argument: null,
                                                delegate: false,
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
                                                }
                                            },
                                            value: {
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
                                                generator: true,
                                                expression: false,
                                                id: null,
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
                                            kind: 'init',
                                            computed: true,
                                            method: true,
                                            shorthand: false,
                                            start: 16,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        }
                                    ],
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
                                },
                                start: 14,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function *a(){({set b(yield){}})}`, {
        source: 'function *a(){({set b(yield){}})}',
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
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'yield',
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
                                                        }
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
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
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 21,
                                                end: 30,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            kind: 'set',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 16,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        }
                                    ],
                                    start: 15,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    }
                                },
                                start: 14,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 33
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function *a(){yield delete 0}`, {
        source: 'function *a(){yield delete 0}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'UnaryExpression',
                                        operator: 'delete',
                                        argument: {
                                            type: 'Literal',
                                            value: 0,
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
                                            raw: '0'
                                        },
                                        prefix: true,
                                        start: 20,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    delegate: false,
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
                    generator: true,
                    expression: false,
                    id: {
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

pass(`yield: 34`, {
        source: 'yield: 34',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'LabeledStatement',
                    label: {
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
                    },
                    body: {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'Literal',
                            value: 34,
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
                            },
                            raw: '34'
                        },
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
                }
            ],
            sourceType: 'script',
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
        }
    });

pass(`function yield(yield) { yield: yield (yield + yield(0)); }`, {
        source: 'function yield(yield) { yield: yield (yield + yield(0)); }',
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
                            type: 'Identifier',
                            name: 'yield',
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
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'LabeledStatement',
                                label: {
                                    type: 'Identifier',
                                    name: 'yield',
                                    start: 24,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 24
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
                                body: {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'yield',
                                            start: 31,
                                            end: 36,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 36
                                                }
                                            }
                                        },
                                        arguments: [
                                            {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'yield',
                                                    start: 38,
                                                    end: 43,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 43
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'CallExpression',
                                                    callee: {
                                                        type: 'Identifier',
                                                        name: 'yield',
                                                        start: 46,
                                                        end: 51,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 46
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 51
                                                            }
                                                        }
                                                    },
                                                    arguments: [
                                                        {
                                                            type: 'Literal',
                                                            value: 0,
                                                            start: 52,
                                                            end: 53,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 52
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 53
                                                                }
                                                            },
                                                            raw: '0'
                                                        }
                                                    ],
                                                    start: 46,
                                                    end: 54,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 46
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 54
                                                        }
                                                    }
                                                },
                                                operator: '+',
                                                start: 38,
                                                end: 54,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 38
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 54
                                                    }
                                                }
                                            }
                                        ],
                                        start: 31,
                                        end: 55,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 55
                                            }
                                        }
                                    },
                                    start: 31,
                                    end: 56,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 56
                                        }
                                    }
                                },
                                start: 24,
                                end: 56,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 24
                                    },
                                    end: {
                                        line: 1,
                                        column: 56
                                    }
                                }
                            }
                        ],
                        start: 22,
                        end: 58,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 58
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'yield',
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

pass(`({ get yield() { 1 } })`, {
        source: '({ get yield() { 1 } })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'yield',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
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
                                                    },
                                                    raw: '1'
                                                },
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
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            }
                        ],
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
            ],
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

pass(`yield[100]`, {
        source: 'yield[100]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'MemberExpression',
                        object: {
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
                        },
                        computed: true,
                        property: {
                            type: 'Literal',
                            value: 100,
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
                            },
                            raw: '100'
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
            ],
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

pass(`try { } catch (yield) { }`, {
        source: 'try { } catch (yield) { }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [],
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
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'yield',
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
                            }
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 22,
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 22
                                },
                                end: {
                                    line: 1,
                                    column: 25
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
                    finalizer: null,
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

pass(`var foo = yield = 1;`, {
        source: 'var foo = yield = 1;',
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
                                    name: 'yield',
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
                                operator: '=',
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
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

pass(`function foo(bar, yield) { }`, {
        source: 'function foo(bar, yield) { }',
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
                            type: 'Identifier',
                            name: 'bar',
                            start: 13,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: 'yield',
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
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'foo',
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

pass(`yield = 1;`, {
        source: 'yield = 1;',
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
                        },
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 1,
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
                            raw: '1'
                        },
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
                }
            ],
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

pass(`++yield;`, {
        source: '++yield;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'yield',
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
                        },
                        operator: '++',
                        prefix: true,
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
            ],
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

pass(`function *a(){yield ++a;}`, {
        source: 'function *a(){yield ++a;}',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'UpdateExpression',
                                        operator: '++',
                                        prefix: true,
                                        argument: {
                                            type: 'Identifier',
                                            name: 'a',
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
                                    delegate: false,
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
                                    }
                                },
                                start: 14,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
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

pass(`function * gen() { yield * 2; }`, {
        source: 'function * gen() { yield * 2; }',
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
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Literal',
                                        value: 2,
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
                                        raw: '2'
                                    },
                                    delegate: true,
                                    start: 19,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
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
                            }
                        ],
                        start: 17,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
pass(`function * gen() { (yield * 3) + (yield * 4); }`, {
        source: 'function * gen() { (yield * 3) + (yield * 4); }',
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
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Literal',
                                            value: 3,
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
                                            raw: '3'
                                        },
                                        delegate: true,
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
                                    right: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Literal',
                                            value: 4,
                                            start: 42,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 42
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            },
                                            raw: '4'
                                        },
                                        delegate: true,
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
                                    },
                                    operator: '+',
                                    start: 19,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 19
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    }
                                },
                                start: 19,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 47,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 47
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
            ],
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

pass(`function * gen() { ({ yield: 1 }) }`, {
        source: 'function * gen() { ({ yield: 1 }) }',
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
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'yield',
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
                                                }
                                            },
                                            value: {
                                                type: 'Literal',
                                                value: 1,
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
                                                },
                                                raw: '1'
                                            },
                                            kind: 'init',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 22,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 22
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 30
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                start: 19,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 19
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            }
                        ],
                        start: 17,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

pass(`(function * () { x = class extends (yield) {} });`, {
        source: '(function * () { x = class extends (yield) {} });',
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
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
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
                                        operator: '=',
                                        right: {
                                            type: 'ClassExpression',
                                            id: null,
                                            superClass: {
                                                type: 'YieldExpression',
                                                argument: null,
                                                delegate: false,
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
                                            body: {
                                                type: 'ClassBody',
                                                body: [],
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
                                            start: 21,
                                            end: 45,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 45
                                                }
                                            }
                                        },
                                        start: 17,
                                        end: 45,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 45
                                            }
                                        }
                                    },
                                    start: 17,
                                    end: 45,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 45
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 47,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 47
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 47,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 47
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

pass(`(function * () { x = class extends (a ? null : yield) { } });`, {
        source: '(function * () { x = class extends (a ? null : yield) { } });',
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
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
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
                                        operator: '=',
                                        right: {
                                            type: 'ClassExpression',
                                            id: null,
                                            superClass: {
                                                type: 'ConditionalExpression',
                                                test: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                consequent: {
                                                    type: 'Literal',
                                                    value: null,
                                                    start: 40,
                                                    end: 44,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 40
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 44
                                                        }
                                                    },
                                                    raw: 'null'
                                                },
                                                alternate: {
                                                    type: 'YieldExpression',
                                                    argument: null,
                                                    delegate: false,
                                                    start: 47,
                                                    end: 52,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 47
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 52
                                                        }
                                                    }
                                                },
                                                start: 36,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 36
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                }
                                            },
                                            body: {
                                                type: 'ClassBody',
                                                body: [],
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
                                                }
                                            },
                                            start: 21,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 57
                                                }
                                            }
                                        },
                                        start: 17,
                                        end: 57,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 57
                                            }
                                        }
                                    },
                                    start: 17,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 59,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 59
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 59,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 59
                            }
                        }
                    },
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

pass(`(function * () { yield * 1; return 37; yield * "dead"; });`, {
        source: '(function * () { yield * 1; return 37; yield * "dead"; });',
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
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Literal',
                                            value: 1,
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
                                            },
                                            raw: '1'
                                        },
                                        delegate: true,
                                        start: 17,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 17
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
                                            }
                                        }
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
                                },
                                {
                                    type: 'ReturnStatement',
                                    argument: {
                                        type: 'Literal',
                                        value: 37,
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
                                        raw: '37'
                                    },
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
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Literal',
                                            value: 'dead',
                                            start: 47,
                                            end: 53,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 47
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 53
                                                }
                                            },
                                            raw: '"dead"'
                                        },
                                        delegate: true,
                                        start: 39,
                                        end: 53,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 39
                                            },
                                            end: {
                                                line: 1,
                                                column: 53
                                            }
                                        }
                                    },
                                    start: 39,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 39
                                        },
                                        end: {
                                            line: 1,
                                            column: 54
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 56,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 56
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 56,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 56
                            }
                        }
                    },
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

pass(`(function * () { ({ [yield]: x } = { }) });`, {
        source: '(function * () { ({ [yield]: x } = { }) });',
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
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'AssignmentExpression',
                                        left: {
                                            type: 'ObjectPattern',
                                            properties: [
                                                {
                                                    type: 'Property',
                                                    key: {
                                                        type: 'YieldExpression',
                                                        argument: null,
                                                        delegate: false,
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
                                                    value: {
                                                        type: 'Identifier',
                                                        name: 'x',
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
                                                    kind: 'init',
                                                    computed: true,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 20,
                                                    end: 30,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 30
                                                        }
                                                    }
                                                }
                                            ],
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
                                        operator: '=',
                                        right: {
                                            type: 'ObjectExpression',
                                            properties: [],
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
                                            }
                                        },
                                        start: 18,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    },
                                    start: 17,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 17
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: null,
                        start: 1,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
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
});
import { pass, fail } from '../test-utils';

describe('Expressions - Await', () => {

    fail(`await a`, {
        source: 'await a',
        message: 'Unexpected token',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`async function foo() { (await 1) = 1; }`, {
        source: 'async function foo() { (await 1) = 1; }',
        message: 'Unexpected token',
        line: 1,
    });

    fail(`async(x = await) => {  }`, {
        source: 'async(x = await) => {  }',
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
        column: 10,
        index: 10
    });

    fail(`async () => await`, {
        source: 'async () => await',
        message: 'Unexpected token',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`async function foo() { await }`, {
        source: 'async function foo() { await }',
        message: 'Unexpected token',
        line: 1,
        column: 28,
        index: 28
    });

    fail(`async function foo() { (await 1) = 1; }`, {
        source: 'async function foo() { (await 1) = 1; }',
        message: 'Unexpected token',
        line: 1,
        column: 32,
        index: 32
    });

    fail(`async function foo() { await; }`, {
        source: 'async function foo() { await; }',
        message: 'Unexpected token',
        line: 1,
        column: 28,
        index: 28
    });

    fail(`({async foo() { await }})`, {
        source: `({async foo() { await }})`,
        module: true,
        message: 'Unexpected token',
        line: 1,
        column: 1,
        index: 1
    });

    fail(`async await => 1;`, {
        source: 'async await => 1;',
        message: 'Unexpected token',
        line: 1,
        column: 5,
        index: 5
    });

    fail(`async (await) => 1;`, {
        source: 'async (await) => 1;',
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
        column: 7,
        index: 7
    });

    fail(`async function f() { await }`, {
        source: 'async function f() { await }',
        message: 'Unexpected token',
        line: 1,
        column: 26,
        index: 26
    });

    fail(`async f() { x = { async await(){} } }`, {
        source: 'async f() { x = { async await(){} } }',
        message: 'Unexpected token',
        line: 1,
        column: 7,
        index: 7
    });

    fail(`async(e=await)=>l`, {
        source: 'async(e=await)=>l',
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
        column: 8,
        index: 8
    });

    fail(`async function f() { let await; }`, {
        source: 'async function f() { let await; }',
        message: 'Unexpected reserved word',
        line: 1,
        column: 24,
        index: 24
    });

    fail(`a = async function () { async function await() {} }`, {
        source: 'a = async function () { async function await() {} }',
        message: '\'await\' may not be used as an identifier in this context',
        line: 1,
        column: 38,
        index: 38
    });

    fail(`async function f() { g(await) }`, {
        source: 'async function f() { g(await) }',
        message: 'Unexpected token',
        line: 1,
        column: 28,
        index: 28
    });

    fail(`async function foo() { function await() { } }`, {
        source: 'async function foo() { function await() { } }',
        message: '\'await\' may not be used as an identifier in this context',
        line: 1,
        column: 31,
        index: 31
    });

    fail(`async f() { class X { async await(){} } }`, {
        source: 'async f() { class X { async await(){} } }',
        message: 'Unexpected token',
        line: 1,
        column: 7,
        index: 7
    });

    fail(`async function f() { return {g: await} }`, {
        source: 'async function f() { return {g: await} }',
        message: 'Unexpected token',
        line: 1,
        column: 37,
        index: 37
    });

    fail(`async function f(await) {}`, {
        source: 'async function f(await) {}',
        message: 'Unexpected reserved word',
        line: 1,
        column: 17,
        index: 17
    });

    fail(`class X { async f(await) {} }`, {
        source: 'class X { async f(await) {} }',
        message: 'Unexpected reserved word',
        line: 1,
        column: 18,
        index: 18
    });

    fail(`x = { async f(await){} }`, {
        source: 'x = { async f(await){} }',
        message: 'Unexpected reserved word',
        line: 1,
        column: 14,
        index: 14
    });

    fail(`async (await) => 42`, {
        source: 'async (await) => 42',
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
        column: 7,
        index: 7
    });

    fail(`async f() { x = { async await(){} } }`, {
        source: 'async f() { x = { async await(){} } }',
        message: 'Unexpected token',
        line: 1,
        column: 7,
        index: 7
    });
    fail(`async ({await}) => 1;`, {
        source: 'async ({await}) => 1;',
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
        column: 13,
        index: 13
    });

    fail(`async function foo() { return {await} };`, {
        source: 'async function foo() { return {await} };',
        message: '\'await\' may not be used as an identifier in this context',
        line: 1,
        column: 36,
        index: 36
    });

    fail(`async ([await]) => 1;`, {
        source: 'async ([await]) => 1;',
        message: '\'await\' is not a valid identifier name in an async function',
        line: 1,
        column: 8,
        index: 8
    });

    fail(`(async function foo(await) { });`, {
        source: '(async function foo(await) { });',
        message: 'Unexpected reserved word',
        line: 1,
        column: 20,
        index: 20
    });

    fail(`async function foo(await) { };`, {
        source: 'async function foo(await) { };',
        message: 'Unexpected reserved word',
        line: 1,
        column: 19,
        index: 19
    });

    fail(`await a;`, {
        source: 'await a;',
        message: 'Unexpected token',
        line: 1,
        column: 5,
        index: 5
    });

    pass(`function* foo(await) { yield await; };`, {
        source: 'function* foo(await) { yield await; };',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                    type: 'FunctionDeclaration',
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
                    },
                    id: {
                        type: 'Identifier',
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
                        name: 'foo'
                    },
                    generator: true,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'Identifier',
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
                        },
                        name: 'await'
                    }],
                    body: {
                        type: 'BlockStatement',
                        start: 21,
                        end: 37,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
                            },
                            end: {
                                line: 1,
                                column: 37
                            }
                        },
                        body: [{
                            type: 'ExpressionStatement',
                            start: 23,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            },
                            expression: {
                                type: 'YieldExpression',
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
                                },
                                delegate: false,
                                argument: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'await'
                                }
                            }
                        }]
                    }
                },
                {
                    type: 'EmptyStatement',
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
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`function foo(await) { return await; }`, {
        source: 'function foo(await) { return await; }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'FunctionDeclaration',
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
                },
                id: {
                    type: 'Identifier',
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
                    },
                    name: 'foo'
                },
                generator: false,
                expression: false,
                async: false,
                params: [{
                    type: 'Identifier',
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
                    name: 'await'
                }],
                body: {
                    type: 'BlockStatement',
                    start: 20,
                    end: 37,
                    loc: {
                        start: {
                            line: 1,
                            column: 20
                        },
                        end: {
                            line: 1,
                            column: 37
                        }
                    },
                    body: [{
                        type: 'ReturnStatement',
                        start: 22,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 22
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        },
                        argument: {
                            type: 'Identifier',
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
                            },
                            name: 'await'
                        }
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`async function foo(a = async () => await b) {};`, {
        source: 'async function foo(a = async () => await b) {};',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                    type: 'FunctionDeclaration',
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
                    },
                    id: {
                        type: 'Identifier',
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
                        name: 'foo'
                    },
                    generator: false,
                    expression: false,
                    async: true,
                    params: [{
                        type: 'AssignmentPattern',
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
                        },
                        left: {
                            type: 'Identifier',
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
                            name: 'a'
                        },
                        right: {
                            type: 'ArrowFunctionExpression',
                            start: 23,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            },
                            id: null,
                            generator: false,
                            expression: true,
                            async: true,
                            params: [],
                            body: {
                                type: 'AwaitExpression',
                                start: 35,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 35
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                },
                                argument: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'b'
                                }
                            }
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        },
                        body: []
                    }
                },
                {
                    type: 'EmptyStatement',
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
                    }
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`await = 0;`, {
        source: 'await = 0;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    left: {
                        type: 'Identifier',
                        name: 'await',
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
                        value: 0,
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
                        raw: '0'
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

    pass(`a = async(await);`, {
        source: 'a = async(await);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'AssignmentExpression',
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
                    },
                    operator: '=',
                    left: {
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
                    },
                    right: {
                        type: 'CallExpression',
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
                        },
                        callee: {
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
                        arguments: [{
                            type: 'Identifier',
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
                            },
                            name: 'await'
                        }]
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`(async function foo(a) { await a });`, {
        source: '(async function foo(a) { await a });',
        loc: true,
        ranges: true,
        module: true,
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
            sourceType: 'module',
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

    pass(`async function foo(a = async () => await b) {};`, {
        source: 'async function foo(a = async () => await b) {};',
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'AwaitExpression',
                                argument: {
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
                                start: 35,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 35
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: true,
                            generator: false,
                            expression: true,
                            start: 23,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
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
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
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
                },
                {
                    type: 'EmptyStatement',
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
                    }
                }
            ],
            sourceType: 'module',
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

    pass(`async function foo() { await + 1 };`, {
        source: 'async function foo() { await + 1 };',
        loc: true,
        ranges: true,
        module: true,
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
                                type: 'AwaitExpression',
                                argument: {
                                    type: 'UnaryExpression',
                                    operator: '+',
                                    argument: {
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
                                    prefix: true,
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
                                start: 23,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            start: 23,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 23
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        }],
                        start: 21,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 21
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
                {
                    type: 'EmptyStatement',
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
                }
            ],
            sourceType: 'module',
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

    pass(`async function foo(a, b) { await a };`, {
        source: 'async function foo(a, b) { await a };',
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'FunctionDeclaration',
                    params: [{
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
                        {
                            type: 'Identifier',
                            name: 'b',
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
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'AwaitExpression',
                                argument: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                }
                            },
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
                            }
                        }],
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
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
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
                },
                {
                    type: 'EmptyStatement',
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
                }
            ],
            sourceType: 'module',
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
        }
    });

    pass(`class A {async foo() { }};`, {
        source: 'class A {async foo() { }};',
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
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
                        body: [{
                            type: 'MethodDefinition',
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
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                async: true,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 18,
                                end: 24,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            static: false,
                            start: 9,
                            end: 24,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        }],
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
            sourceType: 'module',
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

    pass(`class A {*async() { }};`, {
        source: 'class A {*async() { }};',
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'A',
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
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'async',
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
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
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
                                generator: true,
                                expression: false,
                                id: null,
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
                            static: false,
                            start: 9,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        }],
                        start: 8,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
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
                },
                {
                    type: 'EmptyStatement',
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
            sourceType: 'module',
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

    pass(`({async foo() { }});`, {
        source: '({async foo() { }});',
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
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
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            async: true,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 11,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            }
                        },
                        kind: 'init',
                        computed: false,
                        method: true,
                        shorthand: false,
                        start: 2,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    }],
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
            sourceType: 'module',
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

    pass(`({foo() { }});`, {
        source: '({foo() { }});',
        loc: true,
        ranges: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 2,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'init',
                        computed: false,
                        method: true,
                        shorthand: false,
                        start: 2,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    }],
                    start: 1,
                    end: 12,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 12
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
            sourceType: 'module',
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
    pass(`function f(await) {}`, {
        source: 'function f(await) {}',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [{
                    type: 'Identifier',
                    name: 'await',
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
                    }
                }],
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

    pass(`function* await() {}`, {
        source: 'function* await() {}',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
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
                async: false,
                generator: true,
                expression: false,
                id: {
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

    pass(`await => {};`, {
        source: 'await => {};',
        ranges: true,
        loc: true,
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
                        name: 'await',
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

    pass(`class await {}`, {
        source: 'class await {}',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'await',
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
                superClass: null,
                body: {
                    type: 'ClassBody',
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

    pass(`(class { constructor(await) {} });`, {
        source: '(class { constructor(await) {} });',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'constructor',
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
                            kind: 'constructor',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [{
                                    type: 'Identifier',
                                    name: 'await',
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
                                }],
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
                            },
                            static: false,
                            start: 9,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        }],
                        start: 7,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    start: 1,
                    end: 32,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 32
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
            }],
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

    pass(`(class { static m(await) {} });`, {
        source: '(class { static m(await) {} });',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'm',
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
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [{
                                    type: 'Identifier',
                                    name: 'await',
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
                                }],
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
                            static: true,
                            start: 9,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }],
                        start: 7,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    start: 1,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 29
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
            }],
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

    pass(`(class { *m(await) {} });`, {
        source: '(class { *m(await) {} });',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'm',
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
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [{
                                    type: 'Identifier',
                                    name: 'await',
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
                                }],
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
                                async: false,
                                generator: true,
                                expression: false,
                                id: null,
                                start: 11,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 21
                                    }
                                }
                            },
                            static: false,
                            start: 9,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        }],
                        start: 7,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 1,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 23
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
            }],
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

    pass(`({ set p(await) {} });`, {
        source: '({ set p(await) {} });',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'p',
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
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'await',
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
                            }],
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
                            id: null,
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
                        kind: 'set',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }],
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

    pass(`try {} catch (await) {}`, {
        source: 'try {} catch (await) {}',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'TryStatement',
                block: {
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
                handler: {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'await',
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
                    start: 7,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                },
                finalizer: null,
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

    pass(`try {} catch (await) {} finally {}`, {
        source: 'try {} catch (await) {} finally {}',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'TryStatement',
                block: {
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
                handler: {
                    type: 'CatchClause',
                    param: {
                        type: 'Identifier',
                        name: 'await',
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
                    start: 7,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                },
                finalizer: {
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
            }],
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

    pass(`(class { static *await() {} });`, {
        source: '(class { static *await() {} });',
        ranges: true,
        loc: true,
        raw: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [{
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'await',
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
                            kind: 'method',
                            computed: false,
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
                            static: true,
                            start: 9,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }],
                        start: 7,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 29
                            }
                        }
                    },
                    start: 1,
                    end: 29,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 29
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
            }],
            sourceType: 'module',
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

    pass(`({ await() {} });`, {
        source: '({ await() {} });',
        ranges: true,
        loc: true,
        module: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'await',
                            start: 3,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        method: true,
                        shorthand: false,
                        start: 3,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    }],
                    start: 1,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 15
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
            sourceType: 'module',
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

    pass(`({}).await;`, {
        source: '({}).await;',
        ranges: true,
        module: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'MemberExpression',
                    object: {
                        type: 'ObjectExpression',
                        properties: [],
                        start: 1,
                        end: 3,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 3
                            }
                        }
                    },
                    computed: false,
                    property: {
                        type: 'Identifier',
                        name: 'await',
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
            sourceType: 'module',
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

    pass(`({ set await(x) {} });`, {
        source: '({ set await(x) {} });',
        ranges: true,
        loc: true,
        raw: true,
        module: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'await',
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
                            params: [{
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
                            }],
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
                            id: null,
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
                        kind: 'set',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    }],
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
            sourceType: 'module',
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

    pass(`({ await: null });`, {
        source: '({ await: null });',
        ranges: true,
        module: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'await',
                            start: 3,
                            end: 8,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: null,
                            start: 10,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        }
                    }],
                    start: 1,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
                        },
                        end: {
                            line: 1,
                            column: 16
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
            sourceType: 'module',
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

});
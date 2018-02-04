import { pass, fail } from '../test-utils';

describe('Expressions - Async Generator', () => {

     // The name of the NFE is bound in the generator, which does not permit
    // yield or await to be identifiers.
    fail(`async function * gen() { (async function * yield() { }) }`, {
        source: 'async function * gen() { (async function * yield() { }) }',
        line: 1,
    });

    fail(`async function* f() { () => await a; }`, {
        source: 'async function* f() { () => await a; }',
        line: 1,
    });

    fail(`f = async function*() { () => await a; }`, {
        source: 'f = async function*() { () => await a; }',
        line: 1,
    });

    fail(`class A { async* f() { () => await a; } }`, {
        source: 'class A { async* f() { () => await a; } }',
        line: 1,
    });

    fail(`obj = { *async f() {}`, {
        source: 'obj = { *async f() {}',
        line: 1,
    });

    fail(`obj = { *async* f() {}`, {
        source: 'obj = { *async* f() {}',
        line: 1,
    });

    fail(`class A { *async* f() {} }`, {
        source: 'class A { *async* f() {} }',
        line: 1,
    });

    fail(`async function* f() { () => yield a; }`, {
        source: 'async function* f() { () => yield a; }',
        line: 1,
    });

    fail(`f = async function*() { () => yield a; }`, {
        source: 'f = async function*() { () => yield a; }',
        line: 1,
    });

    fail(`f = async function*() { () => yield a; }`, {
        source: 'f = async function*() { () => yield a; }',
        line: 1,
    });

    fail(`class A { async* f() { () => yield a; } }`, {
        source: 'class A { async* f() { () => yield a; } }',
        line: 1,
    });

    fail(`async function * gen() { (async function * await() { }) }`, {
        source: 'async function * gen() {  (async function * await() { }) }',
        line: 1,
    });

    fail(`async function * gen() { async function * foo(yield) { } }`, {
        source: 'async function * gen() { async function * foo(yield) { } }',
        line: 1,
    });

    fail(`async function * gen() { await = 1; }`, {
        source: 'async function * gen() { await = 1; }',
        line: 1,
    });

    fail(`async function * gen() { ++await; }`, {
        source: 'async function * gen() { ++await; }',
        line: 1,
    });

    fail(`async function * gen() { yield //comment\n {yield: 42} }`, {
        source: 'async function * gen() { yield //comment\n {yield: 42}}',
        line: 2,
    });

    fail(`async function * gen() { var [yield] = [42]; }`, {
        source: 'async function * gen() { var [yield] = [42]; }',
        line: 1,
    });

    fail(`async function * gen() { var [await] = [42]; }`, {
        source: 'async function * gen() { var [await] = [42]; }',
        line: 1,
    });

    fail(`async function * gen() { var {foo: yield} = {a: 42}; }`, {
        source: 'async function * gen() { var {foo: yield} = {a: 42};}',
        line: 1,
    });

    fail(`async function * gen() { ({a: yield} = {a: 42}); }`, {
        source: 'async function * gen() { ({a: yield} = {a: 42}); }',
        line: 1,
    });

    fail(`async function * gen() { ({a: await} = {a: 42}); }`, {
        source: 'async function * gen() { ({a: await} = {a: 42}); }',
        line: 1,
    });

    fail(`async function * gen() { var [yield 24] = [42]; }`, {
        source: 'async function * gen() { var [yield 24] = [42]; }',
        line: 1,
    });

    fail(`async function * gen() { var [await 24] = [42]; }`, {
        source: 'async function * gen() { var [await 24] = [42]; }',
        line: 1,
    });

    fail(`async function * gen() { var {foo: yield 24} = {a: 42}; }`, {
        source: 'async function * gen() { var {foo: yield 24} = {a: 42}; }',
        line: 1,
    });

    fail(`async function * gen() { for (yield 'x' of {}); }`, {
        source: 'async function * gen() { for (yield "x" of {}); }',
        line: 1,
    });

    fail(`"use strict"; async function * gen() { class C extends yield { } }`, {
        source: '"use strict"; async function * gen() { class C extends yield { } }',
        line: 1,
    });

    fail(`"use strict"; async function * gen() { var foo = yield = 1; }`, {
        source: '"use strict"; async function * gen() { var foo = yield = 1;}',
        line: 1,
    });

    fail(`"use strict"; async function * gen() { async function * foo(await) { } }`, {
        source: '"use strict"; async function * gen() { async function * foo(await) { } }',
        line: 1,
    });

    fail(`"use strict"; async function * gen() { yield 3 + yield 4; }`, {
        source: '"use strict"; async function * gen() { yield 3 + yield 4; }',
        line: 1,
    });

    fail(`"use strict"; async function * gen() {try { } catch (yield) { } }`, {
        source: '"use strict"; async function * gen() { try { } catch (yield) { } }',
        line: 1,
    });

    fail(`"use strict"; async function * gen() { try { } catch (await) { } }`, {
        source: '"use strict"; async function * gen() { try { } catch (await) { } }',
        line: 1,
    });

    fail(`"use strict"; async function *gen() {
        callCount += 1;
        (function() {
            var yield;
            throw new Test262Error();
          }())
      }`, {
        source: `"use strict"; async function *gen() {
            callCount += 1;
            (function() {
                var yield;
                throw new Test262Error();
              }())
          }`,
        line: 4,
    });

    pass(`async function * gen() { (yield * 3) + (yield * 4); }`, {
        source: 'async function * gen() { (yield * 3) + (yield * 4); }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                            },
                                            raw: '3'
                                        },
                                        delegate: true,
                                        start: 26,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'YieldExpression',
                                        argument: {
                                            type: 'Literal',
                                            value: 4,
                                            start: 48,
                                            end: 49,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 48
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 49
                                                }
                                            },
                                            raw: '4'
                                        },
                                        delegate: true,
                                        start: 40,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 40
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    operator: '+',
                                    start: 25,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                start: 25,
                                end: 51,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 51
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 53,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 53
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
            ],
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

    pass(`async function * gen() { (function (yield) { }) }`, {
        source: 'async function * gen() { (function (yield) { }) }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'yield',
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
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 26,
                                    end: 46,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 46
                                        }
                                    }
                                },
                                start: 25,
                                end: 47,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 47
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 49,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 49
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

    pass(`obj = { async* f() { await a; yield b; } }`, {
        source: 'obj = { async* f() { await a; yield b; } }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'obj',
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
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                        type: 'FunctionExpression',
                                        params: [],
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
                                                        start: 21,
                                                        end: 28,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 28
                                                            }
                                                        }
                                                    },
                                                    start: 21,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 21
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
                                                        type: 'YieldExpression',
                                                        argument: {
                                                            type: 'Identifier',
                                                            name: 'b',
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
                                                        delegate: false,
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
                                                    start: 30,
                                                    end: 38,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 38
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 19,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        async: true,
                                        generator: true,
                                        expression: false,
                                        id: null,
                                        start: 16,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
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
                                }
                            ],
                            start: 6,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            }
                        },
                        start: 0,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
                        }
                    }
                }
            ],
            start: 0,
            end: 42,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 42
                }
            }
        }
    });

    pass(`async function* f() { await a; yield b; }`, {
        source: 'async function* f() { await a; yield b; }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                    type: 'AwaitExpression',
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
                                    start: 22,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
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
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    delegate: false,
                                    start: 31,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                },
                                start: 31,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 20,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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

    pass(`async function * gen() { yield { yield: 12 } }`, {
        source: 'async function * gen() { yield { yield: 12 } }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'yield',
                                                    start: 33,
                                                    end: 38,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 33
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 38
                                                        }
                                                    }
                                                },
                                                value: {
                                                    type: 'Literal',
                                                    value: 12,
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
                                                    },
                                                    raw: '12'
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 33,
                                                end: 42,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 42
                                                    }
                                                }
                                            }
                                        ],
                                        start: 31,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    },
                                    delegate: false,
                                    start: 25,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    }
                                },
                                start: 25,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

    pass(`async function * gen() { yield /* comment */ { yield: 12 } }`, {
        source: 'async function * gen() { yield /* comment */ { yield: 12 } }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                        type: 'ObjectExpression',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'yield',
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
                                                value: {
                                                    type: 'Literal',
                                                    value: 12,
                                                    start: 54,
                                                    end: 56,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 54
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 56
                                                        }
                                                    },
                                                    raw: '12'
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 47,
                                                end: 56,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 47
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 56
                                                    }
                                                }
                                            }
                                        ],
                                        start: 45,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 45
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    },
                                    delegate: false,
                                    start: 25,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    }
                                },
                                start: 25,
                                end: 58,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 58
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 60,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 60
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
                    start: 0,
                    end: 60,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 60
                        }
                    }
                }
            ],
            start: 0,
            end: 60,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 60
                }
            }
        }
    });

    pass(`async function * gen() { yield 1; return }`, {
        source: 'async function * gen() { yield 1; return }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                start: 25,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            },
                            {
                                type: 'ReturnStatement',
                                argument: null,
                                start: 34,
                                end: 40,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 34
                                    },
                                    end: {
                                        line: 1,
                                        column: 40
                                    }
                                }
                            }
                        ],
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
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
                        }
                    }
                }
            ],
            start: 0,
            end: 42,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 42
                }
            }
        }
    });

    pass(`async function * gen() { ({ get yield() { } }) }`, {
        source: 'async function * gen() { ({ get yield() { } }) }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                                start: 32,
                                                end: 37,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 32
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 37
                                                    }
                                                }
                                            },
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
                                                    start: 40,
                                                    end: 43,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 40
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 43
                                                        }
                                                    }
                                                },
                                                async: false,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 37,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 43
                                                    }
                                                }
                                            },
                                            kind: 'get',
                                            computed: false,
                                            method: false,
                                            shorthand: false,
                                            start: 28,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 43
                                                }
                                            }
                                        }
                                    ],
                                    start: 26,
                                    end: 45,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 45
                                        }
                                    }
                                },
                                start: 25,
                                end: 46,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 46
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

    pass(`async function * gen() { yield }`, {
        source: 'async function * gen() { yield }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                            }
                        ],
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
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
                }
            ],
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
        }
    });

    pass(`async function * gen() { x = class extends (a ? null : yield) { } }`, {
        source: 'async function * gen() { x = class extends (a ? null : yield) { } }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                    type: 'AssignmentExpression',
                                    left: {
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
                                    operator: '=',
                                    right: {
                                        type: 'ClassExpression',
                                        id: null,
                                        superClass: {
                                            type: 'ConditionalExpression',
                                            test: {
                                                type: 'Identifier',
                                                name: 'a',
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
                                                }
                                            },
                                            consequent: {
                                                type: 'Literal',
                                                value: null,
                                                start: 48,
                                                end: 52,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 48
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 52
                                                    }
                                                },
                                                raw: 'null'
                                            },
                                            alternate: {
                                                type: 'YieldExpression',
                                                argument: null,
                                                delegate: false,
                                                start: 55,
                                                end: 60,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 55
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 60
                                                    }
                                                }
                                            },
                                            start: 44,
                                            end: 60,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 44
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 60
                                                }
                                            }
                                        },
                                        body: {
                                            type: 'ClassBody',
                                            body: [],
                                            start: 62,
                                            end: 65,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 62
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 65
                                                }
                                            }
                                        },
                                        start: 29,
                                        end: 65,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 29
                                            },
                                            end: {
                                                line: 1,
                                                column: 65
                                            }
                                        }
                                    },
                                    start: 25,
                                    end: 65,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 65
                                        }
                                    }
                                },
                                start: 25,
                                end: 65,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 65
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 67,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 67
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
                    start: 0,
                    end: 67,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 67
                        }
                    }
                }
            ],
            start: 0,
            end: 67,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 67
                }
            }
        }
    });

    pass(`async function * gen() { await 10; return }`, {
        source: 'async function * gen() { await 10; return }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                    type: 'AwaitExpression',
                                    argument: {
                                        type: 'Literal',
                                        value: 10,
                                        start: 31,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 31
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        },
                                        raw: '10'
                                    },
                                    start: 25,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 25,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            {
                                type: 'ReturnStatement',
                                argument: null,
                                start: 35,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 35
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
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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

    pass(`async function * gen() { await (yield /* comment */) }`, {
        source: 'async function * gen() { await (yield /* comment */) }',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                    type: 'AwaitExpression',
                                    argument: {
                                        type: 'YieldExpression',
                                        argument: null,
                                        delegate: false,
                                        start: 32,
                                        end: 37,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 32
                                            },
                                            end: {
                                                line: 1,
                                                column: 37
                                            }
                                        }
                                    },
                                    start: 25,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                },
                                start: 25,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 54,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 54
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'gen',
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
                    start: 0,
                    end: 54,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 54
                        }
                    }
                }
            ],
            start: 0,
            end: 54,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 54
                }
            }
        }
    });

    pass(`({ async * gen () { yield 1; return } })`, {
        source: '({ async * gen () { yield 1; return } })',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                value: {
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
                                                    delegate: false,
                                                    start: 20,
                                                    end: 27,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 27
                                                        }
                                                    }
                                                },
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
                                            {
                                                type: 'ReturnStatement',
                                                argument: null,
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
                                            }
                                        ],
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
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 15,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 3,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 39
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

    pass(`({ async * gen () { yield * 1; return 37; yield * 'dead'; } })`, {
        source: '({ async * gen () { yield * 1; return 37; yield * "dead"; } })',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                                value: {
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
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Literal',
                                                    value: 37,
                                                    start: 38,
                                                    end: 40,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 40
                                                        }
                                                    },
                                                    raw: '37'
                                                },
                                                start: 31,
                                                end: 41,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 41
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
                                                        start: 50,
                                                        end: 56,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 50
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 56
                                                            }
                                                        },
                                                        raw: '"dead"'
                                                    },
                                                    delegate: true,
                                                    start: 42,
                                                    end: 56,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 42
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 56
                                                        }
                                                    }
                                                },
                                                start: 42,
                                                end: 57,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 57
                                                    }
                                                }
                                            }
                                        ],
                                        start: 18,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 59
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
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
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 3,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 59
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 61,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 61
                            }
                        }
                    },
                    start: 0,
                    end: 62,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 62
                        }
                    }
                }
            ],
            start: 0,
            end: 62,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 62
                }
            }
        }
    });

    pass(`f = async function*([...[...x]] =  [1, 2, 3]) {}`, {
        source: 'f = async function*([...[...x]] =  [1, 2, 3]) {}',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'f',
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
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'RestElement',
                                                argument: {
                                                    type: 'ArrayPattern',
                                                    elements: [
                                                        {
                                                            type: 'RestElement',
                                                            argument: {
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
                                                        }
                                                    ],
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
                                            }
                                        ],
                                        start: 20,
                                        end: 31,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 31
                                            }
                                        }
                                    },
                                    right: {
                                        type: 'ArrayExpression',
                                        elements: [
                                            {
                                                type: 'Literal',
                                                value: 1,
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
                                            {
                                                type: 'Literal',
                                                value: 2,
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
                                            },
                                            {
                                                type: 'Literal',
                                                value: 3,
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
                                            }
                                        ],
                                        start: 35,
                                        end: 44,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 35
                                            },
                                            end: {
                                                line: 1,
                                                column: 44
                                            }
                                        }
                                    },
                                    start: 20,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    }
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 46,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 46
                                    },
                                    end: {
                                        line: 1,
                                        column: 48
                                    }
                                }
                            },
                            async: true,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 4,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 48
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

    pass(`f = async function*([x = 23]) {}`, {
        source: 'f = async function*([x = 23]) {}',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'f',
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
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 23,
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
                                            start: 21,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        }
                                    ],
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
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 30,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            async: true,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 4,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
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
                }
            ],
            sourceType: 'script',
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
        }
    });

    pass(`f = async function*([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}`, {
        source: 'f = async function*([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'f',
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
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'ArrayPattern',
                                    elements: [
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
                                                        computed: false,
                                                        value: {
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
                                                        method: false,
                                                        shorthand: true,
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
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        method: false,
                                                        shorthand: true,
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
                                                    {
                                                        type: 'Property',
                                                        kind: 'init',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        computed: false,
                                                        value: {
                                                            type: 'Identifier',
                                                            name: 'z',
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
                                                        method: false,
                                                        shorthand: true,
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
                                                    }
                                                ],
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
                                            },
                                            right: {
                                                type: 'ObjectExpression',
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                            value: 44,
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
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
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
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                            }
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 55,
                                                            start: 47,
                                                            end: 49,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 47
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 49
                                                                }
                                                            }
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 44,
                                                        end: 49,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 44
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 49
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'z',
                                                            start: 51,
                                                            end: 52,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 51
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 52
                                                                }
                                                            }
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 66,
                                                            start: 54,
                                                            end: 56,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 54
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 56
                                                                }
                                                            }
                                                        },
                                                        kind: 'init',
                                                        computed: false,
                                                        method: false,
                                                        shorthand: false,
                                                        start: 51,
                                                        end: 56,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 51
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 56
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 35,
                                                end: 58,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 35
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 58
                                                    }
                                                }
                                            },
                                            start: 21,
                                            end: 58,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 58
                                                }
                                            }
                                        }
                                    ],
                                    start: 20,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 20
                                        },
                                        end: {
                                            line: 1,
                                            column: 59
                                        }
                                    }
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 61,
                                end: 63,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 61
                                    },
                                    end: {
                                        line: 1,
                                        column: 63
                                    }
                                }
                            },
                            async: true,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 4,
                            end: 63,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 63
                                }
                            }
                        },
                        start: 0,
                        end: 63,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 63
                            }
                        }
                    },
                    start: 0,
                    end: 63,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 63
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 63,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 63
                }
            }
        }
    });

    pass(`async function* f() { await a; yield b; }`, {
        source: 'async function* f() { await a; yield b; }',
        ranges: true,
        loc: true,
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
                                    type: 'AwaitExpression',
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
                                    start: 22,
                                    end: 29,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 29
                                        }
                                    }
                                },
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
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    delegate: false,
                                    start: 31,
                                    end: 38,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 38
                                        }
                                    }
                                },
                                start: 31,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 20,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 20
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    async: true,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'f',
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

    pass(`obj = { async* f() { await a; yield b; } }`, {
        source: 'obj = { async* f() { await a; yield b; } }',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'obj',
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
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'f',
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
                                        type: 'FunctionExpression',
                                        params: [],
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
                                                        start: 21,
                                                        end: 28,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 28
                                                            }
                                                        }
                                                    },
                                                    start: 21,
                                                    end: 29,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 21
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
                                                        type: 'YieldExpression',
                                                        argument: {
                                                            type: 'Identifier',
                                                            name: 'b',
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
                                                        delegate: false,
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
                                                    start: 30,
                                                    end: 38,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 38
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 19,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        async: true,
                                        generator: true,
                                        expression: false,
                                        id: null,
                                        start: 16,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 40
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
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
                                }
                            ],
                            start: 6,
                            end: 42,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 42
                                }
                            }
                        },
                        start: 0,
                        end: 42,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 42
                            }
                        }
                    },
                    start: 0,
                    end: 42,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 42
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 42,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 42
                }
            }
        }
    });

    pass(`class A { async* f() { await a; yield b; } }`, {
        source: 'class A { async* f() { await a; yield b; } }',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'f',
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
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
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
                                                start: 23,
                                                end: 31,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'YieldExpression',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'b',
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
                                                    delegate: false,
                                                    start: 32,
                                                    end: 39,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 32
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 39
                                                        }
                                                    }
                                                },
                                                start: 32,
                                                end: 40,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 32
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 40
                                                    }
                                                }
                                            }
                                        ],
                                        start: 21,
                                        end: 42,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 42
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 18,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 18
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 44
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

    pass(`class A { static async* f() { await a; yield b; } }`, {
        source: 'class A { static async* f() { await a; yield b; } }',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
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
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: 'f',
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
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
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
                                                start: 30,
                                                end: 38,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
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
                                                        type: 'Identifier',
                                                        name: 'b',
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
                                                    },
                                                    delegate: false,
                                                    start: 39,
                                                    end: 46,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 39
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 46
                                                        }
                                                    }
                                                },
                                                start: 39,
                                                end: 47,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 39
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 47
                                                    }
                                                }
                                            }
                                        ],
                                        start: 28,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 28
                                            },
                                            end: {
                                                line: 1,
                                                column: 49
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 25,
                                    end: 49,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 25
                                        },
                                        end: {
                                            line: 1,
                                            column: 49
                                        }
                                    }
                                },
                                static: true,
                                start: 10,
                                end: 49,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 49
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 51,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 51
                            }
                        }
                    },
                    start: 0,
                    end: 51,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 51
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 51,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 51
                }
            }
        }
    });

    pass(`var gen = { async *method() {} }`, {
        source: 'var gen = { async *method() {} }',
        ranges: true,
        loc: true,
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
                                            name: 'method',
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
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
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
                                            async: true,
                                            generator: true,
                                            expression: false,
                                            id: null,
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
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
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
                                    }
                                ],
                                start: 10,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'gen',
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
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        }
                    ],
                    kind: 'var',
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
                }
            ],
            sourceType: 'script',
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
        }
    });

    pass(`var C = class { async *method() {} }`, {
        source: 'var C = class { async *method() {} }',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'ClassExpression',
                                id: null,
                                superClass: null,
                                body: {
                                    type: 'ClassBody',
                                    body: [
                                        {
                                            type: 'MethodDefinition',
                                            key: {
                                                type: 'Identifier',
                                                name: 'method',
                                                start: 23,
                                                end: 29,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 29
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
                                                async: true,
                                                generator: true,
                                                expression: false,
                                                id: null,
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
                                            static: false,
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
                                        }
                                    ],
                                    start: 14,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
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
                            id: {
                                type: 'Identifier',
                                name: 'C',
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
                            end: 36,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 36
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`f = async function*() { await a; yield b; }`, {
        source: 'f = async function*() { await a; yield b; }',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'f',
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
                            type: 'FunctionExpression',
                            params: [],
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
                                            start: 24,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 31
                                                }
                                            }
                                        },
                                        start: 24,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    },
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'YieldExpression',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            },
                                            delegate: false,
                                            start: 33,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 40
                                                }
                                            }
                                        },
                                        start: 33,
                                        end: 41,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 41
                                            }
                                        }
                                    }
                                ],
                                start: 22,
                                end: 43,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 43
                                    }
                                }
                            },
                            async: true,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 4,
                            end: 43,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 43
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

    pass(`f = async function*([x = 23]) {}`, {
        source: 'f = async function*([x = 23]) {}',
        ranges: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'f',
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
                            type: 'FunctionExpression',
                            params: [
                                {
                                    type: 'ArrayPattern',
                                    elements: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                type: 'Literal',
                                                value: 23,
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
                                            start: 21,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 27
                                                }
                                            }
                                        }
                                    ],
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
                                }
                            ],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 30,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            async: true,
                            generator: true,
                            expression: false,
                            id: null,
                            start: 4,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
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
                }
            ],
            sourceType: 'script',
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
        }
    });

});
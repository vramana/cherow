import { pass, fail } from '../utils';
describe('Next - For await of', () => {

    fail('async function fn() { for await ([[x[yield]]] of [[[]]]) }', {
        source: `async function fn() { for await ([[x[yield]]] of [[[]]]) }`,
        next: true,
        message: 'Unexpected token \'}\'',
        line: 1,
        column: 57,
        index: 58
    });

    fail('async function fn() { for await ([[x[yield]]] in [[[]]]) }', {
        source: `async function fn() { for await ([[x[yield]]] in [[[]]]) }`,
        next: true,
        message: 'Unexpected token \'[\'',
        line: 1,
        column: 49,
        index: 50
    });
    fail('"use strict"; async function fn() { for await ([[x[yield]]] of [[[]]]) }', {
        source: `"use strict"; async function fn() { for await ([[x[yield]]] of [[[]]]) }`,
        next: true,
        message: 'Unexpected token \'yield\'',
        line: 1,
        column: 51,
        index: 56
    });

    fail('async function fn() { for await ([{ x = yield }] of [[{}]]) }', {
        source: `async function fn() { for await ([{ x = yield }] of [[{}]]) }`,
        next: true,
        message: 'Unexpected token \'}\'',
        line: 1,
        column: 60,
        index: 61
    });
    fail('async function *fn() { for await (let [...{ x } = []] of foo) {} }', {
        source: `async function *fn() { for await (let [...{ x } = []] of foo) {} }`,
        next: true,
        message: 'Unexpected token \'=\'',
        line: 1,
        column: 48,
        index: 49
    });
    fail('async function *fn() { for await (let [...[ x ] = []] of foo) {} }', {
        source: `async function *fn() { for await (let [...[ x ] = []] of foo) {} }`,
        next: true,
        message: 'Unexpected token \'=\'',
        line: 1,
        column: 48,
        index: 49
    });

    pass(`statement in an async function declaration`, {
        source: `async function fn() {
            for await ([ x = 'x' in {} ] of [[]]) {
            }
          }`,
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 72,
                            end: 87,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 50
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 47,
                                    end: 48,
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
                                right: {
                                    type: 'BinaryExpression',
                                    left: {
                                        type: 'Literal',
                                        value: 'x',
                                        start: 51,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 29
                                            },
                                            end: {
                                                line: 2,
                                                column: 32
                                            }
                                        },
                                        raw: '\'x\''
                                    },
                                    right: {
                                        type: 'ObjectExpression',
                                        properties: [],
                                        start: 58,
                                        end: 60,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 36
                                            },
                                            end: {
                                                line: 2,
                                                column: 38
                                            }
                                        }
                                    },
                                    operator: 'in',
                                    start: 51,
                                    end: 60,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 29
                                        },
                                        end: {
                                            line: 2,
                                            column: 38
                                        }
                                    }
                                },
                                start: 47,
                                end: 60,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 25
                                    },
                                    end: {
                                        line: 2,
                                        column: 38
                                    }
                                }
                            }],
                            start: 45,
                            end: 62,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 40
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'ArrayExpression',
                                elements: [],
                                start: 67,
                                end: 69,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 45
                                    },
                                    end: {
                                        line: 2,
                                        column: 47
                                    }
                                }
                            }],
                            start: 66,
                            end: 70,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 44
                                },
                                end: {
                                    line: 2,
                                    column: 48
                                }
                            }
                        },
                        await: true,
                        start: 34,
                        end: 87,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 20,
                    end: 99,
                    loc: {
                        start: {
                            line: 1,
                            column: 20
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                start: 0,
                end: 99,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 99,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`array elem nested obj undefined hole`, {
        source: `async function fn() {
            for await ([{ x }] of [[ , ]]) {
            }
          }`,
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 65,
                            end: 80,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 43
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 48,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 26
                                            },
                                            end: {
                                                line: 2,
                                                column: 27
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 48,
                                        end: 49,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 26
                                            },
                                            end: {
                                                line: 2,
                                                column: 27
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: true,
                                    start: 48,
                                    end: 49,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 26
                                        },
                                        end: {
                                            line: 2,
                                            column: 27
                                        }
                                    }
                                }],
                                start: 46,
                                end: 51,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 24
                                    },
                                    end: {
                                        line: 2,
                                        column: 29
                                    }
                                }
                            }],
                            start: 45,
                            end: 52,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 30
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'ArrayExpression',
                                elements: [
                                    null
                                ],
                                start: 57,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 35
                                    },
                                    end: {
                                        line: 2,
                                        column: 40
                                    }
                                }
                            }],
                            start: 56,
                            end: 63,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 34
                                },
                                end: {
                                    line: 2,
                                    column: 41
                                }
                            }
                        },
                        await: true,
                        start: 34,
                        end: 80,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 20,
                    end: 92,
                    loc: {
                        start: {
                            line: 1,
                            column: 20
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                start: 0,
                end: 92,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 92,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`array element nesed array undefined`, {
        source: `async function * fn() {
            for await ([[ x ]] of [[undefined]]) {
            }
          }`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 73,
                            end: 88,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 49
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'ArrayPattern',
                                elements: [{
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 50,
                                    end: 51,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 26
                                        },
                                        end: {
                                            line: 2,
                                            column: 27
                                        }
                                    }
                                }],
                                start: 48,
                                end: 53,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 24
                                    },
                                    end: {
                                        line: 2,
                                        column: 29
                                    }
                                }
                            }],
                            start: 47,
                            end: 54,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 30
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'ArrayExpression',
                                elements: [{
                                    type: 'Identifier',
                                    name: 'undefined',
                                    start: 60,
                                    end: 69,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 36
                                        },
                                        end: {
                                            line: 2,
                                            column: 45
                                        }
                                    }
                                }],
                                start: 59,
                                end: 70,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 35
                                    },
                                    end: {
                                        line: 2,
                                        column: 46
                                    }
                                }
                            }],
                            start: 58,
                            end: 71,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 34
                                },
                                end: {
                                    line: 2,
                                    column: 47
                                }
                            }
                        },
                        await: true,
                        start: 36,
                        end: 88,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 22,
                    end: 100,
                    loc: {
                        start: {
                            line: 1,
                            column: 22
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: true,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                    }
                },
                start: 0,
                end: 100,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 100,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`single name binding assigned name to arrow functions`, {
        source: `async function *fn() {
            for await (let [arrow = () => {}] of asyncIter) {
            }
          }`,
        loc: true,
        next: true,
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
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 83,
                            end: 98,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 60
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [{
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'arrow',
                                            start: 51,
                                            end: 56,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 33
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'ArrowFunctionExpression',
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 65,
                                                end: 67,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 44
                                                    }
                                                }
                                            },
                                            params: [],
                                            id: null,
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            start: 59,
                                            end: 67,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 36
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 44
                                                }
                                            }
                                        },
                                        start: 51,
                                        end: 67,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 28
                                            },
                                            end: {
                                                line: 2,
                                                column: 44
                                            }
                                        }
                                    }],
                                    start: 50,
                                    end: 68,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 27
                                        },
                                        end: {
                                            line: 2,
                                            column: 45
                                        }
                                    }
                                },
                                start: 50,
                                end: 68,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 27
                                    },
                                    end: {
                                        line: 2,
                                        column: 45
                                    }
                                }
                            }],
                            kind: 'let',
                            start: 46,
                            end: 68,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 45
                                }
                            }
                        },
                        right: {
                            type: 'Identifier',
                            name: 'asyncIter',
                            start: 72,
                            end: 81,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 49
                                },
                                end: {
                                    line: 2,
                                    column: 58
                                }
                            }
                        },
                        await: true,
                        start: 35,
                        end: 98,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 21,
                    end: 110,
                    loc: {
                        start: {
                            line: 1,
                            column: 21
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: true,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                start: 0,
                end: 110,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 110,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`binding as specified via property name and identifier`, {
        source: `async function *fn() {
            for await (const { x: y } of [{ x: 23 }]) {
            }
          }`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 77,
                            end: 92,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 54
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                        type: 'Property',
                                        kind: 'init',
                                        key: {
                                            type: 'Identifier',
                                            name: 'x',
                                            start: 54,
                                            end: 55,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 32
                                                }
                                            }
                                        },
                                        computed: false,
                                        value: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 57,
                                            end: 58,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 34
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 35
                                                }
                                            }
                                        },
                                        method: false,
                                        shorthand: false,
                                        start: 54,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 31
                                            },
                                            end: {
                                                line: 2,
                                                column: 35
                                            }
                                        }
                                    }],
                                    start: 52,
                                    end: 60,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 29
                                        },
                                        end: {
                                            line: 2,
                                            column: 37
                                        }
                                    }
                                },
                                start: 52,
                                end: 60,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 29
                                    },
                                    end: {
                                        line: 2,
                                        column: 37
                                    }
                                }
                            }],
                            kind: 'const',
                            start: 46,
                            end: 60,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 37
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'ObjectExpression',
                                properties: [{
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'x',
                                        start: 67,
                                        end: 68,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 44
                                            },
                                            end: {
                                                line: 2,
                                                column: 45
                                            }
                                        }
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: 23,
                                        start: 70,
                                        end: 72,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 47
                                            },
                                            end: {
                                                line: 2,
                                                column: 49
                                            }
                                        },
                                        raw: '23'
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 67,
                                    end: 72,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 44
                                        },
                                        end: {
                                            line: 2,
                                            column: 49
                                        }
                                    }
                                }],
                                start: 65,
                                end: 74,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 42
                                    },
                                    end: {
                                        line: 2,
                                        column: 51
                                    }
                                }
                            }],
                            start: 64,
                            end: 75,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 41
                                },
                                end: {
                                    line: 2,
                                    column: 52
                                }
                            }
                        },
                        await: true,
                        start: 35,
                        end: 92,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 21,
                    end: 104,
                    loc: {
                        start: {
                            line: 1,
                            column: 21
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: true,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                start: 0,
                end: 104,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 104,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`array pattern array rest`, {
        source: `async function *fn() {
            for await (let [[...x] = function() { }()] of [[values]]) {
            }
          }`,
        loc: true,
        next: true,
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
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 93,
                            end: 108,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 70
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ArrayPattern',
                                    elements: [{
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'ArrayPattern',
                                            elements: [{
                                                type: 'RestElement',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    start: 55,
                                                    end: 56,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 32
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 33
                                                        }
                                                    }
                                                },
                                                start: 52,
                                                end: 56,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 33
                                                    }
                                                }
                                            }],
                                            start: 51,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 28
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 34
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
                                                    start: 71,
                                                    end: 74,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 48
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 51
                                                        }
                                                    }
                                                },
                                                async: true,
                                                generator: false,
                                                expression: false,
                                                id: null,
                                                start: 60,
                                                end: 74,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 37
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 51
                                                    }
                                                }
                                            },
                                            arguments: [],
                                            start: 60,
                                            end: 76,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 37
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 53
                                                }
                                            }
                                        },
                                        start: 51,
                                        end: 76,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 28
                                            },
                                            end: {
                                                line: 2,
                                                column: 53
                                            }
                                        }
                                    }],
                                    start: 50,
                                    end: 77,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 27
                                        },
                                        end: {
                                            line: 2,
                                            column: 54
                                        }
                                    }
                                },
                                start: 50,
                                end: 77,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 27
                                    },
                                    end: {
                                        line: 2,
                                        column: 54
                                    }
                                }
                            }],
                            kind: 'let',
                            start: 46,
                            end: 77,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 54
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'ArrayExpression',
                                elements: [{
                                    type: 'Identifier',
                                    name: 'values',
                                    start: 83,
                                    end: 89,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 60
                                        },
                                        end: {
                                            line: 2,
                                            column: 66
                                        }
                                    }
                                }],
                                start: 82,
                                end: 90,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 59
                                    },
                                    end: {
                                        line: 2,
                                        column: 67
                                    }
                                }
                            }],
                            start: 81,
                            end: 91,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 58
                                },
                                end: {
                                    line: 2,
                                    column: 68
                                }
                            }
                        },
                        await: true,
                        start: 35,
                        end: 108,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 21,
                    end: 120,
                    loc: {
                        start: {
                            line: 1,
                            column: 21
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: true,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                start: 0,
                end: 120,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 120,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });

    pass(`const object pattern empty`, {
        source: `async function *fn() {
            for await (const {} of [obj]) {
            }
          }`,
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 65,
                            end: 80,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 42
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        left: {
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [],
                                    start: 52,
                                    end: 54,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 29
                                        },
                                        end: {
                                            line: 2,
                                            column: 31
                                        }
                                    }
                                },
                                start: 52,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 29
                                    },
                                    end: {
                                        line: 2,
                                        column: 31
                                    }
                                }
                            }],
                            kind: 'const',
                            start: 46,
                            end: 54,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 23
                                },
                                end: {
                                    line: 2,
                                    column: 31
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Identifier',
                                name: 'obj',
                                start: 59,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 36
                                    },
                                    end: {
                                        line: 2,
                                        column: 39
                                    }
                                }
                            }],
                            start: 58,
                            end: 63,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 35
                                },
                                end: {
                                    line: 2,
                                    column: 40
                                }
                            }
                        },
                        await: true,
                        start: 35,
                        end: 80,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 3,
                                column: 13
                            }
                        }
                    }],
                    start: 21,
                    end: 92,
                    loc: {
                        start: {
                            line: 1,
                            column: 21
                        },
                        end: {
                            line: 4,
                            column: 11
                        }
                    }
                },
                async: true,
                generator: true,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'fn',
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
                start: 0,
                end: 92,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 11
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 92,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 11
                }
            }
        }
    });
});
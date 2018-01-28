import { fail, pass } from '../utils';

describe('Statements - New target', () => {

    fail(`function f() { new.target = 1;  }`, {
        source: 'function f() { new.target = 1;  }',
    });

    fail(`() => { new.target; };`, {
        source: '() => { new.target; };',
    });

    fail(`function f() { new.anythingElse; }`, {
        source: 'function f() { new.anythingElse; }',
    });

    fail(`new Type[]`, {
        source: 'new Type[]',
    });

    fail(`function f() { n\\u0065w.target; }`, {
        source: 'function f() { n\\u0065w.target; }',
    });

    fail(`function f() { new.t\\u0061rget; }`, {
        source: 'function f() { new.t\\u0061rget; }',
    });

    fail(`function f() { new.target = 1; }`, {
        source: 'function f() { new.target = 1; }',
    });

    fail(`new.prop`, {
        source: 'new.prop',
    });

    fail(`"new.target`, {
        source: 'new.target',
    });

    fail(`function() { return new['target']; }`, {
        source: 'function() { return new["target"]; }',
    });

    fail(`var f = function() { new.unknown_property; }`, {
        source: 'var f = function() { new.unknown_property; }',
    });

    pass(`function a(){{if(true){new.target;}}}`, {
        source: `function a(){{if(true){new.target;}}}`,
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
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'IfStatement',
                                        test: {
                                            type: 'Literal',
                                            value: true,
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
                                            },
                                            raw: 'true'
                                        },
                                        alternate: null,
                                        consequent: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        meta: {
                                                            type: 'Identifier',
                                                            name: 'new',
                                                            start: 23,
                                                            end: 26,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 23
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 26
                                                                }
                                                            }
                                                        },
                                                        type: 'MetaProperty',
                                                        property: {
                                                            type: 'Identifier',
                                                            name: 'target',
                                                            start: 27,
                                                            end: 33,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 27
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 33
                                                                }
                                                            }
                                                        },
                                                        start: 23,
                                                        end: 33,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 33
                                                            }
                                                        }
                                                    },
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
                                                }
                                            ],
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
                                            }
                                        },
                                        start: 14,
                                        end: 35,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 14
                                            },
                                            end: {
                                                line: 1,
                                                column: 35
                                            }
                                        }
                                    }
                                ],
                                start: 13,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 12,
                        end: 37,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 37
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
            ],
            sourceType: 'script',
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

    pass(`function abc(){ var a = b = c = 1; try {} catch([a,b,c]) { new.target;}}`, {
        source: `function abc(){ var a = b = c = 1; try {} catch([a,b,c]) { new.target;}}`,
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
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            type: 'AssignmentExpression',
                                            left: {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            operator: '=',
                                            right: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'c',
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
                                                operator: '=',
                                                right: {
                                                    type: 'Literal',
                                                    value: 1,
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
                                                    },
                                                    raw: '1'
                                                },
                                                start: 28,
                                                end: 33,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 33
                                                    }
                                                }
                                            },
                                            start: 24,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        id: {
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
                                        start: 20,
                                        end: 33,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 33
                                            }
                                        }
                                    }
                                ],
                                kind: 'var',
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
                            {
                                type: 'TryStatement',
                                block: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 39,
                                    end: 41,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 39
                                        },
                                        end: {
                                            line: 1,
                                            column: 41
                                        }
                                    }
                                },
                                handler: {
                                    type: 'CatchClause',
                                    param: {
                                        type: 'ArrayPattern',
                                        elements: [
                                            {
                                                type: 'Identifier',
                                                name: 'a',
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
                                            {
                                                type: 'Identifier',
                                                name: 'b',
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
                                            {
                                                type: 'Identifier',
                                                name: 'c',
                                                start: 53,
                                                end: 54,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 53
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 54
                                                    }
                                                }
                                            }
                                        ],
                                        start: 48,
                                        end: 55,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 48
                                            },
                                            end: {
                                                line: 1,
                                                column: 55
                                            }
                                        }
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    meta: {
                                                        type: 'Identifier',
                                                        name: 'new',
                                                        start: 59,
                                                        end: 62,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 59
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 62
                                                            }
                                                        }
                                                    },
                                                    type: 'MetaProperty',
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'target',
                                                        start: 63,
                                                        end: 69,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 63
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 69
                                                            }
                                                        }
                                                    },
                                                    start: 59,
                                                    end: 69,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 59
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 69
                                                        }
                                                    }
                                                },
                                                start: 59,
                                                end: 70,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 59
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 70
                                                    }
                                                }
                                            }
                                        ],
                                        start: 57,
                                        end: 71,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 57
                                            },
                                            end: {
                                                line: 1,
                                                column: 71
                                            }
                                        }
                                    },
                                    start: 42,
                                    end: 71,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 42
                                        },
                                        end: {
                                            line: 1,
                                            column: 71
                                        }
                                    }
                                },
                                finalizer: null,
                                start: 35,
                                end: 71,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 35
                                    },
                                    end: {
                                        line: 1,
                                        column: 71
                                    }
                                }
                            }
                        ],
                        start: 14,
                        end: 72,
                        loc: {
                            start: {
                                line: 1,
                                column: 14
                            },
                            end: {
                                line: 1,
                                column: 72
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'abc',
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
                    end: 72,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 72
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 72,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 72
                }
            }
        }
    });

    pass(`function a(){ var o = { "foo" : function () { new.target}}; o.foo();}`, {
        source: `function a(){ var o = { "foo" : function () { new.target}}; o.foo();}`,
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
                                                        type: 'Literal',
                                                        value: 'foo',
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
                                                        },
                                                        raw: '"foo"'
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
                                                                        meta: {
                                                                            type: 'Identifier',
                                                                            name: 'new',
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
                                                                        type: 'MetaProperty',
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'target',
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
                                                                            }
                                                                        },
                                                                        start: 46,
                                                                        end: 56,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 46
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 56
                                                                            }
                                                                        }
                                                                    },
                                                                    start: 46,
                                                                    end: 56,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 46
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 56
                                                                        }
                                                                    }
                                                                }
                                                            ],
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
                                                        },
                                                        async: false,
                                                        generator: false,
                                                        expression: false,
                                                        id: null,
                                                        start: 32,
                                                        end: 57,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 32
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 57
                                                            }
                                                        }
                                                    },
                                                    kind: 'init',
                                                    computed: false,
                                                    method: false,
                                                    shorthand: false,
                                                    start: 24,
                                                    end: 57,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 24
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 57
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
                                        id: {
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
                                        start: 18,
                                        end: 58,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 58
                                            }
                                        }
                                    }
                                ],
                                kind: 'var',
                                start: 14,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 59
                                    }
                                }
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: 'o',
                                            start: 60,
                                            end: 61,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 60
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 61
                                                }
                                            }
                                        },
                                        computed: false,
                                        property: {
                                            type: 'Identifier',
                                            name: 'foo',
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
                                        start: 60,
                                        end: 65,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 60
                                            },
                                            end: {
                                                line: 1,
                                                column: 65
                                            }
                                        }
                                    },
                                    arguments: [],
                                    start: 60,
                                    end: 67,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 60
                                        },
                                        end: {
                                            line: 1,
                                            column: 67
                                        }
                                    }
                                },
                                start: 60,
                                end: 68,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 60
                                    },
                                    end: {
                                        line: 1,
                                        column: 68
                                    }
                                }
                            }
                        ],
                        start: 12,
                        end: 69,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
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
                    end: 69,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 69
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
                    line: 1,
                    column: 69
                }
            }
        }
    });

    pass(`(function a(b = new.target){})`, {
        source: `(function a(b = new.target){})`,
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
                                    meta: {
                                        type: 'Identifier',
                                        name: 'new',
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
                                    type: 'MetaProperty',
                                    property: {
                                        type: 'Identifier',
                                        name: 'target',
                                        start: 20,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
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
                                },
                                start: 12,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            }
                        ],
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
                        async: false,
                        generator: false,
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

    pass(`({ set a(b = new.target){} })`, {
        source: '({ set a(b = new.target){} })',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'AssignmentPattern',
                                            left: {
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
                                            right: {
                                                meta: {
                                                    type: 'Identifier',
                                                    name: 'new',
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
                                                type: 'MetaProperty',
                                                property: {
                                                    type: 'Identifier',
                                                    name: 'target',
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
                                            start: 9,
                                            end: 23,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 9
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
                                        start: 24,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 24
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
                                    id: null,
                                    start: 8,
                                    end: 26,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 26
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 3,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 28,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
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

    pass(`(function a(b = new.target){})`, {
        source: '(function a(b = new.target){})',
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
                                    meta: {
                                        type: 'Identifier',
                                        name: 'new',
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
                                    type: 'MetaProperty',
                                    property: {
                                        type: 'Identifier',
                                        name: 'target',
                                        start: 20,
                                        end: 26,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 20
                                            },
                                            end: {
                                                line: 1,
                                                column: 26
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
                                },
                                start: 12,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                }
                            }
                        ],
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
                        async: false,
                        generator: false,
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

    pass(`function f() { let x = new.target; }`, {
        source: 'function f() { let x = new.target; }',
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
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: {
                                            meta: {
                                                type: 'Identifier',
                                                name: 'new',
                                                start: 23,
                                                end: 26,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 23
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 26
                                                    }
                                                }
                                            },
                                            type: 'MetaProperty',
                                            property: {
                                                type: 'Identifier',
                                                name: 'target',
                                                start: 27,
                                                end: 33,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 27
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 33
                                                    }
                                                }
                                            },
                                            start: 23,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 23
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'x',
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
                                kind: 'let',
                                start: 15,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 36
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

    pass(`function f() { new new.target()(); }`, {
        source: 'function f() { new new.target()(); }',
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
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'NewExpression',
                                        callee: {
                                            meta: {
                                                type: 'Identifier',
                                                name: 'new',
                                                start: 19,
                                                end: 22,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 22
                                                    }
                                                }
                                            },
                                            type: 'MetaProperty',
                                            property: {
                                                type: 'Identifier',
                                                name: 'target',
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
                                        arguments: [],
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
                                    arguments: [],
                                    start: 15,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                start: 15,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 13,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
                            },
                            end: {
                                line: 1,
                                column: 36
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

    pass(`function f() { new.target(); }`, {
        source: 'function f() { new.target(); }',
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
                                    type: 'CallExpression',
                                    callee: {
                                        meta: {
                                            type: 'Identifier',
                                            name: 'new',
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
                                        type: 'MetaProperty',
                                        property: {
                                            type: 'Identifier',
                                            name: 'target',
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
                                        start: 15,
                                        end: 25,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 15
                                            },
                                            end: {
                                                line: 1,
                                                column: 25
                                            }
                                        }
                                    },
                                    arguments: [],
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
                            }
                        ],
                        start: 13,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 13
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
});
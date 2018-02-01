import { pass, fail } from '../utils';

describe('Expressions - Class', () => {

    fail(`(class {a:0})`, {
        source: '(class {a:0})',
    });

    fail(`(class {a=0})`, {
        source: '(class {a=0})',
    });

    fail(`(class {a})`, {
        source: '(class {a})',
    });

    fail(`(class {3:0})`, {
        source: '(class {3:0})',
    });

    fail(`(class {[3]:0})`, {
        source: '(class {[3]:0})',
    });

    fail(`(class {)`, {
        source: '(class {)',
    });

    fail(`(class extends a,b {})`, {
        source: '(class extends a,b {})',
    });

    fail(`(class extends !a {})`, {
        source: '(class extends !a {})',
    });

    fail(`(class [a] {})`, {
        source: '(class [a] {})',
    });

    fail(`(class {[a,b](){}})`, {
        source: '(class {[a,b](){}})',
    });

    pass(`(class Service extends Component.mixin(AsyncEmitter) {
        *addEndpoint(name, handler) {
            yield this.emit("beforeEndpointAdded", name, handler, this);
            if (!this._endpoints[name]) {
                this._endpoints[name] = {};
                this._express.use("/" + name, (req, res, next) => {
                    if (this._endpoints[name].handler)
                        return this._endpoints[name].handler(req, res, next);
                    else
                        return next();
                });
            }
        }
    })`, {
        source: `(class Service extends Component.mixin(AsyncEmitter) {
            *addEndpoint(name, handler) {
                yield this.emit("beforeEndpointAdded", name, handler, this);
                if (!this._endpoints[name]) {
                    this._endpoints[name] = {};
                    this._express.use("/" + name, (req, res, next) => {
                        if (this._endpoints[name].handler)
                            return this._endpoints[name].handler(req, res, next);
                        else
                            return next();
                    });
                }
            }
        })`,
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: {
                            type: 'Identifier',
                            name: 'Service',
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
                        },
                        superClass: {
                            type: 'CallExpression',
                            callee: {
                                type: 'MemberExpression',
                                object: {
                                    type: 'Identifier',
                                    name: 'Component',
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
                                computed: false,
                                property: {
                                    type: 'Identifier',
                                    name: 'mixin',
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
                                start: 1,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                }
                            },
                            arguments: [
                                {
                                    type: 'Identifier',
                                    name: 'AsyncEmitter',
                                    start: 39,
                                    end: 51,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 39
                                        },
                                        end: {
                                            line: 1,
                                            column: 51
                                        }
                                    }
                                }
                            ],
                            start: 1,
                            end: 52,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 52
                                }
                            }
                        },
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    key: {
                                        type: 'Identifier',
                                        name: 'addEndpoint',
                                        start: 68,
                                        end: 79,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 13
                                            },
                                            end: {
                                                line: 2,
                                                column: 24
                                            }
                                        }
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'name',
                                                start: 80,
                                                end: 84,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 29
                                                    }
                                                }
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'handler',
                                                start: 86,
                                                end: 93,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 38
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
                                                        type: 'YieldExpression',
                                                        argument: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'ThisExpression',
                                                                    start: 119,
                                                                    end: 123,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 22
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 26
                                                                        }
                                                                    }
                                                                },
                                                                computed: false,
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: 'emit',
                                                                    start: 124,
                                                                    end: 128,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 27
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 31
                                                                        }
                                                                    }
                                                                },
                                                                start: 119,
                                                                end: 128,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 22
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 31
                                                                    }
                                                                }
                                                            },
                                                            arguments: [
                                                                {
                                                                    type: 'Literal',
                                                                    value: 'beforeEndpointAdded',
                                                                    start: 129,
                                                                    end: 150,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 32
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 53
                                                                        }
                                                                    },
                                                                    raw: '"beforeEndpointAdded"'
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'name',
                                                                    start: 152,
                                                                    end: 156,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 55
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 59
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'Identifier',
                                                                    name: 'handler',
                                                                    start: 158,
                                                                    end: 165,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 61
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 68
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'ThisExpression',
                                                                    start: 167,
                                                                    end: 171,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 70
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 74
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 119,
                                                            end: 172,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 22
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 75
                                                                }
                                                            }
                                                        },
                                                        delegate: false,
                                                        start: 113,
                                                        end: 172,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 16
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 75
                                                            }
                                                        }
                                                    },
                                                    start: 113,
                                                    end: 173,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 16
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 76
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'IfStatement',
                                                    test: {
                                                        type: 'UnaryExpression',
                                                        operator: '!',
                                                        argument: {
                                                            type: 'MemberExpression',
                                                            object: {
                                                                type: 'MemberExpression',
                                                                object: {
                                                                    type: 'ThisExpression',
                                                                    start: 195,
                                                                    end: 199,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 21
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                computed: false,
                                                                property: {
                                                                    type: 'Identifier',
                                                                    name: '_endpoints',
                                                                    start: 200,
                                                                    end: 210,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 26
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 36
                                                                        }
                                                                    }
                                                                },
                                                                start: 195,
                                                                end: 210,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 21
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 36
                                                                    }
                                                                }
                                                            },
                                                            computed: true,
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'name',
                                                                start: 211,
                                                                end: 215,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 37
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 41
                                                                    }
                                                                }
                                                            },
                                                            start: 195,
                                                            end: 216,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 21
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 42
                                                                }
                                                            }
                                                        },
                                                        prefix: true,
                                                        start: 194,
                                                        end: 216,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 42
                                                            }
                                                        }
                                                    },
                                                    alternate: null,
                                                    consequent: {
                                                        type: 'BlockStatement',
                                                        body: [
                                                            {
                                                                type: 'ExpressionStatement',
                                                                expression: {
                                                                    type: 'AssignmentExpression',
                                                                    left: {
                                                                        type: 'MemberExpression',
                                                                        object: {
                                                                            type: 'MemberExpression',
                                                                            object: {
                                                                                type: 'ThisExpression',
                                                                                start: 240,
                                                                                end: 244,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 5,
                                                                                        column: 20
                                                                                    },
                                                                                    end: {
                                                                                        line: 5,
                                                                                        column: 24
                                                                                    }
                                                                                }
                                                                            },
                                                                            computed: false,
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: '_endpoints',
                                                                                start: 245,
                                                                                end: 255,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 5,
                                                                                        column: 25
                                                                                    },
                                                                                    end: {
                                                                                        line: 5,
                                                                                        column: 35
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 240,
                                                                            end: 255,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 5,
                                                                                    column: 20
                                                                                },
                                                                                end: {
                                                                                    line: 5,
                                                                                    column: 35
                                                                                }
                                                                            }
                                                                        },
                                                                        computed: true,
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'name',
                                                                            start: 256,
                                                                            end: 260,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 5,
                                                                                    column: 36
                                                                                },
                                                                                end: {
                                                                                    line: 5,
                                                                                    column: 40
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 240,
                                                                        end: 261,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 20
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 41
                                                                            }
                                                                        }
                                                                    },
                                                                    operator: '=',
                                                                    right: {
                                                                        type: 'ObjectExpression',
                                                                        properties: [],
                                                                        start: 264,
                                                                        end: 266,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 44
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 46
                                                                            }
                                                                        }
                                                                    },
                                                                    start: 240,
                                                                    end: 266,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 20
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 46
                                                                        }
                                                                    }
                                                                },
                                                                start: 240,
                                                                end: 267,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 20
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 47
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
                                                                            type: 'MemberExpression',
                                                                            object: {
                                                                                type: 'ThisExpression',
                                                                                start: 288,
                                                                                end: 292,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 6,
                                                                                        column: 20
                                                                                    },
                                                                                    end: {
                                                                                        line: 6,
                                                                                        column: 24
                                                                                    }
                                                                                }
                                                                            },
                                                                            computed: false,
                                                                            property: {
                                                                                type: 'Identifier',
                                                                                name: '_express',
                                                                                start: 293,
                                                                                end: 301,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 6,
                                                                                        column: 25
                                                                                    },
                                                                                    end: {
                                                                                        line: 6,
                                                                                        column: 33
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 288,
                                                                            end: 301,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 6,
                                                                                    column: 20
                                                                                },
                                                                                end: {
                                                                                    line: 6,
                                                                                    column: 33
                                                                                }
                                                                            }
                                                                        },
                                                                        computed: false,
                                                                        property: {
                                                                            type: 'Identifier',
                                                                            name: 'use',
                                                                            start: 302,
                                                                            end: 305,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 6,
                                                                                    column: 34
                                                                                },
                                                                                end: {
                                                                                    line: 6,
                                                                                    column: 37
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 288,
                                                                        end: 305,
                                                                        loc: {
                                                                            start: {
                                                                                line: 6,
                                                                                column: 20
                                                                            },
                                                                            end: {
                                                                                line: 6,
                                                                                column: 37
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'BinaryExpression',
                                                                            left: {
                                                                                type: 'Literal',
                                                                                value: '/',
                                                                                start: 306,
                                                                                end: 309,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 6,
                                                                                        column: 38
                                                                                    },
                                                                                    end: {
                                                                                        line: 6,
                                                                                        column: 41
                                                                                    }
                                                                                },
                                                                                raw: '"/"'
                                                                            },
                                                                            right: {
                                                                                type: 'Identifier',
                                                                                name: 'name',
                                                                                start: 312,
                                                                                end: 316,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 6,
                                                                                        column: 44
                                                                                    },
                                                                                    end: {
                                                                                        line: 6,
                                                                                        column: 48
                                                                                    }
                                                                                }
                                                                            },
                                                                            operator: '+',
                                                                            start: 306,
                                                                            end: 316,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 6,
                                                                                    column: 38
                                                                                },
                                                                                end: {
                                                                                    line: 6,
                                                                                    column: 48
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            type: 'ArrowFunctionExpression',
                                                                            body: {
                                                                                type: 'BlockStatement',
                                                                                body: [
                                                                                    {
                                                                                        type: 'IfStatement',
                                                                                        test: {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'MemberExpression',
                                                                                                object: {
                                                                                                    type: 'MemberExpression',
                                                                                                    object: {
                                                                                                        type: 'ThisExpression',
                                                                                                        start: 368,
                                                                                                        end: 372,
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 7,
                                                                                                                column: 28
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 7,
                                                                                                                column: 32
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    computed: false,
                                                                                                    property: {
                                                                                                        type: 'Identifier',
                                                                                                        name: '_endpoints',
                                                                                                        start: 373,
                                                                                                        end: 383,
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 7,
                                                                                                                column: 33
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 7,
                                                                                                                column: 43
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    start: 368,
                                                                                                    end: 383,
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 7,
                                                                                                            column: 28
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 7,
                                                                                                            column: 43
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                computed: true,
                                                                                                property: {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'name',
                                                                                                    start: 384,
                                                                                                    end: 388,
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 7,
                                                                                                            column: 44
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 7,
                                                                                                            column: 48
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                start: 368,
                                                                                                end: 389,
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 7,
                                                                                                        column: 28
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 7,
                                                                                                        column: 49
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            computed: false,
                                                                                            property: {
                                                                                                type: 'Identifier',
                                                                                                name: 'handler',
                                                                                                start: 390,
                                                                                                end: 397,
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 7,
                                                                                                        column: 50
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 7,
                                                                                                        column: 57
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            start: 368,
                                                                                            end: 397,
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 7,
                                                                                                    column: 28
                                                                                                },
                                                                                                end: {
                                                                                                    line: 7,
                                                                                                    column: 57
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        alternate: {
                                                                                            type: 'ReturnStatement',
                                                                                            argument: {
                                                                                                type: 'CallExpression',
                                                                                                callee: {
                                                                                                    type: 'Identifier',
                                                                                                    name: 'next',
                                                                                                    start: 545,
                                                                                                    end: 549,
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 10,
                                                                                                            column: 35
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 10,
                                                                                                            column: 39
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                arguments: [],
                                                                                                start: 545,
                                                                                                end: 551,
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 10,
                                                                                                        column: 35
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 10,
                                                                                                        column: 41
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            start: 538,
                                                                                            end: 552,
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 10,
                                                                                                    column: 28
                                                                                                },
                                                                                                end: {
                                                                                                    line: 10,
                                                                                                    column: 42
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        consequent: {
                                                                                            type: 'ReturnStatement',
                                                                                            argument: {
                                                                                                type: 'CallExpression',
                                                                                                callee: {
                                                                                                    type: 'MemberExpression',
                                                                                                    object: {
                                                                                                        type: 'MemberExpression',
                                                                                                        object: {
                                                                                                            type: 'MemberExpression',
                                                                                                            object: {
                                                                                                                type: 'ThisExpression',
                                                                                                                start: 434,
                                                                                                                end: 438,
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 8,
                                                                                                                        column: 35
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 8,
                                                                                                                        column: 39
                                                                                                                    }
                                                                                                                }
                                                                                                            },
                                                                                                            computed: false,
                                                                                                            property: {
                                                                                                                type: 'Identifier',
                                                                                                                name: '_endpoints',
                                                                                                                start: 439,
                                                                                                                end: 449,
                                                                                                                loc: {
                                                                                                                    start: {
                                                                                                                        line: 8,
                                                                                                                        column: 40
                                                                                                                    },
                                                                                                                    end: {
                                                                                                                        line: 8,
                                                                                                                        column: 50
                                                                                                                    }
                                                                                                                }
                                                                                                            },
                                                                                                            start: 434,
                                                                                                            end: 449,
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 8,
                                                                                                                    column: 35
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 8,
                                                                                                                    column: 50
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        computed: true,
                                                                                                        property: {
                                                                                                            type: 'Identifier',
                                                                                                            name: 'name',
                                                                                                            start: 450,
                                                                                                            end: 454,
                                                                                                            loc: {
                                                                                                                start: {
                                                                                                                    line: 8,
                                                                                                                    column: 51
                                                                                                                },
                                                                                                                end: {
                                                                                                                    line: 8,
                                                                                                                    column: 55
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        start: 434,
                                                                                                        end: 455,
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 8,
                                                                                                                column: 35
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 8,
                                                                                                                column: 56
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    computed: false,
                                                                                                    property: {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'handler',
                                                                                                        start: 456,
                                                                                                        end: 463,
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 8,
                                                                                                                column: 57
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 8,
                                                                                                                column: 64
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    start: 434,
                                                                                                    end: 463,
                                                                                                    loc: {
                                                                                                        start: {
                                                                                                            line: 8,
                                                                                                            column: 35
                                                                                                        },
                                                                                                        end: {
                                                                                                            line: 8,
                                                                                                            column: 64
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                arguments: [
                                                                                                    {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'req',
                                                                                                        start: 464,
                                                                                                        end: 467,
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 8,
                                                                                                                column: 65
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 8,
                                                                                                                column: 68
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'res',
                                                                                                        start: 469,
                                                                                                        end: 472,
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 8,
                                                                                                                column: 70
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 8,
                                                                                                                column: 73
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        type: 'Identifier',
                                                                                                        name: 'next',
                                                                                                        start: 474,
                                                                                                        end: 478,
                                                                                                        loc: {
                                                                                                            start: {
                                                                                                                line: 8,
                                                                                                                column: 75
                                                                                                            },
                                                                                                            end: {
                                                                                                                line: 8,
                                                                                                                column: 79
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                ],
                                                                                                start: 434,
                                                                                                end: 479,
                                                                                                loc: {
                                                                                                    start: {
                                                                                                        line: 8,
                                                                                                        column: 35
                                                                                                    },
                                                                                                    end: {
                                                                                                        line: 8,
                                                                                                        column: 80
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            start: 427,
                                                                                            end: 480,
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 8,
                                                                                                    column: 28
                                                                                                },
                                                                                                end: {
                                                                                                    line: 8,
                                                                                                    column: 81
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        start: 364,
                                                                                        end: 552,
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 7,
                                                                                                column: 24
                                                                                            },
                                                                                            end: {
                                                                                                line: 10,
                                                                                                column: 42
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                ],
                                                                                start: 338,
                                                                                end: 574,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 6,
                                                                                        column: 70
                                                                                    },
                                                                                    end: {
                                                                                        line: 11,
                                                                                        column: 21
                                                                                    }
                                                                                }
                                                                            },
                                                                            params: [
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    name: 'req',
                                                                                    start: 319,
                                                                                    end: 322,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 6,
                                                                                            column: 51
                                                                                        },
                                                                                        end: {
                                                                                            line: 6,
                                                                                            column: 54
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    name: 'res',
                                                                                    start: 324,
                                                                                    end: 327,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 6,
                                                                                            column: 56
                                                                                        },
                                                                                        end: {
                                                                                            line: 6,
                                                                                            column: 59
                                                                                        }
                                                                                    }
                                                                                },
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    name: 'next',
                                                                                    start: 329,
                                                                                    end: 333,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 6,
                                                                                            column: 61
                                                                                        },
                                                                                        end: {
                                                                                            line: 6,
                                                                                            column: 65
                                                                                        }
                                                                                    }
                                                                                }
                                                                            ],
                                                                            id: null,
                                                                            async: false,
                                                                            generator: false,
                                                                            expression: false,
                                                                            start: 318,
                                                                            end: 574,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 6,
                                                                                    column: 50
                                                                                },
                                                                                end: {
                                                                                    line: 11,
                                                                                    column: 21
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    start: 288,
                                                                    end: 575,
                                                                    loc: {
                                                                        start: {
                                                                            line: 6,
                                                                            column: 20
                                                                        },
                                                                        end: {
                                                                            line: 11,
                                                                            column: 22
                                                                        }
                                                                    }
                                                                },
                                                                start: 288,
                                                                end: 576,
                                                                loc: {
                                                                    start: {
                                                                        line: 6,
                                                                        column: 20
                                                                    },
                                                                    end: {
                                                                        line: 11,
                                                                        column: 23
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 218,
                                                        end: 594,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 44
                                                            },
                                                            end: {
                                                                line: 12,
                                                                column: 17
                                                            }
                                                        }
                                                    },
                                                    start: 190,
                                                    end: 594,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 16
                                                        },
                                                        end: {
                                                            line: 12,
                                                            column: 17
                                                        }
                                                    }
                                                }
                                            ],
                                            start: 95,
                                            end: 608,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 13,
                                                    column: 13
                                                }
                                            }
                                        },
                                        async: false,
                                        generator: true,
                                        expression: false,
                                        id: null,
                                        start: 79,
                                        end: 608,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 24
                                            },
                                            end: {
                                                line: 13,
                                                column: 13
                                            }
                                        }
                                    },
                                    static: false,
                                    start: 67,
                                    end: 608,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 12
                                        },
                                        end: {
                                            line: 13,
                                            column: 13
                                        }
                                    }
                                }
                            ],
                            start: 53,
                            end: 618,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 53
                                },
                                end: {
                                    line: 14,
                                    column: 9
                                }
                            }
                        },
                        start: 1,
                        end: 618,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 14,
                                column: 9
                            }
                        }
                    },
                    start: 0,
                    end: 619,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 14,
                            column: 10
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 619,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 14,
                    column: 10
                }
            }
        }
    });

    pass(`(class extends 0{})`, {
        source: '(class extends 0{})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: {
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
                        body: {
                            type: 'ClassBody',
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
            ],
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

    pass(`(class {})`, {
        source: '(class {})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
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

    pass(`(class {;;;\n;a(){}b(){}})`, {
        source: '(class {;;;\n;a(){}b(){}})',
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    body: {
                      body: [
                        {
                         computed: false,
                          key: {
                            name: 'a',
                            type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                            async: false,
                            body: {
                              body: [],
                             type: 'BlockStatement'
                            },
                            expression: false,
                            generator: false,
                            id: null,
                            params: [],
                            type: 'FunctionExpression'
                          }
                        },
                        {
                          computed: false,
                          key: {
                            name: 'b',
                            type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                            async: false,
                            body: {
                              body: [],
                              type: 'BlockStatement'
                            },
                            expression: false,
                            generator: false,
                            id: null,
                            params: [],
                            type: 'FunctionExpression'
                         }
                        }
                      ],
                      type: 'ClassBody'
                    },
                    id: null,
                    superClass: null,
                    type: 'ClassExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`(class {get a() {}})`, {
        source: '(class {get a() {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
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
                                    kind: 'get',
                                    computed: false,
                                    value: {
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
                                        id: null,
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
                                    static: false,
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
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass(`(class extends (a,b) {})`, {
        source: '(class extends (a,b) {})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: {
                            type: 'SequenceExpression',
                            expressions: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
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
                                {
                                    type: 'Identifier',
                                    name: 'b',
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
                                }
                            ],
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
                        body: {
                            type: 'ClassBody',
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

    pass(`(class {static(){}})`, {
        source: '(class {static(){}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
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
                                        name: 'static',
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
                                    kind: 'method',
                                    computed: false,
                                    value: {
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
                                        id: null,
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
                                        }
                                    },
                                    static: false,
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
                                }
                            ],
                            start: 7,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        start: 1,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 19
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

    pass(`(class {static constructor(){}})`, {
        source: '(class {static constructor(){}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
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
                                        name: 'constructor',
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
                                    kind: 'method',
                                    computed: false,
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
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 26,
                                        end: 30,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 26
                                            },
                                            end: {
                                                line: 1,
                                                column: 30
                                            }
                                        }
                                    },
                                    static: true,
                                    start: 8,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                }
                            ],
                            start: 7,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        },
                        start: 1,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 31
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

    pass(`(class{[3+5](){}})`, {
        source: '(class{[3+5](){}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
                            body: [
                                {
                                    type: 'MethodDefinition',
                                    key: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'Literal',
                                            value: 3,
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
                                            raw: '3'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 5,
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
                                            raw: '5'
                                        },
                                        operator: '+',
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
                                    kind: 'method',
                                    computed: true,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
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
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
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
                                    static: false,
                                    start: 7,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                }
                            ],
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

    pass(`({ a(){ (class {[super.a](){}}); } })`, {
        source: '({ a(){ (class {[super.a](){}}); } })',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'ClassExpression',
                                                    id: null,
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        body: [
                                                            {
                                                                type: 'MethodDefinition',
                                                                key: {
                                                                    type: 'MemberExpression',
                                                                    object: {
                                                                        type: 'Super',
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
                                                                    computed: false,
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'a',
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
                                                                    start: 17,
                                                                    end: 24,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 17
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 24
                                                                        }
                                                                    }
                                                                },
                                                                kind: 'method',
                                                                computed: true,
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [],
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
                                                                    id: null,
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
                                                                static: false,
                                                                start: 16,
                                                                end: 29,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 16
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 29
                                                                    }
                                                                }
                                                            }
                                                        ],
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
                                                    },
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
                                                },
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
                                            }
                                        ],
                                        start: 6,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
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
                                    id: null,
                                    start: 4,
                                    end: 34,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 34
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 3,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 36
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

    pass(`x = (0) ? 1 : 2`, {
        source: `var C = class { async *gen() {
            callCount += 1;
            yield {
                ...yield,
                y: 1,
                ...yield yield,
              };
        }}`,
        loc: true,
        ranges: true,
        raw: true,
        next: true,
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
                                                name: 'gen',
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
                                                                type: 'AssignmentExpression',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'callCount',
                                                                    start: 43,
                                                                    end: 52,
                                                                    loc: {
                                                                        start: {
                                                                            line: 2,
                                                                            column: 12
                                                                        },
                                                                        end: {
                                                                            line: 2,
                                                                            column: 21
                                                                        }
                                                                    }
                                                                },
                                                                operator: '+=',
                                                                right: {
                                                                    type: 'Literal',
                                                                    value: 1,
                                                                    start: 56,
                                                                    end: 57,
                                                                    loc: {
                                                                        start: {
                                                                            line: 2,
                                                                            column: 25
                                                                        },
                                                                        end: {
                                                                            line: 2,
                                                                            column: 26
                                                                        }
                                                                    },
                                                                    raw: '1'
                                                                },
                                                                start: 43,
                                                                end: 57,
                                                                loc: {
                                                                    start: {
                                                                        line: 2,
                                                                        column: 12
                                                                    },
                                                                    end: {
                                                                        line: 2,
                                                                        column: 26
                                                                    }
                                                                }
                                                            },
                                                            start: 43,
                                                            end: 58,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 12
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 27
                                                                }
                                                            }
                                                        },
                                                        {
                                                            type: 'ExpressionStatement',
                                                            expression: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'ObjectExpression',
                                                                    properties: [
                                                                        {
                                                                            type: 'SpreadElement',
                                                                            argument: {
                                                                                type: 'YieldExpression',
                                                                                argument: null,
                                                                                delegate: false,
                                                                                start: 98,
                                                                                end: 103,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 4,
                                                                                        column: 19
                                                                                    },
                                                                                    end: {
                                                                                        line: 4,
                                                                                        column: 24
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 95,
                                                                            end: 103,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 4,
                                                                                    column: 16
                                                                                },
                                                                                end: {
                                                                                    line: 4,
                                                                                    column: 24
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            type: 'Property',
                                                                            key: {
                                                                                type: 'Identifier',
                                                                                name: 'y',
                                                                                start: 121,
                                                                                end: 122,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 5,
                                                                                        column: 16
                                                                                    },
                                                                                    end: {
                                                                                        line: 5,
                                                                                        column: 17
                                                                                    }
                                                                                }
                                                                            },
                                                                            value: {
                                                                                type: 'Literal',
                                                                                value: 1,
                                                                                start: 124,
                                                                                end: 125,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 5,
                                                                                        column: 19
                                                                                    },
                                                                                    end: {
                                                                                        line: 5,
                                                                                        column: 20
                                                                                    }
                                                                                },
                                                                                raw: '1'
                                                                            },
                                                                            kind: 'init',
                                                                            computed: false,
                                                                            method: false,
                                                                            shorthand: false,
                                                                            start: 121,
                                                                            end: 125,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 5,
                                                                                    column: 16
                                                                                },
                                                                                end: {
                                                                                    line: 5,
                                                                                    column: 20
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            type: 'SpreadElement',
                                                                            argument: {
                                                                                type: 'YieldExpression',
                                                                                argument: {
                                                                                    type: 'YieldExpression',
                                                                                    argument: null,
                                                                                    delegate: false,
                                                                                    start: 152,
                                                                                    end: 157,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 6,
                                                                                            column: 25
                                                                                        },
                                                                                        end: {
                                                                                            line: 6,
                                                                                            column: 30
                                                                                        }
                                                                                    }
                                                                                },
                                                                                delegate: false,
                                                                                start: 146,
                                                                                end: 157,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 6,
                                                                                        column: 19
                                                                                    },
                                                                                    end: {
                                                                                        line: 6,
                                                                                        column: 30
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 143,
                                                                            end: 157,
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
                                                                        }
                                                                    ],
                                                                    start: 77,
                                                                    end: 174,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 18
                                                                        },
                                                                        end: {
                                                                            line: 7,
                                                                            column: 15
                                                                        }
                                                                    }
                                                                },
                                                                delegate: false,
                                                                start: 71,
                                                                end: 174,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 12
                                                                    },
                                                                    end: {
                                                                        line: 7,
                                                                        column: 15
                                                                    }
                                                                }
                                                            },
                                                            start: 71,
                                                            end: 175,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 12
                                                                },
                                                                end: {
                                                                    line: 7,
                                                                    column: 16
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 29,
                                                    end: 185,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 29
                                                        },
                                                        end: {
                                                            line: 8,
                                                            column: 9
                                                        }
                                                    }
                                                },
                                                async: true,
                                                generator: true,
                                                expression: false,
                                                id: null,
                                                start: 26,
                                                end: 185,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 26
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 9
                                                    }
                                                }
                                            },
                                            static: false,
                                            start: 16,
                                            end: 185,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 8,
                                                    column: 9
                                                }
                                            }
                                        }
                                    ],
                                    start: 14,
                                    end: 186,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 8,
                                            column: 10
                                        }
                                    }
                                },
                                start: 8,
                                end: 186,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 8,
                                        column: 10
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
                            end: 186,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 8,
                                    column: 10
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 186,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 8,
                            column: 10
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 186,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 8,
                    column: 10
                }
            }
        }
    });

    pass(`var C = class { async *method({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) { } };`, {
        source: 'var C = class { async *method({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) { } };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
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
                                                                        name: 'w',
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
                                                                    computed: false,
                                                                    value: {
                                                                        type: 'AssignmentPattern',
                                                                        left: {
                                                                            type: 'ArrayPattern',
                                                                            elements: [
                                                                                {
                                                                                    type: 'Identifier',
                                                                                    name: 'x',
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
                                                                                    type: 'Identifier',
                                                                                    name: 'y',
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
                                                                                    type: 'Identifier',
                                                                                    name: 'z',
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
                                                                        right: {
                                                                            type: 'ArrayExpression',
                                                                            elements: [
                                                                                {
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
                                                                                {
                                                                                    type: 'Literal',
                                                                                    value: 5,
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
                                                                                    },
                                                                                    raw: '5'
                                                                                },
                                                                                {
                                                                                    type: 'Literal',
                                                                                    value: 6,
                                                                                    start: 54,
                                                                                    end: 55,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 1,
                                                                                            column: 54
                                                                                        },
                                                                                        end: {
                                                                                            line: 1,
                                                                                            column: 55
                                                                                        }
                                                                                    },
                                                                                    raw: '6'
                                                                                }
                                                                            ],
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
                                                                        },
                                                                        start: 35,
                                                                        end: 56,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 35
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 56
                                                                            }
                                                                        }
                                                                    },
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 32,
                                                                    end: 56,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 32
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 56
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 30,
                                                            end: 58,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 30
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 58
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
                                                                        name: 'w',
                                                                        start: 63,
                                                                        end: 64,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 63
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 64
                                                                            }
                                                                        }
                                                                    },
                                                                    value: {
                                                                        type: 'ArrayExpression',
                                                                        elements: [
                                                                            {
                                                                                type: 'Literal',
                                                                                value: 7,
                                                                                start: 67,
                                                                                end: 68,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 1,
                                                                                        column: 67
                                                                                    },
                                                                                    end: {
                                                                                        line: 1,
                                                                                        column: 68
                                                                                    }
                                                                                },
                                                                                raw: '7'
                                                                            },
                                                                            {
                                                                                type: 'Identifier',
                                                                                name: 'undefined',
                                                                                start: 70,
                                                                                end: 79,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 1,
                                                                                        column: 70
                                                                                    },
                                                                                    end: {
                                                                                        line: 1,
                                                                                        column: 79
                                                                                    }
                                                                                }
                                                                            }
                                                                        ],
                                                                        start: 66,
                                                                        end: 82,
                                                                        loc: {
                                                                            start: {
                                                                                line: 1,
                                                                                column: 66
                                                                            },
                                                                            end: {
                                                                                line: 1,
                                                                                column: 82
                                                                            }
                                                                        }
                                                                    },
                                                                    kind: 'init',
                                                                    computed: false,
                                                                    method: false,
                                                                    shorthand: false,
                                                                    start: 63,
                                                                    end: 82,
                                                                    loc: {
                                                                        start: {
                                                                            line: 1,
                                                                            column: 63
                                                                        },
                                                                        end: {
                                                                            line: 1,
                                                                            column: 82
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 61,
                                                            end: 84,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 61
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 84
                                                                }
                                                            }
                                                        },
                                                        start: 30,
                                                        end: 84,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 30
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 84
                                                            }
                                                        }
                                                    }
                                                ],
                                                body: {
                                                    type: 'BlockStatement',
                                                    body: [],
                                                    start: 86,
                                                    end: 89,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 86
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 89
                                                        }
                                                    }
                                                },
                                                async: true,
                                                generator: true,
                                                expression: false,
                                                id: null,
                                                start: 29,
                                                end: 89,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 29
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 89
                                                    }
                                                }
                                            },
                                            static: false,
                                            start: 16,
                                            end: 89,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 89
                                                }
                                            }
                                        }
                                    ],
                                    start: 14,
                                    end: 91,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 91
                                        }
                                    }
                                },
                                start: 8,
                                end: 91,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 91
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
                            end: 91,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 91
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 92,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 92
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 92,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 92
                }
            }
        }
    });

    pass(`(class {});`, {
        source: '(class {});',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: null,
                        body: {
                            type: 'ClassBody',
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

    pass(`class A { a(){} };`, {
        source: 'class A { a(){} };',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
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
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
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
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                static: false,
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
                            }
                        ],
                        start: 8,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
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
                },
                {
                    type: 'EmptyStatement',
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

    pass(`class A {static a(){};};`, {
        source: 'class A {static a(){};};',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
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
                                    name: 'a',
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
                                    params: [],
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
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                },
                                static: true,
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
                            }
                        ],
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
                {
                    type: 'EmptyStatement',
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

    pass(`(class extends 0{});`, {
        source: '(class extends 0{});',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: null,
                        superClass: {
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
                        body: {
                            type: 'ClassBody',
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

    pass(`(class A {});`, {
        source: '(class A {});',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ClassExpression',
                        id: {
                            type: 'Identifier',
                            name: 'A',
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
                        superClass: null,
                        body: {
                            type: 'ClassBody',
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
});
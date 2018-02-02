import { pass, fail } from '../test-utils';

describe('Expressions - Object expression', () => {

    fail(`"use strict"; ({ async foo(eval) { } })`, {
        source: `"use strict"; ({ async foo(eval) { } })`,
        line: 1
    });

    fail(`"use strict"; var gen = {
        *method() {
          return {
               ...(function() {
                  var yield;
               }()),
            }
        }
      }.method;`, {
        source: `"use strict"; var gen = {
            *method() {
              return {
                   ...(function() {
                      var yield;
                   }()),
                }
            }
          }.method;`,
        line: 5
    });

    fail(`({ get bar(x) {} })`, {
        source: '({ get bar(x) {} })',
        line: 1
    });

    fail(`({ 5 }) => {}`, {
        source: '({ 5 }) => {}',
        line: 1
    });

    fail(`(...[ 5 ]) => {}`, {
        source: '(...[ 5 ]) => {}',
        line: 1
    });

    fail(`({ set bar(x, y) {} })`, {
        source: '({ set bar(x, y) {} })',
        line: 1
    });

    fail(`({ set bar() {} })`, {
        source: '({ set bar() {} })',
        line: 1
    });

    fail(`({ * *x(){} })`, {
        source: '({ * *x(){} })',
        line: 1
    });

    fail(`({ async x*(){} })`, {
        source: '({ async x*(){} })',
        line: 1
    });

    fail(`({ async x*(){} });`, {
        source: '({ async x*(){} });',
        line: 1
    });

    fail(`({ async x : 0 })`, {
        source: '({ async x : 0 })',
        line: 1
    });

    fail(`({ static 0 })`, {
        source: '({ static 0 })',
        line: 1
    });

    fail(`({ get *x(){} })`, {
        source: '({ get *x(){} })',
        line: 1
    });

    fail(`({ *a: 0 })`, {
        source: '({ *a: 0 })',
        line: 1
    });

    fail(`({ *[0]: 0 })`, {
        source: '({ *[0]: 0 })',
        line: 1
    });

    fail(`x = { get y(z) {} }`, {
        source: 'x = { get y(z) {} }',
        line: 1
    });

    fail(`x = { set y() {} }`, {
        source: 'x = { set y() {} }',
        line: 1
    });

    fail(`x = { set y(a, b) {} }`, {
        source: 'x = { set y(a, b) {} }',
        line: 1
    });

    fail(`({ *method(x = yield) {} });`, {
        source: '({ *method(x = yield) {} });',
        line: 1
    });

    fail(`({ *[0]: 0 })`, {
        source: '({ *[0]: 0 })',
        line: 1
    });

    fail(`({ __proto__: null, __proto__: null })`, {
        source: '({ __proto__: null, __proto__: null })',
        line: 1
    });

    fail(`({ "__proto__": null, '__proto__': null })`, {
        source: '({ "__proto__": null, "__proto__": null })',
        line: 1
    });

    fail(`({[x]});`, {
        source: '({[x]});',
        line: 1
    });

    fail(`var x = { [bar] };`, {
        source: 'var x = { [bar] };',
        line: 1
    });

    fail(`({ *a: 0 })`, {
        source: '({ *a: 0 })',
        line: 1
    });

    fail(`({ *[0]: 0 })`, {
        source: '({ *[0]: 0 })',
        line: 1
    });

    fail(`(function*() { 0, { yield } = {}; });`, {
        source: '(function*() { 0, { yield } = {}; });',
        line: 1
    });

    fail(`({false});`, {
        source: '({false});',
        line: 1
    });

    fail(`({0x1});`, {
        source: '({0x1});',
        line: 1
    });

    fail(`({1e1});`, {
        source: '({1e1});',
        line: 1
    });

    fail(`({0.1});`, {
        source: '({0.1});',
        line: 1
    });

    fail(`"use strict"; ({ import});`, {
        source: '"use strict"; ({ import});',
        line: 1
    });

    pass(`"use strict"; ({  x: 1, x() {} })`, {
        source: `"use strict"; ({  x: 1, x() {} })`,
        loc: true,
        raw: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
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
                        raw: '"use strict"'
                    },
                    directive: 'use strict',
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
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                            }
                        ],
                        start: 15,
                        end: 32,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 32
                            }
                        }
                    },
                    start: 14,
                    end: 33,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
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

    pass(`({ async delete() {} })`, {
        source: `({ async delete() {} })`,
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
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'delete',
                                    start: 9,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 9
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    }
                                },
                                value: {
                                    type: 'FunctionExpression',
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
                                    async: true,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                kind: 'init',
                                computed: false,
                                method: true,
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

    pass(`"use strict"; ({ *x() {}, get x() {} })`, {
        source: `"use strict"; ({ *x() {}, get x() {} })`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
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
                        raw: '"use strict"'
                    },
                    directive: 'use strict',
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
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                    type: 'FunctionExpression',
                                    params: [],
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
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
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
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 34,
                                        end: 36,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 34
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
                                    id: null,
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 26,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 26
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 38,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 38
                            }
                        }
                    },
                    start: 14,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
                        },
                        end: {
                            line: 1,
                            column: 39
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 39,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 39
                }
            }
        }
    });

    pass(`"use strict"; ({ 1.0() {}, 1: 1 })`, {
        source: `"use strict"; ({ 1.0() {}, 1: 1 })`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
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
                    directive: 'use strict',
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
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 1,
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
                                value: {
                                    type: 'FunctionExpression',
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
                                    id: null,
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
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 17,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 17
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 1,
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
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 27,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            }
                        ],
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
                    start: 14,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 14
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

    pass(`({arguments() {}})`, {
        source: `({arguments() {}})`,
        loc: true,
        ranges: true,
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
                            name: 'arguments',
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
                        },
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
                        },
                        kind: 'init',
                        computed: false,
                        method: true,
                        shorthand: false,
                        start: 2,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    }],
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

    pass(`({*arguments() {}})`, {
        source: `({*arguments() {}})`,
        loc: true,
        ranges: true,
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
                            name: 'arguments',
                            start: 3,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
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
                            generator: true,
                            expression: false,
                            id: null,
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

    pass(`({ __proto__, __proto__ })\n`, {
        source: `({ __proto__, __proto__ })\n`,
        expected: {
              body: [
                {
                  expression: {
                   properties: [
                      {
                        computed: false,
                        key: {
                         name: '__proto__',
                          type: 'Identifier',
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        type: 'Property',
                        value: {
                          name: '__proto__',
                          type: 'Identifier',
                        },
                      },
                      {
                        computed: false,
                        key: {
                          name: '__proto__',
                          type: 'Identifier',
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        type: 'Property',
                        value: {
                          name: '__proto__',
                          type: 'Identifier',
                        }
                      }
                    ],
                    type: 'ObjectExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`({get eval() {}})`, {
        source: `({get eval() {}})`,
        loc: true,
        ranges: true,
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
                            name: 'eval',
                            start: 6,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            }
                        },
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
                        kind: 'get',
                        computed: false,
                        method: false,
                        shorthand: false,
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

    pass(`({set arguments(_) {}})`, {
        source: `({set arguments(_) {}})`,
        loc: true,
        ranges: true,
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
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: '_',
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
                            generator: false,
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
                        kind: 'set',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 2,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    }],
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

    pass(`({eval: 1})`, {
        source: `({eval: 1})`,
        loc: true,
        ranges: true,
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
                            name: 'eval',
                            start: 2,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        value: {
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
                            }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 2,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    }],
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

    pass(`({ async })`, {
        source: `({ async })`,
        expected: {
            body: [{
                expression: {
                    properties: [{
                        computed: false,
                        key: {
                            name: 'async',
                            type: 'Identifier',
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true,
                        type: 'Property',
                        value: {
                            name: 'async',
                            type: 'Identifier',
                        },
                    }, ],
                    type: 'ObjectExpression'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`({ if: 0 })`, {
        source: `({ if: 0 })`,
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
                            name: 'if'
                        },
                        value: {
                            type: 'Literal',
                            value: 0
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`({ "answer": 0 })`, {
        source: `({ "answer": 0 })`,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'ObjectExpression',
                    properties: [{
                        type: 'Property',
                        key: {
                            type: 'Literal',
                            value: 'answer'
                        },
                        value: {
                            type: 'Literal',
                            value: 0
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false
                    }]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`({ x: 1, x: 2 })`, {
        source: `({ x: 1, x: 2 })`,
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
                                name: 'x'
                            },
                            value: {
                                type: 'Literal',
                                value: 1
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false
                        },
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            value: {
                                type: 'Literal',
                                value: 2
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false
                        }
                    ]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`({a})`, {
        source: `({a})`,
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
                            name: 'a'
                        },
                        value: {
                            type: 'Identifier',
                            name: 'a'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                    }]
                }
            }],
            sourceType: 'script'
        }
    });
    pass(`({a, b: 0, c})`, {
        source: `({a, b: 0, c})`,
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
                                name: 'a'
                            },
                            value: {
                                type: 'Identifier',
                                name: 'a'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true
                        },
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'b'
                            },
                            value: {
                                type: 'Literal',
                                value: 0
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false
                        },
                        {
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: 'c'
                            },
                            value: {
                                type: 'Identifier',
                                name: 'c'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true
                        }
                    ]
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`"use strict;" ({x:1,   "x":1})`, {
        source: '"use strict;" ({x:1,   "x":1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Literal',
                        value: 'use strict;',
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
                        },
                        raw: '"use strict;"'
                    },
                    arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                value: {
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'x',
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
                                    },
                                    raw: '"x"'
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 23,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 23
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
                    }],
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
                },
                directive: 'use strict;',
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
            }],
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

    pass(`"use strict;" ({ "1": 1, 1: 2 })`, {
        source: '"use strict;" ({ "1": 1, 1: 2 })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Literal',
                        value: 'use strict;',
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
                        },
                        raw: '"use strict;"'
                    },
                    arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: '1',
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
                                    },
                                    raw: '"1"'
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
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
                                value: {
                                    type: 'Literal',
                                    value: 2,
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
                                    raw: '2'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                    }],
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
                directive: 'use strict;',
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
            }],
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

    pass(`"use strict;" ({a:1, b:1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1, y:1, a:1})`, {
        source: '"use strict;" ({a:1, b:1, c:1, d:1, e:1, f:1, g:1, h:1, i:1, j:1, k:1, l:1, m:1, n:1, o:1, p:1, q:1, r:1, s:1, t:1, u:1, v:1, w:1, x:1, y:1, a:1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Literal',
                        value: 'use strict;',
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
                        },
                        raw: '"use strict;"'
                    },
                    arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
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
                                value: {
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
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
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'c',
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
                                value: {
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'd',
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
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 31,
                                end: 34,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 34
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'e',
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
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 36,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 36
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'f',
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
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 43,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 41,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 41
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'g',
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
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'h',
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
                                    value: 1,
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
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 51,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 51
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'i',
                                    start: 56,
                                    end: 57,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 56
                                        },
                                        end: {
                                            line: 1,
                                            column: 57
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 58,
                                    end: 59,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 58
                                        },
                                        end: {
                                            line: 1,
                                            column: 59
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 56,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 56
                                    },
                                    end: {
                                        line: 1,
                                        column: 59
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'j',
                                    start: 61,
                                    end: 62,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 61
                                        },
                                        end: {
                                            line: 1,
                                            column: 62
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
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
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 61,
                                end: 64,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 61
                                    },
                                    end: {
                                        line: 1,
                                        column: 64
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'k',
                                    start: 66,
                                    end: 67,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 66
                                        },
                                        end: {
                                            line: 1,
                                            column: 67
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 68,
                                    end: 69,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 68
                                        },
                                        end: {
                                            line: 1,
                                            column: 69
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 66,
                                end: 69,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 66
                                    },
                                    end: {
                                        line: 1,
                                        column: 69
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'l',
                                    start: 71,
                                    end: 72,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 71
                                        },
                                        end: {
                                            line: 1,
                                            column: 72
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 73,
                                    end: 74,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 73
                                        },
                                        end: {
                                            line: 1,
                                            column: 74
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 71,
                                end: 74,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 71
                                    },
                                    end: {
                                        line: 1,
                                        column: 74
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'm',
                                    start: 76,
                                    end: 77,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 76
                                        },
                                        end: {
                                            line: 1,
                                            column: 77
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 78,
                                    end: 79,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 78
                                        },
                                        end: {
                                            line: 1,
                                            column: 79
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 76,
                                end: 79,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 76
                                    },
                                    end: {
                                        line: 1,
                                        column: 79
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'n',
                                    start: 81,
                                    end: 82,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 81
                                        },
                                        end: {
                                            line: 1,
                                            column: 82
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 83,
                                    end: 84,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 83
                                        },
                                        end: {
                                            line: 1,
                                            column: 84
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 81,
                                end: 84,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 81
                                    },
                                    end: {
                                        line: 1,
                                        column: 84
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'o',
                                    start: 86,
                                    end: 87,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 86
                                        },
                                        end: {
                                            line: 1,
                                            column: 87
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 88,
                                    end: 89,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 88
                                        },
                                        end: {
                                            line: 1,
                                            column: 89
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'p',
                                    start: 91,
                                    end: 92,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 91
                                        },
                                        end: {
                                            line: 1,
                                            column: 92
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 93,
                                    end: 94,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 93
                                        },
                                        end: {
                                            line: 1,
                                            column: 94
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 91,
                                end: 94,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 91
                                    },
                                    end: {
                                        line: 1,
                                        column: 94
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'q',
                                    start: 96,
                                    end: 97,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 96
                                        },
                                        end: {
                                            line: 1,
                                            column: 97
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 98,
                                    end: 99,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 98
                                        },
                                        end: {
                                            line: 1,
                                            column: 99
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 96,
                                end: 99,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 96
                                    },
                                    end: {
                                        line: 1,
                                        column: 99
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'r',
                                    start: 101,
                                    end: 102,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 101
                                        },
                                        end: {
                                            line: 1,
                                            column: 102
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 103,
                                    end: 104,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 103
                                        },
                                        end: {
                                            line: 1,
                                            column: 104
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 101,
                                end: 104,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 101
                                    },
                                    end: {
                                        line: 1,
                                        column: 104
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 's',
                                    start: 106,
                                    end: 107,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 106
                                        },
                                        end: {
                                            line: 1,
                                            column: 107
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 108,
                                    end: 109,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 108
                                        },
                                        end: {
                                            line: 1,
                                            column: 109
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 106,
                                end: 109,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 106
                                    },
                                    end: {
                                        line: 1,
                                        column: 109
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 't',
                                    start: 111,
                                    end: 112,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 111
                                        },
                                        end: {
                                            line: 1,
                                            column: 112
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 113,
                                    end: 114,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 113
                                        },
                                        end: {
                                            line: 1,
                                            column: 114
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 111,
                                end: 114,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 111
                                    },
                                    end: {
                                        line: 1,
                                        column: 114
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'u',
                                    start: 116,
                                    end: 117,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 116
                                        },
                                        end: {
                                            line: 1,
                                            column: 117
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 118,
                                    end: 119,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 118
                                        },
                                        end: {
                                            line: 1,
                                            column: 119
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 116,
                                end: 119,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 116
                                    },
                                    end: {
                                        line: 1,
                                        column: 119
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'v',
                                    start: 121,
                                    end: 122,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 121
                                        },
                                        end: {
                                            line: 1,
                                            column: 122
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 123,
                                    end: 124,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 123
                                        },
                                        end: {
                                            line: 1,
                                            column: 124
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 121,
                                end: 124,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 121
                                    },
                                    end: {
                                        line: 1,
                                        column: 124
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'w',
                                    start: 126,
                                    end: 127,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 126
                                        },
                                        end: {
                                            line: 1,
                                            column: 127
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 128,
                                    end: 129,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 128
                                        },
                                        end: {
                                            line: 1,
                                            column: 129
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 126,
                                end: 129,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 126
                                    },
                                    end: {
                                        line: 1,
                                        column: 129
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 131,
                                    end: 132,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 131
                                        },
                                        end: {
                                            line: 1,
                                            column: 132
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 133,
                                    end: 134,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 133
                                        },
                                        end: {
                                            line: 1,
                                            column: 134
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 131,
                                end: 134,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 131
                                    },
                                    end: {
                                        line: 1,
                                        column: 134
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 136,
                                    end: 137,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 136
                                        },
                                        end: {
                                            line: 1,
                                            column: 137
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 138,
                                    end: 139,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 138
                                        },
                                        end: {
                                            line: 1,
                                            column: 139
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 136,
                                end: 139,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 136
                                    },
                                    end: {
                                        line: 1,
                                        column: 139
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 141,
                                    end: 142,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 141
                                        },
                                        end: {
                                            line: 1,
                                            column: 142
                                        }
                                    }
                                },
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 143,
                                    end: 144,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 143
                                        },
                                        end: {
                                            line: 1,
                                            column: 144
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 141,
                                end: 144,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 141
                                    },
                                    end: {
                                        line: 1,
                                        column: 144
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 145,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 145
                            }
                        }
                    }],
                    start: 0,
                    end: 146,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 146
                        }
                    }
                },
                directive: 'use strict;',
                start: 0,
                end: 146,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 146
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 146,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 146
                }
            }
        }
    });

    pass(`"use strict;" ({get x() {}, set x(q) {}})`, {
        source: '"use strict;" ({get x() {}, set x(q) {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Literal',
                        value: 'use strict;',
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
                        },
                        raw: '"use strict;"'
                    },
                    arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
                                key: {
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'Identifier',
                                        name: 'q',
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
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 37,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 33,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 28,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    }],
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
                },
                directive: 'use strict;',
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
            }],
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

    pass(`"use strict;" ({set x(q) {}, get x() {}})`, {
        source: '"use strict;" ({set x(q) {}, get x() {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Literal',
                        value: 'use strict;',
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
                        },
                        raw: '"use strict;"'
                    },
                    arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
                                key: {
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'Identifier',
                                        name: 'q',
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
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 37,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 34,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 34
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 29,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    }],
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
                },
                directive: 'use strict;',
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
            }],
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

    pass(`"use strict;" ({get x() {}, get x() {}})`, {
        source: '"use strict;" ({get x() {}, get x() {}})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Literal',
                        value: 'use strict;',
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
                        },
                        raw: '"use strict;"'
                    },
                    arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
                                key: {
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 36,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            }
                        ],
                        start: 15,
                        end: 39,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 39
                            }
                        }
                    }],
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
                directive: 'use strict;',
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
            }],
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

    pass(`"use strict;" ({get x() {}, set x(q) {}, y:1})`, {
        source: '"use strict;" ({get x() {}, set x(q) {}, y:1})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'CallExpression',
                    callee: {
                        type: 'Literal',
                        value: 'use strict;',
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
                        },
                        raw: '"use strict;"'
                    },
                    arguments: [{
                        type: 'ObjectExpression',
                        properties: [{
                                type: 'Property',
                                key: {
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
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
                                kind: 'get',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                value: {
                                    type: 'FunctionExpression',
                                    params: [{
                                        type: 'Identifier',
                                        name: 'q',
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
                                    }],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 37,
                                        end: 39,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 37
                                            },
                                            end: {
                                                line: 1,
                                                column: 39
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 33,
                                    end: 39,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 39
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 28,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                value: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 43,
                                    end: 44,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 43
                                        },
                                        end: {
                                            line: 1,
                                            column: 44
                                        }
                                    },
                                    raw: '1'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 41,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 41
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            }
                        ],
                        start: 15,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        }
                    }],
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
                directive: 'use strict;',
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
            }],
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

    pass(`({ x([ a, b ]){} });`, {
        source: '({ x([ a, b ]){} });',
        loc: true,
        ranges: true,
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
                            name: 'x',
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
                            params: [{
                                type: 'ArrayPattern',
                                elements: [{
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
                                    {
                                        type: 'Identifier',
                                        name: 'b',
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
                                start: 5,
                                end: 13,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 13
                                    }
                                }
                            }],
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
                            }
                        },
                        kind: 'init',
                        computed: false,
                        method: true,
                        shorthand: false,
                        start: 3,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 16
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
    pass(`object = { __proto__: undefined };`, {
        source: 'object = { __proto__: undefined };',
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
                        name: 'object',
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
                    operator: '=',
                    right: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: '__proto__',
                                start: 11,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            value: {
                                type: 'Identifier',
                                name: 'undefined',
                                start: 22,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 11,
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 31
                                }
                            }
                        }],
                        start: 9,
                        end: 33,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 33
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

    pass(`object = { __proto__: 1 };`, {
        source: 'object = { __proto__: 1 };',
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
                        name: 'object',
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
                    operator: '=',
                    right: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: '__proto__',
                                start: 11,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 1,
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
                                },
                                raw: '1'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                        }],
                        start: 9,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
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
    pass(`object = { __proto__: false };`, {
        source: 'object = { __proto__: false };',
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
                        name: 'object',
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
                    operator: '=',
                    right: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: '__proto__',
                                start: 11,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: false,
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
                                },
                                raw: 'false'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 11,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        }],
                        start: 9,
                        end: 29,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
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
            }],
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

    pass(`object = { __proto__: 'string literal' };`, {
        source: 'object = { __proto__: "string literal" };',
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
                        name: 'object',
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
                    operator: '=',
                    right: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: '__proto__',
                                start: 11,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 'string literal',
                                start: 22,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 38
                                    }
                                },
                                raw: '"string literal"'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 11,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            }
                        }],
                        start: 9,
                        end: 40,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
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
            }],
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

    pass(`object = { __proto__: Symbol("") };`, {
        source: 'object = { __proto__: Symbol("") };',
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
                        name: 'object',
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
                    operator: '=',
                    right: {
                        type: 'ObjectExpression',
                        properties: [{
                            type: 'Property',
                            key: {
                                type: 'Identifier',
                                name: '__proto__',
                                start: 11,
                                end: 20,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 20
                                    }
                                }
                            },
                            value: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'Symbol',
                                    start: 22,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                arguments: [{
                                    type: 'Literal',
                                    value: '',
                                    start: 29,
                                    end: 31,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 29
                                        },
                                        end: {
                                            line: 1,
                                            column: 31
                                        }
                                    },
                                    raw: '""'
                                }],
                                start: 22,
                                end: 32,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 32
                                    }
                                }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 11,
                            end: 32,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 32
                                }
                            }
                        }],
                        start: 9,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
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

    pass(`({})`, {
        source: '({})',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
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
            }],
            sourceType: 'script',
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
        }
    });

    pass(`({ answer: 0 })`, {
        source: '({ answer: 0 })',
        loc: true,
        ranges: true,
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
                            name: 'answer',
                            start: 3,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    }],
                    start: 1,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
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

    pass(`({ if: 0 })`, {
        source: '({ if: 0 })',
        loc: true,
        ranges: true,
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
                            name: 'if',
                            start: 3,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            }
                        },
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
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
                    }],
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

    pass(`({ true: 0 })`, {
        source: '({ true: 0 })',
        loc: true,
        ranges: true,
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
                            name: 'true',
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
                        },
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 10
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

    pass(`({ x: 1, x: 2 })`, {
        source: '({ x: 1, x: 2 })',
        loc: true,
        ranges: true,
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
                                name: 'x',
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
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                        },
                        {
                            type: 'Property',
                            key: {
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
                            value: {
                                type: 'Literal',
                                value: 2,
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
                                raw: '2'
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
    pass(`({ get width() { return m_width } })`, {
        source: '({ get width() {  } })',
        loc: true,
        ranges: true,
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
                            name: 'width',
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
                                body: [],
                                start: 15,
                                end: 19,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 15
                                    },
                                    end: {
                                        line: 1,
                                        column: 19
                                    }
                                }
                            },
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'get',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    }],
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

    pass(`({ get undef() {} })`, {
        source: '({ get undef() {} })',
        loc: true,
        ranges: true,
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
                            name: 'undef',
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
                            id: null,
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
                        },
                        kind: 'get',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    }],
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

    pass(`({ get if() {} })`, {
        source: '({ get if() {} })',
        loc: true,
        ranges: true,
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
                            name: 'if',
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
                        value: {
                            type: 'FunctionExpression',
                            params: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'get',
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

    pass(`({ get true() {} })`, {
        source: '({ get true() {} })',
        loc: true,
        ranges: true,
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
                            name: 'true',
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
                            }
                        },
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
                        },
                        kind: 'get',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 16
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

    pass(`({ get "undef"() {} })`, {
        source: '({ get "undef"() {} })',
        loc: true,
        ranges: true,
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
                            type: 'Literal',
                            value: 'undef',
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
                            },
                            raw: '"undef"'
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'get',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    }],
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

    pass(`({ get 10() {} })`, {
        source: '({ get 10() {} })',
        loc: true,
        ranges: true,
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
                            type: 'Literal',
                            value: 10,
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
                            raw: '10'
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'get',
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

    pass(`({ set width(w) { w } })`, {
        source: '({ set width(w) { w } })',
        loc: true,
        ranges: true,
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
                            name: 'width',
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
                                name: 'w',
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
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                }],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'set',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    }],
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
            }],
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

    pass(`({ set if(w) { w } })`, {
        source: '({ set if(w) { w } })',
        loc: true,
        ranges: true,
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
                            name: 'if',
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
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'w',
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                }],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 9,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
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

    pass(`({ set "null"(w) { w } })`, {
        source: '({ set "null"(w) { w } })',
        loc: true,
        ranges: true,
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
                            type: 'Literal',
                            value: 'null',
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
                            raw: '"null"'
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'w',
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
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                }],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'set',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    }],
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

    pass(`({ set 10(w) { w } })`, {
        source: '({ set 10(w) { w } })',
        loc: true,
        ranges: true,
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
                            type: 'Literal',
                            value: 10,
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
                            raw: '10'
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'w',
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                }],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 9,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
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

    pass(`({ set if(w) { w } })`, {
        source: '({ set if(w) { w } })',
        loc: true,
        ranges: true,
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
                            name: 'if',
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
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'w',
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                }],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 9,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
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

    pass(`({ set "null"(w) { w } })`, {
        source: '({ set "null"(w) { w } })',
        loc: true,
        ranges: true,
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
                            type: 'Literal',
                            value: 'null',
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
                            raw: '"null"'
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'w',
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
                            }],
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                }],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
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
                        kind: 'set',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 22,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 22
                            }
                        }
                    }],
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

    pass(`({ set 10(w) { w } })`, {
        source: '({ set 10(w) { w } })',
        loc: true,
        ranges: true,
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
                            type: 'Literal',
                            value: 10,
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
                            raw: '10'
                        },
                        value: {
                            type: 'FunctionExpression',
                            params: [{
                                type: 'Identifier',
                                name: 'w',
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
                            body: {
                                type: 'BlockStatement',
                                body: [{
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'w',
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
                                }],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 9,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 9
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

    pass(`({ get: 2 })`, {
        source: '({ get: 2 })',
        loc: true,
        ranges: true,
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
                            name: 'get',
                            start: 3,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    }],
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

    pass(`({ __proto__: 2 })`, {
        source: '({ __proto__: 2 })',
        loc: true,
        ranges: true,
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
                            name: '__proto__',
                            start: 3,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 3,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 3
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    }],
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

    pass(`({"__proto__": 2 })`, {
        source: '({"__proto__": 2 })',
        loc: true,
        ranges: true,
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
                            type: 'Literal',
                            value: '__proto__',
                            start: 2,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 2
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '"__proto__"'
                        },
                        value: {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 2,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 16
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

    pass(`({a})`, {
        source: '({a})',
        loc: true,
        ranges: true,
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
            sourceType: 'script',
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
        }
    });

    pass(`({let})`, {
        source: '({let})',
        loc: true,
        ranges: true,
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
                            name: 'let',
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
                            type: 'Identifier',
                            name: 'let',
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                    }],
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

    pass(`a = { get() { } }`, {
        source: `a = { get() { } }`,
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
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'get',
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
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
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
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 9,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
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
                            start: 4,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
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
            ],
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

    pass(`a = { set() { } }`, {
        source: `a = { set() { } }`,
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
                        },
                        operator: '=',
                        right: {
                            type: 'ObjectExpression',
                            properties: [
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'set',
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
                                        }
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
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
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 9,
                                        end: 15,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
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
                            start: 4,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
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
            ],
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

    pass(`var obj = {
        *g() {
          function h() {
            yield = 1;
          }
        }
      };`, {
        source: `var obj = {
            *g() {
              function h() {
                yield = 1;
              }
            }
          };`,
        loc: true,
        ranges: true,
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
                                            name: 'g',
                                            start: 25,
                                            end: 26,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 2,
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
                                                                            name: 'yield',
                                                                            start: 76,
                                                                            end: 81,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 4,
                                                                                    column: 16
                                                                                },
                                                                                end: {
                                                                                    line: 4,
                                                                                    column: 21
                                                                                }
                                                                            }
                                                                        },
                                                                        operator: '=',
                                                                        right: {
                                                                            type: 'Literal',
                                                                            value: 1,
                                                                            start: 84,
                                                                            end: 85,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 4,
                                                                                    column: 24
                                                                                },
                                                                                end: {
                                                                                    line: 4,
                                                                                    column: 25
                                                                                }
                                                                            },
                                                                        },
                                                                        start: 76,
                                                                        end: 85,
                                                                        loc: {
                                                                            start: {
                                                                                line: 4,
                                                                                column: 16
                                                                            },
                                                                            end: {
                                                                                line: 4,
                                                                                column: 25
                                                                            }
                                                                        }
                                                                    },
                                                                    start: 76,
                                                                    end: 86,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 16
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 26
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 58,
                                                            end: 102,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 27
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 15
                                                                }
                                                            }
                                                        },
                                                        async: false,
                                                        generator: false,
                                                        expression: false,
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'h',
                                                            start: 54,
                                                            end: 55,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 23
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 24
                                                                }
                                                            }
                                                        },
                                                        start: 45,
                                                        end: 102,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 14
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 15
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 29,
                                                end: 116,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 13
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 26,
                                            end: 116,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 13
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 24,
                                        end: 116,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 12
                                            },
                                            end: {
                                                line: 6,
                                                column: 13
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 128,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 7,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 128,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 7,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 129,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 7,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 129,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 7,
                    column: 12
                }
            }
        }
    });

    pass(`var obj = {
        *g1() { (yield 1) },
        *g2() { [yield 1] },
        *g3() { {yield 1} },
        *g4() { yield 1, yield 2; },
        *g5() { (yield 1) ? yield 2 : yield 3; }
      };`, {
        source: `var obj = {
            *g1() { (yield 1) },
            *g2() { [yield 1] },
            *g3() { {yield 1} },
            *g4() { yield 1, yield 2; },
            *g5() { (yield 1) ? yield 2 : yield 3; }
          };`,
        loc: true,
        ranges: true,
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
                                            name: 'g1',
                                            start: 25,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 15
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
                                                                start: 39,
                                                                end: 40,
                                                                loc: {
                                                                    start: {
                                                                        line: 2,
                                                                        column: 27
                                                                    },
                                                                    end: {
                                                                        line: 2,
                                                                        column: 28
                                                                    }
                                                                }
                                                            },
                                                            delegate: false,
                                                            start: 33,
                                                            end: 40,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 21
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 28
                                                                }
                                                            }
                                                        },
                                                        start: 32,
                                                        end: 41,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 29
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 30,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 27,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 31
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 24,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 12
                                            },
                                            end: {
                                                line: 2,
                                                column: 31
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'g2',
                                            start: 58,
                                            end: 60,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 15
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
                                                            type: 'ArrayExpression',
                                                            elements: [
                                                                {
                                                                    type: 'YieldExpression',
                                                                    argument: {
                                                                        type: 'Literal',
                                                                        value: 1,
                                                                        start: 72,
                                                                        end: 73,
                                                                        loc: {
                                                                            start: {
                                                                                line: 3,
                                                                                column: 27
                                                                            },
                                                                            end: {
                                                                                line: 3,
                                                                                column: 28
                                                                            }
                                                                        }
                                                                    },
                                                                    delegate: false,
                                                                    start: 66,
                                                                    end: 73,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 21
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 28
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 65,
                                                            end: 74,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 29
                                                                }
                                                            }
                                                        },
                                                        start: 65,
                                                        end: 74,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 29
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 63,
                                                end: 76,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 60,
                                            end: 76,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 31
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 57,
                                        end: 76,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 12
                                            },
                                            end: {
                                                line: 3,
                                                column: 31
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'g3',
                                            start: 91,
                                            end: 93,
                                            loc: {
                                                start: {
                                                    line: 4,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 4,
                                                    column: 15
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
                                                        type: 'BlockStatement',
                                                        body: [
                                                            {
                                                                type: 'ExpressionStatement',
                                                                expression: {
                                                                    type: 'YieldExpression',
                                                                    argument: {
                                                                        type: 'Literal',
                                                                        value: 1,
                                                                        start: 105,
                                                                        end: 106,
                                                                        loc: {
                                                                            start: {
                                                                                line: 4,
                                                                                column: 27
                                                                            },
                                                                            end: {
                                                                                line: 4,
                                                                                column: 28
                                                                            }
                                                                        }
                                                                    },
                                                                    delegate: false,
                                                                    start: 99,
                                                                    end: 106,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 21
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 28
                                                                        }
                                                                    }
                                                                },
                                                                start: 99,
                                                                end: 106,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 21
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 28
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 98,
                                                        end: 107,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 29
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 96,
                                                end: 109,
                                                loc: {
                                                    start: {
                                                        line: 4,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 4,
                                                        column: 31
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 93,
                                            end: 109,
                                            loc: {
                                                start: {
                                                    line: 4,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 4,
                                                    column: 31
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 90,
                                        end: 109,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 12
                                            },
                                            end: {
                                                line: 4,
                                                column: 31
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'g4',
                                            start: 124,
                                            end: 126,
                                            loc: {
                                                start: {
                                                    line: 5,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 5,
                                                    column: 15
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
                                                            type: 'SequenceExpression',
                                                            expressions: [
                                                                {
                                                                    type: 'YieldExpression',
                                                                    argument: {
                                                                        type: 'Literal',
                                                                        value: 1,
                                                                        start: 137,
                                                                        end: 138,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 26
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 27
                                                                            }
                                                                        }
                                                                    },
                                                                    delegate: false,
                                                                    start: 131,
                                                                    end: 138,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 20
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 27
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    type: 'YieldExpression',
                                                                    argument: {
                                                                        type: 'Literal',
                                                                        value: 2,
                                                                        start: 146,
                                                                        end: 147,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 35
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 36
                                                                            }
                                                                        }
                                                                    },
                                                                    delegate: false,
                                                                    start: 140,
                                                                    end: 147,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 29
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 36
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            start: 131,
                                                            end: 147,
                                                            loc: {
                                                                start: {
                                                                    line: 5,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 36
                                                                }
                                                            }
                                                        },
                                                        start: 131,
                                                        end: 148,
                                                        loc: {
                                                            start: {
                                                                line: 5,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 37
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 129,
                                                end: 150,
                                                loc: {
                                                    start: {
                                                        line: 5,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 39
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 126,
                                            end: 150,
                                            loc: {
                                                start: {
                                                    line: 5,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 5,
                                                    column: 39
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 123,
                                        end: 150,
                                        loc: {
                                            start: {
                                                line: 5,
                                                column: 12
                                            },
                                            end: {
                                                line: 5,
                                                column: 39
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'g5',
                                            start: 165,
                                            end: 167,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 15
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
                                                            type: 'ConditionalExpression',
                                                            test: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'Literal',
                                                                    value: 1,
                                                                    start: 179,
                                                                    end: 180,
                                                                    loc: {
                                                                        start: {
                                                                            line: 6,
                                                                            column: 27
                                                                        },
                                                                        end: {
                                                                            line: 6,
                                                                            column: 28
                                                                        }
                                                                    }
                                                                },
                                                                delegate: false,
                                                                start: 173,
                                                                end: 180,
                                                                loc: {
                                                                    start: {
                                                                        line: 6,
                                                                        column: 21
                                                                    },
                                                                    end: {
                                                                        line: 6,
                                                                        column: 28
                                                                    }
                                                                }
                                                            },
                                                            consequent: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'Literal',
                                                                    value: 2,
                                                                    start: 190,
                                                                    end: 191,
                                                                    loc: {
                                                                        start: {
                                                                            line: 6,
                                                                            column: 38
                                                                        },
                                                                        end: {
                                                                            line: 6,
                                                                            column: 39
                                                                        }
                                                                    }
                                                                },
                                                                delegate: false,
                                                                start: 184,
                                                                end: 191,
                                                                loc: {
                                                                    start: {
                                                                        line: 6,
                                                                        column: 32
                                                                    },
                                                                    end: {
                                                                        line: 6,
                                                                        column: 39
                                                                    }
                                                                }
                                                            },
                                                            alternate: {
                                                                type: 'YieldExpression',
                                                                argument: {
                                                                    type: 'Literal',
                                                                    value: 3,
                                                                    start: 200,
                                                                    end: 201,
                                                                    loc: {
                                                                        start: {
                                                                            line: 6,
                                                                            column: 48
                                                                        },
                                                                        end: {
                                                                            line: 6,
                                                                            column: 49
                                                                        }
                                                                    }
                                                                },
                                                                delegate: false,
                                                                start: 194,
                                                                end: 201,
                                                                loc: {
                                                                    start: {
                                                                        line: 6,
                                                                        column: 42
                                                                    },
                                                                    end: {
                                                                        line: 6,
                                                                        column: 49
                                                                    }
                                                                }
                                                            },
                                                            start: 172,
                                                            end: 201,
                                                            loc: {
                                                                start: {
                                                                    line: 6,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 6,
                                                                    column: 49
                                                                }
                                                            }
                                                        },
                                                        start: 172,
                                                        end: 202,
                                                        loc: {
                                                            start: {
                                                                line: 6,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 6,
                                                                column: 50
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 170,
                                                end: 204,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 52
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 167,
                                            end: 204,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 52
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 164,
                                        end: 204,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 12
                                            },
                                            end: {
                                                line: 6,
                                                column: 52
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 216,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 7,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 216,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 7,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 217,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 7,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 217,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 7,
                    column: 12
                }
            }
        }
    });

    pass(`var method = { method() {} }.method;`, {
        source: `var method = { method() {} }.method;`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'MemberExpression',
                                object: {
                                    type: 'ObjectExpression',
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'method',
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
                                            value: {
                                                type: 'FunctionExpression',
                                                params: [],
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
                                            kind: 'init',
                                            computed: false,
                                            method: true,
                                            shorthand: false,
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
                                        }
                                    ],
                                    start: 13,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                computed: false,
                                property: {
                                    type: 'Identifier',
                                    name: 'method',
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
                                start: 13,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 35
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'method',
                                start: 4,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            },
                            start: 4,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 35
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

    pass(`var yield = 'default';
    var obj = {
      method(x = yield) {
        return x;
      }
    };`, {
        source: `var yield = 'default';
        var obj = {
          method(x = yield) {
            return x;
          }
        };`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 'default',
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
                            id: {
                                type: 'Identifier',
                                name: 'yield',
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
                        }
                    ],
                    kind: 'var',
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
                                            start: 53,
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 16
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
                                                        name: 'x',
                                                        start: 60,
                                                        end: 61,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 17
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 18
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'yield',
                                                        start: 64,
                                                        end: 69,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 26
                                                            }
                                                        }
                                                    },
                                                    start: 60,
                                                    end: 69,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 17
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 26
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'ReturnStatement',
                                                        argument: {
                                                            type: 'Identifier',
                                                            name: 'x',
                                                            start: 92,
                                                            end: 93,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 19
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 20
                                                                }
                                                            }
                                                        },
                                                        start: 85,
                                                        end: 94,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 12
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 21
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 71,
                                                end: 106,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 28
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 11
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 59,
                                            end: 106,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 5,
                                                    column: 11
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 53,
                                        end: 106,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 10
                                            },
                                            end: {
                                                line: 5,
                                                column: 11
                                            }
                                        }
                                    }
                                ],
                                start: 41,
                                end: 116,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 18
                                    },
                                    end: {
                                        line: 6,
                                        column: 9
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
                                start: 35,
                                end: 38,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 2,
                                        column: 15
                                    }
                                }
                            },
                            start: 35,
                            end: 116,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 12
                                },
                                end: {
                                    line: 6,
                                    column: 9
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 31,
                    end: 117,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 6,
                            column: 10
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 117,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 6,
                    column: 10
                }
            }
        }
    });

    pass(`var obj = { method(a, b,) { } };`, {
        source: `var obj = { method(a, b,) { } };`,
        loc: true,
        ranges: true,
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
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
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
                                                body: [],
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
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 18,
                                            end: 29,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 29
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 12,
                                        end: 29,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 29
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 31,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 31
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

    pass(`var obj = {
        method(fromLiteral = 23, fromExpr = 45, fromHole = 99) {
        }
      };`, {
        source: `var obj = {
            method(fromLiteral = 23, fromExpr = 45, fromHole = 99) {
            }
          };`,
        loc: true,
        ranges: true,
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
                                            start: 24,
                                            end: 30,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 18
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
                                                        name: 'fromLiteral',
                                                        start: 31,
                                                        end: 42,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 19
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 30
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 23,
                                                        start: 45,
                                                        end: 47,
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
                                                    start: 31,
                                                    end: 47,
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
                                                {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'fromExpr',
                                                        start: 49,
                                                        end: 57,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 37
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 45
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 45,
                                                        start: 60,
                                                        end: 62,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 48
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 50
                                                            }
                                                        }
                                                    },
                                                    start: 49,
                                                    end: 62,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 37
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 50
                                                        }
                                                    }
                                                },
                                                {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'fromHole',
                                                        start: 64,
                                                        end: 72,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 52
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 60
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 99,
                                                        start: 75,
                                                        end: 77,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 63
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 65
                                                            }
                                                        }
                                                    },
                                                    start: 64,
                                                    end: 77,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 52
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 65
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 79,
                                                end: 94,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 67
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 13
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 30,
                                            end: 94,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 13
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 24,
                                        end: 94,
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
                                    }
                                ],
                                start: 10,
                                end: 106,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 4,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 106,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 4,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 107,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 107,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 12
                }
            }
        }
    });

    pass(`var obj = null;
    var yield = 'propNameViaIdentifier';
    var iter = (function*() {
      obj = {
        *[yield]() {}
      };
    })();`, {
        source: `var obj = null;
        var yield = 'propNameViaIdentifier';
        var iter = (function*() {
          obj = {
            *[yield]() {}
          };
        })();`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
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
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                        }
                    ],
                    kind: 'var',
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
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 'propNameViaIdentifier',
                                start: 36,
                                end: 59,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 20
                                    },
                                    end: {
                                        line: 2,
                                        column: 43
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'yield',
                                start: 28,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 2,
                                        column: 17
                                    }
                                }
                            },
                            start: 28,
                            end: 59,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 12
                                },
                                end: {
                                    line: 2,
                                    column: 43
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 24,
                    end: 60,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 44
                        }
                    }
                },
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'CallExpression',
                                callee: {
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
                                                        name: 'obj',
                                                        start: 105,
                                                        end: 108,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 10
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 13
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
                                                                    type: 'YieldExpression',
                                                                    argument: null,
                                                                    delegate: false,
                                                                    start: 127,
                                                                    end: 132,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 14
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 19
                                                                        }
                                                                    }
                                                                },
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [],
                                                                        start: 136,
                                                                        end: 138,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 23
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 25
                                                                            }
                                                                        }
                                                                    },
                                                                    async: false,
                                                                    generator: true,
                                                                    expression: false,
                                                                    id: null,
                                                                    start: 133,
                                                                    end: 138,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 20
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                kind: 'init',
                                                                computed: true,
                                                                method: true,
                                                                shorthand: false,
                                                                start: 125,
                                                                end: 138,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 12
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 25
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 111,
                                                        end: 150,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 16
                                                            },
                                                            end: {
                                                                line: 6,
                                                                column: 11
                                                            }
                                                        }
                                                    },
                                                    start: 105,
                                                    end: 150,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 10
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 11
                                                        }
                                                    }
                                                },
                                                start: 105,
                                                end: 151,
                                                loc: {
                                                    start: {
                                                        line: 4,
                                                        column: 10
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 12
                                                    }
                                                }
                                            }
                                        ],
                                        start: 93,
                                        end: 161,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 32
                                            },
                                            end: {
                                                line: 7,
                                                column: 9
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 81,
                                    end: 161,
                                    loc: {
                                        start: {
                                            line: 3,
                                            column: 20
                                        },
                                        end: {
                                            line: 7,
                                            column: 9
                                        }
                                    }
                                },
                                arguments: [],
                                start: 80,
                                end: 164,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 19
                                    },
                                    end: {
                                        line: 7,
                                        column: 12
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'iter',
                                start: 73,
                                end: 77,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 12
                                    },
                                    end: {
                                        line: 3,
                                        column: 16
                                    }
                                }
                            },
                            start: 73,
                            end: 164,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 12
                                },
                                end: {
                                    line: 7,
                                    column: 12
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 69,
                    end: 165,
                    loc: {
                        start: {
                            line: 3,
                            column: 8
                        },
                        end: {
                            line: 7,
                            column: 13
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 165,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 7,
                    column: 13
                }
            }
        }
    });

    pass(`var obj = {
        *method(a,) {
        }
      };`, {
        source: `var obj = {
            *method(a,) {
            }
          };`,
        loc: true,
        ranges: true,
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
                                            start: 25,
                                            end: 31,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 19
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'a',
                                                    start: 32,
                                                    end: 33,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 20
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 21
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 36,
                                                end: 51,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 24
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 13
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 31,
                                            end: 51,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 19
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 13
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 24,
                                        end: 51,
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
                                    }
                                ],
                                start: 10,
                                end: 63,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 4,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 63,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 4,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 64,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 64,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 12
                }
            }
        }
    });

    pass(`var __obj = {
        async method(x, y = x, z = y) {
        }
      };`, {
        source: `({
            m(_ = probeParams = function() { return x; }) {
              var x = 'inside';
              probeBody = function() { return x; };
            }
          }.m());`,
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'MemberExpression',
                            object: {
                                type: 'ObjectExpression',
                                properties: [
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'm',
                                            start: 15,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 12
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 13
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
                                                        name: '_',
                                                        start: 17,
                                                        end: 18,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 14
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 15
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'AssignmentExpression',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'probeParams',
                                                            start: 21,
                                                            end: 32,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 18
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 29
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
                                                                        type: 'ReturnStatement',
                                                                        argument: {
                                                                            type: 'Identifier',
                                                                            name: 'x',
                                                                            start: 55,
                                                                            end: 56,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 2,
                                                                                    column: 52
                                                                                },
                                                                                end: {
                                                                                    line: 2,
                                                                                    column: 53
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 48,
                                                                        end: 57,
                                                                        loc: {
                                                                            start: {
                                                                                line: 2,
                                                                                column: 45
                                                                            },
                                                                            end: {
                                                                                line: 2,
                                                                                column: 54
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 46,
                                                                end: 59,
                                                                loc: {
                                                                    start: {
                                                                        line: 2,
                                                                        column: 43
                                                                    },
                                                                    end: {
                                                                        line: 2,
                                                                        column: 56
                                                                    }
                                                                }
                                                            },
                                                            async: false,
                                                            generator: false,
                                                            expression: false,
                                                            id: null,
                                                            start: 35,
                                                            end: 59,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 32
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 56
                                                                }
                                                            }
                                                        },
                                                        start: 21,
                                                        end: 59,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 18
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 56
                                                            }
                                                        }
                                                    },
                                                    start: 17,
                                                    end: 59,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 14
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 56
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'VariableDeclaration',
                                                        declarations: [
                                                            {
                                                                type: 'VariableDeclarator',
                                                                init: {
                                                                    type: 'Literal',
                                                                    value: 'inside',
                                                                    start: 85,
                                                                    end: 93,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 22
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 30
                                                                        }
                                                                    }
                                                                },
                                                                id: {
                                                                    type: 'Identifier',
                                                                    name: 'x',
                                                                    start: 81,
                                                                    end: 82,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 18
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 19
                                                                        }
                                                                    }
                                                                },
                                                                start: 81,
                                                                end: 93,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 18
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 30
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        kind: 'var',
                                                        start: 77,
                                                        end: 94,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 14
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 31
                                                            }
                                                        }
                                                    },
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'AssignmentExpression',
                                                            left: {
                                                                type: 'Identifier',
                                                                name: 'probeBody',
                                                                start: 109,
                                                                end: 118,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 14
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 23
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
                                                                            type: 'ReturnStatement',
                                                                            argument: {
                                                                                type: 'Identifier',
                                                                                name: 'x',
                                                                                start: 141,
                                                                                end: 142,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 4,
                                                                                        column: 46
                                                                                    },
                                                                                    end: {
                                                                                        line: 4,
                                                                                        column: 47
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 134,
                                                                            end: 143,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 4,
                                                                                    column: 39
                                                                                },
                                                                                end: {
                                                                                    line: 4,
                                                                                    column: 48
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    start: 132,
                                                                    end: 145,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 37
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 50
                                                                        }
                                                                    }
                                                                },
                                                                async: false,
                                                                generator: false,
                                                                expression: false,
                                                                id: null,
                                                                start: 121,
                                                                end: 145,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 26
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 50
                                                                    }
                                                                }
                                                            },
                                                            start: 109,
                                                            end: 145,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 14
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 50
                                                                }
                                                            }
                                                        },
                                                        start: 109,
                                                        end: 146,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 14
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 51
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 61,
                                                end: 160,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 58
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 13
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 16,
                                            end: 160,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 5,
                                                    column: 13
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 15,
                                        end: 160,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 12
                                            },
                                            end: {
                                                line: 5,
                                                column: 13
                                            }
                                        }
                                    }
                                ],
                                start: 1,
                                end: 172,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 6,
                                        column: 11
                                    }
                                }
                            },
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'm',
                                start: 173,
                                end: 174,
                                loc: {
                                    start: {
                                        line: 6,
                                        column: 12
                                    },
                                    end: {
                                        line: 6,
                                        column: 13
                                    }
                                }
                            },
                            start: 1,
                            end: 174,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 6,
                                    column: 13
                                }
                            }
                        },
                        arguments: [],
                        start: 1,
                        end: 176,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 6,
                                column: 15
                            }
                        }
                    },
                    start: 0,
                    end: 178,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 6,
                            column: 17
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 178,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 6,
                    column: 17
                }
            }
        }
    });

    pass(`var obj = { async *method([ x = unresolvableReference ]) {} };`, {
        source: `var obj = { async *method([ x = unresolvableReference ]) {} };`,
        loc: true,
        ranges: true,
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
                                            params: [
                                                {
                                                    type: 'ArrayPattern',
                                                    elements: [
                                                        {
                                                            type: 'AssignmentPattern',
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
                                                                name: 'unresolvableReference',
                                                                start: 32,
                                                                end: 53,
                                                                loc: {
                                                                    start: {
                                                                        line: 1,
                                                                        column: 32
                                                                    },
                                                                    end: {
                                                                        line: 1,
                                                                        column: 53
                                                                    }
                                                                }
                                                            },
                                                            start: 28,
                                                            end: 53,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 28
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 53
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 26,
                                                    end: 55,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 26
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 55
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 57,
                                                end: 59,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 57
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
                                            start: 25,
                                            end: 59,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
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
                                        start: 12,
                                        end: 59,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 59
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 61,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 61
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 61,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 61
                                }
                            }
                        }
                    ],
                    kind: 'var',
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
            sourceType: 'script',
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

    pass(`var obj = {
        async *method([,]) {
        }
      };`, {
        source: `var obj = {     async *method([,]) { }      };`,
        loc: true,
        ranges: true,
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
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'ArrayPattern',
                                                    elements: [
                                                        null
                                                    ],
                                                    start: 30,
                                                    end: 33,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 30
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 33
                                                        }
                                                    }
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
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
                                            async: true,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 29,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 29
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 38
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 16,
                                        end: 38,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 38
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 45,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 45
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`var obj = { async *method([x]) { } };`, {
        source: `var obj = { async *method([x]) { } };`,
        loc: true,
        ranges: true,
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
                                            params: [
                                                {
                                                    type: 'ArrayPattern',
                                                    elements: [
                                                        {
                                                            type: 'Identifier',
                                                            name: 'x',
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
                                                        }
                                                    ],
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
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 31,
                                                end: 34,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 31
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
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 12,
                                        end: 34,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 34
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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

    pass(`var __obj = {
        async method(x, y = x, z = y) {
        }
      };`, {
        source: `var __obj = {
            async method(x, y = x, z = y) {
            }
          };`,
        loc: true,
        ranges: true,
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
                                            start: 32,
                                            end: 38,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 24
                                                }
                                            }
                                        },
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [
                                                {
                                                    type: 'Identifier',
                                                    name: 'x',
                                                    start: 39,
                                                    end: 40,
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
                                                {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'y',
                                                        start: 42,
                                                        end: 43,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 28
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 29
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'x',
                                                        start: 46,
                                                        end: 47,
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
                                                    start: 42,
                                                    end: 47,
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
                                                {
                                                    type: 'AssignmentPattern',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'z',
                                                        start: 49,
                                                        end: 50,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 35
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 36
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Identifier',
                                                        name: 'y',
                                                        start: 53,
                                                        end: 54,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 39
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 40
                                                            }
                                                        }
                                                    },
                                                    start: 49,
                                                    end: 54,
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
                                                }
                                            ],
                                            body: {
                                                type: 'BlockStatement',
                                                body: [],
                                                start: 56,
                                                end: 71,
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
                                            async: true,
                                            generator: false,
                                            expression: false,
                                            id: null,
                                            start: 38,
                                            end: 71,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 24
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 13
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 26,
                                        end: 71,
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
                                    }
                                ],
                                start: 12,
                                end: 83,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 4,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: '__obj',
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
                            start: 4,
                            end: 83,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 4,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 84,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 84,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 12
                }
            }
        }
    });

    pass(`var obj = { method() {} };`, {
        source: `var obj = { method() {} };`,
        loc: true,
        ranges: true,
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
                                        value: {
                                            type: 'FunctionExpression',
                                            params: [],
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
                                            async: false,
                                            generator: false,
                                            expression: false,
                                            id: null,
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
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 12,
                                        end: 23,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 12
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 25,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 25
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 25,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 25
                                }
                            }
                        }
                    ],
                    kind: 'var',
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

    pass(`var obj = {
        *g1() { yield; },
        *g2() { yield 1; }
      };`, {
        source: `var obj = {
            *g1() { yield; },
            *g2() { yield 1; }
          };`,
        loc: true,
        ranges: true,
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
                                            name: 'g1',
                                            start: 25,
                                            end: 27,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 15
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
                                                            argument: null,
                                                            delegate: false,
                                                            start: 32,
                                                            end: 37,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 25
                                                                }
                                                            }
                                                        },
                                                        start: 32,
                                                        end: 38,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 26
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 30,
                                                end: 40,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 28
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 27,
                                            end: 40,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 28
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 24,
                                        end: 40,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 12
                                            },
                                            end: {
                                                line: 2,
                                                column: 28
                                            }
                                        }
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'g2',
                                            start: 55,
                                            end: 57,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 15
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
                                                                start: 68,
                                                                end: 69,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 26
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 27
                                                                    }
                                                                }
                                                            },
                                                            delegate: false,
                                                            start: 62,
                                                            end: 69,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 27
                                                                }
                                                            }
                                                        },
                                                        start: 62,
                                                        end: 70,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 28
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 60,
                                                end: 72,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            async: false,
                                            generator: true,
                                            expression: false,
                                            id: null,
                                            start: 57,
                                            end: 72,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 30
                                                }
                                            }
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: true,
                                        shorthand: false,
                                        start: 54,
                                        end: 72,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 12
                                            },
                                            end: {
                                                line: 3,
                                                column: 30
                                            }
                                        }
                                    }
                                ],
                                start: 10,
                                end: 84,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 4,
                                        column: 11
                                    }
                                }
                            },
                            id: {
                                type: 'Identifier',
                                name: 'obj',
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
                            end: 84,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 4,
                                    column: 11
                                }
                            }
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 85,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 4,
                            column: 12
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 85,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 4,
                    column: 12
                }
            }
        }
    });

});
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Declarations - Functions', () => {

    describe('Failure', () => {

        // Esprima issue: https://github.com/jquery/esprima/issues/1509
        const invalidDuplicates = [
            //'function l(w,[w]) { }',
            'function l(w,w=12) { }',
            //'function l(w,{w}) { }',
            //'function l([w,w]) { }',
            //'function l({w,w}) { }',
            //'function l([w], w) { }',
            //'function l({w}, w) { }  ',
        ];

        for (const arg of invalidDuplicates) {
            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }

        // Keyword as binding identifier should throw in
        // 'sloppy', 'strict code, and 'module code'
        const invalidFunctionNamesAsKeywords = [
            'break', 'case', 'catch', 'class', 'const', 'continue',
            'debugger', 'default', 'delete', 'do', 'else', 'export',
            'extends', 'finally', 'for', 'function', 'if', 'import',
            'in', 'instanceof', 'new',
            'return', 'super', 'switch', 'this',
            'throw', 'try', 'typeof', 'var', 'void', 'while', 'with',
        ];
        for (const arg of invalidFunctionNamesAsKeywords) {

            it(`function ${arg}() {};`, () => {
                t.throws(() => {
                    parse(`function ${arg}() {};`, undefined, Context.Empty);
                });
            });

            it(`function ${arg}() {};`, () => {
                t.throws(() => {
                    parse(`function ${arg}() {};`, undefined, Context.Strict | Context.Module);
                });
            });

            it(`(function ${arg}() {});`, () => {
                t.throws(() => {
                    parse(`(function ${arg}() {});`, undefined, Context.Empty);
                });
            });
        }

        const Failures = [
            'try function foo() {} catch (e) {}',
            'do function foo() {} while (0);',
            'for (;false;) function foo() {}',
            'for (var i = 0; i < 1; i++) function f() { };',
            'for (var x in {a: 1}) function f() { };',
            'for (var x in {}) function f() { };',
            'for (var x in {}) function foo() {}',
            'for (x in {a: 1}) function f() { };',
            'for (x in {}) function f() { };',
            'var x; for (x in {}) function foo() {}',
            'with ({}) function f() { };',
            'do label: function foo() {} while (0);',
            'for (;false;) label: function foo() {}',
            'for (var i = 0; i < 1; i++) label: function f() { };',
            'for (var x in {a: 1}) label: function f() { };',
            'for (var x in {}) label: function f() { };',
            'for (var x in {}) label: function foo() {}',
            'for (x in {a: 1}) label: function f() { };',
            'for (x in {}) label: function f() { };',
            'var x; for (x in {}) label: function foo() {}',
            'with ({}) label: function f() { };',
            'if (true) label: function f() {}',
            'if (true) {} else label: function f() {}',
            'if (true) function* f() { }',
            'label: function* f() { }',
            'if (true) async function f() { }',
            'label: async function f() { }',
            'if (true) async function* f() { }',
            'label: async function* f() { }',
            'function eval() { "use strict"; }',
            'function package() { "use strict"; }',
            'function arguments() { "use strict"; }',
            'function implements() { "use strict"; }',
            'function static() { "use strict"; }',
            '"use strict"; function f(){01;}',
            '"use strict"; function f(){("\\1");}',
            'function f(a, a) { "use strict"; function f(b, c) {} }',
            'function arguments(eval) { "use strict"; eval = arguments; function foo() { "use strict"; } }',
            '"use strict"; function f(a, a) {  }',
            'function arguments() { }',
            'function obj.tt() {}',
            'function foo(eval) { }',
            'function foo(eval) { "use strict"; }',
            '"use strict";function _13_1_15_fun(eval) { }',
            'function f(a = 0) {"use strict"; }',
            'function f(x = yield) {}',
        ];

        for (const arg of Failures) {
            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });
        }

        fail('function foo(bar, interface) { "use strict"; }', Context.Empty, {
            source: 'function foo(bar, interface) { "use strict"; }',
        });

        fail('function interface(bar, baz) { "use strict"; }', Context.Empty, {
            source: 'function interface(bar, baz) { "use strict"; }',
        });

        fail('function foo(bar, interface) { "use strict"; }', Context.Empty, {
            source: 'function foo(bar, interface) { "use strict"; }',
        });

        fail('function foo(bar, interface) { "use strict"; }', Context.Empty, {
            source: 'function foo(bar, interface) { "use strict"; }',
        });

        fail('function f() { ++(new.target); }', Context.Empty, {
            source: 'function f() { ++(new.target); }',
        });

        fail('"use strict"; function interfacef() { ++(new.target); }', Context.Empty, {
            source: '"use strict"; function interfacef() { ++(new.target); }',
        });

        fail('function f() { ++(new.target); }', Context.Empty, {
            source: 'function f() { ++(new.target); }',
        });

        fail('function santa() { function eval() { "use strict"; }}', Context.Empty, {
            source: 'function santa() { function eval() { "use strict"; }}',
        });

        fail('function () {}', Context.Empty, {
            source: 'function () {}',
        });

        fail('a: function* a(){}', Context.Empty, {
            source: 'a: function* a(){}',
        });

        fail('for(;;) function a(){}', Context.Empty, {
            source: 'for(;;) function a(){}',
        });

        fail('while(true) function a(){}', Context.Empty, {
            source: 'while(true) function a(){}',
        });

        fail('with(true) function a(){}', Context.Empty, {
            source: 'with(true) function a(){}',
        });

        fail('with(true) function a(){}', Context.Strict | Context.Module, {
            source: 'with(true) function a(){}',
        });

        fail('"use strict"; function eval() { }', Context.Empty, {
            source: '"use strict"; function eval() { }',
        });

        fail('function eval() { }', Context.Module | Context.Strict, {
            source: 'function eval() { }',
        });

        fail('function eval() { "use strict"; }', Context.Empty, {
            source: 'function eval() { "use strict"; }',
        });

        fail('function f(a = 0) { "use strict"; }', Context.Empty, {
            source: 'function f(a = 0) { "use strict"; }',
        });

        fail('function f([...{ x }, y] = [1, 2, 3]) {}', Context.Empty, {
            source: 'function f([...{ x }, y] = [1, 2, 3]) {}',
        });

        fail('function f([...x, y] = [1, 2, 3]) {}', Context.Empty, {
            source: 'function f([...x, y] = [1, 2, 3]) {}',
        });

        fail('function f([...x, y] = [1, 2, 3]) {}', Context.Strict, {
            source: 'function f([...x, y] = [1, 2, 3]) {}',
        });

        fail('function f([...[x], y] = [1, 2, 3]) {}', Context.Empty, {
            source: 'function f([...[x], y] = [1, 2, 3]) {}',
        });

        fail('function f([...[ x ] = []] = []) {}', Context.Empty, {
            source: 'function f([...[ x ] = []] = []) {}',
        });

        fail('function f([...{ x }, y]) {}', Context.Empty, {
            source: 'function f([...{ x }, y]) {}',
        });

        fail('function f([...x, y]) {}', Context.Empty, {
            source: 'function f([...x, y]) {}',
        });

        fail('function f([...[x], y]) {}', Context.Empty, {
            source: 'function f([...[x], y]) {}',
        });

        fail('function f(...x = []) {}', Context.Empty, {
            source: 'function f(...x = []) {}',
        });

        fail('function __func(){\\A\\B\\C};', Context.Empty, {
             source: 'function __func(){\\A\\B\\C};',
         });

        fail('"use strict"; var _13_1_4_fun = function (arguments) { };', Context.Empty, {
            source: '"use strict"; var _13_1_4_fun = function (arguments) { };',
        });

        fail('"use strict"; function eval() {}', Context.Empty, {
            source: '"use strict"; function eval() {}',
        });

        fail('"use strict"; function yield() {}', Context.Empty, {
            source: '"use strict"; function yield() {}',
        });

        fail('"use strict"; function interface() {}', Context.Empty, {
            source: '"use strict"; function interface() {}',
        });

        fail('"use strict"; function foo(yield) {}', Context.Empty, {
            source: '"use strict"; function foo(yield) {}',
        });

        fail('"use strict"; function foo(bar, eval) {}', Context.Empty, {
            source: '"use strict"; function foo(bar, eval) {}',
        });

        fail('"use strict"; function foo(bar, yield) {}', Context.Empty, {
            source: '"use strict"; function foo(bar, yield) {}',
        });

        fail('"use strict"; function foo(bar, interface) {}', Context.Empty, {
            source: '"use strict"; function foo(bar, interface) {}',
        });

        fail('"use strict"; function _13_1_1_fun(eval) { }', Context.Empty, {
            source: '"use strict"; function _13_1_1_fun(eval) { }',
        });

        fail('"use strict"; function _13_1_1_fun(eval) { }', Context.Empty, {
            source: '"use strict"; function _13_1_1_fun(eval) { }',
        });

        fail('function foo(bar, eval) { "use strict"; }', Context.Empty, {
            source: 'function foo(bar, eval) { "use strict"; }',
        });
    });

    describe('Pass', () => {

        const programs = [
            'if (true) function foo() {}',
            'if (false) {} else function f() { };',
            'label: function f() { }',
            'label: if (true) function f() { }',
            'label: if (true) {} else function f() { }',
            'label: label2: function f() { }',
            'function f() { ++(yield); }',
            'function f(a, a) {}',
            'function f(a, a) { function f(a, a) {} }',
            'function f(arg, ...arguments) {g(arg); arguments[0] = 42; g(arg)}',
            'function f(arg, arguments=[]) {g(arg); arguments[0] = 42; g(arg)}',
            'function f(...arg) {g(arg); arguments[0] = 42; g(arg)}',
            'function f(arg) {g(arg); g(function() {arguments[0] = 42}); g(arg)}',
            'function f(arg, x=1) {g(arg); arguments[0] = 42; g(arg)}',
            'function f(arg=1) {g(arg); arguments[0] = 42; g(arg)}',
            'function f(arg) {g(arg); arg = 42; g(arg)}',
            'function f(arg=1) {g(arg); arg = 42; g(arg)}',
            'function f(arg) {g(arg); g(() => arg = 42); g(arg)}',
            'function f(arg) {g(arg); h(arguments); g(arg)}',
            'function f(arg) {g(arg); g(() => arguments[0] = 42); g(arg)}',
            'function foo() { label: function bar() { } }',
            'function foo () {"use strict";}',
            'function __func(){};',
            '"use strict"; (function(){}).hasOwnProperty("icefapper");',
            'function __func(){ delete arguments; return arguments; }',
            'function hello() { say_hi_to_ariya(); }',
            'function arguments() { }',
            'function hello(a, b) { sayHi(); }',
            'var hi = function eval() { };',
            'var hi = function arguments() { };',
            '(function(){})',
            'function test() { "use strict" + 42; }',
            'function test(t, t) { }',
            'function hello() { z(); }',
            'function hello(a) { z(); }',
            'function eval() { function inner() { \"use strict\" } }',
            'function hello(a, b) { z(); }',
            'function test() { \"use strict\"\n + 0; }',
            'function a() {} function a() {}',
            'function a() { function a() {} function a() {} }',
            'function arguments() { }',
            'function arguments() { function foo() { "use strict"; } }',
            'function arguments(eval) { function foo() { "use strict"; } }',
            'function arguments(eval) { function foo() { "use strict"; } function eval() {} }',
            'function arguments() { eval = arguments; function foo() { "use strict"; } }',
            'function arguments(eval) { eval = arguments; function foo() { "use strict"; } }',
            'function arguments(eval) { eval = arguments; function foo() { "use strict"; } "use strict"; }',
            'function arguments(eval) { function foo() { "use strict"; } eval = arguments;  }',
            'function f([x]) {}',
            'function f([[,] = g()]) {}',
            'function f([[...x] = function() {}()]) {}',
            'function f([x = 23]) {}',
            'function f([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}',
            'function f([...x]) {}',
            'function f([x = 23] = []) {}',
            'function f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}',
            'function f([...[]] = function*() {}) {}',
            'function f({ x, } = { x: 23 }) {}',
            'function f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {}',
            'function f({ x, }) {}',
            'function f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
            `function
            x
            (
            )
            {
            }
            ;`,
            `function                                                    y                                   (                                          )                                              {};

            y();
            `,
            `function

            z

            (

            )

            {

            }

            ;
            `,
            'function __func\\u0041(__arg){return __arg;}',
            'function ref(a,) {}',
            'function universe(__proto__) { }'
        ];

        for (const arg of programs) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass(`function x(...{ a }){}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function x(...{ a }){}`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'FunctionDeclaration',
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
                    },
                    id: {
                        type: 'Identifier',
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
                        name: 'x'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [{
                        type: 'RestElement',
                        start: 11,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        },
                        argument: {
                            type: 'ObjectPattern',
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
                            properties: [{
                                type: 'Property',
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
                                method: false,
                                shorthand: true,
                                computed: false,
                                key: {
                                    type: 'Identifier',
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
                                    name: 'a'
                                },
                                kind: 'init',
                                value: {
                                    type: 'Identifier',
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
                                    name: 'a'
                                }
                            }]
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
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
                        body: []
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`function santa() { function package() {} function evdal() { "use strict"; }}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function santa() { function package() {} function evdal() { "use strict"; }}`,
            expected: {
                type: 'Program',
                start: 0,
                end: 76,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 76
                    }
                },
                body: [{
                    type: 'FunctionDeclaration',
                    start: 0,
                    end: 76,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 76
                        }
                    },
                    id: {
                        type: 'Identifier',
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
                        },
                        name: 'santa'
                    },
                    generator: false,
                    expression: false,
                    async: false,
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        start: 17,
                        end: 76,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 76
                            }
                        },
                        body: [{
                                type: 'FunctionDeclaration',
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
                                },
                                id: {
                                    type: 'Identifier',
                                    start: 28,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 35
                                        }
                                    },
                                    name: 'package'
                                },
                                generator: false,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                    type: 'BlockStatement',
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
                                    body: []
                                }
                            },
                            {
                                type: 'FunctionDeclaration',
                                start: 41,
                                end: 75,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 41
                                    },
                                    end: {
                                        line: 1,
                                        column: 75
                                    }
                                },
                                id: {
                                    type: 'Identifier',
                                    start: 50,
                                    end: 55,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 50
                                        },
                                        end: {
                                            line: 1,
                                            column: 55
                                        }
                                    },
                                    name: 'evdal'
                                },
                                generator: false,
                                expression: false,
                                async: false,
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    start: 58,
                                    end: 75,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 58
                                        },
                                        end: {
                                            line: 1,
                                            column: 75
                                        }
                                    },
                                    body: [{
                                        type: 'ExpressionStatement',
                                        start: 60,
                                        end: 73,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 60
                                            },
                                            end: {
                                                line: 1,
                                                column: 73
                                            }
                                        },
                                        expression: {
                                            type: 'Literal',
                                            start: 60,
                                            end: 72,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 60
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 72
                                                }
                                            },
                                            value: 'use strict',
                                            raw: '"use strict"'
                                        },
                                        directive: 'use strict'
                                    }]
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }
        });

        pass(`function foo(bar, eval) { function bar() { "use strict"; } }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function foo(bar, eval) { function bar() { "use strict"; } }`,
            expected: {
                body: [{
                    async: false,
                    body: {
                        body: [{
                            async: false,
                            body: {
                                body: [{
                                    end: 56,
                                    expression: {
                                        end: 55,
                                        loc: {
                                            end: {
                                                column: 55,
                                                line: 1
                                            },
                                            start: {
                                                column: 43,
                                                line: 1
                                            }
                                        },
                                        raw: '"use strict"',
                                        start: 43,
                                        type: 'Literal',
                                        value: 'use strict',
                                    },
                                    loc: {
                                        end: {
                                            column: 56,
                                            line: 1,
                                        },
                                        start: {
                                            column: 43,
                                            line: 1,
                                        }
                                    },
                                    start: 43,
                                    type: 'ExpressionStatement',
                                    directive: 'use strict'
                                }],
                                end: 58,
                                loc: {
                                    end: {
                                        column: 58,
                                        line: 1,
                                    },
                                    start: {
                                        column: 41,
                                        line: 1,
                                    }
                                },
                                start: 41,
                                type: 'BlockStatement',
                            },
                            end: 58,
                            expression: false,
                            generator: false,
                            id: {
                                end: 38,
                                loc: {
                                    end: {
                                        column: 38,
                                        line: 1,
                                    },
                                    start: {
                                        column: 35,
                                        line: 1,
                                    }
                                },
                                name: 'bar',
                                start: 35,
                                type: 'Identifier',
                            },
                            loc: {
                                end: {
                                    column: 58,
                                    line: 1,
                                },
                                start: {
                                    column: 26,
                                    line: 1,
                                },
                            },
                            params: [],
                            start: 26,
                            type: 'FunctionDeclaration',
                        }, ],
                        end: 60,
                        loc: {
                            end: {
                                column: 60,
                                line: 1,
                            },
                            start: {
                                column: 24,
                                line: 1,
                            }
                        },
                        start: 24,
                        type: 'BlockStatement',
                    },
                    end: 60,
                    expression: false,
                    generator: false,
                    id: {
                        end: 12,
                        loc: {
                            end: {
                                column: 12,
                                line: 1,
                            },
                            start: {
                                column: 9,
                                line: 1,
                            }
                        },
                        name: 'foo',
                        start: 9,
                        type: 'Identifier'
                    },
                    loc: {
                        end: {
                            column: 60,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    params: [{
                            end: 16,
                            loc: {
                                end: {
                                    column: 16,
                                    line: 1,
                                },
                                start: {
                                    column: 13,
                                    line: 1
                                }
                            },
                            name: 'bar',
                            start: 13,
                            type: 'Identifier',
                        },
                        {
                            end: 22,
                            loc: {
                                end: {
                                    column: 22,
                                    line: 1,
                                },
                                start: {
                                    column: 18,
                                    line: 1,
                                },
                            },
                            name: 'eval',
                            start: 18,
                            type: 'Identifier'
                        }
                    ],
                    start: 0,
                    type: 'FunctionDeclaration'
                }, ],
                end: 60,
                loc: {
                    end: {
                        column: 60,
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

        pass(`function a() {
            return 'hello \
                world';
          }`, Context.Empty, {
            source: `function a() {
                return 'hello \
                    world';
              }`,
            expected: {
                  body: [
                    {
                      async: false,
                      body: {
                        body: [
                          {
                            argument: {
                              type: 'Literal',
                              value: 'hello                     world',
                            },
                            type: 'ReturnStatement'
                          }
                       ],
                        type: 'BlockStatement',
                      },
                      expression: false,
                      generator: false,
                      id: {
                        name: 'a',
                        type: 'Identifier'
                      },
                      params: [],
                      type: 'FunctionDeclaration'
                    },
                  ],
                  sourceType: 'script',
                  type: 'Program'
                }
          });

        pass(`function bar() {foo = 42}; ext(bar); ext(foo)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function bar() {foo = 42}; ext(bar); ext(foo)`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                        type: 'FunctionDeclaration',
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
                            name: 'bar'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                            type: 'BlockStatement',
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
                            },
                            body: [{
                                type: 'ExpressionStatement',
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
                                },
                                expression: {
                                    type: 'AssignmentExpression',
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
                                    },
                                    operator: '=',
                                    left: {
                                        type: 'Identifier',
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
                                        },
                                        name: 'foo'
                                    },
                                    right: {
                                        type: 'Literal',
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
                                        value: 42,
                                        raw: '42'
                                    }
                                }
                            }]
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
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 27,
                        end: 36,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 36
                            }
                        },
                        expression: {
                            type: 'CallExpression',
                            start: 27,
                            end: 35,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27
                                },
                                end: {
                                    line: 1,
                                    column: 35
                                }
                            },
                            callee: {
                                type: 'Identifier',
                                start: 27,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 27
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                },
                                name: 'ext'
                            },
                            arguments: [{
                                type: 'Identifier',
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
                                },
                                name: 'bar'
                            }]
                        }
                    },
                    {
                        type: 'ExpressionStatement',
                        start: 37,
                        end: 45,
                        loc: {
                            start: {
                                line: 1,
                                column: 37
                            },
                            end: {
                                line: 1,
                                column: 45
                            }
                        },
                        expression: {
                            type: 'CallExpression',
                            start: 37,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 37
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            },
                            callee: {
                                type: 'Identifier',
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
                                },
                                name: 'ext'
                            },
                            arguments: [{
                                type: 'Identifier',
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
                                },
                                name: 'foo'
                            }]
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`function bar() { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function bar() { }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'bar',
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

        pass(`function a(b) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function a(b) { }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
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
                    }],
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

        pass(`function a(b, c) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function a(b, c) { }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
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
                        },
                        {
                            type: 'Identifier',
                            name: 'c',
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
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
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

        pass(`function makeArrayLength(x) { if(x < 1 || x > 4294967295 || x != x || isNaN(x) || !isFinite(x)) return 1; else return Math.floor(x); };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function makeArrayLength(x) { if(x < 1 || x > 4294967295 || x != x || isNaN(x) || !isFinite(x)) return 1; else return Math.floor(x); };`,
            expected: {
                type: 'Program',
                start: 0,
                end: 135,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 135
                    }
                },
                body: [{
                        type: 'FunctionDeclaration',
                        start: 0,
                        end: 134,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 134
                            }
                        },
                        id: {
                            type: 'Identifier',
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
                            },
                            name: 'makeArrayLength'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [{
                            type: 'Identifier',
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
                            name: 'x'
                        }],
                        body: {
                            type: 'BlockStatement',
                            start: 28,
                            end: 134,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 28
                                },
                                end: {
                                    line: 1,
                                    column: 134
                                }
                            },
                            body: [{
                                type: 'IfStatement',
                                start: 30,
                                end: 132,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 30
                                    },
                                    end: {
                                        line: 1,
                                        column: 132
                                    }
                                },
                                test: {
                                    type: 'LogicalExpression',
                                    start: 33,
                                    end: 94,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 94
                                        }
                                    },
                                    left: {
                                        type: 'LogicalExpression',
                                        start: 33,
                                        end: 78,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 33
                                            },
                                            end: {
                                                line: 1,
                                                column: 78
                                            }
                                        },
                                        left: {
                                            type: 'LogicalExpression',
                                            start: 33,
                                            end: 66,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 33
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 66
                                                }
                                            },
                                            left: {
                                                type: 'LogicalExpression',
                                                start: 33,
                                                end: 56,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 33
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 56
                                                    }
                                                },
                                                left: {
                                                    type: 'BinaryExpression',
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
                                                    },
                                                    left: {
                                                        type: 'Identifier',
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
                                                        name: 'x'
                                                    },
                                                    operator: '<',
                                                    right: {
                                                        type: 'Literal',
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
                                                        },
                                                        value: 1,
                                                        raw: '1'
                                                    }
                                                },
                                                operator: '||',
                                                right: {
                                                    type: 'BinaryExpression',
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
                                                    },
                                                    left: {
                                                        type: 'Identifier',
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
                                                        name: 'x'
                                                    },
                                                    operator: '>',
                                                    right: {
                                                        type: 'Literal',
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
                                                        },
                                                        value: 4294967295,
                                                        raw: '4294967295'
                                                    }
                                                }
                                            },
                                            operator: '||',
                                            right: {
                                                type: 'BinaryExpression',
                                                start: 60,
                                                end: 66,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 60
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 66
                                                    }
                                                },
                                                left: {
                                                    type: 'Identifier',
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
                                                    },
                                                    name: 'x'
                                                },
                                                operator: '!=',
                                                right: {
                                                    type: 'Identifier',
                                                    start: 65,
                                                    end: 66,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 65
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 66
                                                        }
                                                    },
                                                    name: 'x'
                                                }
                                            }
                                        },
                                        operator: '||',
                                        right: {
                                            type: 'CallExpression',
                                            start: 70,
                                            end: 78,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 70
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 78
                                                }
                                            },
                                            callee: {
                                                type: 'Identifier',
                                                start: 70,
                                                end: 75,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 70
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 75
                                                    }
                                                },
                                                name: 'isNaN'
                                            },
                                            arguments: [{
                                                type: 'Identifier',
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
                                                },
                                                name: 'x'
                                            }]
                                        }
                                    },
                                    operator: '||',
                                    right: {
                                        type: 'UnaryExpression',
                                        start: 82,
                                        end: 94,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 82
                                            },
                                            end: {
                                                line: 1,
                                                column: 94
                                            }
                                        },
                                        operator: '!',
                                        prefix: true,
                                        argument: {
                                            type: 'CallExpression',
                                            start: 83,
                                            end: 94,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 83
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 94
                                                }
                                            },
                                            callee: {
                                                type: 'Identifier',
                                                start: 83,
                                                end: 91,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 83
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 91
                                                    }
                                                },
                                                name: 'isFinite'
                                            },
                                            arguments: [{
                                                type: 'Identifier',
                                                start: 92,
                                                end: 93,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 92
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 93
                                                    }
                                                },
                                                name: 'x'
                                            }]
                                        }
                                    }
                                },
                                consequent: {
                                    type: 'ReturnStatement',
                                    start: 96,
                                    end: 105,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 96
                                        },
                                        end: {
                                            line: 1,
                                            column: 105
                                        }
                                    },
                                    argument: {
                                        type: 'Literal',
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
                                        value: 1,
                                        raw: '1'
                                    }
                                },
                                alternate: {
                                    type: 'ReturnStatement',
                                    start: 111,
                                    end: 132,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 111
                                        },
                                        end: {
                                            line: 1,
                                            column: 132
                                        }
                                    },
                                    argument: {
                                        type: 'CallExpression',
                                        start: 118,
                                        end: 131,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 118
                                            },
                                            end: {
                                                line: 1,
                                                column: 131
                                            }
                                        },
                                        callee: {
                                            type: 'MemberExpression',
                                            start: 118,
                                            end: 128,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 118
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 128
                                                }
                                            },
                                            object: {
                                                type: 'Identifier',
                                                start: 118,
                                                end: 122,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 118
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 122
                                                    }
                                                },
                                                name: 'Math'
                                            },
                                            property: {
                                                type: 'Identifier',
                                                start: 123,
                                                end: 128,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 123
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 128
                                                    }
                                                },
                                                name: 'floor'
                                            },
                                            computed: false
                                        },
                                        arguments: [{
                                            type: 'Identifier',
                                            start: 129,
                                            end: 130,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 129
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 130
                                                }
                                            },
                                            name: 'x'
                                        }]
                                    }
                                }
                            }]
                        }
                    },
                    {
                        type: 'EmptyStatement',
                        start: 134,
                        end: 135,
                        loc: {
                            start: {
                                line: 1,
                                column: 134
                            },
                            end: {
                                line: 1,
                                column: 135
                            }
                        }
                    }
                ],
                sourceType: 'script'
            }
        });

        pass(`function foo () {"use strict";}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function foo () {"use strict";}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ExpressionStatement',
                            directive: 'use strict',
                            expression: {
                                type: 'Literal',
                                value: 'use strict',
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
                                },
                                raw: '"use strict"'
                            },
                            start: 17,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        }],
                        start: 16,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 31
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

        pass(`function __decl(){return 1;}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function __decl(){return 1;}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'ReturnStatement',
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
                            }
                        }],
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
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: '__decl',
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

        pass(`function __func__2(){b};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function __func__2(){b};`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
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
                            }],
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
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: '__func__2',
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

        pass(`function __func__3(){1};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function __func__3(){1};`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
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
                            }],
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
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: '__func__3',
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

        pass(`function __func__4(){1+c};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function __func__4(){1+c};`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'BinaryExpression',
                                    left: {
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
                                    right: {
                                        type: 'Identifier',
                                        name: 'c',
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
                                    operator: '+',
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
                            }],
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
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: '__func__4',
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

        pass(`function __func__5(){inc(d)};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function __func__5(){inc(d)};`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'inc',
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
                                    arguments: [{
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
                                    }],
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
                            }],
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
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: '__func__5',
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
                    {
                        type: 'EmptyStatement',
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
                    }
                ],
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

        pass(`function foo (a, b, c) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function foo (a, b, c) { }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
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
                    body: {
                        type: 'BlockStatement',
                        body: [],
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

        pass(`function __gunc(){return true};`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function __gunc(){return true};`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'Literal',
                                    value: true,
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
                                    },
                                    raw: 'true'
                                },
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
                            }],
                            start: 17,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
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
                            name: '__gunc',
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
                    {
                        type: 'EmptyStatement',
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
                    }
                ],
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

        // function __func(){return "ascii"};
        // function \u005f\u005f\u0066\u0075\u006e\u0063(){return "unicode"};//__func in unicode
        // function __\u0066\u0075\u006e\u0063(){return "both"};//__func in unicode

        pass(`function f(x = x) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f(x = x) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
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

        pass(`function ref(a, b = 39,) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function ref(a, b = 39,) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
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
                            type: 'AssignmentPattern',
                            left: {
                                type: 'Identifier',
                                name: 'b',
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
                                value: 39,
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
                                raw: '39'
                            },
                            start: 16,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
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
                        name: 'ref',
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
                }],
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

        pass(`function f([x, y, z]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([x, y, z]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
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
                            {
                                type: 'Identifier',
                                name: 'y',
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
                            {
                                type: 'Identifier',
                                name: 'z',
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
                    }],
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

        pass(`function f([[x]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([[x]]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'ArrayPattern',
                            elements: [{
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
                        }],
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

        pass(`function f([fn = function () {}, xFn = function x() {}]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([fn = function () {}, xFn = function x() {}]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'fn',
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
                                right: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
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
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
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
                                start: 12,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 31
                                    }
                                }
                            },
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'xFn',
                                    start: 33,
                                    end: 36,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 33
                                        },
                                        end: {
                                            line: 1,
                                            column: 36
                                        }
                                    }
                                },
                                right: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 52,
                                        end: 54,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 52
                                            },
                                            end: {
                                                line: 1,
                                                column: 54
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                },
                                start: 33,
                                end: 54,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 33
                                    },
                                    end: {
                                        line: 1,
                                        column: 54
                                    }
                                }
                            }
                        ],
                        start: 11,
                        end: 55,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 55
                            }
                        }
                    }],
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
                    end: 59,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 59
                        }
                    }
                }],
                start: 0,
                end: 59,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 59
                    }
                }
            }
        });

        pass(`function foo () {}
              function foo () {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function foo () {}
            function foo () {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                        type: 'FunctionDeclaration',
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
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 47,
                            end: 49,
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
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 40,
                            end: 43,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 21
                                },
                                end: {
                                    line: 2,
                                    column: 24
                                }
                            }
                        },
                        start: 31,
                        end: 49,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 2,
                                column: 30
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
                        line: 2,
                        column: 30
                    }
                }
            }
        });

        pass(`function foo () { function foo () {} function foo () {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function foo () { function foo () {} function foo () {} }`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                        type: 'BlockStatement',
                        body: [{
                                type: 'FunctionDeclaration',
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
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 27,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 27
                                        },
                                        end: {
                                            line: 1,
                                            column: 30
                                        }
                                    }
                                },
                                start: 18,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 1,
                                        column: 36
                                    }
                                }
                            },
                            {
                                type: 'FunctionDeclaration',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 53,
                                    end: 55,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 53
                                        },
                                        end: {
                                            line: 1,
                                            column: 55
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'foo',
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
                                start: 37,
                                end: 55,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 37
                                    },
                                    end: {
                                        line: 1,
                                        column: 55
                                    }
                                }
                            }
                        ],
                        start: 16,
                        end: 57,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
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
                    end: 57,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 57
                        }
                    }
                }],
                start: 0,
                end: 57,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 57
                    }
                }
            }
        });

        pass(`function f([x = 23]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([x = 23]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'AssignmentPattern',
                            left: {
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
                            right: {
                                type: 'Literal',
                                value: 23,
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
                                },
                                raw: '23'
                            },
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
                        }],
                        start: 11,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    }],
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

        pass(`function f([,]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([,]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'ArrayPattern',
                        elements: [
                            null
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

        pass(`function f([...[,]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([...[,]]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'ArrayPattern',
                        elements: [{
                            type: 'RestElement',
                            argument: {
                                type: 'ArrayPattern',
                                elements: [
                                    null
                                ],
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
                        }],
                        start: 11,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    }],
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

        pass(`function f([[x, y, z] = [4, 5, 6]] = [[7, 8, 9]]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([[x, y, z] = [4, 5, 6]] = [[7, 8, 9]]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'ArrayPattern',
                                    elements: [{
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
                                        {
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
                                        {
                                            type: 'Identifier',
                                            name: 'z',
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
                                right: {
                                    type: 'ArrayExpression',
                                    elements: [{
                                            type: 'Literal',
                                            value: 4,
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
                                            raw: '4'
                                        },
                                        {
                                            type: 'Literal',
                                            value: 5,
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
                                            raw: '5'
                                        },
                                        {
                                            type: 'Literal',
                                            value: 6,
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
                                            raw: '6'
                                        }
                                    ],
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
                                start: 12,
                                end: 33,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 33
                                    }
                                }
                            }],
                            start: 11,
                            end: 34,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 34
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'ArrayExpression',
                                elements: [{
                                        type: 'Literal',
                                        value: 7,
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
                                        raw: '7'
                                    },
                                    {
                                        type: 'Literal',
                                        value: 8,
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
                                        raw: '8'
                                    },
                                    {
                                        type: 'Literal',
                                        value: 9,
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
                                        },
                                        raw: '9'
                                    }
                                ],
                                start: 38,
                                end: 47,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 38
                                    },
                                    end: {
                                        line: 1,
                                        column: 47
                                    }
                                }
                            }],
                            start: 37,
                            end: 48,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 37
                                },
                                end: {
                                    line: 1,
                                    column: 48
                                }
                            }
                        },
                        start: 11,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 50,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 50
                            },
                            end: {
                                line: 1,
                                column: 52
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
                    end: 52,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 52
                        }
                    }
                }],
                start: 0,
                end: 52,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 52
                    }
                }
            }
        });

        pass(`function f([x] = []) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([x] = []) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
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
                            }],
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
                            type: 'ArrayExpression',
                            elements: [],
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
                        start: 11,
                        end: 19,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 19
                            }
                        }
                    }],
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

        pass(`function f([{ x }] = [null]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([{ x }] = [null]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'ObjectPattern',
                                properties: [{
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
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
                                    shorthand: true,
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
                            start: 11,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                type: 'Literal',
                                value: null,
                                start: 22,
                                end: 26,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 22
                                    },
                                    end: {
                                        line: 1,
                                        column: 26
                                    }
                                },
                                raw: 'null'
                            }],
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
                    body: {
                        type: 'BlockStatement',
                        body: [],
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

        pass(`function f([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'ArrayPattern',
                            elements: [{
                                type: 'RestElement',
                                argument: {
                                    type: 'ObjectPattern',
                                    properties: [{
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 0,
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
                                                raw: '0'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'v',
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
                                        },
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
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
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'w',
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
                                            shorthand: false,
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
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 2,
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
                                                raw: '2'
                                            },
                                            computed: false,
                                            value: {
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
                                            method: false,
                                            shorthand: false,
                                            start: 29,
                                            end: 33,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 29
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 33
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Literal',
                                                value: 3,
                                                start: 35,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 35
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                },
                                                raw: '3'
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'y',
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
                                            method: false,
                                            shorthand: false,
                                            start: 35,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 35
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        },
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'Identifier',
                                                name: 'length',
                                                start: 41,
                                                end: 47,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 41
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 47
                                                    }
                                                }
                                            },
                                            computed: false,
                                            value: {
                                                type: 'Identifier',
                                                name: 'z',
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
                                            method: false,
                                            shorthand: false,
                                            start: 41,
                                            end: 50,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 41
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 50
                                                }
                                            }
                                        }
                                    ],
                                    start: 15,
                                    end: 52,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 15
                                        },
                                        end: {
                                            line: 1,
                                            column: 52
                                        }
                                    }
                                },
                                start: 12,
                                end: 52,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 12
                                    },
                                    end: {
                                        line: 1,
                                        column: 52
                                    }
                                }
                            }],
                            start: 11,
                            end: 53,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 53
                                }
                            }
                        },
                        right: {
                            type: 'ArrayExpression',
                            elements: [{
                                    type: 'Literal',
                                    value: 7,
                                    start: 57,
                                    end: 58,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 57
                                        },
                                        end: {
                                            line: 1,
                                            column: 58
                                        }
                                    },
                                    raw: '7'
                                },
                                {
                                    type: 'Literal',
                                    value: 8,
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
                                    },
                                    raw: '8'
                                },
                                {
                                    type: 'Literal',
                                    value: 9,
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
                                    raw: '9'
                                }
                            ],
                            start: 56,
                            end: 65,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 56
                                },
                                end: {
                                    line: 1,
                                    column: 65
                                }
                            }
                        },
                        start: 11,
                        end: 65,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 65
                            }
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 67,
                        end: 69,
                        loc: {
                            start: {
                                line: 1,
                                column: 67
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
                }],
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

        pass(`function f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`,
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [{
                    type: 'FunctionDeclaration',
                    params: [{
                        type: 'AssignmentPattern',
                        left: {
                            type: 'ObjectPattern',
                            properties: [{
                                type: 'Property',
                                kind: 'init',
                                key: {
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
                                },
                                computed: false,
                                value: {
                                    type: 'AssignmentPattern',
                                    left: {
                                        type: 'ArrayPattern',
                                        elements: [{
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
                                            {
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
                                            {
                                                type: 'Identifier',
                                                name: 'z',
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
                                    right: {
                                        type: 'ArrayExpression',
                                        elements: [{
                                                type: 'Literal',
                                                value: 4,
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
                                                raw: '4'
                                            },
                                            {
                                                type: 'Literal',
                                                value: 5,
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
                                                raw: '5'
                                            },
                                            {
                                                type: 'Literal',
                                                value: 6,
                                                start: 35,
                                                end: 36,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 35
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 36
                                                    }
                                                },
                                                raw: '6'
                                            }
                                        ],
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
                                    start: 16,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 16
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                method: false,
                                shorthand: false,
                                start: 13,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 13
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            }],
                            start: 11,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        },
                        right: {
                            type: 'ObjectExpression',
                            properties: [{
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'w',
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
                                    type: 'ArrayExpression',
                                    elements: [{
                                            type: 'Literal',
                                            value: 7,
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
                                            raw: '7'
                                        },
                                        {
                                            type: 'Identifier',
                                            name: 'undefined',
                                            start: 51,
                                            end: 60,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 51
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 60
                                                }
                                            }
                                        }
                                    ],
                                    start: 47,
                                    end: 63,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 47
                                        },
                                        end: {
                                            line: 1,
                                            column: 63
                                        }
                                    }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 44,
                                end: 63,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 44
                                    },
                                    end: {
                                        line: 1,
                                        column: 63
                                    }
                                }
                            }],
                            start: 42,
                            end: 65,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 42
                                },
                                end: {
                                    line: 1,
                                    column: 65
                                }
                            }
                        },
                        start: 11,
                        end: 65,
                        loc: {
                            start: {
                                line: 1,
                                column: 11
                            },
                            end: {
                                line: 1,
                                column: 65
                            }
                        }
                    }],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 67,
                        end: 69,
                        loc: {
                            start: {
                                line: 1,
                                column: 67
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
                }],
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

    });

    pass(`function test(t, t) { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `function test(t, t) { }`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'FunctionDeclaration',
                params: [{
                        type: 'Identifier',
                        name: 't',
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
                    {
                        type: 'Identifier',
                        name: 't',
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
                body: {
                    type: 'BlockStatement',
                    body: [],
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
                async: false,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'test',
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

    pass(`function arguments() { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `function arguments() { }`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'FunctionDeclaration',
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
                async: false,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'arguments',
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

    pass(`function a() { function a() {} function a() {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `function a() { function a() {} function a() {} }`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [{
                            type: 'FunctionDeclaration',
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
                            id: {
                                type: 'Identifier',
                                name: 'a',
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
                        {
                            type: 'FunctionDeclaration',
                            params: [],
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
                            async: false,
                            generator: false,
                            expression: false,
                            id: {
                                type: 'Identifier',
                                name: 'a',
                                start: 40,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 40
                                    },
                                    end: {
                                        line: 1,
                                        column: 41
                                    }
                                }
                            },
                            start: 31,
                            end: 46,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 31
                                },
                                end: {
                                    line: 1,
                                    column: 46
                                }
                            }
                        }
                    ],
                    start: 13,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 13
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

    pass(`a: function a(){}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `a: function a(){}`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'LabeledStatement',
                label: {
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
                body: {
                    type: 'FunctionDeclaration',
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

    pass(`if (0) function a(){}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `if (0) function a(){}`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Literal',
                    value: 0,
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
                    },
                    raw: '0'
                },
                alternate: null,
                consequent: {
                    type: 'FunctionDeclaration',
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
                    id: {
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
                    start: 7,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 21
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

    pass(`if (0) function a(){}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `if (0) function a(){}`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Literal',
                    value: 0,
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
                    },
                    raw: '0'
                },
                alternate: null,
                consequent: {
                    type: 'FunctionDeclaration',
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
                    id: {
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
                    start: 7,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 21
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

    pass(`if (0) function a(){} else;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `if (0) function a(){} else;`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Literal',
                    value: 0,
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
                    },
                    raw: '0'
                },
                alternate: {
                    type: 'EmptyStatement',
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
                consequent: {
                    type: 'FunctionDeclaration',
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
                    id: {
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
                    start: 7,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 21
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
            }],
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

    pass(`if (0) function a(){} else function b(){}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `if (0) function a(){} else function b(){}`,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [{
                type: 'IfStatement',
                test: {
                    type: 'Literal',
                    value: 0,
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
                    },
                    raw: '0'
                },
                alternate: {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
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
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
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
                    start: 27,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 27
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                },
                consequent: {
                    type: 'FunctionDeclaration',
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
                    id: {
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
                    start: 7,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 21
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

    pass(`try {} catch (e) { if(0) function e(){} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
        source: `try {} catch (e) { if(0) function e(){} }`,
        expected: {
            type: 'Program',
            sourceType: 'script',
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
                        name: 'e',
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
                    body: {
                        type: 'BlockStatement',
                        body: [{
                            type: 'IfStatement',
                            test: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            alternate: null,
                            consequent: {
                                type: 'FunctionDeclaration',
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
                                id: {
                                    type: 'Identifier',
                                    name: 'e',
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
                                start: 25,
                                end: 39,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 25
                                    },
                                    end: {
                                        line: 1,
                                        column: 39
                                    }
                                }
                            },
                            start: 19,
                            end: 39,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 19
                                },
                                end: {
                                    line: 1,
                                    column: 39
                                }
                            }
                        }],
                        start: 17,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    },
                    start: 7,
                    end: 41,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                },
                finalizer: null,
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
});
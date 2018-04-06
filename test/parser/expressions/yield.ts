import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

// NOTE! Several tests that doesn't fail in here now. I will fix this as soon as I know everything
// parses as it should

describe('Expressions - Yield', () => {

    describe('Failures', () => {

        const StrictErrors = [
            'var yield;',
            'var foo, yield;',
            'try { } catch (yield) { }',
            'function yield() { }',
            '(function yield() { })',
            'function foo(yield) { }',
            'function foo(bar, yield) { }',
            'function * yield() { }',
            '(function * yield() { })',
            'yield = 1;',
            'var foo = yield = 1;',
            '++yield;',
            'yield++;',
            'yield: 34;',
        ];

        for (const arg of StrictErrors) {
            it(`"use strict"; ${arg}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; function foo() { ${arg}}`, () => {
                t.throws(() => {
                    parse(`"use strict"; function foo() { ${arg}}`, undefined, Context.Empty);
                });
            });

            it(`function foo() { "use strict"; ${arg} }`, () => {
                t.throws(() => {
                    parse(`function foo() { "use strict"; ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (function not_gen() {${arg}})`, () => {
                t.throws(() => {
                    parse(`"use strict"; (function not_gen() {${arg}})`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (function * gen() { function not_gen() { ${arg}} }`, () => {
                t.throws(() => {
                    parse(`"use strict"; (function * gen() { function not_gen() { ${arg}} }`, undefined, Context.Empty);
                });
            });

            it(`"use strict"; (function * gen() { (function not_gen() { ${arg}}) })`, () => {
                t.throws(() => {
                    parse(`"use strict"; (function * gen() { (function not_gen() { ${arg}}) })`, undefined, Context.Empty);
                });
            });
        }

        const invalidSyntax = [
            'var obj = { *g(yield) {} };',
            'function *a(){yield\n*a}',
            'var obj = { *g(yield) {} };',
            'function *g() { try {} catch (yield) {} }',
            '(function *(x, ...yield){})',
            'function *g(a, b, c, ...yield){}',
            '"use strict"; (yield) => 42',
            `var obj = { *g(yield) {} };`,
            `"use strict"; function not_gen() { (function yield() { }) }`,
            '"use strict"; function not_gen() { function foo(bar, yield) { } }',
            '"use strict"; function not_gen() { try { } catch (yield) { } }',
            '"use strict"; function not_gen() { function yield() { } }',
            '"use strict"; var [yield] = [42];',
            '"use strict"; function not_gen() { function yield() { } }',
            'function test_func() { "use strict"; function * yield() { } }',
            'function test_func() { "use strict"; function * yield() { } }',
            '"use strict"; function * gen() { function not_gen() { function foo(yield) { } }',
            '"use strict"; function * gen() { function not_gen() {  yield = 1;}',
            '"use strict"; function * gen() { function not_gen() { try { } catch (yield) { } }',
            'function *a(){yield*}',
            '(a = yield 3) {}',
            '(yield 3) {}',
            '(a = yield) {}',
            '(yield = 1) {}',
            '(yield) {}',
        ];

        for (const arg of invalidSyntax) {
            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });
        }

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
            // `({yield}) => {};`, // generator issue!!
            // `({yield = 0}) => {};`, // generator issue!!
        ];

        const yieldInBody = [
            // `() => yield;`,
            // `() => yield /a/g;`,
            `() => { var x = yield; }`,
            `() => { var x = yield /a/g; }`,

            `() => { var yield; };`,
            //     `() => { var yield = 0; };`,
            `() => { var [yield] = []; };`,
            `() => { var [yield = 0] = []; };`,
            `() => { var [...yield] = []; };`,
            `() => { var {a: yield} = {}; };`,
            `() => { var {yield} = {}; };`,
            //   `() => { var {yield = 0} = {}; };`,

            `() => { let yield; };`,
            //   `() => { let yield = 0; };`,
            `() => { let [yield] = []; };`,
            `() => { let [yield = 0] = []; };`,
            `() => { let [...yield] = []; };`,
            `() => { let {a: yield} = {}; };`,
            `() => { let {yield} = {}; };`,
            // `() => { let {yield = 0} = {}; };`,

            `() => { const yield = 0; };`,
            `() => { const [yield] = []; };`,
            `() => { const [yield = 0] = []; };`,
            `() => { const [...yield] = []; };`,
            `() => { const {a: yield} = {}; };`,
            `() => { const {yield} = {}; };`,
            // `() => { const {yield = 0} = {}; };`,
        ];

        for (const test of [...yieldInParameters, ...yieldInBody]) {

            // Script context.
            it(`"use strict"; ${test}`, () => {
                t.throws(() => {
                    parse(`"use strict"; ${test}`, undefined, Context.Empty);
                });
            });

            // Function context.
            it(`"use strict"; function f() { ${test} }`, () => {
                t.throws(() => {
                    parse(`"use strict"; function f() { ${test} }`, undefined, Context.Empty);
                });
            });

            // Generator
            it(`"use strict"; function* g() { ${test} }`, () => {
                t.throws(() => {
                    parse(`"use strict"; function* g() { ${test} }`, undefined, Context.Empty);
                });
            });
        }

        // Generator context.
        for (const test of yieldInParameters) {
            it(`function* g() { ${test} }`, () => {
                t.throws(() => {
                    parse(`function* g() { ${test} }`, undefined, Context.Empty);
                });
            });
        }

        for (const arg of ['(function * yield() { })']) {
            it(`function not_gen() { ${arg}}`, () => {
                t.throws(() => {
                    parse(`function a() { ${arg}}`, undefined, Context.Empty);
                });
            });
        }

        fail('function* g() { yield = 1; }', Context.Empty, {
            source: 'function* g() { yield = 1; }',
        });

        fail('function *a(){yield\n*a}', Context.Empty, {
            source: 'function *a(){yield\n*a}',
        });

        fail('function *a(){yield*}', Context.Empty, {
            source: 'function *a(){yield*}',
        });

        fail('"use strict"; +yield;', Context.Empty, {
            source: '"use strict"; +yield;',
        });

        fail('"use strict"; var [yield] = 0;', Context.Empty, {
            source: '"use strict"; var [yield] = 0;',
        });

        fail('"use strict"; yield:0;', Context.Empty, {
            source: '"use strict"; yield:0;',
        });

        fail('"use strict"; function a(a=yield){}}', Context.Empty, {
            source: '"use strict"; function a(a=yield){}}',
        });

        fail('"use strict"; function a(yield){}}', Context.Empty, {
            source: '"use strict"; function a(yield){}}',
        });

        fail('"use strict"; function a([yield]){}', Context.Empty, {
            source: '"use strict"; function a([yield]){}',
        });

        // Esprima issue: https://github.com/jquery/esprima/issues/1904
        //fail('function *a() { ({b = yield}) => {} }', Context.Empty, {
            // source: 'function *a() { ({b = yield}) => {} }',
        //});

        // fail('"use strict"; function a({yield}){}', Context.Empty, {
           //  source: '"use strict"; function a({yield}){}',
        // });

        // fail('"use strict"; function a({yield=0}){}', Context.Empty, {
           //  source: '"use strict"; function a({yield=0}){}',
        // });

        fail('"use strict"; function a({a:yield}){}', Context.Empty, {
            source: '"use strict"; function a({a:yield}){}',
        });

        fail('"use strict"; function a([yield,...a]){}', Context.Empty, {
            source: '"use strict"; function a([yield,...a]){}',
        });

        fail('function* g(){ (a = yield) => 0; }', Context.Empty, {
                    source: 'function* g(){ (a = yield) => 0; }',
                });

        fail('function* g(){ (a = yield b) => 0; }', Context.Empty, {
                    source: 'function* g(){ (a = yield b) => 0; }',
                });

        fail('function* g(){ !function*(a = yield){} }', Context.Empty, {
            source: 'function* g(){ !function*(a = yield){} }',
        });

         //fail('function* g(){ !function*(a = x + f(yield)){} }', Context.Empty, {
          //source: 'function* g(){ !function*(a = x + f(yield)){} }',
         //});

         //fail('function* g(){ !function*({a = yield}){} }', Context.Empty, {
          //source: 'function* g(){ !function*({a = yield}){} }',
         //});
    });

    describe('Pass', () => {

        const validSyntax = [
            `function* f() {
                let result;
                while (1) {
                    result = yield result;
                }
            }`,
            `function* g() {
                yield arguments[0];
                yield arguments[1];
                yield arguments[2];
                yield arguments[3];
              }`,
              `function * foo() { var v = { [yield]: foo } }`,
              '(function not_gen() { ({ get yield() { 1 } }) })',
              '(function * gen() { (function not_gen() { try { } catch (yield) { } }) })',
              'function *a(){yield 0}',
              'function * gen() { yield a; }',
              'function * gen() { yield * \n a; }',
              'function * gen() { yield yield a; }',
              'function * gen() { (yield * a) + (yield * b);; }',
              'function * gen() { yield * a; return }',
              'function * gen() { yield, yield }',
              'function * gen() { (yield) ? yield : yield }',
              'function * gen() { yield /* comment */ }',
              'function * gen() { (yield) \n ? yield : yield }',
              'x = class extends (a) {}',
              'function * gen() { (yield) }',
              'function *a(){yield null}',
              'function *a(){yield+0}',
              'function *a(){yield "a"}',
              'function *a(){yield delete 0}',
              'function *a(){yield typeof 0}',
              'function *a(){yield 2e308}',
              'function*a(){yield*a}',
              'function a(){yield*a}',
              'function *a(){({get b(){yield}})}',
              'function a(){({*[yield](){}})}',
              'function *a(){({*[yield](){}})}',
              'function *a(){({set b(yield){}})}',
              'function *a(){yield delete 0}',
              `yield: 34`,
              'function yield(yield) { yield: yield (yield + yield(0)); }',
              '({ get yield() { 1 } })',
              `yield[100]`,
              'try { } catch (yield) { }',
              'var foo = yield = 1;',
              'function foo(bar, yield) { }',
              'yield = 1;',
              '++yield;',
              'function *a(){yield ++a;}',
              'function * gen() { yield * 2; }',
              'function * gen() { (yield * 3) + (yield * 4); }',
              'function * gen() { ({ yield: 1 }) }',
              '(function * () { x = class extends (yield) {} });',
              '(function * () { x = class extends (a ? null : yield) { } });',
              '(function * () { yield * 1; return 37; yield * "icefapper"; });',
              '(function * () { ({ [yield]: x } = { }) });',
              'function* g(){ x ? yield : y }',
              'function *g() { yield ~x }',
              'function *g() { yield class x {} }',
              'function *g() { yield --x }',
              'function *g() { yield !x }',
              'function *g() { yield void x }',
              'try {} catch (yield) {}',
              '({ yield() {} })',
              '"use strict"; ({ yield() {} })',
              'function *g() { yield yield }',
              'function* g() {  yield* [1, 2, 3]; }',
              'function* g() { exprValue = yield * {}; }',
              'function* g() { yield* "abc"; }',
              `function* g() {
                try {
                  yield * {};
                } catch (err) {
                  caught = err;
                }
              }`,
              `function* g1() { (yield 1) }`,
              `function* g2() { [yield 1] }`,
              `function* g3() { {yield 1} }`,
              `function* g4() { yield 1, yield 2; }`,
              `function* g5() { (yield 1) ? yield 2 : yield 3; }`,
              `function* g(a, b, c, d) {
                arguments[0] = 32;
                arguments[1] = 54;
                arguments[2] = 333;
                yield a;
                yield b;
                yield c;
                yield d;
              }`
        ];

        for (const arg of validSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });
        }

        // Acorn issue: https://github.com/acornjs/acorn/issues/552
        pass(`function *f1() {
            function g() {
              return yield / 1;
            }
          }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function *f1() {
                function g() {
                  return yield / 1;
                }
              }`,
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
                                    type: 'FunctionDeclaration',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'Identifier',
                                                        name: 'yield',
                                                        start: 73,
                                                        end: 78,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 25
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 30
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: 'Literal',
                                                        value: 1,
                                                        start: 81,
                                                        end: 82,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 33
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 34
                                                            }
                                                        },
                                                        raw: '1'
                                                    },
                                                    operator: '/',
                                                    start: 73,
                                                    end: 82,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                start: 66,
                                                end: 83,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 35
                                                    }
                                                }
                                            }
                                        ],
                                        start: 46,
                                        end: 101,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 29
                                            },
                                            end: {
                                                line: 4,
                                                column: 17
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'g',
                                        start: 42,
                                        end: 43,
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
                                    start: 33,
                                    end: 101,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 4,
                                            column: 17
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 117,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 5,
                                    column: 15
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f1',
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
                        start: 0,
                        end: 117,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 5,
                                column: 15
                            }
                        }
                    }
                ],
                start: 0,
                end: 117,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 5,
                        column: 15
                    }
                }
            }
        });

        pass(`function *f3() {
            ({
              g() {
                return yield / 1;
              }
            })
          }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `function *f3() {
                ({
                  g() {
                    return yield / 1;
                  }
                })
              }`,
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
                                                    name: 'g',
                                                    start: 54,
                                                    end: 55,
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
                                                value: {
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
                                                                        type: 'Identifier',
                                                                        name: 'yield',
                                                                        start: 87,
                                                                        end: 92,
                                                                        loc: {
                                                                            start: {
                                                                                line: 4,
                                                                                column: 27
                                                                            },
                                                                            end: {
                                                                                line: 4,
                                                                                column: 32
                                                                            }
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: 'Literal',
                                                                        value: 1,
                                                                        start: 95,
                                                                        end: 96,
                                                                        loc: {
                                                                            start: {
                                                                                line: 4,
                                                                                column: 35
                                                                            },
                                                                            end: {
                                                                                line: 4,
                                                                                column: 36
                                                                            }
                                                                        },
                                                                        raw: '1'
                                                                    },
                                                                    operator: '/',
                                                                    start: 87,
                                                                    end: 96,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 27
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 36
                                                                        }
                                                                    }
                                                                },
                                                                start: 80,
                                                                end: 97,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 20
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 37
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 58,
                                                        end: 117,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 22
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 19
                                                            }
                                                        }
                                                    },
                                                    async: false,
                                                    generator: false,
                                                    expression: false,
                                                    id: null,
                                                    start: 55,
                                                    end: 117,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 19
                                                        },
                                                        end: {
                                                            line: 5,
                                                            column: 19
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: true,
                                                shorthand: false,
                                                start: 54,
                                                end: 117,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 19
                                                    }
                                                }
                                            }
                                        ],
                                        start: 34,
                                        end: 135,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 17
                                            },
                                            end: {
                                                line: 6,
                                                column: 17
                                            }
                                        }
                                    },
                                    start: 33,
                                    end: 136,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 6,
                                            column: 18
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 152,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 7,
                                    column: 15
                                }
                            }
                        },
                        async: false,
                        generator: true,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f3',
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
                        start: 0,
                        end: 152,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 7,
                                column: 15
                            }
                        }
                    }
                ],
                start: 0,
                end: 152,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 7,
                        column: 15
                    }
                }
            }
        });
    });
});
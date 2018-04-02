import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Expressions - Async Arrows', () => {

    describe('Failure', () => {

        const invalidSyntax = [
            'async({ foo33 = 1 })',
            //"async() => await"
            'async() => ((async(x = await 1) => x)();',
            'async().foo13 () => 1',
            'async().foo10 => 1',
            //"async(...a, b) => b",
            //"[async(x,y) => z]",
            //"[async x => z]"
            'async({x = yield}) => 1; ',
            'var f = async() => ((async(x = await 1) => x)();',
            //"async(...a = b) => b",
            'async(...a,) => b',
            'async(...a, b) => b',
            'async(await) => b',
            'async(foo, await) => b',
            'async(yield) => b',
            'async(foo, yield) => b',
            //"async (...x = []) => {}",
            'async (...a,) => {}',
            'async(await) => {  }',
            'async (...a,) => {}',
            'async() => { await: ; };',
            'async() => { void await; };',
            'async() => { var await; };',
            `async
            (foo) => { }`,
            `async
            (a) => await a`,
            `async (a)
            => await a`,
          /*  `async ()
            => 0`,*/
            `async a
            => await a`
        ];

        for (const arg of invalidSyntax) {

            it(`${arg};`, () => {
                t.throws(() => {
                    parse(`${arg};`, undefined, Context.Empty);
                });
            });

            it(`(${arg};)`, () => {
                t.throws(() => {
                    parse(`(${arg});`, undefined, Context.Empty);
                });
            });
        }

    });

    describe('Pass', () => {

        const validSyntax = [
            '() => {}',
            '() => { return 42 }',
            'x => { return x; }',
            '(x) => { return x; }',
            '(x, y) => { return x + y; }',
            '(x, y, z) => { return x + y + z; }',
            '(x, y) => { x.a = y; }',
            'async (...x = []) => {}',
            '() => 42',
            'id = async x => x, square = async (y) => { y * y }',
           // "f(a, async b => await b)",
            'async (x, y) => { x * y }',
            'async (x, y) => y',
            'async a => { await a }',
            'async (y) => y',
            'async (x, ...y) => x',
            'async (x,y,) => x',
            //"async ({a = b}) => a",
            'async a => a',
            'async function foo(a = async () => await b) {}',
            '({async: 1})',
            //"async yield => 1",
            'f(a, async (b, c) => await [b, c], d)',
            'f(a, async (b, c) => await [b, c], d)',
        ];

        for (const arg of validSyntax) {

            it(`${arg};`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg};`, undefined, Context.Empty);
                });
            });
        }

        pass('export default async x => x * x', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.Module, {
            source: 'export default async x => x * x',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ExportDefaultDeclaration',
                        declaration: {
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BinaryExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                right: {
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
                                operator: '*',
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
                            },
                            params: [
                                {
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
                                }
                            ],
                            id: null,
                            async: true,
                            generator: false,
                            expression: true,
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

        pass('async () =>{};', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async () =>{};',
            expected: {
                type: 'Program',
                sourceType: 'script',
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
                            params: [],
                            id: null,
                            async: true,
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

        pass('async ()', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async ()',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'async',
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
                            arguments: [],
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
                    }
                ],
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

        pass('async a => b;', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: 'async a => b;',
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
                            params: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
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
                                }
                            ],
                            id: null,
                            async: true,
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
});
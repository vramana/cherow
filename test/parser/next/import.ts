import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Declarations - Import', () => {

    describe('Failure', () => {

        const validSyntax = [
            'import(',
            'import)',
            //"import()",
            'import(\'x',
            'import(\'x\']',
            'import[\'x\')',
            'import = x',
            'import[',
            'import[]',
            'import]',
            //"import[x]",
            'import{',
            'import{x',
            'import{x}',
            //"import(x, y)",
            //"import(...y)",
            //"import(x,)",
            'import(,)',
            'import(,y)',
            'import(;)',
            //"[import]",
            //"{import}",
            'import+',
            'import = 1',
            'import.wat',
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });

            it(`${arg}`, () => {
                t.throws(() => {
                    parse(`${arg}`, undefined, Context.OptionsNext);
                });
            });

            it(`new ${arg}`, () => {
                t.throws(() => {
                    parse(`new ${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }

        fail('var import.meta', Context.Empty, {
            source: 'var import.meta',
        });

        fail('var import.meta', Context.Module, {
            source: 'var import.meta',
        });

        fail('([import.meta] = [1])', Context.Empty, {
            source: '([import.meta] = [1])',
        });

        fail('([import.meta] = [1])', Context.Module, {
            source: '([import.meta] = [1])',
        });

        fail('for (var import.meta of [1]) {}', Context.Empty, {
            source: 'for (var import.meta of [1]) {}',
        });
    });

    describe('Pass', () => {

        const validSyntax = [
            'import(1)',
            'import(y=x)',
            'f(...[import(y=x)])',
            'x = {[import(y=x)]: 1}',
            'var {[import(y=x)]: x} = {}',
            '({[import(y=x)]: x} = {})',
            //"async () => { await import(x) }",
            '() => { import(x) }',
            '(import(y=x))',
            '{import(y=x)}',
            'import(import(x))',
            'x = import(x)',
            'var x = import(x)',
            'let x = import(x)',
            'for(x of import(x)) {}',
            'import(x).then()',
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }
        pass('for(x of import(x)) {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'for(x of import(x)) {}',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ForOfStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [],
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
                            }
                        },
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Import',
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
                            arguments: [
                                {
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
                                }
                            ],
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
                        await: false,
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

        pass('(import(y=x)))', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: '(import(y=x))',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Import',
                                start: 1,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                }
                            },
                            arguments: [
                                {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'y',
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
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                }
                            ],
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

        pass('var {[import(y=x)]: x} = {}', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext, {
            source: 'var {[import(y=x)]: x} = {}',
            expected: {
                type: 'Program',
                sourceType: 'script',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'ObjectExpression',
                                    properties: [],
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
                                id: {
                                    type: 'ObjectPattern',
                                    properties: [
                                        {
                                            type: 'Property',
                                            kind: 'init',
                                            key: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Import',
                                                    start: 6,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 6
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'AssignmentExpression',
                                                        left: {
                                                            type: 'Identifier',
                                                            name: 'y',
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
                                                        operator: '=',
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
                                            computed: true,
                                            value: {
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
                                            method: false,
                                            shorthand: false,
                                            start: 5,
                                            end: 21,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 5
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 21
                                                }
                                            }
                                        }
                                    ],
                                    start: 4,
                                    end: 22,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 22
                                        }
                                    }
                                },
                                start: 4,
                                end: 27,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 27
                                    }
                                }
                            }
                        ],
                        kind: 'var',
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
                ],
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
    });
});
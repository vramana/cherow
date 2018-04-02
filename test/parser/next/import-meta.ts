import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser';

describe('Declarations - Import meta', () => {

    describe('Failure', () => {

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
            'import.meta',
            '() => { import.meta }',
            '() => import.meta',
            'if (1) { import.meta }',
            'if (1) {} else { import.meta }',
            'while (0) { import.meta }',
            'do { import.meta } while (0)',
            'import.meta.url',
            'import.meta[0]',
            'import.meta.couldBeMutable = true',
            'import.meta()',
            'new import.meta.MagicClass',
            'new import.meta',
            't = [...import.meta]',
            'f = {...import.meta}',
            'delete import.meta',
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.OptionsNext | Context.Module);
                });
            });
        }
        pass('delete import.meta', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'delete import.meta',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'UnaryExpression',
                            operator: 'delete',
                            argument: {
                                meta: {
                                    type: 'Identifier',
                                    name: 'import',
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
                                    }
                                },
                                type: 'MetaProperty',
                                property: {
                                    type: 'Identifier',
                                    name: 'meta',
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
                                start: 7,
                                end: 18,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 18
                                    }
                                }
                            },
                            prefix: true,
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

        pass('do { import.meta } while (0)', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'do { import.meta } while (0)',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'DoWhileStatement',
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        meta: {
                                            type: 'Identifier',
                                            name: 'import',
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
                                        type: 'MetaProperty',
                                        property: {
                                            type: 'Identifier',
                                            name: 'meta',
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
                                        start: 5,
                                        end: 16,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 5
                                            },
                                            end: {
                                                line: 1,
                                                column: 16
                                            }
                                        }
                                    },
                                    start: 5,
                                    end: 16,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 16
                                        }
                                    }
                                }
                            ],
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
                        },
                        test: {
                            type: 'Literal',
                            value: 0,
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
                            raw: '0'
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
                    }
                ],
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

        pass('if (1) { import.meta }', Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw | Context.OptionsNext | Context.Module, {
            source: 'if (1) { import.meta }',
            expected: {
                type: 'Program',
                sourceType: 'module',
                body: [
                    {
                        type: 'IfStatement',
                        test: {
                            type: 'Literal',
                            value: 1,
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
                            raw: '1'
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
                                            name: 'import',
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
                                        type: 'MetaProperty',
                                        property: {
                                            type: 'Identifier',
                                            name: 'meta',
                                            start: 16,
                                            end: 20,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 16
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 20
                                                }
                                            }
                                        },
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
                                }
                            ],
                            start: 7,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
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
    });
});
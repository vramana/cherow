import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - While', () => {

    describe('Failure', () => {

        fail('while (false) function f() {}', Context.Empty, {
            source: 'while (false) function f() {}',
        });

        fail('while (false) function* g() {}', Context.Empty, {
            source: 'while (false) function* g() {}',
        });

        fail('while (false) class C {}', Context.Empty, {
            source: 'while (false) class C {}',
        });

        fail('while (false) async function f() {}', Context.Empty, {
            source: 'while (false) async function f() {}',
        });

        fail('while 1 break;', Context.Empty, {
            source: 'while 1 break;',
        });

        fail('while 0 break;', Context.Empty, {
            source: 'while 0 break;',
        });

        fail('while true break;', Context.Empty, {
            source: 'while true break;',
        });

        fail('while "hood" break;', Context.Empty, {
            source: 'while "hood" break;',
        });

        fail('while ( false ) Label: continue Label;', Context.OptionsNext, {
            source: 'while ( false ) Label: continue Label;',
        });

        fail(`while({1}){
            break ;
         };`, Context.Empty, {
            source: `while({1}){
                break ;
             };`,
        });

        fail(`while '' break;`, Context.Empty, {
            source: `while '' break;`,
        });

        fail(`while() {}`, Context.Empty, {
            source: `while() {}`,
        });
    });

    describe('Pass', () => {

        pass(`while (x < 10) { x++; y--; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while (x < 10) { x++; y--; }`,
            expected: {
                type: 'Program',
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
                },
                body: [{
                    type: 'WhileStatement',
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
                    },
                    test: {
                        type: 'BinaryExpression',
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
                        left: {
                            type: 'Identifier',
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
                            name: 'x'
                        },
                        operator: '<',
                        right: {
                            type: 'Literal',
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
                            },
                            value: 10,
                            raw: '10'
                        }
                    },
                    body: {
                        type: 'BlockStatement',
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
                        },
                        body: [{
                                type: 'ExpressionStatement',
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
                                expression: {
                                    type: 'UpdateExpression',
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
                                    operator: '++',
                                    prefix: false,
                                    argument: {
                                        type: 'Identifier',
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
                                        name: 'x'
                                    }
                                }
                            },
                            {
                                type: 'ExpressionStatement',
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
                                expression: {
                                    type: 'UpdateExpression',
                                    start: 22,
                                    end: 25,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 22
                                        },
                                        end: {
                                            line: 1,
                                            column: 25
                                        }
                                    },
                                    operator: '--',
                                    prefix: false,
                                    argument: {
                                        type: 'Identifier',
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
                                        name: 'y'
                                    }
                                }
                            }
                        ]
                    }
                }],
                sourceType: 'script'
            }

        });

        pass(`while(1);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
            source: `while(1);`,
            expected: {
                type: 'Program',
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                },
                body: [{
                    type: 'WhileStatement',
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    },
                    test: {
                        type: 'Literal',
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
                        value: 1,
                        raw: '1'
                    },
                    body: {
                        type: 'EmptyStatement',
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
                    }
                }],
                sourceType: 'script'
            }
        });
    });
});
import { pass, fail } from '../utils';

describe('Miscellaneous - Block scope', () => {

        describe('Redeclaration global', () => {

            pass(`function declaration`, {
                source: 'function f() {}',
                loc: true,
                ranges: true,
                raw: true,
                expected: {
                    type: 'Program',
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
                    },
                    body: [{
                        type: 'FunctionDeclaration',
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
                            name: 'f'
                        },
                        generator: false,
                        expression: false,
                        async: false,
                        params: [],
                        body: {
                            type: 'BlockStatement',
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
                            },
                            body: []
                        }
                    }],
                    sourceType: 'script'
                }
            });

            pass(`redeclared function declaration with var`, {
                source: 'function f() {} var f;',
                loc: true,
                ranges: true,
                raw: true,
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
                                name: 'f'
                            },
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
                            body: {
                                type: 'BlockStatement',
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
                                },
                                body: []
                            }
                        },
                        {
                            type: 'VariableDeclaration',
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
                            },
                            declarations: [{
                                type: 'VariableDeclarator',
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
                                },
                                id: {
                                    type: 'Identifier',
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
                                    },
                                    name: 'f'
                                },
                                init: null
                            }],
                            kind: 'var'
                        }
                    ],
                    sourceType: 'script'
                }
            });

            pass(`var with function declaration`, {
                source: 'var f; function f() {}',
                loc: true,
                ranges: true,
                raw: true,
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
                            type: 'VariableDeclaration',
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
                            },
                            declarations: [{
                                type: 'VariableDeclarator',
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
                                id: {
                                    type: 'Identifier',
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
                                    name: 'f'
                                },
                                init: null
                            }],
                            kind: 'var'
                        },
                        {
                            type: 'FunctionDeclaration',
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
                            },
                            id: {
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
                                name: 'f'
                            },
                            generator: false,
                            expression: false,
                            async: false,
                            params: [],
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
                        }
                    ],
                    sourceType: 'script'
                }
            });
        });
        describe('Redeclaration', () => {

            fail(`attempt to redeclare let binding with var`, {
                source: `{ function f() {} function f() {} }`,
                message: 'Duplicate binding f',
                line: 1,
                column: 27,
                index: 28
            });

            fail(`attempt to redeclare let binding with var`, {
                source: `{ let f; var f; }`,
                message: '\'f\' has already been declared ',
                line: 1,
                column: 13,
                index: 14
            });

            fail(`redeclaration with const-LexicalDeclaration`, {
                source: `{ function f() {} const f = 0; }`,
                message: '\'f\' has already been declared ',
                line: 1,
                column: 24,
                index: 25
            });

            fail(`redeclaration with VariableDeclaration`, {
                source: `{ let f; var f; }`,
                message: '\'f\' has already been declared ',
                line: 1,
                column: 13,
                index: 14
            });

            fail(`redeclaration with VariableDeclaration`, {
                source: `{ var f; function f() {} } }`,
                message: 'Duplicate binding f',
                line: 1,
                column: 18,
                index: 19
            });

            fail(`redeclaration with LexicalDeclaration`, {
                source: `{ var f; let f; }`,
                message: '\'f\' has already been declared ',
                line: 1,
                column: 13,
                index: 14
            });

            fail(`redeclaration with FunctionDeclaration (GeneratorDeclaration in BlockStatement)`, {
                source: `{ function* f() {} function f() {} }`,
                message: 'Duplicate binding f',
                line: 1,
                column: 28,
                index: 29
            });

            fail(`redeclaration with LexicdddalDeclaration`, {
                 source: `{ var f; function f() {} }`,
                 message: 'Duplicate binding f',
                 line: 1,
                 column: 18,
                 index: 19
            });

            fail(`redeclaration with LexicdddalDeclaration`, {
                source: `{ function f() {}; function f() {} }`,
            });

            fail(`redeclaration with GeneratorDeclaration (VariableDeclaration in BlockStatement)`, {
                 source: `{ var f; function* f() {} }`,
             });

            fail(`redeclaration with AsyncFunctionDeclaration (LexicalDeclaration (let) in BlockStatement)`, {
                source: `{ let f; async function f() {} }`,
            });

            fail(`redeclaration with AsyncGeneratorDeclaration (LexicalDeclaration (let) in BlockStatement)`, {
                source: `{ let f; async function* f() {} }`,
            });

            fail(`redeclaration with FunctionDeclaration (LexicalDeclaration (let) in BlockStatement)`, {
                source: `{ let f; function f() {} }`,
            });

            fail(`redeclaration with GeneratorDeclaration (LexicalDeclaration (let) in BlockStatement)`, {
                source: `{ let f; function* f() {} }`,
            });

            fail(`redeclaration with VariableDeclaration (GeneratorDeclaration in BlockStatement)`, {
                source: `{ function* f() {} var f; }`
            });
    
            fail(`redeclaration with let-LexicalDeclaration (GeneratorDeclaration in BlockStatement)`, {
                source: `{ function* f() {} let f; }`,
            });

            fail(`redeclaration with GeneratorDeclaration (GeneratorDeclaration in BlockStatement)`, {
                source: `{ function* f() {} function* f() {} }`,
            });

            fail(`redeclaration with const-LexicalDeclaration (GeneratorDeclaration in BlockStatement)`, {
                source: `{ function* f() {} const f = 0; }`,
            });

            fail(`redeclaration with AsyncFunctionDeclaration (GeneratorDeclaration in BlockStatement)`, {
                source: `{ function* f() {} async function f() {} }`,
            });

            //fail(`redeclaration with VariableDeclaration (FunctionDeclaration in BlockStatement)`, {
              //  source: `{ function f() {} var f; }`,
            //});

            fail(`redeclaration with AsyncGeneratorDeclaration (FunctionDeclaration in BlockStatement)`, {
                source: `{ function f() {} async function* f() {} }`,
            });

            fail(`redeclaration with AsyncGeneratorDeclaration (LexicalDeclaration (const) in BlockStatement)`, {
                source: `{ const f = 0; async function* f() {} }`,
            });

            fail(`redeclaration with VariableDeclaration (AsyncGeneratorDeclaration in BlockStatement)`, {
                 source: `{ async function* f() {} var f; }`,
             });

            fail(`redeclaration with let-LexicalDeclaration (AsyncGeneratorDeclaration in BlockStatement)`, {
                source: `{ async function* f() {} let f; }`,
            });

            fail(`redeclaration with VariableDeclaration (AsyncFunctionDeclaration in BlockStatement)`, {
                source: `{ async function f() {} var f; }`,
            });

            fail(`redeclaration with const-LexicalDeclaration (AsyncFunctionDeclaration in BlockStatement)`, {
                source: `{ async function f() {} const f = 0; }`,
            });
        });
    });
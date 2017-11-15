import {  n,  fail, pass } from '../utils/test-utils';

describe('Annex B', () => {

    describe('B.3.4', () => {
        fail('for(;;) function a(){}', 'for(;;) function a(){}');
        fail('for(a in b) function c(){}', 'for(a in b) function c(){}');
        fail('for(a of b) function c(){}', 'for(a of b) function c(){}');
        fail('while(true) function a(){}', 'while(true) function a(){}');
        fail('with(true) function a(){}', 'with(true) function a(){}');
    });

    describe('B.3.5', () => {

    fail('try { throw null; } catch (f) { { function f() { return 123; } } }', 'try { throw null; } catch (f) { { function f() { return 123; } } }');
    fail('var foo; try {} catch (_) { let foo; }', 'var foo; try {} catch (_) { let foo; }');
    fail('try {} catch (foo) { let foo; }', 'try {} catch (foo) { let foo; }');
    fail('try {} catch (foo) { { let foo; } }', 'try {} catch (foo) { { let foo; } }');
    fail('try { } catch (x) { let x; }', 'try { } catch (x) { let x; }');
    fail('try {} catch (foo) { function foo() {} }', 'try {} catch (foo) { function foo() {} }');
    fail('let foo; try {} catch (foo) {} let foo;', 'let foo; try {} catch (foo) {} let foo;');
    fail('try {} catch(e) { let e; }', 'try {} catch(e) { let e; }');
    fail('"try {} catch(e) { function e(){} }"', 'try {} catch(e) { function e(){} }');

    pass('parse try {} catch (foo) { var foo; }', 'try {} catch (foo) { var foo; }', {
        type: 'Program',
        body: [
            {
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
                        name: 'foo',
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
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                declarations: [
                                    {
                                        type: 'VariableDeclarator',
                                        init: null,
                                        id: {
                                            type: 'Identifier',
                                            name: 'foo',
                                            start: 25,
                                            end: 28,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 25
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 28
                                                }
                                            }
                                        },
                                        start: 25,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 25
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    }
                                ],
                                kind: 'var',
                                start: 21,
                                end: 29,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 29
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 31,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 31
                            }
                        }
                    },
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
                finalizer: null,
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
        sourceType: 'script',
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
    });

    pass('try {} catch (foo) { try {} catch (_) { var foo; } }', 'try {} catch (foo) { try {} catch (_) { var foo; } }', {
        type: 'Program',
        body: [
            {
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
                        name: 'foo',
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
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'TryStatement',
                                block: {
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
                                handler: {
                                    type: 'CatchClause',
                                    param: {
                                        type: 'Identifier',
                                        name: '_',
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
                                        }
                                    },
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        init: null,
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'foo',
                                                            start: 44,
                                                            end: 47,
                                                            loc: {
                                                                start: {
                                                                    line: 1,
                                                                    column: 44
                                                                },
                                                                end: {
                                                                    line: 1,
                                                                    column: 47
                                                                }
                                                            }
                                                        },
                                                        start: 44,
                                                        end: 47,
                                                        loc: {
                                                            start: {
                                                                line: 1,
                                                                column: 44
                                                            },
                                                            end: {
                                                                line: 1,
                                                                column: 47
                                                            }
                                                        }
                                                    }
                                                ],
                                                kind: 'var',
                                                start: 40,
                                                end: 48,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 40
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 48
                                                    }
                                                }
                                            }
                                        ],
                                        start: 38,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 38
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    },
                                    start: 28,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 28
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                finalizer: null,
                                start: 21,
                                end: 50,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 50
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 52,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 52
                            }
                        }
                    },
                    start: 7,
                    end: 52,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 52
                        }
                    }
                },
                finalizer: null,
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
        ],
        sourceType: 'script',
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
    });
    
    pass('try {} catch (a) { if(1) function a(){} }', 'try {} catch (a) { if(1) function a(){} }', {
        type: 'Program',
        body: [
            {
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
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'IfStatement',
                                test: {
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
                                        name: 'a',
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
                            }
                        ],
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
            }
        ],
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
    });
    
    pass('try {} catch (foo) { for (var foo = 1;;); }', 'try {} catch (foo) { for (var foo = 1;;); }', {
        type: 'Program',
        body: [
            {
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
                        name: 'foo',
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
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ForStatement',
                                body: {
                                    type: 'EmptyStatement',
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
                                init: {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            init: {
                                                type: 'Literal',
                                                value: 1,
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
                                                },
                                                raw: '1'
                                            },
                                            id: {
                                                type: 'Identifier',
                                                name: 'foo',
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
                                            },
                                            start: 30,
                                            end: 37,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 37
                                                }
                                            }
                                        }
                                    ],
                                    kind: 'var',
                                    start: 26,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                test: null,
                                update: null,
                                start: 21,
                                end: 41,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 41
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 43,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 43
                            }
                        }
                    },
                    start: 7,
                    end: 43,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 43
                        }
                    }
                },
                finalizer: null,
                start: 0,
                end: 43,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 43
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 43,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 43
            }
        }
    });
    pass('try {} catch (foo) { for (var foo in bar); }', 'try {} catch (foo) { for (var foo in bar); }', {
        type: 'Program',
        body: [
            {
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
                        name: 'foo',
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
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ForInStatement',
                                body: {
                                    type: 'EmptyStatement',
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
                                left: {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            init: null,
                                            id: {
                                                type: 'Identifier',
                                                name: 'foo',
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
                                            },
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
                                    kind: 'var',
                                    start: 26,
                                    end: 33,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 33
                                        }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'bar',
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
                                    }
                                },
                                start: 21,
                                end: 42,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 42
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 44,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 44
                            }
                        }
                    },
                    start: 7,
                    end: 44,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 44
                        }
                    }
                },
                finalizer: null,
                start: 0,
                end: 44,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 44
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 44,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 44
            }
        }
    });
    pass('try {} catch (foo) { for (var [foo] in bar); }', 'try {} catch (foo) { for (var [foo] in bar); }', {
        type: 'Program',
        body: [
            {
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
                        name: 'foo',
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
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ForInStatement',
                                body: {
                                    type: 'EmptyStatement',
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
                                    }
                                },
                                left: {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            init: null,
                                            id: {
                                                type: 'ArrayPattern',
                                                'elements': [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'foo',
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
                                                    }
                                                ],
                                                start: 30,
                                                end: 35,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 35
                                                    }
                                                }
                                            },
                                            start: 30,
                                            end: 35,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 30
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 35
                                                }
                                            }
                                        }
                                    ],
                                    kind: 'var',
                                    start: 26,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 26
                                        },
                                        end: {
                                            line: 1,
                                            column: 35
                                        }
                                    }
                                },
                                right: {
                                    type: 'Identifier',
                                    name: 'bar',
                                    start: 39,
                                    end: 42,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 39
                                        },
                                        end: {
                                            line: 1,
                                            column: 42
                                        }
                                    }
                                },
                                start: 21,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 21
                                    },
                                    end: {
                                        line: 1,
                                        column: 44
                                    }
                                }
                            }
                        ],
                        start: 19,
                        end: 46,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 46
                            }
                        }
                    },
                    start: 7,
                    end: 46,
                    loc: {
                        start: {
                            line: 1,
                            column: 7
                        },
                        end: {
                            line: 1,
                            column: 46
                        }
                    }
                },
                finalizer: null,
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
    });

    pass('"use strict"; let foo = function foo() {}', '"use strict"; let foo = function foo() {}', {
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
                type: 'VariableDeclaration',
                declarations: [
                    {
                        type: 'VariableDeclarator',
                        init: {
                            type: 'FunctionExpression',
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
                                name: 'foo',
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
                            start: 24,
                            end: 41,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 24
                                },
                                end: {
                                    line: 1,
                                    column: 41
                                }
                            }
                        },
                        id: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 18,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        },
                        start: 18,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        }
                    }
                ],
                kind: 'let',
                start: 14,
                end: 41,
                loc: {
                    start: {
                        line: 1,
                        column: 14
                    },
                    end: {
                        line: 1,
                        column: 41
                    }
                }
            }
        ],
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
    });
 });
});
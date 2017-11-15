import { fail, pass } from '../utils/test-utils';

describe('V8 - Do expression', () => {
    
        fail('let foo = [do 3+4, 5+6];', 'let foo = [do 3+4, 5+6];');
    
        pass('should parse conditional', `f(do {1,2});`, {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "CallExpression",
                        callee: {
                            type: "Identifier",
                            name: "f",
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
                        arguments: [
                            {
                                type: "DoExpression",
                                body: {
                                    type: "BlockStatement",
                                    body: [
                                        {
                                            type: "ExpressionStatement",
                                            expression: {
                                                type: "SequenceExpression",
                                                "expressions": [
                                                    {
                                                        type: "Literal",
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
                                                        raw: "1"
                                                    },
                                                    {
                                                        type: "Literal",
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
                                                        raw: "2"
                                                    }
                                                ],
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
                                        }
                                    ],
                                    start: 5,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
                                start: 2,
                                end: 10,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 10
                                    }
                                }
                            }
                        ],
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
                }
            ],
            sourceType: "script",
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
        });
    
        pass('should parse conditional', `let x = do {
                if (foo()) { f() }
                else if (bar()) { g() }
                else { h() }
              };`, {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                init: {
                                    type: "DoExpression",
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "IfStatement",
                                                test: {
                                                    type: "CallExpression",
                                                    callee: {
                                                        type: "Identifier",
                                                        name: "foo",
                                                        start: 33,
                                                        end: 36,
                                                        loc: {
                                                            start: {
                                                                line: 2,
                                                                column: 20
                                                            },
                                                            end: {
                                                                line: 2,
                                                                column: 23
                                                            }
                                                        }
                                                    },
                                                    arguments: [],
                                                    start: 33,
                                                    end: 38,
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
                                                alternate: {
                                                    type: "IfStatement",
                                                    test: {
                                                        type: "CallExpression",
                                                        callee: {
                                                            type: "Identifier",
                                                            name: "bar",
                                                            start: 73,
                                                            end: 76,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 25
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 28
                                                                }
                                                            }
                                                        },
                                                        arguments: [],
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
                                                    alternate: {
                                                        type: "BlockStatement",
                                                        body: [
                                                            {
                                                                type: "ExpressionStatement",
                                                                expression: {
                                                                    type: "CallExpression",
                                                                    callee: {
                                                                        type: "Identifier",
                                                                        name: "h",
                                                                        start: 111,
                                                                        end: 112,
                                                                        loc: {
                                                                            start: {
                                                                                line: 4,
                                                                                column: 23
                                                                            },
                                                                            end: {
                                                                                line: 4,
                                                                                column: 24
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [],
                                                                    start: 111,
                                                                    end: 114,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 23
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 26
                                                                        }
                                                                    }
                                                                },
                                                                start: 111,
                                                                end: 114,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 23
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 26
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 109,
                                                        end: 116,
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
                                                    consequent: {
                                                        type: "BlockStatement",
                                                        body: [
                                                            {
                                                                type: "ExpressionStatement",
                                                                expression: {
                                                                    type: "CallExpression",
                                                                    callee: {
                                                                        type: "Identifier",
                                                                        name: "g",
                                                                        start: 82,
                                                                        end: 83,
                                                                        loc: {
                                                                            start: {
                                                                                line: 3,
                                                                                column: 34
                                                                            },
                                                                            end: {
                                                                                line: 3,
                                                                                column: 35
                                                                            }
                                                                        }
                                                                    },
                                                                    arguments: [],
                                                                    start: 82,
                                                                    end: 85,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 34
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 37
                                                                        }
                                                                    }
                                                                },
                                                                start: 82,
                                                                end: 85,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 34
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 37
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 80,
                                                        end: 87,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 32
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 39
                                                            }
                                                        }
                                                    },
                                                    start: 69,
                                                    end: 116,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 4,
                                                            column: 28
                                                        }
                                                    }
                                                },
                                                consequent: {
                                                    type: "BlockStatement",
                                                    body: [
                                                        {
                                                            type: "ExpressionStatement",
                                                            expression: {
                                                                type: "CallExpression",
                                                                callee: {
                                                                    type: "Identifier",
                                                                    name: "f",
                                                                    start: 42,
                                                                    end: 43,
                                                                    loc: {
                                                                        start: {
                                                                            line: 2,
                                                                            column: 29
                                                                        },
                                                                        end: {
                                                                            line: 2,
                                                                            column: 30
                                                                        }
                                                                    }
                                                                },
                                                                arguments: [],
                                                                start: 42,
                                                                end: 45,
                                                                loc: {
                                                                    start: {
                                                                        line: 2,
                                                                        column: 29
                                                                    },
                                                                    end: {
                                                                        line: 2,
                                                                        column: 32
                                                                    }
                                                                }
                                                            },
                                                            start: 42,
                                                            end: 45,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 29
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 32
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 40,
                                                    end: 47,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 34
                                                        }
                                                    }
                                                },
                                                start: 29,
                                                end: 116,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 4,
                                                        column: 28
                                                    }
                                                }
                                            }
                                        ],
                                        start: 11,
                                        end: 132,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 5,
                                                column: 15
                                            }
                                        }
                                    },
                                    start: 8,
                                    end: 132,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 5,
                                            column: 15
                                        }
                                    }
                                },
                                id: {
                                    type: "Identifier",
                                    name: "x",
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
                                end: 132,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 5,
                                        column: 15
                                    }
                                }
                            }
                        ],
                        kind: "let",
                        start: 0,
                        end: 133,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 5,
                                column: 16
                            }
                        }
                    }
                ],
                sourceType: "script",
                start: 0,
                end: 133,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 5,
                        column: 16
                    }
                }
            });
    
        pass('should parse scoping variable', `let x = do {
                let tmp = f();
                tmp * tmp + 1
              };`, {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                init: {
                                    type: "DoExpression",
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "VariableDeclaration",
                                                declarations: [
                                                    {
                                                        type: "VariableDeclarator",
                                                        init: {
                                                            type: "CallExpression",
                                                            callee: {
                                                                type: "Identifier",
                                                                name: "f",
                                                                start: 39,
                                                                end: 40,
                                                                loc: {
                                                                    start: {
                                                                        line: 2,
                                                                        column: 26
                                                                    },
                                                                    end: {
                                                                        line: 2,
                                                                        column: 27
                                                                    }
                                                                }
                                                            },
                                                            arguments: [],
                                                            start: 39,
                                                            end: 42,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 26
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 29
                                                                }
                                                            }
                                                        },
                                                        id: {
                                                            type: "Identifier",
                                                            name: "tmp",
                                                            start: 33,
                                                            end: 36,
                                                            loc: {
                                                                start: {
                                                                    line: 2,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 2,
                                                                    column: 23
                                                                }
                                                            }
                                                        },
                                                        start: 33,
                                                        end: 42,
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
                                                kind: "let",
                                                start: 29,
                                                end: 43,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 30
                                                    }
                                                }
                                            },
                                            {
                                                type: "ExpressionStatement",
                                                expression: {
                                                    type: "BinaryExpression",
                                                    "left": {
                                                        type: "BinaryExpression",
                                                        "left": {
                                                            type: "Identifier",
                                                            name: "tmp",
                                                            start: 60,
                                                            end: 63,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 19
                                                                }
                                                            }
                                                        },
                                                        right: {
                                                            type: "Identifier",
                                                            name: "tmp",
                                                            start: 66,
                                                            end: 69,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 22
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 25
                                                                }
                                                            }
                                                        },
                                                        operator: "*",
                                                        start: 60,
                                                        end: 69,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 16
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 25
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: "Literal",
                                                        value: 1,
                                                        start: 72,
                                                        end: 73,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 28
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 29
                                                            }
                                                        },
                                                        raw: "1"
                                                    },
                                                    operator: "+",
                                                    start: 60,
                                                    end: 73,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 16
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 29
                                                        }
                                                    }
                                                },
                                                start: 60,
                                                end: 73,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 16
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 29
                                                    }
                                                }
                                            }
                                        ],
                                        start: 11,
                                        end: 89,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 11
                                            },
                                            end: {
                                                line: 4,
                                                column: 15
                                            }
                                        }
                                    },
                                    start: 8,
                                    end: 89,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 4,
                                            column: 15
                                        }
                                    }
                                },
                                id: {
                                    type: "Identifier",
                                    name: "x",
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
                                end: 89,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 4,
                                        column: 15
                                    }
                                }
                            }
                        ],
                        kind: "let",
                        start: 0,
                        end: 90,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 4,
                                column: 16
                            }
                        }
                    }
                ],
                sourceType: "script",
                start: 0,
                end: 90,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 16
                    }
                }
            });
    
        pass('should parse complex', `let x = 100;
            let y = 20;
            
            let a = do {
              if(x > 10) {
                if(y > 20) {
                  'big x, big y';
                } else {
                  'big x, small y';
                }
              } else {
                if(y > 10) {
                  'small x, big y';
                } else {
                  'small x, small y';
                }
              }
            };`, {
                type: "Program",
                body: [
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                init: {
                                    type: "Literal",
                                    value: 100,
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
                                    },
                                    raw: "100"
                                },
                                id: {
                                    type: "Identifier",
                                    name: "x",
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
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            }
                        ],
                        kind: "let",
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
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                init: {
                                    type: "Literal",
                                    value: 20,
                                    start: 33,
                                    end: 35,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 20
                                        },
                                        end: {
                                            line: 2,
                                            column: 22
                                        }
                                    },
                                    raw: "20"
                                },
                                id: {
                                    type: "Identifier",
                                    name: "y",
                                    start: 29,
                                    end: 30,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 2,
                                            column: 17
                                        }
                                    }
                                },
                                start: 29,
                                end: 35,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 16
                                    },
                                    end: {
                                        line: 2,
                                        column: 22
                                    }
                                }
                            }
                        ],
                        kind: "let",
                        start: 25,
                        end: 36,
                        loc: {
                            start: {
                                line: 2,
                                column: 12
                            },
                            end: {
                                line: 2,
                                column: 23
                            }
                        }
                    },
                    {
                        type: "VariableDeclaration",
                        declarations: [
                            {
                                type: "VariableDeclarator",
                                init: {
                                    type: "DoExpression",
                                    body: {
                                        type: "BlockStatement",
                                        body: [
                                            {
                                                type: "IfStatement",
                                                test: {
                                                    type: "BinaryExpression",
                                                    "left": {
                                                        type: "Identifier",
                                                        name: "x",
                                                        start: 92,
                                                        end: 93,
                                                        loc: {
                                                            start: {
                                                                line: 5,
                                                                column: 17
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 18
                                                            }
                                                        }
                                                    },
                                                    right: {
                                                        type: "Literal",
                                                        value: 10,
                                                        start: 96,
                                                        end: 98,
                                                        loc: {
                                                            start: {
                                                                line: 5,
                                                                column: 21
                                                            },
                                                            end: {
                                                                line: 5,
                                                                column: 23
                                                            }
                                                        },
                                                        raw: "10"
                                                    },
                                                    operator: ">",
                                                    start: 92,
                                                    end: 98,
                                                    loc: {
                                                        start: {
                                                            line: 5,
                                                            column: 17
                                                        },
                                                        end: {
                                                            line: 5,
                                                            column: 23
                                                        }
                                                    }
                                                },
                                                alternate: {
                                                    type: "BlockStatement",
                                                    body: [
                                                        {
                                                            type: "IfStatement",
                                                            test: {
                                                                type: "BinaryExpression",
                                                                "left": {
                                                                    type: "Identifier",
                                                                    name: "y",
                                                                    start: 286,
                                                                    end: 287,
                                                                    loc: {
                                                                        start: {
                                                                            line: 12,
                                                                            column: 19
                                                                        },
                                                                        end: {
                                                                            line: 12,
                                                                            column: 20
                                                                        }
                                                                    }
                                                                },
                                                                right: {
                                                                    type: "Literal",
                                                                    value: 10,
                                                                    start: 290,
                                                                    end: 292,
                                                                    loc: {
                                                                        start: {
                                                                            line: 12,
                                                                            column: 23
                                                                        },
                                                                        end: {
                                                                            line: 12,
                                                                            column: 25
                                                                        }
                                                                    },
                                                                    raw: "10"
                                                                },
                                                                operator: ">",
                                                                start: 286,
                                                                end: 292,
                                                                loc: {
                                                                    start: {
                                                                        line: 12,
                                                                        column: 19
                                                                    },
                                                                    end: {
                                                                        line: 12,
                                                                        column: 25
                                                                    }
                                                                }
                                                            },
                                                            alternate: {
                                                                type: "BlockStatement",
                                                                body: [
                                                                    {
                                                                        type: "ExpressionStatement",
                                                                        expression: {
                                                                            type: "Literal",
                                                                            value: "small x, small y",
                                                                            start: 375,
                                                                            end: 393,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 15,
                                                                                    column: 18
                                                                                },
                                                                                end: {
                                                                                    line: 15,
                                                                                    column: 36
                                                                                }
                                                                            },
                                                                            raw: "'small x, small y'"
                                                                        },
                                                                        start: 375,
                                                                        end: 394,
                                                                        loc: {
                                                                            start: {
                                                                                line: 15,
                                                                                column: 18
                                                                            },
                                                                            end: {
                                                                                line: 15,
                                                                                column: 37
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 355,
                                                                end: 412,
                                                                loc: {
                                                                    start: {
                                                                        line: 14,
                                                                        column: 23
                                                                    },
                                                                    end: {
                                                                        line: 16,
                                                                        column: 17
                                                                    }
                                                                }
                                                            },
                                                            consequent: {
                                                                type: "BlockStatement",
                                                                body: [
                                                                    {
                                                                        type: "ExpressionStatement",
                                                                        expression: {
                                                                            type: "Literal",
                                                                            value: "small x, big y",
                                                                            start: 314,
                                                                            end: 330,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 13,
                                                                                    column: 18
                                                                                },
                                                                                end: {
                                                                                    line: 13,
                                                                                    column: 34
                                                                                }
                                                                            },
                                                                            raw: "'small x, big y'"
                                                                        },
                                                                        start: 314,
                                                                        end: 331,
                                                                        loc: {
                                                                            start: {
                                                                                line: 13,
                                                                                column: 18
                                                                            },
                                                                            end: {
                                                                                line: 13,
                                                                                column: 35
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 294,
                                                                end: 349,
                                                                loc: {
                                                                    start: {
                                                                        line: 12,
                                                                        column: 27
                                                                    },
                                                                    end: {
                                                                        line: 14,
                                                                        column: 17
                                                                    }
                                                                }
                                                            },
                                                            start: 283,
                                                            end: 412,
                                                            loc: {
                                                                start: {
                                                                    line: 12,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 16,
                                                                    column: 17
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 265,
                                                    end: 428,
                                                    loc: {
                                                        start: {
                                                            line: 11,
                                                            column: 21
                                                        },
                                                        end: {
                                                            line: 17,
                                                            column: 15
                                                        }
                                                    }
                                                },
                                                consequent: {
                                                    type: "BlockStatement",
                                                    body: [
                                                        {
                                                            type: "IfStatement",
                                                            test: {
                                                                type: "BinaryExpression",
                                                                "left": {
                                                                    type: "Identifier",
                                                                    name: "y",
                                                                    start: 121,
                                                                    end: 122,
                                                                    loc: {
                                                                        start: {
                                                                            line: 6,
                                                                            column: 19
                                                                        },
                                                                        end: {
                                                                            line: 6,
                                                                            column: 20
                                                                        }
                                                                    }
                                                                },
                                                                right: {
                                                                    type: "Literal",
                                                                    value: 20,
                                                                    start: 125,
                                                                    end: 127,
                                                                    loc: {
                                                                        start: {
                                                                            line: 6,
                                                                            column: 23
                                                                        },
                                                                        end: {
                                                                            line: 6,
                                                                            column: 25
                                                                        }
                                                                    },
                                                                    raw: "20"
                                                                },
                                                                operator: ">",
                                                                start: 121,
                                                                end: 127,
                                                                loc: {
                                                                    start: {
                                                                        line: 6,
                                                                        column: 19
                                                                    },
                                                                    end: {
                                                                        line: 6,
                                                                        column: 25
                                                                    }
                                                                }
                                                            },
                                                            alternate: {
                                                                type: "BlockStatement",
                                                                body: [
                                                                    {
                                                                        type: "ExpressionStatement",
                                                                        expression: {
                                                                            type: "Literal",
                                                                            value: "big x, small y",
                                                                            start: 208,
                                                                            end: 224,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 9,
                                                                                    column: 18
                                                                                },
                                                                                end: {
                                                                                    line: 9,
                                                                                    column: 34
                                                                                }
                                                                            },
                                                                            raw: "'big x, small y'"
                                                                        },
                                                                        start: 208,
                                                                        end: 225,
                                                                        loc: {
                                                                            start: {
                                                                                line: 9,
                                                                                column: 18
                                                                            },
                                                                            end: {
                                                                                line: 9,
                                                                                column: 35
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 188,
                                                                end: 243,
                                                                loc: {
                                                                    start: {
                                                                        line: 8,
                                                                        column: 23
                                                                    },
                                                                    end: {
                                                                        line: 10,
                                                                        column: 17
                                                                    }
                                                                }
                                                            },
                                                            consequent: {
                                                                type: "BlockStatement",
                                                                body: [
                                                                    {
                                                                        type: "ExpressionStatement",
                                                                        expression: {
                                                                            type: "Literal",
                                                                            value: "big x, big y",
                                                                            start: 149,
                                                                            end: 163,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 7,
                                                                                    column: 18
                                                                                },
                                                                                end: {
                                                                                    line: 7,
                                                                                    column: 32
                                                                                }
                                                                            },
                                                                            raw: "'big x, big y'"
                                                                        },
                                                                        start: 149,
                                                                        end: 164,
                                                                        loc: {
                                                                            start: {
                                                                                line: 7,
                                                                                column: 18
                                                                            },
                                                                            end: {
                                                                                line: 7,
                                                                                column: 33
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 129,
                                                                end: 182,
                                                                loc: {
                                                                    start: {
                                                                        line: 6,
                                                                        column: 27
                                                                    },
                                                                    end: {
                                                                        line: 8,
                                                                        column: 17
                                                                    }
                                                                }
                                                            },
                                                            start: 118,
                                                            end: 243,
                                                            loc: {
                                                                start: {
                                                                    line: 6,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 10,
                                                                    column: 17
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 100,
                                                    end: 259,
                                                    loc: {
                                                        start: {
                                                            line: 5,
                                                            column: 25
                                                        },
                                                        end: {
                                                            line: 11,
                                                            column: 15
                                                        }
                                                    }
                                                },
                                                start: 89,
                                                end: 428,
                                                loc: {
                                                    start: {
                                                        line: 5,
                                                        column: 14
                                                    },
                                                    end: {
                                                        line: 17,
                                                        column: 15
                                                    }
                                                }
                                            }
                                        ],
                                        start: 73,
                                        end: 442,
                                        loc: {
                                            start: {
                                                line: 4,
                                                column: 23
                                            },
                                            end: {
                                                line: 18,
                                                column: 13
                                            }
                                        }
                                    },
                                    start: 70,
                                    end: 442,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 20
                                        },
                                        end: {
                                            line: 18,
                                            column: 13
                                        }
                                    }
                                },
                                id: {
                                    type: "Identifier",
                                    name: "a",
                                    start: 66,
                                    end: 67,
                                    loc: {
                                        start: {
                                            line: 4,
                                            column: 16
                                        },
                                        end: {
                                            line: 4,
                                            column: 17
                                        }
                                    }
                                },
                                start: 66,
                                end: 442,
                                loc: {
                                    start: {
                                        line: 4,
                                        column: 16
                                    },
                                    end: {
                                        line: 18,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        kind: "let",
                        start: 62,
                        end: 443,
                        loc: {
                            start: {
                                line: 4,
                                column: 12
                            },
                            end: {
                                line: 18,
                                column: 14
                            }
                        }
                    }
                ],
                sourceType: "script",
                start: 0,
                end: 443,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 18,
                        column: 14
                    }
                }
            });
    
        pass('should parse with JSX', `function foo() {
                return (
                  <nav>
                    <Home />
                    {
                      do {
                        if (loggedIn) {
                          <LogoutButton />
                        } else {
                          <LoginButton />
                        }
                      }
                    }
                  </nav>
                );
              }`, {
                type: "Program",
                body: [
                    {
                        type: "FunctionDeclaration",
                        params: [],
                        body: {
                            type: "BlockStatement",
                            body: [
                                {
                                    type: "ReturnStatement",
                                    "argument": {
                                        type: "JSXElement",
                                        "children": [
                                            {
                                                type: "JSXText",
                                                value: "\n                    ",
                                                start: 65,
                                                end: 86,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 22
                                                    }
                                                },
                                                raw: "\n                    "
                                            },
                                            {
                                                type: "JSXElement",
                                                "children": [],
                                                "openingElement": {
                                                    type: "JSXOpeningElement",
                                                    name: {
                                                        type: "JSXIdentifier",
                                                        name: "Home",
                                                        start: 87,
                                                        end: 91,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 45
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 49
                                                            }
                                                        }
                                                    },
                                                    "attributes": [],
                                                    "selfClosing": true,
                                                    start: 86,
                                                    end: 94,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 51
                                                        }
                                                    }
                                                },
                                                "closingElement": null,
                                                start: 86,
                                                end: 94,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 22
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 51
                                                    }
                                                }
                                            },
                                            {
                                                type: "JSXText",
                                                value: "\n                    ",
                                                start: 94,
                                                end: 115,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 51
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 51
                                                    }
                                                },
                                                raw: "\n                    "
                                            },
                                            {
                                                type: "JSXExpressionContainer",
                                                expression: {
                                                    type: "DoExpression",
                                                    body: {
                                                        type: "BlockStatement",
                                                        body: [
                                                            {
                                                                type: "IfStatement",
                                                                test: {
                                                                    type: "Identifier",
                                                                    name: "loggedIn",
                                                                    start: 172,
                                                                    end: 180,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 28
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 36
                                                                        }
                                                                    }
                                                                },
                                                                alternate: {
                                                                    type: "BlockStatement",
                                                                    body: [
                                                                        {
                                                                            type: "ExpressionStatement",
                                                                            expression: {
                                                                                type: "JSXElement",
                                                                                "children": [],
                                                                                "openingElement": {
                                                                                    type: "JSXOpeningElement",
                                                                                    name: {
                                                                                        type: "JSXIdentifier",
                                                                                        name: "LoginButton",
                                                                                        start: 287,
                                                                                        end: 298,
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 8,
                                                                                                column: 27
                                                                                            },
                                                                                            end: {
                                                                                                line: 8,
                                                                                                column: 38
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    "attributes": [],
                                                                                    "selfClosing": true,
                                                                                    start: 286,
                                                                                    end: 301,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 8,
                                                                                            column: 26
                                                                                        },
                                                                                        end: {
                                                                                            line: 8,
                                                                                            column: 41
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "closingElement": null,
                                                                                start: 286,
                                                                                end: 301,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 8,
                                                                                        column: 26
                                                                                    },
                                                                                    end: {
                                                                                        line: 8,
                                                                                        column: 41
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 286,
                                                                            end: 301,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 8,
                                                                                    column: 26
                                                                                },
                                                                                end: {
                                                                                    line: 8,
                                                                                    column: 41
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    start: 258,
                                                                    end: 327,
                                                                    loc: {
                                                                        start: {
                                                                            line: 7,
                                                                            column: 31
                                                                        },
                                                                        end: {
                                                                            line: 9,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                consequent: {
                                                                    type: "BlockStatement",
                                                                    body: [
                                                                        {
                                                                            type: "ExpressionStatement",
                                                                            expression: {
                                                                                type: "JSXElement",
                                                                                "children": [],
                                                                                "openingElement": {
                                                                                    type: "JSXOpeningElement",
                                                                                    name: {
                                                                                        type: "JSXIdentifier",
                                                                                        name: "LogoutButton",
                                                                                        start: 211,
                                                                                        end: 223,
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 6,
                                                                                                column: 27
                                                                                            },
                                                                                            end: {
                                                                                                line: 6,
                                                                                                column: 39
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    "attributes": [],
                                                                                    "selfClosing": true,
                                                                                    start: 210,
                                                                                    end: 226,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 6,
                                                                                            column: 26
                                                                                        },
                                                                                        end: {
                                                                                            line: 6,
                                                                                            column: 42
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "closingElement": null,
                                                                                start: 210,
                                                                                end: 226,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 6,
                                                                                        column: 26
                                                                                    },
                                                                                    end: {
                                                                                        line: 6,
                                                                                        column: 42
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 210,
                                                                            end: 226,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 6,
                                                                                    column: 26
                                                                                },
                                                                                end: {
                                                                                    line: 6,
                                                                                    column: 42
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    start: 182,
                                                                    end: 252,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 38
                                                                        },
                                                                        end: {
                                                                            line: 7,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                start: 168,
                                                                end: 327,
                                                                loc: {
                                                                    start: {
                                                                        line: 5,
                                                                        column: 24
                                                                    },
                                                                    end: {
                                                                        line: 9,
                                                                        column: 25
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        start: 142,
                                                        end: 351,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 25
                                                            },
                                                            end: {
                                                                line: 10,
                                                                column: 23
                                                            }
                                                        }
                                                    },
                                                    start: 139,
                                                    end: 351,
                                                    loc: {
                                                        start: {
                                                            line: 4,
                                                            column: 22
                                                        },
                                                        end: {
                                                            line: 10,
                                                            column: 23
                                                        }
                                                    }
                                                },
                                                start: 115,
                                                end: 373,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 51
                                                    },
                                                    end: {
                                                        line: 10,
                                                        column: 23
                                                    }
                                                }
                                            },
                                            {
                                                type: "JSXText",
                                                value: "\n                  ",
                                                start: 373,
                                                end: 392,
                                                loc: {
                                                    start: {
                                                        line: 11,
                                                        column: 20
                                                    },
                                                    end: {
                                                        line: 10,
                                                        column: 23
                                                    }
                                                },
                                                raw: "\n                  "
                                            }
                                        ],
                                        "openingElement": {
                                            type: "JSXOpeningElement",
                                            name: {
                                                type: "JSXIdentifier",
                                                name: "nav",
                                                start: 61,
                                                end: 64,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 22
                                                    }
                                                }
                                            },
                                            "attributes": [],
                                            "selfClosing": false,
                                            start: 60,
                                            end: 65,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 3,
                                                    column: 22
                                                }
                                            }
                                        },
                                        "closingElement": {
                                            type: "JSXClosingElement",
                                            name: {
                                                type: "JSXIdentifier",
                                                name: "nav",
                                                start: 394,
                                                end: 397,
                                                loc: {
                                                    start: {
                                                        line: 11,
                                                        column: 42
                                                    },
                                                    end: {
                                                        line: 11,
                                                        column: 45
                                                    }
                                                }
                                            },
                                            start: 392,
                                            end: 398,
                                            loc: {
                                                start: {
                                                    line: 11,
                                                    column: 20
                                                },
                                                end: {
                                                    line: 11,
                                                    column: 46
                                                }
                                            }
                                        },
                                        start: 60,
                                        end: 398,
                                        loc: {
                                            start: {
                                                line: 3,
                                                column: 18
                                            },
                                            end: {
                                                line: 11,
                                                column: 46
                                            }
                                        }
                                    },
                                    start: 33,
                                    end: 417,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 16
                                        },
                                        end: {
                                            line: 12,
                                            column: 18
                                        }
                                    }
                                }
                            ],
                            start: 15,
                            end: 433,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 13,
                                    column: 15
                                }
                            }
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: "Identifier",
                            name: "foo",
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
                        end: 433,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 13,
                                column: 15
                            }
                        }
                    }
                ],
                sourceType: "script",
                start: 0,
                end: 433,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 13,
                        column: 15
                    }
                }
            });
    
        pass('should parse complex JSX', `const Component = props =>
            <div className='myComponent'>
              {do {
                if(color === 'blue') { <BlueComponent/>; }
                else if(color === 'red') { <RedComponent/>; }
                else if(color === 'green') { <GreenComponent/>; }
              }}
            </div>
          ;`, {
            type: "Program",
            body: [
                {
                    type: "VariableDeclaration",
                    declarations: [
                        {
                            type: "VariableDeclarator",
                            init: {
                                type: "ArrowFunctionExpression",
                                body: {
                                    type: "JSXElement",
                                    "children": [
                                        {
                                            type: "JSXText",
                                            value: "\n              ",
                                            start: 68,
                                            end: 83,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 40
                                                }
                                            },
                                            raw: "\n              "
                                        },
                                        {
                                            type: "JSXExpressionContainer",
                                            expression: {
                                                type: "DoExpression",
                                                body: {
                                                    type: "BlockStatement",
                                                    body: [
                                                        {
                                                            type: "IfStatement",
                                                            test: {
                                                                type: "BinaryExpression",
                                                                "left": {
                                                                    type: "Identifier",
                                                                    name: "color",
                                                                    start: 108,
                                                                    end: 113,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 19
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 24
                                                                        }
                                                                    }
                                                                },
                                                                right: {
                                                                    type: "Literal",
                                                                    value: "blue",
                                                                    start: 118,
                                                                    end: 124,
                                                                    loc: {
                                                                        start: {
                                                                            line: 3,
                                                                            column: 29
                                                                        },
                                                                        end: {
                                                                            line: 3,
                                                                            column: 35
                                                                        }
                                                                    },
                                                                    raw: "'blue'"
                                                                },
                                                                operator: "===",
                                                                start: 108,
                                                                end: 124,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 19
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 35
                                                                    }
                                                                }
                                                            },
                                                            alternate: {
                                                                type: "IfStatement",
                                                                test: {
                                                                    type: "BinaryExpression",
                                                                    "left": {
                                                                        type: "Identifier",
                                                                        name: "color",
                                                                        start: 172,
                                                                        end: 177,
                                                                        loc: {
                                                                            start: {
                                                                                line: 4,
                                                                                column: 24
                                                                            },
                                                                            end: {
                                                                                line: 4,
                                                                                column: 29
                                                                            }
                                                                        }
                                                                    },
                                                                    right: {
                                                                        type: "Literal",
                                                                        value: "red",
                                                                        start: 182,
                                                                        end: 187,
                                                                        loc: {
                                                                            start: {
                                                                                line: 4,
                                                                                column: 34
                                                                            },
                                                                            end: {
                                                                                line: 4,
                                                                                column: 39
                                                                            }
                                                                        },
                                                                        raw: "'red'"
                                                                    },
                                                                    operator: "===",
                                                                    start: 172,
                                                                    end: 187,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 24
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 39
                                                                        }
                                                                    }
                                                                },
                                                                alternate: {
                                                                    type: "IfStatement",
                                                                    test: {
                                                                        type: "BinaryExpression",
                                                                        "left": {
                                                                            type: "Identifier",
                                                                            name: "color",
                                                                            start: 234,
                                                                            end: 239,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 5,
                                                                                    column: 24
                                                                                },
                                                                                end: {
                                                                                    line: 5,
                                                                                    column: 29
                                                                                }
                                                                            }
                                                                        },
                                                                        right: {
                                                                            type: "Literal",
                                                                            value: "green",
                                                                            start: 244,
                                                                            end: 251,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 5,
                                                                                    column: 34
                                                                                },
                                                                                end: {
                                                                                    line: 5,
                                                                                    column: 41
                                                                                }
                                                                            },
                                                                            raw: "'green'"
                                                                        },
                                                                        operator: "===",
                                                                        start: 234,
                                                                        end: 251,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 24
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 41
                                                                            }
                                                                        }
                                                                    },
                                                                    alternate: null,
                                                                    consequent: {
                                                                        type: "BlockStatement",
                                                                        body: [
                                                                            {
                                                                                type: "ExpressionStatement",
                                                                                expression: {
                                                                                    type: "JSXElement",
                                                                                    "children": [],
                                                                                    "openingElement": {
                                                                                        type: "JSXOpeningElement",
                                                                                        name: {
                                                                                            type: "JSXIdentifier",
                                                                                            name: "GreenComponent",
                                                                                            start: 256,
                                                                                            end: 270,
                                                                                            loc: {
                                                                                                start: {
                                                                                                    line: 5,
                                                                                                    column: 46
                                                                                                },
                                                                                                end: {
                                                                                                    line: 5,
                                                                                                    column: 60
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        "attributes": [],
                                                                                        "selfClosing": true,
                                                                                        start: 255,
                                                                                        end: 272,
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 5,
                                                                                                column: 45
                                                                                            },
                                                                                            end: {
                                                                                                line: 5,
                                                                                                column: 62
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    "closingElement": null,
                                                                                    start: 255,
                                                                                    end: 272,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 5,
                                                                                            column: 45
                                                                                        },
                                                                                        end: {
                                                                                            line: 5,
                                                                                            column: 62
                                                                                        }
                                                                                    }
                                                                                },
                                                                                start: 255,
                                                                                end: 273,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 5,
                                                                                        column: 45
                                                                                    },
                                                                                    end: {
                                                                                        line: 5,
                                                                                        column: 63
                                                                                    }
                                                                                }
                                                                            }
                                                                        ],
                                                                        start: 253,
                                                                        end: 275,
                                                                        loc: {
                                                                            start: {
                                                                                line: 5,
                                                                                column: 43
                                                                            },
                                                                            end: {
                                                                                line: 5,
                                                                                column: 65
                                                                            }
                                                                        }
                                                                    },
                                                                    start: 231,
                                                                    end: 275,
                                                                    loc: {
                                                                        start: {
                                                                            line: 5,
                                                                            column: 21
                                                                        },
                                                                        end: {
                                                                            line: 5,
                                                                            column: 65
                                                                        }
                                                                    }
                                                                },
                                                                consequent: {
                                                                    type: "BlockStatement",
                                                                    body: [
                                                                        {
                                                                            type: "ExpressionStatement",
                                                                            expression: {
                                                                                type: "JSXElement",
                                                                                "children": [],
                                                                                "openingElement": {
                                                                                    type: "JSXOpeningElement",
                                                                                    name: {
                                                                                        type: "JSXIdentifier",
                                                                                        name: "RedComponent",
                                                                                        start: 192,
                                                                                        end: 204,
                                                                                        loc: {
                                                                                            start: {
                                                                                                line: 4,
                                                                                                column: 44
                                                                                            },
                                                                                            end: {
                                                                                                line: 4,
                                                                                                column: 56
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    "attributes": [],
                                                                                    "selfClosing": true,
                                                                                    start: 191,
                                                                                    end: 206,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 4,
                                                                                            column: 43
                                                                                        },
                                                                                        end: {
                                                                                            line: 4,
                                                                                            column: 58
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "closingElement": null,
                                                                                start: 191,
                                                                                end: 206,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 4,
                                                                                        column: 43
                                                                                    },
                                                                                    end: {
                                                                                        line: 4,
                                                                                        column: 58
                                                                                    }
                                                                                }
                                                                            },
                                                                            start: 191,
                                                                            end: 207,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 4,
                                                                                    column: 43
                                                                                },
                                                                                end: {
                                                                                    line: 4,
                                                                                    column: 59
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    start: 189,
                                                                    end: 209,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 41
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 61
                                                                        }
                                                                    }
                                                                },
                                                                start: 169,
                                                                end: 275,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 21
                                                                    },
                                                                    end: {
                                                                        line: 5,
                                                                        column: 65
                                                                    }
                                                                }
                                                            },
                                                            consequent: {
                                                                type: "BlockStatement",
                                                                body: [
                                                                    {
                                                                        type: "ExpressionStatement",
                                                                        expression: {
                                                                            type: "JSXElement",
                                                                            "children": [],
                                                                            "openingElement": {
                                                                                type: "JSXOpeningElement",
                                                                                name: {
                                                                                    type: "JSXIdentifier",
                                                                                    name: "BlueComponent",
                                                                                    start: 129,
                                                                                    end: 142,
                                                                                    loc: {
                                                                                        start: {
                                                                                            line: 3,
                                                                                            column: 40
                                                                                        },
                                                                                        end: {
                                                                                            line: 3,
                                                                                            column: 53
                                                                                        }
                                                                                    }
                                                                                },
                                                                                "attributes": [],
                                                                                "selfClosing": true,
                                                                                start: 128,
                                                                                end: 144,
                                                                                loc: {
                                                                                    start: {
                                                                                        line: 3,
                                                                                        column: 39
                                                                                    },
                                                                                    end: {
                                                                                        line: 3,
                                                                                        column: 55
                                                                                    }
                                                                                }
                                                                            },
                                                                            "closingElement": null,
                                                                            start: 128,
                                                                            end: 144,
                                                                            loc: {
                                                                                start: {
                                                                                    line: 3,
                                                                                    column: 39
                                                                                },
                                                                                end: {
                                                                                    line: 3,
                                                                                    column: 55
                                                                                }
                                                                            }
                                                                        },
                                                                        start: 128,
                                                                        end: 145,
                                                                        loc: {
                                                                            start: {
                                                                                line: 3,
                                                                                column: 39
                                                                            },
                                                                            end: {
                                                                                line: 3,
                                                                                column: 56
                                                                            }
                                                                        }
                                                                    }
                                                                ],
                                                                start: 126,
                                                                end: 147,
                                                                loc: {
                                                                    start: {
                                                                        line: 3,
                                                                        column: 37
                                                                    },
                                                                    end: {
                                                                        line: 3,
                                                                        column: 58
                                                                    }
                                                                }
                                                            },
                                                            start: 105,
                                                            end: 275,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 16
                                                                },
                                                                end: {
                                                                    line: 5,
                                                                    column: 65
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    start: 87,
                                                    end: 291,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 60
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 15
                                                        }
                                                    }
                                                },
                                                start: 84,
                                                end: 291,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 57
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            start: 83,
                                            end: 292,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 40
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 15
                                                }
                                            }
                                        },
                                        {
                                            type: "JSXText",
                                            value: "\n            ",
                                            start: 292,
                                            end: 305,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 15
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 15
                                                }
                                            },
                                            raw: "\n            "
                                        }
                                    ],
                                    "openingElement": {
                                        type: "JSXOpeningElement",
                                        name: {
                                            type: "JSXIdentifier",
                                            name: "div",
                                            start: 40,
                                            end: 43,
                                            loc: {
                                                start: {
                                                    line: 2,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 2,
                                                    column: 16
                                                }
                                            }
                                        },
                                        "attributes": [
                                            {
                                                type: "JSXAttribute",
                                                value: {
                                                    type: "Literal",
                                                    value: "myComponent",
                                                    start: 54,
                                                    end: 67,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 27
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 40
                                                        }
                                                    },
                                                    raw: "'myComponent'"
                                                },
                                                name: {
                                                    type: "JSXIdentifier",
                                                    name: "className",
                                                    start: 44,
                                                    end: 53,
                                                    loc: {
                                                        start: {
                                                            line: 2,
                                                            column: 17
                                                        },
                                                        end: {
                                                            line: 2,
                                                            column: 26
                                                        }
                                                    }
                                                },
                                                start: 44,
                                                end: 67,
                                                loc: {
                                                    start: {
                                                        line: 2,
                                                        column: 17
                                                    },
                                                    end: {
                                                        line: 2,
                                                        column: 40
                                                    }
                                                }
                                            }
                                        ],
                                        "selfClosing": false,
                                        start: 39,
                                        end: 68,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 12
                                            },
                                            end: {
                                                line: 2,
                                                column: 40
                                            }
                                        }
                                    },
                                    "closingElement": {
                                        type: "JSXClosingElement",
                                        name: {
                                            type: "JSXIdentifier",
                                            name: "div",
                                            start: 307,
                                            end: 310,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 31
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 34
                                                }
                                            }
                                        },
                                        start: 305,
                                        end: 311,
                                        loc: {
                                            start: {
                                                line: 6,
                                                column: 15
                                            },
                                            end: {
                                                line: 6,
                                                column: 35
                                            }
                                        }
                                    },
                                    start: 39,
                                    end: 311,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 12
                                        },
                                        end: {
                                            line: 6,
                                            column: 35
                                        }
                                    }
                                },
                                params: [
                                    {
                                        type: "Identifier",
                                        name: "props",
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
                                    }
                                ],
                                id: null,
                                async: false,
                                generator: false,
                                expression: true,
                                start: 18,
                                end: 311,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 18
                                    },
                                    end: {
                                        line: 6,
                                        column: 35
                                    }
                                }
                            },
                            id: {
                                type: "Identifier",
                                name: "Component",
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
                            start: 6,
                            end: 311,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 6,
                                    column: 35
                                }
                            }
                        }
                    ],
                    kind: "const",
                    start: 0,
                    end: 323,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 7,
                            column: 11
                        }
                    }
                }
            ],
            sourceType: "script",
            start: 0,
            end: 323,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 7,
                    column: 11
                }
            }
        });
    });
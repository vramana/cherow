import { pass, fail } from '../utils';

describe('Expressions - New', () => {
 
        pass(`new a(b,c)`, {
            source: 'new a(b,c)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 4,
                                "end": 5,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 5
                                    }
                                }
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 6,
                                    "end": 7,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 6
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
                                        }
                                    }
                                },
                                {
                                    "type": "Identifier",
                                    "name": "c",
                                    "start": 8,
                                    "end": 9,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 9
                                        }
                                    }
                                }
                            ],
                            "start": 0,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "start": 0,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 10,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 10
                    }
                }
            }
        });

        pass(`new Button`, {
            source: 'new Button',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "Button",
                                "start": 4,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            "arguments": [],
                            "start": 0,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "start": 0,
                        "end": 10,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 10,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 10
                    }
                }
            }
        });

        pass(`new Button(a)`, {
            source: 'new Button(a)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "Button",
                                "start": 4,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            "arguments": [
                                {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 11,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                }
                            ],
                            "start": 0,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "start": 0,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 13,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 13
                    }
                }
            }
        });

        pass(`new new foo()`, {
            source: 'new new foo()',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "NewExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "foo",
                                    "start": 8,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                },
                                "arguments": [],
                                "start": 4,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                }
                            },
                            "arguments": [],
                            "start": 0,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "start": 0,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 13,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 13
                    }
                }
            }
        });

        pass(`new f(...a)`, {
            source: 'new f(...a)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "f",
                                "start": 4,
                                "end": 5,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 5
                                    }
                                }
                            },
                            "arguments": [
                                {
                                    "type": "SpreadElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 9,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 9
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 6,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 6
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                }
                            ],
                            "start": 0,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            }
        });

        pass(`new f(...a, ...b)`, {
            source: 'new f(...a, ...b)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "f",
                                "start": 4,
                                "end": 5,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 5
                                    }
                                }
                            },
                            "arguments": [
                                {
                                    "type": "SpreadElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 9,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 9
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 6,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 6
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                },
                                {
                                    "type": "SpreadElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "b",
                                        "start": 15,
                                        "end": 16,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 16
                                            }
                                        }
                                    },
                                    "start": 12,
                                    "end": 16,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 16
                                        }
                                    }
                                }
                            ],
                            "start": 0,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        },
                        "start": 0,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 17,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 17
                    }
                }
            }
        });

        pass(`new(a in b)`, {
            source: 'new(a in b)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 4,
                                    "end": 5,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 4
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 5
                                        }
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 9,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 9
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                },
                                "operator": "in",
                                "start": 4,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            },
                            "arguments": [],
                            "start": 0,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        "start": 0,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            }
        });

        pass(`new f(...a, b, ...c)`, {
            source: 'new f(...a, b, ...c)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "NewExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "f",
                                "start": 4,
                                "end": 5,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 4
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 5
                                    }
                                }
                            },
                            "arguments": [
                                {
                                    "type": "SpreadElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 9,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 9
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 6,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 6
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                },
                                {
                                    "type": "Identifier",
                                    "name": "b",
                                    "start": 12,
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                },
                                {
                                    "type": "SpreadElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "c",
                                        "start": 18,
                                        "end": 19,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 19
                                            }
                                        }
                                    },
                                    "start": 15,
                                    "end": 19,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 19
                                        }
                                    }
                                }
                            ],
                            "start": 0,
                            "end": 20,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 20
                                }
                            }
                        },
                        "start": 0,
                        "end": 20,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 20
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 20,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 20
                    }
                }
            }
        });

        pass(`function f(a = new.target){}`, {
            source: 'function f(a = new.target){}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "FunctionDeclaration",
                        "params": [
                            {
                                "type": "AssignmentPattern",
                                "left": {
                                    "type": "Identifier",
                                    "name": "a",
                                    "start": 11,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                },
                                "right": {
                                    "meta": {
                                        "type": "Identifier",
                                        "name": "new",
                                        "start": 15,
                                        "end": 18,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 18
                                            }
                                        }
                                    },
                                    "type": "MetaProperty",
                                    "property": {
                                        "type": "Identifier",
                                        "name": "target",
                                        "start": 19,
                                        "end": 25,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "start": 15,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    }
                                },
                                "start": 11,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                }
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 26,
                            "end": 28,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 26
                                },
                                "end": {
                                    "line": 1,
                                    "column": 28
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 9,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "start": 0,
                        "end": 28,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 28
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 28,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 28
                    }
                }
            }
        });

        
        pass(`(function f(a = new.target){})`, {
            source: '(function f(a = new.target){})',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "FunctionExpression",
                            "params": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 12,
                                        "end": 13,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "right": {
                                        "meta": {
                                            "type": "Identifier",
                                            "name": "new",
                                            "start": 16,
                                            "end": 19,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 19
                                                }
                                            }
                                        },
                                        "type": "MetaProperty",
                                        "property": {
                                            "type": "Identifier",
                                            "name": "target",
                                            "start": 20,
                                            "end": 26,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 26
                                                }
                                            }
                                        },
                                        "start": 16,
                                        "end": 26,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 26
                                            }
                                        }
                                    },
                                    "start": 12,
                                    "end": 26,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 26
                                        }
                                    }
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [],
                                "start": 27,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 29
                                    }
                                }
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "f",
                                "start": 10,
                                "end": 11,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 11
                                    }
                                }
                            },
                            "start": 1,
                            "end": 29,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 29
                                }
                            }
                        },
                        "start": 0,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 30,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 30
                    }
                }
            }
        });

        
        pass(`function f() { new new.target; }`, {
            source: 'function f() { new new.target; }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "FunctionDeclaration",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "NewExpression",
                                        "callee": {
                                            "meta": {
                                                "type": "Identifier",
                                                "name": "new",
                                                "start": 19,
                                                "end": 22,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 22
                                                    }
                                                }
                                            },
                                            "type": "MetaProperty",
                                            "property": {
                                                "type": "Identifier",
                                                "name": "target",
                                                "start": 23,
                                                "end": 29,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 23
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 29
                                                    }
                                                }
                                            },
                                            "start": 19,
                                            "end": 29,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 29
                                                }
                                            }
                                        },
                                        "arguments": [],
                                        "start": 15,
                                        "end": 29,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        }
                                    },
                                    "start": 15,
                                    "end": 30,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 30
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 32,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 9,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "start": 0,
                        "end": 32,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 32
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 32,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 32
                    }
                }
            }
        });

        
        pass(`function f() { new.target(); }`, {
            source: 'function f() { new.target(); }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "FunctionDeclaration",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "meta": {
                                                "type": "Identifier",
                                                "name": "new",
                                                "start": 15,
                                                "end": 18,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 15
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 18
                                                    }
                                                }
                                            },
                                            "type": "MetaProperty",
                                            "property": {
                                                "type": "Identifier",
                                                "name": "target",
                                                "start": 19,
                                                "end": 25,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 25
                                                    }
                                                }
                                            },
                                            "start": 15,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "arguments": [],
                                        "start": 15,
                                        "end": 27,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 27
                                            }
                                        }
                                    },
                                    "start": 15,
                                    "end": 28,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 28
                                        }
                                    }
                                }
                            ],
                            "start": 13,
                            "end": 30,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 30
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "f",
                            "start": 9,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "start": 0,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 30,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 30
                    }
                }
            }
        });

        
        pass(`function f() { new["target"]; }`, {
            source: 'function f() { new["target"]; }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "start": 0,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "name": "f"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 31,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 29,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 29
                            }
                          },
                          "expression": {
                            "type": "NewExpression",
                            "start": 15,
                            "end": 28,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 28
                              }
                            },
                            "callee": {
                              "type": "ArrayExpression",
                              "start": 18,
                              "end": 28,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 18
                                },
                                "end": {
                                  "line": 1,
                                  "column": 28
                                }
                              },
                              "elements": [
                                {
                                  "type": "Literal",
                                  "start": 19,
                                  "end": 27,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 19
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 27
                                    }
                                  },
                                  "value": "target",
                                  "raw": "\"target\""
                                }
                              ]
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  }
                ],
                "sourceType": "script"
              }
        });

        
        fail(`function f() { new.anythingElse; }`, {
            source: 'function f() { new.anythingElse; }',
            loc: true,
            ranges: true,
            raw: true
        });
        
        fail(`function f() { new..target; }`, {
            source: 'function f() { new..target; }',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`new Type[]`, {
            source: 'new Type[]',
            loc: true,
            ranges: true,
            raw: true
        });        
    });
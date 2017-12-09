import { pass, fail } from '../utils';

describe('Statements - For In', () => {

    pass(`for([{a=0}] in b);`, {
        source: 'for([{a=0}] in b);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "EmptyStatement",
                        "start": 17,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 17
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "left": {
                        "type": "ArrayPattern",
                        "elements": [
                            {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "a",
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
                                        "value": {
                                            "type": "AssignmentPattern",
                                            "left": {
                                                "type": "Identifier",
                                                "name": "a",
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
                                            "right": {
                                                "type": "Literal",
                                                "value": 0,
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
                                                },
                                                "raw": "0"
                                            },
                                            "start": 6,
                                            "end": 9,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 6
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": true,
                                        "start": 6,
                                        "end": 9,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 6
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 9
                                            }
                                        }
                                    }
                                ],
                                "start": 5,
                                "end": 10,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 10
                                    }
                                }
                            }
                        ],
                        "start": 4,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    },
                    "right": {
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
                    "start": 0,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 18,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 18
                }
            }
        }
    });

    pass(`for(let [a=b in c] in null);`, {
        source: 'for(let [a=b in c] in null);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ForInStatement",
                    "body": {
                        "type": "EmptyStatement",
                        "start": 27,
                        "end": 28,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 27
                            },
                            "end": {
                                "line": 1,
                                "column": 28
                            }
                        }
                    },
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": null,
                                "id": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
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
                                            "right": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "b",
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
                                                    "type": "Identifier",
                                                    "name": "c",
                                                    "start": 16,
                                                    "end": 17,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 17
                                                        }
                                                    }
                                                },
                                                "operator": "in",
                                                "start": 11,
                                                "end": 17,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 11
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 17
                                                    }
                                                }
                                            },
                                            "start": 9,
                                            "end": 17,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 9
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 17
                                                }
                                            }
                                        }
                                    ],
                                    "start": 8,
                                    "end": 18,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 18
                                        }
                                    }
                                },
                                "start": 8,
                                "end": 18,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 18
                                    }
                                }
                            }
                        ],
                        "kind": "let",
                        "start": 4,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    },
                    "right": {
                        "type": "Literal",
                        "value": null,
                        "start": 22,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        },
                        "raw": "null"
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
/*
    pass(`for(var a in b, c);`, {
        source: 'for(var a in b, c);',
        loc: true,
        ranges: true,
        raw: true,
        expected: {}
    });*/

        pass(`for(x in list) process(x);`, {
            source: 'for(x in list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "process",
                                    "start": 15,
                                    "end": 22,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 22
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 23,
                                        "end": 24,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 23
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 24
                                            }
                                        }
                                    }
                                ],
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
                            "start": 15,
                            "end": 26,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 15
                                },
                                "end": {
                                    "line": 1,
                                    "column": 26
                                }
                            }
                        },
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                            "name": "list",
                            "start": 9,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            }
                        },
                        "start": 0,
                        "end": 26,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 26
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 26,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 26
                    }
                }
            }
        });

        pass(`for (var x in list) process(x);`, {
            source: 'for (var x in list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "process",
                                    "start": 20,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 28,
                                        "end": 29,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        }
                                    }
                                ],
                                "start": 20,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                }
                            },
                            "start": 20,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                }
                            ],
                            "kind": "var",
                            "start": 5,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "list",
                            "start": 14,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
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
                        }
                    }
                ],
                "sourceType": "script",
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
                }
            }
        });

        pass(`for (let x in list) process(x);`, {
            source: 'for (let x in list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "process",
                                    "start": 20,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 28,
                                        "end": 29,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 29
                                            }
                                        }
                                    }
                                ],
                                "start": 20,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                }
                            },
                            "start": 20,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                }
                            ],
                            "kind": "let",
                            "start": 5,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "list",
                            "start": 14,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
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
                        }
                    }
                ],
                "sourceType": "script",
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
                }
            }
        });

        pass(`for(var a in b);`, {
            source: 'for(var a in b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "a",
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
                                    },
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
                            "kind": "var",
                            "start": 4,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "b",
                            "start": 13,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        "start": 0,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 16,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 16
                    }
                }
            }
        });

        pass(`for(a in b);`, {
            source: 'for(a in b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "start": 0,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            }
        });

        pass(`for(a.b in c);`, {
            source: 'for(a.b in c);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
                            "start": 13,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        "left": {
                            "type": "MemberExpression",
                            "object": {
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
                            "computed": false,
                            "property": {
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
                            "start": 4,
                            "end": 7,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            }
                        },
                        "right": {
                            "type": "Identifier",
                            "name": "c",
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
                        "start": 0,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            }
        });

        pass(`for(let of in of);`, {
            source: 'for(let of in of);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
                            "start": 17,
                            "end": 18,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 17
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "of",
                                        "start": 8,
                                        "end": 10,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 10
                                            }
                                        }
                                    },
                                    "start": 8,
                                    "end": 10,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 10
                                        }
                                    }
                                }
                            ],
                            "kind": "let",
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
                        "right": {
                            "type": "Identifier",
                            "name": "of",
                            "start": 14,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        "start": 0,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 18,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 18
                    }
                }
            }
        });

        pass(`for(a in b);`, {
            source: 'for(a in b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForInStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "start": 0,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            }
        });

        fail(`for(let of 0);`, {
            source: 'for(let of 0);',
        });

        fail(`for (a=12 in e) break;`, {
            source: 'for (a=12 in e) break;',
        });
        
        fail(`for (var a, b in e) break;`, {
            source: 'for (var a, b in e) break;',
        });

        fail(`for (var a = 12 in e) break;`, {
            source: 'for (var a = 12 in e) break;',
        });

        fail(`for (a in b 5`, {
            source: 'for (a in b 5',
        });

        fail(`for (a to e) break;`, {
            source: 'for (a to e) break;',
        });

        fail(`for (a 12 b; 12) break;`, {
            source: 'for (a 12 b; 12) break;',
        });

        fail(`for(let a = 0 in b);`, {
            source: 'for(let a = 0 in b);',
        });

        fail(`for(const a = 0 in b);`, {
            source: 'for(const a = 0 in b);',
        });

        fail(`for(let ? b : c in 0);`, {
            source: 'for(let ? b : c in 0);',
        });

        fail(`for (var {x}=0 in y);`, {
            source: 'for (var {x}=0 in y);',
        });

        fail(`for (var [p]=0 in q);`, {
            source: 'for (var [p]=0 in q);',
        });

        fail(`"use strict"; for (var [p]=1 in q);`, {
            source: '"use strict"; for (var [p]=1 in q);',
        });

        fail(`for(({a}) in 0);`, {
            source: 'for(({a}) in 0);',
        });

        fail(`for(([a]) in 0);`, {
            source: 'for(([a]) in 0);',
        });

        
        fail(`for(([a]) in 0);`, {
            source: 'for(([a]) in 0);',
        });
        

        fail(`for(this of 0);`, {
            source: 'for(this of 0);',
        });

        fail(`for(let.let of 0);`, {
            source: 'for(let.let of 0);',
        }); 
        
});
            
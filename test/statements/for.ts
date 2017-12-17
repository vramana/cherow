import { pass, fail } from '../utils';

describe('Statements - For', () => {
/*
    pass(`for(x, y;;);`, {
        source: `  var c = 1;
        {
          const b = 2;
         var c = 2;
        }
      `,
        loc: true,
        ranges: true,
        raw: true,
        expected: {}
    });*/

        pass(`for(x, y;;);`, {
            source: 'for(x, y;;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
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
                        "init": {
                            "type": "SequenceExpression",
                            "expressions": [
                                {
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
                                {
                                    "type": "Identifier",
                                    "name": "y",
                                    "start": 7,
                                    "end": 8,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 7
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 8
                                        }
                                    }
                                }
                            ],
                            "start": 0,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            }
                        },
                        "test": null,
                        "update": null,
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
    
        pass(`for(x = 0;;);`, {
            source: 'for(x = 0;;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "init": {
                            "type": "AssignmentExpression",
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
                            "operator": "=",
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
                        "test": null,
                        "update": null,
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
    
        pass(`for(var x = 0;;);`, {
            source: 'for(var x = 0;;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
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
                        "test": null,
                        "update": null,
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
    
        pass(`for(let x = 0;;);`, {
            source: 'for(let x = 0;;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "kind": "let",
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
                        "test": null,
                        "update": null,
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
    
        pass(`for(var x = 0, y = 1;;);`, {
            source: 'for(var x = 0, y = 1;;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        },
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                },
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 1,
                                        "start": 19,
                                        "end": 20,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 20
                                            }
                                        },
                                        "raw": "1"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "y",
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
                                    "start": 15,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 4,
                            "end": 20,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 20
                                }
                            }
                        },
                        "test": null,
                        "update": null,
                        "start": 0,
                        "end": 24,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 24
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 24,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 24
                    }
                }
            }
        });
    
        pass(`for(x; x < 0;);`, {
            source: 'for(x; x < 0;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
                            "start": 14,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "init": {
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
                        "test": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 7,
                                "end": 8,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 8
                                    }
                                }
                            },
                            "right": {
                                "type": "Literal",
                                "value": 0,
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
                                },
                                "raw": "0"
                            },
                            "operator": "<",
                            "start": 7,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        },
                        "update": null,
                        "start": 0,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 15,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 15
                    }
                }
            }
        });
    
        pass(`for(x; x < 0; x++);`, {
            source: 'for(x; x < 0; x++);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "init": {
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
                        "test": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 7,
                                "end": 8,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 8
                                    }
                                }
                            },
                            "right": {
                                "type": "Literal",
                                "value": 0,
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
                                },
                                "raw": "0"
                            },
                            "operator": "<",
                            "start": 7,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        },
                        "update": {
                            "type": "UpdateExpression",
                            "argument": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 14,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            },
                            "operator": "++",
                            "prefix": false,
                            "start": 14,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        },
                        "start": 0,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }
        });
    
        pass(`for(x; x < 0; x++) process(x);`, {
            source: 'for(x; x < 0; x++) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "process",
                                    "start": 19,
                                    "end": 26,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 26
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    }
                                ],
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
                            "start": 19,
                            "end": 30,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 19
                                },
                                "end": {
                                    "line": 1,
                                    "column": 30
                                }
                            }
                        },
                        "init": {
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
                        "test": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 7,
                                "end": 8,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 7
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 8
                                    }
                                }
                            },
                            "right": {
                                "type": "Literal",
                                "value": 0,
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
                                },
                                "raw": "0"
                            },
                            "operator": "<",
                            "start": 7,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        },
                        "update": {
                            "type": "UpdateExpression",
                            "argument": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 14,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            },
                            "operator": "++",
                            "prefix": false,
                            "start": 14,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
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
    
        pass(`for(a;b;c);`, {
            source: 'for(a;b;c);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "init": {
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
                        "test": {
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
                        "update": {
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
    
        pass(`for(var a;b;c);`, {
            source: 'for(var a;b;c);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
                            "start": 14,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "init": {
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
                        "test": {
                            "type": "Identifier",
                            "name": "b",
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
                        "update": {
                            "type": "Identifier",
                            "name": "c",
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
                        "start": 0,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 15,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 15
                    }
                }
            }
        });
    
        pass(`for(var a = 0;b;c);`, {
            source: 'for(var a = 0;b;c);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
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
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
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
                        "test": {
                            "type": "Identifier",
                            "name": "b",
                            "start": 14,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "update": {
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
                        "start": 0,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }
        });

        pass(`for(var a = 0;;) { let a; } for(var a = 0;;) { let a; }`, {
            source: `for(var a = 0;;) { let a; }
            for(var a = 0;;) { let a; }`,
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "Identifier",
                                                "name": "a",
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
                                            },
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
                                    "kind": "let",
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
                                }
                            ],
                            "start": 17,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 17
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        },
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
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
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
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
                        "test": null,
                        "update": null,
                        "start": 0,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    },
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "Identifier",
                                                "name": "a",
                                                "start": 63,
                                                "end": 64,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 35
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 36
                                                    }
                                                }
                                            },
                                            "start": 63,
                                            "end": 64,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 35
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 36
                                                }
                                            }
                                        }
                                    ],
                                    "kind": "let",
                                    "start": 59,
                                    "end": 65,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 31
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 37
                                        }
                                    }
                                }
                            ],
                            "start": 57,
                            "end": 67,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 29
                                },
                                "end": {
                                    "line": 2,
                                    "column": 39
                                }
                            }
                        },
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
                                        "start": 52,
                                        "end": 53,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 25
                                            }
                                        },
                                        "raw": "0"
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "a",
                                        "start": 48,
                                        "end": 49,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 21
                                            }
                                        }
                                    },
                                    "start": 48,
                                    "end": 53,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
                            "start": 44,
                            "end": 53,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 16
                                },
                                "end": {
                                    "line": 2,
                                    "column": 25
                                }
                            }
                        },
                        "test": null,
                        "update": null,
                        "start": 40,
                        "end": 67,
                        "loc": {
                            "start": {
                                "line": 2,
                                "column": 12
                            },
                            "end": {
                                "line": 2,
                                "column": 39
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 67,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 2,
                        "column": 39
                    }
                }
            }
        });
    
        pass(`for(var a = 0;;) { let a; }`, {
            source: 'for(var a = 0;;) { let a; }',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": null,
                                            "id": {
                                                "type": "Identifier",
                                                "name": "a",
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
                                            },
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
                                    "kind": "let",
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
                                }
                            ],
                            "start": 17,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 17
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        },
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0,
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
                                        },
                                        "raw": "0"
                                    },
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
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "kind": "var",
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
                        "test": null,
                        "update": null,
                        "start": 0,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 27,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 27
                    }
                }
            }
        });
    
        pass(`for(;b;c);`, {
            source: 'for(;b;c);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
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
                        "init": null,
                        "test": {
                            "type": "Identifier",
                            "name": "b",
                            "start": 5,
                            "end": 6,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 6
                                }
                            }
                        },
                        "update": {
                            "type": "Identifier",
                            "name": "c",
                            "start": 7,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
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
    
        pass(`for(let of;;);`, {
            source: 'for(let of;;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
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
                        "init": {
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
                        "test": null,
                        "update": null,
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

        pass(`for (const {...x} = { get v() { count++;  } }; a < 1; ) { }`, {
            source: 'for (const {...x} = { get v() { count++;  } }; a < 1; ) { }',
            loc: true,
            ranges: true,
            raw: true,
            next: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 56,
                            "end": 59,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 56
                                },
                                "end": {
                                    "line": 1,
                                    "column": 59
                                }
                            }
                        },
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "ObjectExpression",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "v",
                                                    "start": 26,
                                                    "end": 27,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 27
                                                        }
                                                    }
                                                },
                                                "value": {
                                                    "type": "FunctionExpression",
                                                    "params": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [
                                                            {
                                                                "type": "ExpressionStatement",
                                                                "expression": {
                                                                    "type": "UpdateExpression",
                                                                    "argument": {
                                                                        "type": "Identifier",
                                                                        "name": "count",
                                                                        "start": 32,
                                                                        "end": 37,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 32
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 37
                                                                            }
                                                                        }
                                                                    },
                                                                    "operator": "++",
                                                                    "prefix": false,
                                                                    "start": 32,
                                                                    "end": 39,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 32
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 39
                                                                        }
                                                                    }
                                                                },
                                                                "start": 32,
                                                                "end": 40,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 32
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 40
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 30,
                                                        "end": 43,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 30
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 43
                                                            }
                                                        }
                                                    },
                                                    "async": false,
                                                    "generator": false,
                                                    "expression": false,
                                                    "id": null,
                                                    "start": 27,
                                                    "end": 43,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 27
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 43
                                                        }
                                                    }
                                                },
                                                "kind": "get",
                                                "computed": false,
                                                "method": false,
                                                "shorthand": false,
                                                "start": 22,
                                                "end": 43,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 22
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 43
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 20,
                                        "end": 45,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 45
                                            }
                                        }
                                    },
                                    "id": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "RestElement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "x",
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
                                    "start": 11,
                                    "end": 45,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 45
                                        }
                                    }
                                }
                            ],
                            "kind": "const",
                            "start": 5,
                            "end": 45,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 45
                                }
                            }
                        },
                        "test": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 47,
                                "end": 48,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 47
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 48
                                    }
                                }
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
                                "start": 51,
                                "end": 52,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 51
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 52
                                    }
                                },
                                "raw": "1"
                            },
                            "operator": "<",
                            "start": 47,
                            "end": 52,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 47
                                },
                                "end": {
                                    "line": 1,
                                    "column": 52
                                }
                            }
                        },
                        "update": null,
                        "start": 0,
                        "end": 59,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 59
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 59,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 59
                    }
                }
            }
        });

        pass(`for (() => { this in null };;);`, {
            source: 'for (() => { this in null };;);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "EmptyStatement",
                            "start": 30,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 30
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            }
                        },
                        "init": {
                            "type": "ArrowFunctionExpression",
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "BinaryExpression",
                                            "left": {
                                                "type": "ThisExpression",
                                                "start": 13,
                                                "end": 17,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 13
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 17
                                                    }
                                                }
                                            },
                                            "right": {
                                                "type": "Literal",
                                                "value": null,
                                                "start": 21,
                                                "end": 25,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 21
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 25
                                                    }
                                                },
                                                "raw": "null"
                                            },
                                            "operator": "in",
                                            "start": 13,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "start": 13,
                                        "end": 25,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 13
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        }
                                    }
                                ],
                                "start": 11,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "params": [],
                            "id": null,
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "start": 5,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        },
                        "test": null,
                        "update": null,
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

        pass(`for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]; i < 1; ) {}`, {
            source: 'for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]; i < 1; ) {}',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 89,
                            "end": 91,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 89
                                },
                                "end": {
                                    "line": 1,
                                    "column": 91
                                }
                            }
                        },
                        "init": {
                            "type": "VariableDeclaration",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "ArrayExpression",
                                        "elements": [
                                            {
                                                "type": "ObjectExpression",
                                                "properties": [
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "x",
                                                            "start": 56,
                                                            "end": 57,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 56
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 57
                                                                }
                                                            }
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": 11,
                                                            "start": 59,
                                                            "end": 61,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 59
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 61
                                                                }
                                                            },
                                                            "raw": "11"
                                                        },
                                                        "kind": "init",
                                                        "computed": false,
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 56,
                                                        "end": 61,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 56
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 61
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "y",
                                                            "start": 63,
                                                            "end": 64,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 63
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 64
                                                                }
                                                            }
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": 22,
                                                            "start": 66,
                                                            "end": 68,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 66
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 68
                                                                }
                                                            },
                                                            "raw": "22"
                                                        },
                                                        "kind": "init",
                                                        "computed": false,
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 63,
                                                        "end": 68,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 63
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 68
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "Property",
                                                        "key": {
                                                            "type": "Identifier",
                                                            "name": "z",
                                                            "start": 70,
                                                            "end": 71,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 70
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 71
                                                                }
                                                            }
                                                        },
                                                        "value": {
                                                            "type": "Literal",
                                                            "value": 33,
                                                            "start": 73,
                                                            "end": 75,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 73
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 75
                                                                }
                                                            },
                                                            "raw": "33"
                                                        },
                                                        "kind": "init",
                                                        "computed": false,
                                                        "method": false,
                                                        "shorthand": false,
                                                        "start": 70,
                                                        "end": 75,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 70
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 75
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 54,
                                                "end": 77,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 54
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 77
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 53,
                                        "end": 78,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 53
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 78
                                            }
                                        }
                                    },
                                    "id": {
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
                                                "type": "AssignmentPattern",
                                                "left": {
                                                    "type": "ObjectPattern",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 14,
                                                                "end": 15,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 14
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 15
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 14,
                                                                "end": 15,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 14
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 15
                                                                    }
                                                                }
                                                            },
                                                            "method": false,
                                                            "shorthand": true,
                                                            "start": 14,
                                                            "end": 15,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 14
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 15
                                                                }
                                                            }
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "y",
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
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "y",
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
                                                            "method": false,
                                                            "shorthand": true,
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
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "z",
                                                                "start": 20,
                                                                "end": 21,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "z",
                                                                "start": 20,
                                                                "end": 21,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "method": false,
                                                            "shorthand": true,
                                                            "start": 20,
                                                            "end": 21,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 20
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 21
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 12,
                                                    "end": 23,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 12
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 23
                                                        }
                                                    }
                                                },
                                                "right": {
                                                    "type": "ObjectExpression",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "key": {
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
                                                            },
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 44,
                                                                "start": 31,
                                                                "end": 33,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 31
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 33
                                                                    }
                                                                },
                                                                "raw": "44"
                                                            },
                                                            "kind": "init",
                                                            "computed": false,
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 28,
                                                            "end": 33,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 28
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 33
                                                                }
                                                            }
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 35,
                                                                "end": 36,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 35
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 36
                                                                    }
                                                                }
                                                            },
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 55,
                                                                "start": 38,
                                                                "end": 40,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 38
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 40
                                                                    }
                                                                },
                                                                "raw": "55"
                                                            },
                                                            "kind": "init",
                                                            "computed": false,
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 35,
                                                            "end": 40,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 35
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 40
                                                                }
                                                            }
                                                        },
                                                        {
                                                            "type": "Property",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "z",
                                                                "start": 42,
                                                                "end": 43,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 42
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 43
                                                                    }
                                                                }
                                                            },
                                                            "value": {
                                                                "type": "Literal",
                                                                "value": 66,
                                                                "start": 45,
                                                                "end": 47,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 45
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 47
                                                                    }
                                                                },
                                                                "raw": "66"
                                                            },
                                                            "kind": "init",
                                                            "computed": false,
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 42,
                                                            "end": 47,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 42
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 47
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 26,
                                                    "end": 49,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 49
                                                        }
                                                    }
                                                },
                                                "start": 12,
                                                "end": 49,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 12
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 49
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 11,
                                        "end": 50,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 11
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 50
                                            }
                                        }
                                    },
                                    "start": 11,
                                    "end": 78,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 78
                                        }
                                    }
                                }
                            ],
                            "kind": "const",
                            "start": 5,
                            "end": 78,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 78
                                }
                            }
                        },
                        "test": {
                            "type": "BinaryExpression",
                            "left": {
                                "type": "Identifier",
                                "name": "i",
                                "start": 80,
                                "end": 81,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 80
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 81
                                    }
                                }
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
                                "start": 84,
                                "end": 85,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 84
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 85
                                    }
                                },
                                "raw": "1"
                            },
                            "operator": "<",
                            "start": 80,
                            "end": 85,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 80
                                },
                                "end": {
                                    "line": 1,
                                    "column": 85
                                }
                            }
                        },
                        "update": null,
                        "start": 0,
                        "end": 91,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 91
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 91,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 91
                    }
                }
            }
        });
        
        /*fail(`for (let x; false; ) { var x; }`, {
            source: 'for (let x; false; ) { var x; }',
        }); */

        fail(`for (const x; false; ) { var x; }`, {
            source: 'for (const x; false; ) { var x; }',
        });

        fail(`for(let let;;);`, {
            source: 'for(let let;;);',
        });

        fail(`for(let a, let;;);`, {
            source: 'for(let a, let;;);',
        }); 

        fail(`for(const let = 0;;);`, {
            source: 'for(const let = 0;;);',
        });

        fail(`for(const a = 0, let = 1;;);`, {
            source: 'for(const a = 0, let = 1;;);',
        });

        fail(`for(let [let] = 0;;);`, {
            source: 'for(let [let] = 0;;);',
        });

        fail(`for(let a, a;;);`, {
            source: 'for(let a, a;;);',
        });

         fail(`for(let [a, a] = 0;;);`, {
             source: 'for(let [a, a] = 0;;);',
         });

        fail(`for(const a = 0, a = 1;;);`, {
            source: 'for(const a = 0, a = 1;;);',
        });

         fail(`for(const [a, a] = 0;;);`, {
             source: 'for(const [a, a] = 0;;);',
         });

        fail(`for(const a;;);`, {
            source: 'for(const a;;);',
        });

        fail(`for(const a = 0, b;;);`, {
            source: 'for(const a = 0, b;;);',
        });

        fail(`for (const x; false; ) { var x; }`, {
            source: 'for (const x; false; ) { var x; }',
        });

        fail(`for (let {a: b = let};;) {}`, {
            source: 'for (let {a: b = let};;) {}',
        });

        fail(`for (let [a = let];;) {}`, {
            source: 'for (let [a = let];;) {}',
        });

        fail(`"use strict"; for (let [a = let];;) {}`, {
            source: '"use strict"; for (let [a = let];;) {}',
        });

        fail(`"use strict"; for (let {a: b = let};;) {}`, {
            source: '"use strict"; for (let {a: b = let};;) {}',
        });

        fail(`for(let [let];;);`, {
            source: 'for(let [let];;);',
        });

        fail(`for(let [a, a];;)`, {
            source: 'for(let [a, a];;)',
        });

/*
        fail(`for(let {a, a} of 0);`, {
            source: 'for(let {a, a} of 0);',
        });

        fail(`for(const {a, a} in 0);`, {
            source: 'for(const {a, a} in 0);',
        });

        fail(`for(let {a, a} in 0);`, {
            source: 'for(let {a, a} in 0);',
        });
*/
        /*fail(`for({a=0};;);`, {
            source: 'for({a=0};;);',
        }); */
    });
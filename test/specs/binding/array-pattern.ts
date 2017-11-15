import { pass, fail } from '../utils/test-utils';

describe('Binding - Array pattern', () => {
    
        fail('let [...a,] = 0', 'let [...a,] = 0');
        fail('"use strict"; for (let [x = let];;) {}', '"use strict"; for (let [x = let];;) {}');
        // fail('[a, ...(b = c)] = 0', '[a, ...(b = c)] = 0');
        fail('var ([x]) = 0', 'var ([x]) = 0');
        fail('var [a.b] = 0', 'var [a.b] = 0');
        fail('(function* ([a.b]) {})', '(function* ([a.b]) {})');
        fail('({a([a.b]){}})', '({a([a.b]){}})');
        fail('({*a([a.b]){}})', '({*a([a.b]){}})');
        fail('({set a([a.b]){}})', '({set a([a.b]){}})');
        fail('[...x, y] = 0', '[...x, y] = 0');
        fail('[...x, ...y] = 0', '[...x, ...y] = 0');
        fail('[...x, y] = 0', '[...x, y] = 0');
        fail('([a.b]) => 0', '([a.b]) => 0');
        fail('function a([a.b]) {}', 'function a([a.b]) {}');
        fail('function* a([a.b]) {}', 'function* a([a.b]) {}');
        fail('(function ([a.b]) {})', '(function ([a.b]) {})');

        pass('with valid array pattern and assignment', `try { } catch ([a = 0]) { }`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "TryStatement",
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
                },
                "block": {
                    "type": "BlockStatement",
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
                    },
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "start": 8,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    },
                    "param": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                            "type": "AssignmentPattern",
                            "start": 16,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            },
                            "left": {
                                "type": "Identifier",
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
                                },
                                "name": "a"
                            },
                            "right": {
                                "type": "Literal",
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
                                },
                                "value": 0,
                                "raw": "0"
                            }
                        }]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 24,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 24
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        },
                        "body": []
                    }
                },
                "finalizer": null
            }],
            "sourceType": "script"
        });
    
        pass('should parse pattern with an element list with initializers', `function fn3([a,, b = a, c = 42]) {}`, {
            "type": "Program",
            "start": 0,
            "end": 36,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 36
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 36,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 36
                    }
                },
                "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "name": "fn3"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "ArrayPattern",
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
                    },
                    "elements": [{
                            "type": "Identifier",
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
                            },
                            "name": "a"
                        },
                        null,
                        {
                            "type": "AssignmentPattern",
                            "start": 18,
                            "end": 23,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 23
                                }
                            },
                            "left": {
                                "type": "Identifier",
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
                                },
                                "name": "b"
                            },
                            "right": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 23,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 23
                                    }
                                },
                                "name": "a"
                            }
                        },
                        {
                            "type": "AssignmentPattern",
                            "start": 25,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 25
                                },
                                "end": {
                                    "line": 1,
                                    "column": 31
                                }
                            },
                            "left": {
                                "type": "Identifier",
                                "start": 25,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 25
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                },
                                "name": "c"
                            },
                            "right": {
                                "type": "Literal",
                                "start": 29,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 31
                                    }
                                },
                                "value": 42,
                                "raw": "42"
                            }
                        }
                    ]
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 34,
                    "end": 36,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 34
                        },
                        "end": {
                            "line": 1,
                            "column": 36
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    
        pass('should parse array pattern with elison', `function fn2([,,]) {}`, {
            "type": "Program",
            "start": 0,
            "end": 21,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                },
                "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "ArrayPattern",
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
                    },
                    "elements": [
                        null,
                        null
                    ]
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 19,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 19
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    
        pass('should parse elison', `let [a,] = 0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "id": {
                        "type": "ArrayPattern",
                        "start": 4,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        },
                        "elements": [{
                            "type": "Identifier",
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
                            },
                            "name": "a"
                        }]
                    },
                    "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse empty pattern catch param', `try { } catch ([]) {}`, {
            "type": "Program",
            "start": 0,
            "end": 21,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            },
            "body": [{
                "type": "TryStatement",
                "start": 0,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                },
                "block": {
                    "type": "BlockStatement",
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
                    },
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "start": 8,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    },
                    "param": {
                        "type": "ArrayPattern",
                        "start": 15,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        },
                        "elements": []
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 19,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 19
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        },
                        "body": []
                    }
                },
                "finalizer": null
            }],
            "sourceType": "script"
        });
    
        pass('should parse empty pattern function', `function a([]) {}`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "FunctionDeclaration",
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
                    "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "ArrayPattern",
                    "start": 11,
                    "end": 13,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 11
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    },
                    "elements": []
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 15,
                    "end": 17,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    
        pass('should parse empty pattern lexical', `let [] = [];`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
                        "start": 4,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        },
                        "elements": []
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "start": 9,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        },
                        "elements": []
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse empty pattern var', `var [] = 0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
                        "start": 4,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        },
                        "elements": []
                    },
                    "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse hole', `let [a,,b]=0`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                                "type": "Identifier",
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
                                },
                                "name": "a"
                            },
                            null,
                            {
                                "type": "Identifier",
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
                                "name": "b"
                            }
                        ]
                    },
                    "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse nested pattern', `let [[]]=0`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
                        "start": 4,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        },
                        "elements": [{
                            "type": "ArrayPattern",
                            "start": 5,
                            "end": 7,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 7
                                }
                            },
                            "elements": []
                        }]
                    },
                    "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse rest element array pattern', `let [...[x]] = y`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 16
                        }
                    },
                    "id": {
                        "type": "ArrayPattern",
                        "start": 4,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        },
                        "elements": [{
                            "type": "RestElement",
                            "start": 5,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            },
                            "argument": {
                                "type": "ArrayPattern",
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
                                },
                                "elements": [{
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
                                    "name": "x"
                                }]
                            }
                        }]
                    },
                    "init": {
                        "type": "Identifier",
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
                        },
                        "name": "y"
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse rest element object pattern', `var [...{x}] = y`, {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
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
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "RestElement",
                            "argument": {
                                "type": "ObjectPattern",
                                "properties": [{
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
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
                                    "computed": false,
                                    "value": {
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
                                    "method": false,
                                    "shorthand": true,
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
                                }],
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
                            "start": 5,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        }],
                        "start": 4,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    },
                    "start": 4,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 16
                        }
                    }
                }],
                "kind": "var",
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
            }],
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
        });
    
        pass('should parse rest', `let [...a] = 0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                            "type": "RestElement",
                            "start": 5,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            },
                            "argument": {
                                "type": "Identifier",
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
                                "name": "a"
                            }
                        }]
                    },
                    "init": {
                        "type": "Literal",
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
                        },
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse tailing hold', `let [a,,]=0`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                                "type": "Identifier",
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
                                },
                                "name": "a"
                            },
                            null
                        ]
                    },
                    "init": {
                        "type": "Literal",
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
                        },
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse var let array', `var [let] = answer;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                            "type": "Identifier",
                            "start": 5,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            },
                            "name": "let"
                        }]
                    },
                    "init": {
                        "type": "Identifier",
                        "start": 12,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 18
                            }
                        },
                        "name": "answer"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse with default function', `function a([a=0]) {}`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "FunctionDeclaration",
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
                    "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "ArrayPattern",
                    "start": 11,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 11
                        },
                        "end": {
                            "line": 1,
                            "column": 16
                        }
                    },
                    "elements": [{
                        "type": "AssignmentPattern",
                        "start": 12,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        },
                        "left": {
                            "type": "Identifier",
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
                            "name": "a"
                        },
                        "right": {
                            "type": "Literal",
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
                            },
                            "value": 0,
                            "raw": "0"
                        }
                    }]
                }],
                "body": {
                    "type": "BlockStatement",
                    "start": 18,
                    "end": 20,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 20
                        }
                    },
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    
        pass('should parse with object pattern', `let [{a}] = 0`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                            "type": "ObjectPattern",
                            "start": 5,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            },
                            "properties": [{
                                "type": "Property",
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
                                },
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
                                    "type": "Identifier",
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
                                    },
                                    "name": "a"
                                },
                                "kind": "init",
                                "value": {
                                    "type": "Identifier",
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
                                    },
                                    "name": "a"
                                }
                            }]
                        }]
                    },
                    "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    
        pass('should parse "var [,a] = 0;"', `var [,a] = 0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "id": {
                        "type": "ArrayPattern",
                        "start": 4,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        },
                        "elements": [
                            null,
                            {
                                "type": "Identifier",
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
                                },
                                "name": "a"
                            }
                        ]
                    },
                    "init": {
                        "type": "Literal",
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
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse "var [a]=[1];"', `var [a]=[1];`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                            "type": "Identifier",
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
                            },
                            "name": "a"
                        }]
                    },
                    "init": {
                        "type": "ArrayExpression",
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
                        },
                        "elements": [{
                            "type": "Literal",
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
                            "value": 1,
                            "raw": "1"
                        }]
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse "var [[a]]=0;"', `var [[a]]=0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
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
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                            "type": "ArrayPattern",
                            "start": 5,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            },
                            "elements": [{
                                "type": "Identifier",
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
                                },
                                "name": "a"
                            }]
                        }]
                    },
                    "init": {
                        "type": "Literal",
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
                        },
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse "var a, [a] = 0;"', `var a, [a] = 0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                        "type": "VariableDeclarator",
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
                        },
                        "id": {
                            "type": "Identifier",
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
                            },
                            "name": "a"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "start": 7,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        },
                        "id": {
                            "type": "ArrayPattern",
                            "start": 7,
                            "end": 10,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 7
                                },
                                "end": {
                                    "line": 1,
                                    "column": 10
                                }
                            },
                            "elements": [{
                                "type": "Identifier",
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
                                "name": "a"
                            }]
                        },
                        "init": {
                            "type": "Literal",
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
                            },
                            "value": 0,
                            "raw": "0"
                        }
                    }
                ],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse "var [a, a] = 0;"', `var [a, a] = 0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                                "type": "Identifier",
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
                                },
                                "name": "a"
                            },
                            {
                                "type": "Identifier",
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
                                "name": "a"
                            }
                        ]
                    },
                    "init": {
                        "type": "Literal",
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
                        },
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse "var [a, ...a] = 0;"', `var [a, ...a] = 0;`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "VariableDeclaration",
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
                },
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 17,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    },
                    "id": {
                        "type": "ArrayPattern",
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
                        },
                        "elements": [{
                                "type": "Identifier",
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
                                },
                                "name": "a"
                            },
                            {
                                "type": "RestElement",
                                "start": 8,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                },
                                "argument": {
                                    "type": "Identifier",
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
                                    "name": "a"
                                }
                            }
                        ]
                    },
                    "init": {
                        "type": "Literal",
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
                        },
                        "value": 0,
                        "raw": "0"
                    }
                }],
                "kind": "var"
            }],
            "sourceType": "script"
        });
    
        pass('should parse "try {} catch ([e, ...a]) {}"', `try {} catch ([e, ...a]) {}`, {
            "type": "Program",
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
            },
            "body": [{
                "type": "TryStatement",
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
                },
                "block": {
                    "type": "BlockStatement",
                    "start": 4,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    },
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "start": 7,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    },
                    "param": {
                        "type": "ArrayPattern",
                        "start": 14,
                        "end": 23,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 14
                            },
                            "end": {
                                "line": 1,
                                "column": 23
                            }
                        },
                        "elements": [{
                                "type": "Identifier",
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
                                },
                                "name": "e"
                            },
                            {
                                "type": "RestElement",
                                "start": 18,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                },
                                "argument": {
                                    "type": "Identifier",
                                    "start": 21,
                                    "end": 22,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 21
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 22
                                        }
                                    },
                                    "name": "a"
                                }
                            }
                        ]
                    },
                    "body": {
                        "type": "BlockStatement",
                        "start": 25,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 25
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        },
                        "body": []
                    }
                },
                "finalizer": null
            }],
            "sourceType": "script"
        });
    
        pass('should parse array rest element', `function fn2([,,,,,,,...args]) {}`, {
            "type": "Program",
            "start": 0,
            "end": 33,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 33
                }
            },
            "body": [{
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 33,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 33
                    }
                },
                "id": {
                    "type": "Identifier",
                    "start": 9,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "name": "fn2"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [{
                    "type": "ArrayPattern",
                    "start": 13,
                    "end": 29,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    },
                    "elements": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        {
                            "type": "RestElement",
                            "start": 21,
                            "end": 28,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 21
                                },
                                "end": {
                                    "line": 1,
                                    "column": 28
                                }
                            },
                            "argument": {
                                "type": "Identifier",
                                "start": 24,
                                "end": 28,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 28
                                    }
                                },
                                "name": "args"
                            }
                        }
                    ]
                }],
                "body": {
                    "type": "BlockStatement",
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
                    "body": []
                }
            }],
            "sourceType": "script"
        });
    });
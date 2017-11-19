import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Class', () => {

    fail('class {}', 'class {}');
    fail('class extends A{}', 'class extends A{}');
    fail('class a{ *() {} }', 'class a{ *() {} }');
    fail('class a{ get get a() {} }', 'class a{ get get a() {} }');
    fail('class a{ get async a() {} }', 'class a{ get async a() {} }');

    fail('class a{ async async a() {} }', 'class a{ async async a() {} }');
    
    fail('escaped async generator', 'class a { \\u0061sync* m(){} }');
    fail('escaped static', 'class C { st\\u0061tic m() {}  }');
    
    fail('duplicate Class binding', `class A {}
    class A {}`);

    fail('LineTerminator after async keyword', `class Foo {
        async 
        a() {}
      }`);


      pass('class a{ get get() {} }', `var A = class B {
        method() {}
        static method() {}
        ;
      }`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ClassExpression",
                            "id": {
                                "type": "Identifier",
                                "name": "B",
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
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "method",
                                            "start": 26,
                                            "end": 32,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 8
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 14
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 35,
                                                "end": 37,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 17
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "async": false,
                                            "generator": false,
                                            "expression": false,
                                            "id": null,
                                            "start": 32,
                                            "end": 37,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 19
                                                }
                                            }
                                        },
                                        "static": false,
                                        "start": 26,
                                        "end": 37,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 19
                                            }
                                        }
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "method",
                                            "start": 53,
                                            "end": 59,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 21
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 62,
                                                "end": 64,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 24
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 26
                                                    }
                                                }
                                            },
                                            "async": false,
                                            "generator": false,
                                            "expression": false,
                                            "id": null,
                                            "start": 59,
                                            "end": 64,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 26
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 46,
                                        "end": 64,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 26
                                            }
                                        }
                                    }
                                ],
                                "start": 16,
                                "end": 82,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 7
                                    }
                                }
                            },
                            "start": 8,
                            "end": 82,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 5,
                                    "column": 7
                                }
                            }
                        },
                        "id": {
                            "type": "Identifier",
                            "name": "A",
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
                        "start": 4,
                        "end": 82,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 5,
                                "column": 7
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 82,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 5,
                        "column": 7
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 82,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 5,
                "column": 7
            }
        }
    });
        
      pass('class a{ get get() {} }', 'class a{ get get() {} }', {
        "type": "Program",
        "body": [
            {
                "type": "ClassDeclaration",
                "id": {
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "get",
                                "start": 13,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "kind": "get",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
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
                                    }
                                },
                                "generator": false,
                                "async": false,
                                "expression": false,
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
                                }
                            },
                            "static": false,
                            "start": 9,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        }
                    ],
                    "start": 7,
                    "end": 23,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 23
                        }
                    }
                },
                "start": 0,
                "end": 23,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 23
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 23,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 23
            }
        }
    })
    
    pass('async gen method yield async next', 'class C { async *gen() {  var v = yield* obj;  return "return-value"; }}', {
        "type": "Program",
        "body": [
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "gen",
                                "start": 17,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "VariableDeclaration",
                                            "declarations": [
                                                {
                                                    "type": "VariableDeclarator",
                                                    "init": {
                                                        "type": "YieldExpression",
                                                        "argument": {
                                                            "type": "Identifier",
                                                            "name": "obj",
                                                            "start": 41,
                                                            "end": 44,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 41
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 44
                                                                }
                                                            }
                                                        },
                                                        "delegate": true,
                                                        "start": 34,
                                                        "end": 44,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 34
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 44
                                                            }
                                                        }
                                                    },
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "v",
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
                                                    "start": 30,
                                                    "end": 44,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 30
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 44
                                                        }
                                                    }
                                                }
                                            ],
                                            "kind": "var",
                                            "start": 26,
                                            "end": 45,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 45
                                                }
                                            }
                                        },
                                        {
                                            "type": "ReturnStatement",
                                            "argument": {
                                                "type": "Literal",
                                                "value": "return-value",
                                                "start": 54,
                                                "end": 68,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 54
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 68
                                                    }
                                                },
                                                "raw": "\"return-value\""
                                            },
                                            "start": 47,
                                            "end": 69,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 47
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 69
                                                }
                                            }
                                        }
                                    ],
                                    "start": 23,
                                    "end": 71,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 71
                                        }
                                    }
                                },
                                "generator": true,
                                "async": true,
                                "expression": false,
                                "start": 20,
                                "end": 71,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 71
                                    }
                                }
                            },
                            "static": false,
                            "start": 10,
                            "end": 71,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 71
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 72,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 72
                        }
                    }
                },
                "start": 0,
                "end": 72,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 72
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 72,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 72
            }
        }
    });
});
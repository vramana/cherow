import { n, pass, fail } from '../utils/test-utils';

describe('Declarations - Class', () => {

    fail('class {}', 'class {}');
    fail('class extends A{}', 'class extends A{}');
    fail('class a{ *() {} }', 'class a{ *() {} }');
    fail('class a{ get get a() {} }', 'class a{ get get a() {} }');
    fail('class a{ get async a() {} }', 'class a{ get async a() {} }');

    fail('class a{ async async a() {} }', 'class a{ async async a() {} }');
    
    fail('class a { \\u0061sync* m(){} }', 'class a { \\u0061sync* m(){} }');

    fail('duplicate Class binding', `class A {}
    class A {}`);

    fail('LineTerminator after async keyword', `class Foo {
        async 
        a() {}
      }`);
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
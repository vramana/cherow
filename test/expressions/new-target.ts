import { fail, pass } from '../utils';

describe('Statements - New target', () => {

    fail(`function f() { new.target = 1;  }`, {
        source: 'function f() { new.target = 1;  }',
    });

    fail(`() => { new.target; };`, {
        source: '() => { new.target; };',
    });

    fail(`function f() { new.anythingElse; }`, {
        source: 'function f() { new.anythingElse; }',
    });

    fail(`new Type[]`, {
        source: 'new Type[]',
    });

    fail(`function f() { n\\u0065w.target; }`, {
        source: 'function f() { n\\u0065w.target; }',
    });

    fail(`function f() { new.target = 1; }`, {
        source: 'function f() { new.target = 1; }',
    });

    fail(`new.prop`, {
        source: 'new.prop',
    });

    fail(`"new.target`, {
        source: 'new.target',
    });

    fail(`var f = function() { new.unknown_property; }`, {
        source: 'var f = function() { new.unknown_property; }',
    });

    pass(`function a() { new.\\u0074arget; }`, {
        source: `function a() { new.\\u0074arget; }`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
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
            "body": [
              {
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
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 33,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 33
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 15,
                      "end": 31,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "expression": {
                        "type": "MetaProperty",
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
                        },
                        "meta": {
                          "type": "Identifier",
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
                          },
                          "name": "new"
                        },
                        "property": {
                          "type": "Identifier",
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
                          },
                          "name": "target"
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          }
    });

    pass(`(function a(b = new.target){})`, {
        source: `(function a(b = new.target){})`,
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
                            "name": "a",
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

    pass(`({ set a(b = new.target){} })`, {
        source: '({ set a(b = new.target){} })',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a",
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
                                "value": {
                                    "type": "FunctionExpression",
                                    "params": [
                                        {
                                            "type": "AssignmentPattern",
                                            "left": {
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
                                            "right": {
                                                "meta": {
                                                    "type": "Identifier",
                                                    "name": "new",
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
                                                "type": "MetaProperty",
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "target",
                                                    "start": 17,
                                                    "end": 23,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 17
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 23
                                                        }
                                                    }
                                                },
                                                "start": 13,
                                                "end": 23,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 13
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 23
                                                    }
                                                }
                                            },
                                            "start": 9,
                                            "end": 23,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 9
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 23
                                                }
                                            }
                                        }
                                    ],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
                                        "start": 24,
                                        "end": 26,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 26
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": null,
                                    "start": 8,
                                    "end": 26,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 26
                                        }
                                    }
                                },
                                "kind": "set",
                                "computed": false,
                                "method": false,
                                "shorthand": false,
                                "start": 3,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 3
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 28,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 28
                            }
                        }
                    },
                    "start": 0,
                    "end": 29,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 29,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 29
                }
            }
        }
    });

    pass(`(function a(b = new.target){})`, {
        source: '(function a(b = new.target){})',
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
                            "name": "a",
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

    pass(`function f() { let x = new.target; }`, {
        source: 'function f() { let x = new.target; }',
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
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "init": {
                                            "meta": {
                                                "type": "Identifier",
                                                "name": "new",
                                                "start": 23,
                                                "end": 26,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 23
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 26
                                                    }
                                                }
                                            },
                                            "type": "MetaProperty",
                                            "property": {
                                                "type": "Identifier",
                                                "name": "target",
                                                "start": 27,
                                                "end": 33,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 27
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 33
                                                    }
                                                }
                                            },
                                            "start": 23,
                                            "end": 33,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 33
                                                }
                                            }
                                        },
                                        "id": {
                                            "type": "Identifier",
                                            "name": "x",
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
                                            }
                                        },
                                        "start": 19,
                                        "end": 33,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 33
                                            }
                                        }
                                    }
                                ],
                                "kind": "let",
                                "start": 15,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 36,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 36
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        }
    });

    pass(`function f() { new new.target()(); }`, {
        source: 'function f() { new new.target()(); }',
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
                                        "end": 31,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 15
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 31
                                            }
                                        }
                                    },
                                    "arguments": [],
                                    "start": 15,
                                    "end": 33,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 33
                                        }
                                    }
                                },
                                "start": 15,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                }
                            }
                        ],
                        "start": 13,
                        "end": 36,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 13
                            },
                            "end": {
                                "line": 1,
                                "column": 36
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
                    }
                }
            ],
            "sourceType": "script",
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
});
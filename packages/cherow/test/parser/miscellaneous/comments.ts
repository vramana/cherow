import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - Comments', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  [`42 // line comment`, `42 // line comment`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Literal",
                raw: null,
                "value": 42,
                "start": 0,
                "end": 2,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 2
                    }
                }
            },
            "start": 0,
            "end": 2,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 2
                }
            }
        }
    ],
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
}],

  [`if (x) { // Some comment
    doThat(); }`, `if (x) { // Some comment
      doThat(); }`, Context.Empty, {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "IfStatement",
                "test": {
                    "type": "Identifier",
                    "name": "x"
                },
                "consequent": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "doThat"
                                },
                                "arguments": []
                            }
                        }
                    ]
                },
                "alternate": null
            }
        ]
    }],

  [`if (x) { /* Some comment */ doThat() }`, `if (x) { /* Some comment */ doThat() }`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "IfStatement",
            "test": {
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
            "consequent": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "doThat",
                                "start": 28,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                }
                            },
                            "arguments": [],
                            "start": 28,
                            "end": 36,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 28
                                },
                                "end": {
                                    "line": 1,
                                    "column": 36
                                }
                            }
                        },
                        "start": 28,
                        "end": 36,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 28
                            },
                            "end": {
                                "line": 1,
                                "column": 36
                            }
                        }
                    }
                ],
                "start": 7,
                "end": 38,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 7
                    },
                    "end": {
                        "line": 1,
                        "column": 38
                    }
                }
            },
            "alternate": null,
            "start": 0,
            "end": 38,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 38
                }
            }
        }
    ],
    "start": 0,
    "end": 38,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 38
        }
    }
}],

  [`switch (answer) { case 42: /* perfect */ bingo() }`, `switch (answer) { case 42: /* perfect */ bingo() }`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "SwitchStatement",
            "discriminant": {
                "type": "Identifier",
                "name": "answer",
                "start": 8,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 8
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            },
            "cases": [
                {
                    "type": "SwitchCase",
                    "test": {
                        "type": "Literal",
                        raw: null,
                        "value": 42,
                        "start": 23,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        }
                    },
                    "consequent": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "bingo",
                                    "start": 41,
                                    "end": 46,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 41
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                },
                                "arguments": [],
                                "start": 41,
                                "end": 48,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 41
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 48
                                    }
                                }
                            },
                            "start": 41,
                            "end": 48,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 41
                                },
                                "end": {
                                    "line": 1,
                                    "column": 48
                                }
                            }
                        }
                    ],
                    "start": 18,
                    "end": 48,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                }
            ],
            "start": 0,
            "end": 50,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 50
                }
            }
        }
    ],
    "start": 0,
    "end": 50,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 50
        }
    }
}],

  [`switch (answer) { case 42: bingo() /* perfect */ }`, `switch (answer) { case 42: bingo() /* perfect */ }`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "SwitchStatement",
            "discriminant": {
                "type": "Identifier",
                "name": "answer",
                "start": 8,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 8
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            },
            "cases": [
                {
                    "type": "SwitchCase",
                    "test": {
                        "type": "Literal",
                        raw: null,
                        "value": 42,
                        "start": 23,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 23
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        }
                    },
                    "consequent": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "bingo",
                                    "start": 27,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
                                "arguments": [],
                                "start": 27,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                }
                            },
                            "start": 27,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 27
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            }
                        }
                    ],
                    "start": 18,
                    "end": 34,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 34
                        }
                    }
                }
            ],
            "start": 0,
            "end": 50,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 50
                }
            }
        }
    ],
    "start": 0,
    "end": 50,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 50
        }
    }
}],

  [`/* header */ (function(){ var version = 1; }).call(this)`, `/* header */ (function(){ var version = 1; }).call(this)`, Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "FunctionExpression",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "kind": "var",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": {
                                                "type": "Literal",
                                                raw: null,
                                                "value": 1
                                            },
                                            "id": {
                                                "type": "Identifier",
                                                "name": "version"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": null
                    },
                    "computed": false,
                    "property": {
                        "type": "Identifier",
                        "name": "call"
                    }
                },
                "arguments": [
                    {
                        "type": "ThisExpression"
                    }
                ]
            }
        }
    ]
}],
  ['--> is eol-comment\nvar y = abc;\n', '--> is eol-comment\nvar y = abc;\n', Context.Empty, {
      "body": [
        {
          "declarations": [
            {
              "id": {
                "name": "y",
                "type": "Identifier",
              },
              "init": {
                "name": "abc",
                "type": "Identifier",
              },
              "type": "VariableDeclarator"
            }
          ],
          "kind": "var",
         "type": "VariableDeclaration",
        },
      ],
      "sourceType": "script",
      "type": "Program"
    }],
  [`(function(){ var version = 1; /* sync */ }).call(this)`, `(function(){ var version = 1; /* sync */ }).call(this)`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "object": {
                        "type": "FunctionExpression",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "kind": "var",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "init": {
                                                "type": "Literal",
                                                raw: null,
                                                "value": 1,
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
                                            "id": {
                                                "type": "Identifier",
                                                "name": "version",
                                                "start": 17,
                                                "end": 24,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 17
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 24
                                                    }
                                                }
                                            },
                                            "start": 17,
                                            "end": 28,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 17
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 28
                                                }
                                            }
                                        }
                                    ],
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
                                    }
                                }
                            ],
                            "start": 11,
                            "end": 42,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 42
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": null,
                        "start": 1,
                        "end": 42,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 42
                            }
                        }
                    },
                    "computed": false,
                    "property": {
                        "type": "Identifier",
                        "name": "call",
                        "start": 44,
                        "end": 48,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 44
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        }
                    },
                    "start": 0,
                    "end": 48,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                },
                "arguments": [
                    {
                        "type": "ThisExpression",
                        "start": 49,
                        "end": 53,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 49
                            },
                            "end": {
                                "line": 1,
                                "column": 53
                            }
                        }
                    }
                ],
                "start": 0,
                "end": 54,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 54
                    }
                }
            },
            "start": 0,
            "end": 54,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 54
                }
            }
        }
    ],
    "start": 0,
    "end": 54,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 54
        }
    }
}],

  [`function f() { /* infinite */ while (true) { } /* bar */ var each; }`, `function f() { /* infinite */ while (true) { } /* bar */ var each; }`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "FunctionDeclaration",
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "WhileStatement",
                        "test": {
                            "type": "Literal",
                            "value": true,
                            "start": 37,
                            "end": 41,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 37
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            }
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 43,
                            "end": 46,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 43
                                },
                                "end": {
                                    "line": 1,
                                    "column": 46
                                }
                            }
                        },
                        "start": 30,
                        "end": 46,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 30
                            },
                            "end": {
                                "line": 1,
                                "column": 46
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "kind": "var",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": null,
                                "id": {
                                    "type": "Identifier",
                                    "name": "each",
                                    "start": 61,
                                    "end": 65,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 61
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 65
                                        }
                                    }
                                },
                                "start": 61,
                                "end": 65,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 61
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 65
                                    }
                                }
                            }
                        ],
                        "start": 57,
                        "end": 66,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 57
                            },
                            "end": {
                                "line": 1,
                                "column": 66
                            }
                        }
                    }
                ],
                "start": 13,
                "end": 68,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 13
                    },
                    "end": {
                        "line": 1,
                        "column": 68
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
            "end": 68,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 68
                }
            }
        }
    ],
    "start": 0,
    "end": 68,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 68
        }
    }
}],

  [`var x = 1<!--foo`, `var x = 1<!--foo`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "VariableDeclaration",
            "kind": "var",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "Literal",
                        raw: null,
                        "value": 1,
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
                    "id": {
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
                }
            ],
            "start": 0,
            "end": 9,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 9
                }
            }
        }
    ],
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

  [`while (i-->0) {}`, `while (i-->0) {}`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "BinaryExpression",
                "left": {
                    "type": "UpdateExpression",
                    "argument": {
                        "type": "Identifier",
                        "name": "i",
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
                    "operator": "--",
                    "prefix": false,
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
                    }
                },
                "right": {
                    "type": "Literal",
                    raw: null,
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
                    }
                },
                "operator": ">",
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
            "body": {
                "type": "BlockStatement",
                "body": [],
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

  [`
  /*Venus*/ debugger; // Mars`, `/*Venus*/ debugger; // Mars`, Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "DebuggerStatement"
        }
    ]
}],

  [`function x(){ /*Jupiter*/ return; /*Saturn*/}`, `function x(){ /*Jupiter*/ return; /*Saturn*/}`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "FunctionDeclaration",
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ReturnStatement",
                        "argument": null,
                        "start": 26,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 26
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        }
                    }
                ],
                "start": 12,
                "end": 45,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 12
                    },
                    "end": {
                        "line": 1,
                        "column": 45
                    }
                }
            },
            "async": false,
            "generator": false,
            "expression": false,
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
            "start": 0,
            "end": 45,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 45
                }
            }
        }
    ],
    "start": 0,
    "end": 45,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 45
        }
    }
}],

  [`/**
  * @type {number}
  */
 var a = 5,
     /**
      * @type {number}
      */
     b = 6;`, `/**
     * @type {number}
     */
    var a = 5,
        /**
         * @type {number}
         */
        b = 6;`, Context.Empty, {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "VariableDeclaration",
                  "kind": "var",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "init": {
                              "type": "Literal",
                              raw: null,
                              "value": 5
                          },
                          "id": {
                              "type": "Identifier",
                              "name": "a"
                          }
                      },
                      {
                          "type": "VariableDeclarator",
                          "init": {
                              "type": "Literal",
                              raw: null,
                              "value": 6
                          },
                          "id": {
                              "type": "Identifier",
                              "name": "b"
                          }
                      }
                  ]
              }
          ]
      }],

  [`/**/ function a() {/**/function o() {}}`, `/**/ function a() {/**/function o() {}}`, Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "FunctionDeclaration",
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "FunctionDeclaration",
                        "params": [],
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "o"
                        }
                    }
                ]
            },
            "async": false,
            "generator": false,
            "expression": false,
            "id": {
                "type": "Identifier",
                "name": "a"
            }
        }
    ]
}],

  [`while (true) {
    /**
     * comments in empty block
     */
  }`, `while (true) {
    /**
     * comments in empty block
     */
  }`, Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "Literal",
                "value": true
            },
            "body": {
                "type": "BlockStatement",
                "body": []
            }
        }
    ]
}],

  [`let a = () => /* = */ { return "b" }`, `let a = () => /* = */ { return "b" }`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "VariableDeclaration",
            "kind": "let",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ReturnStatement",
                                    "argument": {
                                        "type": "Literal",
                                        raw: null,
                                        "value": "b",
                                        "start": 31,
                                        "end": 34,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 31
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 34
                                            }
                                        }
                                    },
                                    "start": 24,
                                    "end": 34,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 34
                                        }
                                    }
                                }
                            ],
                            "start": 22,
                            "end": 36,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 36
                                }
                            }
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "start": 8,
                        "end": 36,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 36
                            }
                        }
                    },
                    "id": {
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
                    "start": 4,
                    "end": 36,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 36
                        }
                    }
                }
            ],
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
}],

  [`let a = () => { /* = */ return "b" }`, `let a = () => { /* = */ return "b" }`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "VariableDeclaration",
            "kind": "let",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ArrowFunctionExpression",
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ReturnStatement",
                                    "argument": {
                                        "type": "Literal",
                                        raw: null,
                                        "value": "b",
                                        "start": 31,
                                        "end": 34,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 31
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 34
                                            }
                                        }
                                    },
                                    "start": 24,
                                    "end": 34,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 34
                                        }
                                    }
                                }
                            ],
                            "start": 14,
                            "end": 36,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 36
                                }
                            }
                        },
                        "params": [],
                        "id": null,
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "start": 8,
                        "end": 36,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 36
                            }
                        }
                    },
                    "id": {
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
                    "start": 4,
                    "end": 36,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 36
                        }
                    }
                }
            ],
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
}],

  [`(/* className: string */) => {}`, `(/* className: string */) => {}`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ArrowFunctionExpression",
                "body": {
                    "type": "BlockStatement",
                    "body": [],
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
                    }
                },
                "params": [],
                "id": null,
                "async": false,
                "generator": false,
                "expression": false,
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
}],

  [`0/**/`, `0/**/`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Literal",
                raw: null,
                "value": 0,
                "start": 0,
                "end": 1,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 1
                    }
                }
            },
            "start": 0,
            "end": 1,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 1
                }
            }
        }
    ],
    "start": 0,
    "end": 5,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 5
        }
    }
}],

  [`function f() { /* infinite */ while (true) { } /* bar */ var each; }`, `function f() { /* infinite */ while (true) { } /* bar */ var each; }`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "FunctionDeclaration",
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "WhileStatement",
                        "test": {
                            "type": "Literal",
                            "value": true,
                            "start": 37,
                            "end": 41,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 37
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            }
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 43,
                            "end": 46,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 43
                                },
                                "end": {
                                    "line": 1,
                                    "column": 46
                                }
                            }
                        },
                        "start": 30,
                        "end": 46,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 30
                            },
                            "end": {
                                "line": 1,
                                "column": 46
                            }
                        }
                    },
                    {
                        "type": "VariableDeclaration",
                        "kind": "var",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": null,
                                "id": {
                                    "type": "Identifier",
                                    "name": "each",
                                    "start": 61,
                                    "end": 65,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 61
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 65
                                        }
                                    }
                                },
                                "start": 61,
                                "end": 65,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 61
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 65
                                    }
                                }
                            }
                        ],
                        "start": 57,
                        "end": 66,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 57
                            },
                            "end": {
                                "line": 1,
                                "column": 66
                            }
                        }
                    }
                ],
                "start": 13,
                "end": 68,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 13
                    },
                    "end": {
                        "line": 1,
                        "column": 68
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
            "end": 68,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 68
                }
            }
        }
    ],
    "start": 0,
    "end": 68,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 68
        }
    }
}],

  [`a(/* inner */); b(e, /* inner */)`, `a(/* inner */); b(e, /* inner */)`, Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "a",
                    "start": 0,
                    "end": 1,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 1
                        }
                    }
                },
                "arguments": [],
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
        },
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "Identifier",
                    "name": "b",
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
                "arguments": [
                    {
                        "type": "Identifier",
                        "name": "e",
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
                    }
                ],
                "start": 16,
                "end": 33,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 16
                    },
                    "end": {
                        "line": 1,
                        "column": 33
                    }
                }
            },
            "start": 16,
            "end": 33,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 16
                },
                "end": {
                    "line": 1,
                    "column": 33
                }
            }
        }
    ],
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
    }
}],

  [`0/*\n*/--> a comment`, `0/*\n*/--> a comment`, Context.Empty, {
      "body": [
        {
          "expression": {
            "raw": null,
            "type": "Literal",
            "value": 0,
          },
          "type": "ExpressionStatement"
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }],

  [`/*a
  c*/ 42`, `/*a
  c*/ 42`, Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "Literal",
                raw: null,
                "value": 42
            }
        }
    ]
}]
];

pass('Miscellaneous - Comments (pass)', valids);

});

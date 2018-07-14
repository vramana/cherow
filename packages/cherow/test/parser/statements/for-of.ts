import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - For of', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['for (a of b);', 'for (a of b);', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
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
            "left": {
                "type": "Identifier",
                "name": "a",
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
            "right": {
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
            "await": false,
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
}],
   ['for(x of yield) {}', 'for(x of yield) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 16,
                "end": 18,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 16
                    },
                    "end": {
                        "line": 1,
                        "column": 18
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
                "name": "yield",
                "start": 9,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 9
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            },
            "await": false,
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
   ['for(let x of yield) {}', 'for(let x of yield) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 20,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 20
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                }
            },
            "left": {
                "type": "VariableDeclaration",
                "kind": "let",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": null,
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
                "name": "yield",
                "start": 13,
                "end": 18,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 13
                    },
                    "end": {
                        "line": 1,
                        "column": 18
                    }
                }
            },
            "await": false,
            "start": 0,
            "end": 22,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 22
                }
            }
        }
    ],
    "start": 0,
    "end": 22,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 22
        }
    }
}],
   ['function* g() { for(x of yield) {} }', 'function* g() { for(x of yield) {} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        "type": "ForOfStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 32,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 32
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            }
                        },
                        "left": {
                            "type": "Identifier",
                            "name": "x",
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
                        "right": {
                            "type": "YieldExpression",
                            "argument": null,
                            "delegate": false,
                            "start": 25,
                            "end": 30,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 25
                                },
                                "end": {
                                    "line": 1,
                                    "column": 30
                                }
                            }
                        },
                        "await": false,
                        "start": 16,
                        "end": 34,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
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
            "async": false,
            "generator": true,
            "expression": false,
            "id": {
                "type": "Identifier",
                "name": "g",
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
   ['for (var x of list) process(x);', 'for (var x of list) process(x);', Context.OptionsRanges | Context.OptionsLoc,{
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
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
                "kind": "var",
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
            "await": false,
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
   ['function* g() { for(var x of yield) {} }', 'function* g() { for(var x of yield) {} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        "type": "ForOfStatement",
                        "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 36,
                            "end": 38,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 36
                                },
                                "end": {
                                    "line": 1,
                                    "column": 38
                                }
                            }
                        },
                        "left": {
                            "type": "VariableDeclaration",
                            "kind": "var",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": null,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 24,
                                        "end": 25,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "start": 24,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    }
                                }
                            ],
                            "start": 20,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 25
                                }
                            }
                        },
                        "right": {
                            "type": "YieldExpression",
                            "argument": null,
                            "delegate": false,
                            "start": 29,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 29
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            }
                        },
                        "await": false,
                        "start": 16,
                        "end": 38,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 16
                            },
                            "end": {
                                "line": 1,
                                "column": 38
                            }
                        }
                    }
                ],
                "start": 14,
                "end": 40,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 14
                    },
                    "end": {
                        "line": 1,
                        "column": 40
                    }
                }
            },
            "async": false,
            "generator": true,
            "expression": false,
            "id": {
                "type": "Identifier",
                "name": "g",
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
            "start": 0,
            "end": 40,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 40
                }
            }
        }
    ],
    "start": 0,
    "end": 40,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 40
        }
    }
}],
   ['for ( let[x] of [[34]] ) {}', 'for ( let[x] of [[34]] ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
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
                }
            },
            "left": {
                "type": "VariableDeclaration",
                "kind": "let",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": null,
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "x",
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
                                }
                            ],
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
                            }
                        },
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
                        }
                    }
                ],
                "start": 6,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 6
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            },
            "right": {
                "type": "ArrayExpression",
                "elements": [
                    {
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "type": "Literal",
                                raw: null,
                                "value": 34,
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
                                }
                            }
                        ],
                        "start": 17,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 17
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    }
                ],
                "start": 16,
                "end": 22,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 16
                    },
                    "end": {
                        "line": 1,
                        "column": 22
                    }
                }
            },
            "await": false,
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
}],
   ['for (var { x, } of [{ x: 23 }]) {}', 'for (var { x, } of [{ x: 23 }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 32,
                "end": 34,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 32
                    },
                    "end": {
                        "line": 1,
                        "column": 34
                    }
                }
            },
            "left": {
                "type": "VariableDeclaration",
                "kind": "var",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": null,
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                    "method": false,
                                    "shorthand": true,
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
                            "start": 9,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "start": 9,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    }
                ],
                "start": 5,
                "end": 15,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 15
                    }
                }
            },
            "right": {
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
                                    }
                                },
                                "value": {
                                    "type": "Literal",
                                    raw: null,
                                    "value": 23,
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
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": false,
                                "start": 22,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            }
                        ],
                        "start": 20,
                        "end": 29,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 20
                            },
                            "end": {
                                "line": 1,
                                "column": 29
                            }
                        }
                    }
                ],
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
            "await": false,
            "start": 0,
            "end": 34,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 34
                }
            }
        }
    ],
    "start": 0,
    "end": 34,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 34
        }
    }
}],
   ['for ({ x: [ x ] } of [{}]) {}', 'for ({ x: [ x ] } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
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
            "left": {
                "type": "ObjectPattern",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
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
                        "value": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "x",
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
                                }
                            ],
                            "start": 10,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": false,
                        "start": 7,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    }
                ],
                "start": 5,
                "end": 17,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 17
                    }
                }
            },
            "right": {
                "type": "ArrayExpression",
                "elements": [
                    {
                        "type": "ObjectExpression",
                        "properties": [],
                        "start": 22,
                        "end": 24,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 1,
                                "column": 24
                            }
                        }
                    }
                ],
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
                }
            },
            "await": false,
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
}],
   ['for ({ x: [x = yield] } of [{ x: [] }]) {}', 'for ({ x: [x = yield] } of [{ x: [] }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 40,
                "end": 42,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 40
                    },
                    "end": {
                        "line": 1,
                        "column": 42
                    }
                }
            },
            "left": {
                "type": "ObjectPattern",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
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
                        "value": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                        "name": "yield",
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
                                    },
                                    "start": 11,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                }
                            ],
                            "start": 10,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": false,
                        "start": 7,
                        "end": 21,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 21
                            }
                        }
                    }
                ],
                "start": 5,
                "end": 23,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 23
                    }
                }
            },
            "right": {
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
                                "value": {
                                    "type": "ArrayExpression",
                                    "elements": [],
                                    "start": 33,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 33
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 35
                                        }
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": false,
                                "start": 30,
                                "end": 35,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 30
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 35
                                    }
                                }
                            }
                        ],
                        "start": 28,
                        "end": 37,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 28
                            },
                            "end": {
                                "line": 1,
                                "column": 37
                            }
                        }
                    }
                ],
                "start": 27,
                "end": 38,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 27
                    },
                    "end": {
                        "line": 1,
                        "column": 38
                    }
                }
            },
            "await": false,
            "start": 0,
            "end": 42,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 42
                }
            }
        }
    ],
    "start": 0,
    "end": 42,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 42
        }
    }
}],
   ['for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}', 'for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 70,
                "end": 72,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 70
                    },
                    "end": {
                        "line": 1,
                        "column": 72
                    }
                }
            },
            "left": {
                "type": "ObjectPattern",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
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
                        "value": {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "xGen",
                                "start": 10,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "right": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
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
                                    }
                                },
                                "async": false,
                                "generator": true,
                                "expression": false,
                                "id": {
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
                                },
                                "start": 17,
                                "end": 33,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 33
                                    }
                                }
                            },
                            "start": 10,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
                                }
                            }
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": false,
                        "start": 7,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
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
                            "name": "x",
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
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "gen",
                                "start": 38,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 38
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 41
                                    }
                                }
                            },
                            "right": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 56,
                                    "end": 58,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 56
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 58
                                        }
                                    }
                                },
                                "async": false,
                                "generator": true,
                                "expression": false,
                                "id": null,
                                "start": 44,
                                "end": 58,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 44
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 58
                                    }
                                }
                            },
                            "start": 38,
                            "end": 58,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 38
                                },
                                "end": {
                                    "line": 1,
                                    "column": 58
                                }
                            }
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": false,
                        "start": 35,
                        "end": 58,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 35
                            },
                            "end": {
                                "line": 1,
                                "column": 58
                            }
                        }
                    }
                ],
                "start": 5,
                "end": 60,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 60
                    }
                }
            },
            "right": {
                "type": "ArrayExpression",
                "elements": [
                    {
                        "type": "ObjectExpression",
                        "properties": [],
                        "start": 65,
                        "end": 67,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 65
                            },
                            "end": {
                                "line": 1,
                                "column": 67
                            }
                        }
                    }
                ],
                "start": 64,
                "end": 68,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 64
                    },
                    "end": {
                        "line": 1,
                        "column": 68
                    }
                }
            },
            "await": false,
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
}],
   ['for ({ y: x = 1 } of [{ y: undefined }]) {}', 'for ({ y: x = 1 } of [{ y: undefined }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 41,
                "end": 43,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 41
                    },
                    "end": {
                        "line": 1,
                        "column": 43
                    }
                }
            },
            "left": {
                "type": "ObjectPattern",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
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
                        },
                        "value": {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "x",
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
                            "right": {
                                "type": "Literal",
                                raw: null,
                                "value": 1,
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
                            "start": 10,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": false,
                        "start": 7,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 7
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    }
                ],
                "start": 5,
                "end": 17,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 17
                    }
                }
            },
            "right": {
                "type": "ArrayExpression",
                "elements": [
                    {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y",
                                    "start": 24,
                                    "end": 25,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 25
                                        }
                                    }
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "undefined",
                                    "start": 27,
                                    "end": 36,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 36
                                        }
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": false,
                                "start": 24,
                                "end": 36,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 36
                                    }
                                }
                            }
                        ],
                        "start": 22,
                        "end": 38,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 22
                            },
                            "end": {
                                "line": 1,
                                "column": 38
                            }
                        }
                    }
                ],
                "start": 21,
                "end": 39,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 21
                    },
                    "end": {
                        "line": 1,
                        "column": 39
                    }
                }
            },
            "await": false,
            "start": 0,
            "end": 43,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 43
                }
            }
        }
    ],
    "start": 0,
    "end": 43,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 43
        }
    }
}],
   ['for ({ x = y } of [{}]) {}', 'for ({ x = y } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForOfStatement",
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
            "left": {
                "type": "ObjectPattern",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
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
                        "value": {
                            "type": "AssignmentPattern",
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
                                "type": "Identifier",
                                "name": "y",
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
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": true,
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
                    }
                ],
                "start": 5,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            },
            "right": {
                "type": "ArrayExpression",
                "elements": [
                    {
                        "type": "ObjectExpression",
                        "properties": [],
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
                    }
                ],
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
                }
            },
            "await": false,
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
}]
];

pass('Statements - For of (pass)', valids);

});

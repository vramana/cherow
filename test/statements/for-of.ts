import { pass, fail } from '../utils';

describe('Statements - For of', () => {
    
    pass(`"use strict";  for (var value of arguments) {  }`, {
        source: '"use strict";  for (var value of arguments) {  }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Literal",
                        "value": "use strict",
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
                        "raw": "\"use strict\""
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
                },
                {
                    "type": "ForOfStatement",
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
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
                    "left": {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": null,
                                "id": {
                                    "type": "Identifier",
                                    "name": "value",
                                    "start": 24,
                                    "end": 29,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 24
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 29
                                        }
                                    }
                                },
                                "start": 24,
                                "end": 29,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 29
                                    }
                                }
                            }
                        ],
                        "kind": "var",
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
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "arguments",
                        "start": 33,
                        "end": 42,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 33
                            },
                            "end": {
                                "line": 1,
                                "column": 42
                            }
                        }
                    },
                    "await": false,
                    "start": 15,
                    "end": 48,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 15
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                }
            ],
            "sourceType": "script",
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
        }
    });

    pass(`for (var x of list) process(x);`, {
            source: 'for (var x of list) process(x);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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

        pass(`for(var a of b);`, {
            source: 'for(var a of b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
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
                        "await": false,
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

        pass(`for(a of b);`, {
            source: 'for(a of b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
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
                        "await": false,
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

        pass(`for(let [a] of b);`, {
            source: 'for(let [a] of b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
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
                                        "type": "ArrayPattern",
                                        "elements": [
                                            {
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
                                            }
                                        ],
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
                                }
                            ],
                            "kind": "let",
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

        pass(`for(let of of b);`, {
            source: 'for(let of of b);',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ForOfStatement",
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
                        "await": false,
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

        pass(`function a(a, b, c) { 'use strict';  for (var value of x) {   a = b;  } }`, {
            source: 'function a(a, b, c) { "use strict";  for (var value of x) {   a = b;  } }',
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
                            {
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
                            {
                                "type": "Identifier",
                                "name": "c",
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
                            }
                        ],
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "Literal",
                                        "value": "use strict",
                                        "start": 22,
                                        "end": 34,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 22
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 34
                                            }
                                        },
                                        "raw": "\"use strict\""
                                    },
                                    "start": 22,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 22
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 35
                                        }
                                    }
                                },
                                {
                                    "type": "ForOfStatement",
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ExpressionStatement",
                                                "expression": {
                                                    "type": "AssignmentExpression",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "a",
                                                        "start": 62,
                                                        "end": 63,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 62
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 63
                                                            }
                                                        }
                                                    },
                                                    "operator": "=",
                                                    "right": {
                                                        "type": "Identifier",
                                                        "name": "b",
                                                        "start": 66,
                                                        "end": 67,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 66
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 67
                                                            }
                                                        }
                                                    },
                                                    "start": 62,
                                                    "end": 67,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 62
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 67
                                                        }
                                                    }
                                                },
                                                "start": 62,
                                                "end": 68,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 62
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 68
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 58,
                                        "end": 71,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 58
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 71
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
                                                    "name": "value",
                                                    "start": 46,
                                                    "end": 51,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 46
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 51
                                                        }
                                                    }
                                                },
                                                "start": 46,
                                                "end": 51,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 46
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 51
                                                    }
                                                }
                                            }
                                        ],
                                        "kind": "var",
                                        "start": 42,
                                        "end": 51,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 42
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 51
                                            }
                                        }
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 55,
                                        "end": 56,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 55
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 56
                                            }
                                        }
                                    },
                                    "await": false,
                                    "start": 37,
                                    "end": 71,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 37
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 71
                                        }
                                    }
                                }
                            ],
                            "start": 20,
                            "end": 73,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 73
                                }
                            }
                        },
                        "async": false,
                        "generator": false,
                        "expression": false,
                        "id": {
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
                        "start": 0,
                        "end": 73,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 73
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 73,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 73
                    }
                }
            }
        });
        
        fail(`for ([[(x, y)]] of [[[]]]) ;`, {
            source: 'for ([[(x, y)]] of [[[]]]) ;',
        });

        fail(`for(let of 0);`, {
            source: 'for(let of 0);',
        });

        fail(`for(this of 0);`, {
            source: 'for(this of 0);',
        });

        fail(`for(let.let of 0);`, {
            source: 'for(let.let of 0);',
        }); 

        fail(`for (a=12 of e) break;`, {
            source: 'for (a=12 of e) break;',
        });

        fail(`for(let of 0);`, {
            source: 'for(let of 0);',
        });

        fail(`for(this of 0);`, {
            source: 'for(this of 0);',
        });

        fail(`for(var a = 0 of b);`, {
            source: 'for(var a = 0 of b);',
        });

        fail(`for(let a = 0 of b);`, {
            source: 'for(let a = 0 of b);',
        });

        fail(`for(const a = 0 of b);`, {
            source: 'for(const a = 0 of b);',
        });

        fail(`for(({a}) of 0);`, {
            source: 'for(({a}) of 0);',
        });

        fail(`for(([a]) of 0);`, {
            source: 'for(([a]) of 0);',
        });

        fail(`for(var a of b, c);`, {
            source: 'for(var a of b, c);',
        });

        fail(`for(a of b, c);`, {
            source: 'for(a of b, c);',
        });
        
});
            
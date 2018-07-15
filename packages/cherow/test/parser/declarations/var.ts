import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Var', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['var {x=1, y=2} = o', 'var {x=1, y=2} = o', Context.OptionsRanges | Context.OptionsLoc, {
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
                        "type": "Identifier",
                        "name": "o",
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
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "x",
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
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "x",
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
                                        "type": "Literal",
                                        raw: null,
                                        "value": 1,
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
                                    }
                                },
                                "method": false,
                                "shorthand": true,
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
                                }
                            },
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "y",
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
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "y",
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
                                        "value": 2,
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
                                    "start": 10,
                                    "end": 13,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 13
                                        }
                                    }
                                },
                                "method": false,
                                "shorthand": true,
                                "start": 10,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                }
                            }
                        ],
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
                        }
                    },
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
  ['var a;', 'var a;', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "VariableDeclaration",
            "kind": "var",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "init": null,
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
                }
            ],
            "start": 0,
            "end": 6,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 6
                }
            }
        }
    ],
    "start": 0,
    "end": 6,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 6
        }
    }
}],
  ['var {a: [o, {p}]} = d;', 'var {a: [o, {p}]} = d;', Context.OptionsRanges | Context.OptionsLoc, {
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
                        "type": "Identifier",
                        "name": "d",
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
                    "id": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
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
                                "computed": false,
                                "value": {
                                    "type": "ArrayPattern",
                                    "elements": [
                                        {
                                            "type": "Identifier",
                                            "name": "o",
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
                                        {
                                            "type": "ObjectPattern",
                                            "properties": [
                                                {
                                                    "type": "Property",
                                                    "kind": "init",
                                                    "key": {
                                                        "type": "Identifier",
                                                        "name": "p",
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
                                                    "computed": false,
                                                    "value": {
                                                        "type": "Identifier",
                                                        "name": "p",
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
                                                    "method": false,
                                                    "shorthand": true,
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
                                                }
                                            ],
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
                                            }
                                        }
                                    ],
                                    "start": 8,
                                    "end": 16,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 16
                                        }
                                    }
                                },
                                "method": false,
                                "shorthand": false,
                                "start": 5,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            }
                        ],
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
                        }
                    },
                    "start": 4,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 21
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
  ['var a = [ , 1 ], b = [ 1, ], c = [ 1, , 2 ], d = [ 1, , , ];', 'var a = [ , 1 ], b = [ 1, ], c = [ 1, , 2 ], d = [ 1, , , ];', Context.OptionsRanges | Context.OptionsLoc, {
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
                        "type": "ArrayExpression",
                        "elements": [
                            null,
                            {
                                "type": "Literal",
                                raw: null,
                                "value": 1,
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
                        "start": 8,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 1,
                                "column": 15
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
                    "end": 15,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                },
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "type": "Literal",
                                raw: null,
                                "value": 1,
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
                        "start": 21,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 21
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "b",
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
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "type": "Literal",
                                raw: null,
                                "value": 1,
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
                            null,
                            {
                                "type": "Literal",
                                raw: null,
                                "value": 2,
                                "start": 40,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 40
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 41
                                    }
                                }
                            }
                        ],
                        "start": 33,
                        "end": 43,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 33
                            },
                            "end": {
                                "line": 1,
                                "column": 43
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "c",
                        "start": 29,
                        "end": 30,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 29
                            },
                            "end": {
                                "line": 1,
                                "column": 30
                            }
                        }
                    },
                    "start": 29,
                    "end": 43,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 29
                        },
                        "end": {
                            "line": 1,
                            "column": 43
                        }
                    }
                },
                {
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ArrayExpression",
                        "elements": [
                            {
                                "type": "Literal",
                                raw: null,
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
                                }
                            },
                            null,
                            null
                        ],
                        "start": 49,
                        "end": 59,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 49
                            },
                            "end": {
                                "line": 1,
                                "column": 59
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "d",
                        "start": 45,
                        "end": 46,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 45
                            },
                            "end": {
                                "line": 1,
                                "column": 46
                            }
                        }
                    },
                    "start": 45,
                    "end": 59,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 45
                        },
                        "end": {
                            "line": 1,
                            "column": 59
                        }
                    }
                }
            ],
            "start": 0,
            "end": 60,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 60
                }
            }
        }
    ],
    "start": 0,
    "end": 60,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 60
        }
    }
}],
  ['var TRIM = "trim" in String.prototype;', 'var TRIM = "trim" in String.prototype;', Context.OptionsRanges | Context.OptionsLoc, {
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
                        "type": "BinaryExpression",
                        "left": {
                            "type": "Literal",
                            raw: null,
                            "value": "trim",
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
                        "right": {
                            "type": "MemberExpression",
                            "object": {
                                "type": "Identifier",
                                "name": "String",
                                "start": 21,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 21
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "prototype",
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
                            },
                            "start": 21,
                            "end": 37,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 21
                                },
                                "end": {
                                    "line": 1,
                                    "column": 37
                                }
                            }
                        },
                        "operator": "in",
                        "start": 11,
                        "end": 37,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 37
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "TRIM",
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
                        }
                    },
                    "start": 4,
                    "end": 37,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 37
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
  ['var foo = { eval: 1 };', 'var foo = { eval: 1 };', Context.OptionsRanges | Context.OptionsLoc, {
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
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "eval",
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
                                },
                                "value": {
                                    "type": "Literal",
                                    raw: null,
                                    "value": 1,
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
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": false,
                                "start": 12,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
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
                    "id": {
                        "type": "Identifier",
                        "name": "foo",
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
                    "start": 4,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 21
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
  ['var foo = /a/g', 'var foo = /a/g', Context.OptionsRanges, {
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
                        "value": {},
                        "regex": {
                            "pattern": "a",
                            "flags": "g"
                        },
                        "start": 10,
                        "end": 14
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "foo",
                        "start": 4,
                        "end": 7
                    },
                    "start": 4,
                    "end": 14
                }
            ],
            "start": 0,
            "end": 14
        }
    ],
    "start": 0,
    "end": 14
}],

  ['var chinese;', 'var chinese;', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'VariableDeclaration',
            'kind': 'var',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'init': null,
                    'id': {
                        'type': 'Identifier',
                        'name': 'chinese',
                        'start': 4,
                        'end': 11
                    },
                    'start': 4,
                    'end': 11
                }
            ],
            'start': 0,
            'end': 12
        }
    ],
    'start': 0,
    'end': 12
}],
['var foo = bar;', 'var foo = bar;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'bar',
                      'start': 10,
                      'end': 13,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 10
                          },
                          'end': {
                              'line': 1,
                              'column': 13
                          }
                      }
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 4,
                      'end': 7,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 7
                          }
                      }
                  },
                  'start': 4,
                  'end': 13,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 13
                      }
                  }
              }
          ],
          'start': 0,
          'end': 14,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 14
              }
          }
      }
  ],
  'start': 0,
  'end': 14,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 14
      }
  }
}],
['var [] = x;', 'var [] = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 9,
                      'end': 10,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 9
                          },
                          'end': {
                              'line': 1,
                              'column': 10
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [],
                      'start': 4,
                      'end': 6,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 6
                          }
                      }
                  },
                  'start': 4,
                  'end': 10,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 10
                      }
                  }
              }
          ],
          'start': 0,
          'end': 11,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 11
              }
          }
      }
  ],
  'start': 0,
  'end': 11,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 11
      }
  }
}],
['var [foo=a] = c;', 'var [foo=a] = c;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'c',
                      'start': 14,
                      'end': 15,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 15
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 5,
                                  'end': 8,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 5
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 8
                                      }
                                  }
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 9,
                                  'end': 10,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 9
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 10
                                      }
                                  }
                              },
                              'start': 5,
                              'end': 10,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 5
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 10
                                  }
                              }
                          }
                      ],
                      'start': 4,
                      'end': 11,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 11
                          }
                      }
                  },
                  'start': 4,
                  'end': 15,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 15
                      }
                  }
              }
          ],
          'start': 0,
          'end': 16,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 16
              }
          }
      }
  ],
  'start': 0,
  'end': 16,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 16
      }
  }
}],
['var [foo] = x;', 'var [foo] = x;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'VariableDeclaration',
            'kind': 'var',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 12,
                        'end': 13,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 12
                            },
                            'end': {
                                'line': 1,
                                'column': 13
                            }
                        }
                    },
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 5,
                                'end': 8,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 5
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 8
                                    }
                                }
                            }
                        ],
                        'start': 4,
                        'end': 9,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 4
                            },
                            'end': {
                                'line': 1,
                                'column': 9
                            }
                        }
                    },
                    'start': 4,
                    'end': 13,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 13
                        }
                    }
                }
            ],
            'start': 0,
            'end': 14,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 14
                }
            }
        }
    ],
    'start': 0,
    'end': 14,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 14
        }
    }
}],
['var {} = x;', 'var {} = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 9,
                      'end': 10,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 9
                          },
                          'end': {
                              'line': 1,
                              'column': 10
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [],
                      'start': 4,
                      'end': 6,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 6
                          }
                      }
                  },
                  'start': 4,
                  'end': 10,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 10
                      }
                  }
              }
          ],
          'start': 0,
          'end': 11,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 11
              }
          }
      }
  ],
  'start': 0,
  'end': 11,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 11
      }
  }
}],
['var {foo,bar} = x;', 'var {foo,bar} = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 16,
                      'end': 17,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 16
                          },
                          'end': {
                              'line': 1,
                              'column': 17
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 5,
                                  'end': 8,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 5
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 8
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 5,
                                  'end': 8,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 5
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 8
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': true,
                              'start': 5,
                              'end': 8,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 5
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 8
                                  }
                              }
                          },
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 9,
                                  'end': 12,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 9
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 12
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 9,
                                  'end': 12,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 9
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 12
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': true,
                              'start': 9,
                              'end': 12,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 9
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 12
                                  }
                              }
                          }
                      ],
                      'start': 4,
                      'end': 13,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 13
                          }
                      }
                  },
                  'start': 4,
                  'end': 17,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 17
                      }
                  }
              }
          ],
          'start': 0,
          'end': 18,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 18
              }
          }
      }
  ],
  'start': 0,
  'end': 18,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 18
      }
  }
}],
['var {foo} = x, b;', 'var {foo} = x, b;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 12,
                      'end': 13,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 12
                          },
                          'end': {
                              'line': 1,
                              'column': 13
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 5,
                                  'end': 8,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 5
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 8
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 5,
                                  'end': 8,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 5
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 8
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': true,
                              'start': 5,
                              'end': 8,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 5
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 8
                                  }
                              }
                          }
                      ],
                      'start': 4,
                      'end': 9,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 9
                          }
                      }
                  },
                  'start': 4,
                  'end': 13,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 13
                      }
                  }
              },
              {
                  'type': 'VariableDeclarator',
                  'init': null,
                  'id': {
                      'type': 'Identifier',
                      'name': 'b',
                      'start': 15,
                      'end': 16,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 15
                          },
                          'end': {
                              'line': 1,
                              'column': 16
                          }
                      }
                  },
                  'start': 15,
                  'end': 16,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 15
                      },
                      'end': {
                          'line': 1,
                          'column': 16
                      }
                  }
              }
          ],
          'start': 0,
          'end': 17,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 17
              }
          }
      }
  ],
  'start': 0,
  'end': 17,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 17
      }
  }
}],
['var x = y, {foo} = z;', 'var x = y, {foo} = z;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 8,
                      'end': 9,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 8
                          },
                          'end': {
                              'line': 1,
                              'column': 9
                          }
                      }
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 4,
                      'end': 5,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 5
                          }
                      }
                  },
                  'start': 4,
                  'end': 9,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 9
                      }
                  }
              },
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'z',
                      'start': 19,
                      'end': 20,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 19
                          },
                          'end': {
                              'line': 1,
                              'column': 20
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 12,
                                  'end': 15,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 12
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 15
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 12,
                                  'end': 15,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 12
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 15
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': true,
                              'start': 12,
                              'end': 15,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 12
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 15
                                  }
                              }
                          }
                      ],
                      'start': 11,
                      'end': 16,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 11
                          },
                          'end': {
                              'line': 1,
                              'column': 16
                          }
                      }
                  },
                  'start': 11,
                  'end': 20,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 11
                      },
                      'end': {
                          'line': 1,
                          'column': 20
                      }
                  }
              }
          ],
          'start': 0,
          'end': 21,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 21
              }
          }
      }
  ],
  'start': 0,
  'end': 21,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 21
      }
  }
}],
['var x, {foo} = y;', 'var x, {foo} = y;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': null,
                  'id': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 4,
                      'end': 5,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 5
                          }
                      }
                  },
                  'start': 4,
                  'end': 5,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 5
                      }
                  }
              },
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 15,
                      'end': 16,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 15
                          },
                          'end': {
                              'line': 1,
                              'column': 16
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 8,
                                  'end': 11,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 8
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 11
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 8,
                                  'end': 11,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 8
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 11
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': true,
                              'start': 8,
                              'end': 11,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 8
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 11
                                  }
                              }
                          }
                      ],
                      'start': 7,
                      'end': 12,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 7
                          },
                          'end': {
                              'line': 1,
                              'column': 12
                          }
                      }
                  },
                  'start': 7,
                  'end': 16,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 7
                      },
                      'end': {
                          'line': 1,
                          'column': 16
                      }
                  }
              }
          ],
          'start': 0,
          'end': 17,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 17
              }
          }
      }
  ],
  'start': 0,
  'end': 17,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 17
      }
  }
}],
['var [a=[...b], ...c] = obj;', 'var [a=[...b], ...c] = obj;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'obj',
                      'start': 23,
                      'end': 26,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 23
                          },
                          'end': {
                              'line': 1,
                              'column': 26
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 5,
                                  'end': 6,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 5
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 6
                                      }
                                  }
                              },
                              'right': {
                                  'type': 'ArrayExpression',
                                  'elements': [
                                      {
                                          'type': 'SpreadElement',
                                          'argument': {
                                              'type': 'Identifier',
                                              'name': 'b',
                                              'start': 11,
                                              'end': 12,
                                              'loc': {
                                                  'start': {
                                                      'line': 1,
                                                      'column': 11
                                                  },
                                                  'end': {
                                                      'line': 1,
                                                      'column': 12
                                                  }
                                              }
                                          },
                                          'start': 8,
                                          'end': 12,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 8
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 12
                                              }
                                          }
                                      }
                                  ],
                                  'start': 7,
                                  'end': 13,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 7
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 13
                                      }
                                  }
                              },
                              'start': 5,
                              'end': 13,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 5
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 13
                                  }
                              }
                          },
                          {
                              'type': 'RestElement',
                              'argument': {
                                  'type': 'Identifier',
                                  'name': 'c',
                                  'start': 18,
                                  'end': 19,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 18
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 19
                                      }
                                  }
                              },
                              'start': 15,
                              'end': 19,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 15
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 19
                                  }
                              }
                          }
                      ],
                      'start': 4,
                      'end': 20,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 20
                          }
                      }
                  },
                  'start': 4,
                  'end': 26,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 26
                      }
                  }
              }
          ],
          'start': 0,
          'end': 27,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 27
              }
          }
      }
  ],
  'start': 0,
  'end': 27,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 27
      }
  }
}],
['var x = y, [foo] = z;', 'var x = y, [foo] = z;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 8,
                      'end': 9,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 8
                          },
                          'end': {
                              'line': 1,
                              'column': 9
                          }
                      }
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 4,
                      'end': 5,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 5
                          }
                      }
                  },
                  'start': 4,
                  'end': 9,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 9
                      }
                  }
              },
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'z',
                      'start': 19,
                      'end': 20,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 19
                          },
                          'end': {
                              'line': 1,
                              'column': 20
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 12,
                              'end': 15,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 12
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 15
                                  }
                              }
                          }
                      ],
                      'start': 11,
                      'end': 16,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 11
                          },
                          'end': {
                              'line': 1,
                              'column': 16
                          }
                      }
                  },
                  'start': 11,
                  'end': 20,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 11
                      },
                      'end': {
                          'line': 1,
                          'column': 20
                      }
                  }
              }
          ],
          'start': 0,
          'end': 21,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 21
              }
          }
      }
  ],
  'start': 0,
  'end': 21,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 21
      }
  }
}],
['var [foo] = x, [foo] = y;', 'var [foo] = x, [foo] = y;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 12,
                      'end': 13,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 12
                          },
                          'end': {
                              'line': 1,
                              'column': 13
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 5,
                              'end': 8,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 5
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 8
                                  }
                              }
                          }
                      ],
                      'start': 4,
                      'end': 9,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 9
                          }
                      }
                  },
                  'start': 4,
                  'end': 13,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 13
                      }
                  }
              },
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 23,
                      'end': 24,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 23
                          },
                          'end': {
                              'line': 1,
                              'column': 24
                          }
                      }
                  },
                  'id': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 16,
                              'end': 19,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 16
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 19
                                  }
                              }
                          }
                      ],
                      'start': 15,
                      'end': 20,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 15
                          },
                          'end': {
                              'line': 1,
                              'column': 20
                          }
                      }
                  },
                  'start': 15,
                  'end': 24,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 15
                      },
                      'end': {
                          'line': 1,
                          'column': 24
                      }
                  }
              }
          ],
          'start': 0,
          'end': 25,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 25
              }
          }
      }
  ],
  'start': 0,
  'end': 25,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 25
      }
  }
}],
['var foo = let = 1', 'var foo = let = 1', Context.OptionsRanges | Context.OptionsLoc, {
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
                      "type": "AssignmentExpression",
                      "left": {
                          "type": "Identifier",
                          "name": "let",
                          "start": 10,
                          "end": 13,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 13
                              }
                          }
                      },
                      "operator": "=",
                      "right": {
                          "type": "Literal",
                          raw: null,
                          "value": 1,
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
                      "start": 10,
                      "end": 17,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 17
                          }
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "name": "foo",
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
}],
['var foo = {}; foo.if;', 'var foo = {}; foo.if;', Context.OptionsRanges | Context.OptionsLoc, {
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
                      "type": "ObjectExpression",
                      "properties": [],
                      "start": 10,
                      "end": 12,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 12
                          }
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "name": "foo",
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
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "MemberExpression",
              "object": {
                  "type": "Identifier",
                  "name": "foo",
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
              "computed": false,
              "property": {
                  "type": "Identifier",
                  "name": "if",
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
              },
              "start": 14,
              "end": 20,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 14
                  },
                  "end": {
                      "line": 1,
                      "column": 20
                  }
              }
          },
          "start": 14,
          "end": 21,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 14
              },
              "end": {
                  "line": 1,
                  "column": 21
              }
          }
      }
  ],
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
  }
}],
['var {foo:a} = x;', 'var {foo:a} = x;', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'var',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 14,
                      'end': 15,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 15
                          }
                      }
                  },
                  'id': {
                      'type': 'ObjectPattern',
                      'properties': [
                          {
                              'type': 'Property',
                              'kind': 'init',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 5,
                                  'end': 8,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 5
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 8
                                      }
                                  }
                              },
                              'computed': false,
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 9,
                                  'end': 10,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 9
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 10
                                      }
                                  }
                              },
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 10,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 5
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 10
                                  }
                              }
                          }
                      ],
                      'start': 4,
                      'end': 11,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 4
                          },
                          'end': {
                              'line': 1,
                              'column': 11
                          }
                      }
                  },
                  'start': 4,
                  'end': 15,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 4
                      },
                      'end': {
                          'line': 1,
                          'column': 15
                      }
                  }
              }
          ],
          'start': 0,
          'end': 16,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 16
              }
          }
      }
  ],
  'start': 0,
  'end': 16,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 16
      }
  }
}],
];


const invalids: Array < [string, string, Context, any] > = [
  ['var x += 1;', 'var x += 1;', Context.Empty, {}],
  ['var x && 1;', 'var x && 1;', Context.Empty, {}],
  ['var var = 2000000;', 'var var = 2000000;', Context.Empty, {}],
  ['var [var] = obj', 'var [var] = obj', Context.Empty, {}],
  ['var {a};', 'var {a};', Context.Empty, {}],
  ['var (a)=0;;', 'var (a)=0;', Context.Empty, {}],
  ['var a[0]=0;', 'var a[0]=0;', Context.Empty, {}],
  ['var a.b;', 'var a.b;', Context.Empty, {}],
];

fail('Declarations - Var (failures)', invalids);
pass('Declarations - Var (pass)', valids);

});

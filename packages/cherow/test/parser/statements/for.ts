import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - For', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [


  ['for(x; x < 0;);', 'for(x; x < 0;);', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
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
}],
  ['for(x = 0;;);', 'for (var { cover = (function () {}), xCover = (0, function() {})  } = {}; a < 1; ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 83,
                "end": 85,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 83
                    },
                    "end": {
                        "line": 1,
                        "column": 85
                    }
                }
            },
            "init": {
                "type": "VariableDeclaration",
                "kind": "var",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ObjectExpression",
                            "properties": [],
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
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "cover",
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
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "cover",
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
                                            }
                                        },
                                        "right": {
                                            "type": "FunctionExpression",
                                            "params": [],
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
                                            "async": false,
                                            "generator": false,
                                            "expression": false,
                                            "id": null,
                                            "start": 20,
                                            "end": 34,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 20
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 34
                                                }
                                            }
                                        },
                                        "start": 11,
                                        "end": 35,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 11
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 35
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 11,
                                    "end": 35,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 35
                                        }
                                    }
                                },
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "xCover",
                                        "start": 37,
                                        "end": 43,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 37
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 43
                                            }
                                        }
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "xCover",
                                            "start": 37,
                                            "end": 43,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 37
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 43
                                                }
                                            }
                                        },
                                        "right": {
                                            "type": "SequenceExpression",
                                            "expressions": [
                                                {
                                                    "type": "Literal",
                                                    raw: null,
                                                    "value": 0,
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
                                                {
                                                    "type": "FunctionExpression",
                                                    "params": [],
                                                    "body": {
                                                        "type": "BlockStatement",
                                                        "body": [],
                                                        "start": 61,
                                                        "end": 63,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 61
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 63
                                                            }
                                                        }
                                                    },
                                                    "async": false,
                                                    "generator": false,
                                                    "expression": false,
                                                    "id": null,
                                                    "start": 50,
                                                    "end": 63,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 50
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 63
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 47,
                                            "end": 63,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 47
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 63
                                                }
                                            }
                                        },
                                        "start": 37,
                                        "end": 64,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 37
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 64
                                            }
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true,
                                    "start": 37,
                                    "end": 64,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 37
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 64
                                        }
                                    }
                                }
                            ],
                            "start": 9,
                            "end": 67,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 9
                                },
                                "end": {
                                    "line": 1,
                                    "column": 67
                                }
                            }
                        },
                        "start": 9,
                        "end": 72,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 72
                            }
                        }
                    }
                ],
                "start": 5,
                "end": 72,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 5
                    },
                    "end": {
                        "line": 1,
                        "column": 72
                    }
                }
            },
            "test": {
                "type": "BinaryExpression",
                "left": {
                    "type": "Identifier",
                    "name": "a",
                    "start": 74,
                    "end": 75,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 74
                        },
                        "end": {
                            "line": 1,
                            "column": 75
                        }
                    }
                },
                "right": {
                    "type": "Literal",
                    raw: null,
                    "value": 1,
                    "start": 78,
                    "end": 79,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 78
                        },
                        "end": {
                            "line": 1,
                            "column": 79
                        }
                    }
                },
                "operator": "<",
                "start": 74,
                "end": 79,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 74
                    },
                    "end": {
                        "line": 1,
                        "column": 79
                    }
                }
            },
            "update": null,
            "start": 0,
            "end": 85,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 85
                }
            }
        }
    ],
    "start": 0,
    "end": 85,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 85
        }
    }
}],
  ['for (var [x] = []; a < 1; ) {}', 'for (var [x] = []; a < 1; ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 28,
                "end": 30,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 28
                    },
                    "end": {
                        "line": 1,
                        "column": 30
                    }
                }
            },
            "init": {
                "type": "VariableDeclaration",
                "kind": "var",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ArrayExpression",
                            "elements": [],
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
                            }
                        },
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
            "test": {
                "type": "BinaryExpression",
                "left": {
                    "type": "Identifier",
                    "name": "a",
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
                "right": {
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
                },
                "operator": "<",
                "start": 19,
                "end": 24,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 19
                    },
                    "end": {
                        "line": 1,
                        "column": 24
                    }
                }
            },
            "update": null,
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
}],
  ['for (var [x = 23] = [,]; t < 1; ) {}', 'for (var [x = 23] = [,]; t < 1; ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
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
                }
            },
            "init": {
                "type": "VariableDeclaration",
                "kind": "var",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ArrayExpression",
                            "elements": [
                                null
                            ],
                            "start": 20,
                            "end": 23,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 20
                                },
                                "end": {
                                    "line": 1,
                                    "column": 23
                                }
                            }
                        },
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
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
                                        "value": 23,
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
                                    "start": 10,
                                    "end": 16,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 16
                                        }
                                    }
                                }
                            ],
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
            "test": {
                "type": "BinaryExpression",
                "left": {
                    "type": "Identifier",
                    "name": "t",
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
                    }
                },
                "right": {
                    "type": "Literal",
                    raw: null,
                    "value": 1,
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
                "operator": "<",
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
            "update": null,
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
  ['for(x = 0;;);', 'for(x = 0;;);', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
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
                    raw: null,
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
}]
];

pass('Statements - For (pass)', valids);

});

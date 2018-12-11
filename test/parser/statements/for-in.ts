import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - For in', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['for(x in {}, {}) {}', 'for(x in {}, {}) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 17,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'left': {
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
            'right': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
                        'start': 9,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
                        'start': 13,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    }
                ],
                'start': 9,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'start': 0,
            'end': 19,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 19
                }
            }
        }
    ],
    'start': 0,
    'end': 19,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 19
        }
    }
}], /*
   ['for(const x in {}, {}) {}', 'for(const x in {}, {}) {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ForInStatement",
            "body": {
                "type": "BlockStatement",
                "body": [],
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
            "left": {
                "type": "VariableDeclaration",
                "kind": "const",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": null,
                        "id": {
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
                "type": "SequenceExpression",
                "expressions": [
                    {
                        "type": "ObjectExpression",
                        "properties": [],
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
                "start": 15,
                "end": 21,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 15
                    },
                    "end": {
                        "line": 1,
                        "column": 21
                    }
                }
            },
            "start": 0,
            "end": 25,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 25
                }
            }
        }
    ],
    "start": 0,
    "end": 25,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 25
        }
    }
}],*/
   ['for([{a=0}] in b);', 'for([{a=0}] in b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 17,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'left': {
                'type': 'ArrayPattern',
                'elements': [
                    {
                        'type': 'ObjectPattern',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'a',
                                    'start': 6,
                                    'end': 7,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 6
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 7
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'a',
                                        'start': 6,
                                        'end': 7,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 6
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 7
                                            }
                                        }
                                    },
                                    'right': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 0,
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
                                    'start': 6,
                                    'end': 9,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 6
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 9
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': true,
                                'start': 6,
                                'end': 9,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 6
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 9
                                    }
                                }
                            }
                        ],
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
            'right': {
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
   ['for(let [a = 1] in []) {}', 'for(let [a = 1] in []) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 23,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 23
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
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
                                    'right': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 1,
                                        'start': 13,
                                        'end': 14,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 13
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 14
                                            }
                                        }
                                    },
                                    'start': 9,
                                    'end': 14,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 9
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 14
                                        }
                                    }
                                }
                            ],
                            'start': 8,
                            'end': 15,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 8
                                },
                                'end': {
                                    'line': 1,
                                    'column': 15
                                }
                            }
                        },
                        'start': 8,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 8
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    }
                ],
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
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [],
                'start': 19,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 19
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
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
   ['for(const {a} in []){}', 'for(const {a} in []){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 20,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'a',
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
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'a',
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
                                    'method': false,
                                    'shorthand': true,
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
                                }
                            ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [],
                'start': 17,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'start': 0,
            'end': 22,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 22
                }
            }
        }
    ],
    'start': 0,
    'end': 22,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 22
        }
    }
}],
   ['for(const {[Symbol.iterator]: a} in []){}', 'for(const {[Symbol.iterator]: a} in []){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 39,
                'end': 41,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 39
                    },
                    'end': {
                        'line': 1,
                        'column': 41
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'MemberExpression',
                                        'object': {
                                            'type': 'Identifier',
                                            'name': 'Symbol',
                                            'start': 12,
                                            'end': 18,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 12
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 18
                                                }
                                            }
                                        },
                                        'computed': false,
                                        'property': {
                                            'type': 'Identifier',
                                            'name': 'iterator',
                                            'start': 19,
                                            'end': 27,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 19
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 27
                                                }
                                            }
                                        },
                                        'start': 12,
                                        'end': 27,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 12
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 27
                                            }
                                        }
                                    },
                                    'computed': true,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'a',
                                        'start': 30,
                                        'end': 31,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 30
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 31
                                            }
                                        }
                                    },
                                    'method': false,
                                    'shorthand': false,
                                    'start': 11,
                                    'end': 31,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 11
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 31
                                        }
                                    }
                                }
                            ],
                            'start': 10,
                            'end': 32,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 32
                                }
                            }
                        },
                        'start': 10,
                        'end': 32,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 10
                            },
                            'end': {
                                'line': 1,
                                'column': 32
                            }
                        }
                    }
                ],
                'start': 4,
                'end': 32,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 32
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [],
                'start': 36,
                'end': 38,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 36
                    },
                    'end': {
                        'line': 1,
                        'column': 38
                    }
                }
            },
            'start': 0,
            'end': 41,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 41
                }
            }
        }
    ],
    'start': 0,
    'end': 41,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 41
        }
    }
}],
   ['for([a = 1, ...b] in []){}', 'for([a = 1, ...b] in []){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 24,
                'end': 26,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 24
                    },
                    'end': {
                        'line': 1,
                        'column': 26
                    }
                }
            },
            'left': {
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
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
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
                    },
                    {
                        'type': 'RestElement',
                        'argument': {
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
                        'start': 12,
                        'end': 16,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 12
                            },
                            'end': {
                                'line': 1,
                                'column': 16
                            }
                        }
                    }
                ],
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
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [],
                'start': 21,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            },
            'start': 0,
            'end': 26,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 26
                }
            }
        }
    ],
    'start': 0,
    'end': 26,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 26
        }
    }
}],
   ['for({[Symbol.iterator]: a} in []){}', 'for({[Symbol.iterator]: a} in []){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 33,
                'end': 35,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 33
                    },
                    'end': {
                        'line': 1,
                        'column': 35
                    }
                }
            },
            'left': {
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
                        'key': {
                            'type': 'MemberExpression',
                            'object': {
                                'type': 'Identifier',
                                'name': 'Symbol',
                                'start': 6,
                                'end': 12,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 6
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 12
                                    }
                                }
                            },
                            'computed': false,
                            'property': {
                                'type': 'Identifier',
                                'name': 'iterator',
                                'start': 13,
                                'end': 21,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 21
                                    }
                                }
                            },
                            'start': 6,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 6
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        },
                        'value': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 24,
                            'end': 25,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 24
                                },
                                'end': {
                                    'line': 1,
                                    'column': 25
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': true,
                        'method': false,
                        'shorthand': false,
                        'start': 5,
                        'end': 25,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 5
                            },
                            'end': {
                                'line': 1,
                                'column': 25
                            }
                        }
                    }
                ],
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
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [],
                'start': 30,
                'end': 32,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 30
                    },
                    'end': {
                        'line': 1,
                        'column': 32
                    }
                }
            },
            'start': 0,
            'end': 35,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 35
                }
            }
        }
    ],
    'start': 0,
    'end': 35,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 35
        }
    }
}],
   ['for({0: a} in []){}', 'for({0: a} in []){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 17,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'left': {
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
                        'key': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0,
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
                        'value': {
                            'type': 'Identifier',
                            'name': 'a',
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
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 5,
                        'end': 9,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 5
                            },
                            'end': {
                                'line': 1,
                                'column': 9
                            }
                        }
                    }
                ],
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
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [],
                'start': 14,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 16
                    }
                }
            },
            'start': 0,
            'end': 19,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 19
                }
            }
        }
    ],
    'start': 0,
    'end': 19,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 19
        }
    }
}],
   ['for ({j} in x) { const foo = j }', 'for ({j} in x) { const foo = j }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'VariableDeclaration',
                        'kind': 'const',
                        'declarations': [
                            {
                                'type': 'VariableDeclarator',
                                'init': {
                                    'type': 'Identifier',
                                    'name': 'j',
                                    'start': 29,
                                    'end': 30,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 29
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 30
                                        }
                                    }
                                },
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'foo',
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
                                'start': 23,
                                'end': 30,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 23
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 30
                                    }
                                }
                            }
                        ],
                        'start': 17,
                        'end': 30,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 30
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 32,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 32
                    }
                }
            },
            'left': {
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
                        'key': {
                            'type': 'Identifier',
                            'name': 'j',
                            'start': 6,
                            'end': 7,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 6
                                },
                                'end': {
                                    'line': 1,
                                    'column': 7
                                }
                            }
                        },
                        'value': {
                            'type': 'Identifier',
                            'name': 'j',
                            'start': 6,
                            'end': 7,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 6
                                },
                                'end': {
                                    'line': 1,
                                    'column': 7
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': true,
                        'start': 6,
                        'end': 7,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 7
                            }
                        }
                    }
                ],
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
            'start': 0,
            'end': 32,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 32
                }
            }
        }
    ],
    'start': 0,
    'end': 32,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 32
        }
    }
}],
  [` if (a) {
    for(f(); false;) {}
  } else
    for(x in y) {
      g()
    }`, `if (a) {
      for(f(); false;) {}
    } else
      for(x in y) {
        g()
      }`, Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [
            {
                'type': 'IfStatement',
                'test': {
                    'type': 'Identifier',
                    'name': 'a',
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
                'consequent': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ForStatement',
                            'body': {
                                'type': 'BlockStatement',
                                'body': [],
                                'start': 32,
                                'end': 34,
                                'loc': {
                                    'start': {
                                        'line': 2,
                                        'column': 23
                                    },
                                    'end': {
                                        'line': 2,
                                        'column': 25
                                    }
                                }
                            },
                            'init': {
                                'type': 'CallExpression',
                                'callee': {
                                    'type': 'Identifier',
                                    'name': 'f',
                                    'start': 19,
                                    'end': 20,
                                    'loc': {
                                        'start': {
                                            'line': 2,
                                            'column': 10
                                        },
                                        'end': {
                                            'line': 2,
                                            'column': 11
                                        }
                                    }
                                },
                                'arguments': [],
                                'start': 19,
                                'end': 22,
                                'loc': {
                                    'start': {
                                        'line': 2,
                                        'column': 10
                                    },
                                    'end': {
                                        'line': 2,
                                        'column': 13
                                    }
                                }
                            },
                            'test': {
                                'type': 'Literal',
                                'value': false,
                                'start': 24,
                                'end': 29,
                                'loc': {
                                    'start': {
                                        'line': 2,
                                        'column': 15
                                    },
                                    'end': {
                                        'line': 2,
                                        'column': 20
                                    }
                                }
                            },
                            'update': null,
                            'start': 15,
                            'end': 34,
                            'loc': {
                                'start': {
                                    'line': 2,
                                    'column': 6
                                },
                                'end': {
                                    'line': 2,
                                    'column': 25
                                }
                            }
                        }
                    ],
                    'start': 7,
                    'end': 40,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 7
                        },
                        'end': {
                            'line': 3,
                            'column': 5
                        }
                    }
                },
                'alternate': {
                    'type': 'ForInStatement',
                    'body': {
                        'type': 'BlockStatement',
                        'body': [
                            {
                                'type': 'ExpressionStatement',
                                'expression': {
                                    'type': 'CallExpression',
                                    'callee': {
                                        'type': 'Identifier',
                                        'name': 'g',
                                        'start': 74,
                                        'end': 75,
                                        'loc': {
                                            'start': {
                                                'line': 5,
                                                'column': 8
                                            },
                                            'end': {
                                                'line': 5,
                                                'column': 9
                                            }
                                        }
                                    },
                                    'arguments': [],
                                    'start': 74,
                                    'end': 77,
                                    'loc': {
                                        'start': {
                                            'line': 5,
                                            'column': 8
                                        },
                                        'end': {
                                            'line': 5,
                                            'column': 11
                                        }
                                    }
                                },
                                'start': 74,
                                'end': 77,
                                'loc': {
                                    'start': {
                                        'line': 5,
                                        'column': 8
                                    },
                                    'end': {
                                        'line': 5,
                                        'column': 11
                                    }
                                }
                            }
                        ],
                        'start': 64,
                        'end': 85,
                        'loc': {
                            'start': {
                                'line': 4,
                                'column': 18
                            },
                            'end': {
                                'line': 6,
                                'column': 7
                            }
                        }
                    },
                    'left': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 56,
                        'end': 57,
                        'loc': {
                            'start': {
                                'line': 4,
                                'column': 10
                            },
                            'end': {
                                'line': 4,
                                'column': 11
                            }
                        }
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 61,
                        'end': 62,
                        'loc': {
                            'start': {
                                'line': 4,
                                'column': 15
                            },
                            'end': {
                                'line': 4,
                                'column': 16
                            }
                        }
                    },
                    'start': 52,
                    'end': 85,
                    'loc': {
                        'start': {
                            'line': 4,
                            'column': 6
                        },
                        'end': {
                            'line': 6,
                            'column': 7
                        }
                    }
                },
                'start': 0,
                'end': 85,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 6,
                        'column': 7
                    }
                }
            }
        ],
        'start': 0,
        'end': 85,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 6,
                'column': 7
            }
        }
    }],
   ['for ([arguments] in [[]]) ;', 'for ([arguments] in [[]]) ;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 26,
                'end': 27,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 26
                    },
                    'end': {
                        'line': 1,
                        'column': 27
                    }
                }
            },
            'left': {
                'type': 'ArrayPattern',
                'elements': [
                    {
                        'type': 'Identifier',
                        'name': 'arguments',
                        'start': 6,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 16
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [],
                        'start': 21,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 21
                            },
                            'end': {
                                'line': 1,
                                'column': 23
                            }
                        }
                    }
                ],
                'start': 20,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            },
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
   ['for (let x in null, { key: 0 }) {}', 'for (let x in null, { key: 0 }) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 32,
                'end': 34,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 32
                    },
                    'end': {
                        'line': 1,
                        'column': 34
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
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
                    }
                ],
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
            },
            'right': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Literal',
                        'value': null,
                        'start': 14,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    },
                    {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'key',
                                    'start': 22,
                                    'end': 25,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 22
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 25
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 0,
                                    'start': 27,
                                    'end': 28,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 28
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 22,
                                'end': 28,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 22
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 28
                                    }
                                }
                            }
                        ],
                        'start': 20,
                        'end': 30,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 20
                            },
                            'end': {
                                'line': 1,
                                'column': 30
                            }
                        }
                    }
                ],
                'start': 14,
                'end': 30,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 30
                    }
                }
            },
            'start': 0,
            'end': 34,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 34
                }
            }
        }
    ],
    'start': 0,
    'end': 34,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 34
        }
    }
}],
   ['for([{a=0}] in b);', 'for([{a=0}] in b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 17,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'left': {
                'type': 'ArrayPattern',
                'elements': [
                    {
                        'type': 'ObjectPattern',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'a',
                                    'start': 6,
                                    'end': 7,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 6
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 7
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'a',
                                        'start': 6,
                                        'end': 7,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 6
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 7
                                            }
                                        }
                                    },
                                    'right': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 0,
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
                                    'start': 6,
                                    'end': 9,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 6
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 9
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': true,
                                'start': 6,
                                'end': 9,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 6
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 9
                                    }
                                }
                            }
                        ],
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
            'right': {
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
   ['for(var a in b, c);', 'for(var a in b, c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'a',
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
            'right': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 13,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    {
                        'type': 'Identifier',
                        'name': 'c',
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
                    }
                ],
                'start': 13,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'start': 0,
            'end': 19,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 19
                }
            }
        }
    ],
    'start': 0,
    'end': 19,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 19
        }
    }
}],
   ['for(a in b, c);', 'for(a in b, c);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'left': {
                'type': 'Identifier',
                'name': 'a',
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
            'right': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
                    {
                        'type': 'Identifier',
                        'name': 'c',
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
                    }
                ],
                'start': 9,
                'end': 13,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 13
                    }
                }
            },
            'start': 0,
            'end': 15,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 15
                }
            }
        }
    ],
    'start': 0,
    'end': 15,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 15
        }
    }
}],
   ['for ([...{ x = yield }] in [[{}]]) ;', 'for ([...{ x = yield }] in [[{}]]) ;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 35,
                'end': 36,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 35
                    },
                    'end': {
                        'line': 1,
                        'column': 36
                    }
                }
            },
            'left': {
                'type': 'ArrayPattern',
                'elements': [
                    {
                        'type': 'RestElement',
                        'argument': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x',
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
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'x',
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
                                        'right': {
                                            'type': 'Identifier',
                                            'name': 'yield',
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
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': true,
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
                            'start': 9,
                            'end': 22,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 22
                                }
                            }
                        },
                        'start': 6,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [
                            {
                                'type': 'ObjectExpression',
                                'properties': [],
                                'start': 29,
                                'end': 31,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 29
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 31
                                    }
                                }
                            }
                        ],
                        'start': 28,
                        'end': 32,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 28
                            },
                            'end': {
                                'line': 1,
                                'column': 32
                            }
                        }
                    }
                ],
                'start': 27,
                'end': 33,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 27
                    },
                    'end': {
                        'line': 1,
                        'column': 33
                    }
                }
            },
            'start': 0,
            'end': 36,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 36
                }
            }
        }
    ],
    'start': 0,
    'end': 36,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 36
        }
    }
}],
    ['for ( [let][1] in obj ) ;', 'for ( [let][1] in obj);', Context.Empty, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ForInStatement',
              'body': {
                  'type': 'EmptyStatement'
              },
              'left': {
                  'type': 'MemberExpression',
                  'object': {
                      'type': 'ArrayExpression',
                      'elements': [
                          {
                              'type': 'Identifier',
                              'name': 'let'
                          }
                      ]
                  },
                  'computed': true,
                  'property': {
                      'type': 'Literal',
                      raw: null,
                      'value': 1
                  }
              },
              'right': {
                  'type': 'Identifier',
                  'name': 'obj'
              }
          }
      ]
  }],
  ['for (x in null, { key: 0 }) {}', 'for (x in null, { key: 0 }) {}', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'left': {
                'type': 'Identifier',
                'name': 'x'
            },
            'right': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Literal',
                        'value': null
                    },
                    {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'key'
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 0
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false
                            }
                        ]
                    }
                ]
            }
        }
    ]
}],
  ['2; for (var b in { x: 0 }) { 3; }', '2; for (var b in { x: 0 }) { 3; }', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Literal',
                raw: null,
                'value': 2
            }
        },
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'Literal',
                            raw: null,
                            'value': 3
                        }
                    }
                ]
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'b'
                        }
                    }
                ]
            },
            'right': {
                'type': 'ObjectExpression',
                'properties': [
                    {
                        'type': 'Property',
                        'key': {
                            'type': 'Identifier',
                            'name': 'x'
                        },
                        'value': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false
                    }
                ]
            }
        }
    ]
}],
  ['for ( let[x] in obj ) {}', 'for ( let[x] in obj ) {}', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'BlockStatement',
                'body': []
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'Identifier',
                                    'name': 'x'
                                }
                            ]
                        }
                    }
                ]
            },
            'right': {
                'type': 'Identifier',
                'name': 'obj'
            }
        }
    ]
}],
     ['for ((x) in { attr: null }) {}', 'for ((x) in { attr: null }) {}', Context.OptionsRanges | Context.OptionsLoc, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ForInStatement',
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 28,
                  'end': 30,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 28
                      },
                      'end': {
                          'line': 1,
                          'column': 30
                      }
                  }
              },
              'left': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 6,
                  'end': 7,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 6
                      },
                      'end': {
                          'line': 1,
                          'column': 7
                      }
                  }
              },
              'right': {
                  'type': 'ObjectExpression',
                  'properties': [
                      {
                          'type': 'Property',
                          'key': {
                              'type': 'Identifier',
                              'name': 'attr',
                              'start': 14,
                              'end': 18,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 14
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 18
                                  }
                              }
                          },
                          'value': {
                              'type': 'Literal',
                              'value': null,
                              'start': 20,
                              'end': 24,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 20
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 24
                                  }
                              }
                          },
                          'kind': 'init',
                          'computed': false,
                          'method': false,
                          'shorthand': false,
                          'start': 14,
                          'end': 24,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 14
                              },
                              'end': {
                                  'line': 1,
                                  'column': 24
                              }
                          }
                      }
                  ],
                  'start': 12,
                  'end': 26,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 12
                      },
                      'end': {
                          'line': 1,
                          'column': 26
                      }
                  }
              },
              'start': 0,
              'end': 30,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 0
                  },
                  'end': {
                      'line': 1,
                      'column': 30
                  }
              }
          }
      ],
      'start': 0,
      'end': 30,
      'loc': {
          'start': {
              'line': 1,
              'column': 0
          },
          'end': {
              'line': 1,
              'column': 30
          }
      }
  }],
];

pass('Statements - For in (pass)', valids);

});

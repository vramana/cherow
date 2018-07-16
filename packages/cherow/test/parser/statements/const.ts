import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Const', () => {

  // valid tests
  const valids: Array < [string, string, Context, any] > = [

    ['const [a=[...b], ...c] = obj;', 'const [a=[...b], ...c] = obj;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'obj',
                    'start': 25,
                    'end': 28,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 25
                        },
                        'end': {
                            'line': 1,
                            'column': 28
                        }
                    }
                },
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 7,
                                'end': 8,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 8
                                    }
                                }
                            },
                            'right': {
                                'type': 'ArrayExpression',
                                'elements': [{
                                    'type': 'SpreadElement',
                                    'argument': {
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
                                    'start': 10,
                                    'end': 14,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 10
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 14
                                        }
                                    }
                                }],
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
                            'start': 7,
                            'end': 15,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 15
                                }
                            }
                        },
                        {
                            'type': 'RestElement',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'c',
                                'start': 20,
                                'end': 21,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 20
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 21
                                    }
                                }
                            },
                            'start': 17,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 17
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        }
                    ],
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
                },
                'start': 6,
                'end': 28,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 28
                    }
                }
            }],
            'start': 0,
            'end': 29,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 29
                }
            }
        }],
        'start': 0,
        'end': 29,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 29
            }
        }
    }],
    ['const {x} = obj;', 'const {x} = obj;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'obj',
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
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                        'type': 'Property',
                        'kind': 'init',
                        'key': {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 7,
                            'end': 8,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
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
                            'name': 'x',
                            'start': 7,
                            'end': 8,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 8
                                }
                            }
                        },
                        'method': false,
                        'shorthand': true,
                        'start': 7,
                        'end': 8,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 8
                            }
                        }
                    }],
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
            }],
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
    ['for (const foo = bar;;);', 'for (const foo = bar;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'bar',
                        'start': 17,
                        'end': 20,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 20
                            }
                        }
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 11,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 14
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
                }],
                'start': 5,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 20
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 24,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 24
                }
            }
        }],
        'start': 0,
        'end': 24,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 24
            }
        }
    }],

    ['const a = a, b = 4, fapper = 8;', 'const a = a, b = 4, fapper = 8;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 10,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 10
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
                    'id': {
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
                    'start': 6,
                    'end': 11,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 11
                        }
                    }
                },
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Literal',
                        raw: null,
                        'value': 4,
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
                    'id': {
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
                    'start': 13,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 13
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                },
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Literal',
                        raw: null,
                        'value': 8,
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
                        'name': 'fapper',
                        'start': 20,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 20
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    },
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
            'start': 0,
            'end': 31,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 31
                }
            }
        }],
        'start': 0,
        'end': 31,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 31
            }
        }
    }],
    ['{ const x = 42 }', '{ const x = 42 }', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'BlockStatement',
            'body': [{
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Literal',
                        raw: null,
                        'value': 42,
                        'start': 12,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 12
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'x',
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
                    'end': 14,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 8
                        },
                        'end': {
                            'line': 1,
                            'column': 14
                        }
                    }
                }],
                'start': 2,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 2
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            }],
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
    ['{ const x = 14, y = 3, z = 1977 }', '{ const x = 14, y = 3, z = 1977 }', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'BlockStatement',
            'body': [{
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 14,
                            'start': 12,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 12
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'x',
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
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 8
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 3,
                            'start': 20,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 20
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'y',
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
                        'start': 16,
                        'end': 21,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 16
                            },
                            'end': {
                                'line': 1,
                                'column': 21
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1977,
                            'start': 27,
                            'end': 31,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 27
                                },
                                'end': {
                                    'line': 1,
                                    'column': 31
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'z',
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
                        'start': 23,
                        'end': 31,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 23
                            },
                            'end': {
                                'line': 1,
                                'column': 31
                            }
                        }
                    }
                ],
                'start': 2,
                'end': 31,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 2
                    },
                    'end': {
                        'line': 1,
                        'column': 31
                    }
                }
            }],
            'start': 0,
            'end': 33,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 33
                }
            }
        }],
        'start': 0,
        'end': 33,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 33
            }
        }
    }],
    ['const z = 4; { const z = 5; }', 'const z = 4; { const z = 5; }', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Literal',
                        raw: null,
                        'value': 4,
                        'start': 10,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 10
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'z',
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
                    'start': 6,
                    'end': 11,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 11
                        }
                    }
                }],
                'start': 0,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
            {
                'type': 'BlockStatement',
                'body': [{
                    'type': 'VariableDeclaration',
                    'kind': 'const',
                    'declarations': [{
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 5,
                            'start': 25,
                            'end': 26,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 25
                                },
                                'end': {
                                    'line': 1,
                                    'column': 26
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'z',
                            'start': 21,
                            'end': 22,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 21
                                },
                                'end': {
                                    'line': 1,
                                    'column': 22
                                }
                            }
                        },
                        'start': 21,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 21
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    }],
                    'start': 15,
                    'end': 27,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 15
                        },
                        'end': {
                            'line': 1,
                            'column': 27
                        }
                    }
                }],
                'start': 13,
                'end': 29,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 29
                    }
                }
            }
        ],
        'start': 0,
        'end': 29,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 29
            }
        }
    }],
    ['const [gen = function* () {}, foo = function* x() {}] = [];', 'const [gen = function* () {}, foo = function* x() {}] = [];', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'ArrayExpression',
                    'elements': [],
                    'start': 56,
                    'end': 58,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 56
                        },
                        'end': {
                            'line': 1,
                            'column': 58
                        }
                    }
                },
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'gen',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'right': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 26,
                                    'end': 28,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 26
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 28
                                        }
                                    }
                                },
                                'async': false,
                                'generator': true,
                                'expression': false,
                                'id': null,
                                'start': 13,
                                'end': 28,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 28
                                    }
                                }
                            },
                            'start': 7,
                            'end': 28,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 28
                                }
                            }
                        },
                        {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 30,
                                'end': 33,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 30
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 33
                                    }
                                }
                            },
                            'right': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 50,
                                    'end': 52,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 50
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 52
                                        }
                                    }
                                },
                                'async': false,
                                'generator': true,
                                'expression': false,
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 46,
                                    'end': 47,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 46
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 47
                                        }
                                    }
                                },
                                'start': 36,
                                'end': 52,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 36
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 52
                                    }
                                }
                            },
                            'start': 30,
                            'end': 52,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 30
                                },
                                'end': {
                                    'line': 1,
                                    'column': 52
                                }
                            }
                        }
                    ],
                    'start': 6,
                    'end': 53,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 53
                        }
                    }
                },
                'start': 6,
                'end': 58,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 58
                    }
                }
            }],
            'start': 0,
            'end': 59,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 59
                }
            }
        }],
        'start': 0,
        'end': 59,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 59
            }
        }
    }],
    ['const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];', 'const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [];', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'ArrayExpression',
                    'elements': [],
                    'start': 48,
                    'end': 50,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 48
                        },
                        'end': {
                            'line': 1,
                            'column': 50
                        }
                    }
                },
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                        'type': 'AssignmentPattern',
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [{
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
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
                                    'computed': false,
                                    'value': {
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
                                    'method': false,
                                    'shorthand': true,
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
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'method': false,
                                    'shorthand': true,
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
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'z',
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
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'z',
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
                                    'method': false,
                                    'shorthand': true,
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
                            'start': 7,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        },
                        'right': {
                            'type': 'ObjectExpression',
                            'properties': [{
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x',
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
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 44,
                                        'start': 26,
                                        'end': 28,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 26
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
                                    'start': 23,
                                    'end': 28,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 23
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 28
                                        }
                                    }
                                },
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 55,
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
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false,
                                    'start': 30,
                                    'end': 35,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 30
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 35
                                        }
                                    }
                                },
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'z',
                                        'start': 37,
                                        'end': 38,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 37
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 38
                                            }
                                        }
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 66,
                                        'start': 40,
                                        'end': 42,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 40
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 42
                                            }
                                        }
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false,
                                    'start': 37,
                                    'end': 42,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 37
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 42
                                        }
                                    }
                                }
                            ],
                            'start': 21,
                            'end': 44,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 21
                                },
                                'end': {
                                    'line': 1,
                                    'column': 44
                                }
                            }
                        },
                        'start': 7,
                        'end': 44,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 44
                            }
                        }
                    }],
                    'start': 6,
                    'end': 45,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 45
                        }
                    }
                },
                'start': 6,
                'end': 50,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 50
                    }
                }
            }],
            'start': 0,
            'end': 51,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 51
                }
            }
        }],
        'start': 0,
        'end': 51,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 51
            }
        }
    }],
    ['const [...x] = [1, 2, 3];', 'const [...x] = [1, 2, 3];', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'ArrayExpression',
                    'elements': [{
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
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
                        {
                            'type': 'Literal',
                            raw: null,
                            'value': 2,
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
                        {
                            'type': 'Literal',
                            raw: null,
                            'value': 3,
                            'start': 22,
                            'end': 23,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 22
                                },
                                'end': {
                                    'line': 1,
                                    'column': 23
                                }
                            }
                        }
                    ],
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
                },
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                        'type': 'RestElement',
                        'argument': {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 10,
                            'end': 11,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 11
                                }
                            }
                        },
                        'start': 7,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    }],
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
                'start': 6,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            }],
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
    ['const {} = obj;', 'const {} = obj;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'obj',
                    'start': 11,
                    'end': 14,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 14
                        }
                    }
                },
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [],
                    'start': 6,
                    'end': 8,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 8
                        }
                    }
                },
                'start': 6,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            }],
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
    ['const { x: y = 33 } = { };', 'const { x: y = 33 } = { };', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'ObjectExpression',
                    'properties': [],
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
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                        'type': 'Property',
                        'kind': 'init',
                        'key': {
                            'type': 'Identifier',
                            'name': 'x',
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
                        'computed': false,
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'y',
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
                                'type': 'Literal',
                                raw: null,
                                'value': 33,
                                'start': 15,
                                'end': 17,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 15
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 17
                                    }
                                }
                            },
                            'start': 11,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'method': false,
                        'shorthand': false,
                        'start': 8,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 8
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }],
                    'start': 6,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'start': 6,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            }],
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
    ['const fn = function() {};', 'const fn = function() {};', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 22,
                        'end': 24,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 22
                            },
                            'end': {
                                'line': 1,
                                'column': 24
                            }
                        }
                    },
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 11,
                    'end': 24,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 24
                        }
                    }
                },
                'id': {
                    'type': 'Identifier',
                    'name': 'fn',
                    'start': 6,
                    'end': 8,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 8
                        }
                    }
                },
                'start': 6,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            }],
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
    ['const x = x + 1;', 'const x = x + 1;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'BinaryExpression',
                    'left': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 10,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 10
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
                    'right': {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
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
                    'operator': '+',
                    'start': 10,
                    'end': 15,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 10
                        },
                        'end': {
                            'line': 1,
                            'column': 15
                        }
                    }
                },
                'id': {
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
            }],
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
    ['const [,foo] = x;', 'const [,foo] = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
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
                    'type': 'ArrayPattern',
                    'elements': [
                        null,
                        {
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
                        }
                    ],
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
                'start': 6,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 16
                    }
                }
            }],
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
    ['const [,,foo] = x;', 'const [,,foo] = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
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
                    'type': 'ArrayPattern',
                    'elements': [
                        null,
                        null,
                        {
                            'type': 'Identifier',
                            'name': 'foo',
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
                    'start': 6,
                    'end': 13,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 13
                        }
                    }
                },
                'start': 6,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            }],
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
    ['const [foo,bar] = x;', 'const [foo,bar] = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
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
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 7,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        {
                            'type': 'Identifier',
                            'name': 'bar',
                            'start': 11,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        }
                    ],
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
                },
                'start': 6,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            }],
            'start': 0,
            'end': 20,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 20
                }
            }
        }],
        'start': 0,
        'end': 20,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 20
            }
        }
    }],
    ['const [foo] = x, [foo] = y;', 'const [foo] = x, [foo] = y;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
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
                        'type': 'ArrayPattern',
                        'elements': [{
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 7,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        }],
                        'start': 6,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
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
                },
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 25,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 25
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    },
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [{
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 18,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 18
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        }],
                        'start': 17,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    'start': 17,
                    'end': 26,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 17
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
        }],
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
    ['const {foo,} = x;', 'const {foo,} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
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
                    'properties': [{
                        'type': 'Property',
                        'kind': 'init',
                        'key': {
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 7,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'computed': false,
                        'value': {
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 7,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'method': false,
                        'shorthand': true,
                        'start': 7,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 10
                            }
                        }
                    }],
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
                'start': 6,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 16
                    }
                }
            }],
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
    ['const {foo} = x, {foo} = y;', 'const {foo} = x, {foo} = y;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
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
                        'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 7,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        }],
                        'start': 6,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
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
                },
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 25,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 25
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    },
                    'id': {
                        'type': 'ObjectPattern',
                        'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 18,
                                'end': 21,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 18
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 21
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 18,
                                'end': 21,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 18
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 21
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 18,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 18
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        }],
                        'start': 17,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    'start': 17,
                    'end': 26,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 17
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
        }],
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
    ['const x = y, {foo} = z;', 'const x = y, {foo} = z;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 10,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 10
                            },
                            'end': {
                                'line': 1,
                                'column': 11
                            }
                        }
                    },
                    'id': {
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
                    'start': 6,
                    'end': 11,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 11
                        }
                    }
                },
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'z',
                        'start': 21,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 21
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    'id': {
                        'type': 'ObjectPattern',
                        'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 14,
                                'end': 17,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 14
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 17
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 14,
                                'end': 17,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 14
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 17
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 14,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        }],
                        'start': 13,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    },
                    'start': 13,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 13
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                }
            ],
            'start': 0,
            'end': 23,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 23
                }
            }
        }],
        'start': 0,
        'end': 23,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 23
            }
        }
    }],
    ['const {foo=a} = x;', 'const {foo=a} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
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
                    'properties': [{
                        'type': 'Property',
                        'kind': 'init',
                        'key': {
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 7,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'computed': false,
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'right': {
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
                        'method': false,
                        'shorthand': true,
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
                    }],
                    'start': 6,
                    'end': 13,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 13
                        }
                    }
                },
                'start': 6,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            }],
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
    ['const {foo=a,bar} = x;', 'const {foo=a,bar} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 20,
                    'end': 21,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 20
                        },
                        'end': {
                            'line': 1,
                            'column': 21
                        }
                    }
                },
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'foo',
                                    'start': 7,
                                    'end': 10,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 7
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 10
                                        }
                                    }
                                },
                                'right': {
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
                            'method': false,
                            'shorthand': true,
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
                        {
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 13,
                            'end': 16,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 16
                                }
                            }
                        }
                    ],
                    'start': 6,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 17
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
            }],
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
    ['const {foo=a,bar=b} = x;', 'const {foo=a,bar=b} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 22,
                    'end': 23,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 22
                        },
                        'end': {
                            'line': 1,
                            'column': 23
                        }
                    }
                },
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'foo',
                                    'start': 7,
                                    'end': 10,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 7
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 10
                                        }
                                    }
                                },
                                'right': {
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
                            'method': false,
                            'shorthand': true,
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
                        {
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'bar',
                                    'start': 13,
                                    'end': 16,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 13
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 16
                                        }
                                    }
                                },
                                'right': {
                                    'type': 'Identifier',
                                    'name': 'b',
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
                                'start': 13,
                                'end': 18,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 18
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 13,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        }
                    ],
                    'start': 6,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'start': 6,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            }],
            'start': 0,
            'end': 24,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 24
                }
            }
        }],
        'start': 0,
        'end': 24,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 24
            }
        }
    }],
    ['const {foo:a,bar:b} = x;', 'const {foo:a,bar:b} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 22,
                    'end': 23,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 22
                        },
                        'end': {
                            'line': 1,
                            'column': 23
                        }
                    }
                },
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
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
                            'shorthand': false,
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
                        {
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'Identifier',
                                'name': 'b',
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
                            'method': false,
                            'shorthand': false,
                            'start': 13,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        }
                    ],
                    'start': 6,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'start': 6,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            }],
            'start': 0,
            'end': 24,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 24
                }
            }
        }],
        'start': 0,
        'end': 24,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 24
            }
        }
    }],
    ['const {foo:a,bar:b} = x;', 'const {foo:a,bar:b} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 22,
                    'end': 23,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 22
                        },
                        'end': {
                            'line': 1,
                            'column': 23
                        }
                    }
                },
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
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
                            'shorthand': false,
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
                        {
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'Identifier',
                                'name': 'b',
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
                            'method': false,
                            'shorthand': false,
                            'start': 13,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        }
                    ],
                    'start': 6,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'start': 6,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            }],
            'start': 0,
            'end': 24,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 24
                }
            }
        }],
        'start': 0,
        'end': 24,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 24
            }
        }
    }],
    ['const c = +Infinity;', 'const c = +Infinity;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'UnaryExpression',
                    'operator': '+',
                    'argument': {
                        'type': 'Identifier',
                        'name': 'Infinity',
                        'start': 11,
                        'end': 19,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 19
                            }
                        }
                    },
                    'prefix': true,
                    'start': 10,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 10
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'id': {
                    'type': 'Identifier',
                    'name': 'c',
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
                'start': 6,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            }],
            'start': 0,
            'end': 20,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 20
                }
            }
        }],
        'start': 0,
        'end': 20,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 20
            }
        }
    }],
    ['const d = /abc/;', 'const d = /abc/;', Context.OptionsRanges | Context.OptionsLoc, {
        'body': [{
            'declarations': [{
                'end': 15,
                'id': {
                    'end': 7,
                    'loc': {
                        'end': {
                            'column': 7,
                            'line': 1,
                        },
                        'start': {
                            'column': 6,
                            'line': 1,
                        },
                    },
                    'name': 'd',
                    'start': 6,
                    'type': 'Identifier',
                },
                'init': {
                    'end': 15,
                    'loc': {
                        'end': {
                            'column': 11,
                            'line': 1,
                        },
                        'start': {
                            'column': 10,
                            'line': 1,
                        },
                    },
                    'regex': {
                        'flags': '',
                        'pattern': 'abc',
                    },
                    'start': 10,
                    'type': 'Literal',
                    'value': /abc/,
                },
                'loc': {
                    'end': {
                        'column': 11,
                        'line': 1,
                    },
                    'start': {
                        'column': 6,
                        'line': 1,
                    },
                },
                'start': 6,
                'type': 'VariableDeclarator',
            }],
            'end': 16,
            'kind': 'const',
            'loc': {
                'end': {
                    'column': 12,
                    'line': 1,
                },
                'start': {
                    'column': 0,
                    'line': 1,
                },
            },
            'start': 0,
            'type': 'VariableDeclaration',
        }, ],
        'end': 16,
        'loc': {
            'end': {
                'column': 12,
                'line': 1,
            },
            'start': {
                'column': 0,
                'line': 1,
            }
        },
        'sourceType': 'script',
        'start': 0,
        'type': 'Program'
    }],
    // Babylon issue: https://github.com/babel/babel/issues/6687
    ['const await = foo;', 'const await = foo;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 14,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 14
                        },
                        'end': {
                            'line': 1,
                            'column': 17
                        }
                    }
                },
                'id': {
                    'type': 'Identifier',
                    'name': 'await',
                    'start': 6,
                    'end': 11,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 11
                        }
                    }
                },
                'start': 6,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            }],
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
    ['const { async: foo } = bar;', 'const { async: foo } = bar;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'bar',
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
                    'type': 'ObjectPattern',
                    'properties': [{
                        'type': 'Property',
                        'kind': 'init',
                        'key': {
                            'type': 'Identifier',
                            'name': 'async',
                            'start': 8,
                            'end': 13,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 8
                                },
                                'end': {
                                    'line': 1,
                                    'column': 13
                                }
                            }
                        },
                        'computed': false,
                        'value': {
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 15,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 15
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        },
                        'method': false,
                        'shorthand': false,
                        'start': 8,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 8
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    }],
                    'start': 6,
                    'end': 20,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 20
                        }
                    }
                },
                'start': 6,
                'end': 26,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 26
                    }
                }
            }],
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
    ['const foo = function({ async = true }) {};', 'const foo = function({ async = true }) {};', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'FunctionExpression',
                    'params': [{
                        'type': 'ObjectPattern',
                        'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'async',
                                'start': 23,
                                'end': 28,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 23
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 28
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'async',
                                    'start': 23,
                                    'end': 28,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 23
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 28
                                        }
                                    }
                                },
                                'right': {
                                    'type': 'Literal',
                                    'value': true,
                                    'start': 31,
                                    'end': 35,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 31
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 35
                                        }
                                    }
                                },
                                'start': 23,
                                'end': 35,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 23
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 35
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 23,
                            'end': 35,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 23
                                },
                                'end': {
                                    'line': 1,
                                    'column': 35
                                }
                            }
                        }],
                        'start': 21,
                        'end': 37,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 21
                            },
                            'end': {
                                'line': 1,
                                'column': 37
                            }
                        }
                    }],
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
                    'async': false,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 12,
                    'end': 41,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 12
                        },
                        'end': {
                            'line': 1,
                            'column': 41
                        }
                    }
                },
                'id': {
                    'type': 'Identifier',
                    'name': 'foo',
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
                'start': 6,
                'end': 41,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 41
                    }
                }
            }],
            'start': 0,
            'end': 42,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 42
                }
            }
        }],
        'start': 0,
        'end': 42,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 42
            }
        }
    }],
    ['const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];', 'const [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'ArrayExpression',
                    'elements': [{
                        'type': 'ObjectExpression',
                        'properties': [{
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 51,
                                    'end': 52,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 51
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 52
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 11,
                                    'start': 54,
                                    'end': 56,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 54
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 56
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 51,
                                'end': 56,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 51
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 56
                                    }
                                }
                            },
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'y',
                                    'start': 58,
                                    'end': 59,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 58
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 59
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 22,
                                    'start': 61,
                                    'end': 63,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 61
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 63
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 58,
                                'end': 63,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 58
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 63
                                    }
                                }
                            },
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'z',
                                    'start': 65,
                                    'end': 66,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 65
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 66
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 33,
                                    'start': 68,
                                    'end': 70,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 68
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 70
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 65,
                                'end': 70,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 65
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 70
                                    }
                                }
                            }
                        ],
                        'start': 49,
                        'end': 72,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 49
                            },
                            'end': {
                                'line': 1,
                                'column': 72
                            }
                        }
                    }],
                    'start': 48,
                    'end': 73,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 48
                        },
                        'end': {
                            'line': 1,
                            'column': 73
                        }
                    }
                },
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                        'type': 'AssignmentPattern',
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [{
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
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
                                    'computed': false,
                                    'value': {
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
                                    'method': false,
                                    'shorthand': true,
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
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'method': false,
                                    'shorthand': true,
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
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'z',
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
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'z',
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
                                    'method': false,
                                    'shorthand': true,
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
                            'start': 7,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        },
                        'right': {
                            'type': 'ObjectExpression',
                            'properties': [{
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'x',
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
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 44,
                                        'start': 26,
                                        'end': 28,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 26
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
                                    'start': 23,
                                    'end': 28,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 23
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 28
                                        }
                                    }
                                },
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 55,
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
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false,
                                    'start': 30,
                                    'end': 35,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 30
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 35
                                        }
                                    }
                                },
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'z',
                                        'start': 37,
                                        'end': 38,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 37
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 38
                                            }
                                        }
                                    },
                                    'value': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 66,
                                        'start': 40,
                                        'end': 42,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 40
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 42
                                            }
                                        }
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false,
                                    'start': 37,
                                    'end': 42,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 37
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 42
                                        }
                                    }
                                }
                            ],
                            'start': 21,
                            'end': 44,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 21
                                },
                                'end': {
                                    'line': 1,
                                    'column': 44
                                }
                            }
                        },
                        'start': 7,
                        'end': 44,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 44
                            }
                        }
                    }],
                    'start': 6,
                    'end': 45,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 45
                        }
                    }
                },
                'start': 6,
                'end': 73,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 73
                    }
                }
            }],
            'start': 0,
            'end': 74,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 74
                }
            }
        }],
        'start': 0,
        'end': 74,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 74
            }
        }
    }],
    ['const karl = ghost;', 'const karl = ghost;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'ghost',
                    'start': 13,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 13
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                },
                'id': {
                    'type': 'Identifier',
                    'name': 'karl',
                    'start': 6,
                    'end': 10,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 10
                        }
                    }
                },
                'start': 6,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            }],
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
    ['const [foo=a,bar=b] = x;', 'const [foo=a,bar=b] = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 22,
                    'end': 23,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 22
                        },
                        'end': {
                            'line': 1,
                            'column': 23
                        }
                    }
                },
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'right': {
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
                        {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'right': {
                                'type': 'Identifier',
                                'name': 'b',
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
                            'start': 13,
                            'end': 18,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 18
                                }
                            }
                        }
                    ],
                    'start': 6,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'start': 6,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            }],
            'start': 0,
            'end': 24,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 24
                }
            }
        }],
        'start': 0,
        'end': 24,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 24
            }
        }
    }],
    ['const [a=[...b], ...c] = obj;', 'const [a=[...b], ...c] = obj;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'obj',
                    'start': 25,
                    'end': 28,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 25
                        },
                        'end': {
                            'line': 1,
                            'column': 28
                        }
                    }
                },
                'id': {
                    'type': 'ArrayPattern',
                    'elements': [{
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 7,
                                'end': 8,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 8
                                    }
                                }
                            },
                            'right': {
                                'type': 'ArrayExpression',
                                'elements': [{
                                    'type': 'SpreadElement',
                                    'argument': {
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
                                    'start': 10,
                                    'end': 14,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 10
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 14
                                        }
                                    }
                                }],
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
                            'start': 7,
                            'end': 15,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 15
                                }
                            }
                        },
                        {
                            'type': 'RestElement',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'c',
                                'start': 20,
                                'end': 21,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 20
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 21
                                    }
                                }
                            },
                            'start': 17,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 17
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        }
                    ],
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
                },
                'start': 6,
                'end': 28,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 28
                    }
                }
            }],
            'start': 0,
            'end': 29,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 29
                }
            }
        }],
        'start': 0,
        'end': 29,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 29
            }
        }
    }],
    ['const {foo=a,bar} = x;', 'const {foo=a,bar} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 20,
                    'end': 21,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 20
                        },
                        'end': {
                            'line': 1,
                            'column': 21
                        }
                    }
                },
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 7,
                                'end': 10,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 7
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 10
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'foo',
                                    'start': 7,
                                    'end': 10,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 7
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 10
                                        }
                                    }
                                },
                                'right': {
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
                            'method': false,
                            'shorthand': true,
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
                        {
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'computed': false,
                            'value': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 13,
                                'end': 16,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 13
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 16
                                    }
                                }
                            },
                            'method': false,
                            'shorthand': true,
                            'start': 13,
                            'end': 16,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 13
                                },
                                'end': {
                                    'line': 1,
                                    'column': 16
                                }
                            }
                        }
                    ],
                    'start': 6,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 17
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
            }],
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
    ['for (const foo in x);', 'for (const foo in x);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForInStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 20,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': null,
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 11,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    'start': 11,
                    'end': 14,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 14
                        }
                    }
                }],
                'start': 5,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            },
            'right': {
                'type': 'Identifier',
                'name': 'x',
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
    ['for (const foo of x);', 'for (const foo of x);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 20,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': null,
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 11,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    'start': 11,
                    'end': 14,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 14
                        }
                    }
                }],
                'start': 5,
                'end': 14,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 14
                    }
                }
            },
            'right': {
                'type': 'Identifier',
                'name': 'x',
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
            'await': false,
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
    ['for (const [] = x;;);', 'for (const [] = x;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 20,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
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
                        'type': 'ArrayPattern',
                        'elements': [],
                        'start': 11,
                        'end': 13,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 13
                            }
                        }
                    },
                    'start': 11,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 17
                        }
                    }
                }],
                'start': 5,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'test': null,
            'update': null,
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
    ['for (const [,] = x;;);', 'for (const [,] = x;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 21,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'x',
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
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [
                            null
                        ],
                        'start': 11,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    },
                    'start': 11,
                    'end': 18,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 18
                        }
                    }
                }],
                'start': 5,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 18
                    }
                }
            },
            'test': null,
            'update': null,
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
    ['for (const [,,] = x;;);', 'for (const [,,] = x;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 22,
                'end': 23,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 22
                    },
                    'end': {
                        'line': 1,
                        'column': 23
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'x',
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
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [
                            null,
                            null
                        ],
                        'start': 11,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    },
                    'start': 11,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                }],
                'start': 5,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 23,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 23
                }
            }
        }],
        'start': 0,
        'end': 23,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 23
            }
        }
    }],
    ['for (const [foo] = arr;;);', 'for (const [foo] = arr;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 25,
                'end': 26,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 25
                    },
                    'end': {
                        'line': 1,
                        'column': 26
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'arr',
                        'start': 19,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 19
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [{
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
                        }],
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
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                }],
                'start': 5,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'test': null,
            'update': null,
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
    ['for (const [,,foo] = arr;;);', 'for (const [,,foo] = arr;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'arr',
                        'start': 21,
                        'end': 24,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 21
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
                            null,
                            null,
                            {
                                'type': 'Identifier',
                                'name': 'foo',
                                'start': 14,
                                'end': 17,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 14
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 17
                                    }
                                }
                            }
                        ],
                        'start': 11,
                        'end': 18,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 18
                            }
                        }
                    },
                    'start': 11,
                    'end': 24,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 24
                        }
                    }
                }],
                'start': 5,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 24
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 28,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 28
                }
            }
        }],
        'start': 0,
        'end': 28,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 28
            }
        }
    }],
    ['for (const [foo] = arr, [bar] = arr2;;);', 'for (const [foo] = arr, [bar] = arr2;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 39,
                'end': 40,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 39
                    },
                    'end': {
                        'line': 1,
                        'column': 40
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Identifier',
                            'name': 'arr',
                            'start': 19,
                            'end': 22,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 19
                                },
                                'end': {
                                    'line': 1,
                                    'column': 22
                                }
                            }
                        },
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [{
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
                            }],
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
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Identifier',
                            'name': 'arr2',
                            'start': 32,
                            'end': 36,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 32
                                },
                                'end': {
                                    'line': 1,
                                    'column': 36
                                }
                            }
                        },
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [{
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 25,
                                'end': 28,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 25
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 28
                                    }
                                }
                            }],
                            'start': 24,
                            'end': 29,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 24
                                },
                                'end': {
                                    'line': 1,
                                    'column': 29
                                }
                            }
                        },
                        'start': 24,
                        'end': 36,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 24
                            },
                            'end': {
                                'line': 1,
                                'column': 36
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 36,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 36
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 40,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 40
                }
            }
        }],
        'start': 0,
        'end': 40,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 40
            }
        }
    }],
    ['for (const [foo] = arr, bar = arr2;;);', 'for (const [foo] = arr, bar = arr2;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 37,
                'end': 38,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 37
                    },
                    'end': {
                        'line': 1,
                        'column': 38
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Identifier',
                            'name': 'arr',
                            'start': 19,
                            'end': 22,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 19
                                },
                                'end': {
                                    'line': 1,
                                    'column': 22
                                }
                            }
                        },
                        'id': {
                            'type': 'ArrayPattern',
                            'elements': [{
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
                            }],
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
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Identifier',
                            'name': 'arr2',
                            'start': 30,
                            'end': 34,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 30
                                },
                                'end': {
                                    'line': 1,
                                    'column': 34
                                }
                            }
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'bar',
                            'start': 24,
                            'end': 27,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 24
                                },
                                'end': {
                                    'line': 1,
                                    'column': 27
                                }
                            }
                        },
                        'start': 24,
                        'end': 34,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 24
                            },
                            'end': {
                                'line': 1,
                                'column': 34
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 34,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 34
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 38,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 38
                }
            }
        }],
        'start': 0,
        'end': 38,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 38
            }
        }
    }],
    ['for (const [foo=a, bar] = arr;;);', 'for (const [foo=a, bar] = arr;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 32,
                'end': 33,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 32
                    },
                    'end': {
                        'line': 1,
                        'column': 33
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'arr',
                        'start': 26,
                        'end': 29,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 26
                            },
                            'end': {
                                'line': 1,
                                'column': 29
                            }
                        }
                    },
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [{
                                'type': 'AssignmentPattern',
                                'left': {
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
                                'right': {
                                    'type': 'Identifier',
                                    'name': 'a',
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
                                'start': 12,
                                'end': 17,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 12
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 17
                                    }
                                }
                            },
                            {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 19,
                                'end': 22,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 19
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 22
                                    }
                                }
                            }
                        ],
                        'start': 11,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 23
                            }
                        }
                    },
                    'start': 11,
                    'end': 29,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 29
                        }
                    }
                }],
                'start': 5,
                'end': 29,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 29
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 33,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 33
                }
            }
        }],
        'start': 0,
        'end': 33,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 33
            }
        }
    }],
    ['for (const [foo, bar=b] = arr;;);', 'for (const [foo, bar=b] = arr;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 32,
                'end': 33,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 32
                    },
                    'end': {
                        'line': 1,
                        'column': 33
                    }
                }
            },
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'arr',
                        'start': 26,
                        'end': 29,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 26
                            },
                            'end': {
                                'line': 1,
                                'column': 29
                            }
                        }
                    },
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [{
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
                            {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'bar',
                                    'start': 17,
                                    'end': 20,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 17
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 20
                                        }
                                    }
                                },
                                'right': {
                                    'type': 'Identifier',
                                    'name': 'b',
                                    'start': 21,
                                    'end': 22,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 21
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 22
                                        }
                                    }
                                },
                                'start': 17,
                                'end': 22,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 17
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 22
                                    }
                                }
                            }
                        ],
                        'start': 11,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 23
                            }
                        }
                    },
                    'start': 11,
                    'end': 29,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 29
                        }
                    }
                }],
                'start': 5,
                'end': 29,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 29
                    }
                }
            },
            'test': null,
            'update': null,
            'start': 0,
            'end': 33,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 33
                }
            }
        }],
        'start': 0,
        'end': 33,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 33
            }
        }
    }],
    /*['for (const {x = a in b} = obj;;);', 'for (const {x = a in b} = obj;;);', Context.OptionsRanges | Context.OptionsLoc, {
      "type": "Program",
      "sourceType": "script",
      "body": [
          {
              "type": "ForStatement",
              "body": {
                  "type": "EmptyStatement",
                  "start": 32,
                  "end": 33,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 32
                      },
                      "end": {
                          "line": 1,
                          "column": 33
                      }
                  }
              },
              "init": {
                  "type": "VariableDeclaration",
                  "kind": "const",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "init": {
                              "type": "Identifier",
                              "name": "obj",
                              "start": 26,
                              "end": 29,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 26
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 29
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
                                      "computed": false,
                                      "value": {
                                          "type": "AssignmentPattern",
                                          "left": {
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
                                          },
                                          "right": {
                                              "type": "BinaryExpression",
                                              "left": {
                                                  "type": "Identifier",
                                                  "name": "a",
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
                                              "right": {
                                                  "type": "Identifier",
                                                  "name": "b",
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
                                                  }
                                              },
                                              "operator": "in",
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
                                          "start": 12,
                                          "end": 22,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 12
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 22
                                              }
                                          }
                                      },
                                      "method": false,
                                      "shorthand": true,
                                      "start": 12,
                                      "end": 22,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 12
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 22
                                          }
                                      }
                                  }
                              ],
                              "start": 11,
                              "end": 23,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 11
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 23
                                  }
                              }
                          },
                          "start": 11,
                          "end": 29,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 11
                              },
                              "end": {
                                  "line": 1,
                                  "column": 29
                              }
                          }
                      }
                  ],
                  "start": 5,
                  "end": 29,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 5
                      },
                      "end": {
                          "line": 1,
                          "column": 29
                      }
                  }
              },
              "test": null,
              "update": null,
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
    }],*/
    ['for (const {x,} = obj;;);', 'for (const {x,} = obj;;);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'init': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'Identifier',
                        'name': 'obj',
                        'start': 18,
                        'end': 21,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 18
                            },
                            'end': {
                                'line': 1,
                                'column': 21
                            }
                        }
                    },
                    'id': {
                        'type': 'ObjectPattern',
                        'properties': [{
                            'type': 'Property',
                            'kind': 'init',
                            'key': {
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
                            'computed': false,
                            'value': {
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
                            'method': false,
                            'shorthand': true,
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
                        }],
                        'start': 11,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    },
                    'start': 11,
                    'end': 21,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 21
                        }
                    }
                }],
                'start': 5,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
            'test': null,
            'update': null,
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
    ['for (const [,,] of x);', 'for (const [,,] of x);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 21,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
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
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': null,
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [
                            null,
                            null
                        ],
                        'start': 11,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    },
                    'start': 11,
                    'end': 15,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 15
                        }
                    }
                }],
                'start': 5,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'right': {
                'type': 'Identifier',
                'name': 'x',
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
            'await': false,
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
    ['for (const [foo,bar] of arr);', 'for (const [foo,bar] of arr);', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
                'start': 28,
                'end': 29,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 28
                    },
                    'end': {
                        'line': 1,
                        'column': 29
                    }
                }
            },
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [{
                    'type': 'VariableDeclarator',
                    'init': null,
                    'id': {
                        'type': 'ArrayPattern',
                        'elements': [{
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
                            {
                                'type': 'Identifier',
                                'name': 'bar',
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
                }],
                'start': 5,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 20
                    }
                }
            },
            'right': {
                'type': 'Identifier',
                'name': 'arr',
                'start': 24,
                'end': 27,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 24
                    },
                    'end': {
                        'line': 1,
                        'column': 27
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 29,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 29
                }
            }
        }],
        'start': 0,
        'end': 29,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 29
            }
        }
    }],
    ['const {foo:a=b} = x;', 'const {foo:a=b} = x;', Context.OptionsRanges | Context.OptionsLoc, {
        'type': 'Program',
        'sourceType': 'script',
        'body': [{
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [{
                'type': 'VariableDeclarator',
                'init': {
                    'type': 'Identifier',
                    'name': 'x',
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
                'id': {
                    'type': 'ObjectPattern',
                    'properties': [{
                        'type': 'Property',
                        'kind': 'init',
                        'key': {
                            'type': 'Identifier',
                            'name': 'foo',
                            'start': 7,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 7
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'computed': false,
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
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
                            'right': {
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
                            'start': 11,
                            'end': 14,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 14
                                }
                            }
                        },
                        'method': false,
                        'shorthand': false,
                        'start': 7,
                        'end': 14,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 14
                            }
                        }
                    }],
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
                },
                'start': 6,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            }],
            'start': 0,
            'end': 20,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 20
                }
            }
        }],
        'start': 0,
        'end': 20,
        'loc': {
            'start': {
                'line': 1,
                'column': 0
            },
            'end': {
                'line': 1,
                'column': 20
            }
        }
    }],
];

  const invalids: Array < [string, string, Context, any] > = [
    ['const true = x;', 'const true = x;', Context.Empty, {}],
    ['const typeof = x;', 'const typeof = x;', Context.Empty, {}],
    ['const default = x;', 'const default = x;', Context.Empty, {}],
    ['const class = x;', 'const class = x;', Context.Empty, {}],
    ['for (const class = x;;);', 'for (const class = x;;);', Context.Empty, {}],
    ['import class as "foo";', 'import class as "foo";', Context.Strict | Context.Module, {}],
    ['import {class} as "foo";', 'import {class} as "foo";', Context.Strict | Context.Module, {}],
    ['export const typeof = 10', 'export const typeof = 10', Context.Empty, {}],
    ['const null = x;', 'const null = x;', Context.Empty, {}],
    ['const enum = x;', 'const enum = x;', Context.Empty, {}],
    ['const implements = x;', 'const implements = x;', Context.Strict, {}],
    ['for (const protected = x;;);', 'for (const protected = x;;);', Context.Strict, {}],
    ['import public as "foo";', 'import public as "foo";', Context.Strict | Context.Module, {}],
    ['import {static} as "foo";', 'import {static} as "foo";', Context.Strict | Context.Module, {}],
    ['export const let = 10', 'export const let = 10', Context.Strict, {}],
    ['try {} catch (protected) {}', 'try {} catch (protected) {}', Context.Strict, {}],
    ['const [foo];', 'const [foo];', Context.Empty, {}],
    ['const [foo = x];', 'const [foo = x];', Context.Empty, {}],
    ['const [foo], bar;', 'const [foo], bar;', Context.Empty, {}],
    ['const foo, [bar];', 'const foo, [bar];', Context.Empty, {}],
    ['const [foo:bar] = obj;', 'const [foo:bar] = obj;', Context.Empty, {}],
    ['const [.x] = obj;', 'const [.x] = obj;', Context.Empty, {}],
    ['const [..x] = obj;', 'const [..x] = obj;', Context.Empty, {}],
    ['const {,} = obj;', 'const {,} = obj;', Context.Empty, {}],
    ['const {,,} = obj;', 'const {,,} = obj;', Context.Empty, {}],
    ['const {x,,} = obj;', 'const {x,,} = obj;', Context.Empty, {}],
    ['const {,x} = obj;', 'const {,x} = obj;', Context.Empty, {}],
    ['const {x,, y} = obj;', 'const {x,, y} = obj;', Context.Empty, {}],
    ['const {x};', 'const {x};', Context.Empty, {}],
    ['const {x}, {y} = z;', 'const {x}, {y} = z;', Context.Empty, {}],
    ['const x, {y};', 'const x, {y};', Context.Empty, {}],
    ['const {x}, y;', 'const {x}, y;', Context.Empty, {}],
    ['const x = y, {z};', 'const x = y, {z};', Context.Empty, {}],
    ['const {x=y};', 'const {x=y};', Context.Empty, {}],
    ['const {x:y=z};', 'const {x:y=z};', Context.Empty, {}],
    ['const {a:=c} = z;', 'const {a:=c} = z;', Context.Empty, {}],
    ['while (false) const x;', 'while (false) const x;', Context.Empty, {}],
    ['while (false) const x = 1;', 'while (false) const x = 1;', Context.Empty, {}],
    ['label: const x;', 'label: const x;', Context.Empty, {}],
    ['while (false) const x;', 'while (false) const x;', Context.Empty, {}],
    ['for (;false;) const x = 1;', 'for (;false;) const x = 1;', Context.Empty, {}],
    ['if (true) {} else const x = 1;', 'if (true) {} else const x = 1;', Context.Empty, {}],
    ['const x, y = 1;', 'const x, y = 1;', Context.Empty, {}],
    ['do const x = 1; while (false)', 'do const x = 1; while (false)', Context.Empty, {}],
];

  pass('Statements - Block (pass)', valids);
  fail('Statements - Block (failure)', invalids);

});

import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - For of', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['for (var a of b);', 'for (var a of b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
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
                'type': 'Identifier',
                'name': 'b',
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
            'await': false,
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
  ['for (let a of b);', 'for (let a of b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
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
                'type': 'Identifier',
                'name': 'b',
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
            'await': false,
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
  ['for (let j of x) { [foo] = [j] }', 'for (let j of x) { [foo] = [j] }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'AssignmentExpression',
                            'left': {
                                'type': 'ArrayPattern',
                                'elements': [
                                    {
                                        'type': 'Identifier',
                                        'name': 'foo',
                                        'start': 20,
                                        'end': 23,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 20
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 23
                                            }
                                        }
                                    }
                                ],
                                'start': 19,
                                'end': 24,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 19
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 24
                                    }
                                }
                            },
                            'operator': '=',
                            'right': {
                                'type': 'ArrayExpression',
                                'elements': [
                                    {
                                        'type': 'Identifier',
                                        'name': 'j',
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
                                    }
                                ],
                                'start': 27,
                                'end': 30,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 27
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 30
                                    }
                                }
                            },
                            'start': 19,
                            'end': 30,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 19
                                },
                                'end': {
                                    'line': 1,
                                    'column': 30
                                }
                            }
                        },
                        'start': 19,
                        'end': 30,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 19
                            },
                            'end': {
                                'line': 1,
                                'column': 30
                            }
                        }
                    }
                ],
                'start': 17,
                'end': 32,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 32
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
                            'name': 'j',
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
            'await': false,
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
  ['for ( let x of y ) {}', 'for ( let x of y ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
                    }
                ],
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
            'right': {
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
  ['for ( let member of array ) { doSomething( member ); }', 'for ( let member of array ) { doSomething( member ); }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'CallExpression',
                            'callee': {
                                'type': 'Identifier',
                                'name': 'doSomething',
                                'start': 30,
                                'end': 41,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 30
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 41
                                    }
                                }
                            },
                            'arguments': [
                                {
                                    'type': 'Identifier',
                                    'name': 'member',
                                    'start': 43,
                                    'end': 49,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 43
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 49
                                        }
                                    }
                                }
                            ],
                            'start': 30,
                            'end': 51,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 30
                                },
                                'end': {
                                    'line': 1,
                                    'column': 51
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
                'start': 28,
                'end': 54,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 28
                    },
                    'end': {
                        'line': 1,
                        'column': 54
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
                            'name': 'member',
                            'start': 10,
                            'end': 16,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 16
                                }
                            }
                        },
                        'start': 10,
                        'end': 16,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 10
                            },
                            'end': {
                                'line': 1,
                                'column': 16
                            }
                        }
                    }
                ],
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
            },
            'right': {
                'type': 'Identifier',
                'name': 'array',
                'start': 20,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 54,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 54
                }
            }
        }
    ],
    'start': 0,
    'end': 54,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 54
        }
    }
}],
  ['for (const {j} of x) { var [foo] = [j] }', 'for (const {j} of x) { var [foo] = [j] }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'VariableDeclaration',
                        'kind': 'var',
                        'declarations': [
                            {
                                'type': 'VariableDeclarator',
                                'init': {
                                    'type': 'ArrayExpression',
                                    'elements': [
                                        {
                                            'type': 'Identifier',
                                            'name': 'j',
                                            'start': 36,
                                            'end': 37,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 36
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 37
                                                }
                                            }
                                        }
                                    ],
                                    'start': 35,
                                    'end': 38,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 35
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 38
                                        }
                                    }
                                },
                                'id': {
                                    'type': 'ArrayPattern',
                                    'elements': [
                                        {
                                            'type': 'Identifier',
                                            'name': 'foo',
                                            'start': 28,
                                            'end': 31,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 28
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 31
                                                }
                                            }
                                        }
                                    ],
                                    'start': 27,
                                    'end': 32,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 32
                                        }
                                    }
                                },
                                'start': 27,
                                'end': 38,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 27
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 38
                                    }
                                }
                            }
                        ],
                        'start': 23,
                        'end': 38,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 23
                            },
                            'end': {
                                'line': 1,
                                'column': 38
                            }
                        }
                    }
                ],
                'start': 21,
                'end': 40,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 40
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
                                        'name': 'j',
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
                                        'name': 'j',
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
                                }
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
        }
    ],
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
  ['for ([] of [{ next: function() {return { done: true }; },return: function() {return {}; }}]) {}', 'for ([] of [{ next: function() {return { done: true }; },return: function() {return {}; }}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 93,
                'end': 95,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 93
                    },
                    'end': {
                        'line': 1,
                        'column': 95
                    }
                }
            },
            'left': {
                'type': 'ArrayPattern',
                'elements': [],
                'start': 5,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'next',
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
                                    'type': 'FunctionExpression',
                                    'params': [],
                                    'body': {
                                        'type': 'BlockStatement',
                                        'body': [
                                            {
                                                'type': 'ReturnStatement',
                                                'argument': {
                                                    'type': 'ObjectExpression',
                                                    'properties': [
                                                        {
                                                            'type': 'Property',
                                                            'key': {
                                                                'type': 'Identifier',
                                                                'name': 'done',
                                                                'start': 41,
                                                                'end': 45,
                                                                'loc': {
                                                                    'start': {
                                                                        'line': 1,
                                                                        'column': 41
                                                                    },
                                                                    'end': {
                                                                        'line': 1,
                                                                        'column': 45
                                                                    }
                                                                }
                                                            },
                                                            'value': {
                                                                'type': 'Literal',
                                                                'value': true,
                                                                'start': 47,
                                                                'end': 51,
                                                                'loc': {
                                                                    'start': {
                                                                        'line': 1,
                                                                        'column': 47
                                                                    },
                                                                    'end': {
                                                                        'line': 1,
                                                                        'column': 51
                                                                    }
                                                                }
                                                            },
                                                            'kind': 'init',
                                                            'computed': false,
                                                            'method': false,
                                                            'shorthand': false,
                                                            'start': 41,
                                                            'end': 51,
                                                            'loc': {
                                                                'start': {
                                                                    'line': 1,
                                                                    'column': 41
                                                                },
                                                                'end': {
                                                                    'line': 1,
                                                                    'column': 51
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    'start': 39,
                                                    'end': 53,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 39
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 53
                                                        }
                                                    }
                                                },
                                                'start': 32,
                                                'end': 54,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 32
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 54
                                                    }
                                                }
                                            }
                                        ],
                                        'start': 31,
                                        'end': 56,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 31
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 56
                                            }
                                        }
                                    },
                                    'async': false,
                                    'generator': false,
                                    'expression': false,
                                    'id': null,
                                    'start': 20,
                                    'end': 56,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 20
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
                                'start': 14,
                                'end': 56,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 14
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
                                    'name': 'return',
                                    'start': 57,
                                    'end': 63,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 57
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 63
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'FunctionExpression',
                                    'params': [],
                                    'body': {
                                        'type': 'BlockStatement',
                                        'body': [
                                            {
                                                'type': 'ReturnStatement',
                                                'argument': {
                                                    'type': 'ObjectExpression',
                                                    'properties': [],
                                                    'start': 84,
                                                    'end': 86,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 84
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 86
                                                        }
                                                    }
                                                },
                                                'start': 77,
                                                'end': 87,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 77
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 87
                                                    }
                                                }
                                            }
                                        ],
                                        'start': 76,
                                        'end': 89,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 76
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 89
                                            }
                                        }
                                    },
                                    'async': false,
                                    'generator': false,
                                    'expression': false,
                                    'id': null,
                                    'start': 65,
                                    'end': 89,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 65
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 89
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 57,
                                'end': 89,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 57
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 89
                                    }
                                }
                            }
                        ],
                        'start': 12,
                        'end': 90,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 12
                            },
                            'end': {
                                'line': 1,
                                'column': 90
                            }
                        }
                    }
                ],
                'start': 11,
                'end': 91,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 11
                    },
                    'end': {
                        'line': 1,
                        'column': 91
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 95,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 95
                }
            }
        }
    ],
    'start': 0,
    'end': 95,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 95
        }
    }
}],
  ['for(x of yield) {}', 'for(x of yield) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 16,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 16
                    },
                    'end': {
                        'line': 1,
                        'column': 18
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
                'type': 'Identifier',
                'name': 'yield',
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
            },
            'await': false,
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
  ['function* g() { for(x of yield) {} }', 'function* g() { for(x of yield) {} }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ForOfStatement',
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
                        'right': {
                            'type': 'YieldExpression',
                            'argument': null,
                            'delegate': false,
                            'start': 25,
                            'end': 30,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 25
                                },
                                'end': {
                                    'line': 1,
                                    'column': 30
                                }
                            }
                        },
                        'await': false,
                        'start': 16,
                        'end': 34,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 16
                            },
                            'end': {
                                'line': 1,
                                'column': 34
                            }
                        }
                    }
                ],
                'start': 14,
                'end': 36,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 36
                    }
                }
            },
            'async': false,
            'generator': true,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'g',
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
  ['for(let [a] of b);', 'for(let [a] of b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
                                }
                            ],
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
            'await': false,
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
  ['for({a=0} of b);', 'for({a=0} of b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'left': {
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
                        'key': {
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
                        'value': {
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
                                'value': 0,
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
                        'kind': 'init',
                        'computed': false,
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
            'await': false,
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
  ['for([{a=0}] of b);', 'for([{a=0}] of b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
            'await': false,
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
  ['for (var x of set) {}', 'for (var x of set) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'var',
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
                'type': 'Identifier',
                'name': 'set',
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
  ['for ( let[x] of [[34]] ) {}', 'for ( let[x] of [[34]] ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 25,
                'end': 27,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 25
                    },
                    'end': {
                        'line': 1,
                        'column': 27
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
                                }
                            ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 34,
                                'start': 18,
                                'end': 20,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 18
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 20
                                    }
                                }
                            }
                        ],
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
                'start': 16,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 16
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'await': false,
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
  ['for (var [...{ length }] of [[1, 2, 3]]) {}', 'for (var [...{ length }] of [[1, 2, 3]]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 41,
                'end': 43,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 41
                    },
                    'end': {
                        'line': 1,
                        'column': 43
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
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'RestElement',
                                    'argument': {
                                        'type': 'ObjectPattern',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'length',
                                                    'start': 15,
                                                    'end': 21,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 15
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
                                                    'name': 'length',
                                                    'start': 15,
                                                    'end': 21,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 15
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 21
                                                        }
                                                    }
                                                },
                                                'method': false,
                                                'shorthand': true,
                                                'start': 15,
                                                'end': 21,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 15
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 21
                                                    }
                                                }
                                            }
                                        ],
                                        'start': 13,
                                        'end': 23,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 13
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 23
                                            }
                                        }
                                    },
                                    'start': 10,
                                    'end': 23,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 10
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 23
                                        }
                                    }
                                }
                            ],
                            'start': 9,
                            'end': 24,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 24
                                }
                            }
                        },
                        'start': 9,
                        'end': 24,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 24
                            }
                        }
                    }
                ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 1,
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
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 2,
                                'start': 33,
                                'end': 34,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 33
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 34
                                    }
                                }
                            },
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 3,
                                'start': 36,
                                'end': 37,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 36
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 37
                                    }
                                }
                            }
                        ],
                        'start': 29,
                        'end': 38,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 29
                            },
                            'end': {
                                'line': 1,
                                'column': 38
                            }
                        }
                    }
                ],
                'start': 28,
                'end': 39,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 28
                    },
                    'end': {
                        'line': 1,
                        'column': 39
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 43,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 43
                }
            }
        }
    ],
    'start': 0,
    'end': 43,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 43
        }
    }
}],
  ['for (var [...[...x]] of [[1, 2, 3]]) {}', 'for (var [...[...x]] of [[1, 2, 3]]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 37,
                'end': 39,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 37
                    },
                    'end': {
                        'line': 1,
                        'column': 39
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
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'RestElement',
                                    'argument': {
                                        'type': 'ArrayPattern',
                                        'elements': [
                                            {
                                                'type': 'RestElement',
                                                'argument': {
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
                                            }
                                        ],
                                        'start': 13,
                                        'end': 19,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 13
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 19
                                            }
                                        }
                                    },
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
                                }
                            ],
                            'start': 9,
                            'end': 20,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 20
                                }
                            }
                        },
                        'start': 9,
                        'end': 20,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 20
                            }
                        }
                    }
                ],
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
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 1,
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
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 2,
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
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 3,
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
                            }
                        ],
                        'start': 25,
                        'end': 34,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 25
                            },
                            'end': {
                                'line': 1,
                                'column': 34
                            }
                        }
                    }
                ],
                'start': 24,
                'end': 35,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 24
                    },
                    'end': {
                        'line': 1,
                        'column': 35
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 39,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 39
                }
            }
        }
    ],
    'start': 0,
    'end': 39,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 39
        }
    }
}],
  ['for ({ x: prop = "x" in {} } of [{}]) {}', 'for ({ x: prop = "x" in {} } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 38,
                'end': 40,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 38
                    },
                    'end': {
                        'line': 1,
                        'column': 40
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
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'prop',
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
                            },
                            'right': {
                                'type': 'BinaryExpression',
                                'left': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 'x',
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
                                    'type': 'ObjectExpression',
                                    'properties': [],
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
                                'operator': 'in',
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
                            },
                            'start': 10,
                            'end': 26,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 26
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 7,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 28,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 28
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
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
                    }
                ],
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
            'await': false,
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
        }
    ],
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
  ['for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}', 'for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 70,
                'end': 72,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 70
                    },
                    'end': {
                        'line': 1,
                        'column': 72
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
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'xGen',
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
                            },
                            'right': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 31,
                                    'end': 33,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 31
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 33
                                        }
                                    }
                                },
                                'async': false,
                                'generator': true,
                                'expression': false,
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'x',
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
                                'start': 17,
                                'end': 33,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 17
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 33
                                    }
                                }
                            },
                            'start': 10,
                            'end': 33,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 33
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 7,
                        'end': 33,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 33
                            }
                        }
                    },
                    {
                        'type': 'Property',
                        'key': {
                            'type': 'Identifier',
                            'name': 'x',
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
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'gen',
                                'start': 38,
                                'end': 41,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 38
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 41
                                    }
                                }
                            },
                            'right': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
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
                                'async': false,
                                'generator': true,
                                'expression': false,
                                'id': null,
                                'start': 44,
                                'end': 58,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 44
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 58
                                    }
                                }
                            },
                            'start': 38,
                            'end': 58,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 38
                                },
                                'end': {
                                    'line': 1,
                                    'column': 58
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 35,
                        'end': 58,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 35
                            },
                            'end': {
                                'line': 1,
                                'column': 58
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 60,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 60
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
                        'start': 65,
                        'end': 67,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 65
                            },
                            'end': {
                                'line': 1,
                                'column': 67
                            }
                        }
                    }
                ],
                'start': 64,
                'end': 68,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 64
                    },
                    'end': {
                        'line': 1,
                        'column': 68
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 72,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 72
                }
            }
        }
    ],
    'start': 0,
    'end': 72,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 72
        }
    }
}],
  ['for ({ y: x = 1 } of [{ y: undefined }]) {}', 'for ({ y: x = 1 } of [{ y: undefined }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 41,
                'end': 43,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 41
                    },
                    'end': {
                        'line': 1,
                        'column': 43
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
                            'name': 'y',
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
                        'value': {
                            'type': 'AssignmentPattern',
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
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
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
                    }
                ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'y',
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
                                'value': {
                                    'type': 'Identifier',
                                    'name': 'undefined',
                                    'start': 27,
                                    'end': 36,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 36
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
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
                        'start': 22,
                        'end': 38,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 22
                            },
                            'end': {
                                'line': 1,
                                'column': 38
                            }
                        }
                    }
                ],
                'start': 21,
                'end': 39,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 39
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 43,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 43
                }
            }
        }
    ],
    'start': 0,
    'end': 43,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 43
        }
    }
}],
  ['for ({ x = y } of [{}]) {}', 'for ({ x = y } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
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
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
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
                            'right': {
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
                        'kind': 'init',
                        'computed': false,
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
                    }
                ],
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
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
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
                    }
                ],
                'start': 18,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 18
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'await': false,
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
  ['for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]]) {}', 'for (const [{ x, y, z } = { x: 44, y: 55, z: 66 }] of [[]]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 60,
                'end': 62,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 60
                    },
                    'end': {
                        'line': 1,
                        'column': 62
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
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'ObjectPattern',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
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
                                                'computed': false,
                                                'value': {
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
                                                'method': false,
                                                'shorthand': true,
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
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'y',
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
                                                'computed': false,
                                                'value': {
                                                    'type': 'Identifier',
                                                    'name': 'y',
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
                                                'shorthand': true,
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
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'z',
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
                                                'computed': false,
                                                'value': {
                                                    'type': 'Identifier',
                                                    'name': 'z',
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
                                                'method': false,
                                                'shorthand': true,
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
                                            }
                                        ],
                                        'start': 12,
                                        'end': 23,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 12
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 23
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
                                                    'name': 'x',
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
                                                'value': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 44,
                                                    'start': 31,
                                                    'end': 33,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 31
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 33
                                                        }
                                                    }
                                                },
                                                'kind': 'init',
                                                'computed': false,
                                                'method': false,
                                                'shorthand': false,
                                                'start': 28,
                                                'end': 33,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 28
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 33
                                                    }
                                                }
                                            },
                                            {
                                                'type': 'Property',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'y',
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
                                                'value': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 55,
                                                    'start': 38,
                                                    'end': 40,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 38
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 40
                                                        }
                                                    }
                                                },
                                                'kind': 'init',
                                                'computed': false,
                                                'method': false,
                                                'shorthand': false,
                                                'start': 35,
                                                'end': 40,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 35
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 40
                                                    }
                                                }
                                            },
                                            {
                                                'type': 'Property',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'z',
                                                    'start': 42,
                                                    'end': 43,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 42
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 43
                                                        }
                                                    }
                                                },
                                                'value': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 66,
                                                    'start': 45,
                                                    'end': 47,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 45
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 47
                                                        }
                                                    }
                                                },
                                                'kind': 'init',
                                                'computed': false,
                                                'method': false,
                                                'shorthand': false,
                                                'start': 42,
                                                'end': 47,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 42
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 47
                                                    }
                                                }
                                            }
                                        ],
                                        'start': 26,
                                        'end': 49,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 26
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 49
                                            }
                                        }
                                    },
                                    'start': 12,
                                    'end': 49,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 12
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 49
                                        }
                                    }
                                }
                            ],
                            'start': 11,
                            'end': 50,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 11
                                },
                                'end': {
                                    'line': 1,
                                    'column': 50
                                }
                            }
                        },
                        'start': 11,
                        'end': 50,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 11
                            },
                            'end': {
                                'line': 1,
                                'column': 50
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 50,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 50
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [],
                        'start': 55,
                        'end': 57,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 55
                            },
                            'end': {
                                'line': 1,
                                'column': 57
                            }
                        }
                    }
                ],
                'start': 54,
                'end': 58,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 54
                    },
                    'end': {
                        'line': 1,
                        'column': 58
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 62,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 62
                }
            }
        }
    ],
    'start': 0,
    'end': 62,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 62
        }
    }
}],
  ['for ([...x.y] of [[4, 3, 2]]) {}', 'for ([...x.y] of [[4, 3, 2]]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
            'left': {
                'type': 'ArrayPattern',
                'elements': [
                    {
                        'type': 'RestElement',
                        'argument': {
                            'type': 'MemberExpression',
                            'object': {
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
                            'property': {
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
                    }
                ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 4,
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
                            },
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 2,
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
                            }
                        ],
                        'start': 18,
                        'end': 27,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 18
                            },
                            'end': {
                                'line': 1,
                                'column': 27
                            }
                        }
                    }
                ],
                'start': 17,
                'end': 28,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 17
                    },
                    'end': {
                        'line': 1,
                        'column': 28
                    }
                }
            },
            'await': false,
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
  ['for ([...{ 0: x, length }] of [[null]]) {}', 'for ([...{ 0: x, length }] of [[null]]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 0,
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
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false,
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
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'length',
                                        'start': 17,
                                        'end': 23,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 17
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 23
                                            }
                                        }
                                    },
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'length',
                                        'start': 17,
                                        'end': 23,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 17
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 23
                                            }
                                        }
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': true,
                                    'start': 17,
                                    'end': 23,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 17
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 23
                                        }
                                    }
                                }
                            ],
                            'start': 9,
                            'end': 25,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 25
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
                    }
                ],
                'start': 5,
                'end': 26,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 26
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
                                'type': 'Literal',
                                'value': null,
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
                            }
                        ],
                        'start': 31,
                        'end': 37,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 31
                            },
                            'end': {
                                'line': 1,
                                'column': 37
                            }
                        }
                    }
                ],
                'start': 30,
                'end': 38,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 30
                    },
                    'end': {
                        'line': 1,
                        'column': 38
                    }
                }
            },
            'await': false,
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
        }
    ],
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
  ['for ([] of [[]]) {}', 'for ([] of [[]]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
                'type': 'ArrayPattern',
                'elements': [],
                'start': 5,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [],
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
                    }
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
            'await': false,
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
  ['for (x of let) {}', 'for (x of let) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
            'left': {
                'type': 'Identifier',
                'name': 'x',
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
                'type': 'Identifier',
                'name': 'let',
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
            'await': false,
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
  ['for (var {x, y} of z);', 'for (var {x, y} of z);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
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
                'kind': 'var',
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
                                    'computed': false,
                                    'value': {
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
                                    'method': false,
                                    'shorthand': true,
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
                                {
                                    'type': 'Property',
                                    'kind': 'init',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'computed': false,
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'y',
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
                                    'method': false,
                                    'shorthand': true,
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
                    }
                ],
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
  ['for ({x, y} of z);', 'for ({x, y} of z);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
                        'key': {
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
                        'value': {
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
                    },
                    {
                        'type': 'Property',
                        'key': {
                            'type': 'Identifier',
                            'name': 'y',
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
                        'value': {
                            'type': 'Identifier',
                            'name': 'y',
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
                        'kind': 'init',
                        'computed': false,
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
                    }
                ],
                'start': 5,
                'end': 11,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 11
                    }
                }
            },
            'right': {
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
            'await': false,
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
  ['for (let of of xyz);', 'for (let of of xyz);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
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
            'left': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
                        'id': {
                            'type': 'Identifier',
                            'name': 'of',
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
                    }
                ],
                'start': 5,
                'end': 11,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 11
                    }
                }
            },
            'right': {
                'type': 'Identifier',
                'name': 'xyz',
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
            'await': false,
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
        }
    ],
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
  ['for (a of b);', 'for (a of b);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'EmptyStatement',
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
                'type': 'Identifier',
                'name': 'b',
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
            'await': false,
            'start': 0,
            'end': 13,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 13
                }
            }
        }
    ],
    'start': 0,
    'end': 13,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 13
        }
    }
}],
   ['for(x of yield) {}', 'for(x of yield) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 16,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 16
                    },
                    'end': {
                        'line': 1,
                        'column': 18
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
                'type': 'Identifier',
                'name': 'yield',
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
            },
            'await': false,
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
   ['for(let x of yield) {}', 'for(let x of yield) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': null,
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
                'type': 'Identifier',
                'name': 'yield',
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
   ['function* g() { for(x of yield) {} }', 'function* g() { for(x of yield) {} }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ForOfStatement',
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
                        'right': {
                            'type': 'YieldExpression',
                            'argument': null,
                            'delegate': false,
                            'start': 25,
                            'end': 30,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 25
                                },
                                'end': {
                                    'line': 1,
                                    'column': 30
                                }
                            }
                        },
                        'await': false,
                        'start': 16,
                        'end': 34,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 16
                            },
                            'end': {
                                'line': 1,
                                'column': 34
                            }
                        }
                    }
                ],
                'start': 14,
                'end': 36,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 36
                    }
                }
            },
            'async': false,
            'generator': true,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'g',
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
   ['for (var x of list) process(x);', 'for (var x of list) process(x);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'CallExpression',
                    'callee': {
                        'type': 'Identifier',
                        'name': 'process',
                        'start': 20,
                        'end': 27,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 20
                            },
                            'end': {
                                'line': 1,
                                'column': 27
                            }
                        }
                    },
                    'arguments': [
                        {
                            'type': 'Identifier',
                            'name': 'x',
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
                },
                'start': 20,
                'end': 31,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 20
                    },
                    'end': {
                        'line': 1,
                        'column': 31
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
                'type': 'Identifier',
                'name': 'list',
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
            'await': false,
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
   ['function* g() { for(var x of yield) {} }', 'function* g() { for(var x of yield) {} }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'BlockStatement',
                            'body': [],
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
                        'left': {
                            'type': 'VariableDeclaration',
                            'kind': 'var',
                            'declarations': [
                                {
                                    'type': 'VariableDeclarator',
                                    'init': null,
                                    'id': {
                                        'type': 'Identifier',
                                        'name': 'x',
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
                                }
                            ],
                            'start': 20,
                            'end': 25,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 20
                                },
                                'end': {
                                    'line': 1,
                                    'column': 25
                                }
                            }
                        },
                        'right': {
                            'type': 'YieldExpression',
                            'argument': null,
                            'delegate': false,
                            'start': 29,
                            'end': 34,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 29
                                },
                                'end': {
                                    'line': 1,
                                    'column': 34
                                }
                            }
                        },
                        'await': false,
                        'start': 16,
                        'end': 38,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 16
                            },
                            'end': {
                                'line': 1,
                                'column': 38
                            }
                        }
                    }
                ],
                'start': 14,
                'end': 40,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 14
                    },
                    'end': {
                        'line': 1,
                        'column': 40
                    }
                }
            },
            'async': false,
            'generator': true,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'g',
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
        }
    ],
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
   ['for ( let[x] of [[34]] ) {}', 'for ( let[x] of [[34]] ) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 25,
                'end': 27,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 25
                    },
                    'end': {
                        'line': 1,
                        'column': 27
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
                                }
                            ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ArrayExpression',
                        'elements': [
                            {
                                'type': 'Literal',
                                raw: null,
                                'value': 34,
                                'start': 18,
                                'end': 20,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 18
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 20
                                    }
                                }
                            }
                        ],
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
                'start': 16,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 16
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'await': false,
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
   ['for (var { x, } of [{ x: 23 }]) {}', 'for (var { x, } of [{ x: 23 }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
                'kind': 'var',
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
                                    'computed': false,
                                    'value': {
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
                    }
                ],
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
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
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
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 23,
                                    'start': 25,
                                    'end': 27,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 25
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 27
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 22,
                                'end': 27,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 22
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 27
                                    }
                                }
                            }
                        ],
                        'start': 20,
                        'end': 29,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 20
                            },
                            'end': {
                                'line': 1,
                                'column': 29
                            }
                        }
                    }
                ],
                'start': 19,
                'end': 30,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 19
                    },
                    'end': {
                        'line': 1,
                        'column': 30
                    }
                }
            },
            'await': false,
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
   ['for ({ x: [ x ] } of [{}]) {}', 'for ({ x: [ x ] } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 27,
                'end': 29,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 27
                    },
                    'end': {
                        'line': 1,
                        'column': 29
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
                        'value': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
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
                                }
                            ],
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
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
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
                    }
                ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
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
                    }
                ],
                'start': 21,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 25
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
   ['for ({ x: [x = yield] } of [{ x: [] }]) {}', 'for ({ x: [x = yield] } of [{ x: [] }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
            'left': {
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
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
                        'value': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
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
                                }
                            ],
                            'start': 10,
                            'end': 21,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 21
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 7,
                        'end': 21,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 21
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
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'x',
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
                                    'type': 'ArrayExpression',
                                    'elements': [],
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
                            }
                        ],
                        'start': 28,
                        'end': 37,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 28
                            },
                            'end': {
                                'line': 1,
                                'column': 37
                            }
                        }
                    }
                ],
                'start': 27,
                'end': 38,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 27
                    },
                    'end': {
                        'line': 1,
                        'column': 38
                    }
                }
            },
            'await': false,
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
        }
    ],
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
   ['for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}', 'for ({ x: xGen = function* x() {}, x: gen = function*() {} } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 70,
                'end': 72,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 70
                    },
                    'end': {
                        'line': 1,
                        'column': 72
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
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'xGen',
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
                            },
                            'right': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 31,
                                    'end': 33,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 31
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 33
                                        }
                                    }
                                },
                                'async': false,
                                'generator': true,
                                'expression': false,
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'x',
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
                                'start': 17,
                                'end': 33,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 17
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 33
                                    }
                                }
                            },
                            'start': 10,
                            'end': 33,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 10
                                },
                                'end': {
                                    'line': 1,
                                    'column': 33
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 7,
                        'end': 33,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 7
                            },
                            'end': {
                                'line': 1,
                                'column': 33
                            }
                        }
                    },
                    {
                        'type': 'Property',
                        'key': {
                            'type': 'Identifier',
                            'name': 'x',
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
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'Identifier',
                                'name': 'gen',
                                'start': 38,
                                'end': 41,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 38
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 41
                                    }
                                }
                            },
                            'right': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
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
                                'async': false,
                                'generator': true,
                                'expression': false,
                                'id': null,
                                'start': 44,
                                'end': 58,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 44
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 58
                                    }
                                }
                            },
                            'start': 38,
                            'end': 58,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 38
                                },
                                'end': {
                                    'line': 1,
                                    'column': 58
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 35,
                        'end': 58,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 35
                            },
                            'end': {
                                'line': 1,
                                'column': 58
                            }
                        }
                    }
                ],
                'start': 5,
                'end': 60,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 5
                    },
                    'end': {
                        'line': 1,
                        'column': 60
                    }
                }
            },
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
                        'start': 65,
                        'end': 67,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 65
                            },
                            'end': {
                                'line': 1,
                                'column': 67
                            }
                        }
                    }
                ],
                'start': 64,
                'end': 68,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 64
                    },
                    'end': {
                        'line': 1,
                        'column': 68
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 72,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 72
                }
            }
        }
    ],
    'start': 0,
    'end': 72,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 72
        }
    }
}],
   ['for ({ y: x = 1 } of [{ y: undefined }]) {}', 'for ({ y: x = 1 } of [{ y: undefined }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 41,
                'end': 43,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 41
                    },
                    'end': {
                        'line': 1,
                        'column': 43
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
                            'name': 'y',
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
                        'value': {
                            'type': 'AssignmentPattern',
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
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
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
                    }
                ],
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
            'right': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'y',
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
                                'value': {
                                    'type': 'Identifier',
                                    'name': 'undefined',
                                    'start': 27,
                                    'end': 36,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 36
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
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
                        'start': 22,
                        'end': 38,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 22
                            },
                            'end': {
                                'line': 1,
                                'column': 38
                            }
                        }
                    }
                ],
                'start': 21,
                'end': 39,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 39
                    }
                }
            },
            'await': false,
            'start': 0,
            'end': 43,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 43
                }
            }
        }
    ],
    'start': 0,
    'end': 43,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 43
        }
    }
}],
   ['for ({ x = y } of [{}]) {}', 'for ({ x = y } of [{}]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForOfStatement',
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
                'type': 'ObjectPattern',
                'properties': [
                    {
                        'type': 'Property',
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
                        'value': {
                            'type': 'AssignmentPattern',
                            'left': {
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
                            'right': {
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
                        'kind': 'init',
                        'computed': false,
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
                    }
                ],
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
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [],
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
                    }
                ],
                'start': 18,
                'end': 22,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 18
                    },
                    'end': {
                        'line': 1,
                        'column': 22
                    }
                }
            },
            'await': false,
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
}]
];

const invalids: Array < [string, string, Context, any] > = [
  ['for(var [...[]] = 0 of {});', 'for(var [...[]] = 0 of {});', Context.Empty, {}],
  ['function foo(){ var yield = 0;  for (let i = 1 of {}) {}}', 'function foo(){ var yield = 0;  for (let i = 1 of {}) {}}', Context.Empty, {}],
  ['for(const x = 4, y of [1,2,3]) {}', 'for(const x = 4, y of [1,2,3]) {}', Context.Empty, {}],
  ['for (var i = 1 of {}) {}', 'for (var i = 1 of {}) {}', Context.Empty, {}],
  ['for (const x = 0 of {});', 'for (const x = 0 of {});', Context.Empty, {}],
  // ['for (x=0 of y);', 'for (x=0 of y);', Context.Empty, {}],
  ['for (var [p]=q of r);', 'for (var [p]=q of r);', Context.Empty, {}],
  ['for(x of [], []) {}', 'for(x of [], []) {}', Context.Empty, {}],
  ['for(var a of b, c);', 'for(var a of b, c);', Context.Empty, {}],
  ['for (var x of []) async function f() {}', 'for (var x of []) async function f() {}', Context.Empty, {}],
  ['for (var x of []) function f() {}', 'for (var x of []) function f() {}', Context.Empty, {}],
  ['for ([[(x, y)]] of [[[]]]) ;', 'for ([[(x, y)]] of [[[]]]) ;', Context.Empty, {}],
  ['for (let x of [], []) {}', 'for (let x of [], []) {}', Context.Empty, {}],
  ['for (var [...[x], y] of [[1, 2, 3]]) {}', 'for (var [...[x], y] of [[1, 2, 3]]) {}', Context.Empty, {}],
];

fail('Statements - For of (failures)', invalids);

pass('Statements - For of (pass)', valids);

});

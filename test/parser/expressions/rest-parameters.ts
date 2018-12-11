import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Rest parameters', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['function empty(...{}) {}', 'function empty(...{}) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ObjectPattern',
                        'properties': [],
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
                    },
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
                }
            ],
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
            'id': {
                'type': 'Identifier',
                'name': 'empty',
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
        }
    ],
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
  ['function emptyWithLeading(x, ...[]) {}', 'function emptyWithLeading(x, ...[]) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'Identifier',
                    'name': 'x',
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
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ArrayPattern',
                        'elements': [],
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
                }
            ],
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
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'emptyWithLeading',
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
        }
    ],
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
  ['function empty(...[]) {}', 'function empty(...[]) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ArrayPattern',
                        'elements': [],
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
                    },
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
                }
            ],
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
            'id': {
                'type': 'Identifier',
                'name': 'empty',
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
        }
    ],
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
  ['function af(...a) {}', 'function af(...a) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'Identifier',
                        'name': 'a',
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
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'af',
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
  ['function multiElement(...[a, b, c]) {}', 'function multiElement(...[a, b, c]) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'Identifier',
                                'name': 'a',
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
                                'type': 'Identifier',
                                'name': 'b',
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
                                'type': 'Identifier',
                                'name': 'c',
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
                    },
                    'start': 22,
                    'end': 34,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 22
                        },
                        'end': {
                            'line': 1,
                            'column': 34
                        }
                    }
                }
            ],
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
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'multiElement',
                'start': 9,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
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
        }
    ],
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
  ['function multiElementWithArray(...[[a], b, [c]]) {}', 'function multiElementWithArray(...[[a], b, [c]]) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'ArrayPattern',
                                'elements': [
                                    {
                                        'type': 'Identifier',
                                        'name': 'a',
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
                            {
                                'type': 'Identifier',
                                'name': 'b',
                                'start': 40,
                                'end': 41,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 40
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 41
                                    }
                                }
                            },
                            {
                                'type': 'ArrayPattern',
                                'elements': [
                                    {
                                        'type': 'Identifier',
                                        'name': 'c',
                                        'start': 44,
                                        'end': 45,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 44
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 45
                                            }
                                        }
                                    }
                                ],
                                'start': 43,
                                'end': 46,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 43
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 46
                                    }
                                }
                            }
                        ],
                        'start': 34,
                        'end': 47,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 34
                            },
                            'end': {
                                'line': 1,
                                'column': 47
                            }
                        }
                    },
                    'start': 31,
                    'end': 47,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 31
                        },
                        'end': {
                            'line': 1,
                            'column': 47
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 49,
                'end': 51,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 49
                    },
                    'end': {
                        'line': 1,
                        'column': 51
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'multiElementWithArray',
                'start': 9,
                'end': 30,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 30
                    }
                }
            },
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
        }
    ],
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
  ['function singleElementWithInitializer(...[a = 0]) {}', 'function singleElementWithInitializer(...[a = 0]) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'AssignmentPattern',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'a',
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
                                'right': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 0,
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
                        'start': 41,
                        'end': 48,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 41
                            },
                            'end': {
                                'line': 1,
                                'column': 48
                            }
                        }
                    },
                    'start': 38,
                    'end': 48,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 38
                        },
                        'end': {
                            'line': 1,
                            'column': 48
                        }
                    }
                }
            ],
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
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'singleElementWithInitializer',
                'start': 9,
                'end': 37,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 37
                    }
                }
            },
            'start': 0,
            'end': 52,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 52
                }
            }
        }
    ],
    'start': 0,
    'end': 52,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 52
        }
    }
}],
  ['function emptyWithObject(...[{}]) {}', 'function emptyWithObject(...[{}]) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'ObjectPattern',
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
                    },
                    'start': 25,
                    'end': 32,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 25
                        },
                        'end': {
                            'line': 1,
                            'column': 32
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 34,
                'end': 36,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 34
                    },
                    'end': {
                        'line': 1,
                        'column': 36
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'emptyWithObject',
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
  ['function singleElement(...[a]) {}', 'function singleElement(...[a]) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'RestElement',
                    'argument': {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'Identifier',
                                'name': 'a',
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
                            }
                        ],
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
                    'start': 23,
                    'end': 29,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 23
                        },
                        'end': {
                            'line': 1,
                            'column': 29
                        }
                    }
                }
            ],
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
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'singleElement',
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
        }
    ],
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
  ['function multiElement(...{a: r, b: s, c: t}) {}', 'function multiElement(...{a: r, b: s, c: t}) {}',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
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
                                    'name': 'a',
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
                                'computed': false,
                                'value': {
                                    'type': 'Identifier',
                                    'name': 'r',
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
                                'method': false,
                                'shorthand': false,
                                'start': 26,
                                'end': 30,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 26
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 30
                                    }
                                }
                            },
                            {
                                'type': 'Property',
                                'kind': 'init',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'b',
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
                                'computed': false,
                                'value': {
                                    'type': 'Identifier',
                                    'name': 's',
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
                                'method': false,
                                'shorthand': false,
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
                            {
                                'type': 'Property',
                                'kind': 'init',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'c',
                                    'start': 38,
                                    'end': 39,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 38
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 39
                                        }
                                    }
                                },
                                'computed': false,
                                'value': {
                                    'type': 'Identifier',
                                    'name': 't',
                                    'start': 41,
                                    'end': 42,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 41
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 42
                                        }
                                    }
                                },
                                'method': false,
                                'shorthand': false,
                                'start': 38,
                                'end': 42,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 38
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 42
                                    }
                                }
                            }
                        ],
                        'start': 25,
                        'end': 43,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 25
                            },
                            'end': {
                                'line': 1,
                                'column': 43
                            }
                        }
                    },
                    'start': 22,
                    'end': 43,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 22
                        },
                        'end': {
                            'line': 1,
                            'column': 43
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
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
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'multiElement',
                'start': 9,
                'end': 21,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 21
                    }
                }
            },
            'start': 0,
            'end': 47,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 47
                }
            }
        }
    ],
    'start': 0,
    'end': 47,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 47
        }
    }
}]
];

pass('Expressions - Rest parameters (pass)', valids);

});

import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Generator', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['function * icefapper() { yield; }', 'function * icefapper() { yield; }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'ExpressionStatement',
                        'expression': {
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
                        'start': 25,
                        'end': 31,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 25
                            },
                            'end': {
                                'line': 1,
                                'column': 31
                            }
                        }
                    }
                ],
                'start': 23,
                'end': 33,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 23
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
                'name': 'icefapper',
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
  ['f = function*([...x]) {}', 'f = function*([...x]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [
                        {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'RestElement',
                                    'argument': {
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
                            'start': 14,
                            'end': 20,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
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
                    'generator': true,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 24,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 24
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
  ['f = function*([x = 23] = [,]) {}', 'f = function*([x = 23] = [,]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [
                        {
                            'type': 'AssignmentPattern',
                            'left': {
                                'type': 'ArrayPattern',
                                'elements': [
                                    {
                                        'type': 'AssignmentPattern',
                                        'left': {
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
                                        'right': {
                                            'type': 'Literal',
                                            raw: null,
                                            'value': 23,
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
                                'start': 14,
                                'end': 22,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 14
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 22
                                    }
                                }
                            },
                            'right': {
                                'type': 'ArrayExpression',
                                'elements': [
                                    null
                                ],
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
                            'start': 14,
                            'end': 28,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 28
                                }
                            }
                        }
                    ],
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
                    'async': false,
                    'generator': true,
                    'expression': false,
                    'id': null,
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
  ['f = function*([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}', 'f = function*([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [
                        {
                            'type': 'AssignmentPattern',
                            'left': {
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
                                                        'name': 'y',
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
                                                        'name': 'y',
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
                                                },
                                                {
                                                    'type': 'Property',
                                                    'kind': 'init',
                                                    'key': {
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
                                                    'computed': false,
                                                    'value': {
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
                                                    'method': false,
                                                    'shorthand': true,
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
                                                }
                                            ],
                                            'start': 15,
                                            'end': 26,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 15
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 26
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
                                                        'start': 31,
                                                        'end': 32,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 31
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 32
                                                            }
                                                        }
                                                    },
                                                    'value': {
                                                        'type': 'Literal',
                                                        raw: null,
                                                        'value': 44,
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
                                                    'kind': 'init',
                                                    'computed': false,
                                                    'method': false,
                                                    'shorthand': false,
                                                    'start': 31,
                                                    'end': 36,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 31
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 36
                                                        }
                                                    }
                                                },
                                                {
                                                    'type': 'Property',
                                                    'key': {
                                                        'type': 'Identifier',
                                                        'name': 'y',
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
                                                    'value': {
                                                        'type': 'Literal',
                                                        raw: null,
                                                        'value': 55,
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
                                                    'kind': 'init',
                                                    'computed': false,
                                                    'method': false,
                                                    'shorthand': false,
                                                    'start': 38,
                                                    'end': 43,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 38
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 43
                                                        }
                                                    }
                                                },
                                                {
                                                    'type': 'Property',
                                                    'key': {
                                                        'type': 'Identifier',
                                                        'name': 'z',
                                                        'start': 45,
                                                        'end': 46,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 45
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 46
                                                            }
                                                        }
                                                    },
                                                    'value': {
                                                        'type': 'Literal',
                                                        raw: null,
                                                        'value': 66,
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
                                                    'kind': 'init',
                                                    'computed': false,
                                                    'method': false,
                                                    'shorthand': false,
                                                    'start': 45,
                                                    'end': 50,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 45
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 50
                                                        }
                                                    }
                                                }
                                            ],
                                            'start': 29,
                                            'end': 52,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 29
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 52
                                                }
                                            }
                                        },
                                        'start': 15,
                                        'end': 52,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 15
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 52
                                            }
                                        }
                                    }
                                ],
                                'start': 14,
                                'end': 53,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 14
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 53
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
                                                    'start': 59,
                                                    'end': 60,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 59
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 60
                                                        }
                                                    }
                                                },
                                                'value': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 11,
                                                    'start': 62,
                                                    'end': 64,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 62
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 64
                                                        }
                                                    }
                                                },
                                                'kind': 'init',
                                                'computed': false,
                                                'method': false,
                                                'shorthand': false,
                                                'start': 59,
                                                'end': 64,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 59
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 64
                                                    }
                                                }
                                            },
                                            {
                                                'type': 'Property',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'y',
                                                    'start': 66,
                                                    'end': 67,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 66
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 67
                                                        }
                                                    }
                                                },
                                                'value': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 22,
                                                    'start': 69,
                                                    'end': 71,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 69
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 71
                                                        }
                                                    }
                                                },
                                                'kind': 'init',
                                                'computed': false,
                                                'method': false,
                                                'shorthand': false,
                                                'start': 66,
                                                'end': 71,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 66
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 71
                                                    }
                                                }
                                            },
                                            {
                                                'type': 'Property',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'z',
                                                    'start': 73,
                                                    'end': 74,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 73
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 74
                                                        }
                                                    }
                                                },
                                                'value': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 33,
                                                    'start': 76,
                                                    'end': 78,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 76
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 78
                                                        }
                                                    }
                                                },
                                                'kind': 'init',
                                                'computed': false,
                                                'method': false,
                                                'shorthand': false,
                                                'start': 73,
                                                'end': 78,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 73
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 78
                                                    }
                                                }
                                            }
                                        ],
                                        'start': 57,
                                        'end': 80,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 57
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 80
                                            }
                                        }
                                    }
                                ],
                                'start': 56,
                                'end': 81,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 56
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 81
                                    }
                                }
                            },
                            'start': 14,
                            'end': 81,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 81
                                }
                            }
                        }
                    ],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 83,
                        'end': 85,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 83
                            },
                            'end': {
                                'line': 1,
                                'column': 85
                            }
                        }
                    },
                    'async': false,
                    'generator': true,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 85,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 85
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
                        'line': 1,
                        'column': 85
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
                    'line': 1,
                    'column': 85
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
            'line': 1,
            'column': 85
        }
    }
}],
  ['f = function*({ x: y = 33 } = { }) {}', 'f = function*({ x: y = 33 } = { }) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [
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
                                        'computed': false,
                                        'value': {
                                            'type': 'AssignmentPattern',
                                            'left': {
                                                'type': 'Identifier',
                                                'name': 'y',
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
                                            'right': {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 33,
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
                                            'start': 19,
                                            'end': 25,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 19
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 25
                                                }
                                            }
                                        },
                                        'method': false,
                                        'shorthand': false,
                                        'start': 16,
                                        'end': 25,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 16
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 25
                                            }
                                        }
                                    }
                                ],
                                'start': 14,
                                'end': 27,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 14
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 27
                                    }
                                }
                            },
                            'right': {
                                'type': 'ObjectExpression',
                                'properties': [],
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
                            'start': 14,
                            'end': 33,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 33
                                }
                            }
                        }
                    ],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 35,
                        'end': 37,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 35
                            },
                            'end': {
                                'line': 1,
                                'column': 37
                            }
                        }
                    },
                    'async': false,
                    'generator': true,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 37,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 37
                        }
                    }
                },
                'start': 0,
                'end': 37,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 37
                    }
                }
            },
            'start': 0,
            'end': 37,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 37
                }
            }
        }
    ],
    'start': 0,
    'end': 37,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 37
        }
    }
}],
  ['var f = function*({}) {};', 'var f = function*({}) {};', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'FunctionExpression',
                        'params': [
                            {
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
                        'generator': true,
                        'expression': false,
                        'id': null,
                        'start': 8,
                        'end': 24,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 8
                            },
                            'end': {
                                'line': 1,
                                'column': 24
                            }
                        }
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'f',
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
                    'end': 24,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
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
  ['f = function*([[,] = g()]) {}', 'f = function*([[,] = g()]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [
                        {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'ArrayPattern',
                                        'elements': [
                                            null
                                        ],
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
                                    'right': {
                                        'type': 'CallExpression',
                                        'callee': {
                                            'type': 'Identifier',
                                            'name': 'g',
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
                                        'arguments': [],
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
                            'start': 14,
                            'end': 25,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 25
                                }
                            }
                        }
                    ],
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
                    'async': false,
                    'generator': true,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 29,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 29
                        }
                    }
                },
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
            },
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
  ['f = function*([[x, y, z] = [4, 5, 6]]) {}', 'f = function*([[x, y, z] = [4, 5, 6]]) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [
                        {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'ArrayPattern',
                                        'elements': [
                                            {
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
                                            {
                                                'type': 'Identifier',
                                                'name': 'y',
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
                                                'type': 'Identifier',
                                                'name': 'z',
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
                                    'right': {
                                        'type': 'ArrayExpression',
                                        'elements': [
                                            {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 4,
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
                                            {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 5,
                                                'start': 31,
                                                'end': 32,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 31
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 32
                                                    }
                                                }
                                            },
                                            {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 6,
                                                'start': 34,
                                                'end': 35,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 34
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 35
                                                    }
                                                }
                                            }
                                        ],
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
                                    'start': 15,
                                    'end': 36,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 15
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 36
                                        }
                                    }
                                }
                            ],
                            'start': 14,
                            'end': 37,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 14
                                },
                                'end': {
                                    'line': 1,
                                    'column': 37
                                }
                            }
                        }
                    ],
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
                    'generator': true,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 41,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 4
                        },
                        'end': {
                            'line': 1,
                            'column': 41
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

];

pass('Expressions - Generator (pass)', valids);

});

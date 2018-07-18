import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - Comma', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['function  a(b,) {}', 'function  a(b,) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'Identifier',
                    'name': 'b',
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
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
  ['(function  a(b,) {});', '(function  a(b,) {});', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
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
                    }
                ],
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
                'async': false,
                'generator': false,
                'expression': false,
                'id': {
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
                'start': 1,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
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
  ['(1, y)', '(1, y)', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
                        'start': 1,
                        'end': 2,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
                            },
                            'end': {
                                'line': 1,
                                'column': 2
                            }
                        }
                    },
                    {
                        'type': 'Identifier',
                        'name': 'y',
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
                    }
                ],
                'start': 1,
                'end': 5,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 5
                    }
                }
            },
            'start': 0,
            'end': 6,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 6
                }
            }
        }
    ],
    'start': 0,
    'end': 6,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 6
        }
    }
}],
  ['0, f(n - 1);', '0, f(n - 1);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
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
                    {
                        'type': 'CallExpression',
                        'callee': {
                            'type': 'Identifier',
                            'name': 'f',
                            'start': 3,
                            'end': 4,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 3
                                },
                                'end': {
                                    'line': 1,
                                    'column': 4
                                }
                            }
                        },
                        'arguments': [
                            {
                                'type': 'BinaryExpression',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'n',
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
                                'operator': '-',
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
                        'start': 3,
                        'end': 11,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 3
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
            },
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
        }
    ],
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
}],
  ['(b,) => {};', '(b,) => {};', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrowFunctionExpression',
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 8,
                    'end': 10,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 8
                        },
                        'end': {
                            'line': 1,
                            'column': 10
                        }
                    }
                },
                'params': [
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 1,
                        'end': 2,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
                            },
                            'end': {
                                'line': 1,
                                'column': 2
                            }
                        }
                    }
                ],
                'id': null,
                'async': false,
                'generator': false,
                'expression': false,
                'start': 0,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
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
  ['(b,c,d,) => {};', '(b,c,d,) => {};', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrowFunctionExpression',
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
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
                'params': [
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 1,
                        'end': 2,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
                            },
                            'end': {
                                'line': 1,
                                'column': 2
                            }
                        }
                    },
                    {
                        'type': 'Identifier',
                        'name': 'c',
                        'start': 3,
                        'end': 4,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 3
                            },
                            'end': {
                                'line': 1,
                                'column': 4
                            }
                        }
                    },
                    {
                        'type': 'Identifier',
                        'name': 'd',
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
                    }
                ],
                'id': null,
                'async': false,
                'generator': false,
                'expression': false,
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
  ['a(1,2,3,);', 'a(1,2,3,);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'a',
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
                'arguments': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
                        'start': 2,
                        'end': 3,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 2
                            },
                            'end': {
                                'line': 1,
                                'column': 3
                            }
                        }
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 2,
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
                        'type': 'Literal',
                        raw: null,
                        'value': 3,
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
                'start': 0,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['a(...[],);', 'a(...[],);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'a',
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
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
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
                        'start': 2,
                        'end': 7,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 2
                            },
                            'end': {
                                'line': 1,
                                'column': 7
                            }
                        }
                    }
                ],
                'start': 0,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['a(1, 2, ...[],);', 'a(1, 2, ...[],);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'a',
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
                'arguments': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
                        'start': 2,
                        'end': 3,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 2
                            },
                            'end': {
                                'line': 1,
                                'column': 3
                            }
                        }
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 2,
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
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
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
            },
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
  ['a(...[], 2, ...[],);', 'a(...[], 2, ...[],);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'a',
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
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
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
                        'start': 2,
                        'end': 7,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 2
                            },
                            'end': {
                                'line': 1,
                                'column': 7
                            }
                        }
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 2,
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
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
                            'elements': [],
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
  ['a, b, (c, d) => 0', 'a, b, (c, d) => 0', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Identifier',
                        'name': 'a',
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
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 3,
                        'end': 4,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 3
                            },
                            'end': {
                                'line': 1,
                                'column': 4
                            }
                        }
                    },
                    {
                        'type': 'ArrowFunctionExpression',
                        'body': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0,
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
                        'params': [
                            {
                                'type': 'Identifier',
                                'name': 'c',
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
                            {
                                'type': 'Identifier',
                                'name': 'd',
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
                        'id': null,
                        'async': false,
                        'generator': false,
                        'expression': true,
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
            },
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
  ['(a, b) => 0, (c, d) => 1', '(a, b) => 0, (c, d) => 1', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'ArrowFunctionExpression',
                        'body': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0,
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
                        'params': [
                            {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 1,
                                'end': 2,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 1
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 2
                                    }
                                }
                            },
                            {
                                'type': 'Identifier',
                                'name': 'b',
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
                            }
                        ],
                        'id': null,
                        'async': false,
                        'generator': false,
                        'expression': true,
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
                    },
                    {
                        'type': 'ArrowFunctionExpression',
                        'body': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
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
                        'params': [
                            {
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
                            {
                                'type': 'Identifier',
                                'name': 'd',
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
                            }
                        ],
                        'id': null,
                        'async': false,
                        'generator': false,
                        'expression': true,
                        'start': 13,
                        'end': 24,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 13
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
  ['(a, (a, (b, c) => 0))', '(a, (a, (b, c) => 0))', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 1,
                        'end': 2,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
                            },
                            'end': {
                                'line': 1,
                                'column': 2
                            }
                        }
                    },
                    {
                        'type': 'SequenceExpression',
                        'expressions': [
                            {
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
                            {
                                'type': 'ArrowFunctionExpression',
                                'body': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 0,
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
                                'params': [
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
                                'id': null,
                                'async': false,
                                'generator': false,
                                'expression': true,
                                'start': 8,
                                'end': 19,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 8
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 19
                                    }
                                }
                            }
                        ],
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
                    }
                ],
                'start': 1,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 20
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
  ['[...a,]', '[...a,]', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
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
                        'start': 1,
                        'end': 5,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
                            },
                            'end': {
                                'line': 1,
                                'column': 5
                            }
                        }
                    }
                ],
                'start': 0,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'start': 0,
            'end': 7,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 7
                }
            }
        }
    ],
    'start': 0,
    'end': 7,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 7
        }
    }
}],
  ['[...[...a]]', '[...[...a]]', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
                            'elements': [
                                {
                                    'type': 'SpreadElement',
                                    'argument': {
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
                        'start': 1,
                        'end': 10,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
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
            },
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
  ['[, , ...a]', '[, , ...a]', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    null,
                    null,
                    {
                        'type': 'SpreadElement',
                        'argument': {
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
                'start': 0,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['((a, b) => {}, (a => a + 1))', '((a, b) => {}, (a => a + 1))', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'ArrowFunctionExpression',
                        'body': {
                            'type': 'BlockStatement',
                            'body': [],
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
                        'params': [
                            {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 2,
                                'end': 3,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 2
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 3
                                    }
                                }
                            },
                            {
                                'type': 'Identifier',
                                'name': 'b',
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
                            }
                        ],
                        'id': null,
                        'async': false,
                        'generator': false,
                        'expression': false,
                        'start': 1,
                        'end': 13,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
                            },
                            'end': {
                                'line': 1,
                                'column': 13
                            }
                        }
                    },
                    {
                        'type': 'ArrowFunctionExpression',
                        'body': {
                            'type': 'BinaryExpression',
                            'left': {
                                'type': 'Identifier',
                                'name': 'a',
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
                            'right': {
                                'type': 'Literal',
                                raw: null,
                                'value': 1,
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
                            'operator': '+',
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
                        },
                        'params': [
                            {
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
                            }
                        ],
                        'id': null,
                        'async': false,
                        'generator': false,
                        'expression': true,
                        'start': 16,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 16
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    }
                ],
                'start': 1,
                'end': 27,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 27
                    }
                }
            },
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
        }
    ],
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
  ['a(...[],);', 'a(...[],);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'a',
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
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
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
                        'start': 2,
                        'end': 7,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 2
                            },
                            'end': {
                                'line': 1,
                                'column': 7
                            }
                        }
                    }
                ],
                'start': 0,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['function g(){ return a,b; }', 'function g(){ return a,b; }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'ReturnStatement',
                        'argument': {
                            'type': 'SequenceExpression',
                            'expressions': [
                                {
                                    'type': 'Identifier',
                                    'name': 'a',
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
                                {
                                    'type': 'Identifier',
                                    'name': 'b',
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
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'g',
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
  ['if (a,b) c;', 'if (a,b) c;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'IfStatement',
            'test': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
            'consequent': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'c',
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
            'alternate': null,
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
  ['while (a,b) c;', 'while (a,b) c;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    }
                ],
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
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
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
                },
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
  ['for (a in b,c) d;', 'for (a in b,c) d;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForInStatement',
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'd',
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
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
  ['for (a,b;;) c;', 'for (a,b;;) c;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
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
                },
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
            'init': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
            'test': null,
            'update': null,
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
  ['for (;a,b;) c;', 'for (;a,b;) c;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ForStatement',
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
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
                },
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
            'init': null,
            'test': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
            'update': null,
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
  ['do x; while (y, z)', 'do x; while (y, z)', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'DoWhileStatement',
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 3,
                    'end': 4,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 3
                        },
                        'end': {
                            'line': 1,
                            'column': 4
                        }
                    }
                },
                'start': 3,
                'end': 5,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 3
                    },
                    'end': {
                        'line': 1,
                        'column': 5
                    }
                }
            },
            'test': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    {
                        'type': 'Identifier',
                        'name': 'z',
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
  ['switch (a,b){}', 'switch (a,b){}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    {
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
            'cases': [],
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
  ['_ => a,b', '_ => a,b', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'ArrowFunctionExpression',
                        'body': {
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
                        'params': [
                            {
                                'type': 'Identifier',
                                'name': '_',
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
                            }
                        ],
                        'id': null,
                        'async': false,
                        'generator': false,
                        'expression': true,
                        'start': 0,
                        'end': 6,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 0
                            },
                            'end': {
                                'line': 1,
                                'column': 6
                            }
                        }
                    },
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
                    }
                ],
                'start': 0,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'start': 0,
            'end': 8,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 8
                }
            }
        }
    ],
    'start': 0,
    'end': 8,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 8
        }
    }
}],
  ['func(_ => a,b)', 'func(_ => a,b)', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'func',
                    'start': 0,
                    'end': 4,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 4
                        }
                    }
                },
                'arguments': [
                    {
                        'type': 'ArrowFunctionExpression',
                        'body': {
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
                        'params': [
                            {
                                'type': 'Identifier',
                                'name': '_',
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
                            }
                        ],
                        'id': null,
                        'async': false,
                        'generator': false,
                        'expression': true,
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
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
            },
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
   ['`x${a,b}y`', '`x${a,b}y`', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'TemplateLiteral',
                'expressions': [
                    {
                        'type': 'SequenceExpression',
                        'expressions': [
                            {
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
                            {
                                'type': 'Identifier',
                                'name': 'b',
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
                    }
                ],
                'quasis': [
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': 'x',
                            'raw': 'x'
                        },
                        'tail': false,
                        'start': 0,
                        'end': 7,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 0
                            },
                            'end': {
                                'line': 1,
                                'column': 7
                            }
                        }
                    },
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': 'y',
                            'raw': 'y'
                        },
                        'tail': true,
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
                    }
                ],
                'start': 0,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
   [ '`x${z} ${a,b}y`',  '`x${z} ${a,b}y`', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'TemplateLiteral',
                'expressions': [
                    {
                        'type': 'Identifier',
                        'name': 'z',
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
                        'type': 'SequenceExpression',
                        'expressions': [
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
                            },
                            {
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
                    }
                ],
                'quasis': [
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': 'x',
                            'raw': 'x'
                        },
                        'tail': false,
                        'start': 0,
                        'end': 5,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 0
                            },
                            'end': {
                                'line': 1,
                                'column': 5
                            }
                        }
                    },
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': ' ',
                            'raw': ' '
                        },
                        'tail': false,
                        'start': 5,
                        'end': 12,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 5
                            },
                            'end': {
                                'line': 1,
                                'column': 12
                            }
                        }
                    },
                    {
                        'type': 'TemplateElement',
                        'value': {
                            'cooked': 'y',
                            'raw': 'y'
                        },
                        'tail': true,
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
  ['a ? b : c, d', 'a ? b : c, d', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'ConditionalExpression',
                        'test': {
                            'type': 'Identifier',
                            'name': 'a',
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
                        'consequent': {
                            'type': 'Identifier',
                            'name': 'b',
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
                        'alternate': {
                            'type': 'Identifier',
                            'name': 'c',
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
                        'start': 0,
                        'end': 9,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 0
                            },
                            'end': {
                                'line': 1,
                                'column': 9
                            }
                        }
                    },
                    {
                        'type': 'Identifier',
                        'name': 'd',
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
        }
    ],
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
}],
  ['a: b, c', 'a: b, c', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'LabeledStatement',
            'label': {
                'type': 'Identifier',
                'name': 'a',
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
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'SequenceExpression',
                    'expressions': [
                        {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 3,
                            'end': 4,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 3
                                },
                                'end': {
                                    'line': 1,
                                    'column': 4
                                }
                            }
                        },
                        {
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
                        }
                    ],
                    'start': 3,
                    'end': 7,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 3
                        },
                        'end': {
                            'line': 1,
                            'column': 7
                        }
                    }
                },
                'start': 3,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 3
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'start': 0,
            'end': 7,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 7
                }
            }
        }
    ],
    'start': 0,
    'end': 7,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 7
        }
    }
}],
  ['throw a,b', 'throw a,b', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ThrowStatement',
            'argument': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    {
                        'type': 'Identifier',
                        'name': 'b',
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
            'start': 0,
            'end': 9,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 9
                }
            }
        }
    ],
    'start': 0,
    'end': 9,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 9
        }
    }
}],
  ['a(...[], 2, ...[],);', 'a(...[], 2, ...[],);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'a',
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
                'arguments': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
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
                        'start': 2,
                        'end': 7,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 2
                            },
                            'end': {
                                'line': 1,
                                'column': 7
                            }
                        }
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 2,
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
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
                            'elements': [],
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
];

const invalids: Array < [string, string, Context, any] > = [
  ['for (a,b in c) d;', 'for (a,b in c) d;', Context.Empty, {}],
  ['do x, y while (z)', 'do x, y while (z)', Context.Empty, {}],
  ['a ? b, c : d', 'a ? b, c : d', Context.Empty, {}],
  ['with (a,b) c;', 'with (a,b) c;', Context.Empty, {}],
  ['ice, fapper,,,', 'ice, fapper,,,', Context.Empty, {}],
  ['function ("foo",") {}', 'function ("foo",") {}', Context.Empty, {}],
  ['function  a(b,,) {}', 'function  a(b,,) {}', Context.Empty, {}],
  ['(function  a(b,,) {});', '(function  a(b,,) {});', Context.Empty, {}],
  ['function* a(b,c,d,,) {}', 'function* a(b,c,d,,) {}', Context.Empty, {}],
  ['(function*  (b,c,d,,) {});', '(function*  (b,c,d,,) {});', Context.Empty, {}],
  ['a(1,2,3,,);', 'a(1,2,3,,);', Context.Empty, {}],
  ['(,) => {};', '(,) => {};', Context.Empty, {}],
  ['(function   (...b,) {});', '(function   (...b,) {});', Context.Empty, {}],
  ['class A {foo(,) {}}', 'class A {foo(,) {}}', Context.Empty, {}],
  ['(class {static foo(,) {}})', '(class {static foo(,) {}})', Context.Empty, {}],
  ['(a,);', '(a,);', Context.Empty, {}],
  ['({foo(...a,) {}})', '({foo(...a,) {}})', Context.Empty, {}],
  ['(a,b,c,);', '(a,b,c,);', Context.Empty, {}],
  ['n, op, val,', 'n, op, val,', Context.Empty, {}],
  ['foo(a,,) => 0', 'foo(a,,) => 0', Context.Empty, {}],
  ['async (a,,) => 0', 'async (a,,) => 0', Context.Empty, {}],
  [', => 0', ', => 0', Context.Empty, {}],
  [', () => 0', ', () => 0', Context.Empty, {}],
  ['async (,) => 0', 'async (,) => 0', Context.Empty, {}],
];

fail('Miscellaneous - Comma (failures)', invalids);
pass('Miscellaneous - Comma (pass)', valids);

});

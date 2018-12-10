import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Switch', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['switch (foo) {}', 'switch (foo) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
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
            'cases': [],
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
  ['switch (A) {case B: C;}', 'switch (A) {case B: C;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'A',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'B',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'C',
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
                        }
                    ],
                    'start': 12,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 12
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
  ['switch (A) {case B: C; default: D;}', 'switch (A) {case B: C; default: D;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'A',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'B',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'C',
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
                        }
                    ],
                    'start': 12,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 12
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                },
                {
                    'type': 'SwitchCase',
                    'test': null,
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'D',
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
                        }
                    ],
                    'start': 23,
                    'end': 34,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 23
                        },
                        'end': {
                            'line': 1,
                            'column': 34
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
  ['switch (A) {default: D; case B: C; }', 'switch (A) {default: D; case B: C; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'A',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': null,
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'D',
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
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'B',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'C',
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
                        }
                    ],
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
  ['switch (A) {case B: C; case D: E;}', 'switch (A) {case B: C; case D: E;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'A',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'B',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'C',
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
                        }
                    ],
                    'start': 12,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 12
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                },
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'D',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'E',
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
  ['switch (A) {case B: C; break; case D: E; break;}', 'switch (A) {case B: C; break; case D: E; break;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'A',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'B',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'C',
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
                        {
                            'type': 'BreakStatement',
                            'label': null,
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
                    'start': 12,
                    'end': 29,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 12
                        },
                        'end': {
                            'line': 1,
                            'column': 29
                        }
                    }
                },
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'D',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'E',
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
                        {
                            'type': 'BreakStatement',
                            'label': null,
                            'start': 41,
                            'end': 47,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 41
                                },
                                'end': {
                                    'line': 1,
                                    'column': 47
                                }
                            }
                        }
                    ],
                    'start': 30,
                    'end': 47,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 30
                        },
                        'end': {
                            'line': 1,
                            'column': 47
                        }
                    }
                }
            ],
            'start': 0,
            'end': 48,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 48
                }
            }
        }
    ],
    'start': 0,
    'end': 48,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 48
        }
    }
}],
  ['switch(a){case 1:}', 'switch(a){case 1:}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
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
                    'consequent': [],
                    'start': 10,
                    'end': 17,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 10
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

  ['switch (answer) { case 0: hi(); continue; }', 'switch (answer) { case 0: hi(); continue; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'answer',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'CallExpression',
                                'callee': {
                                    'type': 'Identifier',
                                    'name': 'hi',
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
                                'arguments': [],
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
                            'start': 26,
                            'end': 31,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 26
                                },
                                'end': {
                                    'line': 1,
                                    'column': 31
                                }
                            }
                        },
                        {
                            'type': 'ContinueStatement',
                            'label': null,
                            'start': 32,
                            'end': 41,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 32
                                },
                                'end': {
                                    'line': 1,
                                    'column': 41
                                }
                            }
                        }
                    ],
                    'start': 18,
                    'end': 41,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 41
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
  ['switch (answer) { case 0: hi(); break; }', 'switch (answer) { case 0: hi(); break; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'answer',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'CallExpression',
                                'callee': {
                                    'type': 'Identifier',
                                    'name': 'hi',
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
                                'arguments': [],
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
                            'start': 26,
                            'end': 31,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 26
                                },
                                'end': {
                                    'line': 1,
                                    'column': 31
                                }
                            }
                        },
                        {
                            'type': 'BreakStatement',
                            'label': null,
                            'start': 32,
                            'end': 38,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 32
                                },
                                'end': {
                                    'line': 1,
                                    'column': 38
                                }
                            }
                        }
                    ],
                    'start': 18,
                    'end': 38,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 38
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
  ['switch (answer) { case 0: let a; }', 'switch (answer) { case 0: let a; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'answer',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
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
                    'consequent': [
                        {
                            'type': 'VariableDeclaration',
                            'kind': 'let',
                            'declarations': [
                                {
                                    'type': 'VariableDeclarator',
                                    'init': null,
                                    'id': {
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
                                }
                            ],
                            'start': 26,
                            'end': 32,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 26
                                },
                                'end': {
                                    'line': 1,
                                    'column': 32
                                }
                            }
                        }
                    ],
                    'start': 18,
                    'end': 32,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 32
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

  ['switch (A) {case B: C; default: D;}', 'switch (A) {case B: C; default: D;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'SwitchStatement',
            'discriminant': {
                'type': 'Identifier',
                'name': 'A',
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
            'cases': [
                {
                    'type': 'SwitchCase',
                    'test': {
                        'type': 'Identifier',
                        'name': 'B',
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
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'C',
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
                        }
                    ],
                    'start': 12,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 12
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                },
                {
                    'type': 'SwitchCase',
                    'test': null,
                    'consequent': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'D',
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
                        }
                    ],
                    'start': 23,
                    'end': 34,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 23
                        },
                        'end': {
                            'line': 1,
                            'column': 34
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
['switch (A) {case B: C; case D: E;}', 'switch (A) {case B: C; case D: E;}', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'SwitchStatement',
          'discriminant': {
              'type': 'Identifier',
              'name': 'A',
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
          'cases': [
              {
                  'type': 'SwitchCase',
                  'test': {
                      'type': 'Identifier',
                      'name': 'B',
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
                  'consequent': [
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'Identifier',
                              'name': 'C',
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
                      }
                  ],
                  'start': 12,
                  'end': 22,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 12
                      },
                      'end': {
                          'line': 1,
                          'column': 22
                      }
                  }
              },
              {
                  'type': 'SwitchCase',
                  'test': {
                      'type': 'Identifier',
                      'name': 'D',
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
                  'consequent': [
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'Identifier',
                              'name': 'E',
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
}]
];

const invalids: Array < [string, string, Context, any] > = [
  [`function SwitchTest(value){
    var result = 0;
    switch(value) {
      case 0:
        result += 2;
      default:
        result += 32;
        break;
      default:
        result += 32;
        break;
    }
    return result;
  }`, `function SwitchTest(value){
    var result = 0;
    switch(value) {
      case 0:
        result += 2;
      default:
        result += 32;
        break;
      default:
        result += 32;
        break;
    }
    return result;
  }`, Context.Empty, {}],
];

fail('Statements - Switch (failure)', invalids);
pass('Statements - Switch (pass)', valids);

});

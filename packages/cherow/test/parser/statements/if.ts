import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - If', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['if (a) (function(){})', 'if (a) (function(){})', Context.OptionsRanges | Context.OptionsLoc, {
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
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'FunctionExpression',
                    'params': [],
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
                    'id': null,
                    'start': 8,
                    'end': 20,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 8
                        },
                        'end': {
                            'line': 1,
                            'column': 20
                        }
                    }
                },
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
            },
            'alternate': null,
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
  ['if (a) var x = 0;', 'if (a) var x = 0;', Context.OptionsRanges | Context.OptionsLoc, {
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
                'type': 'VariableDeclaration',
                'kind': 'var',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0,
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
                    }
                ],
                'start': 7,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'alternate': null,
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
  ['if (a) b(); else c()', 'if (a) b(); else c()', Context.OptionsRanges | Context.OptionsLoc, {
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
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'CallExpression',
                    'callee': {
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
                    },
                    'arguments': [],
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
            },
            'alternate': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'CallExpression',
                    'callee': {
                        'type': 'Identifier',
                        'name': 'c',
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
                    'arguments': [],
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
  ['if(a)b;else c;', 'if(a)b;else c;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'IfStatement',
            'test': {
                'type': 'Identifier',
                'name': 'a',
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
            'consequent': {
                'type': 'ExpressionStatement',
                'expression': {
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
                },
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
            'alternate': {
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
  ['function f() { if (1) { return () => { while (true) hi(); } } }', 'function f() { if (1) { return () => { while (true) hi(); } } }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'IfStatement',
                        'test': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
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
                        'consequent': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ReturnStatement',
                                    'argument': {
                                        'type': 'ArrowFunctionExpression',
                                        'body': {
                                            'type': 'BlockStatement',
                                            'body': [
                                                {
                                                    'type': 'WhileStatement',
                                                    'test': {
                                                        'type': 'Literal',
                                                        'value': true,
                                                        'start': 46,
                                                        'end': 50,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 46
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 50
                                                            }
                                                        }
                                                    },
                                                    'body': {
                                                        'type': 'ExpressionStatement',
                                                        'expression': {
                                                            'type': 'CallExpression',
                                                            'callee': {
                                                                'type': 'Identifier',
                                                                'name': 'hi',
                                                                'start': 52,
                                                                'end': 54,
                                                                'loc': {
                                                                    'start': {
                                                                        'line': 1,
                                                                        'column': 52
                                                                    },
                                                                    'end': {
                                                                        'line': 1,
                                                                        'column': 54
                                                                    }
                                                                }
                                                            },
                                                            'arguments': [],
                                                            'start': 52,
                                                            'end': 56,
                                                            'loc': {
                                                                'start': {
                                                                    'line': 1,
                                                                    'column': 52
                                                                },
                                                                'end': {
                                                                    'line': 1,
                                                                    'column': 56
                                                                }
                                                            }
                                                        },
                                                        'start': 52,
                                                        'end': 57,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 52
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 57
                                                            }
                                                        }
                                                    },
                                                    'start': 39,
                                                    'end': 57,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 39
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 57
                                                        }
                                                    }
                                                }
                                            ],
                                            'start': 37,
                                            'end': 59,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 37
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 59
                                                }
                                            }
                                        },
                                        'params': [],
                                        'id': null,
                                        'async': false,
                                        'generator': false,
                                        'expression': false,
                                        'start': 31,
                                        'end': 59,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 31
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 59
                                            }
                                        }
                                    },
                                    'start': 24,
                                    'end': 59,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 24
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 59
                                        }
                                    }
                                }
                            ],
                            'start': 22,
                            'end': 61,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 22
                                },
                                'end': {
                                    'line': 1,
                                    'column': 61
                                }
                            }
                        },
                        'alternate': null,
                        'start': 15,
                        'end': 61,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 15
                            },
                            'end': {
                                'line': 1,
                                'column': 61
                            }
                        }
                    }
                ],
                'start': 13,
                'end': 63,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 13
                    },
                    'end': {
                        'line': 1,
                        'column': 63
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f',
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
            'end': 63,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 63
                }
            }
        }
    ],
    'start': 0,
    'end': 63,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 63
        }
    }
}],
  ['if (1) { eval(42) }', 'if (1) { eval(42) }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'IfStatement',
            'test': {
                'type': 'Literal',
                raw: null,
                'value': 1,
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
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'CallExpression',
                            'callee': {
                                'type': 'Identifier',
                                'name': 'eval',
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
                            'arguments': [
                                {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 42,
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
                                }
                            ],
                            'start': 9,
                            'end': 17,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 9
                                },
                                'end': {
                                    'line': 1,
                                    'column': 17
                                }
                            }
                        },
                        'start': 9,
                        'end': 17,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 9
                            },
                            'end': {
                                'line': 1,
                                'column': 17
                            }
                        }
                    }
                ],
                'start': 7,
                'end': 19,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 19
                    }
                }
            },
            'alternate': null,
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
  ['if (true) if (false) {} else ; else {}', 'if (true) if (false) {} else ; else {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'IfStatement',
            'test': {
                'type': 'Literal',
                'value': true,
                'start': 4,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'consequent': {
                'type': 'IfStatement',
                'test': {
                    'type': 'Literal',
                    'value': false,
                    'start': 14,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 14
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                },
                'consequent': {
                    'type': 'BlockStatement',
                    'body': [],
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
                'alternate': {
                    'type': 'EmptyStatement',
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
                'start': 10,
                'end': 30,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 30
                    }
                }
            },
            'alternate': {
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
  ['if (true) try {} finally {} else {}', 'if (true) try {} finally {} else {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'IfStatement',
            'test': {
                'type': 'Literal',
                'value': true,
                'start': 4,
                'end': 8,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 4
                    },
                    'end': {
                        'line': 1,
                        'column': 8
                    }
                }
            },
            'consequent': {
                'type': 'TryStatement',
                'block': {
                    'type': 'BlockStatement',
                    'body': [],
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
                'handler': null,
                'finalizer': {
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
                'start': 10,
                'end': 27,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 10
                    },
                    'end': {
                        'line': 1,
                        'column': 27
                    }
                }
            },
            'alternate': {
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
  ['6; if (true) { 7; } else { 8; }', '6; if (true) { 7; } else { 8; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Literal',
                raw: null,
                'value': 6,
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
            'start': 0,
            'end': 2,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 2
                }
            }
        },
        {
            'type': 'IfStatement',
            'test': {
                'type': 'Literal',
                'value': true,
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
            },
            'consequent': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'Literal',
                            raw: null,
                            'value': 7,
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
            'alternate': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'Literal',
                            raw: null,
                            'value': 8,
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
                    }
                ],
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
            },
            'start': 3,
            'end': 31,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 3
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
  ['if(a)b', 'if(a)b', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'IfStatement',
            'test': {
                'type': 'Identifier',
                'name': 'a',
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
            'consequent': {
                'type': 'ExpressionStatement',
                'expression': {
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
                },
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
            'alternate': null,
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
['if (a) b()', 'if (a) b()', Context.OptionsRanges | Context.OptionsLoc, {
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
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
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
                  },
                  'arguments': [],
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
          'alternate': null,
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
['if (true) if (false) {} else ; else {}', 'if (true) if (false) {} else ; else {}', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'IfStatement',
          'test': {
              'type': 'Literal',
              'value': true,
              'start': 4,
              'end': 8,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 4
                  },
                  'end': {
                      'line': 1,
                      'column': 8
                  }
              }
          },
          'consequent': {
              'type': 'IfStatement',
              'test': {
                  'type': 'Literal',
                  'value': false,
                  'start': 14,
                  'end': 19,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 14
                      },
                      'end': {
                          'line': 1,
                          'column': 19
                      }
                  }
              },
              'consequent': {
                  'type': 'BlockStatement',
                  'body': [],
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
              'alternate': {
                  'type': 'EmptyStatement',
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
              'start': 10,
              'end': 30,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 10
                  },
                  'end': {
                      'line': 1,
                      'column': 30
                  }
              }
          },
          'alternate': {
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
];

const invalids: Array < [string, string, Context, any] > = [
  // Esprima issue: https://github.com/jquery/esprima/issues/1866
  ['if (true) class C {} else class D {}', 'if (true) class C {} else class D {}', Context.Empty, {}],
  ['if true;', 'if true;', Context.Empty, {}],
  ['if(!(1))', 'if(!(1))', Context.Empty, {}],
  ['if(!(true))', 'if(!(true))', Context.Empty, {}],
  ['if(!("A"))', 'if(!("A"))', Context.Empty, {}],
  ['if (false) label1: label2: function test262() {} else ;', 'if (false) label1: label2: function test262() {} else ;', Context.Empty, {}],
//  ['if (false) ; else function* g() {  }', 'if (false) ; else function* g() {  }', Context.Empty, {}],
  ['if (true) let x; else let y;', 'if (true) let x; else let y;', Context.Empty, {}],
  ['if (false) ; else class C {}', 'if (false) ; else class C {}', Context.Empty, {}],
  ['if (false) ; else async function f() {  }', 'if (false) ; else async function f() {  }', Context.Empty, {}],
  ['if (true) ; else label1: label2: function test262() {}', 'if (true) ; else label1: label2: function test262() {}', Context.Empty, {}],
 // ['if (true) function* g() {  } else ;', 'if (true) function* g() {  } else ;', Context.Empty, {}],
  ['if (true) class C {}', 'if (true) classif (true) class C {}', Context.Empty, {}],
  ['if (true) const x = null;', 'if (true) const x = null;', Context.Empty, {}],
  ['if (true) function f() {  } else', 'if (true) function f() {  } else', Context.Empty, {}],
  ['if (false) ; else let x;', 'if (false) ; else let x;', Context.Empty, {}],
  ['if (true) async function f() {  } else ;', 'if (true) async function f() {  } else ;', Context.Empty, {}],
  ['if();', 'if();', Context.Empty, {}],
  [`if({1})
  {
    ;
  }else
  {
    ;
  }`, `if({1})
  {
    ;
  }else
  {
    ;
  }`, Context.Empty, {}],

];

fail('Statements - If (failures)', invalids);
pass('Statements - If (pass)', valids);

});

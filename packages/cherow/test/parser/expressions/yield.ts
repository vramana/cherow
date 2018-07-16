import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Yield', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['function foo() { function *g() { yield ~x } }', 'function foo() { function *g() { yield ~x } }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'FunctionDeclaration',
                        'params': [],
                        'body': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'YieldExpression',
                                        'argument': {
                                            'type': 'UnaryExpression',
                                            'operator': '~',
                                            'argument': {
                                                'type': 'Identifier',
                                                'name': 'x',
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
                                            'prefix': true,
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
                                        'delegate': false,
                                        'start': 33,
                                        'end': 41,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 33
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 41
                                            }
                                        }
                                    },
                                    'start': 33,
                                    'end': 41,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 33
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 41
                                        }
                                    }
                                }
                            ],
                            'start': 31,
                            'end': 43,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 31
                                },
                                'end': {
                                    'line': 1,
                                    'column': 43
                                }
                            }
                        },
                        'async': false,
                        'generator': true,
                        'expression': false,
                        'id': {
                            'type': 'Identifier',
                            'name': 'g',
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
                        'end': 43,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 43
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 45,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 45
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
            },
            'start': 0,
            'end': 45,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 45
                }
            }
        }
    ],
    'start': 0,
    'end': 45,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 45
        }
    }
}],
  ['function foo() { function* a(){(class {[yield](){}})}; }', 'function foo() { function* a(){(class {[yield](){}})}; }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'FunctionDeclaration',
                        'params': [],
                        'body': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'ClassExpression',
                                        'id': null,
                                        'superClass': null,
                                        'body': {
                                            'type': 'ClassBody',
                                            'body': [
                                                {
                                                    'type': 'MethodDefinition',
                                                    'kind': 'method',
                                                    'static': false,
                                                    'computed': true,
                                                    'key': {
                                                        'type': 'YieldExpression',
                                                        'argument': null,
                                                        'delegate': false,
                                                        'start': 40,
                                                        'end': 45,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 40
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 45
                                                            }
                                                        }
                                                    },
                                                    'value': {
                                                        'type': 'FunctionExpression',
                                                        'params': [],
                                                        'body': {
                                                            'type': 'BlockStatement',
                                                            'body': [],
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
                                                        'async': false,
                                                        'generator': false,
                                                        'expression': false,
                                                        'id': null,
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
                                                    'start': 39,
                                                    'end': 50,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 39
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 50
                                                        }
                                                    }
                                                }
                                            ],
                                            'start': 38,
                                            'end': 51,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 38
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 51
                                                }
                                            }
                                        },
                                        'start': 32,
                                        'end': 51,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 32
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 51
                                            }
                                        }
                                    },
                                    'start': 31,
                                    'end': 52,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 31
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 52
                                        }
                                    }
                                }
                            ],
                            'start': 30,
                            'end': 53,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 30
                                },
                                'end': {
                                    'line': 1,
                                    'column': 53
                                }
                            }
                        },
                        'async': false,
                        'generator': true,
                        'expression': false,
                        'id': {
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
                        },
                        'start': 17,
                        'end': 53,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 53
                            }
                        }
                    },
                    {
                        'type': 'EmptyStatement',
                        'start': 53,
                        'end': 54,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 53
                            },
                            'end': {
                                'line': 1,
                                'column': 54
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 56,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
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
            'id': {
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
            },
            'start': 0,
            'end': 56,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 56
                }
            }
        }
    ],
    'start': 0,
    'end': 56,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 56
        }
    }
}],
  ['function foo() { function *a(){({set b(yield){}})} }', 'function foo() { function *a(){({set b(yield){}})} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'FunctionDeclaration',
                        'params': [],
                        'body': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'ObjectExpression',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'b',
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
                                                    'type': 'FunctionExpression',
                                                    'params': [
                                                        {
                                                            'type': 'Identifier',
                                                            'name': 'yield',
                                                            'start': 39,
                                                            'end': 44,
                                                            'loc': {
                                                                'start': {
                                                                    'line': 1,
                                                                    'column': 39
                                                                },
                                                                'end': {
                                                                    'line': 1,
                                                                    'column': 44
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
                                                    'id': null,
                                                    'start': 38,
                                                    'end': 47,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 38
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 47
                                                        }
                                                    }
                                                },
                                                'kind': 'set',
                                                'computed': false,
                                                'method': false,
                                                'shorthand': false,
                                                'start': 33,
                                                'end': 47,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 33
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 47
                                                    }
                                                }
                                            }
                                        ],
                                        'start': 32,
                                        'end': 48,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 32
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 48
                                            }
                                        }
                                    },
                                    'start': 31,
                                    'end': 49,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 31
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 49
                                        }
                                    }
                                }
                            ],
                            'start': 30,
                            'end': 50,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 30
                                },
                                'end': {
                                    'line': 1,
                                    'column': 50
                                }
                            }
                        },
                        'async': false,
                        'generator': true,
                        'expression': false,
                        'id': {
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
                        },
                        'start': 17,
                        'end': 50,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 50
                            }
                        }
                    }
                ],
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
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
  ['function foo() { function a(){({*[yield](){}})} }', 'function foo() { function a(){({*[yield](){}})} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'FunctionDeclaration',
                        'params': [],
                        'body': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'ObjectExpression',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'yield',
                                                    'start': 34,
                                                    'end': 39,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 34
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 39
                                                        }
                                                    }
                                                },
                                                'value': {
                                                    'type': 'FunctionExpression',
                                                    'params': [],
                                                    'body': {
                                                        'type': 'BlockStatement',
                                                        'body': [],
                                                        'start': 42,
                                                        'end': 44,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 42
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 44
                                                            }
                                                        }
                                                    },
                                                    'async': false,
                                                    'generator': true,
                                                    'expression': false,
                                                    'id': null,
                                                    'start': 40,
                                                    'end': 44,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 40
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 44
                                                        }
                                                    }
                                                },
                                                'kind': 'init',
                                                'computed': true,
                                                'method': true,
                                                'shorthand': false,
                                                'start': 32,
                                                'end': 44,
                                                'loc': {
                                                    'start': {
                                                        'line': 1,
                                                        'column': 32
                                                    },
                                                    'end': {
                                                        'line': 1,
                                                        'column': 44
                                                    }
                                                }
                                            }
                                        ],
                                        'start': 31,
                                        'end': 45,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 31
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 45
                                            }
                                        }
                                    },
                                    'start': 30,
                                    'end': 46,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 30
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 46
                                        }
                                    }
                                }
                            ],
                            'start': 29,
                            'end': 47,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 29
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
                        'start': 17,
                        'end': 47,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 47
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 49,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 49
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
            },
            'start': 0,
            'end': 49,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 49
                }
            }
        }
    ],
    'start': 0,
    'end': 49,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 49
        }
    }
}],
  ['function foo() { function *a(){yield ++a;} }', 'function foo() { function *a(){yield ++a;} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'FunctionDeclaration',
                        'params': [],
                        'body': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'YieldExpression',
                                        'argument': {
                                            'type': 'UpdateExpression',
                                            'argument': {
                                                'type': 'Identifier',
                                                'name': 'a',
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
                                            'operator': '++',
                                            'prefix': true,
                                            'start': 37,
                                            'end': 40,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 37
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 40
                                                }
                                            }
                                        },
                                        'delegate': false,
                                        'start': 31,
                                        'end': 40,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 31
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 40
                                            }
                                        }
                                    },
                                    'start': 31,
                                    'end': 41,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 31
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 41
                                        }
                                    }
                                }
                            ],
                            'start': 30,
                            'end': 42,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 30
                                },
                                'end': {
                                    'line': 1,
                                    'column': 42
                                }
                            }
                        },
                        'async': false,
                        'generator': true,
                        'expression': false,
                        'id': {
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
                        },
                        'start': 17,
                        'end': 42,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 42
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 44,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 44
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
            },
            'start': 0,
            'end': 44,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 44
                }
            }
        }
    ],
    'start': 0,
    'end': 44,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 44
        }
    }
}],
  ['function foo() { ({ get yield() { 1 } }) }', 'function foo() { ({ get yield() { 1 } }) }', Context.OptionsRanges | Context.OptionsLoc, {
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
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'yield',
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
                                    'value': {
                                        'type': 'FunctionExpression',
                                        'params': [],
                                        'body': {
                                            'type': 'BlockStatement',
                                            'body': [
                                                {
                                                    'type': 'ExpressionStatement',
                                                    'expression': {
                                                        'type': 'Literal',
                                                        raw: null,
                                                        'value': 1,
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
                                                    },
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
                                            'start': 32,
                                            'end': 37,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 32
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 37
                                                }
                                            }
                                        },
                                        'async': false,
                                        'generator': false,
                                        'expression': false,
                                        'id': null,
                                        'start': 29,
                                        'end': 37,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 29
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 37
                                            }
                                        }
                                    },
                                    'kind': 'get',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false,
                                    'start': 20,
                                    'end': 37,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 20
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 37
                                        }
                                    }
                                }
                            ],
                            'start': 18,
                            'end': 39,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 18
                                },
                                'end': {
                                    'line': 1,
                                    'column': 39
                                }
                            }
                        },
                        'start': 17,
                        'end': 40,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 40
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 42,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 42
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
            },
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
  ['function foo() {++yield; }', 'function foo() { ++yield; }', Context.OptionsRanges | Context.OptionsLoc, {
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
                            'type': 'UpdateExpression',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'yield',
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
                            'operator': '++',
                            'prefix': true,
                            'start': 17,
                            'end': 24,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 17
                                },
                                'end': {
                                    'line': 1,
                                    'column': 24
                                }
                            }
                        },
                        'start': 17,
                        'end': 25,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 25
                            }
                        }
                    }
                ],
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
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
  ['function foo() { class C { *gf() { switch (1) { case yield: break; } } } }', 'function foo() { class C { *gf() { switch (1) { case yield: break; } } } }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'ClassDeclaration',
                        'id': {
                            'type': 'Identifier',
                            'name': 'C',
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
                        'superClass': null,
                        'body': {
                            'type': 'ClassBody',
                            'body': [
                                {
                                    'type': 'MethodDefinition',
                                    'kind': 'method',
                                    'static': false,
                                    'computed': false,
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'gf',
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
                                    'value': {
                                        'type': 'FunctionExpression',
                                        'params': [],
                                        'body': {
                                            'type': 'BlockStatement',
                                            'body': [
                                                {
                                                    'type': 'SwitchStatement',
                                                    'discriminant': {
                                                        'type': 'Literal',
                                                        raw: null,
                                                        'value': 1,
                                                        'start': 43,
                                                        'end': 44,
                                                        'loc': {
                                                            'start': {
                                                                'line': 1,
                                                                'column': 43
                                                            },
                                                            'end': {
                                                                'line': 1,
                                                                'column': 44
                                                            }
                                                        }
                                                    },
                                                    'cases': [
                                                        {
                                                            'type': 'SwitchCase',
                                                            'test': {
                                                                'type': 'YieldExpression',
                                                                'argument': null,
                                                                'delegate': false,
                                                                'start': 53,
                                                                'end': 58,
                                                                'loc': {
                                                                    'start': {
                                                                        'line': 1,
                                                                        'column': 53
                                                                    },
                                                                    'end': {
                                                                        'line': 1,
                                                                        'column': 58
                                                                    }
                                                                }
                                                            },
                                                            'consequent': [
                                                                {
                                                                    'type': 'BreakStatement',
                                                                    'label': null,
                                                                    'start': 60,
                                                                    'end': 66,
                                                                    'loc': {
                                                                        'start': {
                                                                            'line': 1,
                                                                            'column': 60
                                                                        },
                                                                        'end': {
                                                                            'line': 1,
                                                                            'column': 66
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            'start': 48,
                                                            'end': 66,
                                                            'loc': {
                                                                'start': {
                                                                    'line': 1,
                                                                    'column': 48
                                                                },
                                                                'end': {
                                                                    'line': 1,
                                                                    'column': 66
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    'start': 35,
                                                    'end': 68,
                                                    'loc': {
                                                        'start': {
                                                            'line': 1,
                                                            'column': 35
                                                        },
                                                        'end': {
                                                            'line': 1,
                                                            'column': 68
                                                        }
                                                    }
                                                }
                                            ],
                                            'start': 33,
                                            'end': 70,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 33
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 70
                                                }
                                            }
                                        },
                                        'async': false,
                                        'generator': true,
                                        'expression': false,
                                        'id': null,
                                        'start': 30,
                                        'end': 70,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 30
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 70
                                            }
                                        }
                                    },
                                    'start': 27,
                                    'end': 70,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 70
                                        }
                                    }
                                }
                            ],
                            'start': 25,
                            'end': 72,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 25
                                },
                                'end': {
                                    'line': 1,
                                    'column': 72
                                }
                            }
                        },
                        'start': 17,
                        'end': 72,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 72
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 74,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 74
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
            },
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
        }
    ],
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
  ['function foo() { function foo(yield) { } }', 'function foo() { function foo(yield) { } }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'FunctionDeclaration',
                        'params': [
                            {
                                'type': 'Identifier',
                                'name': 'yield',
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
                        'body': {
                            'type': 'BlockStatement',
                            'body': [],
                            'start': 37,
                            'end': 40,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 37
                                },
                                'end': {
                                    'line': 1,
                                    'column': 40
                                }
                            }
                        },
                        'async': false,
                        'generator': false,
                        'expression': false,
                        'id': {
                            'type': 'Identifier',
                            'name': 'foo',
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
                        'start': 17,
                        'end': 40,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 17
                            },
                            'end': {
                                'line': 1,
                                'column': 40
                            }
                        }
                    }
                ],
                'start': 15,
                'end': 42,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 42
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
            },
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
  ['function foo() {var foo, yield; }', 'function foo() { var foo, yield; }', Context.OptionsRanges | Context.OptionsLoc, {
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
                        'type': 'VariableDeclaration',
                        'kind': 'var',
                        'declarations': [
                            {
                                'type': 'VariableDeclarator',
                                'init': null,
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'foo',
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
                            {
                                'type': 'VariableDeclarator',
                                'init': null,
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'yield',
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
                    }
                ],
                'start': 15,
                'end': 34,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 34
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
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
  ['function foo() { var yield; }', 'function foo() { var yield; }', Context.OptionsRanges, {
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
                        'type': 'VariableDeclaration',
                        'kind': 'var',
                        'declarations': [
                            {
                                'type': 'VariableDeclarator',
                                'init': null,
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'yield',
                                    'start': 21,
                                    'end': 26
                                },
                                'start': 21,
                                'end': 26
                            }
                        ],
                        'start': 17,
                        'end': 27
                    }
                ],
                'start': 15,
                'end': 29
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 9,
                'end': 12
            },
            'start': 0,
            'end': 29
        }
    ],
    'start': 0,
    'end': 29
}],
 // ['function foo() { yield[100] }', 'function foo() { yield[100] }', Context.OptionsRanges, {}],
 // ['function foo() { yield[100] }', 'function foo() { yield[100] }', Context.OptionsRanges, {}],
  //['function foo() { yield[100] }', 'function foo() { yield[100] }', Context.OptionsRanges, {}],
  //['function foo() { yield[100] }', 'function foo() { yield[100] }', Context.OptionsRanges, {}],
  //['function foo() { yield[100] }', 'function foo() { yield[100] }', Context.OptionsRanges, {}],
  //['function foo() { yield[100] }', 'function foo() { yield[100] }', Context.OptionsRanges, {}],
  //['function foo() { yield[100] }', 'function foo() { yield[100] }', Context.OptionsRanges, {}],
  ['(function* f(){ yield })', '(function* f(){ yield })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
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
                                'start': 16,
                                'end': 21
                            },
                            'start': 16,
                            'end': 21
                        }
                    ],
                    'start': 14,
                    'end': 23
                },
                'async': false,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 11,
                    'end': 12
                },
                'start': 1,
                'end': 23
            },
            'start': 0,
            'end': 24
        }
    ],
    'start': 0,
    'end': 24
}],
['(function* f(){ yield x + y })', '(function* f(){ yield x + y })', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'FunctionExpression',
              'params': [],
              'body': {
                  'type': 'BlockStatement',
                  'body': [
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'YieldExpression',
                              'argument': {
                                  'type': 'BinaryExpression',
                                  'left': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 22,
                                      'end': 23
                                  },
                                  'right': {
                                      'type': 'Identifier',
                                      'name': 'y',
                                      'start': 26,
                                      'end': 27
                                  },
                                  'operator': '+',
                                  'start': 22,
                                  'end': 27
                              },
                              'delegate': false,
                              'start': 16,
                              'end': 27
                          },
                          'start': 16,
                          'end': 27
                      }
                  ],
                  'start': 14,
                  'end': 29
              },
              'async': false,
              'generator': true,
              'expression': false,
              'id': {
                  'type': 'Identifier',
                  'name': 'f',
                  'start': 11,
                  'end': 12
              },
              'start': 1,
              'end': 29
          },
          'start': 0,
          'end': 30
      }
  ],
  'start': 0,
  'end': 30
}],
['function foo() { function *a(){yield delete 0}}', 'function foo() { function *a(){yield delete 0} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'FunctionDeclaration',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'type': 'YieldExpression',
                                      'argument': {
                                          'type': 'UnaryExpression',
                                          'operator': 'delete',
                                          'argument': {
                                              'type': 'Literal',
                                              raw: null,
                                              'value': 0,
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
                                          },
                                          'prefix': true,
                                          'start': 37,
                                          'end': 45,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 37
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 45
                                              }
                                          }
                                      },
                                      'delegate': false,
                                      'start': 31,
                                      'end': 45,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 31
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 45
                                          }
                                      }
                                  },
                                  'start': 31,
                                  'end': 45,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 31
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 45
                                      }
                                  }
                              }
                          ],
                          'start': 30,
                          'end': 46,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 30
                              },
                              'end': {
                                  'line': 1,
                                  'column': 46
                              }
                          }
                      },
                      'async': false,
                      'generator': true,
                      'expression': false,
                      'id': {
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
                      },
                      'start': 17,
                      'end': 46,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 17
                          },
                          'end': {
                              'line': 1,
                              'column': 46
                          }
                      }
                  }
              ],
              'start': 15,
              'end': 48,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
                  },
                  'end': {
                      'line': 1,
                      'column': 48
                  }
              }
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
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
          },
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
['function foo() { function*a(){yield*a} }', 'function foo() { function*a(){yield*a} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'FunctionDeclaration',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'type': 'YieldExpression',
                                      'argument': {
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
                                      },
                                      'delegate': true,
                                      'start': 30,
                                      'end': 37,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 30
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 37
                                          }
                                      }
                                  },
                                  'start': 30,
                                  'end': 37,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 30
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
                      },
                      'async': false,
                      'generator': true,
                      'expression': false,
                      'id': {
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
                      'start': 17,
                      'end': 38,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 17
                          },
                          'end': {
                              'line': 1,
                              'column': 38
                          }
                      }
                  }
              ],
              'start': 15,
              'end': 40,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
                  },
                  'end': {
                      'line': 1,
                      'column': 40
                  }
              }
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
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
['function foo() { function * gen() { (yield) ? yield : yield } }', 'function foo() { function * gen() { (yield) ? yield : yield } }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'FunctionDeclaration',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'type': 'ConditionalExpression',
                                      'test': {
                                          'type': 'YieldExpression',
                                          'argument': null,
                                          'delegate': false,
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
                                      },
                                      'consequent': {
                                          'type': 'YieldExpression',
                                          'argument': null,
                                          'delegate': false,
                                          'start': 46,
                                          'end': 51,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 46
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 51
                                              }
                                          }
                                      },
                                      'alternate': {
                                          'type': 'YieldExpression',
                                          'argument': null,
                                          'delegate': false,
                                          'start': 54,
                                          'end': 59,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 54
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 59
                                              }
                                          }
                                      },
                                      'start': 36,
                                      'end': 59,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 36
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 59
                                          }
                                      }
                                  },
                                  'start': 36,
                                  'end': 59,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 36
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 59
                                      }
                                  }
                              }
                          ],
                          'start': 34,
                          'end': 61,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 34
                              },
                              'end': {
                                  'line': 1,
                                  'column': 61
                              }
                          }
                      },
                      'async': false,
                      'generator': true,
                      'expression': false,
                      'id': {
                          'type': 'Identifier',
                          'name': 'gen',
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
                      },
                      'start': 17,
                      'end': 61,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 17
                          },
                          'end': {
                              'line': 1,
                              'column': 61
                          }
                      }
                  }
              ],
              'start': 15,
              'end': 63,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
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
['function foo() { (function * gen() { (function not_gen() { try { } catch (yield) { } }) }) }', 'function foo() { (function * gen() { (function not_gen() { try { } catch (yield) { } }) }) }', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'FunctionExpression',
                          'params': [],
                          'body': {
                              'type': 'BlockStatement',
                              'body': [
                                  {
                                      'type': 'ExpressionStatement',
                                      'expression': {
                                          'type': 'FunctionExpression',
                                          'params': [],
                                          'body': {
                                              'type': 'BlockStatement',
                                              'body': [
                                                  {
                                                      'type': 'TryStatement',
                                                      'block': {
                                                          'type': 'BlockStatement',
                                                          'body': [],
                                                          'start': 63,
                                                          'end': 66,
                                                          'loc': {
                                                              'start': {
                                                                  'line': 1,
                                                                  'column': 63
                                                              },
                                                              'end': {
                                                                  'line': 1,
                                                                  'column': 66
                                                              }
                                                          }
                                                      },
                                                      'handler': {
                                                          'type': 'CatchClause',
                                                          'param': {
                                                              'type': 'Identifier',
                                                              'name': 'yield',
                                                              'start': 74,
                                                              'end': 79,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 1,
                                                                      'column': 74
                                                                  },
                                                                  'end': {
                                                                      'line': 1,
                                                                      'column': 79
                                                                  }
                                                              }
                                                          },
                                                          'body': {
                                                              'type': 'BlockStatement',
                                                              'body': [],
                                                              'start': 81,
                                                              'end': 84,
                                                              'loc': {
                                                                  'start': {
                                                                      'line': 1,
                                                                      'column': 81
                                                                  },
                                                                  'end': {
                                                                      'line': 1,
                                                                      'column': 84
                                                                  }
                                                              }
                                                          },
                                                          'start': 67,
                                                          'end': 84,
                                                          'loc': {
                                                              'start': {
                                                                  'line': 1,
                                                                  'column': 67
                                                              },
                                                              'end': {
                                                                  'line': 1,
                                                                  'column': 84
                                                              }
                                                          }
                                                      },
                                                      'finalizer': null,
                                                      'start': 59,
                                                      'end': 84,
                                                      'loc': {
                                                          'start': {
                                                              'line': 1,
                                                              'column': 59
                                                          },
                                                          'end': {
                                                              'line': 1,
                                                              'column': 84
                                                          }
                                                      }
                                                  }
                                              ],
                                              'start': 57,
                                              'end': 86,
                                              'loc': {
                                                  'start': {
                                                      'line': 1,
                                                      'column': 57
                                                  },
                                                  'end': {
                                                      'line': 1,
                                                      'column': 86
                                                  }
                                              }
                                          },
                                          'async': false,
                                          'generator': false,
                                          'expression': false,
                                          'id': {
                                              'type': 'Identifier',
                                              'name': 'not_gen',
                                              'start': 47,
                                              'end': 54,
                                              'loc': {
                                                  'start': {
                                                      'line': 1,
                                                      'column': 47
                                                  },
                                                  'end': {
                                                      'line': 1,
                                                      'column': 54
                                                  }
                                              }
                                          },
                                          'start': 38,
                                          'end': 86,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 38
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 86
                                              }
                                          }
                                      },
                                      'start': 37,
                                      'end': 87,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 37
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 87
                                          }
                                      }
                                  }
                              ],
                              'start': 35,
                              'end': 89,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 35
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 89
                                  }
                              }
                          },
                          'async': false,
                          'generator': true,
                          'expression': false,
                          'id': {
                              'type': 'Identifier',
                              'name': 'gen',
                              'start': 29,
                              'end': 32,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 29
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 32
                                  }
                              }
                          },
                          'start': 18,
                          'end': 89,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 18
                              },
                              'end': {
                                  'line': 1,
                                  'column': 89
                              }
                          }
                      },
                      'start': 17,
                      'end': 90,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 17
                          },
                          'end': {
                              'line': 1,
                              'column': 90
                          }
                      }
                  }
              ],
              'start': 15,
              'end': 92,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
                  },
                  'end': {
                      'line': 1,
                      'column': 92
                  }
              }
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
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
          },
          'start': 0,
          'end': 92,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 92
              }
          }
      }
  ],
  'start': 0,
  'end': 92,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 92
      }
  }
}],
['function foo() { function * gen() { yield yield a; } }', 'function foo() { function * gen() { yield yield a; } }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'FunctionDeclaration',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'type': 'YieldExpression',
                                      'argument': {
                                          'type': 'YieldExpression',
                                          'argument': {
                                              'type': 'Identifier',
                                              'name': 'a',
                                              'start': 48,
                                              'end': 49,
                                              'loc': {
                                                  'start': {
                                                      'line': 1,
                                                      'column': 48
                                                  },
                                                  'end': {
                                                      'line': 1,
                                                      'column': 49
                                                  }
                                              }
                                          },
                                          'delegate': false,
                                          'start': 42,
                                          'end': 49,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 42
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 49
                                              }
                                          }
                                      },
                                      'delegate': false,
                                      'start': 36,
                                      'end': 49,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 36
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 49
                                          }
                                      }
                                  },
                                  'start': 36,
                                  'end': 50,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 36
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 50
                                      }
                                  }
                              }
                          ],
                          'start': 34,
                          'end': 52,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 34
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
                          'name': 'gen',
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
                      },
                      'start': 17,
                      'end': 52,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 17
                          },
                          'end': {
                              'line': 1,
                              'column': 52
                          }
                      }
                  }
              ],
              'start': 15,
              'end': 54,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
                  },
                  'end': {
                      'line': 1,
                      'column': 54
                  }
              }
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
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
          },
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
['function foo() { function * gen() { yield * a; return } }', 'function foo() { function * gen() { yield * a; return } }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'FunctionDeclaration',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'type': 'YieldExpression',
                                      'argument': {
                                          'type': 'Identifier',
                                          'name': 'a',
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
                                      },
                                      'delegate': true,
                                      'start': 36,
                                      'end': 45,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 36
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 45
                                          }
                                      }
                                  },
                                  'start': 36,
                                  'end': 46,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 36
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 46
                                      }
                                  }
                              },
                              {
                                  'type': 'ReturnStatement',
                                  'argument': null,
                                  'start': 47,
                                  'end': 53,
                                  'loc': {
                                      'start': {
                                          'line': 1,
                                          'column': 47
                                      },
                                      'end': {
                                          'line': 1,
                                          'column': 53
                                      }
                                  }
                              }
                          ],
                          'start': 34,
                          'end': 55,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 34
                              },
                              'end': {
                                  'line': 1,
                                  'column': 55
                              }
                          }
                      },
                      'async': false,
                      'generator': true,
                      'expression': false,
                      'id': {
                          'type': 'Identifier',
                          'name': 'gen',
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
                      },
                      'start': 17,
                      'end': 55,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 17
                          },
                          'end': {
                              'line': 1,
                              'column': 55
                          }
                      }
                  }
              ],
              'start': 15,
              'end': 57,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
                  },
                  'end': {
                      'line': 1,
                      'column': 57
                  }
              }
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
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
          },
          'start': 0,
          'end': 57,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 57
              }
          }
      }
  ],
  'start': 0,
  'end': 57,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 57
      }
  }
}],
['+function yield() {}', '+function yield() {}', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'UnaryExpression',
              'operator': '+',
              'argument': {
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
                  'id': {
                      'type': 'Identifier',
                      'name': 'yield',
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
              'prefix': true,
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
['function *foo() { function b() {} function *b() {} }', 'function *foo() { function b() {} function *b() {} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'FunctionDeclaration',
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
                      'generator': false,
                      'expression': false,
                      'id': {
                          'type': 'Identifier',
                          'name': 'b',
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
                      'start': 18,
                      'end': 33,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 18
                          },
                          'end': {
                              'line': 1,
                              'column': 33
                          }
                      }
                  },
                  {
                      'type': 'FunctionDeclaration',
                      'params': [],
                      'body': {
                          'type': 'BlockStatement',
                          'body': [],
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
                      'async': false,
                      'generator': true,
                      'expression': false,
                      'id': {
                          'type': 'Identifier',
                          'name': 'b',
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
                      },
                      'start': 34,
                      'end': 50,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 34
                          },
                          'end': {
                              'line': 1,
                              'column': 50
                          }
                      }
                  }
              ],
              'start': 16,
              'end': 52,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 16
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
              'name': 'foo',
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
['function fn(x = yield* yield) {}', 'function fn(x = yield* yield) {}', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'FunctionDeclaration',
          'params': [
              {
                  'type': 'AssignmentPattern',
                  'left': {
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
                  'right': {
                      'type': 'BinaryExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'yield',
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
                      'right': {
                          'type': 'Identifier',
                          'name': 'yield',
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
                      'operator': '*',
                      'start': 16,
                      'end': 28,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 16
                          },
                          'end': {
                              'line': 1,
                              'column': 28
                          }
                      }
                  },
                  'start': 12,
                  'end': 28,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 12
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
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'fn',
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
['function *foo() { () => {} }', 'function *foo() { () => {} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'ArrowFunctionExpression',
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
                          'params': [],
                          'id': null,
                          'async': false,
                          'generator': false,
                          'expression': false,
                          'start': 18,
                          'end': 26,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 18
                              },
                              'end': {
                                  'line': 1,
                                  'column': 26
                              }
                          }
                      },
                      'start': 18,
                      'end': 26,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 18
                          },
                          'end': {
                              'line': 1,
                              'column': 26
                          }
                      }
                  }
              ],
              'start': 16,
              'end': 28,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 16
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
          'id': {
              'type': 'Identifier',
              'name': 'foo',
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
['function foo() { function *b() {} }', 'function foo() { function *b() {} }', Context.OptionsRanges | Context.OptionsLoc, {
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
                      'type': 'FunctionDeclaration',
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
                          'name': 'b',
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
                  }
              ],
              'start': 15,
              'end': 35,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 15
                  },
                  'end': {
                      'line': 1,
                      'column': 35
                  }
              }
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
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
['(x = yield) => {}', '(x = yield) => {}', Context.OptionsRanges | Context.OptionsLoc, {
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
              'params': [
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'x',
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
                      'right': {
                          'type': 'Identifier',
                          'name': 'yield',
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
              'id': null,
              'async': false,
              'generator': false,
              'expression': false,
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
['function * gen() { (yield * a) + (yield * b);; }', 'function * gen() { (yield * a) + (yield * b);; }', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'BinaryExpression',
                          'left': {
                              'type': 'YieldExpression',
                              'argument': {
                                  'type': 'Identifier',
                                  'name': 'a',
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
                              'delegate': true,
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
                          },
                          'right': {
                              'type': 'YieldExpression',
                              'argument': {
                                  'type': 'Identifier',
                                  'name': 'b',
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
                              'delegate': true,
                              'start': 34,
                              'end': 43,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 34
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 43
                                  }
                              }
                          },
                          'operator': '+',
                          'start': 19,
                          'end': 44,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 19
                              },
                              'end': {
                                  'line': 1,
                                  'column': 44
                              }
                          }
                      },
                      'start': 19,
                      'end': 45,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 19
                          },
                          'end': {
                              'line': 1,
                              'column': 45
                          }
                      }
                  },
                  {
                      'type': 'EmptyStatement',
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
                  }
              ],
              'start': 17,
              'end': 48,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 17
                  },
                  'end': {
                      'line': 1,
                      'column': 48
                  }
              }
          },
          'async': false,
          'generator': true,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'gen',
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
['function * gen() { yield, yield }', 'function * gen() { yield, yield }', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'SequenceExpression',
                          'expressions': [
                              {
                                  'type': 'YieldExpression',
                                  'argument': null,
                                  'delegate': false,
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
                              {
                                  'type': 'YieldExpression',
                                  'argument': null,
                                  'delegate': false,
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
                              }
                          ],
                          'start': 19,
                          'end': 31,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 19
                              },
                              'end': {
                                  'line': 1,
                                  'column': 31
                              }
                          }
                      },
                      'start': 19,
                      'end': 31,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 19
                          },
                          'end': {
                              'line': 1,
                              'column': 31
                          }
                      }
                  }
              ],
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
          'async': false,
          'generator': true,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'gen',
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
['function * gen() { (yield) ? yield : yield }', 'function * gen() { (yield) ? yield : yield }', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'ConditionalExpression',
                          'test': {
                              'type': 'YieldExpression',
                              'argument': null,
                              'delegate': false,
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
                          'consequent': {
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
                          'alternate': {
                              'type': 'YieldExpression',
                              'argument': null,
                              'delegate': false,
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
                          },
                          'start': 19,
                          'end': 42,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 19
                              },
                              'end': {
                                  'line': 1,
                                  'column': 42
                              }
                          }
                      },
                      'start': 19,
                      'end': 42,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 19
                          },
                          'end': {
                              'line': 1,
                              'column': 42
                          }
                      }
                  }
              ],
              'start': 17,
              'end': 44,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 17
                  },
                  'end': {
                      'line': 1,
                      'column': 44
                  }
              }
          },
          'async': false,
          'generator': true,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'gen',
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
          'start': 0,
          'end': 44,
          'loc': {
              'start': {
                  'line': 1,
                  'column': 0
              },
              'end': {
                  'line': 1,
                  'column': 44
              }
          }
      }
  ],
  'start': 0,
  'end': 44,
  'loc': {
      'start': {
          'line': 1,
          'column': 0
      },
      'end': {
          'line': 1,
          'column': 44
      }
  }
}],
['function* a(){yield a}', 'function* a(){yield a}', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'argument': {
                              'type': 'Identifier',
                              'name': 'a',
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
                          'delegate': false,
                          'start': 14,
                          'end': 21,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 14
                              },
                              'end': {
                                  'line': 1,
                                  'column': 21
                              }
                          }
                      },
                      'start': 14,
                      'end': 21,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 21
                          }
                      }
                  }
              ],
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
          },
          'async': false,
          'generator': true,
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
['function* g(){(class extends (yield) {});}', 'function* g(){(class extends (yield) {});}', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'ClassExpression',
                          'id': null,
                          'superClass': {
                              'type': 'YieldExpression',
                              'argument': null,
                              'delegate': false,
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
                          'body': {
                              'type': 'ClassBody',
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
                          'start': 15,
                          'end': 39,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 39
                              }
                          }
                      },
                      'start': 14,
                      'end': 41,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 41
                          }
                      }
                  }
              ],
              'start': 13,
              'end': 42,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 13
                  },
                  'end': {
                      'line': 1,
                      'column': 42
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
['function* a(){(class {[yield](){}})};', 'function* a(){(class {[yield](){}})};', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'ClassExpression',
                          'id': null,
                          'superClass': null,
                          'body': {
                              'type': 'ClassBody',
                              'body': [
                                  {
                                      'type': 'MethodDefinition',
                                      'kind': 'method',
                                      'static': false,
                                      'computed': true,
                                      'key': {
                                          'type': 'YieldExpression',
                                          'argument': null,
                                          'delegate': false,
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
                                      'value': {
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
                                          'generator': false,
                                          'expression': false,
                                          'id': null,
                                          'start': 29,
                                          'end': 33,
                                          'loc': {
                                              'start': {
                                                  'line': 1,
                                                  'column': 29
                                              },
                                              'end': {
                                                  'line': 1,
                                                  'column': 33
                                              }
                                          }
                                      },
                                      'start': 22,
                                      'end': 33,
                                      'loc': {
                                          'start': {
                                              'line': 1,
                                              'column': 22
                                          },
                                          'end': {
                                              'line': 1,
                                              'column': 33
                                          }
                                      }
                                  }
                              ],
                              'start': 21,
                              'end': 34,
                              'loc': {
                                  'start': {
                                      'line': 1,
                                      'column': 21
                                  },
                                  'end': {
                                      'line': 1,
                                      'column': 34
                                  }
                              }
                          },
                          'start': 15,
                          'end': 34,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 34
                              }
                          }
                      },
                      'start': 14,
                      'end': 35,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 35
                          }
                      }
                  }
              ],
              'start': 13,
              'end': 36,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 13
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
      },
      {
          'type': 'EmptyStatement',
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
['function * gen() { yield /* comment */ }', 'function * gen() { yield /* comment */ }', Context.OptionsRanges | Context.OptionsLoc, {
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
                  }
              ],
              'start': 17,
              'end': 40,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 17
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
              'name': 'gen',
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
['function* a(){({[yield]:a}=0)}', 'function* a(){({[yield]:a}=0)}', Context.OptionsRanges | Context.OptionsLoc, {
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
                          'type': 'AssignmentExpression',
                          'left': {
                              'type': 'ObjectPattern',
                              'properties': [
                                  {
                                      'type': 'Property',
                                      'key': {
                                          'type': 'YieldExpression',
                                          'argument': null,
                                          'delegate': false,
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
                          'operator': '=',
                          'right': {
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
                          'start': 15,
                          'end': 28,
                          'loc': {
                              'start': {
                                  'line': 1,
                                  'column': 15
                              },
                              'end': {
                                  'line': 1,
                                  'column': 28
                              }
                          }
                      },
                      'start': 14,
                      'end': 29,
                      'loc': {
                          'start': {
                              'line': 1,
                              'column': 14
                          },
                          'end': {
                              'line': 1,
                              'column': 29
                          }
                      }
                  }
              ],
              'start': 13,
              'end': 30,
              'loc': {
                  'start': {
                      'line': 1,
                      'column': 13
                  },
                  'end': {
                      'line': 1,
                      'column': 30
                  }
              }
          },
          'async': false,
          'generator': true,
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

pass('Expressions - Yield (pass)', valids);

});

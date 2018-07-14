import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Function', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['(function foo() {})', '(function foo() {})', Context.OptionsRanges, {
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
                    'body': [],
                    'start': 16,
                    'end': 18
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 10,
                    'end': 13
                },
                'start': 1,
                'end': 18
            },
            'start': 0,
            'end': 19
        }
    ],
    'start': 0,
    'end': 19
}],
    ['(function foo(a) {})', '(function foo(a) {})', Context.OptionsRanges, {
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
                          'name': 'a',
                          'start': 14,
                          'end': 15
                      }
                  ],
                  'body': {
                      'type': 'BlockStatement',
                      'body': [],
                      'start': 17,
                      'end': 19
                  },
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'id': {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 10,
                      'end': 13
                  },
                  'start': 1,
                  'end': 19
              },
              'start': 0,
              'end': 20
          }
      ],
      'start': 0,
      'end': 20
  }],
    ['(function foo(a, b, c) {})', '(function foo(a, b, c) {})', Context.OptionsRanges, {
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
                          'name': 'a',
                          'start': 14,
                          'end': 15
                      },
                      {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 17,
                          'end': 18
                      },
                      {
                          'type': 'Identifier',
                          'name': 'c',
                          'start': 20,
                          'end': 21
                      }
                  ],
                  'body': {
                      'type': 'BlockStatement',
                      'body': [],
                      'start': 23,
                      'end': 25
                  },
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'id': {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 10,
                      'end': 13
                  },
                  'start': 1,
                  'end': 25
              },
              'start': 0,
              'end': 26
          }
      ],
      'start': 0,
      'end': 26
  }],
    ['(function () {})', '(function () {})', Context.OptionsRanges, {
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
                      'body': [],
                      'start': 13,
                      'end': 15
                  },
                  'async': false,
                  'generator': false,
                  'expression': false,
                  'id': null,
                  'start': 1,
                  'end': 15
              },
              'start': 0,
              'end': 16
          }
      ],
      'start': 0,
      'end': 16
  }],
  ['(function foo(a = []) {})', '(function foo(a = []) {})', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'AssignmentPattern',
                        'left': {
                            'type': 'Identifier',
                            'name': 'a',
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
                        'right': {
                            'type': 'ArrayExpression',
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
                'generator': false,
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
                'start': 1,
                'end': 24,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 24
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
/*  ['(function foo({}) {})', '(function foo({}) {})', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "FunctionExpression",
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [],
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
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 18,
                    "end": 20,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 20
                        }
                    }
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                    "type": "Identifier",
                    "name": "foo",
                    "start": 10,
                    "end": 13,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    }
                },
                "start": 1,
                "end": 20,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 1
                    },
                    "end": {
                        "line": 1,
                        "column": 20
                    }
                }
            },
            "start": 0,
            "end": 21,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 21
                }
            }
        }
    ],
    "start": 0,
    "end": 21,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 21
        }
    }
}],*/
  ['(function foo(foo = {a: b}) {})', '(function foo(foo = {a: b}) {})', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'AssignmentPattern',
                        'left': {
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
                        'right': {
                            'type': 'ObjectExpression',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
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
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'b',
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
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false,
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
                                }
                            ],
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
                        'start': 14,
                        'end': 26,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 26
                            }
                        }
                    }
                ],
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
                'async': false,
                'generator': false,
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
                'start': 1,
                'end': 30,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 30
                    }
                }
            },
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
];

pass('Expressions - Group (pass)', valids);

});

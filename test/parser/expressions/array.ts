import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Array', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['[function* f() {}]', '[function* f() {}]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'FunctionExpression',
                        'params': [],
                        'body': {
                            'type': 'BlockStatement',
                            'body': [],
                            'start': 15,
                            'end': 17
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
                        'end': 17
                    }
                ],
                'start': 0,
                'end': 18
            },
            'start': 0,
            'end': 18
        }
    ],
    'start': 0,
    'end': 18
}],
['([].x)', '([].x)', Context.OptionsRanges | Context.OptionsLoc, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'MemberExpression',
              'object': {
                  'type': 'ArrayExpression',
                  'elements': [],
                  'start': 1,
                  'end': 3,
                  'loc': {
                      'start': {
                          'line': 1,
                          'column': 1
                      },
                      'end': {
                          'line': 1,
                          'column': 3
                      }
                  }
              },
              'computed': false,
              'property': {
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
['[a, ...{0: b}] = (1)', '[a, ...{0: b}] = (1)', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
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
                          'name': 'a',
                          'start': 1,
                          'end': 2
                      },
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
                                          'start': 8,
                                          'end': 9
                                      },
                                      'value': {
                                          'type': 'Identifier',
                                          'name': 'b',
                                          'start': 11,
                                          'end': 12
                                      },
                                      'kind': 'init',
                                      'computed': false,
                                      'method': false,
                                      'shorthand': false,
                                      'start': 8,
                                      'end': 12
                                  }
                              ],
                              'start': 7,
                              'end': 13
                          },
                          'start': 4,
                          'end': 13
                      }
                  ],
                  'start': 0,
                  'end': 14
              },
              'operator': '=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 1,
                  'start': 18,
                  'end': 19
              },
              'start': 0,
              'end': 20
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
  ['[1, "z", "a", "Symbol(foo)"]', '[1, "z", "a", "Symbol(foo)"]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
                        'start': 1,
                        'end': 2
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 'z',
                        'start': 4,
                        'end': 7
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 'a',
                        'start': 9,
                        'end': 12
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 'Symbol(foo)',
                        'start': 14,
                        'end': 27
                    }
                ],
                'start': 0,
                'end': 28
            },
            'start': 0,
            'end': 28
        }
    ],
    'start': 0,
    'end': 28
}],
  ['[1, 2, 3, ...[]]', '[1, 2, 3, ...[]]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
                        'start': 1,
                        'end': 2
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 2,
                        'start': 4,
                        'end': 5
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 3,
                        'start': 7,
                        'end': 8
                    },
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'ArrayExpression',
                            'elements': [],
                            'start': 13,
                            'end': 15
                        },
                        'start': 10,
                        'end': 15
                    }
                ],
                'start': 0,
                'end': 16
            },
            'start': 0,
            'end': 16
        }
    ],
    'start': 0,
    'end': 16
}],
  ['[ 1, 2,, 3, ]', '[ 1, 2,, 3, ]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
                        'start': 2,
                        'end': 3
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 2,
                        'start': 5,
                        'end': 6
                    },
                    null,
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 3,
                        'start': 9,
                        'end': 10
                    }
                ],
                'start': 0,
                'end': 13
            },
            'start': 0,
            'end': 13
        }
    ],
    'start': 0,
    'end': 13
}],
  ['[ ,, 0 ]', '[ ,, 0 ]', Context.OptionsRanges, {
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
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
                        'start': 5,
                        'end': 6
                    }
                ],
                'start': 0,
                'end': 8
            },
            'start': 0,
            'end': 8
        }
    ],
    'start': 0,
    'end': 8
}],
  ['[x()]', '[x()]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'CallExpression',
                        'callee': {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 1,
                            'end': 2
                        },
                        'arguments': [],
                        'start': 1,
                        'end': 4
                    }
                ],
                'start': 0,
                'end': 5
            },
            'start': 0,
            'end': 5
        }
    ],
    'start': 0,
    'end': 5
}],
  /*['[a.r] = b', '[a.r] = b', Context.OptionsRanges, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "left": {
                    "type": "ArrayPattern",
                    "elements": [
                        {
                            "type": "MemberExpression",
                            "object": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 1,
                                "end": 2
                            },
                            "computed": false,
                            "property": {
                                "type": "Identifier",
                                "name": "r",
                                "start": 3,
                                "end": 4
                            },
                            "start": 1,
                            "end": 4
                        }
                    ],
                    "start": 0,
                    "end": 5
                },
                "operator": "=",
                "right": {
                    "type": "Identifier",
                    "name": "b",
                    "start": 8,
                    "end": 9
                },
                "start": 0,
                "end": 9
            },
            "start": 0,
            "end": 9
        }
    ],
    "start": 0,
    "end": 9
}],*/
  ['x = ([/foo/])', 'x = ([/foo/])', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 0,
                    'end': 1
                },
                'operator': '=',
                'right': {
                    'type': 'ArrayExpression',
                    'elements': [
                        {
                            'type': 'Literal',
                            'value': {},
                            'regex': {
                                'pattern': 'foo',
                                'flags': ''
                            },
                            'start': 6,
                            'end': 11
                        }
                    ],
                    'start': 5,
                    'end': 12
                },
                'start': 0,
                'end': 13
            },
            'start': 0,
            'end': 13
        }
    ],
    'start': 0,
    'end': 13
}],
  ['([a, b, c])', '([a, b, c])', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 2,
                        'end': 3
                    },
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 5,
                        'end': 6
                    },
                    {
                        'type': 'Identifier',
                        'name': 'c',
                        'start': 8,
                        'end': 9
                    }
                ],
                'start': 1,
                'end': 10
            },
            'start': 0,
            'end': 11
        }
    ],
    'start': 0,
    'end': 11
}],
  ['[1 <= 0]', '[1 <= 0]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'BinaryExpression',
                        'left': {
                            'type': 'Literal',
                            raw: null,
                            'value': 1,
                            'start': 1,
                            'end': 2
                        },
                        'right': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0,
                            'start': 6,
                            'end': 7
                        },
                        'operator': '<=',
                        'start': 1,
                        'end': 7
                    }
                ],
                'start': 0,
                'end': 8
            },
            'start': 0,
            'end': 8
        }
    ],
    'start': 0,
    'end': 8
}],
    ['[a, ...b=c]', '[a, ...b=c]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'AssignmentExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 7,
                                  'end': 8
                              },
                              'operator': '=',
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'c',
                                  'start': 9,
                                  'end': 10
                              },
                              'start': 7,
                              'end': 10
                          },
                          'start': 4,
                          'end': 10
                      }
                  ],
                  'start': 0,
                  'end': 11
              },
              'start': 0,
              'end': 11
          }
      ],
      'start': 0,
      'end': 11
  }],
   ['[ 0 ]', '[ 0 ]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
                        'start': 2,
                        'end': 3
                    }
                ],
                'start': 0,
                'end': 5
            },
            'start': 0,
            'end': 5
        }
    ],
    'start': 0,
    'end': 5
}],
    ['[,,3,,,]', '[,,3,,,]', Context.OptionsRanges, {
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
                          'type': 'Literal',
                          raw: null,
                          'value': 3,
                          'start': 3,
                          'end': 4
                      },
                      null,
                      null
                  ],
                  'start': 0,
                  'end': 8
              },
              'start': 0,
              'end': 8
          }
      ],
      'start': 0,
      'end': 8
  }],
    ['[a, ...b]', '[a, ...b]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'Identifier',
                              'name': 'b',
                              'start': 7,
                              'end': 8
                          },
                          'start': 4,
                          'end': 8
                      }
                  ],
                  'start': 0,
                  'end': 9
              },
              'start': 0,
              'end': 9
          }
      ],
      'start': 0,
      'end': 9
  }],
    ['[1,2,,4,5]', '[1,2,,4,5]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'Literal',
                          raw: null,
                          'value': 2,
                          'start': 3,
                          'end': 4
                      },
                      null,
                      {
                          'type': 'Literal',
                          raw: null,
                          'value': 4,
                          'start': 6,
                          'end': 7
                      },
                      {
                          'type': 'Literal',
                          raw: null,
                          'value': 5,
                          'start': 8,
                          'end': 9
                      }
                  ],
                  'start': 0,
                  'end': 10
              },
              'start': 0,
              'end': 10
          }
      ],
      'start': 0,
      'end': 10
  }],
    ['[,]', '[,]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      null
                  ],
                  'start': 0,
                  'end': 3
              },
              'start': 0,
              'end': 3
          }
      ],
      'start': 0,
      'end': 3
  }],
    ['[...x += y];', '[...x += y];', Context.OptionsRanges, {
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
                              'type': 'AssignmentExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 4,
                                  'end': 5
                              },
                              'operator': '+=',
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 9,
                                  'end': 10
                              },
                              'start': 4,
                              'end': 10
                          },
                          'start': 1,
                          'end': 10
                      }
                  ],
                  'start': 0,
                  'end': 11
              },
              'start': 0,
              'end': 12
          }
      ],
      'start': 0,
      'end': 12
  }],
    ['[...x = y];', '[...x = y];', Context.OptionsRanges, {
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
                              'type': 'AssignmentExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 4,
                                  'end': 5
                              },
                              'operator': '=',
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 8,
                                  'end': 9
                              },
                              'start': 4,
                              'end': 9
                          },
                          'start': 1,
                          'end': 9
                      }
                  ],
                  'start': 0,
                  'end': 10
              },
              'start': 0,
              'end': 11
          }
      ],
      'start': 0,
      'end': 11
  }],
    ['[...x.list];', '[...x.list];', Context.OptionsRanges, {
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
                              'type': 'MemberExpression',
                              'object': {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 4,
                                  'end': 5
                              },
                              'computed': false,
                              'property': {
                                  'type': 'Identifier',
                                  'name': 'list',
                                  'start': 6,
                                  'end': 10
                              },
                              'start': 4,
                              'end': 10
                          },
                          'start': 1,
                          'end': 10
                      }
                  ],
                  'start': 0,
                  'end': 11
              },
              'start': 0,
              'end': 12
          }
      ],
      'start': 0,
      'end': 12
  }],
    ['foo([a, b] = arr);', 'foo([a, b] = arr);', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 0,
                      'end': 3
                  },
                  'arguments': [
                      {
                          'type': 'AssignmentExpression',
                          'left': {
                              'type': 'ArrayPattern',
                              'elements': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 5,
                                      'end': 6
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 8,
                                      'end': 9
                                  }
                              ],
                              'start': 4,
                              'end': 10
                          },
                          'operator': '=',
                          'right': {
                              'type': 'Identifier',
                              'name': 'arr',
                              'start': 13,
                              'end': 16
                          },
                          'start': 4,
                          'end': 16
                      }
                  ],
                  'start': 0,
                  'end': 17
              },
              'start': 0,
              'end': 18
          }
      ],
      'start': 0,
      'end': 18
  }],
    ['[foo, [x,y,z], bar = B] = arr;', '[foo, [x,y,z], bar = B] = arr;', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
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
                              'start': 1,
                              'end': 4
                          },
                          {
                              'type': 'ArrayPattern',
                              'elements': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 7,
                                      'end': 8
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'y',
                                      'start': 9,
                                      'end': 10
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'z',
                                      'start': 11,
                                      'end': 12
                                  }
                              ],
                              'start': 6,
                              'end': 13
                          },
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 15,
                                  'end': 18
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'B',
                                  'start': 21,
                                  'end': 22
                              },
                              'start': 15,
                              'end': 22
                          }
                      ],
                      'start': 0,
                      'end': 23
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Identifier',
                      'name': 'arr',
                      'start': 26,
                      'end': 29
                  },
                  'start': 0,
                  'end': 29
              },
              'start': 0,
              'end': 30
          }
      ],
      'start': 0,
      'end': 30
  }],
    ['[foo = A, bar = B] = arr;', '[foo = A, bar = B] = arr;', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'AssignmentExpression',
                  'left': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 1,
                                  'end': 4
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'A',
                                  'start': 7,
                                  'end': 8
                              },
                              'start': 1,
                              'end': 8
                          },
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 10,
                                  'end': 13
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'B',
                                  'start': 16,
                                  'end': 17
                              },
                              'start': 10,
                              'end': 17
                          }
                      ],
                      'start': 0,
                      'end': 18
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Identifier',
                      'name': 'arr',
                      'start': 21,
                      'end': 24
                  },
                  'start': 0,
                  'end': 24
              },
              'start': 0,
              'end': 25
          }
      ],
      'start': 0,
      'end': 25
  }],
    ['[foo = A] = arr;', '[foo = A] = arr;', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'AssignmentExpression',
                  'left': {
                      'type': 'ArrayPattern',
                      'elements': [
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 1,
                                  'end': 4
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'A',
                                  'start': 7,
                                  'end': 8
                              },
                              'start': 1,
                              'end': 8
                          }
                      ],
                      'start': 0,
                      'end': 9
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Identifier',
                      'name': 'arr',
                      'start': 12,
                      'end': 15
                  },
                  'start': 0,
                  'end': 15
              },
              'start': 0,
              'end': 16
          }
      ],
      'start': 0,
      'end': 16
  }],
    ['[foo] = arr;', '[foo] = arr;', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
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
                              'start': 1,
                              'end': 4
                          }
                      ],
                      'start': 0,
                      'end': 5
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Identifier',
                      'name': 'arr',
                      'start': 8,
                      'end': 11
                  },
                  'start': 0,
                  'end': 11
              },
              'start': 0,
              'end': 12
          }
      ],
      'start': 0,
      'end': 12
  }],
    ['[x, ...z + arr, y]', '[x, ...z + arr, y]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'z',
                                  'start': 7,
                                  'end': 8
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'arr',
                                  'start': 11,
                                  'end': 14
                              },
                              'operator': '+',
                              'start': 7,
                              'end': 14
                          },
                          'start': 4,
                          'end': 14
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 16,
                          'end': 17
                      }
                  ],
                  'start': 0,
                  'end': 18
              },
              'start': 0,
              'end': 18
          }
      ],
      'start': 0,
      'end': 18
  }],
    ['[x, ...z(), y]', '[x, ...z(), y]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'CallExpression',
                              'callee': {
                                  'type': 'Identifier',
                                  'name': 'z',
                                  'start': 7,
                                  'end': 8
                              },
                              'arguments': [],
                              'start': 7,
                              'end': 10
                          },
                          'start': 4,
                          'end': 10
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 12,
                          'end': 13
                      }
                  ],
                  'start': 0,
                  'end': 14
              },
              'start': 0,
              'end': 14
          }
      ],
      'start': 0,
      'end': 14
  }],
    ['[x, ...z = arr, y]', '[x, ...z = arr, y]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'AssignmentExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'z',
                                  'start': 7,
                                  'end': 8
                              },
                              'operator': '=',
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'arr',
                                  'start': 11,
                                  'end': 14
                              },
                              'start': 7,
                              'end': 14
                          },
                          'start': 4,
                          'end': 14
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 16,
                          'end': 17
                      }
                  ],
                  'start': 0,
                  'end': 18
              },
              'start': 0,
              'end': 18
          }
      ],
      'start': 0,
      'end': 18
  }],
    ['[x, y, ...z + arr]', '[x, y, ...z + arr]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'z',
                                  'start': 10,
                                  'end': 11
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'arr',
                                  'start': 14,
                                  'end': 17
                              },
                              'operator': '+',
                              'start': 10,
                              'end': 17
                          },
                          'start': 7,
                          'end': 17
                      }
                  ],
                  'start': 0,
                  'end': 18
              },
              'start': 0,
              'end': 18
          }
      ],
      'start': 0,
      'end': 18
  }],
    ['[x, y, ...z()]', '[x, y, ...z()]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'CallExpression',
                              'callee': {
                                  'type': 'Identifier',
                                  'name': 'z',
                                  'start': 10,
                                  'end': 11
                              },
                              'arguments': [],
                              'start': 10,
                              'end': 13
                          },
                          'start': 7,
                          'end': 13
                      }
                  ],
                  'start': 0,
                  'end': 14
              },
              'start': 0,
              'end': 14
          }
      ],
      'start': 0,
      'end': 14
  }],
    ['[x, ...y, z]', '[x, ...y, z]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'Identifier',
                              'name': 'y',
                              'start': 7,
                              'end': 8
                          },
                          'start': 4,
                          'end': 8
                      },
                      {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 10,
                          'end': 11
                      }
                  ],
                  'start': 0,
                  'end': 12
              },
              'start': 0,
              'end': 12
          }
      ],
      'start': 0,
      'end': 12
  }],
    ['[x,,y]', '[x,,y]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      null,
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      }
                  ],
                  'start': 0,
                  'end': 6
              },
              'start': 0,
              'end': 6
          }
      ],
      'start': 0,
      'end': 6
  }],
    ['[x, y, ...z = arr]', '[x, y, ...z = arr]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ArrayExpression',
                  'elements': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 1,
                          'end': 2
                      },
                      {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      {
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'AssignmentExpression',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'z',
                                  'start': 10,
                                  'end': 11
                              },
                              'operator': '=',
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'arr',
                                  'start': 14,
                                  'end': 17
                              },
                              'start': 10,
                              'end': 17
                          },
                          'start': 7,
                          'end': 17
                      }
                  ],
                  'start': 0,
                  'end': 18
              },
              'start': 0,
              'end': 18
          }
      ],
      'start': 0,
      'end': 18
  }],
    ['[foo, [x,y = 20,z], bar = B] = arr;', '[foo, [x,y = 20,z], bar = B] = arr;', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
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
                              'start': 1,
                              'end': 4
                          },
                          {
                              'type': 'ArrayPattern',
                              'elements': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 7,
                                      'end': 8
                                  },
                                  {
                                      'type': 'AssignmentPattern',
                                      'left': {
                                          'type': 'Identifier',
                                          'name': 'y',
                                          'start': 9,
                                          'end': 10
                                      },
                                      'right': {
                                          'type': 'Literal',
                                          raw: null,
                                          'value': 20,
                                          'start': 13,
                                          'end': 15
                                      },
                                      'start': 9,
                                      'end': 15
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'z',
                                      'start': 16,
                                      'end': 17
                                  }
                              ],
                              'start': 6,
                              'end': 18
                          },
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 20,
                                  'end': 23
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'B',
                                  'start': 26,
                                  'end': 27
                              },
                              'start': 20,
                              'end': 27
                          }
                      ],
                      'start': 0,
                      'end': 28
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Identifier',
                      'name': 'arr',
                      'start': 31,
                      'end': 34
                  },
                  'start': 0,
                  'end': 34
              },
              'start': 0,
              'end': 35
          }
      ],
      'start': 0,
      'end': 35
  }],
    ['[foo, [[[[[[[[[[[[[x,y,z]]]]]]]]]]]]], bar = B] = arr;', '[foo, [[[[[[[[[[[[[x,y,z]]]]]]]]]]]]], bar = B] = arr;', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
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
                              'start': 1,
                              'end': 4
                          },
                          {
                              'type': 'ArrayPattern',
                              'elements': [
                                  {
                                      'type': 'ArrayPattern',
                                      'elements': [
                                          {
                                              'type': 'ArrayPattern',
                                              'elements': [
                                                  {
                                                      'type': 'ArrayPattern',
                                                      'elements': [
                                                          {
                                                              'type': 'ArrayPattern',
                                                              'elements': [
                                                                  {
                                                                      'type': 'ArrayPattern',
                                                                      'elements': [
                                                                          {
                                                                              'type': 'ArrayPattern',
                                                                              'elements': [
                                                                                  {
                                                                                      'type': 'ArrayPattern',
                                                                                      'elements': [
                                                                                          {
                                                                                              'type': 'ArrayPattern',
                                                                                              'elements': [
                                                                                                  {
                                                                                                      'type': 'ArrayPattern',
                                                                                                      'elements': [
                                                                                                          {
                                                                                                              'type': 'ArrayPattern',
                                                                                                              'elements': [
                                                                                                                  {
                                                                                                                      'type': 'ArrayPattern',
                                                                                                                      'elements': [
                                                                                                                          {
                                                                                                                              'type': 'ArrayPattern',
                                                                                                                              'elements': [
                                                                                                                                  {
                                                                                                                                      'type': 'Identifier',
                                                                                                                                      'name': 'x',
                                                                                                                                      'start': 19,
                                                                                                                                      'end': 20
                                                                                                                                  },
                                                                                                                                  {
                                                                                                                                      'type': 'Identifier',
                                                                                                                                      'name': 'y',
                                                                                                                                      'start': 21,
                                                                                                                                      'end': 22
                                                                                                                                  },
                                                                                                                                  {
                                                                                                                                      'type': 'Identifier',
                                                                                                                                      'name': 'z',
                                                                                                                                      'start': 23,
                                                                                                                                      'end': 24
                                                                                                                                  }
                                                                                                                              ],
                                                                                                                              'start': 18,
                                                                                                                              'end': 25
                                                                                                                          }
                                                                                                                      ],
                                                                                                                      'start': 17,
                                                                                                                      'end': 26
                                                                                                                  }
                                                                                                              ],
                                                                                                              'start': 16,
                                                                                                              'end': 27
                                                                                                          }
                                                                                                      ],
                                                                                                      'start': 15,
                                                                                                      'end': 28
                                                                                                  }
                                                                                              ],
                                                                                              'start': 14,
                                                                                              'end': 29
                                                                                          }
                                                                                      ],
                                                                                      'start': 13,
                                                                                      'end': 30
                                                                                  }
                                                                              ],
                                                                              'start': 12,
                                                                              'end': 31
                                                                          }
                                                                      ],
                                                                      'start': 11,
                                                                      'end': 32
                                                                  }
                                                              ],
                                                              'start': 10,
                                                              'end': 33
                                                          }
                                                      ],
                                                      'start': 9,
                                                      'end': 34
                                                  }
                                              ],
                                              'start': 8,
                                              'end': 35
                                          }
                                      ],
                                      'start': 7,
                                      'end': 36
                                  }
                              ],
                              'start': 6,
                              'end': 37
                          },
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 39,
                                  'end': 42
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'B',
                                  'start': 45,
                                  'end': 46
                              },
                              'start': 39,
                              'end': 46
                          }
                      ],
                      'start': 0,
                      'end': 47
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Identifier',
                      'name': 'arr',
                      'start': 50,
                      'end': 53
                  },
                  'start': 0,
                  'end': 53
              },
              'start': 0,
              'end': 54
          }
      ],
      'start': 0,
      'end': 54
  }],
    ['[...[x].map(y, z)];', '[...[x].map(y, z)];', Context.OptionsRanges, {
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
                              'type': 'CallExpression',
                              'callee': {
                                  'type': 'MemberExpression',
                                  'object': {
                                      'type': 'ArrayExpression',
                                      'elements': [
                                          {
                                              'type': 'Identifier',
                                              'name': 'x',
                                              'start': 5,
                                              'end': 6
                                          }
                                      ],
                                      'start': 4,
                                      'end': 7
                                  },
                                  'computed': false,
                                  'property': {
                                      'type': 'Identifier',
                                      'name': 'map',
                                      'start': 8,
                                      'end': 11
                                  },
                                  'start': 4,
                                  'end': 11
                              },
                              'arguments': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'y',
                                      'start': 12,
                                      'end': 13
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'z',
                                      'start': 15,
                                      'end': 16
                                  }
                              ],
                              'start': 4,
                              'end': 17
                          },
                          'start': 1,
                          'end': 17
                      }
                  ],
                  'start': 0,
                  'end': 18
              },
              'start': 0,
              'end': 19
          }
      ],
      'start': 0,
      'end': 19
  }],
    ['[a,b=[x,y]] = z', '[a,b=[x,y]] = z', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
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
                              'name': 'a',
                              'start': 1,
                              'end': 2
                          },
                          {
                              'type': 'AssignmentPattern',
                              'left': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 3,
                                  'end': 4
                              },
                              'right': {
                                  'type': 'ArrayExpression',
                                  'elements': [
                                      {
                                          'type': 'Identifier',
                                          'name': 'x',
                                          'start': 6,
                                          'end': 7
                                      },
                                      {
                                          'type': 'Identifier',
                                          'name': 'y',
                                          'start': 8,
                                          'end': 9
                                      }
                                  ],
                                  'start': 5,
                                  'end': 10
                              },
                              'start': 3,
                              'end': 10
                          }
                      ],
                      'start': 0,
                      'end': 11
                  },
                  'operator': '=',
                  'right': {
                      'type': 'Identifier',
                      'name': 'z',
                      'start': 14,
                      'end': 15
                  },
                  'start': 0,
                  'end': 15
              },
              'start': 0,
              'end': 15
          }
      ],
      'start': 0,
      'end': 15
  }],
    ['(foo, [bar, baz] = doo);', '(foo, [bar, baz] = doo);', Context.OptionsRanges, {
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
                          'name': 'foo',
                          'start': 1,
                          'end': 4
                      },
                      {
                          'type': 'AssignmentExpression',
                          'left': {
                              'type': 'ArrayPattern',
                              'elements': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'bar',
                                      'start': 7,
                                      'end': 10
                                  },
                                  {
                                      'type': 'Identifier',
                                      'name': 'baz',
                                      'start': 12,
                                      'end': 15
                                  }
                              ],
                              'start': 6,
                              'end': 16
                          },
                          'operator': '=',
                          'right': {
                              'type': 'Identifier',
                              'name': 'doo',
                              'start': 19,
                              'end': 22
                          },
                          'start': 6,
                          'end': 22
                      }
                  ],
                  'start': 1,
                  'end': 22
              },
              'start': 0,
              'end': 24
          }
      ],
      'start': 0,
      'end': 24
  }],
    ['[...[x]/y]', '[...[x]/y]', Context.OptionsRanges, {
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
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'ArrayExpression',
                                  'elements': [
                                      {
                                          'type': 'Identifier',
                                          'name': 'x',
                                          'start': 5,
                                          'end': 6
                                      }
                                  ],
                                  'start': 4,
                                  'end': 7
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 8,
                                  'end': 9
                              },
                              'operator': '/',
                              'start': 4,
                              'end': 9
                          },
                          'start': 1,
                          'end': 9
                      }
                  ],
                  'start': 0,
                  'end': 10
              },
              'start': 0,
              'end': 10
          }
      ],
      'start': 0,
      'end': 10
  }],
    ['[...{x:y}/y]', '[...{x:y}/y]', Context.OptionsRanges, {
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
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'ObjectExpression',
                                  'properties': [
                                      {
                                          'type': 'Property',
                                          'key': {
                                              'type': 'Identifier',
                                              'name': 'x',
                                              'start': 5,
                                              'end': 6
                                          },
                                          'value': {
                                              'type': 'Identifier',
                                              'name': 'y',
                                              'start': 7,
                                              'end': 8
                                          },
                                          'kind': 'init',
                                          'computed': false,
                                          'method': false,
                                          'shorthand': false,
                                          'start': 5,
                                          'end': 8
                                      }
                                  ],
                                  'start': 4,
                                  'end': 9
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 10,
                                  'end': 11
                              },
                              'operator': '/',
                              'start': 4,
                              'end': 11
                          },
                          'start': 1,
                          'end': 11
                      }
                  ],
                  'start': 0,
                  'end': 12
              },
              'start': 0,
              'end': 12
          }
      ],
      'start': 0,
      'end': 12
  }],
    ['[.../x//y]', '[.../x//y]', Context.OptionsRanges, {
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
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'Literal',
                                  'value': {},
                                  'regex': {
                                      'pattern': 'x',
                                      'flags': ''
                                  },
                                  'start': 4,
                                  'end': 7
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 8,
                                  'end': 9
                              },
                              'operator': '/',
                              'start': 4,
                              'end': 9
                          },
                          'start': 1,
                          'end': 9
                      }
                  ],
                  'start': 0,
                  'end': 10
              },
              'start': 0,
              'end': 10
          }
      ],
      'start': 0,
      'end': 10
  }],
    ['[.../x/g/y]', '[.../x/g/y]', Context.OptionsRanges, {
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
                              'type': 'BinaryExpression',
                              'left': {
                                  'type': 'Literal',
                                  'value': {},
                                  'regex': {
                                      'pattern': 'x',
                                      'flags': 'g'
                                  },
                                  'start': 4,
                                  'end': 8
                              },
                              'right': {
                                  'type': 'Identifier',
                                  'name': 'y',
                                  'start': 9,
                                  'end': 10
                              },
                              'operator': '/',
                              'start': 4,
                              'end': 10
                          },
                          'start': 1,
                          'end': 10
                      }
                  ],
                  'start': 0,
                  'end': 11
              },
              'start': 0,
              'end': 11
          }
      ],
      'start': 0,
      'end': 11
  }],
    ['array = [,,,,,]', 'array = [,,,,,]', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'AssignmentExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'array',
                      'start': 0,
                      'end': 5
                  },
                  'operator': '=',
                  'right': {
                      'type': 'ArrayExpression',
                      'elements': [
                          null,
                          null,
                          null,
                          null,
                          null
                      ],
                      'start': 8,
                      'end': 15
                  },
                  'start': 0,
                  'end': 15
              },
              'start': 0,
              'end': 15
          }
      ],
      'start': 0,
      'end': 15
  }]
];

pass('Expressions - Array (pass)', valids);

});

import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - BitWise', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['a|b', 'a|b', Context.Empty, {
      'body': [
        {
          'expression': {
            'left': {
              'name': 'a',
              'type': 'Identifier',
            },
            'operator': '|',
            'right': {
              'name': 'b',
              'type': 'Identifier',
            },
            'type': 'BinaryExpression',
          },
          'type': 'ExpressionStatement',
        },
      ],
      'sourceType': 'script',
      'type': 'Program'
    }],
    ['a&b', 'a&b', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'b',
                      'start': 2,
                      'end': 3
                  },
                  'operator': '&',
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
   ['a>>>b', 'a>>>b', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 0,
                    'end': 1
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'b',
                    'start': 4,
                    'end': 5
                },
                'operator': '>>>',
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
    ['1+2', '1+2', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Literal',
                      'raw': null,
                      'value': 1,
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'Literal',
                      'raw': null,
                      'value': 2,
                      'start': 2,
                      'end': 3
                  },
                  'operator': '+',
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
    ['x + y * z', 'x + y * z', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'BinaryExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      'right': {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 8,
                          'end': 9
                      },
                      'operator': '*',
                      'start': 4,
                      'end': 9
                  },
                  'operator': '+',
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
    ['x + y / z', 'x + y / z', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'BinaryExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      'right': {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 8,
                          'end': 9
                      },
                      'operator': '/',
                      'start': 4,
                      'end': 9
                  },
                  'operator': '+',
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
    ['++x ** y', '++x ** y', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UpdateExpression',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 2,
                          'end': 3
                      },
                      'operator': '++',
                      'prefix': true,
                      'start': 0,
                      'end': 3
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 7,
                      'end': 8
                  },
                  'operator': '**',
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
    ['x instanceof y', 'x instanceof y', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 13,
                      'end': 14
                  },
                  'operator': 'instanceof',
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
    ['x || y && z', 'x || y && z', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'LogicalExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'LogicalExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 5,
                          'end': 6
                      },
                      'right': {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 10,
                          'end': 11
                      },
                      'operator': '&&',
                      'start': 5,
                      'end': 11
                  },
                  'operator': '||',
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
    ['x != y', 'x != y', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 5,
                      'end': 6
                  },
                  'operator': '!=',
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
    ['x === y', 'x === y', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 6,
                      'end': 7
                  },
                  'operator': '===',
                  'start': 0,
                  'end': 7
              },
              'start': 0,
              'end': 7
          }
      ],
      'start': 0,
      'end': 7
  }],
    ['x <= y', 'x <= y', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 5,
                      'end': 6
                  },
                  'operator': '<=',
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
    ['a-->a', 'a-->a', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UpdateExpression',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 0,
                          'end': 1
                      },
                      'operator': '--',
                      'prefix': false,
                      'start': 0,
                      'end': 3
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 4,
                      'end': 5
                  },
                  'operator': '>',
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
    ['x * y % z', 'x * y % z', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'BinaryExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 0,
                          'end': 1
                      },
                      'right': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 4,
                          'end': 5
                      },
                      'operator': '*',
                      'start': 0,
                      'end': 5
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'z',
                      'start': 8,
                      'end': 9
                  },
                  'operator': '%',
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
    ['x << y', 'x << y', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 5,
                      'end': 6
                  },
                  'operator': '<<',
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
  ['(a|b)', '(a|b)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 1,
                    'end': 2
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'b',
                    'start': 3,
                    'end': 4
                },
                'operator': '|',
                'start': 1,
                'end': 4
            },
            'start': 0,
            'end': 5
        }
    ],
    'start': 0,
    'end': 5
}],
  ['(1+1)', '(1+1)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
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
                    'value': 1,
                    'start': 3,
                    'end': 4
                },
                'operator': '+',
                'start': 1,
                'end': 4
            },
            'start': 0,
            'end': 5
        }
    ],
    'start': 0,
    'end': 5
}],
  ['(++a)', '(++a)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'UpdateExpression',
                'argument': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 3,
                    'end': 4
                },
                'operator': '++',
                'prefix': true,
                'start': 1,
                'end': 4
            },
            'start': 0,
            'end': 5
        }
    ],
    'start': 0,
    'end': 5
}]
];

pass('Expressions - Bitwise (pass)', valids);

});

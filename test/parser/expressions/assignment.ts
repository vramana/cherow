import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Assignment', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['a = (b, c)', 'a = (b, c)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'a',
                    'start': 0,
                    'end': 1
                },
                'operator': '=',
                'right': {
                    'type': 'SequenceExpression',
                    'expressions': [
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
                    'start': 5,
                    'end': 9
                },
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
  ['x <<= 42', 'x <<= 42', Context.OptionsRanges, {
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
                'operator': '<<=',
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 42,
                    'start': 6,
                    'end': 8
                },
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
['x &= 42', 'x &= 42', Context.OptionsRanges, {
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
              'operator': '&=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 42,
                  'start': 5,
                  'end': 7
              },
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
['x /= 42', 'x /= 42', Context.OptionsRanges, {
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
              'operator': '/=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 42,
                  'start': 5,
                  'end': 7
              },
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
['x >>>= 42', 'x >>>= 42', Context.OptionsRanges, {
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
              'operator': '>>>=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 42,
                  'start': 7,
                  'end': 9
              },
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
['x |= 42', 'x |= 42', Context.OptionsRanges, {
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
              'operator': '|=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 42,
                  'start': 5,
                  'end': 7
              },
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
['a=0', 'a=0', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'Identifier',
                  'name': 'a',
                  'start': 0,
                  'end': 1
              },
              'operator': '=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 0,
                  'start': 2,
                  'end': 3
              },
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
['(a)=(0)', '(a)=(0)', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'Identifier',
                  'name': 'a',
                  'start': 1,
                  'end': 2
              },
              'operator': '=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 0,
                  'start': 5,
                  'end': 6
              },
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
['x.x *= 0', 'x.x *= 0', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'MemberExpression',
                  'object': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 0,
                      'end': 1
                  },
                  'computed': false,
                  'property': {
                      'type': 'Identifier',
                      'name': 'x',
                      'start': 2,
                      'end': 3
                  },
                  'start': 0,
                  'end': 3
              },
              'operator': '*=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 0,
                  'start': 7,
                  'end': 8
              },
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
['x **= 0', 'x **= 0', Context.OptionsRanges, {
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
              'operator': '**=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 0,
                  'start': 6,
                  'end': 7
              },
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
['[0].length = 0', '[0].length = 0', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'MemberExpression',
                  'object': {
                      'type': 'ArrayExpression',
                      'elements': [
                          {
                              'type': 'Literal',
                              raw: null,
                              'value': 0,
                              'start': 1,
                              'end': 2
                          }
                      ],
                      'start': 0,
                      'end': 3
                  },
                  'computed': false,
                  'property': {
                      'type': 'Identifier',
                      'name': 'length',
                      'start': 4,
                      'end': 10
                  },
                  'start': 0,
                  'end': 10
              },
              'operator': '=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 0,
                  'start': 13,
                  'end': 14
              },
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
['(a**b).c=0', '(a**b).c=0', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'MemberExpression',
                  'object': {
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
                          'start': 4,
                          'end': 5
                      },
                      'operator': '**',
                      'start': 1,
                      'end': 5
                  },
                  'computed': false,
                  'property': {
                      'type': 'Identifier',
                      'name': 'c',
                      'start': 7,
                      'end': 8
                  },
                  'start': 0,
                  'end': 8
              },
              'operator': '=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 0,
                  'start': 9,
                  'end': 10
              },
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
];

pass('Expressions - Async function (pass)', valids);

});

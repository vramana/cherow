import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Compund', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['null && (x += null)', 'null && (x += null)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'LogicalExpression',
                'left': {
                    'type': 'Literal',
                    'value': null,
                    'start': 0,
                    'end': 4
                },
                'right': {
                    'type': 'AssignmentExpression',
                    'left': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 9,
                        'end': 10
                    },
                    'operator': '+=',
                    'right': {
                        'type': 'Literal',
                        'value': null,
                        'start': 14,
                        'end': 18
                    },
                    'start': 9,
                    'end': 18
                },
                'operator': '&&',
                'start': 0,
                'end': 19
            },
            'start': 0,
            'end': 19
        }
    ],
    'start': 0,
    'end': 19
}],
    ['x1 = (x <<= 1)', 'x1 = (x <<= 1)', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'AssignmentExpression',
                  'left': {
                      'type': 'Identifier',
                      'name': 'x1',
                      'start': 0,
                      'end': 2
                  },
                  'operator': '=',
                  'right': {
                      'type': 'AssignmentExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 6,
                          'end': 7
                      },
                      'operator': '<<=',
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 12,
                          'end': 13
                      },
                      'start': 6,
                      'end': 13
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
  ['(x + y) == z', '(x + y) == z', Context.OptionsRanges, {
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
                        'start': 1,
                        'end': 2
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 5,
                        'end': 6
                    },
                    'operator': '+',
                    'start': 1,
                    'end': 6
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'z',
                    'start': 11,
                    'end': 12
                },
                'operator': '==',
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
  ['(x + y) != z', '(x + y) != z', Context.OptionsRanges, {
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
                        'start': 1,
                        'end': 2
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 5,
                        'end': 6
                    },
                    'operator': '+',
                    'start': 1,
                    'end': 6
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'z',
                    'start': 11,
                    'end': 12
                },
                'operator': '!=',
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
  ['(x + y) >= z', '(x + y) >= z', Context.OptionsRanges, {
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
                        'start': 1,
                        'end': 2
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 5,
                        'end': 6
                    },
                    'operator': '+',
                    'start': 1,
                    'end': 6
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'z',
                    'start': 11,
                    'end': 12
                },
                'operator': '>=',
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
    ['x %= null', 'x %= null', Context.OptionsRanges, {
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
                  'operator': '%=',
                  'right': {
                      'type': 'Literal',
                      'value': null,
                      'start': 5,
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
    ['x ^= new Number(1)', 'x ^= new Number(1)', Context.OptionsRanges, {
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
                  'operator': '^=',
                  'right': {
                      'type': 'NewExpression',
                      'callee': {
                          'type': 'Identifier',
                          'name': 'Number',
                          'start': 9,
                          'end': 15
                      },
                      'arguments': [
                          {
                              'type': 'Literal',
                              raw: null,
                              'value': 1,
                              'start': 16,
                              'end': 17
                          }
                      ],
                      'start': 5,
                      'end': 18
                  },
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
    ['a ? !b : !c', 'a ? !b : !c', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ConditionalExpression',
                  'test': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 0,
                      'end': 1
                  },
                  'consequent': {
                      'type': 'UnaryExpression',
                      'operator': '!',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 5,
                          'end': 6
                      },
                      'prefix': true,
                      'start': 4,
                      'end': 6
                  },
                  'alternate': {
                      'type': 'UnaryExpression',
                      'operator': '!',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'c',
                          'start': 10,
                          'end': 11
                      },
                      'prefix': true,
                      'start': 9,
                      'end': 11
                  },
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
    ['a ** b ? y-3 : 5*1', 'a ** b ? y-3 : 5*1', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ConditionalExpression',
                  'test': {
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
                          'start': 5,
                          'end': 6
                      },
                      'operator': '**',
                      'start': 0,
                      'end': 6
                  },
                  'consequent': {
                      'type': 'BinaryExpression',
                      'left': {
                          'type': 'Identifier',
                          'name': 'y',
                          'start': 9,
                          'end': 10
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 3,
                          'start': 11,
                          'end': 12
                      },
                      'operator': '-',
                      'start': 9,
                      'end': 12
                  },
                  'alternate': {
                      'type': 'BinaryExpression',
                      'left': {
                          'type': 'Literal',
                          raw: null,
                          'value': 5,
                          'start': 15,
                          'end': 16
                      },
                      'right': {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 17,
                          'end': 18
                      },
                      'operator': '*',
                      'start': 15,
                      'end': 18
                  },
                  'start': 0,
                  'end': 18
              },
              'start': 0,
              'end': 18
          }
      ],
      'start': 0,
      'end': 18
  }]
];

pass('Expressions - Compund (pass)', valids);

});

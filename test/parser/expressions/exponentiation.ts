import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Exponentiation', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['(+x) ** 10', '(+x) ** 10', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'BinaryExpression',
                'left': {
                    'type': 'UnaryExpression',
                    'operator': '+',
                    'argument': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 2,
                        'end': 3
                    },
                    'prefix': true,
                    'start': 1,
                    'end': 3
                },
                'right': {
                    'type': 'Literal',
                    raw: null,
                    'value': 10,
                    'start': 8,
                    'end': 10
                },
                'operator': '**',
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
    ['x ** y ** z', 'x ** y ** z', Context.OptionsRanges, {
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
                          'start': 5,
                          'end': 6
                      },
                      'right': {
                          'type': 'Identifier',
                          'name': 'z',
                          'start': 10,
                          'end': 11
                      },
                      'operator': '**',
                      'start': 5,
                      'end': 11
                  },
                  'operator': '**',
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
    ['(typeof x) ** 10', '(typeof x) ** 10', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UnaryExpression',
                      'operator': 'typeof',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 8,
                          'end': 9
                      },
                      'prefix': true,
                      'start': 1,
                      'end': 9
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 14,
                      'end': 16
                  },
                  'operator': '**',
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
    ['(void 0) ** 10', '(void 0) ** 10', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UnaryExpression',
                      'operator': 'void',
                      'argument': {
                          'type': 'Literal',
                          raw: null,
                          'value': 0,
                          'start': 6,
                          'end': 7
                      },
                      'prefix': true,
                      'start': 1,
                      'end': 7
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 12,
                      'end': 14
                  },
                  'operator': '**',
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
    ['(-x) ** 10', '(-x) ** 10', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UnaryExpression',
                      'operator': '-',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 2,
                          'end': 3
                      },
                      'prefix': true,
                      'start': 1,
                      'end': 3
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 8,
                      'end': 10
                  },
                  'operator': '**',
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
    ['(+x) ** 10', '(+x) ** 10', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UnaryExpression',
                      'operator': '+',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 2,
                          'end': 3
                      },
                      'prefix': true,
                      'start': 1,
                      'end': 3
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 8,
                      'end': 10
                  },
                  'operator': '**',
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
    ['(~x) ** 10', '(~x) ** 10', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UnaryExpression',
                      'operator': '~',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 2,
                          'end': 3
                      },
                      'prefix': true,
                      'start': 1,
                      'end': 3
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 8,
                      'end': 10
                  },
                  'operator': '**',
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
    ['(delete x) ** 10', '(delete x) ** 10', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UnaryExpression',
                      'operator': 'delete',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 8,
                          'end': 9
                      },
                      'prefix': true,
                      'start': 1,
                      'end': 9
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 14,
                      'end': 16
                  },
                  'operator': '**',
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
    ['(!x) ** 10', '(!x) ** 10', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'BinaryExpression',
                  'left': {
                      'type': 'UnaryExpression',
                      'operator': '!',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 2,
                          'end': 3
                      },
                      'prefix': true,
                      'start': 1,
                      'end': 3
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 8,
                      'end': 10
                  },
                  'operator': '**',
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
    ['++O.p ** 10', '++O.p ** 10', Context.OptionsRanges, {
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
                          'type': 'MemberExpression',
                          'object': {
                              'type': 'Identifier',
                              'name': 'O',
                              'start': 2,
                              'end': 3
                          },
                          'computed': false,
                          'property': {
                              'type': 'Identifier',
                              'name': 'p',
                              'start': 4,
                              'end': 5
                          },
                          'start': 2,
                          'end': 5
                      },
                      'operator': '++',
                      'prefix': true,
                      'start': 0,
                      'end': 5
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 9,
                      'end': 11
                  },
                  'operator': '**',
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
    ['x-- ** 10', 'x-- ** 10', Context.OptionsRanges, {
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
                          'start': 0,
                          'end': 1
                      },
                      'operator': '--',
                      'prefix': false,
                      'start': 0,
                      'end': 3
                  },
                  'right': {
                      'type': 'Literal',
                      raw: null,
                      'value': 10,
                      'start': 7,
                      'end': 9
                  },
                  'operator': '**',
                  'start': 0,
                  'end': 9
              },
              'start': 0,
              'end': 9
          }
      ],
      'start': 0,
      'end': 9
  }]
];

pass('Expressions - Exponentiation (pass)', valids);

});

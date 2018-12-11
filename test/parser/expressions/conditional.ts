import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Conditional', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['true ? y : false', 'true ? y : false', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ConditionalExpression',
                'test': {
                    'type': 'Literal',
                    'value': true,
                    'start': 0,
                    'end': 4
                },
                'consequent': {
                    'type': 'Identifier',
                    'name': 'y',
                    'start': 7,
                    'end': 8
                },
                'alternate': {
                    'type': 'Literal',
                    'value': false,
                    'start': 11,
                    'end': 16
                },
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
    ['y ? y : "1"', 'y ? y : "1"', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ConditionalExpression',
                  'test': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 0,
                      'end': 1
                  },
                  'consequent': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 4,
                      'end': 5
                  },
                  'alternate': {
                      'type': 'Literal',
                      raw: null,
                      'value': '1',
                      'start': 8,
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
    ['x = a ? 1 : 2', 'x = a ? 1 : 2', Context.OptionsRanges, {
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
                      'type': 'ConditionalExpression',
                      'test': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 4,
                          'end': 5
                      },
                      'consequent': {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 8,
                          'end': 9
                      },
                      'alternate': {
                          'type': 'Literal',
                          raw: null,
                          'value': 2,
                          'start': 12,
                          'end': 13
                      },
                      'start': 4,
                      'end': 13
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
    ['x && y ? 1 : 2', 'x && y ? 1 : 2', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ConditionalExpression',
                  'test': {
                      'type': 'LogicalExpression',
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
                      'operator': '&&',
                      'start': 0,
                      'end': 6
                  },
                  'consequent': {
                      'type': 'Literal',
                      raw: null,
                      'value': 1,
                      'start': 9,
                      'end': 10
                  },
                  'alternate': {
                      'type': 'Literal',
                      raw: null,
                      'value': 2,
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

pass('Expressions - Conditional (pass)', valids);

});

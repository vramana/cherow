import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Group', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['(0, a)', '(0, a)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
                        'start': 1,
                        'end': 2
                    },
                    {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 4,
                        'end': 5
                    }
                ],
                'start': 1,
                'end': 5
            },
            'start': 0,
            'end': 6
        }
    ],
    'start': 0,
    'end': 6
}],
  ['(a, 0)', '(a, 0)', Context.OptionsRanges, {
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
                        'name': 'a',
                        'start': 1,
                        'end': 2
                    },
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 0,
                        'start': 4,
                        'end': 5
                    }
                ],
                'start': 1,
                'end': 5
            },
            'start': 0,
            'end': 6
        }
    ],
    'start': 0,
    'end': 6
}],
  ['((a,a),(a,a))', '((a,a),(a,a))', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
                        'type': 'SequenceExpression',
                        'expressions': [
                            {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 2,
                                'end': 3
                            },
                            {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 4,
                                'end': 5
                            }
                        ],
                        'start': 2,
                        'end': 5
                    },
                    {
                        'type': 'SequenceExpression',
                        'expressions': [
                            {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 8,
                                'end': 9
                            },
                            {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 10,
                                'end': 11
                            }
                        ],
                        'start': 8,
                        'end': 11
                    }
                ],
                'start': 1,
                'end': 12
            },
            'start': 0,
            'end': 13
        }
    ],
    'start': 0,
    'end': 13
}],
  ['(a)', '(a)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'Identifier',
                'name': 'a',
                'start': 1,
                'end': 2
            },
            'start': 0,
            'end': 3
        }
    ],
    'start': 0,
    'end': 3
}],
  ['(a, b, c)', '(a, b, c)', Context.OptionsRanges, {
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
                        'name': 'a',
                        'start': 1,
                        'end': 2
                    },
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 4,
                        'end': 5
                    },
                    {
                        'type': 'Identifier',
                        'name': 'c',
                        'start': 7,
                        'end': 8
                    }
                ],
                'start': 1,
                'end': 8
            },
            'start': 0,
            'end': 9
        }
    ],
    'start': 0,
    'end': 9
}],
['(1, a, 2)', '(1, a, 2)', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'SequenceExpression',
              'expressions': [
                  {
                      'type': 'Literal',
                      raw: null,
                      'value': 1,
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 4,
                      'end': 5
                  },
                  {
                      'type': 'Literal',
                      raw: null,
                      'value': 2,
                      'start': 7,
                      'end': 8
                  }
              ],
              'start': 1,
              'end': 8
          },
          'start': 0,
          'end': 9
      }
  ],
  'start': 0,
  'end': 9
}],
['(/x/)', '(/x/)', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'Literal',
              'value': {},
              'regex': {
                  'pattern': 'x',
                  'flags': ''
              },
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
['(x, /x/)', '(x, /x/)', Context.OptionsRanges, {
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
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'Literal',
                      'value': {},
                      'regex': {
                          'pattern': 'x',
                          'flags': ''
                      },
                      'start': 4,
                      'end': 7
                  }
              ],
              'start': 1,
              'end': 7
          },
          'start': 0,
          'end': 8
      }
  ],
  'start': 0,
  'end': 8
}],
['(x, /x/g)', '(x, /x/g)', Context.OptionsRanges, {
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
                      'name': 'x',
                      'start': 1,
                      'end': 2
                  },
                  {
                      'type': 'Literal',
                      'value': {},
                      'regex': {
                          'pattern': 'x',
                          'flags': 'g'
                      },
                      'start': 4,
                      'end': 8
                  }
              ],
              'start': 1,
              'end': 8
          },
          'start': 0,
          'end': 9
      }
  ],
  'start': 0,
  'end': 9
}],
['(x) / y', '(x) / y', Context.OptionsRanges, {
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
                  'start': 1,
                  'end': 2
              },
              'right': {
                  'type': 'Identifier',
                  'name': 'y',
                  'start': 6,
                  'end': 7
              },
              'operator': '/',
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
['a, (1, b, 2)', 'a, (1, b, 2)', Context.OptionsRanges, {
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
                      'name': 'a',
                      'start': 0,
                      'end': 1
                  },
                  {
                      'type': 'SequenceExpression',
                      'expressions': [
                          {
                              'type': 'Literal',
                              raw: null,
                              'value': 1,
                              'start': 4,
                              'end': 5
                          },
                          {
                              'type': 'Identifier',
                              'name': 'b',
                              'start': 7,
                              'end': 8
                          },
                          {
                              'type': 'Literal',
                              raw: null,
                              'value': 2,
                              'start': 10,
                              'end': 11
                          }
                      ],
                      'start': 4,
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
['(void /=/g/m.x);', '(void /=/g/m.x);', Context.OptionsRanges, {
    'body': [
      {
        'end': 16,
        'expression': {
          'end': 14,
          'left': {
            'argument': {
              'end': 10,
              'regex': {
                'flags': 'g',
                'pattern': '=',
              },
              'start': 6,
              'type': 'Literal',
              'value': /=/g,
            },
            'end': 10,
            'operator': 'void',
            'prefix': true,
            'start': 1,
            'type': 'UnaryExpression',
          },
          'operator': '/',
          'right': {
            'computed': false,
            'end': 14,
            'object': {
              'end': 12,
              'name': 'm',
              'start': 11,
              'type': 'Identifier',
            },
            'property': {
              'end': 14,
              'name': 'x',
              'start': 13,
              'type': 'Identifier',
            },
            'start': 11,
            'type': 'MemberExpression',
          },
          'start': 1,
          'type': 'BinaryExpression',
        },
        'start': 0,
        'type': 'ExpressionStatement',
      },
    ],
    'end': 16,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program',
  }],
['([delete /a/.x]);', '([delete /a/.x]);', Context.OptionsRanges, {
    'body': [
      {
        'end': 17,
        'expression': {
          'elements': [
            {
              'argument': {
                'computed': false,
                'end': 14,
                'object': {
                  'end': 12,
                  'regex': {
                    'flags': '',
                    'pattern': 'a',
                  },
                  'start': 9,
                  'type': 'Literal',
                  'value': /a/,
                },
                'property': {
                  'end': 14,
                  'name': 'x',
                  'start': 13,
                  'type': 'Identifier',
                },
                'start': 9,
                'type': 'MemberExpression',
              },
              'end': 14,
              'operator': 'delete',
              'prefix': true,
              'start': 2,
              'type': 'UnaryExpression',
            },
          ],
          'end': 15,
          'start': 1,
          'type': 'ArrayExpression',
        },
        'start': 0,
        'type': 'ExpressionStatement',
      },
    ],
    'end': 17,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program',
  }],
['(delete /a/g.x);', '(delete /a/g.x);', Context.OptionsRanges, {
    'body': [
      {
       'end': 16,
        'expression': {
          'argument': {
            'computed': false,
            'end': 14,
            'object': {
              'end': 12,
              'regex': {
                'flags': 'g',
                'pattern': 'a',
              },
              'start': 8,
              'type': 'Literal',
              'value': /a/g,
            },
            'property': {
              'end': 14,
              'name': 'x',
              'start': 13,
              'type': 'Identifier',
            },
            'start': 8,
            'type': 'MemberExpression',
          },
          'end': 14,
          'operator': 'delete',
          'prefix': true,
         'start': 1,
          'type': 'UnaryExpression',
        },
        'start': 0,
        'type': 'ExpressionStatement'
      }
    ],
    'end': 16,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program'
  }],
['(delete /a/.x);', '(delete /a/.x);', Context.OptionsRanges, {
    'body': [
      {
        'end': 15,
        'expression': {
          'argument': {
            'computed': false,
            'end': 13,
            'object': {
              'end': 11,
              'regex': {
                'flags': '',
                'pattern': 'a',
              },
              'start': 8,
              'type': 'Literal',
              'value': /a/,
            },
            'property': {
              'end': 13,
              'name': 'x',
              'start': 12,
              'type': 'Identifier',
            },
           'start': 8,
            'type': 'MemberExpression',
          },
          'end': 13,
          'operator': 'delete',
         'prefix': true,
          'start': 1,
          'type': 'UnaryExpression',
        },
       'start': 0,
        'type': 'ExpressionStatement'
      }
    ],
    'end': 15,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program'
  }],
];

pass('Expressions - Group (pass)', valids);

});

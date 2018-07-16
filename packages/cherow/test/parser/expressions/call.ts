import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Call', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['this.finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");', 'this.finishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'ThisExpression'
                    },
                    'computed': false,
                    'property': {
                        'type': 'Identifier',
                        'name': 'finishNode'
                    }
                },
                'arguments': [
                    {
                        'type': 'Identifier',
                        'name': 'node'
                    },
                    {
                        'type': 'ConditionalExpression',
                        'test': {
                            'type': 'CallExpression',
                            'callee': {
                                'type': 'MemberExpression',
                                'object': {
                                    'type': 'Literal',
                                    'value': /&&|||/,
                                    'regex': {
                                        'pattern': '&&|||',
                                        'flags': ''
                                    }
                                },
                                'computed': false,
                                'property': {
                                    'type': 'Identifier',
                                    'name': 'test'
                                }
                            },
                            'arguments': [
                                {
                                    'type': 'MemberExpression',
                                    'object': {
                                        'type': 'Identifier',
                                        'name': 'node'
                                    },
                                    'computed': false,
                                    'property': {
                                        'type': 'Identifier',
                                        'name': 'operator'
                                    }
                                }
                            ]
                        },
                        'consequent': {
                            'type': 'Literal',
                            raw: null,
                            'value': 'LogicalExpression'
                        },
                        'alternate': {
                            'type': 'Literal',
                            raw: null,
                            'value': 'BinaryExpression'
                        }
                    }
                ]
            }
        }
    ]
}],
  ['a.b( o.bar )', 'a.b( o.bar )', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'Identifier',
                        'name': 'a',
                        'start': 0,
                        'end': 1
                    },
                    'computed': false,
                    'property': {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 2,
                        'end': 3
                    },
                    'start': 0,
                    'end': 3
                },
                'arguments': [
                    {
                        'type': 'MemberExpression',
                        'object': {
                            'type': 'Identifier',
                            'name': 'o',
                            'start': 5,
                            'end': 6
                        },
                        'computed': false,
                        'property': {
                            'type': 'Identifier',
                            'name': 'bar',
                            'start': 7,
                            'end': 10
                        },
                        'start': 5,
                        'end': 10
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
    ['a.k()', 'a.k()', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'MemberExpression',
                      'object': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 0,
                          'end': 1
                      },
                      'computed': false,
                      'property': {
                          'type': 'Identifier',
                          'name': 'k',
                          'start': 2,
                          'end': 3
                      },
                      'start': 0,
                      'end': 3
                  },
                  'arguments': [],
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

    ['foo(a, b, ...c)', 'foo(a, b, ...c)', Context.OptionsRanges, {
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
                          'type': 'Identifier',
                          'name': 'a',
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
                          'type': 'SpreadElement',
                          'argument': {
                              'type': 'Identifier',
                              'name': 'c',
                              'start': 13,
                              'end': 14
                          },
                          'start': 10,
                          'end': 14
                      }
                  ],
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
    ['foo(a)(b)', 'foo(a)(b)', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'CallExpression',
                      'callee': {
                          'type': 'Identifier',
                          'name': 'foo',
                          'start': 0,
                          'end': 3
                      },
                      'arguments': [
                          {
                              'type': 'Identifier',
                              'name': 'a',
                              'start': 4,
                              'end': 5
                          }
                      ],
                      'start': 0,
                      'end': 6
                  },
                  'arguments': [
                      {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 7,
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
    ['foo(a)(b)(c)(d)(e)', 'foo(a)(b)(c)(d)(e)', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'CallExpression',
                      'callee': {
                          'type': 'CallExpression',
                          'callee': {
                              'type': 'CallExpression',
                              'callee': {
                                  'type': 'CallExpression',
                                  'callee': {
                                      'type': 'Identifier',
                                      'name': 'foo',
                                      'start': 0,
                                      'end': 3
                                  },
                                  'arguments': [
                                      {
                                          'type': 'Identifier',
                                          'name': 'a',
                                          'start': 4,
                                          'end': 5
                                      }
                                  ],
                                  'start': 0,
                                  'end': 6
                              },
                              'arguments': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 7,
                                      'end': 8
                                  }
                              ],
                              'start': 0,
                              'end': 9
                          },
                          'arguments': [
                              {
                                  'type': 'Identifier',
                                  'name': 'c',
                                  'start': 10,
                                  'end': 11
                              }
                          ],
                          'start': 0,
                          'end': 12
                      },
                      'arguments': [
                          {
                              'type': 'Identifier',
                              'name': 'd',
                              'start': 13,
                              'end': 14
                          }
                      ],
                      'start': 0,
                      'end': 15
                  },
                  'arguments': [
                      {
                          'type': 'Identifier',
                          'name': 'e',
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
    ['a.m().n()', 'a.m().n()', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'MemberExpression',
                      'object': {
                          'type': 'CallExpression',
                          'callee': {
                              'type': 'MemberExpression',
                              'object': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 0,
                                  'end': 1
                              },
                              'computed': false,
                              'property': {
                                  'type': 'Identifier',
                                  'name': 'm',
                                  'start': 2,
                                  'end': 3
                              },
                              'start': 0,
                              'end': 3
                          },
                          'arguments': [],
                          'start': 0,
                          'end': 5
                      },
                      'computed': false,
                      'property': {
                          'type': 'Identifier',
                          'name': 'n',
                          'start': 6,
                          'end': 7
                      },
                      'start': 0,
                      'end': 7
                  },
                  'arguments': [],
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
    ['new A()', 'new A()', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'NewExpression',
                  'callee': {
                      'type': 'Identifier',
                      'name': 'A',
                      'start': 4,
                      'end': 5
                  },
                  'arguments': [],
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
    ['a.b( c() ).d.e', 'a.b( c() ).d.e', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'MemberExpression',
                  'object': {
                      'type': 'MemberExpression',
                      'object': {
                          'type': 'CallExpression',
                          'callee': {
                              'type': 'MemberExpression',
                              'object': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 0,
                                  'end': 1
                              },
                              'computed': false,
                              'property': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 2,
                                  'end': 3
                              },
                              'start': 0,
                              'end': 3
                          },
                          'arguments': [
                              {
                                  'type': 'CallExpression',
                                  'callee': {
                                      'type': 'Identifier',
                                      'name': 'c',
                                      'start': 5,
                                      'end': 6
                                  },
                                  'arguments': [],
                                  'start': 5,
                                  'end': 8
                              }
                          ],
                          'start': 0,
                          'end': 10
                      },
                      'computed': false,
                      'property': {
                          'type': 'Identifier',
                          'name': 'd',
                          'start': 11,
                          'end': 12
                      },
                      'start': 0,
                      'end': 12
                  },
                  'computed': false,
                  'property': {
                      'type': 'Identifier',
                      'name': 'e',
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
    ['a.b( foo() )', 'a.b( foo() )', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'MemberExpression',
                      'object': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 0,
                          'end': 1
                      },
                      'computed': false,
                      'property': {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 2,
                          'end': 3
                      },
                      'start': 0,
                      'end': 3
                  },
                  'arguments': [
                      {
                          'type': 'CallExpression',
                          'callee': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 5,
                              'end': 8
                          },
                          'arguments': [],
                          'start': 5,
                          'end': 10
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
  }]
];

pass('Expressions - Call (pass)', valids);

});

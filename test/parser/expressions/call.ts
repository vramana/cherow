import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Call', () => {
  const valids: Array<[string, Context, any]> = [
    [
      'foo(x,y,);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'x'
                },
                {
                  type: 'Identifier',
                  name: 'y'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(a)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(a, b, c)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'Identifier',
                  name: 'c'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(...a)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(200)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 200
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(a, b, ...c)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'c'
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(a)(b)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'foo'
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  }
                ]
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(a)(b)(c)(d)(e)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'CallExpression',
                callee: {
                  type: 'CallExpression',
                  callee: {
                    type: 'CallExpression',
                    callee: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      arguments: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        }
                      ]
                    },
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'b'
                      }
                    ]
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'c'
                    }
                  ]
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'd'
                  }
                ]
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'e'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'async(a,b)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'foo()',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: []
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Expressions - Call (pass)', valids);
});

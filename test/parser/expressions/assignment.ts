import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Assignment', () => {});

pass('Expressions - Assignment (pass)', [
  [
    'x <<= 42',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '<<=',
            right: {
              type: 'Literal',
              value: 42
            }
          }
        }
      ]
    }
  ],
  [
    '[a,b] = [b,a];',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ]
            },
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ]
            }
          }
        }
      ]
    }
  ],
  [
    'a = (b, c)',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'SequenceExpression',
              expressions: [
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
        }
      ]
    }
  ],
  [
    'a=0;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 0
            }
          }
        }
      ]
    }
  ],
  [
    '(a)=(0);',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 0
            }
          }
        }
      ]
    }
  ],
  [
    'x *= 0',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '*=',
            right: {
              type: 'Literal',
              value: 0
            }
          }
        }
      ]
    }
  ],
  [
    'x.x *= 0',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'x'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'x'
              }
            },
            operator: '*=',
            right: {
              type: 'Literal',
              value: 0
            }
          }
        }
      ]
    }
  ],
  [
    'x **= 0',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '**=',
            right: {
              type: 'Literal',
              value: 0
            }
          }
        }
      ]
    }
  ],
  [
    '[0].length = 0',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'Literal',
                    value: 0
                  }
                ]
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'length'
              }
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 0
            }
          }
        }
      ]
    }
  ],
  [
    '(a**b).c=0',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
                },
                operator: '**'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'c'
              }
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 0
            }
          }
        }
      ]
    }
  ],
  [
    'a %= b',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '%=',
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        }
      ]
    }
  ],
  [
    'a = b = c',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ]
    }
  ],
  [
    '((a)) = b;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        }
      ]
    }
  ],
  [
    'x = ((y)) = z',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'y'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        }
      ]
    }
  ],
  [
    'a = ((b)) = c;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'b'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        }
      ]
    }
  ],
  [
    'x &= 42',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '&=',
            right: {
              type: 'Literal',
              value: 42
            }
          }
        }
      ]
    }
  ],
  [
    'x /= 42',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '/=',
            right: {
              type: 'Literal',
              value: 42
            }
          }
        }
      ]
    }
  ],
  [
    'x >>>= 42',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '>>>=',
            right: {
              type: 'Literal',
              value: 42
            }
          }
        }
      ]
    }
  ],
  [
    'x |= 42',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '|=',
            right: {
              type: 'Literal',
              value: 42
            }
          }
        }
      ]
    }
  ],
  [
    'a=1',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ]
    }
  ],
  [
    'x.x *= 1',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'x'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'x'
              }
            },
            operator: '*=',
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ]
    }
  ],
  [
    'x **= 1',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '**=',
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ]
    }
  ],
  [
    'a /= b',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '/=',
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        }
      ]
    }
  ],
  [
    'a += b',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '+=',
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        }
      ]
    }
  ],
  [
    '(a) = b;',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        }
      ]
    }
  ]
]);

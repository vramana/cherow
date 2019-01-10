import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Array', () => {});

pass('Expressions - Array (pass)', [
  [
    '(a)',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'a'
          }
        }
      ]
    }
  ],
  [
    '(x.foo)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'Identifier',
              name: 'x'
            },
            property: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x + foo)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            right: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x.foo = y)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'x'
              },
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            },
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(typeof x)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'typeof',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  // ['((x));', Context.Empty, {}],
  [
    '(a = 1, b = 2);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Literal',
                  value: 1
                }
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Literal',
                  value: 2
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
    '(a) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a.b) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a[b]) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  //['(a.b().c().d) = 1;', Context.Empty, {}],
  [
    '(a[b]) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a) += 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a.b) += 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a[b]) += 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  // ['(a.b().c().d) += 1;', Context.Empty, {}],
  [
    '(delete foo.bar);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              property: {
                type: 'Identifier',
                name: 'bar'
              }
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([delete foo.bar]);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'UnaryExpression',
                operator: 'delete',
                argument: {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'bar'
                  }
                },
                prefix: true
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([target()[targetKey(a=b)]] = x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'target'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'targetKey'
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([a.b] = x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(void x)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'void',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[].length',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'ArrayExpression',
              elements: []
            },
            property: {
              type: 'Identifier',
              name: 'length'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x = y)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a, b)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
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
      ],
      sourceType: 'script'
    }
  ],
  [
    '([a / b]);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
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
    '([a \n/b/g]);',
    Context.Empty,
    {
      body: [
        {
          expression: {
            elements: [
              {
                left: {
                  left: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  operator: '/',
                  right: {
                    name: 'b',
                    type: 'Identifier'
                  },
                  type: 'BinaryExpression'
                },
                operator: '/',
                right: {
                  name: 'g',
                  type: 'Identifier'
                },
                type: 'BinaryExpression'
              }
            ],
            type: 'ArrayExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    '(++x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            operator: '++',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'delete (foo)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'Identifier',
              name: 'foo'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(++x, y);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                  type: 'Identifier',
                  name: 'x'
                },
                prefix: true
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
  /* ['(x--);', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UpdateExpression",
              "operator": "--",
              "argument": {
                  "type": "Identifier",
                  "name": "x"
              },
              "prefix": false
          }
      }
  ],
  "sourceType": "script"
}],*/
  /* ['(x--, y);', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "SequenceExpression",
              "expressions": [
                  {
                      "type": "UpdateExpression",
                      "operator": "--",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": false
                  },
                  {
                      "type": "Identifier",
                      "name": "y"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['(a=1)=2', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                  "type": "AssignmentPattern",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "Literal",
                      "value": 1,
                  }
              },
              "right": {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
              }
          }
      }
  ],
  "sourceType": "script"
}],*/
  [
    '([].x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'ArrayExpression',
              elements: []
            },
            property: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x + y) >= z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '>=',
            left: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x &= 42)',
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
    '([a])',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Identifier',
                name: 'a'
              }
            ]
          }
        }
      ]
    }
  ]
]);

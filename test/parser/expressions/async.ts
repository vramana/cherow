import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Async', () => {
  const inValids: Array<[string, Context]> = [
    ['await => { let x; }', Context.AwaitContext],
    ['async await => {}', Context.Empty],
    ['async x => { let x; }', Context.Empty],
    // ['(x) => { let x; }', Context.Empty],
    ['x => { let x; }', Context.Empty],
    ['x => { const x; }', Context.Empty]
  ];
  fail('Expressions - Async', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'foo, async()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'foo(async())',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'foo(async(), x)',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: []
                },
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'foo(async(x,y,z))',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'Identifier',
                      name: 'y'
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'foo(async(x,y,z), a, b)',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'Identifier',
                      name: 'y'
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                },
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
      'foo(async[x])',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  computed: true,
                  property: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'foo(async)',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'foo(async.foo)',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(async foo=>c)',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ],
                  id: null,
                  async: true,
                  expression: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(async function(){})',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,
                  async: true,
                  id: null
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(async ())',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(async)',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(async => x)',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'async'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async: foo',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'async'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'async\n: foo',
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'ExpressionStatement'
            },
            label: {
              name: 'async',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async\nfunction f(){}',
      Context.Empty,
      {
        body: [
          {
            expression: {
              name: 'async',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          },
          {
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },

            generator: false,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async();',
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
      'async\n();',
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [],
              callee: {
                name: 'async',
                type: 'Identifier'
              },
              type: 'CallExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async[x];',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'async'
              },
              computed: true,
              property: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ]
      }
    ],
    [
      'async = 5 + 5;',
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
                name: 'async'
              },
              operator: '=',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'Literal',
                  value: 5
                },
                right: {
                  type: 'Literal',
                  value: 5
                },
                operator: '+'
              }
            }
          }
        ]
      }
    ],
    [
      'async + 10;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'async'
              },
              right: {
                type: 'Literal',
                value: 10
              },
              operator: '+'
            }
          }
        ]
      }
    ],
    [
      'async',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'async'
            }
          }
        ]
      }
    ],
    [
      'x + async',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'async'
              },
              operator: '+'
            }
          }
        ]
      }
    ],
    [
      'async foo => bar;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'bar'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'foo'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      'let f = async function g(){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: true,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'g'
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let f = a + b + async\nfunction g(){} + d',
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                init: {
                  left: {
                    left: {
                      name: 'a',
                      type: 'Identifier'
                    },
                    operator: '+',
                    right: {
                      name: 'b',
                      type: 'Identifier'
                    },
                    type: 'BinaryExpression'
                  },
                  operator: '+',
                  right: {
                    name: 'async',
                    type: 'Identifier'
                  },
                  type: 'BinaryExpression'
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'let',
            type: 'VariableDeclaration'
          },
          {
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },

            generator: false,
            id: {
              name: 'g',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          },
          {
            expression: {
              argument: {
                name: 'd',
                type: 'Identifier'
              },
              operator: '+',
              prefix: true,
              type: 'UnaryExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'let f = a + b + async() + d',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      operator: '+'
                    },
                    right: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'async'
                      },
                      arguments: []
                    },
                    operator: '+'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'd'
                  },
                  operator: '+'
                },
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'async in {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'async'
              },
              right: {
                type: 'ObjectExpression',
                properties: []
              },
              operator: 'in'
            }
          }
        ]
      }
    ],
    /*[
      'async instanceof {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'async'
              },
              right: {
                type: 'ObjectExpression',
                properties: []
              },
              operator: 'instanceof'
            }
          }
        ]
      }
    ],*/
    [
      'f(async in {})',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  right: {
                    type: 'ObjectExpression',
                    properties: []
                  },
                  operator: 'in'
                }
              ]
            }
          }
        ]
      }
    ],
    /**[
      'f(async instanceof {})',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  right: {
                    type: 'ObjectExpression',
                    properties: []
                  },
                  operator: 'instanceof'
                }
              ]
            }
          }
        ]
      }
    ], */
    [
      'f(a + async in b)',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'async'
                    },
                    operator: '+'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  operator: 'in'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f(a + async instanceof b)',
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
                name: 'f'
              },
              arguments: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'async'
                    },
                    operator: '+'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  operator: 'instanceof'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'log(async().foo);',
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
                name: 'log'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'Identifier',
                    name: 'foo'
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
      'async ? a : b;',
      Context.Empty,
      {
        body: [
          {
            expression: {
              alternate: {
                name: 'b',
                type: 'Identifier'
              },
              consequent: {
                name: 'a',
                type: 'Identifier'
              },
              test: {
                name: 'async',
                type: 'Identifier'
              },
              type: 'ConditionalExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],

    [
      'a ? b : async;',
      Context.Empty,
      {
        body: [
          {
            expression: {
              alternate: {
                name: 'async',
                type: 'Identifier'
              },
              consequent: {
                name: 'b',
                type: 'Identifier'
              },
              test: {
                name: 'a',
                type: 'Identifier'
              },
              type: 'ConditionalExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],

    [
      'a ? async : b;',
      Context.Empty,
      {
        body: [
          {
            expression: {
              alternate: {
                name: 'b',
                type: 'Identifier'
              },
              consequent: {
                name: 'async',
                type: 'Identifier'
              },
              test: {
                name: 'a',
                type: 'Identifier'
              },
              type: 'ConditionalExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],

    [
      'async (x) + 2;',
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                arguments: [
                  {
                    name: 'x',
                    type: 'Identifier'
                  }
                ],
                callee: {
                  name: 'async',
                  type: 'Identifier'
                },
                type: 'CallExpression'
              },
              operator: '+',
              right: {
                type: 'Literal',
                value: 2
              },
              type: 'BinaryExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async(a, b) * c',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '*',
              left: {
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
              },
              right: {
                type: 'Identifier',
                name: 'c'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'log(async()[foo]);',
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
                name: 'log'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'Identifier',
                    name: 'foo'
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
      'async(...x/y);',
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    operator: '/'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async(a, ...b);',
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async(...a, b);',
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
                  }
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
      'async(x, y)',
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
                  name: 'x'
                },
                {
                  type: 'Identifier',
                  name: 'y'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async function f(){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: true,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'async function \n f(){}',
      Context.Empty,
      {
        body: [
          {
            async: true,
            body: {
              body: [],
              type: 'BlockStatement'
            },

            generator: false,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async x => x',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'x'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      'f(a, b) * c',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'f'
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
              },
              right: {
                type: 'Identifier',
                name: 'c'
              },
              operator: '*'
            }
          }
        ]
      }
    ],
    [
      '({async foo() {}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: true,
                    generator: false,

                    id: null
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async function f() { let y = await x * x }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  kind: 'let',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x'
                          }
                        },
                        right: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        operator: '*'
                      },
                      id: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  ]
                }
              ]
            },
            async: true,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],

    [
      'async fun => a',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'a'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'fun'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ]
  ];
  pass('Expressions - Arrows (pass)', valids);
});

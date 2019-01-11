import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - New', () => {
  const valids: Array<[string, Context, any]> = [
    [
      'new Foo.Bar',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'Bar'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new a.b.c.d',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'MemberExpression',
                  object: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'c'
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new Foo["bar"]',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo'
                },
                computed: true,
                property: {
                  type: 'Literal',
                  value: 'bar'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new Foo()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'Foo'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new Foo.Bar()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'Bar'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new a.b.c.d()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'MemberExpression',
                  object: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'c'
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new Foo["bar"]()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo'
                },
                computed: true,
                property: {
                  type: 'Literal',
                  value: 'bar'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new Foo(X)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'Foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'new Foo.Bar(X)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'Bar'
                }
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'new Foo["bar"](X)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo'
                },
                computed: true,
                property: {
                  type: 'Literal',
                  value: 'bar'
                }
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'new Foo(X, Y, Z)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'Foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X'
                },
                {
                  type: 'Identifier',
                  name: 'Y'
                },
                {
                  type: 'Identifier',
                  name: 'Z'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'new Foo.Bar(X, Y, Z)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'Bar'
                }
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X'
                },
                {
                  type: 'Identifier',
                  name: 'Y'
                },
                {
                  type: 'Identifier',
                  name: 'Z'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'new x().y',
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
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x'
                },
                arguments: []
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ]
      }
    ],
    [
      'new x()[y]',
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
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x'
                },
                arguments: []
              },
              computed: true,
              property: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ]
      }
    ],
    [
      'new x()();',
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
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x'
                },
                arguments: []
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new x()`y`',
      Context.Empty,
      {
        body: [
          {
            expression: {
              quasi: {
                expressions: [],
                quasis: [
                  {
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: 'y',
                      raw: 'y'
                    }
                  }
                ],
                type: 'TemplateLiteral'
              },
              tag: {
                arguments: [],
                callee: {
                  name: 'x',
                  type: 'Identifier'
                },
                type: 'NewExpression'
              },
              type: 'TaggedTemplateExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'new x().y = z',
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
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ]
      }
    ],
    [
      'new x().y + z',
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
                type: 'MemberExpression',
                object: {
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              right: {
                type: 'Identifier',
                name: 'z'
              },
              operator: '+'
            }
          }
        ]
      }
    ],
    [
      'new x()[y] = z',
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
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                computed: true,
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ]
      }
    ],
    [
      'new x().y++',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              operator: '++',
              prefix: false
            }
          }
        ]
      }
    ],
    [
      'delete new x()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x'
                },
                arguments: []
              },
              prefix: true
            }
          }
        ]
      }
    ],
    [
      'delete new x().y',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              prefix: true
            }
          }
        ]
      }
    ],
    [
      'new new x',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x'
                },
                arguments: []
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'function f(){ new new .target; }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NewExpression',
                    callee: {
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      type: 'MetaProperty',
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    },
                    arguments: []
                  }
                }
              ]
            },
            async: false,
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
      'new await',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'await'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new eval()',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'eval'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new false.__proto__.constructor',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: false
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: '__proto__'
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'constructor'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new function(){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                id: null
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'new let',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'let'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'f(new /z/())',
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [
                {
                  arguments: [],
                  callee: {
                    regex: {
                      flags: '',
                      pattern: 'z'
                    },
                    type: 'Literal',
                    value: /z/
                  },
                  type: 'NewExpression'
                }
              ],
              callee: {
                name: 'f',
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
      'f(new /z/)',
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [
                {
                  arguments: [],
                  callee: {
                    regex: {
                      flags: '',
                      pattern: 'z'
                    },
                    type: 'Literal',
                    value: /z/
                  },
                  type: 'NewExpression'
                }
              ],
              callee: {
                name: 'f',
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
      'f(new /z/.foo)',
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [
                {
                  arguments: [],
                  callee: {
                    computed: false,
                    object: {
                      regex: {
                        flags: '',
                        pattern: 'z'
                      },
                      type: 'Literal',
                      value: /z/
                    },
                    property: {
                      name: 'foo',
                      type: 'Identifier'
                    },
                    type: 'MemberExpression'
                  },
                  type: 'NewExpression'
                }
              ],
              callee: {
                name: 'f',
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
      'new x\n/y',
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                arguments: [],
                callee: {
                  name: 'x',
                  type: 'Identifier'
                },
                type: 'NewExpression'
              },
              operator: '/',
              right: {
                name: 'y',
                type: 'Identifier'
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
      'new x\n/y/',
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                left: {
                  arguments: [],
                  callee: {
                    name: 'x',
                    type: 'Identifier'
                  },
                  type: 'NewExpression'
                },
                operator: '/',
                right: {
                  name: 'y',
                  type: 'Identifier'
                },
                type: 'BinaryExpression'
              },
              operator: '/',
              right: {
                name: 'y',
                type: 'Identifier'
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
      'new x()\n/y',
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                arguments: [],
                callee: {
                  name: 'x',
                  type: 'Identifier'
                },
                type: 'NewExpression'
              },
              operator: '/',
              right: {
                name: 'y',
                type: 'Identifier'
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
      'new async (...x)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: [
                {
                  type: 'SpreadElement',
                  argument: {
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
      'new x().y++',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              operator: '++',
              prefix: false
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - New (pass)', valids);
});

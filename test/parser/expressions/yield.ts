import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Yield', () => {});
const inValids: Array<[string, Context]> = [
  ['({a(b, b){}})', Context.Strict],
  ['({a(b, b){ "use strict"; }})', Context.Empty],
  ['"use strict"; ({a(b, b){}})', Context.Empty]
];

fail('Expressions - Yield', inValids);

pass('Expressions - Yield (pass)', [
  [
    'function foo() { function *g() { yield ~x } }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'UnaryExpression',
                          operator: '~',
                          argument: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          prefix: true
                        },
                        delegate: false
                      }
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'g'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function a(){({*[yield](){}})} }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
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
                              name: 'yield'
                            },
                            value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                body: []
                              },
                              async: false,
                              generator: true,
                              expression: false,
                              id: null
                            },
                            kind: 'init',
                            computed: true,
                            method: true,
                            shorthand: false
                          }
                        ]
                      }
                    }
                  ]
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function *a(){yield ++a;} }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'UpdateExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          operator: '++',
                          prefix: true
                        },
                        delegate: false
                      }
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { ({ get yield() { 1 } }) }',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'yield'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ExpressionStatement',
                              expression: {
                                type: 'Literal',
                                value: 1
                              }
                            }
                          ]
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: null
                      },
                      kind: 'get',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() {++yield; }',
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
                  type: 'UpdateExpression',
                  argument: {
                    type: 'Identifier',
                    name: 'yield'
                  },
                  operator: '++',
                  prefix: true
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function foo(yield) { } }',
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
                type: 'FunctionDeclaration',
                params: [
                  {
                    type: 'Identifier',
                    name: 'yield'
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() {var foo, yield; }',
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
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: null,
                    id: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  },
                  {
                    type: 'VariableDeclarator',
                    init: null,
                    id: {
                      type: 'Identifier',
                      name: 'yield'
                    }
                  }
                ]
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { var yield; }',
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
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: null,
                    id: {
                      type: 'Identifier',
                      name: 'yield'
                    }
                  }
                ]
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    '(function* f(){ yield })',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'FunctionExpression',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: null,
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        }
      ]
    }
  ],
  [
    '(function* f(){ yield x + y })',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'FunctionExpression',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
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
                      operator: '+'
                    },
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        }
      ]
    }
  ],
  [
    'function foo() { function *a(){yield delete 1}}',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'UnaryExpression',
                          operator: 'delete',
                          argument: {
                            type: 'Literal',
                            value: 1
                          },
                          prefix: true
                        },
                        delegate: false
                      }
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function*a(){yield*a} }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        delegate: true
                      }
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function * gen() { (yield) ? yield : yield } }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ConditionalExpression',
                        test: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        },
                        consequent: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        },
                        alternate: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        }
                      }
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'gen'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { (function * gen() { (function not_gen() { try { } catch (yield) { } }) }) }',
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'TryStatement',
                                block: {
                                  type: 'BlockStatement',
                                  body: []
                                },
                                handler: {
                                  type: 'CatchClause',
                                  param: {
                                    type: 'Identifier',
                                    name: 'yield'
                                  },
                                  body: {
                                    type: 'BlockStatement',
                                    body: []
                                  }
                                },
                                finalizer: null
                              }
                            ]
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'not_gen'
                          }
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'gen'
                  }
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function * gen() { yield yield a; } }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          delegate: false
                        },
                        delegate: false
                      }
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'gen'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function * gen() { yield * a; return } }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        delegate: true
                      }
                    },
                    {
                      type: 'ReturnStatement',
                      argument: null
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'gen'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function *foo() { function b() {} function *b() {} }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function fn(x = yield* yield) {}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'AssignmentPattern',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'yield'
                },
                right: {
                  type: 'Identifier',
                  name: 'yield'
                },
                operator: '*'
              }
            }
          ],
          body: {
            type: 'BlockStatement',
            body: []
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'fn'
          }
        }
      ]
    }
  ],
  [
    'function *foo() { () => {} }',
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  params: [],
                  id: null,
                  async: false,
                  expression: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    'function foo() { function *b() {} }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
    }
  ],
  [
    '(x = yield) => {}',
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
              type: 'BlockStatement',
              body: []
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'yield'
                }
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        }
      ]
    }
  ],
  [
    'function * gen() { (yield * a) + (yield * b);; }',
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
                  type: 'BinaryExpression',
                  left: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    delegate: true
                  },
                  right: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    delegate: true
                  },
                  operator: '+'
                }
              },
              {
                type: 'EmptyStatement'
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'gen'
          }
        }
      ]
    }
  ],
  [
    'function * gen() { yield, yield }',
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
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    },
                    {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'gen'
          }
        }
      ]
    }
  ],
  [
    'function * gen() { (yield) ? yield : yield }',
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
                  type: 'ConditionalExpression',
                  test: {
                    type: 'YieldExpression',
                    argument: null,
                    delegate: false
                  },
                  consequent: {
                    type: 'YieldExpression',
                    argument: null,
                    delegate: false
                  },
                  alternate: {
                    type: 'YieldExpression',
                    argument: null,
                    delegate: false
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'gen'
          }
        }
      ]
    }
  ],
  [
    'function* a(){yield a}',
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
                  type: 'YieldExpression',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'a'
          }
        }
      ]
    }
  ],
  [
    'function * gen() { yield /* comment */ }',
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
                  type: 'YieldExpression',
                  argument: null,
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'gen'
          }
        }
      ]
    }
  ],
  /* ['function* a(){({[yield]:a}=0)}', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "FunctionDeclaration",
          "params": [],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "ObjectPattern",
                    "properties": [
                      {
                        "type": "Property",
                        "key": {
                          "type": "YieldExpression",
                          "argument": null,
                          "delegate": false
                        },
                        "value": {
                          "type": "Identifier",
                          "name": "a"
                        },
                        "kind": "init",
                        "computed": true,
                        "method": false,
                        "shorthand": false
                      }
                    ]
                  },
                  "operator": "=",
                  "right": {
                    "type": "Literal",
                    "value": 0
                  }
                }
              }
            ]
          },
          "async": false,
          "generator": true,
          "expression": false,
          "id": {
            "type": "Identifier",
            "name": "a"
          }
        }
      ]
    }],
  */
  [
    'async function as(){ let f = function f(yield) {} }',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            type: 'Identifier',
            name: 'as'
          },
          params: [],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {
                      type: 'Identifier',
                      name: 'f'
                    },
                    init: {
                      type: 'FunctionExpression',
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: 'yield'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    }
                  }
                ],
                kind: 'let'
              }
            ]
          },
          generator: false,
          expression: false,
          async: true
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'function *as(){ function await() {} }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'await'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ function f(yield) {} }',
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
                type: 'FunctionDeclaration',
                params: [
                  {
                    type: 'Identifier',
                    name: 'yield'
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ async function f(yield) {} }',
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
                type: 'FunctionDeclaration',
                params: [
                  {
                    type: 'Identifier',
                    name: 'yield'
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ function f(await) {} }',
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
                type: 'FunctionDeclaration',
                params: [
                  {
                    type: 'Identifier',
                    name: 'await'
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ let f = async function f(yield) {} }',
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
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'yield'
                        }
                      ],
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
                    },
                    id: {
                      type: 'Identifier',
                      name: 'f'
                    }
                  }
                ]
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ o = {async f(yield) {}} }',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'o'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'f'
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'Identifier',
                              name: 'yield'
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            body: []
                          },
                          async: true,
                          generator: false,
                          expression: false,
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
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ o = {f(await) {}} }',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'o'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'f'
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'Identifier',
                              name: 'await'
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            body: []
                          },
                          async: false,
                          generator: false,
                          expression: false,
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
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ function *f() { return yield 100; } }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 100
                        },
                        delegate: false
                      }
                    }
                  ]
                },
                async: false,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ async function *f() { return yield 100; } }',
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 100
                        },
                        delegate: false
                      }
                    }
                  ]
                },
                async: true,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ let f = function *f() { return yield 100; } }',
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
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 100
                              },
                              delegate: false
                            }
                          }
                        ]
                      },
                      async: false,
                      generator: true,
                      id: {
                        type: 'Identifier',
                        name: 'f'
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
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ let f = async function *f() { return yield 100; } }',
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
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 100
                              },
                              delegate: false
                            }
                          }
                        ]
                      },
                      async: true,
                      generator: true,
                      id: {
                        type: 'Identifier',
                        name: 'f'
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
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ o = {*f() { return yield 100; }} }',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'o'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'f'
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ReturnStatement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Literal',
                                    value: 100
                                  },
                                  delegate: false
                                }
                              }
                            ]
                          },
                          async: false,
                          generator: true,
                          expression: false,
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
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    'function *as(){ o = {async *f() { return yield 100; }} }',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'o'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'f'
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ReturnStatement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Literal',
                                    value: 100
                                  },
                                  delegate: false
                                }
                              }
                            ]
                          },
                          async: true,
                          generator: true,
                          expression: false,
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
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'as'
          }
        }
      ]
    }
  ],
  [
    '5 + yield',
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
              type: 'Literal',
              value: 5
            },
            right: {
              type: 'Identifier',
              name: 'yield'
            },
            operator: '+'
          }
        }
      ]
    }
  ],
  [
    'call(yield)',
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
              name: 'call'
            },
            arguments: [
              {
                type: 'Identifier',
                name: 'yield'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    'function* f(){ yield; }',
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
                  type: 'YieldExpression',
                  argument: null,
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function* f(){ yield x; }',
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
                  type: 'YieldExpression',
                  argument: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function* f(){ yield x + y; }',
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
                  type: 'YieldExpression',
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
                    operator: '+'
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function* f(){ call(yield); }',
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'call'
                  },
                  arguments: [
                    {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function* f(){ call(yield x); }',
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'call'
                  },
                  arguments: [
                    {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      delegate: false
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function* f(){ call(yield x + y); }',
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'call'
                  },
                  arguments: [
                    {
                      type: 'YieldExpression',
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
                        operator: '+'
                      },
                      delegate: false
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function f(){ yield; }',
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
                  type: 'Identifier',
                  name: 'yield'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function f(){ 5 + yield }',
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
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: 5
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield'
                  },
                  operator: '+'
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function f(){ call(yield); }',
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'call'
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'yield'
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function* g() { let x = yield 3; }',
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
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3
                      },
                      delegate: false
                    },
                    id: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
                ]
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function* g(x) { yield x = 3; }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'Identifier',
              name: 'x'
            }
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'YieldExpression',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'Literal',
                      value: 3
                    }
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function* g(x) { yield x = yield 3; }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'Identifier',
              name: 'x'
            }
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'YieldExpression',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3
                      },
                      delegate: false
                    }
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() { (x = y = yield z) }',
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
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'z'
                      },
                      delegate: false
                    }
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() { (x = yield); }',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'YieldExpression',
                    argument: null,
                    delegate: false
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    '{ yield = {}; }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'yield'
                },
                operator: '=',
                right: {
                  type: 'ObjectExpression',
                  properties: []
                }
              }
            }
          ]
        }
      ]
    }
  ],
  [
    '{ (x = yield); }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
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
                  type: 'Identifier',
                  name: 'yield'
                }
              }
            }
          ]
        }
      ]
    }
  ],
  [
    'function *g() { async (x = yield); }',
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: [
                    {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      operator: '=',
                      right: {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false
                      }
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g(){ return x + f(yield f); }',
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
                type: 'ReturnStatement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  right: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'f'
                    },
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'f'
                        },
                        delegate: false
                      }
                    ]
                  },
                  operator: '+'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g(){ return x + (yield f); }',
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
                type: 'ReturnStatement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  right: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'f'
                    },
                    delegate: false
                  },
                  operator: '+'
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function f(){  return (x=yield) => x;  }',
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
                type: 'ReturnStatement',
                argument: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'yield'
                      }
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function f(){  return function(x=yield) {};  }',
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
                type: 'ReturnStatement',
                argument: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'yield'
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: false,
                  generator: false,
                  id: null
                }
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function f(){  x = {foo(a=yield){}}  }',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
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
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'a'
                              },
                              right: {
                                type: 'Identifier',
                                name: 'yield'
                              }
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            body: []
                          },
                          async: false,
                          generator: false,
                          expression: false,
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
              }
            ]
          },
          async: false,
          generator: false,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function *g() { [...yield]; }',
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
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'SpreadElement',
                      argument: {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false
                      }
                    }
                  ]
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *f() { (yield 1) ? yield 2 : yield 3; }',
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
                  type: 'ConditionalExpression',
                  test: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 1
                    },
                    delegate: false
                  },
                  consequent: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 2
                    },
                    delegate: false
                  },
                  alternate: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 3
                    },
                    delegate: false
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'function *f() { yield 1 ? 2 : 3; }',
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
                  type: 'YieldExpression',
                  argument: {
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1
                    },
                    consequent: {
                      type: 'Literal',
                      value: 2
                    },
                    alternate: {
                      type: 'Literal',
                      value: 3
                    }
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    '({ *g1() {   (yield)  }})',
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
                  name: 'g1'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,
                  expression: false,
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
    '({ *g1() {   (yield 1)  }})',
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
                  name: 'g1'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Literal',
                            value: 1
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,
                  expression: false,
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
    'function *g() {yield {     ...yield yield    };}',
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
                  type: 'YieldExpression',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() {x={     ...yield yield    };}',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          },
                          delegate: false
                        }
                      }
                    ]
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() {x={     ...yield,    };}',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        }
                      }
                    ]
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() {x={     ...yield x,    };}',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          delegate: false
                        }
                      }
                    ]
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() {x={     ...yield yield,    };}',
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          },
                          delegate: false
                        }
                      }
                    ]
                  }
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() {yield {     ...yield yield,    };}',
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
                  type: 'YieldExpression',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    'function *g() { yield {...(x,y),}}',
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
                  type: 'YieldExpression',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'SequenceExpression',
                          expressions: [
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
                  },
                  delegate: false
                }
              }
            ]
          },
          async: false,
          generator: true,
          expression: false,
          id: {
            type: 'Identifier',
            name: 'g'
          }
        }
      ]
    }
  ],
  [
    '([x, {y: [yield]}])',
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
                name: 'x'
              },
              {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    value: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'yield'
                        }
                      ]
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false
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
    'yield => x',
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
                name: 'yield'
              }
            ],
            id: null,
            async: false,
            expression: true
          }
        }
      ]
    }
  ],
  [
    '([x, {y: [yield]}] = z)',
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
                  name: 'x'
                },
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      value: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'yield'
                          }
                        ]
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              ]
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
  ]
]);

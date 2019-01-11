import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Async Generator Functions', () => {
  const inValids: Array<[string, Context]> = [['(async function *f(a, a) {})', Context.Strict]];

  fail('Expressions - Async Generator Functions', inValids);

  // valid tests

  const valids: Array<[string, Context, any]> = [
    [
      '(async function *foo(_ = (function() {}())) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: '_'
                  },
                  right: {
                    type: 'CallExpression',
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
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function*({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'w'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'ArrayPattern',
                            elements: [
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
                          right: {
                            type: 'ArrayExpression',
                            elements: [
                              {
                                type: 'Literal',
                                value: 4
                              },
                              {
                                type: 'Literal',
                                value: 5
                              },
                              {
                                type: 'Literal',
                                value: 6
                              }
                            ]
                          }
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  },
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'w'
                        },
                        value: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'Literal',
                              value: 7
                            },
                            {
                              type: 'Identifier',
                              name: 'undefined'
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
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function* h([]) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'ArrayPattern',
                  elements: []
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'h'
              }
            }
          }
        ]
      }
    ],
    [
      `var gen = async function *g() {
      yield [...yield];
    };`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
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
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
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
                    name: 'g'
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'gen'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `var gen = async function *g() {
      return (function(arg) {
          var yield = arg + 1;
          return yield;
        }(yield))
    };
    `,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
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
                          type: 'CallExpression',
                          callee: {
                            type: 'FunctionExpression',
                            params: [
                              {
                                type: 'Identifier',
                                name: 'arg'
                              }
                            ],
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'VariableDeclaration',
                                  kind: 'var',
                                  declarations: [
                                    {
                                      type: 'VariableDeclarator',
                                      init: {
                                        type: 'BinaryExpression',
                                        left: {
                                          type: 'Identifier',
                                          name: 'arg'
                                        },
                                        right: {
                                          type: 'Literal',
                                          value: 1
                                        },
                                        operator: '+'
                                      },
                                      id: {
                                        type: 'Identifier',
                                        name: 'yield'
                                      }
                                    }
                                  ]
                                },
                                {
                                  type: 'ReturnStatement',
                                  argument: {
                                    type: 'Identifier',
                                    name: 'yield'
                                  }
                                }
                              ]
                            },
                            async: false,
                            generator: false,
                            id: null
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
                  async: true,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'g'
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'gen'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '(async function*([...[...x]]) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'RestElement',
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
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function*([{ x }]) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          kind: 'init',
                          key: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          computed: false,
                          value: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          method: false,
                          shorthand: true
                        }
                      ]
                    }
                  ]
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function*([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            kind: 'init',
                            key: {
                              type: 'Literal',
                              value: 0
                            },
                            computed: false,
                            value: {
                              type: 'Identifier',
                              name: 'v'
                            },
                            method: false,
                            shorthand: false
                          },
                          {
                            type: 'Property',
                            kind: 'init',
                            key: {
                              type: 'Literal',
                              value: 1
                            },
                            computed: false,
                            value: {
                              type: 'Identifier',
                              name: 'w'
                            },
                            method: false,
                            shorthand: false
                          },
                          {
                            type: 'Property',
                            kind: 'init',
                            key: {
                              type: 'Literal',
                              value: 2
                            },
                            computed: false,
                            value: {
                              type: 'Identifier',
                              name: 'x'
                            },
                            method: false,
                            shorthand: false
                          },
                          {
                            type: 'Property',
                            kind: 'init',
                            key: {
                              type: 'Literal',
                              value: 3
                            },
                            computed: false,
                            value: {
                              type: 'Identifier',
                              name: 'y'
                            },
                            method: false,
                            shorthand: false
                          },
                          {
                            type: 'Property',
                            kind: 'init',
                            key: {
                              type: 'Identifier',
                              name: 'length'
                            },
                            computed: false,
                            value: {
                              type: 'Identifier',
                              name: 'z'
                            },
                            method: false,
                            shorthand: false
                          }
                        ]
                      }
                    }
                  ]
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function*([...[...x]]) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'RestElement',
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
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function *icefapper([_, x] = []) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: '_'
                      },
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ]
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: []
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'icefapper'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function*({} = null) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: []
                  },
                  right: {
                    type: 'Literal',
                    value: null
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function*({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'w'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'ObjectPattern',
                            properties: [
                              {
                                type: 'Property',
                                kind: 'init',
                                key: {
                                  type: 'Identifier',
                                  name: 'x'
                                },
                                computed: false,
                                value: {
                                  type: 'Identifier',
                                  name: 'x'
                                },
                                method: false,
                                shorthand: true
                              },
                              {
                                type: 'Property',
                                kind: 'init',
                                key: {
                                  type: 'Identifier',
                                  name: 'y'
                                },
                                computed: false,
                                value: {
                                  type: 'Identifier',
                                  name: 'y'
                                },
                                method: false,
                                shorthand: true
                              },
                              {
                                type: 'Property',
                                kind: 'init',
                                key: {
                                  type: 'Identifier',
                                  name: 'z'
                                },
                                computed: false,
                                value: {
                                  type: 'Identifier',
                                  name: 'z'
                                },
                                method: false,
                                shorthand: true
                              }
                            ]
                          },
                          right: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'x'
                                },
                                value: {
                                  type: 'Literal',
                                  value: 4
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false
                              },
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'y'
                                },
                                value: {
                                  type: 'Literal',
                                  value: 5
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false
                              },
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'z'
                                },
                                value: {
                                  type: 'Literal',
                                  value: 6
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false
                              }
                            ]
                          }
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  },
                  right: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'w'
                        },
                        value: {
                          type: 'ObjectExpression',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'x'
                              },
                              value: {
                                type: 'Identifier',
                                name: 'undefined'
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: false
                            },
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'z'
                              },
                              value: {
                                type: 'Literal',
                                value: 7
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: false
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
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function*([[...x] = [a, b, c]]) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'RestElement',
                            argument: {
                              type: 'Identifier',
                              name: 'x'
                            }
                          }
                        ]
                      },
                      right: {
                        type: 'ArrayExpression',
                        elements: [
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
                  ]
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      'x=async function *f(){ var f }',
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
                type: 'FunctionExpression',
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
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: true,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Async Generator Functions (pass)', valids);
});

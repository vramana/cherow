import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Await', () => {
  const valids: Array<[string, Context, any]> = [
    [
      'async function f(){ await foo; }',
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
                    type: 'AwaitExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
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
      'async function f(){ await await foo; }',
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
                    type: 'AwaitExpression',
                    argument: {
                      type: 'AwaitExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    }
                  }
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
      'await',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'await()',
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
                name: 'await'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'await[x]',
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
                name: 'await'
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
      'await = 16',
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
                name: 'await'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 16
              }
            }
          }
        ]
      }
    ],
    [
      'await - 25',
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
                name: 'await'
              },
              right: {
                type: 'Literal',
                value: 25
              },
              operator: '-'
            }
          }
        ]
      }
    ],
    [
      'call(await)',
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
                  name: 'await'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'call(await())',
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'await'
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
      'call(await[1])',
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
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'await'
                  },
                  computed: true,
                  property: {
                    type: 'Literal',
                    value: 1
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'call(await.foo)',
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
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'await'
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
      'function call(await){}',
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
                name: 'await'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'call'
            }
          }
        ]
      }
    ],
    [
      'function call(foo=await){}',
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
                  name: 'foo'
                },
                right: {
                  type: 'Identifier',
                  name: 'await'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'call'
            }
          }
        ]
      }
    ],
    [
      'async(await);',
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
                  name: 'await'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async function f(){ async(await x); }',
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
                        type: 'AwaitExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'x'
                        }
                      }
                    ]
                  }
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
      '(await())',
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
                name: 'await'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'function await(){}',
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
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'async function await(){}',
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
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'function *await(){}',
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
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'let x = function await(){}',
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
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'await'
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {async await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {*await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
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

                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {async *await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        async: true,
                        generator: true,

                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'function f(await){}',
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
                name: 'await'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
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
      'function *f(await){}',
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
                name: 'await'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'let o = {*f(await){}}',
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
                        generator: true,

                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '(await) => x',
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
                  name: 'await'
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
      'async(await)',
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
                  name: 'await'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function *f(){  (await) => x  }',
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
                      type: 'Identifier',
                      name: 'x'
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'await'
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
            generator: true,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function *f(){  foo(await)  }',
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
                      name: 'foo'
                    },
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'await'
                      }
                    ]
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
        ]
      }
    ],
    [
      'function f(foo = await){}',
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
                  name: 'foo'
                },
                right: {
                  type: 'Identifier',
                  name: 'await'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
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
      'function *f(foo = await){}',
      Context.Empty,
      {
        body: [
          {
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },

            generator: true,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [
              {
                left: {
                  name: 'foo',
                  type: 'Identifier'
                },
                right: {
                  name: 'await',
                  type: 'Identifier'
                },
                type: 'AssignmentPattern'
              }
            ],
            type: 'FunctionDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'let x = function f(foo = await){}',
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
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'await'
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let x = function *f(foo = await){}',
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'x',
                  type: 'Identifier'
                },
                init: {
                  async: false,
                  body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  generator: true,
                  id: {
                    name: 'f',
                    type: 'Identifier'
                  },
                  params: [
                    {
                      left: {
                        name: 'foo',
                        type: 'Identifier'
                      },
                      right: {
                        name: 'await',
                        type: 'Identifier'
                      },
                      type: 'AssignmentPattern'
                    }
                  ],
                  type: 'FunctionExpression'
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'let',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'let o = {f(foo = await){}}',
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
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            right: {
                              type: 'Identifier',
                              name: 'await'
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
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {*f(foo = await){}}',
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'o',
                  type: 'Identifier'
                },
                init: {
                  properties: [
                    {
                      computed: false,
                      key: {
                        name: 'f',
                        type: 'Identifier'
                      },
                      kind: 'init',
                      method: true,
                      shorthand: false,
                      type: 'Property',
                      value: {
                        async: false,
                        body: {
                          body: [],
                          type: 'BlockStatement'
                        },

                        generator: true,
                        id: null,
                        params: [
                          {
                            left: {
                              name: 'foo',
                              type: 'Identifier'
                            },
                            right: {
                              name: 'await',
                              type: 'Identifier'
                            },
                            type: 'AssignmentPattern'
                          }
                        ],
                        type: 'FunctionExpression'
                      }
                    }
                  ],
                  type: 'ObjectExpression'
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'let',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async function a(){     async ([v] = await bar);     }',
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
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'v'
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'bar'
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            },
            async: true,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'a'
            }
          }
        ]
      }
    ],
    [
      'async function a(){     async (foo = [{m: 5 + t(await bar)}]);     }',
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
                          name: 'foo'
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
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
                }
              ]
            },
            async: true,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'a'
            }
          }
        ]
      }
    ],
    [
      'async function a(){     async ({g} = [{m: 5 + t(await bar)}]);     }',
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
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'g'
                              },
                              value: {
                                type: 'Identifier',
                                name: 'g'
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
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
                }
              ]
            },
            async: true,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'a'
            }
          }
        ]
      }
    ],
    [
      'async function a(){     async ([y] = [{m: 5 + t(await bar)}]);     }',
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
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'y'
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
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
                }
              ]
            },
            async: true,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'a'
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Call (pass)', valids);
});

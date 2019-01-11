import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Block', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings
    ['{ if (x) function f() {} ; function f() {} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} ; function f() {} }', Context.OptionsDisableWebCompat],
    ['function f(){ var f = 123; if (true) function f(){} }', Context.OptionsDisableWebCompat],
    ['{ var f = 123; if (true) function f(){} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} ; function f() {} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} ; function f() {} }', Context.OptionsDisableWebCompat]
  ];

  fail('Statements - Block (fail)', inValids);

  pass('Statements - Block (pass)', [
    [
      '{}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: []
          }
        ]
      }
    ],
    [
      '{\n  debugger;\n}',
      Context.Empty,
      {
        body: [
          {
            body: [
              {
                type: 'DebuggerStatement'
              }
            ],
            type: 'BlockStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{}\n/foo/',
      Context.Empty,
      {
        body: [
          {
            body: [],
            type: 'BlockStatement'
          },
          {
            expression: {
              regex: {
                flags: '',
                pattern: 'foo'
              },
              type: 'Literal',
              value: /foo/
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{ function a() {} ; function b() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
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

                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              {
                type: 'EmptyStatement'
              },
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
                  name: 'b'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ function f() {} ; function f() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
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

                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              },
              {
                type: 'EmptyStatement'
              },
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
                  name: 'f'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ if (x) function f() {} ; function f() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'IfStatement',
                test: {
                  type: 'Identifier',
                  name: 'x'
                },
                consequent: {
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
                    name: 'f'
                  }
                },
                alternate: null
              },
              {
                type: 'EmptyStatement'
              },
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
                  name: 'f'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'function f() {} ; function f() {}',
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
              name: 'f'
            }
          },
          {
            type: 'EmptyStatement'
          },
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
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function g(){ function f() {} ; function f() {} }',
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

                  id: {
                    type: 'Identifier',
                    name: 'f'
                  }
                },
                {
                  type: 'EmptyStatement'
                },
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
                    name: 'f'
                  }
                }
              ]
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      '{ var f = 123; if (true) function f(){} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'Literal',
                      value: 123
                    },
                    id: {
                      type: 'Identifier',
                      name: 'f'
                    }
                  }
                ]
              },
              {
                type: 'IfStatement',
                test: {
                  type: 'Literal',
                  value: true
                },
                consequent: {
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
                    name: 'f'
                  }
                },
                alternate: null
              }
            ]
          }
        ]
      }
    ],
    [
      '{debugger;}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'DebuggerStatement'
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{\n  debugger;\n}',
      Context.Empty,
      {
        body: [
          {
            body: [
              {
                type: 'DebuggerStatement'
              }
            ],
            type: 'BlockStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{}\n/foo/',
      Context.Empty,
      {
        body: [
          {
            body: [],
            type: 'BlockStatement'
          },
          {
            expression: {
              regex: {
                flags: '',
                pattern: 'foo'
              },
              type: 'Literal',
              value: /foo/
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{}\n/foo/g',
      Context.Empty,
      {
        body: [
          {
            body: [],
            type: 'BlockStatement'
          },
          {
            expression: {
              regex: {
                flags: 'g',
                pattern: 'foo'
              },
              type: 'Literal',
              value: /foo/g
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: []
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{a}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
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
        sourceType: 'script'
      }
    ],
    [
      '1e+32',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 1e32
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '0b0001101',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 13
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '0O3456232342372345777345435456564',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 4.444740646335511e27
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ]);
});

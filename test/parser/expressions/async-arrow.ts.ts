import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Async arrow', () => {});

const inValids: Array<[string, Context]> = [
  ['async cherow => { let cherow;}', Context.Empty],
  ['async cherow => { const cherow; }', Context.Empty],
  ['async cherow => let cherow;', Context.Empty],
  ['async (foo) => { const a; }', Context.Empty], // Missing initializer in const declaration
  ['cherow => { let cherow;}', Context.Empty],
  ['cherow => { const cherow; }', Context.Empty],
  ['cherow => let cherow;', Context.Empty]
];

fail('Expressions - Template', inValids);

pass('Expressions - Async arrow (pass)', [
  [
    `a => {}
    a => {}
    async () => {}
    a => {}
    a => {}
    a => {}
    a => {}
    async a => {}
    async a => {}
    async a => {}
    async a => {}`,
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
            async: true,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `() => {}
    async => {}
    async => {}
    a => a
    async a => {}`,
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
            params: [],
            id: null,
            async: false,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: true
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        }
      ]
    }
  ],
  [
    `async () => {}
    () => {}
     async () => {}
    async () => {}
    () => {}
       () => {}
    a((a))
 async () => {}
 async () => {}
  async () => {}
  async () => {}
   `,
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
            params: [],
            id: null,
            async: true,

            expression: false
          }
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'a'
            },
            arguments: [
              {
                type: 'Identifier',
                name: 'a'
              }
            ]
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        }
      ]
    }
  ],
  [
    `async () => {}
    () => {}
    async () => {}
    async () => {}
    () => {}
    () => {}
    async () => {}
    async () => {}
    async () => {}
    async a => {}
    () => {}
    () => {}
    async()
    async a => {}`,
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
            params: [],
            id: null,
            async: true,

            expression: false
          }
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        },
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
        },
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
        },
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
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        }
      ]
    }
  ],
  [
    `async () => {}
    () => {}
    async b => {}
    async b => {}
    async () => {}
    async () => {}
    () => {}
    a => {}
    a => {}
    async () => {}
    () => {}
    a => {}
    async () => {}
    () => {}
    async () => {}
    a => {}
    async () => {}
    async () => {}
    () => {}`,
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
            params: [],
            id: null,
            async: true,

            expression: false
          }
        },
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
        },
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
                type: 'Identifier',
                name: 'b'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'b'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
    }
  ],
  [
    `a => a => a => async a => a
    async a => a
    a => a => a => async a => a
    async () => {}
    async a => a`,
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
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  id: null,
                  async: true,

                  expression: true
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  }
                ],
                id: null,
                async: false,

                expression: true
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: true
            },
            params: [
              {
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: true
          }
        },
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
                name: 'a'
              }
            ],
            id: null,
            async: true,

            expression: true
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  id: null,
                  async: true,

                  expression: true
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  }
                ],
                id: null,
                async: false,

                expression: true
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: true
            },
            params: [
              {
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: true
          }
        },
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
            async: true,

            expression: false
          }
        },
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
                name: 'a'
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
    `() => {}
    () => {}
    () => {}
    () => {}
    () => {}
    () => {}
    () => {}
    async b => {}
    async b => {}
    async b => {}
    async () => {}
    async () => {}
    async () => {}
    async () => {}
    async () => {}
    () => {}
    async () => {}
    () => {}
    async () => {}
    () => {}
    a => {}
    a => {}
    async () => {}
    () => {}
    a => {}
    () => {}
    async () => {}
    async () => {}
    () => {}
    async () => {}
    a => {}
    async () => {}
    async () => {}
    () => {}`,
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
            params: [],
            id: null,
            async: false,

            expression: false
          }
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
        },
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
                type: 'Identifier',
                name: 'b'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'b'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'b'
              }
            ],
            id: null,
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
        },
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
            async: true,

            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
            async: true,

            expression: false
          }
        },
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
    }
  ],
  //[`=> {}`, Context.Empty,  {}],
  //[`=> {}`, Context.Empty,  {}],
  //[`=> {}`, Context.Empty,  {}],
  //[`=> {}`, Context.Empty,  {}],
  //[`=> {}`, Context.Empty,  {}],
  [
    `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,
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
            params: [],
            id: null,
            async: false,
            expression: false
          }
        },
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
        },
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
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
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
    `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,
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
            params: [],
            id: null,
            async: false,
            expression: false
          }
        },
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
        },
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
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
                type: 'Identifier',
                name: 'a'
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
    `(async) => {}`,
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
                type: 'Identifier',
                name: 'async'
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
    `async => {}`,
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
                type: 'Identifier',
                name: 'async'
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
    `async (cherow) => {}`,
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
                type: 'Identifier',
                name: 'cherow'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `async cherow => {}`,
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
                type: 'Identifier',
                name: 'cherow'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ]
  /* [
    `async cherow => {}`,
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
                type: 'Identifier',
                name: 'cherow'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `async => {}`,
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
                type: 'Identifier',
                name: 'async'
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
    `() => {}
      async () => {}`,
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
            params: [],
            id: null,
            async: false,
            expression: false
          }
        },
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
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `async => {}
    async () => {}`,
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
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
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
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `async () => {}
    async () => {}`,
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
            params: [],
            id: null,
            async: true,
            expression: false
          }
        },
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
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    'async (a, b, c) => {}',
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
            ],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ]*/
]);

import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Async arrow', () => {});

const inValids: Array<[string, Context]> = [
  ['async cherow => { let cherow;}', Context.Empty],
  ['async cherow => { const cherow; }', Context.Empty],
  ['async cherow => let cherow;', Context.Empty],
  ['async (foo) => { const a; }', Context.Empty] // Missing initializer in const declaration
];

pass('Expressions - Async arrow (pass)', [
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
  ]
]);

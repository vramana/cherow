import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Unary', () => {});

fail('Expressions - Unary (fail)', [
  ['delete async; () => x;', Context.Strict]
  //['delete async \n (a) => x', Context.Strict],
  //['delete async; () => x;', Context.Strict],
  //['delete async; () => x;', Context.Strict],
  /**  ['typeof async () => x', Context.Empty],
  ['typeof async \n () => x', Context.Empty],
  ['let x = typeof async \n (x) => x', Context.Empty],
  ['let x = typeof async (x) \n => x', Context.Empty],
  ['delete async \n () => x', Context.Empty],
  ['delete async () \n => x', Context.Empty],
  ['let x = delete async \n (x) => x', Context.Empty],
  ['let x = delete async (x) \n => x', Context.Empty]  */
]);

pass('Expressions - Unary (pass)', [
  [
    'delete async',
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
              name: 'async'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'delete x.y',
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
                name: 'x'
              },
              property: {
                type: 'Identifier',
                name: 'y'
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
    'typeof async',
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
              name: 'async'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ]
]);

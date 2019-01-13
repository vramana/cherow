import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Array', () => {});

pass('Expressions - Array (pass)', [
  [
    'async (a, b, c)',
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
  ]
]);

import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Array', () => {});

pass('Expressions - Array (pass)', [
  [
    '(a)',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
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
  [
    '(x &= 42)',
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
            operator: '&=',
            right: {
              type: 'Literal',
              value: 42
            }
          }
        }
      ]
    }
  ],
  [
    '([a])',
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
                name: 'a'
              }
            ]
          }
        }
      ]
    }
  ]
]);

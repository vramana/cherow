import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Assignment', () => {});

pass('Expressions - Async function (pass)', [
  [
    'a = b',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              name: 'a',
              type: 'Identifier'
            },
            operator: '=',
            right: {
              name: 'b',
              type: 'Identifier'
            },
            type: 'AssignmentExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    'a = 2',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              name: 'a',
              type: 'Identifier'
            },
            operator: '=',
            right: {
              name: 2,
              type: 'Identifier'
            },
            type: 'AssignmentExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ]
]);

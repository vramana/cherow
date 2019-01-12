import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Postfix', () => {});

pass('Expressions - Postfix (pass)', [
  [
    'x--',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '--',
            prefix: false
          }
        }
      ]
    }
  ],
  [
    'x++',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '++',
            prefix: false
          }
        }
      ]
    }
  ]
]);

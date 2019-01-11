import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Additive', () => {});

pass('Expressions - Additive (pass)', [
  [
    '--a',
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
              name: 'a'
            },
            operator: '--',
            prefix: true
          }
        }
      ]
    }
  ]
]);

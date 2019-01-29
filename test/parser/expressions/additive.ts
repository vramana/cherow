import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Additive', () => {});

pass('Expressions - Additive (pass)', [
  [
    '--a',
    Context.OptionsRanges,
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
              name: 'a',
              start: 2,
              end: 3
            },
            operator: '--',
            prefix: true,
            start: 0,
            end: 3
          },
          start: 0,
          end: 3
        }
      ],
      start: 0,
      end: 3
    }
  ]
]);

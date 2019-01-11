import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Literal - Numbers', () => {});

pass('Literal - String (pass)', [
  [
    '"hello"',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 'hello'
          },
          directive: 'hello'
        }
      ],
      sourceType: 'script'
    }
  ]
]);

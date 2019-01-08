import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Literal - Numbers', () => {});

pass('Literal - Numbers (pass)', [
  [
    '123.22',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 123.22
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '09876543',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 9876543
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '1e+32',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 1e32
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '0b0001101',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 13
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '0O3456232342372345777345435456564',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 4.444740646335511e27
          }
        }
      ],
      sourceType: 'script'
    }
  ]
]);

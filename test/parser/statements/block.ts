import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Statements - Block', () => {
  pass('Statements - Block (pass)', [
    [
      '{}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: []
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{a}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
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
});

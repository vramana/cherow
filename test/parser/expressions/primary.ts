import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Primary', () => {});

fail('Expressions - Primary (fail)', [
  ['false\n/foo/;', Context.Empty],
  ['null\n/foo/;', Context.Empty],
  ['this\n/foo/;', Context.Empty],
  ['false\n/foo/;', Context.Empty]
]);

pass('Expressions - Primary (pass)', [
  [
    'this\n/foo/g;',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              left: {
                type: 'ThisExpression'
              },
              operator: '/',
              right: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'BinaryExpression'
            },
            operator: '/',
            right: {
              name: 'g',
              type: 'Identifier'
            },
            type: 'BinaryExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    'null\n/foo/g;',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              left: {
                type: 'Literal',
                value: null
              },
              operator: '/',
              right: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'BinaryExpression'
            },
            operator: '/',
            right: {
              name: 'g',
              type: 'Identifier'
            },
            type: 'BinaryExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    'false\n/foo/g;',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              left: {
                type: 'Literal',
                value: false
              },
              operator: '/',
              right: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'BinaryExpression'
            },
            operator: '/',
            right: {
              name: 'g',
              type: 'Identifier'
            },
            type: 'BinaryExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ]
]);

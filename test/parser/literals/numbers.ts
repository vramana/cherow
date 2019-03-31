import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Literal - Numbers', () => {});

pass('Literal - Numbers (pass)', [
  [
    '"use strict"; colNumber = Math.max(colNumber, 0);',
    Context.Empty,
    {
      body: [
        {
          expression: {
            type: 'Literal',
            value: 'use strict'
          },
          type: 'ExpressionStatement'
        },
        {
          expression: {
            left: {
              name: 'colNumber',
              type: 'Identifier'
            },
            operator: '=',
            right: {
              arguments: [
                {
                  name: 'colNumber',
                  type: 'Identifier'
                },
                {
                  type: 'Literal',
                  value: 0
                }
              ],
              callee: {
                computed: false,
                object: {
                  name: 'Math',
                  type: 'Identifier'
                },
                property: {
                  name: 'max',
                  type: 'Identifier'
                },
                type: 'MemberExpression'
              },
              type: 'CallExpression'
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
  /*  [
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
  ],*/
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
  ],
  [
    '.123',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 0.123
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '-0.5',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            argument: {
              type: 'Literal',
              value: 0.5
            },
            operator: '-',
            prefix: true,
            type: 'UnaryExpression'
          }
        }
      ],
      sourceType: 'script'
    }
  ]
]);

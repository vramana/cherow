import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Update', () => {
  fail('Expressions - Update (fail)', [
    ['--1', Context.Empty],
    ['++a[]', Context.Empty],
    ['a()++', Context.Empty],
    ['1--', Context.Empty],
    ['a[]++', Context.Empty],
    ['a()++', Context.Empty],
    ['a()++', Context.Empty],
    ['a()++', Context.Empty],
    ['a()++', Context.Empty],
    ['foo\n++', Context.Empty],
    ['if (foo\n++);', Context.Empty]
  ]);

  pass('Expressions - Update (pass)', [
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
    ],
    [
      'a.a--',
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              operator: '--',
              prefix: false
            }
          }
        ]
      }
    ],
    [
      '++a.a',
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              operator: '++',
              prefix: true
            }
          }
        ]
      }
    ],
    [
      'foo\n++bar',
      Context.Empty,
      {
        body: [
          {
            expression: {
              name: 'foo',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              argument: {
                name: 'bar',
                type: 'Identifier'
              },
              operator: '++',
              prefix: true,
              type: 'UpdateExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'foo\n++\nbar',
      Context.Empty,
      {
        body: [
          {
            expression: {
              name: 'foo',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              argument: {
                name: 'bar',
                type: 'Identifier'
              },
              operator: '++',
              prefix: true,
              type: 'UpdateExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '++\nfoo;',
      Context.Empty,
      {
        body: [
          {
            expression: {
              argument: {
                name: 'foo',
                type: 'Identifier'
              },
              operator: '++',
              prefix: true,
              type: 'UpdateExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '"foo"\n++bar',
      Context.Empty,
      {
        body: [
          {
            expression: {
              type: 'Literal',
              value: 'foo'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              argument: {
                name: 'bar',
                type: 'Identifier'
              },
              operator: '++',
              prefix: true,
              type: 'UpdateExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '--a.a',
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              operator: '--',
              prefix: true
            }
          }
        ]
      }
    ]
  ]);
});

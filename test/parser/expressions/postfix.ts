import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Postfix', () => {});

fail('Expressions - Template', [
  ['this.foo[foo].bar(this)(bar)[foo]()--', Context.Empty],
  ['foo[bar]()--', Context.Empty]
]);

pass('Expressions - Postfix (pass)', [
  [
    'foo.bar--',
    Context.LocationTracking,
    {
      type: 'Program',
      start: 0,
      end: 9,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 9
        }
      },
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 9,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 9
            }
          },
          expression: {
            type: 'UpdateExpression',
            start: 0,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 9
              }
            },
            operator: '--',
            prefix: false,
            argument: {
              type: 'MemberExpression',
              start: 0,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 7
                }
              },
              object: {
                type: 'Identifier',
                start: 0,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                },
                name: 'foo'
              },
              property: {
                type: 'Identifier',
                start: 4,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                name: 'bar'
              },
              computed: false
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'new foo().bar--',
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
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'foo'
                },
                arguments: []
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bar'
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

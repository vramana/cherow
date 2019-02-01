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
    ['if (foo\n++);', Context.Empty],
    ['a\n++', Context.Empty],
    ['function f(){ return a\n++; }', Context.Empty],
    ['let x = () => a\n++;', Context.Empty],
    ['if (a\n++);', Context.Empty],
    ['if (a) a\n++;', Context.Empty],
    ['function f(){ return a\n--; }', Context.Empty],
    ['let x = () => a\n--;', Context.Empty],
    ['if (a\n--);', Context.Empty],
    ['if (a++\nb);', Context.Empty],
    ['z=[b\n++c];', Context.Empty],
    ['(b\n++c);', Context.Empty],
    ['if (b\n++c);', Context.Empty],
    ['for (b\n++c;;);', Context.Empty],
    ['for (;b\n++c;);', Context.Empty],
    ['for (;b\n++c);', Context.Empty],
    ['(b\n++c);', Context.Empty],
    ['z=[b\n++c];', Context.Empty],
    ['z={x:b\n++c};', Context.Empty],
    ['foo(b\n++c);', Context.Empty],
    ['if (a++\nb);', Context.Empty]
  ]);

  pass('Expressions - Update (pass)', [
    [
      '{b\n++c};',
      Context.Empty,
      {
        body: [
          {
            body: [
              {
                expression: {
                  name: 'b',
                  type: 'Identifier'
                },
                type: 'ExpressionStatement'
              },
              {
                expression: {
                  argument: {
                    name: 'c',
                    type: 'Identifier'
                  },
                  operator: '++',
                  prefix: true,
                  type: 'UpdateExpression'
                },
                type: 'ExpressionStatement'
              }
            ],
            type: 'BlockStatement'
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'while (true) {b\n++c};',
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [
                {
                  expression: {
                    name: 'b',
                    type: 'Identifier'
                  },
                  type: 'ExpressionStatement'
                },
                {
                  expression: {
                    argument: {
                      name: 'c',
                      type: 'Identifier'
                    },
                    operator: '++',
                    prefix: true,
                    type: 'UpdateExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              type: 'BlockStatement'
            },
            test: {
              type: 'Literal',
              value: true
            },
            type: 'WhileStatement'
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async function f(){ await\n++c; }',
      Context.Empty,
      {
        body: [
          {
            async: true,
            body: {
              body: [
                {
                  expression: {
                    argument: {
                      argument: {
                        name: 'c',
                        type: 'Identifier'
                      },
                      operator: '++',
                      prefix: true,
                      type: 'UpdateExpression'
                    },
                    type: 'AwaitExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              type: 'BlockStatement'
            },
            generator: false,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'a=b\n++c',
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                name: 'a',
                type: 'Identifier'
              },
              operator: '=',
              right: {
                name: 'b',
                type: 'Identifier'
              },
              type: 'AssignmentExpression'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              argument: {
                name: 'c',
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
      'a,b\n++c',
      Context.Empty,
      {
        body: [
          {
            expression: {
              expressions: [
                {
                  name: 'a',
                  type: 'Identifier'
                },
                {
                  name: 'b',
                  type: 'Identifier'
                }
              ],
              type: 'SequenceExpression'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              argument: {
                name: 'c',
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
      'a++\nb',
      Context.Empty,
      {
        body: [
          {
            expression: {
              argument: {
                name: 'a',
                type: 'Identifier'
              },
              operator: '++',
              prefix: false,
              type: 'UpdateExpression'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              name: 'b',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'a\n++\nb',
      Context.Empty,
      {
        body: [
          {
            expression: {
              name: 'a',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              argument: {
                name: 'b',
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

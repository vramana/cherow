import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Labeled', () => {
  const invalids: Array<[string, Context]> = [
    ['label: class C {};', Context.Empty],
    ['label: let x;', Context.Empty],
    ['a: async function* a(){}', Context.Empty],
    //['label: function* g() {}', Context.Empty],
    ['label: const x = null;', Context.Empty],
    ['label: function g() {}', Context.Strict],
    ['label: let x;', Context.Empty],
    ['await: 1;', Context.Strict | Context.Module],
    ['yield: 1;', Context.Strict],
    ['foo:for;', Context.Empty],
    // ['foo:implements;', Context.Strict | Context.Module],
    ['do { test262: { continue test262; } } while (false)', Context.Empty]
  ];

  fail('Statements - Labeled (failure)', invalids);
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'a:{break a;}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a'
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BreakStatement',
                  label: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'a: function foo() {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a'
            },
            body: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: false,
              expression: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '__proto__: while (true) { break __proto__; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BreakStatement',
                    label: {
                      type: 'Identifier',
                      name: '__proto__'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      '__proto__: test',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'test'
              }
            }
          }
        ]
      }
    ],
    [
      'async: await',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'async'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'await'
              }
            }
          }
        ]
      }
    ],
    [
      'start: while (true) break start',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'start'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BreakStatement',
                label: {
                  type: 'Identifier',
                  name: 'start'
                }
              }
            }
          }
        ]
      }
    ],
    [
      'L: let\nx',
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                name: 'let',
                type: 'Identifier'
              },
              type: 'ExpressionStatement'
            },
            label: {
              name: 'L',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          },
          {
            expression: {
              name: 'x',
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
      'start: while (true) break start',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'start'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BreakStatement',
                label: {
                  type: 'Identifier',
                  name: 'start'
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '__proto__: test',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'test'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '__proto__: while (true) { break __proto__; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BreakStatement',
                    label: {
                      type: 'Identifier',
                      name: '__proto__'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      '"use strict"; arguments: while (true) break arguments',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict'
            },
            directive: 'use strict'
          },
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'arguments'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BreakStatement',
                label: {
                  type: 'Identifier',
                  name: 'arguments'
                }
              }
            }
          }
        ]
      }
    ],
    [
      'a:{break a;}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a'
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BreakStatement',
                  label: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'await: x',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'await'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'async: await',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'async'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'await'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Labeled (pass)', valids);
});

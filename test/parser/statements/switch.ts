import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Switch', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['switch (x) { case a: let foo; break; case b: let foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: let foo; break; default: let foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: let foo; break; case b: var foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: var foo; break; case b: let foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: let foo; break; case b: const foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: const foo = x; break; case b: let foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: const foo = x; break; case b: const foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: const foo = x; break; case b: var foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: var foo = x; break; case b: const foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case 0: var foo = 1 } let foo = 1;', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: const f = x; break; case b: function f(){}; break; }', Context.Empty],
    ['switch (x) {case a: function f(){}; break; case b: let f; break; }', Context.Empty],
    ['switch (x) {case a: function f(){}; break; case b: let f; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: async function f(){}; break; case b: let f; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: function f(){}; break; case b: async function f(){} }', Context.OptionsDisableWebCompat],
    [
      'switch (x) {case a: async function f(){}; break; case b: async function f(){} }',
      Context.OptionsDisableWebCompat
    ],
    ['switch (x) {case a: async function *f(){}; break; case b: function f(){} }', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: function *f(){}; break; case b: async function f(){} }', Context.OptionsDisableWebCompat],
    ['()?c:d=>{}=>{}', Context.OptionsDisableWebCompat],
    ['switch(x) { default: default: }', Context.OptionsDisableWebCompat],
    ['switch(x) { default: break; default: break; }', Context.OptionsDisableWebCompat],
    ['switch(x) { case y: break; case z: break; default: default: }', Context.OptionsDisableWebCompat],
    ['switch(x) { default: default: case y: break; case z: break; }', Context.OptionsDisableWebCompat],
    ['switch(x) { default: break; case y: break; case z: break; default: break; }', Context.OptionsDisableWebCompat],

    [
      `function SwitchTest(value){
      var result = 0;
      switch(value) {
        case 0:
          result += 2;
        default:
          result += 32;
          break;
        default:
          result += 32;
          break;
      }
      return result;
    }`,
      Context.OptionsDisableWebCompat
    ]
  ];

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'switch (A) {case B: C;}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'B'
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'C'
                    }
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'switch (A) {default: B;}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'B'
                    }
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'switch (A) {case B: C; default: D;}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'B'
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'C'
                    }
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'D'
                    }
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'switch (A) {default: D; case B: C; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'D'
                    }
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'B'
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'C'
                    }
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'switch (A) {case B: C; case D: E;}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'B'
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'C'
                    }
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'D'
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'E'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      'switch (A) {case B: C; break; case D: E; break;}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'B'
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'C'
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'D'
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'E'
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'switch (answer) { case a: let b = c; break; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'answer'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'a'
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        init: {
                          type: 'Identifier',
                          name: 'c'
                        }
                      }
                    ],
                    kind: 'let'
                  },
                  {
                    type: 'BreakStatement',
                    label: null
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'switch (x) { case a: var foo; break; default: var foo; break; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'a'
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        init: null
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'BreakStatement',
                    label: null
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        init: null
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'BreakStatement',
                    label: null
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'switch (x) { case a: var foo; break; case b: var foo; break; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'a'
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        init: null
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'BreakStatement',
                    label: null
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'b'
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        init: null
                      }
                    ],
                    kind: 'var'
                  },
                  {
                    type: 'BreakStatement',
                    label: null
                  }
                ]
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Labeled (pass)', valids);
});

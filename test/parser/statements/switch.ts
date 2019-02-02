import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Switch', () => {
  fail('Statements - Return (fail)', [
    ['switch (x) { case a: let foo; break; case b: let foo; break; }', Context.Empty],
    ['switch (x) { case a: let foo; break; default: let foo; break; }', Context.Empty],
    ['switch (x) { case a: let foo; break; case b: var foo; break; }', Context.Empty],
    ['switch (x) { case a: var foo; break; case b: let foo; break; }', Context.Empty],
    ['switch (x) { case a: let foo; break; case b: const foo = x; break; }', Context.Empty],
    ['switch (x) { case a: const foo = x; break; case b: let foo; break; }', Context.Empty],
    ['switch (x) { case a: const foo = x; break; case b: const foo = x; break; }', Context.Empty],
    ['switch (x) { case a: const foo = x; break; case b: var foo = x; break; }', Context.Empty],
    ['switch (x) { case a: var foo = x; break; case b: const foo = x; break; }', Context.Empty],
    ['switch (x) { case 0: var foo = 1 } let foo = 1;', Context.Empty],
    ['switch (x) {case a: const f = x; break; case b: function f(){}; break; }', Context.Empty],
    ['switch (x) {case a: function f(){}; break; case b: let f; break; }', Context.Empty],
    ['switch (x) {case a: function f(){}; break; case b: let f; break; }', Context.Empty],
    ['switch (x) {case a: async function f(){}; break; case b: let f; break; }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: async function f() {} }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: const f = 0 }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: let f }', Context.Empty],
    ['switch (0) { case 1: class f {} default: async function f() {} }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: async function f() {} }', Context.Empty],
    ['switch (x) {case a: function f(){}; break; case b: async function f(){} }', Context.Empty],
    ['switch (x) {case a: async function f(){}; break; case b: async function f(){} }', Context.Empty],
    ['switch (x) {case a: async function *f(){}; break; case b: function f(){} }', Context.Empty],
    ['switch (x) {case a: function *f(){}; break; case b: async function f(){} }', Context.Empty],
    ['()?c:d=>{}=>{}', Context.Empty],
    ['switch(x) { default: default: }', Context.Empty],
    ['switch(x) { default: break; default: break; }', Context.Empty],
    ['switch(x) { case y: break; case z: break; default: default: }', Context.Empty],
    ['switch(x) { default: default: case y: break; case z: break; }', Context.Empty],
    ['switch(x) { default: break; case y: break; case z: break; default: break; }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: async function f() {} }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: class f {} }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: var f }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: var f }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: const f = 0 }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: let f }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: var f }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: function f() {} }', Context.Empty],
    ['switch (0) { case 1: function* f() {} default: class f {} }', Context.Empty],
    ['switch (0) { case 1: let f; default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: var f; default: const f = 0 }', Context.Empty],
    ['switch (0) { case 1: var f; default: let f }', Context.Empty],
    ['switch (0) { case 1: function* f() {} default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: var f }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: function* f() {} }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: const f = 0 }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: class f {} }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: let f }', Context.Empty],
    ['switch (0) { case 1: class f {} default: function* f() {} }', Context.Empty],
    ['switch (0) { case 1: class f {} default: const f = 0 }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: class f {} }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: function f() {} }', Context.Empty],
    ['switch (0) { case 1: let f; default: class f {} }', Context.Empty],
    ['switch (0) { case 1: let f; default: const f = 0 }', Context.Empty],
    ['switch (0) { case 1: let f; default: function* f() {} }', Context.Empty],
    ['switch (0) { case 1: let f; default: let f }', Context.Empty],
    ['switch (0) { case 1: var f; default: async function f() {} }', Context.Empty],
    ['switch (0) { case 1: var f; default: class f {} }', Context.Empty],
    ['switch (0) { case 1: var f; default: let f }', Context.Empty],
    ['switch (0) { case 1: function* f() {} default: function* f() {} }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: async function f() {} }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: class f {} }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: class f {} default: class f {} }', Context.Empty],
    ['switch (0) { case 1: class f {} default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: var f }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: let f }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: const f = 0 }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: class f {} }', Context.Empty],
    ['switch (0) { case 1: async function f() {} default: function f() {} }', Context.Empty],
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
      Context.Empty
    ]
  ]);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'switch (0) { case 1: var f; default: var f }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f'
                        }
                      }
                    ]
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      '"use strict"; switch(x) { case 1: }',
      Context.OptionsRaw | Context.OptionsDirectives,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"'
            },
            directive: 'use strict'
          },
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              raw: 'x'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  raw: '1'
                },
                consequent: []
              }
            ]
          }
        ]
      }
    ],
    [
      'function foo() {"use strict"; switch(x) { default: class C {}; function f() {}}}',
      Context.OptionsNext | Context.OptionsDirectives,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: 'use strict'
                  },
                  directive: ''
                },
                {
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  cases: [
                    {
                      type: 'SwitchCase',
                      test: null,
                      consequent: [
                        {
                          type: 'ClassDeclaration',
                          id: {
                            type: 'Identifier',
                            name: 'C'
                          },
                          superClass: null,
                          body: {
                            type: 'ClassBody',
                            body: []
                          }
                        },
                        {
                          type: 'EmptyStatement'
                        },
                        {
                          type: 'FunctionDeclaration',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: []
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'function foo() {"use strict"; switch(x) { default:class C extends Q {}}}',
      Context.OptionsNext | Context.OptionsRanges,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: 'use strict',
                    start: 16,
                    end: 28
                  },
                  start: 16,
                  end: 29
                },
                {
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'Identifier',
                    name: 'x',
                    start: 37,
                    end: 38
                  },
                  cases: [
                    {
                      type: 'SwitchCase',
                      test: null,
                      consequent: [
                        {
                          type: 'ClassDeclaration',
                          id: {
                            type: 'Identifier',
                            name: 'C',
                            start: 56,
                            end: 57
                          },
                          superClass: {
                            type: 'Identifier',
                            name: 'Q',
                            start: 66,
                            end: 67
                          },
                          body: {
                            type: 'ClassBody',
                            body: [],
                            start: 68,
                            end: 70
                          },
                          start: 50,
                          end: 70
                        }
                      ],
                      start: 42,
                      end: 70
                    }
                  ],
                  start: 30,
                  end: 71
                }
              ],
              start: 15,
              end: 72
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'foo',
              start: 9,
              end: 12
            },
            start: 0,
            end: 72
          }
        ],
        start: 0,
        end: 72
      }
    ],
    [
      'switch (A) {case B: C;}',
      Context.LocationTracking,
      {
        type: 'Program',
        start: 0,
        end: 23,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 23
          }
        },
        body: [
          {
            type: 'SwitchStatement',
            start: 0,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 23
              }
            },
            discriminant: {
              type: 'Identifier',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              },
              name: 'A'
            },
            cases: [
              {
                type: 'SwitchCase',
                start: 12,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    start: 20,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    expression: {
                      type: 'Identifier',
                      start: 20,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      },
                      name: 'C'
                    }
                  }
                ],
                test: {
                  type: 'Identifier',
                  start: 17,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  name: 'B'
                }
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
      `let x
  switch (x) {
  case 1:
    function a() {}
  case 2:
    function a() {}
  }`,
      Context.OptionsWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
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
                  type: 'Literal',
                  value: 1
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'a'
                    }
                  }
                ]
              },
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 2
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'a'
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

import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Block', () => {
  const inValids: Array<[string, Context]> = [
    ['y={x;};', Context.OptionsDisableWebCompat],
    ['do{};while()', Context.OptionsDisableWebCompat],
    ['if{};else{}', Context.OptionsDisableWebCompat],
    ['try{};catch{};finally{}', Context.OptionsDisableWebCompat],
    ['try{};catch(){}', Context.OptionsDisableWebCompat],
    ['{ if (x) function f() {} ; function f() {} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} ; function f() {} }', Context.OptionsDisableWebCompat],
    ['function f(){ var f = 123; if (true) function f(){} }', Context.OptionsDisableWebCompat],
    ['{ var f = 123; if (true) function f(){} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} ; function f() {} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} ; function f() {} }', Context.OptionsDisableWebCompat],
    ['{ let a; class a {} }', Context.OptionsDisableWebCompat],
    ['{ async function a() {} async function a() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* a() {} break; default: var a; }', Context.OptionsDisableWebCompat],
    ['for (let x; false; ) { var x; }', Context.OptionsDisableWebCompat],
    ['for (let x of []) { var x;  }', Context.OptionsDisableWebCompat],
    ['for (const x in {}) { var x; }', Context.OptionsDisableWebCompat],
    ['{ async function f() {} let f }', Context.OptionsDisableWebCompat],
    ['{ async function* f() {} var f }', Context.OptionsDisableWebCompat],
    ['{ async function* f() {} var f }', Context.OptionsDisableWebCompat],
    ['{ class f {} const f = 0 }', Context.OptionsDisableWebCompat],
    ['{ const f = 0; async function f() {} }', Context.OptionsDisableWebCompat],
    ['{ const f = 0; let f }', Context.OptionsDisableWebCompat],
    ['{ function f() {} async function* f() {} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} function f() {} }', Context.OptionsDisableWebCompat],
    ['{ { var f; } async function f() {}; }', Context.OptionsDisableWebCompat],
    ['{ { var f; } class f {}; }', Context.OptionsDisableWebCompat],
    ['{ let f; async function f() {} }', Context.OptionsDisableWebCompat],
    ['{ let a; class a {} }', Context.OptionsDisableWebCompat],
    ['{ let f; let f }', Context.OptionsDisableWebCompat],
    ['{ var f; async function* f() {} }', Context.OptionsDisableWebCompat],
    ['{ var f; const f = 0 }', Context.OptionsDisableWebCompat],
    ['{ var f; function* f() {} }', Context.OptionsDisableWebCompat],
    ['{ async function f() {}; var f; }', Context.OptionsDisableWebCompat],
    ['{ const f = 0; var f; }', Context.OptionsDisableWebCompat],
    ['{ function* f() {}; var f; }', Context.OptionsDisableWebCompat],
    ['{ function* f() {}; var f; }', Context.OptionsDisableWebCompat],
    ['{ let f; var f; }', Context.OptionsDisableWebCompat],
    ['{ let f; const f = 0 }', Context.OptionsDisableWebCompat],
    ['{ let f; async function* f() {} }', Context.OptionsDisableWebCompat],
    ['{ function* f() {}; { var f; } }', Context.OptionsDisableWebCompat],
    ['{ async function* f() {}; { var f; } }', Context.OptionsDisableWebCompat],
    ['{ async function f() {}; { var f; } }', Context.OptionsDisableWebCompat],
    ['{ { var f; } let f; }', Context.OptionsDisableWebCompat],
    ['{ { var f; } function* f() {}; }', Context.OptionsDisableWebCompat],
    ['{ { var f; } function f() {} }', Context.OptionsDisableWebCompat],
    ['{ { var f; } const f = 0; }', Context.OptionsDisableWebCompat],
    ['{ { var f; } async function* f() {}; } ', Context.OptionsDisableWebCompat],
    ['{ function* f() {} class f {} }', Context.OptionsDisableWebCompat],
    ['{ function* f() {} async function* f() {} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} function* f() {} }', Context.OptionsDisableWebCompat]
  ];

  fail('Statements - Block (fail)', inValids);

  pass('Statements - Block (pass)', [
    [
      '{}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: []
          }
        ]
      }
    ],
    [
      '{if (false) {} else ;}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'IfStatement',
                test: {
                  type: 'Literal',
                  value: false
                },
                consequent: {
                  type: 'BlockStatement',
                  body: []
                },
                alternate: {
                  type: 'EmptyStatement'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{for (;;) ;}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ForStatement',
                body: {
                  type: 'EmptyStatement'
                },
                init: null,
                test: null,
                update: null
              }
            ]
          }
        ]
      }
    ],
    [
      '{with ({}) {}}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'WithStatement',
                object: {
                  type: 'ObjectExpression',
                  properties: []
                },
                body: {
                  type: 'BlockStatement',
                  body: []
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ { var f; } var f }',
      Context.Empty,
      {
        body: [
          {
            body: [
              {
                body: [
                  {
                    declarations: [
                      {
                        id: {
                          name: 'f',
                          type: 'Identifier'
                        },
                        init: null,
                        type: 'VariableDeclarator'
                      }
                    ],
                    kind: 'var',
                    type: 'VariableDeclaration'
                  }
                ],
                type: 'BlockStatement'
              },
              {
                declarations: [
                  {
                    id: {
                      name: 'f',
                      type: 'Identifier'
                    },
                    init: null,
                    type: 'VariableDeclarator'
                  }
                ],
                kind: 'var',
                type: 'VariableDeclaration'
              }
            ],
            type: 'BlockStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{ a(); bt(); }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  arguments: []
                }
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'bt'
                  },
                  arguments: []
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ var {foo=3} = {}; };',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'ObjectExpression',
                      properties: []
                    },
                    id: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          kind: 'init',
                          key: {
                            type: 'Identifier',
                            name: 'foo'
                          },
                          computed: false,
                          value: {
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            right: {
                              type: 'Literal',
                              value: 3
                            }
                          },
                          method: false,
                          shorthand: true
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          },
          {
            type: 'EmptyStatement'
          }
        ]
      }
    ],
    [
      '{ var foo = 0; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'Literal',
                      value: 0
                    },
                    id: {
                      type: 'Identifier',
                      name: 'foo'
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
      '{ async function foo() {}; };',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              {
                type: 'EmptyStatement'
              }
            ]
          },
          {
            type: 'EmptyStatement'
          }
        ]
      }
    ],
    [
      '{\n  debugger;\n}',
      Context.Empty,
      {
        body: [
          {
            body: [
              {
                type: 'DebuggerStatement'
              }
            ],
            type: 'BlockStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{}\n/foo/',
      Context.Empty,
      {
        body: [
          {
            body: [],
            type: 'BlockStatement'
          },
          {
            expression: {
              regex: {
                flags: '',
                pattern: 'foo'
              },
              type: 'Literal',
              value: /foo/
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{ function a() {} ; function b() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
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
                  name: 'b'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ function f() {} ; function f() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
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
    ],
    [
      '{ if (x) function f() {} ; function f() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'IfStatement',
                test: {
                  type: 'Identifier',
                  name: 'x'
                },
                consequent: {
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
                },
                alternate: null
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
    ],
    [
      'function f() {} ; function f() {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
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
    ],
    [
      'function g(){ function f() {} ; function f() {} }',
      Context.Empty,
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
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      '{ var f = 123; if (true) function f(){} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'Literal',
                      value: 123
                    },
                    id: {
                      type: 'Identifier',
                      name: 'f'
                    }
                  }
                ]
              },
              {
                type: 'IfStatement',
                test: {
                  type: 'Literal',
                  value: true
                },
                consequent: {
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
                },
                alternate: null
              }
            ]
          }
        ]
      }
    ],
    [
      '{debugger;}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'DebuggerStatement'
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{\n  debugger;\n}',
      Context.Empty,
      {
        body: [
          {
            body: [
              {
                type: 'DebuggerStatement'
              }
            ],
            type: 'BlockStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{}\n/foo/',
      Context.Empty,
      {
        body: [
          {
            body: [],
            type: 'BlockStatement'
          },
          {
            expression: {
              regex: {
                flags: '',
                pattern: 'foo'
              },
              type: 'Literal',
              value: /foo/
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{}\n/foo/g',
      Context.Empty,
      {
        body: [
          {
            body: [],
            type: 'BlockStatement'
          },
          {
            expression: {
              regex: {
                flags: 'g',
                pattern: 'foo'
              },
              type: 'Literal',
              value: /foo/g
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
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

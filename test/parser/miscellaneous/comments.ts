import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Miscellaneous - Comments', () => {
  fail('Miscellaneous - Comments (fail)', [
    ['x --> is eol-comment\nvar y = 37;\n', Context.Empty],
    ['"\\n" --> is eol-comment\nvar y = 37;\n', Context.Empty],
    ['x/* precomment */ --> is eol-comment\nvar y = 37;\n', Context.Empty],
    ['var x = 42; --> is eol-comment\nvar y = 37;\n', Context.Empty],
    ['-->', Context.Module]
  ]);

  pass('Miscellaneous - Comments (pass)', [
    [
      'var x = 42;/*\n*/-->is eol-comment\nvar y = 37;\n',
      Context.OptionsWebCompat,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'x',
                  type: 'Identifier'
                },
                init: {
                  type: 'Literal',
                  value: 42
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          },
          {
            declarations: [
              {
                id: {
                  name: 'y',
                  type: 'Identifier'
                },
                init: {
                  type: 'Literal',
                  value: 37
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '\n/*precomment*/-->eol-comment\nvar y = 37;\n',
      Context.OptionsWebCompat,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'y',
                  type: 'Identifier'
                },
                init: {
                  type: 'Literal',
                  value: 37
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '\n-->is eol-comment\nvar y = 37;\n',
      Context.OptionsWebCompat,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'y',
                  type: 'Identifier'
                },
                init: {
                  type: 'Literal',
                  value: 37
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '-->',
      Context.OptionsWebCompat,
      {
        body: [],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '42 /* block comment 1 */ /* block comment 2 */',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 42
            }
          }
        ]
      }
    ],
    [
      `/* multiline
      comment
      should
      be
      ignored */ 42`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 42
            }
          }
        ]
      }
    ],
    [
      `/*a
      b*/ 42`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 42
            }
          }
        ]
      }
    ],
    [
      `// line comment
      42`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 42
            }
          }
        ]
      }
    ],
    [
      '//',
      Context.Empty,
      {
        body: [],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'if (x) { /* Some comment */ doThat() }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'x'
            },
            consequent: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'doThat'
                    },
                    arguments: []
                  }
                }
              ]
            },
            alternate: null
          }
        ]
      }
    ],
    [
      'function f() { /* infinite */ while (true) { } /* bar */ var each; }',
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
                  type: 'WhileStatement',
                  test: {
                    type: 'Literal',
                    value: true
                  },
                  body: {
                    type: 'BlockStatement',
                    body: []
                  }
                },
                {
                  type: 'VariableDeclaration',
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                        type: 'Identifier',
                        name: 'each'
                      }
                    }
                  ]
                }
              ]
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
      'while (i-->0) {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'BinaryExpression',
              left: {
                type: 'UpdateExpression',
                argument: {
                  type: 'Identifier',
                  name: 'i'
                },
                operator: '--',
                prefix: false
              },
              right: {
                type: 'Literal',
                value: 0
              },
              operator: '>'
            },
            body: {
              type: 'BlockStatement',
              body: []
            }
          }
        ]
      }
    ],
    [
      'function x(){ /*Jupiter*/ return; /*Saturn*/}',
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
                  type: 'ReturnStatement',
                  argument: null
                }
              ]
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'x'
            }
          }
        ]
      }
    ],
    [
      '/**/ function a() {}',
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
              name: 'a'
            }
          }
        ]
      }
    ],
    [
      `while (true) {
        /**
         * comments in empty block
         */
      }`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true
            },
            body: {
              type: 'BlockStatement',
              body: []
            }
          }
        ]
      }
    ]
  ]);
});

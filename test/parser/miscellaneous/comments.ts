import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Comments', () => {
  pass('Expressions - Comments (pass)', [
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

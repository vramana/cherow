import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Return', () => {
  const inValids: Array<[string, Context]> = [
    ['return;', Context.Empty],
    ['{ return; }', Context.Empty],
    ['returif (false) { return; };', Context.Empty],
    ['do { return; } while(0);', Context.Empty]
  ];

  fail('Statements - Return (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'return;',
      Context.OptionsGlobalReturn,
      {
        body: [
          {
            argument: null,
            type: 'ReturnStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'x => {return}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ReturnStatement',
                    argument: null
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '(a, b) => {return}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ReturnStatement',
                    argument: null
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      'function *f() { return }',
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      '(function(){ return })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
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
              id: null
            }
          }
        ]
      }
    ],
    [
      '({foo(){ return }})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
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
                    id: null
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function f(){   return;return    };',
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
                },
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
              name: 'f'
            }
          },
          {
            type: 'EmptyStatement'
          }
        ]
      }
    ],
    [
      'function f(){   return\nreturn   }',
      Context.Empty,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  argument: null,
                  type: 'ReturnStatement'
                },
                {
                  argument: null,
                  type: 'ReturnStatement'
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
      'function f(){   return 15;    }',
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
                  argument: {
                    type: 'Literal',
                    value: 15
                  }
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
      'function f(){   {return \n foo}    }',
      Context.Empty,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  body: [
                    {
                      argument: null,
                      type: 'ReturnStatement'
                    },
                    {
                      expression: {
                        name: 'foo',
                        type: 'Identifier'
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  type: 'BlockStatement'
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
      'if (foo) bar;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'foo'
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'bar'
              }
            },
            alternate: null
          }
        ]
      }
    ],
    [
      'if (foo) bar; else doo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'foo'
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'bar'
              }
            },
            alternate: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'doo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
    //['if (foo) a; if (bar) b; else c;', Context.OptionDisablesWebCompat, {}]
  ];

  pass('Statements - Block (pass)', valids);
});

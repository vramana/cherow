import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - ASI', () => {
  for (const arg of [
    '{ 1 2 } 3',
    '{} * 1',
    '({};) * 1',
    'if (false) x = 1 else x = -1',
    `var x = 0;
        if (false) {x = 1};
        else x = -1`,
    `var a=1,b=2,c=3,d;
        if(a>b)
        else c=d`,
    `{} * 1`,
    `for(
          ;) {
            break;
          }`,
    `for(
            false
        ) {
          break;
        }`,
    `for(
            false
            false
            false
        ) {
          break;
        }`,
    `do
          while (false)`,
    `do {};
          while (false)`,
    `
          var x=0, y=0;
          var z=
          x
          ++
          ++
          y`,
    `var x = 0;
          if (false) x = 1 else x = -1`,
    `var x=0, y=0;
        var z=
        x
        ++
        ++
        y`,
    `for(
          false
      ) {
        break;
      }`,
    `for(
        ;false) {
          break;
        }`,
    `for(false;false;;false) { break; }`,
    `\n while(false)`,
    `do {}; \n while(false)`,
    `for(false
          false
      ) {
        break;
      }`,
    `var a=1,b=2,c=3,d;
        if(a>b)
        else c=d`,
    '{} * 1',
    'if (false) x = 1 else x = -1',
    `try {
          throw
          1;
        } catch(e) {
        }`,
    '{1 2} 3',
    `var x = 0;
        x
        ++;`,
    `var x = 1;
        x
        --;`,
    `for(;
          ) {
            break;
          }`,
    `for(
            false
        ;) {
          break;
        }`,
    `for(
          ;
      ) {
        break;
      }`,
    `for(
        ) {
          break;
        }`,
    `for(
          false
      ) {
        break;
      }`,
    `do {};
        while (false)`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  pass('Miscellaneous - ASI', [
    // Acorn issue: https://github.com/acornjs/acorn/issues/775
    [
      `;;1;;1;;1`,
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            expression: {
              raw: '1',
              type: 'Literal',
              value: 1
            },
            type: 'ExpressionStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            expression: {
              raw: '1',
              type: 'Literal',
              value: 1
            },
            type: 'ExpressionStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            expression: {
              raw: '1',
              type: 'Literal',
              value: 1
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '"foo"\nx',
      Context.OptionsDirectives | Context.OptionsRaw,

      {
        body: [
          {
            directive: 'foo',
            expression: {
              type: 'Literal',
              raw: '"foo"',
              value: 'foo'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              raw: 'x',
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
      '"ignore me" + x',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            directive: 'ignore me',
            expression: {
              left: {
                type: 'Literal',
                value: 'ignore me',
                raw: '"ignore me"'
              },
              operator: '+',
              right: {
                raw: 'x',
                name: 'x',
                type: 'Identifier'
              },
              type: 'BinaryExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `function f(){\n'foo';\n}`,
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  directive: 'foo',
                  expression: {
                    type: 'Literal',
                    raw: "'foo'",
                    value: 'foo'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              type: 'BlockStatement'
            },
            generator: false,
            id: {
              name: 'f',
              raw: 'f',
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
      'function f(){\n"foo"\n}',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  directive: 'foo',
                  expression: {
                    type: 'Literal',
                    raw: '"foo"',
                    value: 'foo'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              type: 'BlockStatement'
            },
            generator: false,
            id: {
              name: 'f',
              raw: 'f',
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
      '"ignore me"\n++x',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            directive: 'ignore me',
            expression: {
              type: 'Literal',
              raw: '"ignore me"',
              value: 'ignore me'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              argument: {
                raw: 'x',
                name: 'x',
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
      '("use strict"); foo = 42;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"use strict"',
              value: 'use strict'
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'foo',
                raw: 'foo'
              },
              operator: '=',
              right: {
                type: 'Literal',
                raw: '42',
                value: 42
              }
            }
          }
        ]
      }
    ],
    [
      '("use strict"); eval = 42;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"use strict"',
              value: 'use strict'
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                raw: 'eval',
                name: 'eval'
              },
              operator: '=',
              right: {
                type: 'Literal',
                raw: '42',
                value: 42
              }
            }
          }
        ]
      }
    ],
    [
      '"USE STRICT";  var public = 1;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"USE STRICT"',
              value: 'USE STRICT'
            },
            directive: 'USE STRICT'
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  raw: '1',
                  value: 1
                },
                id: {
                  type: 'Identifier',
                  name: 'public'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '() => { "use strict"; }',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            expression: {
              async: false,
              body: {
                body: [
                  {
                    directive: 'use strict',
                    expression: {
                      type: 'Literal',
                      raw: '"use strict"',
                      value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                  }
                ],
                type: 'BlockStatement'
              },
              expression: false,
              id: null,
              params: [],
              type: 'ArrowFunctionExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'function wrap() { "use asm"; "use strict"; foo }',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                    value: 'use asm',
                    raw: '"use asm"'
                  },
                  directive: 'use asm'
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    raw: '"use strict"',
                    value: 'use strict'
                  },
                  directive: 'use strict'
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    raw: 'foo',
                    name: 'foo'
                  }
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              raw: 'wrap',
              name: 'wrap'
            }
          }
        ]
      }
    ],
    [
      '{ "use strict"; }',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                  type: 'Literal',
                  raw: '"use strict"',
                  value: 'use strict'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'function a() { "use strict" } "use strict"; foo;',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                    raw: '"use strict"',
                    value: 'use strict'
                  },
                  directive: 'use strict'
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              raw: 'a',
              name: 'a'
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"use strict"',
              value: 'use strict'
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              raw: 'foo',
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'function f(){ "Esprima uses directives"; "use strict";}',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                    raw: '"Esprima uses directives"',
                    value: 'Esprima uses directives'
                  },
                  directive: 'Esprima uses directives'
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    raw: '"use strict"',
                    value: 'use strict'
                  },
                  directive: 'use strict'
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              raw: 'f',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(){ 123; "use strict";}',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                    value: 123,
                    raw: '123'
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    raw: '"use strict"',
                    value: 'use strict'
                  }
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              raw: 'f',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(){"use strict";}',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                    raw: '"use strict"',
                    value: 'use strict'
                  },
                  directive: 'use strict'
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              raw: 'f',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      '+function f(){"use strict";}',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '+',
              argument: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'Literal',
                        raw: '"use strict"',
                        value: 'use strict'
                      },
                      directive: 'use strict'
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
                  raw: 'f'
                }
              },
              prefix: true
            }
          }
        ]
      }
    ],
    [
      '({x:function(){"use strict";}})',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                    name: 'x',
                    raw: 'x'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'Literal',
                            raw: '"use strict"',
                            value: 'use strict'
                          },
                          directive: 'use strict'
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function f(x){"use strict";}',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'Identifier',
                name: 'x'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: 'use strict',
                    raw: '"use strict"'
                  },
                  directive: 'use strict'
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'f',
              raw: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(x, y){"use strict";}',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    raw: '"use strict"',
                    value: 'use strict'
                  },

                  directive: 'use strict'
                }
              ]
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'f',
              raw: 'f'
            }
          }
        ]
      }
    ],
    [
      '({x:function(x, y){"use strict";}})',
      Context.OptionsDirectives | Context.OptionsRaw,
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
                    name: 'x',
                    raw: 'x'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      },
                      {
                        type: 'Identifier',
                        name: 'y'
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'Literal',
                            value: 'use strict',
                            raw: '"use strict"'
                          },
                          directive: 'use strict'
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false
                }
              ]
            }
          }
        ]
      }
    ]
  ]);
});

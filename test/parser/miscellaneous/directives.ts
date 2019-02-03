import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Miscellaneous - Directives', () => {
  const InvalidSyntax = [
    '"\\1;" "use strict";',
    '"use strict"; function f(){"\\1";}',
    '"\\1;" "use strict"; null',
    '"use strict"; with (a) b = c;',
    '"use strict"; "\\1;"',
    '"use strict"; "\\1;" null',
    '"random\\x0\nnewline"',
    '"random\\u\nnewline"',
    '"random\\u0\nnewline"',
    '"random\\ua\u2029newline"',
    '"random\\ua\rnewline"',
    '"random\\u0a\nnewline"',
    '"random\\u000\nnewline"',
    '"random\\u00a\nnewline"',
    '"random\\u{0\nnewline"',
    '"random\\u{a\nnewline"',
    "'random\\x foo'",
    '"random\\u{a\rnewline"',
    "'random\\u foo'",
    "'random\\u0 foo'",
    "'random\\u00 foo'",
    "'random\\u0a foo'",
    "'random\\x0\\ foo'",
    "'random\\ua\\ foo'",
    "'random\\x0\\ foo'",
    "'random\\u0a\\ foo'",
    "'random\\xx foo'",
    "'random\\u00a\\ foo'",
    "'random\\uax foo'",
    "'random\\u0au foo'",
    'function foo() { "use strict"; with (a) b = c; }',
    '"use strict"; function foo() { with (a) b = c; }',
    '"use strict"; function hello() { "\\000"; }',
    '"use strict"; function hello() { "\\00"; }',
    '"use strict"; function hello() { "\\0123"; }',
    'function hello() { "use strict"; "\\000"; }',
    'function hello() { "use strict"; "\\00"; }',
    'function hello() { "use strict"; "\\0123"; }'
  ];

  for (const arg of InvalidSyntax) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`/* comment in front */ ${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`function foo() { ${arg} }`, undefined, Context.Empty);
      });
    });
  }

  fail('Miscellaneous - Directives', [
    ['; with (x) y;`;', Context.Strict | Context.Module],
    ['"use strict"; with (x) y;', Context.Empty],
    ['class X { foo() { with (x) y; } }', Context.Empty],
    ['"use strict"; with (x) y;', Context.Empty],
    ['"use strict";\nwith (x) y;', Context.Empty],
    ['"use strict"\n;with (x) y;', Context.Empty],
    ['"use strict"\nwith (x) y;', Context.Empty],
    ['"use strict"; "use strict"; with (x) y;', Context.Empty],
    ['"use strict"; \'use strict\'; with (x) y;', Context.Empty],
    ['"not a directive"; "use strict"; with (x) y;', Context.Empty],
    ['// one comment\n/* two \n comment */ "use strict"; with (x) y;', Context.Empty],
    ['function f(){ "use strict"; with (x) y; }', Context.Empty],
    ['function f(){ "use strict";\nwith (x) y; }', Context.Empty],
    ['function f(){ "use strict"\n;with (x) y; }', Context.Empty],
    ['function f(){ "use strict"\nwith (x) y; }', Context.Empty],
    ['() => { "use strict"; with (x) y; }', Context.Empty],
    ['() => { "use strict"\n;with (x) y; }', Context.Empty]
  ]);

  const validSyntax = [
    '("use strict")',
    '"\\n\\r\\t\\v\\b\\f\\\\\\\'\\"\\0"',
    '"use some future directive"',
    '"use some future directive";',
    '"use some future directive"; "use strict";',
    '"use strict"',
    "'use\\x20strict'",
    '"use\\x20strict"',
    "'use asm'",
    // Parenthesized directive prologue shouldn't be recognized.
    '("use strict"); var eval;',
    'function wrap() { "use asm"; foo; "use strict" }',
    '{ "use strict"; }',
    'function wrap() { { "use strict" } foo }',
    '("use strict"); foo',
    'function wrap() { ("use strict"); foo }',
    "'use asm' \u2029 'use strict'",
    '"use asm" \u2029 "use strict"',
    'function foo() { "use \\u0020strict"; with (a) b = c; }',
    '"use \\u0020strict"; function foo() { with (a) b = c; }',
    '"use strict"\n foo',
    "'use strict'; foo",
    'function foo() { "use strict"\n bar }',
    '!function foo() { "use strict"\n bar }',
    '() => { "use strict"\n foo }',
    '() => "use strict"',
    '({ wrap() { "use strict"; foo } })',
    '"use strict"',
    "'use\\x20strict'",
    '"use\\x20strict"',
    "'use asm'",
    "'use asm'; 'use strict'",
    "'use asm' \n 'use strict'",
    '"use asm" \n "use strict"',
    "'use asm' \r 'use strict'",
    '"use asm" \r "use strict"',
    "'use asm' \r\n 'use strict'",
    '"use asm" \r\n "use strict"',
    "'use asm' \u2028 'use strict'",
    '"use asm" \u2028 "use strict"'
  ];

  for (const arg of validSyntax) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo() { ${arg} }`, undefined, Context.Empty);
      });
    });
  }

  pass('Miscellaneous - Directives', [
    // Acorn issue: https://github.com/acornjs/acorn/issues/775
    [
      `function foo() {
        ; 'use strict';
        with (a) {}
      }`,
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  type: 'EmptyStatement'
                },
                {
                  expression: {
                    type: 'Literal',
                    raw: "'use strict'",
                    value: 'use strict'
                  },
                  type: 'ExpressionStatement'
                },
                {
                  body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  object: {
                    name: 'a',
                    raw: 'a',
                    type: 'Identifier'
                  },
                  type: 'WithStatement'
                }
              ],
              type: 'BlockStatement'
            },
            generator: false,
            id: {
              name: 'foo',
              raw: 'foo',
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
      '"use\\x20strict"; with (a) b = c;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            directive: 'use\\x20strict',
            expression: {
              raw: '"use\\x20strict"',
              type: 'Literal',
              value: 'use strict'
            },
            type: 'ExpressionStatement'
          },
          {
            body: {
              expression: {
                left: {
                  name: 'b',
                  raw: 'b',
                  type: 'Identifier'
                },
                operator: '=',
                right: {
                  name: 'c',
                  raw: 'c',
                  type: 'Identifier'
                },
                type: 'AssignmentExpression'
              },
              type: 'ExpressionStatement'
            },
            object: {
              name: 'a',
              raw: 'a',
              type: 'Identifier'
            },
            type: 'WithStatement'
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

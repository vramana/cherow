import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Unary', () => {});

fail('Expressions - Unary (fail)', [
  ['delete async; () => x;', Context.Strict],
  // ['delete async \n (a) => x', Context.Strict],
  ['delete async; () => x;', Context.Strict],
  ['delete async; () => x;', Context.Strict],
  ['"use strict"; delete foo;', Context.Strict],
  ['"use strict"; delete foo + 1;', Context.Strict],
  ['"use strict"; delete eval;', Context.Strict],
  ['"use strict"; delete (foo);', Context.Strict],
  ['"use strict"; delete interface;', Context.Strict],
  ['delete a.b\n/foo/', Context.Empty],
  ['typeof function f(){}\n/foo/', Context.Empty],
  ['typeof async function f(){}\n/foo/', Context.Empty],

  // ['typeof async () => x', Context.Empty],
  // ['typeof async \n () => x', Context.Empty],
  // ['let x = typeof async \n (x) => x', Context.Empty],
  // ['let x = typeof async (x) \n => x', Context.Empty],
  // ['delete async \n () => x', Context.Empty],
  // ['delete async () \n => x', Context.Empty],
  ['let x = delete async \n (x) => x', Context.Empty]
  // ['let x = delete async (x) \n => x', Context.Empty]
]);

pass('Expressions - Unary (pass)', [
  [
    'let x = () => ++a;',
    Context.Empty,
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
                async: false,
                body: {
                  argument: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  operator: '++',
                  prefix: true,
                  type: 'UpdateExpression'
                },
                expression: true,
                id: null,
                params: [],
                type: 'ArrowFunctionExpression'
              },
              type: 'VariableDeclarator'
            }
          ],
          kind: 'let',
          type: 'VariableDeclaration'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    'if (a) ++a;',
    Context.OptionsRanges,
    {
      type: 'Program',
      start: 0,
      end: 11,
      body: [
        {
          type: 'IfStatement',
          start: 0,
          end: 11,
          test: {
            type: 'Identifier',
            start: 4,
            end: 5,
            name: 'a'
          },
          consequent: {
            type: 'ExpressionStatement',
            start: 7,
            end: 11,
            expression: {
              type: 'UpdateExpression',
              start: 7,
              end: 10,
              operator: '++',
              prefix: true,
              argument: {
                type: 'Identifier',
                start: 9,
                end: 10,
                name: 'a'
              }
            }
          },
          alternate: null
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'function f(){ return ++\na; }',
    Context.Empty,
    {
      body: [
        {
          async: false,
          body: {
            body: [
              {
                argument: {
                  argument: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  operator: '++',
                  prefix: true,
                  type: 'UpdateExpression'
                },
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
    'let x = () => ++\na;',
    Context.Empty,
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
                async: false,
                body: {
                  argument: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  operator: '++',
                  prefix: true,
                  type: 'UpdateExpression'
                },
                expression: true,
                id: null,
                params: [],
                type: 'ArrowFunctionExpression'
              },
              type: 'VariableDeclarator'
            }
          ],
          kind: 'let',
          type: 'VariableDeclaration'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],

  [
    '--\na',
    Context.Empty,
    {
      body: [
        {
          expression: {
            argument: {
              name: 'a',
              type: 'Identifier'
            },
            operator: '--',
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
    'if (++a);',
    Context.Empty,
    {
      body: [
        {
          alternate: null,
          consequent: {
            type: 'EmptyStatement'
          },
          test: {
            argument: {
              name: 'a',
              type: 'Identifier'
            },
            operator: '++',
            prefix: true,
            type: 'UpdateExpression'
          },
          type: 'IfStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    'function f(){ return ++a; }',
    Context.Empty,
    {
      body: [
        {
          async: false,
          body: {
            body: [
              {
                argument: {
                  argument: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  operator: '++',
                  prefix: true,
                  type: 'UpdateExpression'
                },
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
    '"use strict"; delete this;',
    Context.OptionsDirectives | Context.OptionsRaw | Context.OptionsRanges,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            raw: '"use strict"',
            value: 'use strict',
            start: 0,
            end: 12
          },
          directive: 'use strict',
          start: 0,
          end: 13
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'ThisExpression',
              start: 21,
              end: 25
            },
            prefix: true,
            start: 14,
            end: 25
          },
          start: 14,
          end: 26
        }
      ],
      start: 0,
      end: 26
    }
  ],
  [
    'typeof function f(){}\n/foo/g',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              left: {
                argument: {
                  async: false,
                  body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  generator: false,
                  id: {
                    name: 'f',
                    type: 'Identifier'
                  },
                  params: [],
                  type: 'FunctionExpression'
                },
                operator: 'typeof',
                prefix: true,
                type: 'UnaryExpression'
              },
              operator: '/',
              right: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'BinaryExpression'
            },
            operator: '/',
            right: {
              name: 'g',
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
    'delete a.b\n/foo/g',
    Context.Empty,
    {
      body: [
        {
          expression: {
            left: {
              left: {
                argument: {
                  computed: false,
                  object: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  property: {
                    name: 'b',
                    type: 'Identifier'
                  },
                  type: 'MemberExpression'
                },
                operator: 'delete',
                prefix: true,
                type: 'UnaryExpression'
              },
              operator: '/',
              right: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'BinaryExpression'
            },
            operator: '/',
            right: {
              name: 'g',
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
    '"use strict"; delete 1;',
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
          },
          directive: 'use strict'
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'Literal',
              raw: '1',
              value: 1
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete 1 + 2;',
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
          },
          directive: 'use strict'
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'Literal',
                raw: '1',
                value: 1
              },
              prefix: true
            },
            right: {
              type: 'Literal',
              raw: '2',
              value: 2
            },
            operator: '+'
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete foo();',
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
          },
          directive: 'use strict'
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                raw: 'foo',
                name: 'foo'
              },
              arguments: []
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete foo.bar;',
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
          },
          directive: 'use strict'
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                raw: 'foo',
                name: 'foo'
              },
              computed: false,
              property: {
                type: 'Identifier',
                raw: 'bar',
                name: 'bar'
              }
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete --foo;',
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
          },
          directive: 'use strict'
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                raw: 'foo',
                name: 'foo'
              },
              operator: '--',
              prefix: true
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete new foo();',
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
          },
          directive: 'use strict'
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                raw: 'foo',
                name: 'foo'
              },
              arguments: []
            },
            prefix: true
          }
        }
      ]
    }
  ],
  [
    '"use strict"; delete new foo(bar);',
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
          },
          directive: 'use strict'
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                raw: 'foo',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'Identifier',
                  raw: 'bar',
                  name: 'bar'
                }
              ]
            },
            prefix: true
          }
        }
      ]
    }
  ],

  [
    'delete obj.$$hashKey;',
    Context.Empty,
    {
      body: [
        {
          expression: {
            argument: {
              computed: false,
              object: {
                name: 'obj',
                type: 'Identifier'
              },
              property: {
                name: '$$hashKey',
                type: 'Identifier'
              },
              type: 'MemberExpression'
            },
            operator: 'delete',
            prefix: true,
            type: 'UnaryExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    'delete async',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'Identifier',
              name: 'async'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'delete x.y',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'x'
              },
              property: {
                type: 'Identifier',
                name: 'y'
              }
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'typeof async',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'typeof',
            argument: {
              type: 'Identifier',
              name: 'async'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ]
]);

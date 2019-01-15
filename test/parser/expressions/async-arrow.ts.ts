import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Async arrow', () => {
  const invalidSyntax = [
    "var asyncFn = async await => await + 'test';",
    `async ()
  => 0`,
    `async a
  => await a`,
    'async (,) => b;',
    'async 1 => b;',
    'async 1 => ;',
    'async => ;',
    'async (x) => {}  ? a : b',
    'async (x) => {}a',
    'async(foo = super()) => {}',
    'async (foo = super.foo) => { }',
    'async (x) => {} 1',
    'async (x) => {} a()',
    'async (x) => {} + 2',
    'async (()) => 0',
    'async(,)',
    '"use strict"; async (foo, bar eval) => {};',
    'async() => { await: ; };',
    `async
  (foo) => { }`,
    `async
  (a) => await a`
  ];

  for (const arg of invalidSyntax) {
    it(`${arg};`, () => {
      t.throws(() => {
        parseSource(`${arg};`, undefined, Context.Empty);
      });
    });

    it(`(${arg};)`, () => {
      t.throws(() => {
        parseSource(`(${arg});`, undefined, Context.Empty);
      });
    });
  }

  const inValids: Array<[string, Context]> = [
    ['async cherow => { let cherow;}', Context.Empty],
    ['async cherow => { const cherow; }', Context.Empty],
    ['async cherow => let cherow;', Context.Empty],
    ['async (foo) => { const a; }', Context.Empty], // Missing initializer in const declaration
    ['cherow => { let cherow;}', Context.Empty],
    ['cherow => { const cherow; }', Context.Empty],
    ['cherow => let cherow;', Context.Empty],

    ['f(async\n()=>c)', Context.Empty],
    // ['async x \n => x', Context.Empty],
    ['async \n (x, y) => x', Context.Empty],
    ['async (x, y) \n => x', Context.Empty],
    ['async \n (x, y) \n => x', Context.Empty],
    ['async \n (x) \n => x', Context.Empty],
    ['async (x) \n => x', Context.Empty],
    ['async \n (x) => x', Context.Empty],
    ['async \n () => x', Context.Empty],
    ['function f(){   return async \n () => x    }', Context.Empty],
    ['break async \n () => x', Context.Empty],
    ['continue async \n () => x', Context.Empty],
    ['let x = {[async () => x, y]: z}', Context.Empty],
    ['const x = async () => x, y', Context.Empty],
    ['const x = async \n () => x, y', Context.Empty],
    // ['export async () => x', Context.Module],
    ['(async \n () => x)', Context.Empty],
    ['[async \n () => x]', Context.Empty],

    ['x={x: async \n () => x}', Context.Empty],
    ['x[async \n () => x]', Context.Empty],
    ['`${async \n () => x}`', Context.Empty],
    ['if (async \n () => x) x', Context.Empty],
    ['for (async \n () => x;;) x', Context.Empty],

    ['for (;async \n () => x;) x', Context.Empty],
    ['for (;;async \n () => x) x', Context.Empty],
    ['for (x of async \n () => x) x', Context.Empty],
    ['if (x) async \n () => x else y', Context.Empty],
    ['class x extends async \n () => x {}', Context.Empty],
    ['with (async \n () => x) {}', Context.Empty],
    //['({\nasync foo() {}})', Context.Empty],
    //['({async \n foo() {}})', Context.Empty],
    ['[async \n () => x]', Context.Empty],
    ['[async \n () => x]', Context.Empty],
    ['[async \n () => x]', Context.Empty],
    ['[async \n () => x]', Context.Empty],

    ['async \n () => x;', Context.Empty],
    // ['foo + async \n () => x;', Context.Empty],
    ['return async \n () => x;', Context.Empty],
    ['break async \n () => x;', Context.Empty],
    ['var x = async \n () => x, y;', Context.Empty],
    ['let x = async \n () => x, y;', Context.Empty],
    ['const x = async \n () => x, y;', Context.Empty],
    ['export async \n () => x;', Context.Empty],
    ['(async \n () => x);', Context.Empty],
    ['[async \n () => x];', Context.Empty],
    ['{x: async \n () => x};', Context.Empty],
    ['x[async \n () => x];', Context.Empty],
    ['x(async \n () => x);', Context.Empty],
    ['function f(x = async \n () => x){};', Context.Empty],
    ['`${async \n () => x}`;', Context.Empty],
    ['do async \n () => x while (x);;', Context.Empty],
    ['if (async \n () => x) x;', Context.Empty],
    ['try {} catch(e = async \n () => x) {}', Context.Empty],
    ['if (x) async \n () => x else y;', Context.Empty],
    ['class x extends async \n () => x {};', Context.Empty]
  ];

  fail('Expressions - Async arrow', inValids);

  const validSyntax = [
    'async () => {}',
    'async () => { return 42 }',
    'async x => { return x; }',
    'async (x) => { return x; }',
    'async (x, y) => { return x + y; }',
    'async (x, y, z) => { return x + y + z; }',
    'async (x) => { return x; }',
    'async (x, y) => { return x + y; }',
    'async (x, y, z) => { return x + y + z; }',
    'async (x, y) => { x.a = y; }',
    '(a, async promise => await promise)',
    'async(a = (await) => {}) => {};',
    'async () => 42',
    'async(yield) => b',
    'async(foo, yield) => b',
    'async (yield) => {  };',
    'async (foo, bar, yield) => {  };',
    'f(a, async(x, y) => await [x, y], b)',
    'const foo = ({ async = true }) => {};',
    'const foo = async ({ async: bar }) => { await baz; };',
    `async ({}) => 0`,
    'async(a,)',
    'async()()',
    'async (a,) => b;',
    '[async(x,y) => z]',
    '[async x => z]',
    'id = async x => x, square = async (y) => { y * y }',
    'f(a, async b => await b)',
    'async (x, y) => { x * y }',
    'async (x, y) => y',
    'async a => { await a }',
    'async (y) => y',
    'async (x, ...y) => x',
    'async (x,y,) => x',
    'async ({a = b}) => a',
    'async a => a',
    'async function foo(a = async () => await b) {}',
    '({async: 1})',
    'async yield => 1',
    'f(a, async (b, c) => await [b, c], d)',
    'f(a, async (b, c) => await [b, c], d)',
    'async()',
    'async(a, b)',
    'async(...a, ...b)',
    '({ ...async () => { }})',
    '(async x => y)',
    '(async (x, z) => y)',
    '({x: async (y,w) => z})',
    'async({x = yield}) => 1; ',
    'async (icefapper = bad) => {  }',
    'async ({a: b = c})',
    'async ({a = b}) => a',
    'async (a, b) => a',
    'async () => a',
    'var asyncFn = async({ foo = 1 }) => foo;',
    'var asyncFn = async({ foo = 1 } = {}) => foo;'
  ];

  for (const arg of validSyntax) {
    it(`${arg};`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg};`, undefined, Context.Empty);
      });
    });
  }

  pass('Expressions - Async arrow (pass)', [
    [
      `async a => b => c;`,
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
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'Identifier',
                  name: 'c'
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'b'
                  }
                ],
                id: null,
                async: false,
                expression: true
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `f(async ()=>c)`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  params: [],
                  id: null,
                  async: true,
                  expression: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `f(async foo=>c)`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ],
                  id: null,
                  async: true,
                  expression: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `f(async function(){})`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: true,
                  generator: false,
                  id: null
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `f(async ())`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  arguments: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `f(async => x)`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'f'
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'async'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '`a ${async ()=>{}} b`',
      Context.Empty,
      {
        body: [
          {
            expression: {
              expressions: [
                {
                  async: true,
                  body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  expression: false,
                  id: null,
                  params: [],
                  type: 'ArrowFunctionExpression'
                }
              ],
              quasis: [
                {
                  tail: false,
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  }
                },
                {
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  }
                }
              ],
              type: 'TemplateLiteral'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '`a ${async ()=>x} b`',
      Context.Empty,
      {
        body: [
          {
            expression: {
              expressions: [
                {
                  async: true,
                  body: {
                    name: 'x',
                    type: 'Identifier'
                  },
                  expression: true,
                  id: null,
                  params: [],
                  type: 'ArrowFunctionExpression'
                }
              ],
              quasis: [
                {
                  tail: false,
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  }
                },
                {
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  }
                }
              ],
              type: 'TemplateLiteral'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async: foo',
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'ExpressionStatement'
            },
            label: {
              name: 'async',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `async\n: foo`,
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'ExpressionStatement'
            },
            label: {
              name: 'async',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `async\n();`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [],
              callee: {
                name: 'async',
                type: 'Identifier'
              },
              type: 'CallExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `async foo => bar;`,
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
                type: 'Identifier',
                name: 'bar'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'foo'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `async () => bar;`,
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
                type: 'Identifier',
                name: 'bar'
              },
              params: [],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `async (foo) => bar;`,
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
                type: 'Identifier',
                name: 'bar'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'foo'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `let f = async\ng => g`,
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'f',
                  type: 'Identifier'
                },
                init: {
                  name: 'async',
                  type: 'Identifier'
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'let',
            type: 'VariableDeclaration'
          },
          {
            expression: {
              async: false,
              body: {
                name: 'g',
                type: 'Identifier'
              },
              expression: true,
              id: null,
              params: [
                {
                  name: 'g',
                  type: 'Identifier'
                }
              ],
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
      `foo(async () => foo)`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [
                {
                  async: true,
                  body: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  expression: true,
                  id: null,
                  params: [],
                  type: 'ArrowFunctionExpression'
                }
              ],
              callee: {
                name: 'foo',
                type: 'Identifier'
              },
              type: 'CallExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `export default async (x) => y`,
      Context.Module,
      {
        body: [
          {
            declaration: {
              async: true,
              body: {
                name: 'y',
                type: 'Identifier'
              },
              expression: true,
              id: null,
              params: [
                {
                  name: 'x',
                  type: 'Identifier'
                }
              ],
              type: 'ArrowFunctionExpression'
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `async (a, ...b) => a;`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              async: true,
              body: {
                name: 'a',
                type: 'Identifier'
              },
              expression: true,
              id: null,
              params: [
                {
                  name: 'a',
                  type: 'Identifier'
                },
                {
                  argument: {
                    name: 'b',
                    type: 'Identifier'
                  },
                  type: 'RestElement'
                }
              ],
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
      `async(...x/y);`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [
                {
                  argument: {
                    left: {
                      name: 'x',
                      type: 'Identifier'
                    },
                    operator: '/',
                    right: {
                      name: 'y',
                      type: 'Identifier'
                    },
                    type: 'BinaryExpression'
                  },
                  type: 'SpreadElement'
                }
              ],
              callee: {
                name: 'async',
                type: 'Identifier'
              },
              type: 'CallExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],

    [
      `async x => x`,
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
                type: 'Identifier',
                name: 'x'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `async \n x => x`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              name: 'async',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          },
          {
            expression: {
              async: false,
              body: {
                name: 'x',
                type: 'Identifier'
              },
              expression: true,
              id: null,
              params: [
                {
                  name: 'x',
                  type: 'Identifier'
                }
              ],
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
      `async (x) => x`,
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
                type: 'Identifier',
                name: 'x'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `async (x, y) => x`,
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
                type: 'Identifier',
                name: 'x'
              },
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
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `var x = async () => x, y`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [],
                  id: null,
                  async: true,
                  expression: true
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `let x = async () => x, y`,
      Context.Empty,
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
                init: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [],
                  id: null,
                  async: true,
                  expression: true
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ]
          }
        ]
      }
    ],
    //   [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],
    // [`f(async ()=>c)`, Context.Empty, {}],

    [
      `a => {}
    a => {}
    async () => {}
    a => {}
    a => {}
    a => {}
    a => {}
    async a => {}
    async a => {}
    async a => {}
    async a => {}`,
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
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,
              expression: false
            }
          }
        ]
      }
    ],
    [
      `() => {}
    async => {}
    async => {}
    a => a
    async a => {}`,
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
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'a'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: true
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          }
        ]
      }
    ],
    [
      `async () => {}
    () => {}
     async () => {}
    async () => {}
    () => {}
       () => {}
    a((a))
 async () => {}
 async () => {}
  async () => {}
  async () => {}
   `,
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
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'a'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ]
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          }
        ]
      }
    ],
    [
      `async () => {}
    () => {}
    async () => {}
    async () => {}
    () => {}
    () => {}
    async () => {}
    async () => {}
    async () => {}
    async a => {}
    () => {}
    () => {}
    async()
    async a => {}`,
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
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: []
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          }
        ]
      }
    ],
    [
      `async () => {}
    () => {}
    async b => {}
    async b => {}
    async () => {}
    async () => {}
    () => {}
    a => {}
    a => {}
    async () => {}
    () => {}
    a => {}
    async () => {}
    () => {}
    async () => {}
    a => {}
    async () => {}
    async () => {}
    () => {}`,
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
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          }
        ]
      }
    ],
    [
      `a => a => a => async a => a
    async a => a
    a => a => a => async a => a
    async () => {}
    async a => a`,
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
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'a'
                      }
                    ],
                    id: null,
                    async: true,

                    expression: true
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  id: null,
                  async: false,

                  expression: true
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  }
                ],
                id: null,
                async: false,

                expression: true
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: true
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'a'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,

              expression: true
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'a'
                      }
                    ],
                    id: null,
                    async: true,

                    expression: true
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    }
                  ],
                  id: null,
                  async: false,

                  expression: true
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  }
                ],
                id: null,
                async: false,

                expression: true
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: true
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'a'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: true,

              expression: true
            }
          }
        ]
      }
    ],
    [
      `() => {}
    () => {}
    () => {}
    () => {}
    () => {}
    () => {}
    () => {}
    async b => {}
    async b => {}
    async b => {}
    async () => {}
    async () => {}
    async () => {}
    async () => {}
    async () => {}
    () => {}
    async () => {}
    () => {}
    async () => {}
    () => {}
    a => {}
    a => {}
    async () => {}
    () => {}
    a => {}
    () => {}
    async () => {}
    async () => {}
    () => {}
    async () => {}
    a => {}
    async () => {}
    async () => {}
    () => {}`,
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
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: true,

              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,

              expression: false
            }
          }
        ]
      }
    ],
    //[`=> {}`, Context.Empty,  {}],
    //[`=> {}`, Context.Empty,  {}],
    //[`=> {}`, Context.Empty,  {}],
    //[`=> {}`, Context.Empty,  {}],
    //[`=> {}`, Context.Empty,  {}],
    [
      `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,
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
                body: []
              },
              params: [],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: []
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
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
      `() => {}
         async()
         async => {}
         async => {}
         a => {}
         a => {}`,
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
                body: []
              },
              params: [],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'async'
              },
              arguments: []
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
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
      `(async) => {}`,
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
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
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
      `async => {}`,
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
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'async'
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
      `async (cherow) => {}`,
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
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'cherow'
                }
              ],
              id: null,
              async: true,
              expression: false
            }
          }
        ]
      }
    ],
    [
      `async cherow => {}`,
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
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'cherow'
                }
              ],
              id: null,
              async: true,
              expression: false
            }
          }
        ]
      }
    ]
    /* [
    `async cherow => {}`,
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
              body: []
            },
            params: [
              {
                type: 'Identifier',
                name: 'cherow'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `async => {}`,
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
              body: []
            },
            params: [
              {
                type: 'Identifier',
                name: 'async'
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
    `() => {}
      async () => {}`,
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
              body: []
            },
            params: [],
            id: null,
            async: false,
            expression: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'BlockStatement',
              body: []
            },
            params: [],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `async => {}
    async () => {}`,
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
              body: []
            },
            params: [
              {
                type: 'Identifier',
                name: 'async'
              }
            ],
            id: null,
            async: false,
            expression: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'BlockStatement',
              body: []
            },
            params: [],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    `async () => {}
    async () => {}`,
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
              body: []
            },
            params: [],
            id: null,
            async: true,
            expression: false
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'BlockStatement',
              body: []
            },
            params: [],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ],
  [
    'async (a, b, c) => {}',
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
              body: []
            },
            params: [
              {
                type: 'Identifier',
                name: 'a'
              },
              {
                type: 'Identifier',
                name: 'b'
              },
              {
                type: 'Identifier',
                name: 'c'
              }
            ],
            id: null,
            async: true,
            expression: false
          }
        }
      ]
    }
  ]*/
  ]);
});

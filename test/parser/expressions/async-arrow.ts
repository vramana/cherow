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
    'async() => { await: ; };'
    //  `async
    //(a) => await a`
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
    // ['async (a, ...b, ...c) => {}', Context.Empty],
    ['async\n(a, b) => {}', Context.Empty],
    // ['new async() => {}', Context.Empty],
    // ['({ async\nf(){} })', Context.Empty],
    // ['async ((a)) => {}', Context.Empty],
    ['({ async get a(){} })', Context.Empty],
    ['async a => {} ()', Context.Empty],
    ['a + async b => {}', Context.Empty],
    ['with({}) async function f(){};', Context.Empty],
    ['async await => 0', Context.Empty],
    ['(class { async\na(){} })', Context.Empty],
    ['(class { async get a(){} })', Context.Empty],
    ['f(async\n()=>c)', Context.Empty],
    ['async x \n => x', Context.Empty],
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
    ['[async \n () => x]', Context.Empty],
    ['foo + async \n () => x;', Context.Empty],
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
    ['class x extends async \n () => x {};', Context.Empty],
    ['{x: async \n () => x};', Context.Empty],
    ['async().foo13 () => 1', Context.Empty],
    ['async(async() () => {})(async() () => {})(async() () => {})(async() () => {})(async() () => {})', Context.Empty],
    ['async (...a,) => {}', Context.Empty],
    ['async(...a, b) => b', Context.Empty],
    ['async (...a,) => {}', Context.Empty],
    ['async (...a,) => {}', Context.Empty],
    ['async(...a,) => b', Context.Empty],
    ['async(...a, b) => b', Context.Empty],
    ['async(...a,) => b', Context.Empty],
    ['async(...a, b) => b', Context.Empty],
    ["var asyncFn = async () => var await = 'test';", Context.Empty],
    //['async(...a = b) => b', Context.Empty],
    // ['async (...x = []) => {}', Context.Empty],
    // ['async().foo10 => 1', Context.Empty],
    ['async (1) => {}()', Context.Empty],
    // ['async (1) => {}', Context.Empty],
    ['async (x) => {}  ? a : b', Context.Empty],
    // ['async ((x, y), z) => 0', Context.Empty],
    // ['async ((x, y, z)) => 0', Context.Empty],
    ['async(foo = super()) => {}', Context.Empty],
    ['async(foo) => { super.prop };', Context.Empty],
    // ['async(a = (...await) => {}) => {};', Context.Empty],
    // ['async() => { (a = await/r/g) => {} };', Context.Empty],
    //  ['"use strict"; async(x = await) => {  }', Context.Empty],
    ['([x].foo) => x', Context.Empty],
    //['async ([x].foo) => x', Context.Empty],
    ['async(,)', Context.Empty],
    ['async (,) => b;', Context.Empty],
    ['async => ;', Context.Empty],
    ['async() => ((async(x = await 1) => x)();', Context.Empty],
    ["var asyncFn = async await => await + 'test';", Context.Empty]
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
      `id = async x => x, square = async (y) => { y * y }`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'id'
                  },
                  operator: '=',
                  right: {
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
                },
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'square'
                  },
                  operator: '=',
                  right: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'Identifier',
                              name: 'y'
                            },
                            right: {
                              type: 'Identifier',
                              name: 'y'
                            },
                            operator: '*'
                          }
                        }
                      ]
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'y'
                      }
                    ],
                    id: null,
                    async: true,
                    expression: false
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `async (a, ...b) => 0`,
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
                type: 'Literal',
                value: 0
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'b'
                  }
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
      `async a => {}`,
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
              async: true,
              expression: false
            }
          }
        ]
      }
    ],
    [
      `async () => {}`,
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
          }
        ]
      }
    ],
    [
      `(async a => {})()`,
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
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      `a, async () => b, c`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  params: [],
                  id: null,
                  async: true,
                  expression: true
                },
                {
                  type: 'Identifier',
                  name: 'c'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `async (a = await => {})`,
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
                name: 'async'
              },
              arguments: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  operator: '=',
                  right: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'await'
                      }
                    ],
                    id: null,
                    async: false,
                    expression: false
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `async (a = b => await (0)) => {}`,
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'await'
                      },
                      arguments: [
                        {
                          type: 'Literal',
                          value: 0
                        }
                      ]
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
                  }
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
      `async function a() { function b(c = await (0)) {} }`,
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
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'c'
                      },
                      right: {
                        type: 'CallExpression',
                        callee: {
                          type: 'Identifier',
                          name: 'await'
                        },
                        arguments: [
                          {
                            type: 'Literal',
                            value: 0
                          }
                        ]
                      }
                    }
                  ],
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
            },
            async: true,
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
      `({ async })`,
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
                    name: 'async'
                  },
                  value: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `({ async () {} })`,
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
                    name: 'async'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
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
      `({ async a(){} })`,
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
                    name: 'a'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: true,
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
      `({ async get(){} })`,
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
                    name: 'get'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: true,
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
      `(class { async(){} })`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: null,
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    kind: 'method',
                    static: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      name: 'async'
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      async: false,
                      generator: false,
                      id: null
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      `(class { async a(){} })`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: null,
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    kind: 'method',
                    static: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    value: {
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
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      `(class { static async a(){} })`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: null,
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    kind: 'method',
                    static: true,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    value: {
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
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      `await`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      `(async function a() { await 0; })`,
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
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AwaitExpression',
                      argument: {
                        type: 'Literal',
                        value: 0
                      }
                    }
                  }
                ]
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'a'
              }
            }
          }
        ]
      }
    ],
    [
      `async () => await 0`,
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
                type: 'AwaitExpression',
                argument: {
                  type: 'Literal',
                  value: 0
                }
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
      `({ async a(){ await 0; } })`,
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
                    name: 'a'
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
                            type: 'AwaitExpression',
                            argument: {
                              type: 'Literal',
                              value: 0
                            }
                          }
                        }
                      ]
                    },
                    async: true,
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
      `export async function a(){}`,
      Context.Module,
      {
        body: [
          {
            declaration: {
              async: true,
              body: {
                body: [],
                type: 'BlockStatement'
              },
              generator: false,
              id: {
                name: 'a',
                type: 'Identifier'
              },
              params: [],
              type: 'FunctionDeclaration'
            },
            source: null,
            specifiers: [],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `export default async function (){}`,
      Context.Module,
      {
        body: [
          {
            declaration: {
              async: true,
              body: {
                body: [],
                type: 'BlockStatement'
              },
              generator: false,
              id: null,
              params: [],
              type: 'FunctionDeclaration'
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    // [`export default async\nfunction a(){}`,  Context.Empty, {}],
    [
      `async;\n(a, b) => 0`,
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
                type: 'Literal',
                value: 0
              },
              expression: true,
              id: null,
              params: [
                {
                  name: 'a',
                  type: 'Identifier'
                },
                {
                  name: 'b',
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
      `async\nfunction a(){}`,
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
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },
            generator: false,
            id: {
              name: 'a',
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
      `new async()`,
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
              type: 'NewExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async()``',
      Context.Empty,
      {
        body: [
          {
            expression: {
              quasi: {
                expressions: [],
                quasis: [
                  {
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    }
                  }
                ],
                type: 'TemplateLiteral'
              },
              tag: {
                arguments: [],
                callee: {
                  name: 'async',
                  type: 'Identifier'
                },
                type: 'CallExpression'
              },
              type: 'TaggedTemplateExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `async ((a))`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              arguments: [
                {
                  name: 'a',
                  type: 'Identifier'
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
      `async function a(){}(0)`,
      Context.Empty,
      {
        body: [
          {
            async: true,
            body: {
              body: [],
              type: 'BlockStatement'
            },
            generator: false,
            id: {
              name: 'a',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          },
          {
            expression: {
              type: 'Literal',
              value: 0
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `(async function a(){}(0))`,
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 0
                }
              ]
            }
          }
        ]
      }
    ],
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
    ]
  ]);
});

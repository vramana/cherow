import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Super', () => {});

const inValids: Array<[string, Context]> = [
  // Esprima issue: https://github.com/jquery/esprima/issues/1784
  ['!{ a() { !function* (a = super.b()){} } };', Context.Empty],
  ['async(foo) => { super.prop };', Context.Empty],
  ['async (foo = super.foo) => { }', Context.Empty],
  ['async(foo) => { super() };', Context.Empty],
  ['(async function*() { super(); });', Context.Empty],
  ['super.property;', Context.Empty],
  ['class a extends b { c() { function* d(c = super.e()){} } }', Context.Empty],
  ['function* a(b){ super.c }', Context.Empty],
  //  ['class A extends B { constructor() { (super)() } }', Context.Empty],
  ['function wrap() { function foo(a = super(), b = super.foo()) {}}', Context.Empty],
  // ['({ a() { (super).b(); } });', Context.Empty],
  ['class X { x(){super();} }', Context.Empty],
  ['class X { x(){class X { constructor(){super();} }} }', Context.Empty],
  ['function* foo(a = 1 + (yield 2)) { super.foo() }', Context.Empty],
  ['!{ a() { !function* (a = super.b()){} } };', Context.Empty],
  // ['({ f: function*() {() => new super; } })', Context.Empty],
  ['async function* x() { super(); }', Context.Empty],
  ['ref = async function*() { super(); }', Context.Empty],
  ['export default async function*() { super(); }', Context.Strict | Context.Module],
  ['var C = class { async *method() { super(); } }', Context.Empty],
  ['var C = class { static async *method() { super(); } }', Context.Empty],
  ['var C = class { static async *method() { var x = function () { super(); } } }', Context.Empty],
  ['async function* x() { var x = { y: function () { super(); } } }', Context.Empty],
  ['var gen = { async *method() { var x = { y: function () { super(); } } } }', Context.Empty],
  ['export default async function*() { var x = { y: function () { super(); } } }', Context.Strict | Context.Module],
  ['var C = class { async *method() { var x = { y: function () { super(); } } } }', Context.Empty],
  ['var C = class { static async *method() { var x = { y: function () { super(); } } } }', Context.Empty],
  ['class x { constructor() { super(); } }', Context.Empty],
  ['class x extends y { foo(){ super(); } }', Context.Empty],
  ['class x { foo(){ super(); } }', Context.Empty],
  ['let x = { foo(){ super(); } }', Context.Empty],
  ['class A { constructor(){  let x = { foo(){ super(); } };  }}', Context.Empty],
  ['super();', Context.Empty],
  ['const x = 5 + super();', Context.Empty],
  ['function f(){ super(); }', Context.Empty],
  ['function f(x = super()){}', Context.Empty],
  ['g=function f(){ super(); }', Context.Empty],
  ['g=function f(x = super()){ }', Context.Empty],
  ['g={f: function f(){ super() }]', Context.Empty],
  ['x={constructor(){ super(); }}', Context.Empty],
  ['x={ foo: function(){ super.foo; }}', Context.Empty],
  ['function f(){ super.foo; }', Context.Empty],
  ['function f(x=super.foo){ }', Context.Empty],
  ['super.foo;', Context.Empty],
  ['x = function(){ super.foo; }', Context.Empty],
  ['class x { constructor(){ function f(){ super.foo; } }}', Context.Empty],
  ['class x { foo(){ function f(){ super.foo; } }}', Context.Empty],
  ['let f = () => super();', Context.Empty],
  ['let f = (a=super()) => a;', Context.Empty],
  ['class x { constructor(){ return () => () => super(); }}', Context.Empty],
  //  ['class x extends y { constructor(){ return function() { return () => super(); } }}', Context.Empty],
  ['class x extends y { fo(){ return () => super(); }}', Context.Empty],
  ['class x extends y { dsda(){ return (a=super()) => a; }}', Context.Empty],
  ['class x extends y { foo(){ return () => () => super(); }}', Context.Empty],
  ['x={ fo(){ return () => super(); }}', Context.Empty],
  ['x={ dsda(){ return (a=super()) => a; }}', Context.Empty],
  ['x={ foo(){ return () => () => super(); }}', Context.Empty],
  ['let f = () => super.foo;', Context.Empty],
  ['let f = (a=super.foo) => a;', Context.Empty],
  ['class x extends y { constructor(){ return function() { return () => super.foo; } }}', Context.Empty],
  ['class x { constructor() { super(); } }', Context.Empty]
];
fail('Expressions - Template', inValids);
// V8
const invalidSuperCall = [
  'class C { constructor() { super(); } }',
  'class C { method() { super(); } }',
  'class C { method() { () => super(); } }',
  'class C { *method() { super(); } }',
  'class C { get x() { super(); } }',
  'class C { set x(_) { super(); } }',
  '({ method() { super(); } })',
  '({ *method() { super(); } })',
  '({ get x() { super(); } })',
  '({ set x(_) { super(); } })',
  '({ f: function() { super(); } })',
  '(function() { super(); })',
  'var f = function() { super(); }',
  '({ f: function*() { super(); } })',
  '(function*() { super(); })',
  'var f = function*() { super(); }'
];

for (const arg of invalidSuperCall) {
  it(`${arg}`, () => {
    t.throws(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });
}

const SuperNewNoErrors = ['new super.x;', 'new super.x();', '() => new super.x;', '() => new super.x();'];

for (const arg of SuperNewNoErrors) {
  it(`class C { constructor() { ${arg} } }`, () => {
    t.doesNotThrow(() => {
      parseSource(`class C { constructor() { ${arg} } }`, undefined, Context.Empty);
    });
  });

  it(`class C { *method() { ${arg} } }`, () => {
    t.doesNotThrow(() => {
      parseSource(`class C { *method() { ${arg} } }`, undefined, Context.Empty);
    });
  });

  it(`class C { get x() { ${arg} } }`, () => {
    t.doesNotThrow(() => {
      parseSource(`class C { get x() { ${arg} } }`, undefined, Context.Empty);
    });
  });

  it(`class C { set x(_) { ${arg} } }`, () => {
    t.doesNotThrow(() => {
      parseSource(`class C { set x(_) { ${arg} } }`, undefined, Context.Empty);
    });
  });

  it(`({ method() { ${arg} } })`, () => {
    t.doesNotThrow(() => {
      parseSource(`({ method() { ${arg} } })`, undefined, Context.Empty);
    });
  });

  it(`({ *method() { ${arg} } })`, () => {
    t.doesNotThrow(() => {
      parseSource(`({ *method() { ${arg} } })`, undefined, Context.Empty);
    });
  });

  it(`(class C { get x() { ${arg} } })`, () => {
    t.doesNotThrow(() => {
      parseSource(`(class C { get x() { ${arg} } })`, undefined, Context.Empty);
    });
  });

  it(`(class C { set x(_) { ${arg} } })`, () => {
    t.doesNotThrow(() => {
      parseSource(`(class C { set x(_) { ${arg} } })`, undefined, Context.Empty);
    });
  });
}

pass('Expressions - Super (pass)', [
  [
    'class C { constructor() {new super.x; } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'C'
          },
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'NewExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'x'
                            }
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor() { } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
      ]
    }
  ],
  [
    'class x extends y { constructor() { log(this); super(); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'log'
                          },
                          arguments: [
                            {
                              type: 'ThisExpression'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor() { log(super.foo); super(); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'log'
                          },
                          arguments: [
                            {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            }
                          ]
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(x = super()) { } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'CallExpression',
                        callee: {
                          type: 'Super'
                        },
                        arguments: []
                      }
                    }
                  ],
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
      ]
    }
  ],
  [
    'class x extends y { constructor(x = this) { super(); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'ThisExpression'
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(x = super(), y = this) { } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'CallExpression',
                        callee: {
                          type: 'Super'
                        },
                        arguments: []
                      }
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      right: {
                        type: 'ThisExpression'
                      }
                    }
                  ],
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
      ]
    }
  ],
  [
    'class x extends y { constructor() { super(); super(); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor() { super(this); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: [
                            {
                              type: 'ThisExpression'
                            }
                          ]
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor() { let xx = x + x; super(); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: {
                              type: 'BinaryExpression',
                              left: {
                                type: 'Identifier',
                                name: 'x'
                              },
                              right: {
                                type: 'Identifier',
                                name: 'x'
                              },
                              operator: '+'
                            },
                            id: {
                              type: 'Identifier',
                              name: 'xx'
                            }
                          }
                        ]
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor() { f(x); super(); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'f'
                          },
                          arguments: [
                            {
                              type: 'Identifier',
                              name: 'x'
                            }
                          ]
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ],
  [
    'function f(x = class A extends B { constructor(){ super(); }}){ }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'FunctionDeclaration',
          params: [
            {
              type: 'AssignmentPattern',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'ClassExpression',
                id: {
                  type: 'Identifier',
                  name: 'A'
                },
                superClass: {
                  type: 'Identifier',
                  name: 'B'
                },
                body: {
                  type: 'ClassBody',
                  body: [
                    {
                      type: 'MethodDefinition',
                      kind: 'constructor',
                      static: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        name: 'constructor'
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
                                type: 'CallExpression',
                                callee: {
                                  type: 'Super'
                                },
                                arguments: []
                              }
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
            name: 'f'
          }
        }
      ]
    }
  ],
  [
    'class x { constructor(){ super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: false,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
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
        }
      ]
    }
  ],
  [
    'class x { foo(){ super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
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
                  name: 'foo'
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
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: false,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
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
        }
      ]
    }
  ],
  [
    'class x { foo(x=super.foo){ }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
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
                  name: 'foo'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Super'
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'foo'
                        }
                      }
                    }
                  ],
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
      ]
    }
  ],
  [
    'x={ foo(){ super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
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
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          }
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
        }
      ]
    }
  ],
  [
    'x={ foo(a = super.foo){ }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
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
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        right: {
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: false,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
                      }
                    ],
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
        }
      ]
    }
  ],
  [
    'class x { constructor(){ super[foo]; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: true,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
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
        }
      ]
    }
  ],
  [
    'class x { foo(){ super[foo]; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
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
                  name: 'foo'
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
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: true,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
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
        }
      ]
    }
  ],
  [
    'class x { foo(x=super[foo]){ }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
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
                  name: 'foo'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Super'
                        },
                        computed: true,
                        property: {
                          type: 'Identifier',
                          name: 'foo'
                        }
                      }
                    }
                  ],
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
      ]
    }
  ],
  [
    'x={ foo(){ super[foo]; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
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
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: true,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          }
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
        }
      ]
    }
  ],
  [
    'x={ foo(a = super[foo]){ }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
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
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        right: {
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: true,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
                      }
                    ],
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return () => super(); }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super'
                            },
                            arguments: []
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return (a=super()) => a; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'a'
                              },
                              right: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Super'
                                },
                                arguments: []
                              }
                            }
                          ],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return () => () => super(); }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'CallExpression',
                              callee: {
                                type: 'Super'
                              },
                              arguments: []
                            },
                            params: [],
                            id: null,
                            async: false,
                            expression: true
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return () => super[foo]; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: true,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x { constructor(){ return () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return (a=super.foo) => a; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'a'
                              },
                              right: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              }
                            }
                          ],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return (a=super.foo) => a; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'a'
                              },
                              right: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              }
                            }
                          ],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor(){ return () => () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],
                            id: null,
                            async: false,
                            expression: true
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x { constructor(){ return () => () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],
                            id: null,
                            async: false,
                            expression: true
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { fo(){ return () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
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
                  name: 'fo'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x { fo(){ return () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
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
                  name: 'fo'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { dsda(){ return (a=super.foo) => a; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
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
                  name: 'dsda'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'a'
                              },
                              right: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              }
                            }
                          ],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x { dsda(){ return (a=super.foo) => a; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
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
                  name: 'dsda'
                },
                value: {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'a'
                              },
                              right: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              }
                            }
                          ],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { foo(){ return () => () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
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
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],
                            id: null,
                            async: false,
                            expression: true
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'class x extends y { foo(){ return () => () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
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
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],
                            id: null,
                            async: false,
                            expression: true
                          },
                          params: [],
                          id: null,
                          async: false,
                          expression: true
                        }
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
        }
      ]
    }
  ],
  [
    'x={ fo(){ return () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'fo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],
                            id: null,
                            async: false,
                            expression: true
                          }
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
        }
      ]
    }
  ],
  [
    'x={ dsda(){ return (a=super.foo) => a; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'dsda'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            params: [
                              {
                                type: 'AssignmentPattern',
                                left: {
                                  type: 'Identifier',
                                  name: 'a'
                                },
                                right: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Super'
                                  },
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'foo'
                                  }
                                }
                              }
                            ],
                            id: null,
                            async: false,
                            expression: true
                          }
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
        }
      ]
    }
  ],
  [
    'x={ foo(){ return () => () => super.foo; }}',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            operator: '=',
            right: {
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
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              },
                              params: [],
                              id: null,
                              async: false,
                              expression: true
                            },
                            params: [],
                            id: null,
                            async: false,
                            expression: true
                          }
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
        }
      ]
    }
  ],
  [
    'class x extends y { constructor() { super(); } }',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x'
          },
          superClass: {
            type: 'Identifier',
            name: 'y'
          },
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'constructor',
                static: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'constructor'
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
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
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
        }
      ]
    }
  ]
]);

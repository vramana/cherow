import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Declarations - Function', () => {
  const inValids: Array<[string, Context]> = [
    // Acorn
    ['let foo = 1; function x(foo) {} { var foo = 1; }', Context.Empty],
    ['var foo = 1; function x() {} let foo = 1;', Context.Empty],
    ['var foo = 1; function x(a) { let a; } ', Context.Empty],

    // Duplicate function args in strct mode

    ['function f(a, a) {}', Context.Strict],
    ['function f(a, b, a) {}', Context.Strict],
    ['function f(b, a, a) {}', Context.Strict],
    ['function f(a, a, b) {}', Context.Strict],
    ['function f(b, a, b, a) {}', Context.Strict],
    ['function f(b, a, b, a = x) {}', Context.Strict],

    // General

    ['let x = a; function x(){};', Context.Empty],
    ['const x = a; function x(){};', Context.Empty],
    // ['"use strict"; function eval(){}', Context.Strict],
    ['const x = a; function x(){};', Context.Empty],

    ['function f([b, a], b) {}', Context.Strict],
    ['function f([b, a], {b}) {}', Context.Strict],
    ['function f([b, a], b=x) {}', Context.Strict],
    ['function f([b, a, b, a]) {}', Context.Strict],
    ['function f([a, a, b]) {}', Context.Strict],
    ['function f([b, a, a]) {}', Context.Strict],
    ['function f([a, b, a]) {}', Context.Strict],
    ['function f([a, a]) {}', Context.Strict],
    ['function f([a, b, a]) {}', Context.Strict],
    ['function f([a, b, a]) {}', Context.Strict],
    ['function f([b, a], ...b) {}', Context.Strict],

    // Block scope

    ['{ function f() {} { var f; } }', Context.OptionsDisableWebCompat],
    ['{ function* f() {} function f() {} }', Context.OptionsDisableWebCompat],
    ['{ function f() {} var f; }', Context.OptionsDisableWebCompat],

    // Duplicate function args with explicit directive

    ['function f(a, a) {"use strict"}', Context.Empty],
    ['function f(a, b, a) {"use strict"}', Context.Empty],
    ['function f(b, a, a) {"use strict"}', Context.Empty],
    ['function f(a, a, b) {"use strict"}', Context.Empty],
    ['function f(b, a, b, a) {"use strict"}', Context.Empty],
    ['function f(b, a, b, a = x) {"use strict"}', Context.Empty],
    ['function f(b, a, b, a, [foo]) {"use strict"}', Context.Empty],

    // Duplicate args with locale binding

    ['let x; var x;', Context.Empty],
    ['let x; { var x; }', Context.Empty],
    ['{ var x; } let x;', Context.Empty],

    // General

    ['{ function f(){} function f(){} }', Context.OptionsDisableWebCompat],
    ['function f(x) { let x }', Context.OptionsDisableWebCompat],
    ['function f(x) { const x = y }', Context.Empty],
    ['function f(){ let x; var x; }', Context.Empty],
    ['function f(){ var x; let x; }', Context.Empty],
    ['function f(){ const x = y; var x; }', Context.Empty],
    ['function f(){ var x; const x = y; }', Context.Empty],
    ['function f(){ let x; function x(){} }', Context.Empty],
    ['function f(){ function x(){} let x; }', Context.OptionsDisableWebCompat],
    ['function f(){ const x = y; function x(){} }', Context.Empty],
    ['function f(){ function x(){} const x = y; }', Context.OptionsDisableWebCompat],
    ['{ function f() {} ; function f() {} }', Context.OptionsDisableWebCompat], // Fails only Without AnnexB
    ['{ function f() {} ; function f() {} }', Context.Strict], // throws if no AnnexB and in strict mode only
    ['{ if (x) function f() {} ; function f() {} }', Context.Strict], // throws if no AnnexB and in strict mode only
    ['switch (x) {case a: function f(){}; break; case b: function f(){}; break; }', Context.Strict | Context.Module], // throws if no AnnexB and in strict mode only
    ['function a(,,) {}', Context.Empty],
    ['function a(,,,,a) {}', Context.Empty],
    ['function (){}', Context.Empty],
    ['class {}', Context.Empty]
  ];

  fail('Declarations - Functions (fail)', inValids);

  const programs = [
    'if (true) function foo() {}',
    'if (false) {} else function f() { };',
    'label: function f() { }',
    'label: if (true) function f() { }',
    'label: if (true) {} else function f() { }',
    'label: label2: function f() { }',
    'function f() { ++(yield); }',
    'function f(a, a) {}',
    'function f(a, a) { function f(a, a) {} }',
    'function f(arg, ...arguments) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg, arguments=[]) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(...arg) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg) {g(arg); g(function() {arguments[0] = 42}); g(arg)}',
    'function f(arg, x=1) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg=1) {g(arg); arguments[0] = 42; g(arg)}',
    'function f(arg) {g(arg); arg = 42; g(arg)}',
    'function f(arg=1) {g(arg); arg = 42; g(arg)}',
    'function f(arg) {g(arg); g(() => arg = 42); g(arg)}',
    'function f(arg) {g(arg); h(arguments); g(arg)}',
    'function f(arg) {g(arg); g(() => arguments[0] = 42); g(arg)}',
    'function foo() { label: function bar() { } }',
    'function foo () {"use strict";}',
    'function __func(){};',
    '"use strict"; (function(){}).hasOwnProperty("icefapper");',
    'function __func(){ delete arguments; return arguments; }',
    'function hello() { say_hi_to_ariya(); }',
    'function arguments() { }',
    'function hello(a, b) { sayHi(); }',
    'var hi = function eval() { };',
    'var hi = function arguments() { };',
    '(function(){})',
    'function test() { "use strict" + 42; }',
    'function test(t, t) { }',
    'function hello() { z(); }',
    'function hello(a) { z(); }',
    'function eval() { function inner() { "use strict" } }',
    'function hello(a, b) { z(); }',
    'function test() { "use strict"\n + 0; }',
    'function a() {} function a() {}',
    'function a() { function a() {} function a() {} }',
    'function arguments() { }',
    'function arguments() { function foo() { "use strict"; } }',
    'function arguments(eval) { function foo() { "use strict"; } }',
    'function arguments(eval) { function foo() { "use strict"; } function eval() {} }',
    'function arguments() { eval = arguments; function foo() { "use strict"; } }',
    'function arguments(eval) { eval = arguments; function foo() { "use strict"; } }',
    'function arguments(eval) { eval = arguments; function foo() { "use strict"; } "use strict"; }',
    'function arguments(eval) { function foo() { "use strict"; } eval = arguments;  }',
    'function f([x]) {}',
    'function f([[,] = g()]) {}',
    'function f([[...x] = function() {}()]) {}',
    'function f([x = 23]) {}',
    'function f([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}',
    'function f([...x]) {}',
    'function f([x = 23] = []) {}',
    'function f([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}',
    'function f([...[]] = function*() {}) {}',
    'function f({ x, } = { x: 23 }) {}',
    'function f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } }) {}',
    'function f({ x, }) {}',
    'function f({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
    `function
    x
    (
    )
    {
    }
    ;`,
    `function                                                    y                                   (                                          )                                              {};
    y();
    `,
    `function
    z
    (
    )
    {
    }
    ;
    `,
    `function x(...{ a }){}`,
    `function santa() { function package() {} function evdal() { "use strict"; }}`,
    `function foo(bar, eval) { function bar() { "use strict"; } }`,
    `function a() {
      return 'hello \
          world';
    }`,
    `function bar() {foo = 42}; ext(bar); ext(foo)`,
    `function bar() { }`,
    `function a(b, c) { }`,
    `function makeArrayLength(x) { if(x < 1 || x > 4294967295 || x != x || isNaN(x) || !isFinite(x)) return 1; else return Math.floor(x); };`,
    `function foo () {"use strict";}`,
    `function __decl(){return 1;}`,
    `function __func__2(){b};`,
    `function __func__3(){1};`,
    `function __func__4(){1+c};`,
    `function __func__5(){inc(d)};`,
    `function foo (a, b, c) { }`,
    `function __gunc(){return true};`,
    `function f(x = x) {}`,
    `function f([x] = []) {}`,
    `function f([{ x }] = [null]) {}`,
    `function f({ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }) {}`,
    `function test(t, t) { }`,
    `function arguments() { }`,
    `function a() { function a() {} function a() {} }`,
    `a: function a(){}`,
    `if (0) function a(){}`,
    `function f(a, b, c) {
      return null;
    }
    var g = function (a, b, c) {
      return null;
    };
    function h(a, b = 1, c = 2) {
      return null;
    }
    function i(a = 1, b, c) {
      return null;
    }
    function j(...a) {}
    function k() {}
    var l = function () {};
    var m = function (a = 1, b, c) {};
    function* o() {
      yield 42;
    }
    function* p() {
      yield 42;
      yield 7;
      return "answer";
    }
    let q = function* () {};
    let r = a => a;
    let s = (a, b) => a + b;
    let t = (a, b = 0) => a + b;
    let u = (a, b) => {};
    let v = () => {};
    let w = () => ({});
    let x = () => {
      let a = 42;
      return a;
    };
    let y = () => ({
      a: 1,
      b: 2
    });`,
    'function ref(a,) {}',
    'function universe(__proto__) { }'
  ];

  for (const arg of programs) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  pass('Declarations - Function (pass)', [
    [
      'function f([foo=a,bar] = x){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo,bar=b]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'bar'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo,bar=b] = x){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo=a,bar=b]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'a'
                    }
                  },
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'bar'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo=a,bar=b] = x){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([a=b=c]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'AssignmentExpression',
                      operator: '=',
                      left: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'c'
                      }
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([a=b+=c]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'AssignmentExpression',
                      operator: '+=',
                      left: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'c'
                      }
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([a = b = c] = arr){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'c'
                        }
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'arr'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f({b: []}) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    computed: false,
                    value: {
                      type: 'ArrayPattern',
                      elements: []
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([{b}]) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([a, {b: []}]) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  },
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        computed: false,
                        value: {
                          type: 'ArrayPattern',
                          elements: []
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'function fk({x: [a, {b: []}]}) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'fk'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        },
                        {
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'b'
                              },
                              computed: false,
                              value: {
                                type: 'ArrayPattern',
                                elements: []
                              },
                              kind: 'init',
                              method: false,
                              shorthand: false
                            }
                          ]
                        }
                      ]
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([a, [b], c]) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  },
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'b'
                      }
                    ]
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([...bar]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([...bar] = obj){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo, ...bar]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo, ...bar] = obj){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([...[a, b]]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        },
                        {
                          type: 'Identifier',
                          name: 'b'
                        }
                      ]
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([...[a, b]] = obj){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'a'
                          },
                          {
                            type: 'Identifier',
                            name: 'b'
                          }
                        ]
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([x, ...[a, b]]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        },
                        {
                          type: 'Identifier',
                          name: 'b'
                        }
                      ]
                    }
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([x, ...[a, b]] = obj){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'a'
                          },
                          {
                            type: 'Identifier',
                            name: 'b'
                          }
                        ]
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){foo}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([ x ]) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo], b){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              },
              {
                type: 'Identifier',
                name: 'b'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo] = x, b){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'Identifier',
                name: 'b'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f([foo], b = y){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo] = x, b = y){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x, [foo]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'x'
              },
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x = y, [foo]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo=a] = c){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'c'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([,foo]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  null,
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([,foo]){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  null,
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f({ x : y = 1 }) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      right: {
                        type: 'Literal',
                        value: 1
                      }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([a = 1]) {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                ]
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
      'function f([ x = y ] = []) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  ]
                },
                right: {
                  type: 'ArrayExpression',
                  elements: []
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([,] = "icefapper") {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [null]
                },
                right: {
                  type: 'Literal',
                  value: 'icefapper'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([,] = null) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [null]
                },
                right: {
                  type: 'Literal',
                  value: null
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f([[x]] = 1) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ]
                    }
                  ]
                },
                right: {
                  type: 'Literal',
                  value: 1
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f1({x}) { var x = 2; return x }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f1'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      init: {
                        type: 'Literal',
                        value: 2
                      }
                    }
                  ],
                  kind: 'var'
                },
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f10({x}, y) { var y; return y }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f10'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true
                  }
                ]
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
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                },
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f7({a: x}) { x = 2; return arguments[1].a }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f7'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    right: {
                      type: 'Literal',
                      value: 2
                    }
                  }
                },
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'MemberExpression',
                      computed: true,
                      object: {
                        type: 'Identifier',
                        name: 'arguments'
                      },
                      property: {
                        type: 'Literal',
                        value: 1
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'a'
                    }
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([]){ var a }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ArrayPattern',
                elements: []
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f({}){ var a }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: []
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a){ var a }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'a'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a,){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'a'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a = b,){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a=b){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a=b=c){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'c'
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){foo}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){foo;bar}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'bar'
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f() {{var f}}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          },
                          init: null
                        }
                      ],
                      kind: 'var'
                    }
                  ]
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f() {let f}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f() {{let f}}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          },
                          init: null
                        }
                      ],
                      kind: 'let'
                    }
                  ]
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f(){ function x(){} var x = y; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                },
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      init: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'var x = a; function x(){};',
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
                  type: 'Identifier',
                  name: 'a'
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
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
              name: 'x'
            }
          },
          {
            type: 'EmptyStatement'
          }
        ]
      }
    ],

    [
      'function f(){ var x = y; function x(){} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      init: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  ],
                  kind: 'var'
                },
                {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a, a) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'a'
              },
              {
                type: 'Identifier',
                name: 'a'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a, b, a) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
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
                name: 'a'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(b, a, a) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'b'
              },
              {
                type: 'Identifier',
                name: 'a'
              },
              {
                type: 'Identifier',
                name: 'a'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f({a},){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    kind: 'init',
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    method: false,
                    shorthand: true
                  }
                ]
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
      'function f([x] = y,){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
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
      'function f({a} = b,){}',
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
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
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
      'function f(a=b){}',
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
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
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
      'function f(a=b=c){}',
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
                  name: 'a'
                },
                right: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'c'
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
      'function f({foo,} = x){}',
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
                        type: 'Identifier',
                        name: 'foo'
                      },
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f({foo,bar=b} = x){}',
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
                        type: 'Identifier',
                        name: 'foo'
                      },
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f({foo=a,bar=b} = x){}',
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
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f({foo:a=b, bar:c=d} = x){}',
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
                          name: 'a'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'c'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'd'
                        }
                      },
                      method: false,
                      shorthand: false
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([,,] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [null, null]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([,foo] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    null,
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([foo,bar] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([foo], b){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              },
              {
                type: 'Identifier',
                name: 'b'
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
      'function f([foo] = x, b = y){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
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
      'function f([foo=a]){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'a'
                    }
                  }
                ]
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
      'function f([foo=a] = c){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'c'
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
      'function f([foo=a,bar] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([,] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [null]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([,,foo] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    null,
                    null,
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([foo,bar]){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  {
                    type: 'Identifier',
                    name: 'bar'
                  }
                ]
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
      'function f([foo,bar] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([foo,,bar] = x){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    null,
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
      'function f([foo], [bar]){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              },
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'bar'
                  }
                ]
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
      'function f([foo] = x, [bar] = y){}',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
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
      'function f(x, [foo] = y){}',
      Context.Empty,
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
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
      'function yield() {}',
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
              name: 'yield'
            }
          }
        ]
      }
    ],
    [
      'function f([,,]){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [null, null]
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
      'function f(b, a, b, a = x) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'b'
              },
              {
                type: 'Identifier',
                name: 'a'
              },
              {
                type: 'Identifier',
                name: 'b'
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'var x; { let x; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    init: null
                  }
                ],
                kind: 'let'
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x) { function x() {} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
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
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x) { var x; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
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
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ var f }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ let f }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ let f; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f() {let f}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f() {var f}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){} function f(){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          },
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function g() {  function f(){} function f(){} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'g'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                },
                {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f(x) { { const x = y } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
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
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          init: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        }
                      ],
                      kind: 'const'
                    }
                  ]
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x) { { let x } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
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
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          init: null
                        }
                      ],
                      kind: 'let'
                    }
                  ]
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ new.target }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MetaProperty',
                    meta: {
                      type: 'Identifier',
                      name: 'new'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'target'
                    }
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ new . target }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MetaProperty',
                    meta: {
                      type: 'Identifier',
                      name: 'new'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'target'
                    }
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ new.target + foo }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ foo + new.target }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    }
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ foo = new.target }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    }
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ new new .target; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NewExpression',
                    callee: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    },
                    arguments: []
                  }
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(f) { }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'f'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x) {var x}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
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
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x) {{var x}}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
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
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          init: null
                        }
                      ],
                      kind: 'var'
                    }
                  ]
                }
              ]
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function foo() {}',
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
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'function f(){}\n/foo/',
      Context.Empty,
      {
        body: [
          {
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
            type: 'FunctionDeclaration'
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
      'typeof function f(){}\n/foo/',
      Context.Empty,
      {
        body: [
          {
            expression: {
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
            type: 'ExpressionStatement'
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
      'typeof function f(){}\n/foo/g',
      Context.Empty,
      {
        body: [
          {
            expression: {
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
            type: 'ExpressionStatement'
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
    ]
  ]);
});

import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Async Functions', () => {
  const inValids: Array<[string, Context]> = [
    ['(async function f(a, a) {})', Context.Strict],
    ['(async function () { var await; });', Context.Empty],
    ['(async function () { void await; });', Context.Empty],
    ['(async function () { await: ; });', Context.Empty],
    ['(async function* await() { });', Context.Empty],
    ['var asyncFn = async function await() {};', Context.Empty],
    ["var asyncFn = async () => var await = 'test';", Context.Empty],
    ["var asyncFn = async await => await + 'test';", Context.Empty],
    ['var asyncFn = async function(await) {};', Context.Empty],
    ['async function * f() {([a = 1] of [])}', Context.Empty],
    ['async function * f() {([a = 1, ...b] of [])}', Context.Empty],
    ['async function * f() {({a: a} of [])}', Context.Empty],
    ['async function * f() {({"a": a} of [])}', Context.Empty],
    ['async function * f() {(([a = 1 = 1, ...b] = 1) of [])}', Context.Empty],
    ['async function * f() {(({a} = 1) of [])}', Context.Empty],
    ['async function * f() {(({a = 1} = 1) of [])}', Context.Empty],
    ['async function * f() {(({a: a = 1} = 1) of [])}', Context.Empty],
    ['async function * f() {(({[Symbol.iterator]: a = 1} = 1) of [])}', Context.Empty],
    ['async function * f() {(({0: a = 1} = 1) of [])}', Context.Empty],
    ['async function * f() {([1] of [])}', Context.Empty],
    ['async function * f() {({a: 1} of [])}', Context.Empty],
    ['async function * f() { (var [a = 1] = 1 of []) }', Context.Empty],
    ['async function * f() { (var [a = 1], b of []) }', Context.Empty],
    ['async function * f() { (var {a}, b of []) }', Context.Empty],
    ['async function * f() {(var {"a": a}, b of [])  }', Context.Empty],
    ['async function * f() {(var {[Symbol.iterator]: a} = 1 of [])  }', Context.Empty],
    ['async function * f() { (var {0: a}, b of []) }', Context.Empty],
    ['async function * f() {(var {a = 1} = 1 of [])  }', Context.Empty],
    ['async function * f() { (var {a = 1}, b of []) }', Context.Empty],
    ['async function * f() {  (var {[Symbol.iterator]: a = 1} = 1 of [])}', Context.Empty],
    ['async function * f() { (let [a], b of []) }', Context.Empty],
    ['async function * f() {(let {a}, b of [])  }', Context.Empty],
    ['async function * f() { (let {a: a} = 1 of []) }', Context.Empty],
    ['async function * f() { (let {a: a}, b of []) }', Context.Empty],
    ['async function * f() {(let {[Symbol.iterator]: a} = 1 of [])  }', Context.Empty],
    ['async function * f() { (let {0: a}, b of []) }', Context.Empty],
    ['async function * f() { (let {a = 1}, b of []) }', Context.Empty],
    ['async function * f() { (let {a: a = 1}, b of []) }', Context.Empty],
    ['async function * f() { (let {[Symbol.iterator]: a = 1} = 1 of []) }', Context.Empty],
    ['async function * f() { (let {[Symbol.iterator]: a = 1}, b of []) }', Context.Empty],
    ['async function * f() { (let {0: a = 1} = 1 of [])  }', Context.Empty],
    ['async function * f() { (let {0: a = 1}, b of []) }', Context.Empty],
    ['async function * f() { (const a = 1 of []) }', Context.Empty],
    ['async function * f() { (const [a] = 1 of []) }', Context.Empty],
    ['async function * f() { (const [a = 1], b of []) }', Context.Empty],
    ['async function * f() {(const [a = 1, ...b] = 1 of [])  }', Context.Empty],
    ['async function * f() { (const [a = 1, ...b], b of []) }', Context.Empty],
    ['async function * f() { (const {[Symbol.iterator]: a}, b of []) }', Context.Empty],
    ['async function * f() { (const {a = 1}, b of []) }', Context.Empty],
    ['async function * f() { (const {"a": a = 1} = 1 of [])  }', Context.Empty],
    ['async function * f() { (const {[Symbol.iterator]: a = 1}, b of []) }', Context.Empty],
    ['async function * f() { (const {0: a = 1} = 1 of []) }', Context.Empty],
    ['async function * f() { (const {0: a = 1}, b of []) }', Context.Empty],
    ['async function * f() {({[Symbol.iterator]: a = 1} of [])}', Context.Empty],
    ['(async function (x = 1) {"use strict"})', Context.Empty],
    ['(async function foo (foo) { super() })', Context.Empty],
    ['(async function foo (foo) { super.prop });', Context.Empty],
    ['(async function foo (foo = super()) { var bar; });', Context.Empty],
    ['(async function*(await) { });', Context.Empty],
    ['(async function foo(await) { })', Context.Empty],
    ['async function* f() {var [await f] = [];}', Context.Empty],
    ['async function* f() {let [await f] = [];}', Context.Empty],
    ['async function* f() {const [await f] = [];}', Context.Empty],
    ['async function* f() {var [...await f] = [];}', Context.Empty],
    ['async function* f() {let [...await f] = [];}', Context.Empty],
    ['async function* f() {const [...await f] = [];}', Context.Empty],
    ['let f = () => {var { f: await f } = {};}', Context.Empty],
    ['let f = () => {let { f: await f } = {};}', Context.Empty],
    ['let f = () => {const { f: await f } = {};}', Context.Empty],
    ["'use strict'; function* f() { var { f: ...await f } = {};}", Context.Empty],
    ['function* f() {let { f: ...await f } = {};}', Context.Empty],
    ['let f = async() => {const { f: ...await f } = {};}', Context.Empty],
    ['async function f({ await }) {}', Context.Empty],
    ['async function f({ await = 1 }) {}', Context.Empty],
    ['async function f({ await } = {}) {}', Context.Empty],
    ['async function f({ await = 1 } = {}) {}', Context.Empty],
    ['async function f([await]) {}', Context.Empty],
    ['async function f([await] = []) {}', Context.Empty],
    ['async function f([await = 1]) {}', Context.Empty],
    ['async function f([await = 1] = []) {}', Context.Empty],
    ['async function f(...await) {}', Context.Empty],
    ['async function f(await) {}', Context.Empty],
    ['async function f(await = 1) {}', Context.Empty],
    ['async function f(...[await]) {}', Context.Empty],
    ['async function f(x = await) {}', Context.Empty],
    ['async function f(1) => 1) {}', Context.Empty],
    ["async function f('str') => 1) {}", Context.Empty],
    ['async function f(/foo/) => 1) {}', Context.Empty],
    ['async function f({ foo = async(1) => 1 }) => 1) {}', Context.Empty],
    ['async function f({ foo = async(a) => 1 })) {}', Context.Empty],
    ['async function * gen() {var await;   }', Context.Empty],
    ['async function * gen() {var foo, await;   }', Context.Empty],
    ['async function * gen() { try { } catch (yield) { }   }', Context.Empty],
    ['async function * gen() {  try { } catch (await) { }  }', Context.Empty],
    ['async function * gen() {  function yield() { }  }', Context.Empty],
    // ['async function * gen() {  function await() { }  }', Context.Empty],
    ['async function * gen() { (async function * yield() { })   }', Context.Empty],
    ['async function * gen() {  (async function * await() { })  }', Context.Empty],
    ['async function * gen() { (async function * foo(yield) { })   }', Context.Empty],
    ['async function * gen() {  async function * foo(await) { }  }', Context.Empty],
    ['async function * gen() {  (async function * foo(await) { })  }', Context.Empty],
    ['async function * gen() {  yield = 1;  }', Context.Empty],
    ['async function * gen() {  await = 1;  }', Context.Empty],
    ['async function * gen() { (yield *)  }', Context.Empty],
    ['async function * gen() { yield 3 + yield 4;  }', Context.Empty],
    ['async function * gen() {yield ? 1 : 2   }', Context.Empty],
    ['async function * gen() { + yield 3  }', Context.Empty],
    ['async function * gen() { yield /* comment */\n {yield: 42}  }', Context.Empty],
    ['async function * gen() { var [await] = [42];  }', Context.Empty],
    ['async function * gen() { var {foo: await} = {a: 42};  }', Context.Empty],
    //    ['async function * gen() { ({a: yield} = {a: 42});  }', Context.Empty],
    ['async function * gen() { ({a: await} = {a: 42});  }', Context.Empty],
    ['async function * gen() { var [yield 24] = [42];  }', Context.Empty],

    ['async function * gen() { var {foo: yield 24} = {a: 42};  }', Context.Empty],
    ['async function * gen() { var {foo: await 24} = {a: 42};  }', Context.Empty],
    ['async function * gen() { [await 24] = [42];  }', Context.Empty],
    ['async function * gen() { ({a: yield 24} = {a: 42});  }', Context.Empty],
    ['async function * gen() { ({a: await 24} = {a: 42});  }', Context.Empty],
    // ['async function * gen() { for (yield "x" in {});  }', Context.Empty],
    // ['async function * gen() { for (yield "x" of {});  }', Context.Empty],
    // ['async function * gen() { for (yield "x" in {} in {});  }', Context.Empty],
    // ['async function * gen() { for (yield "x" in {} of {});  }', Context.Empty],
    ['async function * gen() { class C extends yield { }  }', Context.Empty],
    //['async function * gen() { class C extends await { }  }', Context.Empty],
    [
      `(async
      function f() {})`,
      Context.Empty
    ],
    ['0, async function*(...x = []) {};', Context.Empty],
    ['(async function f(...a,) {})', Context.Empty],
    ['var f = async() => ((async(x = await 1) => x)();', Context.Empty],
    ['class C {}; class C2 extends C { async constructor() {} }', Context.Empty],
    ['class C { static async prototype() {} }', Context.Empty],
    ['class C {}; class C2 extends C { static async prototype() {} }', Context.Empty],
    ['(async function foo3() { } () => 1)', Context.Empty]
    //     ['(async function foo4() { } => 1)', Context.Empty],
    //   ['(async function() { } foo5 => 1)', Context.Empty],
  ];

  fail('Expressions - Async Functions', inValids);

  const validFormalparams = [
    '(async function foo() { }.prototype)',
    '(async function foo(x, y = x, z = y) { })',
    '(async function foo(x = y, y) { })',
    '(async function foo(a, b = 39,) { })',
    '(async function foo(a, b,) { })',
    '(async function foo(_ = (function() {}())) { })',
    '(async function foo(x = x) { })',
    'var O = { async method(eval) {} }',
    "var O = { async ['meth' + 'od'](eval) {} }",
    "var O = { async 'method'(eval) {} }",
    'var O = { async 0(eval) {} }',
    'var O = { async method(arguments) {} }',
    "var O = { async ['meth' + 'od'](arguments) {} }",
    "var O = { async 'method'(arguments) {} }",
    'var O = { async 0(arguments) {} }',
    'async function await() {}',
    'x = function await() {}',
    'x = function *await() {}',
    'x = function() { let await = 0; }',
    'x = () => { let await = 0; }',
    'class X { static async await(){} }',
    `(async function ref(a, b = 39,) {});`,
    `x = async function(a) { await a }`,
    'f(async function(x) { await x })',
    'f(b, async function(b) { await b }, c)',
    'async function foo(a = async () => await b) {}',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    '(function f() { async function yield() {} })',
    'function* g() { var f = async(yield); }',
    'function* g() { var f = async(x = yield); }',
    'var asyncFn = async function() { await 1; };',
    'var asyncFn = async function withName() { await 1; };',
    "var asyncFn = async () => await 'test';",
    "var asyncFn = async x => await x + 'test';",
    '(function f() { ({ async yield() {} }); })',
    '({ async [yield]() {} });',
    'f(async function(x) { await x })',
    'f(b, async function(b) { await b }, c)',
    'async function foo(a = {async bar() { await b }}) {}',
    'async function foo(a = class {async bar() { await b }}) {}',
    'async function foo(a, b) { await a }',
    '"use strict"; ({ async yield() {} });',
    '(function f() { ({ async [yield]() {} }); })',
    `a = async
          function f(){}`,
    'async function * gen() { yield * yield * 1; }',
    'async function * gen() { yield 3 + (yield 4);}',
    'async function * gen() {yield * 3 + (yield * 4); }',
    'async function * gen() { (yield * 3) + (yield * 4);}',
    'async function * gen() {yield 3; yield 4; }',
    'async function * gen() { (function (yield) { })}',
    'async function * gen() { (function yield() { })}',
    'async function * gen() {(function (await) { }) }',
    'async function * gen() {(function await() { }) }',
    'async function * gen() { yield { yield: 12 }}',
    'async function * gen() {yield /* comment */ { yield: 12 }}',
    'async function * gen() {yield * \n { yield: 12 } }',
    'async function * gen() {yield /* comment */ * \n { yield: 12 } }',
    'async function * gen() { yield 1; return}',
    'async function * gen() {yield * 1; return }',
    'async function * gen() {yield 1; return 37  }',
    'async function * gen() {yield * 1; return 37 }',
    'async function * gen() {{yield} }',
    'async function * gen() { (yield) ? yield : yield}',
    'async function * gen() {await 10; return }',
    'async function * gen() {await 10 }',
    'async function * gen() {await (yield 10) }',
    'async function * gen() {await 10; return 20 }',
    'async function * gen() {yield await 10; return 20; yield "dead" }',
    'async function * gen() {await /* comment */ 10}',
    'async function * gen() {await // comment\n 10 }',
    'async function * gen() {yield await /* comment\n */ 10 }',
    'async function * gen() { yield await // comment\n 10}',
    'async function * gen() { await (yield /* comment */)}',
    'async function * gen() { await (yield // comment\n)}'
  ];

  for (const arg of validFormalparams) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  const valids: Array<[string, Context, any]> = [
    [
      '(async function foo(a, b = 39,) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Literal',
                    value: 39
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function() { (await y); })',
      Context.Empty,
      {
        body: [
          {
            expression: {
              async: true,
              body: {
                body: [
                  {
                    expression: {
                      argument: {
                        name: 'y',
                        type: 'Identifier'
                      },
                      type: 'AwaitExpression'
                    },
                    type: 'ExpressionStatement'
                  }
                ],
                type: 'BlockStatement'
              },
              generator: false,
              id: null,
              params: [],
              type: 'FunctionExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '(async function*(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
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
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'd'
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'e'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'f'
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'g'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'h'
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'i'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'j'
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'k'
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'l'
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      '(async function foo(a,) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
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
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo() { }.prototype)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
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
                  name: 'foo'
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'prototype'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(_ = (function() {}())) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: '_'
                  },
                  right: {
                    type: 'CallExpression',
                    callee: {
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
                    arguments: []
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'var O = { async method(arguments) {} }',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'method'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
                            type: 'Identifier',
                            name: 'arguments'
                          }
                        ],
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
                },
                id: {
                  type: 'Identifier',
                  name: 'O'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'async function await() {}',
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
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'f(b, async function(b) { await b }, c)',
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
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      }
                    ]
                  },
                  async: true,
                  generator: false,
                  id: null
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
      'f(b, async function(b) { await b }, c)',
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
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      }
                    ]
                  },
                  async: true,
                  generator: false,
                  id: null
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
      '(async function foo(a,) {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
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
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'x=async function f(){ var f }',
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(a, b = 39,) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Literal',
                    value: 39
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(_ = (function() {}())) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: '_'
                  },
                  right: {
                    type: 'CallExpression',
                    callee: {
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
                    arguments: []
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(x = x) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'x'
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
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'x=async function f(){ let f }',
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
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Async Functions (pass)', valids);
});

import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Await', () => {
  // Tests 'await' with module goal

  for (const arg of [
    'await;',
    'await: ;',
    'var await;',
    'var [await] = [];',
    'var { await } = {};',
    'var { x: await } = {};',
    '{ var await; }',
    'let await;',
    'let [await] = [];',
    'let { await } = {};',
    'let { x: await } = {};',
    '{ let await; }',
    'const await = null;',
    'const [await] = [];',
    'const { await } = {};',
    'const { x: await } = {};',
    '{ const await = null; }',
    'function await() {}',
    'function f(await) {}',
    'function* await() {}',
    'function* g(await) {}',
    '(function await() {});',
    '(function (await) {});',
    '(function* await() {});',
    '(function* (await) {});',
    '(await) => {};',
    'await => {};',
    'class await {}',
    'class C { constructor(await) {} }',
    'class C { m(await) {} }',
    'class C { static m(await) {} }',
    'class C { *m(await) {} }',
    'class C { static *m(await) {} }',
    '(class await {})',
    '(class { constructor(await) {} });',
    '(class { m(await) {} });',
    '(class { static m(await) {} });',
    '(class { *m(await) {} });',
    '(class { static *m(await) {} });',
    '({ m(await) {} });',
    '({ *m(await) {} });',
    '({ set p(await) {} });',
    'try {} catch (await) {}',
    'try {} catch (await) {} finally {}'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  // Tests 'await' with module goal

  for (const arg of [
    '({}).await;',
    '({ await: null });',
    '({ await() {} });',
    '({ get await() {} });',
    '({ set await(x) {} });',
    '(class { await() {} });',
    '(class { static await() {} });',
    '(class { *await() {} });',
    '(class { static *await() {} });'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  const inValids: Array<[string, Context]> = [
    ['function call(foo=await bar){}', Context.Empty],
    ['function call(foo=await bar=10){}', Context.Empty],
    ['5 + (await bar())', Context.Empty],
    ['function call(foo= 5 + (await bar())){}', Context.Empty],
    ['async (x = 1) => {"use strict"}', Context.Empty],
    ['async(x = await) => {  }', Context.Empty],
    ['async function x(){ function y(s=await foo){}}', Context.Empty],
    ['async(a = await => {}) => {};', Context.Empty],
    ['async function f(){ let y = x => await x; }', Context.Empty],
    ['let f = () => (y=await foo) => y;', Context.Empty],
    ['async function f(){ await foo\n/foo/ }', Context.Empty],
    ['async () => { var await; }', Context.Empty],
    ['async function f(){ new await x; }', Context.Empty],
    ['async function f(){ [new await foo] }', Context.Empty],
    ['async function f(){ (new await foo) }', Context.Empty],
    ['async function f(){ await; ', Context.Empty],
    ['async function f(){ await; }', Context.Empty],
    ['function await(){}', Context.Module],
    ['async function await(){}', Context.Module],
    ['function *await(){}', Context.Module],
    ['async function *await(){}', Context.Module],
    ['let x = function await(){}', Context.Module],
    ['let x = async function await(){}', Context.Empty],
    ['let x = function *await(){}', Context.Module],
    ['class x {f(await){}}', Context.Module],
    ['let o = {*f(await){}}', Context.Module],
    ['let o = {f(await){}}', Context.Module],
    ['class x {f(await){}}', Context.Module],
    ['function f(await){}', Context.Module],
    ['let o = {async *f(await){}}', Context.Empty],
    ['let o = {async f(await){}}', Context.Empty],
    ['let x = async function *f(await){}', Context.Empty],
    ['let x = function *f(await){}', Context.Module],
    ['let x = async function f(await){}', Context.Empty],
    ['let x = function f(await){}', Context.Module],
    ['async function *f(await){}', Context.Empty],
    ['function *f(await){}', Context.Module],
    ['async function f(){  async (await) => x  }', Context.Empty],
    ['function *f(){  async (await) => x  }', Context.Empty],
    //['function *f(){  foo(await)  }', Context.Module],
    ['async function f(foo = await bar){}', Context.Empty],
    ['function *f(foo = await bar){}', Context.Empty],
    ['async function *f(foo = await bar){}', Context.Empty],
    ['let x = function f(foo = await bar){}', Context.Empty],
    ['let x = async function f(foo = await bar){}', Context.Empty],
    ['let x = function *f(foo = await bar){}', Context.Empty],
    ['let x = async function *f(foo = await bar){}', Context.Empty],
    ['let o = {f(foo = await bar){}}', Context.Empty],
    ['let o = {async f(foo = await bar){}}', Context.Empty],
    ['let o = {*f(foo = await bar){}}', Context.Empty],
    ['let o = {async *f(foo = await bar){}}', Context.Empty],
    ['class x {f(foo = await bar){}}', Context.Empty],
    ['class x {async f(foo = await bar){}}', Context.Empty],
    ['class x {*f(foo = await bar){}}', Context.Empty],
    ['class x {*f(foo = await bar){}}', Context.Empty],
    ['function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['async function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['async function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = async function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = async function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let o = {f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['let o = {async f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['let o = {*f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['let o = {async *f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['class x {f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['class x {async f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['class x {*f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['class x {async *f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['(foo = await bar) => {}', Context.Empty],
    ['async (foo = await bar) => {}', Context.Empty],
    ['async (foo = await bar);', Context.Empty],
    ['({x} = await bar) => {}', Context.Empty],
    ['async ({x} = await bar) => {}', Context.Empty],
    ['async ({x} = await bar);', Context.Empty],
    ['([x] = await bar) => {}', Context.Empty],
    ['async ([x] = await bar) => {}', Context.Empty],
    ['async (foo = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['({o} = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ({o} = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]);', Context.Empty],
    ['async function g(){    function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){async function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){async function *f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = function f(foo = await bar){}    }', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]);', Context.Empty],
    ['async function g(){    function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){async function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){async function *f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = function f(foo = await bar){}    }', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]);', Context.Empty],
    ['async function g(){    function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){async function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){async function *f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = async function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = function *f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = async function *f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let o = {f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {async f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {*f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {async *f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){class x {f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){class x {async f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){class x {*f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){async function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){async function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let x = function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['sync function g(){let x = async function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let o = {f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let o = {async f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let o = {*f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let o = {async *f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){class x {f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){class x {async f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['var C = class await {};', Context.Module],
    ['async function a(){     (foo = await bar) => {}     }', Context.Empty],
    ['async function g(){class x {async *f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function a(){     ({r} = await bar) => {}     }', Context.Empty],
    ['async function a(){     async ({r} = await bar) => {}     }', Context.Empty],
    ['async function a(){     ([v] = await bar) => {}     }', Context.Empty],
    ['async function a(){     async ([v] = await bar) => {}     }', Context.Empty],
    // ['async function f(){    (fail = class A {[await foo](){}; "x"(){}}) => {}    }', Context.Empty],
    //['async function f(){    (fail = class A extends await foo {}) => fail    }', Context.Empty],
    // ['async function f(){    (fail = class A extends (await foo) {}) => fail    }', Context.Empty],
    // ['async function f(){    async function f(){   (a= {[await foo](){}, "x"(){}} ) => a    }    }', Context.Empty],
    ['async function foo() { return {await} };', Context.Empty],
    ['async function wrap() { async function await() { } };', Context.Empty],
    ['function* wrap() { async(a = yield b) => a };', Context.Empty],
    ['async function f() { let await; }', Context.Empty],
    ['a = async function () { async function await() {} }', Context.Empty],
    ['(async function(await b){})', Context.Empty],
    ['async (foo = await bar) => {}', Context.Empty],
    ['(foo = await bar) => {}', Context.Empty],
    ['async (foo = await bar);', Context.Empty],
    ['({x} = await bar) => {}', Context.Empty],
    ['async ({x} = await bar) => {}', Context.Empty],
    ['async ({x} = await bar);', Context.Empty],
    ['([x] = await bar) => {}', Context.Empty],
    ['async ([x] = await bar) => {}', Context.Empty],
    ['async ([x] = await bar);', Context.Empty],
    ['function call(foo=await bar=10){}', Context.Empty],
    ['async function x(){ function y(s=await foo){}}', Context.Empty],
    ['async(a = await => {}) => {};', Context.Empty],
    ['async function f(){ let y = x => await x; }', Context.Empty],
    ['let f = () => (y=await foo) => y;', Context.Empty],
    ['async function f(){ await foo\n/foo/ }', Context.Empty],
    ['async () => { var await; }', Context.Empty],
    ['class x {f(await){}}', Context.Module],
    ['let o = {*f(await){}}', Context.Module],
    ['let o = {f(await){}}', Context.Module],
    ['class x {f(await){}}', Context.Module],
    ['function f(await){}', Context.Module],
    ['let o = {async *f(await){}}', Context.Empty],
    ['let o = {async f(await){}}', Context.Empty],
    ['let x = async function *f(await){}', Context.Empty],
    ['let x = function *f(await){}', Context.Module],
    ['async function g(){let x = function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){async function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){async function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){    function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){class x {async *f(foo = await bar){}}    }', Context.Empty],
    ['a[await p];', Context.Empty],
    ['var lambdaParenNoArg = await () => x < y;', Context.Empty],
    ['var lambdaArgs = await async (a, b ,c) => a + b + c;', Context.Empty],
    // ['var lambdaArgs = await (async (a, b ,c) => a + b + c);', Context.Empty],
    ['function () { "use strict"; eval("async function af(a, b = await a) { }', Context.Empty],
    ['var af = async\nfunction () { }', Context.Empty]
  ];

  fail('Expressions - Template', inValids);

  const valids: Array<[string, Context, any]> = [
    [
      'async function f(){ if (await \n x) {} }',
      Context.Empty,
      {
        body: [
          {
            async: true,
            body: {
              body: [
                {
                  alternate: null,
                  consequent: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  test: {
                    argument: {
                      name: 'x',
                      type: 'Identifier'
                    },
                    type: 'AwaitExpression'
                  },
                  type: 'IfStatement'
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
      'let o = {await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'await = 1',
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
                name: 'await'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ]
      }
    ],
    [
      'await - 25',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'await'
              },
              right: {
                type: 'Literal',
                value: 25
              },
              operator: '-'
            }
          }
        ]
      }
    ],
    [
      'call(await)',
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
                name: 'call'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'await'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(function *await(){})',
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
                body: []
              },
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'await'
              }
            }
          }
        ]
      }
    ],
    [
      'call(await())',
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
                name: 'call'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'await'
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
      'call(await[1])',
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
                name: 'call'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'await'
                  },
                  computed: true,
                  property: {
                    type: 'Literal',
                    value: 1
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function f(x = await){}',
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
                  type: 'Identifier',
                  name: 'await'
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
      'async function a(){     async ({r} = await bar);     }',
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
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'r'
                              },
                              value: {
                                type: 'Identifier',
                                name: 'r'
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'bar'
                          }
                        }
                      }
                    ]
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
      'let y = async x => { await x; }',
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
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x'
                          }
                        }
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
                  async: true,
                  expression: false
                },
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
      'async function f(){ await foo\n/foo/g }',
      Context.Empty,
      {
        body: [
          {
            async: true,
            body: {
              body: [
                {
                  expression: {
                    left: {
                      left: {
                        argument: {
                          name: 'foo',
                          type: 'Identifier'
                        },
                        type: 'AwaitExpression'
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
      'function await(){}',
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
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'async function await(){}',
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
      'function *await(){}',
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'let x = function *await(){}',
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: false,
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'await'
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'class x {async await(){}}',
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
                    name: 'await'
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
        ]
      }
    ],
    [
      'class x {await(){}}',
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'await',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: false,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'x',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'class x {*await(){}}',
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
                    name: 'await'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: true,
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
      'class x {async *await(){}}',
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
                    name: 'await'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
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
          }
        ]
      }
    ],
    [
      'function f(await){}',
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
                name: 'await'
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
      'let x = function f(await){}',
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
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'Identifier',
                      name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {f(await){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
                            type: 'Identifier',
                            name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'class x {f(await){}}',
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
                    name: 'f'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'await'
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
      'async function a(){     async (foo = [{m: 5 + t(await bar)}]);     }',
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
                          name: 'foo'
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
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
      'async function a(){     async ({g} = [{m: 5 + t(await bar)}]);     }',
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
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'g'
                              },
                              value: {
                                type: 'Identifier',
                                name: 'g'
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
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
      'let y = async x => await x',
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
                    type: 'AwaitExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'x'
                    }
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
                },
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
      'async function f(){ await foo; }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
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
        ]
      }
    ],
    [
      'async function f(){ await await foo; }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'AwaitExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    }
                  }
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
        ]
      }
    ],
    [
      'await',
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
      'await()',
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
                name: 'await'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'await[x]',
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
                type: 'Identifier',
                name: 'await'
              },
              computed: true,
              property: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ]
      }
    ],
    [
      'await = 16',
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
                name: 'await'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 16
              }
            }
          }
        ]
      }
    ],
    [
      'await - 25',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'await'
              },
              right: {
                type: 'Literal',
                value: 25
              },
              operator: '-'
            }
          }
        ]
      }
    ],
    [
      'call(await)',
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
                name: 'call'
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'await'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'call(await())',
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
                name: 'call'
              },
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'await'
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
      'call(await[1])',
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
                name: 'call'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'await'
                  },
                  computed: true,
                  property: {
                    type: 'Literal',
                    value: 1
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'call(await.foo)',
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
                name: 'call'
              },
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'await'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function call(await){}',
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
                name: 'await'
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
              name: 'call'
            }
          }
        ]
      }
    ],
    [
      'function call(foo=await){}',
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
                  name: 'foo'
                },
                right: {
                  type: 'Identifier',
                  name: 'await'
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
              name: 'call'
            }
          }
        ]
      }
    ],
    [
      'async(await);',
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
                  type: 'Identifier',
                  name: 'await'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'async function f(){ async(await x); }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async'
                    },
                    arguments: [
                      {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'x'
                        }
                      }
                    ]
                  }
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
        ]
      }
    ],
    [
      '(await())',
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
                name: 'await'
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'function await(){}',
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
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'async function await(){}',
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
      'function *await(){}',
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
            generator: true,

            id: {
              type: 'Identifier',
              name: 'await'
            }
          }
        ]
      }
    ],
    [
      'let x = function await(){}',
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'await'
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {async await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {*await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        async: false,
                        generator: true,

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
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {async *await(){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        async: true,
                        generator: true,

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
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'function f(await){}',
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
                name: 'await'
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
      'function *f(await){}',
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
                name: 'await'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
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
      'let o = {*f(await){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
                            type: 'Identifier',
                            name: 'await'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        async: false,
                        generator: true,

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
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '(await) => x',
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
                  name: 'await'
                }
              ],
              id: null,
              async: false,
              expression: true
            }
          }
        ]
      }
    ],
    [
      'async(await)',
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
                  type: 'Identifier',
                  name: 'await'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function *f(){  (await) => x  }',
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
                        name: 'await'
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
      'function *f(){  foo(await)  }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'await'
                      }
                    ]
                  }
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
      'function f(foo = await){}',
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
                  name: 'foo'
                },
                right: {
                  type: 'Identifier',
                  name: 'await'
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
      'function *f(foo = await){}',
      Context.Empty,
      {
        body: [
          {
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },

            generator: true,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [
              {
                left: {
                  name: 'foo',
                  type: 'Identifier'
                },
                right: {
                  name: 'await',
                  type: 'Identifier'
                },
                type: 'AssignmentPattern'
              }
            ],
            type: 'FunctionDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'let x = function f(foo = await){}',
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
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let x = function *f(foo = await){}',
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
                    body: [],
                    type: 'BlockStatement'
                  },
                  generator: true,
                  id: {
                    name: 'f',
                    type: 'Identifier'
                  },
                  params: [
                    {
                      left: {
                        name: 'foo',
                        type: 'Identifier'
                      },
                      right: {
                        name: 'await',
                        type: 'Identifier'
                      },
                      type: 'AssignmentPattern'
                    }
                  ],
                  type: 'FunctionExpression'
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
      'let o = {f(foo = await){}}',
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            right: {
                              type: 'Identifier',
                              name: 'await'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'let o = {*f(foo = await){}}',
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'o',
                  type: 'Identifier'
                },
                init: {
                  properties: [
                    {
                      computed: false,
                      key: {
                        name: 'f',
                        type: 'Identifier'
                      },
                      kind: 'init',
                      method: true,
                      shorthand: false,
                      type: 'Property',
                      value: {
                        async: false,
                        body: {
                          body: [],
                          type: 'BlockStatement'
                        },

                        generator: true,
                        id: null,
                        params: [
                          {
                            left: {
                              name: 'foo',
                              type: 'Identifier'
                            },
                            right: {
                              name: 'await',
                              type: 'Identifier'
                            },
                            type: 'AssignmentPattern'
                          }
                        ],
                        type: 'FunctionExpression'
                      }
                    }
                  ],
                  type: 'ObjectExpression'
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
      'async function a(){     async ([v] = await bar);     }',
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
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'v'
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'bar'
                          }
                        }
                      }
                    ]
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
      'async function a(){     async (foo = [{m: 5 + t(await bar)}]);     }',
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
                          name: 'foo'
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
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
      'async function a(){     async ({g} = [{m: 5 + t(await bar)}]);     }',
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
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'g'
                              },
                              value: {
                                type: 'Identifier',
                                name: 'g'
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
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
      'async function a(){     async ([y] = [{m: 5 + t(await bar)}]);     }',
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
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'y'
                            }
                          ]
                        },
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm'
                                  },
                                  value: {
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5
                                    },
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't'
                                      },
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar'
                                          }
                                        }
                                      ]
                                    },
                                    operator: '+'
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
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
    ]
  ];

  pass('Expressions - Call (pass)', valids);
});

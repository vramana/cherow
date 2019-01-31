import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Yield', () => {
  const StrictErrors = [
    'var yield;',
    'var foo, yield;',
    'try { } catch (yield) { }',
    'function yield() { }',
    '(function yield() { })',
    'function foo(yield) { }',
    'function foo(bar, yield) { }',
    'function * yield() { }',
    '(function * yield() { })',
    'yield = 1;',
    'var foo = yield = 1;',
    '++yield;',
    'yield++;',
    'yield: 34;'
  ];

  for (const arg of StrictErrors) {
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
      });
    });

    it(`"use strict"; function foo() { ${arg}}`, () => {
      t.throws(() => {
        parseSource(`"use strict"; function foo() { ${arg}}`, undefined, Context.Empty);
      });
    });

    it(`function foo() { "use strict"; ${arg} }`, () => {
      t.throws(() => {
        parseSource(`function foo() { "use strict"; ${arg} }`, undefined, Context.Empty);
      });
    });

    it(`"use strict"; (function foo() {${arg}})`, () => {
      t.throws(() => {
        parseSource(`"use strict"; (function foo() {${arg}})`, undefined, Context.Empty);
      });
    });

    it(`"use strict"; (function * gen() { function foo() { ${arg}} }`, () => {
      t.throws(() => {
        parseSource(`"use strict"; (function * gen() { function foo() { ${arg}} }`, undefined, Context.Empty);
      });
    });

    it(`"use strict"; (function * gen() { (function foo() { ${arg}}) })`, () => {
      t.throws(() => {
        parseSource(`"use strict"; (function * gen() { (function foo() { ${arg}}) })`, undefined, Context.Empty);
      });
    });
  }

  const invalidSyntax = [
    'var obj = { *g(yield) {} };',
    'function *a(){yield\n*a}',
    'var obj = { *g(yield) {} };',
    'function *g() { try {} catch (yield) {} }',
    '(function *(x, ...yield){})',
    'function *g(a, b, c, ...yield){}',
    'function *g() { try {} catch (yield) {} }',
    '(function *(x, ...yield){})',
    'function *g(a, b, c, ...yield){}',
    '"use strict"; (yield) => 42',
    `var obj = { *g(yield) {} };`,
    'class C { gm*() { } }',
    // yield expressions cannot appear higher than assignment level precedence
    'function* gf() { 1 + yield; }',
    'function* gf() { 1 + yield 2; }',
    "function* gf() { 1 + yield* 'foo'; }",
    'function* gf() { +yield; }',
    'function* gf() { +yield 2; }',
    'function* gf() { yield++; }',
    'function* gf() { (yield) = 10; }',
    'let f = function *f(x=yield 100) {}',
    'class A {f(x=yield 100) {}}',
    'class A {async f(x=yield 100) {}}',
    'o = {*f(x=yield 100) {}}',
    'async function as(){ function *f(x=yield 100) {} }',
    'async function as(){ o = {*f(x=yield 100) {}} }',
    'function *as(){ let f = function f(x=yield 100) {} }',
    'function *as(){ class A {f(x=yield 100) {}} }',
    'function *as(){ o = {*f(x=yield 100) {}} }',
    'function *f(){  return (x=yield y) => x;  }',
    'function *f(){  class x{*foo(a=yield x){}}  }',
    'function *f(){  x = {*foo(a=yield x){}}  }',
    'function f(){  return *(x=yield y) => x;  }',
    'function f(){  return function*(x=yield y) {};  }',
    'function f(){  class x{*foo(a=yield x){}}  }',
    'function f(){  x = {*foo(a=yield x){}}  }',
    'function f(){  return (x=yield y) => x;  }',
    //    'function f(){  return function(x=yield y) {};  }',
    'function f(){  class x{foo(a=yield x){}}  }',
    //    'function f(){  x = {foo(a=yield x){}}  }',
    'function *f(){  return (x=yield) => x;  }',
    'function *f(){  class x{constructor(a=yield){}}  }',
    //    'function *f(){  x = {foo(a=yield x){}}  }',
    'function *f(){  return *(x=yield) => x;  }',
    'function *f(){  class x{*foo(a=yield){}}  }',
    'function f(){  return *(x=yield) => x;  }',
    'function* gf() { (yield)++; }',
    'function *gf(){ function yield(){}; }',
    'function *gf(){ var yield; }',
    'function *gf(yield){}',
    'function *f(x=yield 100) {}',
    'function *gf() { let yield; }',
    'function* gf() { const yield = 10; }',
    'function* gf() { function yield() { } }',
    'function* gf() { function* yield() { } }',
    //'function *gf() { (a = (yield) => {}) => {}; }',
    // yield binding is disallowed in object destructuring in generators
    'function *gf({yield}){}',
    'function*g([yield]){}',
    'function*g({a: yield}){}',
    'function*g(yield = 0){}',
    // 'yield' is a keyword and disallowed within arrow function parameter syntax
    'function* gf() { var a = (x, y = yield* 0, z = 0) => { }; }',
    'function* gf() { var a = (x, y = yield 0, z = 0) => { }; }',
    'function* gf() { var a = (x, y = yield, z = 0) => { }; }',
    'function* gf() { var a = (x = yield) => { }; }',
    // 'function* gf() { var a = (x, yield, y) => { }; }',
    // 'function* gf() { var a = (x, y, yield) => { }; }',
    'function* gf() { var a = yield => { }; }',
    // 'function* gf() { var a = (yield) => { }; }',
    // 'function* gf() { var a = (x, y, yield) => { }; }',
    'function* gf() { var a = (x = yield 0) => { }; }',
    'function* gf() { var gfe = function* yield() { } }',
    'function* gf() { class yield { } }',
    'function* a(a=yield){}',
    `"use strict"; function not_gen() { (function yield() { }) }`,
    '"use strict"; function not_gen() { function foo(bar, yield) { } }',
    '"use strict"; function not_gen() { try { } catch (yield) { } }',
    '"use strict"; function not_gen() { function yield() { } }',
    '"use strict"; var [yield] = [42];',
    '"use strict"; function not_gen() { function yield() { } }',
    'function test_func() { "use strict"; function * yield() { } }',
    'function test_func() { "use strict"; function * yield() { } }',
    '"use strict"; function * gen() { function not_gen() { function foo(yield) { } }',
    '"use strict"; function * gen() { function not_gen() {  yield = 1;}',
    '"use strict"; function * gen() { function not_gen() { try { } catch (yield) { } }',
    'function *a(){yield*}',
    '(a = yield 3) {}',
    '(a=yield) {}',
    '(yield 3) {}',
    '(a = yield) {}',
    '(yield = 1) {}',
    '(yield) {}',
    // "It is a SyntaxError if formal parameters' default argument expressions contain a yield expression"
    'function *gf(b, a = 1 + yield) {}',
    'function *gf(b, yield) {}',
    'function *gf(a = (10, yield, 20)) {}',
    'gf = function* (b, a = yield) {}',
    'gf = function* (b, yield) {}',
    'var obj = { *gf(b, a = yield) {} }',
    'var obj = { *gf(b, yield) {} }'
  ];

  for (const arg of invalidSyntax) {
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

  for (const arg of [
    'x=yield',
    'x, y=yield',
    '{x=yield}',
    '[x=yield]',

    'x=(yield)',
    'x, y=(yield)',
    '{x=(yield)}',
    '[x=(yield)]',

    'x=f(yield)',
    'x, y=f(yield)',
    '{x=f(yield)}',
    '[x=f(yield)]',

    '{x}=yield',
    '[x]=yield',

    '{x}=(yield)',
    '[x]=(yield)',

    '{x}=f(yield)',
    '[x]=f(yield)',
    // Because classes are always in strict mode, these are always errors.
    'x = class extends (yield) { }',
    'x = class extends f(yield) { }',
    'x = class extends (null, yield) { }',
    'x = class extends (a ? null : yield) { }',
    '[x] = [class extends (a ? null : yield) { }]',
    '[x = class extends (a ? null : yield) { }]',
    '[x = class extends (a ? null : yield) { }] = [null]',
    'x = class { [yield]() { } }',
    'x = class { static [yield]() { } }',
    'x = class { [(yield, 1)]() { } }',
    'x = class { [y = (yield, 1)]() { } }'
  ]) {
    it(`(function *g(${arg}) { });`, () => {
      t.throws(() => {
        parseSource(`(function *g(${arg}) { });`, undefined, Context.Empty);
      });
    });

    it(`"use strict"; (function *g(${arg}) { });`, () => {
      t.throws(() => {
        parseSource(`"use strict"; (function *g(${arg}) { });`, undefined, Context.Empty);
      });
    });

    it(`(function *g(${arg}) { });`, () => {
      t.throws(() => {
        parseSource(`(function *g(${arg}) { });`, undefined, Context.Empty);
      });
    });

    //it(`(function *g() { (${arg}) => {} });`, () => {
    //t.throws(() => {
    //parseSource(`(function *g() { (${arg}) => {} });`, undefined, Context.Strict | Context.Module);
    //});
    //});
  }

  const inValids: Array<[string, Context]> = [
    ['yield;', Context.Strict | Context.Module],
    ['({a(b, b){}})', Context.Strict],
    ['({a(b, b){ "use strict"; }})', Context.Empty],
    ['"use strict"; ({a(b, b){}})', Context.Empty],
    ['function *g() { (x = x + yield); }', Context.Empty],
    ['function *g() { (x = x + yield y); }', Context.Empty],
    ['function *g() { (x = x + yield) => x; }', Context.Empty],
    ['function *g() { (x = x + yield y) => x; }', Context.Empty],
    //  ['function *g() { (x = x + foo(a, yield y)) => x; }', Context.Empty],
    // ['function *g(){ (x = [yield]) => z }', Context.Empty],
    // ['function *g(){ (x = [yield y]) => z }', Context.Empty],
    ['{ yield = {}; }', Context.Strict],
    ['{ (x = x + yield); }', Context.Strict],
    ['{ (x = x + yield) => x; }', Context.Strict],
    ['{ (x = yield) => {}; }', Context.Strict],
    ['{ yield => {}; }', Context.Strict],
    ['{ (x = {[yield]: 1}) }', Context.Strict],
    ['{ (x = x + foo(a, yield y)); }', Context.Strict],
    ['{ (x = {[yield]: 1}) }', Context.Strict],
    ['{ (x = {[yield]: 1}) => z }', Context.Strict],
    ['{ (x = [yield]) ', Context.Strict],
    //   ['{ (x = [yield]) => z }', Context.Empty],
    ['function *g() { async (x = x + yield); }', Context.Empty],
    ['function *g() { async (x = x + yield y); }', Context.Empty],
    ['function *g() { async (x = x + yield) => x; }', Context.Empty],
    ['function *g() { async (x = x + yield y) => x; }', Context.Empty],
    //    ['function *g() { async (x = x + foo(a, yield y)) => x; }', Context.Empty],
    //    ['function *g(){ async (x = {[yield]: 1}) => z }', Context.Empty],
    //    ['function *g(){ async (x = {[yield y]: 1}) => z }', Context.Empty],
    //    ['function *g(){ async (x = [yield]) => z }', Context.Empty],
    //    ['function *g(){ async (x = [yield y]) => z }', Context.Empty],
    ['function *f({x: x}) { function f({x: yield}) {} }', Context.Strict],
    ['async (x = yield) => {}', Context.Strict],
    ['async (yield)', Context.Strict],
    ['async (x = yield)', Context.Strict],
    ['async (x = (yield)) => {}', Context.Strict],
    ['async (x = z = yield) => {}', Context.Strict],
    ['async (x = z = yield)', Context.Strict],
    ['iter = yield();', Context.Strict],
    ['function *g() { (x = u + yield z) => {}; }', Context.Empty],
    ['function *g() { function f(x = x + yield) {}; }', Context.Strict],
    ['function *g() { function f(x = x + yield y) {}; }', Context.Strict],
    ['function *f(){  class x{constructor(a=yield x){}}  }', Context.Strict],
    ['function *f(){  class x{foo(a=yield x){}}  }', Context.Empty],
    // ['function *f(){  return function(x=yield y) {};  }', Context.Empty],
    //  ['function *f(){  return (x=yield y) => x;  }', Context.Empty],
    ['function *f(){  return *(x=yield y) => x;  }', Context.Empty],
    ['function *f(){  return function*(x=yield y) {};  }', Context.Empty],
    ['function *f(){  class x{*foo(a=yield x){}}  }', Context.Empty],
    ['function *f(){  x = {*foo(a=yield x){}}  }', Context.Empty],
    ['function f(){  return *(x=yield y) => x;  }', Context.Empty],
    ['function f(){  return function*(x=yield y) {};  }', Context.Empty],
    //['function f(){  return function(x=yield y) {};  }', Context.Empty],
    ['function f(){  class x{foo(a=yield x){}}  }', Context.Empty],
    // ['function f(){  x = {foo(a=yield x){}}  }', Context.Empty],
    // ['function *f(){  return (x=yield) => x;  }', Context.Empty],
    ['function *f(){  class x{constructor(a=yield){}}  }', Context.Empty],
    // ['function *f(){  x = {foo(a=yield x){}}  }', Context.Empty],
    ['function *f(){  return *(x=yield) => x;  }', Context.Empty],
    ['function *f(){  return function*(x=yield) {};  }', Context.Empty],
    ['function *f(){  class x{*foo(a=yield){}}  }', Context.Empty],
    //['function *g() { (x = yield) => {}; }', Context.Empty],
    ['function *g() { yield => {}; }', Context.Empty],
    ['function* f(){ yield\n/foo }', Context.Empty],
    ['function *f(){  class x{*foo(a=yield){}}  }', Context.Empty],
    ['function *f(){  x = {*foo(a=yield){}}  }', Context.Empty],
    ['function f(){  return *(x=yield) => x;  }', Context.Empty],
    ['function f(){  class x{*foo(a=yield){}}  }', Context.Empty],
    ['function f(){  x = {*foo(a=yield){}}  }', Context.Empty],
    ['function f(){  return (x=yield) => x;  }', Context.Strict],
    ['function f(){  return function(x=yield) {};  }', Context.Strict],
    ['function f(){  class x{foo(a=yield){}}  }', Context.Strict],
    ['function f(){  x = {foo(a=yield){}}  }', Context.Strict],
    ['function *f(){  class x extends yield y{}  }', Context.Empty],
    ['function *f() {  return delete yield;  }', Context.Empty],
    ['function *f() {  return void yield;  }', Context.Empty],
    ['function *f() {  return typeof yield;  }', Context.Empty],
    ['fuction *f() {  return +yield;  }', Context.Empty],
    ['fuction *f() {  return -yield;  }', Context.Empty],
    ['fuction *f() {  return ~yield;  }', Context.Empty],
    ['fuction *f() {  return await yield;  }', Context.Empty],
    ['function *f() {  return delete yield foo;  }', Context.Empty],
    ['function *f() {  return void yield foo;  }', Context.Empty],
    ['function *f() {  return typeof yield foo;  }', Context.Empty],
    ['fuction *f() {  return +yield foo;  }', Context.Empty],
    ['fuction *f() {  return -yield foo;  }', Context.Empty],
    ['function* g() { (function yield() {}) }', Context.Strict],
    ['({ *g1() {   return {yield}  }})', Context.Empty],
    ['({yield})', Context.Strict],
    ['({yield}) => x', Context.Strict],
    ['({yield} = x)', Context.Strict],
    ['([yield])', Context.Strict],
    ['([yield]) => x', Context.Strict]
    // ['([yield] = x)', Context.Empty],
    // ['(yield) => x', Context.Empty],
    // ['yield => x', Context.Empty],
    // ['([yield]) => x', Context.Empty],
    //  ['([x, {y: [yield]}]) => x', Context.Empty],
  ];

  fail('Expressions - Yield', inValids);

  pass('Expressions - Yield (pass)', [
    [
      'function* f(){ yield\n/foo/ }',
      Context.Empty,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  expression: {
                    argument: null,
                    delegate: false,
                    type: 'YieldExpression'
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
              type: 'BlockStatement'
            },
            generator: true,
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
      'function *g() { (x = x + foo(a, yield y)); }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    right: {
                      type: 'BinaryExpression',
                      operator: '+',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'CallExpression',
                        callee: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        arguments: [
                          {
                            type: 'Identifier',
                            name: 'a'
                          },
                          {
                            type: 'YieldExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'y'
                            },
                            delegate: false
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            },
            generator: true,
            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function *g(){ (x = {[yield]: 1}) }',
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
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          },
                          value: {
                            type: 'Literal',
                            value: 1
                          },
                          kind: 'init',
                          computed: true,
                          method: false,
                          shorthand: false
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g(){ (x = {[yield y]: 1}) }',
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
                            type: 'YieldExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'y'
                            },
                            delegate: false
                          },
                          value: {
                            type: 'Literal',
                            value: 1
                          },
                          kind: 'init',
                          computed: true,
                          method: false,
                          shorthand: false
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g(){ (x = [yield]) }',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],

    [
      '{ yield = {}; }',
      Context.Empty,
      {
        body: [
          {
            body: [
              {
                expression: {
                  left: {
                    name: 'yield',
                    type: 'Identifier'
                  },
                  operator: '=',
                  right: {
                    properties: [],
                    type: 'ObjectExpression'
                  },
                  type: 'AssignmentExpression'
                },
                type: 'ExpressionStatement'
              }
            ],
            type: 'BlockStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '{ yield => {}; }',
      Context.Empty,
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'yield'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: false
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ (x = yield); }',
      Context.Empty,
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'yield'
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ (x = x + yield); }',
      Context.Empty,
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'yield'
                    },
                    operator: '+'
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ (x = x + yield) => x; }',
      Context.Empty,
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'yield'
                        },
                        operator: '+'
                      }
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'function* g() { (function yield() {}) }',
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
                      name: 'yield'
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *f(){  class x extends (yield y){}  }',
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
                  type: 'ClassDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  superClass: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    delegate: false
                  },
                  body: {
                    type: 'ClassBody',
                    body: []
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
      'function *f(){  class x{[yield foo](a){}}  }',
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
                        computed: true,
                        key: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'foo'
                          },
                          delegate: false
                        },
                        value: {
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
                          async: false,
                          generator: false,
                          id: null
                        }
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
      'function *f() { 1 ? 2 : yield 3; }',
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1
                    },
                    consequent: {
                      type: 'Literal',
                      value: 2
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3
                      },
                      delegate: false
                    }
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
      'function *f() { 1 ? yield 2 : 3; }',
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 2
                      },
                      delegate: false
                    },
                    alternate: {
                      type: 'Literal',
                      value: 3
                    }
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
      'function *f() { 1 ? yield : 1 ; }',
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    },
                    alternate: {
                      type: 'Literal',
                      value: 1
                    }
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
      'function *f() { 1 ? 1 : yield ; }',
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1
                    },
                    consequent: {
                      type: 'Literal',
                      value: 1
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    }
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
      '([yield]) => x',
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'yield'
                    }
                  ]
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
      '([yield])',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'yield'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '({ *g1() {   [yield]  }})',
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
                    name: 'g1'
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
                            type: 'ArrayExpression',
                            elements: [
                              {
                                type: 'YieldExpression',
                                argument: null,
                                delegate: false
                              }
                            ]
                          }
                        }
                      ]
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
            }
          }
        ]
      }
    ],
    [
      '({yield} = x)',
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'yield'
                    },
                    value: {
                      type: 'Identifier',
                      name: 'yield'
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
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ]
      }
    ],
    [
      '({yield}) => x',
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
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'yield'
                      },
                      value: {
                        type: 'Identifier',
                        name: 'yield'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    }
                  ]
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
      '({yield})',
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
                    name: 'yield'
                  },
                  value: {
                    type: 'Identifier',
                    name: 'yield'
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
      '({ *g1() {   return {x: yield}  }})',
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
                    name: 'g1'
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
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'x'
                                },
                                value: {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false
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
            }
          }
        ]
      }
    ],
    [
      '({ *g1() {   return {x: yield 1}  }})',
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
                    name: 'g1'
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
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'x'
                                },
                                value: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Literal',
                                    value: 1
                                  },
                                  delegate: false
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
            }
          }
        ]
      }
    ],
    [
      '(yield = x)',
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
                name: 'yield'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ]
      }
    ],
    [
      '(x = yield = x)',
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
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'yield'
                },
                operator: '=',
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            }
          }
        ]
      }
    ],
    [
      'yield = x',
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
                name: 'yield'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ]
      }
    ],
    [
      '([x, {y: [yield]}] = z)',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  },
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        value: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'yield'
                            }
                          ]
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ]
      }
    ],
    [
      '([x, {y: [yield]}])',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'x'
                },
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      value: {
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'yield'
                          }
                        ]
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
    ],
    [
      'function foo() { function *g() { yield ~x } }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'UnaryExpression',
                            operator: '~',
                            argument: {
                              type: 'Identifier',
                              name: 'x'
                            },
                            prefix: true
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'g'
                  }
                }
              ]
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
      'function foo() { function a(){({*[yield](){}})} }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
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
                                name: 'yield'
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
                              computed: true,
                              method: true,
                              shorthand: false
                            }
                          ]
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: false,

                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
      'function foo() { function *a(){yield ++a;} }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'UpdateExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            operator: '++',
                            prefix: true
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
      'function foo() { ({ get yield() { 1 } }) }',
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
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'yield'
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
                                  value: 1
                                }
                              }
                            ]
                          },
                          async: false,
                          generator: false,

                          id: null
                        },
                        kind: 'get',
                        computed: false,
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
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
      'function foo() {++yield; }',
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
                    type: 'UpdateExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'yield'
                    },
                    operator: '++',
                    prefix: true
                  }
                }
              ]
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
      'function foo() { function foo(yield) { } }',
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
                      type: 'Identifier',
                      name: 'yield'
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
                    name: 'foo'
                  }
                }
              ]
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
      'function foo() {var foo, yield; }',
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
                  type: 'VariableDeclaration',
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    },
                    {
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                        type: 'Identifier',
                        name: 'yield'
                      }
                    }
                  ]
                }
              ]
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
      'function foo() { var yield; }',
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
                  type: 'VariableDeclaration',
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                        type: 'Identifier',
                        name: 'yield'
                      }
                    }
                  ]
                }
              ]
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
      '(function* f(){ yield })',
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
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
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
          }
        ]
      }
    ],
    [
      '(function* f(){ yield x + y })',
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
                      type: 'YieldExpression',
                      argument: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        operator: '+'
                      },
                      delegate: false
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
          }
        ]
      }
    ],
    [
      'function foo() { function *a(){yield delete 1}}',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'UnaryExpression',
                            operator: 'delete',
                            argument: {
                              type: 'Literal',
                              value: 1
                            },
                            prefix: true
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
      'function foo() { function*a(){yield*a} }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          delegate: true
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
      'function foo() { function * gen() { (yield) ? yield : yield } }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'ConditionalExpression',
                          test: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          },
                          consequent: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          },
                          alternate: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          }
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'gen'
                  }
                }
              ]
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
      'function foo() { (function * gen() { (function not_gen() { try { } catch (yield) { } }) }) }',
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
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
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
                                  type: 'TryStatement',
                                  block: {
                                    type: 'BlockStatement',
                                    body: []
                                  },
                                  handler: {
                                    type: 'CatchClause',
                                    param: {
                                      type: 'Identifier',
                                      name: 'yield'
                                    },
                                    body: {
                                      type: 'BlockStatement',
                                      body: []
                                    }
                                  },
                                  finalizer: null
                                }
                              ]
                            },
                            async: false,
                            generator: false,
                            id: {
                              type: 'Identifier',
                              name: 'not_gen'
                            }
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'gen'
                    }
                  }
                }
              ]
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
      'function foo() { function * gen() { yield yield a; } }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            delegate: false
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  async: false,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'gen'
                  }
                }
              ]
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
      'function foo() { function * gen() { yield * a; return } }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          delegate: true
                        }
                      },
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
                    name: 'gen'
                  }
                }
              ]
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
      'function *foo() { function b() {} function *b() {} }',
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
                  params: [],
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
                },
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
                    name: 'b'
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'function fn(x = yield* yield) {}',
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
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'yield'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield'
                  },
                  operator: '*'
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
              name: 'fn'
            }
          }
        ]
      }
    ],
    [
      'function *foo() { () => {} }',
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
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'function foo() { function *b() {} }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: false,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
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
      '(x = yield) => {}',
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
                    name: 'x'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield'
                  }
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
      'function * gen() { (yield * a) + (yield * b);; }',
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
                    type: 'BinaryExpression',
                    left: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      delegate: true
                    },
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      delegate: true
                    },
                    operator: '+'
                  }
                },
                {
                  type: 'EmptyStatement'
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'gen'
            }
          }
        ]
      }
    ],
    [
      'function * gen() { yield, yield }',
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
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false
                      },
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false
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
              name: 'gen'
            }
          }
        ]
      }
    ],
    [
      'function * gen() { (yield) ? yield : yield }',
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'gen'
            }
          }
        ]
      }
    ],
    [
      'function* a(){yield a}',
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'a'
            }
          }
        ]
      }
    ],
    [
      'function * gen() { yield /* comment */ }',
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
                    type: 'YieldExpression',
                    argument: null,
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'gen'
            }
          }
        ]
      }
    ],
    /* ['function* a(){({[yield]:a}=0)}', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "FunctionDeclaration",
          "params": [],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "ObjectPattern",
                    "properties": [
                      {
                        "type": "Property",
                        "key": {
                          "type": "YieldExpression",
                          "argument": null,
                          "delegate": false
                        },
                        "value": {
                          "type": "Identifier",
                          "name": "a"
                        },
                        "kind": "init",
                        "computed": true,
                        "method": false,
                        "shorthand": false
                      }
                    ]
                  },
                  "operator": "=",
                  "right": {
                    "type": "Literal",
                    "value": 0
                  }
                }
              }
            ]
          },
          "async": false,
          "generator": true,
          "expression": false,
          "id": {
            "type": "Identifier",
            "name": "a"
          }
        }
      ]
    }],
  */
    [
      'async function as(){ let f = function f(yield) {} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'as'
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
                      init: {
                        type: 'FunctionExpression',
                        id: {
                          type: 'Identifier',
                          name: 'f'
                        },
                        params: [
                          {
                            type: 'Identifier',
                            name: 'yield'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        generator: false,
                        async: false
                      }
                    }
                  ],
                  kind: 'let'
                }
              ]
            },
            generator: false,

            async: true
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function *as(){ function await() {} }',
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
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ function f(yield) {} }',
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
                      type: 'Identifier',
                      name: 'yield'
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
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ async function f(yield) {} }',
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
                      type: 'Identifier',
                      name: 'yield'
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
                    name: 'f'
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ function f(await) {} }',
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
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ let f = async function f(yield) {} }',
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
                            name: 'yield'
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
                          name: 'f'
                        }
                      },
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      }
                    }
                  ]
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ o = {async f(yield) {}} }',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'o'
                    },
                    operator: '=',
                    right: {
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
                                name: 'yield'
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
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ o = {f(await) {}} }',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'o'
                    },
                    operator: '=',
                    right: {
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
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ function *f() { return yield 100; } }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Literal',
                            value: 100
                          },
                          delegate: false
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
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ async function *f() { return yield 100; } }',
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
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Literal',
                            value: 100
                          },
                          delegate: false
                        }
                      }
                    ]
                  },
                  async: true,
                  generator: true,

                  id: {
                    type: 'Identifier',
                    name: 'f'
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ let f = function *f() { return yield 100; } }',
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
                          body: [
                            {
                              type: 'ReturnStatement',
                              argument: {
                                type: 'YieldExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 100
                                },
                                delegate: false
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
                      },
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      }
                    }
                  ]
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ let f = async function *f() { return yield 100; } }',
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
                          body: [
                            {
                              type: 'ReturnStatement',
                              argument: {
                                type: 'YieldExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 100
                                },
                                delegate: false
                              }
                            }
                          ]
                        },
                        async: true,
                        generator: true,
                        id: {
                          type: 'Identifier',
                          name: 'f'
                        }
                      },
                      id: {
                        type: 'Identifier',
                        name: 'f'
                      }
                    }
                  ]
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ o = {*f() { return yield 100; }} }',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'o'
                    },
                    operator: '=',
                    right: {
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
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'ReturnStatement',
                                  argument: {
                                    type: 'YieldExpression',
                                    argument: {
                                      type: 'Literal',
                                      value: 100
                                    },
                                    delegate: false
                                  }
                                }
                              ]
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
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      'function *as(){ o = {async *f() { return yield 100; }} }',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'o'
                    },
                    operator: '=',
                    right: {
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
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'ReturnStatement',
                                  argument: {
                                    type: 'YieldExpression',
                                    argument: {
                                      type: 'Literal',
                                      value: 100
                                    },
                                    delegate: false
                                  }
                                }
                              ]
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
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'as'
            }
          }
        ]
      }
    ],
    [
      '5 + yield',
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
                type: 'Literal',
                value: 5
              },
              right: {
                type: 'Identifier',
                name: 'yield'
              },
              operator: '+'
            }
          }
        ]
      }
    ],
    [
      'call(yield)',
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
                  name: 'yield'
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function* f(){ yield; }',
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
                    type: 'YieldExpression',
                    argument: null,
                    delegate: false
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
      'function* f(){ yield x; }',
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    delegate: false
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
      'function* f(){ yield x + y; }',
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      operator: '+'
                    },
                    delegate: false
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
      'function* f(){ call(yield); }',
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
                      name: 'call'
                    },
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false
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
      'function* f(){ call(yield x); }',
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
                      name: 'call'
                    },
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        delegate: false
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
      'function* f(){ call(yield x + y); }',
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
                      name: 'call'
                    },
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'BinaryExpression',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'y'
                          },
                          operator: '+'
                        },
                        delegate: false
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
      'function f(){ yield; }',
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
                    type: 'Identifier',
                    name: 'yield'
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
      'function f(){ 5 + yield }',
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
                    type: 'BinaryExpression',
                    left: {
                      type: 'Literal',
                      value: 5
                    },
                    right: {
                      type: 'Identifier',
                      name: 'yield'
                    },
                    operator: '+'
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
      'function f(){ call(yield); }',
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
                      name: 'call'
                    },
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'yield'
                      }
                    ]
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
      'function* g() { let x = yield 3; }',
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
                  type: 'VariableDeclaration',
                  kind: 'let',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 3
                        },
                        delegate: false
                      },
                      id: {
                        type: 'Identifier',
                        name: 'x'
                      }
                    }
                  ]
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function* g(x) { yield x = 3; }',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      operator: '=',
                      right: {
                        type: 'Literal',
                        value: 3
                      }
                    },
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function* g(x) { yield x = yield 3; }',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      operator: '=',
                      right: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 3
                        },
                        delegate: false
                      }
                    },
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() { (x = y = yield z) }',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      operator: '=',
                      right: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        delegate: false
                      }
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() { (x = yield); }',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    operator: '=',
                    right: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      '{ yield = {}; }',
      Context.Empty,
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'yield'
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: []
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ (x = yield); }',
      Context.Empty,
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'yield'
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'function *g() { async (x = yield); }',
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
                          name: 'x'
                        },
                        operator: '=',
                        right: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        }
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
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g(){ return x + f(yield f); }',
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
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    right: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      arguments: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'f'
                          },
                          delegate: false
                        }
                      ]
                    },
                    operator: '+'
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g(){ return x + (yield f); }',
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
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'f'
                      },
                      delegate: false
                    },
                    operator: '+'
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function f(){  return (x=yield) => x;  }',
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
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'Identifier',
                      name: 'x'
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
                          name: 'yield'
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

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(){  return function(x=yield) {};  }',
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
                          name: 'yield'
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
      'function f(){  x = {foo(a=yield){}}  }',
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
                                  type: 'Identifier',
                                  name: 'yield'
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
      'function *g() { [...yield]; }',
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
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false
                        }
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
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *f() { (yield 1) ? yield 2 : yield 3; }',
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 1
                      },
                      delegate: false
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 2
                      },
                      delegate: false
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3
                      },
                      delegate: false
                    }
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
      'function *f() { yield 1 ? 2 : 3; }',
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ConditionalExpression',
                      test: {
                        type: 'Literal',
                        value: 1
                      },
                      consequent: {
                        type: 'Literal',
                        value: 2
                      },
                      alternate: {
                        type: 'Literal',
                        value: 3
                      }
                    },
                    delegate: false
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
      '({ *g1() {   (yield)  }})',
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
                    name: 'g1'
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
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          }
                        }
                      ]
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
            }
          }
        ]
      }
    ],
    [
      '({ *g1() {   (yield 1)  }})',
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
                    name: 'g1'
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
                            type: 'YieldExpression',
                            argument: {
                              type: 'Literal',
                              value: 1
                            },
                            delegate: false
                          }
                        }
                      ]
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
            }
          }
        ]
      }
    ],
    [
      'function *g() {yield {     ...yield yield    };}',
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false
                            },
                            delegate: false
                          }
                        }
                      ]
                    },
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() {x={     ...yield yield    };}',
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
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false
                            },
                            delegate: false
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() {x={     ...yield,    };}',
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
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() {x={     ...yield x,    };}',
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
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'x'
                            },
                            delegate: false
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() {x={     ...yield yield,    };}',
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
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false
                            },
                            delegate: false
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() {yield {     ...yield yield,    };}',
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false
                            },
                            delegate: false
                          }
                        }
                      ]
                    },
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      'function *g() { yield {...(x,y),}}',
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'SequenceExpression',
                            expressions: [
                              {
                                type: 'Identifier',
                                name: 'x'
                              },
                              {
                                type: 'Identifier',
                                name: 'y'
                              }
                            ]
                          }
                        }
                      ]
                    },
                    delegate: false
                  }
                }
              ]
            },
            async: false,
            generator: true,

            id: {
              type: 'Identifier',
              name: 'g'
            }
          }
        ]
      }
    ],
    [
      '([x, {y: [yield]}])',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'x'
                },
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      value: {
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'yield'
                          }
                        ]
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
    ],
    [
      'yield => x',
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
                  name: 'yield'
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
      '([x, {y: [yield]}] = z)',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  },
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        value: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'yield'
                            }
                          ]
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ]
      }
    ]
  ]);
});

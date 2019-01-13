import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Class', () => {
  const invalidSyntax = [
    'a=0',
    'a',
    '3:0',
    '[3]:0',
    '[a,b](){}',
    '[3]:0',
    '[a,b](){}',
    '[3]:0',
    '[a,b](){}',
    'class name {',
    'get m',
    'get m',
    'get m',
    'static *method([...[ x ] = []]) {}',
    '*method([...{ x }, y] = [1, 2, 3]) {}',
    '*method([...x = []] = []) {}',
    '*method([...{ x }, y]) {}',
    '*method([...[x], y]) {}',
    '"constructor"() {} constructor() {}',
    'constructor() {} constructor() {}',
    '"constructor"() {} "constructor"() {}',
    '"constructor"(){}; constructor(){};',
    '\'constructor\'(){}; "constructor"(){};',
    '`constructor`(){} }',
    '"constructor"(){}; constructor(){}; }',
    '"constructor"() {} foo() {} bar() {} constructor() {} }',
    '*"constructor"(){}',
    'async "constructor"(){}',
    'static async *method([...{ x }, y] = [1, 2, 3]) {}',
    'static async *method([...x, y] = [1, 2, 3]) {}',
    'static async *method([...[x], y] = [1, 2, 3]) {}',
    'static async *method([...{ x } = []] = []) {}',
    'static async *method([...x = []] = []) {}',
    'static async *method([...[ x ] = []] = []) {}',
    'static async *method([...{ x }, y]) {}',
    'static async *method([...x, y]) {}',
    'static async *method([...[ x ] = []]) {}',
    'async *method([...[ x ] = []] = []) {}',
    'async *method([...x = []] = []) {}',
    'async *method([...{ x } = []] = []) {}',
    'async *method([...[x], y] = [1, 2, 3]) {}',
    'async *method([...x, y] = [1, 2, 3]) {}',
    'async *method([...{ x }, y] = [1, 2, 3]) {}',
    'async *method([...{ x }, y]) {}',
    'static async method(...a,) {}',
    'async *method([...[ x ] = []]) {}',
    'async *method([...x = []]) {}',
    'async *method([...{ x }, y]) {}',
    'async *method([...[ x ] = []] = []) {}',
    'async *method([...x, y] = [1, 2, 3]) {}',
    'static async *method([...[ x ] = []]) {}',
    'static async *method([...{ x } = []]) {}',
    'static async *method([...x = []] = []) {}',
    '*method([...[ x ] = []] = []) {}',
    '*method([...x, y] = [1, 2, 3]) {}',
    'static async method(...x = []) {}'
  ];
  for (const arg of invalidSyntax) {
    it(`(class {${arg}})`, () => {
      t.throws(() => {
        parseSource(`(class {${arg}})`, undefined, Context.Empty);
      });
    });
    it(`(class {${arg}})`, () => {
      t.throws(() => {
        parseSource(`var = (class {${arg}})`, undefined, Context.Empty);
      });
    });

    it(`(class {${arg}})`, () => {
      t.throws(() => {
        parseSource(`bar, (class {${arg}})`, undefined, Context.Empty);
      });
    });
  }

  const extendSyntax = [
    'class {}',
    'class name {}',
    'class extends F {}',
    'class name extends F {}',
    'class extends (F, G) {}',
    'class name extends (F, G) {}',
    'class extends class {} {}',
    'class name extends class {} {}',
    'class extends class base {} {}',
    'class name extends class base {} {}'
  ];

  for (const arg of extendSyntax) {
    it(`(${arg})`, () => {
      t.doesNotThrow(() => {
        parseSource(`(${arg})`, undefined, Context.Empty);
      });
    });

    it(`var C = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`(${arg})`, undefined, Context.Empty);
      });
    });

    it(`bar, ${arg};`, () => {
      t.doesNotThrow(() => {
        parseSource(`bar, ${arg};`, undefined, Context.Empty);
      });
    });
  }

  const validSyntax = [
    ';;;\n;\n',
    ';;;\n;\n',
    'yield() {}',
    'await() {}',
    'async() {}',
    'static *method({ x: y = 33 }) {}',
    'static *method({ x: y = function a() {} }) {}',
    'static *method({ w: [x, y, z] = [4, 5, 6] }) {}',
    'static *method({ cover = (function () {}), xCover = (0, function() {})  }) {}',
    'static *method({}) {}',
    'static *method({...rest} = {a: 3, b: 4}) {}',
    'static *method({ x, } = { x: 23 }) {}',
    'static *method({} = null) {}',
    'static *method([cover = (function () {}), xCover = (0, function() {})] = []) {}',
    'static *method([[x, y, z] = [4, 5, 6]] = []) {}',
    'static *method([, ...x]) {}',
    'static *method([,]) {}',
    'static *method([x]) {}',
    'static *method([[x, y, z] = [4, 5, 6]]) {}',
    ' *method({ x, }) {}',
    '*method({ cls = class {}, xCls = class X {}, xCls2 = class { static name() {} } }) {}',
    '*method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
    '*method({} = null) {}',
    '*method([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] = []) {}',
    '*method([[x]] = [null]) {}',
    '*method([...{ length }]) {}',
    '*method([...[,]]) {}',
    'async *hunya({ w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined }) {}',
    'async *method({ w: [x, y, z] = [4, 5, 6] }) {}',
    'async *method({ w: { x, y, z } = undefined }) {}',
    'static async *method([[x, y, z] = [4, 5, 6]]) {}',
    'static async *method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}',
    '*method([,] = g()) {}',
    '*method([ , , ...x] = [1, 2, 3, 4, 5]) {}',
    '*method([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) {}',
    '*method({ a, b = thrower(), c = ++a } = {}) {}',
    '*method({ x: y = 33 } = { }) {}',
    '*method({ cover = (function () {}), b = (0, function() {})  }) {}',
    '*method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
    'static *method([[...x] = function() { a += 1; }()]) {}',
    'static *method([cover = (function () {}), b = (0, function() {})]) {}',
    'static *method([x]) {}',
    'static *method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
    'static *method({ x: y, } = { x: 23 }) {}',
    'static *method({ cls = class {}, xCls = class X {}, xCls2 = class { static name() {} } }) {}',
    'static *method({...x}) {}',
    'method([[...x] = values]) {}',
    "static set ['x' in empty](param) { value = param; }",
    "get .1() { return 'get string'; }",
    'set .1(param) { stringSet = param; }',
    "set 'singleQuote'(param) { stringSet = param; }",
    "get 'hex\\x45scape'() { return 'get string'; }",
    "set 'character\tescape'(param) { stringSet = param; }",
    'set 0(param) { stringSet = param; }',
    'set 1E+9(param) { stringSet = param; }',
    "get [yield]() { return 'get yield'; }",
    'set [yield](param) { yieldSet = param; }',
    '*method() {}',
    'static async *method(a,) {}',
    'static async *gen() { yield * []; }',
    'static async *gen() { yield [...yield yield]; }',
    `static async *gen() {
                yield {
                    ...yield,
                    y: 1,
                    ...yield yield,
                  };
            }`,
    'static async *gen() { yield* isiah(); }',
    'async method(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1,k = l +=1) {}',
    'async method(a, b = 39,) {}',
    'static async method(a,) {}',
    'static async *gen() {}',
    'method([x]) {}',
    'static *method({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}',
    'static async *method() {}',
    'static async *method(x = y, y) {}',
    'static async *method(a,) {}',
    'static async *gen() { yield* obj; }',
    'static async *gen() { yield this.foo; }',
    'async *gen() { yield * readFile();}',
    'async *method([x, y, z]) {}',
    'async *method([x = 23]) {}',
    'async *method([x]) {}',
    'async *method([,]) {}',
    'async *method([, ...x]) {}',
    'async *method([ , , ...x]) {}',
    'async *method([...x]) {}',
    'async *method([...{ length }]) {}',
    'async *method([arrow = () => {}] = []) {}',
    'async *method([ x = y ] = []) {}',
    'async *method([{ x }] = []) {}',
    'async *method([,] = function*() {}()) {}',
    'async *method([...{ 0: v, 1: w, 2: x, 3: y, length: z }] = [7, 8, 9]) {}',
    'async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {}',
    'async *method({ x: y = go_to_hell } = {}) {}',
    'async *method({ x: y } = { x: 23 }) {}',
    'async *method({}) {}',
    'static async *method([[] = function() { a += 1; }()]) {}',
    'static async *method([[...x] = function() { a += 1; }()]) {}',
    'static async *method([x]) {}',
    'static async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }]) {}',
    'static async *method([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]) {}',
    'static async *method([ , , ...x]) {}',
    'static async *method([...{ length }]) {}',
    'static async *method([[...x] = [2, 1, 3]] = []) {}',
    'static async *method({ [function(){}]: x } = {}) {}',
    'static async *method({...rest} = {a: 3, b: 4}) {}',
    'static async *method({ x: [y], }) {}',
    'static async *method({ x: y, }) {}',
    '*method([x]) {}',
    '*method([[] = function() { a += 1; return function*() {}; }()]) {}',
    '*method([x = 23]) {}',
    '*method([_, x]) {}',
    '*method([, ...x]) {}',
    '*method([[,] = g()] = [[]]) {}',
    '*method([cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] = []) {}',
    '*method([x] = g) {}'
  ];
  for (const arg of validSyntax) {
    it(`(class { ${arg}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`(class { ${arg}})`, undefined, Context.Empty);
      });
    });

    it(`(class { ${arg}}) (class { ${arg}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`(class { ${arg}}) (class { ${arg}})`, undefined, Context.Empty);
      });
    });

    it(`var foo = (class { ${arg}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`var foo = (class { ${arg}})`, undefined, Context.Empty);
      });
    });

    it(`function foo() { (class { ${arg}}) }`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo() { (class { ${arg}}) }`, undefined, Context.Empty);
      });
    });
  }

  const inValids: Array<[string, Context]> = [
    ['class foo {f(x) { let x }}', Context.Empty],
    ['class foo {f(x) { const x = y }}', Context.Empty],
    ['class foo {f(a, a) {}}', Context.Empty],
    ['class foo {f(a, b, a) {}}', Context.Empty],
    ['class foo {f(b, a, a) {}}', Context.Empty],
    ['class foo {f(a, a, b) {}}', Context.Empty],
    ['class foo {f(b, a, b, a) {}}', Context.Empty],
    ['class foo {f(b, a, b, a, [fine]) {}}', Context.Empty],
    ['class foo {f(b, a, b, a = x) {}}', Context.Empty],
    ['class foo {f(b, a, b, ...a) {}}', Context.Empty],
    ['class foo {f([a, a]) {}}', Context.Empty],
    ['class foo {f([a, b, a]) {}}', Context.Empty],
    ['class foo {f([b, a, a]) {}}', Context.Empty],
    ['class foo {f([a, a, b]) {}}', Context.Empty],
    ['class foo {f([b, a, b, a]) {}}', Context.Empty],
    ['class foo {f([b, a], b) {}}', Context.Empty],
    ['class foo {f([b, a], {b}) {}}', Context.Empty],
    ['class foo {f([b, a], b=x) {}}', Context.Empty],
    ['class foo {f([b, a], ...b) {}}', Context.Empty],
    ['class foo {f(){ let x; var x; }}', Context.Empty],
    ['class foo {f(){ var x; let x; }}', Context.Empty],
    ['class foo {f(){ const x = y; var x; }}', Context.Empty],
    ['class foo {f(){ var x; const x = y; }}', Context.Empty],
    ['class foo {f(){ let x; function x(){} }}', Context.Empty],
    ['class foo {f(){ function x(){} let x; }}', Context.Empty],
    ['class foo {f(){ const x = y; function x(){} }}', Context.Empty],
    ['class foo {f(){ function x(){} const x = y; }}', Context.Empty],
    ['0, class { static method(...x = []) { } };', Context.Empty],
    ['(class { adf&/()})', Context.Empty],
    ['(class { adf &/()})', Context.Empty],
    ['(class b {)', Context.Empty],
    ['(class b )', Context.Empty],
    ['(class b {-})', Context.Empty],
    ['(class b {a:})', Context.Empty],
    ['(class b {#a:})', Context.Empty],
    ['(class extends a,b {)', Context.Empty],
    ['(class extends a,b {)', Context.Empty],
    ['(class extends a,b {)', Context.Empty],
    ['(class extends a,b {)', Context.Empty],
    ['(class extends a,b {)', Context.Empty],
    ['var C = class let {};', Context.Empty],
    ['(class {a:0})', Context.Empty],
    ['(class eval {a:0})', Context.Empty],
    ['(class yield {a:0})', Context.Empty],
    ['class x{async *%x(a){}}', Context.Empty],
    ['(class x{async *%x(a){}})`;', Context.Empty],
    ['class x extends a = b {}', Context.Empty],
    ['class x {[x]z){}}', Context.Empty],
    ['class x {foo, bar(){}}', Context.Empty],
    ['class x {foo}', Context.Empty],
    ['class x {foo = x}', Context.Empty],
    ['class x {foo: x}', Context.Empty],
    ['class x { async [x]s){}}', Context.Empty],
    ['class x { y }', Context.Empty],
    ['class x { y; }', Context.Empty],
    ['class x { `constructor`(){} }', Context.Empty],
    ['class x extends a = b {}', Context.Empty],
    ['class x {[x]z){}}', Context.Empty],
    ['class x {foo, bar(){}}', Context.Empty],
    ['class x {foo}', Context.Empty],
    ['class x {foo = x}', Context.Empty],
    ['class x {foo: x}', Context.Empty],
    ['class x { async [x]s){}}', Context.Empty],
    ['class X extends function(){ with(obj); } {}', Context.Empty],
    ['class let {}`;', Context.Empty],
    ['class A {async get foo(){}}', Context.Empty],
    ['class A {* get foo(){}}', Context.Empty],
    ['class A {async set foo(x){}}', Context.Empty],
    ['class A {* set foo(x){}}', Context.Empty],
    ['class A {async get "foo"(){}}', Context.Empty],
    ['class A {* get "foo"(){}}', Context.Empty],
    ['class A {async set "foo"(x){}}', Context.Empty],
    ['class A {* set "foo"(x){}}', Context.Empty],
    ['class A {async get 7(){}}', Context.Empty],
    ['class A {* get 8(){}}', Context.Empty],
    ['class A {async set 11(x){}}', Context.Empty],
    ['class A {* set 12(x){}}', Context.Empty],
    //    ['typeof class{}\n/foo/', Context.Empty],
    [
      `class C extends (function B() {
      with ({});
      return B;
    }()) {}`,
      Context.Empty
    ],
    [
      `
    class A { b() {
      const A = 3;
      } }

      class A { b() {
      const A = 3;
      } }
    `,
      Context.Empty
    ],
    ['var C = class let {};', Context.Empty],

    ['var C = class let {};', Context.Empty],
    ['var C = class let {};', Context.Empty],
    ['var C = class let {};', Context.Empty],
    ['var C = class let {};', Context.Empty],
    ['var C = class let {};', Context.Empty],

    ['class A {* get [x](){}}', Context.Empty],
    ['class A {async get [x](){}}', Context.Empty],
    ['class A {* set [foo](x){}}', Context.Empty],
    ['class A {async get [foo](){}}', Context.Empty],
    ['class x{get *foo(){}}', Context.Empty],
    ['class x{get *[x](){}}', Context.Empty],
    ['class x{get *"foo"(){}}', Context.Empty],
    ['class x{get *555(){}}', Context.Empty],
    ['class x{set *foo(a){}', Context.Empty],
    ['class x{set *[x](a){}}', Context.Empty],
    ['class x{set *"foo"(a){}}', Context.Empty],
    ['class x{set *555(a){}}', Context.Empty],
    ['class x{set *%x(a){}}', Context.Empty],
    ['class x{static *%x(){}}', Context.Empty],
    ['class x{static get *foo(){}}', Context.Empty],
    ['class x{static get *[x](){}}`;', Context.Empty],
    ['class x{static get *"foo"(){}}', Context.Empty],
    ['class x{static get *555(){}}', Context.Empty],
    ['class x{static get *%x(){}}', Context.Empty],
    ['class x{static set *foo(a){}}', Context.Empty],
    ['class x{static set *[x](a){}}', Context.Empty],
    ['class x{static set *"foo"(a){}}', Context.Empty],
    ['class x{static set *555(a){}}', Context.Empty],
    ['class x{static set *%x(a){}}', Context.Empty],
    ['class x{static async *%x(a){}}', Context.Empty],
    ['class A { ["async"] a() {} }', Context.Empty],
    ['class A { ["get"] a() {} }', Context.Empty],
    ['class A { static *prototype() {} }', Context.Empty],
    ['class A { static prototype() {} }', Context.Empty]
  ];

  fail('Expressions - Class', inValids);

  pass('Expressions - Class (pass)', [
    [
      `x = class{} / foo`,
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                name: 'x',
                type: 'Identifier'
              },
              operator: '=',
              right: {
                left: {
                  body: {
                    body: [],
                    type: 'ClassBody'
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
                },
                operator: '/',
                right: {
                  name: 'foo',
                  type: 'Identifier'
                },
                type: 'BinaryExpression'
              },
              type: 'AssignmentExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `class A {static static(){};};`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'static'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: true
                }
              ]
            }
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `x = class{}
          / foo / g`,
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
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: []
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  operator: '/'
                },
                right: {
                  type: 'Identifier',
                  name: 'g'
                },
                operator: '/'
              }
            }
          }
        ]
      }
    ],
    [
      '(x = class{} / foo)',
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
                type: 'BinaryExpression',
                left: {
                  type: 'ClassExpression',
                  id: null,
                  superClass: null,
                  body: {
                    type: 'ClassBody',
                    body: []
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'foo'
                },
                operator: '/'
              }
            }
          }
        ]
      }
    ],
    [
      `(x = class{}
                / foo / g)`,
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
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ClassExpression',
                    id: null,
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: []
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  operator: '/'
                },
                right: {
                  type: 'Identifier',
                  name: 'g'
                },
                operator: '/'
              }
            }
          }
        ]
      }
    ],
    [
      'class A extends B { *get() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
                  kind: 'method',
                  static: false,
                  computed: false,
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
      'class C { async get(id) { return id; } }',
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
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'get'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'id'
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'Identifier',
                            name: 'id'
                          }
                        }
                      ]
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
      '(class {static() {}});',
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
                      name: 'static'
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
      'class x extends y { f(){} }',
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
                    name: 'f'
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
      'class C { *get(v) {}}',
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
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'get'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'v'
                      }
                    ],
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
      'class A extends B { async set(){} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'set'
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
      'class A extends B { async get(){} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
                  kind: 'method',
                  static: false,
                  computed: false,
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
                  }
                }
              ]
            }
          }
        ]
      }
    ],

    [
      'class C { async set(){} }',
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
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'set'
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
      'class C { async get(){} }',
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
                  kind: 'method',
                  static: false,
                  computed: false,
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
                  }
                }
              ]
            }
          }
        ]
      }
    ],

    [
      'class C { *set() {} }',
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
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'set'
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
    // Babylon issue: https://github.com/babel/babel/issues/7537
    [
      '(class A {} < 1);',
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
                type: 'ClassExpression',
                id: {
                  type: 'Identifier',
                  name: 'A'
                },
                superClass: null,
                body: {
                  type: 'ClassBody',
                  body: []
                }
              },
              right: {
                type: 'Literal',
                value: 1
              },
              operator: '<'
            }
          }
        ]
      }
    ],
    [
      '(class A {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: []
              }
            }
          }
        ]
      }
    ],
    [
      '(class A {;})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: []
              }
            }
          }
        ]
      }
    ],
    [
      '(class A {; ;; ;})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: []
              }
            }
          }
        ]
      }
    ],

    [
      '(class C { set foo(x) {} set foo(x) {} })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    kind: 'set',
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
                          type: 'Identifier',
                          name: 'x'
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
                  },
                  {
                    type: 'MethodDefinition',
                    kind: 'set',
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
                          type: 'Identifier',
                          name: 'x'
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
          }
        ]
      }
    ],
    [
      '(class E { static foo() {} static foo() {} })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'E'
              },
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
                      name: 'foo'
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
                  },
                  {
                    type: 'MethodDefinition',
                    kind: 'method',
                    static: true,
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
      'var C = class { async *method(a, b = 39,) {}}',
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
                          name: 'method'
                        },
                        value: {
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
                          generator: true,
                          id: null
                        }
                      }
                    ]
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'C'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `var C = class { async *gen() {
      callCount += 1;
      yield {
          ...yield,
          y: 1,
          ...yield yield,
        };
  }}`,
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
                          name: 'gen'
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
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'Identifier',
                                    name: 'callCount'
                                  },
                                  operator: '+=',
                                  right: {
                                    type: 'Literal',
                                    value: 1
                                  }
                                }
                              },
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
                                          argument: null,
                                          delegate: false
                                        }
                                      },
                                      {
                                        type: 'Property',
                                        key: {
                                          type: 'Identifier',
                                          name: 'y'
                                        },
                                        value: {
                                          type: 'Literal',
                                          value: 1
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false
                                      },
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
                          async: true,
                          generator: true,
                          id: null
                        }
                      }
                    ]
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'C'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `var C = 'outside';

    var cls = class C extends (
        probeHeritage = function() { return C; },
        setHeritage = function() { C = null; }
      ) {
      method() {
        return C;
      }
    };`,
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
                  type: 'Literal',
                  value: 'outside'
                },
                id: {
                  type: 'Identifier',
                  name: 'C'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ClassExpression',
                  id: {
                    type: 'Identifier',
                    name: 'C'
                  },
                  superClass: {
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'probeHeritage'
                        },
                        operator: '=',
                        right: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ReturnStatement',
                                argument: {
                                  type: 'Identifier',
                                  name: 'C'
                                }
                              }
                            ]
                          },
                          async: false,
                          generator: false,
                          id: null
                        }
                      },
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'setHeritage'
                        },
                        operator: '=',
                        right: {
                          type: 'FunctionExpression',
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
                                    name: 'C'
                                  },
                                  operator: '=',
                                  right: {
                                    type: 'Literal',
                                    value: null
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
                          name: 'method'
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
                                  type: 'Identifier',
                                  name: 'C'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'cls'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `var x = 'outside';
    var probeParams, probeBody;

    var C = class {
      static m(_ = probeParams = function() { return x; }) {
        var x = 'inside';
        probeBody = function() { return x; };
      }
    };`,
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
                  type: 'Literal',
                  value: 'outside'
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'probeParams'
                }
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'probeBody'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
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
                          name: 'm'
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: '_'
                              },
                              right: {
                                type: 'AssignmentExpression',
                                left: {
                                  type: 'Identifier',
                                  name: 'probeParams'
                                },
                                operator: '=',
                                right: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                    type: 'BlockStatement',
                                    body: [
                                      {
                                        type: 'ReturnStatement',
                                        argument: {
                                          type: 'Identifier',
                                          name: 'x'
                                        }
                                      }
                                    ]
                                  },
                                  async: false,
                                  generator: false,
                                  id: null
                                }
                              }
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'VariableDeclaration',
                                kind: 'var',
                                declarations: [
                                  {
                                    type: 'VariableDeclarator',
                                    init: {
                                      type: 'Literal',
                                      value: 'inside'
                                    },
                                    id: {
                                      type: 'Identifier',
                                      name: 'x'
                                    }
                                  }
                                ]
                              },
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'Identifier',
                                    name: 'probeBody'
                                  },
                                  operator: '=',
                                  right: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                      type: 'BlockStatement',
                                      body: [
                                        {
                                          type: 'ReturnStatement',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'x'
                                          }
                                        }
                                      ]
                                    },
                                    async: false,
                                    generator: false,
                                    id: null
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
                },
                id: {
                  type: 'Identifier',
                  name: 'C'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `var probe;

    var C = class {
      // A parameter expression is necessary to trigger the creation of the scope
      // under test.
      *m(_ = null) {
        var x = 'inside';
        probe = function() { return x; };
      }
    };
    C.prototype.m().next();

    var x = 'outside';`,
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
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'probe'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
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
                          name: 'm'
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: '_'
                              },
                              right: {
                                type: 'Literal',
                                value: null
                              }
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'VariableDeclaration',
                                kind: 'var',
                                declarations: [
                                  {
                                    type: 'VariableDeclarator',
                                    init: {
                                      type: 'Literal',
                                      value: 'inside'
                                    },
                                    id: {
                                      type: 'Identifier',
                                      name: 'x'
                                    }
                                  }
                                ]
                              },
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'Identifier',
                                    name: 'probe'
                                  },
                                  operator: '=',
                                  right: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                      type: 'BlockStatement',
                                      body: [
                                        {
                                          type: 'ReturnStatement',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'x'
                                          }
                                        }
                                      ]
                                    },
                                    async: false,
                                    generator: false,
                                    id: null
                                  }
                                }
                              }
                            ]
                          },
                          async: false,
                          generator: true,
                          id: null
                        }
                      }
                    ]
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'C'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'C'
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'prototype'
                      }
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'm'
                    }
                  },
                  arguments: []
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'next'
                }
              },
              arguments: []
            }
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 'outside'
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
      `var x = 'outside';
    var probeParams, probeBody;

    var C = class{
      *m(_ = probeParams = function() { return x; }) {
        var x = 'inside';
        probeBody = function() { return x; };
      }
    };`,
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
                  type: 'Literal',
                  value: 'outside'
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'probeParams'
                }
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'probeBody'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
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
                          name: 'm'
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: '_'
                              },
                              right: {
                                type: 'AssignmentExpression',
                                left: {
                                  type: 'Identifier',
                                  name: 'probeParams'
                                },
                                operator: '=',
                                right: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                    type: 'BlockStatement',
                                    body: [
                                      {
                                        type: 'ReturnStatement',
                                        argument: {
                                          type: 'Identifier',
                                          name: 'x'
                                        }
                                      }
                                    ]
                                  },
                                  async: false,
                                  generator: false,
                                  id: null
                                }
                              }
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'VariableDeclaration',
                                kind: 'var',
                                declarations: [
                                  {
                                    type: 'VariableDeclarator',
                                    init: {
                                      type: 'Literal',
                                      value: 'inside'
                                    },
                                    id: {
                                      type: 'Identifier',
                                      name: 'x'
                                    }
                                  }
                                ]
                              },
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'Identifier',
                                    name: 'probeBody'
                                  },
                                  operator: '=',
                                  right: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                      type: 'BlockStatement',
                                      body: [
                                        {
                                          type: 'ReturnStatement',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'x'
                                          }
                                        }
                                      ]
                                    },
                                    async: false,
                                    generator: false,
                                    id: null
                                  }
                                }
                              }
                            ]
                          },
                          async: false,
                          generator: true,
                          id: null
                        }
                      }
                    ]
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'C'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var C = class {  method(x = arguments[2], y = arguments[3], z) {}};',
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
                          name: 'method'
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
                                  type: 'Identifier',
                                  name: 'arguments'
                                },
                                computed: true,
                                property: {
                                  type: 'Literal',
                                  value: 2
                                }
                              }
                            },
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'y'
                              },
                              right: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'arguments'
                                },
                                computed: true,
                                property: {
                                  type: 'Literal',
                                  value: 3
                                }
                              }
                            },
                            {
                              type: 'Identifier',
                              name: 'z'
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
                },
                id: {
                  type: 'Identifier',
                  name: 'C'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '(class J { static get foo() {} static set foo(x) {} get foo() {} set foo(x) {} })',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'J'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: true
                  },
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: true
                  },
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: false
                  },
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class o {f(){ function x(){} var x = y; }}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'o'
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
                            name: 'x'
                          }
                        },
                        {
                          type: 'VariableDeclaration',
                          kind: 'var',
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              init: {
                                type: 'Identifier',
                                name: 'y'
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
      'class o {f(x) { function x() {} }}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'o'
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
                        name: 'x'
                      }
                    ],
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
                            name: 'x'
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
      'class o {f(f) { }}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'o'
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
                        name: 'f'
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
      '(class M { static foo() {} get foo() {} set foo(x) {}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'M'
              },
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
                      name: 'foo'
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
                  },
                  {
                    type: 'MethodDefinition',
                    kind: 'get',
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
                        body: []
                      },
                      async: false,
                      generator: false,
                      id: null
                    }
                  },
                  {
                    type: 'MethodDefinition',
                    kind: 'set',
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
                          type: 'Identifier',
                          name: 'x'
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
          }
        ]
      }
    ],
    [
      "(class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } })",
      Context.Empty,
      {
        body: [
          {
            expression: {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'setter',
                      type: 'Identifier'
                    },
                    kind: 'set',
                    static: true,
                    type: 'MethodDefinition',
                    value: {
                      async: false,
                      body: {
                        body: [
                          {
                            expression: {
                              arguments: [
                                {
                                  left: {
                                    type: 'Literal',
                                    value: 'ssetter '
                                  },
                                  operator: '+',
                                  right: {
                                    name: 'x',
                                    type: 'Identifier'
                                  },
                                  type: 'BinaryExpression'
                                }
                              ],
                              callee: {
                                name: 'p',
                                type: 'Identifier'
                              },
                              type: 'CallExpression'
                            },
                            type: 'ExpressionStatement'
                          }
                        ],
                        type: 'BlockStatement'
                      },
                      generator: false,
                      id: null,
                      params: [
                        {
                          name: 'x',
                          type: 'Identifier'
                        }
                      ],
                      type: 'FunctionExpression'
                    }
                  }
                ],
                type: 'ClassBody'
              },
              id: {
                name: 'OnlyStaticSetter',
                type: 'Identifier'
              },
              superClass: null,
              type: 'ClassExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `(function f1() {
      class Empty { }
      class EmptySemi { ; }
      class OnlyCtor { constructor() { p('ctor') } }
      class OnlyMethod { method() { p('method') } }
      class OnlyStaticMethod { static method() { p('smethod') } }
      class OnlyGetter { get getter() { p('getter') } }
      class OnlyStaticGetter { static get getter() { p('sgetter') } }
      class OnlySetter { set setter(x) { p('setter ' + x) } }
      class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }
      class OnlyComputedMethod { ["cmethod"]() { p('cmethod') } }
      class OnlyStaticComputedMethod { static ["cmethod"]() { p('scmethod') } }
      class OnlyComputedGetter { get ["cgetter"]() { p('cgetter') } }
      class OnlyStaticComputedGetter { static get ["cgetter"]() { p('scgetter') } }
      class OnlyComputedSetter { set ["csetter"](x) { p('csetter ' + x) } }
      class OnlyStaticComputedSetter { static set ["csetter"](x) { p('scsetter ' + x) } }
  })`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: {
                type: 'Identifier',
                name: 'f1'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'Empty'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: []
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'EmptySemi'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: []
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyCtor'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Identifier',
                            name: 'constructor'
                          },
                          computed: false,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'ctor'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'constructor',
                          static: false
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyMethod'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Identifier',
                            name: 'method'
                          },
                          computed: false,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'method'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'method',
                          static: false
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyStaticMethod'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Identifier',
                            name: 'method'
                          },
                          computed: false,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'smethod'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'method',
                          static: true
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyGetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Identifier',
                            name: 'getter'
                          },
                          computed: false,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'getter'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'get',
                          static: false
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyStaticGetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Identifier',
                            name: 'getter'
                          },
                          computed: false,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'sgetter'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'get',
                          static: true
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlySetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Identifier',
                            name: 'setter'
                          },
                          computed: false,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                    type: 'CallExpression',
                                    callee: {
                                      type: 'Identifier',
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                          type: 'Literal',
                                          value: 'setter '
                                        },
                                        right: {
                                          type: 'Identifier',
                                          name: 'x'
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'set',
                          static: false
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyStaticSetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Identifier',
                            name: 'setter'
                          },
                          computed: false,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                    type: 'CallExpression',
                                    callee: {
                                      type: 'Identifier',
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                          type: 'Literal',
                                          value: 'ssetter '
                                        },
                                        right: {
                                          type: 'Identifier',
                                          name: 'x'
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'set',
                          static: true
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyComputedMethod'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Literal',
                            value: 'cmethod'
                          },
                          computed: true,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'cmethod'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'method',
                          static: false
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyStaticComputedMethod'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Literal',
                            value: 'cmethod'
                          },
                          computed: true,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'scmethod'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'method',
                          static: true
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyComputedGetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Literal',
                            value: 'cgetter'
                          },
                          computed: true,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'cgetter'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'get',
                          static: false
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyStaticComputedGetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Literal',
                            value: 'cgetter'
                          },
                          computed: true,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'Literal',
                                        value: 'scgetter'
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'get',
                          static: true
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyComputedSetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Literal',
                            value: 'csetter'
                          },
                          computed: true,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                    type: 'CallExpression',
                                    callee: {
                                      type: 'Identifier',
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                          type: 'Literal',
                                          value: 'csetter '
                                        },
                                        right: {
                                          type: 'Identifier',
                                          name: 'x'
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'set',
                          static: false
                        }
                      ]
                    }
                  },
                  {
                    type: 'ClassDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'OnlyStaticComputedSetter'
                    },
                    superClass: null,
                    body: {
                      type: 'ClassBody',
                      body: [
                        {
                          type: 'MethodDefinition',
                          key: {
                            type: 'Literal',
                            value: 'csetter'
                          },
                          computed: true,
                          value: {
                            type: 'FunctionExpression',
                            id: null,
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
                                    type: 'CallExpression',
                                    callee: {
                                      type: 'Identifier',
                                      name: 'p'
                                    },
                                    arguments: [
                                      {
                                        type: 'BinaryExpression',
                                        operator: '+',
                                        left: {
                                          type: 'Literal',
                                          value: 'scsetter '
                                        },
                                        right: {
                                          type: 'Identifier',
                                          name: 'x'
                                        }
                                      }
                                    ]
                                  }
                                }
                              ]
                            },
                            generator: false,

                            async: false
                          },
                          kind: 'set',
                          static: true
                        }
                      ]
                    }
                  }
                ]
              },
              generator: false,

              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    //    [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],
    // [ 'x = class A {};',  Context.Empty,  {}],

    [
      'x = class A {};',
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
                type: 'ClassExpression',
                id: {
                  type: 'Identifier',
                  name: 'A'
                },
                superClass: null,
                body: {
                  type: 'ClassBody',
                  body: []
                }
              }
            }
          }
        ]
      }
    ],
    [
      '(class A extends B {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
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
                body: []
              }
            }
          }
        ]
      }
    ],
    [
      '(class A extends foo() {})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'foo'
                },
                arguments: []
              },
              body: {
                type: 'ClassBody',
                body: []
              }
            }
          }
        ]
      }
    ],
    /* ['class A extends {} {}', Context.Empty,  {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ClassDeclaration",
      "id": {
        "type": "Identifier",
        "name": "A"
      },
      "superClass": {
        "type": "ObjectExpression",
        "properties": []
      },
      "body": {
        "type": "ClassBody",
        "body": []
      }
    }
  ]
}],*/
    [
      '(class A {a(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
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
                      name: 'a'
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
      '(class A {constructor(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
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
      '(class A {async foo(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: true
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {*foo(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {get foo(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {get set(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'set'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {set foo(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {set get(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'get'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {set(){} get(){} async(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'set'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  },
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'get'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  },
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'async'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {"x"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {"constructor"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'constructor'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'constructor',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {async "foo"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: true
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {*"foo"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {get "foo"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {get "set"(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    kind: 'get',
                    static: false,
                    computed: false,
                    key: {
                      type: 'Literal',
                      value: 'set'
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
      '(class A {set "foo"(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {set "get"(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'get'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {"set"(){} "get"(){} "async"(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
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
                      type: 'Literal',
                      value: 'set'
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
                  },
                  {
                    type: 'MethodDefinition',
                    kind: 'method',
                    static: false,
                    computed: false,
                    key: {
                      type: 'Literal',
                      value: 'get'
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
                  },
                  {
                    type: 'MethodDefinition',
                    kind: 'method',
                    static: false,
                    computed: false,
                    key: {
                      type: 'Literal',
                      value: 'async'
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
      '(class A {1(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
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
                      type: 'Literal',
                      value: 1
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
      '(class A {async 3(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 3
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: true
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {*4(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 4
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {async * 34(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
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
                      type: 'Literal',
                      value: 34
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
          }
        ]
      }
    ],
    [
      '(class A {get 5(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 5
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {set 9(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 9
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {[a](){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
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
      '(class A {async [foo](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: true
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {*[foo](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {get [foo](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {set [foo](x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x { *[y](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x { async [y](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: true
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x { get [y](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x { set [y](z){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'z'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x { async *[y](){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                      type: 'Identifier',
                      name: 'y'
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
          }
        ]
      }
    ],
    [
      '(class x{*foo(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{*[x](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{*"foo"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Literal',
                      value: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{*555(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Literal',
                      value: 555
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: false
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{async *foo(a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                          type: 'Identifier',
                          name: 'a'
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
            }
          }
        ]
      }
    ],
    [
      '(class x{async *[x](a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                      type: 'Identifier',
                      name: 'x'
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
                      async: true,
                      generator: true,
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
      '(class x{async *"foo"(a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                      type: 'Literal',
                      value: 'foo'
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
                      async: true,
                      generator: true,
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
      '(class x{async *555(a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                      type: 'Literal',
                      value: 555
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
                      async: true,
                      generator: true,
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
      '(class A {static a(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
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
      '(class A {static constructor(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'constructor'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static get foo(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static set foo(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static "x"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    /* [
      'typeof class{}\n/foo/g',
      Context.Empty,
      {}],
      [
        'typeof class{}\n/foo/g',
        Context.Empty,
        {}],
        [
          'typeof class{}\n/foo/g',
          Context.Empty,
          {}],
          [
            'typeof class{}\n/foo/g',
            Context.Empty,
            {}],
            [
              'typeof class{}\n/foo/g',
              Context.Empty,
              {}],*/
    [
      'typeof class{}\n/foo/g',
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                left: {
                  argument: {
                    body: {
                      body: [],
                      type: 'ClassBody'
                    },
                    id: null,
                    superClass: null,
                    type: 'ClassExpression'
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
      '(class{} \n / foo / g)',
      Context.Empty,
      {
        body: [
          {
            expression: {
              left: {
                left: {
                  body: {
                    body: [],
                    type: 'ClassBody'
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
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
      'class x{}\n/foo/g',
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [],
              type: 'ClassBody'
            },
            id: {
              name: 'x',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
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
    ],
    [
      'class x{}\n/foo/',
      Context.Empty,
      {
        body: [
          {
            body: {
              body: [],
              type: 'ClassBody'
            },
            id: {
              name: 'x',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
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
      '(class A {static "constructor"(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
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
                      type: 'Literal',
                      value: 'constructor'
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
      '(class A {static get "foo"(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static set "foo"(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static 2(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 2
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static get 6(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 6
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'get',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static set 10(x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Literal',
                      value: 10
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static [a](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static get [foo](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,

                      async: false
                    },
                    kind: 'get',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class A {static set [foo](x){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
              id: {
                type: 'Identifier',
                name: 'A'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: [
                  {
                    type: 'MethodDefinition',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x {static *[y](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x { static async [y](){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    static: true,
                    computed: true,
                    key: {
                      type: 'Identifier',
                      name: 'y'
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
      '(class x { static get [y](){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    kind: 'get',
                    static: true,
                    computed: true,
                    key: {
                      type: 'Identifier',
                      name: 'y'
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
      '(class x { static set [y](z){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: 'z'
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: false,
                      async: false
                    },
                    kind: 'set',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{static *foo(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{static *[x](){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: true,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{static *"foo"(){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    static: true,
                    computed: false,
                    key: {
                      type: 'Literal',
                      value: 'foo'
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
          }
        ]
      }
    ],
    [
      '(class x{static *555(){}})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    key: {
                      type: 'Literal',
                      value: 555
                    },
                    computed: false,
                    value: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      generator: true,
                      async: false
                    },
                    kind: 'method',
                    static: true
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{static async *foo(a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    static: true,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      name: 'foo'
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
                      async: true,
                      generator: true,
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
      '(class x{static async *[x](a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    static: true,
                    computed: true,
                    key: {
                      type: 'Identifier',
                      name: 'x'
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
                      async: true,
                      generator: true,
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
      '(class x{static async *"foo"(a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    static: true,
                    computed: false,
                    key: {
                      type: 'Literal',
                      value: 'foo'
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
                      async: true,
                      generator: true,
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
      `class A {
        get
        () {}

        set
        () {}

        static
        () {}

        async
        () {}


        'get'
        () {}

        'set'
        () {}

        'async'
        () {}


        static
        get
        () {}

        static
        set
        () {}

        static
        static
        () {}

        static
        async
        () {}

        static
        a
        () {}


        get
        async
        () {}


        static
        get
        static
        () {}
      }`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'get'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'set'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'static'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Literal',
                    value: 'get'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Literal',
                    value: 'set'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Literal',
                    value: 'async'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'get'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: true
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'set'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: true
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'static'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: true
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: true
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'method',
                  static: true
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'get',
                  static: false
                },
                {
                  type: 'MethodDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'static'
                  },
                  computed: false,
                  value: {
                    type: 'FunctionExpression',
                    id: null,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    generator: false,
                    async: false
                  },
                  kind: 'get',
                  static: true
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(class x{static async *555(a){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ClassExpression',
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
                    static: true,
                    computed: false,
                    key: {
                      type: 'Literal',
                      value: 555
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
                      async: true,
                      generator: true,
                      id: null
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  ]);
});

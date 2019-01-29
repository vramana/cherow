import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Arrows', () => {
  fail('Expressions - Functions', [
    ['await => { let x; }', Context.AwaitContext],
    ['async await => {}', Context.Empty],
    ['async x => { let x; }', Context.Empty],
    ['function *a() { yield => foo }', Context.Empty],
    ['"use strict"; interface => foo', Context.Empty],
    ['yield x => zoo', Context.Empty],
    ['foo bar => zoo', Context.Empty],
    ['async x => { let x; }', Context.Empty],
    // ['(x) => { let x; }', Context.Empty],
    // ['({x}) => { let x; }', Context.Empty],
    // ['({a}, {a}) => {}', Context.Empty],
    ['x => { let x; }', Context.Empty],
    ['x => { const x; }', Context.Empty],
    ['()?c:d=>{}=>{}', Context.Empty],
    ['()=c=>{}=>{};', Context.Empty],
    ['var x = ()+c=>{}', Context.Empty],
    ['var x = ()c++=>{};', Context.Empty],
    ['a?c:d=>{}=>{};', Context.Empty],
    ['(...a)`template-head${c}`=>{}', Context.Empty],
    ['(...a)?c:d=>{}=>{};', Context.Empty],
    ['var x = (...a)?c:d=>{}=>{}', Context.Empty],
    ['var x = (...a)[1]=>{};', Context.Empty],
    ['(a,...b)`template-head${c}`=>{}', Context.Empty],
    ['(a,...b)`${c}template-tail`=>{};', Context.Empty],
    ['var x = (a,...b)`${c}template-tail`=>{}', Context.Empty],
    ['var x = (a,...b)[c]=>{};', Context.Empty],
    ['()`template-head${c}template-tail`=>{}', Context.Empty],
    ['()?c:d=>{}=>{};', Context.Empty],
    ['var x = ()[1]=>{}', Context.Empty],
    ['var x = ()[c]=>{};', Context.Empty],
    //['var x = (a,b)+c=>{};', Context.Empty],
    //['var x = a`template-head${c}template-tail`=>{}', Context.Empty],
    //['var x = ac++=>{};', Context.Empty],
    //    ['(a)`${c}template-tail`=>{}', Context.Empty],
    //    ['(a)`template-head${c}template-tail`=>{};', Context.Empty],
    ['var x = (a)?c:d=>{}=>{}', Context.Empty],
    // ['var x = (a)`${c}template-tail`=>{};', Context.Empty],
    // ['a`${c}template-tail`=>{}', Context.Empty],
    //['a`template-head${c}template-tail`=>{};', Context.Empty],
    //['var x = a`c`=>{}', Context.Empty],
    //    ['(a)[1]=>{}', Context.Empty],
    //  ['(a)[c]=>{};', Context.Empty],
    //['var x = (a)`c`=>{}', Context.Empty],
    //    ['var x = (a)-c=>{};', Context.Empty],
    ['(...a)`c`=>{}', Context.Empty],
    ['(...a)-c=>{};', Context.Empty],
    ['var x = (...a)+c=>{}', Context.Empty],
    ['var x = (...a)-c=>{};', Context.Empty],
    //    ['(a,b)+c=>{}', Context.Empty],
    ['var x = (a,b)", "=>{}', Context.Empty],
    //    ['var x = (a,b)-c=>{};', Context.Empty],
    ['(a,...b)+c=>{}', Context.Empty],
    ['eval => { "use strict"; 0 }', Context.Empty],
    ['arguments => { "use strict"; 0 }', Context.Empty],
    ['yield => { "use strict"; 0 }', Context.Empty],
    ['interface => { "use strict"; 0 }', Context.Empty],
    ['(eval) => { "use strict"; 0 }', Context.Empty],
    ['(arguments) => { "use strict"; 0 }', Context.Empty],
    ['(yield) => { "use strict"; 0 }', Context.Empty],
    ['(interface) => { "use strict"; 0 }', Context.Empty],
    ['eval, bar) => { "use strict"; 0 }', Context.Empty],
    ['(bar, eval) => { "use strict"; 0 }', Context.Empty],
    ['(bar, arguments) => { "use strict"; 0 }', Context.Empty],
    ['(bar, yield) => { "use strict"; 0 }', Context.Empty],
    ['(bar, interface) => { "use strict"; 0 }', Context.Empty],
    ['(a,...b)+c=>{}', Context.Empty],
    ['32 => {}', Context.Empty],
    ['(32) => {}', Context.Empty],
    ['(a, 32) => {}', Context.Empty],
    ['if => {}', Context.Empty],
    ['(if) => {}', Context.Empty],
    ['(a, if) => {}', Context.Empty],
    // ["a + b => {}", Context.Empty],
    ['(a + b) => {}', Context.Empty],
    ['(a + b, c) => {}', Context.Empty],
    ['(a, b - c) => {}', Context.Empty],
    ['"a" => {}', Context.Empty],
    ['("a") => {}', Context.Empty],
    ['("a", b) => {}', Context.Empty],
    ['(a, "b") => {}', Context.Empty],
    ['-a => {}', Context.Empty],
    ['(-a) => {}', Context.Empty],
    ['(-a, b) => {}', Context.Empty],
    ['(a, -b) => {}', Context.Empty],
    ['{} => {}', Context.Empty],
    // ["a++ => {}", Context.Empty],
    ['(a++) => {}', Context.Empty],
    ['(a++, b) => {}', Context.Empty],
    ['(a, b++) => {}', Context.Empty],
    ['[] => {}', Context.Empty],
    ['(foo ? bar : baz) => {}', Context.Empty],
    ['(a, foo ? bar : baz) => {}', Context.Empty],
    ['(foo ? bar : baz, a) => {}', Context.Empty],
    ['(a.b, c) => {}', Context.Empty],
    ['(c, a.b) => {}', Context.Empty],
    ["(a['b'], c) => {}", Context.Empty],
    ["(c, a['b']) => {}", Context.Empty],
    ['(...a = b) => b', Context.Empty],
    ['eval => { "use strict"; }', Context.Empty],
    ['([]) => { "use strict"; }', Context.Empty],
    ['(a, []) => { "use strict"; }', Context.Empty],

    [
      `var af = x
    => {};`,
      Context.Empty
    ]
  ]);

  for (const arg of [
    `const a = () => {return (3, 4);};`,
    `"use strict";
((one, two) => {});`,
    `([])=>0;`,
    `([])=>0;`,
    `([a,...b])=>0;`,
    `([a,b])=>0;`,
    `([a]) => [0];`,
    `({a,b=b,a:c,[a]:[d]})=>0;`,
    `(() => {}) || true;
(() => {}) ? a : b;`,
    '(() => {}) + 2',
    'new (() => {});',
    'bar ? ( (x) => x ) : baz;',
    'bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;',
    'bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;',
    'bar ? ( (a, (a, (b, c) => 0)) ) : baz;',
    'bar ? ( foo ? bar : baz => {} ) : baz;',
    'bar ? ( (a, {}) => {} ) : baz;',
    'bar ? ( (x, y = 9) => {} ) : baz;',
    'bar ? ( (...a) => {} ) : baz;',
    'bar ? ( ([x] = []) => {} ) : baz;',
    'bar ? ( (x = 9, ...a) => {} ) : baz;',
    '(x, y = 9, {b}, z = 8, ...a) => {}',
    '(x = 9) => {}',
    '([x = 0]) => {}',
    '(a, (a, (b, c) => 0))',
    `a => 0`,
    `() => () => 0`,
    '() => 0, 1',
    '() => 0 + 1',
    '(a,b) => 0 + 1',
    `(a,b,...c) => 0 + 1`,
    '() => (a) = 0',
    'a => b => c => 0',
    '(e) => "test"',
    '(a, ...[]) => 1',
    "(x)=>{'use strict';}",
    '(() => 5)() === 5;',
    'a, b => 0',
    'a, b, (c, d) => 0',
    '(a, b, (c, d) => 0)',
    '(a, b) => 0, (c, d) => 1',
    '(a, b => {}, a => a + 1)',
    '((a, b) => {}, (a => a + 1))',
    '(a, (a, (b, c) => 0))',
    '() => a + b - yield / 1',
    '(() => { try { Function("0 || () => 2")(); } catch(e) { return true; } })();',
    'var f = (function() { return z => arguments[0]; }(5));',
    '({y}) => x;',
    '([x = 10]) => x',
    '({x = 10, y: { z = 10 }}) => [x, z]',
    '({x = 10}) => x',
    `([y]) => x;`,
    '(x=1) => x * x;',
    '(eval = 10) => 42;',
    '(a, {}) => {}',
    '({}, a) => {}',
    '([]) => {}',
    '(a, []) => {}',
    '([], a) => {}',
    '(a = b) => {}',
    '(a = b, c) => {}',
    '(a, b = c) => {}',
    '({a}) => {}',
    '(x = 9) => {}',
    '(a, b=(c)=>{}) => {}',
    '(async function foo(a) { await a });',
    '(a,b) =>{}',
    'var x = (a,b) =>{}',
    '(a,...b) =>{}',
    'var x = (a,...b) =>{}',
    'foo((x, y) => {});',
    'e => { 42; };',
    'e => ({ property: 42 });',
    '(a, b) => { 42; };',
    '(x) => ((y, z) => (x, y, z));',
    '(a) => 00;',
    'e => "test";',
    'a =>{}',
    '(...a) =>{}',
    'var x = a =>{}',
    '(a,b) => [a]',
    '() => { value: b}',
    '(x, y) => { x.a = y; }',
    '(x, y) => x.a = y',
    'x => (y, z) => z * (x + y)',
    '(a = b, c) => {}',
    'x => x * x',
    '(x) => x',
    '(x) => x * x',
    '(x, y) => x + y',
    '(x, y, z) => x, y, z',
    '(x, y) => x.a = y',
    "() => ({'value': 42})",
    'x => y => x + y',
    '(x, y) => (u, v) => x*u + y*v',
    '(x, y) => z => z * (x + y)',
    'x => (y, z) => z * (x + y)',
    '(x, ...a) => {}',
    '({a} = {}) => {}',
    '({a} = {}) => {}',
    '(interface, eval) => {}',
    'yield => {}',
    'arguments => {}',
    '(...[]) => 0',
    '(()=>0)',
    '(()=>0)',
    '() => 0',
    '(...a) => 0',
    '([a]) => 0',
    'eval => {}',
    'arguments => {}',
    'yield => {}',
    'interface => {}',
    '(eval) => {}',
    '(arguments) => {}',
    '(yield) => {}',
    '(interface) => {}',
    '(eval, bar) => {}',
    '(bar, eval) => {}',
    '(bar, arguments) => {}',
    '(bar, yield) => {}',
    '(bar, interface) => {}',
    '(interface, eval) => {}',
    '(interface, arguments) => {}',
    '(eval, interface) => {}',
    '(arguments, interface) => {}',
    '(() => null)();',
    '(() => {})()',
    '(...args) => console.log( args );',
    'var double = (x) => x * 2',
    'let Y = F => (x=>F(y=>(x(x))(y)))(x=>F(y=>(x(x))(y)))',
    'factorial = x =>  x < 1 ? 1 : x * factorial(x-1)',
    'a => (a + 1)',
    `var foo = ({ name }) => \`\${name}! Hello \${name}!\`.toUpperCase();`,
    'const sum = ( ...nums ) => nums.reduce( ( t, n ) => t + n, 0 );',
    `'use strict';
 setTimeout( () => console.log( this ) );
  function foo () {
  'use strict';
  setTimeout( () => console.log( this ) );
}`
  ]) {
    it(`${arg};`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg};`, undefined, Context.Empty);
      });
    });
  }

  // valid tests

  pass('Expressions - Arrows (pass)', [
    [
      `eval => "use strict";`,
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
                value: 'use strict'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'eval'
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
      `var af = (x) =>
      { return x };`,
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: false
                },
                id: {
                  type: 'Identifier',
                  name: 'af'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `var af = (x) =>
  x;`,
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                },
                id: {
                  type: 'Identifier',
                  name: 'af'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `var af = x =>
      x;`,
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                },
                id: {
                  type: 'Identifier',
                  name: 'af'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `(x, y, z) => { return x + y + z; }`,
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
                body: [
                  {
                    type: 'ReturnStatement',
                    argument: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
                        type: 'Identifier',
                        name: 'z'
                      },
                      operator: '+'
                    }
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                },
                {
                  type: 'Identifier',
                  name: 'y'
                },
                {
                  type: 'Identifier',
                  name: 'z'
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
      `(x, y) => { x.a = y; }`,
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
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  }
                ]
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
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      `(x, y) => (u, v) => x*u + y*v`,
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
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'u'
                    },
                    operator: '*'
                  },
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'v'
                    },
                    operator: '*'
                  },
                  operator: '+'
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'u'
                  },
                  {
                    type: 'Identifier',
                    name: 'v'
                  }
                ],
                id: null,
                async: false,
                expression: true
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
              async: false,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `(x, y) => z => z * (x + y)`,
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
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  right: {
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
                  operator: '*'
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'z'
                  }
                ],
                id: null,
                async: false,
                expression: true
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
              async: false,
              expression: true
            }
          }
        ]
      }
    ],
    [
      `x => (y, z) => z * (x + y)`,
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
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  right: {
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
                  operator: '*'
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'y'
                  },
                  {
                    type: 'Identifier',
                    name: 'z'
                  }
                ],
                id: null,
                async: false,
                expression: true
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
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
      `(a, b) => 0, (c, d) => 1`,
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
                      type: 'Identifier',
                      name: 'b'
                    }
                  ],
                  id: null,
                  async: false,
                  expression: true
                },
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Literal',
                    value: 1
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'c'
                    },
                    {
                      type: 'Identifier',
                      name: 'd'
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
      `(a, b => {}, a => a + 1)`,
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
                  async: false,
                  expression: false
                },
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Literal',
                      value: 1
                    },
                    operator: '+'
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
              ]
            }
          }
        ]
      }
    ],
    [
      `((a, b) => {}, (a => a + 1))`,
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
                    }
                  ],
                  id: null,
                  async: false,
                  expression: false
                },
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Literal',
                      value: 1
                    },
                    operator: '+'
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
              ]
            }
          }
        ]
      }
    ],
    [
      `(a, (a, (b, c) => 0))`,
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
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    },
                    {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'Literal',
                        value: 0
                      },
                      params: [
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
                      async: false,
                      expression: true
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
      `foo ? bar : baz => {}`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'Identifier',
                name: 'foo'
              },
              consequent: {
                type: 'Identifier',
                name: 'bar'
              },
              alternate: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'baz'
                  }
                ],
                id: null,
                async: false,
                expression: false
              }
            }
          }
        ]
      }
    ],
    [
      `({}) => {}`,
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
                  type: 'ObjectPattern',
                  properties: []
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
      `([], a) => {}`,
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
                  type: 'ArrayPattern',
                  elements: []
                },
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
      `(a = b) => {}`,
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
                    type: 'Identifier',
                    name: 'b'
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
      `(a, b = c) => {}`,
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'c'
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
      `(x, y = 9, z = 8) => {}`,
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
                  name: 'x'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  right: {
                    type: 'Literal',
                    value: 9
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  right: {
                    type: 'Literal',
                    value: 8
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
      `(x, y = 9, {b}, z = 8, ...a) => {}`,
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
                  name: 'x'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  right: {
                    type: 'Literal',
                    value: 9
                  }
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
                      value: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  right: {
                    type: 'Literal',
                    value: 8
                  }
                },
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
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
      `({a} = {}) => {}`,
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
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  right: {
                    type: 'ObjectExpression',
                    properties: []
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
      `([x] = []) => {}`,
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
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ]
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: []
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
      `(...a) => 0`,
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
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
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
    ],
    [
      `e => "test"`,
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
                value: 'test'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'e'
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
      `e => { label: 42 }`,
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
                body: [
                  {
                    type: 'LabeledStatement',
                    label: {
                      type: 'Identifier',
                      name: 'label'
                    },
                    body: {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'Literal',
                        value: 42
                      }
                    }
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'e'
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
      `(a, b) => { 42; }`,
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
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Literal',
                      value: 42
                    }
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
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
      `(x=1) => x * x`,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                },
                operator: '*'
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  right: {
                    type: 'Literal',
                    value: 1
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
    ],
    [
      `arguments => 42`,
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
                value: 42
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'arguments'
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
      `(eval = 10) => 42`,
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
                value: 42
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'eval'
                  },
                  right: {
                    type: 'Literal',
                    value: 10
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
    ],
    [
      `(x) => ((y, z) => (x, y, z))`,
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
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'Identifier',
                      name: 'y'
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'y'
                  },
                  {
                    type: 'Identifier',
                    name: 'z'
                  }
                ],
                id: null,
                async: false,
                expression: true
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
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
      `foo(() => {})`,
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
                name: 'foo'
              },
              arguments: [
                {
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
              ]
            }
          }
        ]
      }
    ],
    [
      `foo((x, y) => {})`,
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: []
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
                  async: false,
                  expression: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `(sun) => earth`,
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
                name: 'earth'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'sun'
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
    /* [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}],
    [`const t = ({a}) => a`, Context.Empty,  {}], */
    [
      `const t = ({a}) => a`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'a'
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
                          value: {
                            type: 'Identifier',
                            name: 'a'
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
                },
                id: {
                  type: 'Identifier',
                  name: 't'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      `x => { function x() {} }`,
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
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
      `x => { var x; }`,
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
                          name: 'x'
                        }
                      }
                    ]
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
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      `(a, ...b) => {}`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              id: null,
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
              body: {
                type: 'BlockStatement',
                body: []
              },
              expression: false,
              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `(...a) => {}`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              id: null,
              params: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              expression: false,
              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a) => {}',
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
          }
        ]
      }
    ],
    [
      '(a = 1) => {}',
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
                    type: 'Literal',
                    value: 1
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
      '(x) => { var x; }',
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
                          name: 'x'
                        }
                      }
                    ]
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
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '(x) => { function x() {} }',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
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
  ]);
});

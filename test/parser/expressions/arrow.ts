import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Arrows', () => {
  const fuckingsIcefapper = [
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
  ];
  for (const arg of fuckingsIcefapper) {
    it(`${arg};`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg};`, undefined, Context.Empty);
      });
    });
  }

  const inValids: Array<[string, Context]> = [
    ['await => { let x; }', Context.AwaitContext],
    //    ['async await => {}', Context.Empty],
    ['async x => { let x; }', Context.Empty],
    // ['(x) => { let x; }', Context.Empty],
    ['x => { let x; }', Context.Empty],
    ['x => { const x; }', Context.Empty]
  ];
  fail('Expressions - Functions', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
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
  ];
  pass('Expressions - Arrows (pass)', valids);
});

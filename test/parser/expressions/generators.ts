import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Generators', () => {});

const validYieldInGenerator = [
  '',
  // Valid yield expressions inside generators.
  'yield 2;',
  'yield * 2;',
  'yield * \n 2;',
  'yield yield 1;',
  'yield * yield * 1;',
  'yield 3 + (yield 4);',
  'yield * 3 + (yield * 4);',
  '(yield * 3) + (yield * 4);',
  'yield 3; yield 4;',
  'yield * 3; yield * 4;',
  'yield { yield: 12 }',
  'yield /* comment */ { yield: 12 }',
  'yield * \n { yield: 12 }',
  'yield /* comment */ * \n { yield: 12 }',
  'yield 1; return',
  'yield * 1; return',
  'yield 1; return 37',
  'yield * 1; return 37',
  "yield 1; return 37; yield 'dead';",
  "yield * 1; return 37; yield * 'dead';",
  '({ yield: 1 })',
  '({ get yield() { } })',
  '({ [yield]: x } = { })',
  'yield;',
  'yield',
  'yield\n',
  'yield /* comment */',
  'yield // comment\n',
  '(yield)',
  '[yield]',
  '{yield}',
  'yield, yield',
  'yield; yield',
  '(yield) ? yield : yield',
  '(yield) \n ? yield : yield',
  'yield\nfor (;;) {}',
  'x = class extends (yield) {}',
  'x = class extends f(yield) {}',
  'x = class extends (null, yield) { }',
  'x = class extends (a ? null : yield) { }'
];

for (const arg of validYieldInGenerator) {
  it(`function * icefapper() {${arg}}`, () => {
    t.doesNotThrow(() => {
      parseSource(`function * icefapper() {${arg}}`, undefined, Context.Empty);
    });
  });

  it(`(function * icefapper() {${arg}})`, () => {
    t.doesNotThrow(() => {
      parseSource(`(function * icefapper() {${arg}})`, undefined, Context.Empty);
    });
  });

  it(`(function *() {${arg}})`, () => {
    t.doesNotThrow(() => {
      parseSource(`(function *() {${arg}})`, undefined, Context.Empty);
    });
  });
}

const validSyntax = [
  `var gen = function *() {
        yield [...yield yield];
      };`,
  `(function* () { yield\nv })`,
  `var gen = function *() {
        yield [...yield];
      };`,
  `(function* () { yield\nv })`,
  `var gen = function *() {
                yield [...yield];
              };`,
  '(function* () { yield *v });',
  '(function* () { fn(yield); });',
  '(function* () { yield; });',
  '(function* () { yield yield 10 });',
  '(function* () { yield });',
  '(function* () { yield v });',
  '(function* () { yield; });',
  `var g1 = function*() { yield; };
                var g2 = function*() { yield 1; };`,
  `var g = function*() {
                    ({  yield: 1 });
                  };`,
  `var gen = function *() {
                    yield {
                        ...yield,
                        y: 1,
                        ...yield yield,
                      };
                  };`,
  '(function* () { yield *v });',
  `var gfe = function* () { switch (1) { case yield: break; } }`,
  `var gfe = function* () { switch (1) { case yield* 'foo': break; } }`,
  `var o = { *gf() { yield* 'foo'; } }`,
  `f = function*([[,] = g()]) {}`,
  `f = function*([[x, y, z] = [4, 5, 6]]) {}`,
  `f = function*([[] = function() { return  function*() {}(); }()]) {}`,
  `f = function*([[] = function() {}()]) {}`,
  `f = function*([x = 23]) {}`,
  `f = function*([...[x, y, z]]) {}`,
  `f = function*([...x]) {}`,
  `f = function*([[,] = g()] = []) {}`,
  `f = function*([,]) {}`,
  `var f = function*([...x]) {};`,
  `f = function*([...{ 0: v, 1: w, 2: x, 3: y, length: z }]) {}`,
  `f = function*([[...x] = function() { initCount += 1; }()] = [[2, 1, 3]]) {}`,
  `f = function*([x = 23] = [,]) {}`,
  `f = function*([{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]) {}`,
  `f = function*({ w: [x, y, z] = [4, 5, 6] } = {}) {}`,
  `f = function*({ x, } = { x: 23 }) {}`,
  `f = function*({ x: y = 33 } = { }) {}`,
  `f = function*({a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3}) {}`,
  `var f = function*({}) {};`,
  `f = function*({ w: [x, y, z] = [4, 5, 6] }) {}`,
  `f = function*({ x: y }) {}`,
  `var f = function *(a) { yield a+1; return; };`,
  `var gen = function *g() {
                    yield [...yield];
                  };`,
  `var gen = function *g() {
                    yield {
                        ...yield,
                        y: 1,
                        ...yield yield,
                      };
                  };`,
  `var gen = function *g() {
                    yield [...yield];
                  };`,
  `ref = function*(a,) {};`,
  `var g1 = function*() { yield; };
                var g2 = function*() { yield 1; };`,
  `var g = function*() { yield yield 1; };`,
  `var gen = function *() {
                    yield {
                        ...yield,
                        y: 1,
                        ...yield yield,
                      };
                  };`,
  `var g = function*() {
                    yield *
                    g2();
                  };
                  var g2 = function*() {};`
];

for (const arg of validSyntax) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });
}

pass('Expressions - Generators (pass)', [
  [
    '(a)',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'a'
          }
        }
      ]
    }
  ],
  [
    '(x.foo)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'Identifier',
              name: 'x'
            },
            property: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x + foo)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
              type: 'Identifier',
              name: 'x'
            },
            right: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x.foo = y)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'x'
              },
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            },
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(typeof x)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'typeof',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  // ['((x));', Context.Empty, {}],
  [
    '(a = 1, b = 2);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Literal',
                  value: 1
                }
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Literal',
                  value: 2
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a.b) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a[b]) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  //['(a.b().c().d) = 1;', Context.Empty, {}],
  [
    '(a[b]) = 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a) += 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a.b) += 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a[b]) += 1;',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '+=',
            left: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            },
            right: {
              type: 'Literal',
              value: 1
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  // ['(a.b().c().d) += 1;', Context.Empty, {}],
  [
    '(delete foo.bar);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              property: {
                type: 'Identifier',
                name: 'bar'
              }
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([delete foo.bar]);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'UnaryExpression',
                operator: 'delete',
                argument: {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'bar'
                  }
                },
                prefix: true
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([target()[targetKey(a=b)]] = x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'target'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'targetKey'
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([a.b] = x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  property: {
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
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(void x)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'void',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[].length',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'ArrayExpression',
              elements: []
            },
            property: {
              type: 'Identifier',
              name: 'length'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x = y)',
    Context.Empty,
    {
      type: 'Program',
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
              type: 'Identifier',
              name: 'y'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(a, b)',
    Context.Empty,
    {
      type: 'Program',
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
                type: 'Identifier',
                name: 'b'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([a / b]);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'BinaryExpression',
                operator: '/',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '([a \n/b/g]);',
    Context.Empty,
    {
      body: [
        {
          expression: {
            elements: [
              {
                left: {
                  left: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  operator: '/',
                  right: {
                    name: 'b',
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
              }
            ],
            type: 'ArrayExpression'
          },
          type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ],
  [
    '(++x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            operator: '++',
            argument: {
              type: 'Identifier',
              name: 'x'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'delete (foo)',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: 'delete',
            argument: {
              type: 'Identifier',
              name: 'foo'
            },
            prefix: true
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(++x, y);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'UpdateExpression',
                operator: '++',
                argument: {
                  type: 'Identifier',
                  name: 'x'
                },
                prefix: true
              },
              {
                type: 'Identifier',
                name: 'y'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  /* ['(x--);', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UpdateExpression",
              "operator": "--",
              "argument": {
                  "type": "Identifier",
                  "name": "x"
              },
              "prefix": false
          }
      }
  ],
  "sourceType": "script"
}],*/
  /* ['(x--, y);', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "SequenceExpression",
              "expressions": [
                  {
                      "type": "UpdateExpression",
                      "operator": "--",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": false
                  },
                  {
                      "type": "Identifier",
                      "name": "y"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['(a=1)=2', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                  "type": "AssignmentPattern",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "Literal",
                      "value": 1,
                  }
              },
              "right": {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
              }
          }
      }
  ],
  "sourceType": "script"
}],*/
  [
    '([].x);',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            computed: false,
            object: {
              type: 'ArrayExpression',
              elements: []
            },
            property: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x + y) >= z',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: '>=',
            left: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            },
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '(x &= 42)',
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
            operator: '&=',
            right: {
              type: 'Literal',
              value: 42
            }
          }
        }
      ]
    }
  ],
  [
    '([a])',
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
                name: 'a'
              }
            ]
          }
        }
      ]
    }
  ]
]);

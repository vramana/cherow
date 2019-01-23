import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Assignment', () => {
  for (const arg of [
    '0, [[(x, y)]] = [[]];',
    // `0, [arguments] = [];`,
    `0, [...x = 1] = [];`,
    '(function*() { 0, { yield } = {}; });',
    '1 = 1;',
    '42 = 42;',
    'null = 42;',
    'function f() { (new.target) = 1; }'
  ]) {
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

  for (const arg of [
    '[v2 = 10, vNull = 11, vHole = 12, vUndefined = 13, vOob = 14] = [2, null, , undefined];',
    ' [ xFn = function x() {}, fn = function() {} ] = []',
    '0, [ x = y ] = [];',
    'x = [ x = yield ] = [];',
    '0, [[ _ ]] = [ , ];',
    '0, [[ x ]] = [undefined];',
    'x = [[{}[yield]]] = [[22]];',
    'a = [{ x = yield }] =  [{}];',
    '0, [ c ] = [1];',
    'x = [] = "string literal";',
    'x = [...[x]] = [];',
    'x = [...[x]] = [1, 2, 3]',
    'x = [...{ 0: x, length }] = [null];',
    'x = [...x[yield]] = [33, 44, 55];',
    'x = { yield } = { yield: 3 };',
    'x = { xFn = function x() {}, fn = function() {} } = {}',
    'x = { x: arrow = () => {} } = {};',
    'x = { x: xCover = (0, function() {}), x: cover = (function() {}) } = {};',
    '0, { x: x = y } = {};',
    '0, { x: [ x ] } = { x: null };',
    '0, { x: [ x ] } = {};',
    '0, { a: c } = { a: 2 };',
    'x = { xy: x.y } = { xy: 4 };',
    '0, {...rest} = null',
    'x = {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};',
    'x = {...x} = { get v() { count++; return 2; } };',
    '([target()[targetKey()]] = source());',
    'x = { __proto__: x, __proto__: y } = value;',
    'x = x = y = null;',
    'x = ({ __proto__: x, __proto__: y } = value);',
    'arrow = () => {};',
    'xCls = class x {};',
    'cls = class {};',
    'xCls2 = class { static name() {} };'
  ]) {
    it(`${arg};`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg};`, undefined, Context.Empty);
      });
    });
  }

  pass('Expressions - Assignment (pass)', [
    [
      'x <<= 42',
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
              operator: '<<=',
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
      '[a,b] = [b,a];',
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
                    name: 'a'
                  },
                  {
                    type: 'Identifier',
                    name: 'b'
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'b'
                  },
                  {
                    type: 'Identifier',
                    name: 'a'
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'a = (b, c)',
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
                name: 'a'
              },
              operator: '=',
              right: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'b'
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'a=0;',
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
                name: 'a'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      '(a)=(0);',
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
                name: 'a'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      'x *= 0',
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
              operator: '*=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      'x.x *= 0',
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'x'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              operator: '*=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      'x **= 0',
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
              operator: '**=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      '[0].length = 0',
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
                type: 'MemberExpression',
                object: {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'Literal',
                      value: 0
                    }
                  ]
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'length'
                }
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      '(a**b).c=0',
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
                type: 'MemberExpression',
                object: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  operator: '**'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'c'
                }
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      'a %= b',
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
                name: 'a'
              },
              operator: '%=',
              right: {
                type: 'Identifier',
                name: 'b'
              }
            }
          }
        ]
      }
    ],
    [
      'a = b = c',
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
                name: 'a'
              },
              operator: '=',
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
          }
        ]
      }
    ],
    [
      '((a)) = b;',
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
                name: 'a'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'b'
              }
            }
          }
        ]
      }
    ],
    [
      'x = ((y)) = z',
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
                  name: 'y'
                },
                operator: '=',
                right: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            }
          }
        ]
      }
    ],
    [
      'a = ((b)) = c;',
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
                name: 'a'
              },
              operator: '=',
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
          }
        ]
      }
    ],
    [
      'x &= 42',
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
      'x /= 42',
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
              operator: '/=',
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
      'x >>>= 42',
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
              operator: '>>>=',
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
      'x |= 42',
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
              operator: '|=',
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
      'a=1',
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
                name: 'a'
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
      'x.x *= 1',
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'x'
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              operator: '*=',
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
      'x **= 1',
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
              operator: '**=',
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
      'a /= b',
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
                name: 'a'
              },
              operator: '/=',
              right: {
                type: 'Identifier',
                name: 'b'
              }
            }
          }
        ]
      }
    ],
    [
      'a += b',
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
                name: 'a'
              },
              operator: '+=',
              right: {
                type: 'Identifier',
                name: 'b'
              }
            }
          }
        ]
      }
    ],
    [
      '(a) = b;',
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
                name: 'a'
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'b'
              }
            }
          }
        ]
      }
    ]
  ]);
});

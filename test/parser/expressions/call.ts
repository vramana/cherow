import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Call', () => {
  const asyncCallEdgeCases = [
    'async', // Async identifier
    'async()',
    'async(async(async(async(async(async())))))', // Nested
    'async(a)(b)',
    'async(a)(s)(y)(n)(c)',
    'async()()'
  ];

  for (const arg of asyncCallEdgeCases) {
    it(`function fn() { 'use strict';} fn(${arg});`, () => {
      t.doesNotThrow(() => {
        parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.Empty);
      });
    });
  }

  const spreadCall = [
    `a()(a)`,
    `async()()`,
    `async(a)()`,
    `async()(b)`,
    `async(a)(b)`,
    '...([1, 2, 3])',
    "...'123', ...'456'",
    '...new Set([1, 2, 3]), 4',
    '1, ...[2, 3], 4',
    '...Array(...[1,2,3,4])',
    '...NaN',
    "0, 1, ...[2, 3, 4], 5, 6, 7, ...'89'",
    "0, 1, ...[2, 3, 4], 5, 6, 7, ...'89', 10",
    "...[0, 1, 2], 3, 4, 5, 6, ...'7', 8, 9",
    "...[0, 1, 2], 3, 4, 5, 6, ...'7', 8, 9, ...[10]"
  ];

  for (const arg of spreadCall) {
    it(`function fn() { 'use strict';} fn(${arg});`, () => {
      t.doesNotThrow(() => {
        parseSource(`function fn() { 'use strict';} fn(${arg});`, undefined, Context.Empty);
      });
    });

    it(`function fn() { } fn(${arg});`, () => {
      t.doesNotThrow(() => {
        parseSource(`function fn() { } fn(${arg});`, undefined, Context.Empty);
      });
    });
  }

  const validSyntax = [
    'foo(...[],);',
    '(function(obj) {}(1, 2, 3, ...[]));',
    'foo(x=1,y=x,x+y)',
    'foo(x,x=1);',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'a.b( foo() );',
    'a.b.c( foo() );',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'a().b',
    'a.b( foo() );',
    'a.b.c( foo() );',
    'a.b( foo() );',
    'a.b( c() ).d;',
    'eval(...{}, "x = 0;");',
    'foo()(1, 2, 3, ...{})',
    'foo(...[],)',
    '(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));',
    'a.b( c() ).d.e;',
    'f();',
    'a.b( o.bar );',
    'a.b( o["bar"] );',
    'a.b( foo() );',
    'a.b.c( foo() );',
    'a.b( foo() );',
    'a.b( c() ).d;',
    'eval(...{}, "x = 0;");',
    'foo()(1, 2, 3, ...{})',
    'foo(...[],)',
    '(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));',
    'a.b( c() ).d.e;',
    'f();'
  ];

  for (const arg of validSyntax) {
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
      });
    });
  }

  const valids: Array<[string, Context, any]> = [
    [
      'foo(x,y,);',
      Context.Empty,
      {
        type: 'Program',
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
                  name: 'x'
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
    [
      'foo(a)',
      Context.Empty,
      {
        type: 'Program',
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
                  name: 'a'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(a, b, c)',
      Context.Empty,
      {
        type: 'Program',
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
                  name: 'a'
                },
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(...a)',
      Context.Empty,
      {
        type: 'Program',
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
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
      'foo(200)',
      Context.Empty,
      {
        type: 'Program',
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
                  type: 'Literal',
                  value: 200
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(a, b, ...c)',
      Context.Empty,
      {
        type: 'Program',
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
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'c'
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
      'foo(a)(b)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'foo'
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  }
                ]
              },
              arguments: [
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
      'foo(a)(b)(c)(d)(e)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'CallExpression',
                callee: {
                  type: 'CallExpression',
                  callee: {
                    type: 'CallExpression',
                    callee: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      arguments: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        }
                      ]
                    },
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'b'
                      }
                    ]
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'c'
                    }
                  ]
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'd'
                  }
                ]
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'e'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'async(a,b)',
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
    [
      'async()',
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
              arguments: []
            }
          }
        ]
      }
    ],
    [
      'foo()',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: []
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Expressions - Call (pass)', valids);
});

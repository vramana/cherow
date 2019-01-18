import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Declarations - Const', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['const a = b, a = c', Context.Empty],
    ['const a = b; const a = c', Context.Empty],
    ['let a = b; const a = c', Context.Empty],
    ['const a = b; let a = c', Context.Empty],
    ['const x = a; const x = b;', Context.Empty],
    ['let x = a; const x = b;', Context.Empty],
    ['var x = a; const x = b;', Context.Empty],

    // Bindings - Blockstatement

    ['const x; { let x; var y; }', Context.Empty],
    ['{ const f = a; let f; }', Context.Empty],
    ['{ const f = a; function f() {} }', Context.Empty],

    // General

    ['const a', Context.Empty],
    ['const a, b, c', Context.Empty],
    ['const a, b = c', Context.Empty],
    ['const class = foo', Context.Empty],
    ['const break = foo', Context.Empty],
    ['const break = foo', Context.Empty],
    ['const let = "foo";', Context.Empty],
    [
      `const
    let = "irrelevant initializer";`,
      Context.Empty
    ],
    ['let let', Context.Empty]
  ];
  fail('Declarations - Let (fail)', inValids);
  const validSyntax = [
    'const a = Infinity;',
    'const b = -Infinity;',
    'const c = +Infinity;',
    'const d = /abc/;',
    'const e = /abc/g;',
    'const f = /abc/gi;'
  ];

  for (const arg of validSyntax) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }
  pass('Declarations - Const (pass)', [
    // Babylon issue: https://github.com/babel/babel/issues/6687
    [
      'const await = foo;',
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
                  type: 'Identifier',
                  name: 'foo'
                },
                id: {
                  type: 'Identifier',
                  name: 'await'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '"use strict"; { const x = 1; }; x = 0;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict'
            },
            directive: 'use strict'
          },
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'Literal',
                      value: 1
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
          {
            type: 'EmptyStatement'
          },
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
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      'const foo = bar;',
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
                  name: 'foo'
                },
                init: {
                  type: 'Identifier',
                  name: 'bar'
                }
              }
            ],
            kind: 'const'
          }
        ],
        sourceType: 'script'
      }
    ]
  ]);
});

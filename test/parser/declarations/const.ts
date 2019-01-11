import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

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
    ['const break = foo', Context.Empty]
  ];

  pass('Declarations - Const (pass)', [
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

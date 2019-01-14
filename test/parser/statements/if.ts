import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - if', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings
    ['if (a) function(){}', Context.OptionsDisableWebCompat],
    ['if (a) class A {}', Context.OptionsDisableWebCompat],
    ['if (true) function* g() {  } else function* _g() {}', Context.OptionsDisableWebCompat],
    ['if (true) function* g() {  } else ;', Context.OptionsDisableWebCompat],
    ['if (true) function* g() {  }', Context.OptionsDisableWebCompat],
    ['if (false) ; else function* g() {  }', Context.OptionsDisableWebCompat]
  ];

  fail('Statements - If (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    // Should only pass with AnnexB
    [
      'if (a) function a(){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'a'
            },
            consequent: {
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
                name: 'a'
              }
            },
            alternate: null
          }
        ]
      }
    ],
    [
      'if (foo) bar;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'foo'
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'bar'
              }
            },
            alternate: null
          }
        ]
      }
    ],
    [
      'if (foo) bar; else doo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'foo'
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'bar'
              }
            },
            alternate: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'doo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
    //['if (foo) a; if (bar) b; else c;', Context.OptionDisablesWebCompat, {}]
  ];

  pass('Statements - Block (pass)', valids);
});

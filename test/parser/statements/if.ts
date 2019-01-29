import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - if', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings
    ['if (a) function(){}', Context.Empty],
    ['if (a) class A {}', Context.Empty],
    ['if (true) function* g() {  } else function* _g() {}', Context.Empty],
    ['if (true) function* g() {  } else ;', Context.Empty],
    ['if (true) function* g() {  }', Context.Empty],
    ['if (false) ; else function* g() {  }', Context.Empty]
  ];

  fail('Statements - If (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    // Should only pass with AnnexB
    [
      'if (a) function a(){}',
      Context.OptionsWebCompat | Context.OptionsRanges,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'a',
              start: 4,
              end: 5
            },
            consequent: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 19,
                end: 21
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'a',
                start: 16,
                end: 17
              },
              start: 7,
              end: 21
            },
            alternate: null,
            start: 0,
            end: 21
          }
        ],
        start: 0,
        end: 21
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

  pass('Statements - If (pass)', valids);
});

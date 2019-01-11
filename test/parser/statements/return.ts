import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Return', () => {
  const inValids: Array<[string, Context]> = [
    ['return;', Context.OptionsDisableWebCompat],
    ['{ return; }', Context.OptionsDisableWebCompat],
    ['returif (false) { return; };', Context.OptionsDisableWebCompat],
    ['do { return; } while(0);', Context.OptionsDisableWebCompat]
  ];

  fail('Statements - Return (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'return;',
      Context.OptionsGlobalReturn,
      {
        body: [
          {
            argument: null,
            type: 'ReturnStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
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

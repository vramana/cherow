import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - With', () => {
  const inValids: Array<[string, Context]> = [
    ['with(1) b: function a(){}', Context.OptionsDisableWebCompat],
    // ['with ({}) async function f() {}', Context.OptionDisablesWebCompat],
    ['with ({}) function f() {}', Context.OptionsDisableWebCompat],
    ['with ({}) let x;', Context.OptionsDisableWebCompat],
    ['while 1 break;', Context.OptionsDisableWebCompat],
    [`while '' break;`, Context.OptionsDisableWebCompat],
    ['while (false) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
    [
      `while({1}){
      break ;
   };`,
      Context.Module
    ]
  ];

  fail('Statements - While (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'a: while (true) continue a;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            }
          }
        ]
      }
    ],
    [
      'with (x) foo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'WithStatement',
            object: {
              type: 'Identifier',
              name: 'x'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
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
      'with (x) { foo }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'WithStatement',
            object: {
              type: 'Identifier',
              name: 'x'
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - With (pass)', valids);
});

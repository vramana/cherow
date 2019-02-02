import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Do while', () => {
  const inValids: Array<[string, Context]> = [
    ['with(1) b: function a(){}', Context.Empty],
    ['with ({}) async function f() {}', Context.Empty],
    ['with ({}) function f() {}', Context.Empty],
    ['with ({}) let x;', Context.Empty],
    ['while 1 break;', Context.Empty],
    [`while '' break;`, Context.Empty],
    ['while (false) label1: label2: function f() {}', Context.Empty],
    [
      `while({1}){
      break ;
   };`,
      Context.Module
    ]
  ];

  fail('Statements - Do while (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'do /x/; while (false);',
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                regex: {
                  flags: '',
                  pattern: 'x'
                },
                type: 'Literal',
                value: /x/
              },
              type: 'ExpressionStatement'
            },
            test: {
              type: 'Literal',
              value: false
            },
            type: 'DoWhileStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'do async \n () \n while (y)',
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                arguments: [],
                callee: {
                  name: 'async',
                  type: 'Identifier'
                },
                type: 'CallExpression'
              },
              type: 'ExpressionStatement'
            },
            test: {
              name: 'y',
              type: 'Identifier'
            },
            type: 'DoWhileStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'do foo; while (bar);',
      Context.LocationTracking,
      {
        type: 'Program',
        start: 0,
        end: 20,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 20
          }
        },
        body: [
          {
            type: 'DoWhileStatement',
            start: 0,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 20
              }
            },
            body: {
              type: 'ExpressionStatement',
              start: 3,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 1,
                  column: 7
                }
              },
              expression: {
                type: 'Identifier',
                start: 3,
                end: 6,
                loc: {
                  start: {
                    line: 1,
                    column: 3
                  },
                  end: {
                    line: 1,
                    column: 6
                  }
                },
                name: 'foo'
              }
            },
            test: {
              type: 'Identifier',
              start: 15,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 18
                }
              },
              name: 'bar'
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Do while (pass)', valids);
});

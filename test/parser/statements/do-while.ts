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
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'foo'
              }
            },
            test: {
              type: 'Identifier',
              name: 'bar'
            }
          }
        ]
      }
    ]
  ];

  pass('Statements - Do while (pass)', valids);
});

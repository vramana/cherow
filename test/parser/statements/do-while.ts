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
      Context.OptionsRanges,
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
                name: 'foo',
                start: 3,
                end: 6
              },
              start: 3,
              end: 7
            },
            test: {
              type: 'Identifier',
              name: 'bar',
              start: 15,
              end: 18
            },
            start: 0,
            end: 20
          }
        ],
        start: 0,
        end: 20
      }
    ]
  ];

  pass('Statements - Do while (pass)', valids);
});

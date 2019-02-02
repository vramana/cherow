import { Context } from '../../src/common';
import { pass, fail } from '../test-utils';

describe('Experimental - TopLevel Await', () => {
  fail('Declarations - Functions (fail)', [
    ['function foo() {return await 1}', Context.Strict | Context.Module],
    ['function foo() {return await 1}', Context.Strict | Context.Module],
    ['function foo() {return await 1}', Context.Empty],
    ['function foo() {return await 1}', Context.Empty]
  ]);

  pass('Experimental - TopLevel Await', [
    [
      'const strings = await import(`/i18n/${navigator.language}`);',
      Context.OptionsGlobalAwait | Context.OptionsNext,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'strings',
                  type: 'Identifier'
                },
                init: {
                  argument: {
                    arguments: [
                      {
                        expressions: [
                          {
                            computed: false,
                            object: {
                              name: 'navigator',
                              type: 'Identifier'
                            },
                            property: {
                              name: 'language',
                              type: 'Identifier'
                            },
                            type: 'MemberExpression'
                          }
                        ],
                        quasis: [
                          {
                            tail: false,
                            type: 'TemplateElement',
                            value: {
                              cooked: '/i18n/',
                              raw: '/i18n/'
                            }
                          },
                          {
                            tail: true,
                            type: 'TemplateElement',
                            value: {
                              cooked: '',
                              raw: ''
                            }
                          }
                        ],
                        type: 'TemplateLiteral'
                      }
                    ],
                    callee: {
                      type: 'Import'
                    },
                    type: 'CallExpression'
                  },
                  type: 'AwaitExpression'
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'const',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ]
  ]);

  pass('Experimental - Export-ns-from', [
    [
      'await 1',
      Context.OptionsGlobalAwait,
      {
        body: [
          {
            expression: {
              argument: {
                type: 'Literal',
                value: 1
              },
              type: 'AwaitExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ]
  ]);
});

import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Experimental - Do expression', () => {});

pass('Experimental - Do expression (pass)', [
  [
    `let x = do {
      if (foo()) { f() }
      else if (bar()) { g() }
      else { h() }
    }; `,
    Context.OptionsExperimental,
    {
      body: [
        {
          declarations: [
            {
              id: {
                name: 'x',
                type: 'Identifier'
              },
              init: {
                body: {
                  body: [
                    {
                      alternate: {
                        alternate: {
                          body: [
                            {
                              expression: {
                                arguments: [],
                                callee: {
                                  name: 'h',
                                  type: 'Identifier'
                                },
                                type: 'CallExpression'
                              },
                              type: 'ExpressionStatement'
                            }
                          ],
                          type: 'BlockStatement'
                        },
                        consequent: {
                          body: [
                            {
                              expression: {
                                arguments: [],
                                callee: {
                                  name: 'g',
                                  type: 'Identifier'
                                },
                                type: 'CallExpression'
                              },
                              type: 'ExpressionStatement'
                            }
                          ],
                          type: 'BlockStatement'
                        },
                        test: {
                          arguments: [],
                          callee: {
                            name: 'bar',
                            type: 'Identifier'
                          },
                          type: 'CallExpression'
                        },
                        type: 'IfStatement'
                      },
                      consequent: {
                        body: [
                          {
                            expression: {
                              arguments: [],
                              callee: {
                                name: 'f',
                                type: 'Identifier'
                              },
                              type: 'CallExpression'
                            },
                            type: 'ExpressionStatement'
                          }
                        ],
                        type: 'BlockStatement'
                      },
                      test: {
                        arguments: [],
                        callee: {
                          name: 'foo',
                          type: 'Identifier'
                        },
                        type: 'CallExpression'
                      },
                      type: 'IfStatement'
                    }
                  ],
                  type: 'BlockStatement'
                },
                type: 'DoExpression'
              },
              type: 'VariableDeclarator'
            }
          ],
          kind: 'let',
          type: 'VariableDeclaration'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
  ]
]);

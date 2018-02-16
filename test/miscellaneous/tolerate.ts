import { pass, fail } from '../test-utils';

describe('Miscellaneous - Tolerate', () => {

    pass(`f(a b c);`, {
        source: `f(a b c);`,
        tolerate: true,
        raw: true,
        expected: {
              body: [
                {
                  expression: {
                    arguments: [
                      {
                       name: 'a',
                        type: 'Identifier'
                      },
                      {
                        name: 'c',
                        type: 'Identifier'
                      },
                    ],
                    callee: {
                      name: 'f',
                      type: 'Identifier'
                    },
                    type: 'CallExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              errors: [
                {
                  column: 5,
                  description: 'Unexpected token ,',
                  index: 5,
                  lineNumber: 1,
                }
             ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`"use strict"; let eval;`, {
        source: `"use strict"; let eval;`,
        loc: true,
        ranges: true,
        tolerate: true,
        raw: true,
        expected: {
              body: [
                {
                  directive: 'use strict',
                  end: 13,
                  expression: {
                    end: 12,
                    loc: {
                      end: {
                        column: 12,
                       line: 1,
                      },
                      start: {
                        column: 0,
                        line: 1,
                      }
                    },
                   raw: '"use strict"',
                    start: 0,
                    type: 'Literal',
                    value: 'use strict',
                  },
                  loc: {
                    end: {
                      column: 13,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                   }
                  },
                  start: 0,
                  type: 'ExpressionStatement'
                },
                {
                  declarations: [
                    {
                      end: 22,
                      id: {
                        end: 22,
                        loc: {
                          end: {
                            column: 22,
                            line: 1,
                          },
                          start: {
                            column: 18,
                            line: 1,
                          }
                        },
                        name: 'eval',
                        start: 18,
                        type: 'Identifier',
                      },
                      init: null,
                      loc: {
                        end: {
                          column: 22,
                          line: 1,
                        },
                        start: {
                          column: 18,
                          line: 1,
                       },
                     },
                      start: 18,
                     type: 'VariableDeclarator'
                    }
                  ],
                  end: 23,
                  kind: 'let',
                  loc: {
                    end: {
                      column: 23,
                      line: 1,
                    },
                    start: {
                      column: 14,
                      line: 1,
                    }
                  },
                  start: 14,
                  type: 'VariableDeclaration'
                }
              ],
              end: 23,
              errors: [
                {
                  column: 17,
                  description: 'The identifier \'eval\' must not be in binding position in strict mode',
                  index: 17,
                  lineNumber: 1,
                },
              ],
              loc: {
                end: {
                  column: 23,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program',
            }
    });
});
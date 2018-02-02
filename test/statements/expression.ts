import { pass, fail } from '../test-utils';

describe('Statements - Expression', () => {

      pass(`x, y`, {
          source: 'x, y',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
            start: 0,
            end: 4,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 4
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                expression: {
                  type: 'SequenceExpression',
                  start: 0,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  },
                  expressions: [
                    {
                      type: 'Identifier',
                      start: 0,
                      end: 1,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 1
                        }
                      },
                      name: 'x'
                    },
                    {
                      type: 'Identifier',
                      start: 3,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      name: 'y'
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
      });
  });
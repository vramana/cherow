import * as t from 'assert';
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - Empty', () => {

  describe('Pass', () => {

    pass(`x, y`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `x, y`,
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
});

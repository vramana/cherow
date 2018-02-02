import { fail, pass } from '../test-utils';

describe('Literal - Null', () => {

  pass(`null`, {
    source: 'null',
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
            type: 'Literal',
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
            value: null,
            raw: 'null'
          }
        }
      ],
      sourceType: 'script'
    }
  });
});
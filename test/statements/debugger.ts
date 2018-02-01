import { pass } from '../test-utils';

describe('Statements - Continue', () => {

      pass(`debugger`, {
          source: 'debugger',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            type: 'Program',
            start: 0,
            end: 8,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 8
              }
            },
            body: [
              {
                type: 'DebuggerStatement',
                start: 0,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

      pass(`debugger;`, {
        source: 'debugger;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 9
              }
            },
            body: [
              {
                type: 'DebuggerStatement',
                start: 0,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });
});

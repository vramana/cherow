import { pass, fail } from '../test-utils';

describe('Statements - Debugger', () => {

  fail(`(debugger);`, {
    source: '(debugger);',
    line: 1
  });

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

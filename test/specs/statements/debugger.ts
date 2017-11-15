import { fail, pass } from '../utils/test-utils';

describe('Statements - Debugger', () => {

   fail('`debugger` token occupy an expression position', '(debugger);');

    pass('debugger;', 'debugger;', {
        type: 'Program',
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
        sourceType: 'script',
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
    });
});
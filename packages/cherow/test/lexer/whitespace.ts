import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';

// https://github.com/tc39/test262/tree/master/test/language/white-space

describe('Lexer - Whitespace', () => {

    function pass(name: string, opts: any) {
        it(name, () => {
            const state = new State(opts.source, undefined, undefined);
            nextToken(state, Context.Empty);
            t.deepEqual({
                line: state.line,
                column: state.column,
            }, {
                line: opts.line,
                column: opts.column
            }, );
        });
    }

    pass('should skip nothing', {
      source: '',
      line: 1, column: 0,
    });

    pass('should skip newline and linefeed', {
      source: '\u2028',
      line: 2, column: 0,
    });

    pass('should skip newline and linefeed', {
      source: '\r\n',
      line: 2, column: 0,
    });

    pass('should skip newline', {
      source: '\r',
      line: 2, column: 0,
    });

    pass('should skip newline', {
      source: '\n',
      line: 2, column: 0,
    });

    pass('should skip none-breaking space', {
      source: '\A0',
      line: 1, column: 2,
    });

    pass('should skip punctual space', {
      source: '\u2008',
      line: 1, column: 1,
    });

    pass('should skip punctual space', {
      source: '\u2008',
      line: 1, column: 1,
    });

    pass('should skip EmQuad', {
      source: '\u2001',
      line: 1, column: 1,
    });

    pass('should skip ideographic space', {
      source: '\u3000',
      line: 1, column: 1,
    });

    pass('should skip tabs', {
      source: '\t\t\t\t\t\t\t\t',
      line: 1, column: 8,
    });

    pass('should skip vertical tabs', {
      source: '\v\v\v\v\v\v\v\v',
      line: 1, column: 8,
    });

    pass('should skip mixed whitespace', {
      source: '    \t \r\n \n\r \v\f\t ',
      line: 4, column: 5,
    });

    pass('should skip mixed whitespace', {
      source: '    \t \r\n \n\r \v\f\t ',
      line: 4, column: 5,
  });
});

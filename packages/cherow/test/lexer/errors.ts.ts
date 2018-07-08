import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';

describe('Lexer - Error location', () => {

  interface Opts {
      source: string;
      value ? : string;
      index: number;
      line: number;
      column: number;
  }

  function fail(name: string, opts: Opts): void {
      it(name, () => {
          const state = new State(opts.source, undefined, undefined);

          try {
              nextToken(state, Context.Empty);
          } catch (e) {
              t.deepEqual({
                  index: state.index,
                  line: state.line,
                  column: state.column,
              },          {
                  line: opts.line,
                  index: opts.index,
                  column: opts.column
              });
          }
      });
  }

  fail('should throw on "/* asf "', {
      source: `/* asf `,
      line: 1,
      column: 7,
      index: 7
  });

  fail('should throw on "/* asf "', {
      source: ` \n \r  \t \t \t /* asf \t `,
      line: 3,
      column: 17,
      index: 21
  });

  fail('should throw on "3inOne"', {
      source: `3inOne`,
      line: 1,
      column: 1,
      index: 1
  });

  fail('should throw on "0b"', {
      source: `0b`,
      line: 1,
      column: 2,
      index: 2
  });

  fail('should throw on "0b01010101a"', {
      source: `0b01010101a`,
      line: 1,
      column: 10,
      index: 10
  });

  fail('should throw on "0o564a"', {
      source: `0o564a`,
      line: 1,
      column: 5,
      index: 5
  });

  fail('should throw on "foo', {
      source: `"foo`,
      line: 1,
      column: 3,
      index: 4
  });

  fail('should throw on "\\uD.01"', {
      source: '\\uD.01',
      line: 1,
      column: 3,
      index: 3
  });

  fail('should throw on "\\u"', {
      source: '\\u',
      line: 1,
      column: 2,
      index: 2
  });

  fail('should throw on "\\u0x11ffff"', {
      source: '\\u0x11ffff',
      line: 1,
      column: 3,
      index: 3
  });

  fail('should throw on "a\\u"', {
      source: 'a\\u',
      line: 1,
      column: 3,
      index: 3
  });

  fail('should throw on "\\ug000"', {
      source: '\\ug000',
      line: 1,
      column: 2,
      index: 2
  });

  fail('should throw on "\\u{g}"', {
      source: '\\u{g}',
      line: 1,
      column: 3,
      index: 3
  });

  fail('should throw on "\\xfg"', {
      source: '\\xfg',
      line: 1,
      column: 1,
      index: 1
  });

  fail('should throw on \n\r\n\n\\"\\xfg"', {
      source: '\n\r\n\n\\xfg',
      line: 4,
      column: 1,
      index: 5
  });
});

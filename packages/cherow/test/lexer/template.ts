import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Template literal', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context, isEnd: boolean) {
          it(name, () => {
              if (opts.strict !== true) {
                  const parser = new State(isEnd ? opts.source : `${opts.source} `, undefined, undefined);

                  t.deepEqual({
                      token: nextToken(parser, context),
                      value: parser.tokenValue,
                      line: parser.line,
                      column: parser.column,
                  },          {
                      token: Token.TemplateTail,
                      value: opts.value,
                      line: opts.line,
                      column: opts.column,
                  });
              }
          });
      }

      test(`${name}`, Context.Empty, false);
  }

  pass('scans ""', {
      source: '`a`',
      value: 'a',
      raw: '""',
      line: 1,
      column: 3,
  });

  pass('scans "`\n`"', {
      source: '`\n`',
      value: '\n',
      raw: '\n',
      line: 2,
      column: 1,
  });

  pass('scans "`abc`"', {
      source: '`abc`',
      value: 'abc',
      raw: '""',
      line: 1,
      column: 5,
  });

});

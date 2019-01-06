import * as t from 'assert';
import { scan, hasNext } from '../../src/scanner';
import { Context } from '../../src/common';
import { Chars } from '../../src/chars';
import { create } from '../../src/state';
import { Token, tokenDesc } from '../../src/token';

describe('Lexer - OnToken', () => {
  interface Opts {
    source: string;
    token: Token;
    hasNext: boolean;
    line: number;
    column: number;
    index: number;
  }
  function pass(name: string, opts: Opts) {
    it(name, () => {
      let token: any;
      const parser = create(opts.source, undefined, function(t: Token, start: number, end: number) {
        token = {
          token: t,
          start,
          end
        };
      });
      scan(parser, Context.OptionsTokenize);
      t.deepEqual(
        {
          hasNext: hasNext(parser),
          line: parser.line,
          column: token.end,
          index: parser.index,
          token: token.token
        },
        {
          token: opts.token,
          hasNext: hasNext(parser),
          line: parser.line,
          column: parser.column,
          index: parser.index
        }
      );
    });
  }

  pass('tokenize right brace', {
    source: '}',
    token: Token.RightBrace,
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });

  pass('tokenize left bracket', {
    source: '[',
    token: Token.LeftBracket,
    hasNext: false,
    index: 1,
    line: 1,
    column: 1
  });
});

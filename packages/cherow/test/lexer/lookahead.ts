import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { lookAheadOrScan } from '../../src/lexer/common';
import { Token } from '../../src/token';
import { ParserState } from '../../src/types';

describe('Lexer - Lookahead', () => {

  function pass(name: string, opts: any) {
      it(name, () => {
          const state = new State(opts.source, undefined, () => {});
          nextToken(state, opts.context);
          lookAheadOrScan(state, opts.context, (state: ParserState, context: Context) => {
            context = opts.context;
            return nextToken(state, context) === opts.token;
          },              opts.rewind);

          t.deepEqual({
              value: state.tokenValue,
              raw: state.tokenRaw,
              column: state.column,
              index: state.index,
              line: state.line,
              startLine: state.startLine,
              lastLine: state.lastLine,
              lastColumn: state.lastColumn,
          },          {
              value: opts.value,
              raw: opts.raw,
              line: opts.line,
              column: opts.column,
              index: opts.index,
              lastLine: opts.lastLine,
              startLine: opts.startLine,
              lastColumn: opts.lastColumn
          });
      });
  }
  pass('should find the "case" keyword and rewind', {
      source: 'keyword case',
      value: 'keyword',
      raw: 'keyword',
      rewind: true,
      token: Token.CaseKeyword,
      context: Context.OptionsRawidentifiers,
      line: 1,
      column: 7,
      startLine: 1,
      lastLine: 1,
      index: 7,
      lastColumn: 0
  });

  pass('should find the "case" keyword and continue parsing', {
      source: 'keyword case',
      value: 'case',
      raw: 'case',
      rewind: false,
      token: Token.CaseKeyword,
      context: Context.OptionsRawidentifiers,
      line: 1,
      column: 12,
      startLine: 1,
      lastLine: 1,
      index: 12,
      lastColumn: 7
  });

  pass('should find the "number" keyword and continue parsing', {
      source: 'number 123',
      value: '123',
      raw: '123',
      rewind: false,
      token: Token.NumericLiteral,
      context: Context.OptionsRaw,
      line: 1,
      column: 10,
      startLine: 1,
      lastLine: 1,
      index: 10,
      lastColumn: 6
  });

  pass('should find the "number" keyword and rewind when found a string literal', {
      source: 'number "string literal"',
      value: 'number',
      raw: null, // Raw should be "null" because we haven't set the "rawIdentifier" option
      rewind: false,
      token: Token.NumericLiteral,
      context: Context.OptionsRaw,
      line: 1,
      column: 6,
      startLine: 1,
      lastLine: 1,
      index: 6,
      lastColumn: 0
  });

  pass('should find the "case" keyword and rewind when found the "else" keyword', {
      source: 'keyword case',
      value: 'keyword',
      raw: 'keyword',
      rewind: false,
      token: Token.ElseKeyword,
      context: Context.OptionsRawidentifiers,
      line: 1,
      column: 7,
      startLine: 1,
      lastLine: 1,
      index: 7,
      lastColumn: 0
  });

  pass('should figure out if "let" is an valid identifier and rewind if it is', {
      source: 'let [foo]', // not an identifier!
      value: 'let',
      raw: null, // Raw should be "null" because we haven't set the "rawIdentifier" option
      rewind: false,
      token: Token.Contextual,
      context: Context.OptionsRaw,
      line: 1,
      column: 3,
      startLine: 1,
      lastLine: 1,
      index: 3,
      lastColumn: 0
  });

  pass('should figure out if next token is "async" followed by left parenthesis', {
      source: 'async(chinese)',
      value: 'async',
      raw: null, // Raw should be "null" because we haven't set the "rawIdentifier" option
      rewind: false,
      token: Token.LeftParen,
      context: Context.OptionsRaw,
      line: 1,
      column: 6,
      startLine: 1,
      lastLine: 1,
      index: 6,
      lastColumn: 5
  });

  pass('should figure out if next token is "async" followed by left parenthesis and rewind when found a right parenthesis', {
      source: 'async)',
      value: 'async',
      raw: null,
      rewind: false,
      token: Token.LeftParen,
      context: Context.OptionsRaw,
      line: 1,
      column: 5,
      startLine: 1,
      lastLine: 1,
      index: 5,
      lastColumn: 0
  });

  pass('should figure out if next token is "async" followed by left parenthesis', {
      source: `a
  b`,
      value: 'b',
      raw: 'b',
      rewind: false,
      token: Token.Identifier,
      context: Context.OptionsRawidentifiers,
      index: 5,
      line: 2,
      column: 3,
      lastColumn: 1,
      startLine: 2,
      lastLine: 1,
  });

  pass('should figure out if next token is "async" followed by left parenthesis', {
    source: `/* habol pa more! */ from, china`,
    value: 'from',
    raw: 'from',
    rewind: true,
    token: Token.NumericLiteral,
    context: Context.OptionsRawidentifiers,
    index: 25,
    line: 1,
    column: 25,
    lastColumn: 0,
    startColumn: 25,
    startLine: 1,
    lastLine: 1,
});

  pass('should not rewind if lookahead and you are from china', {
    source: `/* habol pa more! */ from, china`,
    value: 'from',
    raw: 'from',
    rewind: false,
    token: Token.Comma,
    context: Context.OptionsRawidentifiers,
    index: 26,
    line: 1,
    column: 26,
    lastColumn: 25,
    startColumn: 25,
    startLine: 1,
    lastLine: 1,
  });

});

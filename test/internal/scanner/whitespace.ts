import * as t from 'assert';
import { Context, Flags } from '../../../src/common';
import { Token, descKeywordTable } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

describe('Lexer - Whitespace', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const state = create(opts.source);
      const token = scanSingleToken(state, opts.ctx);
      t.deepEqual(
        {
          value: state.tokenValue,
          index: state.index,
          newLine: (state.flags & Flags.NewLine) !== 0
        },
        {
          value: opts.value,
          index: opts.index,
          newLine: opts.newLine
        }
      );
    });
  }

  pass('skips white spaceeeeee', {
    source: '\u0020',
    hasNext: false,
    value: '',
    newLine: false,
    line: 1,
    index: 1
  });

  pass('skips paragraphseparator', {
    source: '\u2028',
    hasNext: false,
    value: '',
    newLine: true,
    line: 1,
    index: 1
  });

  pass('skips white space', {
    source: '\true',
    hasNext: false,
    value: 'rue',
    newLine: false,
    line: 1,
    index: 4
  });

  pass('skips lineseparator', {
    source: '\u2029',
    hasNext: false,
    value: '',
    newLine: true,
    line: 1,
    index: 1
  });

  pass('skips lineseparator after identifier', {
    source: 'foo \u2029',
    hasNext: false,
    newLine: false,
    value: 'foo',
    line: 1,
    index: 3
  });

  pass('skips crlf', {
    source: '\r\n',
    hasNext: false,
    newLine: true,
    value: '',
    line: 2,
    index: 2
  });

  pass('skips crlf before identifier', {
    source: '\r\n foo',
    hasNext: false,
    newLine: true,
    value: 'foo',
    line: 1,
    index: 6
  });

  pass('skips form feed', {
    source: '\u000C',
    hasNext: false,
    newLine: false,
    value: '',
    line: 1,
    index: 1
  });
});

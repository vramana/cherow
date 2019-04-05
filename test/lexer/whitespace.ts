import * as t from 'assert';
import { Context, Flags } from '../../src/common';
import { Token, descKeywordTable } from '../../src/token';
import { create } from '../../src/parser';
import { scanSingleToken } from '../../src/scanner/scan';

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

  pass('skips white spacee', {
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

  pass('skips exotic whitespace', {
    source:
      '\x20\x09\x0B\x0C\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000',
    hasNext: false,
    newLine: false,
    value: '',
    line: 1,
    index: 20
  });

  pass('skips single line comment with identifier and newline', {
    source: '// foo\n',
    hasNext: false,
    newLine: true,
    value: '',
    index: 7
  });

  pass('skips multi line comment with escaped newline', {
    source: '/* \\n \\r \\x0a \\u000a */',
    hasNext: false,
    newLine: false,
    value: '',
    index: 23
  });

  pass('skips single line comment with malformed escape', {
    source: '//\\unope \\u{nope} \\xno ',
    hasNext: false,
    value: '',
    newLine: false,
    index: 23
  });

  pass('skips single line comment with escaped newlines', {
    source: '//\\n \\r \\x0a \\u000a still comment',
    hasNext: false,
    value: '',
    newLine: false,
    index: 33
  });

  pass('skips single line comment with paragrap separator', {
    source: '//Single Line Comments\u2029 var =;',
    hasNext: true,
    newLine: true,
    value: 'var',
    index: 27
  });

  pass('skips single line comment with Windows newline', {
    source: '// single line comment\u000D',
    hasNext: false,
    newLine: true,
    value: '',
    index: 23
  });

  pass('skips multi line comment with carriage return', {
    source: '/*\\rmulti\\rline\\rcomment\\rx = 1;\\r*/',
    hasNext: false,
    newLine: false,
    value: '',
    index: 36
  });

  pass('skips multi line comment with carriage return', {
    source: '/*\\rmulti\\rline\\rcomment\\rx = 1;\\r*/',
    hasNext: false,
    newLine: false,
    value: '',
    index: 36
  });

  pass('skips single line comment with no break space', {
    source: '//\u00A0 single line \u00A0 comment \u00A0',
    hasNext: false,
    newLine: false,
    value: '',
    index: 27
  });

  pass('skips single line comment with form feed', {
    source: '//\u000C single line \u000C comment \u000C',
    hasNext: false,
    newLine: false,
    value: '',
    index: 27
  });

  pass('skips single line comment with identifier and newline', {
    source: '// foo\n',
    hasNext: false,
    newLine: true,
    value: '',
    index: 7
  });

  pass('skips text after HTML close', {
    source: '\n-->',
    hasNext: false,
    newLine: true,
    value: '',
    index: 4
  });

  pass('skips multi line comment with escaped newline', {
    source: '/* \\n \\r \\x0a \\u000a */',
    hasNext: false,
    newLine: false,
    value: '',
    index: 23
  });

  // should fail in the parser
  pass('skips nested multi line comment', {
    source: '/* /* */ */',
    hasNext: true,
    newLine: false,
    value: '',
    index: 10
  });

  pass('skips single line comment with slash', {
    source: '// /',
    hasNext: false,
    newLine: false,
    value: '',
    index: 4
  });

  pass('skips single line comment with malformed escape', {
    source: '//\\unope \\u{nope} \\xno ',
    hasNext: false,
    newLine: false,
    value: '',
    index: 23
  });

  pass('skips multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',
    hasNext: false,
    newLine: false,
    value: '',
    index: 24
  });
  pass('skips before first real token', {
    source: '--> is eol-comment',
    hasNext: false,
    newLine: false,
    value: '',
    index: 18
  });

  pass('skips single line comment with form feed', {
    source: '\n-->\nvar y = 37;\n',
    hasNext: true,
    newLine: true,
    value: 'var',
    line: 3,
    index: 8
  });

  pass('skips mixed whitespace', {
    source: '\t\u000b\u000c\u00a0',
    hasNext: true,
    newLine: false,
    value: '',
    line: 3,
    index: 4
  });

  pass('skips simple exotic whitespace', {
    source: '\x85',
    hasNext: true,
    newLine: false,
    value: '',
    line: 3,
    index: 1
  });

  pass('skips complex exotic whitespace', {
    source: '\t\x0B\x0C\xA0\u1680\u2000\u200A\u202F\u205F\u3000',
    hasNext: true,
    newLine: false,
    value: '',
    line: 3,
    index: 10
  });

  pass('skips multiple comments preceding HTMLEndComment', {
    source: '/* MLC \n */ /* SLDC */ --> is eol-comment\nvar y = 37;\n',
    hasNext: true,
    newLine: true,
    value: 'var',
    line: 3,
    index: 45
  });
});

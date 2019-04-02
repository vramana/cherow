import * as t from 'assert';
import { Context } from '../../../src/common';
import { Token, descKeywordTable } from '../../../src/token';
import { create } from '../../../src/parser';
import { scanSingleToken } from '../../../src/scanner/scan';

describe('lexer - Comments', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const state = create(opts.source);
      const token = scanSingleToken(state, opts.ctx);
      t.deepEqual(
        {
          value: state.tokenValue,
          index: state.index
        },
        {
          value: opts.value,
          index: opts.index
        }
      );
    });
  }

  pass('skips single line comment with identifier and newline', {
    source: '// foo\n',
    hasNext: false,
    value: '',
    index: 7
  });

  pass('skips multi line comment with escaped newline', {
    source: '/* \\n \\r \\x0a \\u000a */',
    hasNext: false,
    value: '',
    index: 23
  });
  pass('scan identifier with russian letter - backslash start', {
    source: '/* foo */',
    ctx: Context.OptionsNext,
    value: '',
    newline: false,
    index: 9
  });

  pass('skips single line comment with malformed escape', {
    source: '//\\unope \\u{nope} \\xno ',
    hasNext: false,
    value: '',
    index: 23
  });

  pass('skips single line comment with escaped newlines', {
    source: '//\\n \\r \\x0a \\u000a still comment',
    hasNext: false,
    value: '',
    index: 33
  });

  pass('skips single line comment with horizontal tab', {
    source: '//Single Line Comments\u2029 var =;',
    hasNext: true,
    value: 'var',
    index: 27
  });

  pass('skips single line comment with horizontal tab', {
    source: '// single line comment\u000D',
    hasNext: false,
    value: '',
    index: 23
  });

  pass('skips multi line comment with carriage return', {
    source: '/*\\rmulti\\rline\\rcomment\\rx = 1;\\r*/',
    hasNext: false,
    value: '',
    index: 36
  });

  pass('skips multi line comment with carriage return', {
    source: '/*\\rmulti\\rline\\rcomment\\rx = 1;\\r*/',
    hasNext: false,
    value: '',
    index: 36
  });

  pass('skips single line comment with no break space', {
    source: '//\u00A0 single line \u00A0 comment \u00A0',
    hasNext: false,
    value: '',
    index: 27
  });

  pass('skips single line comment with form feed', {
    source: '//\u000C single line \u000C comment \u000C',
    hasNext: false,
    value: '',
    index: 27
  });

  pass('skips single line comment with identifier and newline', {
    source: '// foo\n',
    hasNext: false,
    value: '',
    index: 7
  });

  pass('skips text after HTML close', {
    source: '\n-->',
    hasNext: false,
    value: '',
    index: 4
  });

  pass('skips multi line comment with escaped newline', {
    source: '/* \\n \\r \\x0a \\u000a */',
    hasNext: false,
    value: '',
    index: 23
  });

  pass('skips single line comment with identifier and newline', {
    source: '// foo\n',
    hasNext: false,
    value: '',
    index: 7
  });

  // should fail in the parser
  pass('skips nested multi line comment', {
    source: '/* /* */ */',
    hasNext: true,
    value: '',
    index: 10
  });

  pass('skips single line comment with slash', {
    source: '// /',
    hasNext: false,
    value: '',
    index: 4
  });

  pass('skips single line comment with malformed escape', {
    source: '//\\unope \\u{nope} \\xno ',
    hasNext: false,
    value: '',
    index: 23
  });

  pass('skips multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',
    hasNext: false,
    value: '',
    index: 24
  });
  pass('skips before first real token', {
    source: '--> is eol-comment',
    hasNext: false,
    value: '',
    index: 18
  });

  pass('skips single line comment with form feed', {
    source: '\n-->\nvar y = 37;\n',
    hasNext: true,
    value: 'var',
    line: 3,
    index: 8
  });

  pass('skips multiple comments preceding HTMLEndComment', {
    source: '/* MLC \n */ /* SLDC */ --> is eol-comment\nvar y = 37;\n',
    hasNext: true,
    value: 'var',
    line: 3,
    index: 45
  });
});

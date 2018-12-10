import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { CommentTypes, CommentType } from '../../src/lexer/comments';

// https://github.com/tc39/test262/tree/master/test/language/comments

// Note! An HTML close comment must be preceeded by a LineTerminator, this will fail in the parser and not in
// the lexer. Same with arbitrary character sequencses before HTML close comment .They are not permitted,
// but will only fail in the parser

describe('Lexer - Comments', () => {

  // Test comment type lookup
  const items: [CommentType, string][] = [
    [CommentType.Single, 'SingleLine'],
    [CommentType.Multi, 'MultiLine'],
    [CommentType.HTMLClose, 'HTMLClose'],
    [CommentType.HTMLOpen, 'HTMLOpen'],
  ];

  for (const [comment, expected] of items) {
      it(`should stringify '${expected}' comment`, () => {
          t.equal(CommentTypes[comment & 0xFF], expected);
      });

      if (!/^\w+$/.test(expected)) continue;
  }

  function pass(name: string, opts: any): void {
      it(name, () => {
          const state = new State(opts.source, undefined, undefined);
          nextToken(state, Context.Empty);
          t.deepEqual({
              index: state.index,
              line: state.line,
              column: state.column,
          },          {
              line: opts.line,
              index: opts.index,
              column: opts.column
          }, );
      });
  }

  function fail(name: string, context: Context, opts: any): void {
    it(name, () => {
        const state = new State(opts.source, undefined, undefined);
        t.throws(() => {
            nextToken(state, context);
        });
    });
}

  fail('MultiLineComment inside jsx opening tag', Context.OptionsJSX, {
  source: '</*'
});

  fail('single line comment inside jsx opening tag', Context.OptionsJSX, {
  source: '<// single'
});

  fail('single line comment inside jsx opening tag', Context.OptionsJSX | Context.Strict | Context.Module, {
  source: '</*'
});

  fail('single line comment inside jsx opening tag  - module code', Context.OptionsJSX | Context.Strict | Context.Module, {
  source: '<// single'
});

  fail('should fail "/* "', Context.Empty, {
  source: '/* '
});

  fail('should fail on HTML open comment in module code', Context.Module, {
  source: '--> foo'
});

  fail('should fail on HTML open comment in module code', Context.Module, {
  source: '<!-- foo'
});

  pass('should skip a simple single with Mongolian Vowel Separator', {
  source: `//\u180E`,
  line: 1, column: 3, index: 3
});

  pass('should skip a simple single line comment', {
  source: `// `,
  line: 1, column: 3, index: 3
});

  pass('should handle correct interpretation of single line comments', {
  source: `///`,
  line: 1, column: 3, index: 3
});

  pass('should skip a single line comment with new line', {
  source: `// foo
   `,
  line: 2, column: 3, index: 10
});

  pass('should skip slash in a comment', {
  source: `// /`,
  line: 1, column: 4, index: 4
});

  pass('should skip single line comment with malformed escape', {
  source: `//\\unope \\u{nope} \\xno `,
  line: 1, column: 23, index: 23
});

  pass('should skip single line comment with multi line paragrap', {
  source: `// \u2028\u2028`,
  line: 3, column: 0, index: 5
});

  pass('should skip single line comment with line feed', {
  source: `// \r`,
  line: 2, column: 0, index: 4
});

  pass('should skip single line with newline and line feed', {
  source: `// \r\n`,
  line: 3, column: 0, index: 5
});

  pass('should handle slash in a comment', {
  source: `// */`,
  line: 1, column: 5, index: 5
});

  pass('should handle multiline comment with carriage return and newline', {
  source: `/**\r\n*/`,
  line: 2, column: 2, index: 7
});

  pass('should handle multiline comment with multiple carriage return and newline', {
  source: `/**\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n*/`,
  line: 2, column: 2, index: 49
});

  pass('should handle multiline comment with carriage return and multiple newline', {
  source: `/**\r\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n*/`,
  line: 2, column: 2, index: 35
});

  pass('should handle multiline comment with carriage return and newline, paragrap separator and line separator', {
  source: `/**\r\n\u2028\u2029*/`,
  line: 2, column: 2, index: 9
});

  pass('should skip multiline comment with multiple newline', {
  source: `/* \n\n\n */`,
  line: 2, column: 3, index: 9
});

  pass('single line comment escaped newlines are ignored', {
  source: `//\\n \\r \\x0a \\u000a still comment`,
  line: 1, column: 33, index: 33
});

  pass('should skip Mongolian Vowel Separator in single line comments', {
  source: `//   single-line comment with U+180E`,
  line: 1, column: 36, index: 36
});

  pass('should skip Mongolian Vowel Separator in multi line comments', {
  source: `// U+180E in comments; UTF8(0x180E) = 0xE1 0xA0 0x8E`,
  line: 1, column: 52, index: 52
});

  pass('should handle correct interpretation of single line comments', {
        source: `//FOO
        ///`,
        line: 2, column: 11, index: 17
    });

  pass('should handle correct interpretation of single line comments', {
      source: `/* var
      //x
      */`,
      line: 3, column: 8, index: 25
    });

  pass('should insert Single line comment into Multi line comment', {
        source: `/* var
        //x
        */`,
        line: 3, column: 10, index: 29
    });

  pass('should handle fist multi line comment, then Single line comment', {
        source: `/*CHECK#1*/
        /* var
        *///x*/`,
        line: 3, column: 15, index: 42
    });

  pass('single and Multi line comments are used together', {
      source: `// var /* x */`,
      line: 1, column: 14, index: 14
  });

  pass('multi line comment can contain FORM FEED (U+000C)', {
    source: `/*\\u000C multi line \\u000C comment \\u000C*/`,
    line: 1, column: 43, index: 43
  });

  pass('multi line comment can contain SPACE (U+0020)', {
    source: `/*\\u0020 multi line \\u0020 comment \\u0020*/`,
    line: 1, column: 43, index: 43
  });

  pass('multi line comment can contain NO-BREAK SPACE (U+00A0)', {
    source: `/*\\u00A0 multi line \\u00A0 comment \\u00A0*/`,
    line: 1, column: 43, index: 43
  });

  pass('multi line comment can contain NO-BREAK SPACE (U+00A0)', {
    source: `/*
    */-->the comment extends to these characters`,
    line: 2, column: 48, index: 51
  });

  pass('multi line comment can contain NO-BREAK SPACE (U+00A0)', {
    source: `/*
    optional
    MultiLineCommentChars */-->the comment extends to these characters`,
    line: 3, column: 70, index: 86
  });

  pass('optional SingleLineDelimitedCommentSequence', {
    source: `/*
    */ /* optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters`,
    line: 2, column: 98, index: 101
  });

  pass('optional SingleLineDelimitedCommentSequence', {
    source: `-->the comment extends to these characters`,
    line: 1, column:  42, index: 42
  });

  pass('<!--the comment extends to these characters', {
    source: `<!--the comment extends to these characters`,
    line: 1, column:  43, index: 43
  });

  pass('optional SingleLineDelimitedCommentSequence', {
    source: `-->the comment extends to these characters`,
    line: 1, column:  42, index: 42
  });

  pass('multi line comment ignore escape', {
    source: '/* \\u{nope} \\unope \\xno */',
    line: 1, column:  26, index: 26
  });

  pass('ignores escaped newline', {
    source: '/* \\n \\r \\x0a \\u000a */',
    line: 1, column:  23, index: 23
  });

  pass('multi line comment ignore escape', {
    source: '/* \\u{nope} \\unope \\xno */',
    line: 1, column:  26, index: 26
  });

  pass('should skip multiline comments with line separator', {
    source: `  \t /* foo * /* bar \u2028 */  `,
    line: 2, column: 5, index: 26
  });

  pass('should skip multiline comments with line feed', {
    source: `  \t /* foo * /* bar \n */  `,
    line: 2, column: 5, index: 26
  });

  pass('should skip multiline comments with line feed', {
    source: `//foo!@#^&$1234\nbar;`,
    line: 2, column: 3, index: 19
  });

  pass('should skip multiline comments with line feed', {
    source: `  \t /* foo * /* bar \r */  `,
    line: 2, column: 5, index: 26
  });

  pass('should skip multiline comments with line feed', {
    source: `  \t /* foo bar\r *//* baz*/ \r /**/`,
    line: 3, column: 5, index: 33
  });

  pass('should skip single line comments with form feed', {
    source: '//\u000C single line \u000C comment \u000C',
    line: 1, column: 27, index: 27
});

  pass('should skip multiline comment with horizontal tab', {
    source: '/*	multi\tline\tcomment*/',
    line: 1, column: 23, index: 23
});

  pass('should skip multiline comment with space', {
  source: '/*\u0020 multi line \u0020 comment \u0020*/',
  line: 1, column: 28, index: 28
});

  pass('should skip multiline comment with no break space', {
  source: '/*\u00A0 multi line \u00A0 comment \u00A0*/',
  line: 1, column: 28, index: 28
});

  pass('should skip multiline comment with no mathematical space', {
source: '/*\u00A0 multi line \0x205F comment \0x205F*/',
line: 1, column: 38, index: 38
});

  pass('should skip block HTML close with chars w/o line terminator', {
  source: '  \t /**/  --> the comment doesn\'t extend to these characters\n ',
  line: 1, column: 12, index: 12
});

  pass('avoids single HTML close comment w/o line terminator', {
  source: '  \t -->  ',
  line: 1, column: 6, index: 6
});

  pass('avoids single HTML close comment w/o line terminator', {
  source: `  \t /*\toptional\tMultiLineCommentChars \t*/  --> ` +
  `the comment extends to these characters\t `,
  line: 1, column: 45, index: 45
});

  pass('should skip HTML single line comments with line feed', {
  source: `  \t <!-- foo bar\n  `,
  line: 2, column: 2, index: 19
});

  pass('should skip line separators', {
  source: '    \t \u2028 ',
  line: 2, column: 1, index: 8
});

  pass('should skip paragraph separators', {
  source: '    \t \u2029 ',
  line: 2, column: 1, index: 8
});

  pass('should skip multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',
    line: 1, column: 24, index: 24
});

  pass('should skip singleline comment with surrogate', {
  source: '// 😍',
  line: 1, column: 5, index: 5
});

  pass('should skip multiline comment with surrogate', {
  source: '/* 😍 */',
  line: 1, column: 8, index: 8
});

});

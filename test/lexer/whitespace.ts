import * as t from 'assert';
import { scan, hasNext } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';

describe('Lexer - Whitespace', () => {
  context('script', () => run(false));
  context('module', () => run(true));
});

function run(isModule: boolean) {
  interface Opts {
    source: string;
    hasNext: boolean;
    line: number;
    column: number;
  }

  function pass(name: string, opts: Opts) {
    it(name, () => {
      const state = create(opts.source, undefined);
      const found = scan(state, Context.Empty);
      t.deepEqual(
        {
          hasNext: hasNext(state),
          line: state.line,
          column: state.column
        },
        {
          hasNext: opts.hasNext,
          line: opts.line,
          column: opts.column
        }
      );
    });
  }

  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const state = create(source, undefined);
      t.throws(() => scan(state, context));
    });
  }

  function passAll(name: (lt: string) => string, opts: (lt: string) => Opts) {
    pass(name('line feed'), opts('\n'));
    pass(name('carriage return'), opts('\r'));
    pass(name('Windows newline'), opts('\r'));
    pass(name('line separators'), opts('\u2028'));
    pass(name('paragraph separators'), opts('\u2029'));
  }

  fail('fails on unclosed multiline comment', '/*', Context.Empty);

  fail('fails on HTML comment in strict mode', '<!-- foo bar', Context.Strict | Context.Module);

  pass('skips white space', {
    source: '\u0020',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips paragraphseparator', {
    source: '\u2028',
    hasNext: false,
    line: 2,
    column: 0
  });

  pass('skips lineapseparator', {
    source: '\u2029',
    hasNext: false,
    line: 2,
    column: 0
  });

  pass('skips lineseparator after identifier', {
    source: 'foo \u2029',
    hasNext: true,
    line: 1,
    column: 0
  });

  pass('skips crlf', {
    source: '\r\n',
    hasNext: false,
    line: 2,
    column: 0
  });

  pass('skips crlf before identifier', {
    source: '\r\n foo',
    hasNext: false,
    line: 2,
    column: 1
  });

  pass('skips form feed', {
    source: '\u000C',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips single line comment with identifier and newline', {
    source: '// foo\n',
    hasNext: false,
    line: 2,
    column: 0
  });

  pass('skips multi line comment with escaped newline', {
    source: '/* \\n \\r \\x0a \\u000a */',
    hasNext: false,
    line: 1,
    column: 23
  });

  pass('skips single line comment with identifier and newline', {
    source: '// foo\n',
    hasNext: false,
    line: 2,
    column: 0
  });

  // should fail in the parser
  pass('skips nested multi line comment', {
    source: '/* /* */ */',
    hasNext: true,
    line: 1,
    column: 10
  });

  pass('skips single line comment with slash', {
    source: '// /',
    hasNext: false,
    line: 1,
    column: 4
  });

  pass('skips single line comment with malformed escape', {
    source: '//\\unope \\u{nope} \\xno ',
    hasNext: false,
    line: 1,
    column: 23
  });

  pass('skips single line comment with escaped newlines', {
    source: '//\\n \\r \\x0a \\u000a still comment',
    hasNext: false,
    line: 1,
    column: 33
  });

  pass('skips space between any tokens', {
    source: '\u0020var\u0020x\u0020=\u00201\u0020; result = x;',
    hasNext: true,
    line: 1,
    column: 1
  });

  pass('skips single line comment with horizontal tab', {
    source: '//\u0009 single line \u0009 comment \u0009',
    hasNext: false,
    line: 1,
    column: 27
  });

  pass('skips single line comment with horizontal tab', {
    source: '//Single Line Comments\u2029 var =;',
    hasNext: true,
    line: 2,
    column: 1
  });

  pass('skips single line comment with horizontal tab', {
    source: '// single line comment\u000D',
    hasNext: false,
    line: 2,
    column: 0
  });

  pass('skips multi line comment with carriage return', {
    source: '/*\\rmulti\\rline\\rcomment\\rx = 1;\\r*/',
    hasNext: false,
    line: 1,
    column: 36
  });

  pass('skips multi line comment with carriage return', {
    source: '/*\\rmulti\\rline\\rcomment\\rx = 1;\\r*/',
    hasNext: false,
    line: 1,
    column: 36
  });

  pass('skips single line comment with no break space', {
    source: '//\u00A0 single line \u00A0 comment \u00A0',
    hasNext: false,
    line: 1,
    column: 27
  });

  pass('skips single line comment with form feed', {
    source: '//\u000C single line \u000C comment \u000C',
    hasNext: false,
    line: 1,
    column: 27
  });

  passAll(
    () => 'skips single line comments with line feed',
    lt => ({
      source: `  \t // foo bar${lt}  `,
      hasNext: false,
      line: 2,
      column: 2
    })
  );

  passAll(
    lt => `skips multiple single line comments with ${lt}`,
    lt => ({
      source: `  \t // foo bar${lt} // baz ${lt} //`,
      hasNext: false,
      line: 3,
      column: 3
    })
  );

  pass('skips multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',
    hasNext: false,
    line: 1,
    column: 24
  });

  passAll(
    lt => `skips multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo * /* bar ${lt} */  `,
      hasNext: false,
      line: 2,
      column: 5
    })
  );

  passAll(
    lt => `skips multiple multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
      hasNext: false,
      line: 3,
      column: 5
    })
  );

  if (isModule) {
  } else {
    passAll(
      lt => `skips HTML single line comments with ${lt}`,
      lt => ({
        source: `  \t <!-- foo bar${lt}  `,
        hasNext: false,
        line: 2,
        column: 2
      })
    );

    passAll(
      lt => `skips multiple HTML single line comments with ${lt}`,
      lt => ({
        source: `  \t <!-- foo bar${lt} <!-- baz ${lt} <!--`,
        hasNext: false,
        line: 3,
        column: 5
      })
    );

    passAll(
      lt => `skips single HTML close comment after ${lt}`,
      lt => ({
        source: `  \t ${lt}-->  `,
        hasNext: false,
        line: 2,
        column: 5
      })
    );

    passAll(
      lt => `skips line of single HTML close comment after ${lt}`,
      lt => ({
        source: `  \t ${lt}--> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 3,
        column: 1
      })
    );

    passAll(
      lt => `allows HTML close comment after ${lt} + WS`,
      lt => ({
        source: `  \t ${lt}   --> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 3,
        column: 1
      })
    );

    passAll(
      lt => `skips single-line block on line of HTML close after ${lt}`,
      lt => ({
        source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 3,
        column: 1
      })
    );

    passAll(
      lt => `skips 2 single-line block on line of HTML close after ${lt}`,
      lt => ({
        source: `  \t /*${lt}*/ /**/ /* second optional ${''}SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 3,
        column: 1
      })
    );

    passAll(
      lt => `skips block HTML close with ${lt} + empty line`,
      lt => ({
        source: `  \t /*${lt}*/  -->${lt} `,
        hasNext: false,
        line: 3,
        column: 1
      })
    );

    passAll(
      lt => `skips block HTML close with ${lt}`,
      lt => ({
        source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 3,
        column: 1
      })
    );

    passAll(
      lt => `skips first line block HTML close with ${lt}`,
      lt => ({
        source: `  \t /* optional FirstCommentLine ${lt}*/  --> ` + `the comment extends to these characters${lt} `,
        hasNext: false,
        line: 3,
        column: 1
      })
    );

    passAll(
      lt => `skips multi block + HTML close with ${lt}`,
      lt => ({
        source: `  \t /*${lt}optional${lt}MultiLineCommentChars ${lt}*/  --> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 5,
        column: 1
      })
    );

    passAll(
      lt => `skips multi block + single block + HTML close with ${lt}`,
      lt => ({
        source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 4,
        column: 1
      })
    );

    passAll(
      lt => `skips multi block + 2 single block + HTML close with ${lt}`,
      lt => ({
        source: `  \t /*${lt}*/ /**/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,
        hasNext: false,
        line: 4,
        column: 1
      })
    );
  }
}

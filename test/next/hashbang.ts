import * as t from 'assert';
import { skipHashBang } from '../../src/scanner';
import { Context } from '../../src/common';
import { create } from '../../src/state';

describe('Next - Hashbang grammar', () => {
  describe('seek()', () => {
    context('script', () => run(false));
    context('module', () => run(true));
  });

  function run(isModule: boolean) {
    interface Opts {
      source: string;
      hasNext: boolean;
      line: number;
      index: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const state = create(opts.source, undefined);
        skipHashBang(state, Context.OptionsNext);

        t.deepEqual(
          {
            hasNext: state.index < state.length,
            line: state.line,
            column: state.column,
            index: state.index
          },
          {
            hasNext: opts.hasNext,
            line: opts.line,
            column: opts.column,
            index: opts.index
          }
        );
      });
    }

    function fail(name: string, source: string) {
      it(name, () => {
        const state = create(source, undefined);

        t.throws(() => skipHashBang(state, Context.OptionsNext));
      });
    }

    fail('fails before a lone hash', '# foo');
    fail('skips a BOM and fails before a lone hash', '\uFFEF# foo');

    pass('skips Hashbang comments in Script evaluator contexts', {
      source: '#! SingleLineCommentChars[opt]',
      hasNext: false,
      index: 30,
      line: 1,
      column: 28
    });

    pass('skips Hashbang comments without a required newline', {
      source: '#!',
      hasNext: false,
      index: 2,
      line: 1,
      column: 0
    });

    pass('skips Hashbang comments in Script evaluator contexts', {
      source: '#! SingleLineCommentChars[opt]',
      hasNext: false,
      index: 30,
      line: 1,
      column: 28
    });

    pass('skips Hashbang comments in Script evaluator contexts', {
      source: '#! SingleLineCommentChars[opt]',
      hasNext: false,
      index: 30,
      line: 1,
      column: 28
    });

    pass('skips nothing in an empty source', {
      source: '',
      hasNext: false,
      index: 0,
      line: 1,
      column: 0
    });

    pass('skips nothing in an empty source', {
      source: '',
      hasNext: false,
      index: 0,
      line: 1,
      column: 0
    });
    pass('skips nothing before an identifier', {
      source: 'foo',
      hasNext: true,
      index: 0,
      line: 1,
      column: 0
    });

    pass('skips nothing before a lone exclamation', {
      source: '! foo',
      hasNext: true,
      index: 0,
      line: 1,
      column: 0
    });

    pass('skips a BOM in an otherwise empty source', {
      source: '\uFFEF',
      hasNext: false,
      index: 1,
      line: 1,
      column: 0
    });

    pass('skips a BOM before an identifier', {
      source: '\uFFEFfoo',
      hasNext: true,
      index: 1,
      line: 1,
      column: 0
    });

    pass('skips a BOM before a lone exclamation', {
      source: '\uFFEF! foo',
      hasNext: true,
      index: 1,
      line: 1,
      column: 0
    });

    pass('skips a shebang+LF in an otherwise empty source', {
      source: '#!/foo/bar/baz -abc\n',
      hasNext: false,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+LF before an identifier', {
      source: '#!/foo/bar/baz -abc\nfoo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+LF before a lone hash', {
      source: '#!/foo/bar/baz -abc\n# foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+LF before a lone exclamation', {
      source: '#!/foo/bar/baz -abc\n! foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CR in an otherwise empty source', {
      source: '#!/foo/bar/baz -abc\r',
      hasNext: false,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CR before an identifier', {
      source: '#!/foo/bar/baz -abc\rfoo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CR before a lone hash', {
      source: '#!/foo/bar/baz -abc\r# foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CR before a lone exclamation', {
      source: '#!/foo/bar/baz -abc\r! foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CRLF in an otherwise empty source', {
      source: '#!/foo/bar/baz -abc\r\n',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CRLF before an identifier', {
      source: '#!/foo/bar/baz -abc\r\nfoo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CRLF before a lone hash', {
      source: '#!/foo/bar/baz -abc\r\n# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a shebang+CRLF before a lone exclamation', {
      source: '#!/foo/bar/baz -abc\r\n! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a shebang+line separator in an otherwise empty source', {
      source: '#!/foo/bar/baz -abc\u2028',
      hasNext: false,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+line separator before an identifier', {
      source: '#!/foo/bar/baz -abc\u2028foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+line separator before a lone hash', {
      source: '#!/foo/bar/baz -abc\u2028# foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+line separator before a lone exclamation', {
      source: '#!/foo/bar/baz -abc\u2028! foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+paragraph separator in an otherwise empty source', {
      source: '#!/foo/bar/baz -abc\u2029',
      hasNext: false,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+paragraph separator before an identifier', {
      source: '#!/foo/bar/baz -abc\u2029foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+paragraph separator before a lone hash', {
      source: '#!/foo/bar/baz -abc\u2029# foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a shebang+paragraph separator before a lone exclamation', {
      source: '#!/foo/bar/baz -abc\u2029! foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+LF in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\n',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+LF before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\nfoo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+LF before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\n# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+LF before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\n! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CR in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\r',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CR before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\rfoo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CR before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\r# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CR before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\r! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CRLF in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\n',
      hasNext: false,
      index: 22,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CRLF before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\nfoo',
      hasNext: true,
      index: 22,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CRLF before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\n# foo',
      hasNext: true,
      index: 22,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+CRLF before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\n! foo',
      hasNext: true,
      index: 22,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+line separator in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+line separator before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+line separator before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+line separator before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+paragraph separator in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+paragraph separator before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+paragraph separator before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });

    pass('skips a BOM+shebang+paragraph separator before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0
    });
    if (isModule) {
    }
  }
});

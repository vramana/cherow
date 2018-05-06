import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Miscellaneous - Shebang', () => {

  describe('Failure', () => {

      // Note! This test should fail because of
      //
      // 1) A valid Shebang comment starts with '#' + '!', and that's not the
      //    case after last linebreak even if it's followed by an identifier
      //
      // 2) After last linebreak, we got either 1) Invalid token or 2) Class Private name,
      //    and none of them are valid start of a shebang comment. And also note
      //    that the specs forbid whitespace after '#' for private names, so this will always
      //    return in an error
      //
      fail('\uFFEF#!/foo/bar/baz -abc\n# foo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\n# foo',
      });

  });

  describe('Pass', () => {

      pass('\uFFEF#!/foo/bar/baz -abc\u2028! foo', Context.OptionsShebang | Context.Strict | Context.Module | Context.OptionsRanges, {
          source: '\uFFEF#!/foo/bar/baz -abc\u2028! foo',
          expected: {
              body: [{
                  end: 26,
                  expression: {
                      argument: {
                          end: 26,
                          name: 'foo',
                          start: 23,
                          type: 'Identifier'
                      },
                      end: 26,
                      operator: '!',
                      prefix: true,
                      start: 0,
                      type: 'UnaryExpression',
                  },
                  start: 0,
                  type: 'ExpressionStatement',
              }, ],
              end: 26,
              sourceType: 'module',
              start: 0,
              type: 'Program'
          }
      });

      pass('\uFFEF#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\n! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement',
              }, ],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('\uFFEF#!/foo/bar/baz -abc\n# foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\n#! foo',
          expected: {
              body: [],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\r\n', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\r\n',
          expected: {
              body: [],
              sourceType: 'script',
              type: 'Program'
          }
      });
      pass('\uFFEF#!/foo/bar/baz -abc\nfoo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\nfoo',
          expected: {
              body: [{
                  expression: {
                      name: 'foo',
                      type: 'Identifier'
                  },
                  type: 'ExpressionStatement',
              }, ],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('\uFFEF#!/foo/bar/baz -abc\u2029! foo', Context.OptionsShebang, {
          source: '\uFFEF#!/foo/bar/baz -abc\u2029! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\rfoo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\rfoo',
          expected: {
              body: [{
                  expression: {
                      name: 'foo',
                      type: 'Identifier',
                  },
                  type: 'ExpressionStatement'
              }, ],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\r\nfoo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\r\nfoo',
          expected: {
              body: [{
                  expression: {
                      name: 'foo',
                      type: 'Identifier',
                  },
                  type: 'ExpressionStatement',
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\u2028', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\u2028',
          expected: {
              body: [],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\u2028! foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\u2028! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\n! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier'
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression'
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });

      pass('#!/foo/bar/baz -abc\n! foo', Context.OptionsShebang, {
          source: '#!/foo/bar/baz -abc\n! foo',
          expected: {
              body: [{
                  expression: {
                      argument: {
                          name: 'foo',
                          type: 'Identifier',
                      },
                      operator: '!',
                      prefix: true,
                      type: 'UnaryExpression',
                  },
                  type: 'ExpressionStatement'
              }],
              sourceType: 'script',
              type: 'Program'
          }
      });
  });
});
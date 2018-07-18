import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';
import { TokenType, TokenTypes, edgeCaseCrap } from '../../src/lexer/tokenizer';

describe('Lexer - OnToken', () => {

  describe('Lexer - Tokenizer types', () => {

      // Test comment type lookup
      const items: [TokenType, string][] = [
          [TokenType.End, '<end>'],
          [TokenType.Keyword, 'Keyword'],
          [TokenType.Punctuator, 'Punctuator'],
          [TokenType.Null, 'NullLiteral'],
          [TokenType.Boolean, 'BooleanLiteral'],
          [TokenType.Identifier, 'Identifier'],
          [TokenType.String, 'StringLiteral'],
          [TokenType.Numeric, 'Numeric'],
          [TokenType.RegularExpression, 'RegularExpression'],
          [TokenType.Template, 'Template'],
      ];

      for (const [token, expected] of items) {
          it(`should stringify '${expected}' tokenized tokens`, () => {
              t.equal(TokenTypes[token & 0xFF], expected);
          });

          if (!/^\w+$/.test(expected)) continue;
      }
  });

  describe('Lexer - edgeCaseCrap', () => {
      it('should toenize contextual "let" to be a damn identifier', () => {
          const tokens: any[] = [];
          const state = new State('let', (type: any, value: any) => {
              tokens.push({
                  type,
                  value
              });
          },                      undefined, );
          nextToken(state, Context.Empty);
          state.tokenValue = 'let';
          edgeCaseCrap(state, Token.LetKeyword, TokenType.Identifier);
          t.deepEqual({
              tokens,
              line: state.line,
              column: state.column,
          },          {
              tokens: [{
                      type: 'Identifier',
                      value: 'let'
                  }, // "Normal"
                  {
                      type: 'Identifier',
                      value: 'let'
                  }
              ], // "Fixed"
              line: 1,
              column: 3
          }, );
      });
  });

  describe('Lexer - Tokenizing', () => {

      function pass(name: string, opts: any) {
          it(name, () => {
              const tokens: any[] = [];
              const state = new State(opts.source, (type: any, value: any) => {
                  tokens.push({
                      type,
                      value
                  });
              },                      undefined, );

              // Get the first token in the stream
              nextToken(state, Context.ExpressionStart);
              // Get the rest of the tokens
              while (nextToken(state, Context.Empty) !== Token.EndOfSource) {}

              t.deepEqual({
                  tokens,
                  line: state.line,
                  column: state.column,
              },          {
                  tokens: opts.value,
                  line: opts.line,
                  column: opts.column
              }, );
          });
      }

      pass('should tokenize single-quoted string with escaped linefeed', {
        source: '"a\\n"',
        value: [{
            type: 'StringLiteral',
            'value': '"a\\n"'
        }],
        line: 1,
        column: 5,
      });

      pass('should tokenize assignment and multi line comment', {
        source: `/* assignment */
        a = b`,
        value: [{
                'type': 'Identifier',
                'value': 'a',
              },
              {
                'type': 'Punctuator',
                'value': '=',
              },
              {
                'type': 'Identifier',
                'value': 'b',
              }],
        line: 2,
        column: 13,
      });

      pass('should tokenize function expr with block comment', {
        source: `(function(){ var version = 1; /* sync */ }).call(this)`,
        value: [{
                'type': 'Punctuator',
                'value': '(',
              },
              {
                'type': 'Keyword',
                'value': 'function',
              },
              {
                'type': 'Punctuator',
                'value': '(',
              },
             {
                'type': 'Punctuator',
                'value': ')',
              },
              {
                'type': 'Punctuator',
                'value': '{',
              },
              {
                'type': 'Keyword',
                'value': 'var',
             },
              {
                'type': 'Identifier',
                'value': 'version',
              },
              {
                'type': 'Punctuator',
                'value': '=',
              },
              {
                'type': 'Numeric',
                'value': '1',
              },
              {
               'type': 'Punctuator',
                'value': ';',
              },
              {
                'type': 'Punctuator',
                'value': '}',
              },
              {
                'type': 'Punctuator',
                'value': ')',
              },
              {
                'type': 'Punctuator',
               'value': '.',
              },
              {
                'type': 'Identifier',
                'value': 'call',
              },
              {
               'type': 'Punctuator',
                'value': '(',
              },
              {
                'type': 'Keyword',
                'value': 'this',
              },
              {
                'type': 'Punctuator',
                'value': ')'
              }],
        line: 1,
        column: 54,
      });

      pass('should tokenize switch statement with multi line comment', {
        source: `switch (answer) { case 42: /* perfect */ bingo() }`,
        value: [{
                'type': 'Keyword',
                'value': 'switch',
              },
              {
                'type': 'Punctuator',
                'value': '(',
              },
              {
               'type': 'Identifier',
                'value': 'answer',
              },
              {
                'type': 'Punctuator',
                'value': ')',
              },
              {
                'type': 'Punctuator',
                'value': '{',
              },
              {
                'type': 'Keyword',
               'value': 'case',
              },
              {
                'type': 'Numeric',
                'value': '42',
              },
              {
                'type': 'Punctuator',
                'value': ':',
              },
              {
                'type': 'Identifier',
                'value': 'bingo',
             },
              {
                'type': 'Punctuator',
                'value': '(',
              },
              {
               'type': 'Punctuator',
                'value': ')',
              },
              {
                'type': 'Punctuator',
                'value': '}',
              }
            ],
        line: 1,
        column: 50,
      });

      pass('should tokenize with statement with punctuators', {
        source: 'with (false) /42/',
        value: [{
                'type': 'Keyword',
                'value': 'with',
              },
              {
                'type': 'Punctuator',
                'value': '(',
              },
              {
               'type': 'Keyword',
                'value': 'false',
              },
              {
                'type': 'Punctuator',
                'value': ')',
              },
              {
                'type': 'Punctuator',
               'value': '/',
              },
              {
                'type': 'Numeric',
                'value': '42',
              },
             {
                'type': 'Punctuator',
                'value': '/'
              }],
        line: 1,
        column: 17,
      });

      pass('should tokenize identifier and skip HTML open comment', {
        source: 'a<!--b',
        value: [ {
                'type': 'Identifier',
                'value': 'a',
              }],
        line: 1,
        column: 6,
      });

      pass('should tokenize number with crazy HTML close comment', {
        source: `0/*
        */-->`,
        value: [{
                'type': 'Numeric',
                'value': '0',
              }],
        line: 2,
        column: 13,
      });

      pass('should tokenize single-quoted string with escaped linefeed', {
        source: '"a\\n"',
        value: [{
            type: 'StringLiteral',
            'value': '"a\\n"'
        }],
        line: 1,
        column: 5,
      });

      pass('should tokenize and not recognize greater than as HTML Close comment', {
        source: 'x = y-->10;\n --> nothing',
        value: [{
              'type': 'Identifier',
              'value': 'x',
            },
            {
              'type': 'Punctuator',
              'value': '=',
           },
            {
              'type': 'Identifier',
              'value': 'y',
            },
            {
             'type': 'Punctuator',
              'value': '--',
            },
            {
              'type': 'Punctuator',
              'value': '>',
            },
            {
              'type': 'Numeric',
              'value': '10',
            },
            {
              'type': 'Punctuator',
              'value': ';'
            }],
      line: 2,
      column: 12,
  });

      pass('should tokenizse identifier and skip HTML Open comment', {
      source: 'foo <!--bar\n+baz',
      value: [{
              'type': 'Identifier',
              'value': 'foo',
            },
            {
              'type': 'Punctuator',
              'value': '+',
            },
            {
              'type': 'Identifier',
              'value': 'baz',
            }],
      line: 2,
      column: 4,
  });

      pass('should tokenize single-quoted string with escaped linefeed', {
      source: 'while (x-->0)',
      value: [{
              'type': 'Keyword',
              'value': 'while',
            },
            {
              'type': 'Punctuator',
              'value': '(',
            },
            {
              'type': 'Identifier',
              'value': 'x',
            },
            {
              'type': 'Punctuator',
              'value': '--',
            },
            {
              'type': 'Punctuator',
              'value': '>',
            },
            {
              'type': 'Numeric',
              'value': '0',
            },
            {
             'type': 'Punctuator',
              'value': ')',
            }
          ],
      line: 1,
      column: 13,
    });

      pass('should tokenize and skip HTML comment at the end', {
      source: 'var a = 1, b = 1; a <!--b;',
      value: [ {
              'type': 'Keyword',
              'value': 'var',
            },
            {
              'type': 'Identifier',
              'value': 'a',
            },
            {
             'type': 'Punctuator',
              'value': '=',
            },
            {
              'type': 'Numeric',
              'value': '1',
            },
            {
              'type': 'Punctuator',
              'value': ',',
           },
            {
              'type': 'Identifier',
              'value': 'b',
            },
            {
              'type': 'Punctuator',
              'value': '=',
            },
            {
              'type': 'Numeric',
              'value': '1',
            },
            {
              'type': 'Punctuator',
              'value': ';',
            },
            {
              'type': 'Identifier',
              'value': 'a'
            }],
      line: 1,
      column: 26,
    });

      pass('should tokenize array literal', {
      source: '[1,2,abc]',
      value: [ {
              'type': 'Punctuator',
              'value': '[',
           },
            {
              'type': 'Numeric',
              'value': '1',
            },
            {
              'type': 'Punctuator',
              'value': ',',
            },
            {
              'type': 'Numeric',
             'value': '2',
            },
            {
              'type': 'Punctuator',
              'value': ',',
            },
           {
              'type': 'Identifier',
              'value': 'abc',
            },
            {
              'type': 'Punctuator',
              'value': ']'
            }],
      line: 1,
      column: 9,
  });

      pass('should tokenize decimal point', {
      source: '500.',
      value: [{
          type: 'Numeric',
          'value': '500.'
      }],
      line: 1,
      column: 5,
  });

      pass('should tokenize assignment and function expression', {
      source: 'var f = function(){;};',
      value: [{
              'type': 'Keyword',
              'value': 'var',
            },
            {
              'type': 'Identifier',
              'value': 'f',
            },
            {
              'type': 'Punctuator',
              'value': '=',
            },
            {
              'type': 'Keyword',
              'value': 'function',
            },
            {
              'type': 'Punctuator',
              'value': '(',
            },
            {
              'type': 'Punctuator',
              'value': ')',
            },
            {
              'type': 'Punctuator',
              'value': '{',
            },
            {
              'type': 'Punctuator',
              'value': ';',
            },
            {
              'type': 'Punctuator',
              'value': '}',
            },
            {
              'type': 'Punctuator',
              'value': ';'
            }],
      line: 1,
      column: 22,
  });

      pass('should tokenize string literal correctly', {
          source: '"String literal tokenizing works!"',
          value: [{
              type: 'StringLiteral',
              'value': '"String literal tokenizing works!"'
          }],
          line: 1,
          column: 34,
      });

      pass('should tokenize numbers correctly', {
          source: '123',
          value: [{
              type: 'Numeric',
              value: '123'
          }],
          line: 1,
          column: 3,
      });

      pass('should tokenize numbers and punctuators correctly', {
          source: '(123)',
          value: [{
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Numeric',
                  value: '123'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              }
          ],
          line: 1,
          column: 5,
      });

      pass('should tokenize two identifiers with a punctuator in the middle', {
          source: 'foo+bar',
          value: [{
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': '+',
              },
              {
                  'type': 'Identifier',
                  'value': 'bar',
              }
          ],
          line: 1,
          column: 7,
      });

      pass('should tokenize numbers and identifiers correctly', {
          source: 'abc 123 def',
          value: [{
                  type: 'Identifier',
                  value: 'abc'
              },
              {
                  type: 'Numeric',
                  value: '123'
              },
              {
                  type: 'Identifier',
                  value: 'def'
              }
          ],
          line: 1,
          column: 11,
      });

      pass('should tokenize identifiers correctly', {
          source: 'Cherow tokenizing works + identifiers',
          value: [{
                  type: 'Identifier',
                  value: 'Cherow'
              },
              {
                  type: 'Identifier',
                  value: 'tokenizing'
              },
              {
                  type: 'Identifier',
                  value: 'works'
              },
              {
                  type: 'Punctuator',
                  value: '+'
              },
              {
                  type: 'Identifier',
                  value: 'identifiers'
              }
          ],
          line: 1,
          column: 37,
      });
      pass('should tokenize parenthesis and identifiers correctly', {
          source: '(Cherow) tokenizer and punctuators have become best friends!!',
          value: [{
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Identifier',
                  value: 'Cherow'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Identifier',
                  value: 'tokenizer'
              },
              {
                  type: 'Identifier',
                  value: 'and'
              },
              {
                  type: 'Identifier',
                  value: 'punctuators'
              },
              {
                  type: 'Identifier',
                  value: 'have'
              },
              {
                  type: 'Identifier',
                  value: 'become'
              },
              {
                  type: 'Identifier',
                  value: 'best'
              },
              {
                  type: 'Identifier',
                  value: 'friends'
              },
              {
                  type: 'Punctuator',
                  value: '!'
              },
              {
                  type: 'Punctuator',
                  value: '!'
              }
          ],
          line: 1,
          column: 61,
      });

      pass('should tokenize mix of punctuators', {
          source: '!(&/%)/)(&{}',
          value: [{
                  type: 'Punctuator',
                  value: '!'
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '&'
              },
              {
                  type: 'Punctuator',
                  value: '/'
              },
              {
                  type: 'Punctuator',
                  value: '%'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: '/'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '&'
              },
              {
                  type: 'Punctuator',
                  value: '{'
              },
              {
                  type: 'Punctuator',
                  value: '}'
              }
          ],
          line: 1,
          column: 12,
      });

      pass('should tokenize arrow', {
          source: '() => {}',
          value: [{
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: '=>'
              },
              {
                  type: 'Punctuator',
                  value: '{'
              },
              {
                  type: 'Punctuator',
                  value: '}'
              }
          ],
          line: 1,
          column: 8,
      });

      pass('should tokenize two parenthesis', {
          source: '()',
          value: [{
              type: 'Punctuator',
              value: '('
          }, {
              type: 'Punctuator',
              value: ')'
          }],
          line: 1,
          column: 2,
      });

      pass('should tokenize multiple parenthesis', {
          source: '(((((((())))))))',
          value: [{
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: '('
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              },
              {
                  type: 'Punctuator',
                  value: ')'
              }
          ],
          line: 1,
          column: 16,
      });

      pass('should tokenize two parenthesis', {
          source: 'a=b:c;',
          value: [{
                  'type': 'Identifier',
                  'value': 'a',
              },
              {
                  'type': 'Punctuator',
                  'value': '=',
              },
              {
                  'type': 'Identifier',
                  'value': 'b',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Identifier',
                  'value': 'c',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              }
          ],
          line: 1,
          column: 6,
      });

      pass('should tokenize double label', {
          source: 'foo: foo: x;',
          value: [{
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': ';'
              }
          ],
          line: 1,
          column: 12,
      });

      pass('should tokenize two parenthesis', {
          source: 'foo++("toString");',
          value: [{
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': '++',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'StringLiteral',
                  'value': '"toString"',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              }
          ],
          line: 1,
          column: 18,
      });

      pass('should tokenize two parenthesis', {
          source: 'class g_pig { constructor() {} async() {} }',
          value: [{
                  'type': 'Keyword',
                  'value': 'class',
              },
              {
                  'type': 'Identifier',
                  'value': 'g_pig',
              },
              {
                  'type': 'Punctuator',
                  'value': '{'
              },
              {
                  'type': 'Identifier',
                  'value': 'constructor',
              },
              {
                  'type': 'Punctuator',
                  'value': '('
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': '{'
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              },
              {
                  'type': 'Identifier',
                  'value': 'async',
              },
              {
                  'type': 'Punctuator',
                  'value': '('
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': '{'
              },
              {
                  'type': 'Punctuator',
                  'value': '}'
              },
              {
                  'type': 'Punctuator',
                  'value': '}'
              }
          ],
          line: 1,
          column: 43,
      });

      pass('should tokenize null', {
          source: 'null',
          value: [{
              'type': 'NullLiteral',
              'value': 'null'
          }],
          line: 1,
          column: 4,
      });

      pass('should tokenize object literal', {
          source: 'x={set (x){}};',
          value: [{
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': '=',
              },
              {
                  'type': 'Punctuator',
                  'value': '{',
              },
              {
                  'type': 'Identifier',
                  'value': 'set',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': '{',
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              },
              {
                  'type': 'Punctuator',
                  'value': ';'
              }
          ],
          line: 1,
          column: 14,
      });

      pass('should tokenize block', {
          source: '{a:1,\"b\":2,c:c}',
          value: [{
                  'type': 'Punctuator',
                  'value': '{'
              },
              {
                  'type': 'Identifier',
                  'value': 'a',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Numeric',
                  'value': '1'
              },
              {
                  'type': 'Punctuator',
                  'value': ',',
              },
              {
                  'type': 'StringLiteral',
                  'value': '"b"',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Numeric',
                  'value': '2',
              },
              {
                  'type': 'Punctuator',
                  'value': ',',
              },
              {
                  'type': 'Identifier',
                  'value': 'c',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Identifier',
                  'value': 'c'
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              }
          ],
          line: 1,
          column: 15,
      });

      pass('should tokenize regular expression', {
          source: '/a/i',
          value: [{
              'type': 'RegularExpression',
              'value': '/a/i'
          }],
          line: 1,
          column: 2,
      });

      pass('should tokenize function declaration', {
          source: 'function foo() {}',
          value: [{
                  'type': 'Keyword',
                  'value': 'function',
              },
              {
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': '{',
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              }
          ],
          line: 1,
          column: 17,
      });

      pass('should tokenize incomplete addition', {
          source: 'foo+;',
          value: [{
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': '+',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              }
          ],
          line: 1,
          column: 5,
      });

      pass('should tokenize -- without rhs, followed by semi', {
          source: '--;',
          value: [{
                  'type': 'Punctuator',
                  'value': '--',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              }
          ],
          line: 1,
          column: 3,
      });

      pass('should tokenize typeof as label', {
          source: 'typeof:',
          value: [{
                  'type': 'Punctuator',
                  'value': 'typeof',
              },
              {
                  'type': 'Punctuator',
                  'value': ':'
              }
          ],
          line: 1,
          column: 7,
      });

      pass('should tokenize keyword as varname', {
          source: 'var false = 5;',
          value: [{
                  'type': 'Keyword',
                  'value': 'var',
              },
              {
                  'type': 'Keyword',
                  'value': 'false',
              },
              {
                  'type': 'Punctuator',
                  'value': '=',
              },
              {
                  'type': 'Numeric',
                  'value': '5',
              },
              {
                  'type': 'Punctuator',
                  'value': ';'
              }
          ],
          line: 1,
          column: 14,
      });

      pass('should tokenize two parenthesis', {
          source: '_\\u{1EE03}',
          value: [{
              'type': 'Identifier',
              'value': '_\\u{1EE03}',
          }],
          line: 1,
          column: 10,
      });

      pass('should tokenize identifier + surrogate', {
          source: 'a𪘀',
          value: [{
              'type': 'Identifier',
              'value': 'a𪘀',
          }],
          line: 1,
          column: 3,
      });

      pass('should tokenize template', {
          source: '`()`',
          value: [{
              'type': 'Template',
              'value': '`()`'
          }],
          line: 1,
          column: 4,
      });

      pass('should tokenize two parenthesis', {
          source: 'x=5\n/5/',
          value: [{
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': '=',
              },
              {
                  'type': 'Numeric',
                  'value': '5',
              },
              {
                  'type': 'Punctuator',
                  'value': '/',
              },
              {
                  'type': 'Numeric',
                  'value': '5',
              },
              {
                  'type': 'Punctuator',
                  'value': '/'
              }
          ],
          line: 2,
          column: 3,
      });

      pass('should tokenize nvalid assignment after non-assignment', {
          source: 'x + b <<= y;',
          value: [{
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': '+',
              },
              {
                  'type': 'Identifier',
                  'value': 'b',
              },
              {
                  'type': 'Punctuator',
                  'value': '<<=',
              },
              {
                  'type': 'Identifier',
                  'value': 'y',
              },
              {
                  'type': 'Punctuator',
                  'value': ';'
              }
          ],
          line: 1,
          column: 12,
      });

      pass('should tokenize weird punctuator', {
          source: 'x +== y',
          value: [{
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': '+=',
              },
              {
                  'type': 'Punctuator',
                  'value': '=',
              },
              {
                  'type': 'Identifier',
                  'value': 'y'
              }
          ],
          line: 1,
          column: 7,
      });

      pass('should tokenize two parenthesis', {
          source: 'for ((x = {x:x in y}) in z);',
          value: [{
                  'type': 'Keyword',
                  'value': 'for',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': '=',
              },
              {
                  'type': 'Punctuator',
                  'value': '{',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': 'in',
              },
              {
                  'type': 'Identifier',
                  'value': 'y',
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': 'in',
              },
              {
                  'type': 'Identifier',
                  'value': 'z',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              }
          ],
          line: 1,
          column: 28,
      });

      pass('should tokenize assigning to group with non-assignable expression 5', {
          source: 'x()=b',
          value: [{
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': '=',
              },
              {
                  'type': 'Identifier',
                  'value': 'b',
              }
          ],
          line: 1,
          column: 5,
      });

      pass('should tokenize string literal and punctuators', {
          source: '"string"-- &= x;',
          value: [{
                  'type': 'StringLiteral',
                  'value': '"string"',
              },
              {
                  'type': 'Punctuator',
                  'value': '--',
              },
              {
                  'type': 'Punctuator',
                  'value': '&=',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              }
          ],
          line: 1,
          column: 16,
      });

      pass('should tokenize invalid call assignment', {
          source: 'foo()--',
          value: [{
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': '--',
              }
          ],
          line: 1,
          column: 7,
      });
      pass('should tokenize do while expects a semi 5 (parses /foo/ as regex, regardless)', {
          source: 'do{}while(x)/foo/;',
          value: [{
                  'type': 'Keyword',
                  'value': 'do',
              },
              {
                  'type': 'Punctuator',
                  'value': '{',
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              },
              {
                  'type': 'Keyword',
                  'value': 'while',
              },
              {
                  'type': 'Punctuator',
                  'value': '(',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Punctuator',
                  'value': '/',
              },
              {
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': '/',
              },
              {
                  'type': 'Punctuator',
                  'value': ';'
              }
          ],
          line: 1,
          column: 18,
      });

      pass('should tokenize treaming op with single line comment', {
          source: 'a>>=a // foo',
          value: [{
                  'type': 'Identifier',
                  'value': 'a',
              },
              {
                  'type': 'Punctuator',
                  'value': '>>=',
              },
              {
                  'type': 'Identifier',
                  'value': 'a',
              }
          ],
          line: 1,
          column: 12,
      });

      pass('should tokenize break arg', {
          source: 'while(true)break 5+5;',
          value: [{
                  'type': 'Keyword',
                  'value': 'while',
              },
              {
                  'type': 'Punctuator',
                  'value': '('
              },
              {
                  'type': 'Keyword',
                  'value': 'true',
              },
              {
                  'type': 'Punctuator',
                  'value': ')',
              },
              {
                  'type': 'Keyword',
                  'value': 'break',
              },
              {
                  'type': 'Numeric',
                  'value': '5',
              },
              {
                  'type': 'Punctuator',
                  'value': '+',
              },
              {
                  'type': 'Numeric',
                  'value': '5',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              }
          ],
          line: 1,
          column: 21,
      });

      pass('should tokenize two parenthesis', {
          source: 'foo: { foo: x; }',
          value: [{
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Punctuator',
                  'value': '{',
              },
              {
                  'type': 'Identifier',
                  'value': 'foo',
              },
              {
                  'type': 'Punctuator',
                  'value': ':',
              },
              {
                  'type': 'Identifier',
                  'value': 'x',
              },
              {
                  'type': 'Punctuator',
                  'value': ';',
              },
              {
                  'type': 'Punctuator',
                  'value': '}',
              }
          ],
          line: 1,
          column: 16,
      });
  });
});

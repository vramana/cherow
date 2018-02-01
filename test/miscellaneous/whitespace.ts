import { pass, fail } from '../test-utils';
import { parseScript } from '../../src/cherow';

describe('Miscellaneous - Whitespace', () => {

  const whitespaceCharacters = [
    '\u0009',
    '\u000a',
    '\u000b',
    '\u000c',
    '\u000d',
    '\u0020',
    '\u00a0',
    '\u1680',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200a',
    '\u2028',
    '\u2029',
    '\u202f',
    '\u205f',
    '\u3000',
    '\ufeff',
];

  for (const i in whitespaceCharacters) {
  const ch = whitespaceCharacters[i];
  pass (ch, {
    source: ch,
    expected: parseScript(ch)
  });
}

  pass(`spaces`, {
        source: '        ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 8,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`tabs`, {
        source: '\t\t\t\t\t\t\t\t',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 8,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`vertical tabs`, {
        source: '\v\v\v\v\v\v\v\v',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 8,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`line feed`, {
        source: '\n\n\n\n\n\n\n\n',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 0,
                  line: 9,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`keep locations correct after CRLF`, {
      source: 'a\r\nb',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
        body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'a',
                    start: 0,
                    end: 1,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 1
                        }
                    }
                },
                start: 0,
                end: 1,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 1
                    }
                }
            },
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'b',
                    start: 3,
                    end: 4,
                    loc: {
                        start: {
                            line: 2,
                            column: 0
                        },
                        end: {
                            line: 2,
                            column: 1
                        }
                    }
                },
                start: 3,
                end: 4,
                loc: {
                    start: {
                        line: 2,
                        column: 0
                    },
                    end: {
                        line: 2,
                        column: 1
                    }
                }
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 4,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 2,
                column: 1
            }
        }
    }
  });

  pass(`line feed`, {
        source: '\n\n\n\n\n\n\n\n',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 0,
                  line: 9,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`line feed`, {
        source: '\r\r\r\r\r\r\r\r',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 0,
                  line: 9,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`line separators`, {
        source: '\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 0,
                  line: 9,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`paragraph separators`, {
        source: '\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 8,
             loc: {
                end: {
                  column: 0,
                  line: 9,
                },
                start: {
                  column: 0,
                  line: 1,
                },
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`multiline comments with carriage return`, {
        source: '  \t /* foo * /* bar \r */  ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 26,
              loc: {
               end: {
                  column: 5,
                  line: 2,
                },
                start: {
                  column: 0,
                  line: 1,
                }
             },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`multiline comments with line feed`, {
        source: '  \t /* foo * /* bar \n */  ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 26,
              loc: {
               end: {
                  column: 5,
                  line: 2,
                },
                start: {
                  column: 0,
                  line: 1,
                }
             },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`multiple single line comments with line feed`, {
        source: '  \t // foo bar${lt} // baz \n // ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 32,
              loc: {
                end: {
                  column: 4,
                  line: 2,
                },
                start: {
                  column: 0,
                 line: 1,
               }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`multiple multiline comments with line feed`, {
        source: '  \t /* foo bar${lt} *//* baz*/ \n /**/',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 37,
              loc: {
                end: {
                  column: 5,
                  line: 2,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`multiple HTML single line comments with \n`, {
        source: '  \t <!-- foo bar\n <!-- baz \n <!--',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 33,
              loc: {
                end: {
                  column: 5,
                  line: 3,
                },
                start: {
                  column: 0,
                  line: 1,
                }
             },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`single HTML close comment after line feed`, {
        source: '  \t \n--> ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
             end: 9,
              loc: {
                end: {
                  column: 4,
                  line: 2,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
             sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`line of single HTML close comment after line feed`, {
        source: '   \t \r--> the comment extends to these characters\r  ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
             end: 52,
              loc: {
                end: {
                  column: 2,
                  line: 3,
                },
                start: {
                 column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

  pass(`single-line block on line of HTML close after line feed`, {
        source: `  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence */  \n
        --> the comment extends to these characters\n `,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [],
              end: 116,
              loc: {
                end: {
                  column: 1,
                  line: 5,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

});

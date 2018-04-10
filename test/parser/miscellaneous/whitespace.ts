import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Whitespace', () => {

    describe('Failure', () => {

    });

    describe('Pass', () => {
        
        pass(`spaces`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
            source: '        ',
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
    
      pass(`tabs`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
            source: '\t\t\t\t\t\t\t\t',
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
    });

    pass(`vertical tabs`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
        source: '\v\v\v\v\v\v\v\v',
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

  pass(`line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
        source: '\n\n\n\n\n\n\n\n',
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

  pass(`keep locations correct after CRLF`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
      source: 'a\r\nb',
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

  pass(`line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\n\n\n\n\n\n\n\n',
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

pass(`single-line block on line of HTML close after line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: `  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence */  \n
    --> the comment extends to these characters\n `,
    expected: {
          body: [],
          end: 112,
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

pass(`multiple HTML single line comments with \n`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t <!-- foo bar\n <!-- baz \n <!--',
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

pass(`single HTML close comment after line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t \n--> ',
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

pass(`line of single HTML close comment after line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '   \t \r--> the comment extends to these characters\r  ',
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

pass(`multiline comments with carriage return`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t /* foo * /* bar \r */  ',
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

pass(`multiline comments with line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t /* foo * /* bar \n */  ',
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

pass(`multiple single line comments with line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t // foo bar${lt} // baz \n // ',
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

pass(`multiple multiline comments with line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '  \t /* foo bar${lt} *//* baz*/ \n /**/',
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

pass(`line feed`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\r\r\r\r\r\r\r\r',
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
/*
pass(`var source = '{0\x0A1\x0D2\u20283\u20294}';`, Context.OptionsRaw, {
  source: `{0\x0A1\x0D2\u20283\u20294}`,
  expected: {
      body: [
        {
          body: [
            {
             expression: {
                raw: '0',
                type: 'Literal',
                value: 0
              },
              type: 'ExpressionStatement'
            },
            {
              expression: {
                raw: '1',
                type: 'Literal',
                value: 1
              },
              type: 'ExpressionStatement',
            },
            {
              expression: {
               raw: '2',
                type: 'Literal',
                value: 2,
              },
              type: 'ExpressionStatement',
            },
            {
              expression: {
                raw: '3',
                type: 'Literal',
                value: 3,
              },
              type: 'ExpressionStatement',
            },
            {
              expression: {
                raw: '4',
                type: 'Literal',
                value: 4,
              },
              type: 'ExpressionStatement'
            }
          ],
          type: 'BlockStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program',
    }
});*/

pass(`line separators`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028',
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

pass(`paragraph separators`, Context.OptionsRaw | Context.OptionsLoc | Context.OptionsRanges, {
    source: '\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029',
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

});
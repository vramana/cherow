import { pass, fail } from '../utils';

describe('Miscellaneous - Whitespace', () => {
 
    pass(`spaces`, {
        source: '        ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 8,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`tabs`, {
        source: '\t\t\t\t\t\t\t\t',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 8,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`vertical tabs`, {
        source: '\v\v\v\v\v\v\v\v',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 8,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`line feed`, {
        source: '\n\n\n\n\n\n\n\n',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 0,
                  "line": 9,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`line feed`, {
        source: '\n\n\n\n\n\n\n\n',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 0,
                  "line": 9,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`line feed`, {
        source: '\r\r\r\r\r\r\r\r',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 0,
                  "line": 9,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`line separators`, {
        source: '\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 0,
                  "line": 9,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`paragraph separators`, {
        source: '\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 8,
             "loc": {
                "end": {
                  "column": 0,
                  "line": 9,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`multiline comments with carriage return`, {
        source: '  \t /* foo * /* bar \r */  ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 26,
              "loc": {
               "end": {
                  "column": 5,
                  "line": 2,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
             },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`multiline comments with line feed`, {
        source: '  \t /* foo * /* bar \n */  ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 26,
              "loc": {
               "end": {
                  "column": 5,
                  "line": 2,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
             },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`multiple single line comments with line feed`, {
        source: '  \t // foo bar${lt} // baz \n // ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 32,
              "loc": {
                "end": {
                  "column": 4,
                  "line": 2,
                },
                "start": {
                  "column": 0,
                 "line": 1,
               }
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`multiple multiline comments with line feed`, {
        source: '  \t /* foo bar${lt} *//* baz*/ \n /**/',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 37,
              "loc": {
                "end": {
                  "column": 5,
                  "line": 2,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`multiple HTML single line comments with \n`, {
        source: '  \t <!-- foo bar\n <!-- baz \n <!--',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 33,
              "loc": {
                "end": {
                  "column": 5,
                  "line": 3,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
             },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`single HTML close comment after line feed`, {
        source: '  \t \n--> ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
             "end": 9,
              "loc": {
                "end": {
                  "column": 4,
                  "line": 2,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
             "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`line of single HTML close comment after line feed`, {
        source: '   \t \r--> the comment extends to these characters\r  ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
             "end": 52,
              "loc": {
                "end": {
                  "column": 2,
                  "line": 3,
                },
                "start": {
                 "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`single-line block on line of HTML close after line feed`, {
        source: `  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence */  \n
        --> the comment extends to these characters\n `,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 116,
              "loc": {
                "end": {
                  "column": 1,
                  "line": 5,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`block HTML close with line feed`, {
        source: ' \t /*\t*/  --> the comment extends to these characters ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 54,
              "loc": {
                "end": {
                  "column": 54,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
               },
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });

    pass(`single HTML close comment w/o line terminator`, {
        source: '  \t -->  ',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              "body": [],
              "end": 9,
              "loc": {
                "end": {
                  "column": 9,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            }
    });
});

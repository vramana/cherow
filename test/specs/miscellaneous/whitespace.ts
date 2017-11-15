import {  n,  fail, pass } from '../utils/test-utils';

describe('Whitespace', () => {

    fail('skip nested multiline comment', `/* 
var
/* x */
= 1;
*/`, false);

    fail('skip open multiline comment at the end of single line comment', `// var /* 
x*/`, false);


    fail('skip unclosed multiline comment', '/* foo ', true);
    fail('skip HTML with paragraph separators', '  \t <!-- foo bar$\u2029  ', true);

    fail('block HTML close with line feed', '  \t /*$v*/  --> the comment extends to these characters\t ', true);
    fail('block HTML close with carriage return', '  \t /*$v*/  --> the comment extends to these characters\r ', true);
    fail('block HTML close with line separators', '  \t /*$v*/  --> the comment extends to these characters\u2028 ', true);
    fail('block HTML close with paragraph separators', '  \t /*$v*/  --> the comment extends to these characters\u2029 ', true);

    fail('`first line block HTML close with line feed', `  \t /* optional FirstCommentLine \t*/  --> ` +
        `the comment extends to these characters\t `, true);
    fail('multi block + HTML close with line feed', `  \t /*\t optional\t MultiLineCommentChars \t 
*/  --> the comment extends to these characters\t  `, true);
    fail('multi block + HTML close with carriage return', `  \t /*\r optional\t MultiLineCommentChars \r 
*/  --> the comment extends to these characters\r  `, true);
    fail('multi block + single block + HTML close with line feed', `  \t /*\t*/ /* optional SingleLineDelimitedCommentSequence \t
*/  --> the comment extends to these characters\t `, true);

    fail('multi block + 2 single block + HTML close with line separators', `  \t /*\u2028*/ /**/ /* optional SingleLineDelimitedCommentSequence \u2028 
*/  --> the comment extends to these characters\u2028 `, true);

    fail('multi block + 2 single block + HTML close with Windows newline', `  \t /*\r*/ /**/ /* optional SingleLineDelimitedCommentSequence \r 
*/  --> the comment extends to these characters\r `, true);

    pass('skips nothing in an empty source', '', {
        type: 'Program',
        body: [],
        sourceType: 'script',
        start: 0,
        end: 0,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 1,
                column: 0
            }
        }
    });

    pass('skips vertical tabs', '\v\v\v\v\v\v\v\v', {
        type: 'Program',
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
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips mixed whitespace', '    \t \r\n \n\r \v\f\t ', {
        type: 'Program',
        body: [],
        end: 16,
        loc: {
            end: {
                column: 5,
                line: 4,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips single line comments with line feed`, '  \t // foo bar\t  ', {
        type: 'Program',
        body: [],
        end: 17,
        loc: {
            end: {
                column: 17,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips single line comments with line feed`, '  \t // foo bar\r  ', {
        type: 'Program',
        body: [],
        end: 17,
        loc: {
            end: {
                column: 2,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips single line comments with carriage return`, '  \t // foo bar\r  ', {
        type: 'Program',
        body: [],
        end: 17,
        loc: {
            end: {
                column: 2,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips single line comments with paragraph separators`, '  \t // foo bar\u2029  ', {
        type: 'Program',
        body: [],
        end: 17,
        loc: {
            end: {
                column: 2,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips single line comments with Windows newline`, '  \t // foo bar\r  ', {
        type: 'Program',
        body: [],
        end: 17,
        loc: {
            end: {
                column: 2,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips multiple single line comments with \t`, '  \t // foo bar${lt} // baz ${lt} //', {
        type: 'Program',
        body: [],
        end: 35,
        loc: {
            end: {
                column: 35,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips multiline comments with nothing', '  \t /* foo * /* bar */   ', {
        type: 'Program',
        body: [],
        end: 25,
        loc: {
            end: {
                column: 25,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips multiline comments with line feed`, '  \t /* foo * /* bar \n */  ', {
        type: 'Program',
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
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass(`skips multiline comments with line separators`, '  \t /* foo * /* bar \u2028 */  ', {
        type: 'Program',
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
            },
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips multiple multiline comments with line feed', '  \t /* foo bar\n *//* baz*/ \n /**/', {
        type: 'Program',
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
        start: 0
    });

    pass('skips multiple multiline comments with Windows newline', '  \t /* foo bar\r *//* baz*/ \r /**/', {
        type: 'Program',
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
        start: 0
    });

    pass('skips single line comment with vertical tab', '//\u000B single line \u000B comment \u000B x = 1;', {
        type: 'Program',
        body: [],
        end: 34,
        loc: {
            end: {
                column: 34,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips HTML single line comments with line feed', '  \t <!-- foo bar\n  ', {
        type: 'Program',
        body: [],
        end: 19,
        loc: {
            end: {
                column: 2,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips multiple HTML single line comments with line feed', '  \t <!-- foo bar\n <!-- baz \n <!--', {
        type: 'Program',
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
        start: 0
    });

    pass('skips multiple HTML single line comments with line separators', '  \t <!-- foo bar\u2028 <!-- baz \u2028 <!--', {
        type: 'Program',
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
        start: 0
    });

    pass('allows HTML close comment after  line feed + WS', '  \t \n   --> the comment extends to these characters\n ', {
        type: 'Program',
        body: [],
        end: 53,
        loc: {
            end: {
                column: 1,
                line: 3,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('allows HTML close comment after carriage return + WS', '  \t \r   --> the comment extends to these characters\r ', {
        type: 'Program',
        body: [],
        end: 53,
        loc: {
            end: {
                column: 1,
                line: 3,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips single HTML close comment after line feed', '  \t \n-->  ', {
        type: 'Program',
        body: [],
        end: 10,
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
        start: 0
    });

    pass('skips block HTML close with line feed + empty new line', '  \t /*\n*/  -->\n ', {
        type: 'Program',
        body: [],
        end: 16,
        loc: {
            end: {
                column: 1,
                line: 3,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips block HTML close with line separators + empty new line', '  \t /*\u2029*/  -->\u2029 ', {
        type: 'Program',
        body: [],
        end: 16,
        loc: {
            end: {
                column: 1,
                line: 3,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips first line block HTML close with line feed', `  \t /* optional FirstCommentLine \n*/  --> ` +
        `the comment extends to these characters\n `, {
            type: 'Program',
            body: [],
            end: 83,
            loc: {
                end: {
                    column: 1,
                    line: 3,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            start: 0
        });

    pass('skips first line block HTML close with Windows newline', `  \t /* optional FirstCommentLine \r*/  --> ` +
        `the comment extends to these characters\r `, {
            type: 'Program',
            body: [],
            end: 83,
            loc: {
                end: {
                    column: 1,
                    line: 3,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            start: 0
        });

    pass('skips multi block + single block + HTML close with line feed', `  \t /*\n*/ /* optional SingleLineDelimitedCommentSequence \n
*/  --> the comment extends to these characters\n `, {
        type: 'Program',
        body: [],
        end: 108,
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
        start: 0
    });

    pass('skips multi block + 2 single block + HTML close with paragraph separator', `  \t /*\u2029*/ /**/ /* optional SingleLineDelimitedCommentSequence \u2029
*/  --> the comment extends to these characters\u2029 `, {
        type: 'Program',
        body: [],
        end: 113,
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
        start: 0
    });

    pass('skips multi block + 2 single block + HTML close with  line feed', `  \t /*\n*/ /**/ /* optional SingleLineDelimitedCommentSequence \n
*/  --> the comment extends to these characters\n `, {
        type: 'Program',
        body: [],
        end: 113,
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
        start: 0
    });

    pass('skips multi block + 2 single block + HTML close with carriage return', `  \t /*\r*/ /**/ /* optional SingleLineDelimitedCommentSequence \r
*/  --> the comment extends to these characters\r `, {
        type: 'Program',
        body: [],
        end: 113,
        loc: {
            end: {
                column: 1,
                line: 4,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('skips multiple multiline comments with carriage return', '  \t /* foo bar\r *//* baz*/ \r /**/', {
        type: 'Program',
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
        start: 0
    });

    pass('skips multiple multiline comments with line separators', '  \t /* foo bar\u2028 *//* baz*/ \u2028 /**/', {
        type: 'Program',
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
        start: 0
    });

    pass('avoids single HTML close comment w/o line terminator', '  \t -->  ', {
        type: 'Program',
        body: [],
        end: 9,
        loc: {
            end: {
                column: 9,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('avoids single-line block on line of HTML close w/o line terminator', '  \t /* optional SingleLineDelimitedCommentSequence */ ' +
        '   --> the comment doesn\'t extend to these characters\n ', {
            type: 'Program',
            body: [],
            end: 109,
            loc: {
                end: {
                    column: 1,
                    line: 2,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            start: 0
        });

    pass('avoids line of single HTML close comment w/o line terminator', '  \t --> the comment doesn\'t extend to these characters\n ', {
        type: 'Program',
        body: [],
        end: 56,
        loc: {
            end: {
                column: 1,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('avoids block HTML close with empty line w/o line terminator', '  \t /**/  -->\n ', {
        type: 'Program',
        body: [],
        end: 15,
        loc: {
            end: {
                column: 1,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('avoids block HTML close with chars w/o line terminator', '  \t /**/  --> the comment doesn\'t extend to these characters\n ', {
        type: 'Program',
        body: [],
        end: 62,
        loc: {
            end: {
                column: 1,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        sourceType: 'script',
        start: 0
    });

    pass('avoids first line block HTML close w/o line terminator', '  \t /* optional FirstCommentLine */  --> ' +
        'the comment doesn\t extend to these characters\n ', {
            type: 'Program',
            body: [],
            end: 88,
            loc: {
                end: {
                    column: 1,
                    line: 2,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            start: 0
        });

    pass('avoids 2 single block + HTML close w/o line terminator', '  \t /**/ /* optional second SingleLineDelimitedCommentSequence */' +
        '  --> the comment doesn\'t extend to these characters\n ', {
            type: 'Program',
            body: [],
            end: 119,
            loc: {
                end: {
                    column: 1,
                    line: 2,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            sourceType: 'script',
            start: 0
        });
});
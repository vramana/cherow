import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Whitespace', () => {

    it(`should fail if whitespace are expressed as a Unicode escape sequence consisting of six characters"`, () => {
        expect(() => {
            parseScript(`var\\u0009x;`)
        }).to.throw();
    });

    it(`should fail if vertical tab are expressed as a Unicode escape sequence consisting of six characters"`, () => {
        expect(() => {
            parseScript(`var\\u000Bx;`)
        }).to.throw();
    });

    it(`should fail if form feed are expressed as a Unicode escape sequence consisting of six characters"`, () => {
        expect(() => {
            parseScript(`var\\u000Cx;`)
        }).to.throw();
    });

    it(`should fail on un-closed multi line comments"`, () => {
        expect(() => {
            parseScript(`/*foo/`)
        }).to.throw();
    });

    it(`should fail on nested multi line comments`, () => {
        expect(() => {
            parseScript(`/*
            var
            /* x */
            = 1;
            */`)
        }).to.throw();
    });

    it(`should fail if single and multi line comments are used together`, () => {
        expect(() => {
            parseScript(`/*foo#1*/

            /* var*/
            x*/`)
        }).to.throw();
    });

    it(`should fail if no break space are expressed as a Unicode escape sequence consisting of six characters"`, () => {
        expect(() => {
            parseScript(`var\\u00A0x;`)
        }).to.throw();
    });

    it('should allow space between tokens', () => {
        expect(parseScript('"\\u0020" + "var" + "\\u0020" + "x" + "\\u0020" + "=" + "\\u0020" + "2" + "\\u0020; result = x;"', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 91,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 91,
                "expression": {
                  "type": "BinaryExpression",
                  "start": 0,
                  "end": 91,
                  "left": {
                    "type": "BinaryExpression",
                    "start": 0,
                    "end": 67,
                    "left": {
                      "type": "BinaryExpression",
                      "start": 0,
                      "end": 61,
                      "left": {
                        "type": "BinaryExpression",
                        "start": 0,
                        "end": 50,
                        "left": {
                          "type": "BinaryExpression",
                          "start": 0,
                          "end": 44,
                          "left": {
                            "type": "BinaryExpression",
                            "start": 0,
                            "end": 33,
                            "left": {
                              "type": "BinaryExpression",
                              "start": 0,
                              "end": 27,
                              "left": {
                                "type": "BinaryExpression",
                                "start": 0,
                                "end": 16,
                                "left": {
                                  "type": "Literal",
                                  "start": 0,
                                  "end": 8,
                                  "value": " ",
                                  "raw": "\"\\u0020\""
                                },
                                "operator": "+",
                                "right": {
                                  "type": "Literal",
                                  "start": 11,
                                  "end": 16,
                                  "value": "var",
                                  "raw": "\"var\""
                                }
                              },
                              "operator": "+",
                              "right": {
                                "type": "Literal",
                                "start": 19,
                                "end": 27,
                                "value": " ",
                                "raw": "\"\\u0020\""
                              }
                            },
                            "operator": "+",
                            "right": {
                              "type": "Literal",
                              "start": 30,
                              "end": 33,
                              "value": "x",
                              "raw": "\"x\""
                            }
                          },
                          "operator": "+",
                          "right": {
                            "type": "Literal",
                            "start": 36,
                            "end": 44,
                            "value": " ",
                            "raw": "\"\\u0020\""
                          }
                        },
                        "operator": "+",
                        "right": {
                          "type": "Literal",
                          "start": 47,
                          "end": 50,
                          "value": "=",
                          "raw": "\"=\""
                        }
                      },
                      "operator": "+",
                      "right": {
                        "type": "Literal",
                        "start": 53,
                        "end": 61,
                        "value": " ",
                        "raw": "\"\\u0020\""
                      }
                    },
                    "operator": "+",
                    "right": {
                      "type": "Literal",
                      "start": 64,
                      "end": 67,
                      "value": "2",
                      "raw": "\"2\""
                    }
                  },
                  "operator": "+",
                  "right": {
                    "type": "Literal",
                    "start": 70,
                    "end": 91,
                    "value": " ; result = x;",
                    "raw": "\"\\u0020; result = x;\""
                  }
                }
              }
            ],
            "sourceType": "script"
          })
    });

    it('should allow space between tokens', () => {
        expect(parseScript('"\\u00A0var\\u00A0x\\u00A0=\\u00A01\\u00A0; result = x;"', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 51,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 51,
                "expression": {
                  "type": "Literal",
                  "start": 0,
                  "end": 51,
                  "value": " var x = 1 ; result = x;",
                  "raw": "\"\\u00A0var\\u00A0x\\u00A0=\\u00A01\\u00A0; result = x;\""
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse single and multi line comments together', () => {
        expect(parseScript(`/*cherow*/

        // var /* 
        // x 
        // =
        // 1*/`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 72,
            "body": [],
            "sourceType": "script"
          });
    });

    it('should parse single line comment with no-break space', () => {
        expect(parseScript(`//\u00A0 single line \u00A0 comment \u00A0 x = 1;`, {
            ranges: true,
        })).to.eql({
            "body": [],
            "end": 34,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        })
    });

    it('should parse single line comment with vertical tab', () => {
        expect(parseScript(`//\u000B single line \u000B comment \u000B`, {
            ranges: true,
        })).to.eql({
            "body": [],
            "end": 27,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        })
    });
        it('should skip multi line comment with space', () => {
            expect(parseScript(`/*\u0020 multi line \u0020 comment \u0020*/`, {
                ranges: true,
            })).to.eql({
                "body": [],
                "end": 28,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        });

        it('should skip multi line comment with no-break space', () => {
            expect(parseScript(`/*\u00A0 multi line \u00A0 comment \u00A0 */`, {
                ranges: true,

            })).to.eql({
                "type": "Program",
                "end": 29,
                "start": 0,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with form feed', () => {
            expect(parseScript(`/*\u000C multi line \u000C comment \u000C*/`, {
                ranges: true,

            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with vertical tab', () => {
            expect(parseScript(`/*multilinecommentx = 1;*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 30,
                "start": 0,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with horizontal tab', () => {
            expect(parseScript(`/*\u0009 multi line \u0009 comment \u0009*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with space', () => {
            expect(parseScript(`// single line comment `, {
                locations: true,
                ranges: true
                
            })).to.eql({
                  "body": [],
                  "end": 23,
                  "loc": {
                    "end": {
                      "column": 23,
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
                })
        });

        it('should skip single line comment with horizontal vertical tab', () => {
            expect(parseScript(`//\u0009 single line \u0009 comment \u0009 `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with carriage return', () => {
            expect(parseScript(`  \t // foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 17,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with Windows newlines', () => {
            expect(parseScript(`  \t // foo bar\r\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 18,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiline comments with nothing', () => {
            expect(parseScript(`  \t /* foo * /* bar */  `, {
                locations: true,
                ranges: true
                
            })).to.eql({
                  "body": [],
                  "end": 24,
                  "loc": {
                    "end": {
                      "column": 24,
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
                })
        });



        it('should skip multiple single line comments with line feed', () => {
            expect(parseScript(`  \t // foo bar\n // baz \n //`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 27,
                "start": 0,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with Windows newlines', () => {
            expect(parseScript(`  \t /* foo bar\r\n *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 34,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with space', () => {
            expect(parseScript(`/*\u0020 multi line \u0020 comment \u0020*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,
                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with space', () => {
            expect(parseScript(`/*\u0020 multi line \u0020 comment \u0020*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"

            })
        });

        it('should skip multi line comment with no-break space', () => {
            expect(parseScript(`/*\u00A0 multi line \u00A0 comment \u00A0 */`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 29,

                "body": [],
                "start": 0,
                "sourceType": "script"

            })
        });

        it('should skip multi line comment with form feed', () => {
            expect(parseScript(`/*\u000C multi line \u000C comment \u000C*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it.skip('should skip multi line comment with vertical tab', () => {
            expect(parseScript(`/*multilinecommentx = 1;*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with horizontal tab', () => {
            expect(parseScript(`/*\u0009 multi line \u0009 comment \u0009*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with space', () => {
            expect(parseScript(`// single line comment `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 23,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with horizontal vertical tab', () => {
            expect(parseScript(`//\u0009 single line \u0009 comment \u0009 `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it.skip('should skip single line comments with carriage return', () => {
            expect(parseScript(`  \t // foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip single line comments with Windows newlines', () => {
            expect(parseScript(`  \t // foo bar\r\n  `, {
                ranges: true,
                
            })).to.eql({
                "body": [],
                "end": 18,

                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        });

        it('should skip multi line comment with form feed', () => {
            expect(parseScript(`/*\u000C multi line \u000C comment \u000C*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with vertical tab', () => {
            expect(parseScript(`/*multilinecommentx = 1;*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 30,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multi line comment with horizontal tab', () => {
            expect(parseScript(`/*\u0009 multi line \u0009 comment \u0009*/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with space', () => {
            expect(parseScript(`// single line comment `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 23,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comment with horizontal vertical tab', () => {
            expect(parseScript(`//\u0009 single line \u0009 comment \u0009 `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 28,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with carriage return', () => {
            expect(parseScript(`  \t // foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 17,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip single line comments with Windows newlines', () => {
            expect(parseScript(`  \t // foo bar\r\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 18,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple single line comments with line feed', () => {
            expect(parseScript(`  \t // foo bar\n // baz \n //`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 27,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiline comments with nothing', () => {
            expect(parseScript(`  \t /* foo * /* bar */  `, {
                ranges: true,
                

            })).to.eql({
                "type": "Program",
                "end": 24,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with Windows newlines', () => {
            expect(parseScript(`  \t /* foo bar\r\n *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 34,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with paragraph separators', () => {
            expect(parseScript(`  \t /* foo bar\u2029 *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 33,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple multiline comments with line feed', () => {
            expect(parseScript(`  \t /* foo bar\n *//* baz*/ \n /**/`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 33,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip multiple single line comments with paragraph separators', () => {
            expect(parseScript(`  \t // foo bar\u2029 // baz \n //`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 27,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip spaces', () => {
            expect(parseScript(`        `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });


        it('should skip spaces', () => {
            expect(parseScript(`        `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip tabs', () => {
            expect(parseScript(`\t\t\t\t\t\t\t\t`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip vertical tabs', () => {
            expect(parseScript(`\v\v\v\v\v\v\v\v`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "end": 8,

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip line feeds', () => {
            expect(parseScript(`\n\n\n\n\n\n\n\n`, {
                ranges: true,
            })).to.eql({
                "end": 8,
                "type": "Program",

                "body": [],
                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip carriage returns', () => {
            expect(parseScript(`\r\r\r\r\r\r\r\r`, {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 8,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip Windows newlines', () => {
            expect(parseScript(`\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 16,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip nothing', () => {
            expect(parseScript(``, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 0,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip mixed whitespace', () => {
            expect(parseScript(`    \t \r\n \n\r \v\f\t `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 16,

                "start": 0,
                "sourceType": "script"
            })
        });

        it('should skip line separators', () => {
            expect(parseScript(`\u2028\u2028\u2028\u2028\u2028\u2028\u2028\u2028`, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "body": [],
                "end": 8,

                "sourceType": "script",
                "start": 0
            })
        });

        it('should skip paragraph separators', () => {
            expect(parseScript(`\u2029\u2029\u2029\u2029\u2029\u2029\u2029\u2029`, {
                locations: true,
                ranges: true
            })).to.eql({
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
                })
        });

        it('should avoid HTML single line comments with \r', () => {
            expect(parseScript(`  \t <!-- foo bar\r <!-- baz \r <!--`, {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 33,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should avoid HTML single line comments with \n', () => {
            expect(parseScript(`  \t <!-- foo bar\n <!-- baz \n <!--`, {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 33,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \n', () => {
            expect(parseScript(`  \t <!-- foo bar\n  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multiple HTML single line comments with \n', () => {
            expect(parseScript(`  \t /*\n*/ /**/ /* second optional ""
        SingleLineDelimitedCommentSequence */    ""
        --> the comment extends to these characters\n `, {
                locations: true,
                ranges: true,
                raw: true
            })).to.eql({
                  "body": [
                    {
                      "end": 88,
                     "expression": {
                        "end": 88,
                        "loc": {
                          "end": {
                            "column": 51,
                            "line": 3,
                         },
                          "start": {
                            "column": 49,
                            "line": 3,
                          }
                        },
                        "raw": "\"\"",
                        "start": 86,
                        "type": "Literal",
                        "value": "",
                     },
                      "loc": {
                        "end": {
                          "column": 51,
                          "line": 3,
                        },
                        "start": {
                          "column": 49,
                          "line": 3,
                        },
                     },
                      "start": 86,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 142,
                  "loc": {
                    "end": {
                      "column": 1,
                      "line": 5,
                    },
                   "start": {
                      "column": 0,
                     "line": 1,
                    },
                  },
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program",
                })
        });

        it('should avoids block HTML close with windows newline + empty line', () => {
            expect(parseScript(`  \t /*\n*/  -->\n `, {
                locations: true,
                ranges: true
            })).to.eql({
                  "body": [],
                  "end": 16,
                  "loc": {
                    "end": {
                      "column": 1,
                      "line": 3,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    },
                  },
                  "sourceType": "script",
                  "start": 0,
                 "type": "Program"
                })
        });

        it('should avoid block HTML close with line feed + empty line', () => {
            expect(parseScript(`  \t /*\r*/  -->\r `, {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should avoid multi block + 2 single block + HTML close with \r', () => {
            expect(parseScript(`  \t /*\r}*/ /**/ /* optional SingleLineDelimitedCommentSequence\r */  --> the comment extends to these characters\r `, {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 113,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should avoid single-line block on line of HTML close w/o line terminator', () => {
            expect(parseScript("  \t /* optional SingleLineDelimitedCommentSequence */ " +
            "   --> the comment doesn't extend to these characters\n ", {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 109,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should avoid  2 single-line block on line of HTML close w/o line terminator', () => {
            expect(parseScript("/**/ /* second optional SingleLineDelimitedCommentSequence */ --> the comment doesn't extend to these characters", {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 112,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should avoid first line block HTML close w/o line terminator', () => {
            expect(parseScript("  \t /* optional FirstCommentLine */  --> " +
            "the comment doesn't extend to these characters\n ", {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 89,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should avoid 2 single block + HTML close w/o line terminator', () => {
            expect(parseScript("  \t /**/ /* optional second SingleLineDelimitedCommentSequence */" +
            "  --> the comment doesn't extend to these characters\n ", {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 119,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip multiple HTML single line comments with \n', () => {
            expect(parseScript(`  \t <!-- foo bar\n <!-- baz \n <!--`, {
                ranges: true,
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 33,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t <!-- foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",

                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });
        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t \r   --> the comment extends to these characters\r `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",

                "start": 0,
                "end": 53,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \n', () => {
            expect(parseScript(`  \t <!-- foo bar\n  `, {
                locations: true,
                ranges: true
            })).to.eql({
                  "body": [],
                  "end": 19,
                  "loc": {
                    "end": {
                      "column": 2,
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
                })
        });

        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t <!-- foo bar\r  `, {
                ranges: true,
                
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 19,
                "body": [],
                "sourceType": "script"
            })
        });

        it('should skip HTML single line comments with \r', () => {
            expect(parseScript(`  \t \r   --> the comment extends to these characters\r `, {
                ranges: true,
                locations: true
            })).to.eql({
                  "body": [],
                  "end": 53,
                  "loc": {
                    "end": {
                      "column": 1,
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
                })
        });
});
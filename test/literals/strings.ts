import { pass, fail } from '../utils';

describe('Literals - Strings', () => {
    
        fail('"\\u{g0g}"',  { source: '"\\u{g0g}"'});
        fail('"\\u{g0g}"',  { source: '"\\u{g}"'});
        fail('"\\u{g}"',  { source: '"\\u{g}"'});
        fail('"\\u{g0}"',  { source: '"\\u{g0}"'});
        fail('"\\u{g0}"',  { source: '"\\u{g0}"'});
        fail('\\u{0g}',  { source: '\\u{0g}'});
        fail('\\u{0g0}\r\n',  { source: '\\u{0g0}\r\n'});
        fail('"\\u{g0g}"',  { source: '"\\u{g0g}"'});
        fail('"\\u{110000}"',  { source: '"\\u{110000}"'});
        fail('"\\u{11ffff}"',  { source: '"\\u{11ffff}"'});
        fail('"\\x0g"',  { source: '"\\x0g"'});
        fail('"\\xg0\r\n"',  { source: '"\\xg0\r\n"'});
        fail('"\\xgg"',  { source: '"\\xgg"'});
        fail('"\\xfg"',  { source: '"\\xfg"'});
        fail('"\\xFG"',  { source: '"\\xFG"'});
        fail('"\\u0g00"',  { source: '"\\u0g00"'});
        fail('"\\u00g0"',  { source: '"\\u00g0"'});
        fail('"\\uAA"',  { source: '"\\uAA"'});
        fail('"\\uAAA"',  { source: '"\\uAAA"'});
        fail('"Hello\nworld"',  { source: '"Hello\nworld"'});
        fail('"\n\r\t\v\b\f\\\'\"\0"',  { source: '"\n\r\t\v\b\f\\\'\"\0"'});

        fail('"use strict";  "\\08"',  { source: '"use strict"; \\08"'});
        // fail(`"use strict";  "\\09"`, `"use strict";  "\\09"`);
        fail('"\\u{110000}"',  { source: '"\\u{110000}"'});
        fail('"\\u{FFFFFFF}"',  { source: '"\\u{FFFFFFF}"'});
        fail('"use strict"; ("\\000")',  { source: '"use strict"; ("\\000")'});
        fail('"use strict"; ("\\000")',  { source: '"use strict"; ("\\000")'});
        fail('"use strict"; ("\\001")',  { source: '"use strict"; ("\\001")'});
        fail('"use strict"; ("\\123")',  { source: '"use strict"; ("\\123")'});
        fail('"use strict"; ("\\01")',  { source: '"use strict"; ("\\01")'});
        fail('"use strict"; ("\\41")',  { source: '"use strict"; ("\\41")'});
        fail('"use strict"; ("\\1")',  { source: '"use strict"; ("\\1")'});
        fail('"use strict"; ("\\4")',  { source: '"use strict"; ("\\4")'});
        fail('"use strict"; ("\\11")',  { source: '"use strict"; ("\\11")'});
        fail('"\\"',  { source: '"\\"'});
        fail('"use strict"; "\\10";',  { source: '"use strict"; \\10";'});
        fail('"use strict"; "\\16";',  { source: '"use strict"; "\\16";'});
        fail('"use strict"; "\\31";',  { source: '"use strict"; "\\31";'});
        fail('"use strict"; "\\106";',  { source: '"use strict"; "\\106";'});
        fail('"use strict"; "\\207";',  { source: '"use strict"; "\\207";'});
        fail('"use strict"; "\\10";',  { source: '"use strict"; "\\10";'});
        fail('"use strict"; "\\052"',  { source: '"use strict"; "\\052"'});
        fail('"use strict"; "\\376";',  { source: '"use strict"; "\\376";'});
        fail('"use strict"; "a\\4";',  { source: '"use strict"; "a\\4";'});
        fail('"use strict"; "z\\7";',  { source: '"use strict"; "z\\7";'});
        fail('"use strict"; "\\10";',  { source: '"use strict"; "\\10";'});
        fail('"use strict"; "\\1\\2\\7"',  { source: '"use strict"; "\\1\\2\\7"'});
        fail('"use strict"; "\\u1"',  { source: '"use strict"; "\\u1"'});
        fail('"use strict"; "\\u1"',  { source: '"use strict"; "\\u1"'});
        fail('"use strict"; "\\uAAA"',  { source: '"use strict"; "\\uAAA"'});
        fail('"\\uAAA"',  { source: '"\\uAAA"'});
        fail('"\\8"',  { source: '"\\8"'});
        fail('"\\9"',  { source: '"\\9"'});
        fail('"use strict"; "\\u1"',  { source: '"use strict"; "\\u1"'});

        pass(`"abc"`, {
            source: '"abc"',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": "abc",
                            "start": 0,
                            "end": 5,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            },
                            "raw": "\"abc\""
                        },
                        "start": 0,
                        "end": 5,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 5
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 5,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 5
                    }
                }
            }
        });

        pass(`"\\б"`, {
            source: '"\\б"',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                  "body": [
                    {
                      "end": 4,
                      "expression": {
                       "end": 4,
                        "loc": {
                          "end": {
                            "column": 4,
                            "line": 1,
                          },
                          "start": {
                            "column": 0,
                            "line": 1,
                          }
                        },
                        "raw": "\"\\б\"",
                       "start": 0,
                        "type": "Literal",
                        "value": "б",
                     },
                      "loc": {
                        "end": {
                          "column": 4,
                          "line": 1,
                        },
                        "start": {
                          "column": 0,
                          "line": 1,
                        }
                      },
                      "start": 0,
                      "type": "ExpressionStatement"
                    }
                  ],
                  "end": 4,
                  "loc": {
                    "end": {
                      "column": 4,
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


        pass(`"\\u0435"`, {
            source: '"\\n\\r\\t\\v\\b\\f"',
            expected:  {
                  "body": [
                    {
                      "expression": {
                        "type": "Literal",
                        "value": "\n\r\t\u000b\b\f",
                      },
                      "type": "ExpressionStatement",
                    },
                  ],
                  "sourceType": "script",
                 "type": "Program"
                }
        });

        pass(`"Hello\\nworld"`, {
            source: '"Hello\\nworld"',
            directives: true,
            ranges: true,
            raw: true,
            expected:  {
                  "body": [
                    {
                      "directive": "Hello\\nworld",
                      "end": 14,
                      "expression": {
                        "end": 14,
                        "raw": "\"Hello\\nworld\"",
                        "start": 0,
                        "type": "Literal",
                        "value": "Hello\nworld",
                      },
                      "start": 0,
                      "type": "ExpressionStatement",
                    }
                  ],
                 "end": 14,
                  "sourceType": "script",
                  "start": 0,
                  "type": "Program"
                }
        });

        pass(`"\\u0435"`, {
            source: '"\\u0435"',
            loc: true,
            directives: true,
            ranges: true,
            raw: true,
            expected:  {
                type: "Program",
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    directive: "\\u0435",
                    expression: {
                        type: "Literal",
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        value: "е",
                        raw: "\"\\u0435\""
                    }
                }],
                sourceType: "script"
            }
        });

        pass(`"\\u0432"`, {
            source: '"\\u0432"',
            loc: true,
            ranges: true,
            directives: true,
            raw: true,
            expected: {
                type: "Program",
                start: 0,
                end: 8,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 8
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    },
                    directive: "\\u0432",
                    expression: {
                        type: "Literal",
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        value: "в",
                        raw: "\"\\u0432\""
                    }
                }],
                sourceType: "script"
            }
        });

        pass(`"\\u180E"`, {
            source: '"\\u180E"',
            loc: true,
            ranges: true,
            directives: true,
            raw: true,
            expected: {
                body: [{
                    directive: "\\u180E",
                    end: 8,
                    expression: {
                        end: 8,
                        loc: {
                            end: {
                                column: 8,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1
                            }
                        },
                        raw: "\"\\u180E\"",
                        start: 0,
                        type: "Literal",
                        value: "᠎",
                    },
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
                    start: 0,
                    type: "ExpressionStatement",
                }],
                end: 8,
                loc: {
                    end: {
                        column: 8,
                        line: 1
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                sourceType: "script",
                start: 0,
                type: "Program"
            }
        });

        pass(`"\\7"`, {
            source: '"\\7"',
            loc: true,
            ranges: true,
            raw: true,
            directives: true,
            expected: {
                body: [{
                    directive: "\\7",
                    end: 4,
                    expression: {
                        end: 4,
                        loc: {
                            end: {
                                column: 4,
                                line: 1,
                            },
                            start: {
                                column: 0,
                                line: 1,
                            },
                        },
                        raw: "\"\\7\"",
                        start: 0,
                        type: "Literal",
                        value: "\u0007",
                    },
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        },
                    },
                    start: 0,
                    type: "ExpressionStatement",
                }],
                end: 4,
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                sourceType: "script",
                start: 0,
                type: "Program"
            }
        });

        pass(`"Hello\\012World"`, {
            source: '"Hello\\012World"',
            loc: true,
            ranges: true,
            directives: true,
            raw: true,
            expected: {
                type: "Program",
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    directive: "Hello\\012World",
                    expression: {
                        type: "Literal",
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        value: "Hello\nWorld",
                        raw: "\"Hello\\012World\""
                    }
                }],
                sourceType: "script"
            }
        });

        pass(`"Hello\\412World"`, {
            source: '"Hello\\412World"',
            loc: true,
            ranges: true,
            directives: true,
            raw: true,
            expected: {
                type: "Program",
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    directive: "Hello\\412World",
                    expression: {
                        type: "Literal",
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        value: "Hello!2World",
                        raw: "\"Hello\\412World\""
                    }
                }],
                sourceType: "script"
            }
        });

        pass('"Hello\\712World"', {
            source: '"Hello\\712World"',
            loc: true,
            ranges: true,
            raw: true,
            directives: true,
            expected: {
                type: "Program",
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    start: 0,
                    end: 16,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 16
                        }
                    },
                    directive: "Hello\\712World",
                    expression: {
                        type: "Literal",
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        },
                        value: "Hello92World",
                        raw: "\"Hello\\712World\""
                    }
                }],
                sourceType: "script"
            }
        });

        pass('"Hello\\1World"', {
            source: '"Hello\\1World"',
            loc: true,
            ranges: true,
            directives: true,
            raw: true,
            expected: {
                type: "Program",
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    },
                    directive: "Hello\\1World",
                    expression: {
                        type: "Literal",
                        start: 0,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        value: "Hello\u0001World",
                        raw: "\"Hello\\1World\""
                    }
                }],
                sourceType: "script"
            }
        });

        pass(`"\\xff"`, {
            source: `"\\xff"`,
            loc: true,
            ranges: true,
            directives: true,
            raw: true,
            expected:  {
                type: "Program",
                start: 0,
                end: 6,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 6
                    }
                },
                body: [{
                    type: "ExpressionStatement",
                    start: 0,
                    end: 6,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 6
                        }
                    },
                    directive: "\\xff",
                    expression: {
                        type: "Literal",
                        start: 0,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        },
                        value: "ÿ",
                        raw: "\"\\xff\""
                    }
                }],
                sourceType: "script"
            }
        });

        pass('"\\u{11000}"', {
            source: '"\\u{11000}"',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": "𑀀",
                            "start": 0,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            },
                            "raw": "\"\\u{11000}\""
                        },
                        "start": 0,
                        "end": 11,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 11
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            }
        });

        pass('"\\Щ"', {
            source: '"\\Щ"',
            raw: true,
            expected: {
                  "body": [
                    {
                      "expression": {
                        "raw": "\"\\Щ\"",
                        "type": "Literal",
                       "value": "Щ"
                      },
                     "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('"\\З"', {
            source: '"\\З"',
            raw: true,
            expected: {
                  "body": [
                    {
                      "expression": {
                        "raw": "\"\\З\"",
                        "type": "Literal",
                       "value": "З"
                      },
                     "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('"\\ю"', {
            source: '"\\ю"',
            raw: true,
            expected: {
                  "body": [
                    {
                      "expression": {
                        "raw": "\"\\ю\"",
                        "type": "Literal",
                       "value": "ю"
                      },
                     "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('"\\б"', {
            source: '"\\б"',
            raw: true,
            expected: {
                  "body": [
                    {
                      "expression": {
                        "raw": "\"\\б\"",
                        "type": "Literal",
                       "value": "б"
                      },
                     "type": "ExpressionStatement"
                    }
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('"a\\r\\nb"', {
            source: '"a\\r\\nb"',
            raw: true,
            expected: {
                  "body": [
                   {
                      "expression": {
                        "raw": "\"a\\r\\nb\"",
                        "type": "Literal",
                        "value": "a\r\nb",
                     },
                      "type": "ExpressionStatement",
                    },
                  ],
                  "sourceType": "script",
                  "type": "Program"
                }
        });

        pass('"\\u0451"', {
            source: '"\\u0451"',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": "ё",
                            "start": 0,
                            "end": 8,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 8
                                }
                            },
                            "raw": "\"\\u0451\""
                        },
                        "start": 0,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            }
        });

        pass('"\\u0006A"', {
            source: '"\\u0006A"',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Literal",
                            "value": "\u0006A",
                            "start": 0,
                            "end": 9,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 0
                                },
                                "end": {
                                    "line": 1,
                                    "column": 9
                                }
                            },
                            "raw": "\"\\u0006A\""
                        },
                        "start": 0,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    }
                ],
                "sourceType": "script",
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                }
            }
        });
    });
import {  n,  fail, pass } from '../utils/test-utils';

describe('Directives', () => {

    fail('strict directive after legacy octal ', '"\\1;" "use strict";');
    fail('strict directive after legacy octal followed by null', '"\\1;" "use strict"; null');
    fail('strict directive before legacy octal', '"use strict"; "\\1;"');
    fail('strict directive before legacy octal followed by null', '"use strict"; "\\1;" null');
    fail('legacy octal inside function body', '"use strict"; function f(){"\\1";}');
    fail('legacy octal inside function body', '"use strict"; function f(){"\\1";}', true);
    fail('invalid newlines after null escapes', '"random\\0\nnewline"');
    fail('invalid carriage returns', '"random\\0\rnewline"');
    fail('invalid newlines after ASCII \\x0', '"random\\x0\nnewline"');
    fail('invalid newlines after Unicode \\u', '"random\\u\nnewline"');
    fail('invalid newlines after Unicode \\u0', '"random\\u0\nnewline"');
    fail('invalid newlines after Unicode \\ua', '"random\\ua\nnewline"');
    fail('invalid paragraph separators after Unicode \\ua', '"random\\ua\u2029newline"');
    fail('invalid carriage returns after Unicode \\ua', '"random\\ua\rnewline"');
    fail('invalid newlines after Unicode \\u00', '"random\\u00\nnewline"');
    fail('invalid newlines after Unicode \\u0a', '"random\\u0a\nnewline"');
    fail('invalid newlines after Unicode \\u000', '"random\\u000\nnewline"');
    fail('invalid newlines after Unicode \\u00a', '"random\\u00a\nnewline"');
    fail('invalid newlines after Unicode \\u{', '"rrandom\\u{\nnewline"');
    fail('invalid newlines after Unicode \\u{0', '"random\\u{0\nnewline"');
    fail('invalid newlines after Unicode \\u{a', '"random\\u{a\nnewline"');
    fail('invalid carriage returns after Unicode \\u{a', '"random\\u{a\rnewline"');
    fail('catches invalid space after ASCII \\x', "'random\\x foo'");
    fail("catches invalid space after ASCII \\x0", "'random\\x0 foo'");
    fail("catches invalid space after Unicode \\u", "'random\\u foo'");
    fail("catches invalid space after Unicode \\u0", "'random\\u0 foo'");
    fail("catches invalid space after Unicode \\ua", "'random\\ua foo'");
    fail("catches invalid space after Unicode \\u00", "'random\\u00 foo'");
    fail("catches invalid space after Unicode \\u0a", "'random\\u0a foo'");
    fail("catches invalid space after Unicode \\u000", "'random\\u000 foo'");
    fail("catches invalid space after Unicode \\u00a", "'random\\u00a foo'");
    fail("catches invalid space after Unicode \\u{", "'random\\u{ foo'");
    fail("catches invalid space after Unicode \\u{0", "'random\\u{0 foo'");
    fail("catches invalid space after Unicode \\u{a", "'random\\u{a foo'");
    fail("catches invalid \\ after ASCII \\x", "'random\\x\\ foo'");
    fail("catches invalid \\ after ASCII \\x0", "'random\\x0\\ foo'");
    fail("catches invalid \\ after Unicode \\u", "'random\\u\\ foo'");
    fail("catches invalid \\ after Unicode \\u0", "'random\\u0\\ foo'");
    fail("catches invalid \\ after Unicode \\ua", "'random\\ua\\ foo'");
    fail("catches invalid \\ after Unicode \\u00", "'random\\u00\\ foo'");
    fail("catches invalid \\ after Unicode \\u0a", "'random\\u0a\\ foo'");
    fail("catches invalid \\ after Unicode \\u000", "'random\\u000\\ foo'");
    fail("catches invalid \\ after Unicode \\u00a", "'random\\u00a\\ foo'");
    fail("catches invalid \\ after Unicode \\u{", "'random\\u{\\ foo'");
    fail("catches invalid \\ after Unicode \\u{0", "'random\\u{0\\ foo'");
    fail("catches invalid \\ after Unicode \\u{a", "'random\\u{a\\ foo'");
    fail("catches invalid x after ASCII \\x", "'random\\xx foo'");
    fail("catches invalid x after ASCII \\x0", "'random\\x0x foo'");
    fail("catches invalid x after Unicode \\u", "'random\\ux foo'");
    fail("catches invalid x after Unicode \\u0", "'random\\u0x foo'");
    fail("catches invalid x after Unicode \\ua", "'random\\uax foo'");
    fail("catches invalid x after Unicode \\u00", "'random\\u00x foo'");
    fail("catches invalid x after Unicode \\u0a", "'random\\u0ax foo'");
    fail("catches invalid x after Unicode \\u000", "'random\\u000x foo'");
    fail("catches invalid x after Unicode \\u00a", "'random\\u00ax foo'");
    fail("catches invalid x after Unicode \\u{", "'random\\u{x foo'");
    fail("catches invalid x after Unicode \\u{0", "'random\\u{0x foo'");
    fail("catches invalid x after Unicode \\u{a", "'random\\u{ax foo'");
    fail("catches invalid X after ASCII \\x", "'random\\xX foo'");
    fail("catches invalid X after ASCII \\x0", "'random\\x0X foo'");
    fail("catches invalid X after Unicode \\u", "'random\\uX foo'");
    fail("catches invalid X after Unicode \\u0", "'random\\u0X foo'");
    fail("catches invalid X after Unicode \\ua", "'random\\uaX foo'");
    fail("catches invalid X after Unicode \\u00", "'random\\u00X foo'");
    fail("catches invalid X after Unicode \\u0a", "'random\\u0aX foo'");
    fail("catches invalid X after Unicode \\u000", "'random\\u000X foo'");
    fail("catches invalid X after Unicode \\u00a", "'random\\u00aX foo'");
    fail("catches invalid X after Unicode \\u{", "'random\\u{X foo'");
    fail("catches invalid X after Unicode \\u{0", "'random\\u{0X foo'");
    fail("catches invalid X after Unicode \\u{a", "'random\\u{aX foo'");
    fail("catches invalid u after ASCII \\x", "'random\\xu foo'");
    fail("catches invalid u after ASCII \\x0", "'random\\x0u foo'");
    fail("catches invalid u after Unicode \\u", "'random\\uu foo'");
    fail("catches invalid u after Unicode \\u0", "'random\\u0u foo'");
    fail("catches invalid u after Unicode \\ua", "'random\\uau foo'");
    fail("catches invalid u after Unicode \\u00", "'random\\u00u foo'");
    fail("catches invalid u after Unicode \\u0a", "'random\\u0au foo'");
    fail("catches invalid u after Unicode \\u000", "'random\\u000u foo'");
    fail("catches invalid u after Unicode \\u00a", "'random\\u00au foo'");
    fail("catches invalid u after Unicode \\u{", "'random\\u{u foo'");
    fail("catches invalid u after Unicode \\u{0", "'random\\u{0u foo'");
    fail("catches invalid u after Unicode \\u{a", "'random\\u{au foo'");
    fail("catches invalid U after ASCII \\x", "'random\\xU foo'");
    fail("catches invalid U after ASCII \\x0", "'random\\x0U foo'");
    fail("catches invalid U after Unicode \\u", "'random\\uU foo'");
    fail("catches invalid U after Unicode \\u0", "'random\\u0U foo'");
    fail("catches invalid U after Unicode \\ua", "'random\\uaU foo'");
    fail("catches invalid U after Unicode \\u00", "'random\\u00U foo'");
    fail("catches invalid U after Unicode \\u0a", "'random\\u0aU foo'");
    fail("catches invalid U after Unicode \\u000", "'random\\u000U foo'");
    fail("catches invalid U after Unicode \\u00a", "'random\\u00aU foo'");
    fail("catches invalid U after Unicode \\u{", "'random\\u{U foo'");
    fail("catches invalid U after Unicode \\u{0", "'random\\u{0U foo'");
    fail("catches invalid U after Unicode \\u{a", "'random\\u{aU foo'");
    fail("catches invalid { after ASCII \\x", "'random\\x{ foo'");
    fail("catches invalid { after ASCII \\x0", "'random\\x0{ foo'");
    fail("catches invalid { after Unicode \\u", "'random\\u{ foo'");
    fail("catches invalid { after Unicode \\u0", "'random\\u0{ foo'");
    fail("catches invalid { after Unicode \\ua", "'random\\ua{ foo'");
    fail("catches invalid { after Unicode \\u00", "'random\\u00{ foo'");
    fail("catches invalid { after Unicode \\u0a", "'random\\u0a{ foo'");
    fail("catches invalid { after Unicode \\u000", "'random\\u000{ foo'");
    fail("catches invalid { after Unicode \\u00a", "'random\\u00a{ foo'");
    fail("catches invalid { after Unicode \\u{", "'random\\u{{ foo'");
    fail("catches invalid { after Unicode \\u{0", "'random\\u{0{ foo'");
    fail("catches invalid { after Unicode \\u{a", "'random\\u{a{ foo'");
    fail("catches invalid } after ASCII \\x", "'random\\x} foo'");
    fail("catches invalid } after ASCII \\x0", "'random\\x0} foo'");
    fail("catches invalid } after Unicode \\u", "'random\\u} foo'");
    fail("catches invalid } after Unicode \\u0", "'random\\u0} foo'");
    fail("catches invalid } after Unicode \\ua", "'random\\ua} foo'");
    fail("catches invalid } after Unicode \\u00", "'random\\u00} foo'");
    fail("catches invalid } after Unicode \\u0a", "'random\\u0a} foo'");
    fail("catches invalid } after Unicode \\u000", "'random\\u000} foo'");
    fail("catches invalid } after Unicode \\u00a", "'random\\u00a} foo'");
    fail("catches invalid } after Unicode \\u{", "'random\\u{} foo'");

    pass('parse a single "use strict"', '"use strict"', {
        "body": [{
            "directive": "use strict",
            end: 12,
            "expression": {
                end: 12,
                "loc": {
                    end: {
                        column: 12,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                "raw": "\"use strict\"",
                start: 0,
                "type": "Literal",
                "value": "use strict",
            },
            "loc": {
                end: {
                    column: 12,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            start: 0,
            "type": "ExpressionStatement",
        }, ],
        end: 12,
        "loc": {
            end: {
                column: 12,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('parse a single "use strict" in module code', '"use strict"', {
        "body": [{
            "directive": "use strict",
            end: 12,
            "expression": {
                end: 12,
                "loc": {
                    end: {
                        column: 12,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                "raw": "\"use strict\"",
                start: 0,
                "type": "Literal",
                "value": "use strict",
            },
            "loc": {
                end: {
                    column: 12,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            start: 0,
            "type": "ExpressionStatement",
        }, ],
        end: 12,
        "loc": {
            end: {
                column: 12,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: "script",
        start: 0,
        type: "Program",
    });
    
    pass('parse "use strict" with two spaces between "use" and "strict"', 'function foo() { "use  strict"; var public = 1; }', {
          'body': [
            {
              'async': false,
              'body': {
                'body': [
                  {
                    'directive': 'use  strict',
                    end: 31,
                    'expression': {
                      end: 30,
                      'loc': {
                        end: {
                          column: 30,
                          line: 1,
                        },
                        start: {
                          column: 17,
                          line: 1,
                        }
                      },
                      raw: '"use  strict"',
                      start: 17,
                      type: "Literal",
                      value: "use  strict",
                    },
                    "loc": {
                      end: {
                        column: 31,
                        line: 1,
                      },
                      start: {
                        column: 17,
                        line: 1,
                      }
                    },
                    start: 17,
                    type: "ExpressionStatement"
                  },
                  {
                    "declarations": [
                      {
                        end: 46,
                        "id": {
                          end: 42,
                          "loc": {
                            end: {
                              column: 42,
                              line: 1,
                            },
                            start: {
                              column: 36,
                              line: 1,
                            }
                          },
                          "name": "public",
                          start: 36,
                          "type": "Identifier",
                        },
                        "init": {
                          end: 46,
                          "loc": {
                            end: {
                              column: 46,
                              line: 1,
                            },
                            start: {
                              column: 45,
                              line: 1,
                            },
                          },
                          "raw": "1",
                          start: 45,
                          "type": "Literal",
                          "value": 1,
                        },
                        "loc": {
                          end: {
                            column: 46,
                            line: 1,
                          },
                          start: {
                            column: 36,
                            line: 1,
                          },
                        },
                        start: 36,
                       "type": "VariableDeclarator",
                      }
                    ],
                   end: 47,
                    "kind": "var",
                    "loc": {
                      end: {
                       column: 47,
                        line: 1,
                      },
                      start: {
                        column: 32,
                        line: 1,
                      },
                    },
                    start: 32,
                    "type": "VariableDeclaration",
                  },
                ],
                end: 49,
                "loc": {
                  end: {
                    column: 49,
                    line: 1,
                 },
                  start: {
                   column: 15,
                    line: 1,
                  },
               },
                start: 15,
                "type": "BlockStatement",
              },
              end: 49,
              "expression": false,
              "generator": false,
              "id": {
                end: 12,
                "loc": {
                  end: {
                    column: 12,
                    line: 1,
                  },
                  start: {
                    column: 9,
                    line: 1,
                  },
                },
                "name": "foo",
                start: 9,
                "type": "Identifier",
              },
              "loc": {
                end: {
                  column: 49,
                  line: 1,
                },
                start: {
                  column: 0,
                  line: 1,
                }
              },
              "params": [],
              start: 0,
              "type": "FunctionDeclaration",
            },
          ],
          end: 49,
          "loc": {
            end: {
             column: 49,
              line: 1,
            },
            start: {
              column: 0,
              line: 1,
            },
          },
          "sourceType": "script",
          start: 0,
          "type": "Program",
        });

    pass('parse a single "use\\x20strict"', '"use\\x20strict"', {
        "body": [{
            "directive": "use\\x20strict",
            end: 15,
            "expression": {
                end: 15,
                "loc": {
                    end: {
                        column: 15,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                "raw": "\"use\\x20strict\"",
                start: 0,
                "type": "Literal",
                "value": "use strict",
            },
            "loc": {
                end: {
                    column: 15,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            start: 0,
            "type": "ExpressionStatement",
        }, ],
        end: 15,
        "loc": {
            end: {
                column: 15,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('parse a single "use asm"', '"use asm"', {
        "body": [{
            "directive": "use asm",
            end: 9,
            "expression": {
                end: 9,
                "loc": {
                    end: {
                        column: 9,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                "raw": "\"use asm\"",
                start: 0,
                "type": "Literal",
                "value": "use asm",
            },
            "loc": {
                end: {
                    column: 9,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            start: 0,
            "type": "ExpressionStatement",
        }, ],
        end: 9,
        "loc": {
            end: {
                column: 9,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('parse a "use asm" + semi + "use strict"', '"use asm"; "use strict"', {
        "body": [{
                "directive": "use asm",
                end: 10,
                "expression": {
                    end: 9,
                    "loc": {
                        end: {
                            column: 9,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    "raw": "\"use asm\"",
                    start: 0,
                    "type": "Literal",
                    "value": "use asm",
                },
                "loc": {
                    end: {
                        column: 10,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                "type": "ExpressionStatement",
            },
            {
                "directive": "use strict",
                end: 23,
                "expression": {
                    end: 23,
                    "loc": {
                        end: {
                            column: 23,
                            line: 1,
                        },
                        start: {
                            column: 11,
                            line: 1,
                        }
                    },
                    "raw": "\"use strict\"",
                    start: 11,
                    "type": "Literal",
                    "value": "use strict",
                },
                "loc": {
                    end: {
                        column: 23,
                        line: 1,
                    },
                    start: {
                        column: 11,
                        line: 1,
                    }
                },
                start: 11,
                "type": "ExpressionStatement",
            }
        ],
        end: 23,
        "loc": {
            end: {
                column: 23,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });


    pass('parse a "use asm" + LF + "use strict"', '"use asm";\n"use strict"', {
        "body": [{
                "directive": "use asm",
                end: 10,
                "expression": {
                    end: 9,
                    "loc": {
                        end: {
                            column: 9,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    "raw": "\"use asm\"",
                    start: 0,
                    "type": "Literal",
                    "value": "use asm",
                },
                "loc": {
                    end: {
                        column: 10,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                "type": "ExpressionStatement",
            },
            {
                "directive": "use strict",
                end: 23,
                "expression": {
                    end: 23,
                    "loc": {
                        end: {
                            column: 12,
                            line: 2,
                        },
                        start: {
                            column: 0,
                            line: 2,
                        }
                    },
                    "raw": "\"use strict\"",
                    start: 11,
                    "type": "Literal",
                    "value": "use strict",
                },
                "loc": {
                    end: {
                        column: 12,
                        line: 2,
                    },
                    start: {
                        column: 0,
                        line: 2,
                    }
                },
                start: 11,
                "type": "ExpressionStatement",
            }
        ],
        end: 23,
        "loc": {
            end: {
                column: 12,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('parse a "use asm" + CR + "use strict"', '"use asm";\r"use strict"', {
        "body": [{
                "directive": "use asm",
                end: 10,
                "expression": {
                    end: 9,
                    "loc": {
                        end: {
                            column: 9,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    "raw": "\"use asm\"",
                    start: 0,
                    "type": "Literal",
                    "value": "use asm",
                },
                "loc": {
                    end: {
                        column: 10,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                "type": "ExpressionStatement",
            },
            {
                "directive": "use strict",
                end: 23,
                "expression": {
                    end: 23,
                    "loc": {
                        end: {
                            column: 12,
                            line: 2,
                        },
                        start: {
                            column: 0,
                            line: 2,
                        }
                    },
                    "raw": "\"use strict\"",
                    start: 11,
                    "type": "Literal",
                    "value": "use strict",
                },
                "loc": {
                    end: {
                        column: 12,
                        line: 2,
                    },
                    start: {
                        column: 0,
                        line: 2,
                    }
                },
                start: 11,
                "type": "ExpressionStatement",
            }
        ],
        end: 23,
        "loc": {
            end: {
                column: 12,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('parse a "use asm" + paragraph separator + "use strict"', '"use asm";\u2029 "use strict"', {
        "body": [{
                "directive": "use asm",
                end: 10,
                "expression": {
                    end: 9,
                    "loc": {
                        end: {
                            column: 9,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    "raw": "\"use asm\"",
                    start: 0,
                    "type": "Literal",
                    "value": "use asm",
                },
                "loc": {
                    end: {
                        column: 10,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                "type": "ExpressionStatement",
            },
            {
                "directive": "use strict",
                end: 24,
                "expression": {
                    end: 24,
                    "loc": {
                        end: {
                            column: 13,
                            line: 2,
                        },
                        start: {
                            column: 1,
                            line: 2,
                        }
                    },
                    "raw": "\"use strict\"",
                    start: 12,
                    "type": "Literal",
                    "value": "use strict",
                },
                "loc": {
                    end: {
                        column: 13,
                        line: 2,
                    },
                    start: {
                        column: 1,
                        line: 2,
                    }
                },
                start: 12,
                "type": "ExpressionStatement",
            }
        ],
        end: 24,
        "loc": {
            end: {
                column: 13,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('parse a "use asm" + CRLF + "use strict"', '"use asm";\r\n"use strict"', {
        "body": [{
                "directive": "use asm",
                end: 10,
                "expression": {
                    end: 9,
                    "loc": {
                        end: {
                            column: 9,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    "raw": "\"use asm\"",
                    start: 0,
                    "type": "Literal",
                    "value": "use asm",
                },
                "loc": {
                    end: {
                        column: 10,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                "type": "ExpressionStatement",
            },
            {
                "directive": "use strict",
                end: 24,
                "expression": {
                    end: 24,
                    "loc": {
                        end: {
                            column: 12,
                            line: 2,
                        },
                        start: {
                            column: 0,
                            line: 2,
                        }
                    },
                    "raw": "\"use strict\"",
                    start: 12,
                    "type": "Literal",
                    "value": "use strict",
                },
                "loc": {
                    end: {
                        column: 12,
                        line: 2,
                    },
                    start: {
                        column: 0,
                        line: 2,
                    }
                },
                start: 12,
                "type": "ExpressionStatement",
            }
        ],
        end: 24,
        "loc": {
            end: {
                column: 12,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('parse a single "random\\u{0} foo"', '"random\\u{0} foo"', {
        "body": [{
            "directive": "random\\u{0} foo",
            end: 17,
            "expression": {
                end: 17,
                "loc": {
                    end: {
                        column: 17,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                "raw": "\"random\\u{0} foo\"",
                start: 0,
                "type": "Literal",
                "value": "random\u0000 foo",
            },
            "loc": {
                end: {
                    column: 17,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            start: 0,
            "type": "ExpressionStatement",
        }],
        end: 17,
        "loc": {
            end: {
                column: 17,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        "sourceType": "script",
        start: 0,
        "type": "Program",
    });

    pass('scan a single "sloppy\\012escape"', '"sloppy\\012escape"', {
        "body": [{
            "directive": "sloppy\\012escape",
            end: 18,
            "expression": {
                end: 18,
                "loc": {
                    end: {
                        column: 18,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                "raw": "\"sloppy\\012escape\"",
                start: 0,
                "type": "Literal",
                "value": "sloppy\nescape",
            },
            "loc": {
                end: {
                    column: 18,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            start: 0,
            "type": "ExpressionStatement",
        }, ],
        end: 18,
        "loc": {
            end: {
                column: 18,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        "sourceType": "script",
        start: 0,
        "type": "Program"
    });

    pass('parse a "random\\u{a} foo"', '"random\\u{a} foo"', {
        "body": [{
            "directive": "random\\u{a} foo",
            end: 17,
            "expression": {
                end: 17,
                "loc": {
                    end: {
                        column: 17,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                "raw": "\"random\\u{a} foo\"",
                start: 0,
                "type": "Literal",
                "value": "random\n foo",
            },
            "loc": {
                end: {
                    column: 17,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            start: 0,
            "type": "ExpressionStatement",
        }],
        end: 17,
        "loc": {
            end: {
                column: 17,
                line: 1,
            },
            start: {
                column: 0,
                line: 1,
            }
        },
        "sourceType": "script",
        start: 0,
        "type": "Program"
    });
});
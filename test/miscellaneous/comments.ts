import { pass, fail } from '../test-utils';

describe('Miscellaneous - Comments', () => {

    fail(`;-->`, {
        source: `;-->`,
        message:  'Unexpected token',
        line: 1,
        column: 3,
        index: 3,
    });

    fail(`single and multi line comments used together`, {
        source: `// var /*
        x*/`,
        message: 'Unterminated regular expression literal -- a / was expected',
        line: 2,
        column: 10,
        index: 20,
    });

    fail(`html comment`, {
        source: `<!-`,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0,
    });

    fail(`html comment + jsx`, {
      source: `</`,
      message: 'Unexpected token',
      jsx: true,
      line: 1,
      column: 0,
      index: 0,
  });

    fail(`MultiLineComment inside jsx opening tag`, {
    source: `</*`,
    message: 'Unterminated MultiLineComment',
    jsx: true,
    line: 1,
    column: 0,
    index: 0,
});

    fail(`single line comment inside jsx opening tag`, {
  source: `<// single`,
  message: 'Unexpected token',
  jsx: true,
  line: 1,
  column: 0,
  index: 0,
});

    fail(`jsx + html comment`, {
    source: `</`,
    message: 'Unexpected token',
    line: 1,
    column: 0,
    index: 0,
});

    fail(`single and multi line comments used together`, {
    source: `<*`,
    message: 'Unexpected token',
    jsx: true,
    line: 1,
    column: 0,
    index: 0,
});

    fail(`single and multi line comments used together`, {
      source: `<!-`,
      message: 'Unexpected token',
      jsx: true,
      line: 1,
      column: 0,
      index: 0,
  });

    fail(`single and multi line comments used together`, {
        source: `<!`,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0,
    });

    fail(`single and multi line comments used together`, {
        source: `// var /*
        x*/`
    });

    fail(`nested multi line comments`, {
        source: `/* x */
        = 1;
        */`,
        message:  'Unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
        message: 'Unexpected token identifier',
        line: 2,
        column: 14,
        index: 17
    });

    fail(`/*FOO/`, {
        source: `/*FOO/`,
        message: 'Unterminated MultiLineComment',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`multiline comment at the end of single line comment`, {
        source: `// var /*
        x*/`,
        message: 'Unterminated regular expression literal -- a / was expected',
        line: 2,
        column: 10,
        index: 20
    });

    fail(`<!-- HTML comment`, {
        source: `<!-- HTML comment`,
        module: true,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail(`arbitrary character sequence before HTMLCloseComment token`, {
        source: `/*
        */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    });

    fail('"use strict"', {
        source: 'x --> is eol-comment\nvar y = b;\n',
        line: 1,
        index: 8,
        column: 8,
    });

    fail('x/* precomment */ --> is eol-comment\nvar y = 37;\n', {
        source: 'x/* precomment */ --> is eol-comment\nvar y = 37;\n',
        line: 1,
        index: 24,
        column: 24,
    });

    fail('var x = a; --> is eol-comment\nvar y = b;\n', {
        source: 'var x = a; --> is eol-comment\nvar y = b;\n',
        line: 1,
        index: 13,
        column: 13,
    });

    pass(`(/* comment */{
      /* comment 2 */
      p1: null
  })`, {
  source: `(/* comment */{
    /* comment 2 */
    p1: null
})`,
  raw: true,
  expected: {
     body: [
        {
          expression: {
            properties: [
              {
                computed: false,
                key: {
                  name: 'p1',
                  type: 'Identifier'
                },
               kind: 'init',
                method: false,
                shorthand: false,
                type: 'Property',
                value: {
                  raw: 'null',
                  type: 'Literal',
                  value: null,
                },
              }
            ],
            type: 'ObjectExpression'
          },
         type: 'ExpressionStatement'
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
});

    pass('/* not comment*/; i-->0', {
      source: '/* not comment*/; i-->0',
      loc: true,
      ranges: true,
      expected: {
          body: [
            {
              end: 17,
              loc: {
                end: {
                  column: 17,
                  line: 1,
                },
                start: {
                  column: 16,
                  line: 1,
                }
              },
              start: 16,
              type: 'EmptyStatement'
            },
            {
              end: 23,
              expression: {
                end: 23,
                left: {
                  argument: {
                    end: 19,
                    loc: {
                      end: {
                        column: 19,
                        line: 1,
                      },
                      start: {
                        column: 18,
                        line: 1,
                      }
                    },
                    name: 'i',
                    start: 18,
                    type: 'Identifier'
                 },
                  end: 21,
                  loc: {
                    end: {
                      column: 21,
                      line: 1,
                    },
                    start: {
                      column: 18,
                      line: 1,
                    }
                  },
                  operator: '--',
                  prefix: false,
                  start: 18,
                  type: 'UpdateExpression'
                },
                loc: {
                  end: {
                   column: 23,
                    line: 1,
                  },
                  start: {
                    column: 18,
                    line: 1,
                  }
                },
                operator: '>',
                right: {
                  end: 23,
                  loc: {
                   end: {
                      column: 23,
                      line: 1,
                    },
                    start: {
                      column: 22,
                      line: 1,
                    },
                  },
                  start: 22,
                  type: 'Literal',
                 value: 0,
                },
                start: 18,
                type: 'BinaryExpression'
              },
              loc: {
                end: {
                  column: 23,
                  line: 1,
                },
                start: {
                  column: 18,
                  line: 1,
                }
              },
              start: 18,
              type: 'ExpressionStatement'
            }
          ],
          end: 23,
         loc: {
            end: {
              column: 23,
              line: 1,
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

    pass('var x = 1<!--foo', {
      source: 'var x = 1<!--foo',
      loc: true,
      ranges: true,
      expected: {
          body: [
            {
              declarations: [
                {
                  end: 9,
                 id: {
                    end: 5,
                    loc: {
                      end: {
                        column: 5,
                        line: 1,
                      },
                      start: {
                       column: 4,
                      line: 1,
                      }
                   },
                    name: 'x',
                    start: 4,
                    type: 'Identifier',
                 },
                  init: {
                    end: 9,
                   loc: {
                      end: {
                        column: 9,
                        line: 1,
                     },
                     start: {
                        column: 8,
                      line: 1,
                      }
                    },
                    start: 8,
                    type: 'Literal',
                    value: 1,
                  },
                  loc: {
                    end: {
                      column: 9,
                      line: 1
                    },
                    start: {
                      column: 4,
                      line: 1,
                    }
                  },
                  start: 4,
                  type: 'VariableDeclarator'
                }
              ],
              end: 9,
              kind: 'var',
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
              start: 0,
              type: 'VariableDeclaration'
            }
          ],
          end: 16,
          loc: {
            end: {
              column: 16,
              line: 1,
            },
           start: {
              column: 0,
              line: 1,
            }
          },
          sourceType: 'script',
          start: 0,
          type: 'Program',
        }
    });

    pass(' \t /* block comment */  --> comment', {
        source: ' \t /* block comment */  --> comment',
        loc: true,
        ranges: true,
        expected: {
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
               }
              },
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass('0/*\n*/--> a comment', {
        source: '0/*\n*/--> a comment',
        loc: true,
        ranges: true,
        expected: {
              body: [
                {
                  end: 1,
                  expression: {
                    end: 1,
                    loc: {
                      end: {
                        column: 1,
                        line: 1
                     },
                      start: {
                        column: 0,
                        line: 1,
                      }
                    },
                    start: 0,
                    type: 'Literal',
                    value: 0,
                  },
                  loc: {
                    end: {
                      column: 1,
                      line: 1,
                    },
                   start: {
                      column: 0,
                      line: 1,
                    }
                  },
                  start: 0,
                  type: 'ExpressionStatement'
                }
              ],
              end: 19,
              loc: {
                end: {
                  column: 15,
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

    pass('"use strict"', {
        source: '-->',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [],
            sourceType: 'script',
            start: 0,
            end: 3,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 3
                }
            }
        }
    });

    pass('--> is eol-comment', {
        source: '--> is eol-comment',
        loc: true,
        ranges: true,
        expected: {
            body: [],
            end: 18,
            loc: {
                end: {
                    column: 18,
                    line: 1,
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

    pass('--> is eol-comment\nvar y = abc;\n', {
        source: '--> is eol-comment\nvar y = abc;\n',
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'y',
                        type: 'Identifier'
                    },
                    init: {
                        name: 'abc',
                        type: 'Identifier'
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass('\n/*precomment*/-->eol-comment\nvar y = a;\n', {
        source: '\n/*precomment*/-->eol-comment\nvar y = a;\n',
        expected: {
              body: [
                {
                  declarations: [
                    {
                      id: {
                        name: 'y',
                        type: 'Identifier'
                      },
                      init: {
                        name: 'a',
                        type: 'Identifier'
                      },
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass('var x = a;/*\n*/-->is eol-comment\nvar y = b;\n', {
        source: 'var x = a;/*\n*/-->is eol-comment\nvar y = b;\n',
        expected: {
              body: [
                {
                 declarations: [
                    {
                      id: {
                        name: 'x',
                        type: 'Identifier'
                      },
                      init: {
                        name: 'a',
                        type: 'Identifier'
                      },
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                },
                {
                  declarations: [
                    {
                      id: {
                        name: 'y',
                        type: 'Identifier'
                      },
                      init: {
                        name: 'b',
                        type: 'Identifier'
                      },
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`//"𠮷"
    /*"𠮷"*/a;
`, {
        source: `//"𠮷"
        /*"𠮷"*/a;
    `,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
              body: [
                {
                 end: 25,
                  expression: {
                    end: 24,
                    loc: {
                      end: {
                        column: 17,
                        line: 2,
                      },
                      start: {
                        column: 16,
                        line: 2,
                      }
                    },
                    name: 'a',
                    start: 23,
                    type: 'Identifier'
                  },
                  loc: {
                   end: {
                      column: 18,
                      line: 2,
                    },
                    start: {
                      column: 16,
                      line: 2,
                    }
                  },
                  start: 23,
                  type: 'ExpressionStatement'
                }
              ],
              end: 30,
              loc: {
               end: {
                  column: 4,
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

    pass(`/**/ --> comment\n`, {
      source: `/**/ --> comment\n`,
      comments: true,
      expected: {
          body: [],
          comments: [
            {
              end: 4,
              start: 0,
              type: 'MultiLine',
              value: ''
            },
            {
              end: 17,
              start: 5,
              type: 'HTMLClose',
              value: ' comment\n',
            },
         ],
          sourceType: 'script',
          type: 'Program'
        }
    });

    pass(`foo <!--bar`, {
        source: `foo <!--bar`,
        ranges: true,
        comments: true,
        raw: true,
        expected: {
            body: [
              {
                end: 3,
                expression: {
                  end: 3,
                  name: 'foo',
                  start: 0,
                  type: 'Identifier'
                },
                start: 0,
                type: 'ExpressionStatement'
              }
            ],
            comments: [
             {
                end: 11,
                start: 4,
                type: 'HTMLOpen',
                value: 'bar'
              },
            ],
            end: 11,
            sourceType: 'script',
            start: 0,
            type: 'Program'
          }
  });

    pass(`/* assignmenr */
  a = b`, {
    source: `/* assignmenr */
    a = b`,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [
          {
            expression: {
              left: {
                name: 'a',
                type: 'Identifier'
              },
              operator: '=',
              right: {
                name: 'b',
                type: 'Identifier'
              },
              type: 'AssignmentExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        comments: [
          {
            end: 16,
            start: 0,
            type: 'MultiLine',
            value: ' assignmenr '
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
  });

    pass(`42 /* the * answer */`, {
    source: `42 /* the * answer */`,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [
          {
            expression: {
              raw: '42',
              type: 'Literal',
              value: 42,
            },
            type: 'ExpressionStatement'
          }
        ],
        comments: [
          {
            end: 21,
            start: 3,
            type: 'MultiLine',
            value: ' the * answer '
         }
        ],
        sourceType: 'module',
        type: 'Program'
      }
  });

    pass(`// Hello, world!`, {
    source: `// Hello, world!`,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [],
        comments: [
          {
            end: 16,
            start: 0,
            type: 'SingleLine',
            value: ' Hello, world!'
         },
        ],
        sourceType: 'module',
        type: 'Program'
      }
  });

    pass(`if (x) { doThat() // Some comment
  }`, {
    source: `if (x) { doThat() // Some comment
    }`,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [
          {
            alternate: null,
            consequent: {
             body: [
                {
                  expression: {
                    arguments: [],
                    callee: {
                      name: 'doThat',
                      type: 'Identifier'
                    },
                    type: 'CallExpression'
                },
                  type: 'ExpressionStatement',
                },
              ],
              type: 'BlockStatement'
            },
            test: {
              name: 'x',
              type: 'Identifier',
            },
            type: 'IfStatement'
         }
        ],

        comments: [
         {
            end: 34,
            start: 18,
            type: 'SingleLine',
            value: ' Some comment\n'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
  });

    pass(`function f() { /* infinite */ while (true) { } /* bar */ var each; }`, {
    source: `function f() { /* infinite */ while (true) { } /* bar */ var each; }`,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                 body: {
                    body: [],
                    type: 'BlockStatement'
                  },
                  test: {
                    raw: 'true',
                    type: 'Literal',
                    value: true
                  },
                  type: 'WhileStatement'
                },
                {
                  declarations: [
                    {
                      id: {
                        name: 'each',
                       type: 'Identifier',
                      },
                      init: null,
                      type: 'VariableDeclarator'
                    },
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                },
              ],
              type: 'BlockStatement',
            },
            expression: false,
            generator: false,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [],
           type: 'FunctionDeclaration'
          },
        ],
        comments: [
          {
            end: 29,
            start: 15,
            type: 'MultiLine',
            value: ' infinite ',
          },
          {
            end: 56,
            start: 47,
            type: 'MultiLine',
            value: ' bar ',
         },
        ],
        sourceType: 'module',
        type: 'Program'
      }
  });

    pass(`o_po // foo`, {
    source: `o_po // foo`,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [
          {
            expression: {
              name: 'o_po',
              type: 'Identifier'
            },
           type: 'ExpressionStatement'
          }
       ],
        comments: [
          {
            end: 11,
            start: 5,
            type: 'SingleLine',
            value: ' foo',
          },
        ],
        sourceType: 'module',
        type: 'Program'
      }
  });

    pass(`function a() {
    // foo
  }`, {
    source: `function a() {
      // foo
    }`,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [
          {
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },
            expression: false,
            generator: false,
            id: {
              name: 'a',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          }
        ],
        comments: [
              {
                end: 28,
                start: 21,
                type: 'SingleLine',
                value: ' foo\n'
              }
            ],
       sourceType: 'module',
        type: 'Program'
      }
  });

    pass(`foo <!--bar`, {
    source: `foo <!--bar`,
    ranges: true,
    comments: true,
    module: true,
    raw: true,
    expected: {
        body: [
          {
            end: 11,
            expression: {
              end: 11,
              left: {
                end: 3,
                name: 'foo',
                start: 0,
               type: 'Identifier'
              },
              operator: '<',
              right: {
                argument: {
                  argument: {
                   end: 11,
                    name: 'bar',
                    start: 8,
                    type: 'Identifier'
                  },
                  end: 11,
                  operator: '--',
                  prefix: true,
                  start: 6,
                  type: 'UpdateExpression'
                },
                end: 11,
                operator: '!',
               prefix: true,
                start: 5,
                type: 'UnaryExpression'
              },
              start: 0,
              type: 'BinaryExpression'
            },
            start: 0,
            type: 'ExpressionStatement'
          }
       ],
        comments: [],
       end: 11,
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
});

    pass(`function x(){ /*Jupiter*/ return; /*Saturn*/}`, {
  source: `function x(){ /*Jupiter*/ return; /*Saturn*/}`,
  ranges: true,
  comments: true,
  raw: true,
  expected: {
      body: [
        {
          async: false,
          body: {
            body: [
              {
                argument: null,
                end: 33,
                start: 26,
                type: 'ReturnStatement'
              }
            ],
           end: 45,
            start: 12,
            type: 'BlockStatement',
          },
          end: 45,
          expression: false,
          generator: false,
          id: {
            end: 10,
            name: 'x',
            start: 9,
            type: 'Identifier'
          },
          params: [],
          start: 0,
          type: 'FunctionDeclaration'
        },
      ],
      comments: [
        {
          end: 25,
          start: 14,
          type: 'MultiLine',
          value: 'Jupiter',
        },
        {
          end: 44,
          start: 34,
          type: 'MultiLine',
          value: 'Saturn',
        },
     ],
      end: 45,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    }
});

    pass(`/* block comment */--> comment`, {
  source: `/* block comment */--> comment`,
  ranges: true,
  comments: true,
  raw: true,
  expected: {
      body: [],
     comments: [
        {
          end: 19,
          start: 0,
          type: 'MultiLine',
          value: ' block comment '
        },
        {
          end: 30,
          start: 19,
          type: 'HTMLClose',
          value: ' comment',
        }
      ],
      end: 30,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    }
});

    pass(`var a; // a`, {
        source: `var a; // a`,
        ranges: true,
        comments: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 11,
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 6,
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 4,
                    end: 5,
                    id: {
                      type: 'Identifier',
                      start: 4,
                      end: 5,
                      name: 'a'
                    },
                    init: null
                  }
                ],
                kind: 'var'
              }
            ],
            sourceType: 'script',
            comments: [
              {
                type: 'SingleLine',
                value: ' a',
                start: 7,
                end: 11,
              }
            ]
          }
    });

    pass(`/**/42`, {
      source: '/**/42',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
          type: 'Program',
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
              type: 'ExpressionStatement',
              start: 4,
              end: 6,
              loc: {
                  start: {
                      line: 1,
                      column: 4
                  },
                  end: {
                      line: 1,
                      column: 6
                  }
              },
              expression: {
                  type: 'Literal',
                  start: 4,
                  end: 6,
                  loc: {
                      start: {
                          line: 1,
                          column: 4
                      },
                      end: {
                          line: 1,
                          column: 6
                      }
                  },
                  value: 42,
                  raw: '42'
              }
          }],
          sourceType: 'script'
      }
  });

    pass(`function x(){ /*foo*/ return; /*bar*/}`, {
    source: 'function x(){ /*foo*/ return; /*bar*/}',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 38
              }
            },
            id: {
              type: 'Identifier',
              start: 9,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 10
                }
              },
              name: 'x'
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 12,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 38
                }
              },
              body: [
                {
                  type: 'ReturnStatement',
                  start: 22,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  },
                  argument: null
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
});

    pass(`0 /*The*/ /*Answer*/`, {
    source: '0 /*The*/ /*Answer*/',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        start: 0,
        end: 20,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 20
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'Literal',
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
              },
              value: 0,
              raw: '0'
            }
          }
        ],
        sourceType: 'script'
      }
});

    pass(`if (x) { // Some comment\ndoThat(); }`, {
    source: 'if (x) { // Some comment\ndoThat(); }',
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        body: [{
            alternate: null,
            consequent: {
                body: [{
                    end: 34,
                    expression: {
                        arguments: [],
                        callee: {
                            end: 31,
                            loc: {
                                end: {
                                    column: 6,
                                    line: 2,
                                },
                                start: {
                                    column: 0,
                                    line: 2,
                                }
                            },
                            name: 'doThat',
                            start: 25,
                            type: 'Identifier',
                        },
                        end: 33,
                        loc: {
                            end: {
                                column: 8,
                                line: 2,
                            },
                            start: {
                                column: 0,
                                line: 2,
                            }
                        },
                        start: 25,
                        type: 'CallExpression',
                    },
                    loc: {
                        end: {
                            column: 9,
                            line: 2,
                        },
                        start: {
                            column: 0,
                            line: 2,
                        },
                    },
                    start: 25,
                    type: 'ExpressionStatement'
                }, ],
                end: 36,
                loc: {
                    end: {
                        column: 11,
                        line: 2,
                    },
                    start: {
                        column: 7,
                        line: 1,
                    },
                },
                start: 7,
                type: 'BlockStatement',
            },
            end: 36,
            loc: {
                end: {
                    column: 11,
                    line: 2,
                },
                start: {
                    column: 0,
                    line: 1,
                }
            },
            start: 0,
            test: {
                end: 5,
                loc: {
                    end: {
                        column: 5,
                        line: 1,
                    },
                    start: {
                        column: 4,
                        line: 1,
                    },
                },
                name: 'x',
                start: 4,
                type: 'Identifier',
            },
            type: 'IfStatement'
        }],
        end: 36,
        loc: {
            end: {
                column: 11,
                line: 2,
            },
            start: {
                column: 0,
                line: 1,
            },
        },
        sourceType: 'script',
        start: 0,
        type: 'Program',
    }
});

    pass(`/**/ function a() {/**/function o() {}}`, {
  source: '/**/ function a() {/**/function o() {}}',
  loc: true,
  ranges: true,
  raw: true,
  expected: {
      type: 'Program',
      start: 0,
      end: 39,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 39
        }
      },
      body: [
        {
          type: 'FunctionDeclaration',
          start: 5,
          end: 39,
          loc: {
            start: {
              line: 1,
              column: 5
            },
            end: {
              line: 1,
              column: 39
            }
          },
          id: {
            type: 'Identifier',
            start: 14,
            end: 15,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 15
              }
            },
            name: 'a'
          },
          generator: false,
          expression: false,
          async: false,
          params: [],
          body: {
            type: 'BlockStatement',
            start: 18,
            end: 39,
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 39
              }
            },
            body: [
              {
                type: 'FunctionDeclaration',
                start: 23,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 32,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 32
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  },
                  name: 'o'
                },
                generator: false,
                expression: false,
                async: false,
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 36,
                  end: 38,
                  loc: {
                    start: {
                      line: 1,
                      column: 36
                    },
                    end: {
                      line: 1,
                      column: 38
                    }
                  },
                  body: []
                }
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
});

    pass(`var a; // a`, {
  source: `var a; // a`,
  ranges: true,
  comments: true,
  raw: true,
  expected: {
      body: [
        {
          declarations: [
            {
              end: 5,
              id: {
                end: 5,
               name: 'a',
                start: 4,
                type: 'Identifier',
             },
              init: null,
              start: 4,
              type: 'VariableDeclarator'
            },
          ],
          end: 6,
          kind: 'var',
          start: 0,
          type: 'VariableDeclaration'
        },
      ],
      comments: [
       {
          end: 11,
          start: 7,
          type: 'SingleLine',
          value: ' a',
        }
      ],
      end: 11,
      sourceType: 'script',
      start: 0,
      type: 'Program'
    }
});

    pass('var x = 42;/*\n*/-->is eol-comment\nvar y = 37;\n', {
  source: 'var x = 42;/*\n*/-->is eol-comment\nvar y = 37;\n',
  comments: true,
  expected: {
      body: [
        {
          declarations: [
            {
              id: {
                name: 'x',
                type: 'Identifier'
              },
              init: {
                type: 'Literal',
                value: 42,
              },
              type: 'VariableDeclarator'
            }
          ],
          kind: 'var',
          type: 'VariableDeclaration'
        },
        {
          declarations: [
            {
              id: {
               name: 'y',
                type: 'Identifier',
              },
              init: {
                type: 'Literal',
                value: 37,
              },
              type: 'VariableDeclarator'
            }
          ],
          kind: 'var',
          type: 'VariableDeclaration'
        }
      ],
      comments: [
        {
          end: 16,
          start: 11,
          type: 'MultiLine',
          value: '\n',
        },
        {
          end: 34,
          start: 16,
          type: 'HTMLClose',
          value: 'is eol-comment\n',
        }
     ],
      sourceType: 'script',
      type: 'Program'
    }
});

    pass('/* MLC1 \n */ /* SLDC1 */ /* MLC2 \n */ /* SLDC2 */ --> is eol-comment\n', {
  source: '/* MLC1 \n */ /* SLDC1 */ /* MLC2 \n */ /* SLDC2 */ --> is eol-comment\n',
  comments: true,
  expected: {
      body: [],
      comments: [
        {
          end: 12,
          start: 0,
          type: 'MultiLine',
          value: ' MLC1 \n ',
        },
        {
          end: 24,
          start: 13,
         type: 'MultiLine',
          value: ' SLDC1 ',
        },
        {
          end: 37,
          start: 25,
          type: 'MultiLine',
          value: ' MLC2 \n ',
        },
        {
          end: 49,
          start: 38,
          type: 'MultiLine',
          value: ' SLDC2 ',
        },
       {
          end: 69,
          start: 50,
          type: 'HTMLClose',
          value: ' is eol-comment\n',
        }
      ],
     sourceType: 'script',
      type: 'Program',
    }
});

});
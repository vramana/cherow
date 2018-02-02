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
        message: 'Unexpected token',
        line: 2,
        column: 10,
        index: 20,
    });

    fail(`single and multi line comments used together`, {
        source: `<!-`,
        message:  'Unexpected token',
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
        message:  'Unexpected token',
        line: 2,
        column: 14,
        index: 17
    });

    fail(`/*FOO/`, {
        source: `/*FOO/`,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 0
    });

    fail(`multiline comment at the end of single line comment`, {
        source: `// var /*
        x*/`,
        message: 'Unexpected token',
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
                end: 4,
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

    pass(`/* block comment */--> comment`, {
  source: `/* block comment */--> comment`,
  ranges: true,
  comments: true,
  raw: true,
  expected: {
      body: [],
     comments: [
        {
          end: 0,
          start: 0,
          type: 'MultiLine',
          value: ' block comment '
        },
        {
          end: 19,
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
                end: 7,
              }
            ]
          }
    });
});
import { pass, fail } from '../utils';

describe('Miscellaneous - Comment array on top-level', () => {

    pass(`fn(a, b, /* comment */);`, {
        source: `fn(a, b, /* comment */);`,
        ranges: true,
        loc: true,
        comments: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'fn',
                            start: 0,
                            end: 2,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            }
                        },
                        arguments: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                start: 3,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            {
                                type: 'Identifier',
                                name: 'b',
                                start: 6,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 6
                                    },
                                    end: {
                                        line: 1,
                                        column: 7
                                    }
                                },
                                trailingComments: [
                                    {
                                        type: 'Block',
                                        value: ' comment ',
                                        start: 9,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 9
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    }
                                ]
                            }
                        ],
                        start: 0,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 24,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 24
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 24,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 24
                }
            },
            comments: [
                {
                    type: 'Block',
                    value: ' comment ',
                    start: 9,
                    end: 22,
                    loc: {
                        start: {
                            line: 1,
                            column: 9
                        },
                        end: {
                            line: 1,
                            column: 22
                        }
                    }
                }
            ]
        }
    });

    pass(`<!-- HTML comment`, {
        source: `<!-- HTML comment`,
        ranges: true,
        loc: true,
        comments: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [],
            sourceType: 'script',
            start: 0,
            end: 17,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 17
                }
            },
            comments: [
                {
                    type: 'Line',
                    value: ' HTML comment',
                    start: 0,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                }
            ]
        }
    });

    pass(`//"𠮷"
    /*"𠮷"*/a;
`, {
        source: `//"𠮷"
        /*"𠮷"*/a;
    `,
        ranges: true,
        comments: true,
        raw: true,
        expected: {
              body: [
                {
                  end: 25,
                  expression: {
                    end: 24,
                    name: 'a',
                    start: 23,
                    type: 'Identifier'
                  },
                  start: 23,
                 type: 'ExpressionStatement'
                }
              ],
              comments: [
               {
                  end: 6,
                  start: 0,
                  type: 'Line',
                  value: '"𠮷"',
                },
                {
                  end: 23,
                  start: 15,
                  type: 'Block',
                  value: '"𠮷"',
                }
              ],
              end: 30,
              sourceType: 'script',
              start: 0,
              type: 'Program'
            }
    });

    pass(`42 /*The*/ /*Answer*/`, {
        source: `42 /*The*/ /*Answer*/`,
        ranges: true,
        comments: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 21,
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 2,
                expression: {
                  type: 'Literal',
                  start: 0,
                  end: 2,
                  value: 42,
                  raw: '42'
                }
              }
            ],
            sourceType: 'script',
            comments: [
              {
                type: 'Block',
                value: 'The',
                start: 3,
                end: 10,
              },
              {
                type: 'Block',
                value: 'Answer',
                start: 11,
                end: 21,
              }
            ]
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
            type: 'Line',
            value: ' a',
            start: 7,
            end: 11,
          }
        ]
      }
});

});
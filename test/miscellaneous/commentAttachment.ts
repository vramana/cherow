import { pass, fail } from '../utils';
import * as t from 'assert';
import { parseScript, parseModule } from '../../src/cherow';

describe('Miscellaneous - Comment attachment', () => {

    pass(`empty source`, {
        source: ``,
        raw: true,
        comments: [],
        attachComment: true,
        expected: {
              body: [],
              end: 0,
              start: 0,
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`empty source with line comment`, {
        source: `// foo`,
        raw: true,
        comments: [],
        attachComment: true,
        expected: {
              body: [],
              end: 6,
              start: 0,
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`empty source with block comment`, {
        source: `/* foo */`,
        raw: true,
        comments: [],
        attachComment: true,
        expected: {
              body: [],
              end: 9,
              start: 0,
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`object comments`, {
        source: `var test = {
            /**
             * Test 2
             */
            a:'1',
            /*
             * Test 1
             */
            b:'2',
            // Test 3
            c:'3'
        };`,
        raw: true,
        ranges: true,
        comments: [],
        attachComment: true,
        expected: {
          type: 'Program',
          start: 0,
          end: 208,
          body: [
            {
              type: 'VariableDeclaration',
              start: 0,
              end: 208,
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 4,
                  end: 207,
                  id: {
                    type: 'Identifier',
                    start: 4,
                    end: 8,
                    name: 'test'
                  },
                  init: {
                    type: 'ObjectExpression',
                    start: 11,
                    end: 207,
                    properties: [
                      {
                        type: 'Property',
                        start: 79,
                        end: 84,
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 79,
                          end: 80,
                          name: 'a'
                        },
                        value: {
                          type: 'Literal',
                          start: 81,
                          end: 84,
                          value: '1',
                          raw: '\'1\''
                        },
                        kind: 'init',
                        leadingComments: [
                          {
                            type: 'Block',
                            value: '*\n             * Test 2\n             ',
                            start: 25,
                            end: 66,
                          }
                        ]
                      },
                      {
                        type: 'Property',
                        start: 151,
                        end: 156,
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 151,
                          end: 152,
                          name: 'b'
                        },
                        value: {
                          type: 'Literal',
                          start: 153,
                          end: 156,
                          value: '2',
                          raw: '\'2\''
                        },
                        kind: 'init',
                        leadingComments: [
                          {
                            type: 'Block',
                            value: '\n             * Test 1\n             ',
                            start: 98,
                            end: 138,
                          }
                        ]
                      },
                      {
                        type: 'Property',
                        start: 192,
                        end: 197,
                        method: false,
                        shorthand: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
                          start: 192,
                          end: 193,
                          name: 'c'
                        },
                        value: {
                          type: 'Literal',
                          start: 194,
                          end: 197,
                          value: '3',
                          raw: '\'3\''
                        },
                        kind: 'init',
                        leadingComments: [
                          {
                            type: 'Line',
                            value: ' Test 3',
                            start: 170,
                            end: 179,
                          }
                        ]
                      }
                    ]
                  }
                }
              ],
              kind: 'var'
            }
          ],
          sourceType: 'script',
        }
    });

    pass(`if block line comment`, {
      source: `if (cond)
      // Leading to if-block
  {
      print('hello');
  }    // Trailing to if-block`,
      raw: true,
      comments: [],
      attachComment: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'IfStatement',
                test: {
                    type: 'Identifier',
                    name: 'cond',
                    start: 4,
                    end: 8
                },
                alternate: null,
                consequent: {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'print',
                                    start: 49,
                                    end: 54
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: 'hello',
                                        start: 55,
                                        end: 62,
                                        raw: '\'hello\''
                                    }
                                ],
                                start: 49,
                                end: 63
                            },
                            start: 49,
                            end: 64
                        }
                    ],
                    start: 41,
                    end: 68,
                    leadingComments: [
                        {
                            type: 'Line',
                            value: ' Leading to if-block',
                            start: 16,
                            end: 38
                        }
                    ]
                },
                start: 0,
                end: 68,
                trailingComments: [
                    {
                        type: 'Line',
                        value: ' Trailing to if-block',
                        start: 72,
                        end: 95
                    }
                ]
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 95
    }
  });

    pass(`simple multi comment`, {
    source: `function test() {
        /*
         * Leading comment
         */

        /*
         *
         * Leading comment 2
         *
         */

        var i = 20;
        /*
         * Trailing comment
         */

        /*
         *
         * Trailing comment 2
         *
         */
    }`,
    raw: true,
    loc: true,
    comments: [],
    attachComment: true,
    expected: {
      type: 'Program',
      body: [
          {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                  type: 'BlockStatement',
                  body: [
                      {
                          type: 'VariableDeclaration',
                          declarations: [
                              {
                                  type: 'VariableDeclarator',
                                  init: {
                                      type: 'Literal',
                                      value: 20,
                                      start: 160,
                                      end: 162,
                                      loc: {
                                          start: {
                                              line: 12,
                                              column: 16
                                          },
                                          end: {
                                              line: 12,
                                              column: 18
                                          }
                                      },
                                      raw: '20'
                                  },
                                  id: {
                                      type: 'Identifier',
                                      name: 'i',
                                      start: 156,
                                      end: 157,
                                      loc: {
                                          start: {
                                              line: 12,
                                              column: 12
                                          },
                                          end: {
                                              line: 12,
                                              column: 13
                                          }
                                      }
                                  },
                                  start: 156,
                                  end: 162,
                                  loc: {
                                      start: {
                                          line: 12,
                                          column: 12
                                      },
                                      end: {
                                          line: 12,
                                          column: 18
                                      }
                                  }
                              }
                          ],
                          kind: 'var',
                          start: 152,
                          end: 163,
                          loc: {
                              start: {
                                  line: 12,
                                  column: 8
                              },
                              end: {
                                  line: 12,
                                  column: 19
                              }
                          },
                          leadingComments: [
                              {
                                  type: 'Block',
                                  value: '\n         * Leading comment\n         ',
                                  start: 26,
                                  end: 67,
                                  loc: {
                                      start: {
                                          line: 2,
                                          column: 8
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  }
                              },
                              {
                                  type: 'Block',
                                  value: '\n         *\n         * Leading comment 2\n         *\n         ',
                                  start: 77,
                                  end: 142,
                                  loc: {
                                      start: {
                                          line: 6,
                                          column: 8
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  }
                              }
                          ],
                          trailingComments: [
                              {
                                  type: 'Block',
                                  value: '\n         * Trailing comment\n         ',
                                  start: 172,
                                  end: 214,
                                  loc: {
                                      start: {
                                          line: 13,
                                          column: 8
                                      },
                                      end: {
                                          line: 12,
                                          column: 11
                                      }
                                  }
                              },
                              {
                                  type: 'Block',
                                  value: '\n         *\n         * Trailing comment 2\n         *\n         ',
                                  start: 224,
                                  end: 290,
                                  loc: {
                                      start: {
                                          line: 17,
                                          column: 8
                                      },
                                      end: {
                                          line: 12,
                                          column: 11
                                      }
                                  }
                              }
                          ]
                      }
                  ],
                  start: 16,
                  end: 296,
                  loc: {
                      start: {
                          line: 1,
                          column: 16
                      },
                      end: {
                          line: 22,
                          column: 5
                      }
                  }
              },
              async: false,
              generator: false,
              expression: false,
              id: {
                  type: 'Identifier',
                  name: 'test',
                  start: 9,
                  end: 13,
                  loc: {
                      start: {
                          line: 1,
                          column: 9
                      },
                      end: {
                          line: 1,
                          column: 13
                      }
                  }
              },
              start: 0,
              end: 296,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 22,
                      column: 5
                  }
              }
          }
      ],
      sourceType: 'script',
      start: 0,
      end: 296,
      loc: {
          start: {
              line: 1,
              column: 0
          },
          end: {
              line: 22,
              column: 5
          }
      }
  }
});

    pass(`simple statement comment`, {
    source: `;    // Trailing`,
    raw: true,
    comments: [],
    attachComment: true,
    expected: {
      type: 'Program',
      start: 0,
      end: 16,
      body: [
        {
          type: 'EmptyStatement',
          start: 0,
          end: 1,
          trailingComments: [
            {
              type: 'Line',
              value: ' Trailing',
              start: 5,
              end: 16,
            }
          ]
        }
      ],
      sourceType: 'script',
    }
});

    pass(`try block line comment`, {
  source: `try{}//
  finally{}

  try{}
  catch(e){}//
  finally{}

  {
  try{}
  catch(e){}//
  finally{}
  }`,
  raw: true,
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                start: 3,
                end: 5,
                trailingComments: [
                    {
                        type: 'Line',
                        value: '',
                        start: 5,
                        end: 7
                    }
                ]
            },
            handler: null,
            finalizer: {
                type: 'BlockStatement',
                body: [],
                start: 17,
                end: 19,
                leadingComments: [
                    {
                        type: 'Line',
                        value: '',
                        start: 5,
                        end: 7
                    }
                ]
            },
            start: 0,
            end: 19
        },
        {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                start: 26,
                end: 28
            },
            handler: {
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    start: 37,
                    end: 38
                },
                body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 39,
                    end: 41
                },
                start: 31,
                end: 41,
                trailingComments: [
                    {
                        type: 'Line',
                        value: '',
                        start: 41,
                        end: 43
                    }
                ]
            },
            finalizer: {
                type: 'BlockStatement',
                body: [],
                start: 53,
                end: 55,
                leadingComments: [
                    {
                        type: 'Line',
                        value: '',
                        start: 41,
                        end: 43
                    }
                ]
            },
            start: 23,
            end: 55
        },
        {
            type: 'BlockStatement',
            body: [
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [],
                        start: 66,
                        end: 68
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'e',
                            start: 77,
                            end: 78
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 79,
                            end: 81
                        },
                        start: 71,
                        end: 81,
                        trailingComments: [
                            {
                                type: 'Line',
                                value: '',
                                start: 81,
                                end: 83
                            }
                        ]
                    },
                    finalizer: {
                        type: 'BlockStatement',
                        body: [],
                        start: 93,
                        end: 95,
                        leadingComments: [
                            {
                                type: 'Line',
                                value: '',
                                start: 81,
                                end: 83
                            }
                        ]
                    },
                    start: 63,
                    end: 95
                }
            ],
            start: 59,
            end: 99
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 99
}
});

    pass(`try block line commment expected`, {
  source: `try {
  }    //
  finally {
  }
  try {
  } catch (e) {
  } finally {
  }
  {
      try {
      } catch (e) {
      } finally {
      }
  }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                start: 4,
                end: 9,
                trailingComments: [
                    {
                        type: 'Line',
                        value: '',
                        start: 13,
                        end: 15
                    }
                ]
            },
            handler: null,
            finalizer: {
                type: 'BlockStatement',
                body: [],
                start: 26,
                end: 31,
                leadingComments: [
                    {
                        type: 'Line',
                        value: '',
                        start: 13,
                        end: 15
                    }
                ]
            },
            start: 0,
            end: 31
        },
        {
            type: 'TryStatement',
            block: {
                type: 'BlockStatement',
                body: [],
                start: 38,
                end: 43
            },
            handler: {
                type: 'CatchClause',
                param: {
                    type: 'Identifier',
                    name: 'e',
                    start: 51,
                    end: 52
                },
                body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 54,
                    end: 59
                },
                start: 44,
                end: 59
            },
            finalizer: {
                type: 'BlockStatement',
                body: [],
                start: 68,
                end: 73
            },
            start: 34,
            end: 73
        },
        {
            type: 'BlockStatement',
            body: [
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [],
                        start: 88,
                        end: 97
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'e',
                            start: 105,
                            end: 106
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 108,
                            end: 117
                        },
                        start: 98,
                        end: 117
                    },
                    finalizer: {
                        type: 'BlockStatement',
                        body: [],
                        start: 126,
                        end: 135
                    },
                    start: 84,
                    end: 135
                }
            ],
            start: 76,
            end: 139
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 139
}
});

    pass(`computed property comment`, {
  source: `var test = {
      /**
       * Before bracket init
       */
      ['a']:'1',

      [/*
       * Inside bracket init
       */
      'b']:'2',

      ['c'
       /*
        * After bracket key
        */]:'3',

      // Before bracket, line comment
      [
          'd']:'4',

      [
          // Inside bracket, line comment
          'e']:'5',

      ['f'
        // After bracket, line comment
          ]:'6'
  };`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    init: {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'a',
                                    start: 69,
                                    end: 72,
                                    raw: '\'a\''
                                },
                                value: {
                                    type: 'Literal',
                                    value: '1',
                                    start: 74,
                                    end: 77,
                                    raw: '\'1\''
                                },
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 68,
                                end: 77,
                                leadingComments: [
                                    {
                                        type: 'Block',
                                        value: '*\n       * Before bracket init\n       ',
                                        start: 19,
                                        end: 61
                                    }
                                ]
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'b',
                                    start: 135,
                                    end: 138,
                                    leadingComments: [
                                        {
                                            type: 'Block',
                                            value: '\n       * Inside bracket init\n       ',
                                            start: 87,
                                            end: 128
                                        }
                                    ],
                                    raw: '\'b\''
                                },
                                value: {
                                    type: 'Literal',
                                    value: '2',
                                    start: 140,
                                    end: 143,
                                    raw: '\'2\''
                                },
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 86,
                                end: 143
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'c',
                                    start: 153,
                                    end: 156,
                                    trailingComments: [
                                        {
                                            type: 'Block',
                                            value: '\n        * After bracket key\n        ',
                                            start: 164,
                                            end: 205
                                        }
                                    ],
                                    raw: '\'c\''
                                },
                                value: {
                                    type: 'Literal',
                                    value: '3',
                                    start: 207,
                                    end: 210,
                                    leadingComments: [
                                        {
                                            type: 'Block',
                                            value: '\n        * After bracket key\n        ',
                                            start: 164,
                                            end: 205
                                        }
                                    ],
                                    raw: '\'3\''
                                },
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 152,
                                end: 210
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'd',
                                    start: 269,
                                    end: 272,
                                    raw: '\'d\''
                                },
                                value: {
                                    type: 'Literal',
                                    value: '4',
                                    start: 274,
                                    end: 277,
                                    raw: '\'4\''
                                },
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 257,
                                end: 277,
                                leadingComments: [
                                    {
                                        type: 'Line',
                                        value: ' Before bracket, line comment',
                                        start: 219,
                                        end: 250
                                    }
                                ]
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'e',
                                    start: 340,
                                    end: 343,
                                    leadingComments: [
                                        {
                                            type: 'Line',
                                            value: ' Inside bracket, line comment',
                                            start: 298,
                                            end: 329
                                        }
                                    ],
                                    raw: '\'e\''
                                },
                                value: {
                                    type: 'Literal',
                                    value: '5',
                                    start: 345,
                                    end: 348,
                                    raw: '\'5\''
                                },
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 286,
                                end: 348
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Literal',
                                    value: 'f',
                                    start: 358,
                                    end: 361,
                                    trailingComments: [
                                        {
                                            type: 'Line',
                                            value: ' After bracket, line comment',
                                            start: 370,
                                            end: 400
                                        }
                                    ],
                                    raw: '\'f\''
                                },
                                value: {
                                    type: 'Literal',
                                    value: '6',
                                    start: 413,
                                    end: 416,
                                    leadingComments: [
                                        {
                                            type: 'Line',
                                            value: ' After bracket, line comment',
                                            start: 370,
                                            end: 400
                                        }
                                    ],
                                    raw: '\'6\''
                                },
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 357,
                                end: 416
                            }
                        ],
                        start: 11,
                        end: 420
                    },
                    id: {
                        type: 'Identifier',
                        name: 'test',
                        start: 4,
                        end: 8
                    },
                    start: 4,
                    end: 420
                }
            ],
            kind: 'var',
            start: 0,
            end: 421
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 421
}
});

    pass(`comment only`, {
  source: `// from #23
  /**/
  /*
  */`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [],
    sourceType: 'script',
    start: 0,
    end: 28
}
});

    pass(`block line comment`, {
  source: `// Leading to block
  {
    print('hello');
  }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'BlockStatement',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'print',
                            start: 28,
                            end: 33
                        },
                        arguments: [
                            {
                                type: 'Literal',
                                value: 'hello',
                                start: 34,
                                end: 41,
                                raw: '\'hello\''
                            }
                        ],
                        start: 28,
                        end: 42
                    },
                    start: 28,
                    end: 43
                }
            ],
            start: 22,
            end: 47,
            leadingComments: [
                {
                    type: 'Line',
                    value: ' Leading to block',
                    start: 0,
                    end: 19
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 47
}
});

    pass(`2 space multi comment`, {
  source: `function test() {
      /*
       * this is comment
       */
      var i = 20;
    }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 20,
                                    start: 76,
                                    end: 78,
                                    raw: '20'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'i',
                                    start: 72,
                                    end: 73
                                },
                                start: 72,
                                end: 78
                            }
                        ],
                        kind: 'var',
                        start: 68,
                        end: 79,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: '\n       * this is comment\n       ',
                                start: 24,
                                end: 61
                            }
                        ]
                    }
                ],
                start: 16,
                end: 85
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'test',
                start: 9,
                end: 13
            },
            start: 0,
            end: 85
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 85
}
});

    pass(`block trailing comment`, {
  source: `{
      a();
      //comment
  }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'BlockStatement',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'CallExpression',
                        callee: {
                            type: 'Identifier',
                            name: 'a',
                            start: 8,
                            end: 9
                        },
                        arguments: [],
                        start: 8,
                        end: 11
                    },
                    start: 8,
                    end: 12,
                    trailingComments: [
                        {
                            type: 'Line',
                            value: 'comment',
                            start: 19,
                            end: 28
                        }
                    ]
                }
            ],
            start: 0,
            end: 32
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 32
}
});

    pass(`switch fall through comment`, {
  source: `switch(foo) {
      // foo
      case 1:
          // falls through
      case 2:
          doIt();
  }`,
  comments: [],
  raw: true,
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'foo',
                start: 7,
                end: 10
            },
            cases: [
                {
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 1,
                        start: 38,
                        end: 39,
                        raw: '1'
                    },
                    consequent: [],
                    start: 33,
                    end: 40,
                    leadingComments: [
                        {
                            type: 'Line',
                            value: ' foo',
                            start: 20,
                            end: 26
                        }
                    ],
                    trailingComments: [
                        {
                            type: 'Line',
                            value: ' falls through',
                            start: 51,
                            end: 67
                        }
                    ]
                },
                {
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 2,
                        start: 79,
                        end: 80,
                        raw: '2'
                    },
                    consequent: [
                        {
                            type: 'ExpressionStatement',
                            expression: {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'doIt',
                                    start: 92,
                                    end: 96
                                },
                                arguments: [],
                                start: 92,
                                end: 98
                            },
                            start: 92,
                            end: 99
                        }
                    ],
                    start: 74,
                    end: 99,
                    leadingComments: [
                        {
                            type: 'Line',
                            value: ' falls through',
                            start: 51,
                            end: 67
                        }
                    ]
                }
            ],
            start: 0,
            end: 103
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 103
}
});

    pass(`switch no default`, {
  source: `switch (a) {
      case 1:
          break;
      //no default
  }`,
  comments: [],
  attachComment: true,
  raw: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'SwitchStatement',
            discriminant: {
                type: 'Identifier',
                name: 'a',
                start: 8,
                end: 9
            },
            cases: [
                {
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 1,
                        start: 24,
                        end: 25,
                        raw: '1'
                    },
                    consequent: [
                        {
                            type: 'BreakStatement',
                            label: null,
                            start: 37,
                            end: 43
                        }
                    ],
                    start: 19,
                    end: 43,
                    trailingComments: [
                        {
                            type: 'Line',
                            value: 'no default',
                            start: 50,
                            end: 62
                        }
                    ]
                }
            ],
            start: 0,
            end: 66
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 66
}
});

    pass(`surrounding throw comment`, {
  source: `function a() {
      /* before */
      throw 55;
      /* after */
  }`,
  comments: [],
  attachComment: true,
  raw: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ThrowStatement',
                        argument: {
                            type: 'Literal',
                            value: 55,
                            start: 46,
                            end: 48,
                            raw: '55'
                        },
                        start: 40,
                        end: 49,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' before ',
                                start: 21,
                                end: 33
                            }
                        ],
                        trailingComments: [
                            {
                                type: 'Block',
                                value: ' after ',
                                start: 56,
                                end: 67
                            }
                        ]
                    }
                ],
                start: 13,
                end: 71
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'a',
                start: 9,
                end: 10
            },
            start: 0,
            end: 71
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 71
}
});

    pass(`switch no default comment in function`, {
  source: `function bar(a) {
      switch (a) {
          case 2:
              break;
          case 1:
              break;
          //no default
      }
  }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [
                {
                    type: 'Identifier',
                    name: 'a',
                    start: 13,
                    end: 14
                }
            ],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'SwitchStatement',
                        discriminant: {
                            type: 'Identifier',
                            name: 'a',
                            start: 32,
                            end: 33
                        },
                        cases: [
                            {
                                type: 'SwitchCase',
                                test: {
                                    type: 'Literal',
                                    value: 2,
                                    start: 52,
                                    end: 53,
                                    raw: '2'
                                },
                                consequent: [
                                    {
                                        type: 'BreakStatement',
                                        label: null,
                                        start: 69,
                                        end: 75
                                    }
                                ],
                                start: 47,
                                end: 75
                            },
                            {
                                type: 'SwitchCase',
                                test: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 91,
                                    end: 92,
                                    raw: '1'
                                },
                                consequent: [
                                    {
                                        type: 'BreakStatement',
                                        label: null,
                                        start: 108,
                                        end: 114
                                    }
                                ],
                                start: 86,
                                end: 114,
                                trailingComments: [
                                    {
                                        type: 'Line',
                                        value: 'no default',
                                        start: 125,
                                        end: 137
                                    }
                                ]
                            }
                        ],
                        start: 24,
                        end: 145
                    }
                ],
                start: 16,
                end: 149
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'bar',
                start: 9,
                end: 12
            },
            start: 0,
            end: 149
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 149
}
});

    pass(`func decl with multiline comment wrapped inside function body`, {
  source: `/**/ function a() {/**/function o() {}}`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 36,
                            end: 38
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'o',
                            start: 32,
                            end: 33
                        },
                        start: 23,
                        end: 38,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: '',
                                start: 19,
                                end: 23
                            }
                        ]
                    }
                ],
                start: 18,
                end: 39
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'a',
                start: 14,
                end: 15
            },
            start: 5,
            end: 39,
            leadingComments: [
                {
                    type: 'Block',
                    value: '',
                    start: 0,
                    end: 4
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 39
}
});

    pass(`object with more than one key`, {
  source: `extend(/**@lends o#*/{
      p2: null,
      p3: null
  });`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'extend',
                    start: 0,
                    end: 6
                },
                arguments: [
                    {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'p2',
                                    start: 29,
                                    end: 31
                                },
                                value: {
                                    type: 'Literal',
                                    value: null,
                                    start: 33,
                                    end: 37,
                                    raw: 'null'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 29,
                                end: 37
                            },
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'p3',
                                    start: 45,
                                    end: 47
                                },
                                value: {
                                    type: 'Literal',
                                    value: null,
                                    start: 49,
                                    end: 53,
                                    raw: 'null'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 45,
                                end: 53
                            }
                        ],
                        start: 21,
                        end: 57,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: '*@lends o#',
                                start: 7,
                                end: 21
                            }
                        ]
                    }
                ],
                start: 0,
                end: 58
            },
            start: 0,
            end: 59
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 59
}
});

    pass(`variableDeclaration comments`, {
  source: `/**
  * @type {number}
  */
 var a = 5,
     /**
      * @type {number}
      */
     b = 6;`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'VariableDeclaration',
            declarations: [
                {
                    type: 'VariableDeclarator',
                    init: {
                        type: 'Literal',
                        value: 5,
                        start: 37,
                        end: 38,
                        raw: '5'
                    },
                    id: {
                        type: 'Identifier',
                        name: 'a',
                        start: 33,
                        end: 34
                    },
                    start: 33,
                    end: 38
                },
                {
                    type: 'VariableDeclarator',
                    init: {
                        type: 'Literal',
                        value: 6,
                        start: 90,
                        end: 91,
                        raw: '6'
                    },
                    id: {
                        type: 'Identifier',
                        name: 'b',
                        start: 86,
                        end: 87
                    },
                    start: 86,
                    end: 91,
                    leadingComments: [
                        {
                            type: 'Block',
                            value: '*\n      * @type {number}\n      ',
                            start: 45,
                            end: 80
                        }
                    ]
                }
            ],
            kind: 'var',
            start: 29,
            end: 92,
            leadingComments: [
                {
                    type: 'Block',
                    value: '*\n  * @type {number}\n  ',
                    start: 0,
                    end: 27
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 92
}
});

    pass(`HTML (not comment)`, {
  source: `/* not comment*/; i-->0`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'EmptyStatement',
            start: 16,
            end: 17,
            leadingComments: [
                {
                    type: 'Block',
                    value: ' not comment',
                    start: 0,
                    end: 16
                }
            ]
        },
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                left: {
                    type: 'UpdateExpression',
                    argument: {
                        type: 'Identifier',
                        name: 'i',
                        start: 18,
                        end: 19
                    },
                    operator: '--',
                    prefix: false,
                    start: 18,
                    end: 21
                },
                right: {
                    type: 'Literal',
                    value: 0,
                    start: 22,
                    end: 23,
                    raw: '0'
                },
                operator: '>',
                start: 18,
                end: 23
            },
            start: 18,
            end: 23
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 23
}
});

    pass(`while statement inside function declaration`, {
  source: `function f() { /* infinite */ while (true) { } /* bar */ var each; }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'WhileStatement',
                        test: {
                            type: 'Literal',
                            value: true,
                            start: 37,
                            end: 41,
                            raw: 'true'
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 43,
                            end: 46
                        },
                        start: 30,
                        end: 46,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' infinite ',
                                start: 15,
                                end: 29
                            }
                        ],
                        trailingComments: [
                            {
                                type: 'Block',
                                value: ' bar ',
                                start: 47,
                                end: 56
                            }
                        ]
                    },
                    {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: null,
                                id: {
                                    type: 'Identifier',
                                    name: 'each',
                                    start: 61,
                                    end: 65
                                },
                                start: 61,
                                end: 65
                            }
                        ],
                        kind: 'var',
                        start: 57,
                        end: 66,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' bar ',
                                start: 47,
                                end: 56
                            }
                        ]
                    }
                ],
                start: 13,
                end: 68
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'f',
                start: 9,
                end: 10
            },
            start: 0,
            end: 68
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 68
}
});

    pass(`line comment + CR + number`, {
  source: `//
  42`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                start: 5,
                end: 7,
                raw: '42'
            },
            start: 5,
            end: 7,
            leadingComments: [
                {
                    type: 'Line',
                    value: '',
                    start: 0,
                    end: 2
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 7
}
});

    pass(`block comment and number literal`, {
  source: `42 /* The * answer */`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                start: 0,
                end: 2,
                raw: '42'
            },
            start: 0,
            end: 2,
            trailingComments: [
                {
                    type: 'Block',
                    value: ' The * answer ',
                    start: 3,
                    end: 21
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 21
}
});

    pass(`binary expression comment`, {
  source: `(a + /* assignmenr */b ) * c`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                left: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Identifier',
                        name: 'a',
                        start: 1,
                        end: 2
                    },
                    right: {
                        type: 'Identifier',
                        name: 'b',
                        start: 21,
                        end: 22,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' assignmenr ',
                                start: 5,
                                end: 21
                            }
                        ]
                    },
                    operator: '+',
                    start: 1,
                    end: 22
                },
                right: {
                    type: 'Identifier',
                    name: 'c',
                    start: 27,
                    end: 28
                },
                operator: '*',
                start: 0,
                end: 28
            },
            start: 0,
            end: 28
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 28
}
});

    pass(`two block comments and number`, {
  source: `42 /* block comment 1 */ /* block comment 2 */`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                start: 0,
                end: 2,
                raw: '42'
            },
            start: 0,
            end: 2,
            trailingComments: [
                {
                    type: 'Block',
                    value: ' block comment 1 ',
                    start: 3,
                    end: 24
                },
                {
                    type: 'Block',
                    value: ' block comment 2 ',
                    start: 25,
                    end: 46
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 46
}
});

    pass(`block comment with linebreak and number`, {
  source: `/*a
  c*/ 42`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 42,
                start: 10,
                end: 12,
                raw: '42'
            },
            start: 10,
            end: 12,
            leadingComments: [
                {
                    type: 'Block',
                    value: 'a\n  c',
                    start: 0,
                    end: 9
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 12
}
});

    pass(`object wrapped in paren comment`, {
  source: `(/* comment */{
          /* comment 2 */
          p1: null
      })`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'ObjectExpression',
                properties: [
                    {
                        type: 'Property',
                        key: {
                            type: 'Identifier',
                            name: 'p1',
                            start: 52,
                            end: 54
                        },
                        value: {
                            type: 'Literal',
                            value: null,
                            start: 56,
                            end: 60,
                            raw: 'null'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 52,
                        end: 60,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' comment 2 ',
                                start: 26,
                                end: 41
                            }
                        ]
                    }
                ],
                start: 14,
                end: 68,
                leadingComments: [
                    {
                        type: 'Block',
                        value: ' comment ',
                        start: 1,
                        end: 14
                    }
                ]
            },
            start: 0,
            end: 69
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 69
}
});

    pass(`surrounding call comment`, {
  source: `function a() {
      /* before */
      foo();
      /* after */
  }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 40,
                                end: 43
                            },
                            arguments: [],
                            start: 40,
                            end: 45
                        },
                        start: 40,
                        end: 46,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' before ',
                                start: 21,
                                end: 33
                            }
                        ],
                        trailingComments: [
                            {
                                type: 'Block',
                                value: ' after ',
                                start: 53,
                                end: 64
                            }
                        ]
                    }
                ],
                start: 13,
                end: 68
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'a',
                start: 9,
                end: 10
            },
            start: 0,
            end: 68
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 68
}
});

    pass(`Esprima issue ticket #1071`, {
  source: `/**/ function a() {}`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [],
                start: 18,
                end: 20
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'a',
                start: 14,
                end: 15
            },
            start: 5,
            end: 20,
            leadingComments: [
                {
                    type: 'Block',
                    value: '',
                    start: 0,
                    end: 4
                }
            ]
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 20
}
});

    pass(`Esprima issue ticket #1071`, {
  source: `/***/function o() {/***/function f() {};};`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 37,
                            end: 39
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: {
                            type: 'Identifier',
                            name: 'f',
                            start: 33,
                            end: 34
                        },
                        start: 24,
                        end: 39,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: '*',
                                start: 19,
                                end: 24
                            }
                        ]
                    },
                    {
                        type: 'EmptyStatement',
                        start: 39,
                        end: 40
                    }
                ],
                start: 18,
                end: 41
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'o',
                start: 14,
                end: 15
            },
            start: 5,
            end: 41,
            leadingComments: [
                {
                    type: 'Block',
                    value: '*',
                    start: 0,
                    end: 5
                }
            ]
        },
        {
            type: 'EmptyStatement',
            start: 41,
            end: 42
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 42
}
});

    pass(`Esprima issue ticket #1874`, {
  source: `function foo() {/*good comment*/return /*bad comment*/;}`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ReturnStatement',
                        argument: null,
                        start: 32,
                        end: 55,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: 'good comment',
                                start: 16,
                                end: 32
                            }
                        ],
                        trailingComments: [
                            {
                                type: 'Block',
                                value: 'bad comment',
                                start: 39,
                                end: 54
                            }
                        ]
                    }
                ],
                start: 15,
                end: 56
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'foo',
                start: 9,
                end: 12
            },
            start: 0,
            end: 56
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 56
}
});

    pass(`Esprima issue ticket #1874`, {
  source: `function foo() {return /*comment*/;}`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ReturnStatement',
                        argument: null,
                        start: 16,
                        end: 35,
                        trailingComments: [
                            {
                                type: 'Block',
                                value: 'comment',
                                start: 23,
                                end: 34
                            }
                        ]
                    }
                ],
                start: 15,
                end: 36
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'foo',
                start: 9,
                end: 12
            },
            start: 0,
            end: 36
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 36
}
});

    pass(`do while line comment`, {
  source: `do {
  }  // LINE
  while (true);`,
  raw: true,
  module: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'DoWhileStatement',
            body: {
                type: 'BlockStatement',
                body: [],
                start: 3,
                end: 8,
                trailingComments: [
                    {
                        type: 'Line',
                        value: ' LINE',
                        start: 10,
                        end: 17
                    }
                ]
            },
            test: {
                type: 'Literal',
                value: true,
                start: 27,
                end: 31,
                leadingComments: [
                    {
                        type: 'Line',
                        value: ' LINE',
                        start: 10,
                        end: 17
                    }
                ],
                raw: 'true'
            },
            start: 0,
            end: 33
        }
    ],
    sourceType: 'module',
    start: 0,
    end: 33
}
});

    pass(`export of default class comments`, {
  source: `export default class {
          /**
           * this is method1.
           */
          method1(){
          }
      }`,
  raw: true,
  module: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExportDefaultDeclaration',
            declaration: {
                type: 'ClassDeclaration',
                id: null,
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'method1',
                                start: 91,
                                end: 98
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 100,
                                    end: 113
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 98,
                                end: 113
                            },
                            static: false,
                            start: 91,
                            end: 113,
                            leadingComments: [
                                {
                                    type: 'Block',
                                    value: '*\n           * this is method1.\n           ',
                                    start: 33,
                                    end: 80
                                }
                            ]
                        }
                    ],
                    start: 21,
                    end: 121
                },
                start: 15,
                end: 121
            },
            start: 0,
            end: 121
        }
    ],
    sourceType: 'module',
    start: 0,
    end: 121
}
});

    pass(`if with block comments`, {
  source: `/* foo */
  if (/* bar */  a) {}`,
  raw: true,
  module: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'IfStatement',
            test: {
                type: 'Identifier',
                name: 'a',
                start: 27,
                end: 28,
                leadingComments: [
                    {
                        type: 'Block',
                        value: ' bar ',
                        start: 16,
                        end: 25
                    }
                ]
            },
            alternate: null,
            consequent: {
                type: 'BlockStatement',
                body: [],
                start: 30,
                end: 32
            },
            start: 12,
            end: 32,
            leadingComments: [
                {
                    type: 'Block',
                    value: ' foo ',
                    start: 0,
                    end: 9
                }
            ]
        }
    ],
    sourceType: 'module',
    start: 0,
    end: 32
}
});

    pass(`Espree issue ticket #158`, {
  source: `/**
  * this is anonymous class.
  */
 export default class {
   /**
    * this is method1.
    */
   method1(){
   }
 }`,
  raw: true,
  module: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'ExportDefaultDeclaration',
            declaration: {
                type: 'ClassDeclaration',
                id: null,
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'MethodDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'method1',
                                start: 102,
                                end: 109
                            },
                            kind: 'method',
                            computed: false,
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 111,
                                    end: 117
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 109,
                                end: 117
                            },
                            static: false,
                            start: 102,
                            end: 117,
                            leadingComments: [
                                {
                                    type: 'Block',
                                    value: '*\n    * this is method1.\n    ',
                                    start: 65,
                                    end: 98
                                }
                            ]
                        }
                    ],
                    start: 60,
                    end: 120
                },
                start: 54,
                end: 120
            },
            start: 39,
            end: 120,
            leadingComments: [
                {
                    type: 'Block',
                    value: '*\n  * this is anonymous class.\n  ',
                    start: 0,
                    end: 37
                }
            ]
        }
    ],
    sourceType: 'module',
    start: 0,
    end: 120
}
});

    pass(`debugger`, {
  source: `function a() {
      /* before */
      debugger;
      /* after */
  }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'DebuggerStatement',
                        start: 40,
                        end: 49,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' before ',
                                start: 21,
                                end: 33
                            }
                        ],
                        trailingComments: [
                            {
                                type: 'Block',
                                value: ' after ',
                                start: 56,
                                end: 67
                            }
                        ]
                    }
                ],
                start: 13,
                end: 71
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'a',
                start: 9,
                end: 10
            },
            start: 0,
            end: 71
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 71
}
});

    pass(`return `, {
  source: `function a() {
      /* before */
      return;
      /* after */
  }`,
  raw: true,
  comments: [],
  attachComment: true,
  expected: {
    type: 'Program',
    body: [
        {
            type: 'FunctionDeclaration',
            params: [],
            body: {
                type: 'BlockStatement',
                body: [
                    {
                        type: 'ReturnStatement',
                        argument: null,
                        start: 40,
                        end: 47,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' before ',
                                start: 21,
                                end: 33
                            }
                        ],
                        trailingComments: [
                            {
                                type: 'Block',
                                value: ' after ',
                                start: 54,
                                end: 65
                            }
                        ]
                    }
                ],
                start: 13,
                end: 69
            },
            async: false,
            generator: false,
            expression: false,
            id: {
                type: 'Identifier',
                name: 'a',
                start: 9,
                end: 10
            },
            start: 0,
            end: 69
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 69
}
});

    pass(`function trailing comma shorthand`, {
  source: `fn(a, { b }, /* comment */);`,
  raw: true,
  comments: [],
  attachComment: true,
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
                    end: 2
                },
                arguments: [
                    {
                        type: 'Identifier',
                        name: 'a',
                        start: 3,
                        end: 4
                    },
                    {
                        type: 'ObjectExpression',
                        properties: [
                            {
                                type: 'Property',
                                key: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 8,
                                    end: 9
                                },
                                value: {
                                    type: 'Identifier',
                                    name: 'b',
                                    start: 8,
                                    end: 9
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: true,
                                start: 8,
                                end: 9
                            }
                        ],
                        start: 6,
                        end: 11
                    }
                ],
                start: 0,
                end: 27
            },
            start: 0,
            end: 28
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 28
}
});

    pass(`function declaration with inner comment`, {
      source: `function x() {
          // Inner comment
      }`,
      raw: true,
      comments: [],
      attachComment: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 13,
                    end: 49,
                    trailingComments: [
                        {
                            type: 'Line',
                            value: ' Inner comment',
                            start: 25,
                            end: 41
                        }
                    ]
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                    type: 'Identifier',
                    name: 'x',
                    start: 9,
                    end: 10
                },
                start: 0,
                end: 49
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 49
    }
  });
    });
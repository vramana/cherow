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
              comments: [],
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
            type: 'Program',
            body: [],
            sourceType: 'script',
            start: 0,
            end: 6,
            comments: [
                {
                    type: 'Line',
                    value: ' foo',
                    start: 0,
                    end: 6
                }
            ]
        }
    });

    pass(`empty source with block comment`, {
        source: `/* foo */`,
        raw: true,
        comments: [],
        attachComment: true,
        expected: {
            type: 'Program',
            body: [],
            sourceType: 'script',
            start: 0,
            end: 9,
            comments: [
                {
                    type: 'Block',
                    value: ' foo ',
                    start: 0,
                    end: 9
                }
            ]
        }
    });

    pass(`call expression with trailing comma;`, {
      source: `fn(a, b, /* comment */);`,
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
                            type: 'Identifier',
                            name: 'b',
                            start: 6,
                            end: 7,
                            trailingComments: [
                                {
                                    type: 'Block',
                                    value: ' comment ',
                                    start: 9,
                                    end: 22
                                }
                            ]
                        }
                    ],
                    start: 0,
                    end: 23
                },
                start: 0,
                end: 24
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 24,
        comments: [
            {
                type: 'Block',
                value: ' comment ',
                start: 9,
                end: 22
            }
        ]
    }
    });

    pass(`object property trailing comma`, {
      source: `var obj = {
          a: '1', // comment 1
          b: '2', // comment 2
          c: '3', // comment 3
        }`,
      attachComment: true,
      raw: true,
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
                                        type: 'Identifier',
                                        name: 'a',
                                        start: 22,
                                        end: 23
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: '1',
                                        start: 25,
                                        end: 28,
                                        raw: '\'1\''
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 22,
                                    end: 28
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'b',
                                        start: 53,
                                        end: 54
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: '2',
                                        start: 56,
                                        end: 59,
                                        raw: '\'2\''
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 53,
                                    end: 59,
                                    leadingComments: [
                                        {
                                            type: 'Line',
                                            value: ' comment 1',
                                            start: 30,
                                            end: 42
                                        }
                                    ]
                                },
                                {
                                    type: 'Property',
                                    key: {
                                        type: 'Identifier',
                                        name: 'c',
                                        start: 84,
                                        end: 85
                                    },
                                    value: {
                                        type: 'Literal',
                                        value: '3',
                                        start: 87,
                                        end: 90,
                                        raw: '\'3\''
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: false,
                                    shorthand: false,
                                    start: 84,
                                    end: 90,
                                    leadingComments: [
                                        {
                                            type: 'Line',
                                            value: ' comment 2',
                                            start: 61,
                                            end: 73
                                        }
                                    ]
                                }
                            ],
                            start: 10,
                            end: 114
                        },
                        id: {
                            type: 'Identifier',
                            name: 'obj',
                            start: 4,
                            end: 7
                        },
                        start: 4,
                        end: 114
                    }
                ],
                kind: 'var',
                start: 0,
                end: 114
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 114,
        comments: [
            {
                type: 'Line',
                value: ' comment 1',
                start: 30,
                end: 42
            },
            {
                type: 'Line',
                value: ' comment 2',
                start: 61,
                end: 73
            },
            {
                type: 'Line',
                value: ' comment 3',
                start: 92,
                end: 104
            }
        ]
    }
    });

    pass(`function trailing comma shorthand`, {
    source: `fn(a, { b }, /* comment */);`,
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
                            end: 11,
                            trailingComments: [
                                {
                                    type: 'Block',
                                    value: ' comment ',
                                    start: 13,
                                    end: 26
                                }
                            ]
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
        end: 28,
        comments: [
            {
                type: 'Block',
                value: ' comment ',
                start: 13,
                end: 26
            }
        ]
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
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 79,
                                            end: 80
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '1',
                                            start: 81,
                                            end: 84,
                                            raw: '\'1\''
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 79,
                                        end: 84,
                                        leadingComments: [
                                            {
                                                type: 'Block',
                                                value: '*\n             * Test 2\n             ',
                                                start: 25,
                                                end: 66
                                            }
                                        ]
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'b',
                                            start: 151,
                                            end: 152
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '2',
                                            start: 153,
                                            end: 156,
                                            raw: '\'2\''
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 151,
                                        end: 156,
                                        leadingComments: [
                                            {
                                                type: 'Block',
                                                value: '\n             * Test 1\n             ',
                                                start: 98,
                                                end: 138
                                            }
                                        ]
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'c',
                                            start: 192,
                                            end: 193
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '3',
                                            start: 194,
                                            end: 197,
                                            raw: '\'3\''
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 192,
                                        end: 197,
                                        leadingComments: [
                                            {
                                                type: 'Line',
                                                value: ' Test 3',
                                                start: 170,
                                                end: 179
                                            }
                                        ]
                                    }
                                ],
                                start: 11,
                                end: 207
                            },
                            id: {
                                type: 'Identifier',
                                name: 'test',
                                start: 4,
                                end: 8
                            },
                            start: 4,
                            end: 207
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 208
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 208,
            comments: [
                {
                    type: 'Block',
                    value: '*\n             * Test 2\n             ',
                    start: 25,
                    end: 66
                },
                {
                    type: 'Block',
                    value: '\n             * Test 1\n             ',
                    start: 98,
                    end: 138
                },
                {
                    type: 'Line',
                    value: ' Test 3',
                    start: 170,
                    end: 179
                }
            ]
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
        end: 95,
        comments: [
            {
                type: 'Line',
                value: ' Leading to if-block',
                start: 16,
                end: 38
            },
            {
                type: 'Line',
                value: ' Trailing to if-block',
                start: 72,
                end: 95
            }
        ]
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
                                        raw: '20'
                                    },
                                    id: {
                                        type: 'Identifier',
                                        name: 'i',
                                        start: 156,
                                        end: 157
                                    },
                                    start: 156,
                                    end: 162
                                }
                            ],
                            kind: 'var',
                            start: 152,
                            end: 163,
                            leadingComments: [
                                {
                                    type: 'Block',
                                    value: '\n         * Leading comment\n         ',
                                    start: 26,
                                    end: 67
                                },
                                {
                                    type: 'Block',
                                    value: '\n         *\n         * Leading comment 2\n         *\n         ',
                                    start: 77,
                                    end: 142
                                }
                            ],
                            trailingComments: [
                                {
                                    type: 'Block',
                                    value: '\n         * Trailing comment\n         ',
                                    start: 172,
                                    end: 214
                                },
                                {
                                    type: 'Block',
                                    value: '\n         *\n         * Trailing comment 2\n         *\n         ',
                                    start: 224,
                                    end: 290
                                }
                            ]
                        }
                    ],
                    start: 16,
                    end: 296
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
                end: 296
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 296,
        comments: [
            {
                type: 'Block',
                value: '\n         * Leading comment\n         ',
                start: 26,
                end: 67
            },
            {
                type: 'Block',
                value: '\n         *\n         * Leading comment 2\n         *\n         ',
                start: 77,
                end: 142
            },
            {
                type: 'Block',
                value: '\n         * Trailing comment\n         ',
                start: 172,
                end: 214
            },
            {
                type: 'Block',
                value: '\n         *\n         * Trailing comment 2\n         *\n         ',
                start: 224,
                end: 290
            }
        ]
    }
});

    pass(`simple statement comment`, {
    source: `;    // Trailing`,
    raw: true,
    comments: [],
    attachComment: true,
    expected: {
        type: 'Program',
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
                        end: 16
                    }
                ]
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 16,
        comments: [
            {
                type: 'Line',
                value: ' Trailing',
                start: 5,
                end: 16
            }
        ]
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
    end: 99,
    comments: [
        {
            type: 'Line',
            value: '',
            start: 5,
            end: 7
        },
        {
            type: 'Line',
            value: '',
            start: 41,
            end: 43
        },
        {
            type: 'Line',
            value: '',
            start: 81,
            end: 83
        }
    ]
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
    end: 139,
    comments: [
        {
            type: 'Line',
            value: '',
            start: 13,
            end: 15
        }
    ]
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
    end: 421,
    comments: [
        {
            type: 'Block',
            value: '*\n       * Before bracket init\n       ',
            start: 19,
            end: 61
        },
        {
            type: 'Block',
            value: '\n       * Inside bracket init\n       ',
            start: 87,
            end: 128
        },
        {
            type: 'Block',
            value: '\n        * After bracket key\n        ',
            start: 164,
            end: 205
        },
        {
            type: 'Line',
            value: ' Before bracket, line comment',
            start: 219,
            end: 250
        },
        {
            type: 'Line',
            value: ' Inside bracket, line comment',
            start: 298,
            end: 329
        },
        {
            type: 'Line',
            value: ' After bracket, line comment',
            start: 370,
            end: 400
        }
    ]
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
    end: 28,
    comments: [
        {
            type: 'Line',
            value: ' from #23',
            start: 0,
            end: 11
        },
        {
            type: 'Block',
            value: '',
            start: 14,
            end: 18
        },
        {
            type: 'Block',
            value: '\n  ',
            start: 21,
            end: 28
        }
    ]
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
    end: 47,
    comments: [
        {
            type: 'Line',
            value: ' Leading to block',
            start: 0,
            end: 19
        }
    ]
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
    end: 85,
    comments: [
        {
            type: 'Block',
            value: '\n       * this is comment\n       ',
            start: 24,
            end: 61
        }
    ]
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
    end: 32,
    comments: [
        {
            type: 'Line',
            value: 'comment',
            start: 19,
            end: 28
        }
    ]
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
    end: 103,
    comments: [
        {
            type: 'Line',
            value: ' foo',
            start: 20,
            end: 26
        },
        {
            type: 'Line',
            value: ' falls through',
            start: 51,
            end: 67
        }
    ]
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
    end: 66,
    comments: [
        {
            type: 'Line',
            value: 'no default',
            start: 50,
            end: 62
        }
    ]
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
    end: 71,
    comments: [
        {
            type: 'Block',
            value: ' before ',
            start: 21,
            end: 33
        },
        {
            type: 'Block',
            value: ' after ',
            start: 56,
            end: 67
        }
    ]
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
    end: 149,
    comments: [
        {
            type: 'Line',
            value: 'no default',
            start: 125,
            end: 137
        }
    ]
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
    end: 39,
    comments: [
        {
            type: 'Block',
            value: '',
            start: 0,
            end: 4
        },
        {
            type: 'Block',
            value: '',
            start: 19,
            end: 23
        }
    ]
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
    end: 59,
    comments: [
        {
            type: 'Block',
            value: '*@lends o#',
            start: 7,
            end: 21
        }
    ]
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
    end: 92,
    comments: [
        {
            type: 'Block',
            value: '*\n  * @type {number}\n  ',
            start: 0,
            end: 27
        },
        {
            type: 'Block',
            value: '*\n      * @type {number}\n      ',
            start: 45,
            end: 80
        }
    ]
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
    end: 23,
    comments: [
        {
            type: 'Block',
            value: ' not comment',
            start: 0,
            end: 16
        }
    ]
}
});

    pass(`while loop comments`, {
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
    end: 68,
    comments: [
        {
            type: 'Block',
            value: ' infinite ',
            start: 15,
            end: 29
        },
        {
            type: 'Block',
            value: ' bar ',
            start: 47,
            end: 56
        }
    ]
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
    end: 7,
    comments: [
        {
            type: 'Line',
            value: '',
            start: 0,
            end: 2
        }
    ]
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
    end: 21,
    comments: [
        {
            type: 'Block',
            value: ' The * answer ',
            start: 3,
            end: 21
        }
    ]
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
    end: 28,
    comments: [
        {
            type: 'Block',
            value: ' assignmenr ',
            start: 5,
            end: 21
        }
    ]
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
    end: 46,
    comments: [
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
    end: 12,
    comments: [
        {
            type: 'Block',
            value: 'a\n  c',
            start: 0,
            end: 9
        }
    ]
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
    end: 69,
    comments: [
        {
            type: 'Block',
            value: ' comment ',
            start: 1,
            end: 14
        },
        {
            type: 'Block',
            value: ' comment 2 ',
            start: 26,
            end: 41
        }
    ]
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
    end: 68,
    comments: [
        {
            type: 'Block',
            value: ' before ',
            start: 21,
            end: 33
        },
        {
            type: 'Block',
            value: ' after ',
            start: 53,
            end: 64
        }
    ]
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
    end: 20,
    comments: [
        {
            type: 'Block',
            value: '',
            start: 0,
            end: 4
        }
    ]
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
    end: 42,
    comments: [
        {
            type: 'Block',
            value: '*',
            start: 0,
            end: 5
        },
        {
            type: 'Block',
            value: '*',
            start: 19,
            end: 24
        }
    ]
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
    end: 56,
    comments: [
        {
            type: 'Block',
            value: 'good comment',
            start: 16,
            end: 32
        },
        {
            type: 'Block',
            value: 'bad comment',
            start: 39,
            end: 54
        }
    ]
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
    end: 36,
    comments: [
        {
            type: 'Block',
            value: 'comment',
            start: 23,
            end: 34
        }
    ]
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
    end: 33,
    comments: [
        {
            type: 'Line',
            value: ' LINE',
            start: 10,
            end: 17
        }
    ]
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
    end: 121,
    comments: [
        {
            type: 'Block',
            value: '*\n           * this is method1.\n           ',
            start: 33,
            end: 80
        }
    ]
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
    end: 32,
    comments: [
        {
            type: 'Block',
            value: ' foo ',
            start: 0,
            end: 9
        },
        {
            type: 'Block',
            value: ' bar ',
            start: 16,
            end: 25
        }
    ]
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
    end: 120,
    comments: [
        {
            type: 'Block',
            value: '*\n  * this is anonymous class.\n  ',
            start: 0,
            end: 37
        },
        {
            type: 'Block',
            value: '*\n    * this is method1.\n    ',
            start: 65,
            end: 98
        }
    ]
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
    end: 71,
    comments: [
        {
            type: 'Block',
            value: ' before ',
            start: 21,
            end: 33
        },
        {
            type: 'Block',
            value: ' after ',
            start: 56,
            end: 67
        }
    ]
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
    end: 69,
    comments: [
        {
            type: 'Block',
            value: ' before ',
            start: 21,
            end: 33
        },
        {
            type: 'Block',
            value: ' after ',
            start: 54,
            end: 65
        }
    ]
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
                        end: 11,
                        trailingComments: [
                            {
                                type: 'Block',
                                value: ' comment ',
                                start: 13,
                                end: 26
                            }
                        ]
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
    end: 28,
    comments: [
        {
            type: 'Block',
            value: ' comment ',
            start: 13,
            end: 26
        }
    ]
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
        end: 49,
        comments: [
            {
                type: 'Line',
                value: ' Inner comment',
                start: 25,
                end: 41
            }
        ]
    }
  });

    pass(`switch statement with call expression`, {
    source: `switch (x) {
        case 1:
          console.log('1')
          // comment
      }`,
    raw: true,
    comments: [],
    attachComment: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'x',
                    start: 8,
                    end: 9
                },
                cases: [
                    {
                        type: 'SwitchCase',
                        test: {
                            type: 'Literal',
                            value: 1,
                            start: 26,
                            end: 27,
                            raw: '1'
                        },
                        consequent: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: 'console',
                                            start: 39,
                                            end: 46
                                        },
                                        computed: false,
                                        property: {
                                            type: 'Identifier',
                                            name: 'log',
                                            start: 47,
                                            end: 50
                                        },
                                        start: 39,
                                        end: 50
                                    },
                                    arguments: [
                                        {
                                            type: 'Literal',
                                            value: '1',
                                            start: 51,
                                            end: 54,
                                            raw: '\'1\''
                                        }
                                    ],
                                    start: 39,
                                    end: 55
                                },
                                start: 39,
                                end: 55
                            }
                        ],
                        start: 21,
                        end: 55,
                        trailingComments: [
                            {
                                type: 'Line',
                                value: ' comment',
                                start: 66,
                                end: 76
                            }
                        ]
                    }
                ],
                start: 0,
                end: 84
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 84,
        comments: [
            {
                type: 'Line',
                value: ' comment',
                start: 66,
                end: 76
            }
        ]
    }
  });

    pass(`function declaration with inner comment`, {
    source: `switch(x) {
        case 1:
          console.log('1')
          // comment
        default:
          break;
      }`,
    raw: true,
    comments: [],
    attachComment: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'x',
                    start: 7,
                    end: 8
                },
                cases: [
                    {
                        type: 'SwitchCase',
                        test: {
                            type: 'Literal',
                            value: 1,
                            start: 25,
                            end: 26,
                            raw: '1'
                        },
                        consequent: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'MemberExpression',
                                        object: {
                                            type: 'Identifier',
                                            name: 'console',
                                            start: 38,
                                            end: 45
                                        },
                                        computed: false,
                                        property: {
                                            type: 'Identifier',
                                            name: 'log',
                                            start: 46,
                                            end: 49
                                        },
                                        start: 38,
                                        end: 49
                                    },
                                    arguments: [
                                        {
                                            type: 'Literal',
                                            value: '1',
                                            start: 50,
                                            end: 53,
                                            raw: '\'1\''
                                        }
                                    ],
                                    start: 38,
                                    end: 54
                                },
                                start: 38,
                                end: 54
                            }
                        ],
                        start: 20,
                        end: 54,
                        trailingComments: [
                            {
                                type: 'Line',
                                value: ' comment',
                                start: 65,
                                end: 75
                            }
                        ]
                    },
                    {
                        type: 'SwitchCase',
                        test: null,
                        consequent: [
                            {
                                type: 'BreakStatement',
                                label: null,
                                start: 103,
                                end: 109
                            }
                        ],
                        start: 84,
                        end: 109,
                        leadingComments: [
                            {
                                type: 'Line',
                                value: ' comment',
                                start: 65,
                                end: 75
                            }
                        ]
                    }
                ],
                start: 0,
                end: 117
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 117,
        comments: [
            {
                type: 'Line',
                value: ' comment',
                start: 65,
                end: 75
            }
        ]
    }
  });

    pass(`comment with condition`, {
    source: `/* foo */
    if (/* bar */  a) {}`,
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
                    name: 'a',
                    start: 29,
                    end: 30,
                    leadingComments: [
                        {
                            type: 'Block',
                            value: ' bar ',
                            start: 18,
                            end: 27
                        }
                    ]
                },
                alternate: null,
                consequent: {
                    type: 'BlockStatement',
                    body: [],
                    start: 32,
                    end: 34
                },
                start: 14,
                end: 34,
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
        sourceType: 'script',
        start: 0,
        end: 34,
        comments: [
            {
                type: 'Block',
                value: ' foo ',
                start: 0,
                end: 9
            },
            {
                type: 'Block',
                value: ' bar ',
                start: 18,
                end: 27
            }
        ]
    }
  });

    pass(`shebang object`, {
    source: `#!/usr/bin/env babel-node

    var { spawn } = x;`,
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
                            type: 'Identifier',
                            name: 'x',
                            start: 47,
                            end: 48
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'spawn',
                                        start: 37,
                                        end: 42
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'spawn',
                                        start: 37,
                                        end: 42
                                    },
                                    method: false,
                                    shorthand: true,
                                    start: 37,
                                    end: 42
                                }
                            ],
                            start: 35,
                            end: 44
                        },
                        start: 35,
                        end: 48
                    }
                ],
                kind: 'var',
                start: 31,
                end: 49,
                leadingComments: [
                    {
                        type: 'Line',
                        value: '/usr/bin/env babel-node',
                        start: 0,
                        end: 25
                    }
                ]
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 49,
        comments: [
            {
                type: 'Line',
                value: '/usr/bin/env babel-node',
                start: 0,
                end: 25
            }
        ]
    }
  });

    pass(`function trailing comma`, {
    source: `fn(a, b, /* comment */);`,
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
                            type: 'Identifier',
                            name: 'b',
                            start: 6,
                            end: 7,
                            trailingComments: [
                                {
                                    type: 'Block',
                                    value: ' comment ',
                                    start: 9,
                                    end: 22
                                }
                            ]
                        }
                    ],
                    start: 0,
                    end: 23
                },
                start: 0,
                end: 24
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 24,
        comments: [
            {
                type: 'Block',
                value: ' comment ',
                start: 9,
                end: 22
            }
        ]
    }
  });

    pass(`switch no default comment in nested functions`, {
    source: `module.exports = function(context) {

      function isConstant(node) {
          switch (node.type) {
              case "SequenceExpression":
                  return isConstant(node.expressions[node.expressions.length - 1]);
              // no default
          }

          return false;
      }

  };`,
    raw: true,
    comments: [],
    attachComment: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    left: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'module',
                            start: 0,
                            end: 6
                        },
                        computed: false,
                        property: {
                            type: 'Identifier',
                            name: 'exports',
                            start: 7,
                            end: 14
                        },
                        start: 0,
                        end: 14
                    },
                    operator: '=',
                    right: {
                        type: 'FunctionExpression',
                        params: [
                            {
                                type: 'Identifier',
                                name: 'context',
                                start: 26,
                                end: 33
                            }
                        ],
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'FunctionDeclaration',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: 'node',
                                            start: 64,
                                            end: 68
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [
                                            {
                                                type: 'SwitchStatement',
                                                discriminant: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'node',
                                                        start: 90,
                                                        end: 94
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'type',
                                                        start: 95,
                                                        end: 99
                                                    },
                                                    start: 90,
                                                    end: 99
                                                },
                                                cases: [
                                                    {
                                                        type: 'SwitchCase',
                                                        test: {
                                                            type: 'Literal',
                                                            value: 'SequenceExpression',
                                                            start: 122,
                                                            end: 142,
                                                            raw: '"SequenceExpression"'
                                                        },
                                                        consequent: [
                                                            {
                                                                type: 'ReturnStatement',
                                                                argument: {
                                                                    type: 'CallExpression',
                                                                    callee: {
                                                                        type: 'Identifier',
                                                                        name: 'isConstant',
                                                                        start: 169,
                                                                        end: 179
                                                                    },
                                                                    arguments: [
                                                                        {
                                                                            type: 'MemberExpression',
                                                                            object: {
                                                                                type: 'MemberExpression',
                                                                                object: {
                                                                                    type: 'Identifier',
                                                                                    name: 'node',
                                                                                    start: 180,
                                                                                    end: 184
                                                                                },
                                                                                computed: false,
                                                                                property: {
                                                                                    type: 'Identifier',
                                                                                    name: 'expressions',
                                                                                    start: 185,
                                                                                    end: 196
                                                                                },
                                                                                start: 180,
                                                                                end: 196
                                                                            },
                                                                            computed: true,
                                                                            property: {
                                                                                type: 'BinaryExpression',
                                                                                left: {
                                                                                    type: 'MemberExpression',
                                                                                    object: {
                                                                                        type: 'MemberExpression',
                                                                                        object: {
                                                                                            type: 'Identifier',
                                                                                            name: 'node',
                                                                                            start: 197,
                                                                                            end: 201
                                                                                        },
                                                                                        computed: false,
                                                                                        property: {
                                                                                            type: 'Identifier',
                                                                                            name: 'expressions',
                                                                                            start: 202,
                                                                                            end: 213
                                                                                        },
                                                                                        start: 197,
                                                                                        end: 213
                                                                                    },
                                                                                    computed: false,
                                                                                    property: {
                                                                                        type: 'Identifier',
                                                                                        name: 'length',
                                                                                        start: 214,
                                                                                        end: 220
                                                                                    },
                                                                                    start: 197,
                                                                                    end: 220
                                                                                },
                                                                                right: {
                                                                                    type: 'Literal',
                                                                                    value: 1,
                                                                                    start: 223,
                                                                                    end: 224,
                                                                                    raw: '1'
                                                                                },
                                                                                operator: '-',
                                                                                start: 197,
                                                                                end: 224
                                                                            },
                                                                            start: 180,
                                                                            end: 225
                                                                        }
                                                                    ],
                                                                    start: 169,
                                                                    end: 226
                                                                },
                                                                start: 162,
                                                                end: 227
                                                            }
                                                        ],
                                                        start: 117,
                                                        end: 227,
                                                        trailingComments: [
                                                            {
                                                                type: 'Line',
                                                                value: ' no default',
                                                                start: 242,
                                                                end: 255
                                                            }
                                                        ]
                                                    }
                                                ],
                                                start: 82,
                                                end: 267
                                            },
                                            {
                                                type: 'ReturnStatement',
                                                argument: {
                                                    type: 'Literal',
                                                    value: false,
                                                    start: 286,
                                                    end: 291,
                                                    raw: 'false'
                                                },
                                                start: 279,
                                                end: 292
                                            }
                                        ],
                                        start: 70,
                                        end: 300
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: {
                                        type: 'Identifier',
                                        name: 'isConstant',
                                        start: 53,
                                        end: 63
                                    },
                                    start: 44,
                                    end: 300
                                }
                            ],
                            start: 35,
                            end: 305
                        },
                        async: false,
                        generator: false,
                        expression: false,
                        id: null,
                        start: 17,
                        end: 305
                    },
                    start: 0,
                    end: 305
                },
                start: 0,
                end: 306
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 306,
        comments: [
            {
                type: 'Line',
                value: ' no default',
                start: 242,
                end: 255
            }
        ]
    }
  });

    pass(`switch no default comment in nested function`, {
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
        end: 149,
        comments: [
            {
                type: 'Line',
                value: 'no default',
                start: 125,
                end: 137
            }
        ]
    }
  });

    pass(`parenthesized destructuring`, {
    source: `(foo = /* this is an empty array ! */ [])[0] = 4;`,
    raw: true,
    comments: [],
    attachComment: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    left: {
                        type: 'MemberExpression',
                        object: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 1,
                                end: 4
                            },
                            operator: '=',
                            right: {
                                type: 'ArrayExpression',
                                elements: [],
                                start: 38,
                                end: 40,
                                leadingComments: [
                                    {
                                        type: 'Block',
                                        value: ' this is an empty array ! ',
                                        start: 7,
                                        end: 37
                                    }
                                ]
                            },
                            start: 1,
                            end: 40
                        },
                        computed: true,
                        property: {
                            type: 'Literal',
                            value: 0,
                            start: 42,
                            end: 43,
                            raw: '0'
                        },
                        start: 0,
                        end: 44
                    },
                    operator: '=',
                    right: {
                        type: 'Literal',
                        value: 4,
                        start: 47,
                        end: 48,
                        raw: '4'
                    },
                    start: 0,
                    end: 48
                },
                start: 0,
                end: 49
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 49,
        comments: [
            {
                type: 'Block',
                value: ' this is an empty array ! ',
                start: 7,
                end: 37
            }
        ]
    }
  });

    pass(`binding pattern`, {
    source: `var {let, /* yield allowed here */ yield} /* assign */ = 0; // to zero`,
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
                            value: 0,
                            start: 57,
                            end: 58,
                            leadingComments: [
                                {
                                    type: 'Block',
                                    value: ' assign ',
                                    start: 42,
                                    end: 54
                                }
                            ],
                            raw: '0'
                        },
                        id: {
                            type: 'ObjectPattern',
                            properties: [
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'let',
                                        start: 5,
                                        end: 8
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'let',
                                        start: 5,
                                        end: 8
                                    },
                                    method: false,
                                    shorthand: true,
                                    start: 5,
                                    end: 8
                                },
                                {
                                    type: 'Property',
                                    kind: 'init',
                                    key: {
                                        type: 'Identifier',
                                        name: 'yield',
                                        start: 35,
                                        end: 40
                                    },
                                    computed: false,
                                    value: {
                                        type: 'Identifier',
                                        name: 'yield',
                                        start: 35,
                                        end: 40
                                    },
                                    method: false,
                                    shorthand: true,
                                    start: 35,
                                    end: 40,
                                    leadingComments: [
                                        {
                                            type: 'Block',
                                            value: ' yield allowed here ',
                                            start: 10,
                                            end: 34
                                        }
                                    ]
                                }
                            ],
                            start: 4,
                            end: 41,
                            trailingComments: [
                                {
                                    type: 'Block',
                                    value: ' assign ',
                                    start: 42,
                                    end: 54
                                }
                            ]
                        },
                        start: 4,
                        end: 58
                    }
                ],
                kind: 'var',
                start: 0,
                end: 59,
                trailingComments: [
                    {
                        type: 'Line',
                        value: ' to zero',
                        start: 60,
                        end: 70
                    }
                ]
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 70,
        comments: [
            {
                type: 'Block',
                value: ' yield allowed here ',
                start: 10,
                end: 34
            },
            {
                type: 'Block',
                value: ' assign ',
                start: 42,
                end: 54
            },
            {
                type: 'Line',
                value: ' to zero',
                start: 60,
                end: 70
            }
        ]
    }
  });

    pass(`bigInt`, {
    source: `0n /* BigInt */ <= 1`,
    raw: true,
    next: true,
    attachComment: true,
    expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Literal',
                        value: 0,
                        bigint: '0n',
                        start: 0,
                        end: 2,
                        trailingComments: [
                            {
                                type: 'Block',
                                value: ' BigInt ',
                                start: 3,
                                end: 15
                            }
                        ],
                        raw: '0n'
                    },
                    right: {
                        type: 'Literal',
                        value: 1,
                        start: 19,
                        end: 20,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' BigInt ',
                                start: 3,
                                end: 15
                            }
                        ],
                        raw: '1'
                    },
                    operator: '<=',
                    start: 0,
                    end: 20
                },
                start: 0,
                end: 20
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 20,
        comments: [
            {
                type: 'Block',
                value: ' BigInt ',
                start: 3,
                end: 15
            }
        ]
    }
  });

    pass(`leading comment in body`, {
    source: `var o = {

      test(arg//an arg
      ,arg2//arg2
      ,arg3//arg3
        // arg33
      )//comment
    //comment2
    {
          console.log(arg)
      }
  } `,
    raw: true,
    next: true,
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
                                        type: 'Identifier',
                                        name: 'test',
                                        start: 17,
                                        end: 21
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [
                                            {
                                                type: 'Identifier',
                                                name: 'arg',
                                                start: 22,
                                                end: 25,
                                                trailingComments: [
                                                    {
                                                        type: 'Line',
                                                        value: 'an arg',
                                                        start: 25,
                                                        end: 33
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'arg2',
                                                start: 41,
                                                end: 45,
                                                leadingComments: [
                                                    {
                                                        type: 'Line',
                                                        value: 'an arg',
                                                        start: 25,
                                                        end: 33
                                                    }
                                                ],
                                                trailingComments: [
                                                    {
                                                        type: 'Line',
                                                        value: 'arg2',
                                                        start: 45,
                                                        end: 51
                                                    }
                                                ]
                                            },
                                            {
                                                type: 'Identifier',
                                                name: 'arg3',
                                                start: 59,
                                                end: 63,
                                                leadingComments: [
                                                    {
                                                        type: 'Line',
                                                        value: 'an arg',
                                                        start: 25,
                                                        end: 33
                                                    },
                                                    {
                                                        type: 'Line',
                                                        value: 'arg2',
                                                        start: 45,
                                                        end: 51
                                                    }
                                                ],
                                                trailingComments: [
                                                    {
                                                        type: 'Line',
                                                        value: 'arg3',
                                                        start: 63,
                                                        end: 69
                                                    },
                                                    {
                                                        type: 'Line',
                                                        value: ' arg33',
                                                        start: 78,
                                                        end: 86
                                                    }
                                                ]
                                            }
                                        ],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ExpressionStatement',
                                                    expression: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'MemberExpression',
                                                            object: {
                                                                type: 'Identifier',
                                                                name: 'console',
                                                                start: 135,
                                                                end: 142
                                                            },
                                                            computed: false,
                                                            property: {
                                                                type: 'Identifier',
                                                                name: 'log',
                                                                start: 143,
                                                                end: 146
                                                            },
                                                            start: 135,
                                                            end: 146
                                                        },
                                                        arguments: [
                                                            {
                                                                type: 'Identifier',
                                                                name: 'arg',
                                                                start: 147,
                                                                end: 150
                                                            }
                                                        ],
                                                        start: 135,
                                                        end: 151
                                                    },
                                                    start: 135,
                                                    end: 151
                                                }
                                            ],
                                            start: 123,
                                            end: 159,
                                            leadingComments: [
                                                {
                                                    type: 'Line',
                                                    value: 'arg3',
                                                    start: 63,
                                                    end: 69
                                                },
                                                {
                                                    type: 'Line',
                                                    value: ' arg33',
                                                    start: 78,
                                                    end: 86
                                                },
                                                {
                                                    type: 'Line',
                                                    value: 'comment',
                                                    start: 94,
                                                    end: 103
                                                },
                                                {
                                                    type: 'Line',
                                                    value: 'comment2',
                                                    start: 108,
                                                    end: 118
                                                }
                                            ]
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 21,
                                        end: 159
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 17,
                                    end: 159
                                }
                            ],
                            start: 8,
                            end: 163
                        },
                        id: {
                            type: 'Identifier',
                            name: 'o',
                            start: 4,
                            end: 5
                        },
                        start: 4,
                        end: 163
                    }
                ],
                kind: 'var',
                start: 0,
                end: 163
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 164,
        comments: [
            {
                type: 'Line',
                value: 'an arg',
                start: 25,
                end: 33
            },
            {
                type: 'Line',
                value: 'arg2',
                start: 45,
                end: 51
            },
            {
                type: 'Line',
                value: 'arg3',
                start: 63,
                end: 69
            },
            {
                type: 'Line',
                value: ' arg33',
                start: 78,
                end: 86
            },
            {
                type: 'Line',
                value: 'comment',
                start: 94,
                end: 103
            },
            {
                type: 'Line',
                value: 'comment2',
                start: 108,
                end: 118
            }
        ]
    }
  });

    pass(`inside JSX`, {
    source: `<div>{/* foo */}</div>`,
    raw: true,
    next: true,
    jsx: true,
    attachComment: true,
    expected: {
        body: [
          {
            end: 22,
            expression: {
              children: [
                {
                  end: 16,
                  expression: {
                    end: 6,
                    start: 5,
                    trailingComments: [
                      {
                        end: 15,
                        start: 6,
                        type: 'Block',
                        value: ' foo ',
                      }
                    ],
                    type: 'JSXEmptyExpression',
                  },
                  start: 5,
                  type: 'JSXExpressionContainer'
                }
              ],
              closingElement: {
                end: 22,
                name: {
                  end: 21,
                  name: 'div',
                  start: 18,
                  type: 'JSXIdentifier',
                },
                start: 16,
                type: 'JSXClosingElement',
              },
              end: 22,
              openingElement: {
                attributes: [],
                end: 5,
                name: {
                  end: 4,
                 name: 'div',
                 start: 1,
                  type: 'JSXIdentifier',
                },
                selfClosing: false,
                start: 0,
                type: 'JSXOpeningElement',
              },
              start: 0,
              type: 'JSXElement',
            },
           start: 0,
            type: 'ExpressionStatement',
          },
        ],
        comments: [
                {
                  end: 15,
                  start: 6,
                  type: 'Block',
                  value: ' foo ',
                },
              ],
        end: 22,
        sourceType: 'script',
        start: 0,
        type: 'Program',
      },
  });

    pass(`object spread`, {
    source: `var o = /* assign */ { *method() { return {...yield /* multiple spread */, y: 1, ...yield}; } } /* the */ // end`,
    raw: true,
    next: true,
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
                                        type: 'Identifier',
                                        name: 'method',
                                        start: 24,
                                        end: 30
                                    },
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [
                                                {
                                                    type: 'ReturnStatement',
                                                    argument: {
                                                        type: 'ObjectExpression',
                                                        properties: [
                                                            {
                                                                type: 'SpreadElement',
                                                                argument: {
                                                                    type: 'YieldExpression',
                                                                    argument: null,
                                                                    delegate: false,
                                                                    start: 46,
                                                                    end: 51
                                                                },
                                                                start: 43,
                                                                end: 51,
                                                                trailingComments: [
                                                                    {
                                                                        type: 'Block',
                                                                        value: ' multiple spread ',
                                                                        start: 52,
                                                                        end: 73
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                type: 'Property',
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'y',
                                                                    start: 75,
                                                                    end: 76
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    value: 1,
                                                                    start: 78,
                                                                    end: 79,
                                                                    raw: '1'
                                                                },
                                                                kind: 'init',
                                                                computed: false,
                                                                method: false,
                                                                shorthand: false,
                                                                start: 75,
                                                                end: 79,
                                                                leadingComments: [
                                                                    {
                                                                        type: 'Block',
                                                                        value: ' multiple spread ',
                                                                        start: 52,
                                                                        end: 73
                                                                    }
                                                                ]
                                                            },
                                                            {
                                                                type: 'SpreadElement',
                                                                argument: {
                                                                    type: 'YieldExpression',
                                                                    argument: null,
                                                                    delegate: false,
                                                                    start: 84,
                                                                    end: 89
                                                                },
                                                                start: 81,
                                                                end: 89
                                                            }
                                                        ],
                                                        start: 42,
                                                        end: 90
                                                    },
                                                    start: 35,
                                                    end: 91
                                                }
                                            ],
                                            start: 33,
                                            end: 93
                                        },
                                        async: false,
                                        generator: true,
                                        expression: false,
                                        id: null,
                                        start: 30,
                                        end: 93
                                    },
                                    kind: 'init',
                                    computed: false,
                                    method: true,
                                    shorthand: false,
                                    start: 23,
                                    end: 93
                                }
                            ],
                            start: 21,
                            end: 95,
                            leadingComments: [
                                {
                                    type: 'Block',
                                    value: ' assign ',
                                    start: 8,
                                    end: 20
                                }
                            ]
                        },
                        id: {
                            type: 'Identifier',
                            name: 'o',
                            start: 4,
                            end: 5
                        },
                        start: 4,
                        end: 95
                    }
                ],
                kind: 'var',
                start: 0,
                end: 95,
                trailingComments: [
                    {
                        type: 'Block',
                        value: ' the ',
                        start: 96,
                        end: 105
                    },
                    {
                        type: 'Line',
                        value: ' end',
                        start: 106,
                        end: 112
                    }
                ]
            }
        ],
        sourceType: 'script',
        start: 0,
        end: 112,
        comments: [
            {
                type: 'Block',
                value: ' assign ',
                start: 8,
                end: 20
            },
            {
                type: 'Block',
                value: ' multiple spread ',
                start: 52,
                end: 73
            },
            {
                type: 'Block',
                value: ' the ',
                start: 96,
                end: 105
            },
            {
                type: 'Line',
                value: ' end',
                start: 106,
                end: 112
            }
        ]
    }
  });

    });
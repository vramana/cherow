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
                                            end: 80,
                                            leadingComments: null
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
                                            end: 152,
                                            leadingComments: null
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
                                            end: 193,
                                            leadingComments: null
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
            sourceType: 'script'
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
                                        start: 55,
                                        end: 60,
                                        leadingComments: null
                                    },
                                    arguments: [
                                        {
                                            type: 'Literal',
                                            value: 'hello',
                                            start: 61,
                                            end: 68,
                                            raw: '\'hello\''
                                        }
                                    ],
                                    start: 55,
                                    end: 69,
                                    leadingComments: null
                                },
                                start: 55,
                                end: 70,
                                leadingComments: null
                            }
                        ],
                        start: 45,
                        end: 76,
                        leadingComments: [
                            {
                                type: 'Line',
                                value: ' Leading to if-block',
                                start: 18,
                                end: 40
                            }
                        ],
                        trailingComments: null
                    },
                    start: 0,
                    end: 76,
                    trailingComments: [
                        {
                            type: 'Line',
                            value: ' Trailing to if-block',
                            start: 80,
                            end: 103
                        }
                    ]
                }
            ],
            sourceType: 'script'
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
                                            start: 196,
                                            end: 198,
                                            raw: '20'
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'i',
                                            start: 192,
                                            end: 193,
                                            leadingComments: null
                                        },
                                        start: 192,
                                        end: 198,
                                        leadingComments: null
                                    }
                                ],
                                kind: 'var',
                                start: 188,
                                end: 199,
                                leadingComments: [
                                    {
                                        type: 'Block',
                                        value: '\n             * Leading comment\n             ',
                                        start: 30,
                                        end: 79
                                    },
                                    {
                                        type: 'Block',
                                        value: '\n             *\n             * Leading comment 2\n             *\n             ',
                                        start: 93,
                                        end: 174
                                    }
                                ],
                                trailingComments: [
                                    {
                                        type: 'Block',
                                        value: '\n             * Trailing comment\n             ',
                                        start: 212,
                                        end: 262
                                    },
                                    {
                                        type: 'Block',
                                        value: '\n             *\n             * Trailing comment 2\n             *\n             ',
                                        start: 276,
                                        end: 358
                                    }
                                ]
                            }
                        ],
                        start: 16,
                        end: 368
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
                    end: 368
                }
            ],
            sourceType: 'script'
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
            sourceType: 'script'
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
                        start: 23,
                        end: 25,
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
                    end: 25
                },
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [],
                        start: 38,
                        end: 40
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'e',
                            start: 55,
                            end: 56
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 57,
                            end: 59,
                            trailingComments: null
                        },
                        start: 49,
                        end: 59,
                        trailingComments: [
                            {
                                type: 'Line',
                                value: '',
                                start: 59,
                                end: 61
                            }
                        ]
                    },
                    finalizer: {
                        type: 'BlockStatement',
                        body: [],
                        start: 77,
                        end: 79,
                        leadingComments: [
                            {
                                type: 'Line',
                                value: '',
                                start: 59,
                                end: 61
                            }
                        ]
                    },
                    start: 35,
                    end: 79
                },
                {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'TryStatement',
                            block: {
                                type: 'BlockStatement',
                                body: [],
                                start: 102,
                                end: 104
                            },
                            handler: {
                                type: 'CatchClause',
                                param: {
                                    type: 'Identifier',
                                    name: 'e',
                                    start: 119,
                                    end: 120
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 121,
                                    end: 123,
                                    trailingComments: null
                                },
                                start: 113,
                                end: 123,
                                trailingComments: [
                                    {
                                        type: 'Line',
                                        value: '',
                                        start: 123,
                                        end: 125
                                    }
                                ]
                            },
                            finalizer: {
                                type: 'BlockStatement',
                                body: [],
                                start: 141,
                                end: 143,
                                leadingComments: [
                                    {
                                        type: 'Line',
                                        value: '',
                                        start: 123,
                                        end: 125
                                    }
                                ]
                            },
                            start: 99,
                            end: 143
                        }
                    ],
                    start: 89,
                    end: 153
                }
            ],
            sourceType: 'script'
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
                        end: 15,
                        trailingComments: [
                            {
                                type: 'Line',
                                value: '',
                                start: 19,
                                end: 21
                            }
                        ]
                    },
                    handler: null,
                    finalizer: {
                        type: 'BlockStatement',
                        body: [],
                        start: 38,
                        end: 49,
                        leadingComments: [
                            {
                                type: 'Line',
                                value: '',
                                start: 19,
                                end: 21
                            }
                        ]
                    },
                    start: 0,
                    end: 49
                },
                {
                    type: 'TryStatement',
                    block: {
                        type: 'BlockStatement',
                        body: [],
                        start: 62,
                        end: 73
                    },
                    handler: {
                        type: 'CatchClause',
                        param: {
                            type: 'Identifier',
                            name: 'e',
                            start: 81,
                            end: 82
                        },
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 84,
                            end: 95
                        },
                        start: 74,
                        end: 95
                    },
                    finalizer: {
                        type: 'BlockStatement',
                        body: [],
                        start: 104,
                        end: 115
                    },
                    start: 58,
                    end: 115
                },
                {
                    type: 'BlockStatement',
                    body: [
                        {
                            type: 'TryStatement',
                            block: {
                                type: 'BlockStatement',
                                body: [],
                                start: 142,
                                end: 157
                            },
                            handler: {
                                type: 'CatchClause',
                                param: {
                                    type: 'Identifier',
                                    name: 'e',
                                    start: 165,
                                    end: 166
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 168,
                                    end: 183
                                },
                                start: 158,
                                end: 183
                            },
                            finalizer: {
                                type: 'BlockStatement',
                                body: [],
                                start: 192,
                                end: 207
                            },
                            start: 138,
                            end: 207
                        }
                    ],
                    start: 124,
                    end: 217
                }
            ],
            sourceType: 'script'
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
                                            start: 93,
                                            end: 96,
                                            leadingComments: null,
                                            raw: '\'a\''
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '1',
                                            start: 98,
                                            end: 101,
                                            raw: '\'1\''
                                        },
                                        kind: 'init',
                                        computed: true,
                                        method: false,
                                        shorthand: false,
                                        start: 92,
                                        end: 101,
                                        leadingComments: [
                                            {
                                                type: 'Block',
                                                value: '*\n             * Before bracket init\n             ',
                                                start: 25,
                                                end: 79
                                            }
                                        ]
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'b',
                                            start: 183,
                                            end: 186,
                                            leadingComments: [
                                                {
                                                    type: 'Block',
                                                    value: '\n             * Inside bracket init\n             ',
                                                    start: 117,
                                                    end: 170
                                                }
                                            ],
                                            raw: '\'b\''
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '2',
                                            start: 188,
                                            end: 191,
                                            raw: '\'2\''
                                        },
                                        kind: 'init',
                                        computed: true,
                                        method: false,
                                        shorthand: false,
                                        start: 116,
                                        end: 191
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'c',
                                            start: 207,
                                            end: 210,
                                            trailingComments: [
                                                {
                                                    type: 'Block',
                                                    value: '\n              * After bracket key\n              ',
                                                    start: 224,
                                                    end: 277
                                                }
                                            ],
                                            raw: '\'c\''
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '3',
                                            start: 279,
                                            end: 282,
                                            leadingComments: [
                                                {
                                                    type: 'Block',
                                                    value: '\n              * After bracket key\n              ',
                                                    start: 224,
                                                    end: 277
                                                }
                                            ],
                                            raw: '\'3\''
                                        },
                                        kind: 'init',
                                        computed: true,
                                        method: false,
                                        shorthand: false,
                                        start: 206,
                                        end: 282
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'd',
                                            start: 359,
                                            end: 362,
                                            leadingComments: null,
                                            raw: '\'d\''
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '4',
                                            start: 364,
                                            end: 367,
                                            raw: '\'4\''
                                        },
                                        kind: 'init',
                                        computed: true,
                                        method: false,
                                        shorthand: false,
                                        start: 341,
                                        end: 367,
                                        leadingComments: [
                                            {
                                                type: 'Line',
                                                value: ' Before bracket, line comment',
                                                start: 297,
                                                end: 328
                                            }
                                        ]
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'e',
                                            start: 448,
                                            end: 451,
                                            leadingComments: [
                                                {
                                                    type: 'Line',
                                                    value: ' Inside bracket, line comment',
                                                    start: 400,
                                                    end: 431
                                                }
                                            ],
                                            raw: '\'e\''
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '5',
                                            start: 453,
                                            end: 456,
                                            raw: '\'5\''
                                        },
                                        kind: 'init',
                                        computed: true,
                                        method: false,
                                        shorthand: false,
                                        start: 382,
                                        end: 456
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Literal',
                                            value: 'f',
                                            start: 472,
                                            end: 475,
                                            trailingComments: [
                                                {
                                                    type: 'Line',
                                                    value: ' After bracket, line comment',
                                                    start: 490,
                                                    end: 520
                                                }
                                            ],
                                            raw: '\'f\''
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: '6',
                                            start: 539,
                                            end: 542,
                                            leadingComments: [
                                                {
                                                    type: 'Line',
                                                    value: ' After bracket, line comment',
                                                    start: 490,
                                                    end: 520
                                                }
                                            ],
                                            raw: '\'6\''
                                        },
                                        kind: 'init',
                                        computed: true,
                                        method: false,
                                        shorthand: false,
                                        start: 471,
                                        end: 542
                                    }
                                ],
                                start: 11,
                                end: 552
                            },
                            id: {
                                type: 'Identifier',
                                name: 'test',
                                start: 4,
                                end: 8
                            },
                            start: 4,
                            end: 552
                        }
                    ],
                    kind: 'var',
                    start: 0,
                    end: 553
                }
            ],
            sourceType: 'script'
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
            sourceType: 'script'
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
                                    start: 40,
                                    end: 45,
                                    leadingComments: null
                                },
                                arguments: [
                                    {
                                        type: 'Literal',
                                        value: 'hello',
                                        start: 46,
                                        end: 53,
                                        raw: '\'hello\''
                                    }
                                ],
                                start: 40,
                                end: 54,
                                leadingComments: null
                            },
                            start: 40,
                            end: 55,
                            leadingComments: null
                        }
                    ],
                    start: 28,
                    end: 65,
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
            sourceType: 'script'
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
                                            start: 100,
                                            end: 102,
                                            raw: '20'
                                        },
                                        id: {
                                            type: 'Identifier',
                                            name: 'i',
                                            start: 96,
                                            end: 97,
                                            leadingComments: null
                                        },
                                        start: 96,
                                        end: 102,
                                        leadingComments: null
                                    }
                                ],
                                kind: 'var',
                                start: 92,
                                end: 103,
                                leadingComments: [
                                    {
                                        type: 'Block',
                                        value: '\n             * this is comment\n             ',
                                        start: 30,
                                        end: 79
                                    }
                                ]
                            }
                        ],
                        start: 16,
                        end: 115
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
                    end: 115
                }
            ],
            sourceType: 'script'
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
                                    start: 14,
                                    end: 15
                                },
                                arguments: [],
                                start: 14,
                                end: 17
                            },
                            start: 14,
                            end: 18,
                            trailingComments: [
                                {
                                    type: 'Line',
                                    value: 'comment',
                                    start: 31,
                                    end: 40
                                }
                            ]
                        }
                    ],
                    start: 0,
                    end: 50
                }
            ],
            sourceType: 'script'
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
                                start: 50,
                                end: 51,
                                leadingComments: null
                            },
                            consequent: [],
                            start: 45,
                            end: 52,
                            leadingComments: [
                                {
                                    type: 'Line',
                                    value: ' foo',
                                    start: 26,
                                    end: 32
                                }
                            ],
                            trailingComments: [
                                {
                                    type: 'Line',
                                    value: ' falls through',
                                    start: 69,
                                    end: 85
                                }
                            ]
                        },
                        {
                            type: 'SwitchCase',
                            test: {
                                type: 'Literal',
                                value: 2,
                                start: 103,
                                end: 104,
                                leadingComments: null
                            },
                            consequent: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'CallExpression',
                                        callee: {
                                            type: 'Identifier',
                                            name: 'doIt',
                                            start: 122,
                                            end: 126
                                        },
                                        arguments: [],
                                        start: 122,
                                        end: 128
                                    },
                                    start: 122,
                                    end: 129
                                }
                            ],
                            start: 98,
                            end: 129,
                            leadingComments: [
                                {
                                    type: 'Line',
                                    value: ' falls through',
                                    start: 69,
                                    end: 85
                                }
                            ]
                        }
                    ],
                    start: 0,
                    end: 139
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`HTML single line comment (<!--)`, {
        source: `foo \n--> `,
        raw: true,
        comments: [],
        attachComment: true,
        expected: {
              body: [
                {
                  end: 3,
                  expression: {
                    end: 3,
                    name: 'foo',
                    start: 0,
                    trailingComments: null,
                    type: 'Identifier'
                  },
                  start: 0,
                 trailingComments: [
                    {
                      end: 9,
                      start: 5,
                      type: 'Line',
                      value: ' '
                    }
                  ],
                type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
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
                                start: 30,
                                end: 31
                            },
                            consequent: [
                                {
                                    type: 'BreakStatement',
                                    label: null,
                                    start: 49,
                                    end: 55,
                                    trailingComments: null
                                }
                            ],
                            start: 25,
                            end: 55,
                            trailingComments: [
                                {
                                    type: 'Line',
                                    value: 'no default',
                                    start: 68,
                                    end: 80
                                }
                            ]
                        }
                    ],
                    start: 0,
                    end: 90
                }
            ],
            sourceType: 'script'
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
                                    start: 58,
                                    end: 60,
                                    leadingComments: null
                                },
                                start: 52,
                                end: 61,
                                leadingComments: [
                                    {
                                        type: 'Block',
                                        value: ' before ',
                                        start: 27,
                                        end: 39
                                    }
                                ],
                                trailingComments: [
                                    {
                                        type: 'Block',
                                        value: ' after ',
                                        start: 74,
                                        end: 85
                                    }
                                ]
                            }
                        ],
                        start: 13,
                        end: 95
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
                    end: 95
                }
            ],
            sourceType: 'script'
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
                                    start: 38,
                                    end: 39
                                },
                                cases: [
                                    {
                                        type: 'SwitchCase',
                                        test: {
                                            type: 'Literal',
                                            value: 2,
                                            start: 64,
                                            end: 65,
                                            raw: '2'
                                        },
                                        consequent: [
                                            {
                                                type: 'BreakStatement',
                                                label: null,
                                                start: 87,
                                                end: 93
                                            }
                                        ],
                                        start: 59,
                                        end: 93
                                    },
                                    {
                                        type: 'SwitchCase',
                                        test: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 115,
                                            end: 116,
                                            raw: '1'
                                        },
                                        consequent: [
                                            {
                                                type: 'BreakStatement',
                                                label: null,
                                                start: 138,
                                                end: 144,
                                                trailingComments: null
                                            }
                                        ],
                                        start: 110,
                                        end: 144,
                                        trailingComments: [
                                            {
                                                type: 'Line',
                                                value: 'no default',
                                                start: 161,
                                                end: 173
                                            }
                                        ]
                                    }
                                ],
                                start: 30,
                                end: 187
                            }
                        ],
                        start: 16,
                        end: 197
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
                    end: 197
                }
            ],
            sourceType: 'script'
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
                                    end: 33,
                                    leadingComments: null
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
                        end: 15,
                        leadingComments: null
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
            sourceType: 'script'
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
                                            start: 35,
                                            end: 37,
                                            leadingComments: null
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: null,
                                            start: 39,
                                            end: 43,
                                            raw: 'null'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 35,
                                        end: 43,
                                        leadingComments: null
                                    },
                                    {
                                        type: 'Property',
                                        key: {
                                            type: 'Identifier',
                                            name: 'p3',
                                            start: 57,
                                            end: 59
                                        },
                                        value: {
                                            type: 'Literal',
                                            value: null,
                                            start: 61,
                                            end: 65,
                                            raw: 'null'
                                        },
                                        kind: 'init',
                                        computed: false,
                                        method: false,
                                        shorthand: false,
                                        start: 57,
                                        end: 65
                                    }
                                ],
                                start: 21,
                                end: 75,
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
                        end: 76
                    },
                    start: 0,
                    end: 77
                }
            ],
            sourceType: 'script'
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
                                start: 55,
                                end: 56,
                                raw: '5'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'a',
                                start: 51,
                                end: 52,
                                leadingComments: null
                            },
                            start: 51,
                            end: 56,
                            leadingComments: null
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 6,
                                start: 132,
                                end: 133,
                                raw: '6'
                            },
                            id: {
                                type: 'Identifier',
                                name: 'b',
                                start: 128,
                                end: 129,
                                leadingComments: null
                            },
                            start: 128,
                            end: 133,
                            leadingComments: [
                                {
                                    type: 'Block',
                                    value: '*\n            * @type {number}\n            ',
                                    start: 69,
                                    end: 116
                                }
                            ]
                        }
                    ],
                    kind: 'var',
                    start: 47,
                    end: 134,
                    leadingComments: [
                        {
                            type: 'Block',
                            value: '*\n        * @type {number}\n        ',
                            start: 0,
                            end: 39
                        }
                    ]
                }
            ],
            sourceType: 'script'
        }
    });

    pass(`HTML (not comment)`, {
        source: `/* not comment*/; i-->0`,
        raw: true,
        comments: [],
        attachComment: true,
        expected: {
              body: [
                {
                  end: 17,
                  leadingComments: [
                    {
                      end: 16,
                      start: 0,
                      type: 'Block',
                      value: ' not comment'
                    }
                  ],
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
                        name: 'i',
                        start: 18,
                        type: 'Identifier'
                      },
                      end: 21,
                      operator: '--',
                      prefix: false,
                      start: 18,
                      type: 'UpdateExpression'
                    },
                    operator: '>',
                    right: {
                      end: 23,
                      raw: '0',
                      start: 22,
                      type: 'Literal',
                      value: 0,
                    },
                   start: 18,
                    type: 'BinaryExpression',
                  },
                  start: 18,
                 type: 'ExpressionStatement',
                },
              ],
              sourceType: 'script',
              type: 'Program',
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
                                    leadingComments: null,
                                    raw: 'true'
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 43,
                                    end: 46,
                                    trailingComments: null
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
                                            end: 65,
                                            leadingComments: null
                                        },
                                        start: 61,
                                        end: 65,
                                        leadingComments: null
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
            sourceType: 'script'
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
                        start: 11,
                        end: 13,
                        leadingComments: null,
                        raw: '42'
                    },
                    start: 11,
                    end: 13,
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
            sourceType: 'script'
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
                        trailingComments: null,
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
            sourceType: 'script'
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
            sourceType: 'script'
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
                        trailingComments: null,
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
            sourceType: 'script'
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
                        start: 16,
                        end: 18,
                        leadingComments: null,
                        raw: '42'
                    },
                    start: 16,
                    end: 18,
                    leadingComments: [
                        {
                            type: 'Block',
                            value: 'a\n        c',
                            start: 0,
                            end: 15
                        }
                    ]
                }
            ],
            sourceType: 'script'
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
                                    start: 64,
                                    end: 66,
                                    leadingComments: null
                                },
                                value: {
                                    type: 'Literal',
                                    value: null,
                                    start: 68,
                                    end: 72,
                                    raw: 'null'
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 64,
                                end: 72,
                                leadingComments: [
                                    {
                                        type: 'Block',
                                        value: ' comment 2 ',
                                        start: 32,
                                        end: 47
                                    }
                                ]
                            }
                        ],
                        start: 14,
                        end: 86,
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
                    end: 87
                }
            ],
            sourceType: 'script'
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
                                        start: 52,
                                        end: 55,
                                        leadingComments: null
                                    },
                                    arguments: [],
                                    start: 52,
                                    end: 57,
                                    leadingComments: null
                                },
                                start: 52,
                                end: 58,
                                leadingComments: [
                                    {
                                        type: 'Block',
                                        value: ' before ',
                                        start: 27,
                                        end: 39
                                    }
                                ],
                                trailingComments: [
                                    {
                                        type: 'Block',
                                        value: ' after ',
                                        start: 71,
                                        end: 82
                                    }
                                ]
                            }
                        ],
                        start: 13,
                        end: 92
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
                    end: 92
                }
            ],
            sourceType: 'script'
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
                        end: 15,
                        leadingComments: null
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
            sourceType: 'script'
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
                                    end: 34,
                                    leadingComments: null
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
                        end: 15,
                        leadingComments: null
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
            sourceType: 'script'
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
                                innerComments: [
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
            sourceType: 'script'
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
                                innerComments: [
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
            sourceType: 'script'
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
                        end: 14,
                        trailingComments: [
                            {
                                type: 'Line',
                                value: ' LINE',
                                start: 16,
                                end: 23
                            }
                        ]
                    },
                    test: {
                        type: 'Literal',
                        value: true,
                        start: 39,
                        end: 43,
                        leadingComments: [
                            {
                                type: 'Line',
                                value: ' LINE',
                                start: 16,
                                end: 23
                            }
                        ],
                        raw: 'true'
                    },
                    start: 0,
                    end: 45
                }
            ],
            sourceType: 'module'
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
                                        start: 115,
                                        end: 122,
                                        leadingComments: null
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 124,
                                            end: 143
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 122,
                                        end: 143
                                    },
                                    static: false,
                                    start: 115,
                                    end: 143,
                                    leadingComments: [
                                        {
                                            type: 'Block',
                                            value: '*\n                 * this is method1.\n                 ',
                                            start: 39,
                                            end: 98
                                        }
                                    ]
                                }
                            ],
                            start: 21,
                            end: 157
                        },
                        start: 15,
                        end: 157
                    },
                    start: 0,
                    end: 157
                }
            ],
            sourceType: 'module'
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
                        start: 33,
                        end: 34,
                        leadingComments: [
                            {
                                type: 'Block',
                                value: ' bar ',
                                start: 22,
                                end: 31
                            }
                        ]
                    },
                    alternate: null,
                    consequent: {
                        type: 'BlockStatement',
                        body: [],
                        start: 36,
                        end: 38
                    },
                    start: 18,
                    end: 38,
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
            sourceType: 'module'
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
                                        start: 144,
                                        end: 151,
                                        leadingComments: null
                                    },
                                    kind: 'method',
                                    computed: false,
                                    value: {
                                        type: 'FunctionExpression',
                                        params: [],
                                        body: {
                                            type: 'BlockStatement',
                                            body: [],
                                            start: 153,
                                            end: 165
                                        },
                                        async: false,
                                        generator: false,
                                        expression: false,
                                        id: null,
                                        start: 151,
                                        end: 165
                                    },
                                    static: false,
                                    start: 144,
                                    end: 165,
                                    leadingComments: [
                                        {
                                            type: 'Block',
                                            value: '*\n          * this is method1.\n          ',
                                            start: 89,
                                            end: 134
                                        }
                                    ]
                                }
                            ],
                            start: 78,
                            end: 174,
                            leadingComments: null
                        },
                        start: 72,
                        end: 174,
                        leadingComments: null
                    },
                    start: 57,
                    end: 174,
                    leadingComments: [
                        {
                            type: 'Block',
                            value: '*\n        * this is anonymous class.\n        ',
                            start: 0,
                            end: 49
                        }
                    ]
                }
            ],
            sourceType: 'module'
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
              body: [
                {
                  async: false,
                 body: {
                    body: [
                      {
                        end: 61,
                        leadingComments: [
                          {
                            end: 39,
                            start: 27,
                            type: 'Block',
                            value: ' before '
                          }
                       ],
                        start: 52,
                        trailingComments: [
                          {
                            end: 85,
                            start: 74,
                            type: 'Block',
                            value: ' after ',
                          },
                        ],
                        type: 'DebuggerStatement'
                     }
                    ],
                    end: 95,
                    start: 13,
                    type: 'BlockStatement'
                  },
                  end: 95,
                  expression: false,
                  generator: false,
                  id: {
                    end: 10,
                    name: 'a',
                    start: 9,
                    type: 'Identifier',
                  },
                  params: [],
                  start: 0,
                 type: 'FunctionDeclaration',
                },
              ],
              sourceType: 'script',
              type: 'Program'
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
              body: [
                {
                  async: false,
                  body: {
                    body: [
                      {
                        argument: null,
                        end: 59,
                        leadingComments: [
                          {
                            end: 39,
                            start: 27,
                           type: 'Block',
                            value: ' before '
                          }
                        ],
                        start: 52,
                        trailingComments: [
                          {
                           end: 83,
                            start: 72,
                            type: 'Block',
                            value: ' after '
                          }
                        ],
                        type: 'ReturnStatement'
                      }
                   ],
                    end: 93,
                    start: 13,
                   type: 'BlockStatement'
                  },
                  end: 93,
                  expression: false,
                  generator: false,
                  id: {
                    end: 10,
                    name: 'a',
                    start: 9,
                    type: 'Identifier'
                  },
                 params: [],
                  start: 0,
                  type: 'FunctionDeclaration'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`function trailing comma shorthand`, {
        source: `fn(a, { b }, /* comment */);`,
        raw: true,
        comments: [],
        attachComment: true,
        expected: {
              body: [
                {
                  end: 28,
                  expression: {
                   arguments: [
                      {
                        end: 4,
                        name: 'a',
                        start: 3,
                        type: 'Identifier'
                      },
                     {
                        end: 11,
                        properties: [
                          {
                            computed: false,
                            end: 9,
                            key: {
                              end: 9,
                              name: 'b',
                              start: 8,
                              type: 'Identifier'
                           },
                            kind: 'init',
                            method: false,
                            shorthand: true,
                            start: 8,
                            type: 'Property',
                            value: {
                              end: 9,
                              name: 'b',
                              start: 8,
                              type: 'Identifier'
                            }
                          }
                        ],
                        start: 6,
                        trailingComments: [
                          {
                           end: 26,
                            start: 13,
                           type: 'Block',
                            value: ' comment '
                          }
                        ],
                        type: 'ObjectExpression'
                      }
                    ],
                    callee: {
                      end: 2,
                      name: 'fn',
                      start: 0,
                      type: 'Identifier'
                    },
                    end: 27,
                    start: 0,
                   type: 'CallExpression'
                  },
                  start: 0,
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
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
                  body: [
                    {
                      async: false,
                      body: {
                        body: [],
                        end: 61,
                        innerComments: [
                         {
                            end: 47,
                            start: 31,
                            type: 'Line',
                            value: ' Inner comment'
                          },
                        ],
                        start: 13,
                        type: 'BlockStatement'
                      },
                      end: 61,
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
                  sourceType: 'script',
                  type: 'Program'
                }
        });
    });
import { pass, fail } from '../test-utils';
import { parseScript } from '../../src/cherow';

describe('Miscellaneous - Chinese', () => {

    pass(`class 𢭃 { /* 𢭃 */ }`, {
        source: 'class 𢭃 { /* 𢭃 */ }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: '𢭃',
                        start: 6,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 6
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [],
                        start: 9,
                        end: 21,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 21
                            }
                        }
                    },
                    start: 0,
                    end: 21,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 21
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 21,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 21
                }
            }
        }
    });

    pass(`class ā { 𢭃(物) { /* 𢭃 */ } static 飲(物) { /* 𢭃 */ } async 知(物) { /* 𢭃 */ } static async 愛(物) { /* 𢭃 */ } *泳(物) { /* 𢭃 */ } static *赤(物) { /* 𢭃 */ } get 青() { /* 𢭃 */ } set 緑(物) { /* 𢭃 */ } }`, {
        source: 'class ā { 𢭃(物) { /* 𢭃 */ } static 飲(物) { /* 𢭃 */ } async 知(物) { /* 𢭃 */ } static async 愛(物) { /* 𢭃 */ } *泳(物) { /* 𢭃 */ } static *赤(物) { /* 𢭃 */ } get 青() { /* 𢭃 */ } set 緑(物) { /* 𢭃 */ } }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ClassDeclaration',
                    id: {
                        type: 'Identifier',
                        name: 'ā',
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
                        }
                    },
                    superClass: null,
                    body: {
                        type: 'ClassBody',
                        body: [
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '𢭃',
                                    start: 10,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '物',
                                            start: 13,
                                            end: 14,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 13
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 14
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 16,
                                        end: 28,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 16
                                            },
                                            end: {
                                                line: 1,
                                                column: 28
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 12,
                                    end: 28,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 12
                                        },
                                        end: {
                                            line: 1,
                                            column: 28
                                        }
                                    }
                                },
                                static: false,
                                start: 10,
                                end: 28,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 28
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '飲',
                                    start: 36,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 36
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '物',
                                            start: 38,
                                            end: 39,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 38
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 39
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 41,
                                        end: 53,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 41
                                            },
                                            end: {
                                                line: 1,
                                                column: 53
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 37,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 37
                                        },
                                        end: {
                                            line: 1,
                                            column: 53
                                        }
                                    }
                                },
                                static: true,
                                start: 29,
                                end: 53,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 29
                                    },
                                    end: {
                                        line: 1,
                                        column: 53
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '知',
                                    start: 60,
                                    end: 61,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 60
                                        },
                                        end: {
                                            line: 1,
                                            column: 61
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '物',
                                            start: 62,
                                            end: 63,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 62
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 63
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 65,
                                        end: 77,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 65
                                            },
                                            end: {
                                                line: 1,
                                                column: 77
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 61,
                                    end: 77,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 61
                                        },
                                        end: {
                                            line: 1,
                                            column: 77
                                        }
                                    }
                                },
                                static: false,
                                start: 54,
                                end: 77,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 54
                                    },
                                    end: {
                                        line: 1,
                                        column: 77
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '愛',
                                    start: 91,
                                    end: 92,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 91
                                        },
                                        end: {
                                            line: 1,
                                            column: 92
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '物',
                                            start: 93,
                                            end: 94,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 93
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 94
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 96,
                                        end: 108,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 96
                                            },
                                            end: {
                                                line: 1,
                                                column: 108
                                            }
                                        }
                                    },
                                    async: true,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 92,
                                    end: 108,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 92
                                        },
                                        end: {
                                            line: 1,
                                            column: 108
                                        }
                                    }
                                },
                                static: true,
                                start: 78,
                                end: 108,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 78
                                    },
                                    end: {
                                        line: 1,
                                        column: 108
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '泳',
                                    start: 110,
                                    end: 111,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 110
                                        },
                                        end: {
                                            line: 1,
                                            column: 111
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '物',
                                            start: 112,
                                            end: 113,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 112
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 113
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 115,
                                        end: 127,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 115
                                            },
                                            end: {
                                                line: 1,
                                                column: 127
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 111,
                                    end: 127,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 111
                                        },
                                        end: {
                                            line: 1,
                                            column: 127
                                        }
                                    }
                                },
                                static: false,
                                start: 109,
                                end: 127,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 109
                                    },
                                    end: {
                                        line: 1,
                                        column: 127
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '赤',
                                    start: 136,
                                    end: 137,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 136
                                        },
                                        end: {
                                            line: 1,
                                            column: 137
                                        }
                                    }
                                },
                                kind: 'method',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '物',
                                            start: 138,
                                            end: 139,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 138
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 139
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 141,
                                        end: 153,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 141
                                            },
                                            end: {
                                                line: 1,
                                                column: 153
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: true,
                                    expression: false,
                                    id: null,
                                    start: 137,
                                    end: 153,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 137
                                        },
                                        end: {
                                            line: 1,
                                            column: 153
                                        }
                                    }
                                },
                                static: true,
                                start: 128,
                                end: 153,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 128
                                    },
                                    end: {
                                        line: 1,
                                        column: 153
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '青',
                                    start: 158,
                                    end: 159,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 158
                                        },
                                        end: {
                                            line: 1,
                                            column: 159
                                        }
                                    }
                                },
                                kind: 'get',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 162,
                                        end: 174,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 162
                                            },
                                            end: {
                                                line: 1,
                                                column: 174
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 159,
                                    end: 174,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 159
                                        },
                                        end: {
                                            line: 1,
                                            column: 174
                                        }
                                    }
                                },
                                static: false,
                                start: 154,
                                end: 174,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 154
                                    },
                                    end: {
                                        line: 1,
                                        column: 174
                                    }
                                }
                            },
                            {
                                type: 'MethodDefinition',
                                key: {
                                    type: 'Identifier',
                                    name: '緑',
                                    start: 179,
                                    end: 180,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 179
                                        },
                                        end: {
                                            line: 1,
                                            column: 180
                                        }
                                    }
                                },
                                kind: 'set',
                                computed: false,
                                value: {
                                    type: 'FunctionExpression',
                                    params: [
                                        {
                                            type: 'Identifier',
                                            name: '物',
                                            start: 181,
                                            end: 182,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 181
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 182
                                                }
                                            }
                                        }
                                    ],
                                    body: {
                                        type: 'BlockStatement',
                                        body: [],
                                        start: 184,
                                        end: 196,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 184
                                            },
                                            end: {
                                                line: 1,
                                                column: 196
                                            }
                                        }
                                    },
                                    async: false,
                                    generator: false,
                                    expression: false,
                                    id: null,
                                    start: 180,
                                    end: 196,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 180
                                        },
                                        end: {
                                            line: 1,
                                            column: 196
                                        }
                                    }
                                },
                                static: false,
                                start: 175,
                                end: 196,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 175
                                    },
                                    end: {
                                        line: 1,
                                        column: 196
                                    }
                                }
                            }
                        ],
                        start: 8,
                        end: 198,
                        loc: {
                            start: {
                                line: 1,
                                column: 8
                            },
                            end: {
                                line: 1,
                                column: 198
                            }
                        }
                    },
                    start: 0,
                    end: 198,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 198
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 198,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 198
                }
            }
        }
    });

    pass(`async (ā,食) => { /* 𢭃 */ }`, {
        source: 'async (ā,食) => { /* 𢭃 */ }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 15,
                            end: 27,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 27
                                }
                            }
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'ā',
                                start: 7,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 7
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            },
                            {
                                type: 'Identifier',
                                name: '食',
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
                                }
                            }
                        ],
                        id: null,
                        async: true,
                        generator: false,
                        expression: false,
                        start: 0,
                        end: 27,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 27
                            }
                        }
                    },
                    start: 0,
                    end: 27,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 27,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            }
        }
    });

    pass(`function* 𢭃(ā,食) { /* 𢭃 */ }`, {
        source: 'function* 𢭃(ā,食) { /* 𢭃 */ }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'ā',
                            start: 13,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 13
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: '食',
                            start: 15,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 15
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 18,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 18
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    async: false,
                    generator: true,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: '𢭃',
                        start: 10,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 12
                            }
                        }
                    },
                    start: 0,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass(`async function 𢭃(ā,食) { /* 𢭃 */ }`, {
        source: 'async function 𢭃(ā,食) { /* 𢭃 */ }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'ā',
                            start: 18,
                            end: 19,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
                                },
                                end: {
                                    line: 1,
                                    column: 19
                                }
                            }
                        },
                        {
                            type: 'Identifier',
                            name: '食',
                            start: 20,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 20
                                },
                                end: {
                                    line: 1,
                                    column: 21
                                }
                            }
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 23,
                        end: 35,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 35
                            }
                        }
                    },
                    async: true,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: '𢭃',
                        start: 15,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 15
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    start: 0,
                    end: 35,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 35,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 35
                }
            }
        }
    });
  });
import { fail, pass } from '../utils';

describe('Statements - Numeric separators', () => {

    fail(`"\\u{12_34}"`, {
        source: '"\\u{12_34}"',
        next: true,
        message: 'Invalid hexadecimal escape sequence',
        line: 1,
        column: 0,
        index: 6
    });

    fail(`"let a\\u{12_34} = 5"`, {
        source: '"let a\\u{12_34} = 5"',
        next: true,
        message: 'Invalid hexadecimal escape sequence',
        line: 1,
        column: 0,
        index: 11
    });

    fail(`"\\u12_34"`, {
        source: '"\\u12_34"',
        next: true,
        message: 'Invalid hexadecimal escape sequence',
        line: 1,
        column: 0,
        index: 5
    });

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true,
        message: 'Numeric separators are not allowed here',
        line: 1,
        column: 0,
        index: 2
    });

    fail(`0x_52`, {
        source: '0x_52',
        next: true,
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 2
    });

    fail(`1_`, {
        source: '1_',
        message: 'Unexpected token',
        line: 1,
        column: 0,
        index: 1
    });

    fail(`3_.1415F;`, {
        source: '3_.1415F;',
        next: true
    });

    fail(`3._1415F;`, {
        source: '3._1415F;',
        next: true
    });

    fail(`0b_`, {
        source: '0b_',
        next: true
    });

    fail(`0b0__0`, {
        source: '0b0__0',
        next: true
    });

    fail(`1__0123456789`, {
        source: '1__0123456789',
        next: true
    });

    fail(`(1_1_)`, {
        source: '(1_1_)',
        next: true
    });

    fail(`(1__1)`, {
        source: '(1__1)',
        next: true
    });

    fail(`(1_1_.1_1)`, {
        source: '(1_1_.1_1)',
        next: true
    });

    fail(`(1_1.1_E1)`, {
        source: '(1_1.1_E1)',
        next: true
    });

    fail(`\\u{10_ffff}`, {
        source: '\\u{10_ffff}',
        next: true
    });

    fail(`0xa_1_`, {
        source: '0xa_1_',
        next: true
    });

    fail(`(0x_a_1)`, {
        source: '(0x_a_1)',
        next: true
    });

    fail(`(0o_1_1)`, {
        source: '(0o_1_1)',
        next: true
    });

    fail(`0x_a_1`, {
        source: '0x_a_1',
        next: true
    });

    fail(`{1_}`, {
        source: '{1_}',
        next: true
    });

    fail(`{1__1}`, {
        source: '{1__1}',
        next: true
    });

    fail(`{0x_1_1_}`, {
        source: '{0x_1_1_}',
        next: true
    });

    fail(`0xZ_1`, {
        source: '0xZ_1',
        next: true
    });

    fail(`[1_1__]`, {
        source: '[1_1__]',
        next: true
    });

    fail(`[1_1.1_e1]`, {
        source: '[1_1.1_e1]',
        next: true
    });

    fail(`[0o_1_1]`, {
        source: '[0o_1_1]',
        next: true
    });

    fail(`1_`, {
        source: '1_',
        next: true
    });

    fail(`0x_1`, {
        source: '0x_1',
        next: true
    });

    fail(`0x0__0`, {
        source: '0x0__0',
        next: true
    });

    fail(`0x0_`, {
        source: '0x0_',
        next: true
    });

    fail(`10_`, {
        source: '10_',
        next: true
    });

    fail(`10__0123456789`, {
        source: '10__0123456789',
        next: true
    });

    fail(`0b_1`, {
        source: '0b_1',
        next: true
    });

    fail(`0b0__0`, {
        source: '0b0__0',
        next: true
    });

    fail(`0b0_`, {
        source: '0b0_',
        next: true
    });
    fail(`10.0_e1`, {
        source: '10.0_e1',
        next: true
    });

    fail(`0.00e0__0`, {
        source: '0.00e0__0',
        next: true
    });

    fail(`0._0e+0`, {
        source: '0._0e+0',
        next: true
    });

    fail(`0_e+0`, {
        source: '0_e+0',
        next: true
    });

    fail(`0e-0__0`, {
        source: '0e-0__0',
        next: true
    });

    fail(`0.0e-_0`, {
        source: '0.0e-_0',
        next: true
    });

    fail(`0__0.0e-0`, {
        source: '0__0.0e-0',
        next: true
    });

    fail(`10._e1`, {
        source: '10._e1',
        next: true
    });

    fail(`1.0e_+10`, {
        source: '1.0e_+10',
        next: true
    });

    fail(`1.0e_-10`, {
        source: '1.0e_-10',
        next: true
    });

    fail(`0.0__0`, {
        source: '0.0__0',
        next: true
    });

    fail(`0.0__ : 0`, {
        source: '0.0__ : 0',
        next: true
    });

    fail(`10._e1`, {
        source: '10._e1',
        next: true
    });

    fail(`10._`, {
        source: '10._',
        next: true
    });

    fail(`.0_e1`, {
        source: '.0_e1',
        next: true
    });

    fail(`._e1`, {
        source: '._e1',
        next: true
    });

    fail(`0o0_`, {
        source: '0o0_',
        next: true
    });

    fail(`0o0__0`, {
        source: '0o0__0',
        next: true
    });

    fail(`0o0_`, {
        source: '0o0_',
        next: true
    });

    fail(`0o_1`, {
        source: '0o_1',
        next: true
    });

    fail(`"use strict"; 07_1`, {
        source: '"use strict"; 07_1',
        next: true
    });

    fail(`0o_1`, {
        source: '0o_1',
        next: true
    });

    fail(`0o_1`, {
        source: '0o_1',
        next: true
    });

    fail(`._`, {
        source: '._',
        next: true
    });

    fail(`0x_`, {
        source: '0x_',
        next: true
    });

    fail(`0x0__0`, {
        source: '0x0__0',
        next: true
    });

    fail(`0x0_`, {
        source: '0x0_',
        next: true
    });

    fail(`0x_`, {
        source: '0x_',
        next: true
    });

    fail(`0o0__0`, {
        source: '0o0__0',
        next: true
    });

    fail(`0o0_`, {
        source: '0o0_',
        next: true
    });

    fail(`0o_`, {
        source: '0o_',
        next: true
    });

    fail(`0x___0111010_0101_1`, {
        source: '0x___0111010_0101_1',
        next: true
    });

    fail(`0X0110_0110__`, {
        source: '0X0110_0110__',
        next: true
    });

    fail(`0\\u005F0123456789`, {
        source: '0\\u005F0123456789',
        next: true
    });

    fail(`\\uff__ff`, {
        source: '\\uff__ff',
        next: true
    });

    fail(`"\\uff__ff"`, {
        source: '"\\uff__ff"',
        next: true
    });

    fail(`2__4`, {
        source: '2__4',
        next: true
    });

    fail(`._4`, {
        source: '._4',
        next: true
    });

    fail(`_.4`, {
        source: '_.4',
        next: true
    });

    fail(`1._43`, {
        source: '1._43',
        next: true
    });

    fail(`1.4_e2`, {
        source: '1.4_e2',
        next: true
    });

    fail(`1.4e_2`, {
        source: '1.4e_2',
        next: true
    });

    pass(`0X0_11_0101;`, {
        source: '0X0_11_0101;',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 1114369,
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                raw: '0X0_11_0101'
            },
            start: 0,
            end: 12,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 12
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 12,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 12
        }
    }
}
    });

    pass(`for (let i = 10; i < 1_4_5;++i) {}`, {
        source: 'for (let i = 10; i < 1_4_5;++i) {}',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ForStatement',
                    body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 32,
                        end: 34,
                        loc: {
                            start: {
                                line: 1,
                                column: 32
                            },
                            end: {
                                line: 1,
                                column: 34
                            }
                        }
                    },
                    init: {
                        type: 'VariableDeclaration',
                        declarations: [
                            {
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 10,
                                    start: 13,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 13
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    raw: '10'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 'i',
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
                                },
                                start: 9,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 9
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                }
                            }
                        ],
                        kind: 'let',
                        start: 5,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    test: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'i',
                            start: 17,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 145,
                            start: 21,
                            end: 26,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 21
                                },
                                end: {
                                    line: 1,
                                    column: 26
                                }
                            },
                            raw: '1_4_5'
                        },
                        operator: '<',
                        start: 17,
                        end: 26,
                        loc: {
                            start: {
                                line: 1,
                                column: 17
                            },
                            end: {
                                line: 1,
                                column: 26
                            }
                        }
                    },
                    update: {
                        type: 'UpdateExpression',
                        argument: {
                            type: 'Identifier',
                            name: 'i',
                            start: 29,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 29
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        },
                        operator: '++',
                        prefix: true,
                        start: 27,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 27
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    start: 0,
                    end: 34,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 34
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 34,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 34
                }
            }
        }
    });

    pass(`i + 0o12_1`, {
        source: 'i + 0o12_1',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Identifier',
                            name: 'i',
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
                            }
                        },
                        right: {
                            type: 'Literal',
                            value: 81,
                            start: 4,
                            end: 10,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 10
                                }
                            },
                            raw: '0o12_1'
                        },
                        operator: '+',
                        start: 0,
                        end: 10,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    start: 0,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 10,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 10
                }
            }
        }
    });

    pass(`((i = 1_1) => {})`, {
        source: '((i = 1_1) => {})',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
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
                            start: 14,
                            end: 16,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 14
                                },
                                end: {
                                    line: 1,
                                    column: 16
                                }
                            }
                        },
                        params: [
                            {
                                type: 'AssignmentPattern',
                                left: {
                                    type: 'Identifier',
                                    name: 'i',
                                    start: 2,
                                    end: 3,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 2
                                        },
                                        end: {
                                            line: 1,
                                            column: 3
                                        }
                                    }
                                },
                                right: {
                                    type: 'Literal',
                                    value: 11,
                                    start: 6,
                                    end: 9,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 9
                                        }
                                    },
                                    raw: '1_1'
                                },
                                start: 2,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                }
                            }
                        ],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false,
                        start: 1,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    },
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
            ],
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
            }
        }
    });

    pass(`0b1010_1001`, {
        source: '0b1010_1001',
        loc: true,
        ranges: true,
        raw: true,
        module: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 169,
                        start: 0,
                        end: 11,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        },
                        raw: '0b1010_1001'
                    },
                    start: 0,
                    end: 11,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                }
            ],
            sourceType: 'module',
            start: 0,
            end: 11,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }
    });

    pass(`0o1100_0011;`, {
        source: '0o1100_0011;',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 2359305,
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                raw: '0o1100_0011'
            },
            start: 0,
            end: 12,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 12
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 12,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 12
        }
    }
}
    });

    pass(`1_000_000_000`, {
        source: '1_000_000_000',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 1000000000,
                start: 0,
                end: 13,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 13
                    }
                },
                raw: '1_000_000_000'
            },
            start: 0,
            end: 13,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 13
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 13,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 13
        }
    }
}
    });

    pass(`1_2.3_4e5_6`, {
        source: '1_2.3_4e5_6',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
    type: 'Program',
    body: [
        {
            type: 'ExpressionStatement',
            expression: {
                type: 'Literal',
                value: 1.234e+57,
                start: 0,
                end: 11,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                },
                raw: '1_2.3_4e5_6'
            },
            start: 0,
            end: 11,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        }
    ],
    sourceType: 'script',
    start: 0,
    end: 11,
    loc: {
        start: {
            line: 1,
            column: 0
        },
        end: {
            line: 1,
            column: 11
        }
    }
}
    });

    pass(`1_9`, {
        source: '1_9',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            body: [{
                end: 3,
                expression: {
                    end: 3,
                    loc: {
                        end: {
                            column: 3,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '1_9',
                    start: 0,
                    type: 'Literal',
                    value: 19,
                },
                loc: {
                    end: {
                        column: 3,
                        line: 1
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
            end: 3,
            loc: {
                end: {
                    column: 3,
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

    pass(`0xA0_B0_C0`, {
        source: '0xA0_B0_C0',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            body: [{
                end: 10,
                expression: {
                    end: 10,
                    loc: {
                        end: {
                            column: 10,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '0xA0_B0_C0',
                    start: 0,
                    type: 'Literal',
                    value: 10531008,
                },
                loc: {
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
                type: 'ExpressionStatement'
            }],
            end: 10,
            loc: {
                end: {
                    column: 10,
                    line: 1,
                },
                start: {
                    column: 0,
                    line: 1,
                },
            },
            sourceType: 'script',
            start: 0,
            type: 'Program'
        }
    });

    pass(`10.00_01e2`, {
        source: '10.00_01e2',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            body: [{
                end: 10,
                expression: {
                    end: 10,
                    loc: {
                        end: {
                            column: 10,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '10.00_01e2',
                    start: 0,
                    type: 'Literal',
                    value: 1000.01,
                },
                loc: {
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
                type: 'ExpressionStatement'
            }],
            end: 10,
            loc: {
                end: {
                    column: 10,
                    line: 1,
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

    pass(`123456789_5`, {
        source: '123456789_5',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            body: [{
                end: 11,
                expression: {
                    end: 11,
                    loc: {
                        end: {
                            column: 11,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '123456789_5',
                    start: 0,
                    type: 'Literal',
                    value: 1234567895
                },
                loc: {
                    end: {
                        column: 11,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
            end: 11,
            loc: {
                end: {
                    column: 11,
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

    pass(`1.0e-1_0`, {
        source: '1.0e-1_0',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            body: [{
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
                            line: 1,
                        }
                    },
                    raw: '1.0e-1_0',
                    start: 0,
                    type: 'Literal',
                    value: 1e-10,
                },
                loc: {
                    end: {
                        column: 8,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
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
            sourceType: 'script',
            start: 0,
            type: 'Program'
        }
    });

    pass(`.0_1e2`, {
        source: '.0_1e2',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            body: [{
                end: 6,
                expression: {
                    end: 6,
                    loc: {
                        end: {
                            column: 6,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '.0_1e2',
                    start: 0,
                    type: 'Literal',
                    value: 1,
                },
                loc: {
                    end: {
                        column: 6,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
            end: 6,
            loc: {
                end: {
                    column: 6,
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

    pass(`.10_1e2`, {
        source: '.10_1e2',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            body: [{
                end: 7,
                expression: {
                    end: 7,
                    loc: {
                        end: {
                            column: 7,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '.10_1e2',
                    start: 0,
                    type: 'Literal',
                    value: 10.1,
                },
                loc: {
                    end: {
                        column: 7,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
            end: 7,
            loc: {
                end: {
                    column: 7,
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

    pass(`9_9`, {
        source: '9_9',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            body: [{
                end: 3,
                expression: {
                    end: 3,
                    loc: {
                        end: {
                            column: 3,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '9_9',
                    start: 0,
                    type: 'Literal',
                    value: 99,
                },
                loc: {
                    end: {
                        column: 3,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
            end: 3,
            loc: {
                end: {
                    column: 3,
                    line: 1,
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

    pass(`1_1`, {
        source: '1_1',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            body: [{
                end: 3,
                expression: {
                    end: 3,
                    loc: {
                        end: {
                            column: 3,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '1_1',
                    start: 0,
                    type: 'Literal',
                    value: 11,
                },
                loc: {
                    end: {
                        column: 3,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement'
            }],
            end: 3,
            loc: {
                end: {
                    column: 3,
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

    pass(`0o7_0`, {
        source: '0o7_0',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0o7_0',
                    type: 'Literal',
                    value: 56,
                },
                type: 'ExpressionStatement',
            }, ],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass(`0o0_1`, {
        source: '0o0_1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0o0_1',
                    type: 'Literal',
                    value: 1,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0o0_10`, {
        source: '0o0_10',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0o0_10',
                    type: 'Literal',
                    value: 8,
                },
                type: 'ExpressionStatement',
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0O01_0`, {
        source: '0O01_0',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0O01_0',
                    type: 'Literal',
                    value: 8,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0O01_00`, {
        source: '0O01_00',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0O01_00',
                    type: 'Literal',
                    value: 64,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0b0_1`, {
        source: '0b0_1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0b0_1',
                    type: 'Literal',
                    value: 1,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0b0_10`, {
        source: '0b0_10',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0b0_10',
                    type: 'Literal',
                    value: 2,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`123456789_8`, {
        source: '123456789_8',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '123456789_8',
                    type: 'Literal',
                    value: 1234567898,
                },
                type: 'ExpressionStatement',
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`.00_01e2`, {
        source: '.00_01e2',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '.00_01e2',
                    type: 'Literal',
                    value: 0.01,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0xC_C`, {
        source: '0xC_C',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0xC_C',
                    type: 'Literal',
                    value: 204,
                },
                type: 'ExpressionStatement',
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`1.0e+1_0`, {
        source: '1.0e+1_0',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '1.0e+1_0',
                    type: 'Literal',
                    value: 10000000000,
                },
                type: 'ExpressionStatement',
            }, ],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass(`0b01_00`, {
        source: '0b01_00',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0b01_00',
                    type: 'Literal',
                    value: 4,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });
    pass(`0x0_0`, {
        source: '0x0_0',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0x0_0',
                    type: 'Literal',
                    value: 0,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0xc_c`, {
        source: '0xc_c',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0xc_c',
                    type: 'Literal',
                    value: 204,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0x01_00`, {
        source: '0x01_00',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0x01_00',
                    type: 'Literal',
                    value: 256,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass(`0X01_0`, {
        source: '0X01_0',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0X01_0',
                    type: 'Literal',
                    value: 16,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0b01_1`, {
        source: '0b01_1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0b01_1',
                    type: 'Literal',
                    value: 3,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0_0`, {
        source: '0_0',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0_0',
                    type: 'Literal',
                    value: 0,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`+1_0`, {
        source: '+1_0',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    argument: {
                        raw: '1_0',
                        type: 'Literal',
                        value: 10
                    },
                    operator: '+',
                    prefix: true,
                    type: 'UnaryExpression'
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0x1_a_1`, {
        source: '0x1_a_1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0x1_a_1',
                    type: 'Literal',
                    value: 417,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0o0_11`, {
        source: '0o0_11',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0o0_11',
                    type: 'Literal',
                    value: 9,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`1.1_0_1e1`, {
        source: '1.1_0_1e1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '1.1_0_1e1',
                    type: 'Literal',
                    value: 11.01,
                },
                type: 'ExpressionStatement'
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`00004_1`, {
        source: '00004_1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '00004_1',
                    type: 'Literal',
                    value: 33,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`00004_1`, {
        source: '00004_1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '00004_1',
                    type: 'Literal',
                    value: 33,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`0_1`, {
        source: '0_1',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '0_1',
                    type: 'Literal',
                    value: 1,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`1234_5678_9012_3456;`, {
        source: '1234_5678_9012_3456;',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    raw: '1234_5678_9012_3456',
                    type: 'Literal',
                    value: 1234567890123456,
                },
                type: 'ExpressionStatement'
            }, ],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass(`3.14_15;`, {
    source: '3.14_15;',
    raw: true,
    next: true,
    expected: {
        body: [{
            expression: {
                raw: '3.14_15',
                type: 'Literal',
                value: 3.1415,
            },
            type: 'ExpressionStatement'
        }],
        sourceType: 'script',
        type: 'Program'
    }
    });
    });
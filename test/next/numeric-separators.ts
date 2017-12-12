import { fail, pass } from '../utils';

describe('Statements - Numeric separators', () => {

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true
    });

    fail(`0x_52`, {
        source: '0x_52',
        next: true
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

    fail(`0\\u005F0123456789`, {
        source: '0\\u005F0123456789',
        next: true
    });

    pass(`1_9`, {
        source: '1_9',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            "body": [{
                "end": 3,
                "expression": {
                    "end": 3,
                    "loc": {
                        "end": {
                            "column": 3,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "1_9",
                    "start": 0,
                    "type": "Literal",
                    "value": 19,
                },
                "loc": {
                    "end": {
                        "column": 3,
                        "line": 1
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 3,
            "loc": {
                "end": {
                    "column": 3,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                }
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        }
    });

    pass(`0xA0_B0_C0`, {
        source: '0xA0_B0_C0',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            "body": [{
                "end": 10,
                "expression": {
                    "end": 10,
                    "loc": {
                        "end": {
                            "column": 10,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "0xA0_B0_C0",
                    "start": 0,
                    "type": "Literal",
                    "value": 10531008,
                },
                "loc": {
                    "end": {
                        "column": 10,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 10,
            "loc": {
                "end": {
                    "column": 10,
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

    pass(`10.00_01e2`, {
        source: '10.00_01e2',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            "body": [{
                "end": 10,
                "expression": {
                    "end": 10,
                    "loc": {
                        "end": {
                            "column": 10,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "10.00_01e2",
                    "start": 0,
                    "type": "Literal",
                    "value": 1000.01,
                },
                "loc": {
                    "end": {
                        "column": 10,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 10,
            "loc": {
                "end": {
                    "column": 10,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                },
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        }
    });

    pass(`123456789_5`, {
        source: '123456789_5',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            "body": [{
                "end": 11,
                "expression": {
                    "end": 11,
                    "loc": {
                        "end": {
                            "column": 11,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "123456789_5",
                    "start": 0,
                    "type": "Literal",
                    "value": 1234567895
                },
                "loc": {
                    "end": {
                        "column": 11,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 11,
            "loc": {
                "end": {
                    "column": 11,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                }
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        }
    });

    pass(`1.0e-1_0`, {
        source: '1.0e-1_0',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            "body": [{
                "end": 8,
                "expression": {
                    "end": 8,
                    "loc": {
                        "end": {
                            "column": 8,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "1.0e-1_0",
                    "start": 0,
                    "type": "Literal",
                    "value": 1e-10,
                },
                "loc": {
                    "end": {
                        "column": 8,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    },
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 8,
            "loc": {
                "end": {
                    "column": 8,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1
                }
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        }
    });


    pass(`.0_1e2`, {
        source: '.0_1e2',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "body": [{
                "end": 6,
                "expression": {
                    "end": 6,
                    "loc": {
                        "end": {
                            "column": 6,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": ".0_1e2",
                    "start": 0,
                    "type": "Literal",
                    "value": 1,
                },
                "loc": {
                    "end": {
                        "column": 6,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 6,
            "loc": {
                "end": {
                    "column": 6,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                }
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        }
    });

    pass(`.10_1e2`, {
        source: '.10_1e2',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "body": [{
                "end": 7,
                "expression": {
                    "end": 7,
                    "loc": {
                        "end": {
                            "column": 7,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": ".10_1e2",
                    "start": 0,
                    "type": "Literal",
                    "value": 10.1,
                },
                "loc": {
                    "end": {
                        "column": 7,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 7,
            "loc": {
                "end": {
                    "column": 7,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                }
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        }
    });

    pass(`9_9`, {
        source: '9_9',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "body": [{
                "end": 3,
                "expression": {
                    "end": 3,
                    "loc": {
                        "end": {
                            "column": 3,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "9_9",
                    "start": 0,
                    "type": "Literal",
                    "value": 99,
                },
                "loc": {
                    "end": {
                        "column": 3,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 3,
            "loc": {
                "end": {
                    "column": 3,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                },
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program",
        }
    });

    pass(`1_1`, {
        source: '1_1',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "body": [{
                "end": 3,
                "expression": {
                    "end": 3,
                    "loc": {
                        "end": {
                            "column": 3,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "1_1",
                    "start": 0,
                    "type": "Literal",
                    "value": 11,
                },
                "loc": {
                    "end": {
                        "column": 3,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 3,
            "loc": {
                "end": {
                    "column": 3,
                    "line": 1,
                },
                "start": {
                    "column": 0,
                    "line": 1,
                }
            },
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        }
    });

    pass(`0o7_0`, {
        source: '0o7_0',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0o7_0",
                    "type": "Literal",
                    "value": 56,
                },
                "type": "ExpressionStatement",
            }, ],
            "sourceType": "script",
            "type": "Program",
        }
    });

    pass(`0o0_1`, {
        source: '0o0_1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0o0_1",
                    "type": "Literal",
                    "value": 1,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });


    pass(`0o0_10`, {
        source: '0o0_10',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0o0_10",
                    "type": "Literal",
                    "value": 8,
                },
                "type": "ExpressionStatement",
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });


    pass(`0O01_0`, {
        source: '0O01_0',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0O01_0",
                    "type": "Literal",
                    "value": 8,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });


    pass(`0O01_00`, {
        source: '0O01_00',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0O01_00",
                    "type": "Literal",
                    "value": 64,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0b0_1`, {
        source: '0b0_1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0b0_1",
                    "type": "Literal",
                    "value": 1,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0b0_10`, {
        source: '0b0_10',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0b0_10",
                    "type": "Literal",
                    "value": 2,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`123456789_8`, {
        source: '123456789_8',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "123456789_8",
                    "type": "Literal",
                    "value": 1234567898,
                },
                "type": "ExpressionStatement",
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`.00_01e2`, {
        source: '.00_01e2',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": ".00_01e2",
                    "type": "Literal",
                    "value": 0.01,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0xC_C`, {
        source: '0xC_C',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0xC_C",
                    "type": "Literal",
                    "value": 204,
                },
                "type": "ExpressionStatement",
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`1.0e+1_0`, {
        source: '1.0e+1_0',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "1.0e+1_0",
                    "type": "Literal",
                    "value": 10000000000,
                },
                "type": "ExpressionStatement",
            }, ],
            "sourceType": "script",
            "type": "Program",
        }
    });

    pass(`0b01_00`, {
        source: '0b01_00',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0b01_00",
                    "type": "Literal",
                    "value": 4,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });
    pass(`0x0_0`, {
        source: '0x0_0',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0x0_0",
                    "type": "Literal",
                    "value": 0,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0xc_c`, {
        source: '0xc_c',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0xc_c",
                    "type": "Literal",
                    "value": 204,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0x01_00`, {
        source: '0x01_00',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0x01_00",
                    "type": "Literal",
                    "value": 256,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program",
        }
    });

    pass(`0X01_0`, {
        source: '0X01_0',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0X01_0",
                    "type": "Literal",
                    "value": 16,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0b01_1`, {
        source: '0b01_1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0b01_1",
                    "type": "Literal",
                    "value": 3,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0_0`, {
        source: '0_0',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0_0",
                    "type": "Literal",
                    "value": 0,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`+1_0`, {
        source: '+1_0',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "argument": {
                        "raw": "1_0",
                        "type": "Literal",
                        "value": 10
                    },
                    "operator": "+",
                    "prefix": true,
                    "type": "UnaryExpression"
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0x1_a_1`, {
        source: '0x1_a_1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0x1_a_1",
                    "type": "Literal",
                    "value": 417,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0o0_11`, {
        source: '0o0_11',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0o0_11",
                    "type": "Literal",
                    "value": 9,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`1.1_0_1e1`, {
        source: '1.1_0_1e1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "1.1_0_1e1",
                    "type": "Literal",
                    "value": 11.01,
                },
                "type": "ExpressionStatement"
            }],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`00004_1`, {
        source: '00004_1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "00004_1",
                    "type": "Literal",
                    "value": 33,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`00004_1`, {
        source: '00004_1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "00004_1",
                    "type": "Literal",
                    "value": 33,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`0_1`, {
        source: '0_1',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "0_1",
                    "type": "Literal",
                    "value": 1,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });

    pass(`1234_5678_9012_3456;`, {
        source: '1234_5678_9012_3456;',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "1234_5678_9012_3456",
                    "type": "Literal",
                    "value": 1234567890123456,
                },
                "type": "ExpressionStatement"
            }, ],
            "sourceType": "script",
            "type": "Program",
        }
    });

    pass(`3.14_15;`, {
    source: '3.14_15;',
    raw: true,
    next: true,
    expected: {
        "body": [{
            "expression": {
                "raw": "3.14_15",
                "type": "Literal",
                "value": 3.1415,
            },
            "type": "ExpressionStatement"
        }],
        "sourceType": "script",
        "type": "Program"
    }
    });
    });
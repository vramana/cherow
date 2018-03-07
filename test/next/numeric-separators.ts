import { pass, fail } from '../test-utils';
import { parseScript } from '../../src/cherow';

describe('Statements - Numeric separators', () => {

    fail(`._1`, {
        source: '._1',
        next: true,
        line: 1,
        message: 'Unexpected token .',
        column: 0,
        index: 0
    });

    fail(`1\\u005F0123456789`, {
        source: '1\\u005F0123456789',
        next: true,
        line: 1,
        message: 'Unexpected token identifier',
        column: 1,
        index: 1
    });

    fail(`"\\u{12_34}"`, {
        source: '"\\u{12_34}"',
        next: true,
        line: 1,
        message: 'Invalid hexadecimal escape sequence',
        column: 0,
        index: 0
    });

    fail(`"let a\\u{12_34} = 5"`, {
        source: '"let a\\u{12_34} = 5"',
        next: true,
        line: 1
    });

    fail(`"\\u12_34"`, {
        source: '"\\u12_34"',
        next: true,
        line: 1
    });

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true,
        line: 1
    });

    fail(`0x_52`, {
        source: '0x_52',
        next: true,
        line: 1
    });

    fail(`1_`, {
        source: '1_',
        next: true,
        line: 1
    });

    fail(`3_.1415F;`, {
        source: '3_.1415F;',
        next: true,
        line: 1
    });

    fail(`0x0_`, {
        source: '0x0_',
        next: true,
        line: 1
    });

    fail(`"\\u{12_34}"`, {
        source: '"\\u{12_34}"',
        next: true,
        line: 1
    });

    fail(`"let a\\u{12_34} = 5"`, {
        source: '"let a\\u{12_34} = 5"',
        next: true,
        line: 1
    });

    fail(`"\\u12_34"`, {
        source: '"\\u12_34"',
        next: true,
        line: 1
    });

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true,
        line: 1
    });

    fail(`0x_52`, {
        source: '0x_52',
        next: true,
        line: 1
    });

    fail(`1_`, {
        source: '1_',
        next: true,
        line: 1
    });

    fail(`3_.1415F;`, {
        source: '3_.1415F;',
        next: true,
        line: 1
    });

    fail(`3._1415F;`, {
        source: '3._1415F;',
        next: true,
        line: 1
    });

    fail(`3._1415F;`, {
        source: '3._1415F;',
        next: true,
        line: 1
    });

    fail(`0b0__0`, {
        source: '0b0__0',
        next: true,
        line: 1
    });

    fail(`1__0123456789`, {
        source: '1__0123456789',
        next: true,
        line: 1
    });

    fail(`0b_`, {
        source: '0b_',
        next: true,
        line: 1
    });

    fail(`0b0__0`, {
        source: '0b0__0',
        next: true,
        line: 1
    });

    fail(`1__0123456789`, {
        source: '1__0123456789',
        next: true,
        line: 1
    });

    fail(`(1_1_)`, {
        source: '(1_1_)',
        next: true,
        line: 1
    });

    fail(`(1__1)`, {
        source: '(1__1)',
        next: true,
        line: 1
    });

    fail(`(1_1_.1_1)`, {
        source: '(1_1_.1_1)',
        next: true,
        line: 1
    });

    fail(`(1_1.1_E1)`, {
        source: '(1_1.1_E1)',
        next: true,
        line: 1
    });

    fail(`\\u{10_ffff}`, {
        source: '\\u{10_ffff}',
        next: true,
        line: 1
    });

    fail(`0xa_1_`, {
        source: '0xa_1_',
        next: true,
        line: 1
    });

    fail(`(0x_a_1)`, {
        source: '(0x_a_1)',
        next: true,
        line: 1
    });

    fail(`0x_a_1`, {
        source: '0x_a_1',
        next: true,
        line: 1
    });

    fail(`{1_}`, {
        source: '{1_}',
        next: true,
        line: 1
    });

    fail(`{1__1}`, {
        source: '{1__1}',
        next: true,
        line: 1
    });

    fail(`{0x_1_1_}`, {
        source: '{0x_1_1_}',
        next: true,
        line: 1
    });

    fail(`0xZ_1`, {
        source: '0xZ_1',
        next: true,
        line: 1
    });

    fail(`[1_1__]`, {
        source: '[1_1__]',
        next: true,
        line: 1
    });

    fail(`[1_1.1_e1]`, {
        source: '[1_1.1_e1]',
        next: true,
        line: 1
    });

    fail(`1_`, {
        source: '1_',
        next: true,
        line: 1
    });

    fail(`0x_1`, {
        source: '0x_1',
        next: true,
        line: 1
    });

    fail(`0x0__0`, {
        source: '0x0__0',
        next: true,
        line: 1
    });

    fail(`0x0_`, {
        source: '0x0_',
        next: true,
        line: 1
    });

    fail(`10_`, {
        source: '10_',
        next: true,
        line: 1
    });

    fail(`10__0123456789`, {
        source: '10__0123456789',
        next: true,
        line: 1
    });

    fail(`0b0__0`, {
        source: '0b0__0',
        next: true,
        line: 1
    });

    fail(`0b0_`, {
        source: '0b0_',
        next: true,
        line: 1
    });
    fail(`10.0_e1`, {
        source: '10.0_e1',
        next: true,
        line: 1
    });

    fail(`0.00e0__0`, {
        source: '0.00e0__0',
        next: true,
        line: 1
    });

    fail(`0o0_`, {
        source: '0o0_',
        next: true,
        line: 1
    });

    fail(`0o0__0`, {
        source: '0o0__0',
        next: true,
        line: 1
    });

    fail(`0o0_`, {
        source: '0o0_',
        next: true,
        line: 1
    });

    fail(`"use strict"; 07_1`, {
        source: '"use strict"; 07_1',
        next: true,
        line: 1
    });

    fail(`0x0_`, {
        source: '0x0_',
        next: true,
        line: 1
    });

    fail(`._`, {
        source: '._',
        next: true,
        line: 1
    });

    fail(`0x_`, {
        source: '0x_',
        next: true,
        line: 1
    });

    fail(`0x0__0`, {
        source: '0x0__0',
        next: true,
        line: 1
    });

    fail(`0x0_`, {
        source: '0x0_',
        next: true,
        line: 1
    });

    fail(`0x_`, {
        source: '0x_',
        next: true,
        line: 1
    });

    fail(`0o0__0`, {
        source: '0o0__0',
        next: true,
        line: 1
    });

    fail(`0o0_`, {
        source: '0o0_',
        next: true,
        line: 1
    });

    fail(`0o_`, {
        source: '0o_',
        next: true,
        line: 1
    });

    fail(`0x___0111010_0101_1`, {
        source: '0x___0111010_0101_1',
        next: true,
        line: 1
    });

    fail(`0X0110_0110__`, {
        source: '0X0110_0110__',
        next: true,
        line: 1
    });

    fail(`0\\u005F0123456789`, {
        source: '0\\u005F0123456789',
        next: true,
        line: 1
    });

    fail(`\\uff__ff`, {
        source: '\\uff__ff',
        next: true,
        line: 1
    });

    fail(`"\\uff__ff"`, {
        source: '"\\uff__ff"',
        next: true,
        line: 1
    });

    fail(`2__4`, {
        source: '2__4',
        next: true,
        line: 1
    });

    fail(`._4`, {
        source: '._4',
        next: true,
        line: 1
    });

    fail(`_.4`, {
        source: '_.4',
        next: true,
        line: 1
    });

    fail(`1._43`, {
        source: '1._43',
        next: true,
        line: 1
    });

    fail(`1.4_e2`, {
        source: '1.4_e2',
        next: true,
        line: 1
    });

    /*
    fail(`[0o_1_1]`, {
        source: '[0o_1_1]',
        next: true,
        line: 1
    });*/

/*
    fail(`(0o_1_1)`, {
        source: '(0o_1_1)',
        next: true,
        line: 1
    });
*/
/*
    fail(`07_7_7_;`, {
        source: '07_7_7_;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });*/

    fail(`"use strict"; 07_1`, {
        source: '"use strict"; 07_1',
        next: true,
        line: 1
    });

    fail(`\\uff__ff`, {
        source: '\\uff__ff',
        next: true,
        line: 1
    });

    fail(`"\\uff__ff"`, {
        source: '"\\uff__ff"',
        next: true,
        line: 1
    });

    fail(`2__4`, {
        source: '2__4',
        next: true,
        line: 1
    });

    fail(`._4`, {
        source: '._4',
        next: true,
        line: 1
    });

    fail(`_.4`, {
        source: '_.4',
        next: true,
        line: 1
    });

    fail(`1._43`, {
        source: '1._43',
        next: true,
        line: 1
    });

    fail(`1.4_e2`, {
        source: '1.4_e2',
        next: true,
        line: 1
    });

    fail(`07__77;`, {
        source: '07__77;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`0__777;`, {
        source: '0__777;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`1e_1;`, {
        source: '1e_1;',
        next: true,
        line: 1,
        message: 'Invalid non-number after exponent indicator'
    });

    fail(`1e+_1;`, {
        source: '1e+_1;',
        next: true,
        line: 1,
        message: 'Invalid non-number after exponent indicator',
    });

    fail(`1_e+1;`, {
        source: '1_e+1;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`1__0;`, {
        source: '1__0;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`5_______2;`, {
        source: '5_______2;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`0.0_2_1_;`, {
        source: '0.0_2_1_;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`0.0__21;`, {
        source: '0.0__21;',
        next: true,
        line: 1,
        message: 'Numeric separators are not allowed here'
    });

    fail(`0_.01;`, {
        source: '0_.01;',
        next: true,
        line: 1,
        message: 'Unexpected token number'
    });

    pass(`0b0_1_0_1_0`, {
        source: '0b0_1_0_1_0',
        raw: true,
        next: true,
        expected: {
              body: [
                {
                  expression: {
                    raw: '0b0_1_0_1_0',
                    type: 'Literal',
                    value: 10,
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`0_777`, {
        source: '0_777',
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 511,
                        raw: '0_777'
                    }
                }
            ]
        }
    });

    pass(`0o7_7_7`, {
        source: '0o7_7_7',
        raw: true,
        next: true,
        expected: {
              body: [
                {
                  expression: {
                    raw: '0o7_7_7',
                    type: 'Literal',
                    value: 511,
                  },
                  type: 'ExpressionStatement'
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`0xF_F_FF`, {
        source: '0xF_F_FF',
        raw: true,
        ranges: true,
        next: true,
        loc: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 65535,
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        raw: '0xF_F_FF'
                    },
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                }
            ],
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }
    });

    pass(`1_0e+1_0`, {
        source: '1_0e+1_0',
        raw: true,
        ranges: true,
        next: true,
        loc: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 100000000000,
                        start: 0,
                        end: 8,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        },
                        raw: '1_0e+1_0'
                    },
                    start: 0,
                    end: 8,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 8
                        }
                    }
                }
            ],
            start: 0,
            end: 8,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 8
                }
            }
        }
    });

    pass(`.3_2_1`, {
        source: '.3_2_1',
        raw: true,
        ranges: true,
        next: true,
        loc: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 0.321,
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
                        raw: '.3_2_1'
                    },
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
                    }
                }
            ],
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
            }
        }
    });

    pass(`0.0_2_1`, {
        source: '0.0_2_1',
        raw: true,
        ranges: true,
        next: true,
        loc: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 0.021,
                        start: 0,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        raw: '0.0_2_1'
                    },
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                }
            ],
            start: 0,
            end: 7,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }
    });

    pass(`1_0.0_1`, {
        source: '1_0.0_1',
        raw: true,
        ranges: true,
        next: true,
        loc: true,
        expected: {
            type: 'Program',
            sourceType: 'script',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Literal',
                        value: 10.01,
                        start: 0,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        raw: '1_0.0_1'
                    },
                    start: 0,
                    end: 7,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 7
                        }
                    }
                }
            ],
            start: 0,
            end: 7,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 7
                }
            }
        }
    });

    pass(`0_1_2`, {
        source: '0_1_2',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
              body: [
                {
                 end: 5,
                  expression: {
                    end: 5,
                    loc: {
                      end: {
                        column: 5,
                        line: 1,
                      },
                      start: {
                        column: 0,
                        line: 1,
                      }
                    },
                    raw: '0_1_2',
                    start: 0,
                    type: 'Literal',
                    value: 10,
                  },
                 loc: {
                    end: {
                      column: 5,
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
              end: 5,
              loc: {
                end: {
                 column: 5,
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

    pass(`0X0_11_0101;`, {
        source: '0X0_11_0101;',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
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
            }],
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
            body: [{
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
                    declarations: [{
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
                    }],
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
            }],
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
            body: [{
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
            }],
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
            body: [{
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
                    params: [{
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
                    }],
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
            }],
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
            body: [{
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
            }],
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
            body: [{
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
            }],
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
            body: [{
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
            }],
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
            body: [{
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
            }],
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

    pass(`0x0_1, 0x01`, {
        source: '0x0_1, 0x01',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'SequenceExpression',
                    expressions: [{
                            type: 'Literal',
                            value: 1,
                            start: 0,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            },
                            raw: '0x0_1'
                        },
                        {
                            type: 'Literal',
                            value: 1,
                            start: 7,
                            end: 11,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 7
                                },
                                end: {
                                    line: 1,
                                    column: 11
                                }
                            },
                            raw: '0x01'
                        }
                    ],
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
            }],
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
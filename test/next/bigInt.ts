import { pass, fail } from '../test-utils';

describe('Next - BigInt', () => {

    fail('invalid number', {
        source: `112313n`,
        message: 'Unexpected token',
        line: 1,
    });

    fail('invalid float', {
        source: `1.0n`,
        next: true,
        message: 'Invalid BigIntLiteral',
        line: 1,
    });

    fail('invalid exponent', {
        source: `2e9n`,
        next: true,
        message: 'Unexpected token',
        line: 1,
    });

    fail('invalid noctal', {
        source: `016432n`,
        next: true,
        message: 'Invalid BigIntLiteral',
        line: 1,
    });

    fail('invalid MV', {
        source: `2017.8n;`,
        next: true,
        message: 'Invalid BigIntLiteral',
        line: 1,
    });

    fail('invalid noctal', {
        source: `.0000000001n;`,
        next: true,
        message: 'Invalid BigIntLiteral',
        line: 1,
    });

    fail('invalid binary', {
        source: `0b2n`,
        next: true,
        message: 'Missing binary digits after \'0b\'',
        line: 1,
    });

    fail('exponent part', {
        source: `0e0n`,
        next: true,
        message: 'Unexpected token',
        line: 1,
    });

    fail('invalid hex', {
        source: `0xgn;`,
        next: true,
        message: 'Missing hexadecimal digits after \'0x\'',
        line: 1,
    });

    fail('invalid octal', {
        source: `0o9n;`,
        next: true,
        message: 'Missing octal digits after \'0o\'',
        line: 1,
    });

    pass(`0n <= 1`, {
        source: '0n <= 1',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
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
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 2
                                }
                            },
                            raw: '0n'
                        },
                        right: {
                            type: 'Literal',
                            value: 1,
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
                            raw: '1'
                        },
                        operator: '<=',
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
            sourceType: 'script',
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

    pass(`(0b1 <= 1n`, {
        source: '1 <= 1n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'BinaryExpression',
                        left: {
                            type: 'Literal',
                            value: 1,
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
                            raw: '1'
                        },
                        right: {
                            type: 'Literal',
                            value: 1,
                            bigint: '1n',
                            start: 5,
                            end: 7,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 5
                                },
                                end: {
                                    line: 1,
                                    column: 7
                                }
                            },
                            raw: '1n'
                        },
                        operator: '<=',
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
            sourceType: 'script',
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

    pass(`(0b101n) << 1n`, {
        source: '(0b101n) << 1n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Literal',
                        value: 5,
                        bigint: '0b101n',
                        start: 1,
                        end: 7,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 7
                            }
                        },
                        raw: '0b101n'
                    },
                    right: {
                        type: 'Literal',
                        value: 1,
                        bigint: '1n',
                        start: 12,
                        end: 14,
                        loc: {
                            start: {
                                line: 1,
                                column: 12
                            },
                            end: {
                                line: 1,
                                column: 14
                            }
                        },
                        raw: '1n'
                    },
                    operator: '<<',
                    start: 0,
                    end: 14,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 14
                        }
                    }
                },
                start: 0,
                end: 14,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 14
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 14,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 14
                }
            }
        }
    });

    pass(`0b101n << -1n`, {
        source: '0b101n << -1n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Literal',
                        value: 5,
                        bigint: '0b101n',
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
                        raw: '0b101n'
                    },
                    right: {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                            type: 'Literal',
                            value: 1,
                            bigint: '1n',
                            start: 11,
                            end: 13,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 13
                                }
                            },
                            raw: '1n'
                        },
                        prefix: true,
                        start: 10,
                        end: 13,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 13
                            }
                        }
                    },
                    operator: '<<',
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

    pass(`0x246n << -128n`, {
        source: '0x246n << -128n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Literal',
                        value: 582,
                        bigint: '0x246n',
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
                        raw: '0x246n'
                    },
                    right: {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                            type: 'Literal',
                            value: 128,
                            bigint: '128n',
                            start: 11,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            },
                            raw: '128n'
                        },
                        prefix: true,
                        start: 10,
                        end: 15,
                        loc: {
                            start: {
                                line: 1,
                                column: 10
                            },
                            end: {
                                line: 1,
                                column: 15
                            }
                        }
                    },
                    operator: '<<',
                    start: 0,
                    end: 15,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 15
                        }
                    }
                },
                start: 0,
                end: 15,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 15
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 15,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 15
                }
            }
        }
    });

    pass(`0x123456789abcdef0fedcba9876543212345678n << 32n`, {
        source: '0x123456789abcdef0fedcba9876543212345678n << 32n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Literal',
                        value: 4.059726770363619e+44,
                        bigint: '0x123456789abcdef0fedcba9876543212345678n',
                        start: 0,
                        end: 41,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 41
                            }
                        },
                        raw: '0x123456789abcdef0fedcba9876543212345678n'
                    },
                    right: {
                        type: 'Literal',
                        value: 32,
                        bigint: '32n',
                        start: 45,
                        end: 48,
                        loc: {
                            start: {
                                line: 1,
                                column: 45
                            },
                            end: {
                                line: 1,
                                column: 48
                            }
                        },
                        raw: '32n'
                    },
                    operator: '<<',
                    start: 0,
                    end: 48,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 48
                        }
                    }
                },
                start: 0,
                end: 48,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 48
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 48,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 48
                }
            }
        }
    });

    pass(`5n << 2n`, {
        source: '5n << 2n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    left: {
                        type: 'Literal',
                        value: 5,
                        bigint: '5n',
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
                        },
                        raw: '5n'
                    },
                    right: {
                        type: 'Literal',
                        value: 2,
                        bigint: '2n',
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
                        },
                        raw: '2n'
                    },
                    operator: '<<',
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
            }],
            sourceType: 'script',
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

    pass(`0b101011101n`, {
        source: '0b101011101n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 349,
                    bigint: '0b101011101n',
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
                    },
                    raw: '0b101011101n'
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

    pass(`0o16432n`, {
        source: '0o16432n',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    bigint: '0o16432n',
                    value: 7450,
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
                    raw: '0o16432n'
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
            }],
            sourceType: 'script',
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

    pass(`0xFFF123n`, {
        source: '0xFFF123n',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Literal',
                    value: 16773411,
                    bigint: '0xFFF123n',
                    start: 0,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 9
                        }
                    },
                    raw: '0xFFF123n'
                },
                start: 0,
                end: 9,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 9
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 9,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 9
                }
            }
        }
    });

    pass(`100n`, {
        source: '100n',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            body: [{
                end: 4,
                expression: {
                    bigint: '100n',
                    end: 4,
                    loc: {
                        end: {
                            column: 4,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '100n',
                    start: 0,
                    type: 'Literal',
                    value: 100,
                },
                loc: {
                    end: {
                        column: 4,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    },
                },
                start: 0,
                type: 'ExpressionStatement'
            }, ],
            end: 4,
            loc: {
                end: {
                    column: 4,
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

    pass(`9223372036854775807n`, {
        source: '9223372036854775807n',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            body: [{
                end: 20,
                expression: {
                    bigint: '9223372036854775807n',
                    end: 20,
                    loc: {
                        end: {
                            column: 20,
                            line: 1,
                        },
                        start: {
                            column: 0,
                            line: 1,
                        }
                    },
                    raw: '9223372036854775807n',
                    start: 0,
                    type: 'Literal',
                    value: 9223372036854776000
                },
                loc: {
                    end: {
                        column: 20,
                        line: 1,
                    },
                    start: {
                        column: 0,
                        line: 1,
                    }
                },
                start: 0,
                type: 'ExpressionStatement',
            }, ],
            end: 20,
            loc: {
                end: {
                    column: 20,
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

    pass(`-(-1n)`, {
        source: '-(-1n)',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '-',
                    argument: {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                            type: 'Literal',
                            value: 1,
                            bigint: '1n',
                            start: 3,
                            end: 5,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 5
                                }
                            },
                            raw: '1n'
                        },
                        prefix: true,
                        start: 2,
                        end: 5,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 5
                            }
                        }
                    },
                    prefix: true,
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
            }],
            sourceType: 'script',
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

    pass(`- - 1n`, {
        source: '- - 1n',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '-',
                    argument: {
                        type: 'UnaryExpression',
                        operator: '-',
                        argument: {
                            type: 'Literal',
                            value: 1,
                            bigint: '1n',
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
                            raw: '1n'
                        },
                        prefix: true,
                        start: 2,
                        end: 6,
                        loc: {
                            start: {
                                line: 1,
                                column: 2
                            },
                            end: {
                                line: 1,
                                column: 6
                            }
                        }
                    },
                    prefix: true,
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
            }],
            sourceType: 'script',
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

    pass(`0o0_11n`, {
        source: '0o0_11n',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
              body: [
                {
                  end: 7,
                  expression: {
                    bigint: '0o0_11n',
                    end: 7,
                    loc: {
                     end: {
                        column: 7,
                        line: 1,
                      },
                      start: {
                        column: 0,
                        line: 1,
                      },
                    },
                    raw: '0o0_11n',
                    start: 0,
                    type: 'Literal',
                    value: 9,
                  },
                  loc: {
                    end: {
                      column: 7,
                      line: 1,
                    },
                    start: {
                      column: 0,
                      line: 1,
                    },
                  },
                  start: 0,
                  type: 'ExpressionStatement'
                }
              ],
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

    pass(`123456789_8n`, {
        source: '123456789_8n',
        raw: true,
        next: true,
        expected: {
            body: [{
                expression: {
                    bigint: '123456789_8n',
                    raw: '123456789_8n',
                    type: 'Literal',
                    value: 1234567898,
                },
                type: 'ExpressionStatement',
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`function nthPrime(nth) {
        function isPrime(p) {
          for (let i = 2n; i < p; i++) {
            if (p % i === 0n) return false;
          }
          return true;
        }
        for (let i = 2n; ; i++) {
          if (isPrime(i)) {
            if (--nth === 0n) return i;
          }
        }
      }`, {
        source: `function nthPrime(nth) {
            function isPrime(p) {
              for (let i = 2n; i < p; i++) {
                if (p % i === 0n) return false;
              }
              return true;
            }
            for (let i = 2n; ; i++) {
              if (isPrime(i)) {
                if (--nth === 0n) return i;
              }
            }
          }`,
        raw: true,
        loc: true,
        ranges: true,
        next: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    params: [
                        {
                            type: 'Identifier',
                            name: 'nth',
                            start: 18,
                            end: 21,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 18
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
                        body: [
                            {
                                type: 'FunctionDeclaration',
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'p',
                                        start: 54,
                                        end: 55,
                                        loc: {
                                            start: {
                                                line: 2,
                                                column: 29
                                            },
                                            end: {
                                                line: 2,
                                                column: 30
                                            }
                                        }
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ForStatement',
                                            body: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'IfStatement',
                                                        test: {
                                                            type: 'BinaryExpression',
                                                            left: {
                                                                type: 'BinaryExpression',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'p',
                                                                    start: 124,
                                                                    end: 125,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 20
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 21
                                                                        }
                                                                    }
                                                                },
                                                                right: {
                                                                    type: 'Identifier',
                                                                    name: 'i',
                                                                    start: 128,
                                                                    end: 129,
                                                                    loc: {
                                                                        start: {
                                                                            line: 4,
                                                                            column: 24
                                                                        },
                                                                        end: {
                                                                            line: 4,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                operator: '%',
                                                                start: 124,
                                                                end: 129,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 20
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 25
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'Literal',
                                                                value: 0,
                                                                bigint: '0n',
                                                                start: 134,
                                                                end: 136,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 30
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 32
                                                                    }
                                                                },
                                                                raw: '0n'
                                                            },
                                                            operator: '===',
                                                            start: 124,
                                                            end: 136,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 32
                                                                }
                                                            }
                                                        },
                                                        alternate: null,
                                                        consequent: {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'Literal',
                                                                value: false,
                                                                start: 145,
                                                                end: 150,
                                                                loc: {
                                                                    start: {
                                                                        line: 4,
                                                                        column: 41
                                                                    },
                                                                    end: {
                                                                        line: 4,
                                                                        column: 46
                                                                    }
                                                                },
                                                                raw: 'false'
                                                            },
                                                            start: 138,
                                                            end: 151,
                                                            loc: {
                                                                start: {
                                                                    line: 4,
                                                                    column: 34
                                                                },
                                                                end: {
                                                                    line: 4,
                                                                    column: 47
                                                                }
                                                            }
                                                        },
                                                        start: 120,
                                                        end: 151,
                                                        loc: {
                                                            start: {
                                                                line: 4,
                                                                column: 16
                                                            },
                                                            end: {
                                                                line: 4,
                                                                column: 47
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 102,
                                                end: 167,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 43
                                                    },
                                                    end: {
                                                        line: 5,
                                                        column: 15
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
                                                            value: 2,
                                                            bigint: '2n',
                                                            start: 86,
                                                            end: 88,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 27
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 29
                                                                }
                                                            },
                                                            raw: '2n'
                                                        },
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'i',
                                                            start: 82,
                                                            end: 83,
                                                            loc: {
                                                                start: {
                                                                    line: 3,
                                                                    column: 23
                                                                },
                                                                end: {
                                                                    line: 3,
                                                                    column: 24
                                                                }
                                                            }
                                                        },
                                                        start: 82,
                                                        end: 88,
                                                        loc: {
                                                            start: {
                                                                line: 3,
                                                                column: 23
                                                            },
                                                            end: {
                                                                line: 3,
                                                                column: 29
                                                            }
                                                        }
                                                    }
                                                ],
                                                kind: 'let',
                                                start: 78,
                                                end: 88,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 29
                                                    }
                                                }
                                            },
                                            test: {
                                                type: 'BinaryExpression',
                                                left: {
                                                    type: 'Identifier',
                                                    name: 'i',
                                                    start: 90,
                                                    end: 91,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 31
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 32
                                                        }
                                                    }
                                                },
                                                right: {
                                                    type: 'Identifier',
                                                    name: 'p',
                                                    start: 94,
                                                    end: 95,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 35
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 36
                                                        }
                                                    }
                                                },
                                                operator: '<',
                                                start: 90,
                                                end: 95,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 31
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 36
                                                    }
                                                }
                                            },
                                            update: {
                                                type: 'UpdateExpression',
                                                argument: {
                                                    type: 'Identifier',
                                                    name: 'i',
                                                    start: 97,
                                                    end: 98,
                                                    loc: {
                                                        start: {
                                                            line: 3,
                                                            column: 38
                                                        },
                                                        end: {
                                                            line: 3,
                                                            column: 39
                                                        }
                                                    }
                                                },
                                                operator: '++',
                                                prefix: false,
                                                start: 97,
                                                end: 100,
                                                loc: {
                                                    start: {
                                                        line: 3,
                                                        column: 38
                                                    },
                                                    end: {
                                                        line: 3,
                                                        column: 41
                                                    }
                                                }
                                            },
                                            start: 73,
                                            end: 167,
                                            loc: {
                                                start: {
                                                    line: 3,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 5,
                                                    column: 15
                                                }
                                            }
                                        },
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'Literal',
                                                value: true,
                                                start: 189,
                                                end: 193,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 25
                                                    }
                                                },
                                                raw: 'true'
                                            },
                                            start: 182,
                                            end: 194,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 26
                                                }
                                            }
                                        }
                                    ],
                                    start: 57,
                                    end: 208,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 32
                                        },
                                        end: {
                                            line: 7,
                                            column: 13
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'isPrime',
                                    start: 46,
                                    end: 53,
                                    loc: {
                                        start: {
                                            line: 2,
                                            column: 21
                                        },
                                        end: {
                                            line: 2,
                                            column: 28
                                        }
                                    }
                                },
                                start: 37,
                                end: 208,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 12
                                    },
                                    end: {
                                        line: 7,
                                        column: 13
                                    }
                                }
                            },
                            {
                                type: 'ForStatement',
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'IfStatement',
                                            test: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'Identifier',
                                                    name: 'isPrime',
                                                    start: 265,
                                                    end: 272,
                                                    loc: {
                                                        start: {
                                                            line: 9,
                                                            column: 18
                                                        },
                                                        end: {
                                                            line: 9,
                                                            column: 25
                                                        }
                                                    }
                                                },
                                                arguments: [
                                                    {
                                                        type: 'Identifier',
                                                        name: 'i',
                                                        start: 273,
                                                        end: 274,
                                                        loc: {
                                                            start: {
                                                                line: 9,
                                                                column: 26
                                                            },
                                                            end: {
                                                                line: 9,
                                                                column: 27
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 265,
                                                end: 275,
                                                loc: {
                                                    start: {
                                                        line: 9,
                                                        column: 18
                                                    },
                                                    end: {
                                                        line: 9,
                                                        column: 28
                                                    }
                                                }
                                            },
                                            alternate: null,
                                            consequent: {
                                                type: 'BlockStatement',
                                                body: [
                                                    {
                                                        type: 'IfStatement',
                                                        test: {
                                                            type: 'BinaryExpression',
                                                            left: {
                                                                type: 'UpdateExpression',
                                                                operator: '--',
                                                                prefix: true,
                                                                argument: {
                                                                    type: 'Identifier',
                                                                    name: 'nth',
                                                                    start: 301,
                                                                    end: 304,
                                                                    loc: {
                                                                        start: {
                                                                            line: 10,
                                                                            column: 22
                                                                        },
                                                                        end: {
                                                                            line: 10,
                                                                            column: 25
                                                                        }
                                                                    }
                                                                },
                                                                start: 299,
                                                                end: 304,
                                                                loc: {
                                                                    start: {
                                                                        line: 10,
                                                                        column: 20
                                                                    },
                                                                    end: {
                                                                        line: 10,
                                                                        column: 25
                                                                    }
                                                                }
                                                            },
                                                            right: {
                                                                type: 'Literal',
                                                                value: 0,
                                                                bigint: '0n',
                                                                start: 309,
                                                                end: 311,
                                                                loc: {
                                                                    start: {
                                                                        line: 10,
                                                                        column: 30
                                                                    },
                                                                    end: {
                                                                        line: 10,
                                                                        column: 32
                                                                    }
                                                                },
                                                                raw: '0n'
                                                            },
                                                            operator: '===',
                                                            start: 299,
                                                            end: 311,
                                                            loc: {
                                                                start: {
                                                                    line: 10,
                                                                    column: 20
                                                                },
                                                                end: {
                                                                    line: 10,
                                                                    column: 32
                                                                }
                                                            }
                                                        },
                                                        alternate: null,
                                                        consequent: {
                                                            type: 'ReturnStatement',
                                                            argument: {
                                                                type: 'Identifier',
                                                                name: 'i',
                                                                start: 320,
                                                                end: 321,
                                                                loc: {
                                                                    start: {
                                                                        line: 10,
                                                                        column: 41
                                                                    },
                                                                    end: {
                                                                        line: 10,
                                                                        column: 42
                                                                    }
                                                                }
                                                            },
                                                            start: 313,
                                                            end: 322,
                                                            loc: {
                                                                start: {
                                                                    line: 10,
                                                                    column: 34
                                                                },
                                                                end: {
                                                                    line: 10,
                                                                    column: 43
                                                                }
                                                            }
                                                        },
                                                        start: 295,
                                                        end: 322,
                                                        loc: {
                                                            start: {
                                                                line: 10,
                                                                column: 16
                                                            },
                                                            end: {
                                                                line: 10,
                                                                column: 43
                                                            }
                                                        }
                                                    }
                                                ],
                                                start: 277,
                                                end: 338,
                                                loc: {
                                                    start: {
                                                        line: 9,
                                                        column: 30
                                                    },
                                                    end: {
                                                        line: 11,
                                                        column: 15
                                                    }
                                                }
                                            },
                                            start: 261,
                                            end: 338,
                                            loc: {
                                                start: {
                                                    line: 9,
                                                    column: 14
                                                },
                                                end: {
                                                    line: 11,
                                                    column: 15
                                                }
                                            }
                                        }
                                    ],
                                    start: 245,
                                    end: 352,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 36
                                        },
                                        end: {
                                            line: 12,
                                            column: 13
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
                                                value: 2,
                                                bigint: '2n',
                                                start: 234,
                                                end: 236,
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 25
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 27
                                                    }
                                                },
                                                raw: '2n'
                                            },
                                            id: {
                                                type: 'Identifier',
                                                name: 'i',
                                                start: 230,
                                                end: 231,
                                                loc: {
                                                    start: {
                                                        line: 8,
                                                        column: 21
                                                    },
                                                    end: {
                                                        line: 8,
                                                        column: 22
                                                    }
                                                }
                                            },
                                            start: 230,
                                            end: 236,
                                            loc: {
                                                start: {
                                                    line: 8,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 8,
                                                    column: 27
                                                }
                                            }
                                        }
                                    ],
                                    kind: 'let',
                                    start: 226,
                                    end: 236,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 17
                                        },
                                        end: {
                                            line: 8,
                                            column: 27
                                        }
                                    }
                                },
                                test: null,
                                update: {
                                    type: 'UpdateExpression',
                                    argument: {
                                        type: 'Identifier',
                                        name: 'i',
                                        start: 240,
                                        end: 241,
                                        loc: {
                                            start: {
                                                line: 8,
                                                column: 31
                                            },
                                            end: {
                                                line: 8,
                                                column: 32
                                            }
                                        }
                                    },
                                    operator: '++',
                                    prefix: false,
                                    start: 240,
                                    end: 243,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 31
                                        },
                                        end: {
                                            line: 8,
                                            column: 34
                                        }
                                    }
                                },
                                start: 221,
                                end: 352,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 12
                                    },
                                    end: {
                                        line: 12,
                                        column: 13
                                    }
                                }
                            }
                        ],
                        start: 23,
                        end: 364,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 13,
                                column: 11
                            }
                        }
                    },
                    async: false,
                    generator: false,
                    expression: false,
                    id: {
                        type: 'Identifier',
                        name: 'nthPrime',
                        start: 9,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 9
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        }
                    },
                    start: 0,
                    end: 364,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 13,
                            column: 11
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 364,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 13,
                    column: 11
                }
            }
        }
    });
});
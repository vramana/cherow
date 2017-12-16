import { pass, fail } from '../utils';

describe('Next - BigInt', () => {

    fail('invalid float', {
        source: `1.0n`,
        next: true
    });
    fail('invalid exponent', {
        source: `2e9n`,
        next: true
    });
    fail('invalid noctal', {
        source: `016432n`,
        next: true
    });
    fail('invalid MV', {
        source: `2017.8n;`,
        next: true
    });
    fail('invalid noctal', {
        source: `.0000000001n;`,
        next: true
    });

    pass(`(0b101n) << 1n`, {
        source: '(0b101n) << 1n',
        loc: true,
        next: true,
        ranges: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "Literal",
                        "value": 5,
                        "bigint": "0b101n",
                        "start": 1,
                        "end": 7,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 7
                            }
                        },
                        "raw": "0b101n"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 1,
                        "bigint": "1n",
                        "start": 12,
                        "end": 14,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 14
                            }
                        },
                        "raw": "1n"
                    },
                    "operator": "<<",
                    "start": 0,
                    "end": 14,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 14
                        }
                    }
                },
                "start": 0,
                "end": 14,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 14
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 14,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 14
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "Literal",
                        "value": 5,
                        "bigint": "0b101n",
                        "start": 0,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        },
                        "raw": "0b101n"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 1,
                            "bigint": "1n",
                            "start": 11,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            },
                            "raw": "1n"
                        },
                        "prefix": true,
                        "start": 10,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 10
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
                    "operator": "<<",
                    "start": 0,
                    "end": 13,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    }
                },
                "start": 0,
                "end": 13,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 13
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 13,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 13
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "Literal",
                        "value": 582,
                        "bigint": "0x246n",
                        "start": 0,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        },
                        "raw": "0x246n"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 128,
                            "bigint": "128n",
                            "start": 11,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            },
                            "raw": "128n"
                        },
                        "prefix": true,
                        "start": 10,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 10
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
                    "operator": "<<",
                    "start": 0,
                    "end": 15,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                },
                "start": 0,
                "end": 15,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 15
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 15,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 15
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "Literal",
                        "value": 305419896,
                        "bigint": "0x123456789abcdef0fedcba9876543212345678n",
                        "start": 0,
                        "end": 41,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 41
                            }
                        },
                        "raw": "0x123456789abcdef0fedcba9876543212345678n"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 32,
                        "bigint": "32n",
                        "start": 45,
                        "end": 48,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 45
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        },
                        "raw": "32n"
                    },
                    "operator": "<<",
                    "start": 0,
                    "end": 48,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 48
                        }
                    }
                },
                "start": 0,
                "end": 48,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 48
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 48,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 48
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "left": {
                        "type": "Literal",
                        "value": 5,
                        "bigint": "5n",
                        "start": 0,
                        "end": 2,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 0
                            },
                            "end": {
                                "line": 1,
                                "column": 2
                            }
                        },
                        "raw": "5n"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 2,
                        "bigint": "2n",
                        "start": 6,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        },
                        "raw": "2n"
                    },
                    "operator": "<<",
                    "start": 0,
                    "end": 8,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 8
                        }
                    }
                },
                "start": 0,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 8,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 8
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": 349,
                    "bigint": "0b101011101n",
                    "start": 0,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    },
                    "raw": "0b101011101n"
                },
                "start": 0,
                "end": 12,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 12
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 12,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 12
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "bigint": "0o16432n",
                    "value": 7450,
                    "start": 0,
                    "end": 8,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 8
                        }
                    },
                    "raw": "0o16432n"
                },
                "start": 0,
                "end": 8,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 8
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 8,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 8
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Literal",
                    "value": 16773411,
                    "bigint": "0xFFF123n",
                    "start": 0,
                    "end": 9,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 9
                        }
                    },
                    "raw": "0xFFF123n"
                },
                "start": 0,
                "end": 9,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 9
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 9,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 9
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
            "body": [{
                "end": 4,
                "expression": {
                    "bigint": "100n",
                    "end": 4,
                    "loc": {
                        "end": {
                            "column": 4,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "100n",
                    "start": 0,
                    "type": "Literal",
                    "value": 100,
                },
                "loc": {
                    "end": {
                        "column": 4,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    },
                },
                "start": 0,
                "type": "ExpressionStatement"
            }, ],
            "end": 4,
            "loc": {
                "end": {
                    "column": 4,
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

    pass(`9223372036854775807n`, {
        source: '9223372036854775807n',
        loc: true,
        ranges: true,
        raw: true,
        next: true,
        expected: {
            "body": [{
                "end": 20,
                "expression": {
                    "bigint": "9223372036854775807n",
                    "end": 20,
                    "loc": {
                        "end": {
                            "column": 20,
                            "line": 1,
                        },
                        "start": {
                            "column": 0,
                            "line": 1,
                        }
                    },
                    "raw": "9223372036854775807n",
                    "start": 0,
                    "type": "Literal",
                    "value": 9223372036854776000
                },
                "loc": {
                    "end": {
                        "column": 20,
                        "line": 1,
                    },
                    "start": {
                        "column": 0,
                        "line": 1,
                    }
                },
                "start": 0,
                "type": "ExpressionStatement",
            }, ],
            "end": 20,
            "loc": {
                "end": {
                    "column": 20,
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

    pass(`-(-1n)`, {
        source: '-(-1n)',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "-",
                    "argument": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 1,
                            "bigint": "1n",
                            "start": 3,
                            "end": 5,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 3
                                },
                                "end": {
                                    "line": 1,
                                    "column": 5
                                }
                            },
                            "raw": "1n"
                        },
                        "prefix": true,
                        "start": 2,
                        "end": 5,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 5
                            }
                        }
                    },
                    "prefix": true,
                    "start": 0,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    }
                },
                "start": 0,
                "end": 6,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 6
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 6,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 6
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
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "-",
                    "argument": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 1,
                            "bigint": "1n",
                            "start": 4,
                            "end": 6,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 6
                                }
                            },
                            "raw": "1n"
                        },
                        "prefix": true,
                        "start": 2,
                        "end": 6,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 2
                            },
                            "end": {
                                "line": 1,
                                "column": 6
                            }
                        }
                    },
                    "prefix": true,
                    "start": 0,
                    "end": 6,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 6
                        }
                    }
                },
                "start": 0,
                "end": 6,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 6
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 6,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 6
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
              "body": [
                {
                  "end": 7,
                  "expression": {
                    "bigint": "0o0_11n",
                    "end": 7,
                    "loc": {
                     "end": {
                        "column": 7,
                        "line": 1,
                      },
                      "start": {
                        "column": 0,
                        "line": 1,
                      },
                    },
                    "raw": "0o0_11n",
                    "start": 0,
                    "type": "Literal",
                    "value": 9,
                  },
                  "loc": {
                    "end": {
                      "column": 7,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    },
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
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
    
    pass(`123456789_8n`, {
        source: '123456789_8n',
        raw: true,
        next: true,
        expected: {
            "body": [{
                "expression": {
                    "raw": "123456789_8n",
                    "type": "Literal",
                    "value": 1234567898,
                },
                "type": "ExpressionStatement",
            }, ],
            "sourceType": "script",
            "type": "Program"
        }
    });
});
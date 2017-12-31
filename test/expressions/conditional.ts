import { pass, fail, testErrorLocation } from '../utils';

describe('Expressions - Conditional', () => {

    testErrorLocation(`for (true ? 0 : 0 in {}; false; ) ;`, {
        source: 'for (true ? 0 : 0 in {}; false; ) ;',
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 0,
        index: 3
    });

    testErrorLocation(`for ("" in {} ? 0 : 0; false; ) ;`, {
        source: 'for ("" in {} ? 0 : 0; false; ) ;',
        message: 'Invalid left-hand side in for-loop',
        line: 1,
        column: 0,
        index: 3
    });

    pass(`x = (0) ? 1 : 2`, {
        source: 'x = (0) ? 1 : 2',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'Identifier',
                            name: 'x',
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
                        operator: '=',
                        right: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Literal',
                                value: 0,
                                start: 5,
                                end: 6,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 6
                                    }
                                },
                                raw: '0'
                            },
                            consequent: {
                                type: 'Literal',
                                value: 1,
                                start: 10,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 10
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                },
                                raw: '1'
                            },
                            alternate: {
                                type: 'Literal',
                                value: 2,
                                start: 14,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 14
                                    },
                                    end: {
                                        line: 1,
                                        column: 15
                                    }
                                },
                                raw: '2'
                            },
                            start: 4,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
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
                }
            ],
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
    pass(`a ? b : c`, {
            source: 'a ? b : c',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Identifier',
                                name: 'a',
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
                            consequent: {
                                type: 'Identifier',
                                name: 'b',
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                }
                            },
                            alternate: {
                                type: 'Identifier',
                                name: 'c',
                                start: 8,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                }
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
                    }
                ],
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

    pass(`y ? 1 : 2`, {
            source: 'y ? 1 : 2',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'Identifier',
                                name: 'y',
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
                            consequent: {
                                type: 'Literal',
                                value: 1,
                                start: 4,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
                                    }
                                },
                                raw: '1'
                            },
                            alternate: {
                                type: 'Literal',
                                value: 2,
                                start: 8,
                                end: 9,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 9
                                    }
                                },
                                raw: '2'
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
                    }
                ],
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

    pass(`x && y ? 1 : 2`, {
            source: 'x && y ? 1 : 2',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'ConditionalExpression',
                            test: {
                                type: 'LogicalExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                    type: 'Identifier',
                                    name: 'y',
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    }
                                },
                                operator: '&&',
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
                            consequent: {
                                type: 'Literal',
                                value: 1,
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
                                },
                                raw: '1'
                            },
                            alternate: {
                                type: 'Literal',
                                value: 2,
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
                                },
                                raw: '2'
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
                    }
                ],
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

    pass(`x = (0) ? 1 : 2`, {
            source: 'x = (0) ? 1 : 2',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'AssignmentExpression',
                            left: {
                                type: 'Identifier',
                                name: 'x',
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
                            operator: '=',
                            right: {
                                type: 'ConditionalExpression',
                                test: {
                                    type: 'Literal',
                                    value: 0,
                                    start: 5,
                                    end: 6,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 5
                                        },
                                        end: {
                                            line: 1,
                                            column: 6
                                        }
                                    },
                                    raw: '0'
                                },
                                consequent: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 10,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 10
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    },
                                    raw: '1'
                                },
                                alternate: {
                                    type: 'Literal',
                                    value: 2,
                                    start: 14,
                                    end: 15,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 14
                                        },
                                        end: {
                                            line: 1,
                                            column: 15
                                        }
                                    },
                                    raw: '2'
                                },
                                start: 4,
                                end: 15,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
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
                    }
                ],
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

    pass(`((typeof exports !== 'undefined') ? exports : root)[localName] = password;`, {
            source: '((typeof exports !== "undefined") ? exports : root)[localName] = password;',
            loc: true,
            ranges: true,
            raw: true,
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
                                    type: 'ConditionalExpression',
                                    test: {
                                        type: 'BinaryExpression',
                                        left: {
                                            type: 'UnaryExpression',
                                            operator: 'typeof',
                                            argument: {
                                                type: 'Identifier',
                                                name: 'exports',
                                                start: 9,
                                                end: 16,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 9
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 16
                                                    }
                                                }
                                            },
                                            prefix: true,
                                            start: 2,
                                            end: 16,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 2
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 16
                                                }
                                            }
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 'undefined',
                                            start: 21,
                                            end: 32,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 32
                                                }
                                            },
                                            raw: '"undefined"'
                                        },
                                        operator: '!==',
                                        start: 2,
                                        end: 32,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 2
                                            },
                                            end: {
                                                line: 1,
                                                column: 32
                                            }
                                        }
                                    },
                                    consequent: {
                                        type: 'Identifier',
                                        name: 'exports',
                                        start: 36,
                                        end: 43,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 36
                                            },
                                            end: {
                                                line: 1,
                                                column: 43
                                            }
                                        }
                                    },
                                    alternate: {
                                        type: 'Identifier',
                                        name: 'root',
                                        start: 46,
                                        end: 50,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 46
                                            },
                                            end: {
                                                line: 1,
                                                column: 50
                                            }
                                        }
                                    },
                                    start: 1,
                                    end: 50,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 50
                                        }
                                    }
                                },
                                computed: true,
                                property: {
                                    type: 'Identifier',
                                    name: 'localName',
                                    start: 52,
                                    end: 61,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 52
                                        },
                                        end: {
                                            line: 1,
                                            column: 61
                                        }
                                    }
                                },
                                start: 0,
                                end: 62,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 0
                                    },
                                    end: {
                                        line: 1,
                                        column: 62
                                    }
                                }
                            },
                            operator: '=',
                            right: {
                                type: 'Identifier',
                                name: 'password',
                                start: 65,
                                end: 73,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 65
                                    },
                                    end: {
                                        line: 1,
                                        column: 73
                                    }
                                }
                            },
                            start: 0,
                            end: 73,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 0
                                },
                                end: {
                                    line: 1,
                                    column: 73
                                }
                            }
                        },
                        start: 0,
                        end: 74,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 74
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 74,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 74
                    }
                }
            }
        });
});
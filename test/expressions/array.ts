import { pass, fail } from '../test-utils';

describe('Expressions - Array', () => {

    pass(`[ 1 ]`, {
        source: '[ 1 ]',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                value: 1,
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
                            }
                        ],
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
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`[a, ...b=c]`, {
        source: '[a, ...b=c]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                }
                            },
                            {
                                type: 'SpreadElement',
                                argument: {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'c',
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
                                    start: 7,
                                    end: 10,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 7
                                        },
                                        end: {
                                            line: 1,
                                            column: 10
                                        }
                                    }
                                },
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
                                }
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

    pass(`([a, ...b=c])`, {
        source: '([a, ...b=c])',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Identifier',
                                name: 'a',
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
                            {
                                type: 'SpreadElement',
                                argument: {
                                    type: 'AssignmentExpression',
                                    left: {
                                        type: 'Identifier',
                                        name: 'b',
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
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'c',
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
                                        }
                                    },
                                    start: 8,
                                    end: 11,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 8
                                        },
                                        end: {
                                            line: 1,
                                            column: 11
                                        }
                                    }
                                },
                                start: 5,
                                end: 11,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 11
                                    }
                                }
                            }
                        ],
                        start: 1,
                        end: 12,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 12
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

    pass(`[,,1,,,2,3,,]`, {
        source: '[,,1,,,2,3,,]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            null,
                            null,
                            {
                                type: 'Literal',
                                value: 1,
                                start: 3,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                },
                                raw: '1'
                            },
                            null,
                            null,
                            {
                                type: 'Literal',
                                value: 2,
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
                                },
                                raw: '2'
                            },
                            {
                                type: 'Literal',
                                value: 3,
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
                                raw: '3'
                            },
                            null
                        ],
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

    pass(`[ 1, 2,, 3, ]`, {
        source: '[ 1, 2,, 3, ]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                value: 1,
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
                                },
                                raw: '1'
                            },
                            {
                                type: 'Literal',
                                value: 2,
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
                                raw: '2'
                            },
                            null,
                            {
                                type: 'Literal',
                                value: 3,
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
                                raw: '3'
                            }
                        ],
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

    pass(`[ 1, 2, 3, ]`, {
        source: '[ 1, 2, 3, ]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                value: 1,
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
                                },
                                raw: '1'
                            },
                            {
                                type: 'Literal',
                                value: 2,
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
                                raw: '2'
                            },
                            {
                                type: 'Literal',
                                value: 3,
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
                                raw: '3'
                            }
                        ],
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

    pass(`[]`, {
        source: '[]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [],
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
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`[ 0 ]`, {
        source: '[ 0 ]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                value: 0,
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
                                },
                                raw: '0'
                            }
                        ],
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
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass(`[ ,, 0 ]`, {
        source: '[ ,, 0 ]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            body: [
              {
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'ArrayExpression',
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
                  elements: [
                    null,
                    null,
                    {
                      type: 'Literal',
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
                      value: 0,
                      raw: '0'
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`[ 0, ]`, {
        source: '[ 0, ]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Literal',
                                value: 0,
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
                                },
                                raw: '0'
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

    pass(` [,,3,,,]`, {
        source: ' [,,3,,,]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            null,
                            null,
                            {
                                type: 'Literal',
                                value: 3,
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
                                raw: '3'
                            },
                            null,
                            null
                        ],
                        start: 1,
                        end: 9,
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 9
                            }
                        }
                    },
                    start: 1,
                    end: 9,
                    loc: {
                        start: {
                            line: 1,
                            column: 1
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

    pass(`[,]`, {
        source: '[,]',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 3,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 3
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 3
                  }
                },
                expression: {
                  type: 'ArrayExpression',
                  start: 0,
                  end: 3,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 3
                    }
                  },
                  elements: [
                    null
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass('[x()]', {
        source: '[x()]',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'CallExpression',
                                callee: {
                                    type: 'Identifier',
                                    name: 'x',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    }
                                },
                                arguments: [],
                                start: 1,
                                end: 4,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            }
                        ],
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
                        }
                    },
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
                    }
                }
            ],
            sourceType: 'script',
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
            }
        }
    });

    pass('[...a]', {
        source: '[...a]',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'SpreadElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'a',
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
                                start: 1,
                                end: 5,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 5
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

    pass('[a, ...b]', {
        source: '[a, ...b]',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'Identifier',
                                name: 'a',
                                start: 1,
                                end: 2,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 2
                                    }
                                }
                            },
                            {
                                type: 'SpreadElement',
                                argument: {
                                    type: 'Identifier',
                                    name: 'b',
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
                                start: 4,
                                end: 8,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 4
                                    },
                                    end: {
                                        line: 1,
                                        column: 8
                                    }
                                }
                            }
                        ],
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

    pass('[function* f() {}]', {
        source: '[function* f() {}]',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrayExpression',
                        elements: [
                            {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
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
                                async: false,
                                generator: true,
                                expression: false,
                                id: {
                                    type: 'Identifier',
                                    name: 'f',
                                    start: 11,
                                    end: 12,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 11
                                        },
                                        end: {
                                            line: 1,
                                            column: 12
                                        }
                                    }
                                },
                                start: 1,
                                end: 17,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 1
                                    },
                                    end: {
                                        line: 1,
                                        column: 17
                                    }
                                }
                            }
                        ],
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 18,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }
    });

    pass(`[a, ...{0: b}] = (1);`, {
        source: '[a, ...{0: b}] = (1);',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Literal',
                                                    value: 0,
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
                                                },
                                                value: {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    start: 11,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 11
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 8,
                                                end: 12,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 8
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 12
                                                    }
                                                }
                                            }
                                        ],
                                        start: 7,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        }
                                    },
                                    start: 4,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
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
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 1,
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
                            },
                        },
                        start: 0,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 20
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

    pass(`[...{a}] = b;`, {
        source: '[...{a}] = b;',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                value: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: true,
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
                                            }
                                        ],
                                        start: 4,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 4
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
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
                        },
                        operator: '=',
                        right: {
                            type: 'Identifier',
                            name: 'b',
                            start: 11,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
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

    pass(`[...{a}] = b;`, {
        source: '[...{a}] = b;',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                value: {
                                                    type: 'Identifier',
                                                    name: 'a',
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
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: true,
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
                                            }
                                        ],
                                        start: 4,
                                        end: 7,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 4
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
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
                        },
                        operator: '=',
                        right: {
                            type: 'Identifier',
                            name: 'b',
                            start: 11,
                            end: 12,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 12
                                }
                            }
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

    pass(`[a, ...{0: b}] = 1`, {
        source: '[a, ...{0: b}] = 1',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        left: {
                            type: 'ArrayPattern',
                            elements: [
                                {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 1,
                                    end: 2,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 1
                                        },
                                        end: {
                                            line: 1,
                                            column: 2
                                        }
                                    }
                                },
                                {
                                    type: 'RestElement',
                                    argument: {
                                        type: 'ObjectPattern',
                                        properties: [
                                            {
                                                type: 'Property',
                                                key: {
                                                    type: 'Literal',
                                                    value: 0,
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
                                                },
                                                value: {
                                                    type: 'Identifier',
                                                    name: 'b',
                                                    start: 11,
                                                    end: 12,
                                                    loc: {
                                                        start: {
                                                            line: 1,
                                                            column: 11
                                                        },
                                                        end: {
                                                            line: 1,
                                                            column: 12
                                                        }
                                                    }
                                                },
                                                kind: 'init',
                                                computed: false,
                                                method: false,
                                                shorthand: false,
                                                start: 8,
                                                end: 12,
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 8
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 12
                                                    }
                                                }
                                            }
                                        ],
                                        start: 7,
                                        end: 13,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 7
                                            },
                                            end: {
                                                line: 1,
                                                column: 13
                                            }
                                        }
                                    },
                                    start: 4,
                                    end: 13,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 4
                                        },
                                        end: {
                                            line: 1,
                                            column: 13
                                        }
                                    }
                                }
                            ],
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
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 1,
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
                            },
                        },
                        start: 0,
                        end: 18,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 18
                            }
                        }
                    },
                    start: 0,
                    end: 18,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 18
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 18,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 18
                }
            }
        }
    });

});

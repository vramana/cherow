import { pass, fail } from '../test-utils';
import { parseScript } from '../../src/cherow';

describe('Destructuring - Parenthesized', () => {

    const programs = [
        '{b} = b',
        '{b}',
        '{}',
        '{a: b}'
    ];

    for (const pattern of programs) {
        for (const fn of [ (arg: string) => `${arg}` ]) {

            pass(fn(`(${pattern})`), {
                source: fn(`(${pattern})`),
                expected: parseScript(fn(`(${pattern})`))
            });

            pass(fn(`(${pattern} = b)`), {
                source: fn(`(${pattern} = b)`),
                expected: parseScript(fn(`(${pattern} = b)`))
            });

            pass(fn(`c = ${pattern} = b`), {
                source: fn(`c = ${pattern} = b`),
                expected: parseScript(fn(`c = ${pattern} = b`))
            });

            pass(fn(`c = (${pattern} = b)`), {
                source: fn(`c = (${pattern} = b)`),
                expected: parseScript(fn(`c = ${pattern} = b`))
            });

            fail(fn(`${pattern} = b`), {
                source: fn(`${pattern} = b`),
                next: true
            });
        }
    }

    pass(`((a), x = 2)`, {
        source: `((a), x = 2)`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            body: [
              {
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'SequenceExpression',
                  start: 1,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  },
                  expressions: [
                    {
                      type: 'Identifier',
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
                      name: 'a'
                    },
                    {
                      type: 'AssignmentExpression',
                      start: 6,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 11
                        }
                      },
                      operator: '=',
                      left: {
                        type: 'Identifier',
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
                        name: 'x'
                      },
                      right: {
                        type: 'Literal',
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
                        value: 2,
                        raw: '2'
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`(a['b']) = {}`, {
        source: `(a['b']) = {}`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            body: [
              {
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'AssignmentExpression',
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
                  operator: '=',
                  left: {
                    type: 'MemberExpression',
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
                    object: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                    },
                    property: {
                      type: 'Literal',
                      start: 3,
                      end: 6,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 6
                        }
                      },
                      value: 'b',
                      raw: '\'b\''
                    },
                    computed: true
                  },
                  right: {
                    type: 'ObjectExpression',
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
                    properties: []
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`([1].a) = 2`, {
        source: `([1].a) = 2`,
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
                                    }
                                ],
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
                            },
                            computed: false,
                            property: {
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
                            start: 1,
                            end: 6,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 6
                                }
                            }
                        },
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 2,
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
                            raw: '2'
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
});
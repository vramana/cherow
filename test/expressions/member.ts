import { pass } from '../test-utils';

describe('Expressions - Member', () => {

        pass(`a[b, c]`, {
            source: 'a[b, c]',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'MemberExpression',
                            object: {
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
                            computed: true,
                            property: {
                                type: 'SequenceExpression',
                                expressions: [
                                    {
                                        type: 'Identifier',
                                        name: 'b',
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
                                        type: 'Identifier',
                                        name: 'c',
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

        pass(`(a[b]||(c[d]=e))`, {
            source: '(a[b]||(c[d]=e))',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'LogicalExpression',
                            left: {
                                type: 'MemberExpression',
                                object: {
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
                                computed: true,
                                property: {
                                    type: 'Identifier',
                                    name: 'b',
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
                            },
                            right: {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'MemberExpression',
                                    object: {
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
                                    computed: true,
                                    property: {
                                        type: 'Identifier',
                                        name: 'd',
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
                                },
                                operator: '=',
                                right: {
                                    type: 'Identifier',
                                    name: 'e',
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
                                start: 8,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 8
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            },
                            operator: '||',
                            start: 1,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 1
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        start: 0,
                        end: 16,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 16
                            }
                        }
                    }
                ],
                sourceType: 'script',
                start: 0,
                end: 16,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 16
                    }
                }
            }
        });

        pass(`a&&(b=c)&&(d=e)`, {
            source: 'a&&(b=c)&&(d=e)',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'LogicalExpression',
                            left: {
                                type: 'LogicalExpression',
                                left: {
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
                                right: {
                                    type: 'AssignmentExpression',
                                    left: {
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
                                    operator: '=',
                                    right: {
                                        type: 'Identifier',
                                        name: 'c',
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
                                operator: '&&',
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
                            right: {
                                type: 'AssignmentExpression',
                                left: {
                                    type: 'Identifier',
                                    name: 'd',
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
                                operator: '=',
                                right: {
                                    type: 'Identifier',
                                    name: 'e',
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
                                start: 11,
                                end: 14,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 11
                                    },
                                    end: {
                                        line: 1,
                                        column: 14
                                    }
                                }
                            },
                            operator: '&&',
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

        pass(`a.$._.B0`, {
            source: 'a.$._.B0',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'MemberExpression',
                            object: {
                                type: 'MemberExpression',
                                object: {
                                    type: 'MemberExpression',
                                    object: {
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
                                    computed: false,
                                    property: {
                                        type: 'Identifier',
                                        name: '$',
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
                                    }
                                },
                                computed: false,
                                property: {
                                    type: 'Identifier',
                                    name: '_',
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
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'B0',
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
                    }
                ],
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

        pass(`a.if`, {
            source: 'a.if',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    },
                    expression: {
                      type: 'MemberExpression',
                      start: 0,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      },
                      object: {
                        type: 'Identifier',
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
                        name: 'a'
                      },
                      property: {
                        type: 'Identifier',
                        start: 2,
                        end: 4,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 4
                          }
                        },
                        name: 'if'
                      },
                      computed: false
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

        pass(`a.false`, {
            source: 'a.false',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'MemberExpression',
                            object: {
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
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'false',
                                start: 2,
                                end: 7,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 2
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

        pass(`a.null`, {
            source: 'a.null',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                type: 'Program',
                body: [
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'MemberExpression',
                            object: {
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
                            computed: false,
                            property: {
                                type: 'Identifier',
                                name: 'null',
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

    });
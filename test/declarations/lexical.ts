import { pass, fail } from '../test-utils';

describe('Declarations - Lexical', () => {

    pass(`switch (answer) { case 42: let t = 42; break; }`, {
        source: 'switch (answer) { case 42: let t = 42; break; }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'SwitchStatement',
                discriminant: {
                    type: 'Identifier',
                    name: 'answer',
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
                cases: [{
                    type: 'SwitchCase',
                    test: {
                        type: 'Literal',
                        value: 42,
                        start: 23,
                        end: 25,
                        loc: {
                            start: {
                                line: 1,
                                column: 23
                            },
                            end: {
                                line: 1,
                                column: 25
                            }
                        },
                        raw: '42'
                    },
                    consequent: [{
                            type: 'VariableDeclaration',
                            declarations: [{
                                type: 'VariableDeclarator',
                                init: {
                                    type: 'Literal',
                                    value: 42,
                                    start: 35,
                                    end: 37,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 35
                                        },
                                        end: {
                                            line: 1,
                                            column: 37
                                        }
                                    },
                                    raw: '42'
                                },
                                id: {
                                    type: 'Identifier',
                                    name: 't',
                                    start: 31,
                                    end: 32,
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 31
                                        },
                                        end: {
                                            line: 1,
                                            column: 32
                                        }
                                    }
                                },
                                start: 31,
                                end: 37,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 31
                                    },
                                    end: {
                                        line: 1,
                                        column: 37
                                    }
                                }
                            }],
                            kind: 'let',
                            start: 27,
                            end: 38,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 27
                                },
                                end: {
                                    line: 1,
                                    column: 38
                                }
                            }
                        },
                        {
                            type: 'BreakStatement',
                            label: null,
                            start: 39,
                            end: 45,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 39
                                },
                                end: {
                                    line: 1,
                                    column: 45
                                }
                            }
                        }
                    ],
                    start: 18,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 18
                        },
                        end: {
                            line: 1,
                            column: 45
                        }
                    }
                }],
                start: 0,
                end: 47,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 47
                    }
                }
            }],
            sourceType: 'script',
            start: 0,
            end: 47,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 47
                }
            }
        }
    });

    pass(`let;`, {
        source: 'let;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'Identifier',
                    name: 'let',
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
                }
            }],
            sourceType: 'script',
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
            }
        }
    });

    pass(`let a`, {
        source: 'let a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            body: [{
                type: 'VariableDeclaration',
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
                declarations: [{
                    type: 'VariableDeclarator',
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
                    id: {
                        type: 'Identifier',
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
                        name: 'a'
                    },
                    init: null
                }],
                kind: 'let'
            }],
            sourceType: 'script'
        }
    });

    pass(`let.let = foo`, {
        source: 'let.let = foo',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    left: {
                        type: 'MemberExpression',
                        object: {
                            type: 'Identifier',
                            name: 'let',
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
                            name: 'let',
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
                    operator: '=',
                    right: {
                        type: 'Identifier',
                        name: 'foo',
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

    pass('let a = 3,b =4;', {
        source: 'let a = 3,b =4;',
        loc: true,
        ranges: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'VariableDeclaration',
                    declarations: [
                        {
                            type: 'VariableDeclarator',
                            init: {
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
                                }
                            },
                            id: {
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
                            start: 4,
                            end: 9,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 4
                                },
                                end: {
                                    line: 1,
                                    column: 9
                                }
                            }
                        },
                        {
                            type: 'VariableDeclarator',
                            init: {
                                type: 'Literal',
                                value: 4,
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
                            id: {
                                type: 'Identifier',
                                name: 'b',
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
                            start: 10,
                            end: 14,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 14
                                }
                            }
                        }
                    ],
                    kind: 'let',
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

    pass(`while(true) var a`, {
        source: 'while(true) var a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'WhileStatement',
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
                },
                test: {
                    type: 'Literal',
                    start: 6,
                    end: 10,
                    loc: {
                        start: {
                            line: 1,
                            column: 6
                        },
                        end: {
                            line: 1,
                            column: 10
                        }
                    },
                    value: true,
                    raw: 'true'
                },
                body: {
                    type: 'VariableDeclaration',
                    start: 12,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 12
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    },
                    declarations: [{
                        type: 'VariableDeclarator',
                        start: 16,
                        end: 17,
                        loc: {
                            start: {
                                line: 1,
                                column: 16
                            },
                            end: {
                                line: 1,
                                column: 17
                            }
                        },
                        id: {
                            type: 'Identifier',
                            start: 16,
                            end: 17,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 16
                                },
                                end: {
                                    line: 1,
                                    column: 17
                                }
                            },
                            name: 'a'
                        },
                        init: null
                    }],
                    kind: 'var'
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`const [a] = [1, 2];`, {
        source: 'const [a] = [1, 2];',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 19,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 19
              }
            },
            body: [
              {
                type: 'VariableDeclaration',
                start: 0,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    },
                    id: {
                      type: 'ArrayPattern',
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
                      elements: [
                        {
                          type: 'Identifier',
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
                          name: 'a'
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
                      start: 12,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      elements: [
                        {
                          type: 'Literal',
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
                          value: 1,
                          raw: '1'
                        },
                        {
                          type: 'Literal',
                          start: 16,
                          end: 17,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 17
                            }
                          },
                          value: 2,
                          raw: '2'
                        }
                      ]
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`let a; [a,] = [];`, {
        source: 'let a; [a,] = [];',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'VariableDeclaration',
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
                declarations: [
                  {
                    type: 'VariableDeclarator',
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
                    id: {
                      type: 'Identifier',
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
                      name: 'a'
                    },
                    init: null
                  }
                ],
                kind: 'let'
              },
              {
                type: 'ExpressionStatement',
                start: 7,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 7
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                },
                expression: {
                  type: 'AssignmentExpression',
                  start: 7,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  },
                  operator: '=',
                  left: {
                    type: 'ArrayPattern',
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
                    elements: [
                      {
                        type: 'Identifier',
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
                        name: 'a'
                      }
                    ]
                  },
                  right: {
                    type: 'ArrayExpression',
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
                    },
                    elements: []
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`const [a] = [,,];`, {
        source: 'const [a] = [,,];',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'VariableDeclaration',
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
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    },
                    id: {
                      type: 'ArrayPattern',
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
                      elements: [
                        {
                          type: 'Identifier',
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
                          name: 'a'
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
                      start: 12,
                      end: 16,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 16
                        }
                      },
                      elements: [
                        null,
                        null
                      ]
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`l\\u0065t // ASI
    a;`, {
        source: `l\\u0065t // ASI
        a;`,
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'let',
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
                },
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'Identifier',
                        name: 'a',
                        start: 24,
                        end: 25,
                        loc: {
                            start: {
                                line: 2,
                                column: 8
                            },
                            end: {
                                line: 2,
                                column: 9
                            }
                        }
                    },
                    start: 24,
                    end: 26,
                    loc: {
                        start: {
                            line: 2,
                            column: 8
                        },
                        end: {
                            line: 2,
                            column: 10
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 26,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 2,
                    column: 10
                }
            }
        }
    });

    pass(`const [...a] = [];`, {
        source: 'const [...a] = [];',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'VariableDeclaration',
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
                },
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    start: 6,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    },
                    id: {
                      type: 'ArrayPattern',
                      start: 6,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      },
                      elements: [
                        {
                          type: 'RestElement',
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
                          argument: {
                            type: 'Identifier',
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
                            name: 'a'
                          }
                        }
                      ]
                    },
                    init: {
                      type: 'ArrayExpression',
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
                      },
                      elements: []
                    }
                  }
                ],
                kind: 'const'
              }
            ],
            sourceType: 'script'
          }
    });

    fail(`let [[(a)], ((((((([b])))))))] = [[],[]];`, {
        source: 'let [[(a)], ((((((([b])))))))] = [[],[]];',
        message: 'Unexpected token (',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`const [((((a)))), b] = [];`, {
        source: 'const [((((a)))), b] = [];',
        line: 1
    });

    fail(`let [1] = [];`, {
        source: 'let [1] = [];',
        line: 1
    });

    fail(`const [1, a] = [];`, {
        source: 'const [1, a] = [];',
        line: 1
    });

    fail(`let [a];`, {
        source: 'let [a];',
        line: 1
    });

    fail(`while(true) let a`, {
        source: 'while(true) let a',
        line: 1
    });

    fail(`while(true) const a`, {
        source: 'while(true) const a',
        line: 1
    });

    fail(`with(true) let a`, {
        source: 'with(true) let a',
        line: 1
    });

    fail(`with(true) class a {}`, {
        source: 'with(true) class a {}',
        line: 1
    });

    fail(`a: let a`, {
        source: 'a: let a',
        line: 1
    });

    fail(`const x = 0, y = 1,;`, {
        source: 'const x = 0, y = 1,;',
    });

    fail(`let x,`, {
        source: 'let x,',
        message: 'Unexpected token end of source',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`let let;`, {
        source: 'let let;',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 3,
        index: 3
    });

    fail(`for (const let = 1;;;) {}`, {
        source: 'for (const let = 1;;;) {}',
        message: 'let is disallowed as a lexically bound name',
        line: 1,
        column: 10,
        index: 10
    });

    fail(`const let`, {
        source: 'const let',
    });

    fail(`let []`, {
        source: 'let []',
        message: 'Missing initializer in destructuring declaration',
        line: 1,
        column: 6,
        index: 6
    });

    fail(`const const;`, {
        source: 'const const;',
    });
});

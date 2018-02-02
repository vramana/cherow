import { pass, fail } from '../test-utils';

describe('Expressions - Async arrow', () => {

    fail(`'use strict'; async (yield) => X`, {
        source: '"use strict"; async (yield) => X',
        line: 1
    });

    fail(`function* g() { async yield => X }`, {
        source: 'function* g() { async yield => X }',
        line: 1
    });

    fail(`function* g() { async (yield) => X }`, {
        source: 'function* g() { async (yield) => X }',
        line: 1
    });

    fail(`function* g() { async ([yield]) => X }`, {
        source: 'function* g() { async ([yield]) => X }',
        line: 1
    });

    fail(`function* g() { async ({yield}) => X }`, {
        source: 'function* g() { async ({yield}) => X }',
        line: 1
    });

    pass(`async X => {yield}`, {
        source: 'async X => {yield}',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'BlockStatement',
                            body: [
                                {
                                    type: 'ExpressionStatement',
                                    expression: {
                                        type: 'Identifier',
                                        name: 'yield',
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
                                        }
                                    },
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
                                    }
                                }
                            ],
                            start: 11,
                            end: 18,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 18
                                }
                            }
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'X',
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
                            }
                        ],
                        id: null,
                        async: true,
                        generator: false,
                        expression: false,
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

    pass(`a ? b : async () => {1}`, {
        source: 'a ? b : async () => {1}',
        ranges: true,
        raw: true,
        loc: true,
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
                            type: 'ArrowFunctionExpression',
                            body: {
                                type: 'BlockStatement',
                                body: [
                                    {
                                        type: 'ExpressionStatement',
                                        expression: {
                                            type: 'Literal',
                                            value: 1,
                                            start: 21,
                                            end: 22,
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 21
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 22
                                                }
                                            },
                                            raw: '1'
                                        },
                                        start: 21,
                                        end: 22,
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 21
                                            },
                                            end: {
                                                line: 1,
                                                column: 22
                                            }
                                        }
                                    }
                                ],
                                start: 20,
                                end: 23,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 20
                                    },
                                    end: {
                                        line: 1,
                                        column: 23
                                    }
                                }
                            },
                            params: [],
                            id: null,
                            async: true,
                            generator: false,
                            expression: false,
                            start: 8,
                            end: 23,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 8
                                },
                                end: {
                                    line: 1,
                                    column: 23
                                }
                            }
                        },
                        start: 0,
                        end: 23,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 23
                            }
                        }
                    },
                    start: 0,
                    end: 23,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 23
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 23,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 23
                }
            }
        }
    });

    pass(`async a => async function() {}`, {
        source: 'async a => async function() {}',
        ranges: true,
        raw: true,
        loc: true,
        expected: {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                            type: 'FunctionExpression',
                            params: [],
                            body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 28,
                                end: 30,
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 28
                                    },
                                    end: {
                                        line: 1,
                                        column: 30
                                    }
                                }
                            },
                            async: true,
                            generator: false,
                            expression: false,
                            id: null,
                            start: 11,
                            end: 30,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 11
                                },
                                end: {
                                    line: 1,
                                    column: 30
                                }
                            }
                        },
                        params: [
                            {
                                type: 'Identifier',
                                name: 'a',
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
                            }
                        ],
                        id: null,
                        async: true,
                        generator: false,
                        expression: true,
                        start: 0,
                        end: 30,
                        loc: {
                            start: {
                                line: 1,
                                column: 0
                            },
                            end: {
                                line: 1,
                                column: 30
                            }
                        }
                    },
                    start: 0,
                    end: 30,
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 30
                        }
                    }
                }
            ],
            sourceType: 'script',
            start: 0,
            end: 30,
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 30
                }
            }
        }
    });

    pass(`(async (a) => await a)`, {
            source: '(async (a) => await a)',
            ranges: true,
            raw: true,
            loc: true,
            expected: {
                type: 'Program',
                start: 0,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                },
                body: [
                  {
                    type: 'ExpressionStatement',
                    start: 0,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    expression: {
                      type: 'ArrowFunctionExpression',
                      start: 1,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      },
                      id: null,
                      generator: false,
                      expression: true,
                      async: true,
                      params: [
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
                      ],
                      body: {
                        type: 'AwaitExpression',
                        start: 14,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 21
                          }
                        },
                        argument: {
                          type: 'Identifier',
                          start: 20,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          },
                          name: 'a'
                        }
                      }
                    }
                  }
                ],
                sourceType: 'script'
              }
        });

    pass(`({async foo(a) { await a }})`, {
        source: '({async foo(a) { await a }})',
        ranges: true,
        loc: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 28
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                },
                expression: {
                  type: 'ObjectExpression',
                  start: 1,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      },
                      method: true,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
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
                        },
                        name: 'foo'
                      },
                      kind: 'init',
                      value: {
                        type: 'FunctionExpression',
                        start: 11,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: true,
                        params: [
                          {
                            type: 'Identifier',
                            start: 12,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 12
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            name: 'a'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          start: 15,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 15
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          },
                          body: [
                            {
                              type: 'ExpressionStatement',
                              start: 17,
                              end: 24,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 17
                                },
                                end: {
                                  line: 1,
                                  column: 24
                                }
                              },
                              expression: {
                                type: 'AwaitExpression',
                                start: 17,
                                end: 24,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 17
                                  },
                                  end: {
                                    line: 1,
                                    column: 24
                                  }
                                },
                                argument: {
                                  type: 'Identifier',
                                  start: 23,
                                  end: 24,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 23
                                    },
                                    end: {
                                      line: 1,
                                      column: 24
                                    }
                                  },
                                  name: 'a'
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`({async foo() { }})`, {
        source: '({async foo() { }})',
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
                type: 'ExpressionStatement',
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
                expression: {
                  type: 'ObjectExpression',
                  start: 1,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      },
                      method: true,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
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
                        },
                        name: 'foo'
                      },
                      kind: 'init',
                      value: {
                        type: 'FunctionExpression',
                        start: 11,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        },
                        id: null,
                        generator: false,
                        expression: false,
                        async: true,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          start: 14,
                          end: 17,
                          loc: {
                            start: {
                              line: 1,
                              column: 14
                            },
                            end: {
                              line: 1,
                              column: 17
                            }
                          },
                          body: []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`async ({a: b = c}) => a`, {
        source: 'async ({a: b = c}) => a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
            start: 0,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 23
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 0,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                },
                expression: {
                  type: 'ArrowFunctionExpression',
                  start: 0,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  },
                  id: null,
                  generator: false,
                  expression: true,
                  async: true,
                  params: [
                    {
                      type: 'ObjectPattern',
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
                      properties: [
                        {
                          type: 'Property',
                          start: 8,
                          end: 16,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 16
                            }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
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
                          },
                          value: {
                            type: 'AssignmentPattern',
                            start: 11,
                            end: 16,
                            loc: {
                              start: {
                                line: 1,
                                column: 11
                              },
                              end: {
                                line: 1,
                                column: 16
                              }
                            },
                            left: {
                              type: 'Identifier',
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
                              },
                              name: 'b'
                            },
                            right: {
                              type: 'Identifier',
                              start: 15,
                              end: 16,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 15
                                },
                                end: {
                                  line: 1,
                                  column: 16
                                }
                              },
                              name: 'c'
                            }
                          },
                          kind: 'init'
                        }
                      ]
                    }
                  ],
                  body: {
                    type: 'Identifier',
                    start: 22,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    },
                    name: 'a'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });
    pass(`async ({a = b}) => a`, {
        source: 'async ({a = b}) => a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ExpressionStatement',
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
                },
                expression: {
                  type: 'ArrowFunctionExpression',
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
                  },
                  id: null,
                  generator: false,
                  expression: true,
                  async: true,
                  params: [
                    {
                      type: 'ObjectPattern',
                      start: 7,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 7
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      },
                      properties: [
                        {
                          type: 'Property',
                          start: 8,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
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
                          },
                          kind: 'init',
                          value: {
                            type: 'AssignmentPattern',
                            start: 8,
                            end: 13,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 13
                              }
                            },
                            left: {
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
                            },
                            right: {
                              type: 'Identifier',
                              start: 12,
                              end: 13,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 12
                                },
                                end: {
                                  line: 1,
                                  column: 13
                                }
                              },
                              name: 'b'
                            }
                          }
                        }
                      ]
                    }
                  ],
                  body: {
                    type: 'Identifier',
                    start: 19,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    },
                    name: 'a'
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });
    pass(`cherow = async => 42;`, {
        source: 'cherow = async => 42;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [
              {
                type: 'ExpressionStatement',
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
                },
                expression: {
                  type: 'AssignmentExpression',
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
                  },
                  operator: '=',
                  left: {
                    type: 'Identifier',
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
                    name: 'cherow'
                  },
                  right: {
                    type: 'ArrowFunctionExpression',
                    start: 9,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    },
                    id: null,
                    generator: false,
                    expression: true,
                    async: false,
                    params: [
                      {
                        type: 'Identifier',
                        start: 9,
                        end: 14,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 14
                          }
                        },
                        name: 'async'
                      }
                    ],
                    body: {
                      type: 'Literal',
                      start: 18,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      },
                      value: 42,
                      raw: '42'
                    }
                  }
                }
              }
            ],
            sourceType: 'script'
          }
    });

    pass(`async (a, b, c) => a`, {
        source: 'async (a, b, c) => a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'ArrowFunctionExpression',
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
                    },
                    id: null,
                    generator: false,
                    expression: true,
                    async: true,
                    params: [{
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
                        },
                        {
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
                            name: 'b'
                        },
                        {
                            type: 'Identifier',
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
                            name: 'c'
                        }
                    ],
                    body: {
                        type: 'Identifier',
                        start: 19,
                        end: 20,
                        loc: {
                            start: {
                                line: 1,
                                column: 19
                            },
                            end: {
                                line: 1,
                                column: 20
                            }
                        },
                        name: 'a'
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`async (a) => a`, {
        source: 'async (a) => a',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
            type: 'Program',
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
            },
            body: [{
                type: 'ExpressionStatement',
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
                },
                expression: {
                    type: 'ArrowFunctionExpression',
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
                    },
                    id: null,
                    generator: false,
                    expression: true,
                    async: true,
                    params: [{
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
                    }],
                    body: {
                        type: 'Identifier',
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
                        name: 'a'
                    }
                }
            }],
            sourceType: 'script'
        }
    });

    pass(`async (y) => y`, {
      source: 'async (y) => y',
      loc: true,
      ranges: true,
      raw: true,
      expected: {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                        type: 'Identifier',
                        name: 'y',
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
                    params: [
                        {
                            type: 'Identifier',
                            name: 'y',
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
                        }
                    ],
                    id: null,
                    async: true,
                    generator: false,
                    expression: true,
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

    pass(`async (x, ...y) => x`, {
        source: 'async (x, ...y) => x',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ArrowFunctionExpression',
                      body: {
                          type: 'Identifier',
                          name: 'x',
                          start: 19,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          }
                      },
                      params: [
                          {
                              type: 'Identifier',
                              name: 'x',
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
                          {
                              type: 'RestElement',
                              argument: {
                                  type: 'Identifier',
                                  name: 'y',
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
                      id: null,
                      async: true,
                      generator: false,
                      expression: true,
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
              }
          ],
          sourceType: 'script',
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
      }
      });

    pass(`async yield => 0;`, {
        source: 'async yield => 0;',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ArrowFunctionExpression',
                      body: {
                          type: 'Literal',
                          value: 0,
                          start: 15,
                          end: 16,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 16
                              }
                          },
                          raw: '0'
                      },
                      params: [
                          {
                              type: 'Identifier',
                              name: 'yield',
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
                              }
                          }
                      ],
                      id: null,
                      async: true,
                      generator: false,
                      expression: true,
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

    pass(`async y => y`, {
        source: 'async y => y',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ArrowFunctionExpression',
                      body: {
                          type: 'Identifier',
                          name: 'y',
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
                      params: [
                          {
                              type: 'Identifier',
                              name: 'y',
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
                          }
                      ],
                      id: null,
                      async: true,
                      generator: false,
                      expression: true,
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

    pass(`async x => { x * x }`, {
        source: 'async x => { x * x }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ArrowFunctionExpression',
                      body: {
                          type: 'BlockStatement',
                          body: [
                              {
                                  type: 'ExpressionStatement',
                                  expression: {
                                      type: 'BinaryExpression',
                                      left: {
                                          type: 'Identifier',
                                          name: 'x',
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
                                      right: {
                                          type: 'Identifier',
                                          name: 'x',
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
                                      operator: '*',
                                      start: 13,
                                      end: 18,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 13
                                          },
                                          end: {
                                              line: 1,
                                              column: 18
                                          }
                                      }
                                  },
                                  start: 13,
                                  end: 18,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 13
                                      },
                                      end: {
                                          line: 1,
                                          column: 18
                                      }
                                  }
                              }
                          ],
                          start: 11,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          }
                      },
                      params: [
                          {
                              type: 'Identifier',
                              name: 'x',
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
                          }
                      ],
                      id: null,
                      async: true,
                      generator: false,
                      expression: false,
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
              }
          ],
          sourceType: 'script',
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
      }
      });

    pass(`async (a, b) => { await a }`, {
        source: 'async (a, b) => { await a }',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'ArrowFunctionExpression',
                      body: {
                          type: 'BlockStatement',
                          body: [
                              {
                                  type: 'ExpressionStatement',
                                  expression: {
                                      type: 'AwaitExpression',
                                      argument: {
                                          type: 'Identifier',
                                          name: 'a',
                                          start: 24,
                                          end: 25,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 24
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 25
                                              }
                                          }
                                      },
                                      start: 18,
                                      end: 25,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 18
                                          },
                                          end: {
                                              line: 1,
                                              column: 25
                                          }
                                      }
                                  },
                                  start: 18,
                                  end: 25,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 18
                                      },
                                      end: {
                                          line: 1,
                                          column: 25
                                      }
                                  }
                              }
                          ],
                          start: 16,
                          end: 27,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 27
                              }
                          }
                      },
                      params: [
                          {
                              type: 'Identifier',
                              name: 'a',
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
                          {
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
                          }
                      ],
                      id: null,
                      async: true,
                      generator: false,
                      expression: false,
                      start: 0,
                      end: 27,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 27
                          }
                      }
                  },
                  start: 0,
                  end: 27,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 27
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 27,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 27
              }
          }
      }
      });

    pass(`f(a, async b => await b)`, {
        source: 'f(a, async b => await b)',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          type: 'Program',
          body: [
              {
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'CallExpression',
                      callee: {
                          type: 'Identifier',
                          name: 'f',
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
                      arguments: [
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
                              type: 'ArrowFunctionExpression',
                              body: {
                                  type: 'AwaitExpression',
                                  argument: {
                                      type: 'Identifier',
                                      name: 'b',
                                      start: 22,
                                      end: 23,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 22
                                          },
                                          end: {
                                              line: 1,
                                              column: 23
                                          }
                                      }
                                  },
                                  start: 16,
                                  end: 23,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 23
                                      }
                                  }
                              },
                              params: [
                                  {
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
                                  }
                              ],
                              id: null,
                              async: true,
                              generator: false,
                              expression: true,
                              start: 5,
                              end: 23,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 5
                                  },
                                  end: {
                                      line: 1,
                                      column: 23
                                  }
                              }
                          }
                      ],
                      start: 0,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      }
                  },
                  start: 0,
                  end: 24,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 24
                      }
                  }
              }
          ],
          sourceType: 'script',
          start: 0,
          end: 24,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 24
              }
          }
      }
      });

    pass(`async a => a`, {
          source: 'async a => a',
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
              body: [{
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
                      type: 'ArrowFunctionExpression',
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
                      id: null,
                      generator: false,
                      expression: true,
                      async: true,
                      params: [{
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
                          name: 'a'
                      }],
                      body: {
                          type: 'Identifier',
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
                          },
                          name: 'a'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });
});